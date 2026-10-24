import type { Metadata } from "next";
import { existsSync } from "fs";
import path from "path";
import { SITE_URL } from "@/lib/site";
import {
  SITEMAP_SECTION_IDS,
  SITEMAP_SECTION_LABELS,
} from "@/lib/webmaster-tools";
import { WebmasterClient } from "./webmaster-client";

// ============================================================
// PUSATPERIZINAN.COM — WEBMASTER TOOLS MASTER
// ============================================================
// Panel satu-stop verifikasi situs di seluruh mesin pencari dunia.
// Halaman ini adalah ALAT INTERNAL OWNER → noindex/nofollow agar
// tidak memakan crawl budget & tidak muncul di hasil pencarian.
// Kode verifikasi dibaca dari env server-side (lihat layout.tsx
// yang me-render <meta> verifikasi untuk seluruh situs).
// ============================================================

export const metadata: Metadata = {
  title: "Webmaster Tools Master — Verifikasi Semua Mesin Pencari Dunia",
  description:
    "Panel verifikasi pusatperizinan.com di 200+ mesin pencari dunia: Google Search Console (prioritas #1), Bing, Yandex, Baidu, Naver, protokol IndexNow, dan GEO (AI search). Katalog 26 mesin terkurasi + checklist progres.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const VERIFICATION_ENVS: ReadonlyArray<readonly [string, string]> = [
  ["google", "NEXT_PUBLIC_GSC_VERIFICATION"],
  ["bing", "NEXT_PUBLIC_BING_VERIFICATION"],
  ["yandex", "NEXT_PUBLIC_YANDEX_VERIFICATION"],
  ["baidu", "NEXT_PUBLIC_BAIDU_VERIFICATION"],
  ["naver", "NEXT_PUBLIC_NAVER_VERIFICATION"],
  ["seznam", "NEXT_PUBLIC_SEZNAM_VERIFICATION"],
];

function publicFileExists(file: string): boolean {
  try {
    return existsSync(path.join(process.cwd(), "public", file));
  } catch {
    return false;
  }
}

function srcRouteExists(rel: string): boolean {
  try {
    return existsSync(path.join(process.cwd(), "src", rel));
  } catch {
    return false;
  }
}

export default function WebmasterPage() {
  // 1. Kode verifikasi yang sudah dikonfigurasi (meta tag muncul otomatis
  //    di <head> seluruh halaman via layout.tsx).
  const verifications: Record<string, string> = {};
  for (const [id, envName] of VERIFICATION_ENVS) {
    const value = process.env[envName];
    if (value) verifications[id] = value;
  }

  // 2. Kesiapan infrastruktur situs — dicek nyata di filesystem server.
  const siteChecks = [
    {
      label: "robots.txt tersaji & membuka 10+ crawler (termasuk bot AI/GEO)",
      ok: publicFileExists("robots.txt"),
      detail: "/robots.txt",
    },
    {
      label: "Sitemap index + 14 seksi programatik (±11.200 URL)",
      ok: true,
      detail: "/sitemap.xml → /sitemap/<seksi>.xml",
    },
    {
      label: "llms.txt — ringkasan situs untuk asisten AI (GEO)",
      ok: publicFileExists("llms.txt"),
      detail: "/llms.txt",
    },
    {
      label: "RSS feed blog — penemuan konten oleh reader & agregator",
      ok: srcRouteExists("app/feed.xml/route.ts"),
      detail: "/feed.xml",
    },
    {
      label: "OG image — preview sosial & chat WhatsApp",
      ok: publicFileExists("og-pusatperizinan.png"),
      detail: "/og-pusatperizinan.png",
    },
    {
      label: "Manifest PWA — situs installable",
      ok: publicFileExists("manifest.json"),
      detail: "/manifest.json",
    },
    {
      label: "Tag verifikasi Google (GSC) aktif via env",
      ok: Boolean(verifications.google),
      detail: "set NEXT_PUBLIC_GSC_VERIFICATION",
    },
    {
      label: "Kunci IndexNow aktif via env",
      ok: Boolean(process.env.INDEXNOW_KEY),
      detail: "set INDEXNOW_KEY",
    },
  ];

  // 3. Daftar URL sitemap siap disalin/submit.
  const sitemapUrls = [
    {
      id: "index",
      label: "Sitemap Index (otomatis menarik 14 seksi)",
      url: `${SITE_URL}/sitemap.xml`,
    },
    ...SITEMAP_SECTION_IDS.map((id) => ({
      id,
      label: SITEMAP_SECTION_LABELS[id] ?? id,
      url: `${SITE_URL}/sitemap/${id}.xml`,
    })),
  ];

  // 4. Status IndexNow untuk tab alat ping.
  const key = process.env.INDEXNOW_KEY;

  return (
    <WebmasterClient
      verifications={verifications}
      siteChecks={siteChecks}
      sitemapUrls={sitemapUrls}
      indexNowConfigured={Boolean(key)}
      indexNowKeyUrl={key ? `${SITE_URL}/${key}.txt` : null}
    />
  );
}
