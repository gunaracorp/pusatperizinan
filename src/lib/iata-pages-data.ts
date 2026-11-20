// ============================================================
// PUSATPERIZINAN.COM — KONTEN UNIK HALAMAN PRODUK IATA
// BAGIAN 5 (GoLite), 6 (GoStandard), 7 (GoGlobal) master brief.
// Konten tiap produk UNIK untuk menghindari duplicate content.
// Harga TIDAK di sini — tetap dari src/lib/iata.ts.
// ============================================================

import type { IataProductContent } from "@/components/iata/product-page";
import { IATA_URLS } from "@/lib/iata";

export const GOLITE_CONTENT: IataProductContent = {
  kode: "GOLITE",
  heroCopy: [
    "Ingin mengikuti akreditasi IATA dengan model tanpa Cash Facility?",
    "IATA GoLite merupakan Standard Accreditation without Cash Facility. Model ini dapat menjadi pilihan bagi travel agent yang ingin berpartisipasi dalam program IATA tanpa menggunakan fasilitas cash facility standar.",
    "PusatPerizinan.com membantu perusahaan melakukan pemeriksaan kesiapan legalitas, dokumen usaha, keuangan, dan persiapan administratif sebelum mengikuti proses pengajuan kepada IATA.",
  ],
  apaItu: {
    heading: "Apa Itu IATA GoLite?",
    paragraphs: [
      "IATA GoLite adalah Standard Accreditation without Cash Facility.",
      "Model ini ditujukan untuk travel agent yang ingin memperoleh akreditasi IATA tanpa fasilitas cash facility standar.",
      "IATA menjelaskan bahwa GoLite dapat digunakan oleh travel agent yang ingin menerbitkan tiket dengan menggunakan kartu kredit dan/atau IATA EasyPay sesuai ketentuan program dan pasar yang berlaku.",
      "Tidak adanya cash facility standar bukan berarti seluruh persyaratan finansial otomatis dihapus. Kondisi tertentu tetap dapat menyebabkan IATA meminta financial security.",
    ],
  },
  keunggulan: {
    heading: "Keunggulan Model GoLite",
    items: [
      "Model akreditasi tanpa cash facility standar.",
      "Relevan bagi agen yang menggunakan metode pembayaran yang diperbolehkan dalam GoLite.",
      "Persyaratan finansial berbeda dari GoStandard.",
      "Dapat menjadi alternatif bagi perusahaan yang belum memerlukan cash facility.",
      "Memungkinkan perusahaan mengevaluasi kebutuhan bisnis sebelum memilih model akreditasi.",
    ],
    note: "GoLite tidak selalu bebas financial security. Ketentuan khusus IATA tetap berlaku.",
  },
  siapa: {
    heading: "Siapa yang Cocok Mempertimbangkan GoLite?",
    items: [
      "Travel agent baru yang ingin memulai proses akreditasi.",
      "Agen tiket pesawat yang menggunakan pembayaran kartu kredit.",
      "Travel agent yang menggunakan IATA EasyPay sesuai ketentuan.",
      "Perusahaan yang belum membutuhkan cash facility standar.",
      "Perusahaan yang ingin mengevaluasi kebutuhan akreditasi dengan pendekatan finansial yang lebih sederhana.",
    ],
  },
  ruangLingkupHeading: "Ruang Lingkup Jasa Konsultasi GoLite",
  ruangLingkup: [
    { judul: "Initial Consultation", desc: "Diskusi kebutuhan dan profil bisnis." },
    { judul: "Eligibility Assessment", desc: "Evaluasi awal kelayakan perusahaan." },
    { judul: "Corporate Legal Review", desc: "Pemeriksaan akta, SK AHU, NIB, NPWP, serta dokumen badan usaha terkait." },
    { judul: "Travel Business License Review", desc: "Pemeriksaan kesesuaian izin usaha perjalanan." },
    { judul: "Financial Document Readiness", desc: "Review dokumen keuangan yang relevan untuk GoLite." },
    { judul: "Application Document Preparation", desc: "Pendampingan persiapan dokumen." },
    { judul: "Application Assistance", desc: "Pendampingan administratif untuk proses aplikasi melalui saluran resmi IATA." },
    { judul: "Follow-up Assistance", desc: "Bantuan persiapan klarifikasi administratif sesuai ruang lingkup kontrak." },
    { judul: "Post-Approval Guidance", desc: "Panduan administratif setelah keputusan IATA." },
  ],
  dokumen: {
    heading: "Persyaratan dan Dokumen Awal",
    items: [
      "Akta pendirian perusahaan.",
      "Akta perubahan terakhir apabila ada.",
      "Pengesahan atau penerimaan pemberitahuan AHU.",
      "NIB.",
      "NPWP badan usaha.",
      "Dokumen izin usaha perjalanan yang relevan.",
      "Laporan keuangan atau dokumen pajak sesuai checklist IATA yang berlaku.",
      "Informasi rekening perusahaan.",
      "Informasi direktur dan pihak yang berwenang.",
      "Informasi alamat kantor dan lokasi usaha.",
      "Formulir konfirmasi domestik/internasional jika dipersyaratkan.",
      "Dokumen pendukung lain sesuai hasil filter checklist IATA Indonesia.",
    ],
    note: "Daftar ini merupakan daftar pemeriksaan awal, bukan pengganti checklist resmi IATA. Persyaratan final harus diverifikasi berdasarkan model, tipe lokasi, dan jenis aplikasi.",
  },
  financialSecurity: {
    heading: "Financial Security pada GoLite",
    paragraphs: [
      "GoLite tidak memiliki cash facility standar. Namun, terdapat situasi tertentu yang dapat menyebabkan IATA meminta financial security.",
      "IATA menjelaskan pada informasi GoLite bahwa transaksi ADM dan/atau transaksi cash tertentu yang melewati ambang yang ditetapkan dalam periode evaluasi dapat menimbulkan kewajiban financial security.",
      "Karena itu, jangan mengartikan GoLite sebagai jaminan tidak adanya financial security. Tim kami membantu perusahaan memahami ketentuan ini dan menyiapkan dokumen yang relevan sejak awal.",
    ],
  },
  proses: {
    heading: "Proses Pengajuan GoLite",
    items: [
      "Konsultasi.",
      "Pemeriksaan profil perusahaan.",
      "Penentuan kesesuaian model GoLite.",
      "Review dokumen.",
      "Persiapan aplikasi.",
      "Pengajuan oleh pihak berwenang melalui portal resmi.",
      "Evaluasi oleh IATA.",
      "Pemenuhan permintaan tambahan jika ada.",
      "Keputusan IATA.",
    ],
  },
  pengecualian: {
    heading: "Pengecualian Biaya GoLite",
    items: [
      "Biaya aplikasi atau akreditasi resmi IATA.",
      "Annual fee IATA.",
      "Financial security.",
      "Audit atau jasa akuntan.",
      "Notaris dan perubahan dokumen.",
      "Penerjemahan tersumpah.",
      "Biaya bank.",
      "Pajak.",
      "Pengadaan sertifikat pelatihan.",
      "Biaya pihak ketiga lainnya.",
    ],
  },
  faq: [
    {
      q: "Apa itu IATA GoLite?",
      a: "GoLite adalah Standard Accreditation without Cash Facility.",
    },
    {
      q: "Apakah GoLite memiliki cash facility?",
      a: "Tidak. GoLite merupakan model tanpa cash facility standar.",
    },
    {
      q: "Apakah GoLite dapat digunakan untuk menerbitkan tiket?",
      a: "Model ini dirancang untuk agen yang menggunakan metode pembayaran yang diperbolehkan, termasuk kartu kredit dan/atau IATA EasyPay sesuai ketentuan.",
    },
    {
      q: "Apakah GoLite bebas financial security?",
      a: "Tidak selalu. Kondisi tertentu dapat menyebabkan IATA meminta financial security.",
    },
    {
      q: "Apakah perusahaan baru dapat mengajukan GoLite?",
      a: "Perusahaan baru dapat berkonsultasi dan diperiksa kelayakannya. Keputusan akhir mengikuti kriteria IATA dan perizinan lokal.",
    },
    {
      q: "Apakah laporan keuangan wajib?",
      a: "Persyaratan harus mengikuti checklist Indonesia yang berlaku. IATA memiliki ketentuan khusus untuk dokumen finansial GoLite.",
    },
    {
      q: "Berapa harga jasa konsultasi GoLite?",
      a: "Harga promo jasa konsultasi PusatPerizinan.com adalah Rp27.787.500 untuk periode promo 2026 yang berlaku. Harga katalog Rp55.575.000.",
    },
    {
      q: "Apakah harga sudah termasuk biaya resmi IATA?",
      a: "Tidak. Biaya resmi IATA dan biaya pihak ketiga tidak termasuk kecuali tertulis dalam quotation.",
    },
    {
      q: "Berapa lama proses akreditasi?",
      a: "Waktu proses bergantung pada kelengkapan dokumen, evaluasi, dan keputusan IATA. Kami tidak menjamin tanggal persetujuan.",
    },
    {
      q: "Apakah konsultan dapat menjamin persetujuan?",
      a: "Tidak. Persetujuan merupakan kewenangan IATA.",
    },
  ],
  finalCta: {
    title: "Persiapkan perusahaan Anda sebelum mengajukan IATA GoLite.",
    desc: "Konsultasikan kesiapan legalitas, izin usaha, dan dokumen perusahaan kepada PusatPerizinan.com — mulai dari pemeriksaan kelayakan awal.",
  },
  terkait: [
    {
      href: IATA_URLS.panduan.perbedaan,
      label: "Perbedaan GoLite, GoStandard & GoGlobal",
      desc: "Tabel komparasi untuk menentukan model yang paling relevan dengan kebutuhan pembayaran Anda.",
    },
    {
      href: IATA_URLS.panduan.persyaratan,
      label: "Persyaratan IATA Indonesia",
      desc: "Dokumen legal, izin usaha, dan finansial yang diperiksa sebelum aplikasi.",
    },
    {
      href: IATA_URLS.panduan.financialSecurity,
      label: "Financial Security IATA",
      desc: "Memahami kapan financial security dapat diminta meski tanpa cash facility.",
    },
    {
      href: IATA_URLS.panduan.agentBaru,
      label: "IATA untuk Travel Agent Baru",
      desc: "Kesiapan perusahaan baru mengikuti proses akreditasi IATA.",
    },
    {
      href: IATA_URLS.cekKelayakan,
      label: "Cek Kelayakan IATA",
      desc: "Formulir pemeriksaan awal gratis untuk profil perusahaan Anda.",
    },
    {
      href: IATA_URLS.konsultasi,
      label: "Konsultasi IATA",
      desc: "Diskusikan kesiapan perusahaan bersama tim konsultan kami.",
    },
  ],
};

export const GOSTANDARD_CONTENT: IataProductContent = {
  kode: "GOSTANDARD",
  heroCopy: [
    "Bagi perusahaan perjalanan yang membutuhkan akses Cash Facility, IATA GoStandard merupakan model Standard Accreditation with Cash Facility.",
    "GoStandard memungkinkan travel agent mengakses solusi pembayaran standar IATA yang berlaku sesuai program dan pasar terkait.",
    "Namun, model ini memiliki kebutuhan finansial yang harus diperiksa secara serius sebelum pengajuan.",
    "PusatPerizinan.com membantu perusahaan melakukan financial readiness review, pemeriksaan dokumen perusahaan, evaluasi kesiapan aplikasi, serta pendampingan administratif.",
  ],
  apaItu: {
    heading: "Apa Itu IATA GoStandard?",
    paragraphs: [
      "GoStandard adalah Standard Accreditation with Cash Facility.",
      "Model ini relevan untuk perusahaan perjalanan yang membutuhkan akses cash facility dan solusi pembayaran standar IATA sesuai ketentuan yang berlaku.",
      "Berbeda dari GoLite, GoStandard memerlukan perhatian lebih besar terhadap kondisi finansial perusahaan, laporan keuangan, dan kemungkinan financial security.",
    ],
  },
  keunggulan: {
    heading: "Manfaat dan Karakteristik GoStandard",
    items: [
      "Akses cash facility sesuai ketentuan.",
      "Akses solusi pembayaran standar IATA.",
      "Cocok dievaluasi oleh perusahaan dengan kebutuhan operasional yang lebih luas.",
      "Memerlukan pemeriksaan finansial yang lebih mendalam.",
      "Memerlukan pemenuhan kriteria IATA yang relevan.",
    ],
    note: "Fasilitas atau limit tertentu tidak dapat dijanjikan tanpa dasar persetujuan IATA.",
  },
  siapa: {
    heading: "Siapa yang Sebaiknya Mempertimbangkan GoStandard?",
    items: [
      "Travel agent yang membutuhkan cash facility.",
      "Perusahaan dengan transaksi dan kebutuhan pembayaran yang lebih kompleks.",
      "Travel agent yang telah memiliki kesiapan finansial.",
      "Perusahaan yang mempunyai laporan keuangan sesuai ketentuan.",
      "Grup perusahaan yang memerlukan evaluasi struktur operasional dan finansial.",
    ],
  },
  ruangLingkupHeading: "Ruang Lingkup Konsultasi GoStandard",
  ruangLingkup: [
    { judul: "Initial Business Assessment", desc: "Penilaian awal profil dan kesiapan bisnis." },
    { judul: "Corporate Legal Review", desc: "Pemeriksaan akta, pengesahan AHU, NIB, dan NPWP badan." },
    { judul: "Travel Business Licensing Review", desc: "Evaluasi kesesuaian izin usaha perjalanan." },
    { judul: "Financial Readiness Assessment", desc: "Pemetaan kesiapan dokumen keuangan perusahaan." },
    { judul: "Review Laporan Keuangan", desc: "Pemeriksaan laporan keuangan terhadap ketentuan yang relevan." },
    { judul: "Financial Security Readiness Assessment", desc: "Evaluasi kesiapan menghadapi kemungkinan financial security." },
    { judul: "Application Document Preparation", desc: "Penyiapan dan pengecekan kelengkapan dokumen aplikasi." },
    { judul: "Administrative Application Assistance", desc: "Pendampingan administratif melalui saluran resmi IATA." },
    { judul: "Clarification Assistance", desc: "Bantuan menyiapkan tanggapan klarifikasi sesuai kontrak." },
    { judul: "Post-Approval Administrative Guidance", desc: "Panduan administratif awal setelah keputusan IATA." },
  ],
  dokumen: {
    heading: "Dokumen Awal yang Diperiksa",
    items: [
      "Akta pendirian dan perubahan.",
      "Pengesahan AHU.",
      "NIB.",
      "NPWP badan.",
      "Izin usaha perjalanan yang relevan.",
      "Laporan keuangan.",
      "Dokumen audit apabila dipersyaratkan.",
      "Opening balance sheet apabila sesuai ketentuan perusahaan baru.",
      "Informasi rekening perusahaan.",
      "Data direktur dan pemegang kewenangan.",
      "Informasi lokasi dan aktivitas operasional.",
      "Dokumen pendukung sesuai checklist resmi.",
    ],
    note: "Daftar ini adalah daftar pemeriksaan awal kami. Checklist final IATA dapat berubah dan difilter berdasarkan jenis akreditasi, lokasi, dan jenis permohonan.",
  },
  financialSecurity: {
    heading: "Financial Readiness dan Financial Security",
    paragraphs: [
      "Pemeriksaan finansial merupakan salah satu bagian terpenting dalam persiapan GoStandard. IATA memiliki persyaratan laporan keuangan khusus untuk GoStandard. Dalam panduan persyaratan yang dipublikasikan, pemohon baru pada umumnya harus menyerahkan laporan keuangan audited untuk tahun keuangan terakhir.",
      "Perusahaan yang baru dibentuk dan telah beroperasi kurang dari 12 bulan dapat memiliki ketentuan opening balance sheet yang disiapkan oleh statutory auditor.",
      "Persyaratan aktual harus diverifikasi kembali berdasarkan checklist Indonesia, financial criteria, serta kondisi perusahaan.",
      "Financial security adalah aspek yang harus diperiksa sebelum perusahaan memilih GoStandard. Jenis, jumlah, bentuk, penyedia, dan kewajiban financial security ditentukan berdasarkan ketentuan dan evaluasi IATA. Konsultan dapat membantu mempersiapkan dokumen dan mengevaluasi kesiapan, tetapi tidak menentukan nilai security dan tidak dapat menjamin penghapusannya.",
    ],
  },
  proses: {
    heading: "Proses Pengajuan GoStandard",
    items: [
      "Konsultasi dan pemeriksaan profil perusahaan.",
      "Penentuan kesesuaian model GoStandard.",
      "Financial readiness review.",
      "Review dokumen legal dan keuangan.",
      "Persiapan aplikasi dan dokumen pendukung.",
      "Pengajuan oleh pihak berwenang melalui portal resmi IATA.",
      "Evaluasi oleh IATA.",
      "Pemenuhan permintaan klarifikasi atau dokumen tambahan jika ada.",
      "Keputusan IATA dan panduan tindak lanjut administratif.",
    ],
  },
  pengecualian: {
    heading: "Pengecualian Biaya GoStandard",
    items: [
      "Biaya aplikasi atau akreditasi resmi IATA.",
      "Annual fee IATA.",
      "Financial security.",
      "Audit atau jasa akuntan statutory auditor.",
      "Notaris dan perubahan dokumen.",
      "Penerjemahan tersumpah.",
      "Biaya bank dan transfer antar negara.",
      "Pajak.",
      "Biaya pihak ketiga lainnya.",
    ],
  },
  faq: [
    {
      q: "Apa itu IATA GoStandard?",
      a: "Standard Accreditation with Cash Facility.",
    },
    {
      q: "Apa perbedaan GoStandard dan GoLite?",
      a: "GoStandard menyediakan Cash Facility, sedangkan GoLite tidak menyediakan Cash Facility standar.",
    },
    {
      q: "Apakah GoStandard memerlukan laporan keuangan audited?",
      a: "Untuk pemohon baru, persyaratan IATA umumnya meminta audited accounts tahun keuangan terakhir. Ketentuan khusus perusahaan baru perlu diperiksa.",
    },
    {
      q: "Apakah GoStandard memerlukan financial security?",
      a: "IATA dapat mensyaratkan financial security berdasarkan kriteria dan evaluasi yang berlaku.",
    },
    {
      q: "Apakah perusahaan baru dapat mengajukan GoStandard?",
      a: "Dapat dikonsultasikan, tetapi kesiapan dokumen keuangan dan kriteria perusahaan harus diperiksa.",
    },
    {
      q: "Apakah GoStandard lebih baik daripada GoLite?",
      a: "Tidak selalu. Pilihan bergantung pada kebutuhan pembayaran dan kesiapan finansial perusahaan.",
    },
    {
      q: "Berapa harga konsultasi GoStandard?",
      a: "Rp53.437.500 untuk harga promo jasa konsultasi PusatPerizinan.com pada periode promo 2026 yang berlaku. Harga katalog Rp106.875.000.",
    },
    {
      q: "Apakah biaya IATA termasuk?",
      a: "Tidak termasuk kecuali dinyatakan secara khusus dalam quotation.",
    },
    {
      q: "Apakah persetujuan dijamin?",
      a: "Tidak. IATA menentukan keputusan akhir.",
    },
  ],
  finalCta: {
    title: "Butuh Cash Facility untuk operasional travel agent Anda?",
    desc: "Mulailah dengan pemeriksaan kesiapan finansial dan konsultasi model akreditasi GoStandard kepada tim kami.",
  },
  terkait: [
    {
      href: IATA_URLS.panduan.financialSecurity,
      label: "Financial Security IATA",
      desc: "Pengertian, fungsi, dan faktor penilaian financial security sebelum Anda memilih model.",
    },
    {
      href: IATA_URLS.panduan.biaya,
      label: "Biaya Akreditasi IATA",
      desc: "Memisahkan jasa konsultasi dari biaya resmi IATA, annual fee, dan financial security.",
    },
    {
      href: IATA_URLS.panduan.persyaratan,
      label: "Persyaratan IATA Indonesia",
      desc: "Dokumen legal, izin usaha perjalanan, dan dokumen finansial yang diperiksa.",
    },
    {
      href: IATA_URLS.panduan.perbedaan,
      label: "Perbandingan GoLite vs GoStandard",
      desc: "Tabel komparasi model, cash facility, dan kebutuhan finansial.",
    },
    {
      href: IATA_URLS.cekKelayakan,
      label: "Cek Kelayakan IATA",
      desc: "Formulir pemeriksaan awal gratis — termasuk kesiapan laporan keuangan.",
    },
    {
      href: IATA_URLS.konsultasi,
      label: "Konsultasi IATA",
      desc: "Diskusikan kesiapan finansial dan struktur usaha Anda bersama tim kami.",
    },
  ],
};

export const GOGLOBAL_CONTENT: IataProductContent = {
  kode: "GOGLOBAL",
  heroCopy: [
    "Apakah perusahaan perjalanan Anda beroperasi melalui beberapa negara dan lokasi?",
    "IATA GoGlobal merupakan model Multi-Country Accreditation yang ditujukan bagi organisasi perjalanan yang memenuhi ketentuan operasi lintas negara melalui beberapa lokasi.",
    "Model ini membutuhkan evaluasi struktur grup usaha, entitas, lokasi, kesiapan finansial, dan persyaratan setiap negara yang terlibat.",
    "PusatPerizinan.com menyediakan konsultasi dan koordinasi persiapan multi-country accreditation berdasarkan ruang lingkup proyek.",
  ],
  apaItu: {
    heading: "Apa Itu IATA GoGlobal?",
    paragraphs: [
      "GoGlobal adalah Multi-Country Accreditation.",
      "IATA menjelaskan model ini untuk travel agent yang beroperasi di beberapa negara melalui beberapa lokasi.",
      "Model GoGlobal memiliki kerangka financial criteria dan review untuk seluruh lokasi, serta mekanisme financial security dan pengelolaan Remittance Holding Capacity pada tingkat grup sesuai ketentuan yang berlaku.",
      "GoGlobal bukan sekadar GoStandard dengan harga lebih tinggi. Model ini memiliki karakteristik dan persyaratan multi-country tersendiri.",
    ],
  },
  keunggulan: {
    heading: "Karakteristik Model GoGlobal",
    items: [
      "Kerangka akreditasi lintas negara untuk grup usaha.",
      "Review financial criteria pada tingkat grup dan lokasi.",
      "Mekanisme financial security dan Remittance Holding Capacity tingkat grup sesuai ketentuan.",
      "Koordinasi persyaratan beberapa negara dalam satu kerangka proyek.",
      "Cocok untuk organisasi dengan struktur regional atau jaringan internasional.",
    ],
    note: "Kelayakan struktur grup, negara, dan lokasi harus diperiksa terlebih dahulu sebelum memilih GoGlobal.",
  },
  siapa: {
    heading: "Siapa yang Membutuhkan GoGlobal?",
    items: [
      "Grup perusahaan perjalanan yang beroperasi di beberapa negara.",
      "Travel group dengan sejumlah entitas dan lokasi.",
      "Perusahaan yang sedang mengembangkan jaringan internasional.",
      "Organisasi perjalanan dengan struktur regional.",
      "Grup perusahaan yang ingin mengevaluasi kerangka akreditasi multi-country.",
    ],
  },
  ruangLingkupHeading: "Ruang Lingkup Konsultasi GoGlobal",
  ruangLingkup: [
    { judul: "Group Structure Assessment", desc: "Penilaian struktur grup usaha dan hubungan antar entitas." },
    { judul: "Country and Location Mapping", desc: "Pemetaan negara dan lokasi operasional grup." },
    { judul: "Entity Relationship Review", desc: "Review hubungan kepemilikan dan pengelolaan antar entitas." },
    { judul: "Local Regulatory Requirement Mapping", desc: "Pemetaan persyaratan regulasi lokal per negara." },
    { judul: "Financial Readiness Assessment", desc: "Penilaian kesiapan finansial grup." },
    { judul: "Multi-Country Financial Criteria Review", desc: "Review financial criteria kerangka multi-country." },
    { judul: "Financial Security Readiness", desc: "Evaluasi kesiapan financial security tingkat grup." },
    { judul: "Application Documentation Coordination", desc: "Koordinasi penyiapan dokumen antar entitas dan negara." },
    { judul: "Administrative Application Assistance", desc: "Pendampingan administratif melalui saluran resmi IATA." },
    { judul: "Clarification and Follow-up Coordination", desc: "Koordinasi tanggapan klarifikasi sesuai kontrak." },
    { judul: "Post-Approval Administrative Guidance", desc: "Panduan administratif awal setelah keputusan IATA." },
  ],
  dokumen: {
    heading: "Informasi yang Dibutuhkan untuk Konsultasi GoGlobal",
    items: [
      "Profil perusahaan induk.",
      "Daftar entitas perusahaan.",
      "Negara tempat beroperasi.",
      "Daftar lokasi.",
      "Struktur kepemilikan.",
      "Struktur manajemen.",
      "Aktivitas bisnis setiap entitas.",
      "Laporan keuangan grup.",
      "Informasi rekening.",
      "Dokumen izin usaha di setiap negara.",
      "Data lokasi dan operasional.",
      "Dokumen pendukung sesuai persyaratan negara terkait.",
    ],
    note: "Dokumen final mengikuti persyaratan setiap negara dan ketentuan terbaru IATA — dipetakan dalam matriks persyaratan proyek.",
  },
  financialSecurity: {
    heading: "Financial Criteria dan Financial Security GoGlobal",
    paragraphs: [
      "Model GoGlobal menggunakan kerangka financial criteria dan review untuk seluruh lokasi, dengan mekanisme financial security dan pengelolaan Remittance Holding Capacity pada tingkat grup sesuai ketentuan yang berlaku.",
      "Persyaratan ditentukan berdasarkan kriteria dan evaluasi IATA. Kami membantu grup usaha memetakan kewajiban per negara, menyiapkan dokumen finansial grup, dan berkoordinasi dengan pihak terkait — tanpa menentukan nilai security dan tanpa menjamin persetujuan.",
    ],
  },
  proses: {
    heading: "Metodologi Proyek GoGlobal",
    items: [
      "Phase 1 — Discovery: mengidentifikasi negara, entitas, dan lokasi.",
      "Phase 2 — Group Structure Review: memetakan hubungan perusahaan dan kepemilikan.",
      "Phase 3 — Country Requirements Matrix: membuat matriks persyaratan setiap negara.",
      "Phase 4 — Financial Readiness: menilai kesiapan finansial grup berdasarkan ketentuan yang relevan.",
      "Phase 5 — Application Preparation: mempersiapkan dokumen dan koordinasi administratif.",
      "Phase 6 — Follow-up: membantu koordinasi klarifikasi sesuai ruang lingkup kontrak.",
    ],
  },
  pengecualian: {
    heading: "Pengecualian Biaya GoGlobal",
    items: [
      "Biaya aplikasi atau akreditasi resmi IATA per negara/lokasi.",
      "Annual fee IATA.",
      "Financial security tingkat grup atau lokasi.",
      "Audit dan jasa statutory auditor.",
      "Notaris dan perubahan dokumen di tiap yurisdiksi.",
      "Penerjemahan tersumpah.",
      "Biaya bank dan transfer antar negara.",
      "Pajak di tiap yurisdiksi.",
      "Biaya pihak ketiga lainnya.",
    ],
  },
  faq: [
    {
      q: "Apa itu IATA GoGlobal?",
      a: "Model Multi-Country Accreditation bagi travel agent yang beroperasi di beberapa negara melalui beberapa lokasi.",
    },
    {
      q: "Apakah GoGlobal sama dengan GoStandard?",
      a: "Tidak. GoGlobal mempunyai kerangka persyaratan multi-country tersendiri.",
    },
    {
      q: "Apakah perusahaan harus memiliki beberapa negara operasi?",
      a: "Model ini ditujukan untuk operasi multi-country. Kelayakan struktur dan negara harus diperiksa.",
    },
    {
      q: "Apakah GoGlobal memerlukan financial security?",
      a: "Persyaratan ditentukan berdasarkan kriteria dan evaluasi IATA.",
    },
    {
      q: "Apakah harga GoGlobal tetap?",
      a: "Tidak. Harga dimulai dari Rp106.875.000 dan memerlukan penawaran khusus berdasarkan cakupan negara dan entitas — jumlah negara, entitas, lokasi, kompleksitas struktur, dan kebutuhan dokumen.",
    },
    {
      q: "Apakah semua negara memiliki persyaratan sama?",
      a: "Tidak. Persyaratan dan regulasi lokal perlu dipetakan untuk setiap negara.",
    },
    {
      q: "Apakah persetujuan dijamin?",
      a: "Tidak. Keputusan akhir berada pada IATA.",
    },
  ],
  finalCta: {
    title: "Rencanakan ekspansi akreditasi travel agent Anda ke beberapa negara.",
    desc: "Konsultasikan struktur grup, negara operasi, dan kesiapan finansial untuk memetakan kerangka GoGlobal yang paling sesuai.",
  },
  terkait: [
    {
      href: IATA_URLS.panduan.perbedaan,
      label: "Perbedaan GoLite, GoStandard & GoGlobal",
      desc: "GoGlobal bukan sekadar GoStandard premium — pahami kerangka multi-country-nya.",
    },
    {
      href: IATA_URLS.panduan.financialSecurity,
      label: "Financial Security IATA",
      desc: "Kerangka financial criteria dan security tingkat grup.",
    },
    {
      href: IATA_URLS.panduan.proses,
      label: "Proses Pengajuan IATA",
      desc: "Alur persiapan hingga keputusan akhir IATA.",
    },
    {
      href: IATA_URLS.cekKelayakan,
      label: "Cek Kelayakan IATA",
      desc: "Sertakan jumlah negara dan lokasi untuk pemetaan awal GoGlobal.",
    },
    {
      href: IATA_URLS.konsultasi,
      label: "Konsultasi IATA",
      desc: "Diskusikan struktur grup usaha Anda bersama tim kami.",
    },
    {
      href: IATA_URLS.pillar,
      label: "Pillar IATA Accreditation",
      desc: "Pusat seluruh informasi akreditasi IATA PusatPerizinan.com.",
    },
  ],
};
