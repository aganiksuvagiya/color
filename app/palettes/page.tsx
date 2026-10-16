import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PalettesLanding } from "@/components/seo/palettes-landing";
import { StructuredData } from "@/components/seo/structured-data";
import { colorPalettesPath, generatorHref, getLibraryPalettes, getLibraryTags, getPalettesForTag, type TagKind } from "@/lib/palette-library";
import { getHubByPath } from "@/lib/seo/content";
import { buildHubMetadata } from "@/lib/seo/page-utils";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema, buildSpeakableSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = buildHubMetadata("/palettes");
export const revalidate = false;

// Shown on the page and emitted as FAQ structured data, so the two always match.
const FAQ = [
  { question: "What is a color palette?", answer: "A color palette is a set of colors chosen to work together in a design. It typically includes a primary brand color, secondary colors, and neutral tones for backgrounds and text." },
  { question: "How many colors should a brand palette have?", answer: "A brand palette typically has 3-6 colors: one primary, one or two secondary, and two or three neutrals. Keeping it minimal ensures consistency across touchpoints." },
  { question: "What colors work well for SaaS products?", answer: "Blue, teal, and purple are commonly used for SaaS because they communicate trust, clarity, and innovation. Pair with white backgrounds and strong neutral tones." },
  { question: "How do I choose a color palette for my brand?", answer: "Start with your brand personality (trustworthy, bold, playful), pick a primary hue that matches, then build secondary and neutral tones. Use HueFlow's palette generator for instant results." },
];

// Industry label for each curated palette page, from its slug.
const INDUSTRIES: [string, string][] = [
  ["saas", "SaaS"], ["fintech", "Fintech"], ["luxury", "Luxury"], ["dtc", "DTC"],
  ["creative", "Creative"], ["wellness", "Wellness"], ["startup", "Startup"], ["dark", "Dark mode"],
];

// A spread of styles for the "Popular palettes" grid.
const POPULAR = ["Miami Nights", "Desert Clay", "Baby Shower", "Midnight Code", "70s Lounge", "Emerald Estate", "Ocean Breeze", "Pumpkin Spice", "Lavender Field"];

const STYLE_CHIPS = ["pastel", "neon", "earthy", "vintage", "dark", "minimal", "bright", "luxury"];

export default function PalettesPage() {
  const hub = getHubByPath("/palettes");
  if (!hub) notFound();

  const url = `${siteConfig.domain}${hub.path}`;
  const library = getLibraryPalettes();
  const tags = getLibraryTags();

  const curated = hub.featuredLinks
    .filter((l) => l.paletteColors?.length)
    .map((l) => {
      const colors = l.paletteColors ?? [];
      return {
        title: l.title,
        href: l.href,
        industry: INDUSTRIES.find(([key]) => l.href.includes(key))?.[1] ?? "Other",
        colors,
        generatorHref: generatorHref({ name: l.title.replace(/ Palette$/, ""), colors }),
      };
    });

  const popular = POPULAR.map((n) => library.find((p) => p.name === n))
    .filter((p): p is (typeof library)[number] => Boolean(p))
    .map((p) => ({ id: p.id, name: p.name, colors: p.colors, generatorHref: generatorHref(p) }));

  // Each tile previews a palette no earlier tile has used, so no two tiles look alike
  // (e.g. "Cyber Glow" is first in both Neon and Dark).
  const usedPreviews = new Set<string>();
  const tagGroups = (["style", "color", "season"] as TagKind[]).map((kind) => ({
    label: kind,
    tags: tags
      .filter((t) => t.kind === kind)
      .map((t) => {
        const ps = getPalettesForTag(t.slug);
        const preview = ps.find((p) => !usedPreviews.has(p.id)) ?? ps[0];
        if (preview) usedPreviews.add(preview.id);
        return { slug: t.slug, name: t.name, href: colorPalettesPath(t.slug), count: ps.length, strip: preview?.colors ?? [t.hex] };
      }),
  }));

  const styleChips = STYLE_CHIPS.map((slug) => tags.find((t) => t.slug === slug))
    .filter((t): t is (typeof tags)[number] => Boolean(t))
    .map((t) => ({ name: `${t.name} palettes`, href: colorPalettesPath(t.slug), hex: t.hex }));

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title: hub.title, description: hub.description, url })} />
      <StructuredData data={buildCollectionPageSchema({ title: hub.title, description: hub.description, url, items: hub.featuredLinks.map((l) => ({ title: l.title, href: l.href })) })} />
      <StructuredData data={buildFaqSchema(FAQ)} />
      <StructuredData data={buildSpeakableSchema(["h1", "h2", ".hub-description", ".hub-answer"])} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: hub.title, item: url },
        ])}
      />
      <PalettesLanding
        description={hub.description}
        curated={curated}
        library={popular}
        libraryTotal={library.length}
        tagGroups={tagGroups}
        styleChips={styleChips}
        faq={FAQ}
      />
    </>
  );
}
