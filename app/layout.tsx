import type { Metadata } from "next";
import "./globals.css";

import { StructuredData } from "@/components/seo/structured-data";
import { buildOrganizationSchema, buildSoftwareApplicationSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "HueFlow | Colors, Palettes, Gradients, and Brand Color Strategy",
    template: `%s | ${siteConfig.name}`,
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
      <body>
        <StructuredData data={buildOrganizationSchema()} />
        <StructuredData data={buildSoftwareApplicationSchema()} />
        {children}
      </body>
    </html>
  );
}
