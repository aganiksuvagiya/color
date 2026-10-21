import type { Metadata } from "next";

import { ColorMixingChart } from "@/components/color-mixing-chart";
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
import { colorMixing } from "@/lib/seo/guide-pages";
import { siteConfig } from "@/lib/seo/site-config";

const path = "/color-mixing-chart";
const title = "Color Mixing Chart: What Colors Make Any Color";
const description =
  "Color mixing chart and calculator: see what colors make brown, purple, green, pink, gray and 15 more, and mix paint (RYB), light (RGB) or ink (CMYK) in any ratio with HEX codes.";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
  keywords: [
    "color mixing chart",
    "what colors make brown",
    "what colors make purple",
    "what colors make green",
    "what colors make pink",
    "color mixer",
    "paint color mixing chart",
    "color mixing calculator",
    "primary secondary tertiary colors",
    "how to mix colors",
    "what two colors make",
  ],
});




const { steps, tips, faq } = colorMixing;

export default function Page() {
  const url = `${siteConfig.domain}${path}`;

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title, description, url })} />
      <StructuredData
        data={buildWebApplicationSchema({
          name: "HueFlow Color Mixing Chart and Calculator",
          description,
          url,
          featureList: [
            "Paint (RYB), light (RGB) and ink (CMYK) color mixing",
            "Chart of what colors make 20 common colors",
            "HEX, RGB and HSL codes for every mix",
          ],
        })}
      />
      <StructuredData data={buildHowToSchema({ title: "How to mix colors", description, steps })} />
      <StructuredData data={buildFaqSchema(faq)} />
      <StructuredData data={buildSpeakableSchema([".hub-answer", "h1"])} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Tools", item: `${siteConfig.domain}/tools` },
          { name: "Color Mixing Chart", item: url },
        ])}
      />
      <ColorMixingChart faq={faq} steps={steps} tips={tips} />
    </>
  );
}
