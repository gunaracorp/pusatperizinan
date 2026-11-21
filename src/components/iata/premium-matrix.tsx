import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers, MessageCircle, Table2 } from "lucide-react";
import {
  IATA_PRODUCTS, IATA_BUNDLES, IATA_BUNDLE_CATATAN, PROMO_LABEL,
  HARGA_CATATAN_PENDEK, IATA_URLS, fmtIdrIata, iataWaLink,
} from "@/lib/iata";
import { Reveal } from "@/components/iata/iata-motion";

// ============================================================
// PUSATPERIZINAN.COM — IATA PREMIUM MATRIX + BUNDLE PRICING
// (Task 52) Komponen server untuk pillar page: matriks harga
// premium tiga model akreditasi + paket gabungan komponen.
// Seluruh harga mengalir dari src/lib/iata.ts — tanpa hardcode.
// ============================================================

const bundleWaMessage = (nama: string, promo: number): string =>
  `Selamat siang, saya tertarik dengan paket gabungan "${nama}" (harga promo ${fmtIdrIata(promo)}). Mohon informasi mengenai pemeriksaan kelayakan, dokumen, ruang lingkup, dan tahapan konsultasi.`;

export function IataPremiumMatrix() {
  const waStarter = iataWaLink(bundleWaMessage(IATA_BUNDLES[0].nama, IATA_BUNDLES[0].hargaPromo));
  const waPro = iataWaLink(bundleWaMessage(IATA_BUNDLES[1].nama, IATA_BUNDLES[1].hargaPromo));

  return (
    <>
      {/* PREMIUM MATRIX — tabel harga tiga model akreditasi */}
      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="matrix">
        <Reveal>
          <h2 id="matrix" className="flex items-center gap-2 text-2xl font-bold text-stone-900 md:text-3xl">
            <Table2 className="h-6 w-6 text-emerald-700" aria-hidden /> IATA Premium Matrix — Harga Tiga Model
          </h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            Satu tabel untuk membandingkan seluruh model akreditasi: profil perusahaan yang cocok,
            harga katalog, dan harga promo 2026. Harga mengalir dari satu sumber kebenaran dengan
            halaman produk masing-masing.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-emerald-900 text-white">
                  <th scope="col" className="px-5 py-4 font-bold">Model Akreditasi</th>
                  <th scope="col" className="px-5 py-4 font-bold">Cocok Untuk</th>
                  <th scope="col" className="px-5 py-4 font-bold">Harga Katalog</th>
                  <th scope="col" className="px-5 py-4 font-bold">Promo 2026</th>
                </tr>
              </thead>
              <tbody>
                {IATA_PRODUCTS.map((p, i) => (
                  <tr key={p.kode} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                    <th scope="row" className="px-5 py-4 align-top">
                      <Link href={p.url} className="font-bold text-emerald-800 hover:underline">
                        {p.namaPendek}
                      </Link>
                      <p className="mt-0.5 text-xs font-medium text-stone-500">{p.model}</p>
                    </th>
                    <td className="px-5 py-4 align-top leading-relaxed text-stone-600">{p.cocokUntuk}</td>
                    <td className="px-5 py-4 align-top text-stone-400 line-through">{fmtIdrIata(p.hargaKatalog)}</td>
                    <td className="px-5 py-4 align-top">
                      <span className="font-extrabold text-emerald-900">
                        {p.hargaMulaiDari ? "Mulai " : ""}{fmtIdrIata(p.hargaPromo)}
                      </span>
                      <p className="mt-0.5 text-xs text-amber-600">
                        {p.hargaMulaiDari ? "Penawaran khusus sesuai cakupan negara — " : ""}{PROMO_LABEL}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 text-xs leading-relaxed text-stone-500">
            *{HARGA_CATATAN_PENDEK} Biaya resmi IATA (application fee, annual fee, financial security)
            dihitung terpisah oleh IATA.
          </p>
        </Reveal>
      </section>

      {/* BUNDLE PRICING — gabungan promo komponen (pola Task 51) */}
      <section className="bg-stone-50 py-14" aria-labelledby="bundle">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 id="bundle" className="flex items-center gap-2 text-2xl font-bold text-stone-900 md:text-3xl">
              <Layers className="h-6 w-6 text-emerald-700" aria-hidden /> Bundle Pricing — Legalitas + Akreditasi Sekaligus
            </h2>
            <p className="mt-2 max-w-3xl text-stone-600">
              Paket gabungan jasa legalitas domestik dan persiapan akreditasi IATA. Harga bundle
              adalah penawaran gabungan promo komponen — komponen tetap dapat diambil terpisah.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {IATA_BUNDLES.map((b, i) => (
              <Reveal key={b.kode} delay={i * 140} as="article" className={i === 1 ? "iata-beam h-full" : "h-full"}>
                <div className="iata-card flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6">
                  <span className="font-mono text-[11px] font-bold tracking-wider text-amber-600">{b.kode}</span>
                  <h3 className="mt-1.5 text-xl font-bold text-stone-900">{b.nama}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{b.deskripsi}</p>
                  <ul className="mt-4 space-y-2">
                    {b.komponen.map((k) => (
                      <li key={k} className="flex items-start gap-2 text-sm leading-relaxed text-stone-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                        {k}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3">
                    <p className="text-xs font-semibold text-stone-500">Harga promo gabungan</p>
                    <p className="mt-0.5 text-xl font-extrabold text-emerald-900">{fmtIdrIata(b.hargaPromo)}</p>
                    <p className="mt-0.5 text-xs text-stone-500">
                      Normal <span className="line-through">{fmtIdrIata(b.hargaNormal)}</span>
                      {" "}· <span className="font-bold text-amber-600">
                        Hemat {fmtIdrIata(b.hargaNormal - b.hargaPromo)}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Link
                      href={IATA_URLS.konsultasi}
                      className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                    >
                      Konsultasikan Paket <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <a
                      href={i === 0 ? waStarter : waPro}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-300 px-5 py-3 text-sm font-bold text-stone-700 transition hover:bg-stone-100"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-6 text-xs leading-relaxed text-stone-500">
              *{IATA_BUNDLE_CATATAN} {HARGA_CATATAN_PENDEK}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
