import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'waivers.db');

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    // Ensure data directory exists
    const fs = require('fs');
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');

    // Create tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS waivers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        confirmation_code TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        date_of_birth TEXT NOT NULL,
        age_on_event INTEGER NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        photo_opt_out INTEGER NOT NULL DEFAULT 0,
        signature_data TEXT NOT NULL,
        ip_address TEXT NOT NULL,
        drive_upload_status TEXT NOT NULL DEFAULT 'pending',
        drive_file_id TEXT,
        submitted_at TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS failed_uploads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        confirmation_code TEXT NOT NULL,
        pdf_data BLOB NOT NULL,
        filename TEXT NOT NULL,
        error_message TEXT,
        retry_count INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (confirmation_code) REFERENCES waivers(confirmation_code)
      );

      CREATE INDEX IF NOT EXISTS idx_waivers_code ON waivers(confirmation_code);
      CREATE INDEX IF NOT EXISTS idx_waivers_name ON waivers(full_name);
      CREATE INDEX IF NOT EXISTS idx_waivers_email ON waivers(email);
    `);
  }
  return db;
}

export interface WaiverRecord {
  id?: number;
  confirmation_code: string;
  full_name: string;
  date_of_birth: string;
  age_on_event: number;
  email: string;
  phone: string;
  photo_opt_out: boolean;
  signature_data: string;
  ip_address: string;
  drive_upload_status: string;
  drive_file_id?: string;
  submitted_at: string;
}

export function insertWaiver(waiver: WaiverRecord): void {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO waivers (confirmation_code, full_name, date_of_birth, age_on_event, email, phone, photo_opt_out, signature_data, ip_address, drive_upload_status, drive_file_id, submitted_at)
    VALUES (@confirmation_code, @full_name, @date_of_birth, @age_on_event, @email, @phone, @photo_opt_out, @signature_data, @ip_address, @drive_upload_status, @drive_file_id, @submitted_at)
  `);
  stmt.run({
    ...waiver,
    photo_opt_out: waiver.photo_opt_out ? 1 : 0,
    drive_file_id: waiver.drive_file_id || null,
  });
}

export function updateDriveStatus(confirmationCode: string, status: string, fileId?: string): void {
  const db = getDb();
  const stmt = db.prepare(`
    UPDATE waivers SET drive_upload_status = ?, drive_file_id = ? WHERE confirmation_code = ?
  `);
  stmt.run(status, fileId || null, confirmationCode);
}

export function insertFailedUpload(confirmationCode: string, pdfData: Buffer, filename: string, errorMessage: string): void {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO failed_uploads (confirmation_code, pdf_data, filename, error_message)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(confirmationCode, pdfData, filename, errorMessage);
}

export function getAllWaivers(): (WaiverRecord & { id: number })[] {
  const db = getDb();
  const rows = db.prepare(`
    SELECT * FROM waivers ORDER BY created_at DESC
  `).all() as any[];
  return rows.map(row => ({
    ...row,
    photo_opt_out: !!row.photo_opt_out,
  }));
}

export function searchWaivers(query: string): (WaiverRecord & { id: number })[] {
  const db = getDb();
  const searchTerm = `%${query}%`;
  const rows = db.prepare(`
    SELECT * FROM waivers
    WHERE full_name LIKE ? OR confirmation_code LIKE ? OR email LIKE ?
    ORDER BY created_at DESC
  `).all(searchTerm, searchTerm, searchTerm) as any[];
  return rows.map(row => ({
    ...row,
    photo_opt_out: !!row.photo_opt_out,
  }));
}

export function getWaiverByCode(code: string): (WaiverRecord & { id: number }) | undefined {
  const db = getDb();
  const row = db.prepare(`SELECT * FROM waivers WHERE confirmation_code = ?`).get(code) as any;
  if (!row) return undefined;
  return { ...row, photo_opt_out: !!row.photo_opt_out };
}

export function checkDuplicateEmail(email: string): boolean {
  const db = getDb();
  const row = db.prepare(`SELECT COUNT(*) as count FROM waivers WHERE email = ?`).get(email) as any;
  return row.count > 0;
}

export function generateConfirmationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I/O/0/1 for clarity
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `6CUPS-${code}`;
}

export function buildPdfFilename(fullName: string, confirmationCode: string): string {
  const nameParts = fullName.toUpperCase().split(' ');
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0];
  const firstName = nameParts[0];
  return `WAIVER_${lastName}_${firstName}_${confirmationCode}.pdf`;
}
