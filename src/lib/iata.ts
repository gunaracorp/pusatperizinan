// ============================================================
// PUSATPERIZINAN.COM — IATA ACCREDITATION SOURCE OF TRUTH
// ============================================================
// SATU-SATUNYA sumber harga, produk, layanan, dan link internal
// untuk seluruh halaman IATA (pillar, produk, panduan, konversi).
// DILARANG menulis harga IATA di file lain — selalu impor dari sini.
//
// POSISI BRAND (WAJIB dipertahankan di seluruh halaman):
//   • POSITIONING PUSATPERIZINAN.COM: "Premium Corporate Licensing
//     & Accreditation Services" (arsitektur brand tiga kanal:
//     GConsultant.web.id = Professional Implementation;
//     Gunara.web.id = Strategic Advisory — harga kanal lain JANGAN
//     diubah di repo ini).
//   • PusatPerizinan.com adalah KONSULTAN INDEPENDEN — bukan
//     cabang/agen resmi/mitra resmi IATA dan tidak menerbitkan
//     akreditasi. Keputusan akhir selalu pada IATA.
//   • Harga di bawah = jasa konsultasi & pendampingan
//     PT Top Konsultan Internasional, BUKAN biaya resmi IATA.
//   • Harga promo = 50% dari harga katalog (Master Pricing
//     Revision IATA 2026); promo 2026, periode dapat diubah
//     administrator — tanpa klaim diskon historis.
//   • GoGlobal SELALU "mulai dari" dan memerlukan penawaran
//     khusus berdasarkan cakupan negara dan entitas.
//   • Biaya resmi IATA (application fee, annual fee, financial
//     security, audit, notaris, terjemahan tersumpah, bank, pajak)
//     TIDAK termasuk kecuali tertulis dalam quotation.
// ============================================================

import { SITE_URL, SITE_NAME } from "./site";
import { certProductByKode } from "./sertifikasi-travel";

export const IATA_URLS = {
  pillar: "/layanan/iata-accreditation",
  golite: "/layanan/iata-golite",
  gostandard: "/layanan/iata-gostandard",
  goglobal: "/layanan/iata-goglobal",
  konsultasi: "/konsultasi-iata",
  cekKelayakan: "/cek-kelayakan-iata",
  kontak: "/kontak",
  panduan: {
    overview: "/panduan/iata-accreditation-indonesia",
    persyaratan: "/panduan/persyaratan-iata-indonesia",
    perbedaan: "/panduan/perbedaan-iata-golite-gostandard-goglobal",
    proses: "/panduan/proses-pengajuan-iata",
    biaya: "/panduan/biaya-akreditasi-iata",
    financialSecurity: "/panduan/financial-security-iata",
    agentBaru: "/panduan/iata-untuk-travel-agent-baru",
    agentUmrah: "/panduan/iata-untuk-travel-agent-umrah",
  },
} as const;

/** Format rupiah gaya situs: Rp27.787.500 */
export const fmtIdrIata = (n: number): string => `Rp${n.toLocaleString("id-ID")}`;

export interface IataProduct {
  kode: "GOLITE" | "GOSTANDARD" | "GOGLOBAL";
  nama: string;
  namaPendek: string;
  model: string;
  modelEn: string;
  deskripsiModel: string;
  hargaKatalog: number;
  hargaPromo: number;
  /** true bila harga promo adalah "mulai dari" (GoGlobal) */
  hargaMulaiDari: boolean;
  url: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  /** Profil perusahaan yang paling cocok dengan model ini (premium matrix). */
  cocokUntuk: string;
}

export const IATA_PRODUCTS: IataProduct[] = [
  {
    kode: "GOLITE",
    nama: "IATA GoLite Accreditation Consultancy & Application Assistance",
    namaPendek: "IATA GoLite",
    model: "Standard Accreditation without Cash Facility",
    modelEn: "Standard Accreditation without Cash Facility",
    deskripsiModel:
      "Model akreditasi tanpa cash facility standar — relevan bagi travel agent yang menggunakan metode pembayaran yang diperbolehkan dalam skema GoLite, termasuk kartu kredit dan/atau IATA EasyPay sesuai ketentuan yang berlaku.",
    hargaKatalog: 55_575_000,
    hargaPromo: 27_787_500,
    hargaMulaiDari: false,
    url: IATA_URLS.golite,
    seoTitle: "Jasa Konsultasi IATA GoLite Indonesia | Harga & Persyaratan",
    metaDescription:
      "Konsultasi dan pendampingan IATA GoLite untuk travel agent Indonesia. Standard Accreditation without Cash Facility, pemeriksaan legalitas, dokumen dan kesiapan aplikasi. Promo Rp27.787.500.",
    h1: "IATA GoLite Indonesia — Konsultasi dan Pendampingan Akreditasi Tanpa Cash Facility",
    cocokUntuk:
      "Travel agent yang fokus pada penjualan tiket dan hotel tanpa kebutuhan cash facility — pembayaran penumpang menggunakan metode yang diperbolehkan skema GoLite.",
  },
  {
    kode: "GOSTANDARD",
    nama: "IATA GoStandard Accreditation Consultancy & Application Assistance",
    namaPendek: "IATA GoStandard",
    model: "Standard Accreditation with Cash Facility",
    modelEn: "Standard Accreditation with Cash Facility",
    deskripsiModel:
      "Model akreditasi dengan cash facility — kebutuhan finansial dan dokumen keuangan lebih mendalam, termasuk laporan keuangan audited sesuai ketentuan yang dipublikasikan IATA.",
    hargaKatalog: 106_875_000,
    hargaPromo: 53_437_500,
    hargaMulaiDari: false,
    url: IATA_URLS.gostandard,
    seoTitle: "Jasa Konsultasi IATA GoStandard Indonesia | Cash Facility",
    metaDescription:
      "Konsultasi IATA GoStandard untuk travel agent yang membutuhkan Cash Facility. Pelajari persyaratan finansial, dokumen, financial security, dan pendampingan aplikasi IATA Indonesia.",
    h1: "IATA GoStandard Indonesia — Konsultasi Akreditasi dengan Cash Facility",
    cocokUntuk:
      "Agent yang membutuhkan cash facility untuk keluasan penerbitan tiket — dengan kesiapan dokumen keuangan yang lebih mendalam.",
  },
  {
    kode: "GOGLOBAL",
    nama: "IATA GoGlobal Multi-Country Accreditation Consultancy",
    namaPendek: "IATA GoGlobal",
    model: "Multi-Country Accreditation",
    modelEn: "Multi-Country Accreditation",
    deskripsiModel:
      "Model akreditasi multi-country untuk kelompok usaha yang memenuhi ketentuan operasi di lebih dari satu negara melalui beberapa entitas dan lokasi.",
    hargaKatalog: 213_750_000,
    hargaPromo: 106_875_000,
    hargaMulaiDari: true,
    url: IATA_URLS.goglobal,
    seoTitle: "IATA GoGlobal Indonesia | Konsultasi Multi-Country Accreditation",
    metaDescription:
      "Konsultasi IATA GoGlobal untuk grup travel agent multi-negara. Evaluasi struktur perusahaan, lokasi, financial criteria, financial security, dan persiapan akreditasi.",
    h1: "IATA GoGlobal — Konsultasi Multi-Country Accreditation untuk Grup Travel Agent",
    cocokUntuk:
      "Grup usaha yang beroperasi di lebih dari satu negara melalui beberapa entitas dan lokasi.",
  },
];

export const productByKode = (kode: string): IataProduct | undefined =>
  IATA_PRODUCTS.find((p) => p.kode === kode);

/** Catatan harga wajib tampil di bawah setiap harga (transparansi). */
export const HARGA_CATATAN =
  "Harga merupakan jasa konsultasi dan pendampingan PusatPerizinan.com (PT Top Konsultan Internasional), bukan biaya resmi IATA. Biaya resmi IATA, annual fee, financial security, audit, jasa notaris, penerjemahan tersumpah, biaya bank, pajak, dan biaya pihak ketiga tidak termasuk kecuali dinyatakan tertulis dalam quotation.";
export const HARGA_CATATAN_PENDEK =
  "Harga jasa konsultasi & pendampingan — bukan biaya resmi IATA. Biaya resmi IATA dan pihak ketiga tidak termasuk kecuali tertulis dalam quotation.";
export const PROMO_LABEL = "Promo 2026 — periode dapat diubah oleh administrator";

// ------------------------------------------------------------
// BUNDLE PRICING (Task 52) — gabungan promo komponen.
// Harga TIDAK dihardcode: dihitung dari harga komponen existing
// (IATA_PRODUCTS × SERTIFIKASI_PRODUCTS) mengikuti pola Task 51
// (bundle = jumlah harga promo komponen; normal = jumlah katalog).
// ------------------------------------------------------------
export interface IataBundle {
  kode: string;
  nama: string;
  komponen: string[];
  deskripsi: string;
  /** Jumlah harga katalog komponen. */
  hargaNormal: number;
  /** Jumlah harga promo/jasa komponen. */
  hargaPromo: number;
  url: string;
}

const iataProd = (kode: string) => {
  const p = productByKode(kode);
  if (!p) throw new Error(`Produk IATA tidak ditemukan: ${kode}`);
  return p;
};
const certProd = (kode: string) => {
  const c = certProductByKode(kode);
  if (!c) throw new Error(`Produk sertifikasi tidak ditemukan: ${kode}`);
  return c;
};
const sum = (...xs: number[]) => xs.reduce((a, b) => a + b, 0);

export const IATA_BUNDLES: IataBundle[] = [
  {
    kode: "TRAVEL-GLOBAL-STARTER",
    nama: "Travel Global Starter — IATA GoLite + Sertifikasi PPIU",
    komponen: [
      "IATA GoLite — konsultasi & pendampingan akreditasi (tanpa cash facility)",
      "Sertifikasi PPIU — izin penyelenggara umrah (Kemenag, KBLI 79122)",
    ],
    deskripsi:
      "Paket gabungan legalitas domestik + kelas internasional: izin PPIU untuk operasional umrah, disertai persiapan akreditasi IATA GoLite untuk penjualan tiket dan hotel.",
    hargaNormal: sum(iataProd("GOLITE").hargaKatalog, certProd("PPIU").hargaJasa),
    hargaPromo: sum(iataProd("GOLITE").hargaPromo, certProd("PPIU").hargaJasa),
    url: IATA_URLS.pillar,
  },
  {
    kode: "TRAVEL-GLOBAL-PRO",
    nama: "Travel Global Pro — IATA GoStandard + Sertifikasi PPIU + PIHK",
    komponen: [
      "IATA GoStandard — konsultasi & pendampingan akreditasi (dengan cash facility)",
      "Sertifikasi PPIU — izin penyelenggara umrah (Kemenag, KBLI 79122)",
      "Sertifikasi PIHK — penetapan haji khusus ONH Plus untuk PPIU aktif",
    ],
    deskripsi:
      "Paket lengkap travel ibadah kelas premium: piramida legalitas PPIU → PIHK sekaligus persiapan akreditasi IATA GoStandard dengan cash facility.",
    hargaNormal: sum(iataProd("GOSTANDARD").hargaKatalog, certProd("PPIU").hargaJasa, certProd("PIHK").hargaJasa),
    hargaPromo: sum(iataProd("GOSTANDARD").hargaPromo, certProd("PPIU").hargaJasa, certProd("PIHK").hargaJasa),
    url: IATA_URLS.pillar,
  },
];

export const IATA_BUNDLE_CATATAN =
  "Harga bundle merupakan penawaran gabungan jasa konsultasi komponen (jumlah harga promo masing-masing komponen), bukan biaya resmi IATA/Kemenag/Baparekraf. Komponen dapat diambil terpisah dengan harga masing-masing pada halaman produknya.";

// ------------------------------------------------------------
// LAYANAN A–H (pillar) & proses kerja 01–08
// ------------------------------------------------------------

export const IATA_SERVICES: { kode: string; judul: string; desc: string }[] = [
  {
    kode: "A",
    judul: "Initial Eligibility Assessment",
    desc: "Pemeriksaan awal profil perusahaan, model usaha, struktur badan usaha, dan kesiapan mengikuti proses akreditasi.",
  },
  {
    kode: "B",
    judul: "Corporate Legal Document Review",
    desc: "Review dokumen pendirian perusahaan, perubahan anggaran dasar, pengesahan AHU, NIB, NPWP, dan dokumen legal terkait.",
  },
  {
    kode: "C",
    judul: "Travel Business Licensing Review",
    desc: "Evaluasi kesesuaian izin dan ruang lingkup kegiatan usaha perjalanan berdasarkan kondisi perusahaan dan peraturan Indonesia.",
  },
  {
    kode: "D",
    judul: "Financial Readiness Review",
    desc: "Pemeriksaan kesiapan laporan keuangan dan dokumen finansial sesuai model akreditasi yang dipilih.",
  },
  {
    kode: "E",
    judul: "Application Document Preparation",
    desc: "Pendampingan penyiapan dan pengecekan kelengkapan dokumen.",
  },
  {
    kode: "F",
    judul: "Application Assistance",
    desc: "Pendampingan administratif dalam mempersiapkan proses pengajuan melalui saluran resmi IATA.",
  },
  {
    kode: "G",
    judul: "Follow-up Assistance",
    desc: "Bantuan koordinasi administratif dan persiapan jawaban atas klarifikasi yang masih termasuk dalam ruang lingkup kontrak.",
  },
  {
    kode: "H",
    judul: "Post-Approval Administrative Guidance",
    desc: "Panduan administratif awal setelah keputusan IATA, sesuai layanan yang disepakati.",
  },
];

export const IATA_PROCESS: { step: string; judul: string; desc: string }[] = [
  { step: "01", judul: "Konsultasi Awal", desc: "Klien menjelaskan profil perusahaan dan kebutuhan akreditasi." },
  { step: "02", judul: "Pemeriksaan Kelayakan", desc: "Tim melakukan pemeriksaan awal legalitas, operasional, dan finansial." },
  { step: "03", judul: "Penentuan Model", desc: "Menentukan apakah GoLite, GoStandard, atau GoGlobal paling relevan." },
  { step: "04", judul: "Quotation dan Kesepakatan", desc: "Klien menerima proposal, rincian pekerjaan, biaya, pengecualian, dan jadwal kerja konsultasi." },
  { step: "05", judul: "Document Preparation", desc: "Penyiapan dan pemeriksaan dokumen sesuai checklist yang berlaku." },
  { step: "06", judul: "Application Assistance", desc: "Pendampingan persiapan aplikasi dan koordinasi administratif melalui portal resmi IATA." },
  { step: "07", judul: "Clarification and Follow-up", desc: "Bantuan menyiapkan tanggapan administratif jika terdapat permintaan klarifikasi." },
  { step: "08", judul: "Closing and Handover", desc: "Penyerahan hasil pekerjaan konsultasi dan panduan tindak lanjut." },
];

/** Disclaimer wajib di footer setiap halaman IATA. */
export const IATA_DISCLAIMER =
  "PusatPerizinan.com adalah konsultan independen dan bukan cabang, agen resmi, atau mitra resmi IATA, serta tidak menerbitkan akreditasi IATA. IATA menentukan persyaratan, mengevaluasi permohonan, menetapkan financial security, dan mengambil keputusan akreditasi. Informasi IATA dapat berubah — checklist final mengikuti kondisi pemohon dan ketentuan terbaru IATA.";

// ------------------------------------------------------------
// WHATSAPP — nomor tunggal dari site config (bukan nomor fiktif)
// ------------------------------------------------------------

import { CONTACT } from "./site";
export const IATA_WA_NUMBER = CONTACT.whatsapp; // 6281269999910

export function iataWaLink(pesan: string): string {
  return `https://wa.me/${IATA_WA_NUMBER}?text=${encodeURIComponent(pesan)}`;
}

export const iataWaMessageOf = (p: IataProduct): string =>
  `Selamat siang ${SITE_NAME}, saya ingin berkonsultasi mengenai ${p.namaPendek} (${p.model}) untuk perusahaan kami. Mohon informasi mengenai pemeriksaan kelayakan, dokumen, ruang lingkup jasa, dan tahapan konsultasi.`;

export const IATA_WA_UMUM = `Selamat siang ${SITE_NAME}, saya ingin berkonsultasi mengenai akreditasi IATA untuk travel agent kami. Mohon informasi mengenai model akreditasi, pemeriksaan kelayakan, dan tahapan konsultasi.`;

// ------------------------------------------------------------
// Sumber resmi IATA (BAGIAN 16) — tampilkan di halaman relevan
// ------------------------------------------------------------

export const IATA_SOURCES: { label: string; url: string }[] = [
  {
    label: "IATA — Travel Agent Accreditation",
    url: "https://www.iata.org/en/services/travel-agency-program/accreditation-travel/",
  },
  {
    label: "IATA — Indonesia Travel Agent Requirements",
    url: "https://www.iata.org/en/services/travel-agency-program/accreditation-travel/country-requirements/a52w0000000fy2naaa/pax/",
  },
  {
    label: "IATA — What is GoLite Accreditation?",
    url: "https://portal.iata.org/faq/s/article/What-is-GoLite-Accreditation?language=en_US",
  },
  {
    label: "IATA — Financial Statements Requirements",
    url: "https://www.iata.org/en/services/travel-agency-program/accreditation-travel/country-requirements/a52w0000000fxwlaaq/pax/a53w0000000xbljaas/",
  },
  {
    label: "IATA — Passenger Agency Conference Resolutions Manual",
    url: "https://www.iata.org/en/fmc-documents/fcf40a84-4ded-436b-b738-1ab74f7bb38d/",
  },
];

export const absIataUrl = (path: string): string => `${SITE_URL}${path}`;
