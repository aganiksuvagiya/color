import Link from "next/link";

import { Header } from "@/components/header";
import { ConverterTool } from "@/components/seo/converter-tool";
import { Breadcrumbs, Dots, Faq, RelatedLinks, eyebrow } from "@/components/seo/page-ui";
import { converterPairs, getReverseConverter, type ConverterPair } from "@/lib/seo/converter-pages";

/** One "<format> to <format>" converter page: tool, worked example, sample table, FAQ and links to sibling converters. */
export function ConverterPairView({ pair }: { pair: ConverterPair }) {
  const reverse = getReverseConverter(pair);
  const others = converterPairs.filter((p) => p.slug !== pair.slug);
  const cssCapable = pair.to !== "cmyk";

  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header + tool ── */}
      <section className="w-full px-6 pb-12 pt-28 sm:px-8 lg:px-12">
        <Breadcrumbs
          items={[
            { title: "Home", href: "/" },
            { title: "Color Converter", href: "/color-converter" },
            { title: pair.h1, href: pair.path },
          ]}
        />
        <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">{pair.h1}</h1>
        <div className="mt-5 flex max-w-4xl flex-wrap items-start gap-3">
          <span className="mt-1.5"><Dots colors={["#3B82F6", "#E8531F", "#0F766E", "#7C3AED", "#FDE68A"]} /></span>
          <p className="hub-answer min-w-0 flex-1 basis-80 text-[16px] leading-7 text-[#1c1712]/60">
            <span className="font-semibold text-[#1c1712]/85">Free {pair.fromLabel} to {pair.toLabel} converter.</span> {pair.answer}
          </p>
        </div>

        <div className="mt-10">
          <ConverterTool from={pair.from} to={pair.to} initial={pair.exampleFrom} reverseHref={reverse?.path} examples={pair.samples.filter((s) => s.name !== "White").slice(0, 8).map((s) => ({ name: s.name, hex: s.hex }))} />
        </div>
      </section>

      {/* ── How to convert ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <p className={eyebrow}>The formula</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">How to convert {pair.fromLabel} to {pair.toLabel}</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#1c1712]/60">
            Worked example with {pair.exampleFrom} ({pair.exampleName}):
          </p>
          <ol className="mt-6 grid max-w-5xl gap-4">
            {pair.steps.map((step, i) => (
              <li key={i} className="flex gap-4 rounded-xl p-5 ring-1 ring-black/[0.07]">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1c1712] text-[12px] font-bold text-white">{i + 1}</span>
                <p className="min-w-0 text-[15px] leading-7 text-[#1c1712]/75">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-3xl text-[15px] font-semibold leading-7">
            Result: {pair.exampleFrom} = {pair.exampleTo}
          </p>

          {cssCapable && (
            <div className="mt-8 max-w-3xl min-w-0">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#1c1712]/45">Use it in CSS</p>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-[#1c1712] p-4 font-mono text-[13px] leading-6 text-white/90">
                <code>{`.button {\n  background-color: ${pair.exampleTo};\n}`}</code>
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* ── Sample table ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <p className={eyebrow}>Quick reference</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Common colors in {pair.fromLabel} and {pair.toLabel}</h2>
          <div className="mt-6 max-w-5xl overflow-x-auto rounded-2xl ring-1 ring-black/[0.07]">
            <table className="w-full min-w-[34rem] text-left text-[14px]">
              <thead>
                <tr className="border-b border-black/[0.07] bg-[#fafafa] text-[12px] uppercase tracking-[0.1em] text-[#1c1712]/50">
                  <th className="px-4 py-3 font-semibold">Color</th>
                  <th className="px-4 py-3 font-semibold">{pair.fromLabel}</th>
                  <th className="px-4 py-3 font-semibold">{pair.toLabel}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06]">
                {pair.samples.map((s) => (
                  <tr key={s.name}>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-3 font-medium">
                        <span className="h-5 w-5 shrink-0 rounded-full ring-1 ring-black/15" style={{ backgroundColor: s.hex }} aria-hidden="true" />
                        {s.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[13px] text-[#1c1712]/75">{s.from}</td>
                    <td className="px-4 py-3 font-mono text-[13px] text-[#1c1712]/75">{s.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <p className={eyebrow}>FAQ</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">{pair.fromLabel} to {pair.toLabel}: frequently asked questions</h2>
          <div className="mt-6 max-w-4xl">
            <Faq items={pair.faq} />
          </div>
        </div>
      </section>

      {/* ── More converters ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <p className={eyebrow}>More converters</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Other color code converters</h2>
          <div className="mt-6">
            <RelatedLinks
              links={[
                { title: "All-in-one color converter", href: "/color-converter" },
                ...others.map((p) => ({ title: p.h1, href: p.path })),
              ]}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-black/[0.06] bg-[#f5f5f5]">
        <div className="flex w-full flex-wrap items-center justify-between gap-6 px-6 py-14 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em]">Turn the color into a palette</h2>
            <p className="mt-2 text-[15px] leading-7 text-[#1c1712]/60">
              Open the HueFlow palette generator to build a full color scheme, then check text contrast and export CSS, Tailwind or JSON.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/generator" className="rounded-full bg-[#1c1712] px-7 py-3 text-[15px] font-semibold text-white transition hover:bg-[#c2410c]">Open the generator</Link>
            <Link href="/tools/contrast" className="rounded-full px-7 py-3 text-[15px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">Contrast checker</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
