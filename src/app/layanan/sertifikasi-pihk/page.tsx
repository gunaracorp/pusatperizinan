import type { Metadata } from "next";
import { CertProductPage, certProductMetadata } from "@/components/sertifikasi/cert-product-page";
import { PIHK_CONTENT } from "@/lib/sertifikasi-pages-data";

// /layanan/sertifikasi-pihk — trilogi sertifikasi travel (route
// statis menang atas catch-all; konten unik, satu sumber harga
// src/lib/sertifikasi-travel.ts).

export const metadata: Metadata = certProductMetadata(PIHK_CONTENT);

export default function Page() {
  return <CertProductPage content={PIHK_CONTENT} />;
}
