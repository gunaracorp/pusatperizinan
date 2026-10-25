import Script from "next/script";

// ============================================================
// PUSATPERIZINAN.COM — GA4 + MICROSOFT CLARITY (ROADMAP-99 langkah 4)
// Aktif HANYA bila env diisi — tanpa ID → tidak ada script pihak
// ketiga → performa tetap bersih (LCP/CWV terjaga).
//   NEXT_PUBLIC_GA_ID       = "G-XXXXXXXXXX"  → GA4 (gtag.js)
//   NEXT_PUBLIC_CLARITY_ID  = 10 karakter alfanumerik (project ID)
//                             → Microsoft Clarity (heatmap + session recording, gratis)
// Konfigurasi event konversi disarankan:
//   - whatsapp_click  (semua tautan wa.me — termasuk FloatingWhatsApp langkah 5)
//   - lead_submit     (form konsultasi)
//   - chat_message    (AI chat RIZKI)
// Lihat docs/SEARCH-CONSOLE-ANALYTICS.md + docs/CHECKLIST-KREDENSIAL-LANGKAH-1-2.md
// ============================================================

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const gaOk = !!gaId && /^G-[A-Z0-9]{8,}$/.test(gaId);
  // Project ID Clarity: 10 karakter alfanumerik (mis. "abcdefghij").
  const clarityOk = !!clarityId && /^[a-z0-9]{10,12}$/i.test(clarityId);
  if (!gaOk && !clarityOk) return null;

  return (
    <>
      {gaOk && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
          </Script>
        </>
      )}
      {clarityOk && (
        // Snippet resmi Microsoft Clarity — strategy afterInteractive agar
        // tidak menggeser LCP; heatmap & recording mengalir tanpa setup tambahan.
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
    </>
  );
}

/** Helper event tracking — aman dipanggil walau GA belum aktif. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", name, params);
}
