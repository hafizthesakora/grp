import bcrypt from "bcryptjs";
import crypto from "crypto";

const BCRYPT_PREFIX = /^\$2[aby]\$/;

export function isLegacyHash(hash: string): boolean {
  return !BCRYPT_PREFIX.test(hash);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Pre-bcrypt accounts were hashed with unsalted SHA256 — still accepted here so
// existing accounts keep working; callers should rehash with hashPassword() on
// successful legacy verification (see isLegacyHash).
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (BCRYPT_PREFIX.test(hash)) {
    return bcrypt.compare(password, hash);
  }
  const legacyHash = crypto.createHash("sha256").update(password).digest("hex");
  return legacyHash === hash;
}
