// ============================================================
// PUSATPERIZINAN.COM — INSTRUMENTATION CLIENT (Langkah 68)
// ------------------------------------------------------------
// Error monitoring Sentry sisi klien (browser), ENV-GATED:
//   - NEXT_PUBLIC_SENTRY_DSN kosong → SDK tidak pernah dimuat
//     (bundle klien tetap ramping, nol overhead CWV)
//   - NEXT_PUBLIC_SENTRY_DSN terisi → SDK dimuat lazy lalu init
// ============================================================

import { APP_VERSION } from "@/lib/version";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  void import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn,
      environment: process.env.NODE_ENV ?? "development",
      release: `v${APP_VERSION}`,
      tracesSampleRate: 0,
      sendDefaultPii: false, // UU PDP: jangan kirim data pribadi
    });
  });
}
