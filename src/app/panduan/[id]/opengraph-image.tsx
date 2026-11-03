// ============================================================
// OG IMAGE DINAMIS — /panduan/{id}
// SEO Sprint: halaman panduan perizinan (knowledge hub) kini
// punya gambar share unik per-panduan, konsisten dengan
// judul "Panduan Lengkap {name} Indonesia" di generateMetadata.
// ============================================================

import { PERMIT_GUIDES } from "@/lib/seo-content";
import { makeOgImageResponse, OG_SIZE, OG_CONTENT_TYPE, titleFromSlug } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Panduan Perizinan PusatPerizinan.com";

export default async function OgImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const guide = PERMIT_GUIDES.find((g) => g.id === id);
  return makeOgImageResponse({
    title: guide
      ? `Panduan Lengkap ${guide.name} Indonesia`
      : `Panduan ${titleFromSlug(id)} — Perizinan Usaha Indonesia`,
    subtitle: guide?.short ?? "Syarat, biaya, dan proses lengkap — disusun konsultan berpengalaman, diperbarui berkala.",
    category: "Panduan Perizinan",
  });
}
