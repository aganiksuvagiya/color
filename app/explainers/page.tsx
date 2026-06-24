import type { Metadata } from "next";

import { buildPageMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Explainers",
  description: "Short, citation-friendly explainers for color strategy, trust, and conversion questions.",
  path: "/explainers",
});
export const revalidate = 86400;

export default function ExplainersPage() {
  return renderHub("/explainers");
}
