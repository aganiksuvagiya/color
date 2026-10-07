import type { Metadata } from "next";

import { ShadesHubView } from "@/components/seo/shades-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import { getResolvedShades, getShadeFamilies, shadesPath } from "@/lib/shades-data";

export const revalidate = false;

const title = "Color Shades: Names & Hex Codes for Every Color";
const description =
  "Browse named shades of blue, pink, purple, green, red, yellow, orange, brown, gray, black, white and teal - with HEX, RGB and HSL codes, ready palettes and one-click copy.";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/shades",
  keywords: ["color shades", "shades of colors", "color names", "color shade names", "hex color codes"],
});

export default function ShadesHubPage() {
  const url = `${siteConfig.domain}/shades`;
  const families = getShadeFamilies().map((f) => {
    const shades = getResolvedShades(f);
    // An even sample across the light→dark range for the card strip.
    const strip = Array.from({ length: 7 }, (_, i) => shades[Math.round((i * (shades.length - 1)) / 6)].hex);
    return { slug: f.slug, name: f.name, hex: f.hex, href: shadesPath(f.slug), count: shades.length, strip };
  });

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
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Shades", item: url },
        ])}
      />
      <ShadesHubView families={families} />
    </>
  );
}
