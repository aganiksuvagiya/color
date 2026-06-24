import { gradientsSitemap, renderSitemapXml } from "@/lib/seo/sitemaps";

export async function GET() {
  return new Response(renderSitemapXml(gradientsSitemap), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
