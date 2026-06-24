import { colorsSitemap, renderSitemapXml } from "@/lib/seo/sitemaps";

export async function GET() {
  return new Response(renderSitemapXml(colorsSitemap), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
