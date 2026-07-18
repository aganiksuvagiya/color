"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { toolPageContent } from "@/lib/seo/tool-pages";

type ColorEntry = { name: string; hex: string };
type TypographyToken = { name: string; sizePx: number };
type SpacingToken = { name: string; valuePx: number };

type Format =
  | "CSS Variables"
  | "SCSS"
  | "Tailwind"
  | "JSON"
  | "Figma Tokens"
  | "Swift"
  | "Kotlin"
  | "Flutter";

const FORMATS: Format[] = [
  "CSS Variables",
  "SCSS",
  "Tailwind",
  "JSON",
  "Figma Tokens",
  "Swift",
  "Kotlin",
  "Flutter",
];

const DEFAULT_COLORS: ColorEntry[] = [
  { name: "primary", hex: "#4F46E5" },
  { name: "secondary", hex: "#10B981" },
  { name: "accent", hex: "#F59E0B" },
];

const SCALE_RATIOS = [
  { label: "1.125 — Minor Second", value: 1.125 },
  { label: "1.2 — Minor Third", value: 1.2 },
  { label: "1.25 — Major Third", value: 1.25 },
  { label: "1.333 — Perfect Fourth", value: 1.333 },
  { label: "1.5 — Perfect Fifth", value: 1.5 },
  { label: "1.618 — Golden Ratio", value: 1.618 },
];

const TYPE_STEPS = [
  { name: "xs", power: -2 },
  { name: "sm", power: -1 },
  { name: "base", power: 0 },
  { name: "lg", power: 1 },
  { name: "xl", power: 2 },
  { name: "2xl", power: 3 },
  { name: "3xl", power: 4 },
  { name: "4xl", power: 5 },
];

const SPACING_MULTIPLIERS = [0, 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64];

function generateTypeScale(baseSize: number, ratio: number): TypographyToken[] {
  return TYPE_STEPS.map((s) => ({
    name: s.name,
    sizePx: Math.round(baseSize * Math.pow(ratio, s.power) * 100) / 100,
  }));
}

function generateSpacingScale(baseUnit: number): SpacingToken[] {
  return SPACING_MULTIPLIERS.map((m) => ({ name: String(m), valuePx: m * baseUnit }));
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.replace("#", "").match(/^([0-9a-fA-F]{6})$/);
  if (!match) return null;
  const n = parseInt(match[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function camelCase(name: string): string {
  return slugify(name).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function pascalCase(name: string): string {
  const camel = camelCase(name);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

function generateOutput(
  colors: ColorEntry[],
  typography: TypographyToken[],
  fontFamily: string,
  spacing: SpacingToken[],
  format: Format,
): string {
  const validColors = colors.filter((c) => c.name.trim() && /^#[0-9a-fA-F]{6}$/.test(c.hex));

  switch (format) {
    case "CSS Variables": {
      const colorVars = validColors.map((c) => `  --color-${slugify(c.name)}: ${c.hex};`).join("\n");
      const fontVar = `  --font-family: ${fontFamily};`;
      const typeVars = typography.map((t) => `  --text-${t.name}: ${t.sizePx}px;`).join("\n");
      const spaceVars = spacing.map((s) => `  --space-${s.name}: ${s.valuePx}px;`).join("\n");
      return `:root {\n${colorVars}\n\n${fontVar}\n${typeVars}\n\n${spaceVars}\n}`;
    }
    case "SCSS": {
      const colorVars = validColors.map((c) => `$color-${slugify(c.name)}: ${c.hex};`).join("\n");
      const fontVar = `$font-family: ${fontFamily};`;
      const typeVars = typography.map((t) => `$text-${t.name}: ${t.sizePx}px;`).join("\n");
      const spaceVars = spacing.map((s) => `$space-${s.name}: ${s.valuePx}px;`).join("\n");
      return `${colorVars}\n\n${fontVar}\n${typeVars}\n\n${spaceVars}`;
    }
    case "Tailwind": {
      const colorEntries = validColors.map((c) => `        '${slugify(c.name)}': '${c.hex}',`).join("\n");
      const fontSizeEntries = typography.map((t) => `        '${t.name}': '${t.sizePx}px',`).join("\n");
      const spacingEntries = spacing.map((s) => `        '${s.name}': '${s.valuePx}px',`).join("\n");
      const fontFamilyList = fontFamily
        .split(",")
        .map((f) => `'${f.trim().replace(/^['"]|['"]$/g, "")}'`)
        .join(", ");
      return `module.exports = {\n  theme: {\n    extend: {\n      fontFamily: {\n        sans: [${fontFamilyList}],\n      },\n      colors: {\n${colorEntries}\n      },\n      fontSize: {\n${fontSizeEntries}\n      },\n      spacing: {\n${spacingEntries}\n      },\n    },\n  },\n};`;
    }
    case "JSON": {
      const color: Record<string, string> = {};
      validColors.forEach((c) => { color[slugify(c.name)] = c.hex; });
      const fontSize: Record<string, string> = {};
      typography.forEach((t) => { fontSize[t.name] = `${t.sizePx}px`; });
      const spacingObj: Record<string, string> = {};
      spacing.forEach((s) => { spacingObj[s.name] = `${s.valuePx}px`; });
      return JSON.stringify({ color, typography: { fontFamily, fontSize }, spacing: spacingObj }, null, 2);
    }
    case "Figma Tokens": {
      const color: Record<string, { value: string; type: string }> = {};
      validColors.forEach((c) => { color[slugify(c.name)] = { value: c.hex, type: "color" }; });
      const fontSizes: Record<string, { value: string; type: string }> = {};
      typography.forEach((t) => { fontSizes[t.name] = { value: `${t.sizePx}`, type: "fontSizes" }; });
      const spacingObj: Record<string, { value: string; type: string }> = {};
      spacing.forEach((s) => { spacingObj[s.name] = { value: `${s.valuePx}`, type: "spacing" }; });
      return JSON.stringify({ color, fontSizes, spacing: spacingObj }, null, 2);
    }
    case "Swift": {
      const colorLines = validColors
        .map((c) => {
          const rgb = hexToRgb(c.hex);
          if (!rgb) return "";
          return `static let ${camelCase(c.name)} = UIColor(red: ${(rgb.r / 255).toFixed(3)}, green: ${(rgb.g / 255).toFixed(3)}, blue: ${(rgb.b / 255).toFixed(3)}, alpha: 1.0)`;
        })
        .filter(Boolean)
        .join("\n");
      const typeLines = typography.map((t) => `static let fontSize${pascalCase(t.name)}: CGFloat = ${t.sizePx}`).join("\n");
      const spaceLines = spacing.map((s) => `static let spacing${s.name}: CGFloat = ${s.valuePx}`).join("\n");
      return `${colorLines}\n\n${typeLines}\n\n${spaceLines}`;
    }
    case "Kotlin": {
      const colorLines = validColors
        .map((c) => `val ${camelCase(c.name)} = Color(0xFF${c.hex.replace("#", "").toUpperCase()})`)
        .join("\n");
      const typeLines = typography.map((t) => `val FontSize${pascalCase(t.name)} = ${t.sizePx}.sp`).join("\n");
      const spaceLines = spacing.map((s) => `val Spacing${s.name} = ${s.valuePx}.dp`).join("\n");
      return `${colorLines}\n\n${typeLines}\n\n${spaceLines}`;
    }
    case "Flutter": {
      const colorLines = validColors
        .map((c) => `static const ${camelCase(c.name)} = Color(0xFF${c.hex.replace("#", "").toUpperCase()});`)
        .join("\n");
      const typeLines = typography.map((t) => `static const double fontSize${pascalCase(t.name)} = ${t.sizePx};`).join("\n");
      const spaceLines = spacing.map((s) => `static const double spacing${s.name} = ${s.valuePx};`).join("\n");
      return `${colorLines}\n\n${typeLines}\n\n${spaceLines}`;
    }
    default:
      return "";
  }
}

export function DesignTokenGenerator() {
  const [colors, setColors] = useState<ColorEntry[]>(DEFAULT_COLORS);
  const [fontFamily, setFontFamily] = useState("'Inter', sans-serif");
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [scaleRatio, setScaleRatio] = useState(1.25);
  const [spacingUnit, setSpacingUnit] = useState(4);
  const [format, setFormat] = useState<Format>("CSS Variables");
  const [copied, setCopied] = useState(false);

  const typography = useMemo(() => generateTypeScale(baseFontSize, scaleRatio), [baseFontSize, scaleRatio]);
  const spacing = useMemo(() => generateSpacingScale(spacingUnit), [spacingUnit]);

  const output = useMemo(
    () => generateOutput(colors, typography, fontFamily, spacing, format),
    [colors, typography, fontFamily, spacing, format],
  );

  const updateColor = (index: number, field: keyof ColorEntry, value: string) => {
    setColors((prev) => prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)));
  };

  const addColor = () => {
    if (colors.length >= 10) return;
    setColors((prev) => [...prev, { name: "", hex: "#000000" }]);
  };

  const removeColor = (index: number) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />

      <Header />

      <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-24 sm:px-6 sm:pt-40">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Design System Generator</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Export colors, typography, and spacing as design tokens for any platform or framework.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Color entries */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium text-white/60">Colors</h2>
              <span className="text-xs text-white/30">{colors.length}/10</span>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {colors.map((color, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <input
                      type="color"
                      value={color.hex}
                      onChange={(e) => updateColor(i, "hex", e.target.value)}
                      className="h-10 w-10 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) => updateColor(i, "name", e.target.value)}
                      placeholder="Color name / role"
                      className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-white/20"
                    />
                    <input
                      type="text"
                      value={color.hex}
                      onChange={(e) => {
                        let v = e.target.value;
                        if (!v.startsWith("#")) v = "#" + v;
                        updateColor(i, "hex", v);
                      }}
                      maxLength={7}
                      className="w-24 shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-white outline-none focus:border-white/20"
                    />
                    <button
                      onClick={() => removeColor(i)}
                      className="shrink-0 rounded-lg p-2 text-white/30 transition-colors hover:bg-white/5 hover:text-white/60"
                      aria-label="Remove color"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4l8 8M12 4l-8 8" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {colors.length < 10 && (
              <button
                onClick={addColor}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-2.5 text-sm text-white/40 transition-colors hover:border-white/20 hover:text-white/60"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 1v12M1 7h12" />
                </svg>
                Add Color
              </button>
            )}
          </div>

          {/* Typography scale */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <h2 className="mb-4 text-sm font-medium text-white/60">Typography Scale</h2>

            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs text-white/40">Font family</label>
                <input
                  type="text"
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-white/40">Base size (px)</label>
                <input
                  type="number"
                  min={10}
                  max={32}
                  value={baseFontSize}
                  onChange={(e) => setBaseFontSize(Number(e.target.value) || 16)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-white/40">Scale ratio</label>
                <select
                  value={scaleRatio}
                  onChange={(e) => setScaleRatio(Number(e.target.value))}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/20"
                >
                  {SCALE_RATIOS.map((r) => (
                    <option key={r.value} value={r.value} className="bg-[#160b05]">
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              {typography.map((t) => (
                <div key={t.name} className="flex items-center gap-4">
                  <span className="w-10 shrink-0 font-mono text-xs text-white/40">{t.name}</span>
                  <span className="w-16 shrink-0 font-mono text-xs text-white/30">{t.sizePx}px</span>
                  <span
                    className="truncate text-white/85"
                    style={{ fontSize: `${Math.min(t.sizePx, 40)}px`, fontFamily }}
                  >
                    Aa
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Spacing scale */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium text-white/60">Spacing Scale</h2>
              <div className="flex items-center gap-2">
                <label className="text-xs text-white/40">Base unit</label>
                <input
                  type="number"
                  min={1}
                  max={16}
                  value={spacingUnit}
                  onChange={(e) => setSpacingUnit(Number(e.target.value) || 4)}
                  className="w-16 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-white outline-none focus:border-white/20"
                />
                <span className="text-xs text-white/40">px</span>
              </div>
            </div>

            <div className="space-y-1.5">
              {spacing.map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <span className="w-6 shrink-0 font-mono text-xs text-white/40">{s.name}</span>
                  <span className="w-12 shrink-0 font-mono text-xs text-white/30">{s.valuePx}px</span>
                  <div
                    className="h-3 rounded bg-white/25"
                    style={{ width: `${Math.max(s.valuePx, 2)}px` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Format selector */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <h2 className="mb-4 text-sm font-medium text-white/60">Export Format</h2>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition-all ${
                    format === f
                      ? "bg-white/15 text-white shadow-sm"
                      : "text-white/40 hover:bg-white/5 hover:text-white/60"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Code preview */}
          <motion.div
            layout
            className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium text-white/60">Generated Tokens</h2>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50 transition-colors hover:bg-white/10 hover:text-white/70"
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 7.5l3 3 5-6" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="4.5" y="4.5" width="7" height="7" rx="1.5" />
                      <path d="M9.5 4.5V3a1.5 1.5 0 00-1.5-1.5H3A1.5 1.5 0 001.5 3v5A1.5 1.5 0 003 9.5h1.5" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.pre
                key={format}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="overflow-x-auto rounded-xl bg-black/40 p-4 font-mono text-sm leading-relaxed text-white/80"
              >
                <code>{output}</code>
              </motion.pre>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <ToolPageSections config={toolPageContent["design-tokens"]} />
      </div>
    </main>
  );
}
