"use client";

// ============================================================
// PUSATPERIZINAN.COM — ChatWidget Lazy Mount (PERF-02)
// ============================================================
// ROADMAP-99 / Core Web Vitals (PSI mobile: TBT 1.520 ms):
//   Chat widget (framer-motion + state chat + chunk sendiri)
//   sebelumnya dirender sinkron saat hidrasi homepage → menambah
//   beban main-thread di jalur kritis.
//
//   Solusi: widget baru di-mount saat browser IDLE (atau fallback
//   1,5 dtk), chunk JS-nya di-plit via next/dynamic + ssr:false.
//   UX tidak berubah — widget tetap muncul otomatis beberapa ratus
//   ms setelah halaman interaktif, sebelum pengguna sempat scroll
//   ke bawah.
// ============================================================

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ChatWidgetInner = dynamic(
  () => import("@/components/landing/chat-widget").then((m) => ({ default: m.ChatWidget })),
  { ssr: false, loading: () => null }
);

export function ChatWidgetLazy() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    // requestIdleCallback (Chrome/Edge/Firefox) — tanpa mendahului
    // interaksi pengguna; fallback setTimeout untuk Safari lama.
    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setMount(true), { timeout: 3000 });
      return () => {
        if (typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(id);
      };
    }
    const t = window.setTimeout(() => setMount(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  return mount ? <ChatWidgetInner /> : null;
}
