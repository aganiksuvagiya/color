import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/structured-data";
import { TrendsPage } from "@/components/trends-page";
import { colorPalettesPath, getLibraryTags, getPalettesForTag } from "@/lib/palette-library";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Trending Palettes",
  alternates: { canonical: "/trends" },
  description: "Explore curated trending color palettes for SaaS, E-commerce, Mobile, and Branding projects.",
};

// Shown on the page and emitted as FAQ structured data, so the two always match.
const FAQ = [
  { question: "What are the trending color palettes right now?", answer: "For 2026, soft futurism, tech-inspired contrast and warmer neutrals lead, alongside nostalgic pastels and holographic accents. This page pairs curated 2026 palettes with fresh category-based ones." },
  { question: "How often do the trending palettes change?", answer: "The curated 2026 palettes stay fixed. The SaaS, e-commerce, mobile and branding palettes are regenerated daily, and you can shuffle for a fresh set at any time." },
  { question: "Can I use these palettes in my own projects?", answer: "Yes. Copy the HEX codes, or open any palette in the HueFlow generator to tweak it, check contrast and export it as CSS, Tailwind, JSON and more." },
  { question: "How do I pick a trending palette for my brand?", answer: "Start with the category closest to your product, then keep the balance of neutrals and accents but swap in a hue that fits your brand personality. Always check text contrast." },
];

const EXPLORE = ["pastel", "neon", "earthy", "vintage", "dark", "minimal", "blue", "pink", "purple", "green", "autumn", "summer"];

export default function Page() {
  const url = `${siteConfig.domain}/trends`;
  const tags = getLibraryTags();
  const explore = EXPLORE.map((slug) => tags.find((t) => t.slug === slug))
    .filter((t): t is (typeof tags)[number] => Boolean(t))
    .map((t) => {
      const ps = getPalettesForTag(t.slug);
      return { name: t.name, href: colorPalettesPath(t.slug), count: ps.length, strip: ps[0]?.colors ?? [t.hex] };
    });

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title: "Trending Color Palettes", description: "Curated trending color palettes for SaaS, E-commerce, Mobile, and Branding.", url })} />
      <StructuredData data={buildFaqSchema(FAQ)} />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", item: siteConfig.domain }, { name: "Trends", item: url }])} />
      <TrendsPage faq={FAQ} explore={explore} />
    </>
  );
}
