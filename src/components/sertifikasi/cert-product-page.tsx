import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck, BookOpenCheck, CheckCircle2, FileCheck2, Landmark,
  ListChecks, MessageCircle, ScrollText, ShieldAlert, ShieldCheck,
  Sparkles, Scale,
} from "lucide-react";
import { IataMotionStyles, Reveal } from "@/components/iata/iata-motion";
import { CertTrackLink } from "@/components/sertifikasi/track-link";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { langAlternates } from "@/lib/seo";
import {
  CERT_DISCLAIMER, CERT_HARGA_CATATAN, CERT_HARGA_CATATAN_PENDEK,
  CERT_PROCESS, CERT_WA_UMUM, certJsonLd, certWaLink, certWaMessageOf,
  fmtIdrCert, SERTIFIKASI_URLS, type CertTravelProduct,
  KEMENHAJ_NEWS, KEMENHAJ_NEWS_INTRO, KEMENHAJ_PORTAL_URL,
  QRIS_IMAGE_PATH, QRIS_IMAGE_ALT, qrisWaConfirmMessage,
} from "@/lib/sertifikasi-travel";
import { CONTACT } from "@/lib/site";
import type { CertPageContent } from "@/lib/sertifikasi-pages-data";

// ============================================================
// PUSATPERIZINAN.COM — RENDERER TRILOGI SERTIFIKASI TRAVEL
// (PPIU / PIHK / BPW) — Task 50, v1.23.0
// ============================================================
// Struktur mengikuti pola IataProductPage (identitas emerald/
// amber, motion CSS-first 100% transform/opacity, hormat
// reduced-motion). Isi 100% unik per produk via
// CertPageContent — anti doorway-page. Tanpa dependensi baru.
// ============================================================

export function certProductMetadata(c: CertPageContent): Metadata {
  const p = c.product;
  return {
    title: p.seoTitle,
    description: p.metaDescription,
    alternates: langAlternates(p.url),
    openGraph: {
      title: p.seoTitle,
      description: p.metaDescription,
      url: `${SITE_URL}${p.url}`,
      siteName: SITE_NAME,
      type: "website",
      locale: "id_ID",
    },
    robots: { index: true, follow: true },
    keywords: [
      `sertifikasi ${p.namaPendek.toLowerCase()}`,
      `biaya ${p.namaPendek.toLowerCase()}`,
      `syarat ${p.namaPendek.toLowerCase()}`,
      p.kode === "BPW" ? "tanda daftar usaha biro perjalanan wisata" : `izin ${p.namaPendek.toLowerCase()}`,
    ],
  };
}

function JsonLd({ content }: { content: CertPageContent }) {
  const p = content.product;
  const jsonLd = certJsonLd({
    name: p.nama,
    description: p.metaDescription,
    url: p.url,
    product: p,
    breadcrumbName: p.namaPendek,
    faq: content.faq,
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

/** Harga card — satu sumber harga + catatan transparansi wajib. */
function PriceCard({ content }: { content: CertPageContent }) {
  const p = content.product;
  const hasPromo = !!(p.hargaNormal && p.hargaNormal > p.hargaJasa);
  return (
    <div className="rounded-2xl border border-amber-300/60 bg-white/95 p-5 shadow-lg shadow-emerald-950/20 backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Jasa All-In — {p.kode}</p>
      {hasPromo && (
        <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          <Sparkles className="h-3 w-3" aria-hidden /> {p.promoLabel}
        </p>
      )}
      <p className="mt-1 text-3xl font-extrabold text-emerald-950">
        {fmtIdrCert(p.hargaJasa)}
        {hasPromo && (
          <span className="ml-2 text-lg font-semibold text-stone-400 line-through" aria-label="harga normal">
            {fmtIdrCert(p.hargaNormal!)}
          </span>
        )}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-stone-500">{CERT_HARGA_CATATAN_PENDEK}</p>
      <dl className="mt-3 space-y-1.5 border-t border-stone-200 pt-3 text-xs text-stone-600">
        <div className="flex gap-2"><dt className="font-semibold text-stone-700">Penerbit</dt><dd className="flex-1">{p.authority}</dd></div>
        <div className="flex gap-2"><dt className="font-semibold text-stone-700">Durasi</dt><dd className="flex-1">{p.durasi}</dd></div>
        <div className="flex gap-2"><dt className="font-semibold text-stone-700">KBLI</dt><dd className="flex-1">{p.kbli}</dd></div>
      </dl>
      <CertTrackLink
        href={certWaLink(certWaMessageOf(p))}
        event="click_cert_wa"
        product={p.kode}
        external
        className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
      >
        <MessageCircle className="h-4 w-4" aria-hidden /> Konsultasi {p.namaPendek} via WhatsApp
      </CertTrackLink>
      <CertTrackLink
        href={SERTIFIKASI_URLS.konsultasi}
        event="click_cert_form"
        product={p.kode}
        className="mt-2 flex min-h-11 items-center justify-center rounded-xl border border-emerald-900/20 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
      >
        Isi Form Pemeriksaan Kesiapan →
      </CertTrackLink>
    </div>
  );
}

export function CertProductPage({ content }: { content: CertPageContent }) {
  const p = content.product;
  return (
    <div className="min-h-screen bg-white">
      <IataMotionStyles />
      <JsonLd content={content} />

      <nav aria-label="Breadcrumb" className="border-b border-stone-100 bg-stone-50/60">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-stone-500">
          <Link href="/" className="hover:text-emerald-700">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/layanan" className="hover:text-emerald-700">Layanan</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-stone-700" aria-current="page">{p.namaPendek}</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="iata-hero-grad bg-[radial-gradient(55%_55%_at_25%_25%,rgba(16,185,129,.32),transparent_60%),radial-gradient(45%_45%_at_78%_30%,rgba(251,191,36,.16),transparent_55%)]" aria-hidden />
        <div className="iata-orb left-[10%] top-[20%] h-52 w-52 bg-emerald-500/25" aria-hidden style={{ animationDelay: "-5s" }} />
        <div className="iata-orb right-[8%] top-[8%] h-40 w-40 bg-amber-400/15" aria-hidden style={{ animationDelay: "-9s" }} />
        <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid items-start gap-8 lg:grid-cols-[1.55fr_1fr]">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-200">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden /> {content.badge}
              </p>
              <h1 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">{p.h1}</h1>
              {content.heroCopy.map((t) => (
                <p key={t.slice(0, 24)} className="mt-4 max-w-2xl leading-relaxed text-emerald-100/90">{t}</p>
              ))}
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                {[`KBLI ${p.kode === "BPW" ? "79120" : "79122"}`, p.authority.split(" (")[0], "Garansi kebijakan situs", "Nol biaya siluman"].map((chip) => (
                  <span key={chip} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-medium text-emerald-100">{chip}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <PriceCard content={content} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* APA ITU */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <Reveal>
          <h2 className="text-2xl font-bold text-stone-900 md:text-3xl">{content.intro.heading}</h2>
          {content.intro.paragraphs.map((t) => (
            <p key={t.slice(0, 24)} className="mt-4 max-w-3xl leading-relaxed text-stone-600">{t}</p>
          ))}
        </Reveal>
      </section>

      {/* HIMBAUAN WAJIB SERTIFIKASI — hanya PPIU; sumber terverifikasi */}
      {content.himbauan && (
        <section id="himbauan-kemenhaj" aria-labelledby="himbauan-kemenhaj-title" className="bg-amber-50/70 py-14 scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <h2 id="himbauan-kemenhaj-title" className="flex items-center gap-2 text-2xl font-bold text-stone-900 md:text-3xl">
                <ShieldAlert className="h-6 w-6 text-red-600" aria-hidden /> {content.himbauan.heading}
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-stone-600">{KEMENHAJ_NEWS_INTRO}</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {KEMENHAJ_NEWS.map((n) => (
                  <a
                    key={n.url}
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-red-300 hover:shadow-md"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-600">{n.date}</p>
                    <p className="mt-1 font-bold leading-snug text-stone-900 group-hover:text-red-700">{n.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{n.summary}</p>
                    <p className="mt-3 text-xs text-stone-400">Sumber: {n.source} ↗</p>
                  </a>
                ))}
              </div>
              <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-stone-700">
                <strong className="text-red-700">Himbauan kami kepada seluruh PPIU se-Indonesia:</strong>{" "}
                {content.himbauan.intro} Status pemantauan resmi dapat dilihat langsung di portal{" "}
                <a href={KEMENHAJ_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-red-700 underline">
                  Kemenhaj (haji.go.id) ↗
                </a>
                . Jangan tunggu pembekuan datang —{" "}
                <a href={certWaLink(CERT_WA_UMUM)} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 underline">
                  cek kesiapan sertifikasi Anda via WhatsApp gratis ↗
                </a>
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* DASAR HUKUM */}
      <section className="bg-stone-50/70 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-stone-900 md:text-3xl">
              <Scale className="h-6 w-6 text-emerald-700" aria-hidden /> {content.dasarHukum.heading}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {content.dasarHukum.items.map((item, i) => (
                <div key={item.label} className="rounded-2xl border border-stone-200 bg-white p-5">
                  <p className="flex items-center gap-2 font-bold text-emerald-900"><ScrollText className="h-4 w-4 text-emerald-700" aria-hidden /> {item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.desc}</p>
                  <p className="mt-2 text-xs text-stone-400">Referensi {i + 1} — mengikuti ketentuan terkini yang diadopsi situs.</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SYARAT */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <Reveal>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-stone-900 md:text-3xl">
            <ListChecks className="h-6 w-6 text-emerald-700" aria-hidden /> {content.syarat.heading}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.syarat.items.map((s) => (
              <div key={s.nama} className="rounded-2xl border border-stone-200 p-5">
                <p className="flex items-center gap-2 font-bold text-stone-900"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden /> {s.nama}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* RUANG LINGKUP + HARGA */}
      <section className="bg-emerald-950 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="flex items-center gap-2 text-2xl font-bold md:text-3xl"><Sparkles className="h-6 w-6 text-amber-400" aria-hidden /> {content.ruangLingkup.heading}</h2>
            <p className="mt-3 max-w-3xl text-emerald-100/85">Seluruh ruang lingkup di bawah termasuk dalam jasa all-in <strong className="text-amber-300">{fmtIdrCert(p.hargaJasa)}</strong> — dituliskan eksplisit dalam quotation.</p>
            <ol className="mt-8 grid gap-3 md:grid-cols-2">
              {content.ruangLingkup.items.map((item, i) => (
                <li key={item.slice(0, 24)} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-emerald-50">
                  <span className="font-mono font-bold text-amber-400">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-xs leading-relaxed text-amber-100">{CERT_HARGA_CATATAN}</p>
          </Reveal>
        </div>
      </section>

      {/* PROSES 01-08 */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <Reveal>
          <h2 className="text-2xl font-bold text-stone-900 md:text-3xl">Proses Kerja Kami — 8 Tahap</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-stone-600">{content.prosesIntro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CERT_PROCESS.map((step) => (
              <div key={step.step} className="rounded-2xl border border-stone-200 p-5">
                <p className="font-mono text-sm font-bold text-emerald-700">{step.step}</p>
                <p className="mt-1 font-bold text-stone-900">{step.judul}</p>
                <p className="mt-2 text-xs leading-relaxed text-stone-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* PERBANDINGAN TROLOGI */}
      <section className="bg-stone-50/70 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-stone-900 md:text-3xl"><BookOpenCheck className="h-6 w-6 text-emerald-700" aria-hidden /> {content.perbedaan.heading}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-stone-600">{content.perbedaan.intro}</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
              <table className="w-full min-w-[720px] text-left text-sm">
                <caption className="sr-only">Perbandingan PPIU, PIHK, dan BPW</caption>
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-stone-700">
                    <th className="p-3 font-semibold">Aspek</th>
                    <th className="p-3 font-semibold">PPIU — Umrah</th>
                    <th className="p-3 font-semibold">PIHK — Haji Khusus</th>
                    <th className="p-3 font-semibold">BPW — Wisata Umum</th>
                  </tr>
                </thead>
                <tbody className="text-stone-600">
                  {content.perbedaan.rows.map((r) => (
                    <tr key={r.aspek} className="border-b border-stone-100 last:border-0">
                      <th scope="row" className="p-3 align-top font-semibold text-stone-800">{r.aspek}</th>
                      <td className="p-3 align-top">{r.ppiu}</td>
                      <td className="p-3 align-top">{r.pihk}</td>
                      <td className="p-3 align-top">{r.bpw}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-stone-400">Harga per baris = harga jasa all-in PusatPerizinan.com per sertifikat — bukan biaya resmi penerbit.</p>
          </Reveal>
        </div>
      </section>

      {/* KESALAHAN UMUM */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <Reveal>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-stone-900 md:text-3xl"><ShieldAlert className="h-6 w-6 text-amber-600" aria-hidden /> {content.kesalahanUmum.heading}</h2>
          <div className="mt-6 space-y-3">
            {content.kesalahanUmum.items.map((k, i) => (
              <div key={k.salah.slice(0, 24)} className="grid gap-2 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 md:grid-cols-[auto_1fr_1fr] md:items-start">
                <span className="font-mono text-sm font-bold text-amber-700">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm font-bold text-stone-900">{k.salah}</p>
                <p className="text-sm leading-relaxed text-stone-600"><span className="font-semibold text-amber-800">Risiko:</span> {k.risiko}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CHECKLIST DOKUMEN */}
      <section className="bg-stone-50/70 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-stone-900 md:text-3xl"><FileCheck2 className="h-6 w-6 text-emerald-700" aria-hidden /> {content.checklist.heading}</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {content.checklist.items.map((item) => (
                <li key={item.slice(0, 24)} className="flex items-start gap-2 rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-14">
        <Reveal>
          <h2 className="text-2xl font-bold text-stone-900 md:text-3xl">Pertanyaan yang Sering Diajukan — {p.namaPendek}</h2>
          <div className="mt-6 space-y-3">
            {content.faq.map((f) => (
              <details key={f.q.slice(0, 24)} className="group rounded-2xl border border-stone-200 bg-white p-5 open:border-emerald-300 open:bg-emerald-50/40">
                <summary className="cursor-pointer list-none font-bold text-stone-900 marker:hidden">
                  <span className="mr-2 text-emerald-700 group-open:hidden" aria-hidden>＋</span>
                  <span className="mr-2 hidden text-emerald-700 group-open:inline" aria-hidden>－</span>
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      {/* TERKAIT */}
      <section className="bg-stone-50/70 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-stone-900 md:text-3xl"><Landmark className="h-6 w-6 text-emerald-700" aria-hidden /> Layanan Terkait — Ekosistem Travel</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {content.terkait.map((t) => (
                <Link key={t.href} href={t.href} className="group rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-emerald-400 hover:shadow-md">
                  <p className="font-bold text-emerald-900 group-hover:text-emerald-700">{t.label} →</p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">{t.desc}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PEMBAYARAN QRIS — resmi pusatperizinan.com + konfirmasi WA */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <Reveal>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-stone-900 md:text-3xl">
            <MessageCircle className="h-6 w-6 text-emerald-700" aria-hidden /> Pembayaran QRIS — Resmi & Otomatis Masuk Rekening Kami
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-stone-600">
            Pemesanan {p.namaPendek} dapat dibayar lewat QRIS resmi {SITE_NAME}: scan sekali, bayar dari GoPay, OVO, DANA,
            ShopeePay, LinkAja, atau m-banking apa pun (BCA, Mandiri, BRI, BNI, dll.) — tanpa potongan konfirmasi manual.
            Setelah bayar, kirim bukti ke WhatsApp resmi kami <strong>{CONTACT.phoneDisplay}</strong> dan tim langsung memproses kontrak Anda.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-6 grid gap-5 md:grid-cols-[auto_1fr]">
            <figure className="rounded-2xl border border-stone-200 bg-white p-4 text-center">
              <Image
                src={QRIS_IMAGE_PATH}
                alt={QRIS_IMAGE_ALT}
                width={284}
                height={400}
                className="mx-auto h-auto w-full max-w-[284px] rounded-lg"
                loading="lazy"
              />
              <figcaption className="mt-3 text-xs text-stone-500">
                QRIS resmi <strong>{SITE_NAME}</strong> — nominal bayar: <strong className="text-emerald-700">{fmtIdrCert(p.hargaJasa)}</strong>
                {p.hargaNormal && p.hargaNormal > p.hargaJasa ? (
                  <span className="ml-1 line-through text-stone-400">{fmtIdrCert(p.hargaNormal)}</span>
                ) : null}
              </figcaption>
            </figure>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
              <ol className="space-y-3 text-sm leading-relaxed text-stone-700">
                <li><strong className="text-emerald-800">1.</strong> Klik tombol WhatsApp di bawah — chat otomatis terisi nama produk &amp; nominal promo.</li>
                <li><strong className="text-emerald-800">2.</strong> Scan QRIS di atas dari aplikasi e-wallet/m-banking Anda, bayar sesuai nominal.</li>
                <li><strong className="text-emerald-800">3.</strong> Kirim bukti pembayaran ke WhatsApp {CONTACT.phoneDisplay} — dana masuk langsung ke rekening resmi {SITE_NAME} (bukan perantara).</li>
                <li><strong className="text-emerald-800">4.</strong> Tim kami langsung konfirmasi, kirim quotation + kontrak, dan mulai tahap 01 Konsultasi Blueprint Legal.</li>
              </ol>
              <CertTrackLink
                href={certWaLink(qrisWaConfirmMessage(p.namaPendek, p.hargaJasa))}
                event="click_cert_qris_wa"
                product={p.kode}
                external
                className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> Pesan &amp; Bayar QRIS — {fmtIdrCert(p.hargaJasa)} via WhatsApp
              </CertTrackLink>
              <p className="mt-3 text-xs leading-relaxed text-stone-500">{CERT_HARGA_CATATAN_PENDEK}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <section className="bg-gradient-to-b from-emerald-900 to-emerald-950 py-14 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <h2 className="text-2xl font-bold md:text-3xl">{content.finalCta.heading}</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-emerald-100/90">{content.finalCta.desc}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <CertTrackLink
                href={certWaLink(certWaMessageOf(p))}
                event="click_cert_wa"
                product={p.kode}
                external
                className="flex min-h-11 items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp — Balas Cepat
              </CertTrackLink>
              <CertTrackLink
                href={SERTIFIKASI_URLS.konsultasi}
                event="click_cert_form"
                product={p.kode}
                className="flex min-h-11 items-center gap-2 rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                Isi Form Pemeriksaan Kesiapan →
              </CertTrackLink>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-xs text-emerald-200/80">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Konsultan independen — keputusan akhir penerbit ({p.authority.split(" (")[0]})
            </p>
          </Reveal>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <Reveal delay={60}>
          <p className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs leading-relaxed text-stone-500">{CERT_DISCLAIMER}</p>
        </Reveal>
      </section>
    </div>
  );
}

// Re-export tipe agar route file cukup satu import.
export type { CertTravelProduct };
