"use client";

// Pelacak klik CTA trilogi sertifikasi travel → GA4. Tanpa data
// pribadi — hanya nama event + kode produk. Fallback diam bila
// gtag tak ada. Pola identik TrackLink IATA (components/iata).

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/components/landing/analytics";

type CertEventName =
  | "click_cert_consultation"
  | "click_cert_form"
  | "click_cert_wa";

export function CertTrackLink({
  href,
  event,
  product,
  children,
  className,
  external = false,
}: {
  href: string;
  event: CertEventName;
  product: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const onClick = () => trackEvent(event, { product });
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
