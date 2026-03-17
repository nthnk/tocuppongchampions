import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateWaiverPdf } from '@/lib/waiver-pdf';
import { checkRateLimit } from '@/lib/rate-limit';
import { buildConfirmationEmail, buildAdminNotificationEmail } from '@/lib/waiver-emails';

// Inline utilities (no SQLite dependency)
function generateConfirmationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `6CUPS-${code}`;
}

function buildPdfFilename(fullName: string, confirmationCode: string): string {
  const nameParts = fullName.toUpperCase().split(' ');
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0];
  const firstName = nameParts[0];
  return `WAIVER_${lastName}_${firstName}_${confirmationCode}.pdf`;
}

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
    const { fullName, dateOfBirth, ageOnEvent, email, photoOptOut, signatureData } = body;

    // Server-side validation
    if (!fullName || !dateOfBirth || !email || !signatureData) {
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

    // Sanitize inputs
    const cleanName = sanitize(fullName);
    const cleanEmail = email.toLowerCase().trim();

    // Generate confirmation code
    const confirmationCode = generateConfirmationCode();

    // Toronto timezone timestamp
    const submittedAt = new Date().toLocaleString('en-US', {
      timeZone: 'America/Toronto',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    // Generate PDF
    const pdfBytes = await generateWaiverPdf({
      fullName: cleanName,
      dateOfBirth: dateOfBirth,
      ageOnEvent: calculatedAge,
      email: cleanEmail,
      photoOptOut: !!photoOptOut,
      signatureImageBase64: signatureData,
      confirmationCode,
      submittedAt,
      ipAddress: ip,
    });

    const pdfFilename = buildPdfFilename(cleanName, confirmationCode);

    // Send emails (awaited so we can catch Resend errors)
    const emailErrors: string[] = [];

    if (!TEST_MODE) {
      const pdfBuf = Buffer.from(pdfBytes);

      // 1. Confirmation email to participant
      try {
        const confirmResult = await resend.emails.send({
          from: '6cups <noreply@tocuppongchampions.ca>',
          to: cleanEmail,
          subject: "You're In — 6CUPS Waiver Confirmed | Table Zero, March 22",
          html: buildConfirmationEmail({ fullName: cleanName, confirmationCode }),
        });
        console.log(`[Waiver] Confirmation email sent to ${cleanEmail}`, confirmResult);
      } catch (err: any) {
        console.error(`[Waiver] Confirmation email failed:`, err);
        emailErrors.push(`Confirmation: ${err.message}`);
      }

      // 2. Admin notification
      try {
        const adminResult = await resend.emails.send({
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
        });
        console.log(`[Waiver] Admin notification sent to ${ADMIN_EMAIL}`, adminResult);
      } catch (err: any) {
        console.error(`[Waiver] Admin email failed:`, err);
        emailErrors.push(`Admin: ${err.message}`);
      }

      // 3. Signed waiver PDF to admin
      try {
        const pdfResult = await resend.emails.send({
          from: '6cups <noreply@tocuppongchampions.ca>',
          to: 'nathan@tocuppongchampions.ca',
          subject: `Signed Waiver PDF: ${cleanName} | ${confirmationCode}`,
          html: buildAdminNotificationEmail({
            fullName: cleanName,
            email: cleanEmail,
            confirmationCode,
            submittedAt,
            photoOptOut: !!photoOptOut,
          }),
          attachments: [
            {
              filename: pdfFilename,
              content: pdfBuf,
            },
          ],
        });
        console.log(`[Waiver] Waiver PDF emailed to nathan@tocuppongchampions.ca`, pdfResult);
      } catch (err: any) {
        console.error(`[Waiver] Waiver PDF email failed:`, err);
        emailErrors.push(`PDF: ${err.message}`);
      }
    } else {
      console.log(`[Waiver TEST MODE] Skipping emails. Confirmation code: ${confirmationCode}`);
    }

    return NextResponse.json({
      success: true,
      confirmationCode,
      ...(emailErrors.length > 0 && { emailErrors }),
    });
  } catch (error: any) {
    console.error('[Waiver] Submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
