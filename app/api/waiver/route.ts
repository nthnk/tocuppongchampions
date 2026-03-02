import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import {
  insertWaiver,
  updateDriveStatus,
  insertFailedUpload,
  generateConfirmationCode,
  checkDuplicateEmail,
  buildPdfFilename,
} from '@/lib/waiver-db';
import { generateWaiverPdf } from '@/lib/waiver-pdf';
import { uploadToDrive } from '@/lib/google-drive';
import { checkRateLimit } from '@/lib/rate-limit';
import { buildConfirmationEmail, buildAdminNotificationEmail } from '@/lib/waiver-emails';

const PDF_DIR = path.join(process.cwd(), 'data', 'waivers-pdf');

const resend = new Resend(process.env.RESEND_API_KEY);

const TEST_MODE = process.env.WAIVER_TEST_MODE === 'true';
const ADMIN_EMAIL = process.env.WAIVER_ADMIN_EMAIL || 'nathan@cftomorrow.com';

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real;
  return '127.0.0.1';
}

function sanitize(str: string): string {
  return str.replace(/[<>&"'/]/g, '').trim();
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    // Rate limit
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { fullName, dateOfBirth, ageOnEvent, email, phone, photoOptOut, signatureData } = body;

    // Server-side validation
    if (!fullName || !dateOfBirth || !email || !phone || !signatureData) {
      return NextResponse.json({ error: 'All required fields must be filled in.' }, { status: 400 });
    }

    if (typeof ageOnEvent !== 'number' || ageOnEvent < 19) {
      return NextResponse.json({ error: 'You must be 19 or older on March 22, 2026.' }, { status: 400 });
    }

    // Validate DOB server-side
    const dobDate = new Date(dateOfBirth + 'T00:00:00');
    const eventDate = new Date('2026-03-22T00:00:00');
    let calculatedAge = eventDate.getFullYear() - dobDate.getFullYear();
    const monthDiff = eventDate.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && eventDate.getDate() < dobDate.getDate())) {
      calculatedAge--;
    }
    if (calculatedAge < 19) {
      return NextResponse.json({ error: 'You must be 19 or older on March 22, 2026.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!signatureData.startsWith('data:image/png;base64,')) {
      return NextResponse.json({ error: 'Invalid signature data.' }, { status: 400 });
    }

    // Check for duplicate email
    if (checkDuplicateEmail(email.toLowerCase().trim())) {
      return NextResponse.json({ error: 'A waiver has already been submitted with this email address.' }, { status: 409 });
    }

    // Sanitize inputs
    const cleanName = sanitize(fullName);
    const cleanPhone = sanitize(phone);
    const cleanEmail = email.toLowerCase().trim();

    // Generate confirmation code
    const confirmationCode = generateConfirmationCode();

    // Toronto timezone timestamp
    const submittedAt = new Date().toLocaleString('en-US', {
      timeZone: 'America/Toronto',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    // Save to database
    insertWaiver({
      confirmation_code: confirmationCode,
      full_name: cleanName,
      date_of_birth: dateOfBirth,
      age_on_event: calculatedAge,
      email: cleanEmail,
      phone: cleanPhone,
      photo_opt_out: !!photoOptOut,
      signature_data: signatureData,
      ip_address: ip,
      drive_upload_status: 'pending',
      submitted_at: submittedAt,
    });

    // Generate PDF
    const pdfBytes = await generateWaiverPdf({
      fullName: cleanName,
      dateOfBirth: dateOfBirth,
      ageOnEvent: calculatedAge,
      email: cleanEmail,
      phone: cleanPhone,
      photoOptOut: !!photoOptOut,
      signatureImageBase64: signatureData,
      confirmationCode,
      submittedAt,
      ipAddress: ip,
    });

    const pdfFilename = buildPdfFilename(cleanName, confirmationCode);

    // Always save PDF locally
    try {
      await mkdir(PDF_DIR, { recursive: true });
      await writeFile(path.join(PDF_DIR, pdfFilename), Buffer.from(pdfBytes));
      console.log(`[Waiver] PDF saved locally: data/waivers-pdf/${pdfFilename}`);
    } catch (fsError: any) {
      console.error(`[Waiver] Local PDF save failed:`, fsError.message);
    }

    // Fire-and-forget: Drive upload + emails run in background after response is sent
    if (!TEST_MODE) {
      const pdfBuf = Buffer.from(pdfBytes);
      // Drive upload (background — don't block response)
      uploadToDrive(pdfBuf, pdfFilename)
        .then((fileId) => {
          updateDriveStatus(confirmationCode, 'uploaded', fileId);
          console.log(`[Waiver] Drive upload success: ${pdfFilename} (${fileId})`);
        })
        .catch((driveError: any) => {
          console.error(`[Waiver] Drive upload failed for ${confirmationCode}:`, driveError.message);
          updateDriveStatus(confirmationCode, 'failed');
          insertFailedUpload(confirmationCode, pdfBuf, pdfFilename, driveError.message);
        });

      // Emails (background — don't block response)
      resend.emails.send({
        from: '6cups <noreply@tocuppongchampions.ca>',
        to: cleanEmail,
        subject: "You're In — 6CUPS Waiver Confirmed | Table Zero, March 22",
        html: buildConfirmationEmail({ fullName: cleanName, confirmationCode }),
      })
        .then(() => console.log(`[Waiver] Confirmation email sent to ${cleanEmail}`))
        .catch((err: any) => console.error(`[Waiver] Confirmation email failed for ${cleanEmail}:`, err.message));

      resend.emails.send({
        from: '6cups <noreply@tocuppongchampions.ca>',
        to: ADMIN_EMAIL,
        subject: `6CUPS Waiver Signed: ${cleanName} | ${confirmationCode}`,
        html: buildAdminNotificationEmail({
          fullName: cleanName,
          email: cleanEmail,
          confirmationCode,
          submittedAt,
          photoOptOut: !!photoOptOut,
        }),
      })
        .then(() => console.log(`[Waiver] Admin notification sent to ${ADMIN_EMAIL}`))
        .catch((err: any) => console.error(`[Waiver] Admin email failed:`, err.message));
    } else {
      console.log(`[Waiver TEST MODE] Would send confirmation email to ${cleanEmail}`);
      console.log(`[Waiver TEST MODE] Would send admin notification to ${ADMIN_EMAIL}`);
      console.log(`[Waiver TEST MODE] Confirmation code: ${confirmationCode}`);
      console.log(`[Waiver TEST MODE] Participant: ${cleanName}, DOB: ${dateOfBirth}, Age: ${calculatedAge}`);
      console.log(`[Waiver TEST MODE] Photo opt-out: ${photoOptOut ? 'Yes' : 'No'}`);
      updateDriveStatus(confirmationCode, 'test_mode');
    }

    return NextResponse.json({ success: true, confirmationCode });
  } catch (error: any) {
    console.error('[Waiver] Submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
