"use client";

import { useState } from "react";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}

/** Copy-to-clipboard with a short-lived "copied" marker keyed by the copied value. */
export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (value: string) => {
    void copyText(value);
    setCopied(value);
    setTimeout(() => setCopied((c) => (c === value ? null : c)), 1500);
  };
  return { copied, copy };
}

/** Palettes-page swatch pattern: hovered color widens, dark pill shows the hex. */
export function SwatchStrip({
  colors,
  height = "h-32",
  copied,
  onCopy,
  className = "rounded-2xl border border-black/[0.08] shadow-sm",
}: {
  colors: string[];
  height?: string;
  copied: string | null;
  onCopy: (hex: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex ${height} w-full overflow-hidden ${className}`}>
      {colors.map((hex, i) => (
        <div key={`${hex}-${i}`} className="group/swatch relative flex-1 transition-[flex] duration-300 hover:flex-[3]" style={{ backgroundColor: hex }}>
          <button onClick={() => onCopy(hex.toUpperCase())} className="absolute inset-0 flex items-end justify-center pb-2.5" aria-label={`Copy ${hex.toUpperCase()}`}>
            <span className="rounded-full bg-black/55 px-2.5 py-1 font-mono text-[9px] text-white opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100">
              {copied === hex.toUpperCase() ? "✓ Copied" : hex.toUpperCase()}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
