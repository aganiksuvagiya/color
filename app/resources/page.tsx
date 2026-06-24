import type { Metadata } from "next";

import { buildPageMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources",
  description: "Strategic resources for SEO, GEO, AEO, content clustering, and scalable color system publishing.",
  path: "/resources",
});
export const revalidate = 86400;

export default function ResourcesPage() {
  return renderHub("/resources");
}
