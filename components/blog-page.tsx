"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Header } from "./header";
import { blogPageContent } from "@/lib/seo/tool-pages";

const categoryColors: Record<string, string> = {
  Guides: "bg-indigo-500/20 text-indigo-300",
  Explainers: "bg-emerald-500/20 text-emerald-300",
  Comparisons: "bg-amber-500/20 text-amber-300",
  "Best Colors": "bg-pink-500/20 text-pink-300",
};

export function BlogPage() {
  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />

      <Header />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-300">Answer-first resource library</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{blogPageContent.title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/60">{blogPageContent.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">Direct answer</p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-white/72">{blogPageContent.answer}</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {blogPageContent.featuredArticles.map((article, idx) => (
            <motion.div
              key={article.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={article.href}
                className="group block h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-colors hover:bg-white/8"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${categoryColors[article.category] || "bg-white/10 text-white/60"}`}>
                    {article.category}
                  </span>
                  <span className="text-[10px] text-white/25">{article.readTime} read</span>
                </div>
                <h2 className="text-base font-semibold text-white group-hover:text-white/90">{article.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/55">{article.excerpt}</p>
                <p className="mt-5 text-sm font-medium text-orange-300">Open resource</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {blogPageContent.sections.map((section, idx) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/65">{section.body}</p>
            </motion.section>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">FAQ</h2>
            <div className="mt-5 space-y-4">
              {blogPageContent.faq.map((item) => (
                <div key={item.question} className="rounded-xl bg-black/20 p-4">
                  <h3 className="text-base font-semibold text-white">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/65">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">Explore next</h2>
            <div className="mt-5 space-y-3">
              {blogPageContent.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/72 transition-colors hover:bg-black/30 hover:text-white"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
