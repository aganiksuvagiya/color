export type ToolPageSeoConfig = {
  slug:
    | "contrast"
    | "gradient"
    | "picker"
    | "tailwind"
    | "design-tokens"
    | "image-colors"
    | "brand-analyzer"
    | "animation"
    | "contrast-fixer";
  path: string;
  title: string;
  description: string;
  keywords: string[];
  answer: string;
  audience: string;
  useCases: string[];
  howToSteps: string[];
  faq: Array<{ question: string; answer: string }>;
  relatedLinks: Array<{ title: string; href: string }>;
};

export const toolPageContent: Record<ToolPageSeoConfig["slug"], ToolPageSeoConfig> = {
  contrast: {
    slug: "contrast",
    path: "/tools/contrast",
    title: "Contrast Checker",
    description:
      "Check WCAG contrast ratios between any two colors, validate AA or AAA accessibility, and review readable text combinations for websites and apps.",
    keywords: [
      "contrast checker",
      "wcag contrast checker",
      "color contrast ratio checker",
      "accessible text contrast tool",
      "website color accessibility checker",
    ],
    answer:
      "HueFlow's Contrast Checker helps teams test foreground and background colors against WCAG rules so buttons, text, dashboards, and landing pages stay readable for US web audiences.",
    audience: "Product teams, marketers, and developers improving readable interfaces for US searchers and customers.",
    useCases: [
      "Check CTA button text before shipping a landing page",
      "Validate dashboard UI text for AA and AAA accessibility",
      "Compare brand colors against white or dark surfaces",
    ],
    howToSteps: [
      "Enter or pick a foreground text color.",
      "Enter or pick a background color.",
      "Review the ratio, WCAG level, and preview text blocks.",
      "Adjust colors until the combination passes the target accessibility standard.",
    ],
    faq: [
      {
        question: "What contrast ratio should normal website text meet?",
        answer:
          "Normal text should usually meet at least 4.5:1 for WCAG AA. Larger text can pass at 3:1, but stronger contrast is safer for readability.",
      },
      {
        question: "Why is contrast important for SEO and UX?",
        answer:
          "Poor contrast increases bounce risk, reduces readability, and weakens usability signals. Better readability supports engagement, accessibility, and crawl-friendly page quality.",
      },
    ],
    relatedLinks: [
      { title: "Accessible success states", href: "/accessibility/accessible-success-states" },
      { title: "Color contrast guide", href: "/accessibility/color-contrast" },
      { title: "Smart contrast fixer", href: "/tools/contrast-fixer" },
      { title: "Blue color page", href: "/colors/blue" },
    ],
  },
  gradient: {
    slug: "gradient",
    path: "/tools/gradient",
    title: "Gradient Generator",
    description:
      "Create CSS gradients with multiple color stops, angle control, preset palettes, and copy-ready code for landing pages, apps, and marketing assets.",
    keywords: [
      "gradient generator",
      "css gradient generator",
      "linear gradient generator",
      "marketing gradient tool",
      "ui gradient builder",
    ],
    answer:
      "HueFlow's Gradient Generator helps teams build production-ready CSS gradients for hero sections, product UI, and brand campaigns without manually writing gradient syntax.",
    audience: "Designers, founders, and frontend teams building polished web interfaces for US users.",
    useCases: [
      "Create hero gradients for SaaS websites",
      "Build background gradients for onboarding flows",
      "Export CSS gradients for product marketing sections",
    ],
    howToSteps: [
      "Choose linear, radial, or conic gradient mode.",
      "Adjust the angle if the gradient uses directional movement.",
      "Add, remove, or randomize color stops.",
      "Preview the output and copy the CSS for production use.",
    ],
    faq: [
      {
        question: "When should a website use gradients instead of flat colors?",
        answer:
          "Gradients work best when a page needs more depth, motion, or visual differentiation. They are especially useful in hero sections, feature callouts, and brand-led marketing pages.",
      },
      {
        question: "Can gradients hurt readability?",
        answer:
          "Yes. Text on gradients still needs contrast checks, especially when using light stops, bright oranges, or multi-color backgrounds.",
      },
    ],
    relatedLinks: [
      { title: "Gradient pages", href: "/gradients" },
      { title: "Ocean depth gradient", href: "/gradients/ocean-depth" },
      { title: "Color animation generator", href: "/tools/animation" },
      { title: "Conversion color strategy", href: "/guides/conversion-color-strategy" },
    ],
  },
  picker: {
    slug: "picker",
    path: "/tools/picker",
    title: "Color Picker",
    description:
      "Pick any color, copy HEX, RGB, or HSL values, and explore shades and tints for brand systems, UI kits, and accessible web design.",
    keywords: [
      "color picker",
      "hex color picker",
      "hsl color picker",
      "rgb color converter",
      "website color picker tool",
    ],
    answer:
      "HueFlow's Color Picker helps teams inspect a color, convert it into usable formats, and generate supporting shades or tints for consistent product and brand systems.",
    audience: "Developers, UI designers, and brand teams turning single colors into reusable web-ready systems.",
    useCases: [
      "Create a usable shade scale from one brand color",
      "Convert HEX values into RGB and HSL for implementation",
      "Explore lighter and darker options for buttons, surfaces, and text",
    ],
    howToSteps: [
      "Choose a base color with the visual picker or HEX input.",
      "Review the HEX, RGB, HSL, and nearest color name.",
      "Click any generated shade or tint to continue exploring.",
      "Copy the final value for design tokens, CSS, or Tailwind classes.",
    ],
    faq: [
      {
        question: "Why use HSL when picking UI colors?",
        answer:
          "HSL makes it easier to adjust lightness and saturation without losing the original hue, which is useful when building scalable color systems.",
      },
      {
        question: "How do shades and tints help design systems?",
        answer:
          "Shades and tints turn one core color into hover states, surfaces, borders, text accents, and semantic variants that feel more consistent across a product.",
      },
    ],
    relatedLinks: [
      { title: "Colors hub", href: "/colors" },
      { title: "Tailwind color guide", href: "/tailwind" },
      { title: "CSS colors guide", href: "/css-colors" },
      { title: "Design token generator", href: "/tools/design-tokens" },
    ],
  },
  tailwind: {
    slug: "tailwind",
    path: "/tools/tailwind",
    title: "Tailwind CSS Colors",
    description:
      "Browse the Tailwind CSS palette, search color families, copy HEX values, and map shades for product UI, landing pages, and design systems.",
    keywords: [
      "tailwind css colors",
      "tailwind color palette",
      "tailwind colors hex",
      "tailwind shade scale",
      "tailwind palette browser",
    ],
    answer:
      "HueFlow's Tailwind CSS Colors page helps teams browse Tailwind shades quickly, compare scale values, and copy production-ready color references for component systems.",
    audience: "Frontend teams and Tailwind users shipping interfaces for US startups, SaaS products, and marketing sites.",
    useCases: [
      "Find Tailwind shade values faster during implementation",
      "Compare neutral, blue, green, and accent scales for component work",
      "Copy exact HEX values for brand mapping and audits",
    ],
    howToSteps: [
      "Search for a Tailwind color family.",
      "Scan the full 50 to 950 shade scale.",
      "Hover a swatch to review the exact HEX value.",
      "Click any swatch to copy the color into your workflow.",
    ],
    faq: [
      {
        question: "How do teams choose the right Tailwind shade?",
        answer:
          "Most teams reserve lighter shades for backgrounds, mid tones for borders and secondary UI, and darker shades for text or high-emphasis states.",
      },
      {
        question: "Can Tailwind colors be mapped to brand systems?",
        answer:
          "Yes. Many teams start with a Tailwind family close to their brand hue, then customize the final token scale to fit product and marketing needs.",
      },
    ],
    relatedLinks: [
      { title: "Tailwind hub", href: "/tailwind" },
      { title: "Blue in Tailwind", href: "/tailwind/blue" },
      { title: "Color picker", href: "/tools/picker" },
      { title: "Design token generator", href: "/tools/design-tokens" },
    ],
  },
  "design-tokens": {
    slug: "design-tokens",
    path: "/tools/design-tokens",
    title: "Design Token Generator",
    description:
      "Export palette roles into CSS variables, Tailwind, JSON, Figma tokens, Swift, Kotlin, and Flutter formats for scalable design systems.",
    keywords: [
      "design token generator",
      "color token generator",
      "css variables generator",
      "figma tokens color tool",
      "tailwind token export",
    ],
    answer:
      "HueFlow's Design Token Generator helps teams convert named color roles into implementation-ready token formats for web, mobile, and design system handoff.",
    audience: "Design system teams and developers standardizing color roles across US product and marketing surfaces.",
    useCases: [
      "Export semantic colors into CSS variables or Tailwind config",
      "Prepare platform-ready token formats for mobile teams",
      "Create a cleaner handoff from brand palette to engineering",
    ],
    howToSteps: [
      "Add color roles such as primary, success, and accent.",
      "Choose the export format that matches the team workflow.",
      "Review the generated code preview.",
      "Copy the output into the design system or codebase.",
    ],
    faq: [
      {
        question: "Why should teams name tokens by role instead of hue?",
        answer:
          "Role-based tokens like primary or success are easier to maintain because the visual meaning stays stable even if the actual hue changes later.",
      },
      {
        question: "What token format is best for web projects?",
        answer:
          "CSS variables and Tailwind exports are usually the fastest starting point for web apps, while JSON and Figma token formats help larger systems stay synchronized.",
      },
    ],
    relatedLinks: [
      { title: "Generator", href: "/generator" },
      { title: "Color picker", href: "/tools/picker" },
      { title: "Tailwind colors", href: "/tools/tailwind" },
      { title: "Building a design token system", href: "/guides/conversion-color-strategy" },
    ],
  },
  "image-colors": {
    slug: "image-colors",
    path: "/tools/image-colors",
    title: "Image Color Extractor",
    description:
      "Upload an image, extract dominant colors, and turn visual inspiration into palettes for websites, branding, and product design.",
    keywords: [
      "image color extractor",
      "extract colors from image",
      "photo palette generator",
      "brand palette from image",
      "dominant color extractor",
    ],
    answer:
      "HueFlow's Image Color Extractor helps teams turn photos, screenshots, and inspiration boards into usable color palettes for websites, brand systems, and UI work.",
    audience: "Brand teams, ecommerce designers, and founders building visual direction from real images.",
    useCases: [
      "Extract a palette from a product photo or brand moodboard",
      "Turn a hero image into supporting website colors",
      "Find dominant tones before creating a design system",
    ],
    howToSteps: [
      "Upload an image file from a product shot, campaign, or mockup.",
      "Choose how many colors to extract from the image.",
      "Review the generated palette and copy each color.",
      "Reuse those colors in branding, gradients, or token exports.",
    ],
    faq: [
      {
        question: "What images work best for color extraction?",
        answer:
          "Images with clear subjects, lighting, and a defined visual mood tend to produce the most useful palettes for branding and interface work.",
      },
      {
        question: "Can extracted palettes be used directly in UI design?",
        answer:
          "They are a strong starting point, but teams should still test contrast, hierarchy, and semantic roles before using them in production interfaces.",
      },
    ],
    relatedLinks: [
      { title: "Gradient generator", href: "/tools/gradient" },
      { title: "Brand color analyzer", href: "/tools/brand-analyzer" },
      { title: "Palettes hub", href: "/palettes" },
      { title: "Luxury brand color strategy", href: "/guides/luxury-brand-color-strategy" },
    ],
  },
  "brand-analyzer": {
    slug: "brand-analyzer",
    path: "/tools/brand-analyzer",
    title: "Brand Color Analyzer",
    description:
      "Analyze a website screenshot, extract visible brand colors, and review dominant tones for competitors, inspiration, and brand audits.",
    keywords: [
      "brand color analyzer",
      "website color extractor",
      "competitor brand color analysis",
      "extract colors from website",
      "brand palette audit tool",
    ],
    answer:
      "HueFlow's Brand Color Analyzer helps teams inspect real websites, identify dominant brand colors, and benchmark palette choices for redesigns, audits, or category research.",
    audience: "Agencies, startups, and marketers comparing brand systems in competitive US categories.",
    useCases: [
      "Analyze competitor palettes before a redesign",
      "Benchmark category color trends for SaaS or ecommerce",
      "Extract visible brand colors from live websites",
    ],
    howToSteps: [
      "Enter a website URL to analyze.",
      "Review the captured screenshot and extracted palette.",
      "Check dominant color percentages for visual balance.",
      "Reuse the findings in palette planning, audits, or positioning work.",
    ],
    faq: [
      {
        question: "How does website color analysis help branding?",
        answer:
          "It helps teams understand category norms, spot overused color patterns, and identify opportunities to differentiate a brand more clearly.",
      },
      {
        question: "Should teams copy competitor colors?",
        answer:
          "No. The better use is pattern recognition. Teams can learn what signals trust or urgency in a category, then build a more distinctive system.",
      },
    ],
    relatedLinks: [
      { title: "Brand colors hub", href: "/brand-colors" },
      { title: "Best colors for SaaS websites", href: "/best-colors-for/saas-websites" },
      { title: "SaaS vs fintech brand colors", href: "/comparisons/saas-vs-fintech-brand-colors" },
      { title: "Image color extractor", href: "/tools/image-colors" },
    ],
  },
  animation: {
    slug: "animation",
    path: "/tools/animation",
    title: "Color Animation Generator",
    description:
      "Create animated CSS gradients and color transitions with production-ready keyframes for hero sections, landing pages, and interactive UI.",
    keywords: [
      "color animation generator",
      "css gradient animation generator",
      "animated gradient css",
      "hero background animation",
      "ui color animation tool",
    ],
    answer:
      "HueFlow's Color Animation Generator helps teams create animated gradients and color effects that make landing pages, product demos, and premium interfaces feel more alive.",
    audience: "Frontend teams and marketers adding motion to web experiences without hand-writing animation code.",
    useCases: [
      "Animate SaaS hero backgrounds",
      "Create motion-rich sections for launches and campaigns",
      "Prototype branded UI animations before implementation",
    ],
    howToSteps: [
      "Choose a color animation type such as gradient shift or hue rotate.",
      "Pick your colors and timing controls.",
      "Preview the motion directly on the page.",
      "Copy the generated CSS keyframes and element styles.",
    ],
    faq: [
      {
        question: "Where do animated gradients work best?",
        answer:
          "They work best in hero banners, feature sections, wait states, and storytelling surfaces where motion adds energy without hurting readability.",
      },
      {
        question: "What is the main risk with color animation?",
        answer:
          "The biggest risk is distraction. Motion should support hierarchy and still preserve contrast, performance, and a clear CTA focus.",
      },
    ],
    relatedLinks: [
      { title: "Gradient generator", href: "/tools/gradient" },
      { title: "Trending palettes", href: "/trends" },
      { title: "Violet aurora gradient", href: "/gradients/violet-aurora" },
      { title: "AI website color strategy", href: "/guides/ai-website-color-strategy" },
    ],
  },
  "contrast-fixer": {
    slug: "contrast-fixer",
    path: "/tools/contrast-fixer",
    title: "Smart Contrast Fixer",
    description:
      "Automatically suggest accessible color fixes that preserve brand intent while improving contrast for text, buttons, and interface elements.",
    keywords: [
      "contrast fixer",
      "accessible color fixer",
      "wcag color suggestion tool",
      "fix low contrast colors",
      "brand color accessibility tool",
    ],
    answer:
      "HueFlow's Smart Contrast Fixer helps teams repair low-contrast color combinations without throwing away the original brand direction or interface feel.",
    audience: "Designers and product teams fixing accessibility issues in live websites, apps, and UI systems.",
    useCases: [
      "Improve text readability without changing brand identity too much",
      "Repair low-contrast button and surface combinations",
      "Move a palette toward AA or AAA compliance faster",
    ],
    howToSteps: [
      "Enter the foreground and background colors you want to test.",
      "Choose the target accessibility level such as AA or AAA.",
      "Review the current ratio and suggested replacement color.",
      "Compare before and after previews, then copy the improved value.",
    ],
    faq: [
      {
        question: "Can accessibility fixes preserve brand feel?",
        answer:
          "Yes. The best approach is usually a measured shift in lightness or saturation rather than replacing the brand color entirely.",
      },
      {
        question: "When should teams target AAA instead of AA?",
        answer:
          "AAA is useful for content-heavy experiences, small text, and high-readability interfaces. AA is the most common baseline for general websites and apps.",
      },
    ],
    relatedLinks: [
      { title: "Contrast checker", href: "/tools/contrast" },
      { title: "Accessibility hub", href: "/accessibility" },
      { title: "Color contrast guide", href: "/accessibility/color-contrast" },
      { title: "Accessible success states", href: "/accessibility/accessible-success-states" },
    ],
  },
};

export const blogPageContent = {
  path: "/blog",
  title: "Color Strategy Resources",
  description:
    "Explore answer-first color strategy resources covering accessibility, conversion, Tailwind, branding, trust, and palette decisions for websites and apps.",
  keywords: [
    "color strategy resources",
    "color psychology blog",
    "website color guides",
    "accessibility color articles",
    "brand color resources",
  ],
  answer:
    "HueFlow's resource library helps US-focused teams learn how color affects trust, readability, conversion, and brand clarity across SaaS, fintech, ecommerce, AI, and modern marketing websites.",
  featuredArticles: [
    {
      title: "Conversion Color Strategy",
      excerpt: "Learn how color hierarchy supports trust, CTA clarity, and better landing page conversion decisions.",
      category: "Guides",
      readTime: "7 min",
      href: "/guides/conversion-color-strategy",
    },
    {
      title: "AI Website Color Strategy",
      excerpt: "See which color systems help AI, SaaS, and modern product brands feel credible without looking generic.",
      category: "Guides",
      readTime: "6 min",
      href: "/guides/ai-website-color-strategy",
    },
    {
      title: "Why Blue Builds Trust",
      excerpt: "A short explainer on why blue remains a reliable default in regulated and trust-heavy categories.",
      category: "Explainers",
      readTime: "4 min",
      href: "/explainers/why-blue-builds-trust",
    },
    {
      title: "How Color Psychology Affects Buyers",
      excerpt: "Review where urgency, calm, trust, and premium cues help or hurt the customer journey.",
      category: "Explainers",
      readTime: "5 min",
      href: "/explainers/how-color-psychology-affects-buyers",
    },
    {
      title: "Blue vs Green for Trust",
      excerpt: "Compare two high-usage trust colors and decide which works better for your product or brand.",
      category: "Comparisons",
      readTime: "5 min",
      href: "/comparisons/blue-vs-green-for-trust",
    },
    {
      title: "Best Colors for SaaS Websites",
      excerpt: "See which palettes and semantic roles perform best for product-led SaaS homepages and dashboards.",
      category: "Best Colors",
      readTime: "6 min",
      href: "/best-colors-for/saas-websites",
    },
    {
      title: "Homepage Color Mistakes That Hurt Conversions",
      excerpt: "A human, practical breakdown of the color choices that make homepages feel noisy, cheap, or harder to trust.",
      category: "Guides",
      readTime: "7 min",
      href: "/guides/homepage-color-mistakes-hurting-conversions",
    },
    {
      title: "Best Colors for Healthcare Websites in the USA",
      excerpt: "A US-focused guide to choosing healthcare colors that feel calmer, clearer, and more credible for patients.",
      category: "Guides",
      readTime: "6 min",
      href: "/guides/best-colors-for-healthcare-websites-usa",
    },
  ],
  sections: [
    {
      title: "Why this library matters",
      body:
        "Most color content on the web stops at inspiration. This library is designed to help teams make implementation decisions around accessibility, conversion, trust, category fit, and reusable design systems.",
    },
    {
      title: "Built for SEO, GEO, and AEO",
      body:
        "Pages are structured for search engines and answer engines with direct summaries, semantically grouped topics, strong internal linking, and content blocks that AI systems can cite more easily.",
    },
    {
      title: "Best use cases",
      body:
        "Use these resources when choosing brand colors, evaluating CTAs, mapping Tailwind or CSS systems, building color tokens, or improving contrast across a marketing site or product UI.",
    },
  ],
  faq: [
    {
      question: "What makes HueFlow resources different from a typical blog?",
      answer:
        "The content is structured around practical decisions and retrieval-friendly answers rather than generic editorial posts. It is closer to a searchable color strategy library than a casual blog.",
    },
    {
      question: "Which pages should new visitors read first?",
      answer:
        "Start with conversion color strategy, color contrast guidance, and best colors for SaaS websites. Those pages quickly establish the framework most teams need.",
    },
  ],
  relatedLinks: [
    { title: "Guides hub", href: "/guides" },
    { title: "Explainers hub", href: "/explainers" },
    { title: "Comparisons hub", href: "/comparisons" },
    { title: "Resources hub", href: "/resources" },
  ],
};
