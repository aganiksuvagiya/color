import type { Metadata } from "next";

import { buildCollectionMetadata, renderCollectionPage, staticParamsFor } from "@/lib/seo/page-utils";

export const revalidate = false;

export function generateStaticParams() {
  return staticParamsFor("developer");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildCollectionMetadata("developer", slug, "/developer");
}

export default async function DeveloperDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderCollectionPage({
    keyName: "developer",
    slug,
    hubName: "Developer",
    hubHref: "/developer",
    pathPrefix: "/developer",
  });
}
