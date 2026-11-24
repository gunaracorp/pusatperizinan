// ============================================================
// PUSATPERIZINAN.COM — SERTIFIKASI TRAVEL IBADAH & WISATA
// SOURCE OF TRUTH (Task 50, v1.23.0 "Trilogi Travel Ibadah")
// ============================================================
// SATU-SATUNYA sumber harga, produk, dasar hukum, dan link
// untuk trilogi sertifikasi: PPIU, PIHK, BPW. DILARANG menulis
// harga trilogi di file lain — selalu impor dari sini.
//
// POSISI BRAND (WAJIB dipertahankan):
//   • Harga = jasa konsultasi & pendampingan PT Top Konsultan
//     Internasional, BUKAN biaya resmi penerbit (Kemenag /
//     Baparekraf), bukan biaya LSUHK/notaris/OSS/pihak ketiga.
//   • PusatPerizinan.com konsultan independen — penerbit
//     (Kemenag/Baparekraf) menentukan syarat, memverifikasi,
//     dan mengambil keputusan akhir.
//   • Dasar hukum mengikuti ketentuan terkini yang diadopsi
//     situs (PMHU 2/2026 era Kementerian Haji dan Umrah,
//     KBLI 79122 umrah & haji khusus, KBLI 79120 BPW).
//   • Angka harga dari master brief owner (Task 50) — satu
//     harga all-in jasa, tanpa skema promo.
// ============================================================

import { SITE_URL, SITE_NAME } from "./site";

export const SERTIFIKASI_URLS = {
  ppiu: "/layanan/sertifikasi-ppiu",
  pihk: "/layanan/sertifikasi-pihk",
  bpw: "/layanan/sertifikasi-bpw",
  konsultasi: "/konsultasi-sertifikasi-travel",
  // ekosistem travel terkait (silo internal)
  iataPillar: "/layanan/iata-accreditation",
  paketPendirianUmrah: "/layanan/paket-pendirian-travel-umrah",
  upgradePihk: "/layanan/upgrade-ppiu-ke-pihk",
  kontak: "/kontak",
} as const;

/** Format rupiah gaya situs: Rp19.500.000 */
export const fmtIdrCert = (n: number): string => `Rp${n.toLocaleString("id-ID")}`;

export interface CertTravelProduct {
  kode: "PPIU" | "PIHK" | "BPW";
  nama: string;
  namaPendek: string;
  /** Harga jasa all-in saat ini (master brief owner Task 54). */
  hargaJasa: number;
  /** Harga normal sebelum promo (tampil dicoret) — opsional. */
  hargaNormal?: number;
  /** Label promo singkat untuk badge harga. */
  promoLabel?: string;
  url: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  authority: string;
  legalBasis: string;
  kbli: string;
  durasi: string;
  /** Peta bucket paket lead API (whitelist PACKAGES). */
  leadPackage: "UMKM" | "Bisnis" | "Enterprise";
}

export const SERTIFIKASI_PRODUCTS: CertTravelProduct[] = [
  {
    kode: "PPIU",
    nama: "Sertifikasi PPIU — Pengurusan Izin Penyelenggara Perjalanan Ibadah Umrah",
    namaPendek: "Sertifikasi PPIU",
    // Task 54 (master brief owner, 2026-11-24): promo SERTIFIKASI PPIU
    // Rp19.500.000 dari harga normal Rp25.000.000.
    hargaJasa: 19_500_000,
    hargaNormal: 25_000_000,
    promoLabel: "PROMO — Hemat Rp5,5 Juta",
    url: SERTIFIKASI_URLS.ppiu,
    seoTitle: "Sertifikasi PPIU 2026 | Promo Rp19,5 Juta (Normal Rp25 Juta) — Syarat & Proses Izin Umrah",
    metaDescription:
      "Pengurusan lengkap sertifikasi & izin PPIU (Penyelenggara Perjalanan Ibadah Umrah) di Kemenag/Kemenhaj: kesiapan badan usaha PT, KBLI 79122, dokumen administratif, pendampingan sertifikasi LSUHK, hingga izin terbit. PROMO Rp19,5 juta dari normal Rp25 juta — bayar QRIS semua e-wallet, konsultan sertifikasi BPW/PPIU pertama di Indonesia.",
    h1: "Sertifikasi PPIU 2026 — Pengurusan Lengkap Izin Penyelenggara Perjalanan Ibadah Umrah",
    authority: "Kementerian Agama RI (kanal perizinan umrah — era Kementerian Haji dan Umrah)",
    legalBasis:
      "PMHU 2/2026 (standar usaha haji & umrah terbaru, menggantikan Permenag 5/2021) + ketentuan perizinan umrah Kemenag; KBLI 79122 di OSS-RBA",
    kbli: "79122 — Perjalanan Ibadah Umrah dan Haji Khusus (tetap 1:1 di KBLI 2025)",
    durasi: "Estimasi 45–90 hari kerja (mengikuti antrean verifikasi penerbit)",
    leadPackage: "Bisnis",
  },
  {
    kode: "PIHK",
    nama: "Sertifikasi PIHK — Pengurusan Penetapan Penyelenggara Ibadah Haji Khusus (ONH Plus)",
    namaPendek: "Sertifikasi PIHK",
    hargaJasa: 25_000_000,
    url: SERTIFIKASI_URLS.pihk,
    seoTitle: "Sertifikasi PIHK 2026 | Haji Khusus ONH Plus — Syarat, Biaya & Proses",
    metaDescription:
      "Pengurusan penetapan PIHK (Penyelenggara Ibadah Haji Khusus) untuk menjual paket haji khusus ONH Plus secara legal: pemetaan prasyarat PPIU aktif & riwayat jamaah, dokumen jaminan, akomodasi, dan pelindungan jamaah sesuai standar terbaru. All-in Rp25 juta.",
    h1: "Sertifikasi PIHK 2026 — Jalur Legal Menjual Paket Haji Khusus (ONH Plus)",
    authority: "Kementerian Agama RI — penetapan syarat, verifikasi berkas & fisik oleh penerbit",
    legalBasis:
      "Ketentuan penyelenggaraan perjalanan ibadah haji khusus (era PMHU 2/2026) + ketentuan Kemenag tentang penetapan PIHK",
    kbli: "79122 — Perjalanan Ibadah Umrah dan Haji Khusus",
    durasi: "Estimasi 60–120 hari kerja (tergantung kelengkapan prasyarat)",
    leadPackage: "Enterprise",
  },
  {
    kode: "BPW",
    nama: "Sertifikasi BPW — Pengurusan Tanda Daftar Usaha Biro Perjalanan Wisata",
    namaPendek: "Sertifikasi BPW",
    hargaJasa: 15_000_000,
    url: SERTIFIKASI_URLS.bpw,
    seoTitle: "Sertifikasi BPW 2026 | Tanda Daftar Usaha Biro Perjalanan Wisata Rp15 Juta",
    metaDescription:
      "Pengurusan lengkap Tanda Daftar Usaha (TDA) BPW di Kemenparekraf/Baparekraf: kesiapan badan usaha, KBLI 79120, dokumen operasional wisata, pendampingan verifikasi hingga TDA terbit — fondasi legal biro perjalanan wisata profesional. All-in Rp15 juta.",
    h1: "Sertifikasi BPW 2026 — Pengurusan Lengkap Tanda Daftar Usaha Biro Perjalanan Wisata",
    authority: "Kemenparekraf/Baparekraf",
    legalBasis:
      "Ketentuan usaha biro perjalanan wisata (TDA BPW) Kemenparekraf/Baparekraf; KBLI 79120 di OSS-RBA",
    kbli: "79120 — Kegiatan Biro Perjalanan Wisata",
    durasi: "Estimasi 30–60 hari kerja",
    leadPackage: "UMKM",
  },
];

export const certProductByKode = (kode: string): CertTravelProduct | undefined =>
  SERTIFIKASI_PRODUCTS.find((p) => p.kode === kode);

/** Catatan harga wajib tampil di bawah setiap harga (transparansi). */
export const CERT_HARGA_CATATAN =
  "Harga merupakan jasa konsultasi dan pendampingan PusatPerizinan.com (PT Top Konsultan Internasional), bukan biaya resmi penerbit. Biaya resmi penerbit, LSUHK, notaris, OSS, terjemahan, jaminan bank, asuransi, pajak, dan biaya pihak ketiga tidak termasuk kecuali dinyatakan tertulis dalam quotation.";
export const CERT_HARGA_CATATAN_PENDEK =
  "Harga jasa konsultasi & pendampingan all-in — bukan biaya resmi penerbit. Biaya resmi dan pihak ketiga tidak termasuk kecuali tertulis dalam quotation.";

// ------------------------------------------------------------
// PROSES KERJA 01–08 (generic trilogi — dipakai ketiga halaman)
// ------------------------------------------------------------

export const CERT_PROCESS: { step: string; judul: string; desc: string }[] = [
  { step: "01", judul: "Konsultasi Blueprint Legal", desc: "Pemetaan kondisi badan usaha Anda saat ini: PT/CV/perseorangan, KBLI aktif, modal, dan tujuan bisnis." },
  { step: "02", judul: "Pemeriksaan Kesiapan Dokumen", desc: "Gap analysis dokumen legal, keuangan, dan operasional terhadap persyaratan penerbit yang berlaku." },
  { step: "03", judul: "Perbaikan Fondasi Usaha", desc: "Penyesuaian akta & anggaran dasar, NIB/KBLI di OSS-RBA, NPWP, dan struktur organisasi bila dibutuhkan." },
  { step: "04", judul: "Penyusunan Berkas Permohonan", desc: "Penyusunan seluruh dokumen permohonan, rencana usaha, dan dokumen komitmen sesuai checklist penerbit." },
  { step: "05", judul: "Pengajuan Resmi", desc: "Pendampingan pengajuan melalui kanal online resmi penerbit (Kemenag/Baparekraf) beserta bukti pengajuan." },
  { step: "06", judul: "Verifikasi & Klarifikasi", desc: "Pendampingan saat verifikasi berkas/fisik serta penyusunan jawaban atas permintaan klarifikasi penerbit." },
  { step: "07", judul: "Penerbitan Keputusan", desc: "Pemantauan status hingga SK/TDA terbit dan penyerahan salinan resmi beserta arsip digital." },
  { step: "08", judul: "Panduan Pasca-Terbit", desc: "Panduan kewajiban berkelanjutan: laporan berkala, perpanjangan, pelaporan keberangkatan, dan peningkatan kelas usaha." },
];

/** Disclaimer wajib di footer setiap halaman trilogi sertifikasi. */
export const CERT_DISCLAIMER =
  "PusatPerizinan.com adalah konsultan independen dan bukan cabang, agen resmi, atau mitra resmi penerbit izin. Kementerian Agama RI dan Kemenparekraf/Baparekraf menentukan persyaratan, melakukan verifikasi, dan mengambil keputusan akhir penerbitan izin. Persyaratan dan regulasi dapat berubah — checklist final mengikuti kondisi pemohon dan ketentuan terbaru.";

// ------------------------------------------------------------
// WHATSAPP — nomor tunggal dari site config (bukan nomor fiktif)
// ------------------------------------------------------------

import { CONTACT } from "./site";
export const CERT_WA_NUMBER = CONTACT.whatsapp; // 6281269999910

export function certWaLink(pesan: string): string {
  return `https://wa.me/${CERT_WA_NUMBER}?text=${encodeURIComponent(pesan)}`;
}

export const certWaMessageOf = (p: CertTravelProduct): string =>
  `Selamat siang ${SITE_NAME}, saya ingin konsultasi ${p.namaPendek} untuk perusahaan kami. Mohon informasi mengenai pemeriksaan kesiapan, dokumen yang dibutuhkan, ruang lingkup jasa all-in, dan tahapan pengurusan.`;

export const CERT_WA_UMUM = `Selamat siang ${SITE_NAME}, saya ingin konsultasi sertifikasi travel (PPIU, PIHK, atau BPW) untuk perusahaan kami. Mohon informasi mengenai syarat, biaya, dan tahapan pengurusan.`;

// ------------------------------------------------------------
// BERITA & HIMBAUAN WAJIB SERTIFIKASI PPIU (Task 54)
// HANYA memuat sumber yang sudah diverifikasi URL-nya —
// DILARANG menambah URL tanpa pengecekan langsung.
// ------------------------------------------------------------

export interface KemenhajNewsItem {
  title: string;
  date: string;
  source: string;
  url: string;
  summary: string;
}

export const KEMENHAJ_NEWS: KemenhajNewsItem[] = [
  {
    title: "Belum Lakukan Sertifikasi, 438 Penyelenggara Umrah Terancam Dibekukan",
    date: "14 November 2023",
    source: "kemenag.go.id — situs resmi Kementerian Agama RI",
    url: "https://kemenag.go.id/nasional/belum-lakukan-sertifikasi-438-penyelenggara-umrah-terancam-dibekukan-9vDAc",
    summary:
      "Pengumuman resmi pemerintah: izin operasional PPIU dicabut apabila tidak mendapatkan sertifikat baru dalam jangka waktu paling lama 6 (enam) bulan. Sertifikasi penyelenggara umrah ditetapkan sebagai kewajiban, bukan pilihan.",
  },
  {
    title: "Belum Lakukan Sertifikasi, Kemenag Bekukan Sementara Ijin Operasional Ratusan Travel Umrah",
    date: "9 Oktober 2024",
    source: "himpuh.or.id — Himpunan Penyelenggara Umrah & Haji Khusus",
    url: "https://himpuh.or.id/blog/detail/1863/belum-lakukan-sertifikasi-kemenag-bekukan-sementara-ijin-operasional-ratusan-travel-umrah",
    summary:
      "Bukan sekadar ancaman — pembekuan benar-benar dieksekusi. Ratusan PPIU mendapat sanksi pembekuan izin operasional sementara karena belum menyelesaikan sertifikasi.",
  },
  {
    title: "345 Izin Operasional Travel Umrah Dibekukan Sementara oleh Kemenag — Ini Sebabnya",
    date: "Oktober 2024",
    source: "Kabar Baitullah",
    url: "https://kabarbaitullah.jatimnetwork.com/umrah/106213703155/345-izin-operasional-travel-umrah-dibekukan-sementara-oleh-kemenag-ini-sebabnya",
    summary:
      "Sebanyak 345 PPIU (travel umrah) dibekukan sementara dalam satu gelombang karena belum tersertifikasi — daftar PPIU terdampak dipublikasikan, jamaah diarahkan memilih travel legal bersertifikat.",
  },
  {
    title: "KMA No. 1251 Tahun 2021 — Diktum ke-4: PPIU Wajib Sertifikasi Maksimal 2 Tahun Sejak Izin Diterbitkan",
    date: "Berlaku sejak 1 Desember 2021",
    source: "ekualindo.com — LSUHK terakreditasi",
    url: "https://ekualindo.com/sebanyak-438-zin-ppiu-terancam-akan-dibekukan",
    summary:
      "Dasar hukum kewajiban sertifikasi: KMA No. 1251/2021 menetapkan PPIU wajib tersertifikasi paling lama 2 tahun sejak izin diterbitkan, dan wajib sertifikasi ulang setiap 5 tahun sekali — tanpa sertifikat, izin operasional dibekukan/dicabut.",
  },
];

/** Portal resmi Kementerian Haji dan Umrah (Kemenhaj) — haji.go.id. */
export const KEMENHAJ_PORTAL_URL = "https://haji.go.id";
export const KEMENHAJ_NEWS_INTRO =
  "Kementerian Agama (kini era Kementerian Haji dan Umrah/Kemenhaj) telah menegaskan dan MENGEKSEKUSI kewajiban sertifikasi PPIU: izin tanpa sertifikat dibekukan sementara, dan dicabut bila dalam 6 bulan tidak tersertifikasi. Berikut sumber resminya:";

// ------------------------------------------------------------
// QRIS — pembayaran QRIS resmi pusatperizinan.com (Task 54)
// Gambar statis QRIS merchant di public/qris/ + konfirmasi WA.
// ------------------------------------------------------------

export const QRIS_IMAGE_PATH = "/qris/qris-pusatperizinan.jpg";
export const QRIS_IMAGE_ALT = "QRIS resmi pusatperizinan.com — scan dengan GoPay, OVO, DANA, ShopeePay, LinkAja, m-banking (BCA, Mandiri, BRI, BNI) dan semua aplikasi QRIS";

/** Pesan konfirmasi pembayaran via WhatsApp (setelah scan QRIS). */
export const qrisWaConfirmMessage = (produk: string, nominal: number): string =>
  `Selamat siang ${SITE_NAME}, saya sudah bayar QRIS untuk ${produk} sebesar ${fmtIdrCert(nominal)}. Berikut saya lampirkan bukti transfer. Mohon konfirmasi dan langkah selanjutnya. Terima kasih.`;

export const absCertUrl = (path: string): string => `${SITE_URL}${path}`;

// ------------------------------------------------------------
// JSON-LD helper — Service + Offer + FAQPage + BreadcrumbList
// ------------------------------------------------------------

export interface CertJsonLdInput {
  name: string;
  description: string;
  url: string;
  product: CertTravelProduct;
  breadcrumbName: string;
  faq: { q: string; a: string }[];
}

export function certJsonLd(input: CertJsonLdInput) {
  const { product } = input;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: input.name,
      serviceType: `Pengurusan ${product.namaPendek}`,
      url: absCertUrl(product.url),
      description: input.description,
      provider: {
        "@type": "ProfessionalService",
        name: SITE_NAME,
        url: SITE_URL,
        areaServed: "Indonesia",
      },
      areaServed: { "@type": "Country", name: "Indonesia" },
      offers: {
        "@type": "Offer",
        price: product.hargaJasa,
        priceCurrency: "IDR",
        url: absCertUrl(product.url),
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        priceValidUntil: "2026-12-31",
        description: `Jasa konsultasi dan pendampingan ${product.namaPendek} — all-in (bukan biaya resmi penerbit).${product.hargaNormal ? ` Promo ${fmtIdrCert(product.hargaJasa)} dari normal ${fmtIdrCert(product.hargaNormal)}.` : ""}`,
        ...(product.hargaNormal
          ? {
              priceSpecification: [
                {
                  "@type": "UnitPriceSpecification",
                  price: product.hargaJasa,
                  priceCurrency: "IDR",
                  valueAddedTaxIncluded: true,
                },
                {
                  "@type": "UnitPriceSpecification",
                  price: product.hargaNormal,
                  priceCurrency: "IDR",
                  valueAddedTaxIncluded: true,
                  priceType: "https://schema.org/ListPrice",
                },
              ],
            }
          : {}),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: input.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Layanan", item: `${SITE_URL}/layanan` },
        { "@type": "ListItem", position: 3, name: input.breadcrumbName, item: absCertUrl(product.url) },
      ],
    },
  ];
}
