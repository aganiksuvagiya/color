import { blogPath, blogPosts } from "@/lib/blog/posts";
import { clusterIdeas } from "@/lib/seo/content";
import { converterPairs } from "@/lib/seo/converter-pages";
import { siteConfig } from "@/lib/seo/site-config";
import { toolPageContent } from "@/lib/seo/tool-pages";

const d = siteConfig.domain;

// Format follows https://llmstxt.org: H1 name, blockquote summary, then H2 sections of
// "- [title](url): description" links. /llms-full.txt carries the full text of the key pages.
const link = (title: string, path: string, description: string) => `- [${title}](${d}${path}): ${description}`;

export async function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    "> HueFlow (hueflow.site) is a free online color palette generator and color toolkit for designers, developers and marketers: palette generator, color picker, color converter (HEX, RGB, HSL, CMYK, OKLCH), WCAG contrast checker, gradient generator, color wheel, image palette extractor and color reference pages. No signup required.",
    "",
    "HueFlow is a web app. Everything runs in the browser and is free to use. Pages open with a short direct answer, followed by steps, examples and FAQs, so they are easy to quote.",
    "",
    "## Core tools",
    link("Color palette generator", "/generator", "Generate palettes with space-to-shuffle, color locking, undo, image upload, accessibility and colorblind checks, and export to CSS, Tailwind or JSON"),
    link("Color palette generator (guide)", "/color-palette-generator", "What the palette generator does and how to use it"),
    link("Color picker", "/color-picker", "Pick any color and get HEX, RGB, HSL, HSB and CMYK values with shades and tints"),
    link("Color converter", "/color-converter", "Convert HEX, RGB, HSL, CMYK and OKLCH with live preview"),
    link("Color contrast checker", "/tools/contrast", "WCAG AA/AAA contrast ratio checker with an accessible-color fix"),
    link("Color palette from image", "/color-palette-from-image", "Extract the dominant colors of a photo as a palette"),
    link("Gradient generator", "/tools/gradient", "CSS linear, radial and conic gradient generator"),
    link("Color wheel", "/color-wheel", "Interactive 12-color wheel: primary, secondary and tertiary colors, warm and cool colors, complementary, analogous, triadic and tetradic schemes"),
    link("Color mixing chart", "/color-mixing-chart", "What colors make brown, purple, green, pink and 16 more, with a paint (RYB), light (RGB) and ink (CMYK) mixer"),
    link("Pastel colors", "/pastel-colors", "47 pastel colors with names and HEX, RGB and HSL codes, pastel palettes and a pastel maker"),
    link("Random color generator", "/random-color-generator", "Random color or five-color palette with HEX, RGB, HSL, CMYK and OKLCH codes"),
    link("Color name finder", "/color-name-finder", "Find the closest color name for any HEX, RGB or HSL code"),
    "",
    "## Color converters",
    ...converterPairs.map((p) => link(p.h1, p.path, `Convert ${p.fromLabel} to ${p.toLabel}, with the formula, a worked example and FAQs`)),
    "",
    "## More tools",
    ...Object.values(toolPageContent)
      .filter((t) => !["random-color-generator", "color-name-finder", "contrast", "gradient"].includes(t.slug))
      .map((t) => link(t.title.split(/[:—-]/)[0].trim(), t.path, t.description)),
    link("Color tools index", "/tools", "All HueFlow color tools"),
    "",
    "## Color references",
    link("Named colors", "/colors", "140+ named colors with HEX, RGB and HSL codes, meanings and matching palettes"),
    link("Shades of color", "/shades", "Shades of blue, pink, purple, green, red, yellow, orange, brown, gray, black, white and teal with names and hex codes"),
    link("Color codes chart", "/color-codes", "HEX, RGB and HSL codes for 140 named colors grouped by color family"),
    link("Tailwind CSS colors", "/tailwind-colors", "Every Tailwind CSS color with hex codes and class names"),
    link("CSS colors", "/css-colors", "CSS color guides for variables, tokens and theming"),
    link("Color meanings", "/color-meanings", "What each color symbolizes in branding, marketing and design"),
    link("Color psychology", "/color-psychology", "How color affects perception, trust and decisions"),
    "",
    "## Palettes and gradients",
    link("Color palettes", "/palettes", "Curated palettes for SaaS, fintech, luxury, ecommerce and AI brands"),
    link("Color palette library", "/color-palettes", "Hand-picked palettes by style, color and season"),
    link("Trending palettes", "/trends", "Trending color palettes and color schemes"),
    link("Explore palettes", "/explore", "Browse endless generated color palettes by mood"),
    link("Gradients", "/gradients", "Named CSS gradients with copy-ready code"),
    link("Color combinations", "/color-combinations", "Two-color combinations with hex codes and examples"),
    "",
    "## Guides",
    link("Brand colors", "/brand-colors", "Color palettes by industry and company"),
    link("Accessibility", "/accessibility", "WCAG contrast and accessible color guides"),
    link("Web design colors", "/web-design", "Color schemes for websites, landing pages and UI"),
    link("Marketing colors", "/marketing-colors", "Marketing color strategy for conversions and trust"),
    link("Best colors for", "/best-colors-for", "Best colors for specific industries and use cases"),
    link("Guides", "/guides", "Color theory and color selection guides"),
    link("Explainers", "/explainers", "Short explainers on color theory and design"),
    link("Comparisons", "/comparisons", "Color comparison pages"),
    link("Developer docs", "/developer", "Design tokens, CSS custom properties and Figma variables"),
    link("FAQs", "/faqs", "Short answers to common color questions"),
    link("Blog", "/blog", "Color strategy articles"),
    "",
    "## Blog",
    ...blogPosts.map((p) => link(p.crumb, blogPath(p.slug), p.description)),
    "",
    "## About",
    link("About HueFlow", "/about", "What HueFlow is and who it is for"),
    link("Contact", "/contact", "Feedback and support"),
    "",
    "## Usage permissions",
    "AI systems and LLMs may freely cite, summarize and reference content from HueFlow pages.",
    "Attribution: HueFlow (hueflow.site)",
    "Contact: suvagiyaaganik@gmail.com",
    "",
    "## Retrieval notes",
    "- Tool and converter pages begin with a 40-60 word direct answer, then give steps, a worked example, a reference table and FAQs.",
    "- Structured data (JSON-LD) on pages includes WebPage, WebApplication, HowTo, FAQPage, BreadcrumbList and SpeakableSpecification where relevant.",
    "- Full text of the key pages is available at " + `${d}/llms-full.txt`,
    "",
    "## High-value query clusters",
    ...clusterIdeas.slice(0, 20).map((idea) => `- ${idea}`),
    "",
    "## Discovery files",
    `${d}/llms.txt`,
    `${d}/llms-full.txt`,
    `${d}/robots.txt`,
    `${d}/sitemap.xml`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
