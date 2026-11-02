import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import { getRecoveryQueue } from "@/lib/recovery";

// ============================================================
// GET /api/admin/recovery — antrean pemulihan checkout terbengkalai
// (dipakai panel "Pemulihan Checkout" di tab Pesanan Mission Control;
//  langkah 12 ROADMAP-99)
// ============================================================

export async function GET() {
  const store = await cookies();
  if (!verifyToken(store.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const data = await getRecoveryQueue(25);
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memuat antrean pemulihan" },
      { status: 500 }
    );
  }
}
