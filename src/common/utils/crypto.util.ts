import * as crypto from 'crypto';

/**
 * Generate a 6-digit OTP code
 */
export function generateOTP(): string {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Generate a random token
 */
export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Hash a string using SHA256
 */
export function hashString(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}
