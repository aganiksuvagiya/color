import type { NextConfig } from "next";

import { converterSlugList } from "./lib/seo/converter-specs";

const converterSlugPattern = converterSlugList.join("|");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  // "Shades of <color>" pages live at app/shades/[color] but are served at the
  // search-phrase URL /shades-of-<color>; the /shades/<color> path 301s there so
  // only one URL is ever indexed.
  //
  // The color converter pages (/hex-to-rgb, /rgb-to-hex, ...) work the same way: they live
  // at app/convert/[pair] and are served at the search-phrase URL.
  async rewrites() {
    return [
      { source: "/shades-of-:color", destination: "/shades/:color" },
      { source: `/:pair(${converterSlugPattern})`, destination: "/convert/:pair" },
    ];
  },
  async redirects() {
    // HTTP -> HTTPS is not done here: Next/OpenNext rewrites a same-host https destination
    // to the request's own scheme, so the redirect pointed back at http:// and looped. Use
    // Cloudflare's "Always Use HTTPS" (SSL/TLS -> Edge Certificates) instead.
    return [
      { source: "/convert/:pair", destination: "/:pair", permanent: true },
      { source: "/shades-of-grey", destination: "/shades-of-gray", permanent: true },
      { source: "/shades/:color", destination: "/shades-of-:color", permanent: true },
      // Merged into the industry page so the two stop competing for the same searches.
      { source: "/guides/best-colors-for-healthcare-websites-usa", destination: "/best-colors-for/healthcare-websites", permanent: true },
      // Tool pages merged into their search-phrase URL, so the tool and its text sit on one page.
      { source: "/tools/picker", destination: "/color-picker", permanent: true },
      { source: "/tools/tailwind", destination: "/tailwind-colors", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // One year, this host only (no includeSubDomains/preload, which are hard to undo).
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
        ],
      },
    ];
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
