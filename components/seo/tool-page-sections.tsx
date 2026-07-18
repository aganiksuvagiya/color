import Link from "next/link";

import type { ToolPageSeoConfig } from "@/lib/seo/tool-pages";

export function ToolPageSections({ config }: { config: ToolPageSeoConfig }) {
  return (
    <section className="mt-10 space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">Direct answer</p>
        <p className="mt-3 text-sm leading-7 text-white/78">{config.answer}</p>
        <p className="mt-4 text-sm text-white/45">{config.audience}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Best use cases</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-white/72">
            {config.useCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">How to use this tool</h2>
          <ol className="mt-4 space-y-3 text-sm leading-7 text-white/72">
            {config.howToSteps.map((step, index) => (
              <li key={step}>
                {index + 1}. {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">SEO, GEO, and LLM retrieval notes</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-black/20 p-4">
            <p className="text-sm font-medium text-white">SEO</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Searchers need clear intent match, readable guidance, and supportive internal links around accessibility, brand colors, and implementation.
            </p>
          </div>
          <div className="rounded-xl bg-black/20 p-4">
            <p className="text-sm font-medium text-white">GEO/AEO</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Answer-first blocks, concise steps, and FAQ formatting improve retrieval quality for AI overviews and answer engines.
            </p>
          </div>
          <div className="rounded-xl bg-black/20 p-4">
            <p className="text-sm font-medium text-white">LLM visibility</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Structured summaries and related entities help models understand when this tool fits product UI, marketing pages, and brand system work.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">FAQ</h2>
        <div className="mt-5 space-y-4">
          {config.faq.map((item) => (
            <div key={item.question} className="rounded-xl bg-black/20 p-4">
              <h3 className="text-base font-semibold text-white">{item.question}</h3>
              <p className="mt-2 text-sm leading-7 text-white/65">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Related pages</h2>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {config.relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/72 transition-colors hover:bg-black/30 hover:text-white"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
