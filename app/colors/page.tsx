import type { Metadata } from "next";

import { ColorsHubView, type HubFamily } from "@/components/seo/colors-hub-page";
import { StructuredData } from "@/components/seo/structured-data";
import { namedColors } from "@/lib/color-names";
import { colorFamily } from "@/lib/palette-library";
import { getHubByPath } from "@/lib/seo/content";
import { buildHubMetadata } from "@/lib/seo/page-utils";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema, buildSpeakableSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import { getShadeFamily, resolveShade } from "@/lib/shades-data";

export const metadata: Metadata = buildHubMetadata("/colors");
export const revalidate = false;

// Shown on the page and emitted as FAQ structured data, so the two always match.
const FAQ = [
  { question: "What is a color hex code?", answer: "A hex code is a 6-character code (e.g. #FF0000) that represents a color in red, green, and blue values. It is widely used in CSS, design tools, and web development." },
  { question: "What is the hex code for blue?", answer: "Pure blue is #0000FF. Common design blues include #3B82F6 (Tailwind blue-500) and #1E40AF (Tailwind blue-800)." },
  { question: "What is the hex code for red?", answer: "Pure red is #FF0000. Common design reds include #EF4444 (Tailwind red-500) and #DC2626 (Tailwind red-600)." },
  { question: "How do I convert HEX to RGB?", answer: "Split the hex code into two-character pairs and convert each from hex to decimal. #FF0000 = RGB(255, 0, 0). Use HueFlow's free color converter for instant results." },
  { question: "What colors go well together?", answer: "Complementary colors (opposite on the color wheel) create high contrast. Analogous colors (adjacent) feel harmonious. Use HueFlow's color harmony tool to find matching palettes." },
];

const FAMILY_ORDER = ["red", "pink", "orange", "yellow", "brown", "green", "teal", "blue", "purple", "white", "gray", "black"];

export default function ColorsPage() {
  const hub = getHubByPath("/colors");
  const title = hub?.title ?? "Colors";
  const description = hub?.description ?? siteConfig.description;
  const url = `${siteConfig.domain}/colors`;

  // Every named color, grouped into the same 12 families as the shades pages, light → dark.
  const families: HubFamily[] = FAMILY_ORDER.map((slug) => ({
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    hex: getShadeFamily(slug)?.hex ?? "#808080",
    colors: namedColors
      .filter((c) => colorFamily(c.hex) === slug)
      .map((c) => ({ c, s: resolveShade(c.name, c.hex) }))
      .sort((a, b) => b.s.lightness - a.s.lightness)
      .map(({ c, s }) => ({ name: c.name, slug: c.slug, hex: s.hex, rgb: s.rgb, hsl: s.hsl })),
  })).filter((f) => f.colors.length > 0);

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title, description, url })} />
      <StructuredData
        data={buildCollectionPageSchema({
          title,
          description,
          url,
          items: families.flatMap((f) => f.colors).map((c) => ({ title: c.name, href: `/colors/${c.slug}` })),
        })}
      />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: title, item: url },
        ])}
      />
      <StructuredData data={buildFaqSchema(FAQ)} />
      <StructuredData data={buildSpeakableSchema(["h1", ".hub-description", ".hub-answer"])} />
      <ColorsHubView
        families={families}
        total={namedColors.length}
        faq={FAQ}
        related={[
          { title: "Color shades", href: "/shades" },
          { title: "Palette library", href: "/color-palettes" },
          { title: "Color codes chart", href: "/color-codes" },
          { title: "Color meanings", href: "/color-meanings" },
          { title: "Palette generator", href: "/generator" },
        ]}
      />
    </>
  );
}
