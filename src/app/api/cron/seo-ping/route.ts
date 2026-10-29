import { NextRequest, NextResponse } from "next/server";
import { runDailyCycle } from "@/lib/seo-ping-core.mjs";

// ============================================================
// PUSATPERIZINAN.COM — CRON SEO AUTO-PING (IndexNow + Rotasi GSC)
// ============================================================
// Pemicu cron eksternal (cPanel cron / cron-job.org / uptime pinger):
//   curl "https://pusatperizinan.com/api/cron/seo-ping?secret=CRON_SECRET"
//   atau header Authorization: Bearer <CRON_SECRET>
//
// Yang dilakukan tiap eksekusi:
//   1. Tarik seluruh URL sitemap (15 seksi, sekuensial — OOM-safe)
//   2. Diff vs snapshot .seo/state.json → URL BARU
//   3. URL baru → IndexNow (Bing/Yandex/Seznam/Naver/...) — idempoten
//   4. Rotasi harian 12 URL → daftar request-indexing manual GSC
//   5. Laporan JSON + berkas download/seo/gsc-request-<tanggal>.txt
//
// Aman dipanggil berulang dalam sehari: kursor rotasi hanya maju
// sekali per tanggal (idempoten per hari); ping baru idempoten per URL.
// ============================================================

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET || "";
  if (!secret) return true; // pola sama dengan /api/cron/followup — tanpa secret, terbuka (hanya laporan)
  const auth = req.headers.get("authorization") || "";
  if (auth === `Bearer ${secret}`) return true;
  if (req.nextUrl.searchParams.get("secret") === secret) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ success: false, error: "Secret cron tidak valid" }, { status: 401 });
  }

  try {
    const dryRun = req.nextUrl.searchParams.get("dry") === "1";
    const { report, rotation, newEntries, ping } = await runDailyCycle({
      root: process.cwd(),
      dryRun,
    });

    return NextResponse.json({
      success: true,
      dryRun,
      date: report.date,
      totalSitemapUrls: report.totalSitemapUrls,
      newSinceSnapshot: newEntries.length,
      indexnow: {
        submitted: ping.submitted,
        httpStatus: ping.status,
        error: ping.error,
      },
      rotationPool: report.rotation.poolSize,
      rotationCursor: `${report.rotation.cursorStart} → ${report.rotation.cursorEnd}`,
      gscRequestList: rotation, // 12 URL — tempel ke GSC → Inspeksi URL → Minta pengindeksan
      sitemapErrors: report.sitemapErrors,
      durationMs: report.durationMs,
    });
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        error: e instanceof Error ? e.message : "Gagal menjalankan siklus auto-ping",
      },
      { status: 500 }
    );
  }
}
