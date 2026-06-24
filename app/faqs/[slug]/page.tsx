import type { Metadata } from "next";

import { buildCollectionMetadata, renderCollectionPage, staticParamsFor } from "@/lib/seo/page-utils";

export const revalidate = 86400;

export function generateStaticParams() {
  return staticParamsFor("faqs");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildCollectionMetadata("faqs", slug, "/faqs");
}

export default async function FaqDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderCollectionPage({
    keyName: "faqs",
    slug,
    hubName: "FAQs",
    hubHref: "/faqs",
    pathPrefix: "/faqs",
    answerLabel: "Snippet-ready answer",
  });
}
