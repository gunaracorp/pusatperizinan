import { NextRequest, NextResponse } from "next/server";
import { resolveAnyService } from "@/lib/service-order";

// ============================================================
// GET /api/payment/service-resolve?code=PP-BU-001
// Resolve kode item katalog (v1/v2/v3) → data tampilan checkout.
// HARGA hanya untuk DISPLAY — API create selalu resolve ulang
// server-side (anti manipulasi harga).
// ============================================================

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code") || "";
  const svc = resolveAnyService(code);
  if (!svc) {
    return NextResponse.json({ ok: false, error: "Kode layanan tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({
    ok: true,
    service: {
      id: svc.id,
      name: svc.name,
      price: svc.price,
      strike: svc.strike ?? null,
      duration: svc.duration,
      categoryLabel: svc.categoryLabel,
      features: svc.features,
      detailUrl: svc.detailUrl,
    },
  });
}
