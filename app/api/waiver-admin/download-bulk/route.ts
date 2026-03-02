import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import archiver from 'archiver';
import { getWaiverByCode, buildPdfFilename } from '@/lib/waiver-db';
import { generateWaiverPdf } from '@/lib/waiver-pdf';

const PDF_DIR = path.join(process.cwd(), 'data', 'waivers-pdf');

export async function POST(request: NextRequest) {
  try {
    const { password, confirmationCodes } = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    if (!Array.isArray(confirmationCodes) || confirmationCodes.length === 0) {
      return NextResponse.json({ error: 'No confirmation codes provided.' }, { status: 400 });
    }

    // Collect all PDFs
    const pdfs: { filename: string; data: Buffer | Uint8Array }[] = [];

    for (const code of confirmationCodes) {
      const waiver = getWaiverByCode(code);
      if (!waiver) continue;

      const filename = buildPdfFilename(waiver.full_name, waiver.confirmation_code);

      let pdfBytes: Buffer | Uint8Array;
      try {
        pdfBytes = await readFile(path.join(PDF_DIR, filename));
      } catch {
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

      pdfs.push({ filename, data: pdfBytes });
    }

    if (pdfs.length === 0) {
      return NextResponse.json({ error: 'No valid waivers found.' }, { status: 404 });
    }

    // Build zip in memory
    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
      const archive = archiver('zip', { zlib: { level: 5 } });
      archive.on('data', (chunk: Buffer) => chunks.push(chunk));
      archive.on('end', () => resolve());
      archive.on('error', (err: Error) => reject(err));

      for (const pdf of pdfs) {
        archive.append(Buffer.from(pdf.data), { name: pdf.filename });
      }

      archive.finalize();
    });

    const zipBuffer = Buffer.concat(chunks);

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="waivers-bulk.zip"',
      },
    });
  } catch (error: any) {
    console.error('[Waiver Admin Bulk Download] Error:', error);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
