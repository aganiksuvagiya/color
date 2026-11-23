import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PaletteTagView } from "@/components/seo/palette-library-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import {
  colorPalettesPath,
  generatorHref,
  getLibraryTag,
  getLibraryTags,
  getPalettesForTag,
  getRelatedTags,
  type LibraryTag,
} from "@/lib/palette-library";

export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return getLibraryTags().map((t) => ({ tag: t.slug }));
}

const KIND_LABEL: Record<LibraryTag["kind"], string> = { color: "Palettes by color", style: "Palettes by style", season: "Palettes by season" };

function titleFor(tag: LibraryTag, count: number) {
  return `${count} ${tag.name} Color Palettes with Hex Codes`;
}

const chip = (t: LibraryTag) => ({ slug: t.slug, name: t.name, hex: t.hex, href: colorPalettesPath(t.slug), count: getPalettesForTag(t.slug).length });

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = getLibraryTag(slug);
  if (!tag) return {};
  const count = getPalettesForTag(tag.slug).length;
  const lower = tag.name.toLowerCase();
  const spellings = tag.slug === "gray" ? ["gray", "grey"] : tag.slug === "autumn" ? ["autumn", "fall"] : [lower];
  return buildPageMetadata({
    title: titleFor(tag, count),
    description: `${count} hand-picked ${lower} color palettes with hex codes. Copy any color, copy the whole palette, or open it in HueFlow's free palette generator.`,
    path: colorPalettesPath(tag.slug),
    keywords: spellings.flatMap((s) => [`${s} color palette`, `${s} color palettes`, `${s} color scheme`, `${s} colors`, `${s} palette hex codes`]),
  });
}

export default async function PaletteTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: slug } = await params;
  const tag = getLibraryTag(slug);
  if (!tag) notFound();

  const path = colorPalettesPath(tag.slug);
  const url = `${siteConfig.domain}${path}`;
  const palettes = getPalettesForTag(tag.slug).map((p) => ({ id: p.id, name: p.name, colors: p.colors, href: generatorHref(p) }));
  const title = titleFor(tag, palettes.length);

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title, description: tag.intro, url })} />
      <StructuredData
        data={buildCollectionPageSchema({
          title,
          description: tag.intro,
          url,
          items: palettes.map((p) => ({ title: `${p.name}: ${p.colors.join(", ")}`, href: path })),
        })}
      />
      <StructuredData data={buildFaqSchema(tag.faq)} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Palettes", item: `${siteConfig.domain}${colorPalettesPath()}` },
          { name: `${tag.name} Color Palettes`, item: url },
        ])}
      />
      <PaletteTagView
        name={tag.name}
        kindLabel={KIND_LABEL[tag.kind]}
        intro={tag.intro}
        tips={tag.tips}
        faq={tag.faq}
        palettes={palettes}
        related={getRelatedTags(tag.slug).map(chip)}
        allTags={getLibraryTags().filter((t) => t.slug !== tag.slug).map(chip)}
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Color Palettes", href: colorPalettesPath() },
          { title: `${tag.name} Color Palettes`, href: path },
        ]}
      />
    </>
  );
}
