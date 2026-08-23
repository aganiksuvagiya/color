"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { toolPageContent } from "@/lib/seo/tool-pages";
import { generateTailwindScale, isValidHex } from "@/lib/color-utils";

type ColorEntry = { name: string; hex: string };
type TypographyToken = { name: string; sizePx: number };
type SpacingToken = { name: string; valuePx: number };
type Format = "CSS Variables" | "SCSS" | "Tailwind" | "JSON" | "Figma Tokens" | "Swift" | "Kotlin" | "Flutter";

const FORMATS: Format[] = ["CSS Variables","SCSS","Tailwind","JSON","Figma Tokens","Swift","Kotlin","Flutter"];

const FORMAT_EXT: Record<Format, string> = {
  "CSS Variables": ".css", "SCSS": ".scss", "Tailwind": ".js",
  "JSON": ".json", "Figma Tokens": ".json",
  "Swift": ".swift", "Kotlin": ".kt", "Flutter": ".dart",
};

const DEFAULT_COLORS: ColorEntry[] = [
  { name: "primary", hex: "#4F46E5" },
  { name: "secondary", hex: "#10B981" },
  { name: "accent", hex: "#F59E0B" },
];

const SCALE_RATIOS = [
  { label: "1.125 – Minor Second", value: 1.125 },
  { label: "1.2 – Minor Third", value: 1.2 },
  { label: "1.25 – Major Third", value: 1.25 },
  { label: "1.333 – Perfect Fourth", value: 1.333 },
  { label: "1.5 – Perfect Fifth", value: 1.5 },
  { label: "1.618 – Golden Ratio", value: 1.618 },
];

const TYPE_STEPS = [
  { name: "xs", power: -2 }, { name: "sm", power: -1 }, { name: "base", power: 0 },
  { name: "lg", power: 1 }, { name: "xl", power: 2 }, { name: "2xl", power: 3 },
  { name: "3xl", power: 4 }, { name: "4xl", power: 5 },
];

const SPACING_MULTIPLIERS = [0,1,2,3,4,6,8,10,12,16,20,24,32,40,48,64];

const SHADOW_TOKENS = [
  { name: "sm",    value: "0 1px 2px 0 rgba(0,0,0,0.05)" },
  { name: "md",    value: "0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.10)" },
  { name: "lg",    value: "0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)" },
  { name: "xl",    value: "0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10)" },
  { name: "2xl",   value: "0 25px 50px -12px rgba(0,0,0,0.25)" },
  { name: "inner", value: "inset 0 2px 4px 0 rgba(0,0,0,0.06)" },
  { name: "none",  value: "none" },
];

const RADIUS_TOKENS = [
  { name: "none", value: "0px" },
  { name: "sm",   value: "2px" },
  { name: "md",   value: "6px" },
  { name: "lg",   value: "8px" },
  { name: "xl",   value: "12px" },
  { name: "2xl",  value: "16px" },
  { name: "3xl",  value: "24px" },
  { name: "full", value: "9999px" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateTypeScale(baseSize: number, ratio: number): TypographyToken[] {
  return TYPE_STEPS.map(s => ({ name: s.name, sizePx: Math.round(baseSize * Math.pow(ratio, s.power) * 100) / 100 }));
}

function generateSpacingScale(baseUnit: number): SpacingToken[] {
  return SPACING_MULTIPLIERS.map(m => ({ name: String(m), valuePx: m * baseUnit }));
}

function hexToRgb(hex: string) {
  const m = hex.replace("#","").match(/^([0-9a-fA-F]{6})$/);
  if (!m) return null;
  const n = parseInt(m[1],16);
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
}

function slugify(n: string) { return n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
function camelCase(n: string) { return slugify(n).replace(/-([a-z])/g,(_,c)=>c.toUpperCase()); }
function pascalCase(n: string) { const c=camelCase(n); return c.charAt(0).toUpperCase()+c.slice(1); }

function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function generateOutput(
  colors: ColorEntry[], typography: TypographyToken[], fontFamily: string,
  spacing: SpacingToken[], format: Format, generateShades: boolean
): string {
  const validColors = colors.filter(c => c.name.trim() && /^#[0-9a-fA-F]{6}$/.test(c.hex));

  // Build shade entries for valid colors
  const shadeLinesForColor = (c: ColorEntry, prefix: (name: string, step: string) => string) => {
    if (!generateShades || !isValidHex(c.hex)) return [];
    const scale = generateTailwindScale(c.hex);
    return scale.map(({ step, hex }) => prefix(slugify(c.name), step) + hex);
  };

  switch (format) {
    case "CSS Variables": {
      const colorVars = validColors.map(c => `  --color-${slugify(c.name)}: ${c.hex};`).join("\n");
      const shadeVars = validColors.flatMap(c => shadeLinesForColor(c, (n,s) => `  --color-${n}-${s}: `).map(l => l+";")).join("\n");
      const fontVar = `  --font-family: ${fontFamily};`;
      const typeVars = typography.map(t => `  --text-${t.name}: ${t.sizePx}px;`).join("\n");
      const spaceVars = spacing.map(s => `  --space-${s.name}: ${s.valuePx}px;`).join("\n");
      const shadowVars = SHADOW_TOKENS.map(s => `  --shadow-${s.name}: ${s.value};`).join("\n");
      const radiusVars = RADIUS_TOKENS.map(r => `  --radius-${r.name}: ${r.value};`).join("\n");
      return `:root {\n${colorVars}${shadeVars?"\n"+shadeVars:""}\n\n${fontVar}\n${typeVars}\n\n${spaceVars}\n\n${shadowVars}\n\n${radiusVars}\n}`;
    }
    case "SCSS": {
      const colorVars = validColors.map(c => `$color-${slugify(c.name)}: ${c.hex};`).join("\n");
      const shadeVars = validColors.flatMap(c => shadeLinesForColor(c,(n,s)=>`$color-${n}-${s}: `)).join("\n");
      const typeVars = typography.map(t => `$text-${t.name}: ${t.sizePx}px;`).join("\n");
      const spaceVars = spacing.map(s => `$space-${s.name}: ${s.valuePx}px;`).join("\n");
      const shadowVars = SHADOW_TOKENS.map(s => `$shadow-${s.name}: ${s.value};`).join("\n");
      const radiusVars = RADIUS_TOKENS.map(r => `$radius-${r.name}: ${r.value};`).join("\n");
      return `${colorVars}${shadeVars?"\n"+shadeVars:""}\n\n$font-family: ${fontFamily};\n${typeVars}\n\n${spaceVars}\n\n${shadowVars}\n\n${radiusVars}`;
    }
    case "Tailwind": {
      const colorEntries = validColors.map(c => {
        if (generateShades && isValidHex(c.hex)) {
          const scale = generateTailwindScale(c.hex);
          const inner = scale.map(({step,hex}) => `          '${step}': '${hex}',`).join("\n");
          return `        '${slugify(c.name)}': {\n${inner}\n        },`;
        }
        return `        '${slugify(c.name)}': '${c.hex}',`;
      }).join("\n");
      const fontSizeEntries = typography.map(t => `        '${t.name}': '${t.sizePx}px',`).join("\n");
      const spacingEntries = spacing.map(s => `        '${s.name}': '${s.valuePx}px',`).join("\n");
      const shadowEntries = SHADOW_TOKENS.map(s => `        '${s.name}': '${s.value}',`).join("\n");
      const radiusEntries = RADIUS_TOKENS.map(r => `        '${r.name}': '${r.value}',`).join("\n");
      const fontFamilyList = fontFamily.split(",").map(f=>`'${f.trim().replace(/^['"]|['"]$/g,"")}'`).join(", ");
      return `module.exports = {\n  theme: {\n    extend: {\n      fontFamily: { sans: [${fontFamilyList}] },\n      colors: {\n${colorEntries}\n      },\n      fontSize: {\n${fontSizeEntries}\n      },\n      spacing: {\n${spacingEntries}\n      },\n      boxShadow: {\n${shadowEntries}\n      },\n      borderRadius: {\n${radiusEntries}\n      },\n    },\n  },\n};`;
    }
    case "JSON": {
      const color: Record<string,string|Record<string,string>> = {};
      validColors.forEach(c => {
        if (generateShades && isValidHex(c.hex)) {
          const scale = generateTailwindScale(c.hex);
          color[slugify(c.name)] = Object.fromEntries(scale.map(({step,hex})=>[step,hex]));
        } else { color[slugify(c.name)] = c.hex; }
      });
      const fontSize: Record<string,string> = {};
      typography.forEach(t => { fontSize[t.name] = `${t.sizePx}px`; });
      const spacingObj: Record<string,string> = {};
      spacing.forEach(s => { spacingObj[s.name] = `${s.valuePx}px`; });
      const shadow: Record<string,string> = {};
      SHADOW_TOKENS.forEach(s => { shadow[s.name] = s.value; });
      const radius: Record<string,string> = {};
      RADIUS_TOKENS.forEach(r => { radius[r.name] = r.value; });
      return JSON.stringify({ color, typography: { fontFamily, fontSize }, spacing: spacingObj, shadow, radius }, null, 2);
    }
    case "Figma Tokens": {
      const color: Record<string,{ value: string; type: string }> = {};
      validColors.forEach(c => { color[slugify(c.name)] = { value: c.hex, type: "color" }; });
      const fontSizes: Record<string,{ value: string; type: string }> = {};
      typography.forEach(t => { fontSizes[t.name] = { value: `${t.sizePx}`, type: "fontSizes" }; });
      const spacingObj: Record<string,{ value: string; type: string }> = {};
      spacing.forEach(s => { spacingObj[s.name] = { value: `${s.valuePx}`, type: "spacing" }; });
      const shadow: Record<string,{ value: string; type: string }> = {};
      SHADOW_TOKENS.forEach(s => { shadow[s.name] = { value: s.value, type: "boxShadow" }; });
      const radius: Record<string,{ value: string; type: string }> = {};
      RADIUS_TOKENS.forEach(r => { radius[r.name] = { value: r.value, type: "borderRadius" }; });
      return JSON.stringify({ color, fontSizes, spacing: spacingObj, shadow, radius }, null, 2);
    }
    case "Swift": {
      const colorLines = validColors.map(c => { const rgb=hexToRgb(c.hex); if(!rgb)return ""; return `static let ${camelCase(c.name)} = UIColor(red: ${(rgb.r/255).toFixed(3)}, green: ${(rgb.g/255).toFixed(3)}, blue: ${(rgb.b/255).toFixed(3)}, alpha: 1.0)`; }).filter(Boolean).join("\n");
      const typeLines = typography.map(t => `static let fontSize${pascalCase(t.name)}: CGFloat = ${t.sizePx}`).join("\n");
      const spaceLines = spacing.map(s => `static let spacing${s.name}: CGFloat = ${s.valuePx}`).join("\n");
      const radiusLines = RADIUS_TOKENS.map(r => `static let radius${pascalCase(r.name)}: CGFloat = ${parseFloat(r.value)||0}`).join("\n");
      return `${colorLines}\n\n${typeLines}\n\n${spaceLines}\n\n${radiusLines}`;
    }
    case "Kotlin": {
      const colorLines = validColors.map(c => `val ${camelCase(c.name)} = Color(0xFF${c.hex.replace("#","").toUpperCase()})`).join("\n");
      const typeLines = typography.map(t => `val FontSize${pascalCase(t.name)} = ${t.sizePx}.sp`).join("\n");
      const spaceLines = spacing.map(s => `val Spacing${s.name} = ${s.valuePx}.dp`).join("\n");
      const radiusLines = RADIUS_TOKENS.map(r => `val Radius${pascalCase(r.name)} = ${parseFloat(r.value)||0}.dp`).join("\n");
      return `${colorLines}\n\n${typeLines}\n\n${spaceLines}\n\n${radiusLines}`;
    }
    case "Flutter": {
      const colorLines = validColors.map(c => `static const ${camelCase(c.name)} = Color(0xFF${c.hex.replace("#","").toUpperCase()});`).join("\n");
      const typeLines = typography.map(t => `static const double fontSize${pascalCase(t.name)} = ${t.sizePx};`).join("\n");
      const spaceLines = spacing.map(s => `static const double spacing${s.name} = ${s.valuePx};`).join("\n");
      const radiusLines = RADIUS_TOKENS.map(r => `static const double radius${pascalCase(r.name)} = ${parseFloat(r.value)||0};`).join("\n");
      return `${colorLines}\n\n${typeLines}\n\n${spaceLines}\n\n${radiusLines}`;
    }
    default: return "";
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export function DesignTokenGenerator() {
  const [colors, setColors] = useState<ColorEntry[]>(DEFAULT_COLORS);
  const [fontFamily, setFontFamily] = useState("'Inter', sans-serif");
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [scaleRatio, setScaleRatio] = useState(1.25);
  const [spacingUnit, setSpacingUnit] = useState(4);
  const [format, setFormat] = useState<Format>("CSS Variables");
  const [copied, setCopied] = useState(false);
  const [generateShades, setGenerateShades] = useState(false);
  const [expandedShade, setExpandedShade] = useState<number | null>(null);

  const typography = useMemo(() => generateTypeScale(baseFontSize, scaleRatio), [baseFontSize, scaleRatio]);
  const spacing = useMemo(() => generateSpacingScale(spacingUnit), [spacingUnit]);
  const output = useMemo(() => generateOutput(colors, typography, fontFamily, spacing, format, generateShades), [colors, typography, fontFamily, spacing, format, generateShades]);

  const updateColor = (i: number, field: keyof ColorEntry, value: string) =>
    setColors(prev => prev.map((c,idx) => idx===i ? {...c,[field]:value} : c));
  const addColor = () => { if (colors.length >= 10) return; setColors(prev => [...prev, { name:"", hex:"#000000" }]); };
  const removeColor = (i: number) => setColors(prev => prev.filter((_,idx) => idx!==i));

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = FORMAT_EXT[format];
    downloadFile(output, `design-tokens${ext}`);
  };

  const primaryHex = colors.find(c => c.name === "primary")?.hex || colors[0]?.hex || "#4F46E5";
  const secondaryHex = colors.find(c => c.name === "secondary")?.hex || colors[1]?.hex || "#10B981";
  const accentHex = colors.find(c => c.name === "accent")?.hex || colors[2]?.hex || "#F59E0B";
  const baseTypo = typography.find(t => t.name === "base")?.sizePx || 16;
  const lgTypo = typography.find(t => t.name === "lg")?.sizePx || 18;
  const xlTypo = typography.find(t => t.name === "xl")?.sizePx || 20;
  const twoXlTypo = typography.find(t => t.name === "2xl")?.sizePx || 24;
  const smTypo = typography.find(t => t.name === "sm")?.sizePx || 14;

  const card = "rounded-3xl border border-black/[0.08] bg-white shadow-sm";

  return (
    <div className="flex min-h-screen flex-col bg-[#f0ede8] text-[#1c1712]">
      <Header />

      <main className="mx-auto w-full max-w-[960px] flex-1 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:pt-28">

        {/* ── Hero ── */}
        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35 }}
          className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/40 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]"/>Design Tool
          </span>
          <h1 className="mt-2.5 font-display text-[2.4rem] font-black leading-none tracking-[-0.04em] sm:text-[3.2rem]">
            Design Token Generator
          </h1>
          <p className="mt-2 text-[14px] text-[#1c1712]/40">
            Export colors, typography & spacing as design tokens for any platform.
          </p>
        </motion.div>

        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.05 }}
          className="space-y-4">

          {/* ── Colors ── */}
          <div className={`${card} p-5 sm:p-6`}>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Colors</p>
              <div className="flex items-center gap-3">
                {/* Shade generation toggle */}
                <label className="flex cursor-pointer items-center gap-2">
                  <div className={`relative h-5 w-9 rounded-full transition-colors ${generateShades ? "bg-[#e8531f]" : "bg-black/[0.12]"}`}
                    onClick={() => setGenerateShades(v => !v)}>
                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${generateShades ? "translate-x-4" : "translate-x-0.5"}`}/>
                  </div>
                  <span className="text-[10px] font-semibold text-[#1c1712]/45">Generate shades</span>
                </label>
                <span className="font-mono text-[10px] text-[#1c1712]/25">{colors.length}/10</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <AnimatePresence mode="popLayout">
                {colors.map((color, i) => {
                  const shadeScale = generateShades && isValidHex(color.hex) ? generateTailwindScale(color.hex) : [];
                  const isExpanded = expandedShade === i;
                  return (
                    <motion.div key={i} layout
                      initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }}
                      exit={{ opacity:0, scale:0.97 }} transition={{ duration:0.15 }}>
                      <div className="flex items-center gap-2.5">
                        <label className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-black/[0.10] shadow-sm"
                          style={{ backgroundColor: color.hex }}>
                          <input type="color" value={color.hex}
                            onChange={e => updateColor(i,"hex",e.target.value)}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"/>
                        </label>
                        <input type="text" value={color.name} onChange={e => updateColor(i,"name",e.target.value)}
                          placeholder="Color name / role"
                          className="min-w-0 flex-1 rounded-xl border border-black/[0.07] bg-[#faf7f2] px-3 py-2 text-[12px] text-[#1c1712] placeholder-[#1c1712]/25 outline-none transition focus:border-black/15 focus:bg-white"/>
                        <input type="text" value={color.hex}
                          onChange={e => { let v=e.target.value; if(!v.startsWith("#"))v="#"+v; updateColor(i,"hex",v); }}
                          maxLength={7}
                          className="w-24 shrink-0 rounded-xl border border-black/[0.07] bg-[#faf7f2] px-3 py-2 font-mono text-[12px] text-[#1c1712] outline-none transition focus:border-black/15 focus:bg-white"/>
                        {generateShades && shadeScale.length > 0 && (
                          <button onClick={() => setExpandedShade(isExpanded ? null : i)}
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-[10px] font-bold transition ${isExpanded ? "border-[#e8531f]/20 bg-[#e8531f]/10 text-[#e8531f]" : "border-black/[0.07] bg-[#faf7f2] text-[#1c1712]/40 hover:bg-[#f0ede8]"}`}>
                            {isExpanded ? "▲" : "▼"}
                          </button>
                        )}
                        <button onClick={() => removeColor(i)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[#1c1712]/25 transition hover:bg-[#faf7f2] hover:text-[#1c1712]/60">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>
                      {/* Shade strip */}
                      <AnimatePresence>
                        {isExpanded && shadeScale.length > 0 && (
                          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }}
                            exit={{ opacity:0, height:0 }} transition={{ duration:0.2 }}
                            className="mt-2 overflow-hidden">
                            <div className="flex overflow-hidden rounded-xl">
                              {shadeScale.map(({ step, hex }) => (
                                <div key={step} className="group/sh relative flex-1" style={{ backgroundColor: hex, height: 36 }}>
                                  <div className="absolute inset-x-0 bottom-0 flex justify-center pb-1 opacity-0 transition-opacity duration-150 group-hover/sh:opacity-100">
                                    <span className="rounded-full bg-black/55 px-1.5 py-0.5 font-mono text-[7px] text-white">{step}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {colors.length < 10 && (
              <button onClick={addColor}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-black/[0.10] py-2.5 text-[12px] font-semibold text-[#1c1712]/35 transition hover:border-black/20 hover:bg-[#faf7f2] hover:text-[#1c1712]/55">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
                Add Color
              </button>
            )}
          </div>

          {/* ── Typography + Spacing ── */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Typography */}
            <div className={`${card} p-5`}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Typography Scale</p>
              <div className="mb-4 space-y-3">
                <div>
                  <label className="mb-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/30">Font Family</label>
                  <input type="text" value={fontFamily} onChange={e => setFontFamily(e.target.value)}
                    className="w-full rounded-xl border border-black/[0.07] bg-[#faf7f2] px-3 py-2 text-[12px] text-[#1c1712] outline-none transition focus:border-black/15 focus:bg-white"/>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/30">Base Size (px)</label>
                    <input type="number" min={10} max={32} value={baseFontSize}
                      onChange={e => setBaseFontSize(Number(e.target.value)||16)}
                      className="w-full rounded-xl border border-black/[0.07] bg-[#faf7f2] px-3 py-2 text-[12px] text-[#1c1712] outline-none transition focus:border-black/15 focus:bg-white"/>
                  </div>
                  <div>
                    <label className="mb-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/30">Scale Ratio</label>
                    <select value={scaleRatio} onChange={e => setScaleRatio(Number(e.target.value))}
                      className="w-full rounded-xl border border-black/[0.07] bg-[#faf7f2] px-3 py-2 text-[12px] text-[#1c1712] outline-none transition focus:border-black/15 focus:bg-white">
                      {SCALE_RATIOS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 border-t border-black/[0.05] pt-3">
                {typography.map(t => (
                  <div key={t.name} className="flex items-center gap-3">
                    <span className="w-9 shrink-0 font-mono text-[9px] font-semibold text-[#1c1712]/35">{t.name}</span>
                    <span className="w-12 shrink-0 font-mono text-[9px] text-[#1c1712]/25">{t.sizePx}px</span>
                    <span className="truncate font-semibold text-[#1c1712]/70" style={{ fontSize:`${Math.min(t.sizePx,36)}px`, fontFamily, lineHeight:1.1 }}>Aa</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacing */}
            <div className={`${card} p-5`}>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Spacing Scale</p>
                <div className="flex items-center gap-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#1c1712]/30">Base</label>
                  <input type="number" min={1} max={16} value={spacingUnit}
                    onChange={e => setSpacingUnit(Number(e.target.value)||4)}
                    className="w-14 rounded-lg border border-black/[0.07] bg-[#faf7f2] px-2 py-1 text-center font-mono text-[12px] text-[#1c1712] outline-none focus:border-black/15 focus:bg-white"/>
                  <span className="text-[9px] text-[#1c1712]/30">px</span>
                </div>
              </div>
              <div className="max-h-72 space-y-1.5 overflow-y-auto">
                {spacing.map(s => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="w-6 shrink-0 font-mono text-[9px] font-semibold text-[#1c1712]/35">{s.name}</span>
                    <span className="w-10 shrink-0 font-mono text-[9px] text-[#1c1712]/25">{s.valuePx}px</span>
                    <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                      <div className="absolute left-0 top-0 h-full rounded-full bg-[#1c1712]/20 transition-all"
                        style={{ width: s.valuePx===0 ? "2px" : `${Math.min((s.valuePx/256)*100,100)}%` }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Shadows + Border Radius ── */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Shadows */}
            <div className={`${card} p-5`}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Shadow Tokens</p>
              <div className="space-y-2.5">
                {SHADOW_TOKENS.filter(s => s.name !== "none").map(s => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="w-9 shrink-0 font-mono text-[9px] font-semibold text-[#1c1712]/40">{s.name}</span>
                    <div className="flex h-8 flex-1 items-center justify-center rounded-xl bg-white" style={{ boxShadow: s.value }}>
                      <span className="text-[9px] font-semibold text-[#1c1712]/25">shadow-{s.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Border Radius */}
            <div className={`${card} p-5`}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Border Radius Tokens</p>
              <div className="grid grid-cols-4 gap-2">
                {RADIUS_TOKENS.map(r => (
                  <div key={r.name} className="flex flex-col items-center gap-1.5">
                    <div className="h-10 w-10 border-2 border-[#1c1712]/20 bg-[#faf7f2]"
                      style={{ borderRadius: r.value === "9999px" ? "9999px" : r.value }}/>
                    <span className="font-mono text-[8px] font-semibold text-[#1c1712]/40">{r.name}</span>
                    <span className="font-mono text-[7px] text-[#1c1712]/25">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Live Preview ── */}
          <div className={`${card} overflow-hidden`}>
            <div className="border-b border-black/[0.06] px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Live Preview</p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* UI Card preview */}
                <div className="rounded-2xl border border-black/[0.07] bg-[#faf7f2] p-4">
                  <div style={{ fontFamily }}>
                    <p style={{ fontSize: smTypo, color: "#1c1712", opacity:0.4, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>
                      {colors[0]?.name || "primary"}
                    </p>
                    <p style={{ fontSize: twoXlTypo, color: "#1c1712", fontWeight:800, lineHeight:1.1, marginBottom:8 }}>
                      Your Design System
                    </p>
                    <p style={{ fontSize: baseTypo, color: "#1c1712", opacity:0.5, marginBottom:16, lineHeight:1.5 }}>
                      Tokens make it easy to maintain consistency across every platform.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <button style={{ backgroundColor: primaryHex, color:"#fff", fontSize: smTypo, fontWeight:700, padding:"8px 18px", borderRadius:8, border:"none", cursor:"default" }}>
                        Primary
                      </button>
                      <button style={{ backgroundColor: secondaryHex, color:"#fff", fontSize: smTypo, fontWeight:700, padding:"8px 18px", borderRadius:8, border:"none", cursor:"default" }}>
                        Secondary
                      </button>
                      <button style={{ backgroundColor: accentHex, color:"#fff", fontSize: smTypo, fontWeight:700, padding:"8px 18px", borderRadius:8, border:"none", cursor:"default" }}>
                        Accent
                      </button>
                    </div>
                  </div>
                </div>

                {/* Token palette */}
                <div className="space-y-3">
                  {/* Color tokens */}
                  <div>
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/30">Color Tokens</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {colors.filter(c => isValidHex(c.hex)).map((c,i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div className="h-8 w-8 rounded-xl border border-black/[0.08]" style={{ backgroundColor: c.hex }}/>
                          <span className="font-mono text-[8px] text-[#1c1712]/35">{c.name||"—"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Spacing preview */}
                  <div>
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/30">Spacing</p>
                    <div className="flex items-end gap-1">
                      {[1,2,3,4,6,8,12].map(m => {
                        const px = m * spacingUnit;
                        return (
                          <div key={m} className="flex flex-col items-center gap-1">
                            <div className="w-4 rounded-sm bg-[#1c1712]/15" style={{ height: `${Math.min(px, 64)}px` }}/>
                            <span className="font-mono text-[7px] text-[#1c1712]/25">{px}px</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Typography preview */}
                  <div>
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/30">Type Scale</p>
                    <div className="space-y-0.5" style={{ fontFamily }}>
                      {[{ name:"2xl", size: twoXlTypo }, { name:"xl", size: xlTypo }, { name:"lg", size: lgTypo }, { name:"base", size: baseTypo }].map(t => (
                        <div key={t.name} className="flex items-center gap-2">
                          <span className="w-7 font-mono text-[8px] text-[#1c1712]/25">{t.name}</span>
                          <span className="font-semibold text-[#1c1712]/60" style={{ fontSize: t.size, lineHeight:1.2 }}>Aa</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Format selector ── */}
          <div className={`${card} p-5`}>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Export Format</p>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map(f => (
                <button key={f} onClick={() => setFormat(f)}
                  className={`rounded-xl px-3.5 py-1.5 text-[12px] font-semibold transition-all ${
                    format===f ? "bg-[#1c1712] text-white shadow-sm" : "border border-black/[0.07] bg-[#faf7f2] text-[#1c1712]/50 hover:bg-[#f0ede8]"
                  }`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* ── Output ── */}
          <motion.div layout className={`${card} overflow-hidden`}>
            <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Generated Tokens</p>
                <p className="mt-0.5 text-[10px] text-[#1c1712]/25">{format} · {FORMAT_EXT[format]}</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Download */}
                <button onClick={handleDownload}
                  className="flex items-center gap-1.5 rounded-xl border border-black/[0.07] bg-[#faf7f2] px-3 py-1.5 text-[11px] font-semibold text-[#1c1712]/50 transition hover:bg-[#f0ede8]">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                  </svg>
                  Download {FORMAT_EXT[format]}
                </button>
                {/* Copy */}
                <button onClick={copyToClipboard}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11px] font-semibold transition ${
                    copied ? "border-green-200 bg-green-50 text-green-600" : "border-black/[0.07] bg-[#faf7f2] text-[#1c1712]/50 hover:bg-[#f0ede8]"
                  }`}>
                  {copied ? (
                    <><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Copied!</>
                  ) : (
                    <><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copy all</>
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.pre key={format}
                initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-6 }} transition={{ duration:0.18 }}
                className="max-h-72 overflow-x-auto overflow-y-auto px-5 py-4 font-mono text-[11px] leading-relaxed text-[#1c1712]/55">
                <code>{output}</code>
              </motion.pre>
            </AnimatePresence>
          </motion.div>

        </motion.div>
        <ToolPageSections config={toolPageContent["design-tokens"]}/>
      </main>
    </div>
  );
}
