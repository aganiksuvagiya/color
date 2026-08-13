"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "./header";
import { ColorPlayground } from "./color-playground";
import { generateRandomPalette } from "@/lib/color-utils";
import { generateTrendingPalettes, dayIndex } from "@/lib/trending";
import { encodePalette } from "@/lib/share-utils";
import type { Palette } from "@/lib/types";

// Deterministic starting palette so the hero renders identically on server and
// client; "Generate new palette" swaps in real generateRandomPalette() output
// after mount, driven entirely by user interaction.
const DEFAULT_HERO_PALETTE: Palette = {
  label: "Terracotta Sessions",
  colors: [
    { name: "Carbon", hex: "#241008", role: "neutral", text: "light" },
    { name: "Brick Lane", hex: "#C94B1A", role: "primary", text: "light" },
    { name: "Fern Valley", hex: "#7FBE6B", role: "success", text: "dark" },
    { name: "Honey Light", hex: "#F4B93F", role: "warning", text: "dark" },
    { name: "Ember Glow", hex: "#F15B2A", role: "accent", text: "light" },
  ],
};

const sections = [
  {
    title: "Generate product-ready systems",
    body: "HueFlow does more than shuffle swatches. It creates primary, status, accent, and neutral colors that already feel designed for product.",
  },
  {
    title: "Explore by mood, brand, or industry",
    body: "Start from prompts like fintech, skincare, SaaS, or editorial and generate color systems with a clearer creative point of view.",
  },
  {
    title: "Preview before you commit",
    body: "See palettes inside a rich UI canvas so you can explore and trust the result before committing to a direction.",
  },
];

const benefits = [
  {
    title: "Fast palette creation",
    body: "Generate a full five-color system in one click, then lock the colors you want to keep while you keep exploring.",
  },
  {
    title: "Accessible by design",
    body: "Every generated palette carries contrast-aware text pairings, and the built-in checker flags anything that fails WCAG.",
  },
  {
    title: "Export-ready output",
    body: "Take colors straight into Tailwind config, CSS variables, design tokens, or a shareable link - no manual cleanup.",
  },
  {
    title: "A full tool set, free",
    body: "Contrast checking, gradients, image extraction, color mixing, and more live alongside the generator, not behind a paywall.",
  },
];

const tools: { href: string; title: string; body: string; span?: "wide" | "tall" }[] = [
  { href: "/generator", title: "Palette Generator", body: "Prompt-based and random palette generation with lock, drag, and edit.", span: "wide" },
  { href: "/tools/picker", title: "Color Picker", body: "Pick, inspect, and convert any color across formats." },
  { href: "/tools/contrast", title: "Contrast Checker", body: "Test WCAG contrast ratios for text and UI elements." },
  { href: "/tools/gradient", title: "Gradient Generator", body: "Build smooth multi-stop gradients for UI and brand." },
  { href: "/tools/image-colors", title: "Image Color Extractor", body: "Pull a palette straight out of any photo.", span: "tall" },
  { href: "/tools/tailwind", title: "Tailwind Colors", body: "Browse the full Tailwind palette with shade scales." },
  { href: "/tools/color-mixer", title: "Color Mixer", body: "Blend two colors and preview every step between." },
  { href: "/tools/brand-analyzer", title: "Brand Color Analyzer", body: "Extract and evaluate a brand's existing color system." },
  { href: "/tools/design-tokens", title: "Design Token Generator", body: "Turn a palette into production-ready design tokens." },
  { href: "/tools/colorblind-simulator", title: "Color Blind Simulator", body: "Preview palettes across common color vision types." },
];

const useCases = [
  { title: "For product teams", body: "Generate primary, semantic, and support colors that already feel structured for dashboards, onboarding, and interface states." },
  { title: "For branding studios", body: "Create polished color directions for luxury, fintech, SaaS, and commerce clients with a stronger creative point of view." },
  { title: "For developers", body: "Export cleaner tokens, scalable systems, and implementation-friendly palette logic without manually rebuilding everything." },
];

const workflowCards = [
  { eyebrow: "01", title: "Start with a mood", copy: "Use prompts, industry direction, or a brand idea to guide the generator toward something stronger than random output." },
  { eyebrow: "02", title: "Refine the system", copy: "Balance neutral, primary, success, warning, and accent colors in one interface so the palette behaves like a real product kit." },
  { eyebrow: "03", title: "Ship with confidence", copy: "Take the palette into product, marketing, and handoff without losing consistency or wasting time on cleanup." },
];

const stories: { href: string; title: string }[] = [
  { href: "/guides/conversion-color-strategy", title: "Building a conversion-focused color strategy" },
  { href: "/guides/luxury-brand-color-strategy", title: "Luxury brand color strategy, explained" },
  { href: "/color-psychology", title: "Color psychology in web design" },
  { href: "/best-colors-for", title: "Best colors for SaaS, ecommerce, and more" },
  { href: "/accessibility", title: "Building an accessible color palette" },
  { href: "/color-combinations", title: "Color combinations that actually work" },
];

const faqs = [
  { question: "What is HueFlow?", answer: "HueFlow is a color generator and toolkit for building complete, product-ready color systems - not just random swatches." },
  { question: "How does the palette generator work?", answer: "Generate a random system, or describe a mood, brand, or industry and HueFlow builds primary, neutral, success, warning, and accent colors around it." },
  { question: "Can I generate palettes from an image?", answer: "Yes. The image color extractor pulls a working palette directly from any photo you upload." },
  { question: "Can I check WCAG contrast?", answer: "Yes. The contrast checker and accessibility panel flag any color pairing that fails WCAG AA or AAA." },
  { question: "Can I export my palette?", answer: "Yes. Export to Tailwind config, CSS variables, design tokens, SVG, PDF, and more directly from the generator." },
  { question: "Are HueFlow tools free?", answer: "Yes. The generator and every tool in the toolkit are free to use." },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function ToolCard({ tool }: { tool: (typeof tools)[number] }) {
  return (
    <Link
      href={tool.href}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-6 transition-colors hover:border-white/22 ${
        tool.span === "wide" ? "sm:col-span-2" : ""
      } ${tool.span === "tall" ? "sm:row-span-2" : ""}`}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: "radial-gradient(circle, #F15B2A, transparent 70%)" }}
      />
      <div>
        <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">{tool.title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/60">{tool.body}</p>
      </div>
      <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/50 transition-colors group-hover:text-white">
        Open tool
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

export function HueFlowHomePage() {
  const [heroPalette, setHeroPalette] = useState<Palette>(DEFAULT_HERO_PALETTE);
  const [locked, setLocked] = useState<Set<number>>(new Set());
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState(0);

  // Only surface the warm-hued categories (ecommerce/branding) here so the homepage
  // teaser stays on-brand; the full cool-toned spread (SaaS/mobile) still lives on /trends.
  const trendingPalettes = useMemo(
    () => generateTrendingPalettes(dayIndex(), 3).filter((p) => p.category === "ecommerce" || p.category === "branding"),
    []
  );

  function handleGenerate() {
    const fresh = generateRandomPalette();
    setHeroPalette((prev) => ({
      label: fresh.label,
      colors: fresh.colors.map((c, i) => (locked.has(i) ? prev.colors[i] : c)),
    }));
  }

  function toggleLock(index: number) {
    setLocked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function toggleLockAll() {
    setLocked((prev) =>
      prev.size === heroPalette.colors.length
        ? new Set()
        : new Set(heroPalette.colors.map((_, i) => i))
    );
  }

  async function handleCopy(index: number, hex: string) {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex((current) => (current === index ? null : current)), 1400);
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      // fallback: select a hidden input
      const el = document.createElement("input");
      el.value = hex;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  }

  return (
    <main className="relative overflow-hidden bg-[#14100d] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 50% 20%, rgba(255, 130, 30, 0.06), transparent 18%), radial-gradient(circle at 32% 32%, rgba(255, 95, 31, 0.05), transparent 9%)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.96),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.14),transparent_30%),radial-gradient(circle_at_18%_88%,rgba(255,111,26,0.16),transparent_28%),linear-gradient(135deg,#211008_0%,#181009_34%,#150f0c_60%,#241209_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />

      <Header isHome />

      <div className="relative mx-auto max-w-[1560px] px-6 pb-24 pt-20 lg:px-8">
        {/* HERO */}
        <section className="relative mx-auto max-w-[1560px] pt-12 lg:pt-16">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <motion.div initial="hidden" animate="show" variants={stagger} className="text-center lg:text-left">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-[#F15B2A]"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" fill="currentColor" /></svg>
                The complete color platform
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mx-auto mt-6 max-w-xl font-display text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.06em] text-white drop-shadow-[0_6px_14px_rgba(0,0,0,0.3)] sm:text-[3.4rem] lg:mx-0 lg:text-[4rem]"
              >
                Color, made to <span className="text-[#F97A45]">feel right.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-lg text-base leading-7 text-white/78 sm:text-lg sm:leading-8 lg:mx-0">
                Generate beautiful palettes, explore color combinations, and build visual systems for websites, apps, and brands.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/generator"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F15B2A] to-[#C94B1A] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(241,91,42,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" fill="currentColor" /></svg>
                  Generate a Palette
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/85 transition-colors hover:border-white/35 hover:bg-white/5"
                >
                  Explore Colors →
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/55 lg:justify-start">
                {["Free to use", "No sign up", "Works everywhere"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-white/40"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Decorative layered palette visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto hidden aspect-[4/3] w-full max-w-lg lg:block"
            >
              <div
                className="pointer-events-none absolute -inset-16 rounded-full opacity-60 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(241,91,42,0.28), transparent 65%)" }}
              />

              <div className="absolute inset-0 z-10 flex h-full w-full overflow-hidden rounded-[26px] border border-white/15 shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
                {heroPalette.colors.map((color) => (
                  <motion.div key={color.hex} animate={{ backgroundColor: color.hex }} transition={{ duration: 0.6 }} className="flex-1" />
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-5 -right-4 z-20 flex items-center gap-2 rounded-2xl border border-white/15 bg-[#1c1c1e]/90 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-[#F15B2A]"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" fill="currentColor" /></svg>
                <div>
                  <p className="text-xs font-semibold text-white">Accessible</p>
                  <p className="text-[11px] text-white/50">by default</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Live Palette Generator panel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-16 rounded-[28px] border border-white/14 bg-[#211a13]/70 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-7"
            id="demo"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">Live Palette Generator</h2>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/45">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Real time
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/14 bg-white/5 px-4 py-2 text-xs font-semibold text-white/75 transition-colors hover:border-white/25 hover:text-white"
                >
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" />
                  </svg>
                  Random
                </button>
                <button
                  type="button"
                  onClick={toggleLockAll}
                  aria-pressed={locked.size === heroPalette.colors.length}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/14 bg-white/5 px-4 py-2 text-xs font-semibold text-white/75 transition-colors hover:border-white/25 hover:text-white"
                >
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                  {locked.size === heroPalette.colors.length ? "Unlock All" : "Lock All"}
                </button>
                <Link
                  href={`/generator${encodePalette(heroPalette)}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/14 bg-white/5 px-4 py-2 text-xs font-semibold text-white/75 transition-colors hover:border-white/25 hover:text-white"
                >
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                  Edit &amp; Export
                </Link>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {heroPalette.colors.map((color, i) => {
                const isLight = color.text === "light";
                const isLocked = locked.has(i);
                const isCopied = copiedIndex === i;
                return (
                  <motion.div
                    key={`card-${i}`}
                    animate={{ backgroundColor: color.hex }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="group/card relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl p-4 sm:min-h-[260px]"
                  >
                    {/* Copied overlay */}
                    <AnimatePresence>
                      {isCopied && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 rounded-2xl backdrop-blur-sm"
                          style={{ backgroundColor: `${color.hex}cc` }}
                        >
                          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={isLight ? "white" : "black"} strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                          <span className={`text-xs font-bold uppercase tracking-[0.14em] ${isLight ? "text-white" : "text-black/80"}`}>Copied!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Top-left: role + hex (click to copy) */}
                    <button
                      type="button"
                      onClick={() => handleCopy(i, color.hex)}
                      aria-label={`Copy ${color.hex}`}
                      className="flex flex-1 cursor-pointer flex-col justify-start text-left"
                    >
                      <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${isLight ? "text-white/60" : "text-black/45"}`}>
                        {color.role}
                      </p>
                      <p className={`mt-1 font-mono text-sm font-semibold tracking-[-0.01em] ${isLight ? "text-white/95" : "text-black/80"}`}>
                        {color.hex}
                      </p>
                      <p className={`mt-1 text-[10px] opacity-0 transition-opacity group-hover/card:opacity-60 ${isLight ? "text-white" : "text-black"}`}>
                        Click to copy
                      </p>
                    </button>

                    {/* Bottom: lock button only */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleLock(i)}
                        aria-label={isLocked ? `Unlock ${color.name}` : `Lock ${color.name}`}
                        aria-pressed={isLocked}
                        className={`rounded-full border p-2 transition-colors ${
                          isLocked
                            ? isLight ? "border-white/45 bg-white/25 text-white" : "border-black/30 bg-black/15 text-black/80"
                            : isLight ? "border-white/25 text-white/60 hover:border-white/45 hover:text-white" : "border-black/20 text-black/45 hover:border-black/35 hover:text-black/75"
                        }`}
                      >
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          {isLocked ? (
                            <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>
                          ) : (
                            <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 019.9-1" /></>
                          )}
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(i, color.hex)}
                        aria-label={`Copy ${color.hex}`}
                        className={`rounded-full border p-2 transition-colors ${
                          isLight ? "border-white/25 text-white/60 hover:border-white/45 hover:text-white" : "border-black/20 text-black/45 hover:border-black/35 hover:text-black/75"
                        }`}
                      >
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleGenerate}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#22130d] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" fill="currentColor" /></svg>
                Generate New Palette
              </button>
            </div>
          </motion.div>
        </section>

        {/* WHY THIS DIRECTION WORKS */}
        <section className="defer-offscreen mx-auto mt-24 grid grid-cols-1 max-w-[1560px] gap-8 lg:grid-cols-[0.95fr_1.05fr]" id="why">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={stagger} className="rounded-[34px] border border-white/14 bg-[#211a13]/70 p-8">
            <motion.p variants={fadeUp} className="text-center text-sm font-semibold uppercase tracking-[0.34em] text-white/62">Why this direction works</motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[1.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[2.8rem] lg:text-[3.375rem]">
              More emotional. More premium. More memorable.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-9 text-white/74">
              A warmer, editorial feel so HueFlow looks like a product people want to explore, not just a tool they use once.
            </motion.p>
          </motion.div>

          <div className="grid gap-5">
            {sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.65 }}
                className="rounded-[30px] border border-white/10 bg-[#211a13]/75 p-7"
              >
                <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white">{section.title}</h3>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/72">{section.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* TRENDING PALETTES */}
        <section className="defer-offscreen mx-auto mt-24 max-w-[1560px]" id="trending">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="text-center">
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.34em] text-white/62">Trending now</motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[1.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[2.8rem] lg:text-[3.375rem]">
              Explore colors worth remembering.
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Palettes generated today for modern interfaces, brands, and digital products.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {trendingPalettes.map((palette, idx) => (
              <motion.div
                key={`${palette.label}-${idx}`}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="group overflow-hidden rounded-[24px] border border-white/10 bg-[#211a13]/60"
              >
                <div className="flex h-32">
                  {palette.colors.map((c) => (
                    <div key={c.hex} className="flex-1" style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
                <div className="flex items-center justify-between p-4">
                  <p className="text-sm font-medium text-white/80">{palette.label}</p>
                  <Link href={`/generator${encodePalette(palette)}`} className="text-white/40 transition-colors group-hover:text-white">
                    →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 text-center">
            <Link href="/trends" className="text-sm font-medium text-white/60 underline-offset-4 hover:text-white hover:underline">
              See all trending palettes →
            </Link>
          </div>
        </section>

        {/* COLOR PLAYGROUND */}
        <section className="defer-offscreen mx-auto mt-24 max-w-[1560px]" id="playground">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="text-center">
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.34em] text-white/62">Playground</motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[1.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[2.8rem] lg:text-[3.375rem]">
              Play with color. See what happens.
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Adjust hue, saturation, lightness, and contrast, and watch a real interface respond in real time.
            </motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7 }} className="mt-10">
            <ColorPlayground />
          </motion.div>
        </section>

        {/* TOOLS BENTO */}
        <section className="defer-offscreen mx-auto mt-24 max-w-[1560px]" id="tools">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="text-center">
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.34em] text-white/62">Feature set</motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[1.8rem] font-semibold leading-[1.1] tracking-[-0.08em] text-white sm:text-[2.8rem] lg:text-[3.375rem]">
              Everything you need to work with color.
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72">
              Built for teams that want stronger exploration, cleaner systems, and a more premium path from first idea to final handoff.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:auto-rows-[minmax(0,1fr)] xl:grid-cols-3">
            {tools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* USE CASES */}
        <section className="defer-offscreen mx-auto mt-24 max-w-[1560px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.04fr_0.96fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="rounded-[34px] border border-white/10 bg-[#211a13]/75 p-8"
            >
              <p className="text-center text-sm font-semibold uppercase tracking-[0.34em] text-white/62">Use cases</p>
              <h2 className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[1.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[2.8rem] lg:text-[3.375rem]">
                Built for every kind of project.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-white/72">
                From first exploration to final handoff, HueFlow adapts to how your team actually works with color.
              </p>
            </motion.div>

            <div className="grid gap-5">
              {useCases.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.08, duration: 0.65 }}
                  className="rounded-[28px] border border-white/14 bg-[#211a13]/65 p-7"
                >
                  <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white">{item.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-white/70">{item.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* WORKFLOW */}
        <section className="defer-offscreen mx-auto mt-24 max-w-[1560px]">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="text-center">
            <motion.p variants={fadeUp} className="text-center text-sm font-semibold uppercase tracking-[0.34em] text-white/62">Workflow</motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[1.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[2.8rem] lg:text-[3.375rem]">
              A cleaner journey from inspiration to implementation
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger} className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {workflowCards.map((card) => (
              <motion.article
                key={card.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="rounded-[30px] border border-white/10 bg-[#211a13]/75 p-7"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/56">{card.eyebrow}</p>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-white">{card.title}</h3>
                <p className="mt-4 text-lg leading-8 text-white/70">{card.copy}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* HONEST BENEFITS (replaces fake stats/testimonials) */}
        <section className="defer-offscreen mx-auto mt-24 max-w-[1560px]">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="text-center">
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.34em] text-white/62">Why HueFlow</motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[1.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[2.8rem] lg:text-[3.375rem]">
              Made for people who care about color.
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <motion.div key={benefit.title} variants={fadeUp} className="rounded-[26px] border border-white/10 bg-[#211a13]/75 p-6">
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{benefit.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* COLOR STORIES */}
        <section className="defer-offscreen mx-auto mt-24 max-w-[1560px]">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="text-center">
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.34em] text-white/62">Read</motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[1.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[2.8rem] lg:text-[3.375rem]">
              Stories behind the colors.
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stories.map((story) => (
              <motion.div key={story.href} variants={fadeUp}>
                <Link
                  href={story.href}
                  className="group flex items-center justify-between rounded-[20px] border border-white/10 bg-[#211a13]/60 px-6 py-5 transition-colors hover:border-white/22"
                >
                  <span className="text-base font-medium text-white/78 transition-colors group-hover:text-white">{story.title}</span>
                  <span className="text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white/70">→</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="defer-offscreen mx-auto mt-24 max-w-[1560px]">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="text-center">
            <motion.p variants={fadeUp} className="text-center text-sm font-semibold uppercase tracking-[0.34em] text-white/62">FAQ</motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[1.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[2.8rem] lg:text-[3.375rem]">
              A few things users usually want to know
            </motion.h2>
          </motion.div>

          <div className="mt-10 grid gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.button
                  key={faq.question}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.06, duration: 0.6 }}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="rounded-[28px] border border-white/10 bg-[#211a13]/75 p-7 text-left"
                >
                  <div className="flex items-center justify-between gap-6">
                    <h3 className="text-2xl font-semibold tracking-[-0.05em] text-white">{faq.question}</h3>
                    <span className="text-3xl text-white/82">{isOpen ? "−" : "+"}</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.p
                        key="answer"
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 18 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.32 }}
                        className="overflow-hidden text-lg leading-8 text-white/68"
                      >
                        {faq.answer}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="defer-offscreen mx-auto mt-24 max-w-[1560px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#171109]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: text */}
              <div className="relative flex flex-col justify-center px-10 py-16 sm:px-14 sm:py-20">
                <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-20 blur-3xl" style={{ background: "#F15B2A" }} />
                <div className="relative">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F97A45]">Ready to start?</p>
                  <h2 className="mt-4 font-display text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.06em] text-white sm:text-[3rem]">
                    Build the palette<br />your project deserves.
                  </h2>
                  <p className="mt-5 max-w-sm text-base leading-7 text-white/55">
                    Generate, refine, and export a complete color system - free, fast, and ready to ship.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/generator"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F15B2A] to-[#C94B1A] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(241,91,42,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" fill="currentColor" /></svg>
                      Generate Palette
                    </Link>
                    <Link
                      href="/explore"
                      className="inline-flex items-center gap-2 rounded-full border border-white/18 px-7 py-3.5 text-sm font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
                    >
                      Explore Colors →
                    </Link>
                  </div>
                  <p className="mt-6 text-xs text-white/35">Free forever · No account needed · Works everywhere</p>
                </div>
              </div>

              {/* Right: animated color mosaic - uses live palette */}
              <div className="hidden lg:grid grid-cols-5 grid-rows-4 gap-2 p-6">
                {Array.from({ length: 20 }, (_, i) => {
                  const colIndex = i % 5;
                  const color = heroPalette.colors[colIndex];
                  const cellId = `cta-cell-${i}`;
                  const isCellCopied = copiedIndex === 100 + i;
                  const textColor = color?.text === "light" ? "white" : "rgba(0,0,0,0.75)";
                  return (
                    <motion.button
                      key={cellId}
                      type="button"
                      aria-label={`Copy ${color?.hex}`}
                      onClick={() => handleCopy(100 + i, color?.hex ?? "")}
                      animate={{ backgroundColor: color?.hex }}
                      transition={{ backgroundColor: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
                      whileHover={{ scale: 1.07, transition: { duration: 0.18 } }}
                      whileTap={{ scale: 0.93 }}
                      className="relative overflow-hidden rounded-xl"
                    >
                      <AnimatePresence>
                        {isCellCopied && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.22 }}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-0.5"
                            style={{ color: textColor }}
                          >
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                            <span className="text-[8px] font-bold uppercase tracking-[0.12em]">Copied</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
