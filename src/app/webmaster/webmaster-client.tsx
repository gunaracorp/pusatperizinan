"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  SEARCH_ENGINES,
  SEARCH_ENGINE_STATS,
  GSC_STEPS,
  GSC_LINKS,
  INDEXNOW_ENGINES,
  type SearchEngine,
  type EngineTier,
} from "@/lib/webmaster-tools";
import {
  CheckCircle2,
  Circle,
  Copy,
  ExternalLink,
  Globe2,
  Info,
  ListChecks,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

// ============================================================
// WEBMASTER TOOLS MASTER — UI INTERAKTIF
// ============================================================
// 1. Jawaban "berapa mesin pencari di dunia?" (200+, 6 kategori)
// 2. Kesiapan situs (dicek nyata server-side)
// 3. GOOGLE dulu — panduan 5 langkah + 15 sitemap siap salin
// 4. 26 mesin terkurasi dalam 4 tier + checklist tersimpan lokal
// 5. Alat IndexNow (generator kunci + ping instan via /api/indexnow)
// ============================================================

const STORAGE_KEY = "pp-wm-status-v1";

interface SiteCheck {
  label: string;
  ok: boolean;
  detail: string;
}
interface SitemapUrl {
  id: string;
  label: string;
  url: string;
}

interface Props {
  verifications: Record<string, string>;
  siteChecks: SiteCheck[];
  sitemapUrls: SitemapUrl[];
  indexNowConfigured: boolean;
  indexNowKeyUrl: string | null;
}

const TIER_META: Record<
  EngineTier,
  { label: string; desc: string; emoji: string }
> = {
  1: { label: "Tier 1 — Wajib", desc: "Menutupi 99%+ pencarian dunia", emoji: "🔥" },
  2: { label: "Tier 2 — Regional", desc: "Wajib bila menarget pasar negara itu", emoji: "🌏" },
  3: { label: "Tier 3 — Privasi & Independen", desc: "Sebagian besar otomatis ikut Bing/Google", emoji: "🛡️" },
  4: { label: "Tier 4 — AI & GEO", desc: "Mesin jawaban AI: sumber trafik baru", emoji: "🤖" },
};

function priorityBadgeClass(p: string): string {
  switch (p) {
    case "P0":
      return "bg-red-100 text-red-700 border-red-200";
    case "P1":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "P2":
      return "bg-slate-100 text-slate-700 border-slate-200";
    default:
      return "bg-slate-50 text-slate-500 border-slate-200";
  }
}

function CopyButton({ text, small }: { text: string; small?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label="Salin ke clipboard"
      className={small ? "h-7 px-2 text-xs" : ""}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard bisa diblokir di beberapa browser */
        }
      }}
    >
      {copied ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {copied ? "Tersalin" : "Salin"}
    </Button>
  );
}

function EngineCard({
  engine,
  verifications,
  done,
  onToggle,
}: {
  engine: SearchEngine;
  verifications: Record<string, string>;
  done: boolean;
  onToggle: () => void;
}) {
  const verificationCode = engine.envKey
    ? (
        {
          NEXT_PUBLIC_GSC_VERIFICATION: verifications.google,
          NEXT_PUBLIC_BING_VERIFICATION: verifications.bing,
          NEXT_PUBLIC_YANDEX_VERIFICATION: verifications.yandex,
          NEXT_PUBLIC_BAIDU_VERIFICATION: verifications.baidu,
          NEXT_PUBLIC_NAVER_VERIFICATION: verifications.naver,
          NEXT_PUBLIC_SEZNAM_VERIFICATION: verifications.seznam,
        } as Record<string, string | undefined>
      )[engine.envKey]
    : undefined;

  const metaTag = engine.metaName
    ? `<meta name="${engine.metaName}" content="${verificationCode ?? "KODE_DARI_PORTAL"}" />`
    : null;

  return (
    <Card
      className={`flex flex-col transition-all ${done ? "border-emerald-300 bg-emerald-50/40" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="flex flex-wrap items-center gap-2 text-base">
              <span className="text-xl" aria-hidden>
                {engine.emoji}
              </span>
              <span className="truncate">{engine.name}</span>
              <span aria-hidden>{engine.flag}</span>
            </CardTitle>
            <CardDescription className="mt-1">
              {engine.region} · {engine.indexKind}
            </CardDescription>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-1.5">
            <Badge variant="outline" className="text-xs">
              {engine.share}
            </Badge>
            <Badge
              variant="outline"
              className={`text-xs font-semibold ${priorityBadgeClass(engine.priority)}`}
            >
              {engine.priority}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 pt-0">
        <p className="text-sm leading-relaxed text-slate-600">{engine.note}</p>

        <ul className="space-y-1.5">
          {engine.methods.map((m) => (
            <li key={m} className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
              <span>{m}</span>
            </li>
          ))}
        </ul>

        {engine.indexNow ? (
          <Badge variant="outline" className="w-fit border-amber-200 bg-amber-50 text-xs text-amber-700">
            <Zap className="mr-1 h-3 w-3" /> IndexNow didukung — ping instan
          </Badge>
        ) : null}

        {metaTag ? (
          <div className="rounded-lg border bg-slate-50 p-2.5">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-700">
                Tag verifikasi
              </span>
              {verificationCode ? (
                <Badge className="border-emerald-200 bg-emerald-100 text-xs text-emerald-700">
                  ✓ Aktif di &lt;head&gt;
                </Badge>
              ) : (
                <Badge className="border-amber-200 bg-amber-100 text-xs text-amber-700">
                  Belum di-set (env)
                </Badge>
              )}
            </div>
            <code className="block break-all text-[11px] leading-relaxed text-slate-700">
              {metaTag}
            </code>
            <div className="mt-2 flex items-center gap-2">
              <CopyButton text={metaTag} small />
              {engine.envKey ? (
                <span className="text-[11px] text-slate-500">
                  env: <code>{engine.envKey}</code>
                </span>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          {engine.portal ? (
            <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <a href={engine.portal} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3.5 w-3.5" />
                {engine.portalLabel ?? "Buka Portal"}
              </a>
            </Button>
          ) : null}
          {engine.submit ? (
            <Button asChild size="sm" variant="outline">
              <a href={engine.submit} target="_blank" rel="noopener noreferrer">
                <Send className="mr-1 h-3.5 w-3.5" />
                Submit URL
              </a>
            </Button>
          ) : null}
          <Button
            size="sm"
            type="button"
            variant={done ? "default" : "ghost"}
            className={done ? "bg-emerald-600 hover:bg-emerald-700" : "text-slate-600"}
            onClick={onToggle}
            aria-pressed={done}
          >
            {done ? (
              <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
            ) : (
              <Circle className="mr-1 h-3.5 w-3.5" />
            )}
            {done ? "Terverifikasi ✓" : "Tandai Terverifikasi"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function WebmasterClient({
  verifications,
  siteChecks,
  sitemapUrls,
  indexNowConfigured,
  indexNowKeyUrl,
}: Props) {
  // ── checklist tersimpan di localStorage (tanpa mismatch SSR) ──
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* abaikan */
    }
    setLoaded(true);
  }, []);

  const toggle = (id: string) =>
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* abaikan */
      }
      return next;
    });

  const resetAll = () => {
    setDone({});
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* abaikan */
    }
  };

  const verifiedCount = SEARCH_ENGINES.filter((e) => done[e.id]).length;
  const pct = Math.round((verifiedCount / SEARCH_ENGINES.length) * 100);
  const tierCount = (t: EngineTier) =>
    SEARCH_ENGINES.filter((e) => e.tier === t).length;
  const tierDone = (t: EngineTier) =>
    SEARCH_ENGINES.filter((e) => e.tier === t && done[e.id]).length;

  // ── IndexNow tool state ──
  const [generatedKey, setGeneratedKey] = useState("");
  const [urlText, setUrlText] = useState("https://pusatperizinan.com\n");
  const [pinging, setPinging] = useState(false);
  const [pingResult, setPingResult] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  const generateKey = () => {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    setGeneratedKey(
      Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
    );
  };

  const pingIndexNow = async () => {
    const urls = urlText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!urls.length) {
      setPingResult({ ok: false, message: "Tulis minimal satu URL dulu." });
      return;
    }
    setPinging(true);
    setPingResult(null);
    try {
      const res = await fetch("/api/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };
      setPingResult({
        ok: Boolean(data.ok),
        message: data.message ?? data.error ?? `HTTP ${res.status}`,
      });
    } catch {
      setPingResult({
        ok: false,
        message: "Gagal menghubungi /api/indexnow — pastikan dev server jalan.",
      });
    } finally {
      setPinging(false);
    }
  };

  const exportChecklist = () =>
    SEARCH_ENGINES.map(
      (e) =>
        `- [${done[e.id] ? "x" : " "}] ${e.name} (${e.region}) — ${done[e.id] ? "TERVERIFIKASI" : `belum — ${e.priority}, ${e.portal ?? "tanpa portal"}`}`
    ).join("\n");

  const readyOk = siteChecks.filter((c) => c.ok).length;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 pb-10 pt-12 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-0 bg-amber-400 text-amber-950">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Alat Internal Owner
            </Badge>
            <Badge className="border-0 bg-white/15 text-white">
              <Globe2 className="mr-1 h-3.5 w-3.5" /> {SEARCH_ENGINE_STATS.totalActive} mesin pencari di dunia
            </Badge>
            <Badge className="border-0 bg-white/15 text-white">
              <ListChecks className="mr-1 h-3.5 w-3.5" /> {SEARCH_ENGINES.length} terkurasi di sini
            </Badge>
          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            🔎 Webmaster Tools Master
          </h1>
          <p className="mt-2 max-w-3xl text-emerald-50">
            Satu panel untuk verifikasi <strong>pusatperizinan.com</strong> di seluruh
            mesin pencari dunia — <strong>Google diprioritaskan</strong>, lalu Bing
            (menutupi 6+ mesin sekaligus), Yandex, mesin regional, dan mesin jawaban AI
            (GEO). Progress verifikasi tersimpan otomatis di browser Anda.
          </p>

          {/* Progress strip */}
          <div className="mt-6 rounded-xl bg-white/10 p-4 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold">
              <span>
                {loaded
                  ? `Progres verifikasi: ${verifiedCount} / ${SEARCH_ENGINES.length} mesin (${pct}%)`
                  : "Memuat progres…"}
              </span>
              <span className="text-emerald-100">
                {readyOk} / {siteChecks.length} infrastruktur situs siap
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-500"
                style={{ width: `${loaded ? pct : 0}%` }}
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progres verifikasi mesin pencari"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* ── JAWABAN: BERAPA MESIN PENCARI DI DUNIA? ── */}
        <Card className="mb-8 overflow-hidden">
          <CardHeader className="bg-slate-900 text-white">
            <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
              🌍 Ada berapa mesin pencari di dunia?
              <Badge className="bg-amber-400 text-amber-950">
                {SEARCH_ENGINE_STATS.totalActive} aktif
              </Badge>
            </CardTitle>
            <CardDescription className="text-slate-300">
              Jawaban lengkap — dan mengapa Anda hanya perlu verifikasi 3 portal inti.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SEARCH_ENGINE_STATS.categories.map((c) => (
                <div
                  key={c.label}
                  className="rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800">
                      {c.emoji} {c.label}
                    </span>
                    <span className="text-lg font-black text-emerald-600">
                      {c.count}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {c.examples}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <p className="text-sm leading-relaxed text-emerald-900">
                <strong>Intinya:</strong> {SEARCH_ENGINE_STATS.verdict} Hanya{" "}
                <strong>{SEARCH_ENGINE_STATS.independentIndex}</strong> mesin yang punya
                index &amp; crawler sendiri — sisanya &quot;meminjam&quot; hasil. Karena
                itu halaman ini menyiapkan{" "}
                <strong>{SEARCH_ENGINES.length} mesin terkurasi</strong> alih-alih 200.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── KESIAPAN SITUS ── */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              ✅ Kesiapan Situs <Badge variant="outline">{readyOk}/{siteChecks.length}</Badge>
            </CardTitle>
            <CardDescription>
              Fondasi teknis yang sudah ada — dicek langsung di server, bukan klaim.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 md:grid-cols-2">
              {siteChecks.map((c) => (
                <li
                  key={c.label}
                  className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${c.ok ? "border-emerald-200 bg-emerald-50/50" : "border-amber-200 bg-amber-50/50"}`}
                >
                  {c.ok ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  )}
                  <span className="text-slate-700">
                    {c.label}
                    <span className="mt-0.5 block font-mono text-[11px] text-slate-400">
                      {c.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ── TAB UTAMA ── */}
        <Tabs defaultValue="google" className="gap-6">
          <TabsList className="h-auto flex-wrap justify-start gap-1 bg-white p-1.5 shadow-sm">
            <TabsTrigger value="google" className="gap-1">
              🔍 Google <span className="text-[10px] font-black text-red-600">P0</span>
            </TabsTrigger>
            <TabsTrigger value="tier1">🔥 Tier 1 ({tierDone(1)}/{tierCount(1)})</TabsTrigger>
            <TabsTrigger value="tier2">🌏 Tier 2 ({tierDone(2)}/{tierCount(2)})</TabsTrigger>
            <TabsTrigger value="tier3">🛡️ Tier 3 ({tierDone(3)}/{tierCount(3)})</TabsTrigger>
            <TabsTrigger value="tier4">🤖 AI &amp; GEO ({tierDone(4)}/{tierCount(4)})</TabsTrigger>
            <TabsTrigger value="indexnow">⚡ IndexNow</TabsTrigger>
            <TabsTrigger value="progres">📋 Progres</TabsTrigger>
          </TabsList>

          {/* ===== TAB GOOGLE ===== */}
          <TabsContent value="google" className="space-y-6">
            <Card className="border-red-200 bg-gradient-to-br from-red-50 to-amber-50">
              <CardHeader>
                <CardTitle className="flex flex-wrap items-center gap-2 text-xl">
                  🔍 Google Search Console
                  <Badge className="bg-red-600 text-white">PRIORITAS #1</Badge>
                  <Badge variant="outline" className="bg-white">
                    ≈95%+ pencarian Indonesia
                  </Badge>
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Selesaikan 5 langkah ini DULU sebelum mesin lain — semua mesin kecil
                  mengikuti jejak Google/Bing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Accordion type="single" collapsible className="space-y-3">
              {GSC_STEPS.map((step, i) => (
                <AccordionItem
                  key={step.title}
                  value={`step-${i}`}
                  className="rounded-xl border bg-white px-4 shadow-sm"
                >
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">
                        {i + 1}
                      </span>
                      <span className="font-bold text-slate-800">{step.title}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-11">
                    <p className="text-sm leading-relaxed text-slate-600">{step.desc}</p>
                    <p className="rounded-lg bg-emerald-50 p-2.5 text-xs leading-relaxed text-emerald-800">
                      💡 {step.tip}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Tag verifikasi */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">🏷️ Tag verifikasi Google</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {verifications.google ? (
                  <>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      ✓ Aktif di &lt;head&gt; seluruh situs
                    </Badge>
                    <div className="flex flex-wrap items-center gap-2 rounded-lg bg-slate-50 p-3">
                      <code className="break-all text-xs text-slate-700">
                        {`<meta name="google-site-verification" content="${verifications.google}" />`}
                      </code>
                      <CopyButton
                        text={`<meta name="google-site-verification" content="${verifications.google}" />`}
                        small
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                      ⚠️ Belum di-set — salin template, isi kode dari GSC
                    </Badge>
                    <div className="flex flex-wrap items-center gap-2 rounded-lg bg-slate-50 p-3">
                      <code className="break-all text-xs text-slate-700">
                        {`<meta name="google-site-verification" content="KODE_DARI_GSC" />`}
                      </code>
                      <CopyButton
                        text={`<meta name="google-site-verification" content="KODE_DARI_GSC" />`}
                        small
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      Cara aktifkan: ambil kode di GSC (metode &quot;HTML tag&quot;) →
                      tambahkan ke <code>.env</code> baris{" "}
                      <code className="rounded bg-slate-100 px-1">
                        NEXT_PUBLIC_GSC_VERIFICATION=KODE_ANDA
                      </code>{" "}
                      → restart server. Tag otomatis muncul di seluruh 11.200+ halaman.
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Daftar sitemap */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base">
                    🗺️ 15 Sitemap siap submit ({sitemapUrls.length} baris)
                  </CardTitle>
                  <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <a href={GSC_LINKS[1].url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1 h-3.5 w-3.5" />
                      Buka GSC → Sitemaps
                    </a>
                  </Button>
                </div>
                <CardDescription>
                  Salin satu per satu ke kolom &quot;Add a new sitemap&quot; di GSC
                  (cukup path /sitemap/xxx.xml). 14 seksi = ±11.200 URL.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 space-y-1.5 overflow-y-auto pr-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar]:w-1.5">
                  {sitemapUrls.map((s) => (
                    <div
                      key={s.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2"
                    >
                      <div className="min-w-0">
                        <span className="block text-xs font-semibold text-slate-700">
                          {s.label}
                        </span>
                        <span className="block truncate font-mono text-[11px] text-slate-400">
                          {s.url}
                        </span>
                      </div>
                      <CopyButton text={s.url} small />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tautan cepat */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">🚀 Tautan cepat Google</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {GSC_LINKS.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border bg-white px-3 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    <span>
                      {l.emoji} {l.label}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  </a>
                ))}
              </CardContent>
            </Card>

            <div className="flex items-start gap-2 rounded-xl border border-sky-200 bg-sky-50 p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
              <p className="text-sm leading-relaxed text-sky-900">
                <strong>Cheat code:</strong> setelah GSC beres, buka Bing Webmaster →
                &quot;Import from Google Search Console&quot;. Sitemap, data, dan
                verifikasi Bing selesai dalam 2 menit — lalu Yahoo, DuckDuckGo, Ecosia,
                Qwant, Swisscows ikut terindeks otomatis.
              </p>
            </div>
          </TabsContent>

          {/* ===== TAB TIER ===== */}
          {([1, 2, 3, 4] as EngineTier[]).map((tier) => (
            <TabsContent key={tier} value={`tier${tier}`} className="space-y-4">
              <div className="rounded-xl border bg-white p-4 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800">
                  {TIER_META[tier].emoji} {TIER_META[tier].label}
                </h2>
                <p className="text-sm text-slate-500">{TIER_META[tier].desc}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {SEARCH_ENGINES.filter((e) => e.tier === tier).map((e) => (
                  <EngineCard
                    key={e.id}
                    engine={e}
                    verifications={verifications}
                    done={Boolean(done[e.id])}
                    onToggle={() => toggle(e.id)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}

          {/* ===== TAB INDEXNOW ===== */}
          <TabsContent value="indexnow" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
                  ⚡ IndexNow — Ping Instan
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">
                    HTTP 200 = langsung masuk antrian crawl
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Protokol open-source Microsoft+Yandex: kirim URL baru/diubah sekali →
                  langsung dibaca {INDEXNOW_ENGINES.slice(0, 6).join(", ")} +
                  lainnya. Tanpa menunggu recrawl alami (1–14 hari).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {INDEXNOW_ENGINES.map((e) => (
                    <Badge key={e} variant="outline" className="text-xs">
                      {e}
                    </Badge>
                  ))}
                </div>

                <div
                  className={`rounded-xl border p-4 ${indexNowConfigured ? "border-emerald-200 bg-emerald-50/60" : "border-amber-200 bg-amber-50/60"}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-bold text-slate-800">
                      Status kunci di server (.env INDEXNOW_KEY)
                    </span>
                    {indexNowConfigured ? (
                      <Badge className="bg-emerald-100 text-emerald-700">
                        ✓ Terkonfigurasi
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-700">Belum di-set</Badge>
                    )}
                  </div>
                  {indexNowKeyUrl ? (
                    <p className="mt-2 break-all font-mono text-xs text-slate-600">
                      File kunci: {indexNowKeyUrl} (isi = kunci — sesuai spek IndexNow)
                    </p>
                  ) : null}
                </div>

                {/* Generator kunci */}
                <div className="rounded-xl border bg-white p-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    🔑 Generator kunci (kalau perlu ganti)
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Button size="sm" variant="outline" onClick={generateKey}>
                      <RefreshCw className="mr-1 h-3.5 w-3.5" />
                      Generate kunci baru
                    </Button>
                    {generatedKey ? (
                      <>
                        <code className="rounded bg-slate-100 px-2 py-1 font-mono text-xs">
                          {generatedKey}
                        </code>
                        <CopyButton text={generatedKey} small />
                      </>
                    ) : null}
                  </div>
                  {generatedKey ? (
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      Pasang: <code className="rounded bg-slate-100 px-1">INDEXNOW_KEY={generatedKey}</code>{" "}
                      di <code>.env</code> → restart, lalu buat file statis{" "}
                      <code>public/{generatedKey}.txt</code> berisi kunci yang sama
                      (pola yang sama dengan kunci aktif saat ini). File itu bekerja di
                      ketiga mode deployment: dev, standalone, dan static export.
                    </p>
                  ) : null}
                </div>

                {/* Ping tool */}
                <div className="rounded-xl border bg-white p-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    📮 Ping URL sekarang
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Satu URL per baris (maks 10.000/request). Hanya URL
                    pusatperizinan.com yang diterima — divalidasi server-side.
                  </p>
                  <Textarea
                    value={urlText}
                    onChange={(e) => setUrlText(e.target.value)}
                    rows={4}
                    aria-label="Daftar URL untuk IndexNow"
                    className="mt-2 font-mono text-xs"
                  />
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Button
                      onClick={pingIndexNow}
                      disabled={pinging}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Send className="mr-1 h-3.5 w-3.5" />
                      {pinging ? "Mengirim…" : "Kirim ke IndexNow"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setUrlText(`${"https://pusatperizinan.com/sitemap.xml"}\nhttps://pusatperizinan.com/kepatuhan-pro\n`)
                      }
                    >
                      Isi contoh
                    </Button>
                  </div>
                  {pingResult ? (
                    <div
                      className={`mt-3 rounded-lg border p-3 text-sm ${pingResult.ok ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"}`}
                      role="status"
                    >
                      {pingResult.message}
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== TAB PROGRES ===== */}
          <TabsContent value="progres" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📋 Checklist Verifikasi Lengkap</CardTitle>
                <CardDescription>
                  {verifiedCount}/{SEARCH_ENGINES.length} selesai · tersimpan otomatis di
                  browser ini (localStorage)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={pct} className="h-3" aria-label="Progres total" />
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {([1, 2, 3, 4] as EngineTier[]).map((t) => (
                    <div key={t} className="rounded-lg border bg-white p-3">
                      <div className="text-xs font-bold text-slate-600">
                        {TIER_META[t].emoji} {TIER_META[t].label}
                      </div>
                      <div className="mt-1 text-2xl font-black text-emerald-600">
                        {tierDone(t)}
                        <span className="text-sm font-semibold text-slate-400">
                          /{tierCount(t)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="max-h-96 space-y-1 overflow-y-auto pr-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar]:w-1.5">
                  {SEARCH_ENGINES.map((e) => (
                    <label
                      key={e.id}
                      className="flex cursor-pointer items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2 transition-colors hover:bg-slate-50"
                    >
                      <span className="flex min-w-0 items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-emerald-600"
                          checked={Boolean(done[e.id])}
                          onChange={() => toggle(e.id)}
                          aria-label={`Tandai ${e.name} terverifikasi`}
                        />
                        <span className="truncate text-slate-700">
                          {e.emoji} {e.name}
                        </span>
                      </span>
                      <Badge
                        variant="outline"
                        className={`shrink-0 text-[10px] ${priorityBadgeClass(e.priority)}`}
                      >
                        {e.priority}
                      </Badge>
                    </label>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <CopyButton text={exportChecklist()} />
                  <Button variant="outline" size="sm" onClick={resetAll}>
                    <RefreshCw className="mr-1 h-3.5 w-3.5" />
                    Reset checklist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* ── FOOTNOTE ── */}
        <Card className="mt-8 border-dashed">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4 text-xs text-slate-500">
            <span>
              Sumber kebenaran: <code>src/lib/webmaster-tools.ts</code> · meta
              verifikasi dirender <code>src/app/layout.tsx</code> · ping API{" "}
              <code>/api/indexnow</code> · halaman noindex (alat internal).
            </span>
            <span>
              📚 Situs: <strong className="text-emerald-700">pusatperizinan.com</strong> ·
              11.207 URL · 14 seksi sitemap · 26 mesin terkurasi
            </span>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
