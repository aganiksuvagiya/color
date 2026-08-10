import type { Metadata } from "next";
import { buildCollectionMetadata, renderCollectionPage, staticParamsFor } from "@/lib/seo/page-utils";

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return staticParamsFor("resources");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildCollectionMetadata("resources", slug, "/resources");
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderCollectionPage({
    keyName: "resources",
    slug,
    hubName: "Resources",
    hubHref: "/resources",
    pathPrefix: "/resources",
  });
}
