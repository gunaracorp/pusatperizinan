"use client";

// ============================================================
// FORM CEK KELAYAKAN IATA (BAGIAN 9) — client component
// • POST ke /api/leads yang sudah ada (validasi server + notifikasi
//   admin) — TANPA perubahan schema database.
// • Tidak meminta password OSS/email/IATA atau kredensial apa pun.
// • Honeypot sederhana + consent privasi wajib.
// • GA4: submit_iata_lead (BAGIAN 18) — tanpa data pribadi.
// • Konfirmasi hasil = pemeriksaan awal, BUKAN keputusan IATA.
// ============================================================

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { trackEvent } from "@/components/landing/analytics";
import { iataWaLink } from "@/lib/iata";

const STATUS_BADAN = ["Sudah berbadan hukum", "Sedang dalam proses pendirian", "Belum berbadan hukum"] as const;
const JENIS_PERUSAHAAN = ["Travel agent", "Tour and travel", "Ticketing agent", "Umrah travel", "Travel group", "Lainnya"] as const;
const JENIS_AKTIVITAS = ["Penjualan tiket pesawat", "Paket wisata", "Umrah dan perjalanan ibadah", "Hotel dan transportasi", "Beberapa aktivitas"] as const;
const MODEL_MINATI = ["GoLite", "GoStandard", "GoGlobal", "Belum tahu"] as const;
const STATUS_IZIN = ["Sudah ada izin usaha perjalanan", "Sedang diurus", "Belum ada"] as const;
const KESIAPAN_KEUANGAN = ["Sudah ada laporan keuangan (audited)", "Ada laporan internal, belum audited", "Belum ada", "Belum tahu ketentuannya"] as const;
const KEBUTUHAN_CASH = ["Perlu cash facility", "Tidak perlu — kartu kredit/EasyPay", "Belum tahu"] as const;

/** Map model → bucket paket lead API (estimasi nilai kontrak admin). */
const MODEL_TO_PACKAGE: Record<string, string> = {
  GoLite: "UMKM",
  GoStandard: "Bisnis",
  GoGlobal: "Enterprise",
  "Belum tahu": "Belum tahu",
};

const inputCls =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20";
const labelCls = "block text-sm font-semibold text-stone-800";
const optCls = "flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-700 transition has-checked:border-emerald-600 has-checked:bg-emerald-50 has-checked:font-semibold";

export default function IataEligibilityForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [waFollowUp, setWaFollowUp] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: bot mengisi kolom tersembunyi → diam-dianolongkan sebagai sukses palsu.
    if (String(fd.get("company_website_hp") || "").length > 0) {
      setStatus("done");
      return;
    }
    if (!fd.get("consent")) {
      setError("Mohon setujui pemrosesan data pribadi dan kebijakan privasi sebelum mengirim.");
      return;
    }

    const get = (k: string) => String(fd.get(k) || "").trim();
    const namaPj = get("nama_penanggung_jawab");
    const wa = get("whatsapp");
    if (namaPj.length < 2) {
      setError("Nama penanggung jawab wajib diisi (min. 2 karakter).");
      return;
    }
    if (wa.replace(/[^0-9]/g, "").length < 9) {
      setError("Nomor WhatsApp tidak valid.");
      return;
    }

    const jenisPerusahaan = get("jenis_perusahaan");
    const model = get("model_minati") || "Belum tahu";
    const ringkasan = [
      `Perusahaan: ${get("nama_perusahaan") || "-"}`,
      `Status badan usaha: ${get("status_badan") || "-"}`,
      `Jenis: ${jenisPerusahaan || "-"}`,
      `Aktivitas: ${get("aktivitas") || "-"}`,
      `Jumlah lokasi: ${get("jumlah_lokasi") || "-"}`,
      `Negara operasi: ${get("negara") || "-"}`,
      `Model diminati: ${model}`,
      `Status izin usaha: ${get("status_izin") || "-"}`,
      `Laporan keuangan: ${get("kesiapan_keuangan") || "-"}`,
      `Kebutuhan cash facility: ${get("kebutuhan_cash") || "-"}`,
      `Catatan: ${get("info_tambahan") || "-"}`,
    ].join(" | ").slice(0, 1000);

    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: namaPj,
          whatsapp: wa,
          email: get("email"),
          businessType: jenisPerusahaan === "Umrah travel" ? "Travel Ibadah (Haji/Umroh)" : "Pariwisata / Hotel",
          businessDesc: ringkasan,
          package: MODEL_TO_PACKAGE[model] ?? "Belum tahu",
          source: "iata-cek-kelayakan",
        }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        setError(data.error || "Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.");
        setStatus("error");
        return;
      }
      trackEvent("submit_iata_lead", { model });
      setWaFollowUp(
        iataWaLink(
          `Selamat siang PusatPerizinan.com, saya ${namaPj} dari ${get("nama_perusahaan") || "perusahaan kami"} baru saja mengisi formulir Cek Kelayakan IATA (minat: ${model}). Mohon dibantu tindak lanjut pemeriksaan awalnya.`
        )
      );
      setStatus("done");
      form.reset();
    } catch {
      setError("Koneksi bermasalah. Silakan coba lagi atau hubungi kami via WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
        <p className="flex items-center gap-2 text-lg font-bold text-emerald-900">
          <CheckCircle2 className="h-6 w-6" aria-hidden /> Formulir Terkirim
        </p>
        <p className="mt-3 text-sm leading-relaxed text-emerald-900">
          Terima kasih. Data perusahaan Anda telah kami terima dan tim kami akan menghubungi Anda
          melalui WhatsApp/email untuk tahap pemeriksaan awal.
        </p>
        <p className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          Hasil formulir ini merupakan <strong>pemeriksaan awal administratif</strong> oleh
          PusatPerizinan.com — bukan keputusan kelayakan resmi IATA. Kelayakan final mengikuti
          ketentuan IATA dan hukum setempat.
        </p>
        {waFollowUp && (
          <a
            href={waFollowUp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> Lanjut via WhatsApp Sekarang
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8" noValidate={false}>
      {/* Honeypot — tersembunyi dari manusia */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website_hp">Website perusahaan (jangan diisi)</label>
        <input id="company_website_hp" name="company_website_hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="nama_perusahaan" className={labelCls}>1. Nama perusahaan</label>
          <input id="nama_perusahaan" name="nama_perusahaan" type="text" required className={inputCls} placeholder="PT Contoh Travel Indonesia" />
        </div>
        <div>
          <label htmlFor="nama_penanggung_jawab" className={labelCls}>2. Nama penanggung jawab *</label>
          <input id="nama_penanggung_jawab" name="nama_penanggung_jawab" type="text" required className={inputCls} placeholder="Nama lengkap" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>3. Email</label>
          <input id="email" name="email" type="email" className={inputCls} placeholder="nama@perusahaan.co.id" />
        </div>
        <div>
          <label htmlFor="whatsapp" className={labelCls}>4. Nomor WhatsApp *</label>
          <input id="whatsapp" name="whatsapp" type="tel" required className={inputCls} placeholder="0812xxxxxxxx" />
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className={labelCls}>5. Status perusahaan</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {STATUS_BADAN.map((s) => (
            <label key={s} className={optCls}>
              <input type="radio" name="status_badan" value={s} required className="accent-emerald-700" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className={labelCls}>6. Jenis perusahaan</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {JENIS_PERUSAHAAN.map((s) => (
            <label key={s} className={optCls}>
              <input type="radio" name="jenis_perusahaan" value={s} required className="accent-emerald-700" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className={labelCls}>7. Jenis aktivitas</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {JENIS_AKTIVITAS.map((s) => (
            <label key={s} className={optCls}>
              <input type="radio" name="aktivitas" value={s} required className="accent-emerald-700" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="jumlah_lokasi" className={labelCls}>8. Jumlah lokasi</label>
          <input id="jumlah_lokasi" name="jumlah_lokasi" type="text" className={inputCls} placeholder="Contoh: 2 (Jakarta, Surabaya)" />
        </div>
        <div>
          <label htmlFor="negara" className={labelCls}>9. Negara operasi</label>
          <input id="negara" name="negara" type="text" className={inputCls} placeholder="Contoh: Indonesia" />
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className={labelCls}>10. Model yang diminati</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-4">
          {MODEL_MINATI.map((s) => (
            <label key={s} className={optCls}>
              <input type="radio" name="model_minati" value={s} className="accent-emerald-700" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className={labelCls}>11. Status izin usaha</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {STATUS_IZIN.map((s) => (
            <label key={s} className={optCls}>
              <input type="radio" name="status_izin" value={s} required className="accent-emerald-700" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className={labelCls}>12. Kesiapan laporan keuangan</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {KESIAPAN_KEUANGAN.map((s) => (
            <label key={s} className={optCls}>
              <input type="radio" name="kesiapan_keuangan" value={s} required className="accent-emerald-700" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className={labelCls}>13. Kebutuhan cash facility</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {KEBUTUHAN_CASH.map((s) => (
            <label key={s} className={optCls}>
              <input type="radio" name="kebutuhan_cash" value={s} required className="accent-emerald-700" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="info_tambahan" className={labelCls}>14. Informasi tambahan (opsional)</label>
        <textarea id="info_tambahan" name="info_tambahan" rows={3} className={inputCls} placeholder="Ceritakan singkat kondisi dan rencana perusahaan Anda" />
      </div>

      <div className="mt-6 rounded-xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-500">
        Formulir ini <strong>tidak meminta dan tidak menyimpan</strong> password OSS, password
        email, password IATA, atau kredensial akun pribadi apa pun. Jangan pernah membagikan
        kredensial melalui formulir atau pesan apa pun.
      </div>

      <div className="mt-4 flex items-start gap-3">
        <input id="consent" name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-emerald-700" />
        <label htmlFor="consent" className="text-xs leading-relaxed text-stone-600">
          Saya menyetujui pemrosesan data pribadi perusahaan oleh PusatPerizinan.com untuk keperluan
          pemeriksaan awal ini, sesuai{" "}
          <Link href="/kebijakan-privasi" className="font-semibold text-emerald-700 hover:underline">
            Kebijakan Privasi
          </Link>
          . *
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="iata-shine relative mt-6 flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-800 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Mengirim…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden /> Kirim Pemeriksaan Kelayakan
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-stone-500">
        Data dikirim aman melalui server kami dan diperiksa ulang di sisi server (validasi + proteksi spam).
      </p>
    </form>
  );
}
