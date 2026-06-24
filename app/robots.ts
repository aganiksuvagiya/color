import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
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
