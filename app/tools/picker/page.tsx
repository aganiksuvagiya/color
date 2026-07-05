import { ColorPicker } from "@/components/color-picker";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import { buildBreadcrumbSchema, buildFaqSchema, buildHowToSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import { toolPageContent } from "@/lib/seo/tool-pages";

const page = toolPageContent.picker;

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
      <StructuredData data={buildHowToSchema({ title: `How to use the ${page.title}`, description: page.description, steps: page.howToSteps })} />
      <StructuredData data={buildFaqSchema(page.faq)} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Tools", item: `${siteConfig.domain}/tools/picker` },
          { name: page.title, item: url },
        ])}
      />
      <ColorPicker />
    </>
  );
}
