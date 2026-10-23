import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ShadesPageView } from "@/components/seo/shades-page";
import { StructuredData } from "@/components/seo/structured-data";
import { findNamedColorByHex } from "@/lib/color-names";
import { getCollection } from "@/lib/seo/content";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import { getFamilyAccent, getResolvedShades, getShadeFamilies, getShadeFamily, shadesPath } from "@/lib/shades-data";

// Served at /shades-of-<color> via the rewrite in next.config.ts.
export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return getShadeFamilies().map((f) => ({ color: f.slug }));
}

function titleFor(name: string, count: number) {
  return `Shades of ${name}: ${count} ${name} Color Names & Hex Codes`;
}

export async function generateMetadata({ params }: { params: Promise<{ color: string }> }): Promise<Metadata> {
  const { color } = await params;
  const family = getShadeFamily(color);
  if (!family) return {};
  const lower = family.name.toLowerCase();
  const spellings = [lower, ...(family.aliases ?? [])];
  return buildPageMetadata({
    title: titleFor(family.name, family.shades.length),
    description: `${family.shades.length} shades of ${lower} with names, HEX, RGB and HSL codes - from ${family.shades[0][0]} to ${family.shades[family.shades.length - 1][0]}. Copy any code, plus ready ${lower} color palettes.`,
    path: shadesPath(family.slug),
    keywords: spellings.flatMap((s) => [`shades of ${s}`, `${s} shades`, `shades of ${s} names`, `${s} color names`, `${s} hex codes`, `${s} color palette`]),
  });
}

export default async function ShadesPage({ params }: { params: Promise<{ color: string }> }) {
  const { color } = await params;
  const family = getShadeFamily(color);
  if (!family) notFound();

  const path = shadesPath(family.slug);
  const url = `${siteConfig.domain}${path}`;
  const title = titleFor(family.name, family.shades.length);
  // Shades that also have their own /colors page get a "view" link on their card.
  const shades = getResolvedShades(family).map((s) => ({ ...s, colorSlug: findNamedColorByHex(s.hex)?.slug }));

  // Only link to related pages that exist for this color.
  const has = (key: "colors" | "colorMeanings" | "tailwind") => getCollection(key).some((e) => e.slug === family.slug);
  const related = [
    has("colors") && { title: `${family.name} color guide`, href: `/colors/${family.slug}` },
    has("colorMeanings") && { title: `${family.name} color meaning`, href: `/color-meanings/${family.slug}` },
    has("tailwind") && { title: `${family.name} in Tailwind`, href: `/tailwind/${family.slug}` },
    { title: "Color palettes", href: "/palettes" },
    { title: "Palette generator", href: "/generator" },
    { title: "Contrast checker", href: "/tools/contrast" },
  ].filter((l): l is { title: string; href: string } => Boolean(l));

  const accent = getFamilyAccent(family);

  // All 12 families as chips across the top; the current one is highlighted.
  const families = getShadeFamilies().map((f) => ({ slug: f.slug, name: f.name, hex: f.hex, href: shadesPath(f.slug), active: f.slug === family.slug }));

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title, description: family.intro, url })} />
      <StructuredData
        data={buildCollectionPageSchema({
          title,
          description: family.intro,
          url,
          items: shades.map((s) => ({ title: `${s.name} ${s.hex}`, href: path })),
        })}
      />
      <StructuredData data={buildFaqSchema(family.faq)} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Shades", item: `${siteConfig.domain}/shades` },
          { name: `Shades of ${family.name}`, item: url },
        ])}
      />
      <ShadesPageView
        name={family.name}
        intro={family.intro}
        usage={family.usage}
        shades={shades}
        palettes={family.palettes}
        faq={family.faq}
        related={related}
        families={families}
        accent={accent}
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Shades", href: "/shades" },
          { title: `Shades of ${family.name}`, href: path },
        ]}
      />
    </>
  );
}
