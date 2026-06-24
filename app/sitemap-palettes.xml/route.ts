import { palettesSitemap, renderSitemapXml } from "@/lib/seo/sitemaps";

export async function GET() {
  return new Response(renderSitemapXml(palettesSitemap), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
