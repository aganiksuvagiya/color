import type { Metadata } from "next";
import { TailwindColors } from "@/components/tailwind-colors";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import { toolPageContent } from "@/lib/seo/tool-pages";

export const metadata: Metadata = {
  title: "Tailwind CSS Colors - All Swatches, Hex Codes & Class Names",
  description:
    "Browse all Tailwind CSS colors with hex codes and class names. Slate, gray, red, blue, green, purple and more - copy any shade from 50 to 950 instantly.",
  keywords: [
    "tailwind colors",
    "tailwind css colors",
    "tailwind color palette",
    "tailwind color codes",
    "tailwind css color list",
    "tailwind hex codes",
    "tailwind color classes",
    "tailwind blue",
    "tailwind gray",
    "tailwind green",
  ],
  alternates: { canonical: `${siteConfig.domain}/tailwind-colors` },
  openGraph: {
    title: "Tailwind CSS Colors - All Swatches, Hex Codes & Class Names",
    description:
      "Browse all Tailwind CSS colors with hex codes and class names. Slate, gray, red, blue, green, purple and more - copy any shade from 50 to 950.",
    url: `${siteConfig.domain}/tailwind-colors`,
    type: "website",
  },
};

const url = `${siteConfig.domain}/tailwind-colors`;

// The FAQ that TailwindColors shows on the page (via ToolPageSections); /tools/tailwind 308s here.
const faq = toolPageContent.tailwind.faq;

export default function TailwindColorsPage() {
  return (
    <>
      <StructuredData
        data={buildWebPageSchema({
          title: "Tailwind CSS Colors - All Swatches, Hex Codes & Class Names",
          description:
            "Browse all Tailwind CSS colors with hex codes and class names. Copy any shade from 50 to 950 instantly.",
          url,
        })}
      />
      <StructuredData data={buildFaqSchema(faq)} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Tools", item: `${siteConfig.domain}/tools` },
          { name: "Tailwind Colors", item: url },
        ])}
      />
      <TailwindColors />
    </>
  );
}
