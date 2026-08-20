import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { buildHubMetadata } from "@/lib/seo/page-utils";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { getHubByPath } from "@/lib/seo/content";
import { PalettesHubView } from "@/components/seo/palettes-hub-page";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = buildHubMetadata("/palettes");
export const revalidate = false;

export default function PalettesPage() {
  const hub = getHubByPath("/palettes");
  if (!hub) notFound();

  const url = `${siteConfig.domain}${hub.path}`;

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title: hub.title, description: hub.description, url })} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: hub.title, item: url },
        ])}
      />
      <PalettesHubView hub={hub} />
    </>
  );
}
