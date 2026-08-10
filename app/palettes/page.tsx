import type { Metadata } from "next";

import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/palettes");
export const revalidate = false;

export default function PalettesPage() {
  return renderHub("/palettes");
}
