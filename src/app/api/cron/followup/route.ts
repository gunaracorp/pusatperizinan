import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import { sweepFollowUps } from "@/lib/followup";

// ============================================================
// GET/POST /api/cron/followup — pemicu sweep follow-up lead
// (langkah 6 ROADMAP-99)
//
// Autentikasi (salah satu):
//   1. Cron eksternal: header `Authorization: Bearer <CRON_SECRET>`
//      atau query `?secret=<CRON_SECRET>` — bila CRON_SECRET terpasang.
//   2. Cookie admin (tombol "Jalankan Sweep" di Mission Control).
//   3. Bila CRON_SECRET kosong → GET/POST terbuka (hanya mengembalikan
//      ANGKA ringkasan, tanpa data pribadi) — pasca produksi disarankan
//      memasang CRON_SECRET.
//
// Respons: ringkasan sweep (scanned/sent/failed) tanpa PII.
// ============================================================

async function authorize(req: NextRequest): Promise<boolean> {
  const secret = process.env.CRON_SECRET || "";
  if (secret) {
    const auth = req.headers.get("authorization") || "";
    if (auth === `Bearer ${secret}`) return true;
    if (req.nextUrl.searchParams.get("secret") === secret) return true;
  }
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

async function run(req: NextRequest) {
  if (!(await authorize(req))) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  const result = await sweepFollowUps();
  return NextResponse.json({
    success: true,
    data: {
      scanned: result.scanned,
      adminSent: result.adminSent,
      adminFailed: result.adminFailed,
      leadSent: result.leadSent,
      leadFailed: result.leadFailed,
      skippedNoChannel: result.skippedNoChannel,
    },
  });
}

export async function GET(req: NextRequest) {
  return run(req);
}

export async function POST(req: NextRequest) {
  return run(req);
}
