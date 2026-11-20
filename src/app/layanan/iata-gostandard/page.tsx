import type { Metadata } from "next";
import { IataProductPage, iataProductMetadata } from "@/components/iata/product-page";
import { GOSTANDARD_CONTENT } from "@/lib/iata-pages-data";

// /layanan/iata-gostandard — BAGIAN 6 master brief (route statis
// menang atas catch-all /layanan/[...slug]; konten unik per halaman).

export const metadata: Metadata = iataProductMetadata(GOSTANDARD_CONTENT);

export default function Page() {
  return <IataProductPage content={GOSTANDARD_CONTENT} />;
}
