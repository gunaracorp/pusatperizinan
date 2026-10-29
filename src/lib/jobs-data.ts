// ============================================================
// DATA LOWONGAN KERJA — PusatPerizinan.com
// KEBIJAKAN REKRUTMEN:
// 1. SEMUA lowongan di halaman ini KHUSUS WANITA.
// 2. GAJI AWAL UMR (acuan UMP DKI Jakarta 2026: Rp5.729.876) +
//    BONUS bulanan dari target yang ditetapkan perusahaan.
// 3. SEMUA posisi bisa DIREMOTE (kerja dari rumah, koordinasi online).
// 4. JENJANG KARIER jelas di setiap posisi.
// Spesifikasi mengikuti Google Jobs (schema.org/JobPosting):
// tanggal posting dinamis saat build, validThrough +90 hari.
// ============================================================

export type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN";

export interface Job {
  id: string;
  slug: string;
  title: string;
  organization: string; // hiring organization
  isPartner: boolean;
  category:
    | "IT & Teknologi"
    | "Pajak & Keuangan"
    | "Perizinan & Legal"
    | "Administrasi & Layanan"
    | "Marketing & Media Sosial";
  femaleOnly: boolean; // true = posisi khusus perempuan
  employmentType: EmploymentType;
  workType: "onsite" | "hybrid" | "remote";
  city: string;
  province: string;
  address: string;
  description: string[];
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  skills: string[];
  salaryMin: number; // per bulan IDR
  salaryMax: number;
  salaryDisplay?: string; // teks gaji khusus, mis. "UMR + Bonus Target"
  salaryNote?: string;
  education: string;
  experienceMonths: number;
  featured?: boolean;
  postedDaysAgo: number;
}

const ORG_MAIN = "PusatPerizinan.com";

// Gaji awal UMR — acuan resmi 2026
export const UMR_NOTE =
  "Gaji awal UMR sesuai domisili pelamar (acuan UMP DKI Jakarta 2026: Rp5.729.876; UMK Kota Bekasi 2026: Rp5.999.422) + bonus bulanan dari target yang ditetapkan perusahaan";

const REMOTE_CITY = "Remote (Nasional)";
const REMOTE_ADDRESS = "Bekerja penuh dari rumah, koordinasi online harian (WIB)";

export const JOBS: Job[] = [
  {
    id: "job-live-streaming",
    femaleOnly: true,
    slug: "host-live-streaming-wanita",
    title: "Host Live Streaming (TikTok, Shopee, Facebook & Instagram) — Khusus Wanita (Remote)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Marketing & Media Sosial",
    employmentType: "FULL_TIME",
    workType: "remote",
    city: REMOTE_CITY,
    province: "Nasional",
    address: REMOTE_ADDRESS,
    description: [
      "Kami mencari wanita yang percaya diri tampil LIVE di TikTok, Shopee Live, Facebook, dan Instagram: mempresentasikan layanan perizinan & pajak dengan bahasa sederhana, menjawab pertanyaan penonton, dan mengarahkan penonton yang tertarik ke WhatsApp untuk konsultasi.",
      "Skrip live, briefing produk, dan jadwal mingguan tersedia — Anda fokus tampil dan mengubah penonton menjadi klien. Kerja remote dari rumah dengan set HP + ring light, gaji awal UMR + bonus dari target penjualan live yang ditetapkan perusahaan.",
    ],
    responsibilities: [
      "Memandu sesi live rutin di TikTok Live, Shopee Live, Facebook Live, dan Instagram Live",
      "Mempresentasikan layanan perizinan, pajak, dan paket usaha dengan bahasa sederhana",
      "Membaca & menjawab komentar live dengan cepat, ramah, dan tetap tenang",
      "Mengarahkan penonton yang tertarik ke WhatsApp resmi untuk konsultasi lanjutan",
      "Mengikuti skrip dan jadwal live mingguan yang disepakati bersama tim",
      "Melaporkan performa tiap sesi (penonton, interaksi, lead masuk)",
    ],
    qualifications: [
      "Wanita — posisi ini diperuntukkan khusus bagi perempuan",
      "Minimal SMA/SMK/D3 semua jurusan — fresh graduate dipersilakan",
      "Percaya diri dan luwes berbicara di depan kamera tanpa banyak cut",
      "Bahasa Indonesia lancar dan santai, mampu improvisasi menjawab penonton",
      "Punya HP memori besar + tripod/ring light + internet stabil — siap live dari rumah",
      "Pengalaman host live TikTok/Shopee adalah nilai plus besar",
    ],
    benefits: [
      "Gaji awal UMR + bonus bulanan dari target penjualan live yang ditetapkan perusahaan",
      "Remote penuh — live dari rumah, jadwal live disepakati fleksibel",
      "Jenjang karier: Host Live → Senior Host → Live Streaming Supervisor → Live Commerce Manager",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Pelatihan produk, skrip live selling, dan teknik retensi penonton",
    ],
    skills: ["TikTok Live", "Shopee Live", "Facebook Live", "Instagram Live", "Live Selling", "Public Speaking", "Konversi Lead"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "UMR + Bonus Target",
    salaryNote: UMR_NOTE,
    education: "Minimal SMA/SMK/D3 semua jurusan",
    experienceMonths: 0,
    featured: true,
    postedDaysAgo: 0,
  },
  {
    id: "job-fullstack-dev",
    femaleOnly: true,
    slug: "programmer-fullstack-wanita",
    title: "Programmer Full-Stack — Khusus Wanita (Remote)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "IT & Teknologi",
    employmentType: "FULL_TIME",
    workType: "remote",
    city: REMOTE_CITY,
    province: "Nasional",
    address: REMOTE_ADDRESS,
    description: [
      "Kami mencari programmer wanita full-stack yang menguasai IT dari hulu ke hilir: merancang arsitektur, menulis kode, membangun integrasi, deploy, sampai monitoring. Website kami (1.000+ halaman, alat AI gratis, payment gateway) adalah laboratorium kerja Anda.",
      "Gaji awal UMR + bonus dari target perusahaan, sepenuhnya remote, dengan jenjang karier jelas: Programmer → Senior Programmer → Tech Lead → IT Manager.",
    ],
    responsibilities: [
      "Mengembangkan fitur web berbasis Next.js/TypeScript secara end-to-end",
      "Merancang & mengelola database (Prisma/PostgreSQL) dan REST API",
      "Membangun integrasi: payment gateway, WhatsApp API, dan AI/LLM",
      "Mengoptimalkan Core Web Vitals, aksesibilitas, dan keamanan dasar",
      "Deploy, monitoring, dan menjaga uptime aplikasi produksi",
      "Menulis dokumentasi teknis dan melakukan code review tim",
    ],
    qualifications: [
      "Wanita — posisi ini diperuntukkan khusus bagi perempuan",
      "Pengalaman React/Next.js atau portofolio proyek nyata (wajib dibahas saat interview)",
      "Kuat TypeScript/JavaScript modern dan CSS/Tailwind",
      "Paham database relasional, REST API, dan Git workflow",
      "Punya laptop sendiri + internet stabil untuk kerja remote",
      "Nilai plus: SEO teknis, AI/LLM API, Docker",
    ],
    benefits: [
      "Gaji awal UMR + bonus bulanan dari capaian target yang ditetapkan perusahaan",
      "Remote penuh dari rumah — tanpa biaya transport & jam fleksibel",
      "Jenjang karier: Programmer → Senior Programmer → Tech Lead → IT Manager",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Anggaran belajar: kursus, konferensi, dan sertifikasi IT",
    ],
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "REST API", "Git", "Deploy & Monitoring"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "UMR + Bonus Target",
    salaryNote: UMR_NOTE,
    education: "S1 Informatika/SI atau pengalaman & portofolio setara",
    experienceMonths: 24,
    featured: true,
    postedDaysAgo: 1,
  },
  {
    id: "job-admin-marketing",
    femaleOnly: true,
    slug: "admin-marketing",
    title: "Admin Marketing — Khusus Wanita (Remote)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Administrasi & Layanan",
    employmentType: "FULL_TIME",
    workType: "remote",
    city: REMOTE_CITY,
    province: "Nasional",
    address: REMOTE_ADDRESS,
    description: [
      "Tim marketing kami butuh admin wanita yang rapi, cepat, dan komunikatif: mengurus data lead, penawaran, dan laporan — supaya konsultan dan tim iklan bisa fokus menutup penjualan.",
      "Anda tidak wajib jago jualan — yang penting teliti, responsif, dan disiplin target. Kerja remote penuh, gaji awal UMR + bonus dari target yang ditetapkan perusahaan.",
    ],
    responsibilities: [
      "Menginput dan merapikan data lead harian di CRM/ spreadsheet",
      "Menyusun penawaran paket layanan sesuai template perusahaan",
      "Follow-up administratif calon klien via WhatsApp & telepon",
      "Mengkoordinasikan jadwal konten, iklan, dan materi promo dengan tim",
      "Menyusun laporan marketing mingguan (jumlah lead, respons, konversi)",
      "Menjaga kecepatan respons semua inquiry masuk sesuai SOP",
    ],
    qualifications: [
      "Wanita — posisi ini diperuntukkan khusus bagi perempuan",
      "Minimal SMA/SMK/D3 semua jurusan — fresh graduate dipersilakan",
      "Teliti, rapi, dan disiplin terhadap target harian",
      "Mahir dasar spreadsheet (Excel/Google Sheets) dan WhatsApp Business",
      "Komunikasi tulis bahasa Indonesia yang sopan dan jelas",
      "Pengalaman admin marketing/sales support nilai tambah",
    ],
    benefits: [
      "Gaji awal UMR + bonus bulanan dari capaian target yang ditetapkan perusahaan",
      "Remote penuh dari rumah — tanpa biaya transport",
      "Jenjang karier: Admin → Senior Admin → Supervisor Marketing → Marketing Manager",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Pelatihan produk perizinan & pajak dari tim senior",
    ],
    skills: ["Administrasi", "CRM", "Spreadsheet", "WhatsApp Business", "Follow-up", "Laporan Mingguan"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "UMR + Bonus Target",
    salaryNote: UMR_NOTE,
    education: "Minimal SMA/SMK/D3 semua jurusan",
    experienceMonths: 0,
    featured: true,
    postedDaysAgo: 1,
  },
  {
    id: "job-admin-pelanggan",
    femaleOnly: true,
    slug: "admin-melayani-pelanggan",
    title: "Admin Melayani Pelanggan — Khusus Wanita (Remote)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Administrasi & Layanan",
    employmentType: "FULL_TIME",
    workType: "remote",
    city: REMOTE_CITY,
    province: "Nasional",
    address: REMOTE_ADDRESS,
    description: [
      "Ribuan pemilik usaha mempercayakan pengurusan izin dan pajaknya kepada kami. Admin melayani pelanggan adalah jangkar tenang mereka: mengabari progres, memastikan dokumen lengkap, dan membuat klien merasa diurus — bukan sekadar dilayani.",
      "Sepenuhnya remote, gaji awal UMR + bonus dari target pelayanan perusahaan, dengan jenjang karier menuju Client Success Manager.",
    ],
    responsibilities: [
      "Menjadi PIC progres pesanan klien (pengurusan izin/pajak) dari awal sampai selesai",
      "Mengabari status berkala ke klien via WhatsApp/email sesuai SOP",
      "Mengoordinasikan kebutuhan dokumen klien dengan tim operasional",
      "Mengarsipkan dokumen klien digital dengan rapi dan rahasia",
      "Menerima keluhan, menenangkan, dan meneruskan ke penanggung jawab",
      "Menjaga skor kepuasan dan mendorong klien memberi ulasan",
    ],
    qualifications: [
      "Wanita — posisi ini diperuntukkan khusus bagi perempuan",
      "Minimal SMA/SMK/D3 semua jurusan — fresh graduate dipersilakan",
      "Kesabaran dan empati tinggi menghadapi klien dari berbagai latar",
      "Komunikasi hangat via WhatsApp, telepon, dan email",
      "Teliti mengelola dokumen dan catatan progres",
      "Pengalaman CS/admin layanan pelanggan nilai tambah",
    ],
    benefits: [
      "Gaji awal UMR + bonus bulanan dari capaian target yang ditetapkan perusahaan",
      "Remote penuh dari rumah — tanpa biaya transport",
      "Jenjang karier: Admin → Senior Admin → Supervisor Layanan → Client Success Manager",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Pelatihan layanan pelanggan & produk perizinan dari nol",
    ],
    skills: ["Customer Service", "WhatsApp", "Manajemen Progres", "Arsip Digital", "Empati", "Komunikasi"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "UMR + Bonus Target",
    salaryNote: UMR_NOTE,
    education: "Minimal SMA/SMK/D3 semua jurusan",
    experienceMonths: 0,
    postedDaysAgo: 2,
  },
  {
    id: "job-staf-pajak",
    femaleOnly: true,
    slug: "staf-perpajakan-remote",
    title: "Staf Perpajakan (PPh, PPN & Coretax DJP) — Khusus Wanita (Remote)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Pajak & Keuangan",
    employmentType: "FULL_TIME",
    workType: "remote",
    city: REMOTE_CITY,
    province: "Nasional",
    address: REMOTE_ADDRESS,
    description: [
      "Kami mencari wanita yang menguasai perpajakan Indonesia: PPh, PPN, e-Faktur, e-Bupot, dan era Coretax DJP. Anda akan mengurus kepatuhan pajak klien UMKM & korporasi dari hulu (data & dokumen) ke hilir (SPT terlaporkan, status aman dari sanksi).",
      "Semua pekerjaan pajak saat ini bisa dijalankan online — sehingga posisi ini remote penuh. Gaji awal UMR + bonus dari target kepatuhan yang ditetapkan perusahaan.",
    ],
    responsibilities: [
      "Mengurus SPT masa PPh/PPN dan SPT tahunan orang pribadi & badan klien",
      "Mengoperasikan Coretax DJP, e-Faktur, dan e-Bupot untuk seluruh klien",
      "Memverifikasi kelengkapan data & dokumen pajak sebelum pelaporan",
      "Rekonsiliasi data transaksi klien dan melaporkan anomali ke supervisi",
      "Riset PMK/PER-1 DJP terbaru dan merangkumnya untuk tim",
      "Menjawab pertanyaan pajak dasar klien dengan bahasa sederhana",
    ],
    qualifications: [
      "Wanita — posisi ini diperuntukkan khusus bagi perempuan",
      "D3/S1 Akuntansi, Manajemen Keuangan, atau paham pajak praktis",
      "Pengalaman staf pajak minimal 1 tahun (pemahaman kuat dipertimbangkan)",
      "Menguasai dasar PPh 21/23/25, PPN, e-Faktur, dan Coretax DJP",
      "Sertifikasi Brevet A/B nilai plus",
      "Teliti terhadap angka dan tenggat pelaporan",
    ],
    benefits: [
      "Gaji awal UMR + bonus bulanan dari capaian target yang ditetapkan perusahaan",
      "Remote penuh — seluruh proses pajak dijalankan via sistem online",
      "Jenjang karier: Staf → Staf Senior → Konsultan Pajak → Tax Manager",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Pelatihan Coretax & regulasi pajak terbaru didanai perusahaan",
    ],
    skills: ["PPh", "PPN", "Coretax DJP", "e-Faktur", "SPT Tahunan", "Rekonsiliasi", "Brevet A/B"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "UMR + Bonus Target",
    salaryNote: UMR_NOTE,
    education: "D3/S1 Akuntansi/keuangan atau paham pajak praktis",
    experienceMonths: 12,
    featured: true,
    postedDaysAgo: 2,
  },
  {
    id: "job-staf-oss",
    femaleOnly: true,
    slug: "staf-perizinan-nib-oss",
    title: "Staf Perizinan NIB & OSS (OSS-RBA) — Khusus Wanita (Remote)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Perizinan & Legal",
    employmentType: "FULL_TIME",
    workType: "remote",
    city: REMOTE_CITY,
    province: "Nasional",
    address: REMOTE_ADDRESS,
    description: [
      "Kami mencari wanita yang menguasai perizinan NIB & OSS: mengajukan NIB, sertifikat standar, dan izin sektoral di OSS-RBA, membaca KBLI, serta memantau LKPM. Seluruh proses dilakukan online — cocok untuk kerja remote penuh.",
      "Bagi yang belum paham, kami melatih dari nol sampai mahir. Gaji awal UMR + bonus dari target pengurusan yang ditetapkan perusahaan.",
    ],
    responsibilities: [
      "Memproses pengajuan NIB, sertifikat standar, dan izin usaha di OSS-RBA",
      "Memetakan kebutuhan KBLI klien dan menyiapkan persyaratannya",
      "Menginput dan memantau LKPM berkala klien",
      "Mengajukan izin sektoral dan mengkoordinasikan dengan instansi terkait",
      "Memastikan dokumen klien lengkap sebelum diajukan ke instansi",
      "Mengarsipkan dokumen digital dan melaporkan progres per klien",
    ],
    qualifications: [
      "Wanita — posisi ini diperuntukkan khusus bagi perempuan",
      "Minimal SMA/SMK/D3 semua jurusan — siap dilatih penuh dari nol",
      "Pengalaman mengurus NIB/OSS adalah nilai plus besar",
      "Teliti, rapi, dan disiplin tenggat pengurusan",
      "Mahir dasar spreadsheet dan belajar sistem cepat",
      "Nyaman berkoordinasi online dengan tim & instansi",
    ],
    benefits: [
      "Gaji awal UMR + bonus bulanan dari capaian target yang ditetapkan perusahaan",
      "Remote penuh — pengurusan izin dilakukan via sistem online",
      "Jenjang karier: Staf → Staf Senior → Konsultan Perizinan → Head Operasional",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Pelatihan praktis OSS-RBA, KBLI, dan izin sektoral dari nol",
    ],
    skills: ["NIB", "OSS-RBA", "KBLI 2020", "LKPM", "Izin Sektoral", "Administrasi", "Ketelitian"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "UMR + Bonus Target",
    salaryNote: UMR_NOTE,
    education: "Minimal SMA/SMK/D3 semua jurusan",
    experienceMonths: 6,
    featured: true,
    postedDaysAgo: 3,
  },
  {
    id: "job-admin-cs",
    femaleOnly: true,
    slug: "admin-customer-service",
    title: "Admin Customer Service (WhatsApp & Chat) — Khusus Wanita (Remote)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Administrasi & Layanan",
    employmentType: "FULL_TIME",
    workType: "remote",
    city: REMOTE_CITY,
    province: "Nasional",
    address: REMOTE_ADDRESS,
    description: [
      "Setiap hari ratusan pertanyaan masuk via WhatsApp dan chat website: cara mengurus izin, biaya pajak, syarat dokumen. Admin customer service adalah orang pertama yang mereka temui — kesan pertama perusahaan ada di tangan Anda.",
      "Kerja remote penuh, gaji awal UMR + bonus dari target respon yang ditetapkan perusahaan, jenjang karier sampai CS Manager.",
    ],
    responsibilities: [
      "Menerima dan menjawab pertanyaan masuk via WhatsApp & chat website dengan cepat",
      "Menggali kebutuhan pengirim dan mengarahkan ke layanan yang tepat",
      "Meneruskan prospect yang siap ke tim konsultan/sales",
      "Mencatat setiap percakapan dengan disiplin di sistem",
      "Follow-up percakapan yang tertarik tapi belum tuntas",
      "Menjaga target kecepatan & kualitas respon sesuai SOP",
    ],
    qualifications: [
      "Wanita — posisi ini diperuntukkan khusus bagi perempuan",
      "Minimal SMA/SMK/D3 semua jurusan — fresh graduate dipersilakan",
      "Cepat mengetik dan nyaman berkomunikasi via chat sepanjang hari",
      "Bahasa Indonesia sopan, ramah, dan jelas",
      "Dasar spreadsheet untuk pencatatan percakapan",
      "Pengalaman CS/chat support nilai tambah",
    ],
    benefits: [
      "Gaji awal UMR + bonus bulanan dari capaian target yang ditetapkan perusahaan",
      "Remote penuh dari rumah — tanpa biaya transport",
      "Jenjang karier: Admin CS → Senior CS → Team Lead CS → CS Manager",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Skrip jawaban & pelatihan komunikasi tersedia lengkap",
    ],
    skills: ["Customer Service", "Chat Support", "WhatsApp Business", "Typing Cepat", "Pencatatan", "Follow-up"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "UMR + Bonus Target",
    salaryNote: UMR_NOTE,
    education: "Minimal SMA/SMK/D3 semua jurusan",
    experienceMonths: 0,
    postedDaysAgo: 3,
  },
  {
    id: "job-social-media",
    femaleOnly: true,
    slug: "admin-media-sosial",
    title: "Admin Media Sosial (Semua Platform) — Khusus Wanita (Remote)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Marketing & Media Sosial",
    employmentType: "FULL_TIME",
    workType: "remote",
    city: REMOTE_CITY,
    province: "Nasional",
    address: REMOTE_ADDRESS,
    description: [
      "Kami mencari wanita yang mengelola SEMUA media sosial perusahaan: Instagram, TikTok, Facebook, YouTube, dan LinkedIn — dari penjadwalan konten, caption, sampai membalas komentar dan DM.",
      "Anda memegang kepala strategi konten harian dengan brief jelas dari tim. Kerja remote penuh, gaji awal UMR + bonus dari target pertumbuhan yang ditetapkan perusahaan.",
    ],
    responsibilities: [
      "Mengelola akun Instagram, TikTok, Facebook, YouTube, dan LinkedIn perusahaan",
      "Menyusun jadwal posting dan mengunggah konten sesuai kalender",
      "Menulis caption & hashtag yang rapi dan sesuai brand",
      "Membalas komentar, DM, dan mention dengan cepat & ramah",
      "Membuat konten pendek (reels/short) bersama tim desain",
      "Menyusun laporan performa mingguan (jangkauan, follower, interaksi)",
    ],
    qualifications: [
      "Wanita — posisi ini diperuntukkan khusus bagi perempuan",
      "Minimal SMA/SMK/D3 semua jurusan — fresh graduate dipersilakan",
      "Aktif dan paham tren Instagram, TikTok, Facebook, YouTube, LinkedIn",
      "Mampu menulis caption rapi dan cepat menanggapi interaksi",
      "Nilai plus: bisa editing video pendek (CapCut/sejenisnya)",
      "Disiplin jadwal posting dan haus tren konten terbaru",
    ],
    benefits: [
      "Gaji awal UMR + bonus bulanan dari capaian target yang ditetapkan perusahaan",
      "Remote penuh dari rumah — tanpa biaya transport",
      "Jenjang karier: Admin → Social Media Officer → Social Media Specialist → Digital Marketing Manager",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Brief konten & template desain tersedia — fokus eksekusi",
    ],
    skills: ["Instagram", "TikTok", "Facebook", "YouTube", "LinkedIn", "Caption & Hashtag", "Laporan Performa"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "UMR + Bonus Target",
    salaryNote: UMR_NOTE,
    education: "Minimal SMA/SMK/D3 semua jurusan",
    experienceMonths: 0,
    postedDaysAgo: 4,
  },
];

// ============================================================
// Helper API
// ============================================================

export function getJobBySlug(slug: string): Job | undefined {
  return JOBS.find((j) => j.slug === slug);
}

export function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export function isoValidThrough(): string {
  const d = new Date();
  d.setDate(d.getDate() + 90);
  return `${d.toISOString().slice(0, 10)}T23:59:59+07:00`;
}

export function formatRupiah(n: number): string {
  return `Rp${(n / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`;
}

export function salaryText(job: Job): string {
  return job.salaryDisplay ?? `${formatRupiah(job.salaryMin)}–${formatRupiah(job.salaryMax)}`;
}

export const JOB_CATEGORIES = [
  "IT & Teknologi",
  "Pajak & Keuangan",
  "Perizinan & Legal",
  "Administrasi & Layanan",
  "Marketing & Media Sosial",
] as const;

export const FEMALE_ONLY_LABEL = "Khusus Wanita";
