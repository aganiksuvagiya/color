import Link from "next/link";

import { getContrastRatio } from "@/lib/accessibility";
import type { PairColorBlindCheck, PairVisionRow } from "@/lib/seo/pair-colorblind";

// "How X and Y look with color blindness" on /color-combinations pages. Everything is
// computed when the page is built (lib/seo/pair-colorblind.ts); nothing runs in the browser.

const ink = (hex: string) => (getContrastRatio("#FFFFFF", hex) >= getContrastRatio("#1C1712", hex) ? "#FFFFFF" : "#1C1712");

const pill: Record<PairVisionRow["verdict"], { text: string; className: string }> = {
  reference: { text: "Reference", className: "bg-[#1c1712]/[0.05] text-[#1c1712]/60" },
  easy: { text: "Easy to tell apart", className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20" },
  closer: { text: "Closer, still distinct", className: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/25" },
  hard: { text: "Hard to tell apart", className: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20" },
};

const list = (items: string[]) => (items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);

function summary({ a, b, rows }: PairColorBlindCheck) {
  const [normal, ...sims] = rows;
  const pair = `${a.name.toLowerCase()} ${a.hex} and ${b.name.toLowerCase()} ${b.hex}`;
  const Pair = pair.charAt(0).toUpperCase() + pair.slice(1);
  const hard = sims.filter((r) => r.verdict === "hard");
  const closer = sims.filter((r) => r.verdict === "closer");

  if (hard.length) {
    const worst = hard.reduce((m, r) => (r.difference < m.difference ? r : m));
    const also = closer.length ? ` With ${list(closer.map((r) => r.label.toLowerCase()))} they get close too (ΔE ${list(closer.map((r) => String(r.difference)))}).` : "";
    return `To someone with ${list(hard.map((r) => r.label.toLowerCase()))}, ${pair} look like ${worst.a} and ${worst.b}, only ΔE ${worst.difference} apart (${normal.difference} with normal vision).${also} Don't let this pair carry meaning on its own, as in a chart or a success and error message: make one color clearly lighter than the other, or add a label or an icon.`;
  }
  if (closer.length) {
    return `${Pair} stay distinct in all three simulations, but ${list(closer.map((r) => r.label.toLowerCase()))} ${closer.length > 1 ? "bring" : "brings"} them much closer: ΔE ${list(closer.map((r) => String(r.difference)))}, down from ${normal.difference}. That's fine for decoration. Where the two colors mean different things, add a label or make one clearly lighter.`;
  }
  const worst = sims.reduce((m, r) => (r.difference < m.difference ? r : m));
  return `${Pair} stay easy to tell apart in all three simulations. They come closest in the ${worst.label.toLowerCase()} simulation, at ΔE ${worst.difference} (${normal.difference} with normal vision).`;
}

function Dot({ hex }: { hex: string }) {
  return <span className="h-4 w-4 rounded-full ring-2 ring-white" style={{ backgroundColor: hex }} />;
}

export function PairColorBlindSection({ check, headingClassName }: { check: PairColorBlindCheck; headingClassName: string }) {
  const { a, b, rows, palettes } = check;
  const clean = palettes.filter((p) => p.clashes.length === 0).length;
  const flagged = palettes.filter((p) => p.clashes.length > 0);

  return (
    <>
      <h2 className={headingClassName}>
        How {a.name} and {b.name} Look with Color Blindness
      </h2>
      <p className="mt-4 text-[16px] leading-8 text-[#1c1712]/70">{summary(check)}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.key} className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
            <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-4">
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold">{row.label}</h3>
                <p className="text-[13px] text-[#1c1712]/60">{row.desc}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${pill[row.verdict].className}`}>{pill[row.verdict].text}</span>
            </div>
            <div className="flex h-20">
              {[row.a, row.b].map((hex, i) => (
                <div key={i} className="flex flex-1 items-end px-3 pb-2" style={{ backgroundColor: hex }}>
                  <span className="font-mono text-[12px] font-semibold" style={{ color: ink(hex) }}>{hex}</span>
                </div>
              ))}
            </div>
            <p className="px-4 py-2.5 text-[13px] text-[#1c1712]/60">
              Difference: <span className="font-semibold text-[#1c1712]">ΔE {row.difference}</span>
            </p>
          </div>
        ))}
      </div>

      {palettes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-[1.05rem] font-semibold">The {palettes.length} palettes on this page</h3>
          <p className="mt-2 text-[15px] leading-7 text-[#1c1712]/65">
            {clean === palettes.length
              ? `All ${palettes.length} pass: no two colors that look clearly different with normal vision run together in any of the three simulations.`
              : `${clean} of ${palettes.length} pass. In the others, these colors look clearly different with normal vision (ΔE 40 or more) but drop under ΔE 20 in a simulation:`}
          </p>
          {flagged.length > 0 && (
            <ul className="mt-4 space-y-3">
              {flagged.map((palette) => (
                <li key={palette.name} className="rounded-2xl px-4 py-3 ring-1 ring-black/[0.07]">
                  <p className="text-[15px] font-semibold">{palette.name}</p>
                  <ul className="mt-1.5 space-y-1.5">
                    {palette.clashes.map((clash) => (
                      <li key={`${clash.a}-${clash.b}`} className="flex items-center gap-2 text-[14px] text-[#1c1712]/70">
                        <span className="flex shrink-0 -space-x-1" aria-hidden="true">
                          <Dot hex={clash.a} />
                          <Dot hex={clash.b} />
                        </span>
                        <span className="min-w-0">
                          <span className="font-mono text-[13px]">{clash.a}</span> and <span className="font-mono text-[13px]">{clash.b}</span> look alike to someone with{" "}
                          {list(clash.types.map((t) => t.toLowerCase()))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className="mt-6 text-[14px] leading-6 text-[#1c1712]/60">
        How this is checked: the Machado, Oliveira and Fernandes (2009) simulation of full color blindness, run on the CSS named colors {a.name.toLowerCase()} {a.hex} and{" "}
        {b.name.toLowerCase()} {b.hex}. ΔE is the CIE76 color difference; under 20, two colors are easy to mix up in a chart or a legend. People with a milder form see something
        between normal vision and these simulations.{" "}
        <Link prefetch={false} href="/tools/colorblind-simulator" className="font-semibold text-[#c2410c] underline-offset-4 hover:underline">
          Check your own colors in the colorblind simulator
        </Link>
        .
      </p>
    </>
  );
}
