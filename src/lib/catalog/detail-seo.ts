// ============================================================
// PUSATPERIZINAN.COM — DETAIL-SEO GENERATOR (Katalog v2/v3)
// ============================================================
// ROADMAP-99 langkah 23 + 24 + 27 (FASE 4 — SEO Dominasi Nasional):
//   1. snippetAnswer()     — jawaban langsung 40–60 kata untuk blok
//                            "Ringkasan Cepat" (target featured snippet)
//   2. buildFaqs()         — 5 FAQ deterministik per layanan (+ FAQPage
//                            schema di halaman detail)
//   3. buildHowToSteps()   — 5 langkah proses deterministik (+ HowTo
//                            schema di halaman detail)
//   4. pickProvinceLinks() — 6 hub wilayah deterministik untuk blok
//                            "Jangkauan Nasional" (internal linking engine)
//
// ATURAN DETERMINISTIK (wajib, pola yang sama dengan seo.ts):
//   Semua output diturunkan dari FNV-1a hash(s.code) — angka, urutan,
//   dan pemilihan konten KONSISTEN selamanya untuk kode yang sama,
//   tidak berubah antar build/revalidasi (anti sinyal instabilitas).
//
// ATURAN KUALITAS (seo-policy P0-03): konten harus BENAR secara
//   bisnis — tidak ada klaim kuota palsu; FAQ menjawab pertanyaan
//   yang benar-benar ditanyakan pemilik usaha Indonesia.
// ============================================================

import { SITE_NAME } from "@/lib/site";
import { WILAYAH } from "@/lib/wilayah";
import { splitRequirements } from "@/lib/catalog/rich-content";
// type-only import: mencegah siklus runtime detail-seo ↔ katalog-v2-detail
import type { CatalogDetailService } from "@/components/catalog/katalog-v2-detail";

// ------------------------------------------------------------
// FNV-1a 32-bit — deterministik, cepat, distribusi merata
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

const fmtIdr = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

// ------------------------------------------------------------
// 1. RINGKASAN CEPAT (featured snippet, langkah 27)
// ------------------------------------------------------------
// Pola jawaban langsung: definisi + biaya + waktu + penerbit.
// Panjang target 40–60 kata — rentang yang Google lebih suka kutip
// sebagai featured snippet untuk query "biaya/jasa pengurusan X".
// ------------------------------------------------------------

export function snippetAnswer(s: CatalogDetailService): string {
  const opener = pick(
    [
      `${s.name} (${s.code}) adalah izin yang diterbitkan oleh ${s.authority}`,
      `${s.name} — berkode ${s.code} — diterbitkan oleh ${s.authority}`,
      `${s.authority} menerbitkan ${s.name.toLowerCase()} (${s.code})`,
    ],
    s.code + "|op"
  );
  return `${opener}. Jasa pengurusan lengkapnya mulai ${fmtIdr(s.discountPrice)} dengan estimasi proses ${s.estimate.toLowerCase()} dan masa berlaku ${s.validity.toLowerCase()}. Syarat utamanya meliputi dokumen legalitas usaha yang dikelola penuh oleh tim ${SITE_NAME} — pendampingan hingga terbit, garansi 100% uang kembali bila gagal karena proses kami.`;
}

// ------------------------------------------------------------
// 2. FAQ (langkah 23 — FAQPage schema + section on-page)
// ------------------------------------------------------------
// 5 pertanyaan inti pemilik usaha. Jawaban memakai DATA AKTUAL
// layanan (harga, estimasi, penerbit, masa berlaku, syarat) —
// bukan template kosong — agar lolos ambang depth seo-policy.
// ------------------------------------------------------------

export interface DetailFaq {
  q: string;
  a: string;
}

export function buildFaqs(s: CatalogDetailService): DetailFaq[] {
  // Split sadar-kurung: koma di dalam "(...)" tidak dipecah —
  // mencegah syarat terpotong seperti "dokumen 8 SNP (isi".
  const reqs = splitRequirements(s.requirements || "")
    .slice(0, 3)
    .join(", ");

  const authorityRoute = pick(
    [
      `melalui jalur resmi ${s.authority}`,
      `langsung ke sistem ${s.authority}`,
      `di kanal ${s.authority}`,
    ],
    s.code + "|ar"
  );

  const faqs: DetailFaq[] = [
    {
      q: `Berapa biaya pengurusan ${s.name}?`,
      a: `Jasa pengurusan ${s.name} (${s.code}) di ${SITE_NAME} mulai ${fmtIdr(s.discountPrice)} — sudah termasuk pendampingan dokumen hingga terbit. Biaya resmi pemerintah (PNBP) ke ${s.authority} dibayar terpisah sesuai tarif resmi instansi dan kami rincikan transparan di penawaran sebelum Anda bayar.`,
    },
    {
      q: `Berapa lama proses ${s.name} sampai terbit?`,
      a: `Estimasi normalnya ${s.estimate.toLowerCase()} sejak dokumen lengkap diterima. Estimasi dihitung dari pengalaman pemrosesan di ${s.authority}; kelengkapan dokumen dari sisi Anda adalah faktor terbesar yang mempercepat proses. Anda memantau progres langkah demi langkah via WhatsApp.`,
    },
    {
      q: `Apa saja syarat mengurus ${s.name}?`,
      a: `Syarat utamanya: ${reqs || "dokumen legalitas usaha (KTP, NPWP, NIB)"}. Belum punya salah satunya? Tim kami membantu pengadaannya — cukup sampaikan saat konsultasi awal (gratis 30 menit) dan kami susun roadmap dokumen yang paling efisien untuk kondisi usaha Anda.`,
    },
    {
      q: `Apakah ${s.name} harus diurus langsung ke ${s.authority}?`,
      a: `Tidak harus. Pengurusan ${authorityRoute} boleh diwakilkan dengan surat kuasa. ${SITE_NAME} memproses dominan secara daring: dokumen dikirim digital, kurir menangani dokumen yang wajib fisik, dan Anda tinggal terima notifikasi tiap milestone. Berlaku untuk seluruh 38 provinsi & 514 kabupaten/kota.`,
    },
    {
      q: `Berapa masa berlaku ${s.name} dan bagaimana perpanjangannya?`,
      a: `${s.name} berlaku ${s.validity.toLowerCase()}. Kami mencatat tanggal kedaluwarsa izin Anda dan mengingatkan sebelum jauh mendekati batas waktu, sehingga perpanjangan bisa disiapkan tanpa risiko izin hangus. Klien program KepatuhanPRO mendapat kalender kepatuhan otomatis.`,
    },
  ];

  // Variasi urutan FAQ deterministik per kode — konten tetap sama,
  // pola halaman tidak identik semua (anti doorway-pattern).
  const rot = hashU32(s.code + "|rot") % faqs.length;
  return [...faqs.slice(rot), ...faqs.slice(0, rot)];
}

// ------------------------------------------------------------
// 3. HOWTO — langkah proses (langkah 23 — HowTo schema + section)
// ------------------------------------------------------------

export interface DetailStep {
  name: string;
  text: string;
}

export function buildHowToSteps(s: CatalogDetailService): DetailStep[] {
  const firstTouch = pick(
    [
      "konsultasi gratis 30 menit via WhatsApp atau form",
      "chat singkat dengan konsultan via WhatsApp",
      "konsultasi awal (gratis, tanpa komitmen)",
    ],
    s.code + "|ft"
  );

  return [
    {
      name: "Konsultasi awal",
      text: `Sampaikan kebutuhan ${s.name} (${s.code}) Anda lewat ${firstTouch}. Kami cek kelayakan, level risiko KBLI, dan rincian biaya final sebelum ada pembayaran.`,
    },
    {
      name: "Serah terima dokumen",
      text: `Anda kirim dokumen syarat secara digital (scan/foto asli jelas). Tim ${SITE_NAME} memverifikasi kelengkapan dan membantu pengadaan dokumen yang belum ada.`,
    },
    {
      name: "Pengajuan ke " + s.authority,
      text: `Tim mengurus pengajuan ke ${s.authority} atas nama Anda dengan surat kuasa, termasuk koreksi bila ada temuan verifikator — tanpa biaya tambahan.`,
    },
    {
      name: "Monitoring & klarifikasi",
      text: `Kami memantau status setiap tahap di sistem ${s.authority}, merespons klarifikasi/reviu instansi secepatnya, dan mengabari Anda di setiap milestone via WhatsApp.`,
    },
    {
      name: "Penyerahan izin",
      text: `${s.name} terbit, kami serahkan dokumen digital (dan fisik bila ada) + panduan kewajiban pasca-terbit. Garansi 100% uang kembali bila gagal karena proses kami.`,
    },
  ];
}

// ------------------------------------------------------------
// 4. INTERNAL LINKING — blok "Jangkauan Nasional" (langkah 24)
// ------------------------------------------------------------
// 6 hub provinsi deterministik per kode layanan + link induk /wilayah.
// Memperkuat link equity 200+ halaman lokal /layanan/wilayah/* dari
// 1.000 halaman katalog (dan sebaliknya tidak — halaman lokal sudah
// saling taut lewat generators.ts).
// ------------------------------------------------------------

export interface ProvinceLink {
  name: string;
  href: string;
}

export function pickProvinceLinks(seedCode: string, count = 6): ProvinceLink[] {
  const h = hashU32(seedCode + "|prov");
  const out: ProvinceLink[] = [];
  const used = new Set<number>();
  let i = h % WILAYAH.length;
  while (out.length < Math.min(count, WILAYAH.length)) {
    if (!used.has(i)) {
      used.add(i);
      out.push({ name: WILAYAH[i].name, href: WILAYAH[i].hubHref });
    }
    i = (i + 1) % WILAYAH.length;
  }
  return out;
}
