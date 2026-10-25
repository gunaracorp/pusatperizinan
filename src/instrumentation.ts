// ============================================================
// PUSATPERIZINAN.COM — INSTRUMENTATION SERVER (Langkah 68)
// ------------------------------------------------------------
// Error monitoring Sentry sisi server, ENV-GATED seperti GA4:
//   - SENTRY_DSN kosong → Sentry mati total (nol overhead)
//   - SENTRY_DSN terisi → init otomatis, error server terkirim
// Aktifasi: isi SENTRY_DSN (dan NEXT_PUBLIC_SENTRY_DSN untuk klien)
// di .env — tanpa perubahan kode.
// ============================================================

import { APP_VERSION } from "@/lib/version";

export async function register() {
  const dsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn || process.env.NEXT_RUNTIME === "edge") return;

  const Sentry = await import("@sentry/nextjs");
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV ?? "development",
    release: `v${APP_VERSION}`,
    tracesSampleRate: 0, // performa dulu; tracing off
    sendDefaultPii: false, // UU PDP: jangan kirim data pribadi
  });
}

// Hook error server-side Next.js (route handler, RSC, server action)
export async function onRequestError(
  error: unknown,
  request: { path: string; method: string; headers: unknown },
  context: unknown,
) {
  const Sentry = await import("@sentry/nextjs");
  await Sentry.captureRequestError(error, request, context);
}
