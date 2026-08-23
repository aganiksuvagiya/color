"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Header } from "./header";
import { blogPageContent } from "@/lib/seo/tool-pages";

const categoryColors: Record<string, string> = {
  Guides:        "bg-indigo-50 text-indigo-600",
  Explainers:    "bg-emerald-50 text-emerald-600",
  Comparisons:   "bg-amber-50 text-amber-600",
  "Best Colors": "bg-pink-50 text-pink-600",
};

export function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f0ede8] text-[#1c1712]">
      <Header />

      <main className="mx-auto w-full max-w-[1040px] px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:pt-28">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/40 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]"/>Color resource library
            </span>
            <h1 className="font-display text-[2rem] font-black leading-none tracking-[-0.04em] sm:text-[2.6rem]">
              {blogPageContent.title}
            </h1>
          </div>
        </motion.div>

        {/* Answer box */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.04 }}
          className="mb-6 rounded-2xl border border-[#e8531f]/20 bg-[#e8531f]/[0.05] px-6 py-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e8531f]">Quick answer</p>
          <p className="mt-2 text-[14px] leading-[1.8] text-[#1c1712]/65">{blogPageContent.answer}</p>
        </motion.div>

        {/* Featured articles grid */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}
          className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {blogPageContent.featuredArticles.map((article, idx) => (
            <Link key={article.href} href={article.href}
              className="group flex flex-col rounded-2xl border border-black/[0.08] bg-white p-5 shadow-sm transition hover:shadow-md hover:border-black/[0.12]">
              <div className="mb-3 flex items-center gap-2">
                <span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold ${categoryColors[article.category] ?? "bg-[#faf7f2] text-[#1c1712]/50"}`}>
                  {article.category}
                </span>
                <span className="text-[10px] text-[#1c1712]/30">{article.readTime} read</span>
              </div>
              <h2 className="text-[14px] font-bold leading-snug text-[#1c1712] group-hover:text-[#e8531f] transition-colors">
                {article.title}
              </h2>
              <p className="mt-2.5 flex-1 text-[13px] leading-[1.7] text-[#1c1712]/55">{article.excerpt}</p>
              <p className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-[#e8531f]">
                Open resource
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </p>
            </Link>
          ))}
        </motion.div>

        {/* Sections grid */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }}
          className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {blogPageContent.sections.map((section) => (
            <section key={section.title}
              className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm">
              <h2 className="text-[16px] font-bold text-[#1c1712]">{section.title}</h2>
              <p className="mt-3 text-[13px] leading-[1.75] text-[#1c1712]/55">{section.body}</p>
            </section>
          ))}
        </motion.div>

        {/* FAQ + Explore next */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.16 }}
          className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_0.9fr]">

          <section className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-[#1c1712]">FAQ</h2>
            <div className="mt-5 space-y-3">
              {blogPageContent.faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-black/[0.06] bg-[#faf7f2] px-5 py-4">
                  <h3 className="text-[13px] font-bold text-[#1c1712]">{item.question}</h3>
                  <p className="mt-1.5 text-[13px] leading-[1.75] text-[#1c1712]/55">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-[#1c1712]">Explore next</h2>
            <div className="mt-5 space-y-2">
              {blogPageContent.relatedLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="flex items-center gap-2.5 rounded-xl border border-black/[0.06] bg-[#faf7f2] px-4 py-3 text-[13px] text-[#1c1712]/60 transition hover:bg-[#f0ede8] hover:text-[#1c1712]">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#e8531f]/40"/>
                  {link.title}
                </Link>
              ))}
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
