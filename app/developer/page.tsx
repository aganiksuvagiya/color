import type { Metadata } from "next";

import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/developer");
export const revalidate = false;

export default function DeveloperPage() {
  return renderHub("/developer");
}
