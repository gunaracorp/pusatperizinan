// ============================================================
// PUSATPERIZINAN.COM — Next Config
// DEV/PRODUCTION: Next.js standalone output for Node.js hosting.
// Use Webpack for production builds to avoid the Hostinger Turbopack
// CSS worker process failure observed in the deployment logs.
// ============================================================

import type { NextConfig } from "next";

// NEXT_CPU_COUNT is an application-defined build variable (not a built-in
// Next.js environment variable). Default to 2 on constrained builders and
// clamp overrides to 1..4 so a generous reported CPU count cannot create
// an oversized worker pool.
const requestedBuildCpus = Number(process.env.NEXT_CPU_COUNT ?? "2");
const buildCpus =
  Number.isInteger(requestedBuildCpus) && requestedBuildCpus > 0
    ? Math.min(requestedBuildCpus, 4)
    : 2;

// ============================================================
// SECURITY HEADERS — ROADMAP-99 langkah 69 (v1.21.0 "Benteng Digital")
// ============================================================
// Satu sumber kebenaran untuk seluruh header keamanan pada deployment
// Node standalone (Hostinger/VPS). Header sama juga ditulis di .htaccess
// untuk jalur hosting statis (Apache/LiteSpeed) — ubah KEDUANYA bila
// daftar origin integrasi berubah.
//
// Mode CSP: default ENFORCE. Untuk rollout aman di produksi, set
// CSP_REPORT_ONLY="true" di env → CSP dikirim sebagai
// Content-Security-Policy-Report-Only (laporan pelanggaran tanpa
// memblokir apa pun) sampai laporan bersih, lalu matikan lagi.
//
// Origin integrasi (semua env-gated di kode, hanya dimuat bila kunci
// produksi terpasang): GA4 (googletagmanager/google-analytics),
// Microsoft Clarity (clarity.ms), Sentry (ingest.sentry.io),
// Midtrans Snap (app.midtrans.com / app.sandbox.midtrans.com).
// Server-side calls (Telegram/Fonnte/Wablas/Tripay) tidak lewat browser,
// sehingga tidak masuk CSP.
// ============================================================
const isDev = process.env.NODE_ENV !== "production";
const cspReportOnly = process.env.CSP_REPORT_ONLY === "true";
const CSP_HEADER_NAME = cspReportOnly
  ? "Content-Security-Policy-Report-Only"
  : "Content-Security-Policy";

const CSP_PARTS = [
  "default-src 'self'",
  // 'unsafe-inline' script: diperlukan bootstrap/hydration Next.js.
  // 'unsafe-eval' hanya dev (React refresh + Turbopack HMR).
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.clarity.ms https://app.midtrans.com https://app.sandbox.midtrans.com https://*.sentry.io`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.clarity.ms https://*.ingest.sentry.io https://*.sentry.io${isDev ? " ws: http://localhost:* http://127.0.0.1:*" : ""}`,
  "frame-src 'self' https://app.midtrans.com https://app.sandbox.midtrans.com",
  "worker-src 'self' blob:",
  // Modern replacement X-Frame-Options — larang semua embed/iframe pihak luar.
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // Naikkan http → https (produksi; dev http lokal dikecualikan).
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
];
const CSP_VALUE = CSP_PARTS.join("; ");

const SECURITY_HEADERS: Array<{ key: string; value: string }> = [
  { key: CSP_HEADER_NAME, value: CSP_VALUE },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), display-capture=(), interest-cohort=()",
  },
  // Browser mengabaikan HSTS di http — aman dikirim di dev/prod.
  // "preload" sengaja belum dipakai (komitmen permanen; nyalakan setelah
  // seluruh subdomain siap HTTPS).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  // same-origin-allow-popups: popup Midtrans Snap tetap bisa postMessage
  // ke halaman checkout (COOP "same-origin" akan memutus komunikasi itu).
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/orm-postgres"],
  output: "standalone",
  // Hardening: jangan bocorkan stack/framework di header respons.
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Berlaku untuk semua rute (HTML, API, aset) — "/:path*" mencakup "/".
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
  experimental: {
    cpus: buildCpus,
    // Lower per-worker page-generation concurrency for process-limited builders.
    staticGenerationMaxConcurrency: 2,
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/sitemap.xml", destination: "/api/sitemap-index" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // ========================================================
      // PULIHAN GSC "Tidak ditemukan (404)": 12 slug lowongan lama
      // (dihapus saat rekrutmen di-restrukturisasi) masih dikunjungi
      // Google dari sitemap versi lama. 301/308 ke hub lowongan agar
      // sinyal lama menyatu, tidak terbuang sebagai 404.
      // ========================================================
      { source: "/lowongan-kerja/account-executive-pajak", destination: "/lowongan-kerja", permanent: true },
      { source: "/lowongan-kerja/content-writer-seo", destination: "/lowongan-kerja", permanent: true },
      { source: "/lowongan-kerja/coordinator-penempatan-pmi", destination: "/lowongan-kerja", permanent: true },
      { source: "/lowongan-kerja/data-entry-oss-lkpm", destination: "/lowongan-kerja", permanent: true },
      { source: "/lowongan-kerja/digital-marketing-specialist", destination: "/lowongan-kerja", permanent: true },
      { source: "/lowongan-kerja/graphic-designer", destination: "/lowongan-kerja", permanent: true },
      { source: "/lowongan-kerja/konsultan-junior-perizinan-umkm", destination: "/lowongan-kerja", permanent: true },
      { source: "/lowongan-kerja/legal-officer", destination: "/lowongan-kerja", permanent: true },
      { source: "/lowongan-kerja/marketing-consultant-perizinan", destination: "/lowongan-kerja", permanent: true },
      { source: "/lowongan-kerja/staf-administrasi-legalitas", destination: "/lowongan-kerja", permanent: true },
      { source: "/lowongan-kerja/telemarketing-inside-sales", destination: "/lowongan-kerja", permanent: true },
      { source: "/lowongan-kerja/trainer-bahasa-jepang-lpk", destination: "/lowongan-kerja", permanent: true },
    ];
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,
};

export default nextConfig;
