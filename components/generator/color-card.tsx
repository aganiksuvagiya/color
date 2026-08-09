"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ColorPicker } from "./color-picker";
import type { PaletteColor } from "@/lib/types";

type Props = {
  color: PaletteColor;
  index: number;
  total: number;
  locked: boolean;
  dragging: boolean;
  dragOver: boolean;
  onColorChange: (hex: string) => void;
  onToggleLock: () => void;
  onDragStart: () => void;
  onDragOverIndex: (index: number) => void;
  onDragEnd: () => void;
};

export function ColorCard({ color, index, total, locked, dragging, dragOver, onColorChange, onToggleLock, onDragStart, onDragOverIndex, onDragEnd }: Props) {
  const [pickerOpen, setPickerOpen] = useState(false);

  function handlePointerDown(e: React.PointerEvent<HTMLSpanElement>) {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // pointer already released or invalid — safe to ignore
    }
    onDragStart();
  }

  function handlePointerMove(e: React.PointerEvent<HTMLSpanElement>) {
    const target = document.elementFromPoint(e.clientX, e.clientY);
    const cardEl = target?.closest<HTMLElement>("[data-card-index]");
    if (cardEl) onDragOverIndex(Number(cardEl.dataset.cardIndex));
  }

  function handlePointerUp(e: React.PointerEvent<HTMLSpanElement>) {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // already released — safe to ignore
    }
    onDragEnd();
  }

  return (
    <div data-card-index={index}>
    <motion.div
      layout
      animate={{ backgroundColor: color.hex, opacity: dragging ? 0.4 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex min-h-[300px] cursor-pointer flex-col justify-between rounded-[20px] p-4 sm:min-h-[340px] ${
        dragOver ? "ring-2 ring-white/60 ring-inset" : ""
      }`}
      onClick={() => setPickerOpen(!pickerOpen)}
    >
      {/* Top row: role + drag + lock */}
      <div className="flex items-start justify-between">
        <p className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${color.text === "light" ? "text-white/45" : "text-black/35"}`}>
          {color.role}
        </p>
        <div className="flex items-center gap-0.5">
          <span
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClick={(e) => e.stopPropagation()}
            style={{ touchAction: "none" }}
            className={`cursor-grab select-none rounded-lg p-1 active:cursor-grabbing ${color.text === "light" ? "text-white/25 hover:text-white/50" : "text-black/20 hover:text-black/40"}`}
            aria-label="Drag to reorder"
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="6" r="1.2" /><circle cx="15" cy="6" r="1.2" />
              <circle cx="9" cy="12" r="1.2" /><circle cx="15" cy="12" r="1.2" />
              <circle cx="9" cy="18" r="1.2" /><circle cx="15" cy="18" r="1.2" />
            </svg>
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleLock(); }}
            className={`rounded-lg p-1 transition-colors ${locked ? (color.text === "light" ? "bg-white/20 text-white" : "bg-black/15 text-black/70") : (color.text === "light" ? "text-white/25 hover:text-white/50" : "text-black/20 hover:text-black/40")}`}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {locked ? (
                <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>
              ) : (
                <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 019.9-1" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom: name + hex */}
      <div>
        <p className={`text-lg font-semibold tracking-[-0.03em] ${color.text === "light" ? "text-white" : "text-black/80"}`}>
          {color.name}
        </p>
        <p className={`mt-0.5 font-mono text-xs ${color.text === "light" ? "text-white/55" : "text-black/40"}`}>
          {color.hex}
        </p>
      </div>

      <AnimatePresence>
        {pickerOpen && (
          <ColorPicker
            hex={color.hex}
            onChange={onColorChange}
            onClose={() => setPickerOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
    </div>
  );
}
