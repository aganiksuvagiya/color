"use client";

import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Header } from "./header";

const MAX_SLOTS = 6;
const CANVAS_SIZE = 1200;

type Slot = { id: number; url: string | null };

function gridColumns(count: number): number {
  if (count <= 1) return 1;
  if (count <= 4) return 2;
  return 3;
}

export function CollageCreator() {
  const [slotCount, setSlotCount] = useState(4);
  const [slots, setSlots] = useState<Slot[]>(
    Array.from({ length: 4 }, (_, i) => ({ id: i, url: null }))
  );
  const [gap, setGap] = useState(8);
  const [downloading, setDownloading] = useState(false);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  function handleSlotCountChange(n: number) {
    setSlotCount(n);
    setSlots((prev) => Array.from({ length: n }, (_, i) => prev[i] ?? { id: i, url: null }));
  }

  function handleFileChange(id: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, url } : s)));
    };
    reader.readAsDataURL(file);
  }

  function handleRemove(id: number) {
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, url: null } : s)));
  }

  const filledCount = slots.filter((s) => s.url).length;
  const cols = gridColumns(slotCount);
  const rows = Math.ceil(slotCount / cols);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE;
    canvas.height = Math.round((CANVAS_SIZE / cols) * rows);
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#f0ede8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cellW = (canvas.width - gap * (cols + 1)) / cols;
    const cellH = (canvas.height - gap * (rows + 1)) / rows;

    await Promise.all(
      slots.map((slot, i) => {
        if (!slot.url) return Promise.resolve();
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = gap + col * (cellW + gap);
        const y = gap + row * (cellH + gap);

        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            const scale = Math.max(cellW / img.width, cellH / img.height);
            const drawW = img.width * scale;
            const drawH = img.height * scale;
            const offsetX = x - (drawW - cellW) / 2;
            const offsetY = y - (drawH - cellH) / 2;
            ctx.save();
            ctx.beginPath();
            ctx.rect(x, y, cellW, cellH);
            ctx.clip();
            ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
            ctx.restore();
            resolve();
          };
          img.src = slot.url as string;
        });
      })
    );

    const link = document.createElement("a");
    link.download = "hueflow-collage.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setDownloading(false);
  }, [slots, cols, rows, gap]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f0ede8] text-[#1c1712]">
      <Header />

      <main className="mx-auto w-full max-w-[860px] flex-1 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:pt-28">

        {/* ── Hero ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/40 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]" />Image Tool
          </span>
          <h1 className="mt-2.5 font-display text-[2.4rem] font-black leading-none tracking-[-0.04em] sm:text-[3.2rem]">
            Collage Creator
          </h1>
          <p className="mt-2 text-[14px] text-[#1c1712]/40">
            Combine up to 6 images into one collage and export as PNG.
          </p>
        </motion.div>

        {/* ── Controls Card ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-4 overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-sm">
          <div className="flex flex-wrap items-center gap-6 px-6 py-5">

            {/* Image count */}
            <div className="flex items-center gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/35">Images</p>
              <div className="flex gap-1.5">
                {[2, 3, 4, 5, 6].map((n) => (
                  <button key={n} onClick={() => handleSlotCountChange(n)}
                    className={`h-8 w-8 rounded-xl text-[12px] font-bold transition-all ${
                      slotCount === n
                        ? "bg-[#1c1712] text-white shadow-sm"
                        : "border border-black/[0.08] bg-[#faf7f2] text-[#1c1712]/50 hover:bg-[#f0ede8]"
                    }`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Gap slider */}
            <div className="flex flex-1 items-center gap-3">
              <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/35">Gap</p>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 right-0 my-auto h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
                  <div className="h-full rounded-full bg-[#1c1712]/20" style={{ width: `${(gap / 32) * 100}%` }} />
                </div>
                <input type="range" min={0} max={32} value={gap}
                  onChange={(e) => setGap(Number(e.target.value))}
                  className="relative h-4 w-full cursor-pointer opacity-0" />
              </div>
              <span className="w-7 text-right font-mono text-[11px] font-semibold text-[#1c1712]/40">{gap}px</span>
            </div>

            {/* Progress */}
            <div className="shrink-0 text-right">
              <span className={`text-[11px] font-bold ${filledCount === slotCount ? "text-green-600" : "text-[#1c1712]/35"}`}>
                {filledCount}/{slotCount} filled
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Collage Grid ── */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-4 overflow-hidden rounded-3xl border border-black/[0.08] bg-white p-3 shadow-sm">
          <div className="overflow-hidden rounded-2xl bg-[#faf7f2]"
            style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: `${gap}px`, padding: `${gap}px` }}>
            {slots.slice(0, slotCount).map((slot) => (
              <div key={slot.id}
                className="group relative aspect-square overflow-hidden rounded-xl border border-black/[0.06] bg-white">
                {slot.url ? (
                  <>
                    <img src={slot.url} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                    <button onClick={() => handleRemove(slot.id)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#1c1712]/60 shadow-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white hover:text-[#1c1712]">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </>
                ) : (
                  <button onClick={() => fileInputRefs.current[slot.id]?.click()}
                    className="flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-black/[0.10] transition-colors hover:border-[#e8531f]/40 hover:bg-[#e8531f]/[0.03]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-black/[0.08] bg-white shadow-sm">
                      <svg className="h-5 w-5 text-[#1c1712]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-semibold text-[#1c1712]/30">Add image</span>
                  </button>
                )}
                <input ref={(el) => { fileInputRefs.current[slot.id] = el; }}
                  type="file" accept="image/*"
                  onChange={(e) => handleFileChange(slot.id, e)}
                  className="hidden" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Download Button ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center justify-between rounded-3xl border border-black/[0.08] bg-white px-6 py-4 shadow-sm">
          <div>
            <p className="text-[13px] font-bold text-[#1c1712]">Ready to export</p>
            <p className="text-[11px] text-[#1c1712]/35">
              {filledCount === 0 ? "Add at least one image to download" : `${filledCount} image${filledCount > 1 ? "s" : ""} · PNG · 1200px wide`}
            </p>
          </div>
          <button onClick={handleDownload}
            disabled={filledCount === 0 || downloading}
            className="flex items-center gap-2 rounded-xl bg-[#e8531f] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(232,83,31,0.35)] transition hover:bg-[#c94518] disabled:cursor-not-allowed disabled:opacity-35">
            {downloading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Exporting…
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                </svg>
                Download PNG
              </>
            )}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
