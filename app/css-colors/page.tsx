import type { Metadata } from "next";

import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/css-colors");
export const revalidate = 86400;

export default function CssColorsPage() {
  return renderHub("/css-colors");
}
