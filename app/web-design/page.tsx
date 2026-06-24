import type { Metadata } from "next";

import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/web-design");
export const revalidate = 86400;

export default function WebDesignPage() {
  return renderHub("/web-design");
}
