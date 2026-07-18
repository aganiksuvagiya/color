import type { Metadata } from "next";

import { buildCollectionMetadata, renderCollectionPage, staticParamsFor } from "@/lib/seo/page-utils";

export const revalidate = 86400;

export function generateStaticParams() {
  return staticParamsFor("colorPsychology");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildCollectionMetadata("colorPsychology", slug, "/color-psychology");
}

export default async function ColorPsychologyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderCollectionPage({
    keyName: "colorPsychology",
    slug,
    hubName: "Color Psychology",
    hubHref: "/color-psychology",
    pathPrefix: "/color-psychology",
  });
}
