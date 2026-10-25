// ============================================================
// PUSATPERIZINAN.COM — RICH CONTENT GENERATOR (Anti-Thin Content)
// ============================================================
// ROADMAP-99 langkah 33 (FASE 4 — SEO Dominasi Nasional):
//   buildRichParagraphs() — 4 paragraf prosa ±300 kata per layanan
//   untuk halaman detail (Katalog v2/v3 + halaman induk v1),
//   menutup gap "thin content" pada halaman yang sebelumnya hanya
//   berisi blok terstruktur (syarat/langkah/FAQ) tanpa prosa panjang.
//
// ATURAN DETERMINISTIK (wajib, pola yang sama dengan detail-seo.ts):
//   Semua output diturunkan dari FNV-1a hash(seed=kode/id layanan) —
//   kombinasi kalimat KONSISTEN selamanya untuk layanan yang sama,
//   tidak berubah antar build/revalidasi (anti sinyal instabilitas).
//
// ATURAN KUALITAS (seo-policy P0-03 + aturan main ROADMAP):
//   - Konten BENAR secara bisnis: menjelaskan fungsi izin, dokumen,
//     timeline realistis, dan kewajiban pasca-terbit — tanpa klaim
//     kuota palsu, tanpa sitasi regulasi spesifik yang dikarang.
//   - Interpolasi memakai DATA AKTUAL layanan (penerbit, estimasi,
//     masa berlaku, harga) — bukan template kosong.
//   - 4 slot kalimat × bank varian → ruang kombinasi besar agar
//     1.000+ halaman tidak saling identik (anti doorway-pattern).
// ============================================================

import { SITE_NAME } from "@/lib/site";

// ------------------------------------------------------------
// FNV-1a 32-bit + pick — deterministik (pola detail-seo.ts)
// ------------------------------------------------------------

function hashU32(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Pilih 1 elemen deterministik dari array via hash(seed). */
function pick<T>(arr: readonly T[], seed: string): T {
  return arr[hashU32(seed) % arr.length];
}

/** Lowercase huruf pertama saja — singkatan (NIB, PBG, ISO) tetap utuh. */
function lcFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/** Gabung daftar gaya Indonesia: "A, B, dan C". Kapitalisasi item dipertahankan. */
function joinId(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")}, dan ${items[items.length - 1]}`;
}

/**
 * Split daftar syarat ber-koma SADAR-KURUNG: koma di dalam "(...)" tidak
 * dipecah — mencegah hasil terpotong seperti "dokumen 8 SNP (isi".
 * Dipakai juga oleh detail-seo.ts (FAQ syarat) agar konsisten.
 */
export function splitRequirements(s: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of s) {
    if (ch === "(") {
      depth++;
      cur += ch;
    } else if (ch === ")") {
      depth = Math.max(0, depth - 1);
      cur += ch;
    } else if (ch === "," && depth === 0) {
      out.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) out.push(cur.trim());
  return out.filter(Boolean);
}

// ------------------------------------------------------------
// INPUT — bentuk minimal yang bisa dipenuhi oleh:
//   - KatalogV2Service / KatalogV3Service (kode = s.code)
//   - BaseServiceRecord v1 (kode = b.id, validity → undefined)
// ------------------------------------------------------------

export interface RichContentInput {
  /** Seed deterministik: kode layanan (v2/v3) atau id layanan (v1) */
  seed: string;
  /** Nama layanan, mis. "Izin Lingkungan (AMDAL)" */
  name: string;
  /** Instansi penerbit, mis. "OSS-RBA + Dinas Lingkungan Hidup" */
  authority: string;
  /** Label kategori manusiawi, mis. "Perizinan Usaha & Legalitas" */
  category: string;
  /** Estimasi proses, mis. "3–7 hari kerja" */
  estimate: string;
  /** Masa berlaku, mis. "5 tahun" — v1 belum punya field ini (opsional) */
  validity?: string;
  /** Daftar syarat (komma-separated atau hasil join dari array) */
  requirements: string;
  /** Label harga sudah diformat, mis. "Rp 1.250.000" */
  priceLabel: string;
}

// ------------------------------------------------------------
// BANK KALIMAT — tiap slot punya varian; kombinasi dipilih hash.
// Bahasa: jujur, konkret, nada konsultan — bukan marketing kosong.
// ------------------------------------------------------------

// --- P1 · Konteks & urgensi legal ---
const P1_OPENERS: readonly ((n: string, a: string) => string)[] = [
  (n, a) => `${n} adalah salah satu legalitas yang membuat kegiatan usaha Anda sah dijalankan — dokumen ini diterbitkan ${a} setelah syarat administratif terpenuhi, dan menjadi rujukan pertama saat pihak eksternal memverifikasi usaha Anda.`,
  (n) => `Banyak pelaku usaha menunda mengurus ${lcFirst(n)} karena operasional masih berjalan — sampai dokumen ini tiba-tiba diminta, misalnya saat mengikuti tender, mengajukan pembiayaan, atau diverifikasi mitra besar.`,
  (n) => `Dalam praktiknya, ${lcFirst(n)} menjadi syarat pintu masuk untuk berbagai urusan lanjutan: pembukaan rekening korporasi, kemitraan dengan instansi atau BUMN, pendaftaran di marketplace besar, hingga proses audit.`,
  (n, a) => `Setiap sektor punya kerangka legal berbeda, dan ${lcFirst(n)} adalah salah satu bagiannya di bawah kewenangan ${a} — kehadirannya menentukan apakah kegiatan usaha Anda dianggap patuh atau berisiko sanksi administratif.`,
  (n) => `Kalau usaha Anda sudah berjalan tapi legalisasinya belum lengkap, ${lcFirst(n)} adalah salah satu dokumen yang paling sering menjadi celah — sekaligus yang paling cepat dirapikan bila ditangani dengan urutan yang benar.`,
];

const P1_BEKAL: readonly string[] = [
  `Halaman ini kami rangkum secara jujur: apa yang dibutuhkan, berapa lama realistisnya, dan apa kewajiban Anda setelah izin terbit — sebagai bekal sebelum memutuskan.`,
  `Panduan di bawah disusun dari pola kasus nyata yang ditangani tim ${SITE_NAME} di berbagai instansi — bukan teori umum yang beredar di internet.`,
  `Sebelum masuk ke proses, pahami dulu tiga hal yang paling menentukan hasil: kelengkapan dokumen, jalur pengajuan yang benar, dan kesiapan mengikuti reviu instansi.`,
];

// --- P2 · Dokumen & kesalahan umum ---
const P2_OPENERS: readonly ((n: string, reqs: string) => string)[] = [
  (n, r) => `Dari sisi dokumen, pengurusan ${lcFirst(n)} minimal menuntut ${r}. Daftar itu adalah syarat inti — instansi bisa menambah dokumen teknis sesuai kegiatan usaha Anda, dan itulah yang kami petakan sejak konsultasi pertama.`,
  (n, r) => `Siapkan dulu ${r}. Daftar itu adalah syarat inti — instansi bisa menambah dokumen teknis sesuai kegiatan usaha Anda, dan itulah yang kami petakan sejak konsultasi pertama.`,
  (n, r) => `Persiapan terbaik untuk ${lcFirst(n)} adalah dokumen: minimal ${r}. Selain itu, dokumen teknis tambahan bisa muncul sesuai sektor — kami identifikasi lebih awal supaya tidak ada kejutan di tengah proses.`,
];

const P2_PITFALLS: readonly string[] = [
  "identitas tidak sinkron (nama atau alamat di KTP, NPWP, dan akta berbeda)",
  "KBLI di NIB belum mencakup kegiatan usaha yang sebenarnya",
  "alamat usaha belum bisa diverifikasi (kontrak sewa tidak atas nama yang benar)",
  "dokumen lampiran tidak terbaca atau terpotong saat diunggah",
  "akta pendirian belum memuat kewenangan untuk bidang terkait",
  "status NPWP belum aktif atau jenisnya belum sesuai (perorangan vs badan)",
  "data pemohon tidak konsisten dengan dokumen pendukung",
  "formulir daring terisi sebagian lalu dibiarkan melewati tenggat perbaikan",
];

const P2_CLOSE: readonly string[] = [
  `Kesalahan sekecil itu — bukan kualitas usaha Anda — penyebab utama berkas dikembalikan atau melambat.`,
  `Hampir semua penolakan tahap awal kembali ke hal-hal administratif semacam ini, bukan ke substansi usaha.`,
  `Praktik kami: audit menyeluruh sebelum submit — lebih murah memperbaiki di awal daripada mengulang dari nol.`,
];

// --- P3 · Proses & estimasi realistis ---
const P3_OPENERS: readonly ((n: string, e: string) => string)[] = [
  (n, e) => `Secara realistis, ${lcFirst(n)} selesai dalam ${e} sejak berkas Anda dinyatakan lengkap — angka ini mengikuti pola pemrosesan normal, bukan janji iklan.`,
  (n, e) => `Estimasi waktu yang kami pegang untuk ${lcFirst(n)} adalah ${e} sejak dokumen lengkap. Berkas yang rapi sejak awal hampir selalu selesai di batas bawah rentang itu.`,
  (n, e) => `Untuk waktu proses, pegangan kami jujur: ${e} untuk ${lcFirst(n)} setelah kelengkapan berkas terkonfirmasi — makin rapi dokumen awal, makin dekat ke batas teratas rentang tersebut.`,
];

const P3_ALUR: readonly ((a: string) => string)[] = [
  (a) => `Alurnya berlapis: audit dan perbaikan dokumen, pengajuan resmi ke ${a}, reviu verifikator, penanganan temuan bila ada, lalu penerbitan dokumen.`,
  (a) => `Setiap permohonan melewati fase yang sama — persiapan berkas, pengajuan ke ${a}, reviu verifikator, klarifikasi bila diminta — sampai dokumen akhirnya diterbitkan.`,
  (a) => `Prosesnya berurutan: berkas diajukan ke ${a}, diverifikasi, dan hanya diproses lanjut setelah tidak ada temuan — di sinilah pendampingan menentukan kecepatan.`,
];

const P3_DELAY: readonly string[] = [
  `Dua faktor terbesar yang menggeser timeline: kelengkapan dokumen dari sisi Anda, dan antrean reviu instansi di periode sibuk seperti akhir tahun.`,
  `Yang paling sering membuat proses melambat bukan instansinya, melainkan berkas yang bolong-balik antara pemohon dan verifikator.`,
  `Periode pasca-aturan baru biasanya membuat antrean reviu lebih panjang — perencanaan yang matang menghindarkan Anda dari gelombang itu.`,
];

// --- P4 · Pasca-terbit & kewajiban ---
const P4_OBLIGATIONS: readonly string[] = [
  "perubahan data usaha (alamat, pengurus, KBLI) wajib disesuaikan ke dokumen",
  "laporan berkala tertentu bisa dipersyaratkan sesuai sektornya",
  "perpanjangan harus disiapkan jauh sebelum masa berlaku habis",
  "izin induk bisa terpengaruh bila struktur badan usaha berubah",
  "penempatan izin (misalnya untuk tenda/kios/papan nama) harus sesuai yang tercantum",
];

const P4_CLOSE: readonly ((n: string, p: string) => string)[] = [
  (n, p) => `Setiap serah terima ${lcFirst(n)} di ${SITE_NAME} menyertakan kalender kewajiban pasca-terbit, dan biaya jasa mulai ${p} sudah mencakup pendampingan sampai dokumen benar-benar di tangan Anda — bergaransi uang kembali 100% bila gagal karena proses kami.`,
  (n, p) => `Klien program KepatuhanPRO bahkan mendapat pengingat otomatis lewat WhatsApp sebelum setiap tenggat — supaya ${lcFirst(n)} yang sudah diperjuangkan tidak hangus karena kelalaian administratif. Biaya jasa mulai ${p}, pendampingan penuh hingga terbit.`,
  (n, p) => `Jangan biarkan dokumen yang sudah jadi menjadi tidak berlaku: masukkan tanggal kedaluwarsa ke kalender usaha Anda. Tim ${SITE_NAME} mengingatkan otomatis, dan biaya jasa pengurusan mulai ${p} mencakup pendampingan hingga terbit.`,
];

// ------------------------------------------------------------
// BUILDER — 4 paragraf ±300 kata, deterministik per seed
// ------------------------------------------------------------

export function buildRichParagraphs(input: RichContentInput): string[] {
  const { seed, name, authority, estimate, priceLabel } = input;
  const n = name; // dipakai langsung pada posisi awal kalimat (kapital)

  // Paragraf 2 — rujukan syarat: ambil 3 item pertama (split sadar-kurung)
  const reqList = splitRequirements(input.requirements || "dokumen legalitas dasar (KTP, NPWP, NIB)").slice(0, 3);
  const reqs = joinId(reqList);

  // Dua jebakan dokumen yang berbeda — deterministik (pola pickBundle)
  const h2 = hashU32(seed + "|pit");
  const i1 = h2 % P2_PITFALLS.length;
  const i2 = (i1 + 1 + ((h2 >>> 8) % (P2_PITFALLS.length - 1))) % P2_PITFALLS.length;
  const pit1 = P2_PITFALLS[i1];
  const pit2 = P2_PITFALLS[i2];

  // Dua kewajiban pasca-terbit yang berbeda — deterministik
  const h4 = hashU32(seed + "|obl");
  const j1 = h4 % P4_OBLIGATIONS.length;
  const j2 = (j1 + 1 + ((h4 >>> 8) % (P4_OBLIGATIONS.length - 1))) % P4_OBLIGATIONS.length;
  const ob1 = P4_OBLIGATIONS[j1];
  const ob2 = P4_OBLIGATIONS[j2];

  // --- Paragraf 1 · Konteks & urgensi (~80 kata) ---
  const p1 =
    pick(P1_OPENERS, seed + "|p1o")(n, authority) +
    " " +
    pick(P1_BEKAL, seed + "|p1b");

  // --- Paragraf 2 · Dokumen & jebakan umum (~85 kata) ---
  const p2 =
    pick(P2_OPENERS, seed + "|p2o")(n, reqs) +
    " " +
    `Dari pengalaman kami menangani kasus serupa, berkas paling sering dikembalikan karena hal sepele: ${pit1}, atau ${pit2}. ` +
    pick(P2_CLOSE, seed + "|p2c");

  // --- Paragraf 3 · Proses & timeline jujur (~85 kata) ---
  const p3 =
    pick(P3_OPENERS, seed + "|p3o")(n, estimate.toLowerCase()) +
    " " +
    pick(P3_ALUR, seed + "|p3a")(authority) +
    " " +
    pick(P3_DELAY, seed + "|p3d");

  // --- Paragraf 4 · Pasca-terbit & perawatan izin (~80 kata) ---
  const validitySentence = input.validity
    ? `${n} berlaku ${input.validity.toLowerCase()} — tapi terbit bukan garis akhir kepatuhan Anda.`
    : `Setelah ${lcFirst(n)} terbit, dokumen ini ikut mengikuti masa berlaku yang ditetapkan ${authority} — dan terbit bukan garis akhir kepatuhan Anda.`;
  const p4 =
    validitySentence +
    " " +
    `Kewajiban pasca-terbit juga harus masuk rencana: ${ob1}, serta ${ob2}. ` +
    pick(P4_CLOSE, seed + "|p4c")(n, priceLabel);

  return [p1, p2, p3, p4];
}

// ------------------------------------------------------------
// JUDUL SECTION — varian deterministik per seed (anti-template)
// ------------------------------------------------------------

export function richSectionTitle(seed: string, name: string): string {
  const variants: readonly string[] = [
    `Panduan Lengkap ${name}`,
    `${name} — Apa yang Perlu Anda Tahu`,
    `Memahami ${name} Lebih Dalam`,
    `Panduan Pengurusan ${name} dari Awal sampai Terbit`,
  ];
  return pick(variants, seed + "|judul");
}
