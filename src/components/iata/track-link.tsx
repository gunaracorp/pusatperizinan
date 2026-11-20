"use client";

// Pelacak klik CTA IATA → GA4 (BAGIAN 18). Tanpa data pribadi —
// hanya nama event + kode produk. Fallback diam bila gtag tak ada.

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/components/landing/analytics";

type EventName =
  | "click_product_golite"
  | "click_product_gostandard"
  | "click_product_goglobal"
  | "click_consultation"
  | "click_check_eligibility"
  | "click_request_quotation";

export function TrackLink({
  href,
  event,
  params,
  children,
  className,
  external = false,
}: {
  href: string;
  event: EventName;
  params?: Record<string, unknown>;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const onClick = () => trackEvent(event, params);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
