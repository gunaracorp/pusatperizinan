// ============================================================
// PUSATPERIZINAN.COM — PERBANDINGAN TRIO (3 PIHAK)
// ROADMAP-99 langkah 34: "PT vs CV vs Perseorangan".
// Konten berbasis UU 40/2007, KUHD, UU Cipta Kerja & PP 55/2022.
// ============================================================

export type TrioBest = 0 | 1 | 2 | null;

export interface TrioParty {
  id: string;
  short: string;
  name: string;
}

export interface TrioRow {
  aspect: string;
  cells: [string, string, string];
  /** indeks pihak terbaik untuk aspek ini; null = setara */
  best: TrioBest;
}

export interface TrioComparison {
  slug: string;
  parties: [TrioParty, TrioParty, TrioParty];
  title: string;
  metaTitle: string;
  metaDesc: string;
  intro: string[];
  rows: TrioRow[];
  choose: [string[], string[], string[]];
  verdict: string;
  faq: { q: string; a: string }[];
  keywords: string[];
}

export const TRIO_COMPARISONS: TrioComparison[] = [
  {
    slug: "pt-vs-cv-vs-perseorangan",
    parties: [
      { id: "pt", short: "PT", name: "PT (Perseroan Terbatas)" },
      { id: "cv", short: "CV", name: "CV (Commanditaire Vennootschap)" },
      { id: "pt-perorangan", short: "PT Perorangan", name: "PT Perorangan (Cipta Kerja)" },
    ],
    title: "PT vs CV vs PT Perorangan: Pilih Badan Usaha yang Tepat (Tabel 10 Aspek)",
    metaTitle: "PT vs CV vs PT Perorangan — Tabel Pemilihan Badan Usaha | 2026",
    metaDesc:
      "Bingung PT, CV, atau PT Perorangan? Tabel 10 aspek: dasar hukum, biaya (gratis vs jutaan), pajak, tanggung jawab utang, tender & investor — plus peta keputusan per tahap usaha. Gratis.",
    intro: [
      "PT, CV, dan PT Perorangan adalah tiga jawaban atas satu pertanyaan yang sama: \"saya ingin usaha saya punya badan hukum\" — tapi ketiganya dirancang untuk tahap usaha yang berbeda. PT adalah kendaraan paling lengkap (investor, tender, proteksi aset penuh), CV adalah persekutuan yang cocok saat ada pemodal pasif yang Anda percaya, dan PT Perorangan adalah pintu masuk gratis untuk satu pemilik yang ingin status badan hukum tanpa biaya notaris.",
      "Tabel di bawah membandingkan ketiganya dalam 10 aspek nyata — dasar hukum, biaya pendirian, pajak, tanggung jawab utang, kemampuan menambah pemilik, sampai akses tender. Setelah tabel, ada peta keputusan per kondisi: usaha baru sendirian, usaha keluarga dengan pemodal diam-diam, dan usaha yang mengejar tender atau investor.",
    ],
    rows: [
      {
        aspect: "Dasar hukum",
        cells: [
          "UU 40/2007 — badan hukum penuh, modal terbagi saham",
          "KUHD Pasal 19–21 — persekutuan dagang, bukan badan hukum",
          "UU Cipta Kerja — badan hukum sederhana 1 pemilik (nihilkan notaris)",
        ],
        best: 0,
      },
      {
        aspect: "Jumlah pemilik",
        cells: [
          "Minimal 2 pemegang saham (bukan 1)",
          "Minimal 2: sekutu aktif + sekutu pasif",
          "Tepat 1 orang WNI — tidak bisa ditambah",
        ],
        best: null,
      },
      {
        aspect: "Tanggung jawab utang usaha",
        cells: [
          "Terbatas pada modal saham — harta pribadi aman",
          "Sekutu aktif tak terbatas — harta pribadi ikut terlilit",
          "Terbatas pada aset usaha (kecuali penyalahgunaan)",
        ],
        best: 0,
      },
      {
        aspect: "Biaya pendirian",
        cells: [
          "Rp3,5–6,5 juta: akta notaris + SK Kemenkumham + NIB",
          "Rp2,5–4,5 juta: akta notaris + NIB (tanpa SK)",
          "Rp0 — didirikan sendiri di OSS, tanpa notaris",
        ],
        best: 2,
      },
      {
        aspect: "Durasi pendirian",
        cells: ["3–7 hari kerja (notaris + pengesahan)", "1–3 hari kerja (akta + NIB)", "< 1 hari (proses OSS daring)"],
        best: 2,
      },
      {
        aspect: "Pajak",
        cells: [
          "PPh Badan 22%; mikro-kecil bisa final 0,5% (masa terbatas, PP 55/2022)",
          "Laba dibagikan ke sekutu — tiap orang lapor PPh OP (progresif)",
          "PPh final 0,5% dari omzet — paling ringan di fase awal",
        ],
        best: 2,
      },
      {
        aspect: "Beban pembukuan & laporan",
        cells: [
          "Pembukuan lengkap, SPT 1771, audit bila memenuhi kriteria",
          "Buku dagang KUHD — paling ringan; pajak mengikuti sekutu",
          "Pembukuan badan sederhana + laporan tahunan OSS",
        ],
        best: 1,
      },
      {
        aspect: "Menambah pemilik / investor",
        cells: [
          "Mudah — transfer/terbitkan saham; siap VC & akuisisi",
          "Perlu revisi akta — praktis untuk mitra dekat saja",
          "Tidak bisa — tetap 1 pemilik; naik kelas ke PT biasa",
        ],
        best: 0,
      },
      {
        aspect: "Tender & mitra korporat",
        cells: [
          "Terkuat — standar tender pemerintah & vendor korporasi",
          "Diterima bank umumnya; banyak tender mensyaratkan PT",
          "Terbatas — kuat untuk paket UMK/mikro, lemah di tender besar",
        ],
        best: 0,
      },
      {
        aspect: "Jalan naik kelas",
        cells: [
          "Puncak jalur: go-public, PMA, multi-cabang",
          "Bisa dikonversi jadi PT saat tumbuh",
          "Didirikan ulang sebagai PT biasa saat butuh pemilik baru",
        ],
        best: 0,
      },
    ],
    choose: [
      [
        "Rencana tumbuh besar: investor, venture capital, atau go-public",
        "Ikut tender pemerintah / jadi vendor korporasi besar",
        "Usaha berisiko (konstruksi, distribusi, produksi) — butuh proteksi aset penuh",
        "Butuh kredit bank besar atau rencana melibatkan pemodal asing",
      ],
      [
        "Ada pemodal pasif yang dipercaya (umumnya keluarga) — pola usaha keluarga",
        "Profesional sejajar yang sama-sama bekerja & berisiko (kantor jasa)",
        "Ingin pendirian murah-cepat tanpa SK Kemenkumham",
        "Beban administrasi paling ringan adalah prioritas",
      ],
      [
        "Baru memulai / masih validasi ide — sendirian, tanpa biaya apa pun",
        "Freelancer & kreator yang butuh nama 'PT' untuk kredibilitas partner",
        "Omzet masih di bawah Rp4,8 M — nikmati PPh final 0,5% (s/d 4 tahun pajak)",
        "Ingin proteksi aset pribadi gratis sebelum naik ke PT biasa",
      ],
    ],
    verdict:
      "Pilih PT Perorangan bila Anda sendirian dan masih membina pasar — gratis, cepat, proteksi aset sudah didapat; naik kelas ke PT biasa saat butuh pemilik kedua atau KBLI lebih besar. Pilih CV bila ada pemodal pasif yang dipercaya dan administrasi ringan lebih penting daripada proteksi penuh — ingat, sekutu aktif menanggung utang hingga harta pribadi. Pilih PT bila usaha Anda bermain di zona tender, investor, atau risiko tinggi — biaya pendiriannya adalah premi proteksi dan akses. Ketiganya bukan jalan buntu: PT Perorangan bisa lahir kembali sebagai PT biasa, CV bisa dikonversi jadi PT. Konsultasi gratis kami memetakan posisi Anda hari ini dan biaya naik kelasnya — supaya Anda tidak membayar struktur yang belum Anda butuhkan.",
    faq: [
      { q: "Bolehkah mulai dari PT Perorangan lalu menjadi PT biasa?", a: "Boleh dan itu pola paling hemat. PT Perorangan didirikan gratis di OSS; saat usaha butuh pemilik kedua atau KBLI di luar kriteria mikro-kecil, Anda mendirikan PT biasa dan memindahkan aktivitas usahanya. Riwayat pajak mengikuti orang pribadinya; NIB baru terbit untuk PT. Kami menyebutnya 'jalur naik kelas' — dibahas lengkap di sesi konsultasi gratis." },
      { q: "Untuk usaha keluarga, lebih cocok CV atau PT Perorangan?", a: "Tergantung jumlah pemilik dan perannya. Jika benar-benar satu orang yang memegang kendali, PT Perorangan cukup dan gratis. Jika ada anggota keluarga yang memasukkan modal tapi tidak mengelola (sekutu pasif), strukturnya justru CV — karena PT Perorangan tidak bisa punya dua pemilik. Catatan risiko: sekutu aktif di CV bertanggung jawab penuh hingga harta pribadi." },
      { q: "Badan usaha mana yang bisa ikut tender pemerintah?", a: "Ketiganya sah ikut tender, tapi daya dukungnya berbeda: PT paling mulus (kualifikasi terlengkap, kredit bank, pengalaman), CV diterima untuk banyak pengadaan namun sebagian lelang mensyaratkan PT, dan PT Perorangan efektif untuk paket mikro-kecil (belanja UMK). Jika tender adalah target utama tahun ini, PT adalah pilihan aman." },
      { q: "Mana yang pajaknya paling hemat?", a: "Untuk omzet kecil: PT Perorangan (final 0,5% dari omzet, masa 4 tahun pajak). Untuk omzet menengah dengan laba tipis: CV sering efisien karena laba dihitung per sekutu pada tarif progresif OP. Untuk laba besar dengan rencana reinvestasi: PT — PPh Badan 22% flat dan fleksibilitas dividen. Simulasi beban pajak per kondisi omzet tersedia di kalkulator pajak kami." },
      { q: "Apa beda PT Perorangan dengan PT biasa?", a: "Tiga hal utama: (1) jumlah pemilik — PT Perorangan tepat 1 orang, PT biasa minimal 2; (2) biaya — PT Perorangan tanpa notaris dan SK Kemenkumham (Rp0), PT biasa Rp3,5–6,5 juta; (3) fleksibilitas — PT biasa bisa terbit saham untuk investor, PT Perorangan tidak. Bobot hukumnya sama-sama badan hukum: keduanya melindungi harta pribadi." },
    ],
    keywords: [
      "pt vs cv vs pt perorangan",
      "perbedaan pt cv dan pt perorangan",
      "memilih badan usaha untuk pemula",
      "badan usaha paling murah",
      "pt perorangan atau cv",
      "usaha keluarga cv atau pt",
    ],
  },
];

export const TRIO_TOTAL = TRIO_COMPARISONS.length;

export function getTrio(slug: string): TrioComparison | undefined {
  return TRIO_COMPARISONS.find((t) => t.slug === slug);
}
