import type { Metadata } from "next";

import { renderHub, buildHubMetadata } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/colors");
export const revalidate = 86400;

export default function ColorsPage() {
  return renderHub("/colors");
}
