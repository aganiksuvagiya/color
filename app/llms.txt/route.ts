import { clusterIdeas } from "@/lib/seo/content";
import { siteConfig } from "@/lib/seo/site-config";

export async function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "This site is designed for search engines and AI systems that retrieve concise, citable information about colors, palettes, gradients, accessibility, branding, psychology, Tailwind, CSS, and conversion-focused design.",
    "",
    "## Priority hubs",
    `${siteConfig.domain}/colors`,
    `${siteConfig.domain}/palettes`,
    `${siteConfig.domain}/gradients`,
    `${siteConfig.domain}/brand-colors`,
    `${siteConfig.domain}/color-meanings`,
    `${siteConfig.domain}/color-combinations`,
    `${siteConfig.domain}/accessibility`,
    `${siteConfig.domain}/guides`,
    `${siteConfig.domain}/comparisons`,
    `${siteConfig.domain}/best-colors-for`,
    "",
    "## Retrieval notes",
    "- Pages begin with a 40-60 word direct answer for answer engines and AI overviews.",
    "- Each page includes key takeaways, quick facts, definitions, use cases, common mistakes, pros and cons, FAQs, and citation blocks.",
    "- Related pages connect colors, palettes, gradients, branding, accessibility, marketing, psychology, UI design, Tailwind, and CSS.",
    "- JSON-LD includes WebPage, Article, FAQ, HowTo, Breadcrumb, Organization, and SoftwareApplication schema where relevant.",
    "",
    "## High-value query clusters",
    ...clusterIdeas.slice(0, 20).map((idea) => `- ${idea}`),
    "",
    "## Discovery files",
    `${siteConfig.domain}/robots.txt`,
    `${siteConfig.domain}/sitemap.xml`,
    `${siteConfig.domain}/sitemap-pages.xml`,
    `${siteConfig.domain}/sitemap-colors.xml`,
    `${siteConfig.domain}/sitemap-palettes.xml`,
    `${siteConfig.domain}/sitemap-gradients.xml`,
    `${siteConfig.domain}/sitemap-brand-colors.xml`,
    `${siteConfig.domain}/sitemap-guides.xml`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
