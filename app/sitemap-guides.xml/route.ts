import { guidesSitemap, renderSitemapXml } from "@/lib/seo/sitemaps";

export async function GET() {
  return new Response(renderSitemapXml(guidesSitemap), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
