import type { Metadata } from "next";

import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildHubMetadata("/tailwind");
export const revalidate = 86400;

export default function TailwindSeoPage() {
  return renderHub("/tailwind");
}
