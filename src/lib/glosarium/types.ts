// ============================================================
// src/lib/glosarium/types.ts — TIPE DATA GLOSARIUM
// ============================================================
// ROADMAP-99 langkah 41 — Glosarium 200+ istilah perizinan.
// Ramah SEO (halaman DefinedTerm per istilah) sekaligus rujukan
// LLM/AI search (definisi mandiri, dasar hukum eksplisit).
// Aturan konten (seo-policy): TANPA angka trust, harga hanya
// konsep, sitasi regulasi statis (bukan pola "freshness year").

export type GlossaryCategoryId =
  | "dasar"
  | "badan-usaha"
  | "pajak"
  | "sektor"
  | "ketenagakerjaan"
  | "perdagangan"
  | "regulasi"
  | "proses";

export interface GlossaryCategory {
  id: GlossaryCategoryId;
  /** Nama kategori untuk tampilan & navigasi. */
  name: string;
  /** Deskripsi singkat kategori (1–2 kalimat). */
  desc: string;
}

export interface GlossaryServiceLink {
  /** Label tautan internal, mis. "Jasa Pengurusan NIB". */
  label: string;
  /** Href internal TERVERIFIKASI (base service /layanan/{slug} atau rute statis). */
  href: string;
}

export interface GlossaryTerm {
  /** Slug URL — juga id istilah untuk relasi antar-istilah. */
  slug: string;
  /** Nama tampil, mis. "NIB (Nomor Induk Berusaha)". */
  term: string;
  /** Padanan istilah Inggris (opsional, membantu AI search). */
  en?: string;
  /** Singkatan resmi, mis. "NIB". */
  abbr?: string;
  category: GlossaryCategoryId;
  /**
   * Definisi inti 35–60 kata — jawaban langsung untuk featured
   * snippet & kutipan AI. HARUS berdiri sendiri tanpa konteks halaman.
   */
  short: string;
  /** Pendalaman 2 paragraf: konteks, cara kerja, praktik, jebakan. */
  detail: string[];
  /** Dasar hukum utama (statis, tanpa tahun "freshness"). */
  legal?: string;
  /** Slug istilah terkait (HARUS resolve ke entri lain). */
  related?: string[];
  /** Tautan layanan internal terverifikasi. */
  services?: GlossaryServiceLink[];
}
