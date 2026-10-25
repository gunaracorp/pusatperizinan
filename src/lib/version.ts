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
export const APP_VERSION = "1.12.0";
/** Nama rilis berjalan. */
export const RELEASE_NAME = "Identitas Resmi";
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
    version: "1.12.0",
    date: "2026-10-25",
    type: "minor",
    name: "Identitas Resmi",
    taskId: "28",
    highlights: [
      "Entitas legal resmi situs → PT Top Konsultan Internasional: satu sumber LEGAL_ENTITY (site.ts) mengalir ke JSON-LD legalName/alternateName, meta publisher, /kontak, /kebijakan-privasi (id+en), FAQ invoice, halaman biaya & generator katalog, dokumen deploy publik",
      "Kredit support system → \"Support system by PT Digital Bisnis Manajemen — digiman.id\" di 30 locale footer + badge footer jadi tautan digiman.id; © footer kini atas nama PT Top Konsultan Internasional",
      "/tentang-kami: kartu Badan Usaha memuat entitas + dukungan sistem (tautan digiman.id); konstanta baru SUPPORT_SYSTEM + SUPPORT_SYSTEM_URL di site.ts",
    ],
  },
  {
    version: "1.11.0",
    date: "2026-10-25",
    type: "minor",
    name: "Sapa Langsung",
    taskId: "27",
    highlights: [
      "Floating WhatsApp CTA sitewide (langkah 5): tombol WA melayang di seluruh halaman publik dengan pesan kontekstual berisi URL halaman aktif + event GA4 whatsapp_click — sembunyi otomatis di /, /admin, /webmaster, /checkout; nomor tunggal dari landing-data.ts",
      "Langkah 3 tuntas: blok bundle \"Sering Diambil Bersama — Paket Hemat 10%\" kini juga di 500 halaman detail v1 (sebelumnya hanya v2/v3) — 2 pelengkap lintas kategori deterministik FNV-1a, CTA WA bundle + checkout tunggal",
      "Microsoft Clarity env-gated (langkah 4, kode siap): pasang NEXT_PUBLIC_CLARITY_ID di env → heatmap & session recording aktif tanpa deploy ulang kode; QA verify-order-cta.ts PASS",
    ],
  },
  {
    version: "1.10.0",
    date: "2026-10-25",
    type: "minor",
    name: "Mesin Redaksi",
    taskId: "26",
    highlights: [
      "Kalender editorial blog 3×/minggu (langkah 35): Senin=Panduan · Rabu=Regulasi (berita) · Jumat=Tips Pajak — berjalan penuh di CMS admin (Mission Control → Konten & SEO → tab Kalender Editorial)",
      "Bank topik kurasi 36 topik (12 minggu × 3 pilar) digulir otomatis & idempoten — slot bisa diedit, diganti dari bank, dilewati, dan satu-klik 'Tulis draft' membuat Post CMS ter-prefill (judul, kategori, kata kunci, sudut pandang, kerangka 3 H2)",
      "Siklus PLANNED → DRAFTED → PUBLISHED tersinkron otomatis dengan siklus hidup Post (terbit/unpublish/hapus), model EditorialSlot + API /api/admin/editorial + QA verify-editorial.ts PASS",
    ],
  },
  {
    version: "1.9.0",
    date: "2026-10-25",
    type: "minor",
    name: "Kamus Raja",
    taskId: "25",
    highlights: [
      "Glosarium 214 istilah perizinan (langkah 41): 8 kategori — dasar/OSS, badan usaha, pajak, sektor, ketenagakerjaan, ekspor-impor, regulasi, proses — definisi 30-60 kata + 2 paragraf pendalaman + dasar hukum eksplisit",
      "Schema DefinedTerm + BreadcrumbList per istilah dan DefinedTermSet (214 hasDefinedTerm) di indeks — ramah featured snippet sekaligus rujukan kutipan AI/LLM",
      "Sitemap seksi glosarium (214 URL) + llms.txt + nav header & footer; indeks 11.661 → 11.876 URL, seksi sitemap 14 → 15",
    ],
  },
  {
    version: "1.8.0",
    date: "2026-10-25",
    type: "minor",
    name: "Arena Banding",
    taskId: "24",
    highlights: [
      "Langkah 34 — arena perbandingan 48 → 78 halaman: +30 pasangan programatik dari katalog nyata (ISO, pajak, PMI, virtual office, tambang) + handmade NIB vs SIUP (lisensi warisan dihapus UU Cipta Kerja)",
      "Trio pertama 'PT vs CV vs PT Perorangan' (comparisons-trio.ts + TrioView): tabel 10 aspek 3-kolom ber-pewarnaan per pihak, peta keputusan 3 jalur — kartu mobile / grid desktop",
      "Fix internal-link /bandingkan/*: entitas base kini ke /layanan/{slug} masing-masing (bukan fallback nib) — sitemap bandingkan 78 URL, indeks 11.629 → 11.661",
    ],
  },
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
  indexedUrls: 11876,
  sitemapSections: 15,
  orderableServices: 1500,
  subscriptionSkus: 6,
  languages: 30,
  aiTools: 5,
  provinces: 38,
  prismaModels: 13,
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
