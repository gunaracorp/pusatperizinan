import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  ShieldCheck,
  Globe2,
  KeyRound,
  FileSignature,
  Landmark,
  Plug,
  Coins,
  Smartphone,
  BrainCircuit,
  Radar,
  Network,
  Blocks,
  Rocket,
  CircleDollarSign,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Laporan Masa Depan 2126 — Peta Produk & Modul Platform",
  description:
    "Laporan Dewan Pakar Masa Depan PusatPerizinan.com: modul yang sudah hidup hari ini, fase 2027-2028, horizon 2030+, dan visi 2126 — beserta peluang pendapatan setiap modul.",
};

// ============================================================
// /masa-depan — Laporan Time-Traveller 2126
// Peta modul platform: LIVE / ROADMAP / HORIZON + mesin pendapatan.
// Static server component — ringan, SEO-friendly, tanpa state.
// ============================================================

const LIVE_MODULES = [
  {
    icon: Bot,
    name: "RIZKI 2.0 — Agen AI Penjual 24/7",
    desc: "Konsultan AI yang membaca 1.500+ layanan server-side, mengutip harga persis, dan mengeluarkan link checkout yang bisa diklik langsung dari chat.",
    tag: "Baru di-upgrade",
  },
  {
    icon: Blocks,
    name: "Katalog 1.500+ Layanan Orderable",
    desc: "31 divisi, kode item resmi (BU/PP/PP3), harga server-side anti-manipulasi, halaman detail per layanan.",
    tag: "Produksi",
  },
  {
    icon: CircleDollarSign,
    name: "Checkout & Payment Gateway",
    desc: "Midtrans Snap + Tripay (QRIS, VA, retail), mode demo untuk uji, webhook status otomatis.",
    tag: "Produksi",
  },
  {
    icon: Rocket,
    name: "KepatuhanPRO — Langganan Bulanan (MRR)",
    desc: "Pendapatan berulang: alarm LKPM, pajak, dan kepatuhan + admin pribadi. Mesin cash-flow stabil di antara transaksi.",
    tag: "MRR",
  },
  {
    icon: Globe2,
    name: "30 Bahasa & Jangkauan 38 Provinsi",
    desc: "i18n penuh, hub kota/provinsi, konten lokal per wilayah — gerbang pasar domestik terdalam.",
    tag: "i18n",
  },
  {
    icon: Radar,
    name: "Mesin SEO 8.873+ Halaman",
    desc: "Sitemap dinamis, IndexNow, ping prioritas, konten panduan/glosarium/industri — jalur akuisisi gratis jangka panjang.",
    tag: "Organik",
  },
  {
    icon: MessageCircle,
    name: "Notifikasi WhatsApp & Telegram",
    desc: "Lead baru, order, dan follow-up terkirim real-time ke tim — respons < 15 menit.",
    tag: "Otomasi",
  },
  {
    icon: BrainCircuit,
    name: "Alat AI: Cek Izin, Cek Dokumen, Kalkulator",
    desc: "License checker, document checker, kalkulator biaya & pajak — magnet lead gratis yang mengubah pengunjung jadi calon klien.",
    tag: "Lead-magnet",
  },
];

const NEXT_MODULES = [
  {
    icon: KeyRound,
    name: "e-KYC Verifikasi Identitas",
    desc: "Verifikasi KTP + selfie + Dukcapil saat onboarding order — data PT/CV langsung bersih sejak detik pertama.",
    impact: "Menurunkan dropout checkout, menaikkan konversi order 15-30%.",
  },
  {
    icon: FileSignature,
    name: "Tanda Tangan Elektronik Tersertifikasi",
    desc: "PoA, surat kuasa notaris, dan kontrak jasa ditandatangani digital di dalam platform — tanpa tatap muka.",
    impact: "Order lintas kota/negara tanpa kirim-balik dokumen fisik.",
  },
  {
    icon: Landmark,
    name: "Escrow Pembayaran Aman",
    desc: "Dana klien ditahan escrow, cair bertahap per milestone pekerjaan izin — kepercayaan jadi fitur jualan.",
    impact: "Membuka segmen korporat & proyek bernilai besar.",
  },
  {
    icon: Plug,
    name: "API Mitra & White-Label (B2B2C)",
    desc: "Konsultan independen, notaris partner, dan agensi menjual katalog kami di brand mereka lewat API resmi + komisi.",
    impact: "Kanal distribusi tumbuh tanpa menambah iklan — komisi berulang per order mitra.",
  },
  {
    icon: Coins,
    name: "Multi-Currency USD/SGD/MYR",
    desc: "Harga tampil multi-mata uang + pembayaran internasional untuk klien PMA, diaspora, dan perusahaan asing.",
    impact: "Membuka pendapatan denominasi dolar dari layanan PMA & ekspansi.",
  },
  {
    icon: Smartphone,
    name: "PWA Mobile + Notifikasi Jatuh Tempo",
    desc: "Install di HP klien: status order, alarm LKPM/pajak, dan repeat order satu tap.",
    impact: "Retensi naik — pintu masuk tambahan ke langganan KepatuhanPRO.",
  },
];

const HORIZON_MODULES = [
  {
    icon: Bot,
    name: "Agen Kepatuhan Otonom",
    desc: "AI yang menyiapkan & memantau LKPM, SPT, dan laporan OSS end-to-end — manusia hanya memverifikasi. Evolusi KepatuhanPRO menjadi 'buku besar yang hidup'.",
  },
  {
    icon: Radar,
    name: "Radar Regulasi Prediktif",
    desc: "LLM yang membaca rancangan peraturan & perubahan OSS-RBA, lalu memberi peringatan dini: 'izin sektormu terdampak UU ini, ini langkah antisipasinya.'",
  },
  {
    icon: Network,
    name: "Jejaring Pembentukan Badan Usaha Global",
    desc: "Satu dashboard untuk mendirikan entitas lintas negara (Singapura, Dubai, US LLC) — pendampingan PMA dua arah: masuk & keluar Indonesia.",
  },
  {
    icon: ShieldCheck,
    name: "Notarisasi Blockchain & Arsip Abadi",
    desc: "Akta, izin, dan dokumen legal diikat hash permanen — bukti otentik yang bisa diverifikasi siapa pun, kapan pun.",
  },
];

function ModuleStatus({ label }: { label: string }) {
  return (
    <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-100">
      {label}
    </Badge>
  );
}

export default function MasaDepanPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,#34d399_0,transparent_45%),radial-gradient(circle_at_80%_70%,#fbbf24_0,transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-200">
            <Rocket className="h-3.5 w-3.5" />
            LAPORAN DEWAN PAKAR MASA DEPAN — DEKRIPSI SELESAI
          </div>
          <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            Laporan dari Tahun{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              2126
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-emerald-100/85 leading-relaxed">
            Sebuah laporan dikirim mundur 100 tahun ke platform perizinan yang hari ini sedang
            Anda buka. Isinya bukan fiksi ilmiah — melainkan peta modul yang{" "}
            <strong className="text-white">sudah hidup sekarang</strong>, yang{" "}
            <strong className="text-white">sedang dibangun</strong>, dan{" "}
            <strong className="text-white">akan datang</strong> — disusun dari tren global
            regtech, legaltech, dan AI agen yang sudah terjadi di seluruh dunia.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
            {[
              { n: "8", l: "Modul live hari ini" },
              { n: "6", l: "Modul fase 2027-2028" },
              { n: "4", l: "Modul horizon 2030+" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center backdrop-blur"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">{s.n}</div>
                <div className="mt-1 text-[11px] sm:text-xs text-emerald-100/75">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LIVE ================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Sudah Hidup Hari Ini
          </h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Delapan fondasi yang membuat platform ini bukan sekadar brosur, melainkan mesin
          layanan yang berjalan — dan menerima pembayaran — sejak hari pertama.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LIVE_MODULES.map((m) => (
            <div
              key={m.name}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-emerald-300/60"
            >
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <m.icon className="h-5 w-5" />
                </div>
                <ModuleStatus label={m.tag} />
              </div>
              <h3 className="mt-4 text-sm font-bold leading-snug">{m.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= NEXT ================= */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Fase 2027–2028 · Dalam Pengembangan
            </h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Enam modul dengan rasio dampak-vs-usaha tertinggi menurut dewan pakar — masing-masing
            dirancang untuk membuka sumber pendapatan baru, bukan sekadar fitur.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {NEXT_MODULES.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <m.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-amber-700 border-amber-300">
                    Roadmap
                  </Badge>
                </div>
                <h3 className="mt-4 text-sm font-bold leading-snug">{m.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                  {m.desc}
                </p>
                <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2.5">
                  <p className="text-[11px] font-semibold text-emerald-800 leading-relaxed">
                    💰 Peluang: {m.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HORIZON ================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Horizon 2030+</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Teknologi yang hari ini masih mahal atau belum matang — dan akan menjadi standar
          industri ketika biayanya turun. Yang bersiap lebih dulu, memimpin lebih dulu.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {HORIZON_MODULES.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-border bg-gradient-to-br from-card to-sky-50/40 p-6 shadow-sm"
            >
              <div className="h-10 w-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <m.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-bold">{m.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MESIN UANG ================= */}
      <section className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Mesin Pendapatan: Lima Sumber yang Mengalir Bersamaan
          </h2>
          <p className="mt-2 text-sm text-emerald-100/80 max-w-2xl">
            Pendapatan sehat tidak bergantung pada satu keran. Platform ini dirancang dengan
            lima lapis aliran yang saling mengisi.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                t: "Transaksi Katalog",
                d: "1.500+ layanan per item, harga server-side — sumber pendapatan utama.",
              },
              {
                t: "Langganan MRR",
                d: "KepatuhanPRO Starter & Growth — uang masuk setiap bulan, bukan sekali.",
              },
              {
                t: "Paket Bundel",
                d: "GO UMRAH, GO HAJI PLUS, Legalitas Startup — nilai order per klien naik.",
              },
              {
                t: "Kanal Mitra B2B2C",
                d: "API white-label + komisi — orang lain menjual, platform ikut menerima.",
              },
              {
                t: "Pasar Global",
                d: "Layanan PMA, kerja luar negeri & multi-currency — pendapatan denominasi dolar.",
              },
            ].map((s, i) => (
              <div
                key={s.t}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <div className="text-xs font-bold text-amber-300">SUMBER {i + 1}</div>
                <h3 className="mt-2 text-sm font-bold">{s.t}</h3>
                <p className="mt-2 text-xs text-emerald-100/75 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[11px] text-emerald-100/50 max-w-3xl">
            Catatan dewan: angka pendapatan bersifat arah strategis, bukan janji hasil.
            Pertumbuhan ditentukan eksekusi pemasaran, kualitas layanan, dan kondisi pasar.
          </p>
        </div>
      </section>

      {/* ================= VISI 2126 ================= */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-20 text-center">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Visi 2126</h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-foreground/80">
          &ldquo;Di tahun 2126, legalitas sebuah usaha bukan lagi dokumen yang dikejar —
          melainkan infrastruktur yang hadir sejak ide itu dituliskan. Kami tidak tahu pasti
          seperti apa bentuknya. Tapi setiap modul di halaman ini adalah anak tangga menuju
          hari itu.&rdquo;
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          — Dewan Pakar Masa Depan PusatPerizinan.com, transmisi tahun 2126
        </p>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-amber-50 p-8 sm:p-12 text-center shadow-sm">
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight">
            Masa depan dimulai dari legalitas yang beres hari ini
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
            Sambil menunggu modul 2027 turun, mesin pendapatan hari ini sudah bisa Anda pakai:
            katalog lengkap, paket bundel, dan Agen AI RIZKI yang siap menjual 24 jam.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/paket">Lihat Paket & Harga</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/katalog">Jelajah 1.500+ Layanan</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full">
              <Link href="/roadmap">Roadmap 12 Bulan</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
