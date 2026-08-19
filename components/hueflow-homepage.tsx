"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Header } from "./header";
import { DailyChallengeBanner } from "./daily-challenge-banner";
import { StructuredData } from "./seo/structured-data";
import { generateRandomPalette, hexToHsl, hslToHex, getContrastText } from "@/lib/color-utils";
import { generateHarmony } from "@/lib/harmony";
import { generateShades } from "@/lib/shades";
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

const COLOR_MOODS: { label: string; emoji: string; description: string; colors: string[]; href: string }[] = [
  {
    label: "Calm",
    emoji: "🌊",
    description: "Still. Balanced. At ease.",
    colors: ["#D6E8F0", "#A8C8D8", "#6B9EB8", "#3A7A96", "#1E4D66"],
    href: "/generator?label=Calm&c=D6E8F0-A8C8D8-6B9EB8-3A7A96-1E4D66",
  },
  {
    label: "Energetic",
    emoji: "⚡",
    description: "Vivid. Forward. Electric.",
    colors: ["#0A0A0A", "#E8531F", "#FF6B35", "#FFD23F", "#FFF3D6"],
    href: "/generator?label=Energetic&c=0A0A0A-E8531F-FF6B35-FFD23F-FFF3D6",
  },
  {
    label: "Serene",
    emoji: "🌿",
    description: "Gentle. Natural. Grounded.",
    colors: ["#F2EFE1", "#C6D9A1", "#7FA65C", "#3F6B3A", "#1D2B1A"],
    href: "/generator?label=Serene&c=F2EFE1-C6D9A1-7FA65C-3F6B3A-1D2B1A",
  },
  {
    label: "Luxe",
    emoji: "✨",
    description: "Rich. Refined. Timeless.",
    colors: ["#0D0D0D", "#2A1F0E", "#B9924A", "#E6D5AE", "#F8F3E8"],
    href: "/generator?label=Luxe&c=0D0D0D-2A1F0E-B9924A-E6D5AE-F8F3E8",
  },
  {
    label: "Playful",
    emoji: "🎨",
    description: "Bright. Fun. Unexpected.",
    colors: ["#FF3366", "#FF6B35", "#FFD23F", "#2EC4B6", "#8B4A9C"],
    href: "/generator?label=Playful&c=FF3366-FF6B35-FFD23F-2EC4B6-8B4A9C",
  },
  {
    label: "Bold",
    emoji: "🔥",
    description: "Strong. Direct. Unforgettable.",
    colors: ["#0D0D0D", "#1D4E89", "#E8531F", "#FFD23F", "#F5F5F5"],
    href: "/generator?label=Bold&c=0D0D0D-1D4E89-E8531F-FFD23F-F5F5F5",
  },
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
  const [baseColor, setBaseColor] = useState(BASE_SWATCHES[0]);
  const [toolColor, setToolColor] = useState(BASE_SWATCHES[0]);
  const [activeMood, setActiveMood] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const trendingPalette = useMemo(() => generateTrendingPalettes(dayIndex(), 1)[0], []);

  const colorSystem = useMemo(() => buildColorSystem(baseColor), [baseColor]);

  const toolShades = useMemo(() => generateShades(toolColor), [toolColor]);
  const toolContrastWhite = useMemo(() => getContrastRatio(toolColor, "#ffffff"), [toolColor]);
  const toolContrastBlack = useMemo(() => getContrastRatio(toolColor, "#000000"), [toolColor]);
  const toolSystemColors = useMemo(() => {
    const { h, s, l } = hexToHsl(toolColor);
    return [
      { name: "Base",    hex: toolColor },
      { name: "Step 1",  hex: hslToHex((h + 20) % 360, s, Math.min(l + 8, 85)) },
      { name: "Step 2",  hex: hslToHex((h + 40) % 360, Math.max(s - 8, 20), l) },
      { name: "Step 3",  hex: hslToHex((h - 20 + 360) % 360, s, Math.max(l - 10, 15)) },
      { name: "Step 4",  hex: hslToHex((h - 40 + 360) % 360, Math.min(s + 8, 100), Math.min(l + 15, 88)) },
    ];
  }, [toolColor]);

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
            <div className="flex h-52 gap-2 overflow-hidden rounded-[26px] border border-black/8 shadow-[0_20px_60px_rgba(28,23,18,0.08)] sm:h-72">
              {heroPalette.colors.map((color, i) => {
                const isHover = heroHoverIndex === i;
                const isCopied = copiedKey === `hero-${i}`;
                const isLight = color.text === "light";
                const labelColor = isLight ? "text-white" : "text-black/80";
                const dimColor = isLight ? "text-white/50" : "text-black/40";
                return (
                  <motion.button
                    key={`${color.hex}-${i}`}
                    type="button"
                    onMouseEnter={() => setHeroHoverIndex(i)}
                    onMouseLeave={() => setHeroHoverIndex((v) => (v === i ? null : v))}
                    onClick={() => handleCopy(`hero-${i}`, color.hex)}
                    aria-label={`Copy ${color.hex}`}
                    animate={{ backgroundColor: color.hex, flexGrow: isHover ? 1.7 : 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-1 flex-col justify-end overflow-hidden px-3 pb-4"
                  >
                    <AnimatePresence mode="wait">
                      {isCopied ? (
                        <motion.div key="copied" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex flex-col gap-0.5">
                          <span className={`text-[9px] font-bold uppercase tracking-[0.16em] ${dimColor}`}>{color.name}</span>
                          <span className={`font-mono text-sm font-bold ${labelColor}`}>Copied!</span>
                        </motion.div>
                      ) : isHover ? (
                        <motion.div key="hover" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.18 }} className="flex flex-col gap-1">
                          <span className={`text-[9px] font-bold uppercase tracking-[0.16em] ${dimColor}`}>{color.name}</span>
                          <span className={`font-mono text-sm font-bold ${labelColor}`}>{color.hex.toUpperCase()}</span>
                          <div className={`mt-0.5 flex items-center gap-1 ${dimColor}`}>
                            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                            </svg>
                            <span className="text-[9px] font-semibold uppercase tracking-wider">Copy</span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex flex-col gap-0.5">
                          <span className={`text-[9px] font-semibold uppercase tracking-[0.16em] ${dimColor}`}>{color.name}</span>
                          <span className={`font-mono text-[10px] font-semibold ${isLight ? "text-white/55" : "text-black/45"}`}>{color.hex.toUpperCase()}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom controls */}
            <div className="mt-5 flex items-center justify-between gap-4 px-1">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#e8531f]/50" />
                <p className="text-sm font-medium text-[#1c1712]/50">{heroPalette.label}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-[#1c1712]/55 transition-all hover:border-black/18 hover:text-[#1c1712] hover:shadow-sm"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M1 4v6h6M23 20v-6h-6" />
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
                  </svg>
                  Shuffle
                </button>
                <Link
                  href={`/generator${encodePalette(heroPalette)}`}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(232,83,31,0.3)] transition-transform hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
                >
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

          {/* Live color picker for the tool previews */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {BASE_SWATCHES.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => setToolColor(hex)}
                aria-label={`Preview tools with ${hex}`}
                aria-pressed={toolColor === hex}
                className={`h-8 w-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                  toolColor === hex ? "scale-110 border-[#1c1712] shadow-[0_0_0_2px_rgba(28,23,18,0.12)]" : "border-white shadow-[0_0_0_1px_rgba(28,23,18,0.1)]"
                }`}
                style={{ backgroundColor: hex }}
              />
            ))}
            <label className="flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-[#1c1712]/50 hover:border-black/20">
              Custom
              <input
                type="color"
                value={toolColor}
                onChange={(e) => setToolColor(e.target.value)}
                className="h-5 w-5 cursor-pointer overflow-hidden rounded-full border-0 bg-transparent p-0"
                aria-label="Pick a custom color for tool previews"
              />
            </label>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            variants={stagger}
            className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3"
          >
            {/* Generator — hero card, spans 2 cols */}
            <motion.div variants={fadeUp} className="col-span-2">
              <Link
                href="/generator"
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_2px_16px_rgba(28,23,18,0.04)] transition-shadow hover:shadow-[0_12px_40px_rgba(28,23,18,0.09)]"
              >
                <div className="flex flex-1 gap-1.5 overflow-hidden">
                  {toolSystemColors.map((c) => (
                    <motion.div
                      key={c.name}
                      animate={{ backgroundColor: c.hex }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="min-h-[10rem] flex-1 transition-[flex-grow] duration-500 ease-out hover:flex-[1.8] sm:min-h-[13rem]"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div>
                    <p className="text-lg font-semibold tracking-[-0.02em] text-[#1c1712]">Palette Generator</p>
                    <p className="mt-0.5 font-mono text-sm text-[#1c1712]/50">{toolColor.toUpperCase()} · {toolSystemColors.length} colors</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium text-[#1c1712]/60 transition-colors group-hover:border-[#e8531f]/40 group-hover:text-[#e8531f]">
                    Open →
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Color Picker — live color + formats */}
            <motion.div variants={fadeUp} className="col-span-1">
              <Link
                href="/tools/picker"
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_2px_16px_rgba(28,23,18,0.04)] transition-shadow hover:shadow-[0_12px_40px_rgba(28,23,18,0.09)]"
              >
                <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-8" style={{ backgroundColor: toolColor }}>
                  <div className="flex flex-col items-center gap-2">
                    <motion.p
                      key={toolColor}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-mono text-2xl font-bold tracking-tight"
                      style={{ color: getContrastText(toolColor) === "light" ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.8)" }}
                    >
                      {toolColor.toUpperCase()}
                    </motion.p>
                    <motion.p
                      key={`rgb-${toolColor}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, delay: 0.05 }}
                      className="font-mono text-xs"
                      style={{ color: getContrastText(toolColor) === "light" ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.4)" }}
                    >
                      {hexToRgbString(toolColor)}
                    </motion.p>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4 px-5 py-5">
                  <div>
                    <p className="text-base font-semibold tracking-[-0.02em] text-[#1c1712]">Color Picker</p>
                    <p className="mt-0.5 text-sm text-[#1c1712]/50">Explore and copy precise colors.</p>
                  </div>
                  <span className="text-[#1c1712]/25 transition-colors group-hover:text-[#e8531f]">→</span>
                </div>
              </Link>
            </motion.div>

            {/* Color Converter — live values */}
            <motion.div variants={fadeUp} className="col-span-1">
              <Link
                href="/color-converter"
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_2px_16px_rgba(28,23,18,0.04)] transition-shadow hover:shadow-[0_12px_40px_rgba(28,23,18,0.09)]"
              >
                <div className="flex flex-1 flex-col justify-center gap-2 bg-[#f5f1ea] px-5 py-6">
                  {[
                    { label: "HEX", value: toolColor.toUpperCase() },
                    { label: "RGB", value: hexToRgbString(toolColor) },
                    { label: "HSL", value: hexToHslString(toolColor) },
                  ].map((row) => (
                    <motion.div
                      key={`${row.label}-${toolColor}`}
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 rounded-xl border border-black/8 bg-white px-4 py-2.5"
                    >
                      <span className="w-8 shrink-0 text-[10px] font-bold uppercase tracking-widest text-[#1c1712]/35">{row.label}</span>
                      <span className="font-mono text-xs text-[#1c1712]/75">{row.value}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-end justify-between gap-4 px-5 py-5">
                  <div>
                    <p className="text-base font-semibold tracking-[-0.02em] text-[#1c1712]">Color Converter</p>
                    <p className="mt-0.5 text-sm text-[#1c1712]/50">HEX, RGB, HSL, and more.</p>
                  </div>
                  <span className="text-[#1c1712]/25 transition-colors group-hover:text-[#e8531f]">→</span>
                </div>
              </Link>
            </motion.div>

            {/* Contrast Checker — live WCAG data */}
            <motion.div variants={fadeUp} className="col-span-1">
              <Link
                href="/tools/contrast"
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_2px_16px_rgba(28,23,18,0.04)] transition-shadow hover:shadow-[0_12px_40px_rgba(28,23,18,0.09)]"
              >
                <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 py-6" style={{ backgroundColor: toolColor }}>
                  <motion.p
                    key={`aa-text-${toolColor}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-3xl font-bold"
                    style={{ color: getContrastText(toolColor) === "light" ? "#ffffff" : "#1c1712" }}
                  >
                    Aa
                  </motion.p>
                  <div className="flex gap-2">
                    {(["AA", "AAA"] as const).map((level) => {
                      const ratio = toolContrastWhite;
                      const passes = level === "AA" ? ratio >= 4.5 : ratio >= 7;
                      return (
                        <span
                          key={level}
                          className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${passes ? "bg-emerald-500" : "bg-black/25"}`}
                        >
                          {level}
                        </span>
                      );
                    })}
                  </div>
                  <motion.p
                    key={`ratio-${toolColor}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-xs"
                    style={{ color: getContrastText(toolColor) === "light" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }}
                  >
                    {toolContrastWhite.toFixed(2)} : 1 vs white
                  </motion.p>
                </div>
                <div className="flex items-end justify-between gap-4 px-5 py-5">
                  <div>
                    <p className="text-base font-semibold tracking-[-0.02em] text-[#1c1712]">Contrast Checker</p>
                    <p className="mt-0.5 text-sm text-[#1c1712]/50">Make sure colors are accessible.</p>
                  </div>
                  <span className="text-[#1c1712]/25 transition-colors group-hover:text-[#e8531f]">→</span>
                </div>
              </Link>
            </motion.div>

            {/* Color Shades — live shade scale */}
            <motion.div variants={fadeUp} className="col-span-1">
              <Link
                href="/tools/tailwind-scale"
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_2px_16px_rgba(28,23,18,0.04)] transition-shadow hover:shadow-[0_12px_40px_rgba(28,23,18,0.09)]"
              >
                <div className="flex flex-1 gap-0.5 overflow-hidden">
                  {toolShades.slice(0, 7).map((s, i) => (
                    <motion.div
                      key={`${s.hex}-${i}`}
                      animate={{ backgroundColor: s.hex }}
                      transition={{ duration: 0.4, delay: i * 0.03 }}
                      className="flex-1 transition-[flex-grow] duration-500 group-hover:last:flex-[1.5]"
                    />
                  ))}
                </div>
                <div className="flex items-end justify-between gap-4 px-5 py-5">
                  <div>
                    <p className="text-base font-semibold tracking-[-0.02em] text-[#1c1712]">Color Shades</p>
                    <p className="mt-0.5 text-sm text-[#1c1712]/50">Generate tints, shades, and tones.</p>
                  </div>
                  <span className="text-[#1c1712]/25 transition-colors group-hover:text-[#e8531f]">→</span>
                </div>
              </Link>
            </motion.div>
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

        {/* ============ COLOR MOODS ============ */}
        <section className="mt-28" id="moods">
          <SectionHeading
            eyebrow="Color & Emotion"
            title="Every palette has a feeling."
            body="Explore palettes built around how colors make you feel — then open yours in the generator."
          />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {COLOR_MOODS.map((mood, i) => {
              const isActive = activeMood === i;
              return (
                <button
                  key={mood.label}
                  type="button"
                  onClick={() => setActiveMood(i)}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "border-[#e8531f]/30 bg-white shadow-[0_4px_16px_rgba(28,23,18,0.09)] text-[#1c1712]"
                      : "border-transparent bg-black/[0.04] text-[#1c1712]/60 hover:bg-white hover:text-[#1c1712]"
                  }`}
                >
                  {mood.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {COLOR_MOODS.map((mood, i) =>
              activeMood === i ? (
                <motion.div
                  key={mood.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8"
                >
                  <div className="overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_4px_30px_rgba(28,23,18,0.05)]">
                    <div className="flex h-44 sm:h-64">
                      {mood.colors.map((hex, ci) => (
                        <motion.div
                          key={`${hex}-${ci}`}
                          initial={{ opacity: 0, scaleY: 0.92 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          transition={{ duration: 0.4, delay: ci * 0.05, ease: [0.22, 1, 0.36, 1] }}
                          className="flex-1 origin-bottom"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                    <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-base font-semibold text-[#1c1712]">
                          {mood.label}
                        </p>
                        <p className="mt-1 text-sm text-[#1c1712]/50">{mood.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex gap-1.5">
                          {mood.colors.map((hex) => (
                            <span
                              key={hex}
                              className="h-7 w-7 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(28,23,18,0.10)]"
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                        </div>
                        <Link
                          href={mood.href}
                          className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(232,83,31,0.22)] transition-transform hover:scale-[1.02]"
                          style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
                        >
                          Open in generator →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
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
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:items-start">

            {/* Left — sticky heading + context */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-28"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1c1712]/45">FAQ</p>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1c1712] sm:text-[2.6rem]">
                A few things people usually ask.
              </h2>
              <p className="mt-5 text-base leading-7 text-[#1c1712]/50">
                Can&apos;t find what you&apos;re looking for? Feel free to reach out and we&apos;ll help you out.
              </p>
            </motion.div>

            {/* Right — accordion */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
              className="flex flex-col gap-3"
            >
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <motion.div key={faq.question} variants={fadeUp}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      className={`w-full rounded-[18px] border px-6 py-5 text-left transition-all duration-200 ${
                        isOpen
                          ? "border-[#e8531f]/20 bg-white shadow-[0_4px_20px_rgba(28,23,18,0.06)]"
                          : "border-black/8 bg-white hover:border-black/14 hover:shadow-[0_2px_12px_rgba(28,23,18,0.05)]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <h3 className={`text-base font-semibold transition-colors ${isOpen ? "text-[#1c1712]" : "text-[#1c1712]/80"} sm:text-[1.05rem]`}>
                          {faq.question}
                        </h3>
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            isOpen
                              ? "border-[#e8531f]/30 bg-[#e8531f]/8 text-[#e8531f] rotate-180"
                              : "border-black/10 bg-transparent text-[#1c1712]/35"
                          }`}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 14 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.28 }}
                            className="overflow-hidden text-sm leading-7 text-[#1c1712]/55"
                          >
                            {faq.answer}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px]"
            style={{ background: "linear-gradient(155deg, #FF8A5A 0%, #E8531F 55%, #C23A10 100%)" }}
          >
            {/* Decorative blurred glow blobs */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #FFB38A 0%, transparent 70%)" }} />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FF6020 0%, transparent 70%)" }} />

            <div className="relative flex flex-col items-center px-8 pb-10 pt-12 text-center sm:px-12 sm:pb-12 sm:pt-14">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Start creating
              </div>

              {/* Headline */}
              <h2 className="mx-auto mt-5 max-w-xl font-display text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-[3rem] lg:text-[3.4rem]">
                Your colors are waiting.
              </h2>

              <p className="mt-4 max-w-md text-base leading-7 text-white/65">
                Build a palette, check contrast, generate shades — all in one place, for free.
              </p>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/generator"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#C23A10] shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Create a palette
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/18"
                >
                  Explore colors →
                </Link>
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
