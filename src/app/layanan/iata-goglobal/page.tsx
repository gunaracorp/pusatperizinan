import type { Metadata } from "next";
import { IataProductPage, iataProductMetadata } from "@/components/iata/product-page";
import { GOGLOBAL_CONTENT } from "@/lib/iata-pages-data";

// /layanan/iata-goglobal — BAGIAN 7 master brief (route statis
// menang atas catch-all /layanan/[...slug]; konten unik per halaman).

export const metadata: Metadata = iataProductMetadata(GOGLOBAL_CONTENT);

export default function Page() {
  return <IataProductPage content={GOGLOBAL_CONTENT} />;
}
