import type { Metadata } from "next";

import { buildCollectionMetadata, renderCollectionPage, staticParamsFor } from "@/lib/seo/page-utils";

export const revalidate = 86400;

export function generateStaticParams() {
  return staticParamsFor("gradients");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildCollectionMetadata("gradients", slug, "/gradients");
}

export default async function GradientDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderCollectionPage({
    keyName: "gradients",
    slug,
    hubName: "Gradients",
    hubHref: "/gradients",
    pathPrefix: "/gradients",
  });
}
