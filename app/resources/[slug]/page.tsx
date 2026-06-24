import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StructuredData } from "@/components/seo/structured-data";
import { clusterIdeas, findEntry, folderStructure, growthRoadmap } from "@/lib/seo/content";
import { buildCollectionMetadata } from "@/lib/seo/page-utils";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildOrganizationSchema,
  buildSoftwareApplicationSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

export const revalidate = 86400;

export function generateStaticParams() {
  return [{ slug: "seo-architecture" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildCollectionMetadata("resources", slug, "/resources");
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = findEntry("resources", slug);

  if (!entry) {
    notFound();
  }

  const url = `${siteConfig.domain}/resources/${entry.slug}`;

  return (
    <>
      <StructuredData data={buildOrganizationSchema()} />
      <StructuredData data={buildSoftwareApplicationSchema()} />
      <StructuredData data={buildWebPageSchema({ title: entry.title, description: entry.description, url })} />
      <StructuredData data={buildArticleSchema({ title: entry.title, description: entry.description, url })} />
      <StructuredData data={buildFaqSchema(entry.faq)} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Resources", item: `${siteConfig.domain}/resources` },
          { name: entry.title, item: url },
        ])}
      />
      <main className="min-h-screen bg-[linear-gradient(180deg,#fefaf6_0%,#ffffff_100%)] text-slate-950">
        <section className="border-b border-black/5 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_24%)]">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-700">Enterprise architecture</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl">{entry.title}</h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">{entry.description}</p>
            <div className="mt-8 rounded-[2rem] border border-orange-200 bg-white/92 p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-700">Executive summary</p>
              <p className="mt-3 text-lg leading-8 text-slate-900">{entry.answer}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.05)]">
              <h2 className="text-2xl font-semibold tracking-tight">Implementation plan</h2>
              <ol className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                <li>1. Build scalable programmatic routes for named colors, hex colors, palette slugs, gradients, combinations, meanings, and brand-color industries.</li>
                <li>2. Normalize every page into answer-first, AI-citable blocks with schema, canonicals, and semantic entity relationships.</li>
                <li>3. Expand internal linking automatically so each page links to relevant colors, palettes, gradients, accessibility guides, branding guides, and articles.</li>
                <li>4. Publish crawlable discovery assets including robots, sitemap index, partitioned sitemaps, and llms.txt for AI systems.</li>
                <li>5. Scale topic coverage with cluster-driven guides, comparisons, FAQs, and best-for pages until the site covers the full color decision journey.</li>
              </ol>
            </div>
            <div className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.05)]">
              <h2 className="text-2xl font-semibold tracking-tight">Folder structure</h2>
              <div className="mt-5 rounded-[1.5rem] bg-slate-950 p-5 text-sm text-slate-200">
                <pre className="overflow-x-auto whitespace-pre-wrap">{folderStructure.join("\n")}</pre>
              </div>
            </div>
            <div className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.05)]">
              <h2 className="text-2xl font-semibold tracking-tight">Sitemap architecture</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                <li>`/sitemap.xml` as the index file pointing to all sitemap partitions</li>
                <li>`/sitemap-pages.xml` for core pages and tool routes</li>
                <li>`/sitemap-colors.xml` for colors, meanings, combinations, Tailwind, and CSS pages</li>
                <li>`/sitemap-palettes.xml` for commercial palette pages</li>
                <li>`/sitemap-gradients.xml` for gradient pages and generator intent</li>
                <li>`/sitemap-brand-colors.xml` for industry and company color pages</li>
                <li>`/sitemap-guides.xml` for guides, explainers, comparisons, best-for pages, FAQs, and resources</li>
                <li>`/sitemap-blog.xml` reserved for editorial freshness and linkable assets</li>
                <li>`/llms.txt` for AI retrieval guidance and high-value discovery paths</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.05)]">
              <h2 className="text-2xl font-semibold tracking-tight">Internal linking map</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                <li>Color page to related palettes, gradients, color meaning, accessibility, Tailwind, and CSS pages</li>
                <li>Palette page to individual colors, similar palettes, industry use cases, and brand-color hubs</li>
                <li>Gradient page to supporting colors, palette matches, and web-design implementation pages</li>
                <li>Best-for pages to brand colors, palettes, combinations, FAQs, and explainers</li>
                <li>FAQ pages to the strongest answer page plus the nearest commercial page for deeper exploration</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.05)]">
              <h2 className="text-2xl font-semibold tracking-tight">GEO and AEO format</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                <li>Every page starts with a 40-60 word answer block for featured snippets and AI retrieval</li>
                <li>FAQ blocks reinforce direct question matching for ChatGPT, Gemini, Claude, Perplexity, and Bing Copilot</li>
                <li>Comparison tables support multi-option reasoning and citation extraction</li>
                <li>Entity-rich breadcrumbs, canonicals, and JSON-LD improve machine readability</li>
                <li>Short sections with explicit labels reduce ambiguity in AI chunking systems</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="rounded-[2rem] border border-black/8 bg-slate-950 p-7 text-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
            <h2 className="text-2xl font-semibold tracking-tight">100 content clusters for US organic demand</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {clusterIdeas.map((idea) => (
                <div key={idea} className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  {idea}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.05)]">
              <h2 className="text-2xl font-semibold tracking-tight">Programmatic SEO plan</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                <li>Scale `/colors/[slug]` across named colors and hex pages with definitions, meanings, and implementation links</li>
                <li>Scale `/palettes/[slug]` across category, industry, and mood-based palette names</li>
                <li>Scale `/brand-colors/[slug]` across industries and recognizable company examples</li>
                <li>Scale `/color-combinations/[slug]` across high-demand two-color pairs with use-case tables</li>
                <li>Scale `/best-colors-for/[slug]`, `/comparisons/[slug]`, and `/faqs/[slug]` from search question models</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.05)]">
              <h2 className="text-2xl font-semibold tracking-tight">Growth roadmap to 1M monthly visitors</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                {growthRoadmap.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.05)]">
              <h2 className="text-2xl font-semibold tracking-tight">Missing SEO issues addressed</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                <li>Named-color and hex-color programmatic coverage was limited; now the color route supports both.</li>
                <li>Internal linking was too manual; now it auto-expands to 5-10 related pages for stronger hub-and-spoke coverage.</li>
                <li>Discovery assets lacked llms.txt support for AI crawlers and retrieval systems.</li>
                <li>Sitemap coverage was seed-based; now color sitemap paths include scalable programmatic color and hex discovery.</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.05)]">
              <h2 className="text-2xl font-semibold tracking-tight">Missing GEO, AEO, and LLMO issues addressed</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                <li>Pages now normalize into answer-first, quote-ready sections for AI summaries and retrieval systems.</li>
                <li>Definitions, quick facts, pros and cons, expert summaries, and citation blocks were added as first-class page structures.</li>
                <li>Entity relationships between colors, palettes, gradients, accessibility, branding, psychology, Tailwind, CSS, and marketing are now explicit.</li>
                <li>Schema already covered the main answer-engine formats and is now paired with richer machine-readable content blocks.</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/colors" className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium hover:bg-slate-50">
              Explore silo pages
            </Link>
            <Link href="/guides/conversion-color-strategy" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white">
              Open answer-first guide
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
