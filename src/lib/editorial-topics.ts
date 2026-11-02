// Browser-safe editorial topic data.
// Keep database imports out of this module: it is used by a "use client" admin component.

import type { EditorialPillar } from "./editorial-types";
export type { EditorialPillar } from "./editorial-types";

export interface TopicSeed {
  title: string;
  focusKeyword: string;
  keywords: string;
  notes: string;
}

export const TOPIC_BANK: Record<EditorialPillar, TopicSeed[]> = {
  PANDUAN: [
    {
      title: "Cara Mengurus NIB via OSS-RBA 2026: Panduan Langkah demi Langkah",
      focusKeyword: "cara mengurus nib oss",
      keywords: "nib, oss-rba, perizinan usaha, nomor induk berusaha",
      notes: "Urutan aksi nyata di portal OSS, prasyarat akun, titik verifikasi yang sering menggagalkan, dan checklist pasca-terbit NIB.",
    },
    {
      title: "Cara Mendirikan PT Perorangan Online: Syarat, Biaya, dan Waktu Proses",
      focusKeyword: "cara mendirikan pt perorangan",
      keywords: "pt perorangan, uu cipta kerja, NIB PPO, badan usaha tunggal",
      notes: "Fokus beda PT Perorangan vs PT biasa vs perseorangan klasik; alur verifikasi; kapan naik kelas ke PT.",
    },
    {
      title: "Panduan Mengisi LKPM untuk Pertama Kali (Khusus UMKM)",
      focusKeyword: "cara mengisi lkpm",
      keywords: "lkpm, laporan kegiatan usaha, kewajiban oss, umkm",
      notes: "Periode kuartalan/triwulanan, field yang membingungkan, konsekuensi tidak lapor terhadap izin, contoh isian omzet sederhana.",
    },
    {
      title: "Cara Memilih KBLI yang Tepat untuk Bisnis Anda (Panduan Praktis)",
      focusKeyword: "cara memilih kbli",
      keywords: "kbli 2020, kode kbli, profil risiko, resiko rendah menengah tinggi",
      notes: "Metode memetakan aktivitas bisnis ke KBLI, multi-KBLI, implikasi profil risiko ke jenis perizinan yang diminta OSS.",
    },
    {
      title: "Panduan Mendirikan CV: dari Akta Notaris sampai NIB Terbit",
      focusKeyword: "cara mendirikan cv",
      keywords: "cv, persekutuan komanditer, akta notaris, pengurus cv",
      notes: "Peran komanditer vs komplementir, alur dokumen, pajak CV, dan kapan CV bukan pilihan terbaik.",
    },
    {
      title: "Cara Mengurus Izin Edar BPOM untuk Produk Makanan Kemasan",
      focusKeyword: "izin edar bpom makanan",
      keywords: "izin edar, bpom, md pangan, pirt vs bpom, label gizi",
      notes: "Bedanya MD vs PIRT, alur uji lab, komposisi label, estetika penolakan umum, dan biaya bersifat PNBP.",
    },
    {
      title: "Panduan Sertifikasi Halal untuk UMKM: Proses, Biaya, dan Timeline",
      focusKeyword: "sertifikasi halal umkm",
      keywords: "sertifikasi halal, self declare, sehati, bpjph, lembaga pemeriksa halal",
      notes: "Jalur Self Declare (kanal gratis/bersubsidi SEHATI) vs reguler, dokumen produk, audit, masa berlaku sertifikat.",
    },
    {
      title: "Cara Mendirikan PMA di Indonesia: Panduan Lengkap Investor Asing",
      focusKeyword: "cara mendirikan pma",
      keywords: "pma, penanaman modal asing, modal disetor, kbli asing, bkpm",
      notes: "Ambang modal >10 miliar, KBLI yang terbuka, alur BKPM/OSS, kewajiban realisasi & pelaporan berkala LKPM PMA.",
    },
    {
      title: "Panduan Mengurus PBG dan SLF untuk Ruko, Kantor, dan Gudang",
      focusKeyword: "cara mengurus pbg dan slf",
      keywords: "pbg, persetujuan bangunan gedung, slf, sertifikat laik fungsi, simbg",
      notes: "Bedanya PBG (pengganti IMB) vs SLF, alur SIMBG, dokumen teknis, kapan SLF wajib sebelum operasional.",
    },
    {
      title: "Cara Mengajukan KITAS untuk Investor dan Tenaga Kerja Asing",
      focusKeyword: "cara mengajukan kitas",
      keywords: "kitas, izin tinggal, rptka, notifikasi, imigrasi, tka",
      notes: "Urutan benar: RPTKA → notifikasi → VITAS/KITAS; index KITAS investor vs pekerja; kewajiban DKP-TKA per posisi.",
    },
    {
      title: "Panduan NIB untuk Ekspor-Impor: API-U, API-P, dan Urutan Pengurusannya",
      focusKeyword: "nib ekspor impor api u",
      keywords: "api u, api p, izin ekspor impor, nib wajib api, customs",
      notes: "Kapan API-U vs API-P, urutan NIB dulu lalu API, dampak ke fasilitas bea masuk, kesalahan umum KBLI ekspor.",
    },
    {
      title: "Cara Upgrade Usaha Perorangan menjadi PT Tanpa Berhenti Operasi",
      focusKeyword: "upgrade perorangan ke pt",
      keywords: "ubah perorangan ke pt, sk menkumham, alih status usaha, perpajakan",
      notes: "Konsekuensi hukum & pajak, alih aset, kontrak berjalan, urutan akta → SK → NIB baru, dan poin LKPM.",
    },
  ],
  REGULASI: [
    {
      title: "Regulasi OSS-RBA Terbaru: Perubahan yang Wajib Diketahui Pelaku Usaha",
      focusKeyword: "regulasi oss-rba terbaru",
      keywords: "oss rba, perubahan regulasi, perizinan berusaha, kebijakan oss",
      notes: "Kabar perubahan alur/mekanisme OSS terkini, dampaknya ke izin lama, langkah sinkronisasi data usaha.",
    },
    {
      title: "UU Cipta Kerja dan Dampaknya bagi Perizinan UMKM Hari Ini",
      focusKeyword: "uu cipta kerja perizinan umkm",
      keywords: "uu cipta kerja, omnibus, lisensi umkm, izin mikro kecil",
      notes: "Ringkas poin relevan bagi UMKM: lisensi tunggal, fasilitas, penyederhanaan; apa yang praktis berubah di lapangan.",
    },
    {
      title: "Kewajiban PSE bagi Platform Digital: Aturan Komdigi dan Langkah Pendaftaran",
      focusKeyword: "kewajiban pse platform digital",
      keywords: "pse terdaftar, komdigi, platform digital, toko online, aplikasi",
      notes: "Siapa wajib PSE (lokal/asing), alur pendaftaran, sanksi pemblokiran, dan posisi PSE di e-commerce.",
    },
    {
      title: "Perizinan Berusaha Berbasis Risiko: Mekanisme Baru Menggantikan Izin Lama",
      focusKeyword: "perizinan berusaha berbasis risiko",
      keywords: "profil risiko, nib, sertifikat standar, izin baru, pp 5 2018",
      notes: "Eksplisitkan 3 profil risiko → bentuk perizinan; contoh nyata 2-3 sektor; apa yang terjadi pada izin lama Anda.",
    },
    {
      title: "Kewajiban Sertifikasi Halal Wajib: Batas Waktu dan Sanksi bagi UMKM",
      focusKeyword: "kewajiban sertifikasi halal",
      keywords: "halal wajib, uu jph, batas waktu, sanksi, produk fnb",
      notes: "Tahapan penegakan UU JPH, kategori produk yang tersentuh dulu, opsi gratis (SEHATI), cara cek status kewajiban.",
    },
    {
      title: "Aturan Rekrutmen Tenaga Kerja Asing Terkini: RPTKA, DKP-TKA, dan Notifikasi",
      focusKeyword: "aturan rptka terbaru",
      keywords: "rptka, dkp-tka, tka, kemnaker, notifikasi, posisi asing",
      notes: "Posisi yang ditutup/terbuka, komposisi TKA vs lokal, biaya DKP per posisi, poin sering ditolak di RPTKA.",
    },
    {
      title: "Regulasi Pengelolaan Limbah B3 untuk Industri: Kewajiban dan Sanksinya",
      focusKeyword: "regulasi limbah b3",
      keywords: "limbah b3, tps lb3, manifest, perizinan lingkungan, dlh",
      notes: "Pemicu kategori B3 (dari NIB/KBLI), kewajiban TPS & pihak ketiga berizin, manifest elektronik, sanksi administratif.",
    },
    {
      title: "Perizinan Tambang Terkini: IUP, IUPK, dan Kewajiban RKAB yang Berubah",
      focusKeyword: "regulasi iup iupk rkab",
      keywords: "iup, iupk, rkab, esdm, minerba, kaidah pertambangan",
      notes: "Perubahan mekanisme RKAB multi-tahun, verifikasi kaidah pertambangan, konsekuensi keterlambatan penyampaian.",
    },
    {
      title: "UU PDP Berlaku Penuh: Kewajiban Perlindungan Data untuk Bisnis Online",
      focusKeyword: "uu pdp kewajiban bisnis",
      keywords: "uu pdp, perlindungan data pribadi, dpo, kebocoran data, consent",
      notes: "Kontroler vs prosesor, kewajiban konkret (dasar pemrosesan, notifikasi bocor), kesiapan minimum untuk toko online.",
    },
    {
      title: "Kewajiban SMK3: Perusahaan Mana yang Wajib dan Bagaimana Penerapannya",
      focusKeyword: "kewajiban smk3",
      keywords: "smk3, pp 50 2012, keselamatan kerja, audit smk3, 100 pekerja",
      notes: "Ambang >100 pekerja / proyek berisiko tinggi, audit internal-eksternal, sanksi, dan tautan ke perizinan lain.",
    },
    {
      title: "Aturan Kepemilikan Properti oleh WNA dan Badan Hukum PMA: Yang Boleh & Tidak",
      focusKeyword: "wna milik properti indonesia",
      keywords: "hak pakai, hakkmpum, wna properti, pma properti, agraria",
      notes: "Hak-hak yang tersedia (Pakai, HGU, HGB), ambang & prosedur via PMA, mitos SHM atas nama WNA.",
    },
    {
      title: "Regulasi Kawasan Berikat dan Fasilitas Ekspor-Impor Terkini",
      focusKeyword: "regulasi kawasan berikat",
      keywords: "kawasan berikat, kdb, bea masuk ditanggung pemerintah, fasilitas kepabeanan",
      notes: "Manfaat utama KB (deferment, pengembangan), syarat minimal, alur izin ke Bea Cukai, kandidat ideal.",
    },
  ],
  PAJAK: [
    {
      title: "PPh Final 0,5% untuk UMKM: Syarat, Cara Hitung, dan Pelaporannya",
      focusKeyword: "pph final 05 persen umkm",
      keywords: "pp final umkm, pp 23 2018, omzet 4,8 miliar, pembayaran bulanan",
      notes: "Syarat omzet ≤4,8 M, dasar pengenaan setelah dikurangi PPn, contoh hitung 2 kasus, jadwal setor-lapor, batas waktu 7 tahun.",
    },
    {
      title: "Cara Daftar NPWP dan Aktivasi Coretax untuk Usaha Baru",
      focusKeyword: "daftar npwp coretax",
      keywords: "npwp badan, coretax, nidn, aktivasi akun, djponline",
      notes: "NPWP badan sejak terbit akta/SK, 16-digit NIK/NPWP, alur aktivasi Coretax, digital certificate, kesalahan umum onboarding.",
    },
    {
      title: "PKP atau Non-PKP: Kapan Usaha Anda Wajib Memungut PPN?",
      focusKeyword: "batas wajib pkp",
      keywords: "pkp, ppn 4,8 miliar, pengukuhan, faktur pajak, ppn 12 persen",
      notes: "Ambang 4,8 M, saat melewati ambang di tengah tahun, sukarela jadi PKP, konsekuensi harga jual & input tax.",
    },
    {
      title: "Cara Menghitung PPN dan Mengeluarkan Faktur Pajak yang Benar",
      focusKeyword: "cara hitung ppn faktur pajak",
      keywords: "ppn 12, dpp nilai lain 11 12, faktur pajak coretax, kode transaksi, nsfo",
      notes: "PPN 12% dengan DPP nilai lain 11/12 untuk barang umum, e-Faktur Coretax, kode transaksi & NSFO, jadwal input faktur.",
    },
    {
      title: "PPh 21 untuk Karyawan: Tarif TER dan Cara Menghitung Pemotongannya",
      focusKeyword: "pph 21 tarif ter",
      keywords: "ter, tarif efektif rata-rata, pph 21, ptkp, bulanan",
      notes: "Kategori TER A/B/C via status PTKP, contoh hitung gaji umum, beda TER vs SPT tahunan (penyesuaian), jadwal setor.",
    },
    {
      title: "Pajak untuk Penjual Online dan Marketplace: Kewajiban yang Berlaku",
      focusKeyword: "pajak penjual online marketplace",
      keywords: "ppn marketplace, pjp, pmse, potong pph penjual online, omzet marketplace",
      notes: "PMSE & PPN dipungut marketplace, potong PPh final 0,5% bagi penjual omzet >500 jt, bukti potong, pelaporan praktis.",
    },
    {
      title: "PPh 22 dan PPh 23: Perbedaannya dan Kapan Usaha Anda Kena",
      focusKeyword: "perbedaan pph 22 dan pph 23",
      keywords: "pph 22, pph 23, bukti potong, jasa, kredit pajak",
      notes: "Pemicu 22 (belanja bahan/etalase, BUMN/pemerintah) vs 23 (jasa, royalti, sewa non tanah), tarif, kredit pajak di SPT.",
    },
    {
      title: "Cara Mengisi SPT Tahunan Badan untuk PT dan CV tanpa Panik",
      focusKeyword: "spt tahunan badan",
      keywords: "spt tahunan badan, 1771, 1771s, laba fiskal, koreksi fiskal",
      notes: "Form 1771(S), koreksi umum (saprotan, penyusutan), jadwal 4 bulan, denda telat, struktur lampiran.",
    },
    {
      title: "Insentif dan Fasilitas Pajak yang Bisa Diakses UMKM Sekarang",
      focusKeyword: "insentif pajak umkm",
      keywords: "fasilitas pajak, insentif, pajak final 0, ppn dibebaskan, keringanan",
      notes: "Fasilitas yang realistis diakses: PPh final UMKM, insentif sektor tertentu, PPN dibebaskan barang tertentu — syarat & bukti.",
    },
    {
      title: "Kewajiban Pajak Ekspatriat dan Pemegang KITAS di Indonesia",
      focusKeyword: "pajak ekspatriat kitas",
      keywords: "pajak ekspatriat, residensi pajak, 183 hari, spt orang pribadi asing",
      notes: "Uji residensi 183 hari, penghasilan yang terutang, SPT OP asing, koordinasi dengan PPh 21 employer, tax equalization ringkas.",
    },
    {
      title: "Denda Keterlambatan Lapor dan Setor Pajak: Tarifnya dan Cara Menghindarinya",
      focusKeyword: "denda keterlambatan lapor pajak",
      keywords: "denda spt, bunga per bulan, sanksi administratif, coretax denda",
      notes: "Denda SPT 100 rb/1 jt, bunga keterlambatan setor per bulan, cara bayar denda via Coretax/billing code, pencegahan kalender.",
    },
    {
      title: "PPh Final atas Sewa, Royalti, dan Jasa Lain: Panduan Praktis Pemotongan",
      focusKeyword: "pph final sewa royalti",
      keywords: "pph final 10 persen, sewa tanah bangunan, royalti, jasa teknik, bukti potong",
      notes: "Tarif & dasar per jenis: sewa tanah/bangunan 10%, royalti, jasa teknik; kewajiban bukti potong & setor; contoh kasus kontrak.",
    },
  ],
};
