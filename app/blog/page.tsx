import { BlogPage } from "@/components/blog-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { blogPageContent } from "@/lib/seo/tool-pages";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata = buildPageMetadata({
  title: blogPageContent.title,
  description: blogPageContent.description,
  path: blogPageContent.path,
  keywords: blogPageContent.keywords,
});

export default function Page() {
  const url = `${siteConfig.domain}${blogPageContent.path}`;

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title: blogPageContent.title, description: blogPageContent.description, url })} />
      <StructuredData data={buildFaqSchema(blogPageContent.faq)} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Resources", item: `${siteConfig.domain}/resources` },
          { name: blogPageContent.title, item: url },
        ])}
      />
      <BlogPage />
    </>
  );
}
