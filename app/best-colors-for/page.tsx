import type { Metadata } from "next";

import { buildPageMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Best Colors For",
  description: "High-intent pages answering the best colors for SaaS, fintech, ecommerce, AI, and more.",
  path: "/best-colors-for",
});
export const revalidate = 86400;

export default function BestColorsForPage() {
  return renderHub("/best-colors-for");
}
