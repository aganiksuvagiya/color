import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { buildHubMetadata } from "@/lib/seo/page-utils";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema, buildSpeakableSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { getHubByPath } from "@/lib/seo/content";
import { PalettesHubView } from "@/components/seo/palettes-hub-page";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = buildHubMetadata("/palettes");
export const revalidate = false;

const faqSchema = buildFaqSchema([
  { question: "What is a color palette?", answer: "A color palette is a set of colors chosen to work together in a design. It typically includes a primary brand color, secondary colors, and neutral tones for backgrounds and text." },
  { question: "How many colors should a brand palette have?", answer: "A brand palette typically has 3-6 colors: one primary, one or two secondary, and two or three neutrals. Keeping it minimal ensures consistency across touchpoints." },
  { question: "What colors work well for SaaS products?", answer: "Blue, teal, and purple are commonly used for SaaS because they communicate trust, clarity, and innovation. Pair with white backgrounds and strong neutral tones." },
  { question: "How do I choose a color palette for my brand?", answer: "Start with your brand personality (trustworthy, bold, playful), pick a primary hue that matches, then build secondary and neutral tones. Use HueFlow's palette generator for instant results." },
]);

export default function PalettesPage() {
  const hub = getHubByPath("/palettes");
  if (!hub) notFound();

  const url = `${siteConfig.domain}${hub.path}`;

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title: hub.title, description: hub.description, url })} />
      <StructuredData data={buildCollectionPageSchema({ title: hub.title, description: hub.description, url, items: hub.featuredLinks.map((l) => ({ title: l.title, href: l.href })) })} />
      <StructuredData data={faqSchema} />
      <StructuredData data={buildSpeakableSchema(["h1", "h2", ".hub-description", ".hub-answer"])} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: hub.title, item: url },
        ])}
      />
      <PalettesHubView hub={hub} />
    </>
  );
}
