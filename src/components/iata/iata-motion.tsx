"use client";

// ============================================================
// PUSATPERIZINAN.COM — IATA MOTION SYSTEM (CSS-FIRST, RINGAN)
// ============================================================
// Prinsip performa (selaras konvensi Footer v6 repo):
//   • Hanya properti compositor: transform & opacity — tanpa
//     animasi layout (width/height/top/left) dan tanpa
//     background-position yang memicu repaint besar.
//   • Reveal via IntersectionObserver: class ditambahkan sekali,
//     observer langsung di-unobserve (nol kerja per frame JS).
//   • Stagger murni CSS via --d (delay) — tanpa timeline JS.
//   • Semua animasi mati total pada prefers-reduced-motion: reduce.
//   • Nol dependensi tambahan (tanpa framer-motion di halaman IATA).
// ============================================================

import { useEffect, useRef, type ReactNode } from "react";

/** Style global sekali per halaman — keyframes + kelas utilitas. */
export function IataMotionStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
.iata-reveal{opacity:0;transform:translate3d(0,26px,0);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);transition-delay:var(--d,0ms);will-change:opacity,transform}
.iata-reveal.iata-in{opacity:1;transform:translate3d(0,0,0)}
@keyframes iata-float{
  0%,100%{transform:translate3d(0,0,0) scale(1)}
  33%{transform:translate3d(18px,-22px,0) scale(1.05)}
  66%{transform:translate3d(-14px,12px,0) scale(.97)}
}
.iata-orb{position:absolute;border-radius:9999px;filter:blur(60px);opacity:.5;pointer-events:none;animation:iata-float 14s ease-in-out infinite;will-change:transform}
@keyframes iata-crossfade{
  0%,100%{opacity:.6;transform:scale(1) translate3d(0,0,0)}
  50%{opacity:1;transform:scale(1.08) translate3d(-1.5%,-1%,0)}
}
.iata-hero-grad{position:absolute;inset:-10%;pointer-events:none;animation:iata-crossfade 18s ease-in-out infinite;will-change:opacity,transform}
@keyframes iata-shine{
  0%{transform:translate3d(-120%,0,0)}
  100%{transform:translate3d(220%,0,0)}
}
.iata-shine{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.iata-shine::after{content:"";position:absolute;top:0;bottom:0;width:38%;background:linear-gradient(105deg,transparent 8%,rgba(255,255,255,.16) 50%,transparent 92%);animation:iata-shine 6.5s ease-in-out infinite;will-change:transform}
@keyframes iata-beam{
  0%{--beam-angle:0deg}
  100%{--beam-angle:360deg}
}
@property --beam-angle{syntax:"<angle>";initial-value:0deg;inherits:false}
.iata-beam{position:relative;border:1px solid rgba(16,185,129,.35)}
.iata-beam::before{content:"";position:absolute;inset:-1px;border-radius:inherit;padding:1px;background:conic-gradient(from var(--beam-angle),rgba(251,191,36,0) 0%,rgba(251,191,36,.85) 12%,rgba(251,191,36,0) 26%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:iata-beam 7s linear infinite;pointer-events:none}
.iata-card{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease,border-color .35s ease;will-change:transform}
.iata-card:hover{transform:translate3d(0,-6px,0);box-shadow:0 18px 40px -18px rgba(6,78,59,.35);border-color:rgba(16,185,129,.45)}
@media (prefers-reduced-motion: reduce){
  .iata-reveal{opacity:1 !important;transform:none !important;transition:none !important}
  .iata-orb,.iata-hero-grad,.iata-shine::after,.iata-beam::before{animation:none !important}
  .iata-card,.iata-card:hover{transform:none !important;transition:none !important}
}
`,
      }}
    />
  );
}

/**
 * Wrapper reveal-on-scroll: konten memudar naik sekali saat masuk
 * viewport. `delay` (ms) untuk efek stagger antar kartu.
 * Tanpa IO (SSR): tetap dirender, class iata-reveal murni visual.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("iata-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("iata-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as any}
      className={`iata-reveal ${className}`}
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
