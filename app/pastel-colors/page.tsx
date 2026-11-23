import type { Metadata } from "next";

import { PastelColorsPage } from "@/components/pastel-colors-page";
import { StructuredData } from "@/components/seo/structured-data";
import { generatorHref, getPalettesForTag } from "@/lib/palette-library";
import { PASTEL_COLORS } from "@/lib/pastel-colors";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import { buildBreadcrumbSchema, buildFaqSchema, buildSpeakableSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { pastelColors } from "@/lib/seo/guide-pages";
import { siteConfig } from "@/lib/seo/site-config";

const path = "/pastel-colors";
const title = "Pastel Colors: Names, Hex Codes & Pastel Color Palettes";
const description = `${PASTEL_COLORS.length} pastel colors with names and HEX, RGB and HSL codes: pastel pink, blue, green, purple, yellow and more, plus pastel color palettes and how to make any color pastel.`;

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
  keywords: [
    "pastel colors",
    "pastel color palette",
    "pastel colors hex codes",
    "pastel color names",
    "pastel pink hex code",
    "pastel blue hex code",
    "pastel green hex code",
    "pastel purple",
    "pastel color combinations",
    "pastel color scheme",
    "how to make pastel colors",
  ],
});


const { faq } = pastelColors;

export default function Page() {
  const url = `${siteConfig.domain}${path}`;
  const palettes = getPalettesForTag("pastel")
    .slice(0, 6)
    .map((p) => ({ name: p.name, colors: p.colors, href: generatorHref(p) }));

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title, description, url })} />
      <StructuredData data={buildFaqSchema(faq)} />
      <StructuredData data={buildSpeakableSchema([".hub-answer", "h1"])} />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Pastel colors with HEX codes",
          itemListElement: PASTEL_COLORS.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: `${c.name} ${c.hex}` })),
        }}
      />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Colors", item: `${siteConfig.domain}/colors` },
          { name: "Pastel Colors", item: url },
        ])}
      />
      <PastelColorsPage palettes={palettes} faq={faq} />
    </>
  );
}
