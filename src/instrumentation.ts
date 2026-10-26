// ============================================================
// PUSATPERIZINAN.COM — INSTRUMENTATION SERVER (Langkah 68 + Task 37)
// ------------------------------------------------------------
// 1. 🫀 Detak jantung follow-up (v1.14.1): sweep otomatis dari
//    dalam server — tanpa cron eksternal. Nonaktifkan via env
//    FOLLOWUP_SWEEP_MINUTES=0.
// 2. Error monitoring Sentry sisi server, ENV-GATED seperti GA4:
//    - SENTRY_DSN kosong → Sentry mati total (nol overhead)
//    - SENTRY_DSN terisi → init otomatis, error server terkirim
// Aktifasi: isi SENTRY_DSN (dan NEXT_PUBLIC_SENTRY_DSN untuk klien)
// di .env — tanpa perubahan kode.
// ============================================================

import { APP_VERSION } from "@/lib/version";

export async function register() {
  // Detak jantung & Sentry hanya runtime Node.js — bukan edge.
  if (process.env.NEXT_RUNTIME === "edge") return;

  // 🫀 Detak jantung follow-up (v1.14.1) — sweep otomatis tiap
  // 15 menit default; idempoten sehingga aman berdampingan dgn cron.
  const { startFollowUpScheduler } = await import("@/lib/scheduler");
  startFollowUpScheduler();

  const dsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;

  const Sentry = await import("@sentry/nextjs");
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV ?? "development",
    release: `v${APP_VERSION}`,
    tracesSampleRate: 0, // performa dulu; tracing off
    // Sentry does not send default PII unless explicitly enabled.
  });
}

// Hook error server-side Next.js (route handler, RSC, server action)
export async function onRequestError(
  error: unknown,
  request: { path: string; method: string; headers: Record<string, string | string[] | undefined> },
  context: unknown,
) {
  const Sentry = await import("@sentry/nextjs");
  await Sentry.captureRequestError(error, request, context);
}
