import type { Metadata } from "next";

import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/color-meanings");
export const revalidate = 86400;

export default function ColorMeaningsPage() {
  return renderHub("/color-meanings");
}
