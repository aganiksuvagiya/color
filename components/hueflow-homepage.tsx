"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Header } from "./header";
import { DailyChallengeBanner } from "./daily-challenge-banner";
import { StructuredData } from "./seo/structured-data";
import { generateRandomPalette, hexToHsl, hslToHex, getContrastText } from "@/lib/color-utils";
import { generateHarmony } from "@/lib/harmony";
import { generateShades, shiftLightness } from "@/lib/shades";
import { generateTrendingPalettes, dayIndex } from "@/lib/trending";
import { getContrastRatio, getWcagLevel } from "@/lib/accessibility";
import { encodePalette } from "@/lib/share-utils";
import { buildFaqSchema } from "@/lib/seo/schema";
import type { Palette } from "@/lib/types";

// Deterministic starting palette so the hero renders identically on server and
// client; randomized regeneration only ever runs from a user interaction.
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

// Hand-curated so the discover grid always looks intentional rather than
// randomly rolled — this is the one place the brief explicitly asks for that.
const DISCOVER_COLLECTIONS: { label: string; href: string; colors: string[] }[] = [
  { label: "Minimal", href: "/generator?label=Minimal&c=F5F3EF-E4E0D8-C9C4B8-8A857A-1C1712", colors: ["#F5F3EF", "#E4E0D8", "#C9C4B8", "#8A857A", "#1C1712"] },
  { label: "Warm", href: "/generator?label=Warm&c=2B140A-C94B1A-F15B2A-F4B93F-FCE0B8", colors: ["#2B140A", "#C94B1A", "#F15B2A", "#F4B93F", "#FCE0B8"] },
  { label: "Cool", href: "/generator?label=Cool&c=0B1E33-1D4E89-3E82C4-8FC1E3-DFF0FA", colors: ["#0B1E33", "#1D4E89", "#3E82C4", "#8FC1E3", "#DFF0FA"] },
  { label: "Luxury", href: "/generator?label=Luxury&c=120E0A-4A3418-B9924A-E6D5AE-0D0D0D", colors: ["#120E0A", "#4A3418", "#B9924A", "#E6D5AE", "#0D0D0D"] },
  { label: "Nature", href: "/generator?label=Nature&c=1D2B1A-3F6B3A-7FA65C-C6D9A1-F2EFE1", colors: ["#1D2B1A", "#3F6B3A", "#7FA65C", "#C6D9A1", "#F2EFE1"] },
  { label: "Pastel", href: "/generator?label=Pastel&c=FBEAF0-F7D9E3-CDE7F0-D7F0DD-FFF3D6", colors: ["#FBEAF0", "#F7D9E3", "#CDE7F0", "#D7F0DD", "#FFF3D6"] },
  { label: "Bold", href: "/generator?label=Bold&c=0D0D0D-E8531F-FFD23F-2EC4B6-FF3366", colors: ["#0D0D0D", "#E8531F", "#FFD23F", "#2EC4B6", "#FF3366"] },
  { label: "Dark", href: "/generator?label=Dark&c=0A0A0A-1C1C1C-32302E-524F4A-8C8781", colors: ["#0A0A0A", "#1C1C1C", "#32302E", "#524F4A", "#8C8781"] },
  { label: "Modern", href: "/generator?label=Modern&c=13111A-5B3DF5-8F7BFF-C9C0FF-F3F1FF", colors: ["#13111A", "#5B3DF5", "#8F7BFF", "#C9C0FF", "#F3F1FF"] },
  { label: "Trending", href: "/trends", colors: [] },
];

const DEEPER_ITEMS = [
  {
    title: "Color Psychology",
    body: "Understand the feeling behind a color before it ships.",
    href: "/color-psychology",
  },
  {
    title: "Color Harmony",
    body: "Find complementary, analogous, and triadic relationships.",
    href: "/tools/color-harmony",
  },
  {
    title: "Accessibility",
    body: "Check contrast and readability against WCAG standards.",
    href: "/tools/contrast",
  },
  {
    title: "Shades & Variations",
    body: "Build a complete tint-and-shade system from one color.",
    href: "/tools/tailwind-scale",
  },
];

const FOR_YOU = [
  {
    title: "Designers",
    body: "Build visual systems, interfaces, and brand palettes faster, with harmony and contrast handled for you.",
    href: "/generator",
    cta: "Open the generator",
  },
  {
    title: "Developers",
    body: "Get production-ready HEX, RGB, HSL, and accessible color combinations, exportable straight into your stack.",
    href: "/tools/design-tokens",
    cta: "Generate design tokens",
  },
  {
    title: "Brands",
    body: "Explore palettes that communicate the right personality, or analyze the colors a brand already uses.",
    href: "/tools/brand-analyzer",
    cta: "Analyze a brand",
  },
];

const WHY_HUEFLOW = [
  { title: "Explore faster", body: "Find useful combinations without endless trial and error." },
  { title: "Create with confidence", body: "Use harmony and accessibility tools together, not separately." },
  { title: "Keep everything in one place", body: "Generate, explore, test, and copy colors from one workspace." },
  { title: "Made for real projects", body: "Colors come in formats designers and developers can actually use." },
];

const STORIES: { href: string; title: string }[] = [
  { href: "/guides/conversion-color-strategy", title: "Building a conversion-focused color strategy" },
  { href: "/guides/luxury-brand-color-strategy", title: "Luxury brand color strategy, explained" },
  { href: "/color-psychology", title: "Color psychology in web design" },
  { href: "/best-colors-for", title: "Best colors for SaaS, ecommerce, and more" },
  { href: "/accessibility", title: "Building an accessible color palette" },
  { href: "/color-combinations", title: "Color combinations that actually work" },
];

const FAQS = [
  { question: "What is HueFlow?", answer: "HueFlow is a color workspace for discovering, generating, and exploring colors — a palette generator, picker, converter, and accessibility checker in one place." },
  { question: "Is HueFlow free?", answer: "Yes. The generator and every tool in the toolkit are free to use, with no account required to start." },
  { question: "What can I use HueFlow for?", answer: "Building color palettes and schemes, converting between HEX, RGB, and HSL, checking contrast, generating shades, and finding color inspiration for products and brands." },
  { question: "Can I generate color palettes?", answer: "Yes. Generate a random palette, start from a mood or industry prompt, or build one from a single base color." },
  { question: "Can I check color contrast?", answer: "Yes. The contrast checker and accessibility panel flag any color pairing that fails WCAG AA or AAA." },
  { question: "Can I copy HEX, RGB, and HSL values?", answer: "Yes. Click any color anywhere on HueFlow to copy its value, or open a palette in the generator to export it in multiple formats." },
];

const TOOL_NAV = [
  { key: "generator", title: "Palette Generator", body: "Create harmonious palettes instantly.", href: "/generator" },
  { key: "picker", title: "Color Picker", body: "Explore and copy precise colors.", href: "/tools/picker" },
  { key: "converter", title: "Color Converter", body: "Convert between HEX, RGB, HSL, and more.", href: "/color-converter" },
  { key: "contrast", title: "Contrast Checker", body: "Make sure your colors are accessible.", href: "/tools/contrast" },
  { key: "shades", title: "Color Shades", body: "Generate tints, shades, and tones.", href: "/tools/tailwind-scale" },
] as const;

type ToolKey = (typeof TOOL_NAV)[number]["key"];

const BASE_SWATCHES = ["#E8531F", "#1D4E89", "#3F6B3A", "#8B4A9C", "#B9924A", "#0D0D0D"];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-sm font-semibold uppercase tracking-[0.28em] text-[#1c1712]/45">{children}</p>
  );
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="text-center">
      <motion.div variants={fadeUp}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1c1712] sm:text-[2.6rem] lg:text-[3.1rem]"
      >
        {title}
      </motion.h2>
      {body && (
        <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#1c1712]/55">
          {body}
        </motion.p>
      )}
    </motion.div>
  );
}

function buildColorSystem(baseHex: string) {
  const { h, s, l } = hexToHsl(baseHex);
  return [
    { name: "Primary", hex: baseHex },
    { name: "Secondary", hex: hslToHex((h + 28) % 360, Math.max(30, s - 10), Math.min(60, l + 4)) },
    { name: "Accent", hex: hslToHex((h + 180) % 360, Math.min(90, s + 8), l) },
    { name: "Background", hex: hslToHex(h, Math.min(s * 0.12, 10), 97) },
    { name: "Surface", hex: hslToHex(h, Math.min(s * 0.08, 8), 100) },
    { name: "Text", hex: hslToHex(h, Math.min(s * 0.25, 18), 12) },
    { name: "Success", hex: "#2E9E5B" },
    { name: "Warning", hex: "#E8A32E" },
    { name: "Error", hex: "#D8433A" },
  ];
}

export function HueFlowHomePage() {
  const [heroPalette, setHeroPalette] = useState<Palette>(DEFAULT_HERO_PALETTE);
  const [heroHoverIndex, setHeroHoverIndex] = useState<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<ToolKey>("generator");
  const [baseColor, setBaseColor] = useState(BASE_SWATCHES[0]);
  const [openFaq, setOpenFaq] = useState(0);

  const trendingPalette = useMemo(() => generateTrendingPalettes(dayIndex(), 1)[0], []);

  const harmony = useMemo(() => generateHarmony(baseColor, "complementary"), [baseColor]);
  const shades = useMemo(() => generateShades(baseColor), [baseColor]);
  const colorSystem = useMemo(() => buildColorSystem(baseColor), [baseColor]);
  const lighter = useMemo(() => shiftLightness(baseColor, 22), [baseColor]);
  const darker = useMemo(() => shiftLightness(baseColor, -22), [baseColor]);
  const baseContrastWhite = useMemo(() => getContrastRatio(baseColor, "#ffffff"), [baseColor]);

  const handleGenerate = useCallback(() => {
    setHeroPalette(generateRandomPalette());
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code !== "Space") return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON") return;
      e.preventDefault();
      handleGenerate();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleGenerate]);

  async function handleCopy(key: string, hex: string) {
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1300);
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      const el = document.createElement("input");
      el.value = hex;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  }

  return (
    <main className="relative bg-[#faf7f2] text-[#1c1712]">
      <StructuredData data={buildFaqSchema(FAQS)} />
      <Header isHome />

      <div className="relative mx-auto max-w-[1400px] px-6 pb-28 pt-28 lg:px-8 lg:pt-32">
        {/* ============ HERO ============ */}
        <section className="relative mx-auto max-w-[1400px]">
          <motion.div initial="hidden" animate="show" variants={stagger} className="mx-auto max-w-3xl text-center">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1c1712]/55">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]" />
              The modern color workspace
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mx-auto mt-7 max-w-2xl font-display text-[2.75rem] font-semibold leading-[1.04] tracking-[-0.05em] text-[#1c1712] sm:text-[3.6rem] lg:text-[4.4rem]"
            >
              Find colors that <span style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>feel right.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#1c1712]/55 sm:text-lg sm:leading-8">
              Create beautiful color palettes, explore color combinations, check accessibility, and turn inspiration into colors you can actually use.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/generator"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(232,83,31,0.28)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
              >
                Create a palette
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-7 py-3.5 text-sm font-semibold text-[#1c1712]/75 transition-colors hover:border-black/20 hover:bg-black/[0.02]"
              >
                Explore colors →
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 text-sm text-[#1c1712]/40">
              Free to use · No design experience required
            </motion.p>
          </motion.div>

          {/* Interactive hero palette */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-14 max-w-4xl"
          >
            <div className="flex h-40 gap-2 overflow-hidden rounded-[26px] border border-black/8 shadow-[0_20px_60px_rgba(28,23,18,0.08)] sm:h-52">
              {heroPalette.colors.map((color, i) => {
                const isHover = heroHoverIndex === i;
                const isCopied = copiedKey === `hero-${i}`;
                const isLight = color.text === "light";
                return (
                  <motion.button
                    key={`${color.hex}-${i}`}
                    type="button"
                    onMouseEnter={() => setHeroHoverIndex(i)}
                    onMouseLeave={() => setHeroHoverIndex((v) => (v === i ? null : v))}
                    onClick={() => handleCopy(`hero-${i}`, color.hex)}
                    aria-label={`Copy ${color.hex}`}
                    animate={{ backgroundColor: color.hex, flexGrow: isHover ? 1.6 : 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-1 flex-col items-center justify-end overflow-hidden p-4"
                  >
                    <AnimatePresence>
                      {isHover && !isCopied && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className={`flex flex-col items-center gap-1 ${isLight ? "text-white" : "text-black/80"}`}
                        >
                          <span className="font-mono text-xs font-semibold sm:text-sm">{color.hex.toUpperCase()}</span>
                          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="opacity-70">
                            <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg>
                        </motion.div>
                      )}
                      {isCopied && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`text-xs font-bold uppercase tracking-[0.14em] ${isLight ? "text-white" : "text-black/80"}`}
                        >
                          Copied!
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
              <p className="text-sm text-[#1c1712]/40">{heroPalette.label}</p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1c1712]/55 transition-colors hover:text-[#1c1712]"
                >
                  <kbd className="rounded border border-black/10 bg-white px-1.5 py-0.5 font-mono text-[10px]">Space</kbd>
                  Generate new palette
                </button>
                <Link href={`/generator${encodePalette(heroPalette)}`} className="text-sm font-medium text-[#e8531f] hover:underline underline-offset-4">
                  Edit &amp; export →
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <DailyChallengeBanner />

        {/* ============ PRIMARY PRODUCT SECTION ============ */}
        <section className="mt-28" id="tools">
          <SectionHeading eyebrow="The workspace" title="One place for everything color." body="From your first color idea to a production-ready palette." />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-[0.85fr_1.15fr]"
          >
            <div className="flex flex-col gap-2">
              {TOOL_NAV.map((tool) => {
                const isActive = activeTool === tool.key;
                return (
                  <button
                    key={tool.key}
                    type="button"
                    onClick={() => setActiveTool(tool.key)}
                    className={`rounded-2xl border px-5 py-4 text-left transition-colors ${
                      isActive ? "border-[#e8531f]/30 bg-white shadow-[0_4px_20px_rgba(28,23,18,0.06)]" : "border-transparent hover:bg-white/60"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className={`text-base font-semibold ${isActive ? "text-[#1c1712]" : "text-[#1c1712]/70"}`}>{tool.title}</p>
                      <span className={`text-lg transition-transform ${isActive ? "translate-x-0 text-[#e8531f]" : "-translate-x-1 text-[#1c1712]/20"}`}>→</span>
                    </div>
                    <p className="mt-1 text-sm text-[#1c1712]/50">{tool.body}</p>
                  </button>
                );
              })}
              <Link
                href={TOOL_NAV.find((t) => t.key === activeTool)?.href ?? "/generator"}
                className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(232,83,31,0.25)] transition-transform hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
              >
                Open {TOOL_NAV.find((t) => t.key === activeTool)?.title}
              </Link>
            </div>

            <div className="rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_4px_30px_rgba(28,23,18,0.05)] sm:p-8">
              <AnimatePresence mode="wait">
                {activeTool === "generator" && (
                  <motion.div key="generator" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                    <div className="flex h-40 gap-2 overflow-hidden rounded-2xl sm:h-56">
                      {heroPalette.colors.map((c) => (
                        <div key={c.hex} className="flex-1" style={{ backgroundColor: c.hex }} />
                      ))}
                    </div>
                    <p className="mt-5 text-sm leading-6 text-[#1c1712]/55">
                      Generate primary, neutral, success, warning, and accent colors in one click — lock the ones you want to keep and reroll the rest.
                    </p>
                  </motion.div>
                )}
                {activeTool === "picker" && (
                  <motion.div key="picker" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                    <div className="flex flex-col items-center gap-5 py-4 sm:flex-row sm:items-center">
                      <div className="h-32 w-32 shrink-0 rounded-full sm:h-40 sm:w-40" style={{ background: "conic-gradient(from 0deg, #E8531F, #F4B93F, #7FBE6B, #3E82C4, #8B4A9C, #E8531F)" }} />
                      <div className="grid w-full grid-cols-3 gap-2 text-center">
                        {[{ label: "HEX", value: baseColor.toUpperCase() }, { label: "RGB", value: hexToRgbString(baseColor) }, { label: "HSL", value: hexToHslString(baseColor) }].map((f) => (
                          <div key={f.label} className="rounded-xl border border-black/8 bg-[#faf7f2] px-3 py-3">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1c1712]/40">{f.label}</p>
                            <p className="mt-1 font-mono text-xs text-[#1c1712]">{f.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#1c1712]/55">Pick any color and inspect it across every format instantly.</p>
                  </motion.div>
                )}
                {activeTool === "converter" && (
                  <motion.div key="converter" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                    <div className="flex items-center gap-4 py-2">
                      <div className="h-20 w-20 shrink-0 rounded-2xl" style={{ backgroundColor: baseColor }} />
                      <div className="flex-1 space-y-2">
                        {[hexToRgbString(baseColor), hexToHslString(baseColor), baseColor.toUpperCase()].map((v) => (
                          <div key={v} className="flex items-center justify-between rounded-xl border border-black/8 bg-[#faf7f2] px-4 py-2.5 font-mono text-sm text-[#1c1712]/75">
                            {v}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#1c1712]/55">Convert between HEX, RGB, HSL, and other formats without leaving the page.</p>
                  </motion.div>
                )}
                {activeTool === "contrast" && (
                  <motion.div key="contrast" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                    <div className="flex items-center justify-center rounded-2xl py-10" style={{ backgroundColor: baseColor }}>
                      <p className="text-2xl font-semibold" style={{ color: getContrastText(baseColor) === "light" ? "#fff" : "#1c1712" }}>Aa Sample text</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="text-[#1c1712]/55">Contrast against white</span>
                      <span className={`font-semibold ${getWcagLevel(baseContrastWhite) === "Fail" ? "text-red-500" : "text-emerald-600"}`}>
                        {baseContrastWhite.toFixed(2)} · {getWcagLevel(baseContrastWhite)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#1c1712]/55">Every generated palette carries a WCAG contrast check, so text stays readable.</p>
                  </motion.div>
                )}
                {activeTool === "shades" && (
                  <motion.div key="shades" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                    <div className="flex h-40 gap-1 overflow-hidden rounded-2xl sm:h-56">
                      {shades.map((s) => (
                        <div key={s.hex} className="flex-1" style={{ backgroundColor: s.hex }} />
                      ))}
                    </div>
                    <p className="mt-5 text-sm leading-6 text-[#1c1712]/55">Build a full tint-and-shade scale from a single base color, ready for a design system.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        {/* ============ DISCOVER ============ */}
        <section className="mt-28" id="discover">
          <SectionHeading eyebrow="Discover" title="Discover your next color." body="Curated palette collections, built from real color moods." />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger} className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {DISCOVER_COLLECTIONS.map((collection) => {
              const colors = collection.label === "Trending" ? trendingPalette.colors.map((c) => c.hex) : collection.colors;
              return (
                <motion.div key={collection.label} variants={fadeUp}>
                  <Link href={collection.href} className="group block overflow-hidden rounded-[20px] border border-black/8 bg-white transition-shadow hover:shadow-[0_10px_30px_rgba(28,23,18,0.08)]">
                    <div className="flex h-24">
                      {colors.map((hex, i) => (
                        <div key={`${hex}-${i}`} className="flex-1 transition-transform duration-300 group-hover:scale-105" style={{ backgroundColor: hex }} />
                      ))}
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm font-medium text-[#1c1712]/80">{collection.label}</span>
                      <span className="text-[#1c1712]/30 transition-transform group-hover:translate-x-1 group-hover:text-[#e8531f]">→</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mt-8 text-center">
            <Link href="/palettes" className="text-sm font-medium text-[#1c1712]/55 underline-offset-4 hover:text-[#e8531f] hover:underline">
              Explore all palettes →
            </Link>
          </div>
        </section>

        {/* ============ GO DEEPER ============ */}
        <section className="mt-28" id="deeper">
          <SectionHeading eyebrow="Beyond palettes" title="Go deeper into color." />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {DEEPER_ITEMS.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp}>
                <Link href={item.href} className="group flex h-full flex-col rounded-[24px] border border-black/8 bg-white p-6 transition-shadow hover:shadow-[0_10px_30px_rgba(28,23,18,0.07)]">
                  <div className="mb-5 h-20 overflow-hidden rounded-xl">
                    {i === 0 && <div className="flex h-full items-center justify-center gap-2" style={{ backgroundColor: "#F5EADB" }}>
                      {["#8FA6C4", "#E3A9A0", "#C2694A"].map((h) => <span key={h} className="h-8 w-8 rounded-full" style={{ backgroundColor: h }} />)}
                    </div>}
                    {i === 1 && <div className="flex h-full">
                      {generateHarmony("#5B3DF5", "triadic").colors.map((c) => <div key={c.hex} className="flex-1" style={{ backgroundColor: c.hex }} />)}
                    </div>}
                    {i === 2 && <div className="flex h-full items-center justify-center gap-3" style={{ backgroundColor: "#1c1712" }}>
                      <span className="text-xs font-semibold text-white">AA</span>
                      <span className="text-sm font-bold text-white">Aa</span>
                      <span className="text-lg font-bold text-white">Aa</span>
                    </div>}
                    {i === 3 && <div className="flex h-full">
                      {generateShades("#E8531F").slice(0, 6).map((s) => <div key={s.hex} className="flex-1" style={{ backgroundColor: s.hex }} />)}
                    </div>}
                  </div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#1c1712]">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#1c1712]/55">{item.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#1c1712]/40 transition-colors group-hover:text-[#e8531f]">
                    Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ============ INTERACTIVE COLOR EXPERIENCE ============ */}
        <section className="mt-28" id="playground">
          <SectionHeading eyebrow="Try it now" title="Pick a color. Watch a system appear." body="Choose a base color and HueFlow builds its complementary, analogous, and tonal relatives instantly." />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {BASE_SWATCHES.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => setBaseColor(hex)}
                aria-label={`Use ${hex} as base color`}
                aria-pressed={baseColor === hex}
                className={`h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 ${baseColor === hex ? "border-[#1c1712] scale-110" : "border-white shadow-[0_0_0_1px_rgba(28,23,18,0.1)]"}`}
                style={{ backgroundColor: hex }}
              />
            ))}
            <label className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-[#1c1712]/50">
              Custom
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="h-5 w-5 cursor-pointer overflow-hidden rounded-full border-0 bg-transparent p-0"
                aria-label="Pick a custom base color"
              />
            </label>
          </div>

          <motion.div layout transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { label: "Base", hex: baseColor },
              { label: "Complementary", hex: harmony.colors.find((c) => c.role === "accent")?.hex ?? baseColor },
              { label: "Analogous", hex: harmony.colors.find((c) => c.role === "success")?.hex ?? baseColor },
              { label: "Lighter", hex: lighter },
              { label: "Darker", hex: darker },
            ].map((item) => (
              <motion.div
                key={item.label}
                animate={{ backgroundColor: item.hex }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-28 flex-col justify-end rounded-2xl p-3 sm:h-36"
              >
                <p className={`text-[10px] font-semibold uppercase tracking-wider ${getContrastText(item.hex) === "light" ? "text-white/70" : "text-black/50"}`}>{item.label}</p>
                <p className={`font-mono text-xs font-semibold ${getContrastText(item.hex) === "light" ? "text-white" : "text-black/80"}`}>{item.hex.toUpperCase()}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ============ FOR YOU ============ */}
        <section className="mt-28" id="for-you">
          <SectionHeading eyebrow="For everyone" title="Built for people who work with color." />

          <div className="mt-12 divide-y divide-black/8 border-y border-black/8">
            {FOR_YOU.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="grid grid-cols-1 items-center gap-4 py-8 sm:grid-cols-[auto_1fr_auto] sm:gap-10"
              >
                <span className="text-sm font-mono text-[#1c1712]/30">0{index + 1}</span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#1c1712] sm:text-3xl">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-base leading-7 text-[#1c1712]/55">{item.body}</p>
                </div>
                <Link href={item.href} className="inline-flex w-fit items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-[#e8531f] hover:underline underline-offset-4">
                  {item.cta} →
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ COLOR SYSTEM ============ */}
        <section className="mt-28" id="system">
          <SectionHeading eyebrow="Design systems" title="Start with one color. Build an entire system." body="Every palette can grow into a full set of product-ready tokens." />

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6 }} className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-9">
            {colorSystem.map((token) => (
              <div key={token.name} className="overflow-hidden rounded-2xl border border-black/8">
                <div className="h-20" style={{ backgroundColor: token.hex }} />
                <div className="bg-white px-3 py-2.5">
                  <p className="text-xs font-semibold text-[#1c1712]">{token.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-[#1c1712]/45">{token.hex.toUpperCase()}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ============ WHY HUEFLOW ============ */}
        <section className="mt-28" id="why">
          <SectionHeading eyebrow="Why HueFlow" title="Color should feel easier." />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {WHY_HUEFLOW.map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="rounded-[22px] border border-black/8 bg-white p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#1c1712]">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-[#1c1712]/55">{item.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ============ STORIES / SEO CONTENT ============ */}
        <section className="mt-28">
          <SectionHeading eyebrow="Read" title="Stories behind the colors." />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {STORIES.map((story) => (
              <motion.div key={story.href} variants={fadeUp}>
                <Link href={story.href} className="group flex items-center justify-between rounded-[18px] border border-black/8 bg-white px-5 py-4 transition-colors hover:border-black/16">
                  <span className="text-sm font-medium text-[#1c1712]/75 transition-colors group-hover:text-[#1c1712]">{story.title}</span>
                  <span className="text-[#1c1712]/25 transition-transform group-hover:translate-x-1 group-hover:text-[#e8531f]">→</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="mt-28" id="faq">
          <SectionHeading eyebrow="FAQ" title="A few things people usually ask." />

          <div className="mx-auto mt-10 max-w-3xl divide-y divide-black/8 rounded-[24px] border border-black/8 bg-white">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <button
                  key={faq.question}
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 text-left"
                >
                  <div className="flex items-center justify-between gap-6">
                    <h3 className="text-base font-semibold text-[#1c1712] sm:text-lg">{faq.question}</h3>
                    <span className={`shrink-0 text-xl text-[#1c1712]/40 transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden text-sm leading-7 text-[#1c1712]/55"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px] border border-black/8"
            style={{ background: "linear-gradient(135deg, #1c1712, #2b1f16)" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex flex-col justify-center px-8 py-14 sm:px-12 sm:py-16">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#ff7a45]">Ready to start?</p>
                <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[2.6rem]">
                  Ready to find your colors?
                </h2>
                <p className="mt-4 max-w-sm text-base leading-7 text-white/60">
                  Start with one color. Explore where it can take you.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/generator"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(232,83,31,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
                  >
                    Create a palette
                  </Link>
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 rounded-full border border-white/18 px-7 py-3.5 text-sm font-semibold text-white/75 transition-colors hover:border-white/30 hover:text-white"
                  >
                    Explore colors →
                  </Link>
                </div>
                <p className="mt-6 text-xs text-white/35">Free forever · No account needed · Works everywhere</p>
              </div>

              <div className="hidden lg:grid grid-cols-5 grid-rows-4 gap-2 p-6">
                {Array.from({ length: 20 }, (_, i) => {
                  const colIndex = i % 5;
                  const color = heroPalette.colors[colIndex];
                  const cellKey = `cta-${i}`;
                  const isCellCopied = copiedKey === cellKey;
                  const textColor = color?.text === "light" ? "white" : "rgba(0,0,0,0.75)";
                  return (
                    <motion.button
                      key={cellKey}
                      type="button"
                      aria-label={`Copy ${color?.hex}`}
                      onClick={() => handleCopy(cellKey, color?.hex ?? "")}
                      animate={{ backgroundColor: color?.hex }}
                      transition={{ backgroundColor: { duration: 0.5 } }}
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.93 }}
                      className="relative overflow-hidden rounded-xl"
                    >
                      <AnimatePresence>
                        {isCellCopied && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center text-[8px] font-bold uppercase tracking-[0.12em]"
                            style={{ color: textColor }}
                          >
                            Copied
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

function hexToRgbString(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHslString(hex: string): string {
  const { h, s, l } = hexToHsl(hex);
  return `hsl(${h}, ${s}%, ${l}%)`;
}
