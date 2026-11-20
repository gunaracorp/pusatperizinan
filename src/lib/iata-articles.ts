// ============================================================
// PUSATPERIZINAN.COM — IATA ARTICLES REGISTRY (BAGIAN 8)
// Data artikel terstruktur → dirender /panduan/[slug].
// Konten artikel dalam iata-articles-1.ts & iata-articles-2.ts.
// Aturan: satu search intent, jawaban di paragraf pertama,
// heading sistematis, tabel/checklist, sumber resmi, tanpa
// angka yang tidak bersumber resmi, tanpa janji persetujuan.
// ============================================================

import { IATA_URLS } from "@/lib/iata";

export interface IataArticleSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { caption?: string; headers: string[]; rows: string[][] };
  checklist?: string[];
  /** key link kontekstual: "golite" | "gostandard" | "goglobal" | "cek" | "konsultasi" | path */
  cta?: { text: string; href: string; label: string };
}

export interface IataArticle {
  slug: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  updatedAt: string;
  readMinutes: number;
  sections: IataArticleSection[];
  faq: { q: string; a: string }[];
  /** tautan produk kontekstual (bukan kumpulan tautan di bawah saja) */
  terkait: { href: string; label: string }[];
}

const URLS = IATA_URLS.panduan;

/** Semua slugs — dipakai generateStaticParams & sitemap. */
export const IATA_ARTICLE_SLUGS = [
  URLS.overview,
  URLS.persyaratan,
  URLS.perbedaan,
  URLS.proses,
  URLS.biaya,
  URLS.financialSecurity,
  URLS.agentBaru,
  URLS.agentUmrah,
] as const;

export type IataArticleSlug = (typeof IATA_ARTICLE_SLUGS)[number];

export function slugOfArticlePath(path: string): string {
  return path.replace(/^\/panduan\//, "");
}

import { IATA_ARTICLES_1 } from "./iata-articles-1";
import { IATA_ARTICLES_2 } from "./iata-articles-2";

const BY_SLUG = new Map<string, IataArticle>(
  [...IATA_ARTICLES_1, ...IATA_ARTICLES_2].map((a) => [a.slug, a])
);

export function getIataArticle(slug: string): IataArticle | undefined {
  return BY_SLUG.get(slug);
}

export function allIataArticles(): IataArticle[] {
  return [...IATA_ARTICLES_1, ...IATA_ARTICLES_2];
}
