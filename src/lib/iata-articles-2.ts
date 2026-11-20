// ============================================================
// ARTIKEL IATA 5–8 (BAGIAN 8 master brief)
// Aturan sama: tanpa angka tanpa sumber, tanpa janji persetujuan,
// harga hanya dari sumber tunggal, izin/PPIU-PIHK tidak diklaim
// menggantikan persyaratan IATA.
// ============================================================

import type { IataArticle } from "./iata-articles";
import { IATA_URLS } from "@/lib/iata";

export const IATA_ARTICLES_2: IataArticle[] = [
  // ----------------------------------------------------------
  // ARTIKEL 5 — /panduan/biaya-akreditasi-iata
  // ----------------------------------------------------------
  {
    slug: "biaya-akreditasi-iata",
    h1: "Biaya Akreditasi IATA: Memahami Biaya Resmi dan Jasa Konsultasi",
    seoTitle: "Biaya Akreditasi IATA: Resmi vs Jasa Konsultasi | PusatPerizinan.com",
    metaDescription:
      "Rincian biaya akreditasi IATA: jasa konsultasi (GoLite Rp14.625.000, GoStandard Rp28.125.000, GoGlobal mulai Rp56.250.000) versus biaya resmi IATA — application fee, annual fee, financial security, audit, notaris, dan pihak ketiga.",
    excerpt:
      "Dua kelompok biaya yang sering dicampur — jasa konsultan dan biaya resmi IATA — dijelaskan terpisah, plus daftar biaya pihak ketiga yang harus dianggarkan dan pentingnya quotation tertulis.",
    updatedAt: "2026-11-19",
    readMinutes: 7,
    sections: [
      {
        paragraphs: [
          "Jawaban singkatnya: biaya akreditasi IATA terdiri dari dua kelompok yang tidak boleh dicampur — biaya resmi yang ditetapkan IATA/penyedia resminya (application fee, annual fee, financial security, audit, notaris, penerjemahan, bank, pajak) dan jasa konsultasi pendampingan yang ditetapkan konsultan. Menganggarkan hanya satu kelompok adalah kesalahan perencanaan yang paling umum.",
        ],
      },
      {
        heading: "Perbedaan Biaya Jasa Konsultan dan Biaya IATA",
        paragraphs: [
          "Biaya IATA lahir dari ketentuan program: nilai dan bentuknya mengikuti keputusan IATA dan penyedia resmi, bukan negosiasi dengan konsultan. Jasa konsultasi lahir dari pekerjaan profesional: pemeriksaan kelayakan, review dokumen, penyiapan berkas, dan koordinasi administratif — ruang lingkupnya dikontrak dan dikunci dalam quotation.",
          "Karena itu, dua penawaran konsultan dengan harga berbeda bisa jadi membandingkan dua ruang lingkup berbeda. Selalu bandingkan isi pekerjaan, bukan hanya angka.",
        ],
      },
      {
        heading: "Harga Jasa Konsultasi PusatPerizinan.com",
        table: {
          caption: "Harga jasa konsultasi & pendampingan (bukan biaya resmi IATA).",
          headers: ["Model", "Harga katalog", "Harga promo 2026"],
          rows: [
            ["IATA GoLite", "Rp29.250.000", "Rp14.625.000"],
            ["IATA GoStandard", "Rp56.250.000", "Rp28.125.000"],
            ["IATA GoGlobal", "Rp112.500.000", "Mulai Rp56.250.000"],
          ],
        },
        paragraphs: [
          "Catatan penting: harga katalog dan harga promo ditampilkan apa adanya sebagai dua tingkat harga layanan — bukan klaim harga transaksi historis. Periode promo dapat diubah oleh administrator. Untuk GoGlobal, harga akhir ditentukan setelah pemeriksaan jumlah negara, entitas, lokasi, kompleksitas struktur perusahaan, dan kebutuhan dokumen. Seluruh angka di atas adalah harga jasa; biaya resmi IATA dan pihak ketiga tidak termasuk kecuali dinyatakan tertulis dalam quotation.",
        ],
        cta: { text: "Lihat detail tiap model: ", href: IATA_URLS.pillar, label: "Pillar IATA Accreditation" },
      },
      {
        heading: "Annual Fee IATA",
        paragraphs: [
          "Annual fee adalah biaya keanggotaan/program yang dibayarkan kepada IATA secara tahunan sesuai ketentuan yang berlaku. Nilainya ditetapkan IATA dan dapat berubah — angkanya selalu diperiksa dari sumber resmi pada saat Anda mengajukan, bukan dari halaman pihak ketiga yang mungkin usang.",
        ],
      },
      {
        heading: "Financial Security",
        paragraphs: [
          "Financial security dapat diminta IATA berdasarkan kriteria dan evaluasi — termasuk pada GoLite pada kondisi tertentu (mis. transaksi ADM/cash melewati ambang pada periode evaluasi) dan sebagai bagian dari kerangka tingkat grup pada GoGlobal. Bentuk, penyedia, dan kewajibannya mengikuti ketentuan IATA; angka yang spesifik untuk perusahaan Anda hanya muncul dari proses evaluasi, dan tidak kami karang tanpa sumber resmi.",
        ],
        cta: { text: "Bedah istilahnya: ", href: IATA_URLS.panduan.financialSecurity, label: "Financial Security IATA" },
      },
      {
        heading: "Audit dan Notaris",
        bullets: [
          "Jasa statutory auditor untuk audited accounts (umumnya dipersyaratkan bagi pemohon baru GoStandard) atau opening balance sheet untuk perusahaan yang beroperasi kurang dari 12 bulan.",
          "Jasa notaris untuk akta pendirian/perubahan dan dokumen legal lain bila struktur perusahaan perlu disesuaikan.",
          "Biaya pengesahan dokumen ke instansi terkait bila diperlukan.",
        ],
      },
      {
        heading: "Terjemahan dan Biaya Pihak Ketiga",
        bullets: [
          "Penerjemahan tersumpah untuk dokumen yang diminta dalam bahasa lain.",
          "Biaya bank: transfer, konfirmasi rekening, dan administrasi antar negara (relevan untuk GoGlobal).",
          "Pajak atas transaksi jasa dan dokumen sesuai peraturan yang berlaku.",
          "Pengadaan sertifikat pelatihan bila dipersyaratkan pada jenis permohonan tertentu.",
        ],
      },
      {
        heading: "Pentingnya Quotation Tertulis",
        checklist: [
          "Ruang lingkup pekerjaan tercantum jelas (layanan apa saja yang dilakukan).",
          "Pengecualian biaya ditulis eksplisit — apa yang TIDAK termasuk.",
          "Jadwal kerja dan titik serah terima didefinisikan.",
          "Harga jasa terpisah tegas dari estimasi biaya resmi/pihak ketiga.",
          "Masa berlaku harga promo dicantumkan.",
        ],
        paragraphs: [
          "Quotation tertulis melindungi dua arah: Anda tahu persis apa yang dibayar, konsultan tahu batas tanggung jawabnya. Ini standar kerja kami untuk setiap klien IATA.",
        ],
        cta: { text: "Minta quotation: ", href: IATA_URLS.konsultasi, label: "Konsultasi & quotation IATA" },
      },
    ],
    faq: [
      {
        q: "Apakah harga promo jasa konsultasi berlaku selamanya?",
        a: "Tidak. Harga promo berlaku untuk periode tertentu dan dapat diubah oleh administrator. Harga final yang berlaku untuk Anda dikunci dalam quotation tertulis saat kesepakatan dibuat.",
      },
      {
        q: "Berapa total biaya akreditasi IATA untuk perusahaan saya?",
        a: "Totalnya = jasa konsultasi + biaya resmi IATA (application fee, annual fee) + financial security bila diminta + biaya pihak ketiga (audit, notaris, terjemahan, bank, pajak). Komponen resmi ditetapkan IATA dan pihak ketiganya — kami bantu menganggarkannya dengan nilai dari sumber resmi saat proses berjalan.",
      },
      {
        q: "Apakah financial security kembali setelah proses selesai?",
        a: "Pengembalian atau pencairan financial security mengikuti ketentuan IATA dan instrumen yang dipilih pada saat relevan. Karena aturannya dapat berubah, verifikasi ketentuan terbaru pada periode Anda mengajukan.",
      },
    ],
    terkait: [
      { href: IATA_URLS.golite, label: "IATA GoLite — harga & ruang lingkup" },
      { href: IATA_URLS.gostandard, label: "IATA GoStandard — harga & ruang lingkup" },
      { href: IATA_URLS.goglobal, label: "IATA GoGlobal — harga & ruang lingkup" },
    ],
  },

  // ----------------------------------------------------------
  // ARTIKEL 6 — /panduan/financial-security-iata
  // ----------------------------------------------------------
  {
    slug: "financial-security-iata",
    h1: "Financial Security IATA: Pengertian, Fungsi, dan Hal yang Perlu Dipersiapkan",
    seoTitle: "Financial Security IATA: Pengertian & Fungsi | PusatPerizinan.com",
    metaDescription:
      "Pahami financial security IATA: definisi, perbedaan antara GoLite dan GoStandard, financial criteria, faktor penilaian, ketentuan GoGlobal, financial security provider, dan peran konsultan dalam persiapan.",
    excerpt:
      "Financial security bukan hukuman — ia bagian dari kerangka proteksi program IATA. Panduan ini menjelaskan definisinya, kapan ia muncul per model, dan apa yang bisa Anda siapkan sejak awal.",
    updatedAt: "2026-11-19",
    readMinutes: 7,
    sections: [
      {
        paragraphs: [
          "Financial security IATA adalah jaminan yang dapat disyaratkan IATA kepada agen untuk melindungi kewajiban yang timbul dari transaksi dalam kerangka program. Bentuk, penyedia, dan kewajibannya ditentukan berdasarkan ketentuan dan evaluasi IATA — dan karena itu, tidak ada konsultan yang bisa menetapkan angkanya di luar proses resmi. Yang bisa dilakukan sejak awal adalah memahami kapan ia muncul dan menyiapkan dokumen pendukungnya.",
        ],
      },
      {
        heading: "Definisi dan Fungsi Financial Security",
        paragraphs: [
          "Dalam kerangka Agency Programme, transaksi antara agen dan maskapai menimbulkan kewajiban pembayaran pada periode tertentu. Financial security berfungsi sebagai lapisan proteksi atas kewajiban tersebut. Kehadirannya diputuskan lewat evaluasi terhadap kriteria finansial — profil keuangan perusahaan, kebiasaan transaksi, dan ketentuan model akreditasi yang dipilih.",
        ],
      },
      {
        heading: "Perbedaan GoLite dan GoStandard",
        paragraphs: [
          "GoStandard, yang menyertakan cash facility, menuntut pemeriksaan finansial lebih mendalam — pemohon baru umumnya dihadapkan pada persyaratan audited accounts tahun keuangan terakhir sesuai panduan yang dipublikasikan, dengan kemungkinan financial security berdasarkan evaluasi.",
          "GoLite tidak memiliki cash facility standar, tetapi tetap bukan zona bebas kewajiban: IATA menjelaskan bahwa transaksi ADM dan/atau transaksi cash tertentu yang melewati ambang yang ditetapkan dalam periode evaluasi dapat menimbulkan kewajiban financial security. Ini jebakan istilah yang paling sering salah dipahami: 'tanpa cash facility' ≠ 'tanpa financial security'.",
        ],
        cta: { text: "Bandingkan modelnya: ", href: IATA_URLS.panduan.perbedaan, label: "Perbedaan GoLite, GoStandard, GoGlobal" },
      },
      {
        heading: "Financial Criteria dan Faktor Penilaian",
        bullets: [
          "Struktur dan kesehatan keuangan perusahaan (laporan keuangan yang dapat diperiksa).",
          "Kebiasaan dan volume transaksi pada periode evaluasi.",
          "Jenis akreditasi dan ketentuan model yang dipilih.",
          "Ketentuan khusus pasar Indonesia pada checklist resmi yang berlaku saat pengajuan.",
        ],
        paragraphs: [
          "IATA tidak mempublikasikan satu angka universal — nilai security muncul dari proses evaluasi terhadap kondisi perusahaan Anda. Pihak yang mengklaim angka pasti sebelum evaluasi memberi janji yang tidak berdasar.",
        ],
      },
      {
        heading: "Ketentuan GoGlobal",
        paragraphs: [
          "Pada kerangka multi-country, financial criteria dan review berlaku untuk seluruh lokasi, dengan mekanisme financial security dan pengelolaan Remittance Holding Capacity pada tingkat grup sesuai ketentuan yang berlaku. Artinya keputusan finansial grup (bukan hanya satu entitas) memengaruhi kerangka security — pemetaan struktur grup sejak awal mutlak diperlukan.",
        ],
        cta: { text: "Kerangka proyeknya: ", href: IATA_URLS.goglobal, label: "Konsultasi IATA GoGlobal" },
      },
      {
        heading: "Financial Security Provider",
        paragraphs: [
          "Instrumen security dikeluarkan oleh penyedia yang memenuhi ketentuan IATA (bank atau lembaga keamanan yang relevan sesuai ketentuan program). Pemilihan penyedia, biaya penerbitannya, dan masa berlaku instrumen adalah urusan antara perusahaan Anda dan penyedia — di luar harga jasa konsultasi kami, dan dianggarkan terpisah.",
        ],
      },
      {
        heading: "Risiko Salah Memahami 'Tanpa Cash Facility'",
        bullets: [
          "Menganggap GoLite meniadakan semua kewajiban finansial → kejutan saat financial security diminta.",
          "Tidak menyiapkan dokumen keuangan karena 'GoLite simpel' → klarifikasi berulang saat evaluasi.",
          "Mengabaikan ambang transaksi ADM/cash → kewajiban muncul setelah beroperasi, bukan sebelum.",
        ],
        paragraphs: [
          "Persiapan yang benar: baca ketentuan model Anda dari sumber resmi, siapkan dokumen keuangan yang bisa dipertanggungjawabkan, dan perlakukan financial security sebagai komponen rencana, bukan surprise.",
        ],
      },
      {
        heading: "Peran Konsultan dalam Persiapan",
        paragraphs: [
          "Konsultan membantu: memetakan kewajiban finansial yang relevan untuk model Anda, memeriksa kesiapan laporan keuangan terhadap ketentuan, menyiapkan dokumen pendukung, dan mengoordinasikan klarifikasi administratif. Konsultan tidak menentukan nilai security, tidak memilih penyedia untuk Anda, dan tidak dapat menjamin penghapusannya — batas ini kami tulis eksplisit di setiap quotation.",
        ],
        cta: { text: "Periksa kesiapan Anda: ", href: IATA_URLS.cekKelayakan, label: "Cek kelayakan awal — gratis" },
      },
    ],
    faq: [
      {
        q: "Apakah GoLite bebas financial security?",
        a: "Tidak selalu. Kondisi tertentu — misalnya transaksi ADM dan/atau transaksi cash tertentu yang melewati ambang pada periode evaluasi — dapat menimbulkan kewajiban financial security sesuai penjelasan IATA.",
      },
      {
        q: "Berapa nilai financial security untuk perusahaan saya?",
        a: "Nilainya ditetapkan melalui kriteria dan evaluasi IATA — bukan angka publik yang bisa dikutip konsultan. Perusahaan baru menghadapi ini sebagai bagian dari proses, dengan dokumen keuangan sebagai dasar evaluasinya.",
      },
      {
        q: "Apakah konsultan bisa menghapus financial security?",
        a: "Tidak. Konsultan membantu persiapan dokumen dan evaluasi kesiapan; penetapan dan penghapusan security adalah kewenangan IATA berdasarkan ketentuan yang berlaku.",
      },
    ],
    terkait: [
      { href: IATA_URLS.golite, label: "IATA GoLite" },
      { href: IATA_URLS.gostandard, label: "IATA GoStandard" },
      { href: IATA_URLS.panduan.biaya, label: "Biaya akreditasi IATA" },
    ],
  },

  // ----------------------------------------------------------
  // ARTIKEL 7 — /panduan/iata-untuk-travel-agent-baru
  // ----------------------------------------------------------
  {
    slug: "iata-untuk-travel-agent-baru",
    h1: "Apakah Travel Agent Baru Bisa Mengajukan IATA Accreditation?",
    seoTitle: "Travel Agent Baru Bisa Mengajukan IATA? | PusatPerizinan.com",
    metaDescription:
      "Jawaban untuk travel agent baru: kelayakan mengajukan akreditasi IATA, kesiapan legalitas, izin usaha, SDM, dokumen keuangan, perbedaan GoLite vs GoStandard, dan tahapan pemeriksaan.",
    excerpt:
      "Pendiri travel baru sering bertanya: bisa langsung ajukan IATA atau harus menunggu? Jawabannya: bisa berkonsultasi dan diperiksa — dengan catatan kesiapan legal, izin, dan keuangan yang spesifik untuk perusahaan muda.",
    updatedAt: "2026-11-19",
    readMinutes: 6,
    sections: [
      {
        paragraphs: [
          "Jawabannya: travel agent baru dapat berkonsultasi dan diperiksa kelayakannya untuk akreditasi IATA — keputusan akhir tetap mengikuti kriteria IATA dan perizinan lokal. Pertanyaan yang lebih tepat bukan 'boleh tidak', melainkan 'siap tidak': perusahaan muda menghadapi tuntutan dokumen keuangan dan izin yang spesifik, dan kesiapan itulah yang kami bantu petakan.",
        ],
      },
      {
        heading: "Profil Perusahaan Baru: Apa yang Dilihat",
        bullets: [
          "Badan usaha yang sah — akta pendirian, pengesahan AHU, NIB, NPWP badan.",
          "Izin usaha perjalanan yang sesuai aktivitas nyata dan berlaku cukup lama (IATA menyebut minimal enam bulan dari tanggal permohonan pada detail persyaratan yang relevan).",
          "Struktur pengelolaan yang jelas, termasuk siapa yang berwenang menandatangani dokumen.",
          "Bukti operasional yang konsisten dengan aktivitas yang dinyatakan.",
        ],
        cta: { text: "Belum berbadan hukum? ", href: "/layanan", label: "Lihat layanan pendirian & legalitas perusahaan kami" },
      },
      {
        heading: "Kesiapan Legalitas dan Izin Usaha",
        paragraphs: [
          "Kesalahan paling umum perusahaan baru: mengajukan dengan izin yang tidak mencerminkan aktivitas nyata, atau izin yang usia berlakunya terlalu pendek terhadap tanggal permohonan. Keduanya memicu klarifikasi dan menunda proses. Sebelum mengajukan, pastikan ruang lingkup izin mencakup bisnis yang Anda jalankan hari ini — bukan rencana enam bulan lagi.",
        ],
      },
      {
        heading: "Kesiapan SDM",
        paragraphs: [
          "Program akreditasi menuntut perusahaan mampu mengoperasikan kewajiban administratifnya: pencatatan transaksi, pelaporan periode, dan koordinasi dengan sistem penyelesaian transaksi. Perusahaan baru perlu memastikan ada personel yang jelas tugas dan wewenangnya — termasuk Legal Authorized Signatory yang sah menurut dokumen perusahaan.",
        ],
      },
      {
        heading: "Dokumen Keuangan Perusahaan Baru",
        paragraphs: [
          "Perusahaan yang beroperasi kurang dari 12 bulan memiliki ketentuan khusus pada beberapa ketentuan finansial IATA — misalnya opening balance sheet yang disiapkan statutory auditor untuk GoStandard, sesuai panduan yang dipublikasikan. Untuk GoLite, ketentuan dokumen finansialnya berbeda dan mengikuti checklist yang berlaku. Poin pentingnya: usia perusahaan bukan penghalang administratif — ia mengubah bentuk dokumen yang perlu disiapkan.",
        ],
        cta: { text: "Bedah istilahnya: ", href: IATA_URLS.panduan.financialSecurity, label: "Financial Security IATA" },
      },
      {
        heading: "GoLite atau GoStandard untuk Perusahaan Baru?",
        paragraphs: [
          "Perusahaan baru dengan pola pembayaran kartu kredit dan/atau IATA EasyPay — tanpa kebutuhan cash facility — umumnya mengevaluasi GoLite karena kebutuhan finansialnya berbeda dari GoStandard. Perusahaan baru yang sejak awal membutuhkan cash facility harus langsung serius dengan kesiapan keuangan GoStandard. Pilihan final tetap memerlukan pemeriksaan atas kondisi nyata perusahaan Anda.",
        ],
        cta: { text: "Bandingkan dulu: ", href: IATA_URLS.panduan.perbedaan, label: "Perbedaan GoLite vs GoStandard" },
      },
      {
        heading: "Tahapan Pemeriksaan untuk Perusahaan Baru",
        checklist: [
          "Dokumen legal lengkap dan konsisten (akta, AHU, NIB, NPWP).",
          "Izin usaha perjalanan sesuai aktivitas nyata, masa berlaku memadai.",
          "Struktur pengelolaan dan penandatangan jelas.",
          "Dokumen keuangan dalam bentuk yang sesuai usia perusahaan (audited atau opening balance sheet sesuai ketentuan).",
          "Rekening atas nama badan usaha.",
          "Pemahaman kebutuhan pembayaran: cash facility atau kartu kredit/EasyPay.",
        ],
      },
      {
        heading: "Faktor yang Harus Dikonsultasikan",
        bullets: [
          "Kesesuaian model akreditasi dengan rencana bisnis 12–24 bulan ke depan.",
          "Kesiapan dokumen keuangan dan estimasi biaya pihak ketiga (audit, notaris, terjemahan).",
          "Risiko klarifikasi dan cara mempersingkat responsnya.",
          "Ekspektasi waktu yang realistis — tanpa janji tanggal persetujuan.",
        ],
        cta: { text: "Gratis & tanpa komitmen: ", href: IATA_URLS.cekKelayakan, label: "Cek kelayakan perusahaan baru Anda" },
      },
    ],
    faq: [
      {
        q: "Apakah perusahaan baru ditolak IATA?",
        a: "Tidak otomatis. Perusahaan baru dapat diajukan dengan ketentuan dokumen khusus (misalnya opening balance sheet untuk GoStandard sesuai panduan yang dipublikasikan). Keputusan akhir mengikuti evaluasi IATA atas kesiapan perusahaan.",
      },
      {
        q: "Berapa umur minimum perusahaan untuk mengajukan IATA?",
        a: "Kami tidak menemukan aturan umur minimum universal yang dapat dikutip tanpa sumber — yang jelas ketentuan dokumen keuangan berbeda untuk perusahaan yang beroperasi kurang dari 12 bulan. Verifikasi checklist resmi terbaru untuk kondisi Anda.",
      },
      {
        q: "Haruskah beroperasi dulu sebelum mengajukan?",
        a: "Persyaratan izin usaha perjalanan dan aktivitas nyata perusahaan menuntut operasional yang nyata. Konsultasikan rencana bisnis Anda agar urutan pendirian → izin → persiapan dokumen berjalan efisien.",
      },
    ],
    terkait: [
      { href: IATA_URLS.golite, label: "IATA GoLite — sering relevan untuk perusahaan baru" },
      { href: IATA_URLS.panduan.persyaratan, label: "Persyaratan IATA Indonesia" },
      { href: IATA_URLS.cekKelayakan, label: "Cek kelayakan awal" },
    ],
  },

  // ----------------------------------------------------------
  // ARTIKEL 8 — /panduan/iata-untuk-travel-agent-umrah
  // ----------------------------------------------------------
  {
    slug: "iata-untuk-travel-agent-umrah",
    h1: "IATA untuk Travel Agent Umrah: Hal yang Perlu Dipahami Sebelum Mengajukan",
    seoTitle: "IATA untuk Travel Agent Umrah: Persiapan & Perizinan | PusatPerizinan.com",
    metaDescription:
      "Panduan akreditasi IATA untuk travel agent umrah: perbedaan usaha perjalanan umum dan ibadah, perizinan sesuai kegiatan nyata, kesiapan penjualan tiket, model akreditasi, dan dokumen perusahaan.",
    excerpt:
      "Travel umrah punya lapisan perizinan tambahan — dan akreditasi IATA tidak menggantikannya. Panduan ini memetakan keduanya agar perizinan Anda sesuai kegiatan nyata sebelum mengajukan IATA.",
    updatedAt: "2026-11-19",
    readMinutes: 6,
    sections: [
      {
        paragraphs: [
          "Travel agent umrah dapat mengikuti proses akreditasi IATA seperti perusahaan perjalanan lain — dengan satu catatan besar: perizinan kegiatan perjalanan ibadah adalah lapisan regulasi terpisah dari akreditasi IATA, dan keduanya harus berdiri sendiri. Menyamakan keduanya adalah kesalahan persiapan yang paling mahal di segmen ini.",
        ],
      },
      {
        heading: "Perbedaan Kegiatan Usaha Travel Umum dan Perjalanan Ibadah",
        paragraphs: [
          "Travel umum menjual tiket, paket wisata, dan layanan perjalanan komersial. Perjalanan ibadah (umrah/haji) di Indonesia diatur dengan kerangka perizinan khusus yang relevan untuk kegiatan tersebut — di luar kerangka akreditasi IATA. Perusahaan yang menjalankan keduanya harus memastikan izin masing-masing kegiatan terpenuhi dan tidak saling menggantikan.",
        ],
      },
      {
        heading: "Perizinan Sesuai Kegiatan Nyata Perusahaan",
        bullets: [
          "Petakan aktivitas nyata: penjualan tiket, paket wisata, perjalanan ibadah, atau kombinasi.",
          "Pastikan izin usaha perjalanan umum mencakup aktivitas komersialnya untuk keperluan checklist IATA.",
          "Penuhi izin khusus kegiatan ibadah sesuai peraturan Indonesia yang berlaku untuk perjalanan ibadah — ini diperiksa pihak yang berwenang di bidangnya, bukan digantikan oleh akreditasi IATA.",
          "Jangan mengklaim izin PPIU/PIHK otomatis menggantikan seluruh persyaratan IATA — keduanya berlaku pada ranah berbeda.",
        ],
        cta: { text: "Rapikan dulu fondasinya: ", href: IATA_URLS.konsultasi, label: "Konsultasi perizinan perusahaan travel ibadah" },
      },
      {
        heading: "Kesiapan Penjualan Tiket",
        paragraphs: [
          "Akreditasi IATA relevan untuk kebutuhan distribusi tiket dan partisipasi dalam kerangka Agency Programme/BSP sesuai ketentuan pasar. Travel umrah yang beroperasi sebagai agen tiket perlu menilai: volume transaksi, metode pembayaran (kartu kredit/EasyPay atau kebutuhan cash facility), dan kesiapan administrasi transaksi. Bila selama ini penjualan berjalan melalui pola distribusi lain, evaluasi manfaat akreditasi terhadap pola bisnis nyata Anda.",
        ],
      },
      {
        heading: "Kebutuhan Model Akreditasi",
        paragraphs: [
          "Pilihan model mengikuti logika yang sama dengan travel umum: GoLite bila tidak membutuhkan cash facility standar dan membayar dengan kartu kredit/EasyPay; GoStandard bila membutuhkan cash facility dengan kesiapan keuangan audited sesuai ketentuan; GoGlobal hanya relevan bila grup Anda benar-benar beroperasi lintas negara. Aktivitas ibadah tidak mengubah logika pemilihan model — yang berubah adalah lapisan perizinan yang harus disiapkan bersamanya.",
        ],
        cta: { text: "Bandingkan modelnya: ", href: IATA_URLS.panduan.perbedaan, label: "Perbedaan GoLite, GoStandard, GoGlobal" },
      },
      {
        heading: "Dokumen Perusahaan yang Diperiksa",
        checklist: [
          "Dokumen legal badan usaha lengkap dan konsisten.",
          "Izin usaha perjalanan umum yang relevan — berlaku minimal enam bulan dari tanggal permohonan pada detail persyaratan yang relevan.",
          "Dokumen perizinan kegiatan ibadah sesuai kegiatan nyata (untuk kepatuhan perizinan Indonesia, bukan pengganti checklist IATA).",
          "Dokumen keuangan sesuai model akreditasi yang dipilih.",
          "Rekening atas nama badan usaha dan formulir konfirmasi bila dipersyaratkan.",
        ],
      },
      {
        heading: "FAQ",
        paragraphs: [
          "Tiga pertanyaan yang paling sering masuk dari travel umrah kami jawab di bawah — dan satu prinsip: akreditasi IATA dan perizinan ibadah berjalan berdampingan, tidak saling menggantikan.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah izin PPIU/PIHK menggantikan persyaratan IATA?",
        a: "Tidak. Perizinan kegiatan perjalanan ibadah berlaku pada ranah regulasi Indonesia untuk kegiatan ibadah; akreditasi IATA berlaku pada kerangka program distribusi maskapai. Keduanya harus dipenuhi masing-masing sesuai ketentuannya dan tidak saling menggantikan.",
      },
      {
        q: "Apakah travel umrah wajib terakreditasi IATA?",
        a: "Tidak ada kewajiban universal — akreditasi relevan bila bisnis Anda membutuhkan partisipasi dalam kerangka Agency Programme/BSP atau distribusi tiket sesuai ketentuan. Evaluasi kebutuhan distribusi Anda terlebih dahulu.",
      },
      {
        q: "Model mana untuk travel umrah yang baru berdiri?",
        a: "Mulai dari kebutuhan pembayaran: tanpa cash facility → evaluasi GoLite; butuh cash facility → GoStandard dengan kesiapan keuangan yang sesuai. Perizinan ibadah tetap disiapkan terpisah sesuai kegiatan nyata perusahaan.",
      },
    ],
    terkait: [
      { href: IATA_URLS.golite, label: "IATA GoLite" },
      { href: IATA_URLS.gostandard, label: "IATA GoStandard" },
      { href: IATA_URLS.cekKelayakan, label: "Cek kelayakan perusahaan Anda" },
    ],
  },
];
