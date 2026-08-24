import { ExploreColors } from "@/components/explore-colors";
import { StructuredData } from "@/components/seo/structured-data";
import { buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Palettes",
  description: "Endless color palettes generated fresh. Browse by mood and open any palette instantly in the generator.",
};

export default function Page() {
  return (
    <>
      <StructuredData data={buildWebPageSchema({ title: "Explore Color Palettes", description: "Endless color palettes generated fresh. Browse by mood and open any palette instantly.", url: `${siteConfig.domain}/explore` })} />
      <ExploreColors />
    </>
  );
}
