// ============================================================
// PUSATPERIZINAN.COM — KEPATUHANPRO (Langganan Kepatuhan / MRR)
// ============================================================
// Produk langganan bulanan/tahunan: LKPM, pajak, kepatuhan
// sektoral — mesin pendapatan berulang (recurring revenue).
// Harga RESMI mengacu ke PACKAGES di pricing.ts (server truth).
// ============================================================

export interface KepatuhanTier {
  sku: string; // id di PACKAGES
  skuTahunan: string;
  name: string;
  monthly: number;
  annual: number;
  strikeMonthly: number;
  strikeAnnual: number;
  audience: string;
  highlight: string[];
  best?: boolean;
}

export const KEPATUHAN_TIERS: KepatuhanTier[] = [
  {
    sku: "kepatuhan-starter",
    skuTahunan: "kepatuhan-starter-tahunan",
    name: "Starter",
    monthly: 499_000,
    annual: 4_990_000,
    strikeMonthly: 750_000,
    strikeAnnual: 8_988_000,
    audience: "UMKM & usaha perorangan yang belum pernah kena denda — dan tidak ingin pernah.",
    highlight: [
      "Alarm & pendampingan LKPM triwulanan",
      "Checklist + reminder pajak bulanan via WA",
      "2 jam konsultasi per bulan",
      "1 pengurusan dokumen tambahan / bulan",
      "Monitoring status izin & jatuh tempo",
    ],
  },
  {
    sku: "kepatuhan-growth",
    skuTahunan: "kepatuhan-growth-tahunan",
    name: "Growth",
    monthly: 1_490_000,
    annual: 14_900_000,
    strikeMonthly: 2_250_000,
    strikeAnnual: 26_880_000,
    best: true,
    audience: "PT/CV aktif dengan omzet jalan — tim pajak penuh tanpa rekrut pegawai.",
    highlight: [
      "Semua fitur Starter",
      "SPT Masa PPN & PPh 21/23 unifikasi tiap bulan",
      "LKPM dibantu submit sampai beres",
      "4 jam konsultasi senior / bulan",
      "3 pengurusan dokumen / bulan",
      "Dedicated admin WA, respons ≤ 30 menit",
    ],
  },
  {
    sku: "kepatuhan-scale",
    skuTahunan: "kepatuhan-scale-tahunan",
    name: "Scale",
    monthly: 3_990_000,
    annual: 39_900_000,
    strikeMonthly: 5_990_000,
    strikeAnnual: 71_880_000,
    audience: "Perusahaan menengah-besar: siap tender, siap audit, siap due diligence investor.",
    highlight: [
      "Semua fitur Growth",
      "Payroll + BPJS TK & Kesehatan",
      "Kepatuhan sektoral (Halal, BPOM, ISO)",
      "8 jam konsultasi senior + review kontrak",
      "5 pengurusan dokumen / bulan",
      "Compliance manager + laporan bulanan tertulis",
    ],
  },
];

export const KEPATUHAN_RISKS = [
  {
    title: "Denda LKPM tertidur",
    detail: "Tidak lapor LKPM 3 periode berturut-turut → NIB bisa dibekukan (dicabut) oleh OSS.",
    cost: "Risiko kehilangan NIB — seluruh legalitas usaha ikut lumpuh",
  },
  {
    title: "Denda pajak telat",
    detail: "SPT Masa terlambat: denda Rp 100.000/bulan (PPN) & Rp 100.000 (PPh); bunga per bulan.",
    cost: "Rp 1,2 juta+ per tahun per kewajiban — bisa dicegah Rp 499rb/bulan",
  },
  {
    title: "Izin kedaluwarsa diam-diam",
    detail: "Sertifikat Standar, SIP, Halal punya masa berlaku — lewat masa aktif = operasi ilegal.",
    cost: "Sanksi administratif → operasional berhenti saat dicek DPMPTSP",
  },
  {
    title: "Gagal tender & due diligence",
    detail: "Buyer/investor memeriksa kepatuhan 3 tahun terakhir — jejak berantakan = deal batal.",
    cost: "Kontrak miliaran hilang hanya karena administrasi berantakan",
  },
];

export const KEPATUHAN_FAQ = [
  {
    q: "Apa bedanya KepatuhanPRO dengan jasa pengurusan izin biasa?",
    a: "Pengurusan izin itu sekali jadi; KepatuhanPRO menjaga izin dan kewajibanmu tetap hidup setiap bulan — LKPM, pajak, masa berlaku dokumen, dan konsultasi. Ini yang membuat usaha aman dari denda, pembekuan NIB, dan gagal tender.",
  },
  {
    q: "Apakah saya harus pindah NPWP atau ganti konsultan pajak lama?",
    a: "Tidak perlu. KepatuhanPRO bekerja dengan data yang ada — kami tidak memindahkan NPWP. Bila kamu sudah punya konsultan pajak internal, kami bisa mengambil bagian perizinan & LKPM saja.",
  },
  {
    q: "Bagaimana cara berhenti langganan?",
    a: "Langganan bulanan bisa dihentikan kapan saja dengan pemberitahuan 14 hari sebelum periode berikutnya — tanpa penalti. Paket tahunan berlaku 12 bulan dan bisa dilanjutkan otomatis bila tidak dibatalkan.",
  },
  {
    q: "Apakah biaya resmi negara (PNBP, pajak terutang) sudah termasuk?",
    a: "Tidak. Harga langganan adalah jasa pendampingan & pengurusan. Pajak terutang, PNBP, dan biaya instansi dibayar langsung ke negara atas nama usahamu — kami kirimkan rinciannya transparan tiap bulan.",
  },
  {
    q: "Usaha saya masih kecil, ambil yang mana?",
    a: "Starter cukup untuk usaha perorangan/UMKM yang baru punya NIB. Bila sudah berbadan hukum (PT/CV) dan berputar pajak bulanan, Growth adalah pilihan paling ekonomis. Naik-turun tier bisa kapan saja.",
  },
  {
    q: "Apa yang terjadi pada data & dokumen saya?",
    a: "Dokumen tersimpan terstruktur di sistem kami dengan akses terbatas tim penanggung jawabmu, sesuai Kebijakan Privasi (UU PDP 27/2022). Saat berhenti langganan, seluruh arsip dikembalikan dalam satu tautan unduhan.",
  },
];

export const KEPATUHAN_META = {
  title: "KepatuhanPRO — Langganan Kepatuhan Usaha Mulai Rp 499rb/Bulan",
  description:
    "Langganan kepatuhan usaha: LKPM, SPT Masa PPN & PPh, monitoring izin, payroll & kepatuhan sektoral. Cegah denda & pembekuan NIB. Paket Starter, Growth, Scale — bulanan atau tahunan hemat 2 bulan.",
};
