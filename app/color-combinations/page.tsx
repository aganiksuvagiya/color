import type { Metadata } from "next";

import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/color-combinations");
export const revalidate = 86400;

export default function ColorCombinationsPage() {
  return renderHub("/color-combinations");
}
