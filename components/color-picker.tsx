"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Header } from "./header";
import { hexToHsl, hslToHex, isValidHex } from "@/lib/color-utils";
import { findClosestColorName } from "@/lib/color-names";

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function generateShades(hex: string, count: number = 10): string[] {
  const { h, s } = hexToHsl(hex);
  const shades: string[] = [];
  for (let i = count; i >= 1; i--) {
    const l = Math.round((i / (count + 1)) * 50);
    shades.push(hslToHex(h, s, l));
  }
  return shades;
}

function generateTints(hex: string, count: number = 10): string[] {
  const { h, s } = hexToHsl(hex);
  const tints: string[] = [];
  for (let i = 1; i <= count; i++) {
    const l = Math.round(50 + (i / (count + 1)) * 50);
    tints.push(hslToHex(h, s, l));
  }
  return tints;
}

function getContrastColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

const cardClass =
  "rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/3 p-5 shadow-lg shadow-black/10 backdrop-blur-xl";

export function ColorPicker() {
  const [hex, setHex] = useState("#6366f1");
  const [inputValue, setInputValue] = useState("#6366f1");
  const [toast, setToast] = useState<string | null>(null);

  const colorName = findClosestColorName(hex);
  const hsl = hexToHsl(hex);
  const rgb = hexToRgb(hex);
  const shades = generateShades(hex);
  const tints = generateTints(hex);

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text);
      setToast("Copied!");
    },
    []
  );

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 1500);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleHexInput = (value: string) => {
    setInputValue(value);
    const normalized = value.startsWith("#") ? value : `#${value}`;
    if (isValidHex(normalized) && normalized.length === 7) {
      setHex(normalized);
    }
  };

  const handleColorInputChange = (value: string) => {
    setHex(value);
    setInputValue(value);
  };

  const selectColor = (newHex: string) => {
    setHex(newHex);
    setInputValue(newHex);
    copyToClipboard(newHex);
  };

  return (
    <div className="min-h-screen bg-[#160b05] text-white">
      <Header />

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#160b05] shadow-xl"
        >
          {toast}
        </motion.div>
      )}

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Title */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Color Picker
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
              Pick any color, explore its values, and discover shades & tints.
            </p>
          </div>

          {/* Picker + Info */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {/* Color Preview */}
            <div className={cardClass}>
              <div
                className="relative mb-4 flex h-52 items-center justify-center overflow-hidden rounded-xl"
                style={{ backgroundColor: hex }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: getContrastColor(hex) }}
                >
                  {colorName}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <label className="relative flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-white/10">
                  <input
                    type="color"
                    value={hex}
                    onChange={(e) => handleColorInputChange(e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                  <div
                    className="h-full w-full rounded-xl"
                    style={{ backgroundColor: hex }}
                  />
                </label>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleHexInput(e.target.value)}
                  placeholder="#000000"
                  spellCheck={false}
                  className="h-12 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 font-mono text-sm text-white placeholder-white/30 outline-none transition focus:border-white/25"
                />
              </div>
            </div>

            {/* Color Values */}
            <div className={cardClass}>
              <h2 className="mb-4 text-lg font-semibold text-white/80">
                Color Values
              </h2>

              <div className="space-y-3">
                <ValueRow
                  label="HEX"
                  value={hex.toUpperCase()}
                  onCopy={copyToClipboard}
                />
                <ValueRow
                  label="RGB"
                  value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                  onCopy={copyToClipboard}
                />
                <ValueRow
                  label="HSL"
                  value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                  onCopy={copyToClipboard}
                />
                <ValueRow
                  label="Name"
                  value={colorName}
                  onCopy={copyToClipboard}
                />
              </div>
            </div>
          </div>

          {/* Shades */}
          <div className={`${cardClass} mb-6`}>
            <h2 className="mb-4 text-lg font-semibold text-white/80">
              Shades
            </h2>
            <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
              {shades.map((shade, i) => (
                <SwatchButton
                  key={`shade-${i}`}
                  color={shade}
                  onClick={() => selectColor(shade)}
                />
              ))}
            </div>
          </div>

          {/* Tints */}
          <div className={cardClass}>
            <h2 className="mb-4 text-lg font-semibold text-white/80">
              Tints
            </h2>
            <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
              {tints.map((tint, i) => (
                <SwatchButton
                  key={`tint-${i}`}
                  color={tint}
                  onClick={() => selectColor(tint)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

/* ───── Sub-components ───── */

function ValueRow({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
      <span className="text-sm font-medium text-white/50">{label}</span>
      <button
        onClick={() => onCopy(value)}
        className="flex items-center gap-2 font-mono text-sm text-white transition hover:text-white/70"
      >
        {value}
        <CopyIcon />
      </button>
    </div>
  );
}

function SwatchButton({
  color,
  onClick,
}: {
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={color}
      className="group flex flex-col items-center gap-1.5"
    >
      <div
        className="aspect-square w-full rounded-lg border border-white/10 transition group-hover:scale-110 group-hover:border-white/30"
        style={{ backgroundColor: color }}
      />
      <span className="text-[10px] font-mono text-white/40 group-hover:text-white/70">
        {color.toUpperCase()}
      </span>
    </button>
  );
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 opacity-50"
    >
      <rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
