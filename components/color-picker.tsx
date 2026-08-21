"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { hexToHsl, hslToHex, isValidHex } from "@/lib/color-utils";
import { findClosestColorName } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function generateShades(hex: string, count = 9): string[] {
  const { h, s } = hexToHsl(hex);
  return Array.from({ length: count }, (_, i) => {
    const l = Math.round(10 + (i / (count - 1)) * 40);
    return hslToHex(h, s, l);
  });
}

function generateTints(hex: string, count = 9): string[] {
  const { h, s } = hexToHsl(hex);
  return Array.from({ length: count }, (_, i) => {
    const l = Math.round(55 + (i / (count - 1)) * 38);
    return hslToHex(h, s, l);
  });
}

function getLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function getContrast(hex: string) {
  return getLuminance(hex) > 0.5 ? "#1c1712" : "#ffffff";
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export function ColorPicker() {
  const [hex, setHex] = useState("#6366f1");
  const [inputValue, setInputValue] = useState("#6366f1");
  const [copied, setCopied] = useState<string | null>(null);

  const colorName = findClosestColorName(hex);
  const hsl = hexToHsl(hex);
  const rgb = hexToRgb(hex);
  const shades = generateShades(hex);
  const tints = generateTints(hex);
  const fg = getContrast(hex);
  const isFgDark = fg === "#1c1712";

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const handleHexInput = (val: string) => {
    setInputValue(val);
    const n = val.startsWith("#") ? val : `#${val}`;
    if (isValidHex(n) && n.length === 7) setHex(n);
  };

  const handleNativeChange = (val: string) => {
    setHex(val);
    setInputValue(val);
  };

  const selectColor = (c: string) => {
    setHex(c);
    setInputValue(c);
    copy(c);
  };

  const hexValues = [
    { label: "HEX", value: hex.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "Name", value: colorName },
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1712]">
      <Header />

      {/* Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-[#e8531f]/20 bg-[#e8531f]/10 px-5 py-2.5 text-sm font-semibold text-[#e8531f] shadow-[0_4px_20px_rgba(232,83,31,0.12)]"
          >
            ✓ Copied
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto max-w-5xl px-4 pt-24 pb-24 sm:px-6">
        <motion.div initial="hidden" animate="show" variants={stagger}>

          {/* Hero eyebrow */}
          <motion.div variants={fadeUp} className="mb-8 flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1c1712]/45 shadow-[0_1px_4px_rgba(28,23,18,0.06)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]" />
              Free · No signup · HEX, RGB, HSL
            </span>
            <h1 className="font-display text-[2.8rem] font-bold leading-[1.04] tracking-[-0.05em] text-[#1c1712] sm:text-[3.6rem]">
              Color Picker
            </h1>
            <p className="max-w-md text-base leading-7 text-[#1c1712]/48">
              Pick any color. Instantly get every format, shades, and tints.
            </p>
          </motion.div>

          {/* ── HERO SWATCH ── */}
          <motion.div
            variants={fadeUp}
            className="mb-5 overflow-hidden rounded-[28px] border border-black/[0.07] shadow-[0_8px_40px_rgba(28,23,18,0.10)]"
            style={{ backgroundColor: hex }}
          >
            {/* Big color display */}
            <div className="flex h-64 flex-col items-center justify-center gap-3 px-6 sm:h-72">
              <motion.p
                key={colorName}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl"
                style={{ color: fg }}
              >
                {colorName}
              </motion.p>
              <motion.p
                key={hex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-lg font-semibold tracking-[0.08em]"
                style={{ color: isFgDark ? "rgba(28,23,18,0.50)" : "rgba(255,255,255,0.55)" }}
              >
                {hex.toUpperCase()}
              </motion.p>
            </div>

            {/* Picker bar */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{
                backgroundColor: isFgDark ? "rgba(28,23,18,0.06)" : "rgba(255,255,255,0.12)",
                borderTop: isFgDark ? "1px solid rgba(28,23,18,0.08)" : "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <label className="relative flex h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-xl border"
                style={{ borderColor: isFgDark ? "rgba(28,23,18,0.14)" : "rgba(255,255,255,0.20)" }}>
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => handleNativeChange(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <div className="h-full w-full" style={{ backgroundColor: hex }} />
              </label>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleHexInput(e.target.value)}
                spellCheck={false}
                maxLength={7}
                placeholder="#000000"
                className="h-10 flex-1 rounded-xl border px-4 font-mono text-sm outline-none transition"
                style={{
                  backgroundColor: isFgDark ? "rgba(28,23,18,0.06)" : "rgba(255,255,255,0.15)",
                  borderColor: isFgDark ? "rgba(28,23,18,0.12)" : "rgba(255,255,255,0.18)",
                  color: fg,
                }}
              />

              <button
                onClick={() => copy(hex.toUpperCase())}
                className="flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: isFgDark ? "rgba(28,23,18,0.08)" : "rgba(255,255,255,0.18)",
                  borderColor: isFgDark ? "rgba(28,23,18,0.10)" : "rgba(255,255,255,0.15)",
                  color: fg,
                }}
              >
                {copied === hex.toUpperCase() ? "✓ Copied" : "Copy HEX"}
              </button>
            </div>
          </motion.div>

          {/* ── VALUES ROW ── */}
          <motion.div variants={fadeUp} className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {hexValues.map(({ label, value }) => (
              <button
                key={label}
                onClick={() => copy(value)}
                className="group flex flex-col items-start gap-1 rounded-2xl border border-black/[0.08] bg-white p-4 shadow-[0_1px_6px_rgba(28,23,18,0.06)] transition-all hover:shadow-[0_4px_16px_rgba(28,23,18,0.10)]"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.20em] text-[#1c1712]/40">{label}</span>
                <span className="w-full truncate font-mono text-[13px] font-semibold text-[#1c1712]/80 group-hover:text-[#1c1712]">
                  {copied === value ? <span className="text-[#e8531f]">✓ Copied</span> : value}
                </span>
              </button>
            ))}
          </motion.div>

          {/* ── SHADES ── */}
          <motion.div variants={fadeUp} className="mb-5 overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_1px_6px_rgba(28,23,18,0.06)]">
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.20em] text-[#1c1712]/45">Shades</p>
              <p className="text-[10px] text-[#1c1712]/30">Dark variations · click to copy</p>
            </div>
            <div className="flex h-20">
              {shades.map((shade, i) => (
                <button
                  key={i}
                  onClick={() => selectColor(shade)}
                  className="group relative flex-1 overflow-hidden transition-[flex] duration-300 hover:flex-[2]"
                  style={{ backgroundColor: shade }}
                  title={shade.toUpperCase()}
                >
                  <span className="pointer-events-none absolute inset-x-1 bottom-1.5 rounded-full bg-black/40 px-1 py-0.5 text-center font-mono text-[8px] text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    {copied === shade.toUpperCase() ? "✓" : shade.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex px-0 pb-2 pt-1">
              {shades.map((shade, i) => (
                <div key={i} className="flex-1 text-center font-mono text-[7px] text-[#1c1712]/30">
                  {shade.slice(1, 4).toUpperCase()}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── TINTS ── */}
          <motion.div variants={fadeUp} className="mb-8 overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_1px_6px_rgba(28,23,18,0.06)]">
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.20em] text-[#1c1712]/45">Tints</p>
              <p className="text-[10px] text-[#1c1712]/30">Light variations · click to copy</p>
            </div>
            <div className="flex h-20">
              {tints.map((tint, i) => (
                <button
                  key={i}
                  onClick={() => selectColor(tint)}
                  className="group relative flex-1 overflow-hidden transition-[flex] duration-300 hover:flex-[2]"
                  style={{ backgroundColor: tint }}
                  title={tint.toUpperCase()}
                >
                  <span className="pointer-events-none absolute inset-x-1 bottom-1.5 rounded-full bg-black/30 px-1 py-0.5 text-center font-mono text-[8px] text-[#1c1712] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    {copied === tint.toUpperCase() ? "✓" : tint.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex px-0 pb-2 pt-1">
              {tints.map((tint, i) => (
                <div key={i} className="flex-1 text-center font-mono text-[7px] text-[#1c1712]/30">
                  {tint.slice(1, 4).toUpperCase()}
                </div>
              ))}
            </div>
          </motion.div>

          <ToolPageSections config={toolPageContent.picker} />
        </motion.div>
      </main>
    </div>
  );
}
