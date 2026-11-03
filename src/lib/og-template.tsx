// ============================================================
// PUSATPERIZINAN.COM — OG IMAGE ENGINE (SEO Sprint 2027)
// ============================================================
// Template terpusat untuk gambar Open Graph dinamis (1200x630)
// yang dirender per-halaman via file-convention opengraph-image.
// Sebelumnya seluruh 2.830+ halaman memakai SATU banner statis —
// CTR di SERP & share WhatsApp/LinkedIn jauh di bawah potensi.
//
// Desain mengikuti identitas situs: gradasi emerald-950→800
// (persis hero), chip amber, tipografi putih — tanpa aset eksternal
// sehingga render deterministik di dev & produksi (font bawaan
// satori/Noto, teks Indonesia = Latin, aman).
// ============================================================

import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** "pendirian-pt-asing" → "Pendirian Pt Asing" (aman URL-encoded). */
export function titleFromSlug(slug: string | string[]): string {
  const raw = Array.isArray(slug) ? slug.join(" ") : slug;
  const clean = decodeURIComponent(raw).replace(/[-_/]+/g, " ").replace(/\s+/g, " ").trim();
  return clean
    .split(" ")
    .map((w) => (w.length > 2 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/** Potong teks agar tidak meluber di kanvas (satori tanpa line-clamp). */
function clamp(text: string, max: number): string {
  const t = (text ?? "").replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max - 1).trimEnd() + "…" : t;
}

export interface OgInput {
  title: string;
  subtitle?: string;
  category?: string;
}

/** Render gambar OG branding PusatPerizinan.com. */
export function makeOgImageResponse({ title, subtitle, category }: OgInput): ImageResponse {
  const safeTitle = clamp(title, 110);
  const safeSubtitle = subtitle ? clamp(subtitle, 150) : undefined;
  // Judul panjang menyusut proporsional agar tetap 2-3 baris rapi
  const titleSize = safeTitle.length > 90 ? 46 : safeTitle.length > 60 ? 54 : 62;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          backgroundImage: "linear-gradient(160deg, #022c22 0%, #064e3b 58%, #065f46 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Baris atas: chip kategori + domain */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              background: "#fbbf24",
              color: "#022c22",
              padding: "8px 20px",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            {category ? category.toUpperCase() : "PUSATPERIZINAN.COM"}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#6ee7b7", fontWeight: 600 }}>
            pusatperizinan.com
          </div>
        </div>

        {/* Judul + subjudul */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: titleSize, fontWeight: 800, lineHeight: 1.15 }}>
            {safeTitle}
          </div>
          {safeSubtitle ? (
            <div style={{ display: "flex", fontSize: 27, color: "#d1fae5", lineHeight: 1.35 }}>
              {safeSubtitle}
            </div>
          ) : undefined}
        </div>

        {/* Footer brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.28)",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "#fbbf24",
                color: "#022c22",
                fontSize: 24,
                fontWeight: 800,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              P
            </div>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
              PusatPerizinan.com
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 23, color: "#a7f3d0" }}>
            Garansi 100% • SCBD Jakarta • 38 Provinsi
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
