// ============================================================
// OG IMAGE DINAMIS — /blog/{slug}
// SEO Sprint: setiap artikel blog kini punya gambar share unik
// (judul artikel di kanvas brand) — menggantikan banner statis.
// File-convention Next.js: otomatis menyuntik og:image &
// twitter:image tanpa mengubah generateMetadata halaman.
// ============================================================

import { BLOG_ARTICLES } from "@/lib/blog-content";
import { makeOgImageResponse, OG_SIZE, OG_CONTENT_TYPE, titleFromSlug } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Artikel PusatPerizinan.com";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  return makeOgImageResponse({
    title: article?.title ?? titleFromSlug(slug),
    subtitle: article?.excerpt ?? "Wawasan perizinan usaha Indonesia — NIB, PT, PMA, halal, BPOM, pajak & kepatuhan.",
    category: article?.category ?? "Blog Perizinan",
  });
}
