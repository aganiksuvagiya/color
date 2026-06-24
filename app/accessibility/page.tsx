import type { Metadata } from "next";

import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/accessibility");
export const revalidate = 86400;

export default function AccessibilityPage() {
  return renderHub("/accessibility");
}
