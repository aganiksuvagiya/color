"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { hexToHsl } from "@/lib/color-utils";
import { toolPageContent } from "@/lib/seo/tool-pages";

const tailwindColors: Record<string, Record<string, string>> = {
  slate:   { "50":"#f8fafc","100":"#f1f5f9","200":"#e2e8f0","300":"#cbd5e1","400":"#94a3b8","500":"#64748b","600":"#475569","700":"#334155","800":"#1e293b","900":"#0f172a","950":"#020617" },
  gray:    { "50":"#f9fafb","100":"#f3f4f6","200":"#e5e7eb","300":"#d1d5db","400":"#9ca3af","500":"#6b7280","600":"#4b5563","700":"#374151","800":"#1f2937","900":"#111827","950":"#030712" },
  zinc:    { "50":"#fafafa","100":"#f4f4f5","200":"#e4e4e7","300":"#d4d4d8","400":"#a1a1aa","500":"#71717a","600":"#52525b","700":"#3f3f46","800":"#27272a","900":"#18181b","950":"#09090b" },
  neutral: { "50":"#fafafa","100":"#f5f5f5","200":"#e5e5e5","300":"#d4d4d4","400":"#a3a3a3","500":"#737373","600":"#525252","700":"#404040","800":"#262626","900":"#171717","950":"#0a0a0a" },
  stone:   { "50":"#fafaf9","100":"#f5f5f4","200":"#e7e5e4","300":"#d6d3d1","400":"#a8a29e","500":"#78716c","600":"#57534e","700":"#44403c","800":"#292524","900":"#1c1917","950":"#0c0a09" },
  red:     { "50":"#fef2f2","100":"#fee2e2","200":"#fecaca","300":"#fca5a5","400":"#f87171","500":"#ef4444","600":"#dc2626","700":"#b91c1c","800":"#991b1b","900":"#7f1d1d","950":"#450a0a" },
  orange:  { "50":"#fff7ed","100":"#ffedd5","200":"#fed7aa","300":"#fdba74","400":"#fb923c","500":"#f97316","600":"#ea580c","700":"#c2410c","800":"#9a3412","900":"#7c2d12","950":"#431407" },
  amber:   { "50":"#fffbeb","100":"#fef3c7","200":"#fde68a","300":"#fcd34d","400":"#fbbf24","500":"#f59e0b","600":"#d97706","700":"#b45309","800":"#92400e","900":"#78350f","950":"#451a03" },
  yellow:  { "50":"#fefce8","100":"#fef9c3","200":"#fef08a","300":"#fde047","400":"#facc15","500":"#eab308","600":"#ca8a04","700":"#a16207","800":"#854d0e","900":"#713f12","950":"#422006" },
  lime:    { "50":"#f7fee7","100":"#ecfccb","200":"#d9f99d","300":"#bef264","400":"#a3e635","500":"#84cc16","600":"#65a30d","700":"#4d7c0f","800":"#3f6212","900":"#365314","950":"#1a2e05" },
  green:   { "50":"#f0fdf4","100":"#dcfce7","200":"#bbf7d0","300":"#86efac","400":"#4ade80","500":"#22c55e","600":"#16a34a","700":"#15803d","800":"#166534","900":"#14532d","950":"#052e16" },
  emerald: { "50":"#ecfdf5","100":"#d1fae5","200":"#a7f3d0","300":"#6ee7b7","400":"#34d399","500":"#10b981","600":"#059669","700":"#047857","800":"#065f46","900":"#064e3b","950":"#022c22" },
  teal:    { "50":"#f0fdfa","100":"#ccfbf1","200":"#99f6e4","300":"#5eead4","400":"#2dd4bf","500":"#14b8a6","600":"#0d9488","700":"#0f766e","800":"#115e59","900":"#134e4a","950":"#042f2e" },
  cyan:    { "50":"#ecfeff","100":"#cffafe","200":"#a5f3fc","300":"#67e8f9","400":"#22d3ee","500":"#06b6d4","600":"#0891b2","700":"#0e7490","800":"#155e75","900":"#164e63","950":"#083344" },
  sky:     { "50":"#f0f9ff","100":"#e0f2fe","200":"#bae6fd","300":"#7dd3fc","400":"#38bdf8","500":"#0ea5e9","600":"#0284c7","700":"#0369a1","800":"#075985","900":"#0c4a6e","950":"#082f49" },
  blue:    { "50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554" },
  indigo:  { "50":"#eef2ff","100":"#e0e7ff","200":"#c7d2fe","300":"#a5b4fc","400":"#818cf8","500":"#6366f1","600":"#4f46e5","700":"#4338ca","800":"#3730a3","900":"#312e81","950":"#1e1b4b" },
  violet:  { "50":"#f5f3ff","100":"#ede9fe","200":"#ddd6fe","300":"#c4b5fd","400":"#a78bfa","500":"#8b5cf6","600":"#7c3aed","700":"#6d28d9","800":"#5b21b6","900":"#4c1d95","950":"#2e1065" },
  purple:  { "50":"#faf5ff","100":"#f3e8ff","200":"#e9d5ff","300":"#d8b4fe","400":"#c084fc","500":"#a855f7","600":"#9333ea","700":"#7e22ce","800":"#6b21a8","900":"#581c87","950":"#3b0764" },
  fuchsia: { "50":"#fdf4ff","100":"#fae8ff","200":"#f5d0fe","300":"#f0abfc","400":"#e879f9","500":"#d946ef","600":"#c026d3","700":"#a21caf","800":"#86198f","900":"#701a75","950":"#4a044e" },
  pink:    { "50":"#fdf2f8","100":"#fce7f3","200":"#fbcfe8","300":"#f9a8d4","400":"#f472b6","500":"#ec4899","600":"#db2777","700":"#be185d","800":"#9d174d","900":"#831843","950":"#500724" },
  rose:    { "50":"#fff1f2","100":"#ffe4e6","200":"#fecdd3","300":"#fda4af","400":"#fb7185","500":"#f43f5e","600":"#e11d48","700":"#be123c","800":"#9f1239","900":"#881337","950":"#4c0519" },
};

const shadeKeys = ["50","100","200","300","400","500","600","700","800","900","950"];

const GROUPS: { id: string; label: string; names: string[] | null }[] = [
  { id: "all", label: "All", names: null },
  { id: "gray", label: "Grays", names: ["slate", "gray", "zinc", "neutral", "stone"] },
  { id: "warm", label: "Warm", names: ["red", "orange", "amber", "yellow"] },
  { id: "green", label: "Greens", names: ["lime", "green", "emerald", "teal"] },
  { id: "blue", label: "Blues", names: ["cyan", "sky", "blue", "indigo"] },
  { id: "purple", label: "Purples", names: ["violet", "purple", "fuchsia", "pink", "rose"] },
];

type Format = "hex" | "rgb" | "hsl" | "class";
const FORMATS: { id: Format; label: string }[] = [
  { id: "hex", label: "HEX" },
  { id: "rgb", label: "RGB" },
  { id: "hsl", label: "HSL" },
  { id: "class", label: "Class" },
];

function isLight(hex: string): boolean {
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return (0.299*r + 0.587*g + 0.114*b)/255 > 0.55;
}

function formatValue(hex: string, name: string, shade: string, f: Format) {
  if (f === "hex") return hex.toUpperCase();
  if (f === "class") return `${name}-${shade}`;
  if (f === "rgb") {
    return `rgb(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)})`;
  }
  const { h, s, l } = hexToHsl(hex);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

const DOTS = [tailwindColors.indigo["600"], tailwindColors.sky["500"], tailwindColors.emerald["500"], tailwindColors.amber["500"], tailwindColors.rose["500"]];
const familyCount = Object.keys(tailwindColors).length;

export function TailwindColors() {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("all");
  const [format, setFormat] = useState<Format>("hex");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
  }, []);

  const active = GROUPS.find((g) => g.id === group) ?? GROUPS[0];
  const q = search.trim().toLowerCase();
  const families = Object.entries(tailwindColors).filter(
    ([name]) => (!active.names || active.names.includes(name)) && name.toLowerCase().includes(q)
  );

  const copiedLabel = copiedKey?.startsWith("css:") ? "✓ CSS copied" : "✓ Copied";

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {copiedKey && (
        <div role="status" className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1c1712] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg">
          {copiedLabel}
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
            <span className="text-[#1c1712]/60">Tailwind Colors</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Tailwind CSS Colors</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {DOTS.map((c, i) => (
                <span key={i} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">{familyCount} families, {familyCount * shadeKeys.length} shades.</span> The full Tailwind CSS v4 palette. Click any shade to copy it as HEX, RGB, HSL or a class name.
            </p>
          </div>
        </section>

        {/* ── Toolbar + families ── */}
        <section className="border-t border-black/[0.06]">
          <div className="z-20 border-b border-black/[0.06] bg-white/95 backdrop-blur lg:sticky lg:top-[86px]">
            <div className="flex w-full flex-wrap items-center gap-3 px-6 py-4 sm:px-8 lg:px-12">
              <label className="relative block w-full sm:w-64">
                <span className="sr-only">Search Tailwind colors</span>
                <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1c1712]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search colors"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-10 w-full rounded-full bg-white pl-10 pr-4 text-[14px] text-[#1c1712] outline-none ring-1 ring-black/[0.12] transition placeholder:text-[#1c1712]/40 focus:ring-2 focus:ring-[#1c1712]"
                />
              </label>

              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Color group">
                {GROUPS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGroup(g.id)}
                    aria-pressed={group === g.id}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                      group === g.id ? "bg-[#1c1712] text-white" : "text-[#1c1712]/65 ring-1 ring-black/[0.12] hover:text-[#1c1712] hover:ring-black/25"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 lg:ml-auto" role="group" aria-label="Copy format">
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">Copy as</span>
                <div className="flex rounded-full p-0.5 ring-1 ring-black/[0.12]">
                  {FORMATS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFormat(f.id)}
                      aria-pressed={format === f.id}
                      className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                        format === f.id ? "bg-[#1c1712] text-white" : "text-[#1c1712]/65 hover:text-[#1c1712]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-6 py-8 sm:px-8 lg:px-12">
            <p className="mb-5 text-[14px] font-semibold text-[#1c1712]/80">
              {families.length} {families.length === 1 ? "family" : "families"}
              <span className="font-normal text-[#1c1712]/45"> · {families.length * shadeKeys.length} shades</span>
            </p>

            {families.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {families.map(([name, shades]) => {
                  const css = `@theme {\n${shadeKeys.map((s) => `  --color-${name}-${s}: ${shades[s]};`).join("\n")}\n}`;
                  return (
                    <article key={name} className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                      <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-black/10" style={{ backgroundColor: shades["500"] }} />
                          <h2 className="text-[15px] font-semibold capitalize">{name}</h2>
                          <span className="font-mono text-[12px] uppercase text-[#1c1712]/45">{shades["500"]}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(css, `css:${name}`)}
                          className="shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold text-[#1c1712]/65 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25"
                        >
                          Copy CSS
                        </button>
                      </div>
                      <div className="flex h-24 overflow-hidden">
                        {shadeKeys.map((shade) => {
                          const hex = shades[shade];
                          const key = `${name}-${shade}`;
                          const light = isLight(hex);
                          const value = formatValue(hex, name, shade, format);
                          return (
                            <div key={shade} className="group/swatch relative flex-1 transition-[flex] duration-300 hover:z-10 hover:flex-[3]" style={{ backgroundColor: hex }}>
                              <button
                                onClick={() => handleCopy(value, key)}
                                className="absolute inset-0 flex flex-col items-center justify-between px-1 py-2.5"
                                aria-label={`Copy ${name}-${shade}: ${value}`}
                              >
                                <span className="font-mono text-[10px] font-semibold" style={{ color: light ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.8)" }}>
                                  {shade}
                                </span>
                                <span className="max-w-full truncate whitespace-nowrap rounded-full bg-black/55 px-2 py-0.5 font-mono text-[10px] text-white opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100">
                                  {copiedKey === key ? "✓ Copied" : value}
                                </span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="text-[15px] text-[#1c1712]/55">
                No colors match &ldquo;{search}&rdquo;.{" "}
                <button onClick={() => { setSearch(""); setGroup("all"); }} className="font-semibold text-[#c2410c] hover:underline">Clear filters</button>
              </p>
            )}
          </div>
        </section>

        <ToolPageSections config={toolPageContent.tailwind} variant="new" />
      </main>
    </div>
  );
}
