// ============================================================
// OG IMAGE DINAMIS — /layanan/** (500+ halaman programatik)
// SEO Sprint: setiap halaman layanan & kombinasi layanan-wilayah
// kini menghasilkan gambar share sendiri dari slug-nya —
// memperbaiki CTR SERP & WhatsApp untuk keluarga halaman
// terbesar di situs (dulunya semua memakai 1 banner statis).
// ============================================================

import { makeOgImageResponse, OG_SIZE, OG_CONTENT_TYPE, titleFromSlug } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Layanan PusatPerizinan.com";

export default async function OgImage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const parts = Array.isArray(slug) ? slug : [slug];
  const tail = parts.slice(-2).join(" ");
  return makeOgImageResponse({
    title: titleFromSlug(tail),
    subtitle: "Dikerjakan konsultan berpengalaman — resmi, terverifikasi, garansi 100% uang kembali.",
    category: "Layanan Perizinan",
  });
}
