"use client";

import { SwatchStrip, useCopy } from "@/components/seo/swatch-strip";

/** Shades / tints / tones rows for a color page; every swatch copies its hex on click. */
export function ColorVariations({ rows }: { rows: { label: string; note: string; colors: string[] }[] }) {
  const { copied, copy } = useCopy();

  return (
    <div className="mt-8 space-y-8">
      {rows.map((row) => (
        <div key={row.label}>
          <h3 className="text-[1.05rem] font-semibold">
            {row.label} <span className="text-[14px] font-normal text-[#1c1712]/50">{row.note}</span>
          </h3>
          <SwatchStrip
            colors={row.colors}
            height="h-20"
            copied={copied}
            onCopy={copy}
            className="mt-3 rounded-xl ring-1 ring-black/[0.07]"
          />
          <p className="mt-2 font-mono text-[11px] uppercase leading-5 tracking-wide text-[#1c1712]/45">{row.colors.join(" · ")}</p>
        </div>
      ))}
    </div>
  );
}
