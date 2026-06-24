import { blogSitemap, renderSitemapXml } from "@/lib/seo/sitemaps";

export async function GET() {
  return new Response(renderSitemapXml(blogSitemap), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
