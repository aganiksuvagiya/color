"use client";

import Link from "next/link";
import { useState } from "react";

import { Header } from "./header";
import { blogPageContent } from "@/lib/seo/tool-pages";

type Article = (typeof blogPageContent.featuredArticles)[number];

// One hue per category, so a card's cover tells you what kind of article it is.
const CATEGORY_HUE: Record<string, number> = {
  Guides: 245,
  Explainers: 160,
  Comparisons: 38,
  "Best Colors": 330,
};

const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]";

function hashOf(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

/** Five swatches built from the category hue, nudged per article. Deterministic, so server and client match. */
function coverColors(article: Article) {
  const base = (CATEGORY_HUE[article.category] ?? 20) + ((hashOf(article.title) % 41) - 20);
  return [
    `hsl(${base} 55% 26%)`,
    `hsl(${base} 70% 48%)`,
    `hsl(${base + 28} 78% 62%)`,
    `hsl(${base + 52} 82% 76%)`,
    `hsl(${base + 52} 70% 92%)`,
  ];
}

export function BlogPage() {
  const articles = blogPageContent.featuredArticles;
  const categories = Array.from(new Set(articles.map((a) => a.category)));
  const [category, setCategory] = useState<string>("All");

  const visible = category === "All" ? articles : articles.filter((a) => a.category === category);
  const dots = categories.map((c) => `hsl(${CATEGORY_HUE[c] ?? 20} 70% 52%)`);

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      <main>
        {/* ── Header ── */}
        <section className="w-full px-6 pb-8 pt-28 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
            <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
            <span className="text-[#1c1712]/20">/</span>
            <Link href="/resources" className="transition hover:text-[#1c1712]/70">Resources</Link>
            <span className="text-[#1c1712]/20">/</span>
            <span className="text-[#1c1712]/60">Blog</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">{blogPageContent.title}</h1>
          <div className="mt-5 flex max-w-4xl flex-wrap items-start gap-3">
            <span className="mt-1.5 flex -space-x-1.5" aria-hidden="true">
              {dots.map((c, i) => (
                <span key={i} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
              ))}
            </span>
            <p className="min-w-0 flex-1 basis-80 text-[16px] leading-7 text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">{articles.length} articles, free.</span> {blogPageContent.answer}
            </p>
          </div>
        </section>

        {/* ── Articles ── */}
        <section className="border-t border-black/[0.06]">
          <div className="border-b border-black/[0.06] bg-white/95 backdrop-blur lg:sticky lg:top-[86px] lg:z-20">
            <div className="flex w-full flex-wrap items-center gap-2 px-6 py-4 sm:px-8 lg:px-12" role="group" aria-label="Article category">
              {["All", ...categories].map((c) => {
                const count = c === "All" ? articles.length : articles.filter((a) => a.category === c).length;
                const on = category === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    aria-pressed={on}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold transition ${
                      on ? "bg-[#1c1712] text-white" : "text-[#1c1712]/65 ring-1 ring-black/[0.12] hover:text-[#1c1712] hover:ring-black/25"
                    }`}
                  >
                    {c}
                    <span className={`font-mono text-[11px] ${on ? "text-white/60" : "text-[#1c1712]/40"}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full px-6 py-10 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((article, idx) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group flex flex-col overflow-hidden rounded-2xl ring-1 ring-black/[0.07] transition hover:-translate-y-0.5 hover:ring-black/25"
                >
                  <div className="flex h-28 overflow-hidden" aria-hidden="true">
                    {coverColors(article).map((c, i) => (
                      <span key={i} className="flex-1 transition-[flex] duration-300 group-hover:first:flex-[1.4]" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      {idx === 0 && category === "All" && <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">Start here</span>}
                      <span className="rounded-full bg-[#1c1712]/[0.05] px-2.5 py-0.5 text-[11px] font-semibold text-[#1c1712]/65">{article.category}</span>
                      <span className="text-[12px] text-[#1c1712]/45">{article.readTime} read</span>
                    </div>
                    <h2 className="mt-3 text-[1.1rem] font-semibold leading-snug tracking-[-0.015em] transition-colors group-hover:text-[#c2410c]">{article.title}</h2>
                    <p className="mt-2 flex-1 text-[14px] leading-6 text-[#1c1712]/60">{article.excerpt}</p>
                    <p className="mt-4 text-[13px] font-semibold text-[#c2410c]">
                      Read the article <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── What the library is for ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>The library</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">What you will find here</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {blogPageContent.sections.map((section, i) => (
                <div key={section.title} className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                  <span className="text-[12px] font-semibold text-[#c2410c]">0{i + 1}</span>
                  <h3 className="mt-1.5 text-[15px] font-semibold">{section.title}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-[#1c1712]/65">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ + explore next ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:px-12">
            <div>
              <p className={eyebrow}>FAQ</p>
              <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Frequently asked questions</h2>
              <div className="mt-6 divide-y divide-black/[0.08] border-y border-black/[0.08]">
                {blogPageContent.faq.map((f, i) => (
                  <details key={f.question} open={i === 0} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] font-semibold leading-6 outline-none transition hover:text-[#c2410c] focus-visible:text-[#c2410c] [&::-webkit-details-marker]:hidden">
                      {f.question}
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#1c1712]/55 ring-1 ring-black/[0.14] transition duration-200 group-open:rotate-45 group-open:bg-[#1c1712] group-open:text-white group-open:ring-[#1c1712]">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                          <path d="M6 1v10M1 6h10" />
                        </svg>
                      </span>
                    </summary>
                    <p className="-mt-1 max-w-3xl pb-6 pr-12 text-[15px] leading-7 text-[#1c1712]/65">{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>
            <div>
              <p className={eyebrow}>Explore</p>
              <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Explore next</h2>
              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {blogPageContent.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-[14px] font-semibold leading-5 text-[#1c1712]/85 ring-1 ring-black/[0.08] transition hover:bg-[#fafafa] hover:text-[#c2410c] hover:ring-black/25"
                  >
                    {link.title}
                    <span className="shrink-0 text-[#1c1712]/40 transition group-hover:translate-x-0.5 group-hover:text-[#c2410c]" aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
