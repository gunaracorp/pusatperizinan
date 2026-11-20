// ============================================================
// ARTIKEL IATA 1–4 (BAGIAN 8 master brief)
// Angka harga mengikuti sumber tunggal; tanpa angka financial
// security tanpa sumber; tanpa janji waktu/jaminan persetujuan.
// ============================================================

import type { IataArticle } from "./iata-articles";
import { IATA_URLS } from "@/lib/iata";

export const IATA_ARTICLES_1: IataArticle[] = [
  // ----------------------------------------------------------
  // ARTIKEL 1 — /panduan/iata-accreditation-indonesia
  // ----------------------------------------------------------
  {
    slug: "iata-accreditation-indonesia",
    h1: "Panduan Lengkap IATA Accreditation Indonesia untuk Travel Agent",
    seoTitle: "Panduan Lengkap IATA Accreditation Indonesia | PusatPerizinan.com",
    metaDescription:
      "Panduan akreditasi IATA untuk travel agent Indonesia: pengertian, manfaat, hubungan dengan BSP, perbedaan GoLite/GoStandard/GoGlobal, persyaratan awal, tahapan, dan biaya jasa konsultasi.",
    excerpt:
      "Apa itu akreditasi IATA, apa hubungannya dengan BSP, dan bagaimana travel agent Indonesia mempersiapkannya — panduan lengkap dari pengertian hingga tahapan permohonan.",
    updatedAt: "2026-11-19",
    readMinutes: 9,
    sections: [
      {
        paragraphs: [
          "IATA Accreditation Indonesia adalah proses di mana perusahaan perjalanan (travel agent) di Indonesia mempersiapkan diri untuk mengikuti program akreditasi travel agent dari International Air Transport Association (IATA). Akreditasi ini menjadi kerangka bagi agen untuk berpartisipasi dalam Agency Programme dan sistem Billing and Settlement Plan (BSP) sesuai ketentuan pasar yang bersangkutan. Jawaban singkatnya: akreditasi bukan sekadar sertifikat — ia adalah status partisipasi yang menuntut kesiapan legal, operasional, dan finansial perusahaan.",
        ],
      },
      {
        heading: "Apa Itu IATA?",
        paragraphs: [
          "International Air Transport Association (IATA) adalah asosiasi perdagangan global yang mewakili maskapai penerbangan. Di dalam ekosistem distribusi tiket, IATA mengelola program-program yang mengatur hubungan antara maskapai dan agen penjualan, termasuk kerangka persyaratan, prosedur evaluasi, dan sistem penyelesaian transaksi.",
          "Penting dipahami sejak awal: IATA menentukan persyaratan, mengevaluasi permohonan, menetapkan financial security bila relevan, dan mengambil keputusan akreditasi. Konsultan independen seperti PusatPerizinan.com membantu perusahaan mempersiapkan diri — dan tidak dapat menjamin persetujuan.",
        ],
      },
      {
        heading: "Apa Itu IATA Travel Agent Accreditation?",
        paragraphs: [
          "Travel agent accreditation adalah program yang memungkinkan travel agent diakui sebagai agen yang mengikuti kerangka aturan IATA untuk penjualan tiket dan layanan terkait. Setelah terakreditasi, agen dapat berpartisipasi dalam Agency Programme pada pasar yang bersangkutan dan menggunakan sistem penyelesaian transaksi yang berlaku, termasuk BSP, sesuai ketentuan program.",
          "Kerangka aturannya tertuang dalam regulasi internal IATA yang dipublikasikan melalui situs resmi dan Passenger Agency Conference Resolutions Manual. Ketentuan tersebut dapat berubah — halaman persyaratan resmi IATA memakai filter berdasarkan jenis akreditasi, jenis lokasi, jenis permohonan, bahasa, dan kategori mandatory/optional.",
        ],
        cta: { text: "Perdalam: ", href: IATA_URLS.panduan.persyaratan, label: "Persyaratan IATA Indonesia — dokumen dan kesiapan" },
      },
      {
        heading: "Manfaat Akreditasi bagi Travel Agent",
        bullets: [
          "Kerangka kerja resmi untuk berpartisipasi dalam distribusi tiket maskapai sesuai ketentuan IATA.",
          "Akses ke sistem penyelesaian transaksi (BSP) sesuai program pasar yang bersangkutan.",
          "Kredibilitas di hadapan maskapai, partner, dan pelanggan B2B.",
          "Struktur keuangan dan operasional yang lebih tertib karena mengikuti kriteria yang ditetapkan.",
          "Fondasi untuk berkembang ke jaringan distribusi yang lebih luas, termasuk skenario multi-lokasi.",
        ],
        paragraphs: [
          "Manfaat di atas tidak datang otomatis. Semua mengikuti syarat: perusahaan harus lolos evaluasi dokumen legal, izin usaha, dan kriteria finansial sesuai model akreditasi yang dipilih.",
        ],
      },
      {
        heading: "Hubungan Akreditasi dengan BSP",
        paragraphs: [
          "Billing and Settlement Plan (BSP) adalah sistem penyelesaian transaksi antara agen dan maskapai yang dikelola IATA pada banyak negara. Bagi travel agent, BSP menyederhanakan proses penjualan dan pelaporan penjualan tiket maskapai.",
          "Partisipasi dalam BSP pada suatu pasar menuntut agen memenuhi persyaratan akreditasi dan ketentuan keuangan yang berlaku di pasar tersebut. Inilah alasan dokumen keuangan dan financial security muncul sebagai tema sentral dalam persiapan akreditasi.",
        ],
      },
      {
        heading: "Perbedaan GoLite, GoStandard, dan GoGlobal",
        table: {
          caption: "Ringkasan tiga model akreditasi IATA (detail lengkap di halaman produk).",
          headers: ["Aspek", "GoLite", "GoStandard", "GoGlobal"],
          rows: [
            ["Model", "Standard Accreditation without Cash Facility", "Standard Accreditation with Cash Facility", "Multi-Country Accreditation"],
            ["Cash facility", "Tidak ada cash facility standar", "Ada cash facility", "Kerangka tingkat grup"],
            ["Cakupan", "Satu pasar/lokasi standar", "Satu pasar/lokasi standar", "Beberapa negara & lokasi"],
            ["Profil cocok", "Agen dengan pembayaran kartu kredit/EasyPay", "Agen yang membutuhkan cash facility", "Grup usaha lintas negara"],
          ],
        },
        paragraphs: [
          "GoGlobal bukan sekadar GoStandard versi premium — model ini memiliki kerangka financial criteria, review lokasi, dan mekanisme financial security tingkat grup tersendiri sesuai ketentuan yang berlaku.",
        ],
        cta: { text: "Bandingkan lebih dalam: ", href: IATA_URLS.panduan.perbedaan, label: "Perbedaan GoLite, GoStandard, dan GoGlobal" },
      },
      {
        heading: "Persyaratan Awal di Indonesia",
        bullets: [
          "Perusahaan berbadan hukum dengan akta dan pengesahan AHU yang sah.",
          "NIB dan NPWP badan usaha aktif.",
          "Izin usaha perjalanan yang relevan dengan aktivitas nyata — IATA mencantumkan bahwa izin perjalanan yang dipersyaratkan harus masih berlaku setidaknya enam bulan dari tanggal permohonan pada detail persyaratan yang relevan.",
          "Dokumen keuangan sesuai model: GoLite memiliki ketentuan tersendiri; GoStandard umumnya menuntut laporan keuangan audited untuk pemohon baru; GoGlobal menuntut pemetaan finansial grup.",
          "Informasi rekening penerima perusahaan dan formulir konfirmasi domestik/internasional bila dipersyaratkan pada checklist.",
        ],
        paragraphs: [
          "Daftar di atas adalah kerangka pemeriksaan awal — bukan pengganti checklist resmi IATA. Checklist final difilter berdasarkan jenis akreditasi, tipe lokasi, dan jenis permohonan Anda, dan bisa berubah mengikuti ketentuan terbaru IATA.",
        ],
      },
      {
        heading: "Tahapan Permohonan",
        bullets: [
          "Pemeriksaan profil perusahaan dan penentuan model akreditasi.",
          "Pemeriksaan checklist resmi sesuai filter pemohon.",
          "Penyiapan dokumen legal, izin usaha, dan keuangan.",
          "Pengajuan melalui saluran resmi IATA (IATA Customer Portal) oleh pihak berwenang perusahaan.",
          "Evaluasi oleh IATA — termasuk kemungkinan permintaan dokumen tambahan.",
          "Pemenuhan biaya resmi dan financial security jika dipersyaratkan.",
          "Keputusan akhir IATA.",
        ],
        cta: { text: "Baca detail alurnya: ", href: IATA_URLS.panduan.proses, label: "Proses Pengajuan IATA dari persiapan hingga keputusan" },
      },
      {
        heading: "Biaya: Jasa Konsultasi vs Biaya Resmi",
        paragraphs: [
          "Ada dua kelompok biaya yang berbeda dan harus tidak pernah dicampur. Pertama, biaya resmi IATA: application fee, annual fee, financial security, audit, dan pihak ketiga lainnya — ditetapkan oleh IATA atau penyedia resminya. Kedua, jasa konsultasi dan pendampingan PusatPerizinan.com.",
          "Sebagai referensi jasa konsultasi kami: GoLite promo Rp14.625.000 (katalog Rp29.250.000), GoStandard promo Rp28.125.000 (katalog Rp56.250.000), GoGlobal mulai Rp56.250.000 (katalog Rp112.500.000) — semua adalah harga jasa konsultasi, bukan biaya resmi IATA, dan biaya resmi tidak termasuk kecuali dinyatakan tertulis dalam quotation.",
        ],
        cta: { text: "Rincian lengkap: ", href: IATA_URLS.panduan.biaya, label: "Biaya Akreditasi IATA — resmi vs jasa konsultasi" },
      },
      {
        heading: "Risiko Ketidaksiapan Dokumen",
        bullets: [
          "Kekurangan dokumen → permohonan tidak dapat diproses lengkap.",
          "Izin usaha yang tidak sesuai aktivitas nyata → permintaan klarifikasi atau penolakan.",
          "Laporan keuangan yang tidak memenuhi format → permintaan revisi yang memakan waktu.",
          "Salah memilih model → persiapan finansial yang tidak tepat sasaran.",
          "Ekspektasi waktu yang tidak realistis → keputusan bisnis yang keliru.",
        ],
        paragraphs: [
          "Semua risiko ini dapat ditekan dengan pemeriksaan kelayakan awal: perusahaan masuk ke proses dalam kondisi siap, bukan mencoba-coba.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah travel agent Indonesia wajib terakreditasi IATA untuk menjual tiket?",
        a: "Tidak wajib untuk semua bentuk penjualan. Namun untuk berpartisipasi dalam Agency Programme dan sistem BSP di pasar yang bersangkutan, akreditasi IATA sesuai model yang berlaku menjadi kerangka yang diikuti. Pola distribusi tanpa akreditasi memiliki keterbatasan tersendiri dan mengikuti ketentuan maskapai atau pihak ketiga.",
      },
      {
        q: "Berapa lama proses akreditasi IATA?",
        a: "Waktu proses bergantung pada kelengkapan dokumen, antrean evaluasi, dan keputusan IATA. Tidak ada konsultan yang dapat menjamin tanggal persetujuan — dan kami tidak membuat janji waktu.",
      },
      {
        q: "Apakah PusatPerizinan.com bagian dari IATA?",
        a: "Tidak. Kami konsultan independen untuk pendampingan persiapan. Keputusan akreditasi sepenuhnya pada IATA.",
      },
      {
        q: "Model mana yang harus saya pilih?",
        a: "Mulai dari dua pertanyaan: apakah perusahaan Anda membutuhkan cash facility, dan apakah operasi Anda lintas negara. Jawabannya mengarahkan ke GoLite, GoStandard, atau GoGlobal — dan pemeriksaan kelayakan awal kami membantu memastikannya dengan data perusahaan Anda.",
      },
    ],
    terkait: [
      { href: IATA_URLS.golite, label: "Halaman produk IATA GoLite" },
      { href: IATA_URLS.gostandard, label: "Halaman produk IATA GoStandard" },
      { href: IATA_URLS.goglobal, label: "Halaman produk IATA GoGlobal" },
      { href: IATA_URLS.cekKelayakan, label: "Cek kelayakan perusahaan Anda" },
    ],
  },

  // ----------------------------------------------------------
  // ARTIKEL 2 — /panduan/persyaratan-iata-indonesia
  // ----------------------------------------------------------
  {
    slug: "persyaratan-iata-indonesia",
    h1: "Persyaratan IATA Indonesia: Dokumen dan Kesiapan Travel Agent",
    seoTitle: "Persyaratan IATA Indonesia: Dokumen & Kesiapan | PusatPerizinan.com",
    metaDescription:
      "Dokumen dan persyaratan IATA untuk pemohon Indonesia: akta & AHU, NIB, izin usaha perjalanan, rekening, dokumen finansial per model (GoLite/GoStandard/GoGlobal), mandatory vs optional, dan checklist pemeriksaan awal.",
    excerpt:
      "Dokumen apa saja yang dilihat IATA untuk pemohon Indonesia — legal perusahaan, izin usaha perjalanan, rekening, dan dokumen finansial per model — plus cara membaca checklist resmi yang dinamis.",
    updatedAt: "2026-11-19",
    readMinutes: 8,
    sections: [
      {
        paragraphs: [
          "Persyaratan IATA untuk pemohon Indonesia tidak boleh dibaca sebagai satu daftar tunggal yang berlaku untuk semua orang. Halaman persyaratan resmi IATA memakai filter berdasarkan jenis akreditasi, jenis lokasi, jenis permohonan, bahasa, dan kategori mandatory/optional. Artinya, checklist Anda bisa berbeda dari pemohon lain — dan bisa berubah waktu ke waktu. Panduan ini memetakan kelompok dokumen yang diperiksa dan cara menyiapkannya dengan benar.",
        ],
      },
      {
        heading: "Persyaratan Legal Perusahaan",
        bullets: [
          "Akta pendirian perusahaan.",
          "Akta perubahan terakhir apabila ada.",
          "Pengesahan atau penerimaan pemberitahuan AHU (Kemenkumham).",
          "NIB (Nomor Induk Berusaha) yang aktif.",
          "NPWP badan usaha.",
        ],
        paragraphs: [
          "Konsistensi data antar dokumen sangat diperhatikan: nama persis, alamat kantor, dan bentuk badan usaha harus sama di seluruh dokumen. Ketidaksesuaian kecil seperti perbedaan penulisan alamat sering memicu permintaan klarifikasi.",
        ],
        cta: { text: "Butuh merapikan legalitas dulu? ", href: IATA_URLS.konsultasi, label: "Konsultasi legalitas & perizinan perusahaan" },
      },
      {
        heading: "Izin Usaha Perjalanan yang Relevan",
        paragraphs: [
          "IATA mencantumkan persyaratan izin usaha perjalanan pada checklist Indonesia yang harus diverifikasi sesuai filter pemohon. Catatan penting yang dipublikasikan IATA: izin perjalanan yang dipersyaratkan harus masih berlaku setidaknya enam bulan dari tanggal permohonan pada detail persyaratan yang relevan.",
          "Prinsip yang kami pegang: izin harus sesuai kegiatan nyata perusahaan. Perusahaan yang menjual paket wisata, tiket, dan perjalanan ibadah perlu memastikan ruang lingkup izinnya mencakup aktivitas tersebut — jangan mengajukan dengan izin yang tidak mencerminkan operasional aktual.",
        ],
      },
      {
        heading: "Data Rekening Perusahaan",
        paragraphs: [
          "Halaman persyaratan Indonesia dari IATA mencantumkan antara lain informasi rekening penerima. Pastikan rekening atas nama badan usaha (bukan pribadi), data bank lengkap, dan cocok dengan nama persis pada akta. Karena informasi rekening menyangkut alur dana pada sistem penyelesaian transaksi, kesalahan di sini berdampak langsung ke proses.",
        ],
      },
      {
        heading: "Dokumen Finansial",
        paragraphs: [
          "Kebutuhan dokumen finansial berbeda per model. Untuk GoStandard, panduan persyaratan yang dipublikasikan IATA menyebut pemohon baru pada umumnya diminta menyampaikan audited accounts tahun keuangan terakhir; perusahaan yang beroperasi kurang dari 12 bulan dapat memiliki ketentuan opening balance sheet yang disiapkan statutory auditor. Untuk GoLite, IATA memiliki ketentuan dokumen finansial tersendiri pada checklist yang berlaku.",
          "Verifikasi selalu checklist resmi terbaru — angka dan format tidak kami karang tanpa sumber.",
        ],
        cta: { text: "Pahami konteksnya: ", href: IATA_URLS.panduan.financialSecurity, label: "Financial Security IATA — pengertian dan fungsi" },
      },
      {
        heading: "Persyaratan GoLite",
        bullets: [
          "Dokumen legal standar perusahaan (akta, AHU, NIB, NPWP).",
          "Izin usaha perjalanan yang relevan dan berlaku minimal enam bulan dari tanggal permohonan pada detail persyaratan yang relevan.",
          "Dokumen finansial sesuai ketentuan GoLite pada checklist Indonesia.",
          "Informasi rekening penerima dan formulir konfirmasi bila dipersyaratkan.",
        ],
        cta: { text: "Detail layanan: ", href: IATA_URLS.golite, label: "Konsultasi IATA GoLite" },
      },
      {
        heading: "Persyaratan GoStandard",
        bullets: [
          "Dokumen legal standar perusahaan.",
          "Laporan keuangan audited tahun keuangan terakhir untuk pemohon baru, sesuai ketentuan yang dipublikasikan.",
          "Opening balance sheet dari statutory auditor untuk perusahaan yang beroperasi kurang dari 12 bulan, apabila berlaku.",
          "Dokumen audit dan pendukung finansial lain sesuai checklist.",
        ],
        cta: { text: "Detail layanan: ", href: IATA_URLS.gostandard, label: "Konsultasi IATA GoStandard" },
      },
      {
        heading: "Persyaratan GoGlobal",
        bullets: [
          "Profil perusahaan induk dan daftar entitas.",
          "Pemetaan negara, lokasi, struktur kepemilikan, dan manajemen.",
          "Laporan keuangan grup dan dokumen per negara operasi.",
          "Matriks persyaratan lokal setiap negara yang terlibat.",
        ],
        paragraphs: [
          "GoGlobal dievaluasi sebagai satu proyek multi-country: kerangka financial criteria dan review berlaku untuk seluruh lokasi, dengan mekanisme financial security dan Remittance Holding Capacity tingkat grup sesuai ketentuan.",
        ],
        cta: { text: "Detail layanan: ", href: IATA_URLS.goglobal, label: "Konsultasi IATA GoGlobal" },
      },
      {
        heading: "Mandatory vs Optional",
        paragraphs: [
          "Checklist resmi membedakan dokumen mandatory dan optional. Mandatory adalah dokumen yang tidak boleh kurang untuk jenis permohonan Anda; optional menyertai kondisi tertentu. Kesalahan umum pemohon: menganggap dokumen optional wajib (memperlambat persiapan) atau melewatkan dokumen yang sebenarnya wajib untuk jenis lokasi mereka. Filter checklist dengan benar sejak awal.",
        ],
      },
      {
        heading: "Head Entity dan Associate Entity",
        paragraphs: [
          "Pada struktur dengan beberapa lokasi, istilah Head Entity (entitas utama) dan Associate Entity (entitas terkait) relevan apabila struktur akreditasi Anda memakainya. Tanggung jawab, dokumen, dan kaitan finansial antar entitas mengikuti ketentuan IATA yang berlaku untuk struktur tersebut. Bila perusahaan Anda satu entitas tunggal di satu lokasi, perbedaan ini umumnya tidak menyentuh Anda — bila grup, ini harus dimetakan sejak awal.",
        ],
      },
      {
        heading: "Checklist Resmi IATA Bisa Berubah",
        paragraphs: [
          "IATA menyatakan persyaratan tambahan dapat diminta selama proses aplikasi, dan checklist yang dinamis difilter per pemohon. Konten mana pun — termasuk milik kami — harus dibaca sebagai peta pemeriksaan awal, bukan kontrak daftar dokumen. Mekanisme pembaruannya: selalu cek halaman persyaratan resmi sebelum mengajukan.",
        ],
      },
      {
        heading: "Checklist Pemeriksaan Awal (pra-ajukan)",
        checklist: [
          "Nama, alamat, dan bentuk badan usaha konsisten di semua dokumen.",
          "Akta + perubahan + pengesahan AHU lengkap dan salinan terbaru.",
          "NIB dan NPWP badan aktif.",
          "Izin usaha perjalanan sesuai aktivitas nyata, berlaku ≥ 6 bulan dari tanggal permohonan pada detail persyaratan yang relevan.",
          "Rekening atas nama badan usaha, data bank lengkap.",
          "Dokumen finansial sesuai model (GoLite/GoStandard/GoGlobal).",
          "Formulir konfirmasi domestik/internasional bila dipersyaratkan.",
          "Personil penandatangan yang berwenang (Legal Authorized Signatory) jelas.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah daftar dokumen di halaman ini adalah checklist resmi IATA?",
        a: "Tidak. Ini adalah kerangka pemeriksaan awal kami untuk membantu persiapan. Checklist resmi dan final diambil dari halaman persyaratan IATA dengan filter jenis akreditasi, tipe lokasi, dan jenis permohonan Anda.",
      },
      {
        q: "Apakah izin usaha perjalanan wajib berumur minimal tertentu?",
        a: "IATA mencantumkan bahwa izin perjalanan yang dipersyaratkan harus masih berlaku setidaknya enam bulan dari tanggal permohonan pada detail persyaratan yang relevan. Ketentuan lain mengikuti checklist resmi terbaru.",
      },
      {
        q: "Apakah laporan keuangan harus audited untuk semua model?",
        a: "Untuk GoStandard, panduan yang dipublikasikan umumnya menuntut audited accounts bagi pemohon baru, dengan ketentuan khusus untuk perusahaan baru. Untuk GoLite, ketentuan finansialnya berbeda — ikuti checklist resmi model Anda.",
      },
    ],
    terkait: [
      { href: IATA_URLS.golite, label: "IATA GoLite" },
      { href: IATA_URLS.gostandard, label: "IATA GoStandard" },
      { href: IATA_URLS.cekKelayakan, label: "Cek kelayakan dokumen perusahaan Anda" },
    ],
  },

  // ----------------------------------------------------------
  // ARTIKEL 3 — /panduan/perbedaan-iata-golite-gostandard-goglobal
  // ----------------------------------------------------------
  {
    slug: "perbedaan-iata-golite-gostandard-goglobal",
    h1: "Perbedaan IATA GoLite, GoStandard, dan GoGlobal: Mana yang Tepat?",
    seoTitle: "Perbedaan IATA GoLite vs GoStandard vs GoGlobal | PusatPerizinan.com",
    metaDescription:
      "Tabel perbedaan IATA GoLite, GoStandard, dan GoGlobal: cash facility, kebutuhan finansial, financial security, cakupan lokasi, profil perusahaan, kompleksitas persiapan, dan kebutuhan konsultasi.",
    excerpt:
      "Tiga model akreditasi IATA dibedah dalam satu tabel komparasi — cash facility, kebutuhan finansial, cakupan lokasi, dan profil perusahaan yang cocok — agar Anda tidak salah pilih sejak awal.",
    updatedAt: "2026-11-19",
    readMinutes: 7,
    sections: [
      {
        paragraphs: [
          "Jawaban cepat: GoLite untuk agen yang tidak membutuhkan cash facility standar dan membayar dengan kartu kredit dan/atau IATA EasyPay; GoStandard untuk agen yang membutuhkan cash facility dengan kesiapan keuangan yang lebih matang; GoGlobal untuk grup usaha yang beroperasi di beberapa negara dan lokasi. Detail perbedaannya — dan jebakan umumnya — diuraikan di bawah.",
        ],
      },
      {
        heading: "Tabel Komparasi Tiga Model",
        table: {
          caption: "Komparasi GoLite vs GoStandard vs GoGlobal (ketentuan final mengikuti IATA).",
          headers: ["Aspek", "GoLite", "GoStandard", "GoGlobal"],
          rows: [
            ["Model akreditasi", "Standard Accreditation without Cash Facility", "Standard Accreditation with Cash Facility", "Multi-Country Accreditation"],
            ["Cash facility", "Tidak ada cash facility standar", "Ada — akses solusi pembayaran standar IATA", "Kerangka dan pengelolaan tingkat grup (termasuk Remittance Holding Capacity sesuai ketentuan)"],
            ["Kebutuhan finansial", "Berbeda dari GoStandard; ketentuan dokumen finansial GoLite pada checklist", "Lebih mendalam; audited accounts umumnya untuk pemohon baru; opening balance sheet untuk perusahaan < 12 bulan", "Financial criteria dan review untuk seluruh lokasi pada tingkat grup"],
            ["Financial security", "Tetap dapat diminta pada kondisi tertentu (mis. transaksi ADM/cash melewati ambang)", "Dapat disyaratkan berdasarkan kriteria dan evaluasi", "Mekanisme tingkat grup sesuai ketentuan"],
            ["Cakupan lokasi", "Satu lokasi/pasar standar", "Satu lokasi/pasar standar", "Beberapa negara dan beberapa lokasi"],
            ["Profil perusahaan yang sesuai", "Agen kartu kredit/EasyPay, belum butuh cash facility", "Agen dengan transaksi lebih kompleks dan kesiapan keuangan", "Grup usaha lintas negara dengan beberapa entitas"],
            ["Kompleksitas persiapan", "Moderat", "Tinggi (fokus finansial)", "Paling kompleks (multi yurisdiksi)"],
            ["Kebutuhan konsultasi", "Review legal, izin, dan dokumen GoLite", "Financial readiness review mendalam", "Manajemen proyek multi-country dan matriks persyaratan"],
          ],
        },
      },
      {
        heading: "GoLite — Tanpa Cash Facility Standar",
        paragraphs: [
          "GoLite dirancang untuk travel agent yang ingin mengikuti program akreditasi IATA tanpa cash facility standar, dengan penerbitan tiket menggunakan kartu kredit dan/atau IATA EasyPay sesuai ketentuan program dan pasar yang berlaku.",
          "Jebakan yang harus dihindari: menganggap GoLite = bebas segala kewajiban finansial. IATA menjelaskan bahwa transaksi ADM dan/atau transaksi cash tertentu yang melewati ambang dalam periode evaluasi dapat menimbulkan kewajiban financial security.",
        ],
        cta: { text: "Uraian lengkap: ", href: IATA_URLS.golite, label: "Halaman produk IATA GoLite" },
      },
      {
        heading: "GoStandard — Dengan Cash Facility",
        paragraphs: [
          "GoStandard relevan bila operasional Anda benar-benar membutuhkan akses cash facility. Konsekuensinya: pemeriksaan finansial lebih serius — laporan keuangan audited untuk pemohon baru sesuai ketentuan yang dipublikasikan, dan kemungkinan financial security berdasarkan evaluasi IATA.",
          "Jangan memilih GoStandard hanya karena 'terlihat lebih lengkap'. Bila pembayaran Anda berjalan baik dengan kartu kredit/EasyPay, GoLite bisa jadi pilihan yang lebih tepat sasaran.",
        ],
        cta: { text: "Uraian lengkap: ", href: IATA_URLS.gostandard, label: "Halaman produk IATA GoStandard" },
      },
      {
        heading: "GoGlobal — Bukan Sekadar GoStandard Premium",
        paragraphs: [
          "Kesalahpahaman paling mahal: menganggap GoGlobal sebagai paket GoStandard dengan harga lebih tinggi. Faktanya, GoGlobal adalah kerangka multi-country dengan kriteria tersendiri: review untuk seluruh lokasi, financial criteria tingkat grup, dan mekanisme financial security serta Remittance Holding Capacity pada tingkat grup sesuai ketentuan.",
          "Kelayakan GoGlobal sendiri harus diperiksa: jumlah negara, entitas, struktur kepemilikan, dan lokasi. Grup dengan satu entitas di satu negara umumnya lebih tepat mengikuti model standar.",
        ],
        cta: { text: "Uraian lengkap: ", href: IATA_URLS.goglobal, label: "Halaman produk IATA GoGlobal" },
      },
      {
        heading: "Cara Menentukan Pilihan Anda",
        checklist: [
          "Petakan metode pembayaran Anda hari ini: kartu kredit/EasyPay, kebutuhan cash, atau keduanya.",
          "Hitung entitas dan negara operasi — satu entitas atau grup multi-negara?",
          "Nilai kesiapan dokumen keuangan: internal, audited, atau belum ada.",
          "Cek izin usaha perjalanan: sesuai aktivitas nyata dan berlaku cukup lama.",
          "Konsultasikan hasilnya — pilihan model memengaruhi seluruh jalur persiapan.",
        ],
        cta: { text: "Langsung praktik: ", href: IATA_URLS.cekKelayakan, label: "Cek kelayakan awal — gratis" },
      },
      {
        heading: "Harga Jasa Konsultasi per Model",
        paragraphs: [
          "Sebagai acuan jasa konsultasi PusatPerizinan.com: GoLite promo Rp14.625.000 (katalog Rp29.250.000); GoStandard promo Rp28.125.000 (katalog Rp56.250.000); GoGlobal mulai Rp56.250.000 (katalog Rp112.500.000, harga akhir mengikuti kompleksitas proyek). Semuanya adalah harga jasa — bukan biaya resmi IATA.",
        ],
        cta: { text: "Rincian biaya lainnya: ", href: IATA_URLS.panduan.biaya, label: "Biaya akreditasi IATA" },
      },
    ],
    faq: [
      {
        q: "Bisakah pindah dari GoLite ke GoStandard nanti?",
        a: "Perubahan model akreditasi mengikuti prosedur IATA yang berlaku dan dievaluasi ulang. Banyak perusahaan memulai dari model yang sesuai kebutuhan saat ini lalu mengevaluasi perubahan ketika kebutuhan pembayaran berkembang.",
      },
      {
        q: "Apakah GoGlobal cocok untuk grup dengan entitas di dua negara?",
        a: "Bisa jadi relevan — tapi kelayakannya harus diperiksa: struktur grup, jumlah entitas dan lokasi, serta financial criteria. Mulai dari pemeriksaan kelayakan agar tidak salah asumsi.",
      },
      {
        q: "Model mana yang paling murah?",
        a: "Dari sisi jasa konsultasi, GoLite memiliki harga terendah. Namun 'murah' bukan dasar memilih model — pilihan harus mengikuti kebutuhan pembayaran dan struktur usaha; salah model justru membuang waktu persiapan.",
      },
    ],
    terkait: [
      { href: IATA_URLS.golite, label: "IATA GoLite" },
      { href: IATA_URLS.gostandard, label: "IATA GoStandard" },
      { href: IATA_URLS.goglobal, label: "IATA GoGlobal" },
    ],
  },

  // ----------------------------------------------------------
  // ARTIKEL 4 — /panduan/proses-pengajuan-iata
  // ----------------------------------------------------------
  {
    slug: "proses-pengajuan-iata",
    h1: "Proses Pengajuan IATA Accreditation dari Persiapan hingga Keputusan",
    seoTitle: "Proses Pengajuan IATA Accreditation: Tahapan Lengkap | PusatPerizinan.com",
    metaDescription:
      "Tahapan proses pengajuan akreditasi IATA: pemeriksaan profil, penentuan model, checklist, dokumen, aplikasi via IATA Customer Portal, tanggung jawab Legal Authorized Signatory, evaluasi, hingga keputusan akhir.",
    excerpt:
      "Alur pengajuan akreditasi IATA langkah demi langkah — dari pemeriksaan profil perusahaan sampai keputusan IATA — termasuk peran Legal Authorized Signatory dan apa yang terjadi saat ada klarifikasi.",
    updatedAt: "2026-11-19",
    readMinutes: 8,
    sections: [
      {
        paragraphs: [
          "Proses pengajuan akreditasi IATA berjalan melalui tahapan yang jelas: pemeriksaan profil perusahaan, penentuan model, pemeriksaan checklist, penyiapan dokumen, aplikasi melalui saluran resmi, evaluasi, dan keputusan akhir. Satu prinsip yang kami tegaskan sejak awal: durasi dan hasil akhir ditentukan IATA — panduan ini memetakan alurnya, bukan menjanjikan tanggal.",
        ],
      },
      {
        heading: "Tahap 1 — Pemeriksaan Profil Perusahaan",
        paragraphs: [
          "Mulai dari fakta perusahaan: bentuk badan usaha, dokumen legal (akta, AHU, NIB, NPWP), izin usaha perjalanan, struktur pengelolaan, dan aktivitas bisnis nyata. Tujuannya memastikan fondasi administratif Anda sehat sebelum biaya dan waktu habis untuk dokumen yang salah fondasi.",
        ],
        cta: { text: "Mulai dari sini: ", href: IATA_URLS.cekKelayakan, label: "Formulir cek kelayakan awal" },
      },
      {
        heading: "Tahap 2 — Penentuan Model",
        paragraphs: [
          "Model harus ditentukan sebelum dokumen disusun, karena kebutuhannya berbeda: GoLite tanpa cash facility standar, GoStandard dengan cash facility dan tuntutan keuangan lebih dalam, GoGlobal sebagai kerangka multi-country. Kesalahan model di tahap ini = dokumen yang salah sasaran di tahap berikutnya.",
        ],
      },
      {
        heading: "Tahap 3 — Pemeriksaan Checklist",
        paragraphs: [
          "Checklist resmi IATA difilter berdasarkan jenis akreditasi, jenis lokasi, jenis permohonan, dan kategori mandatory/optional. Pada tahap ini daftar wajib Anda terbentuk — termasuk formulir konfirmasi domestik/internasional bila dipersyaratkan, dan informasi rekening penerima.",
        ],
        cta: { text: "Panduan membacanya: ", href: IATA_URLS.panduan.persyaratan, label: "Persyaratan IATA Indonesia" },
      },
      {
        heading: "Tahap 4 — Penyiapan Dokumen",
        bullets: [
          "Dokumen legal dipastikan konsisten (nama, alamat, badan usaha).",
          "Izin usaha perjalanan berlaku — IATA menyebut minimal enam bulan dari tanggal permohonan pada detail persyaratan yang relevan.",
          "Dokumen keuangan disiapkan sesuai model: audited accounts untuk GoStandard pemohon baru sesuai ketentuan yang dipublikasikan; ketentuan GoLite pada checklist; grup keuangan untuk GoGlobal.",
          "Dokumen non-bahasa-Indonesia memerlukan penerjemahan tersumpah bila diminta — termasuk biaya pihak ketiga.",
        ],
      },
      {
        heading: "Tahap 5 — Aplikasi melalui IATA Customer Portal",
        paragraphs: [
          "Pengajuan dilakukan melalui saluran resmi IATA, kini umumnya melalui IATA Customer Portal, oleh pihak yang berwenang dari perusahaan. Konsultan membantu menyiapkan dan memeriksa — tetapi pengajuan resmi tetap dijalankan oleh perusahaan Anda dengan identitas dan otoritasnya sendiri.",
        ],
      },
      {
        heading: "Tanggung Jawab Legal Authorized Signatory",
        paragraphs: [
          "Legal Authorized Signatory (LAS) adalah pihak yang ditunjuk perusahaan dan berwenang menandatangani dokumen pengajuan serta perjanjian terkait. LAS menanggung kebenaran informasi yang diajukan. Karena itu, jelas siapa LAS Anda sejak awal, pastikan ia memang berwenang menurut dokumen perusahaan, dan jangan pernah menyerahkan kredensial akun kepada pihak lain — termasuk konsultan.",
        ],
      },
      {
        heading: "Tahap 6 — Evaluasi oleh IATA",
        paragraphs: [
          "IATA mengevaluasi kelengkapan dan kesesuaian permohonan terhadap kriteria yang berlaku. Selama evaluasi, permintaan dokumen tambahan atau klarifikasi dapat muncul — IATA menyatakan persyaratan tambahan dapat diminta selama proses aplikasi. Respons cepat dan tepat di fase ini sering menjadi pembeda antara proses yang lancar dan berulang-ulang.",
        ],
      },
      {
        heading: "Tahap 7 — Perjanjian dan Biaya Resmi",
        paragraphs: [
          "Bila evaluasi berjalan positif, tahap selanjutnya meliputi penandatanganan perjanjian yang disyaratkan dan pemenuhan biaya resmi IATA (application fee, annual fee). Bila financial security diminta, penetapan bentuk dan jumlahnya mengikuti kriteria dan evaluasi IATA — bukan angka yang ditetapkan konsultan.",
        ],
        cta: { text: "Bedah istilahnya: ", href: IATA_URLS.panduan.financialSecurity, label: "Financial Security IATA" },
      },
      {
        heading: "Tahap 8 — Keputusan Akhir IATA",
        paragraphs: [
          "Keputusan akhir selalu di tangan IATA. Bila disetujui, perusahaan memasuki kewajiban keanggotaan program sesuai ketentuan; bila tidak, alasan umumnya berkisar pada kelengkapan dokumen, kesesuaian izin, atau kriteria finansial — dan perusahaan dapat mempersiapkan ulang untuk pengajuan berikutnya. Kami tidak menjanjikan persetujuan; kami memastikan Anda masuk proses dengan kesiapan terbaik.",
        ],
        cta: { text: "Siap mulai? ", href: IATA_URLS.konsultasi, label: "Konsultasi IATA bersama tim kami" },
      },
    ],
    faq: [
      {
        q: "Berapa lama proses pengajuan IATA?",
        a: "Durasi bergantung pada kelengkapan dokumen, antrean evaluasi, dan keputusan IATA. Tidak ada pihak yang dapat menjamin tanggal — waspadai pihak yang menjanjikan waktu persetujuan pasti.",
      },
      {
        q: "Apakah konsultan bisa mengajukan atas nama perusahaan?",
        a: "Konsultan membantu penyiapan dan koordinasi administratif. Pengajuan resmi dilakukan oleh pihak berwenang perusahaan melalui saluran resmi IATA dengan identitas perusahaan sendiri — dan kredensial akun tetap milik perusahaan.",
      },
      {
        q: "Apa itu Legal Authorized Signatory?",
        a: "Pihak yang ditunjuk dan berwenang menandatangani dokumen pengajuan dan perjanjian terkait atas nama perusahaan, menanggung kebenaran informasi yang diajukan.",
      },
    ],
    terkait: [
      { href: IATA_URLS.golite, label: "IATA GoLite" },
      { href: IATA_URLS.gostandard, label: "IATA GoStandard" },
      { href: IATA_URLS.panduan.biaya, label: "Biaya akreditasi IATA" },
    ],
  },
];
