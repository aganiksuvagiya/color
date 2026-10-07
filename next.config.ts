import type { NextConfig } from "next";

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
  async rewrites() {
    return [{ source: "/shades-of-:color", destination: "/shades/:color" }];
  },
  async redirects() {
    return [
      { source: "/shades-of-grey", destination: "/shades-of-gray", permanent: true },
      { source: "/shades/:color", destination: "/shades-of-:color", permanent: true },
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
