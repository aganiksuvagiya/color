import type { Metadata } from "next";

import { ShadesHubView } from "@/components/seo/shades-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import { getFamilyAccent, getResolvedShades, getShadeFamilies, shadesPath } from "@/lib/shades-data";

export const revalidate = false;

const title = "Color Shades: Names & Hex Codes for Every Color";
const description =
  "Browse named shades of blue, pink, purple, green, red, yellow, orange, brown, gray, black, white and teal - with HEX, RGB and HSL codes, ready palettes and one-click copy.";

// Shown on the page and emitted as FAQ structured data, so the two always match.
const FAQ = [
  { question: "What is the difference between a shade, a tint and a tone?", answer: "A shade is a color mixed with black, so it gets darker. A tint is a color mixed with white, so it gets lighter. A tone is a color mixed with gray, so it gets softer and less saturated. In everyday use, 'shades of blue' usually means every variation of blue, light or dark." },
  { question: "How many shades of a color are there?", answer: "In theory millions - a screen can show over 16 million colors. In practice designers use named shades: HueFlow lists 25-38 well-known named shades for each major color, from the lightest tint to the darkest shade." },
  { question: "How do I use different shades of one color?", answer: "Use a light shade for backgrounds, a mid shade for buttons and links, and a dark shade for text and headers. Keeping one hue across these roles makes a design feel consistent while still giving enough contrast." },
  { question: "How do I copy a shade's hex code?", answer: "Open any color family, then click a shade to copy its HEX code. You can switch to RGB or HSL first if you need a different format." },
];

// The same blue stepped toward white, black and gray, for the tint/shade/tone explainer.
function mix(hex: string, target: [number, number, number], t: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v, i) => Math.round(v + (target[i] - v) * t));
  return "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
}
const BASE = "#1E90FF";
const STEPS = [0, 0.18, 0.36, 0.54, 0.72];
const SCALES = [
  { key: "tint", label: "Tint", rule: "Color + white", colors: STEPS.map((t) => mix(BASE, [255, 255, 255], t)) },
  { key: "shade", label: "Shade", rule: "Color + black", colors: STEPS.map((t) => mix(BASE, [0, 0, 0], t)) },
  { key: "tone", label: "Tone", rule: "Color + gray", colors: STEPS.map((t) => mix(BASE, [128, 128, 128], t)) },
];

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/shades",
  keywords: ["color shades", "shades of colors", "color names", "color shade names", "hex color codes", "tint vs shade", "shade tint tone"],
});

export default function ShadesHubPage() {
  const url = `${siteConfig.domain}/shades`;
  const families = getShadeFamilies().map((f) => {
    const shades = getResolvedShades(f);
    return {
      slug: f.slug,
      name: f.name,
      hex: f.hex,
      href: shadesPath(f.slug),
      count: shades.length,
      palettes: f.palettes.length,
      accent: getFamilyAccent(f),
      strip: shades.map((s) => s.hex),
      // Three recognisable names from light, middle and dark.
      samples: [shades[Math.floor(shades.length * 0.2)], shades[Math.floor(shades.length * 0.5)], shades[Math.floor(shades.length * 0.85)]].map((s) => s.name),
    };
  });
  const totalShades = families.reduce((n, f) => n + f.count, 0);

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title, description, url })} />
      <StructuredData
        data={buildCollectionPageSchema({
          title,
          description,
          url,
          items: families.map((f) => ({ title: `Shades of ${f.name}`, href: f.href })),
        })}
      />
      <StructuredData data={buildFaqSchema(FAQ)} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Shades", item: url },
        ])}
      />
      <ShadesHubView families={families} totalShades={totalShades} scales={SCALES} faq={FAQ} />
    </>
  );
}
