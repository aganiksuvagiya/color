import type { Metadata } from "next";

import { buildCollectionMetadata, renderCollectionPage } from "@/lib/seo/page-utils";
import { getProgrammaticColorStaticParams } from "@/lib/seo/programmatic";

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return getProgrammaticColorStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildCollectionMetadata("colorMeanings", slug, "/color-meanings");
}

export default async function ColorMeaningDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderCollectionPage({
    keyName: "colorMeanings",
    slug,
    hubName: "Color Meanings",
    hubHref: "/color-meanings",
    pathPrefix: "/color-meanings",
  });
}
