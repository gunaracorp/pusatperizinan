import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { TRUST_METRICS } from "@/lib/site";

// ============================================================
// GET /api/activity — aktivitas terbaru TERANONIMKAN (langkah 46)
// ============================================================
// Feed kepercayaan: "B*** dari layanan NIB — 3 menit lalu".
//
// Privasi (UU PDP friendly):
//   • TANPA nama penuh — hanya huruf pertama + *** (anonyminasi).
//   • TANPA nomor telepon / email / catatan / order number.
//   • Hanya: jenis aktivitas, nama layanan, usia relatif dalam menit.
//   • Cache 30 detik (no-store di klien; revalidate server).
// Bila DB kosong → array kosong (widget tidak tampil — tidak ada
// aktivitas palsu).
// ============================================================

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ActivityItem {
  kind: "order" | "lead";
  initial: string; // "B***"
  service: string; // "Pendaftaran NIB" dsb.
  minutesAgo: number;
}

// src/lib/db exposes compatibility delegates as generic records. These row
// types describe the exact fields requested by each select below.
type ActivityOrderRow = {
  customerName: string;
  serviceName: string;
  createdAt: Date;
};

type ActivityLeadRow = {
  name: string;
  package: string | null;
  createdAt: Date;
};

function anonymize(name: string): string {
  const first = (name || "?").trim().split(/\s+/)[0] || "?";
  return `${(first[0] || "?").toUpperCase()}***`;
}

function minutesAgo(d: Date): number {
  const ms = Date.now() - new Date(d).getTime();
  return Math.max(1, Math.floor(ms / 60_000));
}

export async function GET() {
  try {
    const since = new Date(Date.now() - 24 * 3_600_000); // jendela 24 jam

    const [orders, leads] = await Promise.all([
      db.order.findMany({
        where: { createdAt: { gte: since } },
        select: { customerName: true, serviceName: true, createdAt: true, status: true },
        orderBy: { createdAt: "desc" },
        take: 12,
      })
        .then((rows) => rows as unknown as ActivityOrderRow[])
        .catch(() => [] as ActivityOrderRow[]),
      db.lead.findMany({
        where: { createdAt: { gte: since } },
        select: { name: true, package: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 12,
      })
        .then((rows) => rows as unknown as ActivityLeadRow[])
        .catch(() => [] as ActivityLeadRow[]),
    ]);

    const items: ActivityItem[] = [
      ...orders.map((o: { customerName: string; serviceName: string; createdAt: Date }) => ({
        kind: "order" as const,
        initial: anonymize(o.customerName),
        service: o.serviceName,
        minutesAgo: minutesAgo(o.createdAt),
      })),
      ...leads.map((l: { name: string; package: string | null; createdAt: Date }) => ({
        kind: "lead" as const,
        initial: anonymize(l.name),
        service: l.package || "konsultasi perizinan",
        minutesAgo: minutesAgo(l.createdAt),
      })),
    ]
      .sort((a, b) => a.minutesAgo - b.minutesAgo)
      .slice(0, 10);

    return NextResponse.json(
      { success: true, items, totalPermits: TRUST_METRICS.permitsIssued },
      { headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=60" } }
    );
  } catch {
    // Tidak pernah meledakkan UI — widget hilang saja bila DB bermasalah.
    return NextResponse.json({ success: true, items: [] });
  }
}
