"use client";

import Link from "next/link";
import { useState } from "react";

import { Header } from "@/components/header";
import { Breadcrumbs, Dots, Faq, SmallTitle, eyebrow } from "@/components/seo/page-ui";
import { useCopy } from "@/components/seo/swatch-strip";

export type ChartColor = { name: string; slug: string; hex: string; rgb: string; hsl: string; cmyk: string };
export type ChartFamily = { slug: string; name: string; colors: ChartColor[] };

// /color-codes is the code-table page (every format side by side); /colors is the visual
// browse hub with swatch cards. They used to show the same card grid and compete in search.
const CODE_COLUMNS: { key: "hex" | "rgb" | "hsl" | "cmyk"; label: string }[] = [
  { key: "hex", label: "HEX" },
  { key: "rgb", label: "RGB" },
  { key: "hsl", label: "HSL" },
  { key: "cmyk", label: "CMYK" },
];

const chipLink = "flex items-center gap-2 rounded-lg bg-[#1c1712]/[0.04] px-3 py-1.5 text-[13px] font-medium text-[#1c1712]/65 transition hover:bg-[#1c1712]/[0.08] hover:text-[#1c1712]";

export function ColorCodesView({
  families,
  total,
  intro,
  faq,
  related,
}: {
  families: ChartFamily[];
  total: number;
  intro: string;
  faq: { question: string; answer: string }[];
  related: { title: string; href: string }[];
}) {
  const { copied, copy } = useCopy();
  const [family, setFamily] = useState("all");
  const [search, setSearch] = useState("");

  const q = search.trim().toLowerCase();
  const shown = families
    .filter((f) => family === "all" || f.slug === family)
    .map((f) => ({ ...f, colors: f.colors.filter((c) => !q || c.name.toLowerCase().includes(q) || c.hex.toLowerCase().includes(q)) }))
    .filter((f) => f.colors.length > 0);
  const shownCount = shown.reduce((n, f) => n + f.colors.length, 0);
  const dots = families.map((f) => f.colors[Math.floor(f.colors.length / 2)]?.hex).filter(Boolean) as string[];

  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header ── */}
      <section className="w-full px-6 pb-10 pt-28 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: "Color Codes", href: "/color-codes" }]} />
        <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Color Codes</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Dots colors={dots} />
          <p className="hub-description text-[16px] text-[#1c1712]/55">
            <span className="font-semibold text-[#1c1712]/80">HEX, RGB, HSL and CMYK for {total} named colors.</span> Click any code to copy it.
          </p>
        </div>
        <p className="hub-answer mt-6 max-w-4xl text-[1.1rem] font-medium leading-8 tracking-[-0.01em] text-[#1c1712]/80">{intro}</p>
        <div role="group" aria-label="Filter by color family" className="mt-8 flex flex-wrap gap-2">
          {[{ slug: "all", name: "All", colors: families.flatMap((f) => f.colors) }, ...families].map((f) => (
            <button
              key={f.slug}
              onClick={() => setFamily(f.slug)}
              aria-pressed={family === f.slug}
              className={family === f.slug ? `${chipLink} bg-[#1c1712] text-white hover:bg-[#1c1712] hover:text-white` : chipLink}
            >
              {f.slug !== "all" && <span className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/10" style={{ backgroundColor: f.colors[Math.floor(f.colors.length / 2)]?.hex }} />}
              {f.name}
              <span className={family === f.slug ? "text-[12px] text-white/60" : "text-[12px] text-[#1c1712]/40"}>{f.colors.length}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Toolbar + chart ── */}
      <section className="border-t border-black/[0.06]">
        <div className="z-20 border-b border-black/[0.06] bg-white/95 backdrop-blur lg:sticky lg:top-[86px]">
          <div className="flex w-full flex-wrap items-center gap-3 px-6 py-4 sm:px-8 lg:px-12">
            <label className="relative block w-full sm:w-72">
              <span className="sr-only">Search colors</span>
              <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1c1712]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={`Search ${total} colors`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-full bg-white pl-10 pr-4 text-[14px] text-[#1c1712] outline-none ring-1 ring-black/[0.12] transition placeholder:text-[#1c1712]/40 focus:ring-2 focus:ring-[#1c1712]"
              />
            </label>
            <p className="text-[13px] text-[#1c1712]/50">{q || family !== "all" ? `${shownCount} of ${total} colors` : `${total} colors in ${families.length} families`}</p>
          </div>
        </div>

        <div className="w-full px-6 py-12 sm:px-8 lg:px-12">
          {shown.length === 0 ? (
            <p className="text-[15px] text-[#1c1712]/55">
              No colors match &ldquo;{search}&rdquo;.{" "}
              <button onClick={() => { setSearch(""); setFamily("all"); }} className="font-semibold text-[#c2410c] hover:underline">Show all colors</button>
            </p>
          ) : (
            <div className="overflow-x-auto rounded-2xl ring-1 ring-black/[0.07]">
              <table className="w-full min-w-[760px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-black/[0.07] bg-[#fafafa] text-[11px] uppercase tracking-[0.16em] text-[#1c1712]/45">
                    <th className="px-5 py-3 font-semibold">Color</th>
                    {CODE_COLUMNS.map((col) => (
                      <th key={col.key} className="px-5 py-3 font-semibold">{col.label}</th>
                    ))}
                  </tr>
                </thead>
                {shown.map((f) => (
                  <tbody key={f.slug} id={f.slug} className="scroll-mt-40">
                    <tr className="border-b border-black/[0.07] bg-[#fcfbf9]">
                      <th colSpan={CODE_COLUMNS.length + 1} scope="colgroup" className="px-5 py-3 text-left">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h2 className="text-[1.05rem] font-semibold tracking-[-0.01em]">{f.name} color codes</h2>
                          <div className="flex flex-wrap gap-2 text-[12px] font-semibold">
                            <Link href={`/shades-of-${f.slug}`} className="text-[#1c1712]/55 transition hover:text-[#c2410c]">Shades of {f.name.toLowerCase()} →</Link>
                            <Link href={`/color-palettes/${f.slug}`} className="text-[#1c1712]/55 transition hover:text-[#c2410c]">{f.name} palettes →</Link>
                          </div>
                        </div>
                      </th>
                    </tr>
                    {f.colors.map((c) => (
                      <tr key={c.slug} className="border-b border-black/[0.05] last:border-0 hover:bg-[#fafafa]">
                        <td className="px-5 py-2.5">
                          <Link href={`/colors/${c.slug}`} className="flex items-center gap-3 transition hover:text-[#c2410c]">
                            <span className="h-6 w-6 shrink-0 rounded-md ring-1 ring-black/10" style={{ backgroundColor: c.hex }} />
                            <span className="font-semibold">{c.name}</span>
                          </Link>
                        </td>
                        {CODE_COLUMNS.map((col) => {
                          const value = col.key === "hex" ? c.hex.toUpperCase() : c[col.key];
                          return (
                            <td key={col.key} className="px-5 py-2.5">
                              <button onClick={() => copy(value)} className="font-mono text-[12px] text-[#1c1712]/60 transition hover:text-[#c2410c]" aria-label={`Copy ${c.name} ${col.label} ${value}`}>
                                {copied === value ? "✓ Copied" : value}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ + tools ── */}
      <section className="border-t border-black/[0.06]">
        <div className="grid w-full gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:px-12">
          <div>
            <p className={eyebrow}>FAQ</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Color codes: FAQ</h2>
            <div className="mt-6">
              <Faq items={faq} />
            </div>
          </div>
          <div>
            <SmallTitle>Color tools</SmallTitle>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {related.map((l) => (
                <Link key={l.href} href={l.href} className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-[14px] font-semibold leading-5 text-[#1c1712]/85 ring-1 ring-black/[0.08] transition hover:bg-[#fafafa] hover:text-[#c2410c] hover:ring-black/25">
                  {l.title}
                  <span className="shrink-0 text-[#1c1712]/40 transition group-hover:translate-x-0.5 group-hover:text-[#c2410c]" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
