import type { Metadata } from "next";

import { PaletteLibraryHubView } from "@/components/seo/palette-library-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import { colorPalettesPath, generatorHref, getLibraryPalettes, getLibraryTags, getPalettesForTag, type TagKind } from "@/lib/palette-library";

export const revalidate = false;

const title = "Color Palettes: Hand-Picked Color Schemes with Hex Codes";
const description =
  "Browse hand-picked color palettes and color schemes by style (pastel, neon, earthy, vintage, dark, minimal), season and color. Copy hex codes or open any palette in the free generator.";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: colorPalettesPath(),
  keywords: ["color palettes", "color palette", "color schemes", "color combinations", "palette ideas", "hex color palettes"],
});

const GROUPS: { kind: TagKind; label: string }[] = [
  { kind: "style", label: "By style" },
  { kind: "color", label: "By color" },
  { kind: "season", label: "By season" },
];

// A spread of styles for the featured grid rather than the first N in file order.
const FEATURED = ["Miami Nights", "Desert Clay", "Baby Shower", "Midnight Code", "70s Lounge", "Emerald Estate", "Ocean Breeze", "Pumpkin Spice", "Lavender Field"];

export default function ColorPalettesHubPage() {
  const url = `${siteConfig.domain}${colorPalettesPath()}`;
  const all = getLibraryPalettes();
  const tags = getLibraryTags();

  const groups = GROUPS.map((g) => ({
    label: g.label,
    tags: tags
      .filter((t) => t.kind === g.kind)
      .map((t) => {
        const ps = getPalettesForTag(t.slug);
        return { slug: t.slug, name: t.name, hex: t.hex, href: colorPalettesPath(t.slug), count: ps.length, strip: ps[0]?.colors ?? [t.hex] };
      }),
  }));

  const featured = FEATURED.map((n) => all.find((p) => p.name === n))
    .filter((p): p is (typeof all)[number] => Boolean(p))
    .map((p) => ({ id: p.id, name: p.name, colors: p.colors, href: generatorHref(p) }));

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title, description, url })} />
      <StructuredData
        data={buildCollectionPageSchema({
          title,
          description,
          url,
          items: tags.map((t) => ({ title: `${t.name} color palettes`, href: colorPalettesPath(t.slug) })),
        })}
      />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Palettes", item: url },
        ])}
      />
      <PaletteLibraryHubView groups={groups} featured={featured} total={all.length} />
    </>
  );
}
