"use client";

import { useEffect, useState } from "react";
import { Activity, Clock } from "lucide-react";

// ============================================================
// LIVE ACTIVITY FEED (langkah 46 ROADMAP-99)
// "S*** baru memproses Pendaftaran NIB — 3 menit lalu"
// ============================================================
// • Data 100% dari order/lead NYATA 24 jam terakhir via /api/activity
//   — teranonimkan server-side (huruf pertama + ***, tanpa PII).
// • DB kosong → widget TIDAK TAMPIL (tidak ada aktivitas palsu —
//   kejujuran = fondasi trust).
// • Lazy: fetch pasca-hydration, nol dampak LCP/CLS; posisi fixed
//   bottom-left, auto-hide beberapa detik, rotasi tiap 7 detik.
// • Sembunyi di halaman checkout/admin (jangan ganggu transaksi).
// • prefers-reduced-motion → tampil statis tanpa animasi.
// ============================================================

interface ActivityItem {
  kind: "order" | "lead";
  initial: string;
  service: string;
  minutesAgo: number;
}

function usiaLabel(m: number): string {
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  return `${h} jam lalu`;
}

export function ActivityFeed() {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Jangan tampil di jalur transaksi & panel internal
    const p = window.location.pathname;
    if (
      p.startsWith("/checkout") ||
      p.startsWith("/admin") ||
      p.startsWith("/webmaster") ||
      p === "/"
    ) {
      return;
    }

    let alive = true;
    const load = () =>
      fetch("/api/activity")
        .then((r) => r.json())
        .then((j: { items?: ActivityItem[] }) => {
          if (alive && Array.isArray(j.items) && j.items.length > 0) {
            setItems(j.items);
          }
        })
        .catch(() => undefined);

    // Muat saat idle — nol persaingan dengan LCP
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(load, { timeout: 4000 })
        : (setTimeout(load, 2000) as unknown as number);

    return () => {
      alive = false;
      if (typeof window.cancelIdleCallback === "function" && typeof idle === "number") {
        window.cancelIdleCallback(idle);
      } else {
        clearTimeout(idle as unknown as number);
      }
    };
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const rotate = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % items.length);
        setVisible(true);
      }, 350);
    }, 7000);
    return () => clearInterval(rotate);
  }, [items.length]);

  if (items.length === 0) return null;

  const a = items[idx % items.length];

  return (
    <div
      aria-live="polite"
      aria-hidden={false}
      className={`fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)] transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } motion-reduce:transition-none`}
    >
      <div className="flex items-center gap-3 rounded-full border border-emerald-600/30 bg-background/95 py-2 pl-3 pr-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <p className="min-w-0 text-xs sm:text-sm text-foreground/90">
          <span className="font-bold">{a.initial}</span>{" "}
          {a.kind === "order" ? "baru memproses" : "baru menanyakan"}{" "}
          <span className="font-semibold text-primary line-clamp-1">{a.service}</span>
          <span className="ml-1.5 inline-flex items-center gap-0.5 text-muted-foreground">
            <Clock className="inline h-3 w-3" aria-hidden /> {usiaLabel(a.minutesAgo)}
          </span>
        </p>
      </div>
    </div>
  );
}
