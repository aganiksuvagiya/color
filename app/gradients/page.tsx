import type { Metadata } from "next";

import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/gradients");
export const revalidate = 86400;

export default function GradientsPage() {
  return renderHub("/gradients");
}
