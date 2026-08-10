import type { Metadata } from "next";

import { buildPageMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources",
  description: "Color strategy resources for designers and developers - guides, tools, and implementation references.",
  path: "/resources",
});
export const revalidate = 86400;

export default function ResourcesPage() {
  return renderHub("/resources");
}
