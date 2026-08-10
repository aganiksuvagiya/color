import type { Metadata } from "next";

import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/css-colors");
export const revalidate = false;

export default function CssColorsPage() {
  return renderHub("/css-colors");
}
