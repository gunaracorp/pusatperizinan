import type { Metadata } from "next";
import Link from "next/link";
import {
  Wallet, Clock, FileText, ShieldCheck, Scale, Globe2, Landmark,
  Database, Users, MessageSquareWarning, Mail,
} from "lucide-react";
import { SITE_NAME, SITE_URL, LEGAL_ENTITY, CONTACT } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /ketentuan-refund (v3.0 FINAL, 27 Nov 2026)
// REVISI DEWAN PAKAR: + Pasal 6A (Skema Refund Indikatif Default
// T0-T5 untuk pembatalan oleh Klien) + penguatan Pasal 8 — menegaskan
// pembatalan sepihak oleh Klien TIDAK berhak refund 100% dana jasa.
// Tier 1 = 45 Hari Kerja (tercepat) s.d. Tier 5 = 24 bulan kalender.
// 15 pasal + tahapan T0-T5 + dasar hukum terverifikasi (JDIH/BPK).
// Ditaut dari: footer, /syarat-ketentuan, /garansi, checkout.
// ============================================================

export const metadata: Metadata = {
  title: "Ketentuan Refund & Pengembalian Dana — Kebijakan Berjenjang",
  description:
    "Ketentuan refund resmi PusatPerizinan.com: paling cepat 45 hari kerja (Tier 1) hingga maksimal 24 bulan untuk mandat lintas negara (Tier 5). 15 pasal lengkap, tahapan T0-T5, Skema Refund Indikatif untuk pembatalan oleh klien (Pasal 6A), dan dasar hukum Indonesia yang terverifikasi.",
  alternates: { canonical: "/ketentuan-refund" },
  robots: { index: true, follow: true },
};

const refundFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/ketentuan-refund#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa lama proses refund paling cepat di PusatPerizinan.com?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paling cepat 45 hari kerja (Tier 1). Berlaku bila pekerjaan belum dimulai secara substantif, atau pembatalan disebabkan kesalahan material perusahaan. Hitungan berjalan sejak permohonan Klaim Lengkap diterima. Jumlah yang tidak disengketakan dibayar lebih dahulu setelah perhitungannya dapat ditentukan.",
      },
    },
    {
      "@type": "Question",
      name: "Mengapa refund perizinan kompleks atau lintas negara bisa mencapai 24 bulan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Makin rumit dan tinggi perizinan — terutama mandat lintas negara yang melibatkan proses konsuler, legalisasi/apostille, regulator asing, atau beberapa kementerian/lembaga — makin panjang rekonsiliasi dan pengembalian dananya, dengan batas paling lama 24 bulan kalender (Tier 5). Tier 5 hanya berlaku bila disetujui tertulis dalam SPK/addendum, bukan otomatis. Untuk Tier 4 dan 5, laporan status tertulis diberikan minimal setiap 30 hari kalender.",
      },
    },
    {
      "@type": "Question",
      name: "Biaya apa saja yang dapat dipotong dari nilai refund?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hanya Biaya Pihak Ketiga yang disetujui sebelumnya, benar-benar dibayarkan, didukung bukti resmi (kuitansi/faktur/tanda terima), dan tidak dapat dipulihkan — misalnya PNBP/retribusi, honorarium notaris/PPAT, penerjemah tersumpah, legalisasi/apostille/konsuler, pengujian laboratorium, kurir, dan biaya bank. Dana yang belum digunakan atau sudah dikembalikan penerimanya wajib dikembalikan kepada klien. Tidak ada pemotongan persentase otomatis dan tidak ada penghangusan dana.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah hak refund gugur jika saya berhenti merespons?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak. Bila dokumen atau instruksi yang wajar tidak diterima, perusahaan memberi pemberitahuan tertulis dan waktu perbaikan minimal 10 hari kerja; hak refund tidak gugur hanya karena klien tidak merespons. Tidak ada daluwarsa kontraktual yang menghapus dana klien secara otomatis.",
      },
    },
    {
      "@type": "Question",
      name: "Ke rekening siapa refund dibayarkan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pada prinsipnya ke rekening atau metode pembayaran asal, atau rekening lain yang dapat diverifikasi sebagai milik pembayar/penerima yang sah. Verifikasi identitas dilakukan proporsional untuk mencegah penipuan, sesuai ketentuan pelindungan data pribadi. Biaya bank/transfer hanya diperhitungkan bila nyata, wajar, diungkapkan, dan didukung bukti.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah saya berhak refund 100% jika saya sendiri yang membatalkan di tengah pekerjaan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak. Refund 100% Dana Jasa berlaku bila pekerjaan belum dimulai secara substantif (T0) atau bila pembatalan disebabkan kesalahan material perusahaan (garansi 100% — Tier 1). Bila klien menghentikan mandat sepihak di tengah pekerjaan — dengan alasan apa pun, termasuk perubahan rencana bisnis — pengembalian Dana Jasa dihitung dengan Skema Refund Indikatif Default (Pasal 6A) berdasarkan tahapan yang benar-benar terlaksana: T0 = 100%, T1 = 80%, T2 = 50%, T3 = 25%, T4–T5 = 0%, dikurangi Biaya Pihak Ketiga yang terbukti keluar dan tidak dapat dipulihkan. Dana pihak ketiga yang belum terpakai selalu dikembalikan penuh. Pekerjaan yang sudah dilaksanakan tetap menjadi hak yang dibayar sesuai KUHPerdata Pasal 1234 juncto 1601.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana jika saya tidak setuju dengan perhitungan refund?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bagian yang tidak disengketakan tetap dibayarkan lebih dahulu. Anda berhak meminta perhitungan tertulis berikut bukti pendukungnya. Hak menempuh BPSK atau pengadilan sesuai UU Perlindungan Konsumen tetap dihormati; mediasi atau arbitrase hanya melalui klausul tertulis yang jelas dan tepat untuk kontrak komersial antar-badan usaha.",
      },
    },
  ],
};

// ------------------------------------------------------------
// LIMA TIER WAKTU PENYELESAIAN REFUND (45 Hari Kerja s.d. 24 bulan)
// ------------------------------------------------------------
const TIERS = [
  {
    n: "TIER 1",
    w: "45 Hari Kerja",
    t: "Tercepat",
    d: "Pekerjaan belum dimulai secara substantif, atau pembatalan disebabkan kesalahan material perusahaan. Seluruh Dana Jasa yang belum menjadi hak perusahaan dikembalikan.",
  },
  {
    n: "TIER 2",
    w: "90 Hari Kerja",
    t: "Persiapan",
    d: "Pekerjaan telah mencapai tahap T1/T2: diagnosis, due diligence, dan penyiapan dokumen. Nilai pekerjaan dihitung dari milestone dan bukti deliverable — bukan pemotongan otomatis.",
  },
  {
    n: "TIER 3",
    w: "180 Hari Kalender",
    t: "Pengajuan",
    d: "Berkas telah diajukan ke instansi (T3) dan diperlukan rekonsiliasi status, penarikan/pencabutan berkas bila dapat dilakukan, penutupan akses, atau konfirmasi biaya dari instansi.",
  },
  {
    n: "TIER 4",
    w: "12 Bulan Kalender",
    t: "Kompleks",
    d: "Kompleksitas tinggi: beberapa kementerian/lembaga/daerah, verifikasi teknis atau lapangan, konsolidasi beberapa izin, atau penyelesaian administratif berlapis.",
  },
  {
    n: "TIER 5",
    w: "24 Bulan Kalender",
    t: "Lintas Negara",
    d: "Hanya untuk Mandat Lintas Negara yang disetujui tertulis dalam SPK/addendum: proses konsuler, legalisasi, regulator asing, atau transaksi lintas negara. Tidak berlaku otomatis.",
  },
];

const TAHAPAN = [
  { k: "T0", t: "Pra-kontrak", d: "Konsultasi awal, penjelasan kebutuhan, penyusunan penawaran, dan penandatanganan SPK. Tidak ada biaya jasa yang dianggap telah diperoleh kecuali konsultasi berbayar yang disepakati terpisah." },
  { k: "T1", t: "Diagnosis & due diligence", d: "Pemeriksaan dokumen awal, identifikasi isu, pemetaan KBLI, kelayakan awal, serta peta rute perizinan." },
  { k: "T2", t: "Penyiapan", d: "Penyusunan, pemeriksaan, kompilasi, koreksi, dan finalisasi dokumen; koordinasi notaris/PPAT, penerjemah, atau profesional lain sesuai SPK." },
  { k: "T3", t: "Pengajuan", d: "Pengajuan resmi ke OSS/instansi, penerimaan tanda terima/nomor registrasi, dan tanggapan/koreksi administratif dalam ruang lingkup." },
  { k: "T4", t: "Koordinasi & verifikasi", d: "Pemeriksaan teknis, verifikasi lapangan, pemenuhan persyaratan tambahan, dan koordinasi lintas kementerian/lembaga/pemerintah daerah." },
  { k: "T5", t: "Integrasi, lintas negara & penutupan", d: "Legalitas/apostille/konsuler, proses lintas negara, koordinasi bank atau pihak luar negeri, integrasi beberapa izin, dan penutupan mandat." },
];

// ------------------------------------------------------------
// 14 PASAL KEBIJAKAN REFUND (v2.1 FINAL — dipublikasikan utuh)
// ------------------------------------------------------------
const PASAL = [
  {
    h: "Pasal 1 — Identitas, Ruang Lingkup, dan Kedudukan",
    p: [
      `${SITE_NAME} dioperasikan oleh ${LEGAL_ENTITY} ("Perusahaan"). Ketentuan ini merupakan kebijakan pengembalian dana untuk jasa konsultansi, penyiapan dokumen, pendampingan, dan pengurusan perizinan yang ditawarkan melalui ${SITE_NAME} dan/atau disepakati secara tertulis dengan Perusahaan.`,
      "Ketentuan ini berlaku hanya jika telah diberikan kepada Klien sebelum pembayaran dan dirujuk secara jelas dalam Surat Perintah Kerja (SPK), surat penawaran yang disetujui, atau perjanjian layanan terkait. Perusahaan menyimpan versi, tanggal, dan bukti persetujuan Klien.",
      "Untuk setiap penugasan, SPK wajib menyebut ruang lingkup, deliverable, pembagian biaya jasa dan biaya pihak ketiga, tahapan, asumsi, timeline, serta ketentuan refund yang berlaku. Jika ada ketentuan khusus dalam SPK, ketentuan khusus tersebut berlaku untuk ruang lingkup yang diatur secara rinci sepanjang tidak mengurangi hak yang diberikan hukum yang bersifat memaksa.",
      "Pembaruan kebijakan berlaku prospektif terhadap transaksi/kontrak setelah tanggal efektif pembaruan. Perubahan tidak berlaku surut dan tidak menghapus hak yang telah timbul. Perubahan SPK yang telah berlaku dibuat melalui persetujuan tertulis para pihak.",
      "Tidak ada klausula dalam kebijakan ini yang dimaksudkan untuk meniadakan hak konsumen, kewajiban pelaku usaha, atau upaya hukum yang tidak dapat dikesampingkan berdasarkan peraturan perundang-undangan. Jika terjadi pertentangan, ketentuan hukum yang bersifat memaksa dan putusan lembaga berwenang didahulukan.",
    ],
  },
  {
    h: "Pasal 2 — Definisi",
    p: [
      `Perusahaan adalah ${LEGAL_ENTITY}, pengelola ${SITE_NAME}.`,
      "Klien adalah pihak yang menandatangani SPK atau menerima dan membayar layanan berdasarkan penawaran yang secara tegas merujuk kebijakan ini.",
      "Dana Jasa adalah pembayaran yang diterima Perusahaan untuk remunerasi jasa sesuai SPK, tidak termasuk dana titipan/biaya pihak ketiga yang ditagihkan terpisah.",
      "Biaya Pihak Ketiga adalah biaya kepada instansi, notaris/PPAT, penerjemah tersumpah, laboratorium, konsultan independen, kurir, kedutaan/konsulat, bank, atau penyedia lain yang secara khusus disetujui atau diungkapkan dalam SPK/estimasi biaya.",
      "Pekerjaan Terlaksana adalah pekerjaan yang benar-benar telah dikerjakan sesuai ruang lingkup dan dapat dibuktikan melalui deliverable, korespondensi, catatan kerja, tanda terima instansi, atau bukti lain yang relevan.",
      "Klaim Lengkap adalah permintaan refund yang menyebut nomor SPK, identitas pemohon, alasan pembatalan, bukti pembayaran, dan informasi rekening pengembalian yang diperlukan secara wajar. Perusahaan wajib menyebut secara spesifik kekurangan dokumen yang relevan.",
      "Hari Kerja adalah Senin sampai Jumat, tidak termasuk hari libur nasional dan cuti bersama yang ditetapkan Pemerintah Republik Indonesia. Hari Kalender adalah seluruh hari dalam kalender.",
      "Mandat Lintas Negara adalah penugasan yang secara material melibatkan proses, persetujuan, legalisasi, bank, pihak berwenang, atau dokumen dari lebih dari satu negara, dan ruang lingkup serta ketergantungannya dinyatakan dalam SPK.",
    ],
  },
  {
    h: "Pasal 3 — Prinsip Perhitungan Refund",
    p: [
      "Refund dihitung berdasarkan pemisahan yang transparan antara (a) Dana Jasa yang belum menjadi hak Perusahaan karena pekerjaan belum dilakukan; (b) nilai pekerjaan yang telah terlaksana; dan (c) Biaya Pihak Ketiga yang benar-benar telah dibayarkan dan tidak dapat dipulihkan.",
      "Perusahaan hanya dapat memperhitungkan remunerasi untuk pekerjaan yang benar-benar dilakukan dan sesuai milestone/komponen harga yang telah dijelaskan dalam SPK. Tidak ada pemotongan persentase otomatis semata-mata karena Klien membatalkan atau karena berkas telah mencapai tahap tertentu.",
      "Biaya Pihak Ketiga dapat diperhitungkan hanya apabila telah diungkapkan/disetujui sebelumnya, benar-benar dibayarkan untuk mandat Klien, didukung kuitansi/faktur/tanda terima resmi, dan tidak dapat diminta kembali dari penerima biaya. Setiap dana pihak ketiga yang belum digunakan atau telah dikembalikan oleh penerimanya wajib dikembalikan kepada Klien.",
      "Biaya akibat kesalahan, kelalaian, keterlambatan, atau pelanggaran Perusahaan tidak dibebankan kepada Klien. Perusahaan tidak membebankan biaya tanpa bukti, biaya fiktif, biaya internal yang tidak disepakati, maupun pembayaran tidak resmi kepada aparatur.",
      "Setiap keputusan refund disertai perhitungan tertulis yang menunjukkan total pembayaran, nilai pekerjaan yang diakui, biaya pihak ketiga per bukti, pajak/biaya transfer yang sah bila relevan, dan jumlah bersih yang dikembalikan.",
    ],
  },
  {
    h: "Pasal 4 — Tahapan Pekerjaan T0–T5",
    p: [
      "Pekerjaan setiap mandat dipetakan pada enam tahap T0–T5 sebagaimana dirinci pada bagian Tahapan Pekerjaan di atas. Tahap ditentukan berdasarkan output yang telah selesai, bukan sekadar jumlah hari berjalan.",
      "Perusahaan menyampaikan laporan progres dan bukti pencapaian tahap. Klien berhak menyampaikan koreksi yang disertai bukti.",
    ],
  },
  {
    h: "Pasal 5 — Lima Tier dan Target Waktu Penyelesaian Refund",
    p: [
      "Tier 1 — paling lama 45 (empat puluh lima) Hari Kerja: pekerjaan belum dimulai secara substantif, atau pembatalan disebabkan kesalahan material Perusahaan. Prinsip perhitungan: seluruh Dana Jasa yang belum menjadi hak Perusahaan dikembalikan; hanya Biaya Pihak Ketiga yang memenuhi Pasal 3 yang dapat diperhitungkan.",
      "Tier 2 — paling lama 90 (sembilan puluh) Hari Kerja: pekerjaan telah mencapai T1 atau T2, dengan dokumen/analisis/deliverable yang telah disusun. Nilai pekerjaan dihitung berdasarkan milestone dan komponen biaya yang disepakati serta bukti pekerjaan, bukan pemotongan otomatis. Sisa Dana Jasa dan dana pihak ketiga yang belum terpakai dikembalikan.",
      "Tier 3 — paling lama 180 (seratus delapan puluh) Hari Kalender: berkas telah diajukan pada T3 dan diperlukan rekonsiliasi status pengajuan, penarikan/pencabutan berkas jika dapat dilakukan, penutupan akses, atau konfirmasi biaya dari instansi. Perusahaan wajib menjelaskan secara tertulis ketergantungan eksternal yang relevan.",
      "Tier 4 — paling lama 12 (dua belas) bulan kalender: mandat memiliki kompleksitas tinggi yang melibatkan beberapa kementerian/lembaga/daerah, verifikasi teknis atau lapangan, konsolidasi beberapa izin, atau penyelesaian administratif berlapis. SPK atau addendum harus menerangkan alasan tier, daftar proses yang masih terbuka, pihak eksternal yang terlibat, dan rencana rekonsiliasi.",
      "Tier 5 — paling lama 24 (dua puluh empat) bulan kalender: hanya untuk Mandat Lintas Negara atau mandat luar biasa kompleks yang secara spesifik disepakati tertulis dalam SPK/addendum, dengan dependensi lintas negara yang dapat diidentifikasi seperti proses konsuler, legalisasi, keputusan regulator asing, penyelesaian transaksi lintas negara, atau proses sengketa yang relevan. Tier 5 tidak otomatis berlaku hanya karena Klien berkewarganegaraan asing atau karena Perusahaan menyebut kasusnya kompleks.",
      "Jangka waktu tier merupakan batas layanan kontraktual untuk penyelesaian rekonsiliasi dan pembayaran refund atas jumlah yang memang dapat ditentukan setelah Klaim Lengkap diterima. Jangka waktu ini bukan tenggat yang ditetapkan undang-undang dan tidak boleh digunakan untuk menunda hak yang menurut hukum wajib dipenuhi lebih cepat.",
      "Jumlah refund yang tidak disengketakan wajib dibayarkan lebih dahulu setelah perhitungannya dapat ditentukan secara wajar, tanpa harus menunggu seluruh proses T4/T5 selesai. Perusahaan wajib memberikan laporan tertulis sekurang-kurangnya setiap 30 (tiga puluh) hari kalender untuk Tier 4 dan Tier 5.",
      "Apabila peristiwa termasuk dalam ketentuan pengembalian/ganti rugi wajib atau tenggat khusus berdasarkan hukum perlindungan konsumen, PMSE, putusan BPSK, pengadilan, atau arbitrase yang berwenang, tenggat wajib/putusan tersebut didahulukan.",
    ],
  },
  {
    h: "Pasal 6 — Nilai Pekerjaan yang Telah Terlaksana",
    p: [
      "Dasar utama pengakuan pekerjaan adalah nilai milestone atau komponen pekerjaan yang secara spesifik dicantumkan dalam SPK dan telah diserahkan/dilaksanakan. Contoh bukti meliputi laporan due diligence, peta perizinan, draf final, daftar koreksi, bukti pengajuan, tanda terima instansi, laporan verifikasi, atau hasil koordinasi.",
      "Jika SPK tidak memisahkan harga per milestone, Perusahaan menyusun penilaian wajar berdasarkan pekerjaan aktual, ruang lingkup, jam kerja yang tercatat, tenaga profesional yang digunakan, dan output yang dapat diverifikasi, dengan batas maksimum tidak melebihi Dana Jasa yang dibayarkan untuk lingkup terkait. Penilaian wajib dapat diperiksa Klien.",
      "Persentase tahap dalam dokumen internal hanya dapat dipakai sebagai batas estimasi/alat kontrol internal, bukan sebagai pemotongan otomatis. Persentase atau nilai retensi yang mengikat harus dirinci dan disetujui di SPK sebelum pembayaran, serta terkait dengan output yang terukur.",
      "Jika kesalahan Perusahaan menyebabkan pekerjaan harus diulang, biaya dan waktu koreksi yang timbul dari kesalahan tersebut menjadi tanggung jawab Perusahaan dan tidak dianggap sebagai pekerjaan tambahan yang dapat ditagihkan.",
    ],
  },
  {
    h: "Pasal 6A — Skema Refund Indikatif Default untuk Pembatalan oleh Klien",
    p: [
      "Ayat (1) Skema dalam pasal ini berlaku bila Klien menghentikan atau membatalkan mandat — dengan alasan apa pun, termasuk namun tidak terbatas pada perubahan rencana bisnis, keputusan komersial, pergantian pemegang saham/pengurus, relokasi, atau perubahan pandangan — dan SPK tidak menetapkan nilai milestone tersendiri.",
      "Ayat (2) Besaran pengembalian Dana Jasa ditetapkan berdasarkan tahapan pekerjaan yang benar-benar terlaksana (Pasal 4): T0 (belum dimulai secara substantif) — 100% dikembalikan; T1 (diagnosis & due diligence berjalan) — 80%; T2 (dokumen/analisis/deliverable telah disusun) — 50%; T3 (berkas telah diajukan ke instansi/mitra) — 25%; T4–T5 (izin/dokumen telah terbit, integrasi & penutupan mandat) — 0%.",
      "Ayat (3) Persentase pada ayat (2) adalah titik awal perhitungan resmi (presumsi nilai pekerjaan terlaksana), bukan angka final yang mutlak. Setiap pihak dapat membuktikan sebaliknya dengan milestone SPK dan bukti pekerjaan (Pasal 6); penyesuaian dapat dilakukan ke arah yang lebih besar atau lebih kecil berdasarkan bukti tersebut.",
      "Ayat (4) Dari jumlah yang dihitung menurut ayat (2), diperhitungkan Biaya Pihak Ketiga yang memenuhi Pasal 7. Dana pihak ketiga yang belum terpakai wajib dikembalikan penuh kepada Klien tanpa kecuali.",
      "Ayat (5) Skema ini TIDAK berlaku bila pembatalan disebabkan kesalahan material Perusahaan — dalam hal tersebut berlaku Garansi 100% sebagaimana diatur pada halaman Garansi dan Pasal 8 ayat (6), dengan waktu penyelesaian Tier 1.",
      "Ayat (6) Skema ini juga berlaku sebagai titik awal perhitungan bila SPK berakhir karena wanprestasi Klien sebagaimana dimaksud Pasal 8 ayat (2) dan ayat (5), tanpa mengurangi hak Perusahaan untuk menagih pekerjaan yang telanjur dilaksanakan dan kerugian yang terbukti menurut hukum.",
      "Ayat (7) Skema ini tidak mengurangi hak-hak konsumen yang bersifat memaksa menurut peraturan perundang-undangan, termasuk hak yang diatur PP No. 80 Tahun 2019 dan UU No. 8 Tahun 1999.",
    ],
  },
  {
    h: "Pasal 7 — Biaya Pihak Ketiga",
    p: [
      "Biaya pihak ketiga dapat meliputi PNBP/retribusi, honorarium notaris/PPAT, penerjemah tersumpah, legalisasi/apostille/konsuler, pengujian/laboratorium, perjalanan dan akomodasi yang disetujui, kurir, biaya bank, serta biaya lain yang secara tertulis disetujui Klien.",
      "Setiap biaya harus dicatat terpisah dari Dana Jasa, dinyatakan estimasi atau jumlah aktual, dan didukung bukti pembayaran resmi. Perusahaan memberi ringkasan realisasi biaya atas permintaan Klien dan pada saat penyelesaian refund.",
      "Biaya yang belum dibayarkan, tidak digunakan, dibatalkan, atau dikembalikan oleh penerima biaya menjadi hak Klien dan wajib direstitusikan. Jika biaya tidak dapat dikembalikan oleh pihak ketiga, Perusahaan menyertakan bukti penolakan/ketentuan non-refundable dari pihak tersebut sejauh tersedia.",
      "Pembayaran informal, gratifikasi, uang pelicin, atau pembayaran kepada aparatur di luar kanal resmi tidak termasuk Biaya Pihak Ketiga yang dapat dibebankan.",
    ],
  },
  {
    h: "Pasal 8 — Pembatalan, Wanprestasi, dan Keadaan Klien",
    p: [
      "Klien dapat mengajukan penghentian mandat secara tertulis. Penghentian tidak dengan sendirinya menghapus kewajiban pembayaran atas pekerjaan yang benar-benar telah dilaksanakan dan Biaya Pihak Ketiga yang memenuhi Pasal 7; sebaliknya, Perusahaan wajib mengembalikan bagian yang belum menjadi haknya. Kecuali SPK menetapkan nilai milestone tersendiri, pengembalian Dana Jasa dihitung mengikuti Skema Refund Indikatif Default pada Pasal 6A. Dengan demikian, pembatalan sepihak oleh Klien di tengah pekerjaan TIDAK memberi hak atas pengembalian 100% Dana Jasa — KUHPerdata Pasal 1234 juncto Pasal 1601: terminasi tidak menghapuskan hak imbalan atas pekerjaan yang telanjur dikerjakan.",
      "Apabila Klien memberikan data/dokumen yang terbukti tidak benar, tidak lengkap, palsu, atau menyesatkan, Perusahaan dapat menghentikan sementara pekerjaan, meminta klarifikasi/perbaikan, atau mengakhiri SPK sesuai tingkat materialitas dan hukum. Perusahaan tetap wajib membuat perhitungan objektif atas pekerjaan yang telah dilaksanakan dan dana yang belum terpakai; tidak ada penghangusan otomatis atas seluruh dana.",
      "Jika izin/permohonan ditolak karena ketidaklayakan substantif Klien yang telah dijelaskan secara spesifik dan tertulis sebelum SPK, penolakan oleh instansi bukan dengan sendirinya bukti wanprestasi Perusahaan. Namun Perusahaan hanya berhak atas nilai pekerjaan yang benar-benar dilakukan dan Biaya Pihak Ketiga yang memenuhi Pasal 7; sisa dana tetap diperhitungkan.",
      "Perubahan rencana usaha, perubahan pemegang saham, pindah lokasi, pergantian KBLI, atau keputusan komersial Klien dapat menjadi dasar perubahan ruang lingkup atau penghentian. Para pihak terlebih dahulu menyusun addendum/perhitungan; pekerjaan yang belum dilakukan dan biaya belum terpakai tidak boleh dianggap hangus.",
      "Apabila Klien tidak memberikan dokumen atau instruksi yang secara wajar diminta, Perusahaan memberi pemberitahuan tertulis dan waktu perbaikan sekurang-kurangnya 10 (sepuluh) Hari Kerja. Selama keterlambatan yang disebabkan Klien, pekerjaan terkait dapat ditangguhkan dengan catatan tertulis. Hak refund tidak gugur hanya karena Klien tidak merespons.",
      "Apabila Perusahaan melakukan wanprestasi material atau kesalahan yang menjadi tanggung jawabnya, Perusahaan memberi kesempatan perbaikan yang wajar bila masih mungkin. Bila tidak diperbaiki atau perbaikan tidak mungkin, Klien berhak mengakhiri mandat dan menerima pengembalian bagian Dana Jasa yang belum menjadi hak Perusahaan, tanpa mengurangi hak lain menurut hukum.",
    ],
  },
  {
    h: "Pasal 9 — Prosedur Klaim dan Pengamanan Pembayaran",
    p: [
      `Klaim dapat diajukan melalui formulir resmi website atau alamat email/kanal pengaduan yang diumumkan Perusahaan (${CONTACT.email}), dengan mencantumkan nomor SPK, identitas pemohon, uraian peristiwa, bukti pembayaran, dan dokumen relevan. Perusahaan menyediakan tanda terima/tiket atau konfirmasi penerimaan.`,
      "Dalam 5 (lima) Hari Kerja sejak penerimaan, Perusahaan memeriksa kelengkapan administratif dan menyampaikan daftar kekurangan secara spesifik. Pemeriksaan ini hanya kelengkapan administratif — bukan putusan refund dan bukan janji pencairan dana; keputusan tertulis diterbitkan mengikuti kompleksitas mandat sesuai ayat (3). Permintaan dokumen tambahan harus relevan dan proporsional; Perusahaan tidak meminta kata sandi, OTP, PIN, atau kredensial akun Klien.",
      "Perusahaan memberikan perhitungan awal dan posisi penanganan dalam jangka waktu yang wajar, serta keputusan tertulis dengan alasan dan dokumen dasar. Jika hanya sebagian nilai disengketakan, bagian yang tidak disengketakan tetap diproses.",
      "Pengembalian pada prinsipnya dilakukan ke rekening atau metode pembayaran asal, atau rekening lain yang dapat diverifikasi sebagai milik pembayar/penerima yang sah. Pemeriksaan identitas dan kepemilikan rekening dilakukan secara proporsional untuk mencegah penipuan, sesuai ketentuan pelindungan data pribadi dan kewajiban hukum yang memang berlaku.",
      "Biaya bank/transfer hanya dapat diperhitungkan jika nyata, wajar, diungkapkan, dan didukung bukti. Pembayaran lintas negara tunduk pada pemeriksaan bank, aturan valuta/transfer, identitas penerima, dan hukum yang berlaku; hambatan tersebut harus dijelaskan dan didokumentasikan.",
      "Perusahaan tidak menetapkan daluwarsa kontraktual yang menghapus dana Klien secara otomatis. Pengajuan setelah tenggat administratif internal tetap ditelaah berdasarkan hukum, bukti, dan keadaan konkret.",
    ],
  },
  {
    h: "Pasal 10 — Keadaan Khusus dan Perubahan Hukum",
    p: [
      "Keadaan kahar (force majeure) adalah kejadian di luar kendali wajar pihak yang terdampak, tidak dapat diperkirakan secara wajar pada saat kontrak, dan tidak dapat dicegah atau diatasi dengan langkah wajar; pihak terdampak wajib memberi pemberitahuan, bukti, serta melakukan mitigasi.",
      "Perubahan peraturan, kebijakan instansi, sistem OSS, atau interpretasi pejabat tidak otomatis menjadi force majeure. Para pihak menilai dampak materialnya, alternatif rute yang sah, perubahan harga/waktu, dan apakah mandat perlu diubah atau dihentikan. Pekerjaan yang belum dilakukan dan dana pihak ketiga yang belum terpakai tetap diperhitungkan untuk pengembalian.",
      "Gangguan layanan instansi, bank, sistem elektronik, atau otoritas luar negeri hanya dapat memengaruhi jadwal sejauh ada hubungan kausal yang dapat dibuktikan. Perusahaan wajib menyampaikan bukti gangguan, upaya mitigasi, serta estimasi pembaruan; ketentuan ini tidak boleh mengesampingkan tenggat wajib yang ditentukan hukum.",
      "Jika transfer ditahan oleh bank/otoritas berdasarkan ketentuan hukum, Perusahaan segera memberitahu Klien sejauh tidak dilarang hukum, menyerahkan informasi status yang dapat dibuka, dan melanjutkan transfer segera setelah hambatan terangkat.",
    ],
  },
  {
    h: "Pasal 11 — Mandat Lintas Negara dan Klien Asing",
    p: [
      "Sebelum Tier 5 disetujui, SPK/addendum harus mengidentifikasi negara yang terlibat, proses yang masih terbuka, instansi/pihak eksternal, dokumen yang diperlukan, mata uang, biaya koresponden bank, asumsi kurs, bahasa dokumen, dan risiko perubahan hukum.",
      "Perjanjian yang melibatkan pihak Indonesia dan pihak asing disusun dengan memperhatikan kewajiban penggunaan Bahasa Indonesia menurut Pasal 31 UU No. 24 Tahun 2009, serta dapat disertai versi bahasa nasional pihak asing dan/atau bahasa Inggris. Para pihak menentukan versi yang digunakan untuk membantu interpretasi tanpa meniadakan kewajiban bahasa yang berlaku.",
      "Pilihan hukum dan forum untuk transaksi PMSE internasional ditetapkan secara jelas dengan memperhatikan PP No. 80 Tahun 2019 dan hukum wajib yang berlaku. Ketentuan ini tidak memberi Perusahaan hak untuk mengabaikan hak konsumen atau yurisdiksi wajib yang berlaku.",
    ],
  },
  {
    h: "Pasal 12 — Pengaduan dan Penyelesaian Sengketa",
    p: [
      "Para pihak mengutamakan komunikasi tertulis dan musyawarah dengan itikad baik. Perusahaan mengonfirmasi penerimaan pengaduan dan menunjuk petugas penanganan yang tidak memiliki konflik kepentingan.",
      "Untuk konsumen yang memenuhi kualifikasi menurut hukum, hak untuk menempuh penyelesaian melalui BPSK atau pengadilan sesuai UU Perlindungan Konsumen dan peraturan terkait tetap dihormati. Ketentuan ini tidak boleh ditafsirkan sebagai pelepasan hak tersebut.",
      "Untuk sengketa komersial antar-badan usaha, para pihak dapat menyepakati mediasi atau arbitrase melalui lembaga tertentu, misalnya BANI, hanya melalui klausul tertulis yang jelas mengenai lembaga, aturan, tempat kedudukan, bahasa, jumlah arbiter, dan pembagian biaya.",
      "Jika tidak ada klausul arbitrase tertulis yang sah, penyelesaian dilakukan melalui forum pengadilan yang berwenang berdasarkan ketentuan hukum acara dan perlindungan konsumen. Tidak ada penetapan sepihak Pengadilan Negeri tertentu yang menghilangkan forum wajib yang disediakan undang-undang.",
    ],
  },
  {
    h: "Pasal 13 — Pelindungan Data Pribadi",
    p: [
      "Data identitas, dokumen korporasi, data pembayaran, dan dokumen perizinan diproses hanya untuk tujuan penawaran, pelaksanaan SPK, pemenuhan kewajiban hukum, pencegahan fraud, penanganan klaim, dan tujuan lain yang memiliki dasar pemrosesan sah, sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
      "Perusahaan membatasi akses berdasarkan kebutuhan kerja, menerapkan langkah keamanan yang wajar, mengatur hubungan dengan prosesor/vendor, dan memenuhi kewajiban pemberitahuan insiden serta hak subjek data sesuai UU.",
      "Klien tidak diminta mengirim kata sandi, OTP, PIN, private key, atau akses penuh akun pribadi. Bila akses sistem pemerintah diperlukan, prosedur mengikuti mekanisme resmi, otorisasi yang sah, dan prinsip akses minimum. Rincian tata kelola data dapat dibaca pada Kebijakan Privasi kami.",
    ],
  },
  {
    h: "Pasal 14 — Ketentuan Penutup",
    p: [
      "Jika satu klausula dinyatakan tidak berlaku, klausula lain tetap berlaku sepanjang dapat dipisahkan dan tidak mengubah esensi kontrak. Para pihak mengganti klausula tersebut dengan ketentuan sah yang paling mendekati tujuan komersial yang dibolehkan hukum.",
      "Tidak ada ketentuan yang mengalihkan seluruh risiko Perusahaan kepada Klien, mengecualikan tanggung jawab yang dilarang hukum, atau meniadakan hak berdasarkan hukum yang bersifat memaksa.",
      "Naskah kebijakan ini disusun melalui kerangka analisis multidisiplin dan tinjauan kepatuhan perusahaan; peninjauan akhir oleh advokat Indonesia yang ditunjuk Perusahaan dilakukan sebelum digunakan sebagai dokumen kontraktual final. Versi, tanggal, dan bukti persetujuan Klien disimpan oleh Perusahaan.",
    ],
  },
];

// ------------------------------------------------------------
// DASAR HUKUM — terverifikasi via JDIH/BPK per November 2026
// ------------------------------------------------------------
const DASAR_HUKUM = [
  {
    icon: Scale,
    g: "Perikatan, Kontrak & Perlindungan Konsumen",
    items: [
      { t: "KUH Perdata (Burgerlijk Wetboek)", d: "Pasal 1320 (syarat sah perjanjian), 1337–1339 (itikad baik & sifat perjanjian), 1238–1245 (wanprestasi), 1266–1267 (ganti rugi), 1338 ayat (2) (perjanjian tidak dapat ditarik kembali sepihak kecuali dengan kesepakatan atau alasan undang-undang)." },
      { t: "UU No. 8 Tahun 1999 tentang Perlindungan Konsumen", d: "Pasal 4 (hak konsumen, termasuk atas kompensasi/ganti rugi), Pasal 7 (kewajiban pelaku usaha), Pasal 9 (larangan informasi menyesatkan), Pasal 18 (klausula baku: tidak boleh sulit terlihat/terbaca/dipahami; pelanggaran batal demi hukum), Pasal 19 (tanggung jawab ganti rugi), Pasal 45 & 47 (jalur penyelesaian sengketa), Pasal 49 (BPSK)." },
      { t: "UU No. 30 Tahun 1999 tentang Arbitrase dan Alternatif Penyelesaian Sengketa", d: "Arbitrase memerlukan perjanjian tertulis; klausul arbitrase untuk kontrak B2B harus jelas mengenai lembaga, aturan, tempat, bahasa, arbiter, dan biaya. Pasal 66 mengatur pengakuan putusan arbitrase internasional." },
    ],
  },
  {
    icon: Globe2,
    g: "Transaksi Elektronik (PMSE) — dasar mekanisme refund",
    items: [
      { t: "PP No. 80 Tahun 2019 tentang Perdagangan Melalui Sistem Elektronik", d: "Pasal 69 (hak penukaran/pembatalan pada kondisi tertentu, jangka minimum 2 Hari Kerja sejak barang/jasa diterima), Pasal 70 (jasa pelaksanaan pekerjaan, termasuk jasa konsultan, dan penyelesaian wanprestasi melalui pekerjaan pengganti sebanding atau pembatalan), Pasal 71 (PPMSE yang menerima pembayaran wajib menyediakan mekanisme pengembalian dana saat pembelian dibatalkan konsumen), Pasal 72–74 (sengketa & transaksi internasional)." },
      { t: "Permendag No. 19 Tahun 2026 tentang Penyelenggaraan Usaha PMSE", d: "Regulasi pelaksana PMSE terkini (mencabut Permendag 50/2020 dan 31/2023). Kepatuhan SIUPMSE, iklan elektronik, dan layanan pengaduan konsumen menjadi konteks keberlakuan kebijakan refund ini." },
      { t: "UU ITE — UU No. 11 Tahun 2008 jo. UU No. 19 Tahun 2016 jo. UU No. 1 Tahun 2024", d: "Keabsahan informasi/dokumen elektronik, persetujuan elektronik, dan bukti transaksi; bukti persetujuan kebijakan, timestamp, versi dokumen, dan log pembayaran disimpan." },
    ],
  },
  {
    icon: Landmark,
    g: "Perizinan Berusaha & Pelayanan Publik",
    items: [
      { t: "UU No. 6 Tahun 2023 (Cipta Kerja) jo. PP No. 28 Tahun 2025", d: "Kerangka Perizinan Berusaha Berbasis Risiko melalui OSS — PP 28/2025 mencabut PP 5/2021. Durasi pengajuan yang ditentukan instansi menjadi dasar objektif ketergantungan eksternal pada Tier 3–4." },
      { t: "Permeninves/Kepala BKPM No. 5 Tahun 2025", d: "Pedoman dan tata cara penyelenggaraan PBBR serta fasilitas penanaman modal melalui OSS." },
      { t: "UU No. 25 Tahun 2009 tentang Pelayanan Publik", d: "Perizinan merupakan pelayanan publik (Pasal 14); hak warga negara atas layanan yang benar, transparan, dan tepat waktu (Pasal 15) menjadi konteks estimasi waktu dan kegagalan pihak ketiga instansi." },
      { t: "UU No. 7 Tahun 2014 tentang Perdagangan beserta perubahannya", d: "Kerangka kegiatan perdagangan, distribusi, dan perdagangan antarnegara yang menjadi ruang lingkup mandat klien." },
    ],
  },
  {
    icon: Globe2,
    g: "Mandat Lintas Negara",
    items: [
      { t: "Perpres No. 2 Tahun 2021 tentang Pengesahan Konvensi Apostille", d: "Konvensi Penghapusan Penuntutan Legalisasi Dokumen Publik Asing berlaku untuk Indonesia sejak 4 Juni 2022 — dasar proses legalisasi dokumen lintas negara pada Tahapan T5." },
      { t: "UU No. 24 Tahun 2009, Pasal 31", d: "Kewajiban Bahasa Indonesia pada perjanjian yang melibatkan pihak Indonesia; versi dwibahasa disiapkan untuk kontrak lintas negara." },
      { t: "Keppres No. 34 Tahun 1981 jo. UU No. 30 Tahun 1999 Pasal 66", d: "Pengakuan dan pelaksanaan putusan arbitrase asing (Konvensi New York 1958) — relevan untuk penyelesaian sengketa mandat lintas negara." },
    ],
  },
  {
    icon: Wallet,
    g: "Pajak, Pemberantasan Korupsi & Kepatuhan Pembayaran",
    items: [
      { t: "UU PPN — UU No. 8 Tahun 1983 jo. UU No. 42 Tahun 2009 jo. UU No. 7 Tahun 2021, Pasal 16B", d: "Pengembalian dan/atau pembatalan penyerahan BKP/JKP — dasar penyesuaian faktur pajak (pembatalan/koreksi) atas refund jasa, yang memengaruhi jumlah bersih yang dikembalikan." },
      { t: "UU No. 31 Tahun 1999 jo. UU No. 20 Tahun 2001 tentang Pemberantasan Tindak Pidana Korupsi", d: "Dasar larangan absolut pembayaran informal/gratifikasi/uang pelicin (Pasal 7) — pembayaran semacam itu tidak pernah menjadi Biaya Pihak Ketiga yang dapat dibebankan." },
      { t: "PP No. 43 Tahun 2015 jo. PP No. 61 Tahun 2021 tentang Pihak Pelapor TPPU", d: "Kewajiban APU-PPT/KYC berlaku sesuai kategori pihak pelapor — dasar verifikasi proporsional identitas penerima refund (Pasal 9)." },
    ],
  },
  {
    icon: Database,
    g: "Pelindungan Data",
    items: [
      { t: "UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi", d: "Dasar pemrosesan data klaim refund: pembatasan tujuan, keamanan, hubungan pengendali/prosesor, hak subjek data, dan pemberitahuan insiden." },
    ],
  },
];

// ------------------------------------------------------------
// FAQ visible — teks sinkron dengan JSON-LD
// ------------------------------------------------------------

export default function KetentuanRefundPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(refundFaqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/syarat-ketentuan" className="hover:text-primary">Syarat &amp; Ketentuan</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Ketentuan Refund</li>
          </ol>
        </nav>

        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <Wallet className="h-8 w-8 text-primary" aria-hidden />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ketentuan Refund &amp; Pengembalian Dana
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              Kebijakan resmi {SITE_NAME} ({LEGAL_ENTITY}): pengembalian dana
              berjenjang dari <strong>paling cepat 45 Hari Kerja (Tier 1)</strong> hingga
              <strong> paling lama 24 bulan kalender (Tier 5 — mandat lintas negara)</strong>.
              Makin rumit dan tinggi perizinan — terutama lintas negara — makin panjang
              rekonsiliasinya, dengan laporan berkala dan pembayaran jumlah yang tidak
              disengketakan lebih dahulu.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border px-3 py-1">Versi 3.0 FINAL</span>
              <span className="rounded-full border px-3 py-1">Berlaku sejak 27 November 2026</span>
              <span className="rounded-full border px-3 py-1">15 Pasal + Skema Refund Indikatif + Dasar Hukum Terverifikasi</span>
            </div>
          </div>
        </div>

        {/* Peta lima tier */}
        <section aria-labelledby="tier" className="mt-12">
          <h2 id="tier" className="text-xl font-bold">Lima Tier Waktu Penyelesaian Refund</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Tier ditentukan oleh tahap pekerjaan yang <strong>benar-benar terlaksana</strong> (dibuktikan
            oleh deliverable dan bukti tahapan T0–T5), bukan oleh keinginan sepihak. Untuk
            mandat lintas negara, hitungan mengikuti dependensi eksternal yang dapat diidentifikasi:
            proses konsuler, legalisasi/apostille, regulator asing, dan pemeriksaan bank.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TIERS.map((tr) => (
              <div
                key={tr.n}
                className={`rounded-2xl border bg-card p-5 ${tr.n === "TIER 1" ? "border-primary/50 ring-1 ring-primary/30" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-primary">{tr.n}</span>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">{tr.t}</span>
                </div>
                <p className="mt-2 text-lg font-extrabold">{tr.w}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tr.d}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
              <Clock className="h-6 w-6 text-primary" aria-hidden />
              <h3 className="mt-2 font-bold text-sm">Catatan penting</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Jangka 45 Hari Kerja s.d. 24 bulan adalah <strong>batas layanan kontraktual</strong>,
                bukan tenggat undang-undang, dan tidak boleh menunda hak/tenggat wajib menurut
                hukum atau putusan lembaga berwenang. Jumlah yang tidak disengketakan dibayar
                lebih dahulu setelah dapat dihitung.
              </p>
            </div>
          </div>
        </section>

        {/* Tahapan T0-T5 */}
        <section aria-labelledby="tahapan" className="mt-12">
          <h2 id="tahapan" className="text-xl font-bold">Tahapan Pekerjaan T0–T5</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Tahap menentukan tier refund. Penetapan tahap berdasarkan output yang telah
            selesai — bukan jumlah hari berjalan — dengan laporan progres dan bukti pencapaian
            yang dapat dikoreksi klien disertai bukti.
          </p>
          <ol className="mt-5 space-y-3">
            {TAHAPAN.map((s) => (
              <li key={s.k} className="flex items-start gap-3 rounded-2xl border bg-card p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-extrabold text-primary" aria-hidden>
                  {s.k}
                </span>
                <div>
                  <h3 className="font-bold text-sm">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Skema Refund Indikatif — tabel visual Pasal 6A */}
        <section aria-labelledby="skema-6a" className="mt-12">
          <h2 id="skema-6a" className="text-xl font-bold">Skema Refund Indikatif — Bila Klien Membatalkan (Pasal 6A)</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Pembatalan atau penghentian mandat oleh Klien — dengan alasan apa pun — tidak
            memberi hak atas refund 100% Dana Jasa. Pengembalian dihitung dari tahapan
            pekerjaan yang benar-benar terlaksana (tabel berikut), kecuali SPK menetapkan
            milestone tersendiri. Kegagalan karena <strong>kesalahan material Perusahaan</strong>
            tetap dijamin 100% (Tier 1).
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="px-4 py-3 font-bold">Tahap Terlaksana</th>
                  <th className="px-4 py-3 font-bold">Posisi Pekerjaan</th>
                  <th className="px-4 py-3 text-right font-bold">Refund Dana Jasa</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { k: "T0", n: "Pekerjaan belum dimulai secara substantif", r: "100%" },
                  { k: "T1", n: "Diagnosis & due diligence berjalan", r: "80%" },
                  { k: "T2", n: "Dokumen, analisis, deliverable telah disusun", r: "50%" },
                  { k: "T3", n: "Berkas telah diajukan ke instansi/mitra", r: "25%" },
                  { k: "T4–T5", n: "Izin/dokumen terbit; integrasi & penutupan mandat", r: "0%" },
                ].map((row) => (
                  <tr key={row.k} className="border-b last:border-0">
                    <td className="px-4 py-3 font-bold text-primary">{row.k}</td>
                    <td className="px-4 py-3 text-foreground/85">{row.n}</td>
                    <td className="px-4 py-3 text-right font-bold">{row.r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Dikurangi Biaya Pihak Ketiga yang memenuhi Pasal 7 (disetujui, benar-benar dibayarkan,
            terbukti resmi, tidak dapat dipulihkan). Dana pihak ketiga yang belum terpakai wajib
            dikembalikan penuh. Persentase adalah titik awal resmi (presumsi) — setiap pihak dapat
            membuktikan sebaliknya dengan milestone SPK dan bukti pekerjaan (Pasal 6 ayat 1–2).
          </p>
        </section>

        {/* 15 Pasal */}
        <section aria-labelledby="pasal" className="mt-12">
          <h2 id="pasal" className="text-xl font-bold">Naskah Lengkap Ketentuan (15 Pasal)</h2>
          <div className="mt-5 space-y-8">
            {PASAL.map((ps) => (
              <div key={ps.h}>
                <h3 className="font-bold text-primary">{ps.h}</h3>
                <div className="mt-2 space-y-2.5">
                  {ps.p.map((t, i) => (
                    <p key={i} className="text-sm leading-relaxed text-foreground/85">{t}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dasar hukum */}
        <section aria-labelledby="dasar" className="mt-12">
          <h2 id="dasar" className="text-xl font-bold">Dasar Hukum</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Daftar berikut adalah dasar utama kebijakan refund dan kontrak jasa kami, diverifikasi
            terhadap sumber primer (JDIH kementerian/lembaga, peraturan.bpk.go.id, dan situs resmi
            regulator) per November 2026. Setiap izin sektoral tetap memerlukan pemeriksaan aturan
            teknis yang spesifik. Relevansi:
          </p>
          <div className="mt-5 space-y-6">
            {DASAR_HUKUM.map((g) => (
              <div key={g.g} className="rounded-2xl border bg-card p-5">
                <div className="flex items-center gap-2.5">
                  <g.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <h3 className="font-bold text-sm">{g.g}</h3>
                </div>
                <dl className="mt-3 space-y-3">
                  {g.items.map((it) => (
                    <div key={it.t} className="text-sm leading-relaxed">
                      <dt className="font-semibold">{it.t}</dt>
                      <dd className="mt-1 text-muted-foreground">{it.d}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <p className="text-sm leading-relaxed text-foreground/85">
                <strong>Kerangka profesi &amp; integritas:</strong> UU No. 18 Tahun 2003 tentang Advokat
                dibaca bersama Putusan MK No. 006/PUU-II/2004 (Pasal 31 tidak berdaya ikat) dan Putusan MK
                No. 126/PUU-XXIV/2026 (pembentuk undang-undang diminta memperbarui UU Advokat paling lama
                dua tahun sejak 17 Juni 2026). Tindakan profesi hukum dilakukan profesional yang berwenang
                dan ditunjuk tertulis. Keputusan refund kami tidak pernah dibangun di atas pembayaran
                informal apa pun.
              </p>
            </div>
          </div>
        </section>

        {/* Prosedur klaim — ringkas */}
        <section aria-labelledby="klaim" className="mt-12">
          <h2 id="klaim" className="text-xl font-bold">Cara Mengajukan Klaim Refund</h2>
          <ol className="mt-5 space-y-3">
            {[
              { t: "Kirim Klaim Lengkap", d: "Email ke " + CONTACT.email + " atau formulir di halaman kontak: nomor SPK, identitas pemohon, alasan pembatalan, bukti pembayaran, dan rekening pengembalian. Anda menerima tanda terima/tiket klaim." },
              { t: "Pemeriksaan administratif — maks. 5 Hari Kerja", d: "Kami memeriksa kelengkapan administrasi dan menyampaikan daftar kekurangan secara spesifik bila ada. Pemeriksaan ini BUKAN putusan refund dan BUKAN janji pencairan — keputusan tertulis menyusul mengikuti kompleksitas mandat. Tidak pernah diminta kata sandi, OTP, PIN, atau kredensial akun Anda." },
              { t: "Putusan tertulis & perhitungan", d: "Tanpa tenggat tetap: waktu keputusan mengikuti kompleksitas mandat, karena nilai yang dapat dikembalikan perlu direkonsiliasi dengan instansi, notaris, dan pihak ketiga. Keputusan disertai perhitungan tertulis: total pembayaran, nilai pekerjaan yang diakui, biaya pihak ketiga per bukti, pajak/biaya transfer yang sah, dan jumlah bersih." },
              { t: "Pencairan sesuai tier", d: "Bagian yang tidak disengketakan dibayar lebih dahulu setelah dapat dihitung — tidak menunggu seluruh proses selesai. Pencairan penuh mengikuti tier (paling cepat 45 Hari Kerja, paling lama 24 bulan untuk mandat lintas negara yang disepakati)." },
              { t: "Laporan berkala (Tier 4 & 5)", d: "Laporan status tertulis sekurang-kurangnya setiap 30 hari kalender sampai penyelesaian, dan lebih cepat bila ada perkembangan material." },
            ].map((s, i) => (
              <li key={s.t} className="flex items-start gap-3 rounded-2xl border bg-card p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-sm">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ — sinkron JSON-LD */}
        <section aria-labelledby="faq" className="mt-12">
          <h2 id="faq" className="text-xl font-bold">Pertanyaan Umum</h2>
          <dl className="mt-5 space-y-4">
            {refundFaqJsonLd.mainEntity.map((f: { name: string; acceptedAnswer: { text: string } }) => (
              <div key={f.name} className="rounded-2xl border bg-card p-5">
                <dt className="font-bold">{f.name}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.acceptedAnswer.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Kontak & penutup */}
        <section className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <h2 className="text-lg font-bold">Pengaduan &amp; Kanal Resmi</h2>
          <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <div className="space-y-2">
              <p className="flex items-start gap-2"><MessageSquareWarning className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /> Email pengaduan/refund: <strong>{CONTACT.email}</strong></p>
              <p className="flex items-start gap-2"><Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /> Telepon/WhatsApp: <strong>{CONTACT.phoneDisplay}</strong></p>
              <p className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /> Jam operasional: <strong>{CONTACT.hours}</strong></p>
            </div>
            <div className="space-y-2">
              <p className="flex items-start gap-2"><FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /> {LEGAL_ENTITY}</p>
              <p className="flex items-start gap-2"><Landmark className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /> {CONTACT.address.street}, {CONTACT.address.city} {CONTACT.address.postalCode}</p>
              <p className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /> Korespondensi: {CONTACT.correspondenceAddress.street}, {CONTACT.correspondenceAddress.village}, {CONTACT.correspondenceAddress.district}, {CONTACT.correspondenceAddress.city} {CONTACT.correspondenceAddress.postalCode}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
            <Link
              href="/kontak"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
            >
              Ajukan Klaim / Hubungi Kami
            </Link>
            <Link
              href="/sistem-refund.html"
              className="rounded-xl border border-primary bg-primary/10 px-5 py-3 text-sm font-bold text-primary transition hover:bg-primary/20"
            >
              Isi Formulir Refund (Sistem Terpadu)
            </Link>
            <Link
              href="/garansi"
              className="rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-muted/60"
            >
              Lihat Garansi 100%
            </Link>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Ketentuan ini bagian tak terpisahkan dari{" "}
            <Link href="/syarat-ketentuan" className="font-semibold text-primary hover:underline">Syarat &amp; Ketentuan</Link>{" "}
            dan dipublikasikan sebelum pembayaran. Halaman ini bersifat informasi kebijakan perusahaan,
            bukan nasihat hukum formal untuk kondisi spesifik Anda; opini hukum formal diterbitkan advokat
            yang berwenang. Naskah disusun melalui kerangka analisis multidisiplin lintas bidang dan
            ditinjau menurut prosedur kepatuhan internal — lihat juga{" "}
            <Link href="/dewan-pakar" className="font-semibold text-primary hover:underline">kerangka Dewan Pakar kami</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
