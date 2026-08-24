import { TrendsPage } from "@/components/trends-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending Palettes | HueFlow",
  description: "Explore curated trending color palettes for SaaS, E-commerce, Mobile, and Branding projects.",
};

export default function Page() {
  return (
    <>
      <StructuredData data={buildWebPageSchema({ title: "Trending Color Palettes", description: "Curated trending color palettes for SaaS, E-commerce, Mobile, and Branding.", url: `${siteConfig.domain}/trends` })} />
      <TrendsPage />
    </>
  );
}
