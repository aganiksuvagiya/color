"use client";

import Link from "next/link";
import { useState, useCallback, useMemo, useId, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { toolPageContent } from "@/lib/seo/tool-pages";

/* ── Types ── */
interface ColorStop { id: number; color: string; }
type AnimationType = "gradient-shift" | "color-pulse" | "hue-rotate";
type Direction = "normal" | "alternate" | "reverse";
type Easing = "linear" | "ease" | "ease-in-out";
interface PresetAnimation {
  name: string; colors: string[]; type: AnimationType;
  duration: number; direction: Direction; easing: Easing;
}

/* ── Constants ── */
const ANIMATION_TYPES: { value: AnimationType; label: string }[] = [
  { value: "gradient-shift", label: "Gradient Shift" },
  { value: "color-pulse",    label: "Color Pulse" },
  { value: "hue-rotate",     label: "Hue Rotate" },
];
const DIRECTIONS: { value: Direction; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "alternate", label: "Alternate" },
  { value: "reverse", label: "Reverse" },
];
const EASINGS: { value: Easing; label: string }[] = [
  { value: "linear", label: "Linear" },
  { value: "ease", label: "Ease" },
  { value: "ease-in-out", label: "Ease In-Out" },
];
const PRESETS: PresetAnimation[] = [
  { name: "Aurora",       colors: ["#00c9ff","#92fe9d","#00b09b","#96c93d"], type: "gradient-shift", duration: 6,  direction: "alternate", easing: "ease-in-out" },
  { name: "Sunset",       colors: ["#ff512f","#f09819","#ff6b6b","#ee0979"], type: "color-pulse",    duration: 4,  direction: "alternate", easing: "ease-in-out" },
  { name: "Ocean",        colors: ["#0052d4","#4facfe","#00f2fe","#43e97b"], type: "gradient-shift", duration: 8,  direction: "alternate", easing: "ease" },
  { name: "Neon",         colors: ["#f953c6","#b91d73","#8e2de2","#4a00e0"], type: "hue-rotate",     duration: 5,  direction: "normal",    easing: "linear" },
  { name: "Fire",         colors: ["#f12711","#f5af19","#ff6b35","#ffd700"], type: "gradient-shift", duration: 5,  direction: "alternate", easing: "ease-in-out" },
  { name: "Mint",         colors: ["#00b09b","#96c93d","#11998e","#38ef7d"], type: "gradient-shift", duration: 7,  direction: "alternate", easing: "ease" },
  { name: "Lavender",     colors: ["#a18cd1","#fbc2eb","#fddb92","#d1fdff"], type: "gradient-shift", duration: 9,  direction: "alternate", easing: "ease-in-out" },
  { name: "Deep Sea",     colors: ["#0f0c29","#302b63","#24243e","#006eff"], type: "color-pulse",    duration: 6,  direction: "normal",    easing: "linear" },
];

let nextId = 3;

const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";
const hexInput = "h-10 w-28 rounded-xl px-3 font-mono text-[13px] text-[#1c1712] outline-none ring-1 ring-black/[0.12] transition focus:ring-2 focus:ring-[#1c1712]";
const ghostBtn = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25 disabled:cursor-not-allowed disabled:opacity-40";
const THUMB =
  "[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent " +
  "[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full " +
  "[&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#1c1712] [&::-webkit-slider-thumb]:shadow-[0_1px_5px_rgba(0,0,0,0.4)] " +
  "[&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full " +
  "[&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#1c1712] [&::-moz-range-thumb]:shadow-[0_1px_5px_rgba(0,0,0,0.4)]";

/* ── CSS generation ── */
function buildKeyframesAndStyle(
  animName: string, type: AnimationType, colors: string[],
  duration: number, direction: Direction, easing: Easing,
): { keyframes: string; elementCss: string } {
  const colorsStr = colors.join(", ");
  switch (type) {
    case "gradient-shift":
      return {
        keyframes: `@keyframes ${animName} {\n  0% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}`,
        elementCss: `.animated-element {\n  background: linear-gradient(270deg, ${colorsStr});\n  background-size: ${colors.length * 100}% ${colors.length * 100}%;\n  animation: ${animName} ${duration}s ${easing} infinite ${direction};\n}`,
      };
    case "color-pulse": {
      const steps = colors.map((c, i) => `  ${Math.round((i/(colors.length-1))*100)}% { background-color: ${c}; }`).join("\n");
      return {
        keyframes: `@keyframes ${animName} {\n${steps}\n}`,
        elementCss: `.animated-element {\n  background-color: ${colors[0]};\n  animation: ${animName} ${duration}s ${easing} infinite ${direction};\n}`,
      };
    }
    case "hue-rotate":
      return {
        keyframes: `@keyframes ${animName} {\n  0% { filter: hue-rotate(0deg); }\n  100% { filter: hue-rotate(360deg); }\n}`,
        elementCss: `.animated-element {\n  background: linear-gradient(135deg, ${colorsStr});\n  animation: ${animName} ${duration}s ${easing} infinite ${direction};\n}`,
      };
  }
}

/* ── Small UI pieces ── */
function Svg({ children, size = 15 }: { children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const CopyIcon = () => (
  <Svg>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </Svg>
);

function Segmented<T extends string>({ options, value, onChange, name }: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void; name: string }) {
  return (
    <div role="group" aria-label={name} className="flex flex-wrap gap-2">
      {options.map(o => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
            value === o.value ? "bg-[#1c1712] text-white" : "text-[#1c1712]/65 ring-1 ring-black/[0.12] hover:text-[#1c1712] hover:ring-black/25"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function DurationSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const pct = ((value - 1) / 9) * 100;
  return (
    <div className="relative h-5">
      <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-black/[0.08]">
        <div className="h-full rounded-full bg-[#1c1712]" style={{ width: `${pct}%` } as CSSProperties} />
      </div>
      <input
        type="range"
        min={1}
        max={10}
        step={0.5}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        aria-label="Duration in seconds"
        className={`absolute inset-0 h-5 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-[#1c1712] ${THUMB}`}
      />
    </div>
  );
}

function ColorRows({ stops, onChange, onRemove, onAdd }: { stops: ColorStop[]; onChange: (id: number, hex: string) => void; onRemove: (id: number) => void; onAdd: () => void }) {
  const hexes = stops.map(s => s.color);
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className={label}>Colors <span className="ml-2 font-mono normal-case tracking-normal text-[#1c1712]/35">{stops.length}/6</span></p>
        <button onClick={onAdd} disabled={stops.length >= 6} className={ghostBtn.replace("px-4 py-2", "px-3.5 py-1.5")}>
          <Svg size={13}><path d="M12 4v16m8-8H4" /></Svg>
          Add color
        </button>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full ring-1 ring-black/[0.06]" style={{ background: `linear-gradient(90deg, ${hexes.join(",")})` }} />
      <div className="mt-4 space-y-2.5">
        {stops.map((stop, i) => (
          <div key={stop.id} className="flex items-center gap-2.5">
            <label className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:ring-black/30" style={{ backgroundColor: stop.color }} title="Open your system color picker">
              <input
                type="color"
                value={stop.color.length === 7 ? stop.color : "#000000"}
                onChange={e => onChange(stop.id, e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label={`Pick color ${i + 1}`}
              />
            </label>
            <input
              type="text"
              value={stop.color}
              maxLength={7}
              spellCheck={false}
              aria-label={`HEX of color ${i + 1}`}
              onChange={e => { const v = e.target.value; if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(stop.id, v); }}
              className={hexInput}
            />
            <button
              onClick={() => onRemove(stop.id)}
              disabled={stops.length <= 2}
              aria-label={`Remove color ${i + 1}`}
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl text-[#1c1712]/35 transition hover:bg-black/[0.04] hover:text-[#1c1712] disabled:opacity-25 disabled:hover:bg-transparent"
            >
              <Svg><path d="M6 18L18 6M6 6l12 12" /></Svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Animated preset tile ── */
function PresetChip({ preset, active, onClick }: { preset: PresetAnimation; active: boolean; onClick: () => void }) {
  const id = useId().replace(/:/g,"");
  const anim = `pc_${id}`;
  const { keyframes, elementCss } = buildKeyframesAndStyle(anim, preset.type, preset.colors, preset.duration, preset.direction, preset.easing);
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`group overflow-hidden rounded-xl text-left transition ${active ? "ring-2 ring-[#1c1712]" : "ring-1 ring-black/[0.1] hover:ring-black/30"}`}
    >
      <style>{`${keyframes}\n${elementCss.replace(".animated-element","#"+id)}`}</style>
      <div id={id} style={{ height: 52 }} />
      <p className="bg-white px-2.5 py-1.5 text-[12px] font-semibold">{preset.name}</p>
    </button>
  );
}

const typeName = (t: AnimationType) => ANIMATION_TYPES.find(a => a.value === t)?.label ?? "";

/* ── Component ── */
export function ColorAnimationGenerator() {
  const uid = useId().replace(/:/g, "");
  const animName = `hf_${uid}`;

  const [colors, setColors] = useState<ColorStop[]>([
    { id: 1, color: "#6366f1" },
    { id: 2, color: "#ec4899" },
  ]);
  const [animType, setAnimType] = useState<AnimationType>("gradient-shift");
  const [duration, setDuration] = useState(4);
  const [direction, setDirection] = useState<Direction>("alternate");
  const [easing, setEasing] = useState<Easing>("ease-in-out");
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  /* Preset preview modal */
  const [previewPreset, setPreviewPreset] = useState<PresetAnimation | null>(null);
  const [previewColors, setPreviewColors] = useState<ColorStop[]>([]);
  const [previewType, setPreviewType] = useState<AnimationType>("gradient-shift");
  const [previewDuration, setPreviewDuration] = useState(4);
  const [previewDirection, setPreviewDirection] = useState<Direction>("alternate");
  const [previewEasing, setPreviewEasing] = useState<Easing>("ease-in-out");
  const [previewCopied, setPreviewCopied] = useState(false);
  const previewAnimName = `${animName}_m`;

  useEffect(() => {
    if (!previewPreset) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setPreviewPreset(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [previewPreset]);

  const openPreview = useCallback((preset: PresetAnimation) => {
    nextId = preset.colors.length + 1;
    setPreviewColors(preset.colors.map((c,i) => ({ id:i+1, color:c })));
    setPreviewType(preset.type); setPreviewDuration(preset.duration);
    setPreviewDirection(preset.direction); setPreviewEasing(preset.easing);
    setPreviewPreset(preset);
  }, []);

  const previewHexColors = useMemo(() => previewColors.map(c => c.color), [previewColors]);

  const previewModalStyleTag = useMemo(() => {
    if (!previewPreset) return "";
    const { keyframes, elementCss } = buildKeyframesAndStyle(previewAnimName, previewType, previewHexColors, previewDuration, previewDirection, previewEasing);
    return `${keyframes}\n${elementCss.replace(".animated-element", `#pm_${uid}`)}`;
  }, [previewPreset, previewAnimName, previewType, previewHexColors, previewDuration, previewDirection, previewEasing, uid]);

  const handleUsePreview = useCallback(() => {
    nextId = previewColors.length + 1;
    setColors(previewColors.map((c,i) => ({ id:i+1, color:c.color })));
    setAnimType(previewType); setDuration(previewDuration);
    setDirection(previewDirection); setEasing(previewEasing);
    setActivePreset(null);
    setPreviewPreset(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [previewColors, previewType, previewDuration, previewDirection, previewEasing]);

  const handleCopyPreviewCss = useCallback(() => {
    const { keyframes, elementCss } = buildKeyframesAndStyle(previewAnimName, previewType, previewHexColors, previewDuration, previewDirection, previewEasing);
    navigator.clipboard.writeText(`${keyframes}\n\n${elementCss}`).then(() => {
      setPreviewCopied(true); setTimeout(() => setPreviewCopied(false), 2000);
    });
  }, [previewAnimName, previewType, previewHexColors, previewDuration, previewDirection, previewEasing]);

  /* More animations */
  const [morePresets, setMorePresets] = useState<PresetAnimation[]>([]);
  const [morePage, setMorePage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMorePresets, setHasMorePresets] = useState(true);
  const moreLoaderRef = useRef<HTMLDivElement>(null);

  const fetchMorePresets = useCallback(async (pageNum: number, append: boolean) => {
    setLoadingMore(true);
    try {
      const res = await fetch(`/api/animation-presets?page=${pageNum}&limit=8`);
      const data = await res.json();
      setMorePresets(prev => append ? [...prev, ...data.presets] : data.presets);
      setHasMorePresets(data.pagination.hasNext);
    } catch { /* silently fail */ } finally { setLoadingMore(false); }
  }, []);

  useEffect(() => { const t = setTimeout(() => fetchMorePresets(1, false), 0); return () => clearTimeout(t); }, [fetchMorePresets]);

  const loadMorePresets = useCallback(() => {
    if (!hasMorePresets || loadingMore) return;
    const next = morePage+1; setMorePage(next); fetchMorePresets(next, true);
  }, [hasMorePresets, loadingMore, morePage, fetchMorePresets]);

  useEffect(() => {
    const loader = moreLoaderRef.current; if (!loader) return;
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) loadMorePresets(); }, { threshold: 0.1 });
    obs.observe(loader); return () => obs.disconnect();
  }, [loadMorePresets]);

  /* Color management */
  const addColor = useCallback(() => {
    if (colors.length >= 6) return;
    const r = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6,"0")}`;
    setColors(prev => [...prev, { id:nextId++, color:r }]);
  }, [colors.length]);

  const removeColor = useCallback((id: number) => {
    if (colors.length <= 2) return;
    setColors(prev => prev.filter(c => c.id !== id));
  }, [colors.length]);

  const updateColor = useCallback((id: number, hex: string) => {
    setColors(prev => prev.map(c => c.id===id ? {...c,color:hex} : c));
  }, []);

  const applyPreset = useCallback((preset: PresetAnimation) => {
    nextId = preset.colors.length + 1;
    setColors(preset.colors.map((c,i) => ({ id:i+1, color:c })));
    setAnimType(preset.type); setDuration(preset.duration);
    setDirection(preset.direction); setEasing(preset.easing);
    setActivePreset(preset.name);
  }, []);

  /* CSS */
  const hexColors = useMemo(() => colors.map(c => c.color), [colors]);
  const { keyframes: kf, elementCss: elCss } = useMemo(
    () => buildKeyframesAndStyle(animName, animType, hexColors, duration, direction, easing),
    [animName, animType, hexColors, duration, direction, easing],
  );
  const fullCss = `${kf}\n\n${elCss}`;

  const previewStyleTag = useMemo(() => {
    const { keyframes, elementCss } = buildKeyframesAndStyle(animName, animType, hexColors, duration, direction, easing);
    return `${keyframes}\n${elementCss.replace(".animated-element", `#canvas_${uid}`)}`;
  }, [animName, animType, hexColors, duration, direction, easing, uid]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(fullCss).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }, [fullCss]);

  const chip = "rounded-full bg-[#1c1712]/[0.05] px-3 py-1 text-[12px] font-semibold text-[#1c1712]/70";

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {(copied || previewCopied) && (
        <div role="status" className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1c1712] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg">
          ✓ CSS copied
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
            <span className="text-[#1c1712]/60">Color Animation</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Color Animation Generator</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {hexColors.slice(0, 5).map((c, i) => (
                <span key={i} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
              ))}
            </span>
            <p className="text-[16px] text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">Live CSS animations, free.</span> Pick colors and a motion style, watch it loop, then copy the keyframes.
            </p>
          </div>
        </section>

        {/* ── Workspace ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full items-start gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:px-12">
            {/* Stage + CSS */}
            <div className="min-w-0 space-y-6">
              <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                <style>{previewStyleTag}</style>
                <div id={`canvas_${uid}`} className="h-64 w-full sm:h-80 lg:h-[24rem]" />
                <div className="flex flex-wrap items-center gap-2 border-t border-black/[0.06] bg-white px-4 py-3">
                  <span className={chip}>{typeName(animType)}</span>
                  <span className={chip}>{duration}s</span>
                  <span className={chip}>{direction}</span>
                  <span className={chip}>{easing}</span>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
                  <p className={label}>Generated CSS</p>
                  <button onClick={copyToClipboard} className="inline-flex items-center gap-2 rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
                    <CopyIcon />
                    {copied ? "✓ Copied" : "Copy CSS"}
                  </button>
                </div>
                <pre className="max-h-60 overflow-auto bg-[#F5F5F5] px-4 py-4 font-mono text-[12px] leading-relaxed text-[#1c1712]/75 sm:px-5"><code>{fullCss}</code></pre>
              </div>
            </div>

            {/* Controls */}
            <div className="min-w-0 divide-y divide-black/[0.06] rounded-2xl ring-1 ring-black/[0.07]">
              <div className="p-5 sm:p-6">
                <p className={label}>Presets</p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
                  {PRESETS.map(p => (
                    <PresetChip key={p.name} preset={p} active={activePreset === p.name} onClick={() => applyPreset(p)} />
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <ColorRows stops={colors} onChange={updateColor} onRemove={removeColor} onAdd={addColor} />
              </div>

              <div className="p-5 sm:p-6">
                <p className={label}>Type</p>
                <div className="mt-3">
                  <Segmented options={ANIMATION_TYPES} value={animType} onChange={setAnimType} name="Animation type" />
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <p className={label}>Duration</p>
                    <span className="font-mono text-[13px] font-semibold">{duration}s</span>
                  </div>
                  <div className="mt-3">
                    <DurationSlider value={duration} onChange={setDuration} />
                  </div>
                </div>
                <div>
                  <p className={label}>Direction</p>
                  <div className="mt-3"><Segmented options={DIRECTIONS} value={direction} onChange={setDirection} name="Direction" /></div>
                </div>
                <div>
                  <p className={label}>Easing</p>
                  <div className="mt-3"><Segmented options={EASINGS} value={easing} onChange={setEasing} name="Easing" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── More animations ── */}
        {(morePresets.length > 0 || loadingMore) && (
          <section className="border-t border-black/[0.06]">
            <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">Library</p>
              <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">More animations</h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[#1c1712]/55">Open any one to tweak its colors and timing, then use it above or copy the CSS.</p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {morePresets.map((preset, i) => (
                  <button
                    key={`${preset.name}-${i}`}
                    onClick={() => openPreview(preset)}
                    className="group overflow-hidden rounded-2xl text-left ring-1 ring-black/[0.07] transition hover:-translate-y-0.5 hover:ring-black/25"
                  >
                    <div className="h-20 w-full" style={{ background: `linear-gradient(135deg, ${preset.colors.join(",")})` }} />
                    <div className="px-3.5 py-3">
                      <p className="truncate text-[14px] font-semibold">{preset.name}</p>
                      <p className="text-[12px] text-[#1c1712]/45">{typeName(preset.type)}</p>
                    </div>
                  </button>
                ))}
              </div>
              {hasMorePresets && (
                <div ref={moreLoaderRef} className="flex justify-center pt-8">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/10 border-t-[#1c1712]" />
                </div>
              )}
            </div>
          </section>
        )}

        <ToolPageSections config={toolPageContent.animation} variant="new" />
      </main>

      {/* ── Preset preview modal ── */}
      {previewPreset && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${previewPreset.name} animation`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setPreviewPreset(null)}
        >
          <div onClick={e => e.stopPropagation()} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 px-6 py-5">
              <div>
                <p className="text-[18px] font-bold tracking-[-0.02em]">{previewPreset.name}</p>
                <p className="text-[13px] text-[#1c1712]/50">Customize it, then use it or copy the CSS.</p>
              </div>
              <button onClick={() => setPreviewPreset(null)} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full text-[#1c1712]/55 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                <Svg><path d="M6 18L18 6M6 6l12 12" /></Svg>
              </button>
            </div>

            <style>{previewModalStyleTag}</style>
            <div id={`pm_${uid}`} className="h-44 w-full" />

            <div className="grid gap-6 px-6 py-6 sm:grid-cols-2">
              <ColorRows
                stops={previewColors}
                onChange={(id, hex) => setPreviewColors(prev => prev.map(c => c.id === id ? { ...c, color: hex } : c))}
                onRemove={id => setPreviewColors(prev => (prev.length > 2 ? prev.filter(c => c.id !== id) : prev))}
                onAdd={() => setPreviewColors(prev => (prev.length >= 6 ? prev : [...prev, { id: nextId++, color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6,"0")}` }]))}
              />
              <div className="space-y-5">
                <div>
                  <p className={label}>Type</p>
                  <div className="mt-3"><Segmented options={ANIMATION_TYPES} value={previewType} onChange={setPreviewType} name="Animation type" /></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className={label}>Duration</p>
                    <span className="font-mono text-[13px] font-semibold">{previewDuration}s</span>
                  </div>
                  <div className="mt-3"><DurationSlider value={previewDuration} onChange={setPreviewDuration} /></div>
                </div>
                <div>
                  <p className={label}>Direction</p>
                  <div className="mt-3"><Segmented options={DIRECTIONS} value={previewDirection} onChange={setPreviewDirection} name="Direction" /></div>
                </div>
                <div>
                  <p className={label}>Easing</p>
                  <div className="mt-3"><Segmented options={EASINGS} value={previewEasing} onChange={setPreviewEasing} name="Easing" /></div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-black/[0.06] px-6 py-4">
              <button onClick={handleUsePreview} className="rounded-full bg-[#1c1712] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#c2410c]">
                Use this animation
              </button>
              <button onClick={handleCopyPreviewCss} className={ghostBtn}>
                <CopyIcon />
                {previewCopied ? "✓ Copied" : "Copy CSS"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
