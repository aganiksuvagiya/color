import type { Metadata } from "next";

import { buildCollectionMetadata, renderCollectionPage, staticParamsFor } from "@/lib/seo/page-utils";

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return staticParamsFor("brandColors");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildCollectionMetadata("brandColors", slug, "/brand-colors");
}

export default async function BrandColorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderCollectionPage({
    keyName: "brandColors",
    slug,
    hubName: "Brand Colors",
    hubHref: "/brand-colors",
    pathPrefix: "/brand-colors",
  });
}
