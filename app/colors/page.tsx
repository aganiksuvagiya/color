import type { Metadata } from "next";

import { renderHub, buildHubMetadata } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/colors");
export const revalidate = false;

export default function ColorsPage() {
  return renderHub("/colors");
}
