import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import { StructuredData } from "@/components/seo/structured-data";
import { PromoBanner } from "@/components/promo-banner";
import { buildOrganizationSchema, buildSoftwareApplicationSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

const GA_MEASUREMENT_ID = "G-5KWENXMSVQ";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "HueFlow | Colors, Palettes, Gradients, and Brand Color Strategy",
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
  description:
    "Build premium brand palettes, semantic color systems, accessible scales, answer-first color guides, and programmatic content with HueFlow.",
  keywords: [
    "AI color generator",
    "color palette generator",
    "brand colors",
    "color psychology",
    "gradient generator",
    "marketing colors",
    "web design colors",
    "design system colors",
    "palette builder",
    "accessible color scale",
    "tailwind colors",
  ],
  alternates: {
    canonical: siteConfig.domain,
  },
  openGraph: {
    title: "HueFlow | Colors, Palettes, Gradients, and Brand Color Strategy",
    description:
      "Find colors, palettes, gradients, brand-color answers, accessibility guidance, and implementation-ready Tailwind or CSS systems.",
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.domain,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: "HueFlow | Colors, Palettes, Gradients, and Brand Color Strategy",
    description:
      "Find colors, palettes, gradients, brand-color answers, accessibility guidance, and implementation-ready Tailwind or CSS systems.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
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
        <StructuredData data={buildOrganizationSchema()} />
        <StructuredData data={buildSoftwareApplicationSchema()} />
        {children}
        <PromoBanner />
      </body>
    </html>
  );
}
