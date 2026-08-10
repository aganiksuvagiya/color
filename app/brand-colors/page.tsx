import type { Metadata } from "next";

import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/brand-colors");
export const revalidate = false;

export default function BrandColorsPage() {
  return renderHub("/brand-colors");
}
