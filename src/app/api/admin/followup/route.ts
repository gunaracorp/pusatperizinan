import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import { getFollowUpQueue } from "@/lib/followup";

// ============================================================
// GET /api/admin/followup — antrean follow-up jatuh tempo
// (dipakai seksi "Follow-up 24 Jam" di tab Leads Mission Control)
// ============================================================

export async function GET() {
  const store = await cookies();
  if (!verifyToken(store.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const data = await getFollowUpQueue(25);
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memuat antrean follow-up" },
      { status: 500 }
    );
  }
}
