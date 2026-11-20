// ============================================================
// PUSATPERIZINAN.COM — /api/og · Mesin Gambar Open Graph
// ============================================================
// Menggantikan file-convention opengraph-image.tsx yang semula
// hidup di dalam route catch-all layanan/[...slug] — kombinasi
// tersebut memicu PANIC Turbopack 16 (boot mati total):
//   "Invalid segment Static(\"opengraph-image\"), catch all
//    segment must be the last segment modifying the path"
//
// Pola baru: URL deterministik /api/og?t=<judul>&s=<sub>&c=<chip>
// dirender oleh makeOgImageResponse() dari lib/og-template.
// URL sama → byte PNG sama → aman di-cache CDN jangka panjang.
// Dipakai via helper ogImageUrl() di generateMetadata halaman
// programatik (layanan, katalog v2/v3, hub wilayah).
// ============================================================

import { makeOgImageResponse, OG_CONTENT_TYPE } from "@/lib/og-template";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("t")?.slice(0, 200) || "PusatPerizinan.com";
  const subtitle = searchParams.get("s")?.slice(0, 220) || undefined;
  // Kategori positioning panjang (mis. IATA premium 74 char) — jangan
  // terpotong di 60; clamp visual ditangani makeOgImageResponse (110).
  const category = searchParams.get("c")?.slice(0, 110) || undefined;

  const image = makeOgImageResponse({ title, subtitle, category });

  return new Response(image.body, {
    status: 200,
    headers: {
      "Content-Type": OG_CONTENT_TYPE,
      // Deterministik per-URL → cache agresif aman (CDN + browser)
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
