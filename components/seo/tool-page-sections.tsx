import Link from "next/link";

import type { ToolPageSeoConfig } from "@/lib/seo/tool-pages";

export function ToolPageSections({ config }: { config: ToolPageSeoConfig }) {
  return (
    <section className="mt-10 space-y-5">
      {/* Direct answer */}
      <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_1px_6px_rgba(28,23,18,0.06)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e8531f]">Direct answer</p>
        <p className="mt-3 text-sm leading-7 text-[#1c1712]/70">{config.answer}</p>
        <p className="mt-4 text-sm text-[#1c1712]/45">{config.audience}</p>
      </div>

      {/* Use cases + How to */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_1px_6px_rgba(28,23,18,0.06)]">
          <h2 className="text-base font-bold tracking-[-0.02em] text-[#1c1712]">Best use cases</h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-7 text-[#1c1712]/60">
            {config.useCases.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8531f]/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_1px_6px_rgba(28,23,18,0.06)]">
          <h2 className="text-base font-bold tracking-[-0.02em] text-[#1c1712]">How to use this tool</h2>
          <ol className="mt-4 space-y-2.5 text-sm leading-7 text-[#1c1712]/60">
            {config.howToSteps.map((step, index) => (
              <li key={step} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1c1712]/[0.07] text-[10px] font-bold text-[#1c1712]/50">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* How we structure */}
      <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_1px_6px_rgba(28,23,18,0.06)]">
        <h2 className="text-base font-bold tracking-[-0.02em] text-[#1c1712]">How we structure these pages</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-black/[0.06] bg-[#faf7f2] p-4">
            <p className="text-sm font-semibold text-[#1c1712]">Clear answers first</p>
            <p className="mt-2 text-sm leading-6 text-[#1c1712]/55">
              Every page leads with a direct answer — no preamble, no filler. Get what you need without scrolling through editorial context.
            </p>
          </div>
          <div className="rounded-xl border border-black/[0.06] bg-[#faf7f2] p-4">
            <p className="text-sm font-semibold text-[#1c1712]">Grouped by topic</p>
            <p className="mt-2 text-sm leading-6 text-[#1c1712]/55">
              Content is organized into concise, scannable sections so you can jump to exactly the guidance you need.
            </p>
          </div>
          <div className="rounded-xl border border-black/[0.06] bg-[#faf7f2] p-4">
            <p className="text-sm font-semibold text-[#1c1712]">Linked to tools</p>
            <p className="mt-2 text-sm leading-6 text-[#1c1712]/55">
              Each page connects to related tools, palettes, and implementation resources so you can act on what you learn immediately.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_1px_6px_rgba(28,23,18,0.06)]">
        <h2 className="text-base font-bold tracking-[-0.02em] text-[#1c1712]">FAQ</h2>
        <div className="mt-4 space-y-3">
          {config.faq.map((item) => (
            <div key={item.question} className="rounded-xl border border-black/[0.06] bg-[#faf7f2] p-4">
              <h3 className="text-sm font-semibold text-[#1c1712]">{item.question}</h3>
              <p className="mt-2 text-sm leading-7 text-[#1c1712]/55">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related pages */}
      <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_1px_6px_rgba(28,23,18,0.06)]">
        <h2 className="text-base font-bold tracking-[-0.02em] text-[#1c1712]">Related pages</h2>
        <div className="mt-4 grid grid-cols-1 gap-2.5 md:grid-cols-2">
          {config.relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between rounded-xl border border-black/[0.08] bg-[#faf7f2] px-4 py-3 text-sm font-medium text-[#1c1712]/60 transition-all hover:border-black/14 hover:bg-[#f0ebe4] hover:text-[#1c1712]"
            >
              {link.title}
              <span className="text-[#1c1712]/30">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
