// Stateless HMAC-based OTP verification
// Works across serverless function instances (no shared memory needed)

import crypto from 'crypto';

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const OTP_SECRET = process.env.OTP_SECRET || process.env.STRIPE_SECRET_KEY || 'fallback-otp-secret-key';

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Creates a signed token containing the OTP code, email, form data, and expiry.
 * The token is sent to the client and returned during verification.
 * No server-side state is needed.
 */
export function createOTPToken(email: string, code: string, formData: any): string {
  const expiresAt = Date.now() + OTP_EXPIRY_MS;
  const payload = {
    email: email.toLowerCase(),
    code,
    formData,
    expiresAt,
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto
    .createHmac('sha256', OTP_SECRET)
    .update(payloadStr)
    .digest('hex');

  return `${payloadStr}.${signature}`;
}

/**
 * Verifies an OTP code against a signed token.
 * Returns the form data if valid, or an error message if not.
 */
export function verifyOTP(
  token: string,
  email: string,
  code: string
): { valid: boolean; formData?: any; error?: string } {
  if (!token) {
    return { valid: false, error: 'No verification token found. Please request a new code.' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, error: 'Invalid verification token. Please request a new code.' };
  }

  const [payloadStr, signature] = parts;

  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', OTP_SECRET)
    .update(payloadStr)
    .digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSignature, 'hex'))) {
    return { valid: false, error: 'Invalid verification token. Please request a new code.' };
  }

  // Decode payload
  let payload: any;
  try {
    payload = JSON.parse(Buffer.from(payloadStr, 'base64').toString());
  } catch {
    return { valid: false, error: 'Invalid verification token. Please request a new code.' };
  }

  // Check expiry
  if (Date.now() > payload.expiresAt) {
    return { valid: false, error: 'Code has expired. Please request a new one.' };
  }

  // Check email matches
  if (payload.email !== email.toLowerCase()) {
    return { valid: false, error: 'Email mismatch. Please request a new code.' };
  }

  // Check code matches
  if (payload.code !== code) {
    return { valid: false, error: 'Invalid code. Please try again.' };
  }

  return { valid: true, formData: payload.formData };
}

// Rate limiting is best-effort on serverless (in-memory won't persist across instances)
// but still helps within a single instance's lifetime
interface RateLimitData {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitData>();
const MAX_OTP_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export function checkRateLimit(email: string): { allowed: boolean; error?: string } {
  const key = email.toLowerCase();
  const now = Date.now();
  const rateLimit = rateLimitStore.get(key);

  if (!rateLimit || now > rateLimit.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  if (rateLimit.count >= MAX_OTP_REQUESTS) {
    const minutesLeft = Math.ceil((rateLimit.resetAt - now) / 60000);
    return {
      allowed: false,
      error: `Too many OTP requests. Please try again in ${minutesLeft} minutes.`,
    };
  }

  rateLimit.count++;
  return { allowed: true };
}
