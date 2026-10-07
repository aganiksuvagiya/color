"use client";

import Link from "next/link";

import { Header } from "@/components/header";
import { useCopy } from "@/components/seo/swatch-strip";

export type ChartColor = { name: string; slug: string; hex: string; rgb: string; hsl: string };
export type ChartFamily = { slug: string; name: string; colors: ChartColor[] };

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
  const all = families.flatMap((f) => f.colors);

  return (
    <main className="min-h-screen bg-[#f0ede8] text-[#1c1712]">
      <Header />
      <section className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 pt-28 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
            <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
            <span className="text-[#1c1712]/20">/</span>
            <span>Color Codes</span>
          </nav>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Color Codes Chart</h1>
          <p className="mt-3 text-[16px] text-[#1c1712]/50">{total} named colors with HEX, RGB and HSL codes - click any code to copy it.</p>
          <div className="mt-8 rounded-2xl border border-[#e8531f]/20 bg-[#e8531f]/[0.05] p-6">
            <p className="text-[15px] leading-8 text-[#1c1712]/75">{intro}</p>
          </div>
          {/* Jump links */}
          <div className="mt-8 flex flex-wrap gap-2">
            {families.map((f) => (
              <a
                key={f.slug}
                href={`#${f.slug}`}
                className="flex items-center gap-2 rounded-full border border-black/[0.1] py-1.5 pl-1.5 pr-3.5 text-[13px] text-[#1c1712]/70 transition hover:border-[#e8531f]/40 hover:text-[#e8531f]"
              >
                <span className="h-5 w-5 rounded-full border border-black/10" style={{ backgroundColor: f.colors[Math.floor(f.colors.length / 2)]?.hex }} />
                {f.name}
                <span className="text-[11px] text-[#1c1712]/35">{f.colors.length}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-6 px-6 py-10 lg:px-8">
        {families.map((f) => (
          <section key={f.slug} id={f.slug} className="scroll-mt-28 rounded-2xl bg-white p-6 sm:p-7">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-[18px] font-bold">{f.name} color codes</h2>
              <div className="flex gap-3 text-[13px]">
                <Link href={`/shades-of-${f.slug}`} className="text-[#1c1712]/55 transition hover:text-[#e8531f]">Shades of {f.name.toLowerCase()} →</Link>
                <Link href={`/color-palettes/${f.slug}`} className="text-[#1c1712]/55 transition hover:text-[#e8531f]">{f.name} palettes →</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {f.colors.map((c) => (
                <div key={c.slug} className="overflow-hidden rounded-xl border border-black/[0.08]">
                  <Link href={`/colors/${c.slug}`} className="block h-20" style={{ backgroundColor: c.hex }} aria-label={`${c.name} color page`}>
                    <span className="sr-only">{c.name}</span>
                  </Link>
                  <div className="px-3 py-2.5">
                    <Link href={`/colors/${c.slug}`} className="block truncate text-[13px] font-semibold hover:text-[#e8531f]">{c.name}</Link>
                    <button onClick={() => copy(c.hex)} className="font-mono text-[12px] uppercase text-[#1c1712]/55 hover:text-[#e8531f]" aria-label={`Copy ${c.hex}`}>
                      {copied === c.hex ? "✓ Copied" : c.hex}
                    </button>
                    <p className="font-mono text-[11px] text-[#1c1712]/40">{c.rgb.replace("rgb(", "").replace(")", "")}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Full table */}
        <section className="rounded-2xl bg-white p-6 sm:p-7">
          <h2 className="text-[18px] font-bold">All color codes: HEX, RGB and HSL</h2>
          <p className="mb-5 mt-1 text-[14px] text-[#1c1712]/50">The full list in one table - click a HEX, RGB or HSL value to copy it.</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-black/[0.08] text-[11px] uppercase tracking-[0.14em] text-[#1c1712]/40">
                  <th className="py-2 pr-4 font-semibold">Color</th>
                  <th className="py-2 pr-4 font-semibold">HEX</th>
                  <th className="py-2 pr-4 font-semibold">RGB</th>
                  <th className="py-2 font-semibold">HSL</th>
                </tr>
              </thead>
              <tbody>
                {all.map((c) => (
                  <tr key={c.slug} className="border-b border-black/[0.05] last:border-0">
                    <td className="py-2 pr-4">
                      <Link href={`/colors/${c.slug}`} className="flex items-center gap-2.5 hover:text-[#e8531f]">
                        <span className="h-5 w-5 shrink-0 rounded-md border border-black/10" style={{ backgroundColor: c.hex }} />
                        <span className="font-medium">{c.name}</span>
                      </Link>
                    </td>
                    {[c.hex, c.rgb, c.hsl].map((v) => (
                      <td key={v} className="py-2 pr-4">
                        <button onClick={() => copy(v)} className="font-mono text-[12px] text-[#1c1712]/60 hover:text-[#e8531f]">
                          {copied === v ? "✓ Copied" : v}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 sm:p-7">
          <h2 className="mb-4 text-[18px] font-bold">Color codes: FAQ</h2>
          <div className="divide-y divide-black/[0.07]">
            {faq.map((f) => (
              <details key={f.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold">
                  {f.question}
                  <span className="text-[#1c1712]/30 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2.5 text-[14px] leading-[1.75] text-[#1c1712]/60">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 sm:p-7">
          <h2 className="text-[18px] font-bold">Color tools</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {related.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-full border border-black/[0.1] px-3.5 py-1.5 text-[13px] text-[#1c1712]/70 transition hover:border-[#e8531f]/40 hover:text-[#e8531f]">
                {l.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

