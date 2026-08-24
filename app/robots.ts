import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow major AI search bots full access to content
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Claude-SearchBot", "ClaudeBot", "PerplexityBot", "Applebot", "Google-Extended", "Googlebot", "Bingbot"],
        allow: "/",
        disallow: ["/admin", "/api/", "/opengraph-image"],
      },
      // Block known scrapers that don't contribute to search/AI value
      {
        userAgent: ["CCBot", "omgili", "omgilibot", "facebookexternalhit"],
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/opengraph-image", "/opengraph-image/"],
      },
    ],
    sitemap: [
      `${siteConfig.domain}/sitemap.xml`,
      `${siteConfig.domain}/sitemap-pages.xml`,
      `${siteConfig.domain}/sitemap-colors.xml`,
      `${siteConfig.domain}/sitemap-palettes.xml`,
      `${siteConfig.domain}/sitemap-gradients.xml`,
      `${siteConfig.domain}/sitemap-brand-colors.xml`,
      `${siteConfig.domain}/sitemap-guides.xml`,
      `${siteConfig.domain}/sitemap-blog.xml`,
    ],
  };
}
