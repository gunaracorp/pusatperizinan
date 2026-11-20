"use client";

// Form konsultasi ringkas (BAGIAN 10) → POST /api/leads
// (source: iata-konsultasi). Tanpa data kredensial apa pun.

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { trackEvent } from "@/components/landing/analytics";

const MODEL_MINATI = ["GoLite", "GoStandard", "GoGlobal", "Belum tahu"] as const;
const inputCls =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20";

export default function IataConsultForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (String(fd.get("website_hp") || "").length > 0) {
      setStatus("done"); // honeypot
      return;
    }
    if (!fd.get("consent")) {
      setError("Mohon setujui pemrosesan data pribadi sebelum mengirim.");
      return;
    }
    const name = String(fd.get("nama") || "").trim();
    const wa = String(fd.get("whatsapp") || "").trim();
    if (name.length < 2 || wa.replace(/[^0-9]/g, "").length < 9) {
      setError("Nama dan nomor WhatsApp wajib diisi dengan benar.");
      return;
    }
    const model = String(fd.get("model") || "Belum tahu");
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp: wa,
          email: String(fd.get("email") || "").trim(),
          businessType: "Pariwisata / Hotel",
          businessDesc: `Konsultasi IATA — model diminati: ${model}. Perusahaan: ${String(fd.get("perusahaan") || "-")}. Pesan: ${String(fd.get("pesan") || "-")}`.slice(0, 1000),
          package: model === "GoGlobal" ? "Enterprise" : model === "GoStandard" ? "Bisnis" : model === "GoLite" ? "UMKM" : "Belum tahu",
          source: "iata-konsultasi",
        }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        setError(data.error || "Terjadi kesalahan. Silakan coba lagi.");
        setStatus("error");
        return;
      }
      trackEvent("click_consultation", { model, via: "form" });
      setStatus("done");
      form.reset();
    } catch {
      setError("Koneksi bermasalah. Silakan coba lagi.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <p className="flex items-center gap-2 font-bold text-emerald-900">
          <CheckCircle2 className="h-5 w-5" aria-hidden /> Terima kasih — permintaan konsultasi terkirim.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-emerald-800">
          Tim kami akan menghubungi Anda melalui WhatsApp/email. Untuk pemeriksaan kelayakan yang
          lebih terstruktur, gunakan{" "}
          <Link href="/cek-kelayakan-iata" className="font-semibold underline">
            formulir Cek Kelayakan IATA
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-stone-200 bg-white p-6">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Website (jangan diisi)</label>
        <input id="website_hp" name="website_hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nama" className="block text-sm font-semibold text-stone-800">Nama *</label>
          <input id="nama" name="nama" type="text" required className={`${inputCls} mt-1.5`} placeholder="Nama Anda" />
        </div>
        <div>
          <label htmlFor="perusahaan" className="block text-sm font-semibold text-stone-800">Perusahaan</label>
          <input id="perusahaan" name="perusahaan" type="text" className={`${inputCls} mt-1.5`} placeholder="PT Contoh Travel" />
        </div>
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-semibold text-stone-800">WhatsApp *</label>
          <input id="whatsapp" name="whatsapp" type="tel" required className={`${inputCls} mt-1.5`} placeholder="0812xxxxxxxx" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-stone-800">Email</label>
          <input id="email" name="email" type="email" className={`${inputCls} mt-1.5`} placeholder="nama@perusahaan.co.id" />
        </div>
      </div>
      <fieldset className="mt-4">
        <legend className="block text-sm font-semibold text-stone-800">Model yang diminati</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {MODEL_MINATI.map((m) => (
            <label
              key={m}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 px-3 py-2.5 text-sm transition has-checked:border-emerald-600 has-checked:bg-emerald-50 has-checked:font-semibold"
            >
              <input type="radio" name="model" value={m} className="accent-emerald-700" defaultChecked={m === "Belum tahu"} />
              {m}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-4">
        <label htmlFor="pesan" className="block text-sm font-semibold text-stone-800">Pesan (opsional)</label>
        <textarea id="pesan" name="pesan" rows={3} className={`${inputCls} mt-1.5`} placeholder="Profil singkat perusahaan dan kebutuhan akreditasi" />
      </div>
      <div className="mt-4 flex items-start gap-3">
        <input id="consent" name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-emerald-700" />
        <label htmlFor="consent" className="text-xs leading-relaxed text-stone-600">
          Saya menyetujui pemrosesan data pribadi sesuai{" "}
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
        className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Mengirim…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden /> Ajukan Konsultasi IATA
          </>
        )}
      </button>
    </form>
  );
}
