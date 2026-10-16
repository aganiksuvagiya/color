import { RandomColorGenerator } from "@/components/random-color-generator";
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

const page = toolPageContent["random-color-generator"];

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
          name: "HueFlow Random Color Generator",
          description: page.description,
          url,
          featureList: [
            "Random HEX, RGB, HSL, CMYK and OKLCH color codes",
            "Random color palette of five colors with locking",
            "Pastel, vivid, muted, dark and light styles",
            "Nearest color name and one-click copy",
          ],
        })}
      />
      <StructuredData data={buildHowToSchema({ title: "How to generate a random color", description: page.answer, steps: page.howToSteps })} />
      <StructuredData data={buildFaqSchema(page.faq)} />
      <StructuredData data={buildSpeakableSchema([".hub-answer", "h1"])} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Tools", item: `${siteConfig.domain}/tools` },
          { name: "Random Color Generator", item: url },
        ])}
      />
      <RandomColorGenerator />
    </>
  );
}
