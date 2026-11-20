import type { Metadata } from "next";
import { CertProductPage, certProductMetadata } from "@/components/sertifikasi/cert-product-page";
import { PPIU_CONTENT } from "@/lib/sertifikasi-pages-data";

// /layanan/sertifikasi-ppiu — halaman utama SEO trilogi sertifikasi
// travel (route statis menang atas catch-all /layanan/[...slug];
// konten unik, satu sumber harga src/lib/sertifikasi-travel.ts).

export const metadata: Metadata = certProductMetadata(PPIU_CONTENT);

export default function Page() {
  return <CertProductPage content={PPIU_CONTENT} />;
}
