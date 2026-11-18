// ============================================================
// PUSATPERIZINAN.COM — Blog Engine: Artikel Panduan Mendalam
// Konten long-form untuk dominasi long-tail keyword perizinan
// E-E-A-T: penulis ahli, tanggal publikasi/update, FAQ, sumber hukum
// ============================================================

export type BlogCategory =
  | "Panduan"
  | "Biaya & Modal"
  | "Regulasi"
  | "Studi Kasus"
  | "Internasional"
  | "Tambang & Energi"
  | "Travel Ibadah"
  | "Pajak";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Panduan",
  "Biaya & Modal",
  "Regulasi",
  "Studi Kasus",
  "Internasional",
  "Tambang & Energi",
  "Travel Ibadah",
  "Pajak",
];

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  readMinutes: number;
  /** YYYY-MM-DD */
  publishedAt: string;
  /** YYYY-MM-DD */
  updatedAt: string;
  author: string;
  authorRole: string;
  keywords: string[];
  sections: BlogSection[];
  faq: BlogFAQ[];
  /** slug artikel blog terkait (harus ada di BLOG_ARTICLES) */
  relatedArticles: string[];
  /** id panduan di seo-content.ts: nib, pt, halal, bpom, oss, pbg, lingkungan, cv, klinik, pma, pajak, ppi-umroh, ppi-haji, iata, saudi-arabia, rkab-tambang */
  relatedGuides: string[];
  /** CTA penutup artikel: text + anchor section (#konsultasi, #kalkulator, #cek-izin, #layanan, #panduan) */
  cta: { text: string; anchor: string };
}

export const BLOG_ARTICLES: BlogArticle[] = [
    relatedArticles: ["panduan-nib-oss-rba", "pma-vs-pt-lokal"],
    relatedGuides: ["oss", "nib"],
    cta: { text: "Need help with OSS account access? Contact our team", anchor: "#konsultasi" },
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slugs: string[]): BlogArticle[] {
  return slugs
    .map((s) => getArticle(s))
    .filter((a): a is BlogArticle => Boolean(a));
}

export function getAllBlogKeywords(): string[] {
  return Array.from(new Set(BLOG_ARTICLES.flatMap((a) => a.keywords)));
}
