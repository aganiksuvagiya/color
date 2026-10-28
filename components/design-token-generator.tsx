"use client";

import Link from "next/link";
import { useState, useMemo, type ReactNode } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { toolPageContent } from "@/lib/seo/tool-pages";
import { generateTailwindScale, getContrastText, isValidHex } from "@/lib/color-utils";

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
    return scale.map(({ step, hex }) => prefix(slugify(c.name), String(step)) + hex);
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

const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
const inputCls = "h-10 min-w-0 w-full rounded-xl px-3 text-[13px] text-[#1c1712] outline-none ring-1 ring-black/[0.12] transition placeholder:text-[#1c1712]/35 focus:ring-2 focus:ring-[#1c1712]";
const card = "rounded-2xl ring-1 ring-black/[0.07]";
const ghostBtn = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25";

function Svg({ children, size = 15 }: { children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function SmallTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
      {children}
      <span className="h-px flex-1 bg-black/[0.06]" />
    </h3>
  );
}

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
  const removeColor = (i: number) => { setColors(prev => prev.filter((_,idx) => idx!==i)); setExpandedShade(null); };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = FORMAT_EXT[format];
    downloadFile(output, `design-tokens${ext}`);
  };

  const validColors = colors.filter(c => isValidHex(c.hex));
  const primaryHex = colors.find(c => c.name === "primary")?.hex || colors[0]?.hex || "#4F46E5";
  const secondaryHex = colors.find(c => c.name === "secondary")?.hex || colors[1]?.hex || "#10B981";
  const accentHex = colors.find(c => c.name === "accent")?.hex || colors[2]?.hex || "#F59E0B";
  const baseTypo = typography.find(t => t.name === "base")?.sizePx || 16;
  const twoXlTypo = typography.find(t => t.name === "2xl")?.sizePx || 24;
  const smTypo = typography.find(t => t.name === "sm")?.sizePx || 14;
  const dots = (validColors.length ? validColors : DEFAULT_COLORS).slice(0, 5).map(c => c.hex);

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {copied && (
        <div role="status" className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1c1712] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg">
          ✓ {format} copied
        </div>
      )}

      <main>
        {/* ── Header ── */}
        <section className="w-full px-6 pb-8 pt-28 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
            <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
            <span className="text-[#1c1712]/20">/</span>
            <Link href="/tools" className="transition hover:text-[#1c1712]/70">Tools</Link>
            <span className="text-[#1c1712]/20">/</span>
            <span className="text-[#1c1712]/60">Design Tokens</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Design Token Generator</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {dots.map((c, i) => (
                <span key={i} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">8 export formats, free.</span> Set your colors, type scale and spacing, then copy or download tokens for CSS, SCSS, Tailwind, JSON, Figma, Swift, Kotlin or Flutter.
            </p>
          </div>
        </section>

        {/* ── Workspace: inputs on the left, generated code on the right ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full items-start gap-6 px-6 py-10 sm:px-8 lg:grid-cols-2 lg:px-12">
            <div className="space-y-6">
              {/* Colors */}
              <div className={`${card} p-5 sm:p-6`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className={label}>
                    Colors <span className="ml-2 font-mono normal-case tracking-normal text-[#1c1712]/35">{colors.length}/10</span>
                  </p>
                  <button
                    role="switch"
                    aria-checked={generateShades}
                    onClick={() => setGenerateShades(v => !v)}
                    className="flex items-center gap-2.5 text-[13px] font-semibold text-[#1c1712]/65 transition hover:text-[#1c1712]"
                  >
                    <span className={`relative h-5 w-9 rounded-full transition-colors ${generateShades ? "bg-[#1c1712]" : "bg-black/15"}`}>
                      <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${generateShades ? "translate-x-4" : "translate-x-0"}`} />
                    </span>
                    Generate shades
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  {colors.map((color, i) => {
                    const ok = isValidHex(color.hex);
                    const shadeScale = generateShades && ok ? generateTailwindScale(color.hex) : [];
                    const isExpanded = expandedShade === i && shadeScale.length > 0;
                    return (
                      <div key={i} className="max-sm:border-b max-sm:border-black/[0.06] max-sm:pb-3 max-sm:last:border-b-0 max-sm:last:pb-0">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <label className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:ring-black/30" style={{ backgroundColor: ok ? color.hex : "#ddd" }} title="Open your system color picker">
                            <input
                              type="color"
                              value={ok ? color.hex.toLowerCase() : "#000000"}
                              onChange={e => updateColor(i, "hex", e.target.value.toUpperCase())}
                              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                              aria-label={`Pick color ${i + 1}`}
                            />
                          </label>
                          <input
                            type="text"
                            value={color.name}
                            onChange={e => updateColor(i, "name", e.target.value)}
                            placeholder="Name, e.g. primary"
                            aria-label={`Name of color ${i + 1}`}
                            className={`${inputCls} !w-auto !min-w-[8rem] flex-1`}
                          />
                          <input
                            type="text"
                            value={color.hex}
                            onChange={e => { let v = e.target.value; if (!v.startsWith("#")) v = "#" + v; updateColor(i, "hex", v); }}
                            maxLength={7}
                            spellCheck={false}
                            aria-label={`HEX of color ${i + 1}`}
                            className={`${inputCls} !w-28 shrink-0 font-mono`}
                          />
                          {shadeScale.length > 0 && (
                            <button
                              onClick={() => setExpandedShade(isExpanded ? null : i)}
                              aria-expanded={isExpanded}
                              aria-label="Show shades"
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${isExpanded ? "bg-[#1c1712] text-white" : "text-[#1c1712]/50 ring-1 ring-black/[0.12] hover:text-[#1c1712] hover:ring-black/25"}`}
                            >
                              <Svg><path d={isExpanded ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"} /></Svg>
                            </button>
                          )}
                          <button
                            onClick={() => removeColor(i)}
                            aria-label={`Remove color ${i + 1}`}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#1c1712]/35 transition hover:bg-black/[0.04] hover:text-[#1c1712]"
                          >
                            <Svg><path d="M6 18L18 6M6 6l12 12" /></Svg>
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="mt-2.5 flex overflow-hidden rounded-xl ring-1 ring-black/[0.07]">
                            {shadeScale.map(({ step, hex }) => (
                              <div key={step} className="flex h-11 flex-1 items-end justify-center pb-1" style={{ backgroundColor: hex }} title={`${slugify(color.name) || "color"}-${step}: ${hex}`}>
                                <span className="font-mono text-[9px] font-semibold" style={{ color: getContrastText(hex) === "light" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.55)" }}>{step}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {colors.length < 10 && (
                  <button onClick={addColor} className={`${ghostBtn} mt-5`}>
                    <Svg><path d="M12 4v16m8-8H4" /></Svg>
                    Add color
                  </button>
                )}
              </div>

              {/* Typography + spacing */}
              <div className={`${card} p-5 sm:p-6`}>
                <p className={label}>Typography</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="dt-font" className={label}>Font family</label>
                    <input id="dt-font" type="text" value={fontFamily} onChange={e => setFontFamily(e.target.value)} className={`${inputCls} mt-1.5`} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="dt-base" className={label}>Base size (px)</label>
                      <input id="dt-base" type="number" min={10} max={32} value={baseFontSize} onChange={e => setBaseFontSize(Number(e.target.value) || 16)} className={`${inputCls} mt-1.5`} />
                    </div>
                    <div>
                      <label htmlFor="dt-ratio" className={label}>Scale ratio</label>
                      <select id="dt-ratio" value={scaleRatio} onChange={e => setScaleRatio(Number(e.target.value))} className={`${inputCls} mt-1.5`}>
                        {SCALE_RATIOS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-black/[0.06] pt-5">
                  <p className={label}>Spacing</p>
                  <div className="mt-4 flex items-end gap-3">
                    <div className="w-32">
                      <label htmlFor="dt-space" className={label}>Base unit (px)</label>
                      <input id="dt-space" type="number" min={1} max={16} value={spacingUnit} onChange={e => setSpacingUnit(Number(e.target.value) || 4)} className={`${inputCls} mt-1.5 font-mono`} />
                    </div>
                    <p className="pb-2.5 text-[13px] text-[#1c1712]/50">4px matches Tailwind. Steps run from 0 to {64 * spacingUnit}px.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated tokens */}
            <div className={`${card} flex flex-col overflow-hidden lg:sticky lg:top-24`}>
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-3 pt-5 sm:px-6">
                <div>
                  <p className={label}>Generated tokens</p>
                  <p className="mt-1 font-mono text-[12px] text-[#1c1712]/45">design-tokens{FORMAT_EXT[format]}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleDownload} className={ghostBtn}>
                    <Svg><path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></Svg>
                    Download
                  </button>
                  <button onClick={copyToClipboard} className="inline-flex items-center gap-2 rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
                    <Svg><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></Svg>
                    {copied ? "✓ Copied" : "Copy all"}
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 border-b border-black/[0.06] px-5 pb-4 sm:px-6" role="group" aria-label="Export format">
                {FORMATS.map(f => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    aria-pressed={format === f}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                      format === f ? "bg-[#1c1712] text-white" : "text-[#1c1712]/65 ring-1 ring-black/[0.12] hover:text-[#1c1712] hover:ring-black/25"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <pre className="h-[26rem] overflow-auto bg-[#F5F5F5] px-5 py-4 font-mono text-[12px] leading-relaxed text-[#1c1712]/75 sm:px-6 lg:h-[calc(100vh-22rem)] lg:min-h-[26rem]"><code>{output}</code></pre>
            </div>
          </div>
        </section>

        {/* ── Tokens at a glance ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">Preview</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Your tokens at a glance</h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[#1c1712]/55">Everything above updates live: colors, type scale, spacing, plus the shadow and radius tokens included in every export.</p>

            <div className="mt-8 grid items-start gap-6 lg:grid-cols-3">
              <div className="space-y-6">
                <div>
                  <SmallTitle>UI sample</SmallTitle>
                  <div className={`${card} p-5`} style={{ fontFamily }}>
                    <p style={{ fontSize: smTypo, opacity: 0.45, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{colors[0]?.name || "primary"}</p>
                    <p style={{ fontSize: twoXlTypo, fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>Your Design System</p>
                    <p style={{ fontSize: baseTypo, opacity: 0.55, marginBottom: 16, lineHeight: 1.5 }}>Tokens keep every platform consistent.</p>
                    <div className="flex flex-wrap gap-2">
                      {[["Primary", primaryHex], ["Secondary", secondaryHex], ["Accent", accentHex]].map(([name, hex]) => (
                        <span key={name} style={{ backgroundColor: hex, color: getContrastText(hex) === "light" ? "#fff" : "#1c1712", fontSize: smTypo, fontWeight: 700, padding: "8px 16px", borderRadius: 8 }}>{name}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <SmallTitle>Color tokens</SmallTitle>
                  <div className="flex flex-wrap gap-3">
                    {validColors.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 ring-1 ring-black/[0.1]">
                        <span className="h-6 w-6 rounded-full ring-1 ring-black/10" style={{ backgroundColor: c.hex }} />
                        <span className="text-[13px] font-semibold">{c.name || "unnamed"}</span>
                        <span className="font-mono text-[11px] uppercase text-[#1c1712]/45">{c.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <SmallTitle>Type scale</SmallTitle>
                  <div className="space-y-2">
                    {typography.map(t => (
                      <div key={t.name} className="flex items-baseline gap-3">
                        <span className="w-10 shrink-0 font-mono text-[12px] font-semibold text-[#1c1712]/55">{t.name}</span>
                        <span className="w-16 shrink-0 font-mono text-[12px] text-[#1c1712]/40">{t.sizePx}px</span>
                        <span className="truncate font-semibold" style={{ fontSize: `${Math.min(t.sizePx, 36)}px`, fontFamily, lineHeight: 1.15 }}>Aa</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <SmallTitle>Spacing</SmallTitle>
                  <div className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
                    {spacing.map(s => (
                      <div key={s.name} className="flex items-center gap-3">
                        <span className="w-7 shrink-0 font-mono text-[12px] font-semibold text-[#1c1712]/55">{s.name}</span>
                        <span className="w-14 shrink-0 font-mono text-[12px] text-[#1c1712]/40">{s.valuePx}px</span>
                        <span className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                          <span className="absolute left-0 top-0 h-full rounded-full bg-[#1c1712]/70 transition-all" style={{ width: s.valuePx === 0 ? "2px" : `${Math.min((s.valuePx / 256) * 100, 100)}%` }} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <SmallTitle>Shadows</SmallTitle>
                  <div className="space-y-3">
                    {SHADOW_TOKENS.filter(s => s.name !== "none").map(s => (
                      <div key={s.name} className="flex items-center gap-3">
                        <span className="w-10 shrink-0 font-mono text-[12px] font-semibold text-[#1c1712]/55">{s.name}</span>
                        <div className="flex h-10 flex-1 items-center justify-center rounded-xl bg-white" style={{ boxShadow: s.value }}>
                          <span className="text-[12px] font-semibold text-[#1c1712]/40">shadow-{s.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <SmallTitle>Border radius</SmallTitle>
                  <div className="grid grid-cols-4 gap-3">
                    {RADIUS_TOKENS.map(r => (
                      <div key={r.name} className="flex flex-col items-center gap-1.5">
                        <div className="h-12 w-12 border-2 border-[#1c1712]/25 bg-[#fafafa]" style={{ borderRadius: r.value }} />
                        <span className="font-mono text-[12px] font-semibold text-[#1c1712]/55">{r.name}</span>
                        <span className="font-mono text-[11px] text-[#1c1712]/40">{r.value === "9999px" ? "full" : r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ToolPageSections config={toolPageContent["design-tokens"]} variant="new" />
      </main>
    </div>
  );
}
