"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { toolPageContent } from "@/lib/seo/tool-pages";

type ColorEntry = { name: string; hex: string };

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

function generateOutput(colors: ColorEntry[], format: Format): string {
  const valid = colors.filter((c) => c.name.trim() && /^#[0-9a-fA-F]{6}$/.test(c.hex));

  switch (format) {
    case "CSS Variables": {
      const vars = valid.map((c) => `  --color-${slugify(c.name)}: ${c.hex};`).join("\n");
      return `:root {\n${vars}\n}`;
    }
    case "SCSS": {
      return valid.map((c) => `$color-${slugify(c.name)}: ${c.hex};`).join("\n");
    }
    case "Tailwind": {
      const entries = valid.map((c) => `        '${slugify(c.name)}': '${c.hex}',`).join("\n");
      return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${entries}\n      },\n    },\n  },\n};`;
    }
    case "JSON": {
      const obj: Record<string, string> = {};
      valid.forEach((c) => {
        obj[slugify(c.name)] = c.hex;
      });
      return JSON.stringify(obj, null, 2);
    }
    case "Figma Tokens": {
      const obj: Record<string, { value: string; type: string }> = {};
      valid.forEach((c) => {
        obj[slugify(c.name)] = { value: c.hex, type: "color" };
      });
      return JSON.stringify({ color: obj }, null, 2);
    }
    case "Swift": {
      return valid
        .map((c) => {
          const rgb = hexToRgb(c.hex);
          if (!rgb) return "";
          return `static let ${camelCase(c.name)} = UIColor(red: ${(rgb.r / 255).toFixed(3)}, green: ${(rgb.g / 255).toFixed(3)}, blue: ${(rgb.b / 255).toFixed(3)}, alpha: 1.0)`;
        })
        .filter(Boolean)
        .join("\n");
    }
    case "Kotlin": {
      return valid
        .map((c) => {
          const raw = c.hex.replace("#", "").toUpperCase();
          return `val ${camelCase(c.name)} = Color(0xFF${raw})`;
        })
        .join("\n");
    }
    case "Flutter": {
      return valid
        .map((c) => {
          const raw = c.hex.replace("#", "").toUpperCase();
          return `static const ${camelCase(c.name)} = Color(0xFF${raw});`;
        })
        .join("\n");
    }
    default:
      return "";
  }
}

export function DesignTokenGenerator() {
  const [colors, setColors] = useState<ColorEntry[]>(DEFAULT_COLORS);
  const [format, setFormat] = useState<Format>("CSS Variables");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => generateOutput(colors, format), [colors, format]);

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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Design Token Generator</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Export your colors as design tokens for any platform or framework.
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
