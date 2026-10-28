import Link from "next/link";

import { getContrastRatio } from "@/lib/accessibility";
import type { PalettePreviewCopy, PaletteRoles, ReadyPalette } from "@/lib/seo/content";
import { PaletteColorStrip } from "@/components/seo/palette-color-strip";

const defaultCopy: PalettePreviewCopy = {
  brand: "Your Brand",
  nav: ["Services", "About", "Contact"],
  badge: "New",
  headline: "A headline in your palette",
  body: "Body copy shows how readable the text color is on the background.",
  cta: "Get started",
  link: "Learn more",
  cardTitle: "Card title",
  cardBody: "Secondary surface with its own text color",
};

const roleJobs: { role: keyof PaletteRoles; label: string; job: string }[] = [
  { role: "primary", label: "Primary", job: "Buttons and links" },
  { role: "secondary", label: "Secondary", job: "Cards and sections" },
  { role: "accent", label: "Accent", job: "Badges and highlights" },
  { role: "background", label: "Background", job: "Page background" },
  { role: "text", label: "Text", job: "Headings and body text" },
];

/** Whichever of white, the palette's text color or its background reads best on a colored surface. */
function labelColor(surface: string, roles: PaletteRoles) {
  return ["#FFFFFF", roles.text, roles.background].reduce((best, candidate) =>
    getContrastRatio(surface, candidate) > getContrastRatio(surface, best) ? candidate : best,
  );
}

function wcagLevel(ratio: number) {
  if (ratio >= 7) return { label: "AAA", className: "bg-emerald-100 text-emerald-800" };
  if (ratio >= 4.5) return { label: "AA", className: "bg-emerald-50 text-emerald-700" };
  if (ratio >= 3) return { label: "AA large", className: "bg-amber-50 text-amber-800" };
  return { label: "Fail", className: "bg-red-50 text-red-700" };
}

function generatorHref(palette: ReadyPalette) {
  return `/generator?label=${encodeURIComponent(palette.name)}&c=${palette.colors.map((hex) => hex.slice(1).toLowerCase()).join("-")}`;
}

/**
 * A ready-to-use palette drawn as a small website (nav, hero, button, card) with every
 * color in its named role, plus the WCAG contrast of the pairs that carry text.
 */
export function IndustryPaletteCard({ palette, roles, copy = defaultCopy }: { palette: ReadyPalette; roles: PaletteRoles; copy?: PalettePreviewCopy }) {
  const buttonLabel = labelColor(roles.primary, roles);
  const badgeLabel = labelColor(roles.accent, roles);
  const cardLabel = labelColor(roles.secondary, roles);

  const checks = [
    { label: "Body text on background", ratio: getContrastRatio(roles.text, roles.background) },
    { label: "Button label on primary", ratio: getContrastRatio(buttonLabel, roles.primary) },
    { label: "Links on background", ratio: getContrastRatio(roles.primary, roles.background) },
  ];

  return (
    <div className="rounded-2xl p-5 ring-1 ring-black/[0.07] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <h3 className="text-[1.05rem] font-semibold">{palette.name}</h3>
          <p className="text-[14px] text-[#1c1712]/55">{palette.useCase}</p>
        </div>
        <Link
          href={generatorHref(palette)}
          className="shrink-0 rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]"
        >
          Open in generator →
        </Link>
      </div>

      <div className="mt-4">
        <PaletteColorStrip colors={palette.colors} />
      </div>
      <p className="mt-3 font-mono text-[12px] uppercase tracking-wide text-[#1c1712]/50">{palette.colors.join(" · ")}</p>

      <div
        role="img"
        aria-label={`Example website using the ${palette.name} palette`}
        className="mt-5 overflow-hidden rounded-xl ring-1 ring-black/[0.08]"
        style={{ backgroundColor: roles.background, color: roles.text }}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3" style={{ borderBottom: `1px solid ${roles.text}1f` }}>
          <span className="flex items-center gap-2 text-[13px] font-semibold">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: roles.primary }} />
            {copy.brand}
          </span>
          <span className="hidden gap-4 text-[12px] sm:flex">
            {copy.nav.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </span>
        </div>
        <div className="grid gap-5 p-5 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] sm:items-center">
          <div>
            <span className="inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ backgroundColor: roles.accent, color: badgeLabel }}>
              {copy.badge}
            </span>
            <p className="mt-3 text-[1.3rem] font-bold leading-tight tracking-[-0.02em]">{copy.headline}</p>
            <p className="mt-2 text-[13px] leading-5">{copy.body}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="rounded-lg px-3.5 py-2 text-[13px] font-semibold" style={{ backgroundColor: roles.primary, color: buttonLabel }}>
                {copy.cta}
              </span>
              <span className="text-[13px] font-semibold underline underline-offset-4" style={{ color: roles.primary }}>
                {copy.link}
              </span>
            </div>
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: roles.secondary, color: cardLabel }}>
            <p className="text-[13px] font-semibold">{copy.cardTitle}</p>
            <p className="mt-1 text-[12px] leading-5">{copy.cardBody}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <ul className="space-y-2">
          {roleJobs.map(({ role, label, job }) => (
            <li key={role} className="flex items-center gap-3 text-[13px]">
              <span className="h-5 w-5 shrink-0 rounded-md ring-1 ring-black/[0.1]" style={{ backgroundColor: roles[role] }} />
              <span className="w-20 shrink-0 font-semibold">{label}</span>
              <span className="font-mono text-[12px] uppercase text-[#1c1712]/55">{roles[role]}</span>
              <span className="min-w-0 truncate text-[#1c1712]/50">{job}</span>
            </li>
          ))}
        </ul>
        <ul className="space-y-2">
          {checks.map((check) => {
            const level = wcagLevel(check.ratio);
            return (
              <li key={check.label} className="flex items-center justify-between gap-3 text-[13px]">
                <span className="text-[#1c1712]/65">{check.label}</span>
                <span className="flex shrink-0 items-center gap-2">
                  {/* Rounded down so a 4.47:1 pair never shows as "4.5:1" next to a non-AA badge */}
                  <span className="font-mono text-[12px] text-[#1c1712]/70">{(Math.floor(check.ratio * 10) / 10).toFixed(1)}:1</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${level.className}`}>{level.label}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-4 text-[15px] leading-7 text-[#1c1712]/65">{palette.note}</p>
    </div>
  );
}
