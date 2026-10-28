"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  EmptyState, SkeletonRows, useAdminData, apiPatch, formatRp, relativeTime, waLink, triggerRefresh,
} from "@/components/admin/shared";
import { ChevronLeft, ChevronRight, Phone, Search, ShoppingCart, Wallet } from "lucide-react";

// ---------- Panel Pemulihan Checkout (langkah 12 ROADMAP-99) ----------

interface RecoveryCandidateRow {
  orderNo: string;
  serviceName: string;
  amount: number;
  customerName: string;
  customerPhone: string;
  ageHours: number;
  nextStep: number;
  stepsSent: number[];
  prefill: string;
  payUrl: string;
}
interface RecoveryData {
  candidates: RecoveryCandidateRow[];
  stats: { due: number; abandonedValue: number; recovered: number; activePending: number };
  channels: { telegram: boolean; whatsappGateway: boolean; leadAutoSend: boolean };
}

function RecoveryPanel() {
  const { toast } = useToast();
  const { data, loading, reload } = useAdminData<RecoveryData>("/api/admin/recovery", { intervalMs: 60000 });
  const [sweeping, setSweeping] = useState(false);

  async function runSweep() {
    setSweeping(true);
    try {
      const res = await fetch("/api/cron/recovery", { method: "POST" });
      const j = await res.json();
      if (res.ok && j.success) {
        const d = j.data ?? {};
        toast({
          title: `Sweep pemulihan selesai — ${d.scanned ?? 0} order dipindai`,
          description: `lead: ${d.leadSent ?? 0} terkirim/${d.leadFailed ?? 0} gagal · admin: ${d.adminSent ?? 0}/${d.adminFailed ?? 0}`
            + (d.skippedNoChannel ? " · kanal belum terpasang (Notifikasi)" : ""),
          duration: 6000,
        });
        reload();
        triggerRefresh();
      } else {
        toast({ title: "Sweep gagal", description: j.error ?? "Coba lagi", variant: "destructive" });
      }
    } catch {
      toast({ title: "Koneksi gagal", description: "Coba jalankan ulang sweep.", variant: "destructive" });
    } finally {
      setSweeping(false);
    }
  }

  return (
    <Card className="border-emerald-700/40 bg-emerald-950/30 shadow-none">
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-sm font-bold text-emerald-200">
            <ShoppingCart aria-hidden className="h-4 w-4" /> Pemulihan Checkout Terbengkalai
            <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-[10px] text-emerald-300">Langkah 12</Badge>
          </p>
          <Button
            size="sm"
            onClick={runSweep}
            disabled={sweeping}
            className="h-8 bg-emerald-600 text-white hover:bg-emerald-500"
          >
            {sweeping ? "Menjalankan…" : "Jalankan Sweep"}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          <div className="rounded-lg bg-stone-900/60 p-2.5">
            <p className="text-stone-400">Jatuh tempo dikejar</p>
            <p className="mt-0.5 text-lg font-extrabold text-amber-300">{loading ? "—" : data?.stats.due ?? 0}</p>
          </div>
          <div className="rounded-lg bg-stone-900/60 p-2.5">
            <p className="text-stone-400">Nilai mengendap</p>
            <p className="mt-0.5 text-lg font-extrabold text-emerald-300">{loading ? "—" : formatRp(data?.stats.abandonedValue ?? 0)}</p>
          </div>
          <div className="rounded-lg bg-stone-900/60 p-2.5">
            <p className="text-stone-400">Sequence selesai</p>
            <p className="mt-0.5 text-lg font-extrabold text-stone-100">{loading ? "—" : data?.stats.recovered ?? 0}</p>
          </div>
          <div className="rounded-lg bg-stone-900/60 p-2.5">
            <p className="text-stone-400">Order PENDING aktif</p>
            <p className="mt-0.5 text-lg font-extrabold text-stone-100">{loading ? "—" : data?.stats.activePending ?? 0}</p>
          </div>
        </div>
        {data && data.candidates.length > 0 && (
          <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
            {data.candidates.map((c) => (
              <div key={c.orderNo} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-stone-900/60 px-3 py-2">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-stone-100">
                    {c.orderNo} · {c.serviceName}
                  </p>
                  <p className="text-[10px] text-stone-400">
                    {c.customerName} · {formatRp(c.amount)} · {c.ageHours} jam · step {c.nextStep}/3
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <a
                    href={c.payUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Buka halaman bayar ${c.orderNo}`}
                  >
                    <Button size="sm" variant="outline" className="h-7 border-stone-700 px-2 text-[11px] text-stone-300 hover:bg-stone-800">
                      Bayar
                    </Button>
                  </a>
                  <a
                    href={c.prefill}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Chat ${c.customerName} — step ${c.nextStep}`}
                  >
                    <Button size="sm" variant="outline" className="h-7 border-emerald-700 px-2 text-[11px] text-emerald-300 hover:bg-emerald-900/40">
                      💬 Chat (step {c.nextStep})
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="text-[11px] leading-relaxed text-stone-500">
          Mesin berdenyut otomatis tiap 15 menit (tanpa cron) — sequence WA 1 jam → 24 jam → 72 jam ke klien + reminder admin, berhenti begitu order lunas/batal. Kanal: {data?.channels.whatsappGateway ? "WA gateway ✓" : "WA gateway ✗"} · {data?.channels.telegram ? "Telegram ✓" : "Telegram ✗"} — isi token di tab Notifikasi.
        </p>
      </CardContent>
    </Card>
  );}

// ============================================================
// Tab — PESANAN: pesanan checkout otomatis (bayar langsung)
// Badge metrik pendapatan + tabel + ubah status manual.
// Panel "Pemulihan Checkout" (langkah 12 ROADMAP-99) di atas:
//   antrean order PENDING yang sedang dikejar mesin recovery
//   (sequence WA 1 jam/24 jam/72 jam + reminder admin) + tombol sweep.
// ============================================================

interface OrderRow {
  id: string; orderNo: string; serviceName: string; amount: number;
  customerName: string; customerPhone: string; provider: string;
  paymentMethod: string | null; status: string; notes: string | null;
  createdAt: string; paidAt: string | null;
}
interface OrdersData {
  rows: OrderRow[]; total: number; page: number; pages: number;
  byStatus: { status: string; count: number }[];
  paidTotal: number;
}

const ORDER_STATUSES = [
  { value: "PENDING", label: "Menunggu", color: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
  { value: "PAID", label: "Lunas ✓", color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  { value: "CHALLENGE", label: "Diperiksa", color: "bg-orange-500/15 text-orange-300 border-orange-500/30" },
  { value: "FAILED", label: "Gagal", color: "bg-rose-500/15 text-rose-300 border-rose-500/30" },
  { value: "EXPIRED", label: "Kedaluwarsa", color: "bg-stone-500/15 text-stone-300 border-stone-500/30" },
  { value: "CANCELLED", label: "Dibatalkan", color: "bg-stone-500/15 text-stone-400 border-stone-500/30" },
  { value: "REFUNDED", label: "Refund", color: "bg-purple-500/15 text-purple-300 border-purple-500/30" },
] as const;

function OrderStatusBadge({ status }: { status: string }) {
  const s = ORDER_STATUSES.find((x) => x.value === status);
  return (
    <Badge variant="outline" className={s?.color ?? "bg-stone-500/15 text-stone-300 border-stone-500/30"}>
      {s?.label ?? status}
    </Badge>
  );
}

const PROVIDER_LABEL: Record<string, string> = {
  midtrans: "Midtrans",
  tripay: "Tripay",
  demo: "Uji coba",
  manual: "Manual",
};

export function OrdersTab() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(query); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [query]);

  const url = useMemo(() => {
    const p = new URLSearchParams({ query: debounced, status, page: String(page) });
    return `/api/admin/orders?${p.toString()}`;
  }, [debounced, status, page]);

  const { data, loading, reload } = useAdminData<OrdersData>(url, { intervalMs: 15000 });

  async function changeStatus(row: OrderRow, next: string) {
    const res = await apiPatch("/api/admin/orders", { orderNo: row.orderNo, status: next });
    if (!res.ok) {
      toast({ title: "Gagal mengubah status", description: res.error, variant: "destructive" });
    } else {
      toast({ title: `Pesanan ${row.orderNo} → ${ORDER_STATUSES.find((s) => s.value === next)?.label ?? next}` });
      triggerRefresh();
    }
    reload();
  }

  return (
    <div className="space-y-4">
      {/* Pemulihan checkout terbengkalai (langkah 12) */}
      <RecoveryPanel />

      {/* Metrik pendapatan */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="border-emerald-700/40 bg-emerald-950/40 shadow-none">
          <CardContent className="p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300/80">
              <Wallet aria-hidden className="h-3.5 w-3.5" /> Total Pendapatan (Lunas)
            </p>
            <p className="mt-1.5 text-2xl font-extrabold text-emerald-300">{formatRp(data?.paidTotal ?? 0)}</p>
          </CardContent>
        </Card>
        {(["PAID", "PENDING", "FAILED"] as const).map((s) => (
          <Card key={s} className="border-stone-800 bg-stone-900/50 shadow-none">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-stone-400">
                {ORDER_STATUSES.find((x) => x.value === s)?.label}
              </p>
              <p className="mt-1.5 text-2xl font-extrabold text-stone-100">
                {data?.byStatus.find((b) => b.status === s)?.count ?? 0}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter bar */}
      <Card className="border-stone-800 bg-stone-900/50 shadow-none">
        <CardContent className="flex flex-wrap items-center gap-2 p-3">
          <div className="relative min-w-[180px] flex-1">
            <Search aria-hidden className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari no. pesanan / nama / WA / layanan…"
              className="min-h-[40px] border-stone-700 bg-stone-950/70 pl-9 text-sm text-stone-100 placeholder:text-stone-600"
              aria-label="Cari pesanan"
            />
          </div>
          <Select value={status} onValueChange={(v) => { setStatus(v === "all" ? "" : v); setPage(1); }}>
            <SelectTrigger className="min-h-[40px] w-[160px] border-stone-700 bg-stone-950/70 text-sm text-stone-100" aria-label="Filter status pesanan">
              <SelectValue placeholder="Semua status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua status</SelectItem>
              {ORDER_STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Tabel */}
      <Card className="border-stone-800 bg-stone-900/50 shadow-none">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4"><SkeletonRows rows={6} /></div>
          ) : !data || data.rows.length === 0 ? (
            <EmptyState
              title="Belum ada pesanan"
              sub="Pesanan dari halaman checkout akan muncul di sini secara otomatis — termasuk status pembayaran real-time dari gateway."
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-stone-800 hover:bg-transparent">
                      <TableHead className="text-stone-400">Pesanan</TableHead>
                      <TableHead className="text-stone-400">Layanan</TableHead>
                      <TableHead className="text-stone-400">Nilai</TableHead>
                      <TableHead className="text-stone-400">Klien</TableHead>
                      <TableHead className="text-stone-400">Jalur</TableHead>
                      <TableHead className="text-stone-400">Status</TableHead>
                      <TableHead className="text-stone-400">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.rows.map((o) => (
                      <TableRow key={o.id} className="border-stone-800/70">
                        <TableCell className="font-mono text-xs text-stone-200">
                          {o.orderNo}
                          <p className="mt-0.5 font-sans text-[10px] text-stone-500">{relativeTime(o.createdAt)}</p>
                        </TableCell>
                        <TableCell className="max-w-[180px] truncate text-sm text-stone-200">{o.serviceName}</TableCell>
                        <TableCell className="text-sm font-bold text-emerald-300">{formatRp(o.amount)}</TableCell>
                        <TableCell className="text-sm text-stone-200">
                          {o.customerName}
                          <p className="text-[10px] text-stone-500">{o.customerPhone}</p>
                        </TableCell>
                        <TableCell className="text-xs text-stone-300">
                          {PROVIDER_LABEL[o.provider] ?? o.provider}
                          {o.paymentMethod && <p className="text-[10px] text-stone-500">{o.paymentMethod}</p>}
                        </TableCell>
                        <TableCell>
                          <Select value={o.status} onValueChange={(v) => changeStatus(o, v)}>
                            <SelectTrigger className="h-8 w-[130px] border-stone-700 bg-stone-950/70 text-xs text-stone-100" aria-label="Ubah status pesanan">
                              <OrderStatusBadge status={o.status} />
                            </SelectTrigger>
                            <SelectContent>
                              {ORDER_STATUSES.map((s) => (
                                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <a
                            href={waLink(o.customerPhone, `Halo ${o.customerName}, terkait pesanan ${o.orderNo} (${o.serviceName}) — terima kasih sudah memesan di PusatPerizinan.com!`)}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Hubungi ${o.customerName} via WhatsApp`}
                          >
                            <Button size="sm" variant="outline" className="h-8 border-stone-700 px-2 text-stone-300 hover:bg-stone-800">
                              <Phone aria-hidden className="h-3.5 w-3.5" />
                            </Button>
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Paginasi */}
              {data.pages > 1 && (
                <div className="flex items-center justify-between border-t border-stone-800 px-4 py-3">
                  <p className="text-xs text-stone-500">
                    {data.total} pesanan · hal. {data.page}/{data.pages}
                  </p>
                  <div className="flex gap-1.5">
                    <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="h-8 border-stone-700 text-stone-300">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)} className="h-8 border-stone-700 text-stone-300">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
