"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { toolPageContent } from "@/lib/seo/tool-pages";

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

  const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      <main>
        {/* ── Header ── */}
        <section className="w-full px-6 pb-8 pt-28 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
            <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
            <span className="text-[#1c1712]/20">/</span>
            <Link href="/tools" className="transition hover:text-[#1c1712]/70">Tools</Link>
            <span className="text-[#1c1712]/20">/</span>
            <span className="text-[#1c1712]/60">Collage Creator</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Collage Creator</h1>
          <p className="mt-5 text-[16px] text-[#1c1712]/55">
            <span className="font-semibold text-[#1c1712]/80">Combine up to 6 images into one collage.</span> Add your photos, set the gap and export a PNG. Images stay in your browser.
          </p>
        </section>

        {/* ── Workspace ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1fr_320px] lg:px-12">
            {/* Collage grid */}
            <div className="mx-auto h-fit w-full max-w-[600px] overflow-hidden rounded-2xl bg-[#F5F5F5] ring-1 ring-black/[0.07]">
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: `${gap}px`, padding: `${gap}px` }}>
                {slots.slice(0, slotCount).map((slot) => (
                  <div key={slot.id} className="group relative aspect-square overflow-hidden rounded-xl bg-white ring-1 ring-black/[0.07]">
                    {slot.url ? (
                      <>
                        <img src={slot.url} alt={`Collage image ${slot.id + 1}`} className="h-full w-full object-cover" />
                        <button
                          onClick={() => handleRemove(slot.id)}
                          aria-label={`Remove image ${slot.id + 1}`}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#1c1712]/70 opacity-0 shadow-sm transition-opacity hover:text-[#1c1712] group-hover:opacity-100 focus:opacity-100"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => fileInputRefs.current[slot.id]?.click()}
                        className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-[#1c1712]/45 transition hover:bg-[#1c1712]/[0.03] hover:text-[#1c1712]"
                      >
                        <span className="text-2xl font-light leading-none">+</span>
                        <span className="text-[12px] font-semibold">Add image</span>
                      </button>
                    )}
                    <input
                      ref={(el) => { fileInputRefs.current[slot.id] = el; }}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(slot.id, e)}
                      className="hidden"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <aside className="h-fit space-y-6 rounded-2xl p-6 ring-1 ring-black/[0.07]">
              <div>
                <p className={label}>Images</p>
                <div role="tablist" aria-label="Number of images" className="mt-3 flex gap-2">
                  {[2, 3, 4, 5, 6].map((n) => {
                    const on = slotCount === n;
                    return (
                      <button
                        key={n}
                        role="tab"
                        aria-selected={on}
                        onClick={() => handleSlotCountChange(n)}
                        className={`h-9 w-9 rounded-full text-[13px] font-semibold transition ${
                          on ? "bg-[#1c1712] text-white" : "bg-white text-[#1c1712]/60 ring-1 ring-black/[0.1] hover:text-[#1c1712] hover:ring-black/20"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="collage-gap" className={label}>Gap</label>
                  <span className="font-mono text-[12px] font-semibold text-[#1c1712]/60">{gap}px</span>
                </div>
                <input
                  id="collage-gap"
                  type="range"
                  min={0}
                  max={32}
                  value={gap}
                  onChange={(e) => setGap(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer accent-[#1c1712]"
                />
              </div>

              <div>
                <p className={label}>Progress</p>
                <p className="mt-2 text-[14px] font-semibold">
                  <span className={filledCount === slotCount ? "text-emerald-600" : ""}>{filledCount}/{slotCount} filled</span>
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                  <div className="h-full rounded-full bg-[#1c1712] transition-all" style={{ width: `${(filledCount / slotCount) * 100}%` }} />
                </div>
              </div>

              <div className="border-t border-black/[0.07] pt-6">
                <p className="text-[13px] text-[#1c1712]/55">
                  {filledCount === 0 ? "Add at least one image to download." : `${filledCount} image${filledCount > 1 ? "s" : ""} · PNG · 1200px wide`}
                </p>
                <button
                  onClick={handleDownload}
                  disabled={filledCount === 0 || downloading}
                  className="mt-3 w-full rounded-full bg-[#1c1712] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#c2410c] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#1c1712]"
                >
                  {downloading ? "Exporting…" : "Download PNG"}
                </button>
              </div>
            </aside>
          </div>
        </section>

        <ToolPageSections config={toolPageContent.collage} variant="new" />
      </main>
    </div>
  );
}
