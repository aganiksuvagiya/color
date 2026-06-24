import type { Metadata } from "next";

import { buildPageMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQs",
  description: "Short answer pages optimized for featured snippets, AI overviews, and conversational citations.",
  path: "/faqs",
});
export const revalidate = 86400;

export default function FaqsPage() {
  return renderHub("/faqs");
}
