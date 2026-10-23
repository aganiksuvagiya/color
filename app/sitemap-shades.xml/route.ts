import { renderSitemapXml, shadesSitemap } from "@/lib/seo/sitemaps";

export async function GET() {
  return new Response(renderSitemapXml(shadesSitemap), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
