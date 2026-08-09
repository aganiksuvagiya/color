"use client";

import Link from "next/link";
import { useState } from "react";

export function PaletteColorStrip({ colors, linkToColors }: { colors: string[]; linkToColors?: boolean }) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex.toUpperCase());
    } catch {
      const ta = document.createElement("textarea");
      ta.value = hex.toUpperCase();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="flex w-full overflow-hidden rounded-2xl ring-1 ring-inset ring-white/10">
      {colors.map((hex, i) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const light = (r * 299 + g * 587 + b * 114) / 1000 > 160;
        const copied = copiedHex === hex;
        const slug = hex.slice(1).toLowerCase();

        const inner = (
          <div className="flex h-20 flex-col items-center justify-center gap-0.5 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {copied ? (
              <p className={`text-[11px] font-semibold ${light ? "text-black/70" : "text-white/90"}`}>Copied!</p>
            ) : (
              <p className={`font-mono text-[11px] font-semibold uppercase truncate w-full text-center ${light ? "text-black/60" : "text-white/80"}`}>
                {hex.toUpperCase()}
              </p>
            )}
          </div>
        );

        const divider = i < colors.length - 1 && (
          <span className="absolute right-0 top-1/4 h-1/2 w-px bg-black/10" />
        );

        if (linkToColors) {
          return (
            <Link
              key={hex}
              href={`/colors/${slug}`}
              className="group relative flex-1 min-w-0"
              style={{ backgroundColor: hex }}
              title={hex.toUpperCase()}
            >
              {inner}
              {divider}
            </Link>
          );
        }

        return (
          <button
            key={hex}
            onClick={() => copy(hex)}
            className="group relative flex-1 min-w-0 cursor-pointer"
            style={{ backgroundColor: hex }}
            title={`Copy ${hex.toUpperCase()}`}
          >
            {inner}
            {divider}
          </button>
        );
      })}
    </div>
  );
}
