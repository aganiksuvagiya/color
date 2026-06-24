import { brandColorsSitemap, renderSitemapXml } from "@/lib/seo/sitemaps";

export async function GET() {
  return new Response(renderSitemapXml(brandColorsSitemap), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
