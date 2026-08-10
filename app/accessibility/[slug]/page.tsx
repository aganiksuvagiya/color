import type { Metadata } from "next";

import { buildCollectionMetadata, renderCollectionPage, staticParamsFor } from "@/lib/seo/page-utils";

export const revalidate = false;

export function generateStaticParams() {
  return staticParamsFor("accessibility");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildCollectionMetadata("accessibility", slug, "/accessibility");
}

export default async function AccessibilityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderCollectionPage({
    keyName: "accessibility",
    slug,
    hubName: "Accessibility",
    hubHref: "/accessibility",
    pathPrefix: "/accessibility",
  });
}
