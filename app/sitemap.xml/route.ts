import { renderSitemapIndexXml, sitemapFiles } from "@/lib/seo/sitemaps";

export async function GET() {
  return new Response(renderSitemapIndexXml(sitemapFiles), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
