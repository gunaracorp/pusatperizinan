import type { Metadata } from "next";
import Link from "next/link";
import {
  Download, ShieldCheck, Star, Leaf, BadgeCheck, Ban, Palette, Crown,
} from "lucide-react";
import { SITE_NAME } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /logo (identitas visual resmi)
// Galeri logo official: master logo v2026 (karangan laurel hijau
// hutan + monogram PP + bintang emas — PT Top Konsultan
// Internasional, sejak 2009), aset resmi lainnya, palet warna
// hasil sampling master logo, dan aturan pemakaian.
// Aset: /logo-master.png (1254×1254 transparan), /logo-master.webp
// ============================================================

export const metadata: Metadata = {
  title: "Logo Official — Identitas Visual Resmi PusatPerizinan.com",
  description:
    "Logo official PusatPerizinan.com (PT Top Konsultan Internasional): karangan laurel hijau hutan, monogram PP, dan bintang emas — sejak 2009. Unduh aset resmi PNG/WebP/SVG, lihat palet warna resmi, dan aturan pemakaian logo.",
  alternates: { canonical: "/logo" },
  robots: { index: true, follow: true },
};

// Aset resmi yang dipamerkan + diunduh (semua file fisik di /public)
const ASET: ReadonlyArray<{
  file: string;
  nama: string;
  spesifikasi: string;
  deskripsi: string;
  gelap?: boolean;
}> = [
  {
    file: "/logo-master.png",
    nama: "Master Logo 2026 (PNG)",
    spesifikasi: "PNG · 1254×1254 · latar transparan · 666 KB",
    deskripsi:
      "Karya master lengkap: karangan laurel, monogram PP, bintang emas, wordmark PUSATPERIZINAN.COM, dan tulisan PT. Top Konsultan Internasional — SINCE 2009. File induk untuk semua kebutuhan cetak dan digital.",
  },
  {
    file: "/logo-master.webp",
    nama: "Master Logo (WebP Ringan)",
    spesifikasi: "WebP · 1254×1254 · latar transparan · 324 KB",
    deskripsi:
      "Versi terkompresi dari master logo untuk website dan aplikasi — visual identik, ukuran setengahnya, tetap transparan.",
  },
  {
    file: "/logo.png",
    nama: "Logo Karangan PP",
    spesifikasi: "PNG · 800×800 · latar transparan",
    deskripsi:
      "Karangan PP + bintang emas tanpa wordmark — dipakai pada avatar, watermark dokumen, dan tanda tangan digital.",
  },
  {
    file: "/logo-icon.png",
    nama: "Ikon Logo",
    spesifikasi: "PNG · 512×512 · latar transparan",
    deskripsi:
      "Ikon padat untuk favicon aplikasi, ikon chat WhatsApp, dan tampilan kecil pada aplikasi pihak ketiga.",
  },
  {
    file: "/logo-icon-white.png",
    nama: "Ikon Logo (Versi Putih)",
    spesifikasi: "PNG · 512×512 · untuk latar gelap",
    deskripsi:
      "Versi monokrom putih untuk latar gelap — footer situs, header gelap, dan materi presentasi bertema malam.",
    gelap: true,
  },
  {
    file: "/logo.svg",
    nama: "Marka Vektor (SVG)",
    spesifikasi: "SVG vektor · skala tak terbatas",
    deskripsi:
      "Marka perisai emerald + centang emas dalam format vektor — tajam sempurna pada ukuran berapa pun, dari kartu nama hingga billboard.",
  },
  {
    file: "/favicon.svg",
    nama: "Favicon Situs",
    spesifikasi: "SVG · 16–48 px",
    deskripsi:
      "Ikon tab browser dan shortcut perangkat — versi paling ringkas dari identitas PP.",
  },
];

// Palet warna resmi — hasil sampling langsung dari master logo
const WARNA: ReadonlyArray<{ hex: string; nama: string; peran: string; teksGelap?: boolean }> = [
  {
    hex: "#003018",
    nama: "Hijau Hutan",
    peran: "Warna utama — daun laurel, monogram PP, dan wordmark.",
  },
  {
    hex: "#a08020",
    nama: "Emas Klasik",
    peran: "Warna sekunder — bintang lima dan garis pemisah wordmark.",
  },
  {
    hex: "#00885a",
    nama: "Emerald Digital",
    peran: "Warna antarmuka situs dan materi digital pendukung.",
    teksGelap: true,
  },
  {
    hex: "#f39f1d",
    nama: "Emas Terang",
    peran: "Aksen sorot pada elemen digital (badge, hover, highlight).",
    teksGelap: true,
  },
];

const FILOSOFI = [
  {
    icon: Leaf,
    t: "Karangan Laurel Hijau Hutan",
    d: "Simbol keunggulan dan kepatuhan — pengakuan atas rekam jejak perizinan yang dituntaskan benar sejak awal, bukan sekadar cepat.",
  },
  {
    icon: ShieldCheck,
    t: "Monogram PP",
    d: "Inisial PusatPerizinan.com dan payung hukum PT Top Konsultan Internasional — janji bahwa setiap mandat dijalankan resmi dan tercatat.",
  },
  {
    icon: Star,
    t: "Bintang Emas & SINCE 2009",
    d: "Standar emas layanan yang dipertahankan lebih dari satu dekade — sejak 2009 hingga hari ini, untuk klien di dalam dan luar negeri.",
  },
];

const BOLEH = [
  "Gunakan file resmi dari halaman ini apa adanya — tanpa mengedit ulang.",
  "Jaga area aman minimal 25% dari lebar logo di sekelilingnya.",
  "Di latar gelap, gunakan versi putih (Ikon Logo Putih).",
  "Pastikan kontras latar cukup agar bintang emas tetap terbaca.",
];

const LARANG = [
  "Jangan meregangkan, memutar, atau memiringkan logo.",
  "Jangan mengubah warna hijau maupun emas ke varian lain.",
  "Jangan menambahkan efek bayangan, outline, atau gradien ekstra.",
  "Jangan menyusun ulang elemen (mis. memisahkan bintang dari laurel).",
];

export default function LogoOfficialPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Logo Official</li>
          </ol>
        </nav>

        {/* Judul halaman */}
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <Crown className="h-8 w-8 text-primary" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Identitas Visual Resmi · Sejak 2009
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Logo Official {SITE_NAME}
            </h1>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Logo resmi <strong>{SITE_NAME}</strong> — PT Top Konsultan Internasional —
              menghimpun tiga janji dalam satu emblem: karangan laurel hijau hutan,
              monogram <strong>PP</strong>, dan bintang emas. Halaman ini adalah satu-satunya
              sumber resmi aset logo untuk mitra, media, dokumen resmi, dan kebutuhan
              cetak/digital — silakan unduh langsung tanpa izin tambahan, dengan
              mengikuti aturan pemakaian di bawah.
            </p>
          </div>
        </div>

        {/* Showcase master logo — latar gelap */}
        <section aria-labelledby="master" className="mt-10">
          <h2 id="master" className="text-xl font-bold">Master Logo 2026</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Versi paling lengkap dan paling resmi — gunakan ini untuk semua keperluan utama.
          </p>
          <div className="relative mt-4 overflow-hidden rounded-3xl border border-[#a08020]/30 bg-gradient-to-br from-[#fffdf6] via-[#f7fbf8] to-[#eef7f0] shadow-xl">
            {/* kilau dekoratif — emas & emerald di latar terang agar logo hijau tua menonjol */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[#f39f1d]/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-28 right-0 h-72 w-[30rem] rounded-full bg-[#00885a]/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#a08020]/60 to-transparent"
            />
            <div className="relative px-6 py-10 sm:px-12 sm:py-14">
              <img
                src="/logo-master.png"
                alt="Master logo PusatPerizinan.com — karangan laurel hijau hutan, monogram PP, bintang emas, wordmark PUSATPERIZINAN.COM Licensing Consultancy Services, PT Top Konsultan Internasional since 2009"
                width={1254}
                height={1254}
                className="mx-auto w-full max-w-[420px] drop-shadow-[0_18px_40px_rgba(0,48,24,0.22)]"
              />
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-[#003018]/15 bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#003018] shadow-sm">
                  PNG · 1254×1254 · transparan
                </span>
                <span className="rounded-full border border-[#a08020]/40 bg-[#a08020]/10 px-4 py-1.5 text-xs font-semibold text-[#7a5c00] shadow-sm">
                  Hijau Hutan #003018 · Emas Klasik #a08020
                </span>
                <a
                  href="/logo-master.png"
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f39f1d] to-[#bb7400] px-5 py-2 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Unduh PNG Master
                </a>
                <a
                  href="/logo-master.webp"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-[#003018]/25 bg-white/70 px-5 py-2 text-sm font-bold text-[#003018] shadow-sm transition hover:bg-white"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  WebP Ringan
                </a>
              </div>
            </div>
          </div>

          {/* Varian latar */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col items-center rounded-2xl border bg-card px-6 py-8">
              <img
                src="/logo-master.png"
                alt="Master logo pada latar putih"
                width={1254}
                height={1254}
                className="w-full max-w-[240px]"
              />
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Latar Terang / Putih
              </p>
            </div>
            <div className="flex flex-col items-center rounded-2xl border border-primary/25 bg-gradient-to-br from-[#003018] to-[#00512e] px-6 py-8">
              <img
                src="/logo-icon-white.png"
                alt="Ikon logo versi putih pada latar hijau gelap"
                width={512}
                height={512}
                className="w-full max-w-[200px]"
              />
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/70">
                Latar Gelap — gunakan versi putih
              </p>
            </div>
          </div>
        </section>

        {/* Aset resmi lainnya */}
        <section aria-labelledby="aset" className="mt-12">
          <h2 id="aset" className="text-xl font-bold">Aset Resmi Lainnya</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Varian turunan resmi untuk kebutuhan teknis — semua file berada di server resmi situs.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ASET.map((a) => (
              <div key={a.file} className="flex flex-col rounded-2xl border bg-card p-5">
                <div
                  className={`flex h-32 items-center justify-center rounded-xl border ${
                    a.gelap
                      ? "border-white/10 bg-gradient-to-br from-[#003018] to-[#00512e]"
                      : "border-dashed bg-muted/40"
                  }`}
                >
                  <img
                    src={a.file}
                    alt={a.nama}
                    className={
                      a.file.endsWith(".svg")
                        ? "h-20 w-auto"
                        : "max-h-24 w-auto max-w-[80%]"
                    }
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-3 font-bold text-sm">{a.nama}</h3>
                <p className="mt-0.5 text-xs font-medium text-primary">{a.spesifikasi}</p>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {a.deskripsi}
                </p>
                <a
                  href={a.file}
                  download
                  className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 px-3.5 py-1.5 text-xs font-bold text-primary transition hover:bg-primary/10"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden />
                  Unduh
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Palet warna resmi */}
        <section aria-labelledby="warna" className="mt-12">
          <h2 id="warna" className="text-xl font-bold">Palet Warna Resmi</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Dua warna pertama adalah warna asli master logo (hasil sampling piksel); dua berikutnya
            adalah warna pendukung digital situs.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WARNA.map((w) => (
              <div key={w.hex} className="overflow-hidden rounded-2xl border bg-card">
                <div
                  className="flex h-24 items-end p-3"
                  style={{ backgroundColor: w.hex }}
                >
                  <span
                    className={`font-mono text-sm font-bold ${
                      w.teksGelap ? "text-white" : "text-white/90"
                    }`}
                  >
                    {w.hex}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm">{w.nama}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{w.peran}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filosofi */}
        <section aria-labelledby="filosofi" className="mt-12">
          <h2 id="filosofi" className="text-xl font-bold">Makna di Balik Logo</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {FILOSOFI.map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border bg-card p-5">
                <Icon className="h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-2.5 font-bold text-sm">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Aturan pemakaian */}
        <section aria-labelledby="aturan" className="mt-12">
          <h2 id="aturan" className="text-xl font-bold">Aturan Pemakaian</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
              <h3 className="font-bold text-primary">Boleh — pemakaian resmi:</h3>
              <ul className="mt-2.5 space-y-2">
                {BOLEH.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
              <h3 className="font-bold text-destructive">Larangan — jaga integritas logo:</h3>
              <ul className="mt-2.5 space-y-2">
                {LARANG.map((l) => (
                  <li key={l} className="flex items-start gap-2 text-sm">
                    <Ban className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border bg-muted/40 p-5">
            <div className="flex items-start gap-3">
              <Palette className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Butuh format lain (EPS/AI/PDF vektor), versi satu warna, atau izin pemakaian
                khusus untuk media dan kemitraan? Hubungi tim kami melalui halaman{" "}
                <Link href="/kontak" className="font-semibold text-primary hover:underline">
                  Kontak
                </Link>{" "}
                — permintaan lisensi pemakaian logo {SITE_NAME} selalu kami respons cepat.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
