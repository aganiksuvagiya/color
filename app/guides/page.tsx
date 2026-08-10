import type { Metadata } from "next";

import { buildPageMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Guides",
  description: "Color strategy guides for designers and developers - palettes, accessibility, brand colors, and more.",
  path: "/guides",
});
export const revalidate = 86400;

export default function GuidesPage() {
  return renderHub("/guides");
}
