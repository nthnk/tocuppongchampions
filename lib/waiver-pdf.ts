import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont } from 'pdf-lib';
import { WAIVER_SECTIONS, RULES_SECTIONS, RULES_PREAMBLE } from './waiver-text';

interface WaiverPdfData {
  fullName: string;
  dateOfBirth: string;
  ageOnEvent: number;
  email: string;
  photoOptOut: boolean;
  signatureImageBase64: string;
  confirmationCode: string;
  submittedAt: string; // Toronto timezone formatted string
  ipAddress: string;
}

// Helper to wrap text into lines that fit within a given width
function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const lines: string[] = [];
  const paragraphs = text.split('\n');

  for (const paragraph of paragraphs) {
    if (paragraph.trim() === '') {
      lines.push('');
      continue;
    }
    const words = paragraph.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);

      if (width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines;
}

// Draw text lines on a page, creating new pages as needed
function drawTextBlock(
  doc: PDFDocument,
  pages: PDFPage[],
  text: string,
  font: PDFFont,
  fontSize: number,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  color = rgb(0, 0, 0)
): { page: PDFPage; y: number; pages: PDFPage[] } {
  const lines = wrapText(text, font, fontSize, maxWidth);
  let currentPage = pages[pages.length - 1];
  let currentY = y;

  for (const line of lines) {
    if (currentY < 50) {
      // New page
      currentPage = doc.addPage([612, 792]);
      pages.push(currentPage);
      currentY = 742;
    }

    if (line === '') {
      currentY -= lineHeight * 0.5;
      continue;
    }

    currentPage.drawText(line, { x, y: currentY, size: fontSize, font, color });
    currentY -= lineHeight;
  }

  return { page: currentPage, y: currentY, pages };
}

export async function generateWaiverPdf(data: WaiverPdfData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const margin = 50;
  const pageWidth = 612;
  const contentWidth = pageWidth - margin * 2;
  const bodySize = 8;
  const bodyLineHeight = 11;
  const headingSize = 11;
  const titleSize = 14;

  let page = doc.addPage([pageWidth, 792]);
  let pages = [page];
  let y = 742;

  // ===== HEADER =====
  page.drawText('6CUPS', { x: margin, y, size: 20, font: fontBold, color: rgb(0.96, 0.09, 0.07) });
  y -= 22;
  page.drawText('BEER PONG TOURNAMENT — THE FALL CLASSIC', { x: margin, y, size: 10, font: fontBold });
  y -= 16;
  page.drawText('EVENT WAIVER, RELEASE OF LIABILITY, ASSUMPTION OF RISK & INDEMNIFICATION AGREEMENT', { x: margin, y, size: 7, font: fontBold });
  y -= 12;
  page.drawText('Sunday, March 22, 2026  |  90 Cawthra Avenue, Toronto, Ontario, Canada', { x: margin, y, size: 7, font });
  y -= 10;
  page.drawText('THIS EVENT IS STRICTLY 19+  |  VALID GOVERNMENT-ISSUED PHOTO ID REQUIRED AT ENTRY', { x: margin, y, size: 7, font: fontBold, color: rgb(0.96, 0.09, 0.07) });
  y -= 16;

  // Line separator
  page.drawLine({ start: { x: margin, y }, end: { x: pageWidth - margin, y }, thickness: 1, color: rgb(0.2, 0.2, 0.2) });
  y -= 14;

  // ===== PREAMBLE =====
  const preamble = `IMPORTANT — READ THIS ENTIRE DOCUMENT CAREFULLY BEFORE SIGNING

This Waiver, Release of Liability, Assumption of Risk and Indemnification Agreement ("Agreement") is a legally binding contract. By signing this Agreement, the Participant acknowledges that they have read, understood, and voluntarily agree to all terms below. The Participant is giving up substantial legal rights, including the right to sue any Released Party.`;

  let result = drawTextBlock(doc, pages, preamble, font, bodySize, margin, y, contentWidth, bodyLineHeight);
  y = result.y - 10;
  pages = result.pages;

  // ===== WAIVER SECTIONS =====
  for (const section of WAIVER_SECTIONS) {
    // Section heading
    if (y < 60) {
      const newPage = doc.addPage([pageWidth, 792]);
      pages.push(newPage);
      y = 742;
    }
    const currentPage = pages[pages.length - 1];
    currentPage.drawText(`${section.number}. ${section.title}`, { x: margin, y, size: headingSize, font: fontBold });
    y -= 14;

    result = drawTextBlock(doc, pages, section.content, font, bodySize, margin, y, contentWidth, bodyLineHeight);
    y = result.y - 8;
    pages = result.pages;
  }

  // ===== RULES DOCUMENT =====
  // New page for rules
  const rulesPage = doc.addPage([pageWidth, 792]);
  pages.push(rulesPage);
  y = 742;

  rulesPage.drawText('6CUPS EVENT RULES & SAFETY GUIDELINES', { x: margin, y, size: titleSize, font: fontBold, color: rgb(0.96, 0.09, 0.07) });
  y -= 16;
  rulesPage.drawText('THIS DOCUMENT IS INCORPORATED BY REFERENCE INTO THE EVENT WAIVER', { x: margin, y, size: 7, font: fontBold });
  y -= 14;

  result = drawTextBlock(doc, pages, RULES_PREAMBLE, font, bodySize, margin, y, contentWidth, bodyLineHeight);
  y = result.y - 10;
  pages = result.pages;

  for (const section of RULES_SECTIONS) {
    if (y < 60) {
      const newPage = doc.addPage([pageWidth, 792]);
      pages.push(newPage);
      y = 742;
    }
    const cp = pages[pages.length - 1];
    cp.drawText(`${section.letter}. ${section.title}`, { x: margin, y, size: headingSize, font: fontBold });
    y -= 14;

    result = drawTextBlock(doc, pages, section.content, font, bodySize, margin, y, contentWidth, bodyLineHeight);
    y = result.y - 8;
    pages = result.pages;
  }

  // ===== PARTICIPANT DETAILS PAGE =====
  const detailsPage = doc.addPage([pageWidth, 792]);
  pages.push(detailsPage);
  y = 742;

  detailsPage.drawText('PARTICIPANT DECLARATION AND SIGNATURE', { x: margin, y, size: titleSize, font: fontBold });
  y -= 20;

  detailsPage.drawText('I, the undersigned, confirm that all information I have provided is true and accurate,', { x: margin, y, size: bodySize, font });
  y -= bodyLineHeight;
  detailsPage.drawText('that I am 19 years of age or older, that I have read and understood this entire Agreement', { x: margin, y, size: bodySize, font });
  y -= bodyLineHeight;
  detailsPage.drawText('and the 6CUPS Event Rules & Safety Guidelines, and that I voluntarily agree to be bound by all terms herein.', { x: margin, y, size: bodySize, font });
  y -= 24;

  // Line separator
  detailsPage.drawLine({ start: { x: margin, y }, end: { x: pageWidth - margin, y }, thickness: 0.5, color: rgb(0.5, 0.5, 0.5) });
  y -= 20;

  // Participant details
  const labelX = margin;
  const valueX = margin + 160;
  const detailLineHeight = 20;

  const details = [
    ['Full Legal Name:', data.fullName],
    ['Date of Birth:', data.dateOfBirth],
    ['Age on March 22, 2026:', String(data.ageOnEvent)],
    ['Email Address:', data.email],
    ['Photography Opt-Out:', data.photoOptOut ? 'YES — Does NOT consent to photography/filming' : 'NO — Consents to photography/filming'],
    ['Confirmation Code:', data.confirmationCode],
    ['Date & Time Signed:', data.submittedAt],
  ];

  for (const [label, value] of details) {
    detailsPage.drawText(label, { x: labelX, y, size: 9, font: fontBold });
    detailsPage.drawText(value, { x: valueX, y, size: 9, font });
    y -= detailLineHeight;
  }

  y -= 10;

  // Signature
  detailsPage.drawText('Participant Signature:', { x: labelX, y, size: 9, font: fontBold });
  y -= 10;

  // Draw signature image
  try {
    const sigBase64 = data.signatureImageBase64.replace(/^data:image\/png;base64,/, '');
    const sigBytes = Uint8Array.from(atob(sigBase64), c => c.charCodeAt(0));
    const sigImage = await doc.embedPng(sigBytes);
    const sigDims = sigImage.scale(0.4);
    const sigWidth = Math.min(sigDims.width, 250);
    const sigHeight = (sigWidth / sigDims.width) * sigDims.height;

    // Signature box
    detailsPage.drawRectangle({
      x: labelX,
      y: y - sigHeight - 5,
      width: 300,
      height: sigHeight + 10,
      borderColor: rgb(0.7, 0.7, 0.7),
      borderWidth: 0.5,
      color: rgb(1, 1, 1),
    });

    detailsPage.drawImage(sigImage, {
      x: labelX + 5,
      y: y - sigHeight,
      width: sigWidth,
      height: sigHeight,
    });

    y -= sigHeight + 25;
  } catch {
    detailsPage.drawText('[Signature image could not be rendered]', { x: labelX, y: y - 15, size: 8, font, color: rgb(0.5, 0.5, 0.5) });
    y -= 30;
  }

  // Footer line
  detailsPage.drawLine({ start: { x: margin, y }, end: { x: pageWidth - margin, y }, thickness: 0.5, color: rgb(0.5, 0.5, 0.5) });
  y -= 14;

  detailsPage.drawText(
    `Digitally signed via play6cups.com | ${data.submittedAt} | IP: ${data.ipAddress}`,
    { x: margin, y, size: 7, font, color: rgb(0.4, 0.4, 0.4) }
  );
  y -= 12;
  detailsPage.drawText(
    '6CUPS  |  March 22, 2026  |  90 Cawthra Avenue, Toronto, Ontario, Canada  |  Version 3.0 — Final',
    { x: margin, y, size: 7, font, color: rgb(0.4, 0.4, 0.4) }
  );

  return doc.save();
}
