"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { toolPageContent } from "@/lib/seo/tool-pages";
import { type SavedGradient } from "@/lib/storage";
import { useGradientStorage } from "@/hooks/use-gradient-storage";

interface ColorStop {
  color: string;
  position: number;
  id: number;
}

type GradientType = "linear" | "radial" | "conic";
type ExportTab = "css" | "tailwind" | "svg" | "inline";

interface PresetGradient {
  name: string;
  colors: string[];
  positions?: number[];
}

const COMPASS: Array<[number | null, string]> = [
  [315, "↖"], [0, "↑"], [45, "↗"],
  [270, "←"], [null, ""], [90, "→"],
  [225, "↙"], [180, "↓"], [135, "↘"],
];

const RANDOM_COLORS = [
  "#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7","#DDA0DD","#98D8C8",
  "#F7DC6F","#BB8FCE","#85C1E9","#F1948A","#82E0AA","#F8C471","#AED6F1",
  "#D7BDE2","#A3E4D7","#FAD7A0","#F5B7B1","#ABEBC6","#D6EAF8","#FF9A76",
  "#679B9B","#FFB740","#FF6F91","#845EC2",
];

let nextId = 3;

// ── Color math ────────────────────────────────────────────────────────────────

function mixHex(a: string, b: string, t: number): string {
  if (!/^#[0-9a-fA-F]{6}$/.test(a) || !/^#[0-9a-fA-F]{6}$/.test(b)) return a;
  const ar=parseInt(a.slice(1,3),16), ag=parseInt(a.slice(3,5),16), ab=parseInt(a.slice(5,7),16);
  const br=parseInt(b.slice(1,3),16), bg=parseInt(b.slice(3,5),16), bb=parseInt(b.slice(5,7),16);
  const r=Math.round(ar+(br-ar)*t), g=Math.round(ag+(bg-ag)*t), bv=Math.round(ab+(bb-ab)*t);
  return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${bv.toString(16).padStart(2,"0")}`;
}

function sampleGradientColors(stops: ColorStop[], count: number): string[] {
  const sorted = [...stops].sort((a,b) => a.position - b.position);
  return Array.from({ length: count }, (_, i) => {
    const pos = count === 1 ? 50 : (i / (count-1)) * 100;
    if (pos <= sorted[0].position) return sorted[0].color;
    if (pos >= sorted[sorted.length-1].position) return sorted[sorted.length-1].color;
    for (let j = 0; j < sorted.length-1; j++) {
      const s1=sorted[j], s2=sorted[j+1];
      if (pos >= s1.position && pos <= s2.position) {
        const t = s2.position===s1.position ? 0 : (pos-s1.position)/(s2.position-s1.position);
        return mixHex(s1.color, s2.color, t);
      }
    }
    return sorted[0].color;
  });
}

// ── CSS generators ────────────────────────────────────────────────────────────

function stopsStr(stops: ColorStop[]): string {
  return [...stops].sort((a,b)=>a.position-b.position).map(s=>`${s.color} ${s.position}%`).join(", ");
}

function generateGradientStyle(type: GradientType, angle: number, stops: ColorStop[]): string {
  const s = stopsStr(stops);
  if (type==="linear") return `linear-gradient(${angle}deg, ${s})`;
  if (type==="radial") return `radial-gradient(circle, ${s})`;
  return `conic-gradient(from ${angle}deg, ${s})`;
}

function generateCss(type: GradientType, angle: number, stops: ColorStop[]): string {
  return `background: ${generateGradientStyle(type, angle, stops)};`;
}

function generateTailwindClass(type: GradientType, angle: number, stops: ColorStop[]): string {
  const s = [...stops].sort((a,b)=>a.position-b.position).map(st=>`${st.color}_${st.position}%`).join(",");
  if (type==="linear") return `bg-[linear-gradient(${angle}deg,${s})]`;
  if (type==="radial") return `bg-[radial-gradient(circle,${s})]`;
  return `bg-[conic-gradient(from_${angle}deg,${s})]`;
}

function generateSvg(type: GradientType, angle: number, stops: ColorStop[]): string {
  const sorted = [...stops].sort((a,b)=>a.position-b.position);
  const stopTags = sorted.map(s=>`    <stop offset="${s.position}%" stop-color="${s.color}"/>`).join("\n");
  if (type==="radial") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">\n  <defs>\n    <radialGradient id="grad" cx="50%" cy="50%" r="50%">\n${stopTags}\n    </radialGradient>\n  </defs>\n  <rect width="100%" height="100%" fill="url(#grad)"/>\n</svg>`;
  }
  const rad=(angle*Math.PI)/180;
  const x2=+(0.5+0.5*Math.sin(rad)).toFixed(3), y2=+(0.5-0.5*Math.cos(rad)).toFixed(3);
  const x1=+(1-x2).toFixed(3), y1=+(1-y2).toFixed(3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">\n  <defs>\n    <linearGradient id="grad" x1="${(x1*100).toFixed(1)}%" y1="${(y1*100).toFixed(1)}%" x2="${(x2*100).toFixed(1)}%" y2="${(y2*100).toFixed(1)}%">\n${stopTags}\n    </linearGradient>\n  </defs>\n  <rect width="100%" height="100%" fill="url(#grad)"/>\n</svg>`;
}

function generateInline(type: GradientType, angle: number, stops: ColorStop[]): string {
  return `style={{ background: '${generateGradientStyle(type, angle, stops)}' }}`;
}

function presetToStyle(preset: PresetGradient): string {
  const s = preset.colors.map((c,i) => {
    const pos = preset.positions ? preset.positions[i] : Math.round((i/(preset.colors.length-1))*100);
    return `${c} ${pos}%`;
  });
  return `linear-gradient(135deg, ${s.join(", ")})`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function GradientGenerator() {
  const { saveGradient, getGradients, deleteGradient } = useGradientStorage();

  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<ColorStop[]>([
    { color: "#667eea", position: 0, id: 1 },
    { color: "#764ba2", position: 100, id: 2 },
  ]);
  const [copied, setCopied] = useState<string | null>(null);
  const [exportTab, setExportTab] = useState<ExportTab>("css");

  const [apiGradients, setApiGradients] = useState<PresetGradient[]>([]);
  const [gradientPage, setGradientPage] = useState(1);
  const [loadingGradients, setLoadingGradients] = useState(false);
  const [hasMoreGradients, setHasMoreGradients] = useState(true);

  const [savedGradients, setSavedGradients] = useState<SavedGradient[]>([]);
  const [gradientsMounted, setGradientsMounted] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [previewPreset, setPreviewPreset] = useState<PresetGradient | null>(null);
  const [previewType, setPreviewType] = useState<GradientType>("linear");
  const [previewAngle, setPreviewAngle] = useState(135);
  const [previewStops, setPreviewStops] = useState<ColorStop[]>([]);
  const [previewCopied, setPreviewCopied] = useState(false);

  const [draggingId, setDraggingId] = useState<number | null>(null);
  const stopBarRef = useRef<HTMLDivElement>(null);
  const gradientLoaderRef = useRef<HTMLDivElement>(null);

  // ── Derived ───────────────────────────────────────────────────────────────

  const gradientStyle = generateGradientStyle(gradientType, angle, stops);
  const swatchColors = sampleGradientColors(stops, 12);
  const barStyle = `linear-gradient(to right, ${[...stops].sort((a,b)=>a.position-b.position).map(s=>`${s.color} ${s.position}%`).join(",")})`;

  const exportCode: Record<ExportTab, string> = {
    css: generateCss(gradientType, angle, stops),
    tailwind: generateTailwindClass(gradientType, angle, stops),
    svg: generateSvg(gradientType, angle, stops),
    inline: generateInline(gradientType, angle, stops),
  };

  // ── Stop bar drag ─────────────────────────────────────────────────────────

  function getBarPct(clientX: number): number {
    if (!stopBarRef.current) return 0;
    const rect = stopBarRef.current.getBoundingClientRect();
    return Math.round(Math.max(0, Math.min(100, ((clientX-rect.left)/rect.width)*100)));
  }

  function handleBarMarkerDown(e: React.PointerEvent, id: number) {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDraggingId(id);
  }

  function handleBarPointerMove(e: React.PointerEvent) {
    if (draggingId === null) return;
    updateStop(draggingId, { position: getBarPct(e.clientX) });
  }

  function handleBarPointerUp() { setDraggingId(null); }

  function handleBarClick(e: React.MouseEvent) {
    if (draggingId !== null || stops.length >= 5) return;
    const color = RANDOM_COLORS[Math.floor(Math.random()*RANDOM_COLORS.length)];
    setStops(prev => [...prev, { color, position: getBarPct(e.clientX), id: nextId++ }]);
  }

  // ── Stop mutations ────────────────────────────────────────────────────────

  const updateStop = useCallback((id: number, updates: Partial<ColorStop>) => {
    setStops(prev => prev.map(s => s.id===id ? {...s,...updates} : s));
  }, []);

  const removeStop = useCallback((id: number) => {
    setStops(prev => prev.length<=2 ? prev : prev.filter(s => s.id!==id));
  }, []);

  const addStop = useCallback(() => {
    if (stops.length >= 5) return;
    setStops(prev => [...prev, {
      color: RANDOM_COLORS[Math.floor(Math.random()*RANDOM_COLORS.length)],
      position: 50, id: nextId++,
    }]);
  }, [stops.length]);

  const randomize = useCallback(() => {
    const count = Math.random()<0.5 ? 2 : 3;
    const sh = [...RANDOM_COLORS].sort(()=>Math.random()-0.5);
    setStops(Array.from({length:count},(_,i)=>({
      color: sh[i], position: Math.round((i/(count-1))*100), id: nextId++,
    })));
    setAngle(Math.floor(Math.random()*360));
  }, []);

  // ── Copy / Save ───────────────────────────────────────────────────────────

  const copy = useCallback(async (text: string) => {
    try { await navigator.clipboard.writeText(text); } catch {
      const t=document.createElement("textarea"); t.value=text;
      document.body.appendChild(t); t.select();
      document.execCommand("copy"); document.body.removeChild(t);
    }
    setCopied(text);
    setTimeout(()=>setCopied(c=>c===text?null:c), 2000);
  }, []);

  const handleSaveGradient = useCallback(async () => {
    const saved = await saveGradient({
      name: `${gradientType[0].toUpperCase()}${gradientType.slice(1)} ${angle}°`,
      css: exportCode.css,
      preview: gradientStyle,
    });
    setSavedGradients(prev=>[saved,...prev]);
    setSaveMessage("Saved!"); setTimeout(()=>setSaveMessage(null), 2000);
  }, [gradientType, angle, exportCode.css, gradientStyle, saveGradient]);

  const handleDeleteGradient = useCallback(async (id: string) => {
    await deleteGradient(id);
    setSavedGradients(prev=>prev.filter(g=>g.id!==id));
  }, [deleteGradient]);

  // ── Preset preview ────────────────────────────────────────────────────────

  const openPreview = useCallback((preset: PresetGradient) => {
    setPreviewType("linear"); setPreviewAngle(135);
    setPreviewStops(preset.colors.map((color,i)=>({
      color,
      position: preset.positions ? preset.positions[i] : Math.round((i/(preset.colors.length-1))*100),
      id: nextId++,
    })));
    setPreviewPreset(preset);
  }, []);

  const handleUsePreview = useCallback(() => {
    setGradientType(previewType); setAngle(previewAngle); setStops(previewStops);
    setPreviewPreset(null);
    window.scrollTo({top:0,behavior:"smooth"});
  }, [previewType, previewAngle, previewStops]);

  const handleCopyPreviewCss = useCallback(async () => {
    await navigator.clipboard.writeText(generateCss(previewType, previewAngle, previewStops));
    setPreviewCopied(true); setTimeout(()=>setPreviewCopied(false), 2000);
  }, [previewType, previewAngle, previewStops]);

  const updatePreviewStop = useCallback((id: number, updates: Partial<ColorStop>) => {
    setPreviewStops(prev=>prev.map(s=>s.id===id?{...s,...updates}:s));
  }, []);

  const removePreviewStop = useCallback((id: number) => {
    setPreviewStops(prev=>prev.length<=2?prev:prev.filter(s=>s.id!==id));
  }, []);

  const addPreviewStop = useCallback(() => {
    setPreviewStops(prev=>prev.length>=5?prev:[...prev,{
      color: RANDOM_COLORS[Math.floor(Math.random()*RANDOM_COLORS.length)],
      position: 50, id: nextId++,
    }]);
  }, []);

  const randomizePreview = useCallback(() => {
    const count=Math.random()<0.5?2:3;
    const sh=[...RANDOM_COLORS].sort(()=>Math.random()-0.5);
    setPreviewStops(Array.from({length:count},(_,i)=>({
      color: sh[i], position: Math.round((i/(count-1))*100), id: nextId++,
    })));
    setPreviewAngle(Math.floor(Math.random()*360));
  }, []);

  // ── API data ──────────────────────────────────────────────────────────────

  useEffect(()=>{
    getGradients().then(g=>{setSavedGradients(g);setGradientsMounted(true);});
  }, [getGradients]);

  const fetchGradients = useCallback(async (pageNum: number, append: boolean) => {
    setLoadingGradients(true);
    try {
      const res = await fetch(`/api/gradients?page=${pageNum}&limit=12`);
      const data = await res.json();
      const mapped: PresetGradient[] = data.gradients.map((g:{name:string;colors:string[];positions:number[]})=>({
        name: g.name, colors: g.colors, positions: g.positions,
      }));
      setApiGradients(prev=>append?[...prev,...mapped]:mapped);
      setHasMoreGradients(data.pagination.hasNext);
    } catch {/* ignore */} finally { setLoadingGradients(false); }
  }, []);

  useEffect(()=>{ fetchGradients(1,false); },[fetchGradients]);

  const loadMoreGradients = useCallback(()=>{
    if (!hasMoreGradients||loadingGradients) return;
    const next=gradientPage+1; setGradientPage(next); fetchGradients(next,true);
  },[hasMoreGradients,loadingGradients,gradientPage,fetchGradients]);

  useEffect(()=>{
    const loader=gradientLoaderRef.current; if (!loader) return;
    const obs=new IntersectionObserver(entries=>{if(entries[0].isIntersecting)loadMoreGradients();},{threshold:0.1});
    obs.observe(loader); return ()=>obs.disconnect();
  },[loadMoreGradients]);

  useEffect(()=>{
    if (!previewPreset) return;
    const fn=(e:KeyboardEvent)=>{if(e.key==="Escape")setPreviewPreset(null);};
    window.addEventListener("keydown",fn); return ()=>window.removeEventListener("keydown",fn);
  },[previewPreset]);

  const card = "rounded-3xl border border-black/[0.08] bg-white shadow-sm";

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col bg-[#f0ede8] text-[#1c1712]">
      <Header />

      <main className="mx-auto w-full max-w-[960px] flex-1 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:pt-28">

        {/* ── Hero ── */}
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.35}}
          className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/40 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]"/>Color Tool
          </span>
          <h1 className="mt-2.5 font-display text-[2.4rem] font-black leading-none tracking-[-0.04em] sm:text-[3.2rem]">
            Gradient Generator
          </h1>
          <p className="mt-2 text-[14px] text-[#1c1712]/40">
            Create beautiful CSS gradients with multiple color stops.
          </p>
        </motion.div>

        {/* ── Preview + Interactive Stop Bar ── */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay:0.05}}
          className={`${card} mb-4 overflow-hidden`}>

          <div className="h-[240px] w-full" style={{background: gradientStyle}}/>

          {/* Stop bar label */}
          <div className="flex items-center justify-between border-t border-black/[0.05] bg-[#faf7f2] px-4 py-1.5">
            <span className="text-[9px] font-semibold text-[#1c1712]/30">
              ↔ Drag stops to reposition
            </span>
            {stops.length < 5 && (
              <span className="text-[9px] font-semibold text-[#1c1712]/30">
                Click bar to add stop ({stops.length}/5)
              </span>
            )}
          </div>

          {/* Stop bar — drag markers or click to add */}
          <div
            ref={stopBarRef}
            className="relative h-10 cursor-crosshair select-none"
            style={{background: barStyle}}
            onClick={handleBarClick}
            onPointerMove={handleBarPointerMove}
            onPointerUp={handleBarPointerUp}
          >
            {stops.map(stop => (
              <div key={stop.id}
                className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 touch-none"
                style={{left:`${stop.position}%`}}
                onPointerDown={e=>handleBarMarkerDown(e,stop.id)}
                onClick={e=>e.stopPropagation()}>
                {/* Drag handle marker */}
                <div className="flex h-7 w-7 cursor-grab items-center justify-center rounded-full border-[2.5px] border-white shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-transform active:cursor-grabbing active:scale-95 hover:scale-110"
                  style={{backgroundColor: stop.color}}>
                  <div className="flex gap-[3px]">
                    <div className="h-2.5 w-[1.5px] rounded-full bg-white/70"/>
                    <div className="h-2.5 w-[1.5px] rounded-full bg-white/70"/>
                    <div className="h-2.5 w-[1.5px] rounded-full bg-white/70"/>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CSS output row */}
          <div className="flex items-center justify-between px-5 py-3.5">
            <code className="flex-1 truncate font-mono text-[11px] text-[#1c1712]/40">
              {exportCode.css}
            </code>
            <div className="ml-4 flex shrink-0 items-center gap-2">
              {saveMessage && <span className="text-[11px] font-semibold text-green-600">{saveMessage}</span>}
              <button onClick={handleSaveGradient}
                className="rounded-xl border border-black/[0.07] bg-[#faf7f2] px-3 py-1.5 text-[11px] font-semibold text-[#1c1712]/50 transition hover:bg-[#f0ede8]">
                Save
              </button>
              <button onClick={()=>copy(exportCode.css)}
                className={`rounded-xl px-3 py-1.5 text-[11px] font-semibold transition ${copied===exportCode.css?"bg-green-50 text-green-600 border border-green-200":"border border-black/[0.07] bg-[#faf7f2] text-[#1c1712]/50 hover:bg-[#f0ede8]"}`}>
                {copied===exportCode.css?"✓ Copied!":"Copy CSS"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Controls grid ── */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay:0.1}}
          className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Type + Compass + Angle */}
          <div className={`${card} p-5`}>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Gradient Type</p>
            <div className="mb-5 flex gap-2">
              {(["linear","radial","conic"] as GradientType[]).map(type=>(
                <button key={type} onClick={()=>setGradientType(type)}
                  className={`flex-1 rounded-xl py-2 text-[12px] font-semibold capitalize transition-all ${
                    gradientType===type?"bg-[#1c1712] text-white shadow-sm":"border border-black/[0.07] bg-[#faf7f2] text-[#1c1712]/50 hover:bg-[#f0ede8]"
                  }`}>
                  {type}
                </button>
              ))}
            </div>

            {(gradientType==="linear"||gradientType==="conic") && (<>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Direction</p>

              {/* Direction compass */}
              <div className="mb-4 flex justify-center">
                <div className="grid grid-cols-3 gap-1.5">
                  {COMPASS.map(([a,label],i) =>
                    a===null ? (
                      <div key={i} className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#faf7f2]">
                        <span className="font-mono text-[9px] font-bold text-[#1c1712]/40">{angle}°</span>
                      </div>
                    ) : (
                      <button key={i} onClick={()=>setAngle(a)}
                        className={`h-9 w-9 rounded-xl text-[16px] transition-all ${
                          angle===a?"bg-[#1c1712] text-white shadow-sm":"border border-black/[0.07] bg-[#faf7f2] text-[#1c1712]/60 hover:bg-[#f0ede8]"
                        }`}>
                        {label}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Fine-tune slider */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 right-0 my-auto h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
                    <div className="h-full rounded-full bg-[#1c1712]/20" style={{width:`${(angle/360)*100}%`}}/>
                  </div>
                  <input type="range" min={0} max={360} value={angle}
                    onChange={e=>setAngle(Number(e.target.value))}
                    className="relative h-4 w-full cursor-pointer opacity-0"/>
                </div>
                <span className="w-9 text-right font-mono text-[11px] font-semibold text-[#1c1712]/45">{angle}°</span>
              </div>
            </>)}
          </div>

          {/* Color Stops */}
          <div className={`${card} p-5`}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">
                Color Stops
                <span className="ml-2 font-normal normal-case tracking-normal text-[#1c1712]/25">({stops.length}/5)</span>
              </p>
              <div className="flex gap-1.5">
                <button onClick={randomize}
                  className="rounded-xl border border-black/[0.07] bg-[#faf7f2] px-3 py-1.5 text-[10px] font-semibold text-[#1c1712]/45 transition hover:bg-[#f0ede8]">
                  Randomize
                </button>
                {stops.length<5 && (
                  <button onClick={addStop}
                    className="rounded-xl border border-black/[0.07] bg-[#faf7f2] px-3 py-1.5 text-[10px] font-semibold text-[#1c1712]/45 transition hover:bg-[#f0ede8]">
                    + Add
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2.5">
              {[...stops].sort((a,b)=>a.position-b.position).map(stop=>(
                <div key={stop.id} className="flex items-center gap-2">
                  <label className="relative h-8 w-8 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-black/[0.08] shadow-sm"
                    style={{backgroundColor: stop.color}}>
                    <input type="color" value={stop.color}
                      onChange={e=>updateStop(stop.id,{color:e.target.value})}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"/>
                  </label>
                  <input type="text" value={stop.color} maxLength={7}
                    onChange={e=>{const v=e.target.value;if(/^#[0-9A-Fa-f]{0,6}$/.test(v))updateStop(stop.id,{color:v});}}
                    className="w-[5.5rem] rounded-lg border border-black/[0.07] bg-[#faf7f2] px-2 py-1.5 font-mono text-[11px] font-semibold outline-none transition focus:border-black/15 focus:bg-white"/>
                  <div className="relative min-w-0 flex-1">
                    <div className="absolute inset-y-0 left-0 right-0 my-auto h-1 overflow-hidden rounded-full bg-black/[0.07]">
                      <div className="h-full rounded-full" style={{width:`${stop.position}%`,backgroundColor:stop.color}}/>
                    </div>
                    <input type="range" min={0} max={100} value={stop.position}
                      onChange={e=>updateStop(stop.id,{position:Number(e.target.value)})}
                      className="relative h-4 w-full cursor-pointer opacity-0"/>
                  </div>
                  <span className="w-8 shrink-0 text-right font-mono text-[10px] text-[#1c1712]/35">{stop.position}%</span>
                  {stops.length>2 && (
                    <button onClick={()=>removeStop(stop.id)}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[#1c1712]/25 transition hover:bg-[#faf7f2] hover:text-[#1c1712]/60">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Swatch Strip ── */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay:0.13}}
          className={`${card} mb-4 overflow-hidden`}>
          <div className="flex overflow-hidden rounded-t-3xl">
            {swatchColors.map((hex,i)=>(
              <div key={i}
                className="group/swatch relative flex-1 transition-[flex] duration-300 hover:flex-[3]"
                style={{backgroundColor:hex, minHeight:60}}>
                <button onClick={()=>copy(hex)}
                  className="absolute inset-0 flex items-end justify-center pb-2"
                  aria-label={`Copy ${hex}`}>
                  <span className="rounded-full bg-black/55 px-2.5 py-1 font-mono text-[9px] text-white opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100">
                    {copied===hex?"✓ Copied":hex.toUpperCase()}
                  </span>
                </button>
              </div>
            ))}
          </div>
          <div className="flex border-t border-black/[0.05]">
            {swatchColors.map((_,i)=>(
              <div key={i} className="flex-1 py-1.5 text-center">
                <span className="font-mono text-[7px] font-semibold text-[#1c1712]/25">
                  {Math.round((i/(swatchColors.length-1))*100)}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Export ── */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay:0.16}}
          className={`${card} mb-8 overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Export</p>
            <div className="flex gap-1">
              {(["css","tailwind","svg","inline"] as ExportTab[]).map(t=>(
                <button key={t} onClick={()=>setExportTab(t)}
                  className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide transition ${
                    exportTab===t?"bg-[#1c1712] text-white":"text-[#1c1712]/40 hover:bg-[#faf7f2]"
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <pre className="max-h-52 overflow-x-auto px-5 py-4 font-mono text-[11px] leading-relaxed text-[#1c1712]/55 whitespace-pre-wrap break-all">
              {exportCode[exportTab]}
            </pre>
            <div className="absolute right-4 top-4">
              <button onClick={()=>copy(exportCode[exportTab])}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-semibold transition ${
                  copied===exportCode[exportTab]?"border-green-200 bg-green-50 text-green-600":"border-black/[0.07] bg-[#faf7f2] text-[#1c1712]/45 hover:bg-[#f0ede8]"
                }`}>
                {copied===exportCode[exportTab]?"✓ Copied!":"Copy"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Saved Gradients ── */}
        {gradientsMounted&&savedGradients.length>0&&(
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay:0.18}}
            className="mb-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Saved Gradients</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {savedGradients.map(g=>(
                <div key={g.id} className={`${card} overflow-hidden`}>
                  <div className="h-20 w-full cursor-pointer transition hover:opacity-90"
                    style={{background:g.preview}} onClick={()=>copy(g.css)}/>
                  <div className="p-3">
                    <p className="truncate text-[11px] font-semibold text-[#1c1712]">{g.name}</p>
                    <div className="mt-2 flex gap-1.5">
                      <button onClick={()=>copy(g.css)}
                        className="flex-1 rounded-lg border border-black/[0.06] bg-[#faf7f2] py-1 text-[9px] font-semibold text-[#1c1712]/45 transition hover:bg-[#f0ede8]">
                        Copy CSS
                      </button>
                      <button onClick={()=>handleDeleteGradient(g.id)}
                        className="rounded-lg border border-red-100 bg-red-50 px-2 py-1 text-[9px] font-semibold text-red-400 transition hover:bg-red-100">
                        Del
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Preset Gradients ── */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay:0.2}}
          className="mb-10">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Preset Gradients</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {apiGradients.map((preset,i)=>(
              <motion.button key={`${preset.name}-${i}`}
                initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
                transition={{duration:0.3,delay:(i%12)*0.03}}
                onClick={()=>openPreview(preset)}
                className={`${card} overflow-hidden text-left transition hover:-translate-y-0.5 hover:shadow-md`}>
                <div className="h-24 w-full" style={{background:presetToStyle(preset)}}/>
                <div className="p-3">
                  <p className="text-[11px] font-semibold text-[#1c1712]">{preset.name}</p>
                  <p className="mt-0.5 truncate text-[9px] text-[#1c1712]/35">{preset.colors.join(" → ")}</p>
                </div>
              </motion.button>
            ))}
          </div>
          {hasMoreGradients&&(
            <div ref={gradientLoaderRef} className="flex justify-center py-10">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/10 border-t-black/40"/>
            </div>
          )}
        </motion.div>

        <ToolPageSections config={toolPageContent.gradient}/>
      </main>

      {/* ── Preset Preview Modal ── */}
      <AnimatePresence>
        {previewPreset&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={()=>setPreviewPreset(null)}>
            <motion.div initial={{opacity:0,y:16,scale:0.97}} animate={{opacity:1,y:0,scale:1}}
              exit={{opacity:0,y:16,scale:0.97}} transition={{duration:0.2}}
              onClick={e=>e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-black/[0.08] bg-white shadow-2xl">

              <div className="h-52 w-full rounded-t-3xl sm:h-64"
                style={{background:generateGradientStyle(previewType,previewAngle,previewStops)}}/>

              <div className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-[17px] font-bold text-[#1c1712]">{previewPreset.name}</p>
                  <button onClick={()=>setPreviewPreset(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-black/[0.08] bg-[#faf7f2] text-[#1c1712]/40 transition hover:bg-[#f0ede8]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Type + Compass */}
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Type</p>
                    <div className="mb-4 flex gap-1.5">
                      {(["linear","radial","conic"] as GradientType[]).map(type=>(
                        <button key={type} onClick={()=>setPreviewType(type)}
                          className={`flex-1 rounded-xl py-2 text-[11px] font-semibold capitalize transition-all ${
                            previewType===type?"bg-[#1c1712] text-white":"border border-black/[0.07] bg-[#faf7f2] text-[#1c1712]/45 hover:bg-[#f0ede8]"
                          }`}>
                          {type}
                        </button>
                      ))}
                    </div>
                    {(previewType==="linear"||previewType==="conic")&&(<>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Direction</p>
                      <div className="mb-3 flex justify-center">
                        <div className="grid grid-cols-3 gap-1">
                          {COMPASS.map(([a,label],i)=>
                            a===null?(
                              <div key={i} className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#faf7f2]">
                                <span className="font-mono text-[8px] text-[#1c1712]/40">{previewAngle}°</span>
                              </div>
                            ):(
                              <button key={i} onClick={()=>setPreviewAngle(a)}
                                className={`h-8 w-8 rounded-lg text-[14px] transition-all ${
                                  previewAngle===a?"bg-[#1c1712] text-white":"border border-black/[0.07] bg-[#faf7f2] text-[#1c1712]/50 hover:bg-[#f0ede8]"
                                }`}>
                                {label}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="range" min={0} max={360} value={previewAngle}
                          onChange={e=>setPreviewAngle(Number(e.target.value))}
                          className="flex-1 accent-[#1c1712]"/>
                        <span className="font-mono text-[10px] text-[#1c1712]/40">{previewAngle}°</span>
                      </div>
                    </>)}
                  </div>

                  {/* Stops */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1712]/35">Stops</p>
                      <div className="flex gap-1.5">
                        <button onClick={randomizePreview}
                          className="rounded-lg border border-black/[0.07] bg-[#faf7f2] px-2 py-1 text-[9px] font-semibold text-[#1c1712]/40 transition hover:bg-[#f0ede8]">
                          Randomize
                        </button>
                        {previewStops.length<5&&(
                          <button onClick={addPreviewStop}
                            className="rounded-lg border border-black/[0.07] bg-[#faf7f2] px-2 py-1 text-[9px] font-semibold text-[#1c1712]/40 transition hover:bg-[#f0ede8]">
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {previewStops.map(stop=>(
                        <div key={stop.id} className="flex items-center gap-2">
                          <label className="relative h-7 w-7 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-black/[0.08]"
                            style={{backgroundColor:stop.color}}>
                            <input type="color" value={stop.color}
                              onChange={e=>updatePreviewStop(stop.id,{color:e.target.value})}
                              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"/>
                          </label>
                          <input type="text" value={stop.color} maxLength={7}
                            onChange={e=>{const v=e.target.value;if(/^#[0-9A-Fa-f]{0,6}$/.test(v))updatePreviewStop(stop.id,{color:v});}}
                            className="w-[4.5rem] rounded-lg border border-black/[0.07] bg-[#faf7f2] px-2 py-1 font-mono text-[10px] outline-none focus:border-black/15 focus:bg-white"/>
                          <input type="range" min={0} max={100} value={stop.position}
                            onChange={e=>updatePreviewStop(stop.id,{position:Number(e.target.value)})}
                            className="min-w-0 flex-1 accent-[#1c1712]"/>
                          <span className="w-7 text-right font-mono text-[9px] text-[#1c1712]/30">{stop.position}%</span>
                          {previewStops.length>2&&(
                            <button onClick={()=>removePreviewStop(stop.id)}
                              className="flex h-5 w-5 items-center justify-center rounded text-[#1c1712]/25 hover:text-[#1c1712]/60">
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={handleUsePreview}
                    className="flex-1 rounded-2xl bg-[#e8531f] py-3 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(232,83,31,0.35)] transition hover:bg-[#c94518]">
                    Use this gradient
                  </button>
                  <button onClick={handleCopyPreviewCss}
                    className={`rounded-2xl border px-5 py-3 text-[13px] font-semibold transition ${previewCopied?"border-green-200 bg-green-50 text-green-600":"border-black/[0.08] bg-[#faf7f2] text-[#1c1712]/55 hover:bg-[#f0ede8]"}`}>
                    {previewCopied?"✓ Copied":"Copy CSS"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
