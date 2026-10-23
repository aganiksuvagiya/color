import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow major search engines, AI search bots and link-preview fetchers full access to content
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "Claude-SearchBot",
          "Claude-User",
          "ClaudeBot",
          "PerplexityBot",
          "Perplexity-User",
          "DuckAssistBot",
          "Applebot",
          "Applebot-Extended",
          "Google-Extended",
          "Googlebot",
          "Bingbot",
        ],
        allow: "/",
        disallow: ["/admin", "/api/", "/opengraph-image"],
      },
      // Link-preview fetchers need the share images (/opengraph-image and the per-page ones);
      // the bots that obey robots.txt (X, LinkedIn, Pinterest...) show no image without this.
      {
        userAgent: [
          "facebookexternalhit",
          "Facebot",
          "Twitterbot",
          "LinkedInBot",
          "Pinterestbot",
          "Slackbot",
          "Slackbot-LinkExpanding",
          "Discordbot",
          "WhatsApp",
          "TelegramBot",
          "redditbot",
        ],
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // Block known scrapers that don't contribute to search/AI value
      {
        userAgent: ["CCBot", "omgili", "omgilibot"],
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
      `${siteConfig.domain}/sitemap-shades.xml`,
      `${siteConfig.domain}/sitemap-palettes.xml`,
      `${siteConfig.domain}/sitemap-gradients.xml`,
      `${siteConfig.domain}/sitemap-brand-colors.xml`,
      `${siteConfig.domain}/sitemap-guides.xml`,
      `${siteConfig.domain}/sitemap-blog.xml`,
    ],
  };
}
