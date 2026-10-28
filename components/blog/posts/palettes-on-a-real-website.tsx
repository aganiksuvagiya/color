import Link from "next/link";

import { Callout, Palette } from "@/components/blog/blog-blocks";
import { UIPreview } from "@/components/generator/ui-preview";
import type { Palette as GeneratorPalette } from "@/lib/types";

// A palette most readers will recognize (Tailwind-style 500s on a dark slate). Every
// contrast figure in the text is computed from these hex values.
const EXAMPLE: GeneratorPalette = {
  label: "Example palette",
  colors: [
    { name: "Blue", hex: "#3B82F6", role: "primary", text: "light" },
    { name: "Green", hex: "#22C55E", role: "success", text: "dark" },
    { name: "Yellow", hex: "#FACC15", role: "warning", text: "dark" },
    { name: "Purple", hex: "#A855F7", role: "accent", text: "light" },
    { name: "Slate", hex: "#0F172A", role: "neutral", text: "light" },
  ],
};

export function PalettesOnARealWebsitePost() {
  return (
    <>
      <p>
        Most palette tools show you five stripes of color. That&apos;s a good way to judge whether colors look nice together, and a poor way to judge whether they&apos;ll work. On a real page every color gets a job: one is the background, one carries the text, one fills the buttons, one marks the links. A palette can look perfect as stripes and still give you buttons nobody can read.
      </p>
      <p>
        HueFlow is built around that gap. Any palette can be previewed as a small working interface, with each color in a role and the WCAG contrast of the pairs that carry text worked out for you.
      </p>

      <h2 id="swatches">Five swatches hide the problem</h2>
      <p>Here is a palette that looks fine as swatches: a blue, a green, a yellow, a purple and a dark slate.</p>
      <Palette name="Example palette" note="Blue, green, yellow, purple and slate" colors={EXAMPLE.colors.map((c) => c.hex)} />
      <p>
        Now give each color a white label, the way most UI kits do. On the yellow (#FACC15) white text measures <strong>1.53:1</strong>, on the green (#22C55E) <strong>2.28:1</strong>, and on the blue (#3B82F6) <strong>3.68:1</strong>. WCAG asks for 4.5:1 for normal text, so all three fail, and only the blue passes even the 3:1 allowed for large text.
      </p>
      <p>
        The blue is the surprising one. #3B82F6 is one of the most common button colors on the web, and white is the default label for it, yet near-black text reads better: 5.13:1 against 3.68:1.
      </p>
      <p>
        The background changes the answer too. The same blue used as a link reaches 4.85:1 on the dark slate and passes. Put it on an off-white page (#F8FAFC) and it drops to 3.52:1 and fails. Nothing about five swatches tells you any of that.
      </p>

      <h2 id="preview">What the preview shows</h2>
      <p>This is the preview from the <Link href="/generator">generator</Link>, showing the same palette. It&apos;s the real component, so the numbers are computed live:</p>
      <div className="not-prose my-8">
        <UIPreview palette={EXAMPLE} />
      </div>
      <ul>
        <li><strong>Every color gets a role.</strong> The neutral is the page background; primary fills the header, the main button and the links; success, warning and accent fill badges and buttons.</li>
        <li><strong>Every label is readable if it can be.</strong> Each piece of text picks whichever of white, near-black or the palette&apos;s own dark color reads best on its surface. That&apos;s why the yellow and green buttons get dark labels.</li>
        <li><strong>Three checks sit under the preview:</strong> body text on the background, the label on the primary button, and links on the background, each with its ratio and WCAG level.</li>
      </ul>
      <p>
        The A11y panel goes further, with every color measured against white and black and a text sample on each. Below that, a color-blind view shows the palette as people with protanopia, deuteranopia or tritanopia might see it. That view is a simple matrix approximation: good for spotting two colors that collapse into one, not a clinical model.
      </p>
      <p>
        The same idea runs through the industry pages. <Link href="/best-colors-for/healthcare-websites">Healthcare website colors</Link>, for example, shows every palette as a small website (navigation, headline, button, link and card) with the job of each color and the contrast of each pair.
      </p>
      <Callout title="Try it">
        Open the <Link href="/generator">generator</Link>, press the space bar for a new palette, lock the colors you like and click Preview in the toolbar. When the three checks pass, export to Tailwind, CSS variables, SCSS, JSON, Figma tokens, Swift, Android, SVG, PNG, ASE or PDF. No account needed.
      </Callout>

      <h2 id="contrast">How the numbers are worked out</h2>
      <p>
        HueFlow uses the WCAG 2 contrast formula. Each color is turned into a relative luminance: the red, green and blue channels are converted from sRGB to linear light and weighted 0.2126, 0.7152 and 0.0722, because our eyes are far more sensitive to green than to blue. The contrast ratio is then (lighter + 0.05) / (darker + 0.05), which runs from 1:1 for two identical colors to 21:1 for black on white.
      </p>
      <p>
        WCAG level AA asks for at least 4.5:1 for normal text and 3:1 for large text and for UI parts such as icons and input borders. Level AAA asks for 7:1. The preview labels each pair AAA, AA, AA large or Fail.
      </p>
      <p>
        One small detail: ratios are rounded down to one decimal, never up. A pair at 4.47:1 fails AA, and showing it as &quot;4.5:1&quot; next to a Fail badge would look like a bug.
      </p>
      <p>
        WCAG 3 drafts are exploring a different contrast method (APCA) that weighs text size and polarity. Until it becomes the standard, WCAG 2 is what audits and laws refer to, so that&apos;s what HueFlow reports. You can check any pair yourself in the <Link href="/tools/contrast">contrast checker</Link>.
      </p>

      <h2 id="built">How it&apos;s built</h2>
      <ul>
        <li><strong>Next.js 16 on Cloudflare Workers.</strong> The site is a Next.js App Router app, deployed to Workers with OpenNext. Pages are prerendered at build time and cached as static files.</li>
        <li><strong>Color math with no dependencies.</strong> Conversions between HEX, RGB, HSL, CMYK and OKLCH, the contrast formula and the color-blind matrices are small, plain TypeScript functions. The same code runs on the server when a page is built and in your browser when you type into a <Link href="/hex-to-rgb">converter</Link>.</li>
        <li><strong>Pages only for real names.</strong> A page for every hex code would mean 16.7 million possible URLs, and the free Workers plan gives each request 10 ms of CPU. So <Link href="/colors">/colors</Link> has pages for the 140 CSS named colors, other hex URLs return a 404, and the converters handle any code you type.</li>
        <li><strong>No account wall.</strong> Every tool works without signing in.</li>
      </ul>

      <h2 id="next">What&apos;s next</h2>
      <p>
        The preview is a dashboard today. On the list: a landing-page layout, a light-background version, and a color-blind simulation that works in linear RGB instead of the current approximation. If there&apos;s something you want the preview to show, <Link href="/contact">tell us</Link>.
      </p>
    </>
  );
}
