// ============================================================
// PUSATPERIZINAN.COM — KATALOG PAKET SIAP-JUAL (Bayar Langsung)
// ============================================================
// SATU-SATUNYA sumber harga untuk checkout. Harga TIDAK PERNAH
// dikirim dari client — API selalu ambil dari sini (anti manipulasi).
// Harga = jasa konsultan (fee kami), TIDAK termasuk biaya resmi
// negara/notaris yang ditagihkan terpisah sesuai zona wilayah.
//
// JANGAN ganti `price` paket yang sudah jalan tanpa sengaja —
// order lama menyimpan amount-nya sendiri di tabel Order.
// ============================================================

export type PaketCategory = "kepatuhan" | "konsultasi" | "legalitas" | "izin" | "sertifikasi";

export interface PaketLayanan {
  /** id unik — dipakai sebagai ?paket= di /checkout */
  id: string;
  name: string;
  tagline: string;
  /** Harga jual tetap, Rupiah integer. */
  price: number;
  /** Harga coret untuk anchor (opsional). */
  strike?: number;
  duration: string;
  category: PaketCategory;
  popular?: boolean;
  features: string[];
  /** Langkah yang dikerjakan tim setelah pembayaran terkonfirmasi. */
  nextSteps: string[];
}

export const PAKET_LABEL: Record<PaketCategory, string> = {
  kepatuhan: "KepatuhanPRO — Langganan",
  konsultasi: "Konsultasi",
  legalitas: "Badan Usaha",
  izin: "Perizinan Dasar",
  sertifikasi: "Sertifikasi",
};

export const PACKAGES: PaketLayanan[] = [
  // ============ KEPATUHANPRO — LANGGANAN BULANAN (MRR) ============
  {
    id: "kepatuhan-starter",
    name: "KepatuhanPRO Starter",
    tagline: "Nol denda LKPM & pajak — alarm kepatuhan + admin pribadi setiap bulan.",
    price: 499_000,
    strike: 750_000,
    duration: "Langganan bulanan",
    category: "kepatuhan",
    features: [
      "Pengingat & pendampingan LKPM triwulanan (OSS-RBA)",
      "Checklist kepatuhan pajak bulanan + reminder WA",
      "2 jam konsultasi perizinan/pajak per bulan",
      "1 pengurusan dokumen tambahan per bulan (NIB baru/ubah data)",
      "Monitoring status izin & jatuh tempo di dashboard pribadi",
    ],
    nextSteps: [
      "Tim menghubungi WhatsApp-mu maks. 15 menit (jam kerja)",
      "Audit kepatuhan awal gratis — peta kewajiban usahamu",
      "Aktivasi dashboard + alarm jatuh tempo hari itu juga",
    ],
  },
  {
    id: "kepatuhan-growth",
    name: "KepatuhanPRO Growth",
    tagline: "Tim pajak & perizinan penuh untuk usaha yang naik kelas — fokus jualan, urusan legal aman.",
    price: 1_490_000,
    strike: 2_250_000,
    duration: "Langganan bulanan",
    category: "kepatuhan",
    popular: true,
    features: [
      "Semua fitur Starter",
      "Pelaporan SPT Masa PPN & PPh 21/23 unifikasi tiap bulan",
      "LKPM diajarkan + dibantu submit sampai beres",
      "4 jam konsultasi senior per bulan (pajak, ketenagakerjaan, izin)",
      "3 pengurusan dokumen/izin tambahan per bulan",
      "Dedicated admin via WhatsApp (respons ≤ 30 menit jam kerja)",
    ],
    nextSteps: [
      "Tim menghubungi WhatsApp-mu maks. 15 menit (jam kerja)",
      "Onboarding: akses dokumen & kalender kewajiban",
      "Pelaporan pertama diurus siklus terdekat",
    ],
  },
  {
    id: "kepatuhan-scale",
    name: "KepatuhanPRO Scale",
    tagline: "Departemen kepatuhan penuh di luar gedung — siap audit, siap tender, siap due diligence.",
    price: 3_990_000,
    strike: 5_990_000,
    duration: "Langganan bulanan",
    category: "kepatuhan",
    features: [
      "Semua fitur Growth",
      "Payroll & kepatuhan ketenagakerjaan (BPJS TK+Kes, kontrak kerja)",
      "Kepatuhan sektoral (Halal, BPOM, ISO, sertifikasi industri)",
      "8 jam konsultasi senior + review dokumen kontrak",
      "5 pengurusan dokumen/izin tambahan per bulan",
      "Compliance manager khusus + laporan bulanan tertulis",
    ],
    nextSteps: [
      "Tim menghubungi WhatsApp-mu maks. 15 menit (jam kerja)",
      "Gap analysis kepatuhan menyeluruh (2 minggu pertama)",
      "Roadmap kepatuhan 12 bulan + eksekusi mulai bulan ke-1",
    ],
  },
  // ============ KEPATUHANPRO — PAKET TAHUNAN (2 bulan gratis) ============
  {
    id: "kepatuhan-starter-tahunan",
    name: "KepatuhanPRO Starter — Tahunan",
    tagline: "Bayar 10 bulan, dapat 12 — hemat Rp 2,9 juta dibanding bulanan.",
    price: 4_990_000,
    strike: 8_988_000,
    duration: "Langganan 12 bulan",
    category: "kepatuhan",
    features: [
      "Semua fitur Starter (12 bulan penuh)",
      "Kunci harga 1 tahun — bebas kenaikan",
      "Audit kepatuhan awal + laporan tahunan",
      "Prioritas antrean pengurusan",
    ],
    nextSteps: [
      "Tim menghubungi WhatsApp-mu maks. 15 menit (jam kerja)",
      "Onboarding + audit kepatuhan awal",
      "Aktivasi 12 bulan penuh hari itu juga",
    ],
  },
  {
    id: "kepatuhan-growth-tahunan",
    name: "KepatuhanPRO Growth — Tahunan",
    tagline: "Paket paling laris untuk bisnis serius: 12 bulan ketenangan, bayar 10 bulan.",
    price: 14_900_000,
    strike: 26_880_000,
    duration: "Langganan 12 bulan",
    category: "kepatuhan",
    popular: true,
    features: [
      "Semua fitur Growth (12 bulan penuh)",
      "Kunci harga 1 tahun — bebas kenaikan",
      "Review SPT Tahunan badan gratis",
      "Prioritas antrean + dedicated admin penuh",
    ],
    nextSteps: [
      "Tim menghubungi WhatsApp-mu maks. 15 menit (jam kerja)",
      "Onboarding + kalender kewajiban 12 bulan",
      "Pelaporan pertama diurus siklus terdekat",
    ],
  },
  {
    id: "kepatuhan-scale-tahunan",
    name: "KepatuhanPRO Scale — Tahunan",
    tagline: "Department-grade kepatuhan sepanjang tahun — siap audit & due diligence kapan pun.",
    price: 39_900_000,
    strike: 71_880_000,
    duration: "Langganan 12 bulan",
    category: "kepatuhan",
    features: [
      "Semua fitur Scale (12 bulan penuh)",
      "Kunci harga 1 tahun — bebas kenaikan",
      "Gap analysis + roadmap kepatuhan 12 bulan",
      "Compliance manager khusus sepanjang periode",
    ],
    nextSteps: [
      "Tim menghubungi WhatsApp-mu maks. 15 menit (jam kerja)",
      "Gap analysis menyeluruh (2 minggu pertama)",
      "Roadmap + eksekusi mulai bulan ke-1",
    ],
  },
  {
    id: "konsultasi-30",
    name: "Konsultasi Perizinan 30 Menit",
    tagline: "Sesi 1-on-1 dengan konsultan senior via WhatsApp/Zoom — peta izin lengkap usahamu.",
    price: 99_000,
    strike: 250_000,
    duration: "Dijadwalkan ≤ 24 jam",
    category: "konsultasi",
    features: [
      "Analisis kebutuhan izin sesuai bidang usaha",
      "Daftar izin wajib + estimasi biaya resmi",
      "Rekomendasi KBLI paling aman & menguntungkan",
      "Rekam jejak chat dikirim setelah sesi",
      "Bisa diakui sebagai DP jasa lanjutan",
    ],
    nextSteps: [
      "Admin menghubungi WhatsApp-mu untuk atur jadwal",
      "Sesi konsultasi via WA call / Zoom sesuai janji",
      "Kamu terima ringkasan peta izin + estimasi biaya",
    ],
  },
  {
    id: "nib",
    name: "NIB & OSS-RBA",
    tagline: "Nomor Induk Berusaha resmi via OSS — fondasi legal semua jenis usaha.",
    price: 350_000,
    strike: 600_000,
    duration: "1 hari kerja",
    category: "izin",
    popular: true,
    features: [
      "Pendaftaran NIB resmi via OSS-RBA",
      "Konsultasi & pemilihan KBLI terbaik",
      "Sertifikat Standar sesuai tingkat risiko",
      "Panduan kewajiban pasca-terbit (LKPM dll.)",
      "Dokumen PDF resmi dikirim via WA & email",
    ],
    nextSteps: [
      "Tim mengambil data usaha + dokumen identitas via WA",
      "Pengajuan NIB di OSS-RBA atas nama usahamu",
      "NIB + Sertifikat Standar dikirim hari itu juga",
    ],
  },
  {
    id: "nib-ss-npwp",
    name: "Paket UMKM Lengkap: NIB + SS + NPWP",
    tagline: "Legalitas inti lengkap dalam 1 paket — siap buka rekening, marketplace, dan pinjaman modal.",
    price: 650_000,
    strike: 1_050_000,
    duration: "1-2 hari kerja",
    category: "izin",
    popular: true,
    features: [
      "NIB via OSS-RBA resmi",
      "Sertifikat Standar (SS) sesuai risiko usaha",
      "NPWP usaha/perorangan terdaftar",
      "Konsultasi KBLI + struktur kepemilikan",
      "Checklist kewajiban bulanan agar tak kena denda",
    ],
    nextSteps: [
      "Tim mengambil data via WhatsApp (KTP, data usaha)",
      "Penerbitan NIB + SS + NPWP berurutan",
      "Seluruh dokumen resmi dikirim via WA & email",
    ],
  },
  {
    id: "pt-perorangan",
    name: "Pendirian PT Perorangan",
    tagline: "Badan hukum tanpa notaris & tanpa modal minimum — UMKM naik kelas dengan legalitas PT.",
    price: 500_000,
    strike: 900_000,
    duration: "1-2 hari kerja",
    category: "legalitas",
    features: [
      "Pendaftaran PT Perorangan via OSS-RBA",
      "NIB sebagai badan hukum terverifikasi",
      "Verifikasi Kemenkumham/CYDO",
      "Cocok untuk UMKM & usaha perorangan",
      "Bebas biaya notaris — 100% online",
    ],
    nextSteps: [
      "Tim mengambil data via WhatsApp",
      "Registrasi PT Perorangan di OSS + verifikasi",
      "NIB badan hukum resmi dikirim via WA & email",
    ],
  },
  {
    id: "cv",
    name: "Pendirian CV & Firma",
    tagline: "Badan usaha ideal usaha keluarga/kemitraan — diakui bank & leasing.",
    price: 1_500_000,
    strike: 2_500_000,
    duration: "2-3 hari kerja",
    category: "legalitas",
    features: [
      "Akta notaris resmi CV/Firma",
      "SK Kemenkumham + NPWP badan",
      "NIB & domisili usaha",
      "Konsultasi perjanjian kerja sama sekutu",
      "Pendampingan buka rekening badan usaha",
    ],
    nextSteps: [
      "Tim kumpulkan data pendiri via WhatsApp",
      "Akta notaris + SK Kemenkumham diproses",
      "NPWP badan & NIB dikirim lengkap",
    ],
  },
  {
    id: "pt",
    name: "Pendirian PT (Perseroan Terbatas)",
    tagline: "Badan hukum paling kredibel — siap tender, investor, dan kredit bank besar.",
    price: 3_500_000,
    strike: 6_000_000,
    duration: "3-7 hari kerja",
    category: "legalitas",
    popular: true,
    features: [
      "Akta notaris + SK Kemenkumham",
      "NPWP badan & NIB",
      "Konsultasi struktur saham & susunan direksi",
      "Gratis 1x konsultasi pajak tahun pertama",
      "Pendampingan domisili virtual (opsional)",
    ],
    nextSteps: [
      "Tim kumpulkan data pendiri & pemegang saham",
      "Akta notaris + pengesahan Kemenkumham",
      "NPWP badan, NIB, dan dokumen lengkap dikirim",
    ],
  },
  {
    id: "halal",
    name: "Sertifikasi Halal",
    tagline: "Wajib bagi produk F&B (UU JPH) — kami urus sampai label halal terbit.",
    price: 1_200_000,
    strike: 2_000_000,
    duration: "14-30 hari",
    category: "sertifikasi",
    features: [
      "Pendampingan Proses Produk (PPP) via SEHATI",
      "Koordinasi penuh LPPOM & BPJPH",
      "Pemeriksaan bahan & dokumen produk",
      "Bantuan klaim subsidi kuota UMKM (bila memenuhi syarat)",
      "Panduan penggunaan label halal yang benar",
    ],
    nextSteps: [
      "Tim mengambil daftar produk & bahan via WhatsApp",
      "Pengajuan via SEHATI + penjadwalan audit",
      "Sertifikat halal terbit + label siap dipakai",
    ],
  },
  {
    id: "bpom",
    name: "Izin Edar BPOM & PIRT",
    tagline: "Jualan legal di marketplace & toko — MD untuk suplemen, PIRT untuk makanan olahan.",
    price: 2_500_000,
    strike: 4_000_000,
    duration: "30-60 hari",
    category: "sertifikasi",
    features: [
      "Pendaftaran CPPOB/MD sesuai jenis produk",
      "Koordinasi uji lab dengan laboratorium mitra",
      "Review desain label sesuai regulasi BPOM",
      "Pendampingan audit fasilitas produksi",
      "Nomor izin siap dipasang di kemasan & marketplace",
    ],
    nextSteps: [
      "Tim analisis produk → tentukan jalur PIRT/MD",
      "Dokumen + uji lab + label diproses",
      "Nomor izin edar resmi dikirim",
    ],
  },
];

export function getPackage(id: string): PaketLayanan | undefined {
  return PACKAGES.find((p) => p.id === id);
}

/** Format "Rp 350.000" deterministik (aman SSR). */
export function fmtRupiah(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

/** Nomor pesanan unik: INV-YYYYMMDD-XXXXXX */
export function generateOrderNo(): string {
  const d = new Date();
  const ymd =
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");
  const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `INV-${ymd}-${rnd}`;
}

/** Normalisasi nomor WA Indonesia → 62xxxxxxxxxx (10-15 digit). */
export function normalizeWa(raw: string): string | null {
  const digits = raw.replace(/[^0-9]/g, "").replace(/^0/, "62");
  if (digits.length < 10 || digits.length > 15) return null;
  if (!digits.startsWith("62") && !digits.startsWith("1")) return null; // izinkan uji internasional sederhana
  return digits;
}
