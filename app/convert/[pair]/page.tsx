import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ConverterPairView } from "@/components/seo/converter-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import { converterPairs, getConverterPair } from "@/lib/seo/converter-pages";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHowToSchema,
  buildSpeakableSchema,
  buildWebApplicationSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

// Served at the search-phrase URL (/hex-to-rgb) through a rewrite in next.config.ts;
// /convert/<pair> 301s there so only one URL is ever indexed.
export const dynamicParams = false;

export function generateStaticParams() {
  return converterPairs.map((p) => ({ pair: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }): Promise<Metadata> {
  const pair = getConverterPair((await params).pair);
  if (!pair) return {};
  return buildPageMetadata({ title: pair.title, description: pair.description, path: pair.path, keywords: pair.keywords });
}

export default async function ConverterPairPage({ params }: { params: Promise<{ pair: string }> }) {
  const pair = getConverterPair((await params).pair);
  if (!pair) notFound();

  const url = `${siteConfig.domain}${pair.path}`;

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title: pair.title, description: pair.description, url })} />
      <StructuredData
        data={buildWebApplicationSchema({
          name: `${pair.h1} (HueFlow)`,
          description: pair.description,
          url,
          featureList: [
            `Convert ${pair.fromLabel} to ${pair.toLabel} instantly`,
            "Live color preview and nearest color name",
            "HEX, RGB, HSL, CMYK and OKLCH values with one-click copy",
          ],
        })}
      />
      <StructuredData
        data={buildHowToSchema({
          title: `How to convert ${pair.fromLabel} to ${pair.toLabel}`,
          description: pair.answer,
          steps: pair.steps,
        })}
      />
      <StructuredData data={buildFaqSchema(pair.faq)} />
      <StructuredData data={buildSpeakableSchema([".hub-answer", "h1"])} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Converter", item: `${siteConfig.domain}/color-converter` },
          { name: pair.h1, item: url },
        ])}
      />
      <ConverterPairView pair={pair} />
    </>
  );
}
