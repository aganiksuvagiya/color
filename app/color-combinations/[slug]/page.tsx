import type { Metadata } from "next";

import { buildCollectionMetadata, renderCollectionPage, staticParamsFor } from "@/lib/seo/page-utils";

export const revalidate = 86400;

export function generateStaticParams() {
  return staticParamsFor("colorCombinations");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildCollectionMetadata("colorCombinations", slug, "/color-combinations");
}

export default async function ColorCombinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderCollectionPage({
    keyName: "colorCombinations",
    slug,
    hubName: "Color Combinations",
    hubHref: "/color-combinations",
    pathPrefix: "/color-combinations",
  });
}
