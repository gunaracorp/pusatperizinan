// ============================================================
// src/lib/version.ts — SINGLE SOURCE OF TRUTH VERSI APLIKASI
// ============================================================
// ⭐ Diperkenalkan di v1.4.0 "Version Master" (2026-10-22).
// Semua tampilan versi (footer, JSON-LD, /api/version) WAJIB
// membaca dari file ini — dilarang hardcode nomor versi di
// tempat lain. Checklist rilis baru ada di CHANGELOG.md §
// "Aturan Versioning Proyek Ini".
//
// Aturan (SemVer 2.0.0): MAJOR = perombakan arah produk /
// breaking change · MINOR = fitur baru · PATCH = bug fix.
// Ritme proyek: 1 task = 1 nomor versi.

export const APP_NAME = "PusatPerizinan.com";
export const APP_DOMAIN = "pusatperizinan.com";
export const APP_TAGLINE =
  "Konsultan Perizinan, Perpajakan & Penempatan PMI #1 Indonesia";

/** Versi berjalan — tanpa prefiks "v" (SemVer murni). */
export const APP_VERSION = "1.7.0";
/** Nama rilis berjalan. */
export const RELEASE_NAME = "Konten Raja";
/** Tanggal rilis berjalan (WIB — Asia/Jakarta). */
export const RELEASE_DATE = "2026-10-25";
/** Channel rilis: stable | beta | alpha. */
export const RELEASE_CHANNEL = "stable" as const;

export type ReleaseType = "major" | "minor" | "patch";

export interface ReleaseEntry {
  /** SemVer tanpa prefiks "v", mis. "1.4.0". */
  version: string;
  /** Tanggal rilis (WIB); era fondasi 0.x presisi bulan. */
  date: string;
  type: ReleaseType;
  /** Nama kode rilis. */
  name: string;
  /** Task ID di WORKLOG.md yang menghasilkan rilis ini. */
  taskId: string;
  /** 1–3 sorotan utama. */
  highlights: string[];
}

/**
 * Riwayat lengkap 20 rilis — urut TERBARU lebih dulu.
 * Sumber: CHANGELOG.md (1:1 dengan WORKLOG.md).
 */
export const RELEASES: ReleaseEntry[] = [
  {
    version: "1.7.0",
    date: "2026-10-25",
    type: "minor",
    name: "Konten Raja",
    taskId: "23",
    highlights: [
      "Anti-thin content (langkah 33): prosa deterministik ±300 kata di 1.000 halaman Katalog v2/v3 + 65 halaman induk v1 — 100% kombinasi unik",
      "rich-content.ts: 4 paragraf business-real (konteks, dokumen & jebakan, timeline jujur, kewajiban pasca-terbit) — FNV-1a stabil antar build",
      "Fix overflow mobile latent: link bundle truncate wajib display:block + FAQ syarat sadar-kurung (tidak terpotong di dalam \"(...)\")",
    ],
  },
  {
    version: "1.6.0",
    date: "2026-10-25",
    type: "minor",
    name: "Peta Nusantara",
    taskId: "22",
    highlights: [
      "Halaman kota level-3 diperluas 94 → 516 hub: seluruh 514 kab/kota resmi (BPS 2022) + 2 alias existing (langkah 25)",
      "Data baru kabkota-data.ts (516 entri terverifikasi per provinsi, nol duplikat slug, nol perubahan URL lama)",
      "/wilayah jadi engine internal-linking 554 halaman lokal + ItemList JSON-LD 516 kab/kota — indeks 11.207 → 11.629 URL",
    ],
  },
  {
    version: "1.5.0",
    date: "2026-10-24",
    type: "minor",
    name: "SEO Titan",
    taskId: "21",
    highlights: [
      "FAQPage + HowTo schema & section nyata di 1.000 halaman Katalog v2/v3 (langkah 23)",
      "Ringkasan Cepat 40–60 kata (featured snippet) + internal-linking 38 hub wilayah (langkah 24/27)",
      "E-E-A-T blog (author url/knowsAbout + speakable) & perf: i18n lazy-load + chat widget idle-mount",
    ],
  },
  {
    version: "1.4.0",
    date: "2026-10-22",
    type: "minor",
    name: "Version Master",
    taskId: "20",
    highlights: [
      "Sistem versi SemVer 2.0.0 resmi: 20 rilis dipetakan dari seluruh riwayat",
      "CHANGELOG.md Keep a Changelog 1.1.0 + WORKLOG.md (rename) ber-tag versi",
      "GET /api/version + badge versi di footer 11.207 halaman + softwareVersion JSON-LD",
    ],
  },
  {
    version: "1.3.0",
    date: "2026-10-21",
    type: "minor",
    name: "Search Master",
    taskId: "19",
    highlights: [
      "Panel /webmaster: verifikasi 26 mesin pencari 4 tier — Google diprioritaskan",
      "API IndexNow terbukti hidup (ping 202 diterima jaringan nyata)",
      "Meta verifikasi 6 mesin via env + robots.txt diperbaiki (2 sitemap hilang)",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-10-21",
    type: "minor",
    name: "Blueprint 99",
    taskId: "18",
    highlights: [
      "ROADMAP-99.md: 99 langkah penyempurnaan dalam 12 fase (TERSIMPAN, belum dieksekusi)",
      "Quick Wins Top-10 + 3 Horison pertumbuhan + milestone kuartalan",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-10-21",
    type: "minor",
    name: "Emerald Docs",
    taskId: "17",
    highlights: [
      "README bilingual ID/EN 1.427 baris dengan full design animatif (53/53 anchor valid)",
      "WORKLOG terlengkap 650 baris + Lampiran statistik & peta artefak",
    ],
  },
  {
    version: "1.0.1",
    date: "2026-10-21",
    type: "patch",
    name: "Restart",
    taskId: "fix-preview",
    highlights: [
      "Fix preview hanya logo Z: dev server mati antar sesi — restart + E2E penuh",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "major",
    name: "Mesin Revenue",
    taskId: "16",
    highlights: [
      "KepatuhanPRO MRR 6 SKU (Rp 499rb–39,9jt) + Instant Order 1.500 layanan",
      "Bundle hemat 10% + social proof di 1.000 halaman + hub /wilayah 38 provinsi",
      "Harga dikunci server-side (anti-manipulasi) — 11.207 URL terindeks",
    ],
  },
  {
    version: "0.10.0",
    date: "2026-10",
    type: "minor",
    name: "Pro v3",
    taskId: "4-a/b/c, 5 (Sesi 2)",
    highlights: [
      "Katalog v3: 500 layanan PP3-XX-NNN (6 kategori baru, lifecycle) → 11.206 URL",
    ],
  },
  {
    version: "0.9.1",
    date: "2026-10",
    type: "patch",
    name: "Phoenix",
    taskId: "1 reinstall (Sesi 2)",
    highlights: ["Clone ulang sandbox + seed 132 data demo + resep OOM-safe"],
  },
  {
    version: "0.9.0",
    date: "2026-10",
    type: "minor",
    name: "Premium v2",
    taskId: "14",
    highlights: [
      "Katalog v2: 500 layanan PP-XX-NNN dari file 'Terlengkap Se Asia' → 10.706 URL",
      "Total hemat katalog Rp 3,55 M — integrasi aditif, nol URL rusak",
    ],
  },
  {
    version: "0.8.0",
    date: "2026-10",
    type: "minor",
    name: "Kemitraan",
    taskId: "13",
    highlights: ["Program Kemitraan /mitra: 3 tier komisi + simulasi profit"],
  },
  {
    version: "0.7.0",
    date: "2026-10",
    type: "minor",
    name: "Funnel Emas",
    taskId: "12 / 12-b",
    highlights: [
      "4 halaman dedikasi CTA + 19 CTA sitewide diarahkan + 2 bug produksi dimitigasi",
    ],
  },
  {
    version: "0.6.1",
    date: "2026-10",
    type: "patch",
    name: "Dokumen Hidup",
    taskId: "11",
    highlights: ["README 959 baris berbasis kode aktual"],
  },
  {
    version: "0.6.0",
    date: "2026-10",
    type: "minor",
    name: "Mesin Deploy",
    taskId: "10",
    highlights: [
      "/download + AdminDeploy + pipeline static export cPanel (MD5, badge kesegaran)",
    ],
  },
  {
    version: "0.5.0",
    date: "2026-10",
    type: "minor",
    name: "Kepercayaan Visual",
    taskId: "8–9",
    highlights: ["5 foto kantor asli + mega-dropdown 5 grup + galeri beranda"],
  },
  {
    version: "0.4.1",
    date: "2026-10",
    type: "patch",
    name: "Patch Sitemap",
    taskId: "7",
    highlights: [
      "EMERGENCY: fix sitemap 500 sitewide → arsitektur sitemap permanen",
    ],
  },
  {
    version: "0.4.0",
    date: "2026-10",
    type: "minor",
    name: "Gerak & Presisi",
    taskId: "6-a/b/c/final",
    highlights: [
      "Motion system compositor-only + audit SEO 25 masukan + rebuild /kontak",
    ],
  },
  {
    version: "0.3.0",
    date: "2026-10",
    type: "minor",
    name: "Nusantara 30 Bahasa",
    taskId: "4-a/b, 4, 5",
    highlights: [
      "UI 30 bahasa (RTL penuh) + FAQ 51 Q&A + privasi v2.0 (UU PDP + GDPR)",
    ],
  },
  {
    version: "0.2.0",
    date: "2026-10",
    type: "minor",
    name: "Katalog 500",
    taskId: "3",
    highlights: ["500 layanan BU-XX-NNN + sitemap 10.201 URL + rebranding"],
  },
  {
    version: "0.1.1",
    date: "2026-10",
    type: "patch",
    name: "Verifikasi Pertama",
    taskId: "2",
    highlights: ["E2E agent-browser: lead → SQLite → dashboard admin"],
  },
  {
    version: "0.1.0",
    date: "2026-10",
    type: "minor",
    name: "Fondasi",
    taskId: "1",
    highlights: [
      "Instalasi repo GitHub penuh: 12 model Prisma + Admin + checkout + 5 alat AI",
    ],
  },
];

/** Entri rilis berjalan (elemen pertama RELEASES). */
export const CURRENT_RELEASE: ReleaseEntry = RELEASES[0];

/** Statistik platform yang dikirim /api/version — singkron dengan site.ts. */
export const PLATFORM_STATS = {
  indexedUrls: 11629,
  sitemapSections: 14,
  orderableServices: 1500,
  subscriptionSkus: 6,
  languages: 30,
  aiTools: 5,
  provinces: 38,
  prismaModels: 12,
} as const;

/** Ringkasan ringkas untuk tampilan footer/chip. */
export function versionLabel(): string {
  return `v${APP_VERSION}`;
}

/** Label panjang, mis. "v1.4.0 — Version Master". */
export function versionFullLabel(): string {
  return `v${APP_VERSION} — ${RELEASE_NAME}`;
}

/** Validasi ringan format SemVer (dipakai API untuk sanity check). */
export function isSemVer(v: string): boolean {
  return /^\d+\.\d+\.\d+$/.test(v);
}
