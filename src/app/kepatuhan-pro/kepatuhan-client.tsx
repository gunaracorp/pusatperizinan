"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  CalendarClock,
  CheckCircle2,
  FileWarning,
  Gavel,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { KEPATUHAN_TIERS, KEPATUHAN_RISKS, KEPATUHAN_FAQ, type KepatuhanTier } from "@/lib/kepatuhan-pro";
import { fmtRupiah } from "@/lib/pricing";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { TRUST_METRICS } from "@/lib/site";

// ============================================================
// KEPATUHANPRO CLIENT — toggle bulanan/tahunan + tier + risiko + FAQ
// ============================================================

const fmtJt = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}jt` : `${Math.round(n / 1000)}rb`);

function waLink(msg: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function TierCard({ tier, annual }: { tier: KepatuhanTier; annual: boolean }) {
  const price = annual ? tier.annual : tier.monthly;
  const strike = annual ? tier.strikeAnnual : tier.strikeMonthly;
  const per = annual ? "tahun" : "bulan";
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 ${
        tier.best
          ? "border-emerald-400 bg-emerald-50/50 shadow-lg shadow-emerald-100 ring-1 ring-emerald-300"
          : "border-border bg-card"
      }`}
    >
      {tier.best && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1 text-[11px] font-bold text-white">
          <Sparkles className="mr-1 h-3 w-3" /> PALING LARIS
        </Badge>
      )}
      <h3 className="text-lg font-extrabold">KepatuhanPRO {tier.name}</h3>
      <p className="mt-1 min-h-10 text-xs leading-relaxed text-muted-foreground">{tier.audience}</p>
      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {annual ? "Per tahun (12 bulan)" : "Per bulan"}
        </p>
        <p className="text-3xl font-extrabold text-emerald-700">{fmtRupiah(price)}</p>
        {strike > price && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            <span className="line-through">{fmtRupiah(strike)}</span>{" "}
            <span className="font-bold text-emerald-700">
              hemat {fmtRupiah(strike - price)}
            </span>
          </p>
        )}
        {!annual && <p className="mt-0.5 text-[11px] text-muted-foreground">Tanpa kontrak — berhenti kapan saja</p>}
      </div>
      <ul className="mt-5 flex-1 space-y-2.5">
        {tier.highlight.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm leading-relaxed">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 space-y-2">
        <Link href={`/checkout?paket=${annual ? tier.skuTahunan : tier.sku}`}>
          <Button
            className={`h-11 w-full rounded-xl font-bold ${tier.best ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
          >
            {annual ? "Langganan Tahunan" : "Langganan Bulanan"} — {fmtJt(price)}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
        <a
          href={waLink(`Halo PusatPerizinan.com, saya tertarik KepatuhanPRO ${tier.name} (${annual ? "tahunan" : "bulanan"}). Mohon info lengkapnya.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition hover:bg-accent"
        >
          <MessageCircle className="h-4 w-4" /> Tanya Dulu via WhatsApp
        </a>
      </div>
    </div>
  );
}

export function KepatuhanProClient() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      {/* PRICING */}
      <section aria-labelledby="harga-pro" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 id="harga-pro" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Harga Langganan
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Lebih murah dari gaji setengah admin office-boy — menutup risiko denda jutaan rupiah.
          </p>
          <div className="mt-6 inline-flex items-center rounded-full border bg-muted/50 p-1" role="group" aria-label="Periode langganan">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
              className={`rounded-full px-5 py-2 text-sm font-bold transition ${!annual ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"}`}
            >
              Bulanan
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
              className={`rounded-full px-5 py-2 text-sm font-bold transition ${annual ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"}`}
            >
              Tahunan <span className="ml-1 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-700">2 BULAN GRATIS</span>
            </button>
          </div>
        </div>
        <div className="mt-10 grid gap-6 pt-3 md:grid-cols-3">
          {KEPATUHAN_TIERS.map((t) => (
            <TierCard key={t.sku} tier={t} annual={annual} />
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Harga = jasa pendampingan & pengurusan. Pajak terutang / PNBP dibayar ke negara atas nama usahamu — transparan, tanpa biaya kejutan.
        </p>
      </section>

      {/* RISIKO */}
      <section aria-labelledby="risiko" className="border-y bg-amber-50/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="rounded-full border-amber-300 bg-amber-100 px-4 py-1 text-[11px] font-bold text-amber-800">
              <FileWarning className="mr-1.5 h-3 w-3" /> BIAYA DARI TIDAK MELAKUKAN APA-APA
            </Badge>
            <h2 id="risiko" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Kepatuhan yang ditunda itu <span className="text-amber-700">paling mahal</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {KEPATUHAN_RISKS.map((r, i) => (
              <div key={r.title} className="rounded-2xl border border-amber-200 bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 font-extrabold text-amber-800" aria-hidden>
                    {i + 1}
                  </span>
                  <h3 className="font-bold">{r.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
                <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">
                  <X className="mr-1 inline h-3.5 w-3.5" aria-hidden />{r.cost}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <p className="text-sm font-bold text-emerald-900">
              <ShieldCheck className="mr-1.5 inline h-5 w-5" aria-hidden />
              KepatuhanPRO menutup keempat risiko itu — mulai {fmtRupiah(499_000)}/bulan.
            </p>
          </div>
        </div>
      </section>

      {/* ALUR LANGGANAN */}
      <section aria-labelledby="alur-pro" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 id="alur-pro" className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          Cara Kerja Langganan
        </h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            { icon: BadgeCheck, t: "1. Pilih & Bayar", d: "Checkout 2 menit — QRIS/VA/e-wallet. Konfirmasi otomatis ke WA." },
            { icon: BellRing, t: "2. Audit Awal", d: "Kami petakan seluruh kewajiban & masa berlaku izin usahamu — gratis." },
            { icon: CalendarClock, t: "3. Kami Ingatkan & Urus", d: "Setiap jatuh tempo LKPM/pajak/izin: diingatkan, dibantu, diselesaikan." },
            { icon: TrendingUp, t: "4. Naik Kelas Tenang", d: "Fokus ekspansi usaha — dokumentasi selalu siap saat dicari bank/investor." },
          ].map(({ icon: Icon, t, d }) => (
            <li key={t} className="rounded-2xl border bg-card p-6">
              <Icon className="h-7 w-7 text-emerald-600" aria-hidden />
              <h3 className="mt-3 font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-pro" className="border-t bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 id="faq-pro" className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            Pertanyaan Umum KepatuhanPRO
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {KEPATUHAN_FAQ.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-sm font-bold sm:text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-10 rounded-2xl border bg-card p-6 text-center">
            <Gavel className="mx-auto h-8 w-8 text-emerald-600" aria-hidden />
            <p className="mt-3 text-sm text-muted-foreground">
              Sudah kena denda / NIB dibekukan? Kami punya program <strong className="text-foreground">Recovery & Reaktivasi</strong> khusus.
            </p>
            <a
              href={waLink(`Halo PusatPerizinan.com, izin/NIB usaha saya bermasalah (denda/tertunggak). Mohon bantuan recovery.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              <MessageCircle className="h-4 w-4" /> Konsultasi Recovery Sekarang
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              Dipercaya {TRUST_METRICS.clientsServed}+ klien · {TRUST_METRICS.permitsIssued}+ izin terbit · rating {TRUST_METRICS.rating}/5
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
