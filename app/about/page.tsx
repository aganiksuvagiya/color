import type { Metadata } from "next";

import { StaticPage } from "@/components/static-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import { buildAboutPageSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "About HueFlow: Free Color Palette Generator & Tools",
  description:
    "HueFlow is a free color palette generator and color toolkit for designers, developers and marketers: palettes, color picker, converter, contrast checker, gradients and brand color guidance.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <StructuredData data={buildAboutPageSchema({ title: "About HueFlow", description: "HueFlow is a free color palette generator and color toolkit for designers, developers, and marketers.", url: `${siteConfig.domain}/about` })} />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", item: siteConfig.domain }, { name: "About HueFlow", item: `${siteConfig.domain}/about` }])} />
    <StaticPage title="About HueFlow">
      <p>
        <strong>HueFlow</strong> (hueflow.site) is a free online color palette generator and color toolkit.
        It is a web app that runs in the browser with no signup, so you can generate palettes, pick and
        convert colors, check contrast and build gradients without installing anything.
      </p>
      <p>
        HueFlow is a color platform built for the people who work with color
        every day - designers, developers, and marketers. It brings palettes,
        gradients, brand color references, accessibility tooling, and practical
        color guidance together in one place, so you can go from &quot;what
        color should this be?&quot; to implementation-ready values in minutes.
      </p>

      <h2>HueFlow at a Glance</h2>
      <ul>
        <li><strong>What it is:</strong> a free color palette generator and color toolkit for the web.</li>
        <li><strong>Who it is for:</strong> designers, developers, marketers, and anyone choosing colors for a website, app, or brand.</li>
        <li><strong>Cost:</strong> free to use, with no account required to start.</li>
        <li>
          <strong>Main tools:</strong> <a href="/generator">color palette generator</a>,{" "}
          <a href="/color-picker">color picker</a>, <a href="/color-converter">color converter</a>,{" "}
          <a href="/tools/contrast">contrast checker</a>, <a href="/tools/gradient">gradient generator</a>,{" "}
          <a href="/color-wheel">color wheel</a>, and <a href="/color-palette-from-image">color palette from image</a>.
        </li>
        <li><strong>Color formats:</strong> HEX, RGB, HSL, HSB, CMYK, and OKLCH.</li>
      </ul>

      <h2>What You&apos;ll Find Here</h2>
      <ul>
        <li>
          <strong>Generator and tools:</strong> a prompt-based palette
          generator plus focused tools for color picking, gradients, contrast
          checking, Tailwind scales, image color extraction, color mixing,
          color blindness simulation, and more.
        </li>
        <li>
          <strong>Reference libraries:</strong> thousands of colors, curated
          palettes, gradients, and brand color breakdowns with copy-ready HEX,
          RGB, HSL, CSS, and Tailwind values.
        </li>
        <li>
          <strong>Guides and answers:</strong> color psychology, color
          meanings, combination ideas, marketing color strategy, and
          accessibility guidance written to answer real design questions
          directly.
        </li>
      </ul>

      <h2>Why We Built It</h2>
      <p>
        Color decisions are scattered across too many tabs - one site for
        palettes, another for contrast checks, another for brand references,
        and a blog post somewhere explaining why blue feels trustworthy.
        HueFlow&apos;s goal is to close those tabs: one consistent place where
        exploration, theory, and implementation live together.
      </p>

      <h2>Accessibility First</h2>
      <p>
        We believe good color systems are accessible color systems. That&apos;s
        why contrast checking, WCAG guidance, and color blindness simulation
        are core features, not afterthoughts.
      </p>

      <h2>Get in Touch</h2>
      <p>
        Have feedback, found a bug, or want to suggest a feature? We&apos;d
        love to hear from you - visit the <a href="/contact">contact page</a>.
      </p>
    </StaticPage>
    </>
  );
}
