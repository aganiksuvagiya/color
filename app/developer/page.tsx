import type { Metadata } from "next";

import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/developer");
export const revalidate = 86400;

export default function DeveloperPage() {
  return renderHub("/developer");
}
