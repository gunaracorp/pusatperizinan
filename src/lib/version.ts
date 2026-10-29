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
export const APP_VERSION = "1.20.0";
/** Nama rilis berjalan. */
export const RELEASE_NAME = "Footer Mahkota";
/** Tanggal rilis berjalan (WIB — Asia/Jakarta). */
export const RELEASE_DATE = "2026-10-29";
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
 * Riwayat lengkap 44 rilis — urut TERBARU lebih dulu.
 * Sumber: CHANGELOG.md (1:1 dengan WORKLOG.md).
 */
export const RELEASES: ReleaseEntry[] = [
  {
    version: "1.20.0",
    date: "2026-10-29",
    type: "minor",
    name: "Footer Mahkota",
    taskId: "46",
    highlights: [
      "Footer v6 'Mahkota' — 7 lapisan di 11.873 halaman: summit deck CTA dengan border-beam conic berputar (transform-only) + aurora internal, command strip dengan jam WIB live per detik (hydration-safe, null di server), marquee ticker layanan unggulan full-bleed (pause saat hover), mega-grid SEO warisan penuh v5 (86 href ter-audit identik — nol link hilang), trending searches, legal sovereign + tombol back-to-top, atmosfer ruang dalam (orb aurora drift + pattern grid + noise grain SVG)",
      "Desain 'bukan footer biasa' sesuai perintah owner — gabungan dewan pakar: headline gradien 'Dari NIB sampai Sertifikasi Global', badge shimmer emas, CTA WA pulse-ring + Cek Izin AI, mikro-trust 4 item (rating 4,9/5 · garansi 100% · respons <15 menit · AI RIZKI 24/7), statistik platform angka gradient, ikon lucide di tiap kolom (Briefcase/Award/MapPin/Globe/Wrench/Zap/Building2/LifeBuoy)",
      "Anti-regresi: semua animasi compositor-only + guard prefers-reduced-motion menyeluruh, nol dependensi & gambar baru, verifikasi E2E visual desktop 1440px + mobile 390px (nol scroll horizontal), tsc/eslint nol temuan",
    ],
  },
  {
    version: "1.19.0",
    date: "2026-10-29",
    type: "minor",
    name: "Footer God Mode",
    taskId: "45",
    highlights: [
      "Footer v5 'God Mode Tier Max' — 5 lapisan baru di 11.873 halaman: aurora signal bar (animasi compositor-only, hormat prefers-reduced-motion), command band (pill status 'Semua sistem operasional' + chip AI RIZKI 24/7 + 5 statistik platform + CTA WA 'Konsultasi Gratis' & Cek Izin AI), mega-grid SEO 6 kolom TANPA duplikasi link (duplikasi SERVICE_LINKS era lama dihapus), trending searches 12 chip semantik, legal sovereign",
      "SEO internal-linking baru: kolom Wilayah & Kota kini membawa 3 hub kota teratas (Jakarta Selatan SCBD, Bekasi, Bandung — URL terverifikasi E2E 200) + hub /wilayah 516 kota; chip 'Loker host live TikTok Shopee' menyambung v1.18.0 dengan pencarian nyata GSC",
      "Refactor arsitektur: subkomponen FooterLinkColumn (aria-label per nav), format ribuan tanpa Intl (anti hydration mismatch), nol dependensi baru — tsc/eslint nol temuan",
    ],
  },
  {
    version: "1.18.0",
    date: "2026-10-29",
    type: "minor",
    name: "Live Commerce Wanita",
    taskId: "43",
    highlights: [
      "Posisi baru Host Live Streaming (TikTok, Shopee, Facebook & Instagram) — khusus wanita, remote penuh (live dari rumah dengan set HP + ring light), mempresentasikan layanan perizinan & pajak dan mengubah penonton menjadi lead WhatsApp",
      "Halaman /lowongan-kerja kini 8 posisi aktif: judul meta dinamis mengikuti JOBS.length, hero + openGraph + keywords menyebut host live streaming (live selling, loker live tiktok shopee)",
      "PLATFORM_STATS.indexedUrls 11.872 → 11.873 (+1 URL detail lowongan); URL baru & perubahan terdeteksi mesin auto-ping — IndexNow ter-ping otomatis + masuk rotasi GSC",
    ],
  },
  {
    version: "1.17.1",
    date: "2026-10-28",
    type: "patch",
    name: "Dokumen Terkini",
    taskId: "42",
    highlights: [
      "Sinkronisasi dokumentasi penuh untuk dua rilis rekrutmen: v1.16.0 \"Rekrutmen Khusus Wanita\" & v1.17.0 \"Loker UMR Remote\" kini tercatat resmi di CHANGELOG, ladder, ver.json, dan README (perintah owner: update readme + worklog terbaru)",
      "README: tabel 'Gambaran kemampuan' + baris 'Karier & rekrutmen' & §2.4 diperluas — 7 posisi aktif khusus wanita (remote, gaji awal UMR + bonus target, jenjang karier Staff→Senior→Lead→Manager)",
      "PLATFORM_STATS.indexedUrls 11.877 → 11.872 (lowongan aktif 12 → 7, −5 URL); duplikat entri 1.13.5 di history ver.json dibersihkan",
    ],
  },
  {
    version: "1.17.0",
    date: "2026-10-28",
    type: "minor",
    name: "Loker UMR Remote",
    taskId: "41",
    highlights: [
      "Daftar lowongan ditulis ulang total sesuai brief owner: 16 posisi lama dihapus, diganti 7 posisi aktif — Programmer Full-Stack, Admin Marketing, Admin Melayani Pelanggan, Staf Perpajakan (PPh/PPN/Coretax), Staf Perizinan NIB & OSS-RBA, Admin Customer Service (WA & Chat), Admin Media Sosial",
      "Gaji awal UMR resmi 2026 terverifikasi riset web: UMP DKI Jakarta Rp5.729.876 (+6,17%, Kegub 33/2026) & UMK Kota Bekasi Rp5.999.422 + bonus bulanan dari target perusahaan; salaryDisplay 'UMR + Bonus Target' + helper salaryText() — baseSalary tetap numerik untuk Google Jobs",
      "Semua posisi remote penuh + jenjang karier eksplisit Staff→Senior→Lead→Manager; hero 'Remote, Gaji UMR + Bonus Target' + seksi 4 kartu 'Gaji, Bonus & Jenjang Karier' + FAQ gaji/remote/karier",
    ],
  },
  {
    version: "1.16.0",
    date: "2026-10-28",
    type: "minor",
    name: "Rekrutmen Khusus Wanita",
    taskId: "40",
    highlights: [
      "Seluruh sistem lowongan menjadi khusus wanita (perintah owner 'jangan ada laki2'): field femaleOnly di interface Job + 16/16 lowongan, konstanta FEMALE_ONLY_LABEL, judul '— Khusus Wanita', baris kualifikasi pembuka wanita",
      "4 posisi prioritas baru: Konsultan Pajak Wanita, Programmer Full-Stack Wanita, SEO Specialist Wanita (remote), Konsultan Senior Perizinan Hulu-Hilir (12 → 16 lowongan)",
      "SEO konsisten dari metadata sampai template lamaran: badge rose 'Khusus Wanita', kotak info 'Lamaran laki-laki tidak diproses', JSON-LD JobPosting, FAQ 'Apakah posisi ini hanya untuk wanita?', template WA 'saya perempuan...', header & footer sinkron",
    ],
  },
  {
    version: "1.15.0",
    date: "2026-10-28",
    type: "minor",
    name: "Mesin Kepercayaan",
    taskId: "39",
    highlights: [
      "Langkah 8 — Social proof per layanan ('±N usaha memproses bulan ini') di 1.565 halaman detail v1/v2/v3 + checkout — modul social-proof.ts bersumber TRUST_METRICS, deterministik FNV-1a per bulan, angka identik lintas halaman",
      "Langkah 12 — Mesin pemulihan checkout terbengkalai: model RecoveryLog (15 model), sequence WA 1 jam/24 jam/72 jam + reminder admin berisi link bayar 1-klik, idempoten, berhenti saat lunas; denyut di scheduler + /api/cron/recovery + panel Mission Control → Pesanan",
      "Langkah 46 — Live activity feed sitewide dari order/lead nyata 24 jam terakhir (ter-anonimkan UU PDP, tanpa PII; DB kosong = widget tidak tampil) + /api/activity cache 30 dtk",
      "Langkah 48 — Halaman /garansi (6 janji, cakupan, 3 langkah klaim, FAQPage schema) + badge checkout + footer + sitemap (indeks 11.876 → 11.877)",
      "Langkah 62 — Terverifikasi penuh: notifikasi Telegram/WA order baru (PENDING) & pembayaran masuk (PAID) via applyOrderStatus pintu tunggal + create route — QA verify-recovery PASS",
    ],
  },
  {
    version: "1.14.2",
    date: "2026-10-27",
    type: "patch",
    name: "Fondasi Baru",
    taskId: "38",
    highlights: [
      "Upgrade ORM: Prisma 6.11.1 → 7.10.1 (stabil terbaru) — generator 'prisma-client' + output eksplisit src/generated/prisma; 'prisma-client-js' usang ditinggalkan (Task 38)",
      "Driver adapter wajib era tanpa-Rust-engine: @prisma/adapter-better-sqlite3 di src/lib/db.ts + prisma.config.ts (datasource URL pindah dari schema ke config)",
      "DateTime SQLite kini teks ISO-8601 (bukan integer ms v6) — verify-followup.mjs disesuaikan; QA 23/23 PASS + boot test + tsc/eslint file tersentuh nol temuan",
    ],
  },
  {
    version: "1.14.1",
    date: "2026-10-26",
    type: "patch",
    name: "Detak Jantung",
    taskId: "37",
    highlights: [
      "Detak jantung mesin follow-up: sweep otomatis dari dalam server — 25 detik setelah hidup, lalu tiap 15 menit — TANPA cron eksternal (Task 37)",
      "Instrumentation server memanggil scheduler hanya di runtime Node (aman edge & build); kendali env FOLLOWUP_SWEEP_MINUTES (0 = mati)",
      "Idempoten penuh mewarisi jaminan v1.14.0 — detak ganda mustahil dobel kirim; pasang token Telegram = mesin menyala penuh dalam 2 menit",
    ],
  },
  {
    version: "1.14.0",
    date: "2026-10-26",
    type: "minor",
    name: "Kejar Order",
    taskId: "36",
    highlights: [
      "Follow-up otomatis lead 24 jam (langkah 6 ROADMAP-99): sequence 3 langkah 24/48/72 jam untuk lead status NEW — catch-up ke window terakhir saat lead ditemukan telat",
      "Dua lane: kirim otomatis ke lead via gateway WA (Fonnte/Wablas) + reminder admin via Telegram/WA berisi link wa.me 1-klik pesan siap kirim",
      "Idempoten per (lead, step, lane) — sweep berulang tak pernah dobel kirim; berhenti otomatis saat lead dihubungi (status ≠ NEW); lead >30 hari tak dikejar",
      "Mission Control: panel 'Follow-up 24 Jam' di tab Leads (antrean jatuh tempo + nilai mengendap + tombol sweep) + cron eksternal GET /api/cron/followup (CRON_SECRET)",
    ],
  },
  {
    version: "1.13.5",
    date: "2026-10-26",
    type: "patch",
    name: "Jaring Pengaman",
    taskId: "35",
    highlights: [
      "Backup DB harian otomatis: VACUUM INTO + integrity check + gzip + retensi 14 snapshot (langkah 68 ROADMAP-99)",
      "Restore teruji end-to-end: snapshot 13 tabel/171 baris identik dengan DB aktif; mode dry-run/--to/--commit",
      "Self-healing tanpa cron: predev/prestart hook backup bila terakhir > 24 jam + crontab produksi terdokumentasi",
      "Error monitoring Sentry server+client ENV-GATED (@sentry/nextjs) — DSN kosong = mati total, nol overhead CWV",
    ],
  },
  {
    version: "1.13.4",
    date: "2026-10-26",
    type: "patch",
    name: "Dokumen Hidup II",
    taskId: "34",
    highlights: [
      "README.md di-refresh penuh (ID+EN) agar 1:1 dengan kode: 11.876 URL / 15 seksi sitemap, 13 model Prisma, 33 rilis, riwayat Task 1–34 — plus seksi baru 'Analytics & Conversion Tracking GA4'",
      "Semua angka basi era v1.4.0 dikoreksi berdasarkan server hidup; badge header + roadmap + footer + kredit entitas resmi (v1.12.0) disesuaikan",
      "Sinkron scripts/ver.json (stagnan di v1.5.0) → v1.13.4 dengan stats terkini",
    ],
  },
  {
    version: "1.13.3",
    date: "2026-10-26",
    type: "patch",
    name: "Analitik Penuh",
    taskId: "33",
    highlights: [
      "GA4 G-KMZRQJQXCB aktif di SELURUH halaman: gtag.js dirender SSR di <head> root layout — satu pintu, nol rute terlewat, tahan semua mode build berkat fallback hardcode (tanpa .env)",
      "Tracking konversi full-funnel via trackEvent(): generate_lead (hero, lead-form, final-cta, kalkulator +value_estimate, kontak), sign_up (kursus email), chat_message (AI RIZKI)",
      "Preconnect/dns-prefetch googletagmanager.com · clarity.ms · wa.me — Core Web Vitals terjaga; menuntaskan langkah 4 ROADMAP-99",
    ],
  },
  {
    version: "1.13.2",
    date: "2026-10-25",
    type: "patch",
    name: "Peta Live",
    taskId: "32",
    highlights: [
      "Perbaikan laporan GSC \"Kesalahan HTTP 404\" pada /sitemap.xml: paket deploy statis dibangun ulang dari v1.13.1 (266 halaman, sebelumnya 48 dari build 2026-10-16) — sitemap ikut segar",
      "Sitemap statis konsisten otomatis: indeks 3 seksi (blog, glosarium, static 35 URL) + robots.txt disinkronkan; seksi kosong pasca-prune dihapus agar GSC bebas 404",
      "File deploy root dipulihkan: .htaccess & DEPLOY-IDWEBHOST.md kembali ke root (deploy-pack menempelkannya hanya if-exists — tanpa ini paket baru lahir tanpa routing/404/gzip cPanel)",
    ],
  },
  {
    version: "1.13.1",
    date: "2026-10-25",
    type: "patch",
    name: "Logo Resmi",
    taskId: "31",
    highlights: [
      "Hapus sisa logo template \"Z\" (huruf Z putih + animasi breathe — warisan template awal) dari /logo.svg; file kini berisi marka resmi situs: perisai emerald + centang emas, konsisten dengan favicon.svg",
      "Aset PNG utama (logo-icon.png, logo-icon-white.png, logo.png — karangan PP + bintang emas) terverifikasi visual bersih; rilis v1.14.0 \"Identitas Visual\" yang keliru dipasang sudah di-revert penuh (revert commit eab4f49)",
      "Verifikasi menyeluruh: nol referensi /logo.svg di kode (penggantian isi aman), manifest.json + metadata ikon + header/footer tetap logo PP, cache .next bersih dari aset Z",
    ],
  },
  {
    version: "1.13.0",
    date: "2026-10-25",
    type: "minor",
    name: "Peta Provinsi",
    taskId: "29",
    highlights: [
      "ROADMAP-99 langkah 7 — schema Service + OfferCatalog/Offer per wilayah: seluruh 38 hub provinsi /layanan/wilayah/{prov} & 516 hub kota kini membawa node Service dengan areaServed State/City (kode ISO 3166-2:ID + GeoCoordinates ibu kota) dan katalog Offer IDR dari harga nyata layanan anggota",
      "Bug laten geo: PROVINCE_GEO kehilangan Banten → /layanan/wilayah/banten* tanpa meta geo.region; kini lengkap 38/38 (ID-BT, Serang)",
      "Fix JSON-LD laten: setiap node schema di hub kini membawa @context sendiri (pola lama hanya node pertama) — QA verify-wilayah-schema.ts PASS 38 provinsi + 3 kota + regresi kategori",
    ],
  },
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
  // Sinkron Task 43: lowongan aktif 7 → 8 (+1 URL) dari hitungan v1.17.1 (11.872).
  indexedUrls: 11873,
  sitemapSections: 15,
  orderableServices: 1500,
  subscriptionSkus: 6,
  languages: 30,
  aiTools: 5,
  provinces: 38,
  prismaModels: 15,
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
