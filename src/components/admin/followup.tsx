"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  EmptyState, SkeletonRows, useAdminData, apiPatch, compactRp,
  relativeTime, triggerRefresh,
} from "@/components/admin/shared";
import { CheckCheck, Clock3, PlayCircle, Radio } from "lucide-react";

// ============================================================
// Seksi "⏰ Follow-up 24 Jam" — langkah 6 ROADMAP-99 (v1.14.0)
// Antrean lead status NEW yang belum dibalas ≥24 jam, dengan
// tombol WA 1-klik (pesan ter-dispatch per step) + pemicu sweep
// otomatis. Sequence: 24 jam → 48 jam → 72 jam; berhenti sendiri
// begitu lead dihubungi (status ≠ NEW).
// ============================================================

interface Candidate {
  id: string; name: string; whatsapp: string; businessType: string;
  package: string | null; estimatedValue: number; source: string;
  ageHours: number; nextStep: number; stepsSent: number[];
  prefill: string; createdAt: string;
}
interface QueueData {
  candidates: Candidate[];
  stats: { due: number; pipelineValue: number; completed: number; activeNew: number };
  channels: { telegram: boolean; whatsappGateway: boolean; leadAutoSend: boolean };
}

const STEP_LABEL: Record<number, string> = { 1: "24 jam", 2: "48 jam", 3: "72 jam" };

export function FollowUpPanel() {
  const { toast } = useToast();
  const [running, setRunning] = useState(false);
  const { data, loading, reload } = useAdminData<QueueData>("/api/admin/followup", { intervalMs: 60_000 });

  async function runSweep() {
    setRunning(true);
    try {
      const res = await fetch("/api/cron/followup", { method: "POST" });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Sweep gagal");
      const d = json.data;
      if (d.skippedNoChannel) {
        toast({
          title: "Kanal belum aktif",
          description: "Pasang Telegram (gratis, 2 menit) atau gateway WA di tab Notifikasi agar follow-up terkirim.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sweep selesai",
          description: `${d.scanned} lead diproses · reminder admin ${d.adminSent} ✓ / ${d.adminFailed} ✕ · ke lead ${d.leadSent} ✓ / ${d.leadFailed} ✕`,
        });
      }
      reload();
      triggerRefresh();
    } catch (e) {
      toast({ title: "Sweep gagal", description: e instanceof Error ? e.message : "", variant: "destructive" });
    } finally {
      setRunning(false);
    }
  }

  async function markContacted(c: Candidate) {
    const res = await apiPatch("/api/admin/leads", { id: c.id, status: "CONTACTED" });
    if (!res.ok) {
      toast({ title: "Gagal ubah status", description: res.error, variant: "destructive" });
    } else {
      toast({ title: `Lead "${c.name}" → CONTACTED`, description: "Sequence follow-up otomatis berhenti untuk lead ini." });
      reload();
      triggerRefresh();
    }
  }

  const ch = data?.channels;

  return (
    <Card className="border-emerald-900/60 bg-emerald-950/20 shadow-none">
      <CardContent className="space-y-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Clock3 aria-hidden className="h-5 w-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-semibold text-stone-100">Follow-up 24 Jam — sequence otomatis 3 langkah</h3>
              <p className="text-xs text-stone-500">
                {data
                  ? <>{data.stats.due} lead jatuh tempo · <span className="font-semibold text-emerald-300">{compactRp(data.stats.pipelineValue)}</span> nilai mengendap · {data.stats.completed} selesai sequence · {data.stats.activeNew} lead aktif</>
                  : "Memuat antrean…"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 text-[11px] text-stone-500 sm:flex" aria-label="Status kanal">
              <Radio aria-hidden className={`h-3.5 w-3.5 ${ch?.telegram ? "text-emerald-400" : "text-stone-600"}`} />
              Telegram {ch?.telegram ? "aktif" : "off"} ·
              <Radio aria-hidden className={`h-3.5 w-3.5 ${ch?.whatsappGateway ? "text-emerald-400" : "text-stone-600"}`} />
              Gateway WA {ch?.whatsappGateway ? "aktif" : "off"}
              {ch?.leadAutoSend ? " · auto-kirim ke lead ON" : ""}
            </span>
            <Button onClick={runSweep} disabled={running} size="sm"
              className="bg-emerald-500 font-semibold text-stone-950 hover:bg-emerald-400"
              aria-label="Jalankan sweep follow-up sekarang">
              <PlayCircle aria-hidden className="mr-1.5 h-4 w-4" />
              {running ? "Menjalankan…" : "Jalankan Sweep"}
            </Button>
          </div>
        </div>

        {loading && !data ? (
          <SkeletonRows rows={2} />
        ) : !data || data.candidates.length === 0 ? (
          <EmptyState
            title="Tidak ada lead yang jatuh tempo"
            sub="Lead status NEW berumur ≥24 jam otomatis muncul di sini. Sweep jalan tiap kali cron /api/cron/followup dipanggil."
          />
        ) : (
          <div className="overflow-x-auto rounded-md border border-stone-800">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Lead</TableHead>
                  <TableHead className="text-stone-400">Minat</TableHead>
                  <TableHead className="text-stone-400">Nilai</TableHead>
                  <TableHead className="text-stone-400">Umur / Step</TableHead>
                  <TableHead className="text-right text-stone-400">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.candidates.map((c) => (
                  <TableRow key={c.id} className="border-stone-800/80">
                    <TableCell>
                      <p className="font-semibold text-stone-100">{c.name}</p>
                      <p className="text-xs text-stone-500">+{c.whatsapp}</p>
                    </TableCell>
                    <TableCell className="text-sm text-stone-300">
                      {c.package || "—"}
                      <p className="text-xs text-stone-500">{c.businessType}</p>
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-semibold text-emerald-300">
                      {c.estimatedValue > 0 ? compactRp(c.estimatedValue) : "—"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-xs text-stone-400">
                      {c.ageHours} jam · step <span className="font-semibold text-amber-300">{c.nextStep}/3</span>
                      <p className="text-stone-600">{relativeTime(c.createdAt)} · kejar {STEP_LABEL[c.nextStep]}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1.5">
                        <a
                          href={c.prefill}
                          target="_blank" rel="noopener noreferrer"
                          onClick={() => { toast({ title: "WhatsApp terbuka", description: `Pesan step ${c.nextStep} sudah terisi — tinggal tekan kirim.` }); }}
                          className="inline-flex h-8 items-center rounded-md bg-emerald-500/10 px-2.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
                          aria-label={`Chat WhatsApp ${c.name} — pesan step ${c.nextStep} siap kirim`}
                          title="Pesan step sudah ter-dispatch, tinggal kirim"
                        >
                          💬 Chat (step {c.nextStep})
                        </a>
                        <Button
                          variant="ghost" size="sm"
                          onClick={() => markContacted(c)}
                          className="h-8 px-2 text-xs text-stone-400 hover:text-stone-100"
                          aria-label={`Tandai ${c.name} sudah dihubungi`}
                          title="Sudah dihubungi → sequence berhenti"
                        >
                          <CheckCheck aria-hidden className="mr-1 h-3.5 w-3.5" />
                          Dihubungi
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <p className="text-[11px] leading-relaxed text-stone-600">
          Sequence otomatis: step 1 (24 jam) → step 2 (48 jam) → step 3 (72 jam, pesan terakhir).
          Kirim ke lead langsung hanya bila gateway WA aktif; reminder admin via Telegram/WA selalu berisi link 1-klik.
          Cron produksi: <code className="text-stone-500">GET /api/cron/followup</code> dengan header <code className="text-stone-500">Authorization: Bearer $CRON_SECRET</code> setiap jam.
        </p>
      </CardContent>
    </Card>
  );
}
