import { renderSitemapXml, staticPages } from "@/lib/seo/sitemaps";

export async function GET() {
  return new Response(renderSitemapXml(staticPages), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
