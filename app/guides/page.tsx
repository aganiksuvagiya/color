import type { Metadata } from "next";

import { buildPageMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Guides",
  description: "Answer-first color strategy guides optimized for SEO, GEO, and AEO retrieval.",
  path: "/guides",
});
export const revalidate = 86400;

export default function GuidesPage() {
  return renderHub("/guides");
}
