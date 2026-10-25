import { NextResponse } from "next/server";
import {
  APP_NAME,
  APP_DOMAIN,
  APP_TAGLINE,
  APP_VERSION,
  RELEASE_NAME,
  RELEASE_DATE,
  RELEASE_CHANNEL,
  RELEASES,
  CURRENT_RELEASE,
  PLATFORM_STATS,
  versionFullLabel,
  isSemVer,
} from "@/lib/version";

// ============================================================
// GET /api/version — Metadata Versi & Riwayat Rilis (publik)
// ============================================================
// ⭐ Diperkenalkan di v1.4.0 "Version Master".
// Sumber tunggal: src/lib/version.ts — tidak ada nomor versi
// yang ditulis manual di sini. force-static agar respons sama
// persis di Dev, Standalone, dan Static Export (cPanel).

export const dynamic = "force-static";

export async function GET() {
  const body = {
    success: true,
    product: {
      name: APP_NAME,
      domain: APP_DOMAIN,
      tagline: APP_TAGLINE,
      url: `https://${APP_DOMAIN}`,
    },
    version: {
      current: APP_VERSION,
      label: versionFullLabel(),
      releaseName: RELEASE_NAME,
      releasedAt: RELEASE_DATE,
      channel: RELEASE_CHANNEL,
      timezone: "Asia/Jakarta (WIB)",
      semverValid: isSemVer(APP_VERSION),
    },
    stats: PLATFORM_STATS,
    docs: {
      changelog: "/CHANGELOG.md",
      worklog: "/WORKLOG.md",
      roadmap: "/ROADMAP-99.md",
      nextRelease: "v1.14.0 (Unreleased — antrean ROADMAP-99)",
    },
    releases: {
      total: RELEASES.length,
      current: CURRENT_RELEASE,
      history: RELEASES,
    },
  };

  return NextResponse.json(body, {
    headers: { "Cache-Control": "public, max-age=300" },
  });
}
