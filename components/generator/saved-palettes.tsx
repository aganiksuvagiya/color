"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Palette } from "@/lib/types";
import type { SavedPalette } from "@/lib/storage";

type Props = {
  palettes: SavedPalette[];
  onLoad: (palette: Palette) => void;
  onDelete: (id: string) => void;
};

export function SavedPalettes({ palettes, onLoad, onDelete }: Props) {
  if (palettes.length === 0) {
    return (
      <div className="rounded-2xl border border-black/[0.08] bg-white p-8 text-center shadow-[0_1px_6px_rgba(28,23,18,0.06)]">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1c1712]/[0.05]">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-[#1c1712]/25">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
            <path d="M17 21v-8H7v8M7 3v5h8" />
          </svg>
        </div>
        <p className="text-sm text-[#1c1712]/35">No saved palettes yet. Generate one and hit Save.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1c1712]/[0.06]">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[#1c1712]/45">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-[#1c1712]/55">Saved palettes ({palettes.length})</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <AnimatePresence>
          {palettes.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group rounded-2xl border border-black/[0.08] bg-white p-4 shadow-[0_1px_6px_rgba(28,23,18,0.06)] transition-shadow hover:shadow-[0_4px_16px_rgba(28,23,18,0.10)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-[#1c1712]/70">{p.label}</p>
                <p className="text-[10px] text-[#1c1712]/30">
                  {new Date(p.savedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mb-4 flex gap-1 overflow-hidden rounded-xl">
                {p.colors.map((c, i) => (
                  <div
                    key={i}
                    className="h-10 flex-1 transition-transform hover:scale-y-110"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onLoad(p)}
                  className="flex-1 rounded-xl border border-black/[0.08] bg-[#faf7f2] px-3 py-2 text-xs font-medium text-[#1c1712]/60 transition-all hover:bg-[#f0ebe4] hover:text-[#1c1712]"
                >
                  Load
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="rounded-xl border border-red-200/60 bg-red-50/60 px-3 py-2 text-xs font-medium text-red-500/70 transition-all hover:bg-red-50 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
