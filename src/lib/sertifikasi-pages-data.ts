// ============================================================
// PUSATPERIZINAN.COM — KONTEN HALAMAN TRILOGI SERTIFIKASI
// (PPIU / PIHK / BPW) — Task 50, v1.23.0
// ============================================================
// Konten unik per halaman (anti doorway-page: struktur sama,
// isi, sudut pandang, dan FAQ beda total per produk). PPIU
// paling dalam — halaman utama SEO trilogi. Semua klaim hukum
// mengikuti sumber terverifikasi (Kemenag/Baparekraf/PMHU
// 2/2026 era) — tanpa angka kuota yang tidak terverifikasi.
// ============================================================

import type { CertTravelProduct } from "./sertifikasi-travel";
import { SERTIFIKASI_PRODUCTS, SERTIFIKASI_URLS } from "./sertifikasi-travel";

export interface CertPageContent {
  product: CertTravelProduct;
  badge: string;
  heroCopy: string[];
  intro: { heading: string; paragraphs: string[] };
  dasarHukum: { heading: string; items: { label: string; desc: string }[] };
  syarat: { heading: string; items: { nama: string; detail: string }[] };
  ruangLingkup: { heading: string; items: string[] };
  prosesIntro: string;
  perbedaan: {
    heading: string;
    intro: string;
    rows: { aspek: string; ppiu: string; pihk: string; bpw: string }[];
  };
  kesalahanUmum: { heading: string; items: { salah: string; risiko: string }[] };
  checklist: { heading: string; items: string[] };
  faq: { q: string; a: string }[];
  terkait: { label: string; href: string; desc: string }[];
  finalCta: { heading: string; desc: string };
}

// ============================================================
// PPIU — HALAMAN UTAMA SEO TRIGOLI (paling dalam & kaya keyword)
// ============================================================

export const PPIU_CONTENT: CertPageContent = {
  product: SERTIFIKASI_PRODUCTS[0],
  badge: "Sertifikasi PPIU — Era PMHU 2/2026",
  heroCopy: [
    "PPIU (Penyelenggara Perjalanan Ibadah Umrah) adalah legalitas inti untuk menjual paket umrah secara sah di Indonesia — diterbitkan atas keputusan penerbit di lingkungan kanal perizinan ibadah (Kemenag, era Kementerian Haji dan Umrah). Tanpa PPIU, usaha travel ibadah Anda beroperasi di jalur abu-abu: berisiko pemblokiran keberangkatan jamaah, sanksi administratif, hingga jerat pidana perjalanan ibadah palsu.",
    "Layanan Sertifikasi PPIU kami adalah pengurusan lengkap all-in: dari pemeriksaan kesiapan badan usaha PT, penyesuaian KBLI 79122 di OSS-RBA, penyusunan seluruh dokumen administratif, pendampingan sertifikasi penyelenggara melalui lembaga sertifikasi umrah & haji khusus terakreditasi (LSUHK), sampai izin terbit dan panduan kewajiban berkelanjutan.",
  ],
  intro: {
    heading: "Apa Itu Sertifikasi PPIU dan Mengapa Menjadi Gerbang Wajib Bisnis Umrah?",
    paragraphs: [
      "PPIU adalah badan usaha penyelenggara perjalanan ibadah umrah yang memiliki izin resmi untuk menyusun, menjual, dan memberangkatkan paket umrah. Istilah \"sertifikasi PPIU\" mencakup dua lapis kepatuhan yang kini berjalan bersamaan: (1) izin penyelenggaraan yang diterbitkan melalui kanal perizinan ibadah atas keputusan penerbit, dan (2) sertifikasi penyelenggara yang diverifikasi lembaga sertifikasi umrah dan haji khusus (LSUHK) terakreditasi — memastikan standar organisasi, pelindungan jamaah, dan mutu layanan terpenuhi.",
      "Sejak Peraturan Menteri Haji dan Umrah Nomor 2 Tahun 2026 (PMHU 2/2026 — menggantikan Permenag 5/2021) berlaku, standar usaha travel haji-umrah dinaikkan: verifikasi modal, akomodasi, pelindungan jamaah, dan identitas jemaah diatur lebih presisi, dengan sistem perizinan yang seluruhnya online. Konsekuensinya, dokumen yang disusun asal-asalan atau mengikuti template era lama semakin mudah ditolak saat verifikasi — justru di sinilah nilai pendampingan profesional.",
      "Pemilik travel yang memakai nama \"umrah\" di marketing-nya tanpa PPIU juga berisiko masuk daftar penipuan perjalanan ibadah yang dipublikasikan berkala oleh pemerintah — reputasi yang sulit dipulihkan. Sertifikasi PPIU bukan sekadar surat izin: itu tiket kepercayaan yang membuat jamaah berani transfer jutaan rupiah ke rekening kolektif Anda.",
    ],
  },
  dasarHukum: {
    heading: "Dasar Hukum & Kerangka Regulasi",
    items: [
      {
        label: "PMHU 2/2026",
        desc: "Standar usaha penyelenggaraan perjalanan ibadah umrah terbaru — menggantikan Permenag 5/2021; mengatur verifikasi modal, akomodasi, pelindungan jamaah, dan identitas jemaah.",
      },
      {
        label: "KBLI 79122",
        desc: "Kode klasifikasi \"Perjalanan Ibadah Umrah dan Haji Khusus\" di OSS-RBA — tetap 1:1 pada pemutakhiran KBLI 2025; KBLI yang tepat adalah fondasi profil risiko perizinan Anda.",
      },
      {
        label: "Sertifikasi LSUHK",
        desc: "Sertifikasi penyelenggara umrah & haji khusus bersifat wajib melalui lembaga sertifikasi yang terakreditasi — kami mendampingi persiapan audit sertifikasi dan perbaikan temuan.",
      },
      {
        label: "Sistem perizinan online penerbit",
        desc: "Seluruh alur permohonan, perpanjangan, dan pelaporan berjalan di sistem online resmi — kami mengurus pengajuan dan memantau status hingga terbit.",
      },
    ],
  },
  syarat: {
    heading: "Syarat Sertifikasi PPIU — Checklist Lengkap",
    items: [
      { nama: "Badan hukum PT", detail: "Penyelenggara umrah wajib berbadan hukum PT — CV dan usaha perseorangan tidak diperkenankan. Travel CV/perseorangan dapat berjalan paralel: pendirian PT baru dengan merek yang sama, lalu permohonan atas nama PT." },
      { nama: "KBLI 79122 aktif", detail: "Perubahan/penetapan KBLI di OSS-RBA ke 79122 (perjalanan ibadah umrah & haji khusus) sesuai profil risiko usaha — bukan sekadar 79120." },
      { nama: "Modal & laporan keuangan", detail: "Modal dan laporan keuangan disesuaikan standar usaha yang berlaku (PMHU 2/2026) — kami bantu menyusun dokumen yang lolos verifikasi, bukan laporan tempelan." },
      { nama: "Riwayat izin usaha perjalanan", detail: "Secara umum pemohon diharuskan memiliki fondasi izin usaha perjalanan yang sah (mis. TDA BPW aktif) dan riwayat operasi — detail masa operasi mengikuti ketentuan penerbit terbaru; kami memetakan posisi Anda sejak konsultasi pertama." },
      { nama: "Organisasi & pembimbing ibadah", detail: "Struktur organisasi, tenaga pembimbing ibadah, dan personel pendukung — terkait kewajiban sertifikasi kompetensi pembimbing." },
      { nama: "Rencana penyelenggaraan", detail: "Rencana kegiatan penjelajahan, pemilihan penanggung jawab keagenan, program perjalanan, dan penawaran umrah (skema biaya) sesuai format penerbit." },
      { nama: "Kepatuhan pelindungan jamaah", detail: "Dokumen pola pelindungan jamaah: asuransi perjalanan, rekening kolektif (escrow) dana jamaah, dan prosedur penanganan komplain — unsur yang paling sering menjadi temuan verifikasi." },
      { nama: "Kantor & sarana operasional", detail: "Alamat kantor, sarana prasarana, dan sistem pemasaran/penjualan yang dapat diverifikasi fisik maupun online." },
      { nama: "Dokumen legalitas dasar", detail: "Akta & SK Kemenkumham, NIB, NPWP, KTP/NPWP direksi, surat pernyataan — kami yang memeriksa konsistensi antar dokumen (sering terjadi nama/modal berbeda antar dokumen = tolak)." },
      { nama: "Bukti kerja sama (bila ada)", detail: "Draf kerja sama maktab/operator di Arab Saudi — memperkuat kesiapan operasional, meski belum wajib di tahap awal." },
    ],
  },
  ruangLingkup: {
    heading: "Ruang Lingkup Jasa All-In Rp20 Juta",
    items: [
      "Konsultasi blueprint legal: posisi badan usaha, struktur saham, modal, dan target keberangkatan.",
      "Gap analysis menyeluruh terhadap standar PMHU 2/2026 dan checklist penerbit terkini.",
      "Pendirian/perbaikan fondasi PT bila dibutuhkan (akta, SK Kemenkumham, AD/ART sesuai kegiatan ibadah).",
      "Pengurusan NIB & penyesuaian KBLI 79122 di OSS-RBA.",
      "Penyusunan seluruh dokumen permohonan: rencana penyelenggaraan, program perjalanan, skema biaya, organisasi.",
      "Penyusunan dokumen pelindungan jamaah: pola asuransi, rekening kolektif, SOP komplain & pengembalian dana.",
      "Pendampingan persiapan sertifikasi penyelenggara melalui LSUHK terakreditasi (persiapan audit & perbaikan temuan).",
      "Pengajuan resmi melalui sistem online penerbit + pemantauan status berkala.",
      "Pendampingan klarifikasi/perbaikan berkas saat verifikasi (termasuk dalam kontrak).",
      "Pemantauan hingga SK izin PPIU terbit + penyerahan arsip digital.",
      "Panduan pasca-terbit: laporan berkala, perpanjangan SIPU, dan pelaporan keberangkatan rombongan.",
      "Prioritas WhatsApp: tanya-jawab selama proses dengan SLA balasan jam kerja.",
    ],
  },
  prosesIntro:
    "Delapan tahap kerja yang sama untuk ketiga sertifikasi trilogi — tapi untuk PPIU, tahap 3 (perbaikan fondasi) adalah tahap terberat karena mayoritas penolakan terjadi di konsistensi dokumen legal dan pelindungan jamaah.",
  perbedaan: {
    heading: "PPIU vs PIHK vs BPW — Mana yang Anda Butuhkan?",
    intro:
      "Tiga sertifikasi ini sering disalahpahami sebagai produk yang sama. Padahal urutan legalitasnya berlapis: BPW adalah fondasi usaha perjalanan wisata, PPIU khusus umrah, PIHK khusus haji khusus (ONH Plus) dengan prasyarat PPIU aktif. Banyak klien menempuh jalur bertahap: BPW → PPIU → PIHK — dan kami menyiapkan dokumen sejak awal agar setiap naik kelas tidak perlu membangun ulang dari nol.",
    rows: [
      { aspek: "Tujuan usaha", ppiu: "Menjual & memberangkatkan paket umrah", pihk: "Menjual paket haji khusus (ONH Plus)", bpw: "Usaha biro perjalanan wisata umum (tur, tiket, MICE)" },
      { aspek: "Penerbit", ppiu: "Kanal perizinan ibadah (Kemenag — era KHU)", pihk: "Kemenag — penetapan PIHK", bpw: "Kemenparekraf/Baparekraf (TDA)" },
      { aspek: "KBLI kunci", ppiu: "79122", pihk: "79122", bpw: "79120" },
      { aspek: "Badan usaha", ppiu: "Wajib PT", pihk: "Wajib PT + PPIU aktif", bpw: "PT/CV/koperasi sesuai ketentuan TDA" },
      { aspek: "Prasyarat kunci", ppiu: "Riwayat izin perjalanan & standar modal", pihk: "Riwayat keberangkatan jamaah + jaminan/asuransi", bpw: "Rencana usaha & bukti kesiapan operasional" },
      { aspek: "Harga jasa all-in kami", ppiu: "Rp20.000.000", pihk: "Rp25.000.000", bpw: "Rp15.000.000" },
    ],
  },
  kesalahanUmum: {
    heading: "5 Kesalahan yang Paling Sering Membuat Pengajuan PPIU Gagal",
    items: [
      { salah: "Mengajukan atas nama CV/perseorangan", risiko: "Langsung gugur — penyelenggara umrah wajib PT. Solusi: pendirian PT paralel (bisa dengan merek yang sama) sebelum mengajukan." },
      { salah: "KBLI tidak sesuai (pakai 79120 saja)", risiko: "Profil risiko perizinan tidak menggambarkan kegiatan ibadah — berkas dikembalikan untuk perbaikan, antrean ulang dari awal." },
      { salah: "Dokumen legal tidak konsisten antar dokumen", risiko: "Nama, modal, atau alamat berbeda antara akta, NIB, dan NPWP menjadi temuan verifikasi yang memperlambat berminggu-minggu." },
      { salah: "Skema biaya & rekening jamaah tidak sesuai pola", risiko: "Unsur pelindungan jamaah (rekening kolektif, asuransi) adalah area verifikasi paling ketat pasca-PMHU 2/2026." },
      { salah: "Menggunakan template dokumen era Permenag 5/2021", risiko: "Standar sudah berubah — dokumen lama berpotensi ditolak audit sertifikasi dan verifikasi penerbit." },
    ],
  },
  checklist: {
    heading: "Checklist Dokumen yang Kami Siapkan & Periksa",
    items: [
      "Akta pendirian & perubahan terakhir + SK Kemenkumham yang masih berlaku",
      "NIB + profil profil risiko KBLI 79122 di OSS-RBA",
      "NPWP perusahaan & direksi + sisa kewajiban perpajakan (bila diminta)",
      "Laporan keuangan sesuai standar usaha (periodisasi mengikuti permohonan)",
      "Struktur organisasi + daftar pembimbing ibadah & personel pendukung",
      "Rencana penyelenggaraan umrah: program perjalanan, penawaran, skema biaya",
      "Dokumen pelindungan jamaah: pola asuransi, rekening kolektif, SOP komplain",
      "Bukti kepemilikan/sewa kantor & sarana operasional",
      "Surat pernyataan kesanggupan mengikuti ketentuan penyelenggaraan",
      "Bukti riwayat izin usaha perjalanan (TDA BPW/ketersediaan izin terkait)",
    ],
  },
  faq: [
    {
      q: "Berapa biaya sertifikasi PPIU?",
      a: "Jasa pengurusan lengkap kami Rp20.000.000 (all-in konsultasi, dokumen, pengajuan, dan pendampingan verifikasi). Biaya resmi penerbit, LSUHK, notaris, OSS, dan pihak ketiga dihitung terpisah dan disebutkan transparan dalam quotation sebelum kontrak — tidak ada biaya siluman di tengah proses.",
    },
    {
      q: "Berapa lama proses izin PPIU sampai terbit?",
      a: "Estimasi kerja kami 45–90 hari kerja sejak dokumen lengkap, tergantung kelengkapan awal dan antrean verifikasi penerbit. Travel yang sudah ber-PT rapi dengan KBLI tepat bisa jauh lebih cepat; yang harus mendirikan PT baru perlu menambah waktu pendirian (±14 hari kerja untuk akta + SK).",
    },
    {
      q: "Apakah travel baru atau CV bisa langsung menjadi PPIU?",
      a: "Umumnya tidak. Penyelenggara umrah wajib berbadan hukum PT, dan secara umum pemohon juga diharuskan memiliki fondasi izin usaha perjalanan yang sah serta riwayat operasi — detail kuota dan masa operasi mengikuti ketentuan penerbit terbaru. Jalur yang kami susun: pendirian PT + penataan izin dasar, lalu permohonan PPIU atas nama PT.",
    },
    {
      q: "Apa beda SPPU/SIPU dengan sertifikasi PPIU?",
      a: "Dalam praktik perizinan umrah dikenal Surat Persetujuan Penyelenggaraan Umrah (SPPU) sebagai pendaftaran penyelenggara dan Surat Izin Perjalanan Umrah (SIPU) sebagai izin operasional per rombongan/kegiatan yang diperbarui berkala. Sejak era PMHU 2/2026, kewajiban ini berlapis dengan sertifikasi penyelenggara melalui LSUHK. Layanan kami mencakup pengurusan administratif seluruh lapis tersebut sesuai ketentuan yang berlaku saat kontrak ditandatangani.",
    },
    {
      q: "Apakah harus punya kantor fisik dan karyawan?",
      a: "Ya — kantor dan sarana operasional yang dapat diverifikasi adalah standar minimal penyelenggara, ditambah struktur organisasi dengan pembimbing ibadah dan personel pendukung. Kami membantu menyiapkan profil organisasi yang memenuhi format penerbit, termasuk perencanaan sertifikasi kompetensi pembimbing.",
    },
    {
      q: "Apakah izin PPIU berlaku selamanya?",
      a: "Tidak. Izin penyelenggaraan memiliki masa berlaku dan kewajiban berkelanjutan: laporan kegiatan, pelaporan keberangkatan rombongan, perpanjangan berkala, serta kepatuhan terhadap standar usaha yang dapat berubah. Kami memberikan panduan pasca-terbit dan opsi layanan kepatuhan tahunan agar izin Anda tidak mati karena lapor telat.",
    },
    {
      q: "Bisakah sekaligus menyiapkan jalur PIHK?",
      a: "Bisa — dan inilah cara paling efisien. PIHK (haji khusus) menuntut PPIU aktif dengan riwayat keberangkatan jamaah tertentu, jadi dokumen PPIU yang kami susun dirancang agar andalan saat naik kelas ke PIHK nanti. Banyak klien mengambil paket PPIU dulu, lalu upgrade-ppiu-ke-pihk setelah memenuhi riwayat.",
    },
    {
      q: "Apa yang terjadi kalau pengajuan ditolak?",
      a: "Penolakan administratif kami tangani dalam lingkup kontrak: perbaikan berkas dan pengajuan ulang tanpa biaya tambahan jasa. Untuk penolakan karena kebijakan penerbit (mis. kuota tahapan usaha), kami menyusun roadmap pemenuhan syarat dan opsi jalur alternatif — transparan sejak awal, sesuai kebijakan garansi situs kami.",
    },
  ],
  terkait: [
    { label: "Paket Pendirian Travel Umrah Lengkap (PT + PPIU)", href: SERTIFIKASI_URLS.paketPendirianUmrah, desc: "Untuk yang belum punya PT sama sekali — satu paket dari nol sampai siap keberangkatan." },
    { label: "Sertifikasi PIHK — Haji Khusus (ONH Plus)", href: SERTIFIKASI_URLS.pihk, desc: "Naik kelas dari PPIU aktif menjadi penyelenggara haji khusus." },
    { label: "Sertifikasi BPW — Tanda Daftar Usaha", href: SERTIFIKASI_URLS.bpw, desc: "Fondasi izin biro perjalanan wisata — sering jadi langkah pertama sebelum PPIU." },
    { label: "IATA Accreditation untuk Travel Agent", href: SERTIFIKASI_URLS.iataPillar, desc: "Akreditasi internasional untuk agent yang ingin terbit tiket IATA." },
    { label: "Konsultasi Sertifikasi Travel (Form)", href: SERTIFIKASI_URLS.konsultasi, desc: "Isi profil perusahaan — tim kami petakan jalur PPIU/PIHK/BPW yang paling efisien." },
  ],
  finalCta: {
    heading: "Siap Membuat Travel Umrah Anda 100% Legal?",
    desc: "Konsultasi awal gratis — tim kami memeriksa posisi badan usaha Anda dan menyusun roadmap PPIU paling efisien, atau langsung eksekusi dengan layanan all-in Rp20 juta.",
  },
};

// ============================================================
// PIHK — HAJI KHUSUS (ONH PLUS): produk bernilai kontrak tertinggi
// ============================================================

export const PIHK_CONTENT: CertPageContent = {
  product: SERTIFIKASI_PRODUCTS[1],
  badge: "Sertifikasi PIHK — Haji Khusus ONH Plus",
  heroCopy: [
    "PIHK (Penyelenggara Ibadah Haji Khusus) adalah satu-satunya jalur legal menjual paket haji khusus ONH Plus di Indonesia. Jumlah PIHK sangat terbatas dan setiap penetapan diverifikasi langsung oleh penerbit di lingkungan Kemenag — syarat berkas, fisik, hingga riwayat keberangkatan jamaah diperiksa berlapis.",
    "Layanan Sertifikasi PIHK kami Rp25 juta all-in: pemetaan prasyarat (PPIU aktif + riwayat jamaah), penyusunan dokumen jaminan, asuransi jemaah, akomodasi, manajemen termin, hingga pendampingan verifikasi — dibangun di atas standar terbaru, bukan template era lama.",
  ],
  intro: {
    heading: "Apa Itu PIHK dan Mengapa Jalurnya Paling Selektif?",
    paragraphs: [
      "Haji khusus (ONH Plus) adalah skema haji dengan penyelenggaraan yang menempatkan jamaah melalui penyelenggara swasta dengan biaya berbeda dari haji reguler. Negara sangat selektif: hanya PIHK yang terdaftar resmi boleh menawarkannya. Kunci pertama yang sering terlewat calon pemohon: perusahaan wajib SUDAH memiliki izin PPIU aktif sebelum bisa mengajukan PIHK — lompat langsung dari travel biasa ke haji khusus bukan jalur yang diakui.",
      "Standar PIHK berlapis di atas PPIU: struktur dan modal lebih besar, jaminan bank, asuransi jemaah, akomodasi Makkah–Madinah yang disetujui, manajemen termin pembayaran jamaah yang diawasi, hingga standar pelindungan jemaah yang dipertegas era PMHU 2/2026. Penerbit memverifikasi berkas DAN kondisi fisik-operasional — bukan sekadar kecocokan administratif.",
      "Konsekuensinya: proses PIHK adalah proyek 60–120 hari kerja dengan prasyarat yang harus dikejar bertahap. Nilai kontrak per jamaah ONH Plus yang tinggi membuat setiap slot penetapan sangat berharga — dan justru karena selektif itulah, pendampingan yang rapi menentukan lolos atau ulang tahun depan.",
    ],
  },
  dasarHukum: {
    heading: "Dasar Hukum & Kerangka Regulasi",
    items: [
      { label: "Ketentuan haji khusus era PMHU 2/2026", desc: "Standar penyelenggaraan perjalanan ibadah haji khusus terbaru — meliputi pelindungan jemaah, manajemen termin, dan standar usaha." },
      { label: "Ketentuan penetapan PIHK", desc: "Penerbit menetapkan syarat perizinan, melakukan verifikasi berkas dan fisik di lapangan, serta mengambil keputusan penetapan." },
      { label: "KBLI 79122", desc: "Klasifikasi usaha perjalanan ibadah umrah dan haji khusus — basis profil usaha di OSS-RBA (tetap 1:1 di KBLI 2025)." },
      { label: "Prasyarat PPIU aktif", desc: "PIHK hanya dapat diajukan oleh perusahaan dengan izin PPIU yang aktif dan riwayat memberangkatkan jamaah sesuai ketentuan — kuota riwayat mengikuti aturan terbaru penerbit." },
    ],
  },
  syarat: {
    heading: "Syarat Sertifikasi PIHK — Checklist Lengkap",
    items: [
      { nama: "Izin PPIU aktif", detail: "Prasyarat mutlak — perusahaan harus sudah menjadi PPIU dengan riwayat keberangkatan yang memenuhi ketentuan. Kami audit dulu posisi Anda: berapa langkah lagi menuju prasyarat minimal." },
      { nama: "Struktur & modal lebih besar", detail: "Modal dan laporan keuangan sesuai standar PIHK — termasuk kemampuan mengelola termin jamaah yang diawasi." },
      { nama: "Jaminan bank", detail: "Dokumen jaminan (bank guarantee) sesuai format penerbit — kami bantu koordinasi format dan istilah dengan bank Anda." },
      { nama: "Asuransi jemaah", detail: "Skema asuransi perjalanan/kecelakaan jamaah haji khusus yang disetujui — bagian paket pelindungan jemaah yang diverifikasi." },
      { nama: "Akomodasi Makkah–Madinah", detail: "Bukti kerja sama hotel/akomodasi yang memenuhi standar jarak & kualitas — draf kontrak maktab/operator memperkuat berkas." },
      { nama: "Manajemen termin & rekening kolektif", detail: "Prosedur pengelolaan dana jamaah (rekening kolektif, termin) yang transparan dan terdokumentasi." },
      { nama: "Pelindungan jemaah", detail: "SOP pelindungan jemaah: penanganan komplain, pengembalian dana, pendampingan di lapangan — area verifikasi paling ketat." },
      { nama: "Organisasi & pembimbing", detail: "Struktur organisasi lengkap + pembimbing ibadah haji bersertifikat sesuai ketentuan." },
      { nama: "Rencana keberangkatan", detail: "Rencana penyelenggaraan jamaah: kuota target, program, rute, dan penanganan darurat — format penerbit." },
      { nama: "Dokumen legalitas dasar", detail: "Akta, NIB/KBLI 79122, NPWP, laporan keuangan — konsistensi antar dokumen wajib sempurna." },
    ],
  },
  ruangLingkup: {
    heading: "Ruang Lingkup Jasa All-In Rp25 Juta",
    items: [
      "Audit kesiapan PIHK: seberapa jauh posisi PPIU Anda dari prasyarat penetapan.",
      "Roadmap pemenuhan prasyarat bertahap dengan tenggat per periode keberangkatan.",
      "Penyusunan seluruh berkas permohonan penetapan PIHK sesuai format penerbit.",
      "Koordinasi format dokumen jaminan bank & skema asuransi jemaah.",
      "Penyusunan dokumen akomodasi & draf kerja sama maktab/operator.",
      "Penyusunan SOP pelindungan jemaah + manajemen termin/rekening kolektif.",
      "Pengajuan resmi + pendampingan verifikasi berkas dan fisik penerbit.",
      "Penyusunan jawaban klarifikasi dan perbaikan temuan dalam lingkup kontrak.",
      "Pemantauan hingga penetapan PIHK terbit + penyerahan arsip resmi.",
      "Panduan kewajiban pasca-penetapan: pelaporan, kuota, dan evaluasi periode.",
    ],
  },
  prosesIntro:
    "Untuk PIHK, tahap 02 (pemeriksaan kesiapan) adalah penentu: jika prasyarat PPIU/riwayat belum terpenuhi, kami jujur menyusun roadmap pemenuhan dulu — mengajukan prematur hanya menguras antrean dan reputasi.",
  perbedaan: {
    heading: "PPIU vs PIHK vs BPW — Mana yang Anda Butuhkan?",
    intro:
      "PIHK berdiri di puncak piramida travel ibadah: prasyaratnya PPIU aktif, dan PPIU sendiri umumnya dibangun di atas fondasi izin perjalanan yang sah. Ini peta lengkapnya agar Anda tidak salah langkah — atau salah belajar dari konsultan yang salah.",
    rows: [
      { aspek: "Tujuan usaha", ppiu: "Menjual & memberangkatkan paket umrah", pihk: "Menjual paket haji khusus (ONH Plus)", bpw: "Usaha biro perjalanan wisata umum (tur, tiket, MICE)" },
      { aspek: "Penerbit", ppiu: "Kanal perizinan ibadah (Kemenag — era KHU)", pihk: "Kemenag — penetapan PIHK", bpw: "Kemenparekraf/Baparekraf (TDA)" },
      { aspek: "KBLI kunci", ppiu: "79122", pihk: "79122", bpw: "79120" },
      { aspek: "Badan usaha", ppiu: "Wajib PT", pihk: "Wajib PT + PPIU aktif", bpw: "PT/CV/koperasi sesuai ketentuan TDA" },
      { aspek: "Prasyarat kunci", ppiu: "Riwayat izin perjalanan & standar modal", pihk: "Riwayat keberangkatan jamaah + jaminan/asuransi", bpw: "Rencana usaha & bukti kesiapan operasional" },
      { aspek: "Harga jasa all-in kami", ppiu: "Rp20.000.000", pihk: "Rp25.000.000", bpw: "Rp15.000.000" },
    ],
  },
  kesalahanUmum: {
    heading: "5 Kesalahan Fatal Calon Pemohon PIHK",
    items: [
      { salah: "Mengajukan PIHK saat PPIU belum aktif/lama", risiko: "Gugur administratif — prasyarat PPIU aktif mutlak. Audit kesiapan dulu, jangan tebak." },
      { salah: "Menghitung riwayat jamaah sendiri", risiko: "Definisi riwayat yang dihitung penerbit bisa berbeda dari catatan internal Anda — selalu rekonsiliasi dengan data penerbitan." },
      { salah: "Format jaminan bank tidak sesuai", risiko: "Berkas dikembalikan; antrean verifikasi ulang bisa berbulan-bulan karena slot haji bersifat periodik." },
      { salah: "Akomodasi & maktab hanya janji lisan", risiko: "Verifikasi fisik menuntut bukti kerja sama konkret — kontrak yang lemah = temuan mayor." },
      { salah: "SOP pelindungan jemaah tempelan", risiko: "Ini area yang paling digali penerbit — SOP yang tidak konsisten dengan operasional nyata menggagalkan penetapan." },
    ],
  },
  checklist: {
    heading: "Checklist Dokumen yang Kami Siapkan & Periksa",
    items: [
      "Izin PPIU aktif + rekap riwayat keberangkatan jamaah (rekonsiliasi data penerbitan)",
      "Laporan keuangan & dokumen modal sesuai standar PIHK",
      "Draf/dokumen jaminan bank sesuai format penerbit",
      "Skema & polis asuransi jemaah haji khusus",
      "Bukti kerja sama akomodasi Makkah–Madinah + draf kontrak maktab/operator",
      "Prosedur manajemen termin & rekening kolektif dana jamaah",
      "SOP pelindungan jemaah + penanganan komplain & pengembalian dana",
      "Struktur organisasi + sertifikat pembimbing ibadah haji",
      "Rencana keberangkatan: kuota target, program, rute, penanganan darurat",
      "Legalitas dasar: akta, NIB/KBLI 79122, NPWP — konsistensi terverifikasi",
    ],
  },
  faq: [
    {
      q: "Berapa biaya sertifikasi PIHK?",
      a: "Jasa pengurusan penetapan PIHK kami Rp25.000.000 (all-in). Biaya jaminan bank, asuransi, kontrak maktab, dan biaya resmi penerbit dihitung terpisah dan tertulis dalam quotation — jasa kami adalah konsultasi, dokumen, dan pendampingan verifikasi.",
    },
    {
      q: "Apakah harus PPIU dulu sebelum PIHK?",
      a: "Ya. Berdasarkan aturan yang berlaku, perusahaan wajib memiliki izin PPIU yang aktif sebelum dapat mengajukan PIHK, ditambah riwayat keberangkatan jamaah sesuai ketentuan. Jalur tercepat menuju haji khusus adalah menata PPIU sejak sekarang — bukan menunggu.",
    },
    {
      q: "Berapa lama proses penetapan PIHK?",
      a: "Estimasi kerja kami 60–120 hari kerja sejak prasyarat terpenuhi dan berkas lengkap — slot verifikasi haji khusus bersifat periodik mengikuti kalender keberangkatan, jadi keterlambatan dokumen bisa berarti menunggu periode berikutnya.",
    },
    {
      q: "Apa beda haji khusus (ONH Plus) dengan haji reguler dari sisi bisnis?",
      a: "Haji khusus dijual penyelenggara swasta dengan paket layanan berbeda (akomodasi, domestik, pendampingan) dan harganya jauh di atas haji reguler — hanya PIHK yang legal menjualnya. Peredaran paket 'haji plus' oleh pihak tanpa penetapan PIHK adalah praktik ilegal yang tegas ditindak.",
    },
    {
      q: "Bagaimana dengan jaminan bank dan asuransi?",
      a: "Keduanya bagian paket pelindungan jemaah yang diverifikasi penerbit. Kami menyiapkan format dokumen sesuai ketentuan, mengoordinasikan dengan bank/asuransi Anda, dan memastikan skema termin/rekening kolektif konsisten dengan berkas yang diajukan.",
    },
    {
      q: "Apakah layanan ini termasuk perbaikan jika verifikasi menemukan temuan?",
      a: "Ya — penyusunan jawaban klarifikasi dan perbaikan temuan dalam lingkup kontrak tanpa biaya jasa tambahan. Untuk temuan prasyarat besar (mis. riwayat jamaah belum cukup), kami susun roadmap pemenuhan dan opsi penjadwalan periode berikutnya secara transparan.",
    },
  ],
  terkait: [
    { label: "Sertifikasi PPIU — Izin Penyelenggara Umrah", href: SERTIFIKASI_URLS.ppiu, desc: "Prasyarat mutlak PIHK — mulai dari sini bila PPIU Anda belum aktif." },
    { label: "Upgrade PPIU ke PIHK — Paket Roadmap", href: SERTIFIKASI_URLS.upgradePihk, desc: "Paket komprehensif penyesuaian standar usaha haji-umrah menuju kelas PIHK." },
    { label: "Audit Kepatuhan Standar Usaha Haji & Umrah (PMHU 2/2026)", href: "/layanan/kepatuhan-pmh-2-2026", desc: "Cek kepatuhan berkala agar penetapan Anda aman di audit berikutnya." },
    { label: "PPMP — Perwakilan Marketing Resmi PIHK", href: "/layanan/ppmp-pihk", desc: "Untuk partner yang ingin memasarkan jamaah bekerja sama dengan PIHK resmi." },
    { label: "Konsultasi Sertifikasi Travel (Form)", href: SERTIFIKASI_URLS.konsultasi, desc: "Petakan posisi PPIU Anda terhadap prasyarat PIHK hari ini." },
  ],
  finalCta: {
    heading: "Siap Masuk Liga Haji Khusus?",
    desc: "Konsultasi awal gratis — audit kesiapan PIHK Anda dulu, lalu kami susun roadmap penetapan atau langsung eksekusi all-in Rp25 juta.",
  },
};

// ============================================================
// BPW — FONDASI BIRO PERJALANAN WISATA (pintu masuk sektor travel)
// ============================================================

export const BPW_CONTENT: CertPageContent = {
  product: SERTIFIKASI_PRODUCTS[2],
  badge: "Sertifikasi BPW — Kemenparekraf/Baparekraf",
  heroCopy: [
    "BPW (Biro Perjalanan Wisata) adalah legal dasar usaha perjalanan wisata: Tanda Daftar Usaha (TDA) yang diterbitkan Kemenparekraf/Baparekraf. Ini pintu masuk resmi sektor travel — prasyarat kontrak agen luar negeri, kepesertaan ASITA, dan sering kali langkah pertama menuju PPIU.",
    "Layanan Sertifikasi BPW kami Rp15 juta all-in: kesiapan badan usaha, KBLI 79120, rencana usaha, dokumen operasional wisata, pengajuan TDA, hingga pendampingan verifikasi dan panduan perpanjangan tiga tahunan.",
  ],
  intro: {
    heading: "Apa Itu Sertifikasi BPW dan Mengapa Jadi Langkah Pertama?",
    paragraphs: [
      "TDA BPW adalah registrasi usaha biro perjalanan wisata di Kemenparekraf/Baparekraf — menandakan bahwa usaha Anda terdaftar sebagai penyelenggara jasa perjalanan wisata yang sah, dengan kewenangan menjual paket tur, tiket, dan layanan perjalanan. Tanpa TDA, usaha travel Anda menanggung risiko: kelayakan kontrak ragu, akses program promosi nasional tertutup, dan posisi tawar terhadap vendor melemah.",
      "BPW juga fondasi naik kelas: secara umum, jalur menuju PPIU menyaratkan fondasi izin usaha perjalanan yang sah — jadi travel yang bercita-cita menjual paket umrah idealnya menata BPW dulu, baru PPIU (KBLI 79122). Urutan ini yang membuat banyak klien kami mengambil trilogi secara bertahap dengan dokumen yang saling menyambung.",
      "Perbedaan penting: TDA BPW adalah tanda daftar, bukan sertifikat akreditasi internasional seperti IATA. Untuk keperluan terbit tiket IATA, BPW adalah fondasi — akreditasi IATA diurus terpisah melalui jalur GoLite/GoStandard/GoGlobal. Kami menyiapkan keduanya bila roadmap bisnis Anda membutuhkan.",
    ],
  },
  dasarHukum: {
    heading: "Dasar Hukum & Kerangka Regulasi",
    items: [
      { label: "Ketentuan usaha BPW (TDA)", desc: "Pengaturan usaha biro perjalanan wisata oleh Kemenparekraf/Baparekraf — pendaftaran TDA, perpanjangan tiga tahunan, dan perubahan data." },
      { label: "KBLI 79120", desc: "Kode klasifikasi \"Kegiatan Biro Perjalanan Wisata\" di OSS-RBA — basis kegiatan usaha travel umum." },
      { label: "Kepesertaan asosiasi", desc: "TDA aktif menjadi prasyarat kepesertaan asosiasi (mis. ASITA) dan kelayakan kontrak agen luar negeri — nilai komersial langsung." },
    ],
  },
  syarat: {
    heading: "Syarat Sertifikasi BPW — Checklist Lengkap",
    items: [
      { nama: "Badan usaha", detail: "PT/CV/koperasi sesuai ketentuan TDA — PT paling lentur untuk naik kelas ke PPIU nanti; kami sarankan PT bila rencana usaha termasuk ibadah." },
      { nama: "KBLI 79120 aktif", detail: "Penetapan/perubahan KBLI di OSS-RBA ke kegiatan biro perjalanan wisata — kami urus bila profil usaha Anda belum tepat." },
      { nama: "Rencana usaha", detail: "Rencana kegiatan usaha perjalanan wisata: produk tur, pasar sasaran, estimasi volume — format penerbit, bukan template bebas." },
      { nama: "Dokumen legalitas dasar", detail: "Akta & SK Kemenkumham, NIB, NPWP, KTP direksi — konsistensi antar dokumen kami periksa satu per satu." },
      { nama: "Kantor & sarana", detail: "Alamat kantor operasional yang dapat diverifikasi + sarana pendukung kegiatan perjalanan." },
      { nama: "Organisasi", detail: "Struktur organisasi & personel inti — sederhana tapi harus konsisten dengan akta dan rencana usaha." },
      { nama: "Bukti kesiapan operasional", detail: "Draf kerja sama vendor (hotel, transport, tiket) bila ada — memperkuat verifikasi, meski belum selalu wajib." },
      { nama: "Dokumen pernyataan", detail: "Surat pernyataan kesanggupan mengikuti ketentuan usaha BPW — format kami sediakan." },
    ],
  },
  ruangLingkup: {
    heading: "Ruang Lingkup Jasa All-In Rp15 Juta",
    items: [
      "Konsultasi struktur badan usaha terbaik untuk roadmap Anda (BPW saja / BPW→PPIU).",
      "Pendirian PT bila dibutuhkan (akta + SK Kemenkumham) atau penyesuaian akta eksisting.",
      "Pengurusan NIB & KBLI 79120 di OSS-RBA.",
      "Penyusunan rencana usaha & seluruh dokumen permohonan TDA BPW.",
      "Pengajuan resmi ke Kemenparekraf/Baparekraf + pemantauan status.",
      "Pendampingan klarifikasi/verifikasi dalam lingkup kontrak.",
      "Pemantauan hingga TDA BPW terbit + penyerahan arsip digital.",
      "Panduan perpanjangan tiga tahunan & perubahan data (alamat/pengurus/modal).",
      "Rekomendasi langkah naik kelas: PPIU (KBLI 79122) atau akreditasi IATA.",
      "Prioritas WhatsApp dengan SLA balasan jam kerja.",
    ],
  },
  prosesIntro:
    "Untuk BPW, tahap 03 (perbaikan fondasi) biasanya ringan — kebanyakan penundaan datang dari rencana usaha yang ditulis asal dan KBLI yang tidak tepat, dua hal yang kami tuntaskan di tahap 02–04.",
  perbedaan: {
    heading: "PPIU vs PIHK vs BPW — Mana yang Anda Butuhkan?",
    intro:
      "BPW adalah fondasi; PPIU khusus umrah; PIHK puncak untuk haji khusus. Bila rencana usaha Anda hanya tur wisata, BPW + pendukungnya cukup. Bila targetnya umrah/haji, susun BPW (atau perbaiki izin dasar) lalu naik ke PPIU — dengan dokumen yang dirancang menyambung sejak awal.",
    rows: [
      { aspek: "Tujuan usaha", ppiu: "Menjual & memberangkatkan paket umrah", pihk: "Menjual paket haji khusus (ONH Plus)", bpw: "Usaha biro perjalanan wisata umum (tur, tiket, MICE)" },
      { aspek: "Penerbit", ppiu: "Kanal perizinan ibadah (Kemenag — era KHU)", pihk: "Kemenag — penetapan PIHK", bpw: "Kemenparekraf/Baparekraf (TDA)" },
      { aspek: "KBLI kunci", ppiu: "79122", pihk: "79122", bpw: "79120" },
      { aspek: "Badan usaha", ppiu: "Wajib PT", pihk: "Wajib PT + PPIU aktif", bpw: "PT/CV/koperasi sesuai ketentuan TDA" },
      { aspek: "Prasyarat kunci", ppiu: "Riwayat izin perjalanan & standar modal", pihk: "Riwayat keberangkatan jamaah + jaminan/asuransi", bpw: "Rencana usaha & bukti kesiapan operasional" },
      { aspek: "Harga jasa all-in kami", ppiu: "Rp20.000.000", pihk: "Rp25.000.000", bpw: "Rp15.000.000" },
    ],
  },
  kesalahanUmum: {
    heading: "5 Kesalahan Umum Pengurusan TDA BPW",
    items: [
      { salah: "Rencana usaha ditulis asal (copy-paste)", risiko: "Rencana usaha adalah inti penilaian kesiapan — template generik terlihat sekejap dan menurunkan kredibilitas berkas." },
      { salah: "KBLI tidak tepat (campur paket lama)", risiko: "Profil usaha tidak menggambarkan kegiatan travel — berkas bolak-balik antara OSS dan penerbit." },
      { salah: "Badan usaha tidak dipikirkan untuk naik kelas", risiko: "CV yang langsung BPW harus mendirikan PT lagi saat mau PPIU — biaya dan waktu dua kali. Rencanakan dari awal." },
      { salah: "Lupa perpanjangan tiga tahunan", risiko: "TDA mati = kontrak berjalan terancam; perpanjangan butuh bukti kegiatan yang menumpuk sejak hari pertama." },
      { salah: "Menganggap TDA sama dengan izin umrah", risiko: "TDA BPW tidak mengizinkan penjualan paket umrah — kegiatan ibadah butuh PPIU (KBLI 79122). Jangan tertukar." },
    ],
  },
  checklist: {
    heading: "Checklist Dokumen yang Kami Siapkan & Periksa",
    items: [
      "Akta pendirian/perubahan + SK Kemenkumham yang konsisten",
      "NIB & KBLI 79120 di OSS-RBA",
      "NPWP perusahaan & direksi",
      "Rencana kegiatan usaha perjalanan wisata (format penerbit)",
      "Struktur organisasi & personel inti",
      "Bukti kantor (milik/sewa) & sarana operasional",
      "Draf kerja sama vendor pendukung (bila ada)",
      "Surat pernyataan kesanggupan usaha BPW",
    ],
  },
  faq: [
    {
      q: "Berapa biaya sertifikasi BPW?",
      a: "Jasa pengurusan lengkap kami Rp15.000.000 (all-in). Biaya resmi penerbit dan pihak ketiga (notaris, OSS, dsb.) dihitung terpisah dan tertulis dalam quotation.",
    },
    {
      q: "Berapa lama TDA BPW terbit?",
      a: "Estimasi kerja kami 30–60 hari kerja sejak dokumen lengkap — BPW adalah proses tercepat di trilogi karena tidak menunggu antrean verifikasi ibadah.",
    },
    {
      q: "Apakah BPW bisa untuk menjual paket umrah?",
      a: "Tidak. Kegiatan penyelenggaraan perjalanan ibadah umrah memerlukan PPIU (KBLI 79122) dari kanal perizinan ibadah. TDA BPW (79120) mencakup usaha perjalanan wisata umum. Banyak klien mengambil BPW sebagai fondasi lalu naik ke PPIU dengan dokumen yang kami susun menyambung.",
    },
    {
      q: "Apakah travel kecil/UMKM layak mengurus BPW?",
      a: "Layak — justru ini yang memisahkan travel profesional dari komunitas daring. TDA aktif membuka kepesertaan asosiasi, kelayakan kontrak vendor & agen luar negeri, dan kepercayaan klien korporat. Struktur badan usaha bisa disesuaikan skala usaha Anda.",
    },
    {
      q: "Apa beda BPW dengan akreditasi IATA?",
      a: "BPW adalah registrasi usaha nasional (Kemenparekraf/Baparekraf) — wajib untuk beroperasi. IATA adalah akreditasi internasional untuk terbit tiket penerbangan — opsional dan menuntut standar finansial tersendiri. Urutan lazim: BPW dulu, IATA saat bisnis tiket sudah berjalan.",
    },
    {
      q: "Bagaimana perpanjangan dan perubahan data TDA?",
      a: "TDA BPW berlaku tiga tahun dan perpanjangannya menuntut bukti kegiatan tur yang aktif. Perubahan pengurus/alamat/modal juga wajib diurus agar data tetap sah. Kami memberikan panduan pasca-terbit dan opsi layanan perpanjangan/perubahan data bila dibutuhkan nanti.",
    },
  ],
  terkait: [
    { label: "Sertifikasi PPIU — Izin Penyelenggara Umrah", href: SERTIFIKASI_URLS.ppiu, desc: "Naik kelas dari BPW ke kegiatan ibadah (KBLI 79122)." },
    { label: "Sertifikasi PIHK — Haji Khusus (ONH Plus)", href: SERTIFIKASI_URLS.pihk, desc: "Puncak piramida travel ibadah — prasyarat PPIU aktif." },
    { label: "Perpanjangan TDA BPW", href: "/layanan/perpanjangan-tanda-daftar-usaha-biro-perjalanan-wisata-bpw-pp3-wk-054", desc: "Perpanjang TDA dengan bukti kegiatan yang rapi." },
    { label: "IATA Accreditation untuk Travel Agent", href: SERTIFIKASI_URLS.iataPillar, desc: "Akreditasi internasional — fondasi BPW Anda jadi nilai awal." },
    { label: "Konsultasi Sertifikasi Travel (Form)", href: SERTIFIKASI_URLS.konsultasi, desc: "Petakan jalur BPW→PPIU→PIHK yang paling efisien untuk usaha Anda." },
  ],
  finalCta: {
    heading: "Fondasi Legal Travel Anda Dimulai dari BPW",
    desc: "Konsultasi awal gratis — kami petakan jalur BPW (Rp15 juta) dan kaitannya dengan rencana PPIU/PIHK Anda ke depan.",
  },
};
