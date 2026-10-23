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
    return [
      { source: "/convert/:pair", destination: "/:pair", permanent: true },
      { source: "/shades-of-grey", destination: "/shades-of-gray", permanent: true },
      { source: "/shades/:color", destination: "/shades-of-:color", permanent: true },
      // Merged into the industry page so the two stop competing for the same searches.
      { source: "/guides/best-colors-for-healthcare-websites-usa", destination: "/best-colors-for/healthcare-websites", permanent: true },
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
        ],
      },
    ];
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
