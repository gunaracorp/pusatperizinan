import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRY_PAGES, getIndustryPage } from "@/lib/seo-pages";
import { classifyPage } from "@/lib/seo-policy";
import { SeoLandingView } from "@/components/seo/landing-renderer";
import { ogImageUrl } from "@/lib/og-template";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return INDUSTRY_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) return {};
  const prose = `${page.intro.join(" ")} ${page.sections
    .map((s) => `${s.heading} ${(s.paras ?? []).join(" ")} ${(s.bullets ?? []).join(" ")}`)
    .join(" ")}`;
  const index = classifyPage({
    slug: page.slug,
    kind: page.kind,
    intro: prose,
    faq: page.faq,
    features: page.sections.map((s) => s.heading),
  }).index;
  return {
    title: page.title,
    description: page.metaDesc,
    keywords: page.keywords,
    alternates: { canonical: `/industri/${page.slug}` },
    openGraph: {
    images: [{ url: ogImageUrl({ title: page.title }), width: 1200, height: 630, alt: page.title }],
   title: page.title, description: page.metaDesc, url: `/industri/${page.slug}`, type: "article", siteName: "PusatPerizinan.com", locale: "id_ID" },
    twitter: { card: "summary_large_image", title: page.title, description: page.metaDesc },
    robots: { index, follow: true },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) notFound();
  return <SeoLandingView page={page} />;
}
