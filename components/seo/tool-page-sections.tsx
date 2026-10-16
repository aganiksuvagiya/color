import Link from "next/link";

import type { ToolPageSeoConfig } from "@/lib/seo/tool-pages";

/** New coolors-style sections (white, hairline-separated, visible FAQ). Opt in with `variant="new"`. */
function ToolPageSectionsNew({ config }: { config: ToolPageSeoConfig }) {
  const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]";
  return (
    <div className="text-[#1c1712]">
      <section className="border-t border-black/[0.06]">
        <div className="grid w-full gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:px-12">
          <div>
            <p className={eyebrow}>Direct answer</p>
            <p className="hub-answer mt-3 text-[1.15rem] font-medium leading-8 tracking-[-0.01em]">{config.answer}</p>
            <p className="mt-4 text-[14px] leading-7 text-[#1c1712]/50">{config.audience}</p>
          </div>
          <div>
            <p className={eyebrow}>Best use cases</p>
            <ul className="mt-3 space-y-2.5 text-[14px] leading-6 text-[#1c1712]/65">
              {config.useCases.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c2410c]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <p className={eyebrow}>How to</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">How to use this tool</h2>
          <ol className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {config.howToSteps.map((step, i) => (
              <li key={step} className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                <span className="text-[12px] font-semibold text-[#c2410c]">0{i + 1}</span>
                <p className="mt-1.5 text-[14px] leading-6 text-[#1c1712]/65">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {config.explainer && config.explainer.length > 0 && (
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>Explained</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">{config.explainerHeading ?? "Understanding this tool"}</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {config.explainer.map((item) => (
                <div key={item.title} className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                  <h3 className="text-[15px] font-semibold">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-[#1c1712]/60">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-black/[0.06]">
        <div className="grid w-full gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:px-12">
          <div>
            <p className={eyebrow}>FAQ</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Frequently asked questions</h2>
            <div className="mt-6 divide-y divide-black/[0.08] border-y border-black/[0.08]">
              {config.faq.map((f, i) => (
                <details key={f.question} open={i === 0} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] font-semibold leading-6 outline-none transition hover:text-[#c2410c] focus-visible:text-[#c2410c] [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#1c1712]/55 ring-1 ring-black/[0.14] transition duration-200 group-open:rotate-45 group-open:bg-[#1c1712] group-open:text-white group-open:ring-[#1c1712]">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                        <path d="M6 1v10M1 6h10" />
                      </svg>
                    </span>
                  </summary>
                  <p className="-mt-1 max-w-3xl pb-6 pr-12 text-[15px] leading-7 text-[#1c1712]/65">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
          <div>
            <p className={eyebrow}>Related</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Related pages</h2>
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 sm:max-lg:[&>a:last-child:nth-child(odd)]:col-span-2 xl:[&>a:last-child:nth-child(odd)]:col-span-2">
              {config.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-[14px] font-semibold leading-5 text-[#1c1712]/85 ring-1 ring-black/[0.08] transition hover:bg-[#fafafa] hover:text-[#c2410c] hover:ring-black/25"
                >
                  {link.title}
                  <span className="shrink-0 text-[#1c1712]/40 transition group-hover:translate-x-0.5 group-hover:text-[#c2410c]" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ToolPageSections({ config, variant }: { config: ToolPageSeoConfig; variant?: "new" }) {
  if (variant === "new") return <ToolPageSectionsNew config={config} />;
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

      {/* Explainer */}
      {config.explainer && config.explainer.length > 0 && (
        <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_1px_6px_rgba(28,23,18,0.06)]">
          <h2 className="text-base font-bold tracking-[-0.02em] text-[#1c1712]">{config.explainerHeading ?? "Understanding this tool"}</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {config.explainer.map((item) => (
              <div key={item.title} className="rounded-xl border border-black/[0.06] bg-[#faf7f2] p-4">
                <p className="text-sm font-semibold text-[#1c1712]">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#1c1712]/55">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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
