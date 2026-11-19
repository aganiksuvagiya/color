import { ColorNameFinder } from "@/components/color-name-finder";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHowToSchema,
  buildSpeakableSchema,
  buildWebApplicationSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import { toolPageContent } from "@/lib/seo/tool-pages";

const page = toolPageContent["color-name-finder"];

export const metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  keywords: page.keywords,
});

export default function Page() {
  const url = `${siteConfig.domain}${page.path}`;

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title: page.title, description: page.description, url })} />
      <StructuredData
        data={buildWebApplicationSchema({
          name: "HueFlow Color Name Finder",
          description: page.description,
          url,
          featureList: [
            "Closest color name for any HEX, RGB or HSL code",
            "HEX, RGB, HSL, CMYK and OKLCH values with one-click copy",
            "Similar named colors with their own pages",
          ],
        })}
      />
      <StructuredData data={buildHowToSchema({ title: "How to find the name of a color", description: page.answer, steps: page.howToSteps })} />
      <StructuredData data={buildFaqSchema(page.faq)} />
      <StructuredData data={buildSpeakableSchema([".hub-answer", "h1"])} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Tools", item: `${siteConfig.domain}/tools` },
          { name: "Color Name Finder", item: url },
        ])}
      />
      <ColorNameFinder />
    </>
  );
}
