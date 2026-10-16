"use client";

import Link from "next/link";
import { useState } from "react";

import { findNamedColorByHex } from "@/lib/color-names";

/** Same hover pattern as the palette pages: the hovered color widens and a dark pill shows its HEX. */
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
    <div className="flex h-24 w-full overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
      {colors.map((hex, i) => {
        const copied = copiedHex === hex;
        // Only named colors have a /colors page - arbitrary hex slugs 404, so those
        // swatches fall back to copy-on-click instead of linking to a dead URL.
        const named = linkToColors ? findNamedColorByHex(hex) : undefined;
        const base = "group/swatch relative min-w-0 flex-1 transition-[flex] duration-300 hover:z-10 hover:flex-[2.4]";

        const pill = (
          <span className="absolute inset-x-0 bottom-2.5 flex justify-center">
            <span className="whitespace-nowrap rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] text-white opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100">
              {copied ? "✓ Copied" : hex.toUpperCase()}
            </span>
          </span>
        );

        if (named) {
          return (
            <Link key={`${hex}-${i}`} href={`/colors/${named.slug}`} className={base} style={{ backgroundColor: hex }} title={`${named.name} ${hex.toUpperCase()}`}>
              {pill}
            </Link>
          );
        }

        return (
          <button key={`${hex}-${i}`} onClick={() => copy(hex)} className={`${base} cursor-pointer`} style={{ backgroundColor: hex }} title={`Copy ${hex.toUpperCase()}`}>
            {pill}
          </button>
        );
      })}
    </div>
  );
}
