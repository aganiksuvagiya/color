"use client";

import { motion } from "framer-motion";
import { Header } from "./header";

const articles = [
  {
    title: "Understanding Color Harmony",
    excerpt: "Learn how complementary, analogous, and triadic color relationships create visually pleasing palettes for product design.",
    category: "Theory",
    readTime: "5 min",
  },
  {
    title: "WCAG Contrast Requirements Explained",
    excerpt: "A practical guide to meeting AA and AAA contrast ratios so your interface is accessible to all users.",
    category: "Accessibility",
    readTime: "4 min",
  },
  {
    title: "Building a Design Token System",
    excerpt: "How to structure color tokens for scalable design systems that work across platforms and teams.",
    category: "Systems",
    readTime: "7 min",
  },
  {
    title: "Color Psychology in UI Design",
    excerpt: "Why blue feels trustworthy, red creates urgency, and how to use color psychology to influence user behavior.",
    category: "Psychology",
    readTime: "6 min",
  },
  {
    title: "Dark Mode Color Strategies",
    excerpt: "Best practices for adapting your color palette to dark mode without losing brand identity or readability.",
    category: "Design",
    readTime: "5 min",
  },
  {
    title: "Designing for Color Blindness",
    excerpt: "8% of males have some form of color vision deficiency. Here's how to design palettes that work for everyone.",
    category: "Accessibility",
    readTime: "4 min",
  },
  {
    title: "From Hex to HSL: Color Formats Explained",
    excerpt: "Understanding when to use hex, RGB, HSL, and other color formats in your development workflow.",
    category: "Technical",
    readTime: "3 min",
  },
  {
    title: "Semantic Colors for Product Teams",
    excerpt: "Why naming colors by role (primary, success, warning) beats naming by hue (blue, green, orange) in production systems.",
    category: "Systems",
    readTime: "5 min",
  },
];

const categoryColors: Record<string, string> = {
  Theory: "bg-indigo-500/20 text-indigo-400",
  Accessibility: "bg-emerald-500/20 text-emerald-400",
  Systems: "bg-amber-500/20 text-amber-400",
  Psychology: "bg-pink-500/20 text-pink-400",
  Design: "bg-purple-500/20 text-purple-400",
  Technical: "bg-sky-500/20 text-sky-400",
};

export function BlogPage() {
  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />

      <Header />

      <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-24 sm:px-6 sm:pt-40">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Color Theory & Resources</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">Guides to help you build better color systems for your products.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {articles.map((article, idx) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-colors hover:bg-white/8"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${categoryColors[article.category] || "bg-white/10 text-white/50"}`}>
                  {article.category}
                </span>
                <span className="text-[10px] text-white/25">{article.readTime} read</span>
              </div>
              <h2 className="mb-2 text-base font-semibold text-white group-hover:text-white/90">{article.title}</h2>
              <p className="text-sm leading-6 text-white/50">{article.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
