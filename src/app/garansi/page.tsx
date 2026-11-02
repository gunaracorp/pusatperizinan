import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck, FileCheck, Clock, BadgeCheck, RefreshCcw, Wallet,
} from "lucide-react";
import { SITE_NAME, SITE_URL, CONTACT } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /garansi (langkah 48 ROADMAP-99, FASE 6)
// "Garansi 100% uang kembali bila gagal karena kesalahan kami."
// Halaman trust E-E-A-T: janji eksplisit, syarat jelas, FAQ schema.
// Ditaut dari: badge checkout, footer, dan final CTA.
// ============================================================

export const metadata: Metadata = {
  title: "Garansi 100% Uang Kembali — Jaminan Layanan Perizinan",
  description:
    "Garansi 100% uang kembali dari PusatPerizinan.com: bila izin Anda gagal terbit karena kesalahan administratif tim kami, seluruh biaya jasa kami kembalikan penuh. Syarat jelas, proses refund 7 hari kerja, tanpa drama.",
  alternates: { canonical: "/garansi" },
  robots: { index: true, follow: true },
};

const garansiFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/garansi#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "Apa itu Garansi 100% Uang Kembali PusatPerizinan.com?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bila izin yang Anda pesan gagal terbit karena kesalahan administratif tim kami — dokumen salah lampir, data salah input, pengajuan tidak masuk antrean, atau tenggat yang kami janjikan terlewat tanpa komunikasi — seluruh biaya jasa yang telah Anda bayarkan kami kembalikan 100%. Anda juga tetap menerima seluruh dokumen yang sudah beres untuk dipakai di mana pun.",
      },
    },
    {
      "@type": "Question",
      name: "Situasi apa saja yang tercakup garansi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Garansi mencakup: (1) kesalahan input data atau kelengkapan dokumen oleh tim kami; (2) pengajuan tidak diproses ke instansi sesuai janji kerja tertulis; (3) penolakan oleh instansi yang berasal dari kesalahan administrasi kami; (4) kegagalan tenggat yang kami janjikan tanpa pemberitahuan dan persetujuan Anda.",
      },
    },
    {
      "@type": "Question",
      name: "Situasi apa yang TIDAK tercakup garansi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Garansi tidak mencakup: penolakan karena data/dokumen dari klien yang tidak benar atau dipalsukan; perubahan regulasi atau kebijakan instansi setelah pengajuan; keterlambatan yang berasal dari antrean instansi atau keabsahan verifikasi lapangan; serta biaya resmi negara (PNBP, notaris, uji lab) yang sudah dibayarkan ke pihak ketiga. Situasi di luar cakupan tetap kami urus ulang dengan biaya jasa seminimal mungkin.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana proses klaim garansi dan berapa lama refund masuk?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kirim permohonan klaim via WhatsApp atau email yang tertera di halaman kontak dengan nomor pesanan Anda. Tim memverifikasi maksimal 3 hari kerja. Setelah disetujui, refund diproses maksimal 7 hari kerja ke rekening asli pembayaran. Tidak ada biaya klaim, tidak ada syarat tersembunyi.",
      },
    },
  ],
};

const JANJI = [
  {
    icon: ShieldCheck,
    t: "Garansi 100% uang kembali",
    d: "Izin gagal terbit karena kesalahan administratif tim kami? Seluruh biaya jasa kembali penuh — tanpa potongan, tanpa biaya klaim.",
  },
  {
    icon: FileCheck,
    t: "Dokumen dicek sebelum diajukan",
    d: "Setiap berkas diverifikasi ulang dua lapis sebelum masuk antrean instansi — risiko salah lampir kami tekan dari hulu.",
  },
  {
    icon: Clock,
    t: "Progres dilaporkan tiap tahap",
    d: "Anda selalu tahu posisi dokumen: diterima, diverifikasi, diajukan, terbit. Tanpa harus bertanya berulang.",
  },
  {
    icon: BadgeCheck,
    t: "Jalur resmi, tanpa jalan pintas",
    d: "Semua pengajuan melalui portal resmi (OSS-RBA, JDIH, portal instansi). Legalitas dokumen Anda aman untuk bank, tender, dan audit.",
  },
  {
    icon: RefreshCcw,
    t: "Urus ulang gratis bila kami keliru",
    d: "Sebelum menyentuh garansi refund, koreksi karena kesalahan kami dikerjakan ulang tanpa biaya tambahan apa pun.",
  },
  {
    icon: Wallet,
    t: "Tanpa biaya kejutan",
    d: "Biaya resmi negara/notaris disampaikan transparan sebelum Anda menyetujui. Tidak pernah ada tagihan yang muncul tiba-tiba.",
  },
];

export default function GaransiPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(garansiFaqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Garansi</li>
          </ol>
        </nav>

        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <ShieldCheck className="h-8 w-8 text-primary" aria-hidden />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Garansi 100% Uang Kembali
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              {SITE_NAME} menanggung penuh pekerjaan yang kami kerjakan: bila izin Anda
              gagal terbit <strong>karena kesalahan tim kami</strong>, seluruh biaya jasa
              kami kembalikan 100%. Janji ini berlaku untuk semua layanan di katalog
              situs — tanpa perlu upgrade paket.
            </p>
          </div>
        </div>

        {/* Enam janji layanan */}
        <section aria-labelledby="janji" className="mt-10">
          <h2 id="janji" className="text-xl font-bold">Enam Janji yang Kami Pegang</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {JANJI.map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border bg-card p-5">
                <Icon className="h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-2.5 font-bold text-sm">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cakupan */}
        <section aria-labelledby="cakupan" className="mt-10 space-y-4 text-sm leading-relaxed text-foreground/85">
          <h2 id="cakupan" className="text-xl font-bold text-foreground">Cakupan Garansi</h2>
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
            <h3 className="font-bold text-primary">Tercakup — kami kembalikan 100% biaya jasa:</h3>
            <ul className="mt-2.5 space-y-2">
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                Kesalahan input data atau kelengkapan dokumen oleh tim kami.
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                Pengajuan tidak diproses ke instansi sesuai janji kerja tertulis.
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                Penolakan instansi yang berasal dari kesalahan administrasi kami.
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                Tenggat yang kami janjikan terlewat tanpa pemberitahuan dan persetujuan Anda.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-muted/40 p-5">
            <h3 className="font-bold">Di luar cakupan — tetap kami urus ulang dengan biaya seminimal mungkin:</h3>
            <ul className="mt-2.5 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <FileCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                Penolakan karena data atau dokumen dari klien tidak benar/dipalsukan.
              </li>
              <li className="flex items-start gap-2">
                <FileCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                Perubahan regulasi atau kebijakan instansi setelah pengajuan masuk.
              </li>
              <li className="flex items-start gap-2">
                <FileCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                Keterlambatan dari antrean instansi, verifikasi lapangan, atau uji lab pihak ketiga.
              </li>
              <li className="flex items-start gap-2">
                <FileCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                Biaya resmi negara (PNBP, notaris, uji lab) yang telah dibayarkan ke pihak ketiga.
              </li>
            </ul>
          </div>
        </section>

        {/* Proses klaim */}
        <section aria-labelledby="klaim" className="mt-10">
          <h2 id="klaim" className="text-xl font-bold">Cara Klaim Garansi</h2>
          <ol className="mt-4 space-y-3">
            {[
              { t: "Hubungi kami", d: "Kirim nomor pesanan Anda via WhatsApp atau email di halaman kontak — satu pesan cukup." },
              { t: "Verifikasi maks. 3 hari kerja", d: "Tim memeriksa berkas dan memberi putusan tertulis: refund penuh, urus ulang gratis, atau solusi alternatif." },
              { t: "Refund maks. 7 hari kerja", d: "Bila refund disetujui, dana kembali ke rekening asli pembayaran. Tanpa biaya klaim, tanpa syarat tersembunyi." },
            ].map((s, i) => (
              <li key={s.t} className="flex items-start gap-3 rounded-2xl border bg-card p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-sm">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ singkat — teks sinkron dengan JSON-LD */}
        <section aria-labelledby="faq" className="mt-10">
          <h2 id="faq" className="text-xl font-bold">Pertanyaan Umum</h2>
          <dl className="mt-4 space-y-4 text-sm leading-relaxed">
            {garansiFaqJsonLd.mainEntity.map((f: { name: string; acceptedAnswer: { text: string } }) => (
              <div key={f.name} className="rounded-2xl border bg-card p-5">
                <dt className="font-bold">{f.name}</dt>
                <dd className="mt-2 text-muted-foreground">{f.acceptedAnswer.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <section className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-lg font-bold">Siap mulai dengan tenang?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Konsultasi awal gratis — kami jelaskan syarat, biaya, dan garansi tertulis
            sebelum Anda memutuskan apa pun.
          </p>
          <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
            <Link
              href="/katalog"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
            >
              Lihat Katalog Layanan
            </Link>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Halo, saya mau konsultasi dulu soal izin usaha saya — termasuk soal garansi.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-muted/60"
            >
              Konsultasi via WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Ketentuan lengkap per layanan tertulis dalam perjanjian jasa. Lihat juga{" "}
            <Link href="/syarat-ketentuan" className="font-semibold text-primary hover:underline">
              Syarat &amp; Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="/faq" className="font-semibold text-primary hover:underline">
              Pusat FAQ
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
