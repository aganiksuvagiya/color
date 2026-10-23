import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";

import { StructuredData } from "@/components/seo/structured-data";
import { ConditionalFooter } from "@/components/conditional-footer";
import { Providers } from "@/components/providers";
import { ReferralCapture } from "@/components/referral-capture";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo/schema";
import { indexableRobots, siteConfig } from "@/lib/seo/site-config";

const GA_MEASUREMENT_ID = "G-5KWENXMSVQ";

const defaultTitle = "HueFlow – Free Color Palette Generator & Color Tools";
const defaultDescription =
  "HueFlow is a free color palette generator and color toolkit: create palettes, pick colors, convert HEX, RGB and HSL, check WCAG contrast and build gradients. No signup.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.domain }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "design",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
  description: defaultDescription,
  keywords: [
    "HueFlow",
    "HueFlow color palette generator",
    "HueFlow color tool",
    "hueflow.site",
    "color palette generator",
    "free color palette generator",
    "color picker",
    "color contrast checker",
    "hex to rgb",
    "gradient generator",
    "color palette from image",
    "color wheel",
    "tailwind colors",
    "color schemes",
  ],
  alternates: {
    canonical: siteConfig.domain,
  },
  // Allow large image previews and full snippets, which also lets AI answer engines quote the page.
  robots: indexableRobots,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.domain,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1726872213486410"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <StructuredData data={buildWebSiteSchema()} />
        <StructuredData data={buildOrganizationSchema()} />
        <Suspense fallback={null}>
          <ReferralCapture />
        </Suspense>
        <Providers>
          {children}
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
