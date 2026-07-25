import type { Metadata } from "next";

import { StaticPage } from "@/components/static-page";
import { buildPageMetadata } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "HueFlow is a color platform for designers, developers, and marketers — palettes, gradients, accessibility tools, and brand color guidance in one place.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <StaticPage title="About HueFlow">
      <p>
        HueFlow is a color platform built for the people who work with color
        every day — designers, developers, and marketers. It brings palettes,
        gradients, brand color references, accessibility tooling, and practical
        color guidance together in one place, so you can go from &quot;what
        color should this be?&quot; to implementation-ready values in minutes.
      </p>

      <h2>What You&apos;ll Find Here</h2>
      <ul>
        <li>
          <strong>Generator and tools:</strong> an AI-assisted palette
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
        Color decisions are scattered across too many tabs — one site for
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
        love to hear from you — visit the <a href="/contact">contact page</a>.
      </p>
    </StaticPage>
  );
}
