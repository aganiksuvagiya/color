"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Header } from "@/components/header";
import { CopyIcon, EyeIcon, SectionTitle, Segmented, isLight } from "@/components/seo/shades-page";
import { useCopy } from "@/components/seo/swatch-strip";

export type HubColor = { name: string; slug: string; hex: string; rgb: string; hsl: string };
export type HubFamily = { slug: string; name: string; hex: string; colors: HubColor[] };
type Format = "hex" | "rgb" | "hsl";

const FORMATS: { key: Format; label: string }[] = [
  { key: "hex", label: "HEX" },
  { key: "rgb", label: "RGB" },
  { key: "hsl", label: "HSL" },
];

const code = (c: HubColor, f: Format) => (f === "hex" ? c.hex : f === "rgb" ? c.rgb : c.hsl);

/** /colors: every named color, coolors-style, filterable by family. */
export function ColorsHubView({
  families,
  total,
  faq,
  related,
}: {
  families: HubFamily[];
  total: number;
  faq: { question: string; answer: string }[];
  related: { title: string; href: string }[];
}) {
  const { copied, copy } = useCopy();
  const [family, setFamily] = useState<string>("all");
  const [format, setFormat] = useState<Format>("hex");
  const [view, setView] = useState<"grid" | "list">("grid");

  // White backdrop around the floating header while the toolbar is stuck (same as the shades pages).
  const sentinel = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { rootMargin: "-87px 0px 0px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shown = family === "all" ? families : families.filter((f) => f.slug === family);
  const all = shown.flatMap((f) => f.colors);
  const active = families.find((f) => f.slug === family);
  const preview = families.map((f) => f.colors[Math.floor(f.colors.length / 2)]?.hex).filter(Boolean).slice(0, 6) as string[];

  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header ── */}
      <section className="w-full px-6 pb-10 pt-28 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
          <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
          <span className="text-[#1c1712]/20">/</span>
          <span className="text-[#1c1712]/60">Colors</span>
        </nav>
        <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Colors</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="flex -space-x-1.5" aria-hidden="true">
            {preview.map((hex) => (
              <span key={hex} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: hex }} />
            ))}
          </span>
          <p className="hub-description text-[16px] text-[#1c1712]/55">
            <span className="font-semibold text-[#1c1712]/80">{total} named colors</span> with HEX, RGB and HSL codes. Click to copy, or open any color for shades, palettes and meaning.
          </p>
        </div>

        {/* Family filter chips (filter in place, unlike the shades pages where they navigate) */}
        <div role="tablist" aria-label="Filter by color family" className="mt-8 flex flex-wrap gap-2">
          {[{ slug: "all", name: "All", hex: "", count: total }, ...families.map((f) => ({ slug: f.slug, name: f.name, hex: f.hex, count: f.colors.length }))].map((f) => {
            const on = family === f.slug;
            return (
              <button
                key={f.slug}
                role="tab"
                aria-selected={on}
                onClick={() => setFamily(f.slug)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${
                  on ? "bg-[#1c1712] text-white" : "bg-[#1c1712]/[0.04] text-[#1c1712]/65 hover:bg-[#1c1712]/[0.08] hover:text-[#1c1712]"
                }`}
              >
                {f.hex && <span className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/10" style={{ backgroundColor: f.hex }} />}
                {f.name}
                <span className={`text-[11px] ${on ? "text-white/60" : "text-[#1c1712]/35"}`}>{f.count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Explorer ── */}
      <section className="w-full px-6 pb-16 sm:px-8 lg:px-12">
        <div ref={sentinel} aria-hidden="true" className="h-px" />
        {stuck && <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-10 hidden h-[86px] bg-white lg:block" />}
        <div className="z-20 -mx-6 flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] bg-white px-6 py-3 sm:-mx-8 sm:px-8 lg:sticky lg:top-[86px] lg:-mx-12 lg:px-12">
          <p className="text-[13px] text-[#1c1712]/55">
            {active ? (
              <>
                {active.colors.length} {active.name.toLowerCase()} colors ·{" "}
                <Link href={`/shades-of-${active.slug}`} className="font-semibold text-[#c2410c] hover:underline">
                  See all shades of {active.name.toLowerCase()} →
                </Link>
              </>
            ) : (
              <>{total} colors in {families.length} families</>
            )}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Segmented label="Code format" value={format} onChange={setFormat} options={FORMATS} />
            <Segmented label="View" value={view} onChange={setView} options={[{ key: "grid", label: "Grid" }, { key: "list", label: "List" }]} />
          </div>
        </div>

        {/* Grid view, grouped by family (both views stay in the DOM for SEO) */}
        <div className={view === "grid" ? "" : "hidden"}>
          {shown.map((f) => (
            <div key={f.slug} className="mt-8">
              <h2 className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
                {f.name} colors <span className="font-medium normal-case tracking-normal text-[#1c1712]/30">{f.colors.length}</span>
                <span className="h-px flex-1 bg-black/[0.06]" />
                <Link href={`/shades-of-${f.slug}`} className="text-[12px] font-medium normal-case tracking-normal text-[#1c1712]/45 transition hover:text-[#c2410c]">
                  Shades of {f.name.toLowerCase()} →
                </Link>
              </h2>
              <ul className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {f.colors.map((c) => {
                  const value = code(c, format);
                  const done = copied === value;
                  return (
                    <li key={c.slug} className="group">
                      <button
                        onClick={() => copy(value)}
                        aria-label={`Copy ${c.name} ${value}`}
                        className="flex aspect-[3/1] w-full items-center justify-center rounded-lg ring-1 ring-inset ring-black/[0.06] transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_24px_-12px_rgba(28,23,18,0.4)]"
                        style={{ backgroundColor: c.hex }}
                      >
                        <span
                          className={`font-mono text-[13px] font-semibold tracking-wide transition-opacity duration-150 ${done ? "opacity-100" : "opacity-0 group-hover:opacity-100"} ${
                            isLight(c.hex) ? "text-black/70" : "text-white/90"
                          }`}
                        >
                          {done ? "✓ Copied" : format === "hex" ? c.hex.slice(1) : value}
                        </span>
                      </button>
                      <div className="mt-2 flex items-center justify-between gap-2 px-0.5">
                        <Link href={`/colors/${c.slug}`} className="truncate text-[13px] font-medium text-[#1c1712]/85 transition hover:text-[#c2410c]">
                          {c.name}
                        </Link>
                        <span className="flex shrink-0 items-center gap-2 text-[#1c1712]/35">
                          <button onClick={() => copy(value)} className="transition hover:text-[#1c1712]" aria-label={`Copy ${value}`} title={`Copy ${value}`}>
                            <CopyIcon />
                          </button>
                          <Link href={`/colors/${c.slug}`} className="transition hover:text-[#1c1712]" aria-label={`Open ${c.name}`} title={`Open ${c.name}`}>
                            <EyeIcon />
                          </Link>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* List view */}
        <div className={`mt-6 overflow-x-auto rounded-xl ring-1 ring-black/[0.07] ${view === "list" ? "" : "hidden"}`}>
          <table className="w-full min-w-[560px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-black/[0.06] text-[11px] uppercase tracking-[0.14em] text-[#1c1712]/40">
                <th className="px-5 py-3 font-semibold">Color</th>
                <th className="px-5 py-3 font-semibold">HEX</th>
                <th className="px-5 py-3 font-semibold">RGB</th>
                <th className="px-5 py-3 font-semibold">HSL</th>
              </tr>
            </thead>
            <tbody>
              {all.map((c) => (
                <tr key={c.slug} className="border-b border-black/[0.04] last:border-0">
                  <td className="px-5 py-2.5">
                    <Link href={`/colors/${c.slug}`} className="flex items-center gap-3 hover:text-[#c2410c]">
                      <span className="h-7 w-7 shrink-0 rounded-md ring-1 ring-inset ring-black/[0.08]" style={{ backgroundColor: c.hex }} />
                      <span className="font-medium">{c.name}</span>
                    </Link>
                  </td>
                  {(["hex", "rgb", "hsl"] as Format[]).map((f) => (
                    <td key={f} className="px-5 py-2.5">
                      <button onClick={() => copy(code(c, f))} className="font-mono text-[12px] text-[#1c1712]/60 transition hover:text-[#c2410c]">
                        {copied === code(c, f) ? "✓ Copied" : code(c, f)}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Guide + FAQ ── */}
      <section className="border-t border-black/[0.06]">
        <div className="grid w-full gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div>
            <SectionTitle eyebrow="Explore more" title="Go beyond a single color" />
            <p className="hub-answer mt-5 text-[15px] leading-8 text-[#1c1712]/65">
              Every color page maps a color to its meaning, accessibility, Tailwind and CSS values and matching palettes. Browse whole families of shades, pick a ready-made palette, or look up any code in the full chart.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {related.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-full px-3.5 py-1.5 text-[13px] text-[#1c1712]/70 ring-1 ring-black/[0.08] transition hover:text-[#c2410c] hover:ring-[#c2410c]/40">
                  {l.title} →
                </Link>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="FAQ" title="Questions about colors" />
            <div className="mt-5 divide-y divide-black/[0.07] border-y border-black/[0.07]">
              {faq.map((f) => (
                <details key={f.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold">
                    {f.question}
                    <span className="text-lg leading-none text-[#1c1712]/30 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2.5 text-[14px] leading-7 text-[#1c1712]/60">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
