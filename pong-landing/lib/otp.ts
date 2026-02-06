// In-memory OTP storage (for development/small scale)
// In production, consider using Redis or a database

interface OTPData {
  code: string;
  email: string;
  formData: {
    teamName: string;
    player1FirstName: string;
    player1LastName: string;
    player2FirstName: string;
    player2LastName: string;
    email: string;
  };
  expiresAt: number;
  attempts: number;
}

interface RateLimitData {
  count: number;
  resetAt: number;
}

// Store OTPs temporarily (clears on server restart)
const otpStore = new Map<string, OTPData>();

// Rate limiting store
const rateLimitStore = new Map<string, RateLimitData>();

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const MAX_OTP_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOTP(email: string, code: string, formData: any): void {
  const key = email.toLowerCase();
  otpStore.set(key, {
    code,
    email,
    formData,
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    attempts: 0,
  });
}

export function verifyOTP(email: string, code: string): { valid: boolean; formData?: any; error?: string } {
  const key = email.toLowerCase();
  const otpData = otpStore.get(key);

  if (!otpData) {
    return { valid: false, error: 'No OTP found. Please request a new code.' };
  }

  if (Date.now() > otpData.expiresAt) {
    otpStore.delete(key);
    return { valid: false, error: 'OTP has expired. Please request a new code.' };
  }

  if (otpData.attempts >= 5) {
    otpStore.delete(key);
    return { valid: false, error: 'Too many failed attempts. Please request a new code.' };
  }

  if (otpData.code !== code) {
    otpData.attempts++;
    return { valid: false, error: 'Invalid code. Please try again.' };
  }

  // Success - return form data and clean up
  const formData = otpData.formData;
  otpStore.delete(key);
  return { valid: true, formData };
}

export function checkRateLimit(email: string): { allowed: boolean; error?: string } {
  const key = email.toLowerCase();
  const now = Date.now();
  const rateLimit = rateLimitStore.get(key);

  if (!rateLimit || now > rateLimit.resetAt) {
    // New window or expired window
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

export function cleanupExpiredOTPs(): void {
  const now = Date.now();
  for (const [key, data] of otpStore.entries()) {
    if (now > data.expiresAt) {
      otpStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupExpiredOTPs, 5 * 60 * 1000);
