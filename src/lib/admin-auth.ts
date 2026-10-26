import crypto from "crypto";

// ============================================================
// PUSATPERIZINAN.COM — Admin Auth (ringan, tanpa dependency baru)
// Token = HMAC-SHA256(expiry) tersimpan di cookie httpOnly.
// Password diatur lewat env ADMIN_PASSWORD (fallback utk sandbox).
// ============================================================

export const ADMIN_COOKIE = "pp_admin_token";
const TTL_MS = 12 * 60 * 60 * 1000; // sesi 12 jam

function secret(): string {
  // Kredensial fallback hanya boleh dipakai saat development lokal.
  // Di production, admin wajib mengisi secret di environment hosting.
  return process.env.ADMIN_SECRET || (process.env.NODE_ENV === "production" ? "" : "pusatperizinan-mission-control-secret");
}

export function adminPassword(): string {
  // Jangan pernah menerima password bawaan admin2026 di production.
  return process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "admin2026");
}

function sign(payload: string): string {
  const key = secret();
  if (!key) throw new Error("ADMIN_SECRET wajib diatur di environment production.");
  return crypto.createHmac("sha256", key).update(payload).digest("hex");
}

export function createToken(): { token: string; maxAge: number } {
  if (
    process.env.NODE_ENV === "production" &&
    (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SECRET || process.env.ADMIN_SECRET.length < 32)
  ) {
    throw new Error("ADMIN_PASSWORD dan ADMIN_SECRET (minimal 32 karakter) wajib diatur di production.");
  }
  const expiry = Date.now() + TTL_MS;
  const payload = String(expiry);
  const token = `${payload}.${sign(payload)}`;
  return { token, maxAge: Math.floor(TTL_MS / 1000) };
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  if (
    process.env.NODE_ENV === "production" &&
    (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SECRET || process.env.ADMIN_SECRET.length < 32)
  ) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expiry = Number(payload);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;
  const expected = sign(payload);
  // perbandingan konstan-waktu sederhana
  if (expected.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}
