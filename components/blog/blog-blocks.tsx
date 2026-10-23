"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { SwatchStrip, useCopy } from "@/components/seo/swatch-strip";
import { parseHex } from "@/lib/color-convert";
import { generatorHref } from "@/lib/palette-library";
import { contrastRatio } from "@/lib/pastel-colors";

const isLightHex = (hex: string) => {
  const c = parseHex(hex);
  return c ? (c.r * 299 + c.g * 587 + c.b * 114) / 1000 > 150 : true;
};

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-8 rounded-2xl bg-[#f5f5f5] p-5 sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c2410c]">{title}</p>
      <div className="mt-2 text-[15px] leading-7 text-[#1c1712]/75">{children}</div>
    </div>
  );
}

export type ColorOfYearRow = {
  brand: string;
  name: string;
  code: string;
  hex?: string;
  hexSource?: "official" | "database";
  announced: string;
  look: string;
};

export function ColorOfYearTable({ rows }: { rows: ColorOfYearRow[] }) {
  const { copied, copy } = useCopy();
  return (
    <div className="my-8 overflow-x-auto rounded-2xl ring-1 ring-black/[0.07]">
      <table className="w-full min-w-[46rem] text-left text-[14px]">
        <thead>
          <tr className="border-b border-black/[0.07] bg-[#fafafa] text-[12px] uppercase tracking-[0.1em] text-[#1c1712]/50">
            <th className="px-4 py-3 font-semibold">Brand</th>
            <th className="px-4 py-3 font-semibold">2027 color</th>
            <th className="px-4 py-3 font-semibold">HEX</th>
            <th className="px-4 py-3 font-semibold">Announced</th>
            <th className="px-4 py-3 font-semibold">The look</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/[0.06]">
          {rows.map((r) => (
            <tr key={r.brand} className="align-top">
              <td className="px-4 py-3 font-semibold">{r.brand}</td>
              <td className="px-4 py-3">
                <span className="flex items-start gap-3">
                  <span
                    className="mt-0.5 h-6 w-6 shrink-0 rounded-md ring-1 ring-black/15"
                    style={r.hex ? { backgroundColor: r.hex } : { background: "repeating-linear-gradient(45deg,#eee 0 4px,#fff 4px 8px)" }}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block font-medium">{r.name}</span>
                    <span className="block text-[12px] text-[#1c1712]/50">{r.code}</span>
                  </span>
                </span>
              </td>
              <td className="px-4 py-3">
                {r.hex ? (
                  <button onClick={() => copy(r.hex!)} className="font-mono text-[13px] font-semibold text-[#1c1712]/80 underline-offset-2 hover:underline" aria-label={`Copy ${r.hex}`}>
                    {copied === r.hex ? "Copied ✓" : r.hex}
                  </button>
                ) : (
                  <span className="text-[12px] text-[#1c1712]/45">No HEX published</span>
                )}
                {r.hex && <span className="block text-[11px] text-[#1c1712]/40">{r.hexSource === "official" ? "brand's own value" : "paint database match"}</span>}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-[#1c1712]/70">{r.announced}</td>
              <td className="px-4 py-3 text-[#1c1712]/70">{r.look}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Palette({ name, colors, note }: { name: string; colors: string[]; note?: string }) {
  const { copied, copy } = useCopy();
  return (
    <div className="min-w-0">
      <SwatchStrip colors={colors} height="h-20" copied={copied} onCopy={copy} className="rounded-xl ring-1 ring-black/[0.07]" />
      <div className="mt-2.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[15px] font-semibold">{name}</p>
          {note && <p className="mt-0.5 text-[13px] leading-5 text-[#1c1712]/55">{note}</p>}
          <p className="mt-1 truncate font-mono text-[11px] uppercase text-[#1c1712]/45">{colors.join(" · ")}</p>
        </div>
        {colors.length === 5 && (
          <Link href={generatorHref({ name, colors })} className="shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
            Open
          </Link>
        )}
      </div>
    </div>
  );
}

export function PaletteGrid({ children }: { children: ReactNode }) {
  return <div className="my-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">{children}</div>;
}

export type Pairing = { name: string; hex: string; why: string; bestFor: string };

/** A two-tone card: the base color and its partner, with the contrast between them. */
export function PairingCard({ base, pairing }: { base: string; pairing: Pairing }) {
  const { copied, copy } = useCopy();
  const a = parseHex(base)!;
  const b = parseHex(pairing.hex)!;
  const ratio = contrastRatio(a, b);
  const strength = ratio >= 7 ? "High contrast" : ratio >= 4.5 ? "Good contrast" : ratio >= 3 ? "Medium contrast" : "Low contrast";
  return (
    <div className="min-w-0 overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
      <div className="flex h-24">
        <div className="flex flex-1 items-end p-3" style={{ backgroundColor: base }}>
          <span className="text-[11px] font-semibold" style={{ color: pairing.hex }}>Aa</span>
        </div>
        <button
          onClick={() => copy(pairing.hex)}
          aria-label={`Copy ${pairing.name} ${pairing.hex}`}
          className="flex flex-1 items-end justify-end p-3"
          style={{ backgroundColor: pairing.hex, color: isLightHex(pairing.hex) ? "#1c1712" : "#ffffff" }}
        >
          <span className="font-mono text-[12px] font-semibold">{copied === pairing.hex ? "Copied ✓" : pairing.hex}</span>
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="text-[16px] font-semibold tracking-[-0.01em]">{pairing.name}</h4>
          <span className="shrink-0 text-[11px] font-semibold text-[#1c1712]/45" title="WCAG contrast ratio between the two colors">
            {strength} · {ratio.toFixed(1)}:1
          </span>
        </div>
        <p className="mt-1.5 text-[14px] leading-6 text-[#1c1712]/70">{pairing.why}</p>
        <p className="mt-2 text-[12px] font-medium text-[#1c1712]/50">Best for: {pairing.bestFor}</p>
      </div>
    </div>
  );
}

export function PairingGrid({ children }: { children: ReactNode }) {
  return <div className="my-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">{children}</div>;
}

/** Big color sample for a single pick: swatch, name, code and a line of facts. */
export function ColorFeature({ hex, name, code, facts }: { hex?: string; name: string; code: string; facts: string }) {
  const { copied, copy } = useCopy();
  return (
    <div className="my-6 flex min-w-0 items-stretch overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
      {hex ? (
        <button
          onClick={() => copy(hex)}
          aria-label={`Copy ${name} ${hex}`}
          className="flex w-28 shrink-0 items-end p-3 sm:w-40"
          style={{ backgroundColor: hex, color: isLightHex(hex) ? "#1c1712" : "#ffffff" }}
        >
          <span className="font-mono text-[12px] font-semibold">{copied === hex ? "Copied ✓" : hex}</span>
        </button>
      ) : (
        <div className="flex w-28 shrink-0 items-end p-3 text-[11px] text-[#1c1712]/50 sm:w-40" style={{ background: "repeating-linear-gradient(45deg,#eee 0 6px,#fff 6px 12px)" }}>
          No HEX published
        </div>
      )}
      <div className="min-w-0 p-4">
        <p className="text-[16px] font-semibold tracking-[-0.01em]">{name}</p>
        <p className="text-[12px] text-[#1c1712]/50">{code}</p>
        <p className="mt-2 text-[13px] leading-6 text-[#1c1712]/65">{facts}</p>
      </div>
    </div>
  );
}
