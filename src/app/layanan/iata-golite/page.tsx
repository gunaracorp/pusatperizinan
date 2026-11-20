import type { Metadata } from "next";
import { IataProductPage, iataProductMetadata } from "@/components/iata/product-page";
import { GOLITE_CONTENT } from "@/lib/iata-pages-data";

// /layanan/iata-golite — BAGIAN 5 master brief (route statis menang
// atas catch-all /layanan/[...slug]; konten unik per halaman).

export const metadata: Metadata = iataProductMetadata(GOLITE_CONTENT);

export default function Page() {
  return <IataProductPage content={GOLITE_CONTENT} />;
}
