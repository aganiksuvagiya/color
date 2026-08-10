import type { Metadata } from "next";

import { buildPageMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Comparisons",
  description: "Comparison pages for color strategies, industries, and trust or conversion tradeoffs.",
  path: "/comparisons",
});
export const revalidate = false;

export default function ComparisonsPage() {
  return renderHub("/comparisons");
}
