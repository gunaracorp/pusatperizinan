"use client";

import { useState } from "react";
import {
  CalendarDays, CalendarX2, CheckCircle2, Eye, FileText, Loader2,
  PencilLine, Plus, RefreshCw, RotateCcw, Save, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiPatch, useAdminData } from "@/components/admin/shared";
import { triggerRefresh } from "@/components/admin/shared";
import type { CmsPost } from "@/lib/blog-cms";
import { TOPIC_BANK } from "@/lib/editorial-topics";
import type { EditorialBoard, EditorialSlotView, EditorialPillar } from "@/lib/editorial-types";

// ============================================================
// MISSION CONTROL — Kalender Editorial (langkah 35)
// Ritme 3×/minggu: Senin=Panduan · Rabu=Regulasi · Jumat=Tips Pajak.
// 12 minggu digulir otomatis dari bank topik; admin bisa menulis
// draft (ter-prefill), mengganti topik, atau melewati slot.
// ============================================================

const PILLAR_STYLE: Record<EditorialPillar, string> = {
  PANDUAN: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  REGULASI: "bg-sky-500/15 text-sky-300 border border-sky-500/30",
  PAJAK: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
};

const STATUS_META: Record<string, { label: string; cls: string }> = {
  PLANNED: { label: "Rencana", cls: "bg-stone-700/40 text-stone-300 border border-stone-600" },
  DRAFTED: { label: "Draft", cls: "bg-amber-500/15 text-amber-300 border border-amber-500/30" },
  PUBLISHED: { label: "Terbit", cls: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30" },
  SKIPPED: { label: "Dilewati", cls: "bg-rose-500/10 text-rose-300 border border-rose-500/30" },
};

interface EditFields { title: string; focusKeyword: string; keywords: string; notes: string }

/** Pilih topik dari bank untuk menggantikan slot (dikelompokkan per pilar) */
function TopicPicker({ pillar, onPick, onClose }: {
  pillar: EditorialPillar;
  onPick: (t: { title: string; focusKeyword: string; keywords: string; notes: string }) => void;
  onClose: () => void;
}) {
  const topics = TOPIC_BANK[pillar];
  return (
    <div className="mt-3 rounded-xl border border-stone-700 bg-stone-950/80 p-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-stone-300">
          Bank topik {pillar} ({topics.length} usulan)
        </p>
        <button onClick={onClose} aria-label="Tutup pilihan topik"
          className="rounded p-1 text-stone-500 hover:bg-stone-800 hover:text-stone-300">
          <X aria-hidden className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-2 max-h-52 space-y-1.5 overflow-y-auto pr-1">
        {topics.map((t) => (
          <button
            key={t.title}
            onClick={() => { onPick(t); onClose(); }}
            className="block w-full rounded-lg border border-stone-800 bg-stone-900/60 p-2.5 text-left transition-colors hover:border-emerald-500/40 hover:bg-stone-900"
          >
            <p className="text-xs font-semibold leading-snug text-stone-200">{t.title}</p>
            <p className="mt-1 truncate text-[11px] text-stone-500">
              kw: {t.focusKeyword} · {t.notes}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export function EditorialBoard({ posts, onOpenEditor }: {
  posts: CmsPost[] | null;
  onOpenEditor: (p: CmsPost) => void;
}) {
  const { toast } = useToast();
  const { data, loading, reload } = useAdminData<EditorialBoard>("/api/admin/editorial");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<EditFields | null>(null);
  const [pickerSlot, setPickerSlot] = useState<string | null>(null);

  async function startDraft(slot: EditorialSlotView) {
    setBusyId(slot.id);
    try {
      const res = await fetch("/api/admin/editorial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start-draft", id: slot.id }),
      });
      const json = await res.json();
      if (res.status === 401) { window.location.reload(); return; }
      if (json.success) {
        const post = json.data.post as CmsPost;
        toast({
          title: "Draft dibuat dari kalender ✓",
          description: `Judul, kategori "${slot.category}", kata kunci & kerangka H2 sudah terisi — lanjutkan di editor.`,
        });
        await reload();
        triggerRefresh();
        onOpenEditor(post);
      } else {
        toast({ title: "Gagal membuat draft", description: json.error });
      }
    } finally {
      setBusyId(null);
    }
  }

  async function patchSlot(id: string, body: Record<string, unknown>, okTitle: string) {
    setBusyId(id);
    try {
      const r = await apiPatch("/api/admin/editorial", { id, ...body });
      if (r.ok) {
        toast({ title: okTitle });
        await reload();
      } else {
        toast({ title: "Gagal", description: r.error });
      }
    } finally {
      setBusyId(null);
    }
  }

  function beginEdit(slot: EditorialSlotView) {
    setEditingId(slot.id);
    setPickerSlot(null);
    setEditFields({
      title: slot.title,
      focusKeyword: slot.focusKeyword ?? "",
      keywords: slot.keywords ?? "",
      notes: slot.notes ?? "",
    });
  }

  async function saveEdit(id: string) {
    if (!editFields?.title.trim()) {
      toast({ title: "Judul topik wajib diisi" });
      return;
    }
    await patchSlot(id, { action: "update", ...editFields }, "Topik diperbarui ✓");
    setEditingId(null);
    setEditFields(null);
  }

  /** Lanjutkan draft: cari post yang tertaut di daftar CMS yang sudah dimuat */
  function openLinkedPost(slot: EditorialSlotView) {
    if (!slot.post) return;
    const p = (posts ?? []).find((x) => x.id === slot.post!.id);
    if (p) {
      onOpenEditor(p);
    } else {
      window.open(`/blog/${slot.post.slug}`, "_blank");
    }
  }

  const s = data?.stats;

  return (
    <div className="space-y-5">
      {/* Ringkasan */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Rencana", value: s?.planned ?? 0, icon: CalendarDays },
          { label: "Draft berjalan", value: s?.drafted ?? 0, icon: PencilLine },
          { label: "Terbit dari kalender", value: s?.published ?? 0, icon: CheckCircle2 },
          { label: "Dilewati", value: s?.skipped ?? 0, icon: CalendarX2 },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-2xl border border-stone-800 bg-stone-900/40 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-stone-500">{c.label}</p>
                <Icon aria-hidden className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-1 text-2xl font-extrabold">{c.value}</p>
            </div>
          );
        })}
      </div>

      {/* Info cara kerja */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-4 text-xs leading-relaxed text-stone-500">
        <strong className="text-stone-300">Ritme 3×/minggu:</strong> Senin = <span className="text-emerald-300">Panduan</span> ·
        Rabu = <span className="text-sky-300">Regulasi (berita)</span> ·
        Jumat = <span className="text-amber-300">Tips Pajak</span>. Kalender 12 minggu digulir otomatis dari bank topik kurasi —
        klik <strong className="text-emerald-400">Tulis draft</strong> untuk membuat artikel CMS yang sudah terisi judul, kategori,
        kata kunci, sudut pandang, dan kerangka H2. Slot yang artikelnya dihapus akan kembali menjadi rencana.
      </div>

      {/* Minggu */}
      {loading && data === null && (
        <p className="flex items-center gap-2 p-6 text-sm text-stone-500">
          <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> Memuat kalender…
        </p>
      )}
      <div className="space-y-4">
        {(data?.weeks ?? []).map((week) => {
          const counts = week.slots.reduce<Record<string, number>>((acc, sl) => {
            acc[sl.status] = (acc[sl.status] ?? 0) + 1;
            return acc;
          }, {});
          return (
            <section
              key={week.weekStart}
              className={`rounded-2xl border bg-stone-900/40 p-4 ${
                week.isCurrent ? "border-emerald-500/40 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.15)]" : "border-stone-800"
              } ${week.isPast ? "opacity-60" : ""}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold text-stone-100">Minggu {week.label}</h3>
                {week.isCurrent && (
                  <Badge className="rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px]">
                    MINGGU INI
                  </Badge>
                )}
                <span className="ml-auto flex flex-wrap items-center gap-1.5 text-[10px] text-stone-500">
                  {counts.PUBLISHED ? <span className="text-emerald-400">{counts.PUBLISHED} terbit</span> : null}
                  {counts.DRAFTED ? <span className="text-amber-400">{counts.DRAFTED} draft</span> : null}
                  {counts.PLANNED ? <span>{counts.PLANNED} rencana</span> : null}
                  {counts.SKIPPED ? <span className="text-rose-400">{counts.SKIPPED} dilewati</span> : null}
                  <Button variant="ghost" size="icon" onClick={() => void reload()} className="h-6 w-6 text-stone-500 hover:text-stone-300"
                    aria-label="Muat ulang kalender"><RefreshCw aria-hidden className="h-3 w-3" /></Button>
                </span>
              </div>

              <div className="mt-3 space-y-2">
                {week.slots.map((slot) => {
                  const st = STATUS_META[slot.status];
                  const editing = editingId === slot.id && editFields;
                  return (
                    <div key={slot.id} className="rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                      <div className="flex flex-wrap items-start gap-3">
                        {/* Chip hari + pilar */}
                        <div className="flex w-full shrink-0 flex-wrap items-center gap-1.5 sm:w-auto sm:flex-col sm:items-stretch">
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-stone-700 bg-stone-900 px-2 py-1 text-xs font-bold text-stone-200">
                            {slot.day}
                            <span className="font-normal text-stone-500">{slot.date.slice(8)}/{slot.date.slice(5, 7)}</span>
                          </span>
                          <span className={`rounded-lg px-2 py-1 text-[10px] font-semibold ${PILLAR_STYLE[slot.pillar]}`}>
                            {slot.pillarLabel}
                          </span>
                        </div>

                        {/* Isi topik */}
                        <div className="min-w-0 flex-1">
                          {editing ? (
                            <div className="space-y-2">
                              <div className="space-y-1">
                                <Label className="text-stone-400">Judul kerja</Label>
                                <Input value={editFields.title}
                                  onChange={(e) => setEditFields({ ...editFields, title: e.target.value })}
                                  className="border-stone-700 bg-stone-950 text-sm font-semibold text-stone-100" />
                              </div>
                              <div className="grid gap-2 sm:grid-cols-2">
                                <div className="space-y-1">
                                  <Label className="text-stone-400">Kata kunci fokus</Label>
                                  <Input value={editFields.focusKeyword}
                                    onChange={(e) => setEditFields({ ...editFields, focusKeyword: e.target.value })}
                                    className="border-stone-700 bg-stone-950 text-xs text-stone-100" />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-stone-400">Kata kunci tambahan (koma)</Label>
                                  <Input value={editFields.keywords}
                                    onChange={(e) => setEditFields({ ...editFields, keywords: e.target.value })}
                                    className="border-stone-700 bg-stone-950 text-xs text-stone-100" />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-stone-400">Sudut pandang / catatan</Label>
                                <Textarea rows={2} value={editFields.notes}
                                  onChange={(e) => setEditFields({ ...editFields, notes: e.target.value })}
                                  className="border-stone-700 bg-stone-950 text-xs text-stone-100" />
                              </div>
                            </div>
                          ) : (
                            <>
                              <p className={`text-sm font-bold leading-snug ${slot.status === "SKIPPED" ? "text-stone-500 line-through" : "text-stone-100"}`}>
                                {slot.title}
                              </p>
                              {slot.notes && (
                                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-500">{slot.notes}</p>
                              )}
                              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                                <span className={st.cls + " rounded-full px-2 py-0.5 font-semibold"}>{st.label}</span>
                                {slot.focusKeyword && <span className="font-mono">kw: {slot.focusKeyword}</span>}
                                {slot.post && (
                                  <span className="font-mono text-emerald-500/80">/blog/{slot.post.slug}</span>
                                )}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Aksi */}
                        <div className="flex w-full shrink-0 flex-wrap gap-2 sm:w-auto">
                          {editing ? (
                            <>
                              <Button size="sm" onClick={() => void saveEdit(slot.id)} disabled={busyId === slot.id}
                                className="bg-emerald-600 font-bold hover:bg-emerald-500">
                                {busyId === slot.id ? <Loader2 aria-hidden className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Save aria-hidden className="mr-1.5 h-3.5 w-3.5" />}
                                Simpan
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => { setEditingId(null); setEditFields(null); }}
                                className="border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800">
                                Batal
                              </Button>
                            </>
                          ) : slot.status === "PLANNED" && (
                            <>
                              <Button size="sm" onClick={() => void startDraft(slot)} disabled={busyId === slot.id}
                                className="bg-emerald-600 font-bold hover:bg-emerald-500">
                                {busyId === slot.id ? <Loader2 aria-hidden className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Plus aria-hidden className="mr-1.5 h-3.5 w-3.5" />}
                                Tulis draft
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => beginEdit(slot)}
                                className="border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800">
                                <PencilLine aria-hidden className="mr-1.5 h-3.5 w-3.5" /> Edit topik
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => setPickerSlot(pickerSlot === slot.id ? null : slot.id)}
                                className="border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800"
                                aria-expanded={pickerSlot === slot.id}>
                                <FileText aria-hidden className="mr-1.5 h-3.5 w-3.5" /> Dari bank
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => void patchSlot(slot.id, { action: "skip" }, "Slot dilewati")}
                                disabled={busyId === slot.id}
                                className="border-stone-700 bg-stone-900/60 text-stone-400 hover:bg-rose-500/10 hover:text-rose-300">
                                <CalendarX2 aria-hidden className="h-3.5 w-3.5" aria-label="Lewati slot" />
                              </Button>
                            </>
                          )}
                          {slot.status === "DRAFTED" && (
                            <>
                              <Button size="sm" onClick={() => openLinkedPost(slot)}
                                className="bg-amber-600 font-bold hover:bg-amber-500">
                                <PencilLine aria-hidden className="mr-1.5 h-3.5 w-3.5" /> Lanjutkan draft
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => window.open(`/blog/${slot.post?.slug}`, "_blank")}
                                className="border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800">
                                <Eye aria-hidden className="mr-1.5 h-3.5 w-3.5" /> Pratinjau
                              </Button>
                            </>
                          )}
                          {slot.status === "PUBLISHED" && (
                            <>
                              <Button size="sm" onClick={() => openLinkedPost(slot)}
                                className="border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">
                                <PencilLine aria-hidden className="mr-1.5 h-3.5 w-3.5" /> Edit
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => window.open(`/blog/${slot.post?.slug}`, "_blank")}
                                className="border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800">
                                <Eye aria-hidden className="mr-1.5 h-3.5 w-3.5" /> Lihat
                              </Button>
                            </>
                          )}
                          {slot.status === "SKIPPED" && (
                            <>
                              <Button variant="outline" size="sm" onClick={() => void patchSlot(slot.id, { action: "unskip" }, "Slot kembali jadi rencana")}
                                disabled={busyId === slot.id}
                                className="border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800">
                                <RotateCcw aria-hidden className="mr-1.5 h-3.5 w-3.5" /> Batalkan
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => beginEdit(slot)}
                                className="border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800">
                                <PencilLine aria-hidden className="mr-1.5 h-3.5 w-3.5" /> Edit topik
                              </Button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Pemilih topik dari bank */}
                      {pickerSlot === slot.id && !editing && slot.status === "PLANNED" && (
                        <TopicPicker
                          pillar={slot.pillar}
                          onClose={() => setPickerSlot(null)}
                          onPick={(t) => {
                            setPickerSlot(null);
                            setEditFields({ title: t.title, focusKeyword: t.focusKeyword, keywords: t.keywords, notes: t.notes });
                            setEditingId(slot.id);
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
