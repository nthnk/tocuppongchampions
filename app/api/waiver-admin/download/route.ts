import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { getWaiverByCode, buildPdfFilename } from '@/lib/waiver-db';
import { generateWaiverPdf } from '@/lib/waiver-pdf';

const PDF_DIR = path.join(process.cwd(), 'data', 'waivers-pdf');

export async function POST(request: NextRequest) {
  try {
    const { password, confirmationCode } = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    if (!confirmationCode) {
      return NextResponse.json({ error: 'Missing confirmation code.' }, { status: 400 });
    }

    const waiver = getWaiverByCode(confirmationCode);
    if (!waiver) {
      return NextResponse.json({ error: 'Waiver not found.' }, { status: 404 });
    }

    const filename = buildPdfFilename(waiver.full_name, waiver.confirmation_code);

    // Try local file first
    let pdfBytes: Buffer | Uint8Array;
    try {
      pdfBytes = await readFile(path.join(PDF_DIR, filename));
    } catch {
      // Regenerate from DB
      pdfBytes = await generateWaiverPdf({
        fullName: waiver.full_name,
        dateOfBirth: waiver.date_of_birth,
        ageOnEvent: waiver.age_on_event,
        email: waiver.email,
        phone: waiver.phone,
        photoOptOut: waiver.photo_opt_out,
        signatureImageBase64: waiver.signature_data,
        confirmationCode: waiver.confirmation_code,
        submittedAt: waiver.submitted_at,
        ipAddress: waiver.ip_address,
      });
    }

    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error('[Waiver Admin Download] Error:', error);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
