// ============================================================
// DATA LOWONGAN KERJA — PusatPerizinan.com
// KEBIJAKAN REKRUTMEN:
// 1. SEMUA lowongan di halaman ini KHUSUS WANITA.
// 2. GAJI AWAL = KONTRAK KERJA 3 BULAN (bukan langsung UMR) — gaji masa
//    kontrak sesuai angka di masing-masing lowongan + BONUS bulanan dari
//    target. Setelah lolos evaluasi kontrak 3 bulan → UMR sesuai domisili
//    (acuan UMP DKI Jakarta 2026: Rp5.729.876).
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
  salaryDisplay?: string; // teks gaji khusus, mis. "Kontrak 3 Bln → UMR + Bonus Target"
  salaryNote?: string;
  education: string;
  experienceMonths: number;
  featured?: boolean;
  postedDaysAgo: number;
}

const ORG_MAIN = "PusatPerizinan.com";

// Catatan skema gaji — semua posisi kontrak 3 bulan dulu, UMR setelah lolos (acuan resmi 2026)
export const GAJI_NOTE =
  "Semua posisi memulai dengan kontrak kerja 3 bulan — gaji masa kontrak sesuai angka yang tercantum pada lowongan & surat perjanjian kerja (SPK) + bonus bulanan dari target yang ditetapkan perusahaan. Setelah lolos evaluasi kontrak 3 bulan, gaji menjadi UMR sesuai domisili pelamar (acuan UMP DKI Jakarta 2026: Rp5.729.876; UMK Kota Bekasi 2026: Rp5.999.422)";

const REMOTE_CITY = "Remote (Nasional)";
const REMOTE_ADDRESS = "Bekerja penuh dari rumah, koordinasi online harian (WIB)";

// Skema gaji Admin Media Sosial — angka konkret dari skema kontrak 3 bulan
// yang kini BERLAKU UNTUK SEMUA posisi (instruksi owner):
// masa kontrak 3 bulan Rp1.500.000/bulan WFH + bonus kinerja di luar gaji,
// setelah kontrak 3 bulan dinilai baik → UMR sesuai daerah masing-masing.
export const MEDIA_SOSIAL_SALARY_NOTE =
  "Skema gaji posisi ini: masa kontrak 3 bulan pertama Rp1.500.000/bulan (WFH) — di luar itu ada BONUS jika kinerja bagus. Setelah kontrak 3 bulan dinilai baik, gaji menjadi UMR sesuai daerah domisili masing-masing.";

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
      "Skrip live, briefing produk, dan jadwal mingguan tersedia — Anda fokus tampil dan mengubah penonton menjadi klien. Kerja remote dari rumah dengan set HP + ring light, gaji awal masa kontrak 3 bulan + bonus dari target penjualan live yang ditetapkan perusahaan.",
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
      "Gaji awal masa kontrak 3 bulan + bonus bulanan dari target penjualan live yang ditetapkan perusahaan",
      "Remote penuh — live dari rumah, jadwal live disepakati fleksibel",
      "Jenjang karier: Host Live → Senior Host → Live Streaming Supervisor → Live Commerce Manager",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Pelatihan produk, skrip live selling, dan teknik retensi penonton",
    ],
    skills: ["TikTok Live", "Shopee Live", "Facebook Live", "Instagram Live", "Live Selling", "Public Speaking", "Konversi Lead"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "Kontrak 3 Bln → UMR + Bonus Target",
    salaryNote: GAJI_NOTE,
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
      "Gaji awal masa kontrak 3 bulan + bonus dari target perusahaan, sepenuhnya remote, dengan jenjang karier jelas: Programmer → Senior Programmer → Tech Lead → IT Manager.",
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
      "Gaji awal masa kontrak 3 bulan + bonus bulanan dari capaian target yang ditetapkan perusahaan",
      "Remote penuh dari rumah — tanpa biaya transport & jam fleksibel",
      "Jenjang karier: Programmer → Senior Programmer → Tech Lead → IT Manager",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Anggaran belajar: kursus, konferensi, dan sertifikasi IT",
    ],
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "REST API", "Git", "Deploy & Monitoring"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "Kontrak 3 Bln → UMR + Bonus Target",
    salaryNote: GAJI_NOTE,
    education: "S1 Informatika/SI atau pengalaman & portofolio setara",
    experienceMonths: 24,
    featured: true,
    postedDaysAgo: 1,
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
      "Semua pekerjaan pajak saat ini bisa dijalankan online — sehingga posisi ini remote penuh. Gaji awal masa kontrak 3 bulan + bonus dari target kepatuhan yang ditetapkan perusahaan.",
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
      "Gaji awal masa kontrak 3 bulan + bonus bulanan dari capaian target yang ditetapkan perusahaan",
      "Remote penuh — seluruh proses pajak dijalankan via sistem online",
      "Jenjang karier: Staf → Staf Senior → Konsultan Pajak → Tax Manager",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Pelatihan Coretax & regulasi pajak terbaru didanai perusahaan",
    ],
    skills: ["PPh", "PPN", "Coretax DJP", "e-Faktur", "SPT Tahunan", "Rekonsiliasi", "Brevet A/B"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "Kontrak 3 Bln → UMR + Bonus Target",
    salaryNote: GAJI_NOTE,
    education: "D3/S1 Akuntansi/keuangan atau paham pajak praktis",
    experienceMonths: 12,
    featured: true,
    postedDaysAgo: 2,
  },
  {
    id: "job-konsultan-pajak",
    femaleOnly: true,
    slug: "konsultan-pajak",
    title: "Konsultan Pajak — Khusus Wanita (Remote)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Pajak & Keuangan",
    employmentType: "FULL_TIME",
    workType: "remote",
    city: REMOTE_CITY,
    province: "Nasional",
    address: REMOTE_ADDRESS,
    description: [
      "Tim pajak kami butuh konsultan wanita berpengalaman untuk menangani portofolio klien PPh, PPN, dan kepatuhan pajak dari konsultasi awal, perhitungan, Coretax DJP, hingga pendampingan pemeriksaan.",
      "Dibutuhkan 3 orang segera. Kerja remote penuh dengan gaji awal masa kontrak 3 bulan + bonus bulanan dari target yang ditetapkan perusahaan; jenjang karier jelas menuju Senior Consultant dan Tax Manager.",
    ],
    responsibilities: [
      "Melakukan konsultasi pajak klien via WhatsApp, telepon, dan video call",
      "Menghitung & menyusun kewajiban PPh (21, 23, 25) dan PPN klien",
      "Menyiapkan e-Filing, e-Bupot, dan pelaporan pajak di Coretax DJP",
      "Mendampingi klien saat pemeriksaan pajak dan menjawab surat DJP",
      "Menjaga rekam jejak dokumentasi pajak setiap klien secara rapi",
    ],
    qualifications: [
      "WANITA — sesuai kebijakan rekrutmen perusahaan (lowongan khusus perempuan)",
      "Usia maksimal 40 tahun",
      "DIBUTUHKAN: 3 orang segera",
      "Pengalaman minimal 2 tahun di bidang perpajakan (konsultan pajak, staf pajak kantor akuntan, atau internal perusahaan)",
      "Menguasai PPh & PPN praktis serta pelaporan di Coretax DJP",
      "Komunikasi jelas dan ramah untuk mendampingi klien",
    ],
    benefits: [
      "Gaji awal masa kontrak 3 bulan + bonus bulanan dari target",
      "Remote penuh — bekerja dari rumah di seluruh Indonesia",
      "Jenjang karier: Consultant → Senior Consultant → Tax Manager",
      "Evaluasi & kenaikan jenjang tiap 6 bulan berdasarkan performa",
    ],
    skills: ["Perpajakan", "PPh", "PPN", "Coretax DJP", "e-Filing", "Konsultasi Klien"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "Kontrak 3 Bln → UMR + Bonus Target",
    education: "D3/S1 Akuntansi, Perpajakan, Manajemen, atau pengalaman pajak setara",
    experienceMonths: 24,
    featured: true,
    postedDaysAgo: 0,
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
      "Bagi yang belum paham, kami melatih dari nol sampai mahir. Gaji awal masa kontrak 3 bulan + bonus dari target pengurusan yang ditetapkan perusahaan.",
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
      "Gaji awal masa kontrak 3 bulan + bonus bulanan dari capaian target yang ditetapkan perusahaan",
      "Remote penuh — pengurusan izin dilakukan via sistem online",
      "Jenjang karier: Staf → Staf Senior → Konsultan Perizinan → Head Operasional",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Pelatihan praktis OSS-RBA, KBLI, dan izin sektoral dari nol",
    ],
    skills: ["NIB", "OSS-RBA", "KBLI 2020", "LKPM", "Izin Sektoral", "Administrasi", "Ketelitian"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "Kontrak 3 Bln → UMR + Bonus Target",
    salaryNote: GAJI_NOTE,
    education: "Minimal SMA/SMK/D3 semua jurusan",
    experienceMonths: 6,
    featured: true,
    postedDaysAgo: 3,
  },
  {
    id: "job-staf-lkpm",
    femaleOnly: true,
    slug: "staf-lkpm",
    title: "Staf LKPM — Laporan Kemajuan Penanaman Modal BKPM/OSS (Khusus Wanita, Remote)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Perizinan & Legal",
    employmentType: "FULL_TIME",
    workType: "remote",
    city: REMOTE_CITY,
    province: "Nasional",
    address: REMOTE_ADDRESS,
    description: [
      "Kami butuh wanita yang menguasai LKPM (Laporan Kemajuan Penanaman Modal): menyusun dan mengajukan laporan triwulanan perusahaan klien di OSS-RBA/BKPM tepat waktu, rapi, dan tanpa penalti.",
      "Dibutuhkan 3 orang segera. Kerja remote penuh dengan gaji awal masa kontrak 3 bulan + bonus bulanan dari target yang ditetapkan perusahaan; pelatihan lanjutan perizinan & pelaporan investasi disediakan.",
    ],
    responsibilities: [
      "Menyusun & mengajukan LKPM klien per triwulan di OSS-RBA sesuai Peraturan BKPM",
      "Memantau jadwal kewajiban LKPM seluruh klien agar tidak ada yang terlambat",
      "Mengumpulkan data & dokumen pendukung dari klien untuk penyusunan laporan",
      "Menjawab koreksi/status LKPM dari BKPM/OSS dan merapikan ulang bila ditolak",
      "Mendokumentasikan riwayat pelaporan setiap klien secara tertib",
    ],
    qualifications: [
      "WANITA — sesuai kebijakan rekrutmen perusahaan (lowongan khusus perempuan)",
      "Usia maksimal 40 tahun",
      "DIBUTUHKAN: 3 orang segera",
      "Menguasai pengisian & pengajuan LKPM di OSS-RBA (punya pengalaman nyata, bukan sekadar tahu teori)",
      "Teliti, tertib jadwal, dan nyaman menghadapi tenggat pelaporan",
      "Paham dasar perizinan berusaha (NIB, KBLI) nilai tambah",
    ],
    benefits: [
      "Gaji awal masa kontrak 3 bulan + bonus bulanan dari target",
      "Remote penuh — bekerja dari rumah di seluruh Indonesia",
      "Pelatihan perizinan & pelaporan investasi disediakan",
      "Jenjang karier: Staff → Senior Staff → Supervisor Perizinan",
    ],
    skills: ["LKPM", "OSS-RBA", "BKPM", "KBLI", "Pelaporan Triwulanan", "Administrasi Dokumen"],
    salaryMin: 5729876,
    salaryMax: 5729876,
    salaryDisplay: "Kontrak 3 Bln → UMR + Bonus Target",
    education: "D3/S1 semua jurusan (Akuntansi/Manajemen/Hukum lebih disukai) atau pengalaman LKPM setara",
    experienceMonths: 0,
    featured: true,
    postedDaysAgo: 0,
  },
  {
    id: "job-admin-media-sosial",
    femaleOnly: true,
    slug: "admin-media-sosial",
    title: "Admin Media Sosial Semua Platform (IG, TikTok, LinkedIn, FB, X) — Khusus Wanita (WFH)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Marketing & Media Sosial",
    employmentType: "FULL_TIME",
    workType: "remote",
    city: REMOTE_CITY,
    province: "Nasional",
    address: REMOTE_ADDRESS,
    description: [
      "Kami mencari admin media sosial wanita yang mengelola SELURUH akun resmi perusahaan: Instagram, TikTok, LinkedIn, Facebook, X (Twitter), dan semua platform media sosial lainnya — dari menyiapkan konten, menjadwalkan posting, membalas komentar/DM, sampai mengubah followers menjadi lead WhatsApp.",
      "Kerja penuh WFH dari rumah dengan HP dan laptop sendiri. Gaji masa kontrak 3 bulan Rp1.500.000/bulan (di luar bonus kinerja), dan setelah lolos kontrak 3 bulan gaji naik menjadi UMR sesuai daerah masing-masing. Pengalaman mengurus media sosial diutamakan — tapi yang baru belajar dan serius berkembang kami latih juga.",
    ],
    responsibilities: [
      "Mengelola akun resmi Instagram, TikTok, LinkedIn, Facebook, X (Twitter), dan seluruh platform media sosial perusahaan",
      "Menyiapkan & menjadwalkan konten harian: caption, desain grafis, dan video pendek",
      "Membalas komentar, DM, dan pesan masuk dengan cepat, ramah, dan mengarahkan prospek ke WhatsApp resmi",
      "Memantau performa akun (reach, engagement, follower, lead) dan melaporkan pertumbuhan rutin",
      "Menjaga konsistensi identitas brand & tone of voice di semua platform",
      "Riset tren, hashtag, dan kompetitor untuk ide konten mingguan",
    ],
    qualifications: [
      "WANITA — sesuai kebijakan rekrutmen perusahaan (lowongan khusus perempuan)",
      "Usia maksimal 40 tahun",
      "WAJIB punya HP dan laptop sendiri + internet stabil untuk kerja WFH",
      "Diutamakan berpengalaman mengurus media sosial (pernah pegang akun IG/TikTok/FB/LinkedIn/X, milik sendiri atau perusahaan)",
      "Mahir dasar Canva/CapCut atau tools desain & edit video sederhana nilai plus",
      "Aktif, responsif, dan nyaman dengan ritme konten harian",
    ],
    benefits: [
      "Masa kontrak 3 bulan pertama Rp1.500.000/bulan — WFH langsung, di luar bonus jika kinerja bagus",
      "Setelah lolos kontrak 3 bulan → gaji menjadi UMR sesuai daerah masing-masing",
      "Bonus kinerja dari pertumbuhan akun & lead yang masuk",
      "Remote penuh — bekerja dari rumah di seluruh Indonesia dengan HP + laptop sendiri",
      "Jenjang karier: Admin Media Sosial → Social Media Specialist → Social Media Manager",
      "Pelatihan content plan, brand voice, dan tools scheduling",
    ],
    skills: ["Instagram", "TikTok", "LinkedIn", "Facebook", "X (Twitter)", "Content Planning", "Canva", "CapCut", "Community Management"],
    salaryMin: 1500000,
    salaryMax: 1500000,
    salaryDisplay: "Rp1,5 jt × 3 bln pertama → lalu UMR",
    salaryNote: MEDIA_SOSIAL_SALARY_NOTE,
    education: "Minimal SMA/SMK/D3 semua jurusan",
    experienceMonths: 0,
    featured: true,
    postedDaysAgo: 0,
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
