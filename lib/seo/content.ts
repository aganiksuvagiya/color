type FaqItem = {
  question: string;
  answer: string;
};

type ContentSection = {
  title: string;
  body: string;
};

type LinkItem = {
  title: string;
  href: string;
  label?: string;
};

type ExampleItem = {
  title: string;
  body: string;
};

type ComparisonRow = {
  label: string;
  bestFor: string;
  strengths: string;
  watchouts: string;
};

type QuickFact = {
  label: string;
  value: string;
};

type DefinitionItem = {
  term: string;
  definition: string;
};

type ProsCons = {
  pros: string[];
  cons: string[];
};

type ExpertSummary = {
  title: string;
  body: string;
};

type EntityRelation = {
  entity: string;
  relationship: string;
  connectedTo: string;
};

type AiSection = {
  title: "What is it?" | "Why it matters?" | "Best use cases" | "Examples" | "Common mistakes" | "Related topics";
  body: string;
};

export type ContentEntry = {
  slug: string;
  title: string;
  description: string;
  answer: string;
  intent: string;
  keywords: string[];
  sections: ContentSection[];
  faq: FaqItem[];
  examples?: ExampleItem[];
  comparisonRows?: ComparisonRow[];
  relatedLinks: LinkItem[];
  keyTakeaways?: string[];
  quickFacts?: QuickFact[];
  definitions?: DefinitionItem[];
  prosCons?: ProsCons;
  expertSummary?: ExpertSummary;
  entityRelations?: EntityRelation[];
  aiSections?: AiSection[];
  citationBlocks?: string[];
};

export type HubPage = {
  slug: string;
  path: string;
  title: string;
  description: string;
  answer: string;
  goals: string[];
  featuredLinks: LinkItem[];
};

const colors: ContentEntry[] = [
  {
    slug: "blue",
    title: "Blue Color Meaning for Brands, SaaS, and Trust",
    description: "Learn when blue improves trust, conversions, and product clarity across SaaS, fintech, and healthcare brands.",
    answer:
      "Blue is the best default color for trust because people associate it with reliability, stability, and clarity. It usually performs well for SaaS, fintech, and healthcare brands where confidence matters more than urgency.",
    intent: "informational",
    keywords: ["blue color meaning", "best blue for saas", "trust color for websites"],
    sections: [
      { title: "Why blue works", body: "Blue lowers perceived risk and feels predictable, which makes it a strong fit for dashboards, financial products, healthcare experiences, and enterprise software." },
      { title: "Best use cases", body: "Use blue for navigation, primary actions, trust badges, and neutral-heavy layouts that need one strong anchor color." },
      { title: "When not to overuse it", body: "Blue can feel generic if every accent and state uses the same hue. Pair it with warm support colors or a differentiated secondary palette." },
    ],
    faq: [
      { question: "Does blue increase conversions?", answer: "Blue can improve conversions when the purchase depends on trust, clarity, and low perceived risk rather than urgency." },
      { question: "What industries use blue best?", answer: "SaaS, fintech, healthcare, insurance, logistics, and B2B service brands usually benefit most from blue-led systems." },
    ],
    examples: [
      { title: "Fintech landing page", body: "Use blue for the primary CTA, navy for headers, and a mint success color for account growth moments." },
      { title: "SaaS dashboard", body: "Use a blue scale for product hierarchy, paired with neutral surfaces and amber alerts for contrast." },
    ],
    relatedLinks: [
      { title: "Trusted SaaS palettes", href: "/palettes/saas-trust-spectrum" },
      { title: "Blue gradients", href: "/gradients/ocean-depth" },
      { title: "Blue accessibility guide", href: "/accessibility/color-contrast" },
      { title: "Blue in Tailwind", href: "/tailwind/blue" },
      { title: "Blue CSS guide", href: "/css-colors/blue" },
      { title: "Blue color meaning", href: "/color-meanings/blue" },
    ],
  },
  {
    slug: "green",
    title: "Green Color Meaning for Growth, Wellness, and Conversion",
    description: "How green signals growth, balance, wellness, and positive progress across product and marketing funnels.",
    answer:
      "Green works best when you want to signal growth, health, progress, or sustainability. It often performs well for finance dashboards, wellness brands, and interfaces where success states need to feel optimistic and safe.",
    intent: "informational",
    keywords: ["green color psychology", "green for conversion", "green brand color meaning"],
    sections: [
      { title: "Growth and momentum", body: "Green maps naturally to progress indicators, positive change, account growth, and environmental credibility." },
      { title: "Wellness and natural brands", body: "Muted greens feel calm and restorative, while saturated greens feel energetic and more performance-oriented." },
      { title: "Design caution", body: "Avoid relying on green alone to communicate status because color-blind users may miss the distinction without icons or labels." },
    ],
    faq: [
      { question: "Is green good for fintech?", answer: "Yes, especially for investing, savings, and goal-tracking products where growth and positive performance are central." },
      { question: "Can green improve trust?", answer: "Green supports trust when paired with clean typography and strong contrast, but blue usually communicates institutional trust more directly." },
    ],
    relatedLinks: [
      { title: "Growth-focused palettes", href: "/palettes/fintech-growth-grid" },
      { title: "Green gradients", href: "/gradients/mint-horizon" },
      { title: "Accessible success colors", href: "/accessibility/accessible-success-states" },
      { title: "Green CSS colors", href: "/css-colors/green" },
      { title: "Green in Tailwind", href: "/tailwind/green" },
      { title: "Green color meaning", href: "/color-meanings/green" },
    ],
  },
  {
    slug: "red",
    title: "Red Color Meaning for Urgency, Energy, and Promotions",
    description: "Understand when red creates urgency and when it introduces too much visual stress on landing pages and apps.",
    answer:
      "Red is strongest when you need urgency, intensity, or immediate attention. It works for promotions, alerts, and bold retail campaigns, but it should be used selectively because it increases visual tension quickly.",
    intent: "informational",
    keywords: ["red color psychology", "red marketing color", "red call to action"],
    sections: [
      { title: "Urgency and attention", body: "Red draws the eye faster than calmer hues, which makes it useful for limited-time offers, error states, and high-energy campaigns." },
      { title: "Retail and food use cases", body: "Commerce, food, sports, and entertainment brands often use red to create appetite, momentum, and emotional intensity." },
      { title: "Balance matters", body: "Red-heavy layouts can feel aggressive. Pair it with softer neutrals or darker anchoring colors to keep the experience readable." },
    ],
    faq: [
      { question: "Does red improve conversions?", answer: "Sometimes, especially for urgency-driven offers, but the effect depends more on audience fit and page context than the color alone." },
      { question: "Should SaaS brands use red?", answer: "Mostly for alerts, exceptions, and occasional promotional moments rather than as the core brand color." },
    ],
    relatedLinks: [
      { title: "Red and black combinations", href: "/color-combinations/red-and-black" },
      { title: "Retail brand colors", href: "/brand-colors/retail" },
      { title: "Red gradients", href: "/gradients/sunset-burst" },
      { title: "Marketing urgency colors", href: "/marketing-colors" },
      { title: "Red color meaning", href: "/color-meanings/red" },
    ],
  },
  {
    slug: "purple",
    title: "Purple Color Meaning for Creativity and Premium Brands",
    description: "Use purple when a brand needs creativity, premium energy, and a differentiated tech identity.",
    answer:
      "Purple is useful when a brand wants to feel imaginative, premium, or slightly unconventional. It often works for creative tools, beauty brands, and innovation-led products that need more distinction than blue.",
    intent: "informational",
    keywords: ["purple color meaning", "purple for branding", "premium tech colors"],
    sections: [
      { title: "Distinctive positioning", body: "Purple helps brands stand apart in categories where blue and green dominate, especially in software and creator tools." },
      { title: "Luxury and beauty", body: "Deep plum tones can feel premium, while brighter violets feel energetic and more digital-native." },
      { title: "Use sparingly in enterprise", body: "Very saturated purple can weaken trust in serious regulated industries unless paired with disciplined typography and stable neutrals." },
    ],
    faq: [
      { question: "Is purple good for SaaS?", answer: "Yes, for creative, AI, and innovation categories that want a stronger point of view than traditional enterprise blue." },
      { question: "What does purple communicate?", answer: "Purple commonly signals imagination, originality, quality, and premium positioning." },
    ],
    relatedLinks: [
      { title: "Purple-led palettes", href: "/palettes/creative-orbit" },
      { title: "Purple Tailwind classes", href: "/tailwind/purple" },
      { title: "Purple meaning guide", href: "/color-meanings/purple" },
      { title: "Purple gradients", href: "/gradients/violet-aurora" },
      { title: "Purple CSS guide", href: "/css-colors/purple" },
    ],
  },
  {
    slug: "black",
    title: "Black Color Meaning for Luxury and Editorial Design",
    description: "A guide to using black for premium positioning, bold contrast, and minimal brand systems.",
    answer:
      "Black communicates authority, luxury, and precision. It works especially well for premium ecommerce, editorial experiences, and minimalist interfaces where contrast and restraint drive the brand feel.",
    intent: "informational",
    keywords: ["black brand color", "luxury website colors", "black and white branding"],
    sections: [
      { title: "Premium restraint", body: "Black reduces visual noise and makes typography, product imagery, and accent colors feel more intentional." },
      { title: "Conversion role", body: "Black can support premium conversions by increasing perceived quality, especially in fashion, automotive, and high-end service brands." },
      { title: "Readability rules", body: "Pure black on pure white is not always the most comfortable choice. Slightly softened neutrals often read better while preserving contrast." },
    ],
    faq: [
      { question: "Is black a good luxury color?", answer: "Yes, black is one of the strongest luxury signals when paired with refined typography and generous spacing." },
      { question: "Can black work for product UI?", answer: "Yes, especially in dark interfaces, pro tools, and brands that want to feel premium or editorial." },
    ],
    relatedLinks: [
      { title: "Black and gold combinations", href: "/color-combinations/black-and-gold" },
      { title: "Luxury ecommerce palettes", href: "/palettes/luxury-editorial-noir" },
      { title: "Black CSS colors", href: "/css-colors/black" },
      { title: "Premium gradients", href: "/gradients/midnight-metal" },
      { title: "Black in Tailwind", href: "/tailwind/black" },
      { title: "Black color meaning", href: "/color-meanings/black" },
    ],
  },
  {
    slug: "orange",
    title: "Orange Color Meaning for Action, Optimism, and Friendly CTAs",
    description: "How orange helps brands feel energetic, approachable, and action-oriented without the intensity of red.",
    answer:
      "Orange is a strong action color when you want more energy than blue but less intensity than red. It often works for CTAs, creator brands, ecommerce promotions, and onboarding moments that should feel inviting.",
    intent: "informational",
    keywords: ["orange cta color", "orange brand meaning", "best orange for websites"],
    sections: [
      { title: "Friendly urgency", body: "Orange communicates movement and encouragement, which makes it useful for signup prompts, pricing highlights, and mid-funnel actions." },
      { title: "Great for creator and DTC brands", body: "Orange brings warmth and personality to commerce, creator tools, education, and hospitality experiences." },
      { title: "Contrast considerations", body: "Lighter oranges can fail accessibility on white surfaces, so use deeper shades for text and critical actions." },
    ],
    faq: [
      { question: "Is orange better than red for CTAs?", answer: "Often yes if the brand wants action without feeling alarming or overly aggressive." },
      { question: "What does orange communicate?", answer: "Orange usually signals enthusiasm, friendliness, and momentum." },
    ],
    relatedLinks: [
      { title: "Orange conversion palettes", href: "/palettes/dtc-energy-stack" },
      { title: "Orange gradients", href: "/gradients/apricot-launch" },
      { title: "Orange in web design", href: "/web-design" },
      { title: "Orange accessibility rules", href: "/accessibility/color-contrast" },
      { title: "Orange in Tailwind", href: "/tailwind/orange" },
      { title: "Orange CSS guide", href: "/css-colors/orange" },
      { title: "Orange color meaning", href: "/color-meanings/orange" },
    ],
  },
];

const palettes: ContentEntry[] = [
  {
    slug: "saas-trust-spectrum",
    title: "SaaS Trust Spectrum Palette",
    description: "A conversion-focused SaaS palette built around blue trust signals, crisp neutrals, and accessible accents.",
    answer:
      "The SaaS Trust Spectrum palette works because it combines blue-led trust cues with quiet neutrals and clear success or warning accents. It is especially effective for landing pages, dashboards, and onboarding flows.",
    intent: "commercial",
    keywords: ["best saas color palette", "blue saas palette", "trust palette for software"],
    sections: [
      { title: "Core colors", body: "Use navy and cobalt for structure, cloud neutrals for breathing room, and one mint accent for positive actions." },
      { title: "Where it converts", body: "This palette tends to perform well on pricing pages, feature grids, and B2B landing pages where confidence beats hype." },
      { title: "Implementation", body: "Create a 50-900 scale for the primary blue and reserve the brightest tone for buttons and links." },
    ],
    faq: [
      { question: "What is the best color palette for SaaS websites?", answer: "A blue-led palette with accessible neutrals is the strongest default because it improves trust and keeps product hierarchy clear." },
      { question: "What accent color fits blue SaaS branding?", answer: "Mint, teal, or soft amber usually add contrast without weakening trust." },
    ],
    relatedLinks: [
      { title: "Blue color meaning", href: "/colors/blue" },
      { title: "Fintech brand colors", href: "/brand-colors/fintech" },
      { title: "Ocean depth gradient", href: "/gradients/ocean-depth" },
    ],
  },
  {
    slug: "fintech-growth-grid",
    title: "Fintech Growth Grid Palette",
    description: "A fintech palette balancing deep trust blues with optimistic greens for growth, savings, and investing products.",
    answer:
      "For fintech brands, the best palette usually combines dark blue trust anchors with a disciplined green success system. That pairing communicates security and progress without feeling too consumer-gimmicky.",
    intent: "commercial",
    keywords: ["fintech color palette", "best colors for fintech", "finance brand palette"],
    sections: [
      { title: "Trust plus momentum", body: "Blue handles reliability while green carries growth, portfolio wins, and account health." },
      { title: "Product use cases", body: "This palette works well for account summaries, performance charts, onboarding, and wallet experiences." },
      { title: "Avoid neon overload", body: "Overly bright greens can cheapen the brand. Use richer emerald tones for a more institutional feel." },
    ],
    faq: [
      { question: "What color palette works for fintech brands?", answer: "Blue and green usually work best because they combine trust, clarity, and growth signals in one system." },
      { question: "Should fintech use black instead?", answer: "Black can help premium positioning, but most fintech products still need blue or green to support trust and financial progress." },
    ],
    relatedLinks: [
      { title: "Green color meaning", href: "/colors/green" },
      { title: "Fintech brand colors", href: "/brand-colors/fintech" },
      { title: "Accessible success states", href: "/accessibility/accessible-success-states" },
    ],
  },
  {
    slug: "luxury-editorial-noir",
    title: "Luxury Editorial Noir Palette",
    description: "A black, ivory, and metallic accent palette for premium ecommerce, hospitality, and editorial brands.",
    answer:
      "Luxury brands often perform best with restrained palettes built around black, ivory, and one metallic or jewel accent. The goal is to increase perceived quality rather than maximize color variety.",
    intent: "commercial",
    keywords: ["luxury color palette", "premium brand colors", "black gold palette"],
    sections: [
      { title: "Premium hierarchy", body: "Black and ivory establish authority while gold, bronze, or plum accents create contrast without clutter." },
      { title: "Best use cases", body: "Fashion, jewelry, premium skincare, hospitality, and boutique consulting brands benefit most from this approach." },
      { title: "Conversion logic", body: "Luxury shoppers respond more to quality signals and restraint than to loud promotional energy." },
    ],
    faq: [
      { question: "What colors feel luxurious?", answer: "Black, ivory, deep jewel tones, and metallic-inspired accents usually feel most premium." },
      { question: "Should luxury websites use bright colors?", answer: "Usually only as selective accents because too much saturation can reduce the perception of refinement." },
    ],
    relatedLinks: [
      { title: "Black color meaning", href: "/colors/black" },
      { title: "Black and gold combination", href: "/color-combinations/black-and-gold" },
      { title: "Midnight metal gradient", href: "/gradients/midnight-metal" },
    ],
  },
  {
    slug: "creative-orbit",
    title: "Creative Orbit Palette",
    description: "A vibrant palette for AI tools, creator brands, and modern product launches that need standout visual personality.",
    answer:
      "Creative brands often need a palette with more personality than standard enterprise blue. A purple-led system with coral or electric accents can create memorability without sacrificing product usability.",
    intent: "commercial",
    keywords: ["creative brand palette", "ai product colors", "purple product palette"],
    sections: [
      { title: "Differentiation", body: "Purple and magenta help products feel imaginative and future-facing in crowded software categories." },
      { title: "UI balance", body: "Keep core surfaces neutral and reserve the brighter colors for hero sections, highlights, and key CTA moments." },
      { title: "Brand use cases", body: "This palette suits AI assistants, design tools, creator platforms, and launch campaigns." },
    ],
    faq: [
      { question: "What is a good palette for AI products?", answer: "A distinct but usable palette often starts with purple, indigo, or deep blue, balanced by soft neutrals." },
      { question: "Can colorful palettes still be accessible?", answer: "Yes, as long as text, buttons, and states use tested contrast ratios rather than relying on brightness alone." },
    ],
    relatedLinks: [
      { title: "Purple color meaning", href: "/colors/purple" },
      { title: "Violet aurora gradient", href: "/gradients/violet-aurora" },
      { title: "Tailwind purple guide", href: "/tailwind/purple" },
    ],
  },
  {
    slug: "dtc-energy-stack",
    title: "DTC Energy Stack Palette",
    description: "A high-conversion palette for ecommerce and DTC brands using warm action colors with grounded neutrals.",
    answer:
      "DTC and ecommerce brands often benefit from warm, action-oriented palettes built around orange, red, or coral, grounded by dark neutrals. These systems drive momentum without becoming chaotic.",
    intent: "commercial",
    keywords: ["ecommerce color palette", "dtc palette", "best colors for conversions"],
    sections: [
      { title: "Why it converts", body: "Warm action colors help CTAs and promotional blocks stand out, especially when paired with structured typography and enough white space." },
      { title: "Best channels", body: "Use this palette across landing pages, paid campaign pages, and high-intent product detail pages." },
      { title: "Design discipline", body: "Limit the palette to one warm action color plus one calm secondary hue so the page still feels premium." },
    ],
    faq: [
      { question: "What colors increase conversions?", answer: "Colors that match audience expectations and create clear visual hierarchy usually convert best. Warm accents often help CTAs stand out." },
      { question: "What colors attract customers?", answer: "Blue attracts trust-focused buyers, while warm colors like orange and red attract attention and urgency-driven clicks." },
    ],
    relatedLinks: [
      { title: "Orange color meaning", href: "/colors/orange" },
      { title: "Red color meaning", href: "/colors/red" },
      { title: "Sunset burst gradient", href: "/gradients/sunset-burst" },
    ],
  },
];

const gradients: ContentEntry[] = [
  {
    slug: "ocean-depth",
    title: "Ocean Depth Gradient",
    description: "A blue-to-cyan gradient for SaaS hero sections, trust-heavy product pages, and fintech marketing sites.",
    answer:
      "Ocean Depth is a strong gradient for SaaS and fintech because it blends institutional blue with energetic cyan. It feels modern without losing trust, which makes it useful for hero banners and onboarding surfaces.",
    intent: "commercial",
    keywords: ["blue gradient for saas", "fintech gradient", "trust gradient"],
    sections: [
      { title: "Where it works", body: "Use it in hero sections, login screens, product illustrations, and onboarding cards that need motion and depth." },
      { title: "Accessibility note", body: "Do not place smaller text on the brightest midpoint without testing contrast. Overlay dark surfaces or use large display typography." },
      { title: "Pairing", body: "Ocean Depth pairs naturally with blue-led palettes and silver or mint accents." },
    ],
    faq: [
      { question: "What is the best gradient for SaaS websites?", answer: "Blue-led gradients with restrained contrast usually work best because they feel modern while preserving trust." },
      { question: "Are gradients good for conversion pages?", answer: "Yes, when used to support hierarchy and brand personality rather than replacing clear layout structure." },
    ],
    relatedLinks: [
      { title: "SaaS trust palette", href: "/palettes/saas-trust-spectrum" },
      { title: "Blue color page", href: "/colors/blue" },
      { title: "UI color guidance", href: "/web-design" },
    ],
  },
  {
    slug: "sunset-burst",
    title: "Sunset Burst Gradient",
    description: "A warm orange-to-red gradient for commerce, launch pages, promotions, and energetic creator brands.",
    answer:
      "Sunset Burst is best for warm, high-energy experiences that need urgency and momentum. It performs well on promotional sections, creator brand pages, and product launches that need visual lift.",
    intent: "commercial",
    keywords: ["warm conversion gradient", "orange red gradient", "marketing page gradient"],
    sections: [
      { title: "Marketing role", body: "Use this gradient on sale banners, launch hero panels, and mid-page breakouts where you want to create action." },
      { title: "Brand fit", body: "It suits commerce, hospitality, entertainment, and social products better than regulated enterprise products." },
      { title: "Contrast rules", body: "Warm gradients need dark overlays or strong white typography weights to remain readable." },
    ],
    faq: [
      { question: "Do warm gradients improve conversions?", answer: "They can increase attention, especially for campaign pages, but clarity and offer quality still matter more than color alone." },
      { question: "What industries fit orange-red gradients?", answer: "DTC, events, hospitality, entertainment, and creator brands usually benefit most." },
    ],
    relatedLinks: [
      { title: "DTC energy stack palette", href: "/palettes/dtc-energy-stack" },
      { title: "Orange color meaning", href: "/colors/orange" },
      { title: "Marketing colors", href: "/marketing-colors" },
    ],
  },
  {
    slug: "violet-aurora",
    title: "Violet Aurora Gradient",
    description: "A purple-to-indigo gradient for AI products, creative tooling, and innovation-led landing pages.",
    answer:
      "Violet Aurora helps AI and creative software look distinctive by blending premium indigo depth with more imaginative violet energy. It is a strong choice for hero sections, launch pages, and feature callouts.",
    intent: "commercial",
    keywords: ["ai gradient", "purple gradient", "creative software gradient"],
    sections: [
      { title: "Best use cases", body: "Use it for innovation messaging, product launches, feature highlights, and illustrations for creative tools." },
      { title: "Visual tone", body: "The gradient feels future-facing, but it needs calm neutrals around it to avoid visual overload." },
      { title: "Product caution", body: "Keep form fields and dense UI elements on solid surfaces rather than inside the gradient itself." },
    ],
    faq: [
      { question: "What gradient works for AI products?", answer: "Purple and indigo gradients often work well because they feel modern, creative, and differentiated." },
      { question: "Should gradients be used in dashboards?", answer: "Mostly as accents, hero cards, or banners rather than as the background for dense data." },
    ],
    relatedLinks: [
      { title: "Creative orbit palette", href: "/palettes/creative-orbit" },
      { title: "Purple color meaning", href: "/colors/purple" },
      { title: "AI website colors guide", href: "/guides/ai-website-color-strategy" },
    ],
  },
  {
    slug: "mint-horizon",
    title: "Mint Horizon Gradient",
    description: "A green-to-cyan gradient for health apps, wellness brands, and optimistic product states.",
    answer:
      "Mint Horizon works well for wellness, health, and growth-oriented brands because it blends calm green reassurance with lighter cyan freshness. It feels clean, positive, and product-friendly.",
    intent: "commercial",
    keywords: ["wellness gradient", "green cyan gradient", "health app colors"],
    sections: [
      { title: "Wellness positioning", body: "This gradient conveys renewal, cleanliness, and lightness, especially on landing pages and onboarding surfaces." },
      { title: "Product role", body: "Use it for success modules, empty states, and growth-oriented dashboards rather than dense text surfaces." },
      { title: "Companion colors", body: "Pair it with slate or charcoal neutrals to keep the system grounded and accessible." },
    ],
    faq: [
      { question: "What colors work for wellness brands?", answer: "Soft greens, mints, teals, and warm neutrals usually perform best because they feel restorative and trustworthy." },
      { question: "Can wellness colors still convert?", answer: "Yes, as long as the palette keeps enough contrast and hierarchy for calls to action." },
    ],
    relatedLinks: [
      { title: "Green color meaning", href: "/colors/green" },
      { title: "Healthcare brand colors", href: "/brand-colors/healthcare" },
      { title: "Accessible success states", href: "/accessibility/accessible-success-states" },
    ],
  },
  {
    slug: "midnight-metal",
    title: "Midnight Metal Gradient",
    description: "A charcoal-to-steel gradient for premium brands, dark product themes, and editorial surfaces.",
    answer:
      "Midnight Metal supports luxury positioning by adding depth without introducing loud hue shifts. It works especially well for premium ecommerce, automotive, and pro-grade software interfaces.",
    intent: "commercial",
    keywords: ["dark luxury gradient", "black silver gradient", "premium website gradient"],
    sections: [
      { title: "Use it sparingly", body: "This gradient is most effective in hero panels, section dividers, and visual frames rather than full-page coverage." },
      { title: "Why it feels premium", body: "Low-chroma dark gradients increase polish and materiality while keeping the focus on typography and imagery." },
      { title: "Accessibility", body: "Keep text large and bright enough because darker midtones can reduce contrast faster than expected." },
    ],
    faq: [
      { question: "What gradient feels premium?", answer: "Dark, restrained gradients with subtle tonal variation tend to feel more premium than loud rainbow blends." },
      { question: "Can gradients work for luxury websites?", answer: "Yes, especially when they are understated and paired with elegant typography and spacing." },
    ],
    relatedLinks: [
      { title: "Luxury editorial noir palette", href: "/palettes/luxury-editorial-noir" },
      { title: "Black color meaning", href: "/colors/black" },
      { title: "Luxury brand color guide", href: "/guides/luxury-brand-color-strategy" },
    ],
  },
  {
    slug: "apricot-launch",
    title: "Apricot Launch Gradient",
    description: "A peach-to-orange gradient for onboarding, startups, and friendly high-action product moments.",
    answer:
      "Apricot Launch is useful when a product wants warmth and action without the hard edge of red. It works especially well for onboarding banners, education tools, and startup marketing pages.",
    intent: "commercial",
    keywords: ["friendly orange gradient", "startup gradient", "onboarding gradient"],
    sections: [
      { title: "Friendly action", body: "The gradient feels optimistic and welcoming, which makes it useful for signup prompts and launch announcements." },
      { title: "Ideal audiences", body: "Early-stage products, education brands, and creator tools often benefit most from this energy." },
      { title: "Balance with neutrals", body: "Warm gradients need calm backgrounds nearby so the interface does not feel constantly loud." },
    ],
    faq: [
      { question: "What gradient works for startup websites?", answer: "Warm, optimistic gradients can work well if the brand wants energy and approachability more than institutional trust." },
      { question: "Is orange good for onboarding?", answer: "Yes, orange can make onboarding feel welcoming and action-oriented when contrast is handled correctly." },
    ],
    relatedLinks: [
      { title: "Orange color meaning", href: "/colors/orange" },
      { title: "Startup website colors guide", href: "/guides/startup-website-color-strategy" },
      { title: "DTC energy stack palette", href: "/palettes/dtc-energy-stack" },
    ],
  },
];

const brandColorEntries: ContentEntry[] = [
  {
    slug: "saas",
    title: "Best Brand Colors for SaaS Companies",
    description: "The strongest SaaS brand colors for trust, product clarity, demos, pricing pages, and B2B growth.",
    answer:
      "For most SaaS brands, blue is still the best foundation because it communicates trust and works naturally in product UI. The best-performing SaaS systems then add a secondary accent like teal, mint, or amber for differentiation.",
    intent: "commercial",
    keywords: ["best color for saas websites", "saas brand colors", "saas website palette"],
    sections: [
      { title: "Why SaaS defaults to blue", body: "Blue supports trust, clarity, and low-friction product exploration, especially in B2B contexts." },
      { title: "Where to differentiate", body: "Use distinctive accent colors in illustrations, highlights, gradients, and secondary calls to action." },
      { title: "Landing page guidance", body: "Use a strong neutral system so the product screenshots, pricing cards, and navigation remain clear." },
    ],
    faq: [
      { question: "What is the best color for SaaS websites?", answer: "Blue is usually the strongest default because it signals trust and supports clear UI hierarchy." },
      { question: "Should SaaS use bright colors?", answer: "Use bright colors as accents rather than as the entire system so trust remains intact." },
    ],
    relatedLinks: [
      { title: "SaaS trust palette", href: "/palettes/saas-trust-spectrum" },
      { title: "Blue color page", href: "/colors/blue" },
      { title: "Ocean depth gradient", href: "/gradients/ocean-depth" },
    ],
  },
  {
    slug: "fintech",
    title: "Best Brand Colors for Fintech Companies",
    description: "A fintech color strategy balancing trust, compliance, wealth, and modern digital product design.",
    answer:
      "Fintech brands usually perform best with blue-led systems supported by green accents. Blue establishes trust and security, while green communicates growth, gain, and positive account health.",
    intent: "commercial",
    keywords: ["fintech brand colors", "best fintech colors", "finance website color palette"],
    sections: [
      { title: "Institutional trust", body: "Use deep blue for headers, navigation, and core interactions where security matters." },
      { title: "Growth signals", body: "Use green for charts, positive deltas, and achievement states rather than spreading it everywhere." },
      { title: "Premium option", body: "Add graphite or black if the brand wants to feel more investment-grade or wealth-oriented." },
    ],
    faq: [
      { question: "What color palette works for fintech brands?", answer: "Blue and green usually work best because they combine trust, security, and growth." },
      { question: "Can fintech brands use purple?", answer: "Only if the product is innovation-led and still grounded by stable neutrals and trust signals." },
    ],
    relatedLinks: [
      { title: "Fintech growth palette", href: "/palettes/fintech-growth-grid" },
      { title: "Green color page", href: "/colors/green" },
      { title: "Comparison of SaaS vs fintech colors", href: "/comparisons/saas-vs-fintech-brand-colors" },
    ],
  },
  {
    slug: "healthcare",
    title: "Best Brand Colors for Healthcare Companies",
    description: "Healthcare color guidance for trust, calm, cleanliness, and accessible patient experiences.",
    answer:
      "Healthcare brands usually perform best with blue, teal, and soft green systems because those colors feel trustworthy, clean, and calm. The key is balancing reassurance with enough contrast for readability and action clarity.",
    intent: "commercial",
    keywords: ["healthcare brand colors", "medical website colors", "best colors for trust"],
    sections: [
      { title: "Calm plus credibility", body: "Blue and teal reduce perceived risk while soft green can add a restorative, human tone." },
      { title: "Accessibility matters more", body: "Healthcare experiences need stronger-than-average contrast because the audience range is broad and often stressed." },
      { title: "Avoid harsh saturation", body: "Very bright reds and neons can feel alarming in care contexts unless used only for urgent alerts." },
    ],
    faq: [
      { question: "What color improves trust?", answer: "Blue is usually the strongest trust color, especially in healthcare, finance, and enterprise software." },
      { question: "What colors fit healthcare websites?", answer: "Blue, teal, soft green, and neutral white or slate systems usually fit best." },
    ],
    relatedLinks: [
      { title: "Blue color meaning", href: "/colors/blue" },
      { title: "Mint horizon gradient", href: "/gradients/mint-horizon" },
      { title: "Accessibility guide", href: "/accessibility/color-contrast" },
    ],
  },
  {
    slug: "stripe",
    title: "Stripe Brand Colors Analysis",
    description: "A programmatic page studying why Stripe's indigo-led system feels trustworthy, modern, and developer-friendly.",
    answer:
      "Stripe’s color system works because it pairs a trustworthy indigo base with polished neutrals and disciplined accent usage. The result feels modern and technical without losing financial credibility.",
    intent: "navigational",
    keywords: ["stripe brand colors", "stripe color palette", "developer brand colors"],
    sections: [
      { title: "Why it stands out", body: "The indigo hue creates recognition while the supporting neutrals keep the brand usable across documentation, product, and marketing." },
      { title: "What brands can borrow", body: "Borrow the disciplined hierarchy, not just the hue. Strong systems separate brand color from UI status and utility color." },
      { title: "Best-fit industries", body: "Developer tools, APIs, fintech, and modern infrastructure brands often benefit from similar logic." },
    ],
    faq: [
      { question: "Why does Stripe use purple-blue colors?", answer: "The hue helps Stripe feel modern and distinctive while staying close enough to blue to preserve trust." },
      { question: "Can SaaS brands copy Stripe colors?", answer: "They can borrow the structure, but exact imitation weakens differentiation." },
    ],
    relatedLinks: [
      { title: "SaaS brand colors", href: "/brand-colors/saas" },
      { title: "Purple color meaning", href: "/colors/purple" },
      { title: "Creative orbit palette", href: "/palettes/creative-orbit" },
    ],
  },
];

const colorMeaningEntries: ContentEntry[] = colors.map((entry) => {
  const cap = `${entry.slug[0].toUpperCase()}${entry.slug.slice(1)}`;
  return {
    ...entry,
    title: `${cap} Color Meaning`,
    relatedLinks: [
      { title: `${cap} color page`, href: `/colors/${entry.slug}` },
      ...entry.relatedLinks.filter((l) => !l.href.startsWith(`/color-meanings/${entry.slug}`)),
    ],
  };
});

const combinations: ContentEntry[] = [
  {
    slug: "blue-and-green",
    title: "Blue and Green Color Combination",
    description: "A trusted and growth-oriented combination for fintech, SaaS, healthcare, and sustainability brands.",
    answer:
      "Blue and green work well together because blue builds trust while green signals growth and positive progress. This combination is especially effective for fintech, healthcare, and SaaS products.",
    intent: "informational",
    keywords: ["blue and green color palette", "fintech color combination", "trust and growth colors"],
    sections: [
      { title: "Why it works", body: "The pairing covers both emotional security and forward momentum, which makes it versatile for conversion-driven products." },
      { title: "Where to use it", body: "Use blue for the base system and reserve green for success states, analytics, or growth messaging." },
      { title: "Risk", body: "Too many similar teal tones can blur hierarchy, so keep each hue distinct in purpose." },
    ],
    faq: [
      { question: "Is blue and green a good combo for brands?", answer: "Yes, especially for brands that need trust and growth in the same system." },
      { question: "What industries fit blue and green?", answer: "Fintech, healthcare, SaaS, climate tech, and education products fit especially well." },
    ],
    comparisonRows: [
      { label: "Blue dominant", bestFor: "SaaS, fintech", strengths: "Trust and clarity", watchouts: "Can feel generic" },
      { label: "Green dominant", bestFor: "Wellness, climate", strengths: "Growth and optimism", watchouts: "Can lose institutional trust" },
    ],
    relatedLinks: [
      { title: "Blue color meaning", href: "/colors/blue" },
      { title: "Green color meaning", href: "/colors/green" },
      { title: "Fintech palette", href: "/palettes/fintech-growth-grid" },
    ],
  },
  {
    slug: "black-and-gold",
    title: "Black and Gold Color Combination",
    description: "A premium combination for luxury ecommerce, hospitality, personal brands, and high-ticket services.",
    answer:
      "Black and gold is one of the strongest luxury color combinations because black adds authority and gold adds prestige. It works best for premium offers where perceived quality matters more than mass-market friendliness.",
    intent: "informational",
    keywords: ["black and gold branding", "luxury color combination", "premium website colors"],
    sections: [
      { title: "Luxury positioning", body: "This pairing increases perceived exclusivity, especially when typography and photography are equally refined." },
      { title: "Where to use it", body: "Use gold sparingly for accents, borders, highlights, and logos while black carries most of the structure." },
      { title: "Common mistake", body: "Too much shiny gold styling can feel cheap. Restraint is what makes the combination work." },
    ],
    faq: [
      { question: "What colors feel premium?", answer: "Black, ivory, gold, bronze, and deep jewel tones usually feel most premium." },
      { question: "Is black and gold good for websites?", answer: "Yes, especially for luxury, premium service, and high-ticket ecommerce sites." },
    ],
    relatedLinks: [
      { title: "Black color page", href: "/colors/black" },
      { title: "Luxury editorial noir", href: "/palettes/luxury-editorial-noir" },
      { title: "Midnight metal gradient", href: "/gradients/midnight-metal" },
    ],
  },
  {
    slug: "red-and-black",
    title: "Red and Black Color Combination",
    description: "A bold combination for sports, promotions, gaming, and high-intensity campaigns.",
    answer:
      "Red and black create one of the strongest high-intensity color combinations. It works best for promotional energy, sports, gaming, and brands that want to feel bold rather than calm or institutional.",
    intent: "informational",
    keywords: ["red and black website", "sports brand colors", "bold color combination"],
    sections: [
      { title: "Why it grabs attention", body: "The pairing combines urgency with authority, which makes it naturally dramatic and memorable." },
      { title: "Best use cases", body: "Sports brands, sale campaigns, music events, gaming launches, and performance-focused products fit this combination well." },
      { title: "Accessibility note", body: "Red on black often fails for smaller text, so reserve the pairing for large display moments and use lighter neutrals for readable copy." },
    ],
    faq: [
      { question: "Is red and black good for ecommerce?", answer: "It can work for promotions and hype-driven campaigns, but it is usually too aggressive for the entire store experience." },
      { question: "What brands use red and black?", answer: "Sports, automotive, entertainment, and gaming brands frequently use it." },
    ],
    relatedLinks: [
      { title: "Red color page", href: "/colors/red" },
      { title: "Marketing colors", href: "/marketing-colors" },
      { title: "Sunset burst gradient", href: "/gradients/sunset-burst" },
    ],
  },
  {
    slug: "blue-and-orange",
    title: "Blue and Orange Color Combination",
    description: "A high-contrast complementary pairing for CTAs, sports brands, and tech products that need energy without losing trust.",
    answer:
      "Blue and orange work as one of the strongest complementary pairings because they sit opposite each other on the color wheel — blue carries trust while orange carries action, which makes it a natural pattern for a trustworthy product with an energetic call to action.",
    intent: "informational",
    keywords: ["blue and orange color palette", "complementary color combination", "cta color pairing"],
    sections: [
      { title: "Why the contrast works", body: "As true complements, blue and orange create the strongest possible visual separation without using black or white, which is why the pairing shows up constantly in CTA buttons on trust-led backgrounds." },
      { title: "Where to use it", body: "Keep blue as the dominant system color and reserve orange for a single action per screen — the pairing loses its power if both hues compete for attention." },
      { title: "Risk", body: "Used in equal amounts, the pairing can feel like a sports jersey rather than a product. Let one hue lead." },
    ],
    faq: [
      { question: "Is blue and orange good for a SaaS product?", answer: "Yes, when blue carries the interface and orange is reserved for primary actions — it reads as trustworthy with a clear, energetic call to action." },
      { question: "Why do blue and orange contrast so well?", answer: "They sit directly opposite each other on the color wheel, so pairing them creates the maximum contrast available between two hues." },
    ],
    comparisonRows: [
      { label: "Blue dominant", bestFor: "SaaS, fintech dashboards", strengths: "Trust with a clear action color", watchouts: "Orange must stay sparse or it reads as noise" },
      { label: "Orange dominant", bestFor: "Sports, DTC energy brands", strengths: "High energy, strong recall", watchouts: "Loses institutional trust if overused" },
    ],
    relatedLinks: [
      { title: "Blue color meaning", href: "/colors/blue" },
      { title: "Orange color meaning", href: "/colors/orange" },
      { title: "DTC energy palette", href: "/palettes/dtc-energy-stack" },
    ],
  },
  {
    slug: "purple-and-gold",
    title: "Purple and Gold Color Combination",
    description: "A regal, premium combination for luxury, education, and awards-driven brands.",
    answer:
      "Purple and gold read as premium and ceremonial because both hues carry historical associations with royalty and achievement, which makes the pairing effective for luxury goods, universities, and award or membership programs.",
    intent: "informational",
    keywords: ["purple and gold color combination", "luxury brand colors", "royal color palette"],
    sections: [
      { title: "The royalty association", body: "Purple and gold together carry centuries of royal and ceremonial association, which is why the combination reads as premium almost immediately, without any other design signal." },
      { title: "Where it works", body: "Universities, award programs, premium loyalty tiers, and luxury goods all lean on this pairing because it signals status without needing extra ornamentation." },
      { title: "Keeping it modern", body: "A deep, muted purple with a restrained gold accent reads as contemporary luxury; a bright violet with shiny gold reads as costume rather than premium." },
    ],
    faq: [
      { question: "Is purple and gold outdated?", answer: "Not if the purple is deep and muted rather than bright violet, and the gold is used sparingly as an accent rather than as a dominant fill." },
      { question: "What brands use purple and gold?", answer: "Universities, award and loyalty programs, and luxury goods brands use it most consistently, since both audiences respond to its ceremonial associations." },
    ],
    relatedLinks: [
      { title: "Purple color meaning", href: "/colors/purple" },
      { title: "Creative orbit palette", href: "/palettes/creative-orbit" },
      { title: "Luxury editorial noir palette", href: "/palettes/luxury-editorial-noir" },
    ],
  },
  {
    slug: "black-and-orange",
    title: "Black and Orange Color Combination",
    description: "A bold, high-energy combination for sports, seasonal campaigns, and industrial or streetwear brands.",
    answer:
      "Black and orange create a bold, high-visibility combination because orange is one of the most attention-grabbing hues against a dark ground, which makes the pairing common for sports teams, industrial/safety branding, and seasonal campaigns.",
    intent: "informational",
    keywords: ["black and orange color combination", "bold brand colors", "sports team colors"],
    sections: [
      { title: "Why it grabs attention", body: "Orange against black is one of the highest-visibility color pairings available, which is why it shows up in safety signage as often as in sports branding." },
      { title: "Best use cases", body: "Sports teams, streetwear, industrial and safety-adjacent brands, and autumn or Halloween-season campaigns all lean on this combination for its immediate, bold recognition." },
      { title: "Balance matters", body: "Large areas of pure orange on black can feel harsh for long reading sessions — reserve saturated orange for accents and let black or a dark neutral carry most of the surface." },
    ],
    faq: [
      { question: "Is black and orange good for a full website?", answer: "It works best as an accent system rather than the entire palette — use black as the dominant surface and orange for a small number of high-priority actions." },
      { question: "What industries use black and orange?", answer: "Sports, industrial and safety branding, streetwear, and seasonal campaigns are the most consistent users of this pairing." },
    ],
    relatedLinks: [
      { title: "Black color meaning", href: "/colors/black" },
      { title: "Orange color meaning", href: "/colors/orange" },
      { title: "Apricot launch gradient", href: "/gradients/apricot-launch" },
    ],
  },
  {
    slug: "green-and-purple",
    title: "Green and Purple Color Combination",
    description: "An unusual, creative pairing for wellness-meets-luxury brands and imaginative product experiences.",
    answer:
      "Green and purple work well together as an analogous-adjacent pairing that feels more original than blue-based combinations, making it a strong fit for brands that want to signal both growth and creativity without defaulting to a common palette.",
    intent: "informational",
    keywords: ["green and purple color combination", "creative brand palette", "unusual color pairing"],
    sections: [
      { title: "Why it feels distinctive", body: "Fewer brands default to green and purple together than to blue-based pairings, which makes the combination feel more original and memorable in a crowded category." },
      { title: "Where to use it", body: "Wellness brands with a creative or premium angle, imaginative product experiences, and youth-oriented education products all benefit from the pairing's unusual energy." },
      { title: "Balance note", body: "Keep one hue clearly dominant — an even 50/50 split between green and purple tends to read as chaotic rather than intentional." },
    ],
    faq: [
      { question: "Is green and purple a good brand combination?", answer: "Yes, especially for brands that want to stand out from common blue-led palettes while still keeping a natural, non-aggressive feel." },
      { question: "Does green and purple work for wellness brands?", answer: "It works well when the brand wants to combine wellness (green) with a premium or creative angle (purple) rather than a purely calming, clinical feel." },
    ],
    relatedLinks: [
      { title: "Green color meaning", href: "/colors/green" },
      { title: "Purple color meaning", href: "/colors/purple" },
      { title: "Creative orbit palette", href: "/palettes/creative-orbit" },
    ],
  },
  {
    slug: "purple-and-black",
    title: "Purple and Black Color Combination",
    description: "A dramatic, premium combination for gaming, nightlife, and luxury digital products.",
    answer:
      "Purple and black create a dramatic, premium combination because black adds authority while purple adds a creative or mysterious edge, making the pairing especially common in gaming, nightlife, and premium digital products.",
    intent: "informational",
    keywords: ["purple and black color combination", "dark theme brand colors", "gaming brand colors"],
    sections: [
      { title: "Why it feels premium", body: "Black provides the authority and depth, while purple adds just enough color to avoid the flatness of black-and-white alone — the result reads as intentional rather than simply dark." },
      { title: "Best use cases", body: "Gaming brands, nightlife and events, and dark-mode-first digital products all use this combination to feel premium without leaning on the more common gold accent." },
      { title: "Accessibility note", body: "Purple text on black can fail contrast at smaller sizes — lighten the purple significantly for body copy and reserve the deepest tones for large display use." },
    ],
    faq: [
      { question: "Is purple and black good for dark mode?", answer: "Yes — it's one of the more distinctive dark-mode color pairs, but body text needs a notably lighter purple than the deep tone used for large surfaces or logos." },
      { question: "What brands use purple and black?", answer: "Gaming, nightlife, events, and premium dark-mode digital products use this pairing most consistently." },
    ],
    relatedLinks: [
      { title: "Purple color meaning", href: "/colors/purple" },
      { title: "Black color meaning", href: "/colors/black" },
      { title: "Midnight metal gradient", href: "/gradients/midnight-metal" },
    ],
  },
  {
    slug: "blue-and-black",
    title: "Blue and Black Color Combination",
    description: "A stable, institutional combination for enterprise software, finance, and professional service brands.",
    answer:
      "Blue and black together create one of the most institutional-feeling color combinations available, which makes it a common default for enterprise software, financial services, and B2B brands that need to signal stability above all else.",
    intent: "informational",
    keywords: ["blue and black color combination", "enterprise brand colors", "professional color palette"],
    sections: [
      { title: "Why it feels institutional", body: "Both hues independently signal trust and authority, so combining them produces a palette that feels stable and serious with very little additional design effort." },
      { title: "Best use cases", body: "Enterprise software, financial services, legal and professional services, and B2B products where reliability matters more than distinctiveness fit this pairing well." },
      { title: "Risk", body: "The combination is common enough that it can feel generic without a differentiated accent color carrying the brand's actual personality." },
    ],
    faq: [
      { question: "Is blue and black too generic for a startup?", answer: "It can be, unless paired with a distinctive accent color — on its own, blue and black is one of the most common enterprise palettes available." },
      { question: "Does blue and black work for dark mode?", answer: "Yes, it's a natural fit — use black as the surface and blue for primary actions and accents." },
    ],
    relatedLinks: [
      { title: "Blue color meaning", href: "/colors/blue" },
      { title: "Black color meaning", href: "/colors/black" },
      { title: "SaaS trust spectrum palette", href: "/palettes/saas-trust-spectrum" },
    ],
  },
  {
    slug: "green-and-black",
    title: "Green and Black Color Combination",
    description: "A grounded, premium-natural combination for sustainability, finance growth, and outdoor brands.",
    answer:
      "Green and black combine natural, growth-oriented meaning with the authority of black, making the pairing effective for sustainability brands, financial growth products, and outdoor or premium-natural goods that want to feel serious rather than purely eco-friendly.",
    intent: "informational",
    keywords: ["green and black color combination", "sustainable brand colors", "finance growth colors"],
    sections: [
      { title: "Why it works", body: "Black keeps the palette from feeling soft or purely decorative, while green supplies the growth and nature association — together they read as serious rather than merely eco-themed." },
      { title: "Best use cases", body: "Sustainability brands that want to be taken seriously, financial growth and investing products, and premium outdoor goods all fit this combination well." },
      { title: "Design note", body: "Use a deep, slightly muted green rather than a bright kelly green to keep the pairing feeling premium instead of purely seasonal." },
    ],
    faq: [
      { question: "Is green and black good for a finance app?", answer: "Yes, especially for investing or savings products where green's growth association pairs naturally with black's sense of stability and authority." },
      { question: "Does green and black feel too dark for a wellness brand?", answer: "It can if overused — pair it with a lighter neutral surface and reserve the black for accents or a dark-mode variant rather than the entire experience." },
    ],
    relatedLinks: [
      { title: "Green color meaning", href: "/colors/green" },
      { title: "Black color meaning", href: "/colors/black" },
      { title: "Fintech growth grid palette", href: "/palettes/fintech-growth-grid" },
    ],
  },
  {
    slug: "red-and-purple",
    title: "Red and Purple Color Combination",
    description: "An intense, expressive combination for entertainment, beauty, and bold creative brands.",
    answer:
      "Red and purple create an intense, expressive combination that works well for entertainment, beauty, and creative brands that want energy and drama without the coldness of blue-based palettes.",
    intent: "informational",
    keywords: ["red and purple color combination", "bold creative brand colors", "entertainment brand palette"],
    sections: [
      { title: "Why it feels expressive", body: "Red supplies urgency and heat, purple supplies creativity and drama — together they produce a palette with more emotional intensity than either color alone." },
      { title: "Best use cases", body: "Entertainment and events, beauty and cosmetics, and bold creative or youth brands benefit from the combination's high energy." },
      { title: "Balance matters", body: "Two highly saturated warm-leaning hues together can overwhelm — use one as a clear base and the other strictly as an accent." },
    ],
    faq: [
      { question: "Is red and purple too aggressive for a website?", answer: "It can be at full saturation across an entire page — the pairing works best as one dominant hue with the other used sparingly as an accent." },
      { question: "What brands use red and purple together?", answer: "Beauty, entertainment, events, and bold creative brands use this combination most often for its high emotional intensity." },
    ],
    relatedLinks: [
      { title: "Red color meaning", href: "/colors/red" },
      { title: "Purple color meaning", href: "/colors/purple" },
      { title: "Sunset burst gradient", href: "/gradients/sunset-burst" },
    ],
  },
  {
    slug: "red-and-orange",
    title: "Red and Orange Color Combination",
    description: "A maximum-urgency combination for flash sales, food brands, and high-energy campaigns.",
    answer:
      "Red and orange together create one of the highest-urgency color combinations available, which makes it effective for flash sales, food and appetite-driven brands, and short-duration high-energy campaigns — but risky as a full-time brand palette.",
    intent: "informational",
    keywords: ["red and orange color combination", "urgency color palette", "food brand colors"],
    sections: [
      { title: "Why it feels urgent", body: "Both hues independently signal urgency and appetite, so combining them produces one of the most attention-demanding palettes available without any other design device." },
      { title: "Best use cases", body: "Flash sales, food and restaurant brands, and short-duration promotional campaigns all benefit from the pairing's immediate energy." },
      { title: "Fatigue risk", body: "Sustained exposure to red-and-orange interfaces creates visual fatigue faster than cooler palettes — it's better suited to a campaign moment than a full-time product UI." },
    ],
    faq: [
      { question: "Is red and orange good for a permanent brand identity?", answer: "It works better for campaigns and food/appetite brands than for a full-time software product, where the intensity can tire users over repeated sessions." },
      { question: "Why do food brands use red and orange so often?", answer: "Both hues are associated with appetite and warmth, and the combination's urgency also encourages faster purchase decisions." },
    ],
    relatedLinks: [
      { title: "Red color meaning", href: "/colors/red" },
      { title: "Orange color meaning", href: "/colors/orange" },
      { title: "Apricot launch gradient", href: "/gradients/apricot-launch" },
    ],
  },
  {
    slug: "purple-and-orange",
    title: "Purple and Orange Color Combination",
    description: "A playful, high-energy split-complementary pairing for youth brands, events, and creative products.",
    answer:
      "Purple and orange work as a split-complementary pairing that feels playful and energetic rather than corporate, making it effective for youth-oriented brands, events, and creative products that want to stand out from more conventional blue-led palettes.",
    intent: "informational",
    keywords: ["purple and orange color combination", "playful brand colors", "creative youth brand palette"],
    sections: [
      { title: "Why it feels playful", body: "The combination is distinctive enough that it rarely reads as corporate, which is exactly why youth brands and creative products reach for it over more conventional pairings." },
      { title: "Best use cases", body: "Youth-oriented products, events and festivals, and creative or entertainment brands benefit most from the pairing's energetic, non-conformist feel." },
      { title: "Design note", body: "A muted purple with a bright orange accent reads as intentional design; two equally saturated tones can feel chaotic without a clear hierarchy." },
    ],
    faq: [
      { question: "Is purple and orange good for a serious B2B brand?", answer: "Generally no — the combination reads as playful and creative, which fits youth, events, and entertainment brands far better than enterprise or financial products." },
      { question: "How do I keep purple and orange from feeling chaotic?", answer: "Let one color dominate the surface area and use the other strictly as an accent, rather than splitting the palette evenly between the two." },
    ],
    relatedLinks: [
      { title: "Purple color meaning", href: "/colors/purple" },
      { title: "Orange color meaning", href: "/colors/orange" },
      { title: "Creative orbit palette", href: "/palettes/creative-orbit" },
    ],
  },
  {
    slug: "blue-and-red",
    title: "Blue and Red Color Combination",
    description: "A high-contrast trust-plus-urgency pairing for political, sports, and alert-driven interfaces.",
    answer:
      "Blue and red combine trust with urgency, which makes the pairing effective for contexts that need both credibility and immediate attention, such as sports teams, alert systems, and civic or political brands — but it needs a clear hierarchy so the two don't compete.",
    intent: "informational",
    keywords: ["blue and red color combination", "trust and urgency colors", "sports team color palette"],
    sections: [
      { title: "Why the pairing works", body: "Blue supplies credibility while red supplies urgency, so the combination fits situations that need both at once, like a civic brand or a product with time-sensitive alerts." },
      { title: "Best use cases", body: "Sports teams, civic and political branding, and interfaces where blue carries the base UI and red is reserved for alerts or critical states fit this pairing well." },
      { title: "Hierarchy matters", body: "Let blue dominate the surface and use red only for the specific moments that need urgency — status alerts, errors, or a single call to action — or the two hues will fight for attention." },
    ],
    faq: [
      { question: "Can blue and red work in the same UI without clashing?", answer: "Yes, if blue carries the base interface and red is reserved specifically for alerts, errors, or one high-priority action rather than general decoration." },
      { question: "Why do sports teams use blue and red together?", answer: "The pairing reads as both trustworthy and energetic, which suits a team identity that needs to feel credible and exciting at the same time." },
    ],
    relatedLinks: [
      { title: "Blue color meaning", href: "/colors/blue" },
      { title: "Red color meaning", href: "/colors/red" },
      { title: "Color contrast guide", href: "/accessibility/color-contrast" },
    ],
  },
  {
    slug: "blue-and-purple",
    title: "Blue and Purple Color Combination",
    description: "A calm, premium-tech combination for SaaS, creative tools, and subscription products.",
    answer:
      "Blue and purple create a calm but distinctive combination that keeps blue's trust while adding purple's creative or premium edge, which is why it's common among SaaS and creative-tool brands that want to feel more original than a blue-only system.",
    intent: "informational",
    keywords: ["blue and purple color combination", "saas brand colors", "premium tech palette"],
    sections: [
      { title: "Why it works", body: "Blue and purple sit close together on the color wheel, so the pairing feels cohesive rather than clashing, while still reading as more distinctive than blue alone." },
      { title: "Best use cases", body: "SaaS products, creative and productivity tools, and subscription brands that want trust with a slightly more premium or original feel benefit from this combination." },
      { title: "Design note", body: "Because the hues are close together, contrast between them can be subtle — pair with a light or dark neutral surface to keep hierarchy clear." },
    ],
    faq: [
      { question: "Is blue and purple too similar to work as a combination?", answer: "They're close on the color wheel, which makes them harmonious rather than high-contrast — pair with a neutral surface color to keep the hierarchy readable." },
      { question: "Why do SaaS brands use blue and purple together?", answer: "It keeps blue's trust signal while adding a more distinctive, premium edge than an all-blue system, without introducing a jarring contrast." },
    ],
    relatedLinks: [
      { title: "Blue color meaning", href: "/colors/blue" },
      { title: "Purple color meaning", href: "/colors/purple" },
      { title: "SaaS trust spectrum palette", href: "/palettes/saas-trust-spectrum" },
    ],
  },
  {
    slug: "green-and-red",
    title: "Green and Red Color Combination",
    description: "A high-recognition but high-risk pairing best known from status systems and seasonal branding.",
    answer:
      "Green and red are instantly recognizable together because of their strong status-color and seasonal associations, but the pairing is high-risk for general product use since it directly overlaps with the most common colorblind confusion pattern.",
    intent: "informational",
    keywords: ["green and red color combination", "status color palette", "seasonal brand colors"],
    sections: [
      { title: "Where it comes from", body: "Green and red are the default success/error status pairing in most software, and the default seasonal (holiday) color pairing in retail — both give it instant, near-universal recognition." },
      { title: "The accessibility problem", body: "Red-green color blindness is the most common form of color vision deficiency, so relying on green-versus-red alone to communicate meaning will fail for a meaningful share of users without icons or labels." },
      { title: "Safer use", body: "If using both, differentiate status or meaning with shape, icon, or label in addition to color — never rely on the red/green distinction alone." },
    ],
    faq: [
      { question: "Is green and red bad for accessibility?", answer: "It's risky when used to communicate meaning (like success vs. error) without a supporting icon or label, because it overlaps with the most common form of color blindness." },
      { question: "When is green and red still safe to use?", answer: "Purely decorative or seasonal use (like holiday branding) is lower-risk than using the pair to communicate status, where a colorblind user needs an alternative signal." },
    ],
    relatedLinks: [
      { title: "Green color meaning", href: "/colors/green" },
      { title: "Red color meaning", href: "/colors/red" },
      { title: "Color contrast guide", href: "/accessibility/color-contrast" },
    ],
  },
  {
    slug: "green-and-orange",
    title: "Green and Orange Color Combination",
    description: "A warm-meets-natural analogous pairing for outdoor, food, and wellness-with-energy brands.",
    answer:
      "Green and orange sit next to each other on the color wheel, producing an analogous pairing that feels natural and energetic at once, which fits outdoor brands, food products, and wellness brands that want warmth rather than a purely calm feel.",
    intent: "informational",
    keywords: ["green and orange color combination", "outdoor brand colors", "natural energetic palette"],
    sections: [
      { title: "Why it feels natural", body: "As neighboring hues on the color wheel, green and orange read as harmonious rather than clashing, evoking natural, harvest-like associations without any other design cue." },
      { title: "Best use cases", body: "Outdoor and adventure brands, food and beverage products, and wellness brands that want energy alongside their natural positioning fit this pairing well." },
      { title: "Design note", body: "Because both are warm-leaning and mid-saturation, the pairing can lack contrast for text — add a dark neutral for body copy rather than relying on the two hues alone." },
    ],
    faq: [
      { question: "Is green and orange good for a food brand?", answer: "Yes — it reads as natural and appetizing at once, which fits fresh food, produce, and harvest-themed branding particularly well." },
      { question: "Does green and orange work for text contrast?", answer: "Not reliably on its own — add a dark neutral for body text, since both hues are mid-saturation and don't provide strong contrast against each other." },
    ],
    relatedLinks: [
      { title: "Green color meaning", href: "/colors/green" },
      { title: "Orange color meaning", href: "/colors/orange" },
      { title: "Apricot launch gradient", href: "/gradients/apricot-launch" },
    ],
  },
];

const accessibilityEntries: ContentEntry[] = [
  {
    slug: "color-contrast",
    title: "Color Contrast Accessibility Guide",
    description: "A practical guide to WCAG contrast, readable UI color systems, and accessible text/background pairings.",
    answer:
      "Accessible color systems start with contrast, not aesthetics. For most body text, aim for at least WCAG AA contrast and test every critical UI state, especially buttons, alerts, and form feedback.",
    intent: "informational",
    keywords: ["wcag color contrast", "accessible colors", "website contrast guide"],
    sections: [
      { title: "Core rule", body: "Test text against every background it appears on instead of assuming a single brand color is safe everywhere." },
      { title: "High-risk areas", body: "Buttons, links, disabled states, validation messages, and gradient overlays fail most often." },
      { title: "System thinking", body: "Build accessible scales from the start so teams are not patching contrast problems page by page." },
    ],
    faq: [
      { question: "What contrast ratio should websites use?", answer: "WCAG AA requires at least 4.5:1 for normal text and 3:1 for larger text." },
      { question: "Do gradients affect contrast?", answer: "Yes, because different parts of a gradient can produce very different contrast outcomes." },
    ],
    relatedLinks: [
      { title: "Blue accessibility example", href: "/colors/blue" },
      { title: "Accessible Tailwind colors", href: "/tailwind/blue" },
      { title: "CSS color accessibility", href: "/css-colors/black" },
    ],
  },
  {
    slug: "accessible-success-states",
    title: "Accessible Success State Colors",
    description: "How to use green and supporting cues without excluding users with low vision or color-vision differences.",
    answer:
      "Accessible success states should never rely on green alone. Pair the color with icons, labels, and sufficient contrast so users can identify success even if hue perception is limited.",
    intent: "informational",
    keywords: ["accessible success color", "green accessibility", "wcag status colors"],
    sections: [
      { title: "Use multiple signals", body: "Add check icons, status labels, borders, and text reinforcement so success is not just a hue change." },
      { title: "Choose deeper greens", body: "Mid and dark greens usually perform better for text and controls than very light mint shades." },
      { title: "Test in context", body: "Status components often fail when placed on tinted cards, subtle alerts, or gradient backgrounds." },
    ],
    faq: [
      { question: "Can green be accessible?", answer: "Yes, if the shade has enough contrast and the state is supported by labels or icons." },
      { question: "What is the best success color?", answer: "There is no single best success color, but deeper greens and teals tend to be the most usable." },
    ],
    relatedLinks: [
      { title: "Green color page", href: "/colors/green" },
      { title: "Contrast guide", href: "/accessibility/color-contrast" },
      { title: "Fintech palette", href: "/palettes/fintech-growth-grid" },
    ],
  },
];

const tailwindEntries: ContentEntry[] = ["blue", "green", "purple", "orange", "black"].map((color) => ({
  slug: color,
  title: `Tailwind ${color[0].toUpperCase()}${color.slice(1)} Color Guide`,
  description: `Use Tailwind ${color} classes for consistent UI hierarchy, accessible components, and brand-aligned design tokens.`,
  answer:
    `Tailwind ${color} utilities work best when they are assigned to specific semantic roles such as primary actions, accents, or states. Teams get better consistency when they map each scale to one purpose instead of styling ad hoc.`,
  intent: "informational",
  keywords: [`tailwind ${color}`, `${color} tailwind classes`, `${color} ui palette`],
  sections: [
    { title: "Semantic mapping", body: `Use Tailwind ${color} shades for a defined role like primary, accent, or support instead of mixing them across unrelated components.` },
    { title: "Scale guidance", body: "Keep lighter shades for backgrounds, mid shades for fills, and darker shades for text or borders where contrast matters." },
    { title: "Team workflow", body: "Mirror your Tailwind color choices in tokens and documentation so marketing and product share the same language." },
  ],
  faq: [
    { question: `How should teams use Tailwind ${color}?`, answer: "Map the scale to specific UI jobs and test contrast on every interactive state before shipping." },
    { question: `Can Tailwind ${color} work for branding?`, answer: "Yes, especially when the utility scale is aligned to a broader design-token system." },
  ],
  relatedLinks: [
    { title: `${color[0].toUpperCase()}${color.slice(1)} color page`, href: `/colors/${color}` },
    { title: `${color[0].toUpperCase()}${color.slice(1)} CSS guide`, href: `/css-colors/${color}` },
    { title: `${color[0].toUpperCase()}${color.slice(1)} color meaning`, href: `/color-meanings/${color}` },
    { title: "Color contrast guide", href: "/accessibility/color-contrast" },
  ],
}));

const cssColorEntries: ContentEntry[] = ["blue", "green", "purple", "orange", "black"].map((color) => ({
  slug: color,
  title: `CSS ${color[0].toUpperCase()}${color.slice(1)} Color Guide`,
  description: `How to use ${color} in CSS variables, semantic tokens, and scalable interface systems.`,
  answer:
    `CSS colors work best when they are stored as semantic custom properties instead of being hard-coded component by component. That makes it easier to align product UI, theming, and content design.`,
  intent: "informational",
  keywords: [`css ${color}`, `${color} css variable`, `${color} design token`],
  sections: [
    { title: "Use custom properties", body: "Define semantic variables like --color-primary or --color-success so the UI can evolve without editing every component." },
    { title: "Support theming", body: "Pair hue tokens with neutral surface tokens to make light, dark, and campaign themes easier to maintain." },
    { title: "Accessibility first", body: "Test text, borders, and hover states at the token level so entire systems stay readable by default." },
  ],
  faq: [
    { question: `Should ${color} be hard-coded in CSS?`, answer: "Usually no. Semantic variables make product changes safer and more scalable." },
    { question: `Can CSS ${color} values help SEO?`, answer: "Not directly, but a consistent design system supports better UX, engagement, and content clarity." },
  ],
  relatedLinks: [
    { title: `${color[0].toUpperCase()}${color.slice(1)} Tailwind guide`, href: `/tailwind/${color}` },
    { title: `${color[0].toUpperCase()}${color.slice(1)} color meaning`, href: `/color-meanings/${color}` },
    { title: `${color[0].toUpperCase()}${color.slice(1)} color page`, href: `/colors/${color}` },
    { title: "Accessibility guide", href: "/accessibility/color-contrast" },
  ],
}));

const guides: ContentEntry[] = [
  {
    slug: "conversion-color-strategy",
    title: "What Colors Increase Conversions?",
    description: "An answer-first guide to conversion color strategy for USA landing pages, SaaS, and ecommerce funnels.",
    answer:
      "Colors increase conversions when they create clear hierarchy and match user expectations. Blue often improves trust-based conversions, while orange or red can improve attention for high-action offers when used selectively.",
    intent: "informational",
    keywords: ["what colors increase conversions", "best conversion colors", "cta color strategy"],
    sections: [
      { title: "Trust vs urgency", body: "Blue helps when buyers need confidence. Orange and red help when attention and urgency are more important." },
      { title: "The real conversion driver", body: "Contrast, hierarchy, message fit, and audience expectations matter more than any universal best color." },
      { title: "USA search intent fit", body: "Most searchers want a simple answer first, then industry-specific examples and caveats." },
    ],
    faq: [
      { question: "What colors increase conversions?", answer: "Blue often helps trust-based products convert, while orange and red can increase attention for action-focused offers." },
      { question: "What color attracts customers?", answer: "It depends on category, but blue attracts trust-focused customers and warm colors attract attention." },
    ],
    comparisonRows: [
      { label: "Blue", bestFor: "SaaS, finance, healthcare", strengths: "Trust and clarity", watchouts: "Can feel generic" },
      { label: "Orange", bestFor: "DTC, onboarding, promotions", strengths: "Warm action", watchouts: "Can fail contrast when too light" },
      { label: "Red", bestFor: "Urgency campaigns", strengths: "Attention and speed", watchouts: "Can feel stressful" },
    ],
    relatedLinks: [
      { title: "DTC palette", href: "/palettes/dtc-energy-stack" },
      { title: "Marketing colors", href: "/marketing-colors" },
      { title: "CTA color FAQ", href: "/faqs/cta-colors" },
    ],
  },
  {
    slug: "ai-website-color-strategy",
    title: "Best Colors for AI Websites",
    description: "A practical guide to choosing colors for AI tools, assistants, and modern product launches.",
    answer:
      "AI websites often perform best with blue, indigo, or purple foundations because those colors feel technical, modern, and trustworthy. The best systems then add one brighter accent to keep the brand memorable.",
    intent: "informational",
    keywords: ["best colors for ai websites", "ai website color palette", "ai brand colors"],
    sections: [
      { title: "Best default", body: "Start with blue or indigo if trust matters most, and shift toward purple if differentiation is a higher priority." },
      { title: "Accent strategy", body: "Use a warm or electric secondary accent sparingly in highlights, badges, and motion-heavy hero areas." },
      { title: "Avoid overload", body: "AI brands often overuse gradients and glow effects. Keep core reading surfaces stable and neutral." },
    ],
    faq: [
      { question: "What colors fit AI brands?", answer: "Blue, indigo, and purple are the most common because they feel modern and trustworthy." },
      { question: "Should AI websites use gradients?", answer: "Yes, but mainly for visual emphasis rather than the entire reading experience." },
    ],
    relatedLinks: [
      { title: "Creative orbit palette", href: "/palettes/creative-orbit" },
      { title: "Violet aurora gradient", href: "/gradients/violet-aurora" },
      { title: "Purple meaning", href: "/color-meanings/purple" },
    ],
  },
  {
    slug: "luxury-brand-color-strategy",
    title: "Luxury Brand Color Strategy",
    description: "How premium brands use black, ivory, deep jewel tones, and restrained accents to increase perceived value.",
    answer:
      "Luxury brands usually perform best with restrained color systems, not louder ones. Black, ivory, and deep accent tones help increase perceived quality because they create focus, contrast, and visual discipline.",
    intent: "informational",
    keywords: ["luxury brand colors", "premium color strategy", "best colors for luxury websites"],
    sections: [
      { title: "Perceived value", body: "Minimal palettes make spacing, imagery, and typography feel more expensive and curated." },
      { title: "Where accents belong", body: "Use metallic-inspired or jewel accents in micro-moments, not everywhere." },
      { title: "Digital implementation", body: "Premium websites should use softened blacks and warm whites for better comfort and polish." },
    ],
    faq: [
      { question: "What colors feel luxurious?", answer: "Black, ivory, deep jewel tones, and restrained metallic accents usually feel most luxurious." },
      { question: "Do luxury websites need many colors?", answer: "No. Fewer, better-controlled colors usually increase premium perception." },
    ],
    relatedLinks: [
      { title: "Black color page", href: "/colors/black" },
      { title: "Luxury palette", href: "/palettes/luxury-editorial-noir" },
      { title: "Black and gold combination", href: "/color-combinations/black-and-gold" },
    ],
  },
  {
    slug: "startup-website-color-strategy",
    title: "Startup Website Color Strategy",
    description: "A guide to choosing startup colors that balance credibility, energy, and category differentiation.",
    answer:
      "Startup websites need a balance of credibility and memorability. The strongest systems usually pair a stable base color such as blue or indigo with a warmer accent that adds personality without reducing clarity.",
    intent: "informational",
    keywords: ["startup website colors", "best colors for startup websites", "saas startup palette"],
    sections: [
      { title: "Why startups miss the mark", body: "Many teams choose colors that look trendy in screenshots but do not support product hierarchy or trust." },
      { title: "Safe structure", body: "Use one brand-leading hue, one accent, and a disciplined neutral system across site and app." },
      { title: "Go-to-market fit", body: "Early-stage products need colors that work in ads, decks, landing pages, and product UI at the same time." },
    ],
    faq: [
      { question: "What is the best color for startup websites?", answer: "Blue or indigo is the strongest default, with warmer accents for energy and recall." },
      { question: "Should startups use bright gradients?", answer: "Only in selective moments so the brand still feels reliable and mature." },
    ],
    relatedLinks: [
      { title: "SaaS brand colors", href: "/brand-colors/saas" },
      { title: "Apricot launch gradient", href: "/gradients/apricot-launch" },
      { title: "What colors increase conversions?", href: "/guides/conversion-color-strategy" },
    ],
  },
  {
    slug: "homepage-color-mistakes-hurting-conversions",
    title: "Homepage Color Mistakes That Hurt Conversions",
    description: "A practical guide to the color mistakes that quietly make US homepages feel cheap, confusing, or hard to trust.",
    answer:
      "Most homepage color mistakes do not fail because the hue is ugly. They fail because the page loses hierarchy, trust, or readability. The strongest homepages usually use fewer colors, clearer contrast, and one obvious conversion path.",
    intent: "informational",
    keywords: [
      "homepage color mistakes",
      "website color mistakes",
      "colors hurting conversions",
      "landing page color mistakes",
      "homepage color strategy",
    ],
    sections: [
      {
        title: "Too many accents create indecision",
        body: "When every badge, icon, button, and section uses a different accent, users stop knowing what matters. A homepage should feel directed, not noisy. One primary accent and one support accent is usually enough for most US startup and service pages.",
      },
      {
        title: "Low contrast makes a page feel unfinished",
        body: "Many founders think the problem is branding when the real issue is readability. Pale gray text, washed-out orange buttons, and soft gradients behind headlines often make the page feel less credible before users even read the offer.",
      },
      {
        title: "Color without category fit hurts trust",
        body: "A playful neon palette may work for a creator tool, but it can weaken confidence for legal, healthcare, insurance, or fintech pages. Users judge whether a color system feels appropriate within seconds, especially in trust-heavy American markets.",
      },
      {
        title: "Good homepages repeat color roles consistently",
        body: "Strong pages repeat the same meaning: one color for primary action, one for positive states, one neutral family for reading surfaces, and restrained support colors for emphasis. That consistency makes the brand feel deliberate instead of improvised.",
      },
    ],
    faq: [
      {
        question: "What is the biggest homepage color mistake?",
        answer: "The biggest mistake is usually weak hierarchy. If the CTA, headline, and supporting sections all compete visually, users feel friction before they feel interest.",
      },
      {
        question: "How many colors should a homepage use?",
        answer: "Most high-performing homepages work best with one primary brand hue, one accent, and a disciplined neutral system. More than that often needs very careful art direction.",
      },
    ],
    definitions: [
      {
        term: "Homepage color hierarchy",
        definition: "The order in which colors tell users what to read, trust, click, and ignore on a homepage.",
      },
      {
        term: "Conversion-focused palette",
        definition: "A restrained color system built to improve clarity, trust, CTA visibility, and reading comfort instead of just looking trendy.",
      },
    ],
    prosCons: {
      pros: [
        "Helps users find the main CTA faster.",
        "Makes the page feel more trustworthy and intentional.",
        "Improves readability across hero, pricing, and feature sections.",
      ],
      cons: [
        "A very restrained palette can feel flat if the copy and layout are weak.",
        "Trend-heavy brands may feel less expressive if every accent is over-disciplined.",
      ],
    },
    comparisonRows: [
      { label: "Disciplined system", bestFor: "SaaS, agencies, healthcare, service brands", strengths: "Clear hierarchy and trust", watchouts: "Needs strong copy to avoid feeling plain" },
      { label: "Accent-heavy system", bestFor: "Creator tools, launches, DTC campaigns", strengths: "Energy and attention", watchouts: "Can look chaotic or cheap fast" },
    ],
    relatedLinks: [
      { title: "What colors increase conversions?", href: "/guides/conversion-color-strategy" },
      { title: "Best CTA color FAQ", href: "/faqs/cta-colors" },
      { title: "Contrast checker", href: "/tools/contrast" },
      { title: "Startup website color strategy", href: "/guides/startup-website-color-strategy" },
    ],
  },
  {
    slug: "best-colors-for-healthcare-websites-usa",
    title: "Best Colors for Healthcare Websites in the USA",
    description: "How US healthcare websites can use color to build trust, reduce anxiety, and keep booking or inquiry flows clear.",
    answer:
      "The best colors for healthcare websites in the USA are usually blue, teal, soft green, and calm neutrals. These colors work because they feel credible, readable, and reassuring without adding visual stress during important decisions.",
    intent: "informational",
    keywords: [
      "best colors for healthcare websites",
      "healthcare website colors usa",
      "medical website color palette",
      "doctor website color strategy",
      "hospital website colors",
    ],
    sections: [
      {
        title: "Why blue still wins",
        body: "Blue remains the safest healthcare default because it signals stability and professionalism. For hospitals, clinics, telehealth products, and insurance-adjacent services, that immediate sense of order matters more than novelty.",
      },
      {
        title: "Teal and green reduce emotional friction",
        body: "Teal and softer greens often help healthcare brands feel more human and less institutional. They are especially useful for wellness, pediatrics, mental health, dental, and patient-experience-led brands that want calm without losing trust.",
      },
      {
        title: "Warm colors should stay secondary",
        body: "Orange, coral, or warm yellow can work in small moments such as highlights or scheduling cues, but they should not dominate the reading experience. In healthcare, too much heat can feel promotional when users want reassurance.",
      },
      {
        title: "Accessibility matters more in healthcare than trendiness",
        body: "Healthcare sites often serve older users, stressed users, and mobile visitors making important decisions fast. Clear contrast, obvious buttons, and calmer surface colors usually matter more than trying to look visually disruptive.",
      },
    ],
    faq: [
      {
        question: "What color builds trust for medical websites?",
        answer: "Blue is usually the strongest trust color for medical and healthcare websites because it feels organized, stable, and familiar.",
      },
      {
        question: "Can healthcare websites use green?",
        answer: "Yes. Green works well when the brand wants to feel restorative, supportive, or wellness-oriented, especially when paired with strong neutrals and accessible text contrast.",
      },
    ],
    definitions: [
      {
        term: "Healthcare trust colors",
        definition: "Colors that help medical websites feel credible, calm, and easy to trust during important patient decisions.",
      },
      {
        term: "Patient-friendly palette",
        definition: "A color system designed to reduce stress, preserve readability, and keep booking or inquiry paths visually clear.",
      },
    ],
    prosCons: {
      pros: [
        "Blue and teal make healthcare brands feel stable and reassuring.",
        "Soft green can add warmth without losing professionalism.",
        "Calmer palettes usually support better reading and mobile usability.",
      ],
      cons: [
        "Overusing blue can make a healthcare brand feel generic.",
        "Warm accents can feel too promotional if they dominate the page.",
      ],
    },
    comparisonRows: [
      { label: "Blue", bestFor: "Hospitals, clinics, telehealth, insurance-adjacent services", strengths: "Trust and clarity", watchouts: "Can feel generic if unsupported" },
      { label: "Teal/green", bestFor: "Wellness, dental, mental health, modern care brands", strengths: "Calm and human warmth", watchouts: "Needs strong contrast and structure" },
    ],
    relatedLinks: [
      { title: "Healthcare brand colors", href: "/brand-colors/healthcare" },
      { title: "Blue color meaning", href: "/colors/blue" },
      { title: "Green color meaning", href: "/colors/green" },
      { title: "Accessible success states", href: "/accessibility/accessible-success-states" },
    ],
  },
];

const explainers: ContentEntry[] = [
  {
    slug: "why-blue-builds-trust",
    title: "Why Blue Builds Trust",
    description: "A short explainer on why blue remains the strongest trust color across many US digital categories.",
    answer:
      "Blue builds trust because it feels stable, clear, and low-risk. That is why it appears so often in finance, healthcare, and SaaS brands where users need confidence before they act.",
    intent: "informational",
    keywords: ["why blue builds trust", "trust color psychology", "blue brand psychology"],
    sections: [
      { title: "Psychology in practice", body: "Blue is not magic, but it reliably supports calm, clarity, and institutional credibility in modern interfaces." },
      { title: "Where it wins", body: "It works best when the user journey depends on reassurance rather than urgency." },
      { title: "What makes it work", body: "Typography, spacing, and neutral balance are what keep blue from feeling bland." },
    ],
    faq: [
      { question: "What color improves trust?", answer: "Blue is generally the strongest trust color across digital products and service brands." },
      { question: "Is blue always best?", answer: "No, but it is the safest default when credibility matters more than excitement." },
    ],
    relatedLinks: [
      { title: "Blue color page", href: "/colors/blue" },
      { title: "Healthcare brand colors", href: "/brand-colors/healthcare" },
      { title: "Conversion color strategy", href: "/guides/conversion-color-strategy" },
    ],
  },
  {
    slug: "how-color-psychology-affects-buyers",
    title: "How Color Psychology Affects Buyers",
    description: "An answer-first explainer on how color shapes trust, urgency, appetite, and premium perception.",
    answer:
      "Color psychology affects buyers by changing how quickly a page feels trustworthy, urgent, premium, or approachable. The strongest results come from pairing the right emotional tone with clear hierarchy and audience fit.",
    intent: "informational",
    keywords: ["how color psychology affects buyers", "marketing color psychology", "buying behavior colors"],
    sections: [
      { title: "Emotions are contextual", body: "Red does not always mean urgency and blue does not always mean trust. Category expectations influence the effect." },
      { title: "Hierarchy matters more", body: "Color works through contrast and emphasis as much as through symbolism." },
      { title: "Use cases", body: "Trust categories lean blue, wellness leans green, luxury leans black, and hype campaigns lean warm." },
    ],
    faq: [
      { question: "What colors attract customers?", answer: "Colors that match customer expectations and make the page easier to understand attract customers best." },
      { question: "Do colors directly cause sales?", answer: "Not by themselves. Offer quality, messaging, and clarity still matter most." },
    ],
    relatedLinks: [
      { title: "Marketing colors", href: "/marketing-colors" },
      { title: "Color meanings", href: "/color-meanings/blue" },
      { title: "FAQ on trust colors", href: "/faqs/trust-colors" },
    ],
  },
];

const comparisons: ContentEntry[] = [
  {
    slug: "saas-vs-fintech-brand-colors",
    title: "SaaS vs Fintech Brand Colors",
    description: "A comparison of color strategy differences between SaaS and fintech brands targeting US buyers.",
    answer:
      "SaaS and fintech both lean on trust colors, but fintech needs more visible security and financial credibility. SaaS can usually introduce more personality through gradients, accent colors, and playful secondary hues.",
    intent: "informational",
    keywords: ["saas vs fintech colors", "fintech brand colors vs saas", "best color for saas websites"],
    sections: [
      { title: "Shared foundation", body: "Both categories often start with blue because clarity and trust matter early in the user journey." },
      { title: "Where fintech is stricter", body: "Fintech usually needs darker anchors, stronger neutrals, and more restrained visual experimentation." },
      { title: "Where SaaS can stretch", body: "SaaS brands often have more room for personality in gradients, hero accents, and motion design." },
    ],
    faq: [
      { question: "What is the best color for SaaS websites?", answer: "Blue is still the strongest SaaS default, especially when supported by distinctive accents." },
      { question: "What palette works for fintech brands?", answer: "Blue plus green is usually the best fintech combination for trust and growth." },
    ],
    comparisonRows: [
      { label: "SaaS", bestFor: "Product clarity and trust", strengths: "Flexible accents and gradients", watchouts: "Can look generic" },
      { label: "Fintech", bestFor: "Security and growth", strengths: "Credibility and clear status cues", watchouts: "Can feel too conservative" },
    ],
    relatedLinks: [
      { title: "SaaS brand colors", href: "/brand-colors/saas" },
      { title: "Fintech brand colors", href: "/brand-colors/fintech" },
      { title: "Fintech palette", href: "/palettes/fintech-growth-grid" },
    ],
  },
  {
    slug: "blue-vs-green-for-trust",
    title: "Blue vs Green for Trust",
    description: "Compare blue and green when deciding which color to use for credibility, product trust, and conversion.",
    answer:
      "Blue is usually better for pure trust, while green is better for growth and positive progress. If a brand needs institutional credibility, start with blue. If it needs optimism and momentum, add green as support.",
    intent: "informational",
    keywords: ["blue vs green trust", "best trust color", "blue or green for websites"],
    sections: [
      { title: "Blue's advantage", body: "Blue feels more stable and universal, which makes it stronger in regulated or higher-risk decisions." },
      { title: "Green's advantage", body: "Green adds positivity, wellness, and growth cues that blue alone may not communicate." },
      { title: "Best combined strategy", body: "Use blue for the core system and green for positive states, outcomes, and supporting brand cues." },
    ],
    faq: [
      { question: "What color improves trust?", answer: "Blue is usually the strongest trust color, especially in finance, healthcare, and enterprise software." },
      { question: "Is green trustworthy too?", answer: "Yes, but it tends to communicate growth and wellness more than institutional credibility." },
    ],
    comparisonRows: [
      { label: "Blue", bestFor: "Trust-first brands", strengths: "Stable and clear", watchouts: "Common in many categories" },
      { label: "Green", bestFor: "Growth-first brands", strengths: "Positive and optimistic", watchouts: "Can lose authority alone" },
    ],
    relatedLinks: [
      { title: "Blue color page", href: "/colors/blue" },
      { title: "Green color page", href: "/colors/green" },
      { title: "Blue and green combination", href: "/color-combinations/blue-and-green" },
    ],
  },
  {
    slug: "hueflow-vs-coolors",
    title: "HueFlow vs Coolors: Which Free Color Tool Should You Use?",
    description: "An honest comparison of HueFlow and Coolors covering palette generation, accessibility, developer tooling, and distribution.",
    answer:
      "HueFlow and Coolors both generate palettes for free with no sign-up. HueFlow goes further on accessibility (built-in contrast checker and colorblind simulation), developer handoff (design tokens for CSS, Tailwind, Swift, Kotlin, and Flutter), and a CSS animation generator that Coolors doesn't offer. Coolors is ahead on distribution, with a native iOS app, Figma plugin, and Chrome extension, plus a larger 500+ named color library versus HueFlow's smaller curated set.",
    intent: "commercial",
    keywords: ["hueflow vs coolors", "coolors alternative", "free color palette generator", "best free color tool"],
    sections: [
      { title: "Where they're equal", body: "Both are free with no account required to generate a palette. Both support locking colors while randomizing, image-to-palette extraction, and exporting to common formats like CSS and Tailwind." },
      { title: "Where HueFlow is ahead", body: "HueFlow includes a WCAG contrast checker and colorblind simulator in the core generator (not a separate tool), a CSS keyframe animation generator, live UI mockup previews across five layouts, and design tokens that export to Swift, Kotlin, and Flutter in addition to web formats." },
      { title: "Where Coolors is ahead", body: "Coolors has wider distribution — a native iOS app, Figma plugin, and Chrome extension — plus a larger named-color database (500+ vs. HueFlow's smaller curated set) and a broader image-editing toolkit (photo editor, SVG recolor, collage maker)." },
    ],
    faq: [
      { question: "Is HueFlow free?", answer: "Yes. HueFlow's generator, gradient tool, contrast checker, and design token exporter are free with no sign-up required." },
      { question: "Is HueFlow a good Coolors alternative?", answer: "Yes, especially if accessibility checking, developer token export, or a CSS animation generator matter to your workflow — those aren't built into Coolors' core tool. If you need a Figma plugin or native app, Coolors currently covers that and HueFlow does not." },
      { question: "Does HueFlow have a browser extension like Coolors?", answer: "Not currently. Coolors offers a Chrome extension, Figma plugin, and Adobe extension; HueFlow is web-only today." },
    ],
    comparisonRows: [
      { label: "Palette generation", bestFor: "Both", strengths: "Free, no sign-up, lock-and-randomize", watchouts: "Feature parity — not a differentiator either way" },
      { label: "Accessibility tooling", bestFor: "HueFlow", strengths: "Built-in contrast checker and colorblind simulation", watchouts: "Coolors offers contrast checking as a separate tool" },
      { label: "Developer handoff", bestFor: "HueFlow", strengths: "Design tokens for CSS, Tailwind, Swift, Kotlin, Flutter", watchouts: "Coolors' export is CSS/Tailwind-focused" },
      { label: "Distribution", bestFor: "Coolors", strengths: "iOS app, Figma plugin, Chrome extension", watchouts: "HueFlow is web-only" },
      { label: "Color database size", bestFor: "Coolors", strengths: "500+ named colors", watchouts: "HueFlow's curated set is smaller today" },
    ],
    relatedLinks: [
      { title: "Palette generator", href: "/generator" },
      { title: "Contrast checker tool", href: "/tools/contrast" },
      { title: "Design token generator", href: "/tools/design-tokens" },
      { title: "Color animation generator", href: "/tools/animation" },
    ],
  },
];

const bestColorsFor: ContentEntry[] = [
  {
    slug: "saas-websites",
    title: "Best Colors for SaaS Websites",
    description: "A fast answer page covering the best colors, palettes, and gradients for SaaS sites targeting US buyers.",
    answer:
      "The best colors for SaaS websites are usually blue or indigo paired with calm neutrals and one clear accent color. This structure builds trust, improves readability, and keeps product demos easy to scan.",
    intent: "commercial",
    keywords: ["best colors for saas websites", "saas website colors", "best saas palette"],
    sections: [
      { title: "Best base colors", body: "Blue and indigo are safest because they feel trustworthy and work naturally in interface design." },
      { title: "Best accent colors", body: "Mint, teal, amber, and selective coral accents help SaaS brands stand out without looking risky." },
      { title: "Best gradients", body: "Blue-led gradients usually work best in hero sections and launch cards." },
    ],
    faq: [
      { question: "What is the best color for SaaS websites?", answer: "Blue is usually the strongest default because it signals trust and supports product clarity." },
      { question: "Should SaaS brands use purple?", answer: "Purple can work well for AI and creative tools when balanced with strong neutrals." },
    ],
    relatedLinks: [
      { title: "SaaS brand colors", href: "/brand-colors/saas" },
      { title: "SaaS trust palette", href: "/palettes/saas-trust-spectrum" },
      { title: "Ocean depth gradient", href: "/gradients/ocean-depth" },
    ],
  },
  {
    slug: "fintech-brands",
    title: "Best Colors for Fintech Brands",
    description: "The best colors, combinations, and page patterns for fintech websites and product interfaces.",
    answer:
      "The best colors for fintech brands are deep blue, green, and disciplined neutrals. Blue builds trust, green supports growth, and neutral surfaces keep financial data legible and credible.",
    intent: "commercial",
    keywords: ["best colors for fintech", "fintech brand colors", "fintech website colors"],
    sections: [
      { title: "Trust layer", body: "Use blue for headers, navigation, and key product actions." },
      { title: "Growth layer", body: "Use green for gain, savings, and goal-completion states." },
      { title: "Premium layer", body: "Add graphite or black if the brand targets higher-net-worth or enterprise users." },
    ],
    faq: [
      { question: "What color palette works for fintech brands?", answer: "Blue and green are usually the best fintech palette because they balance trust and growth." },
      { question: "Can fintech use bright gradients?", answer: "Yes in marketing moments, but core product surfaces should stay calmer and clearer." },
    ],
    relatedLinks: [
      { title: "Fintech brand colors", href: "/brand-colors/fintech" },
      { title: "Fintech growth palette", href: "/palettes/fintech-growth-grid" },
      { title: "Blue and green combination", href: "/color-combinations/blue-and-green" },
    ],
  },
  {
    slug: "ecommerce-conversions",
    title: "Best Colors for Ecommerce Conversions",
    description: "A practical answer page for DTC and ecommerce teams choosing colors that improve action and trust.",
    answer:
      "The best ecommerce conversion colors usually combine trustworthy foundations with warm CTA accents. Use blue or dark neutrals for structure, then use orange, coral, or red selectively for promotional actions.",
    intent: "commercial",
    keywords: ["best colors for ecommerce conversions", "ecommerce cta colors", "conversion color palette"],
    sections: [
      { title: "Trust still matters", body: "Even in DTC, pages convert better when the base system feels organized and reliable." },
      { title: "Warm action accents", body: "Orange and coral can help add energy to CTAs and promos without overwhelming the whole page." },
      { title: "Category fit", body: "Luxury ecommerce tends to prefer black and ivory systems, while fast-moving DTC often uses warmer accents." },
    ],
    faq: [
      { question: "What colors increase conversions?", answer: "Colors that create strong hierarchy and fit the category usually convert best. Warm CTA accents often help." },
      { question: "What colors attract customers?", answer: "Trust-oriented colors attract reassurance-driven buyers, while warm accents attract faster attention." },
    ],
    relatedLinks: [
      { title: "DTC energy stack palette", href: "/palettes/dtc-energy-stack" },
      { title: "Orange color page", href: "/colors/orange" },
      { title: "Conversion color strategy", href: "/guides/conversion-color-strategy" },
    ],
  },
];

const faqs: ContentEntry[] = [
  {
    slug: "trust-colors",
    title: "FAQ: What Color Improves Trust?",
    description: "Quick answers about trust colors for websites, apps, financial brands, and healthcare companies.",
    answer:
      "Blue is usually the best color for trust because it feels stable, familiar, and low-risk. It is especially effective for SaaS, healthcare, finance, and professional services targeting US audiences.",
    intent: "informational",
    keywords: ["what color improves trust", "trust colors faq", "best trust color"],
    sections: [
      { title: "Short answer", body: "Blue is the strongest trust default, followed by teal and calm neutrals depending on the category." },
      { title: "Where it works best", body: "It works best where users need confidence before signing up, booking, or purchasing." },
      { title: "When it is not enough", body: "Bad layout, weak offer clarity, and poor contrast will still hurt conversions even with a trustworthy palette." },
    ],
    faq: [
      { question: "What color improves trust?", answer: "Blue is usually the strongest trust color across digital products and service brands." },
      { question: "Is green trustworthy too?", answer: "Green can support trust, but it usually communicates growth or wellness more than institutional stability." },
    ],
    relatedLinks: [
      { title: "Blue color meaning", href: "/colors/blue" },
      { title: "Healthcare brand colors", href: "/brand-colors/healthcare" },
      { title: "Blue vs green comparison", href: "/comparisons/blue-vs-green-for-trust" },
    ],
  },
  {
    slug: "cta-colors",
    title: "FAQ: What Is the Best CTA Color?",
    description: "Fast answers about the best CTA colors for SaaS, ecommerce, and landing pages.",
    answer:
      "There is no single best CTA color for every page. The best CTA color is the one that creates the strongest contrast, matches brand expectations, and stands apart from surrounding interface elements.",
    intent: "informational",
    keywords: ["best cta color", "best button color", "cta color faq"],
    sections: [
      { title: "Why there is no universal winner", body: "A button color works because of context and contrast, not because the hue is inherently better." },
      { title: "Common winners", body: "Blue works well for trust-led products, while orange and red can increase attention in action-heavy funnels." },
      { title: "What to test", body: "Test hierarchy, whitespace, copy, and surrounding color noise before concluding the CTA hue is the issue." },
    ],
    faq: [
      { question: "What is the best CTA color?", answer: "The best CTA color is the one with the strongest meaningful contrast and clearest fit for the page context." },
      { question: "Does red always win?", answer: "No. Red can attract attention, but it can also feel too aggressive depending on the audience and offer." },
    ],
    relatedLinks: [
      { title: "Conversion color strategy", href: "/guides/conversion-color-strategy" },
      { title: "Orange color page", href: "/colors/orange" },
      { title: "Ecommerce conversion colors", href: "/best-colors-for/ecommerce-conversions" },
    ],
  },
  {
    slug: "best-free-color-palette-generator",
    title: "FAQ: What Is the Best Free Color Palette Generator?",
    description: "A direct answer on which free color palette generator to use, and when to pick HueFlow versus alternatives like Coolors.",
    answer:
      "HueFlow is a strong choice for a free color palette generator when you also need accessibility checking, developer token export, or gradient and animation tooling in the same place — it requires no sign-up and generates palettes instantly from a prompt, an image, or a locked base color.",
    intent: "commercial",
    keywords: ["best free color palette generator", "free color palette tool", "color palette generator no sign up"],
    sections: [
      { title: "What to look for", body: "A good free palette generator should work with no account, let you lock colors while regenerating others, and export to the formats your project actually uses (CSS, Tailwind, or design tokens)." },
      { title: "When HueFlow fits best", body: "Choose HueFlow when the palette needs to go straight into a product: it checks WCAG contrast and colorblind safety in the same flow, and exports design tokens to CSS, Tailwind, Swift, Kotlin, and Flutter." },
      { title: "When another tool fits better", body: "If you need a Figma plugin, a native mobile app, or a much larger named-color library, Coolors currently covers those better than HueFlow does." },
    ],
    faq: [
      { question: "What is the best free color palette generator?", answer: "HueFlow is a strong free option when accessibility checking and developer export matter; Coolors is a strong option when a Figma plugin, browser extension, or native app matters more." },
      { question: "Do free color palette generators require sign-up?", answer: "HueFlow does not require sign-up to generate, lock, or export a palette." },
      { question: "Which free tool checks color accessibility automatically?", answer: "HueFlow includes a WCAG contrast checker and colorblind simulator built into its core palette generator, not as a separate paid feature." },
    ],
    relatedLinks: [
      { title: "Palette generator", href: "/generator" },
      { title: "HueFlow vs Coolors", href: "/comparisons/hueflow-vs-coolors" },
      { title: "Contrast checker tool", href: "/tools/contrast" },
    ],
  },
];

const resources: ContentEntry[] = [
  {
    slug: "seo-architecture",
    title: "HueFlow Enterprise SEO, GEO, and AEO Architecture",
    description: "The complete information architecture, content clustering, sitemap system, schema plan, and growth roadmap for HueFlow.site.",
    answer:
      "HueFlow can dominate SEO, GEO, and AEO by combining tightly scoped topic silos, programmatic answer pages, structured data, and AI-friendly answer-first content blocks that resolve high-intent color questions quickly.",
    intent: "informational",
    keywords: ["seo architecture", "geo architecture", "aeo architecture", "programmatic seo plan"],
    sections: [
      { title: "SEO foundation", body: "Use clean silos, scalable dynamic pages, and sitemap partitioning so discovery stays fast as the index grows." },
      { title: "GEO foundation", body: "Publish answer-first guides, comparisons, FAQs, and best-for pages with short retrieval-friendly summaries and clear entity relationships." },
      { title: "AEO foundation", body: "Support every high-intent answer with FAQ, HowTo, Article, WebPage, Breadcrumb, Organization, and SoftwareApplication schema where appropriate." },
    ],
    faq: [
      { question: "How does HueFlow win AI citations?", answer: "By publishing concise answer blocks, entity-rich page structures, and consistent internal links that make retrieval easier for AI systems." },
      { question: "How does HueFlow scale SEO safely?", answer: "By generating programmatic pages from structured content models and pairing them with strong canonicals, breadcrumbs, and sitemap partitions." },
    ],
    relatedLinks: [
      { title: "Conversion strategy guide", href: "/guides/conversion-color-strategy" },
      { title: "SaaS colors page", href: "/best-colors-for/saas-websites" },
      { title: "Trust colors FAQ", href: "/faqs/trust-colors" },
    ],
  },
];

const developerEntries: ContentEntry[] = [
  {
    slug: "design-tokens",
    title: "Design Tokens for Color, Typography, and Spacing",
    description: "How to structure design tokens so a color system, type scale, and spacing scale stay in sync across web, iOS, and Android.",
    answer:
      "Design tokens work best when color, typography, and spacing are generated from one shared scale rather than hand-picked per platform. A token set should export cleanly to CSS variables, Tailwind config, and native platform constants from a single source of truth.",
    intent: "informational",
    keywords: ["design tokens", "design token generator", "color typography spacing tokens"],
    sections: [
      { title: "Why one source of truth matters", body: "When color, type, and spacing are each maintained separately per platform, they drift. A shared token definition keeps a Swift app and a Tailwind site visually identical without manual re-entry." },
      { title: "Naming tokens by role, not hue", body: "Name tokens `primary` or `surface-warning` instead of `blue-500`. Role-based names survive a rebrand; hue-based names don't." },
      { title: "Exporting to multiple platforms", body: "A token generator should output CSS variables, SCSS, Tailwind config, JSON, Figma Tokens format, and platform constants (Swift, Kotlin, Flutter) from the same input, not five separately maintained files." },
    ],
    faq: [
      { question: "What are design tokens?", answer: "Design tokens are named, platform-independent values for color, typography, and spacing that get compiled into each platform's native format (CSS variables, Tailwind config, Swift constants, and so on)." },
      { question: "Should tokens be named by color or by role?", answer: "By role. A token named `primary` can be repainted during a rebrand without renaming every reference; a token named `blue-500` cannot." },
    ],
    relatedLinks: [
      { title: "Design token generator tool", href: "/tools/design-tokens" },
      { title: "CSS custom properties guide", href: "/developer/css-custom-properties" },
      { title: "Figma variables guide", href: "/developer/figma-variables" },
      { title: "Tailwind color guide", href: "/tailwind" },
    ],
  },
  {
    slug: "css-custom-properties",
    title: "CSS Custom Properties for Color Systems",
    description: "Using CSS variables to build a themeable, maintainable color system instead of hard-coded hex values.",
    answer:
      "CSS custom properties let a color system be defined once and reused everywhere, which makes light/dark theming and rebrands a matter of changing a handful of variable declarations instead of every component.",
    intent: "informational",
    keywords: ["css custom properties", "css variables color", "css color tokens"],
    sections: [
      { title: "Define once, reference everywhere", body: "Declare `--color-primary` and `--color-surface` at the `:root` level, then reference them in components. Rebrands and dark mode become variable reassignments, not find-and-replace." },
      { title: "Scoping for themes", body: "Redefine the same variable names under a `[data-theme=\"dark\"]` selector rather than creating parallel `--color-primary-dark` variables — components then need no theme-awareness of their own." },
      { title: "Pairing with a build-time generator", body: "Generate the variable block from a token source (see Design Tokens) so the CSS file and the Figma/Swift exports never drift out of sync." },
    ],
    faq: [
      { question: "Why use CSS variables instead of Sass variables?", answer: "CSS custom properties are available at runtime, which lets a theme change (e.g. dark mode) happen with a single class toggle instead of a rebuild." },
      { question: "How many color variables should a system have?", answer: "Enough to cover primary, neutral surfaces, and semantic states (success/warning/critical) — usually 8–15 for a small product, not one variable per shade." },
    ],
    relatedLinks: [
      { title: "Design tokens guide", href: "/developer/design-tokens" },
      { title: "CSS colors hub", href: "/css-colors" },
      { title: "Accessibility contrast guide", href: "/accessibility/color-contrast" },
    ],
  },
  {
    slug: "figma-variables",
    title: "Figma Variables for Color Handoff",
    description: "Structuring Figma variables so designer-defined colors map directly onto developer design tokens with no manual translation step.",
    answer:
      "Figma variables close the gap between design and code when they're named to match the token names developers actually use in CSS or Tailwind — the handoff works best when both sides read the same vocabulary.",
    intent: "informational",
    keywords: ["figma variables", "figma design tokens", "figma to css handoff"],
    sections: [
      { title: "Match names across design and code", body: "If Figma calls it `primary/600` and CSS calls it `--color-primary-dark`, someone has to translate manually on every change. Use the same role-based name in both places." },
      { title: "Modes for theming", body: "Figma's variable modes map directly onto CSS custom-property theme overrides — a light/dark mode pair in Figma should produce exactly the light/dark override block in code." },
      { title: "Exporting for engineering", body: "Export variables as Figma Tokens JSON so a build step can generate CSS, Tailwind, and native constants from the same file designers edit." },
    ],
    faq: [
      { question: "Can Figma variables export directly to CSS?", answer: "Not natively — export as Figma Tokens JSON and run it through a token build step (or HueFlow's design token generator) to produce CSS, Tailwind, and platform constants." },
      { question: "Should every color in a design use a variable?", answer: "Yes for anything reused more than once. One-off decorative colors don't need a token, but every semantic and brand color should." },
    ],
    relatedLinks: [
      { title: "Design tokens guide", href: "/developer/design-tokens" },
      { title: "Design token generator tool", href: "/tools/design-tokens" },
      { title: "CSS custom properties guide", href: "/developer/css-custom-properties" },
    ],
  },
  {
    slug: "platform-color-constants",
    title: "Color Constants for Swift, Kotlin, and Flutter",
    description: "Keeping iOS, Android, and Flutter color constants in sync with the web color system instead of hand-copied hex values per platform.",
    answer:
      "Native app color constants drift from the web system when each platform team hand-copies hex values. Generating Swift, Kotlin, and Flutter constants from the same token source as the web CSS keeps every platform visually identical.",
    intent: "informational",
    keywords: ["swift color constants", "android xml colors", "flutter color constants", "kotlin color"],
    sections: [
      { title: "The drift problem", body: "A hex value updated on the website rarely gets propagated to the iOS and Android codebases at the same time, so apps quietly fall out of sync with the brand." },
      { title: "One export, three platforms", body: "Generate `UIColor` constants for Swift, `Color(0xFF...)` values for Kotlin, and `Color(0xFF...)` for Flutter from the same source list used to build the CSS variables." },
      { title: "Keeping names consistent", body: "Use the same role name (`primary`, `success`) across Swift, Kotlin, Flutter, and CSS so a designer's change request maps to one search-and-replace across all four, not four separate lookups." },
    ],
    faq: [
      { question: "Do Swift and Android color formats differ?", answer: "Yes — Swift typically uses `UIColor(red:green:blue:alpha:)` with 0–1 floats, while Android/Kotlin and Flutter use 0xFF-prefixed ARGB hex integers. A generator should output both from the same hex source." },
      { question: "Should mobile apps use the same color names as the website?", answer: "Yes — matching role names across platforms is what actually prevents visual drift between the app and the web product." },
    ],
    relatedLinks: [
      { title: "Design tokens guide", href: "/developer/design-tokens" },
      { title: "Design token generator tool", href: "/tools/design-tokens" },
    ],
  },
];

const colorPsychologyEntries: ContentEntry[] = [
  {
    slug: "warm-vs-cool-colors",
    title: "Warm vs. Cool Colors: Psychology and When to Use Each",
    description: "The practical difference between warm and cool color psychology, and which one fits a given product or campaign.",
    answer:
      "Warm colors (red, orange, yellow) read as energetic and urgent; cool colors (blue, green, purple) read as calm and trustworthy. The choice usually comes down to whether the moment needs action or confidence.",
    intent: "informational",
    keywords: ["warm vs cool colors", "warm color psychology", "cool color psychology"],
    sections: [
      { title: "What warm colors signal", body: "Warm hues draw the eye faster and read as energetic, urgent, or appetizing — useful for calls to action, food, and limited-time offers, risky as a full-page base color." },
      { title: "What cool colors signal", body: "Cool hues read as calm, stable, and trustworthy — the default choice for finance, healthcare, and productivity products where confidence matters more than urgency." },
      { title: "Mixing temperatures deliberately", body: "Most strong systems use a cool base with one warm accent for action moments, rather than committing entirely to one temperature." },
    ],
    faq: [
      { question: "Are warm colors always better for calls to action?", answer: "Usually, because they create contrast against a cooler base and draw the eye — but the effect depends on having a cooler base to contrast against, not on the warm color alone." },
      { question: "Can a brand mix warm and cool as equals?", answer: "It's possible but risky — most successful systems pick one temperature as the base and use the other sparingly as accent, rather than splitting evenly." },
    ],
    relatedLinks: [
      { title: "Color psychology in marketing", href: "/color-psychology/color-psychology-in-marketing" },
      { title: "Blue color meaning", href: "/color-meanings/blue" },
      { title: "Orange color meaning", href: "/color-meanings/orange" },
    ],
  },
  {
    slug: "color-psychology-in-marketing",
    title: "Color Psychology in Marketing",
    description: "How color choice affects perceived urgency, trust, and price sensitivity across marketing campaigns.",
    answer:
      "In marketing, color psychology mostly affects perceived urgency and trust rather than the product itself — the same offer can read as a scam in one palette and premium in another purely from color choice.",
    intent: "informational",
    keywords: ["color psychology marketing", "color psychology advertising", "best colors for marketing"],
    sections: [
      { title: "Urgency signals", body: "Red and orange increase perceived urgency, which is why sale banners lean on them — but overuse trains an audience to ignore every banner equally." },
      { title: "Trust signals", body: "Blue is the most consistent trust signal across categories, which is why it dominates finance and B2B marketing specifically." },
      { title: "Price perception", body: "Black and gold read as premium and can support higher perceived pricing; bright saturated colors read as accessible and mass-market." },
    ],
    faq: [
      { question: "Does color psychology actually affect sales?", answer: "It affects perception (urgency, trust, price tier) more directly than it affects raw conversion rate, which depends more on offer clarity and audience fit." },
      { question: "What color sells the most?", answer: "There's no universal answer — the right color depends on whether the offer needs to feel urgent, trustworthy, or premium." },
    ],
    relatedLinks: [
      { title: "Warm vs cool colors", href: "/color-psychology/warm-vs-cool-colors" },
      { title: "Marketing colors hub", href: "/marketing-colors" },
      { title: "Conversion color strategy", href: "/guides/conversion-color-strategy" },
    ],
  },
  {
    slug: "color-psychology-in-ui-design",
    title: "Color Psychology in UI and Product Design",
    description: "How color choice in interfaces affects perceived state, hierarchy, and user trust in a product.",
    answer:
      "In UI design, color psychology mostly governs state recognition — users expect red to mean error, green to mean success, and a strong primary color to mean the main action, regardless of brand.",
    intent: "informational",
    keywords: ["color psychology ui design", "ui color meaning", "product design color psychology"],
    sections: [
      { title: "Semantic color expectations", body: "Breaking the red-error, green-success convention to fit a brand palette usually confuses users faster than it reinforces brand identity." },
      { title: "Hierarchy through saturation", body: "A single strong, saturated primary color against muted neutrals reads as \"the main action\" more reliably than color alone without contrast in saturation." },
      { title: "Trust in enterprise software", body: "Enterprise and B2B products lean cooler and more muted than consumer apps because the audience associates restraint with reliability." },
    ],
    faq: [
      { question: "Can a brand's primary color also be its error color?", answer: "It's risky — reusing the brand color for both primary actions and errors removes the visual distinction users rely on to recognize a problem at a glance." },
      { question: "Why do enterprise products use more muted colors?", answer: "Muted, cooler palettes read as stable and professional, which matches what enterprise buyers expect from software they depend on daily." },
    ],
    relatedLinks: [
      { title: "Warm vs cool colors", href: "/color-psychology/warm-vs-cool-colors" },
      { title: "Accessibility contrast guide", href: "/accessibility/color-contrast" },
      { title: "Design tokens guide", href: "/developer/design-tokens" },
    ],
  },
];

export const hubs: HubPage[] = [
  {
    slug: "colors",
    path: "/colors",
    title: "Colors",
    description: "Explore individual colors by meaning, accessibility, use case, Tailwind mapping, and CSS implementation.",
    answer:
      "HueFlow's color hub maps every major color to brand meaning, UI use cases, accessibility guidance, Tailwind classes, CSS tokens, and related palettes so users and search engines can move from definition to application quickly.",
    goals: ["Own color-name intent", "Support programmatic color pages", "Feed palettes, gradients, and meanings"],
    featuredLinks: colors.map((entry) => ({ title: entry.title, href: `/colors/${entry.slug}` })),
  },
  {
    slug: "palettes",
    path: "/palettes",
    title: "Color Palettes",
    description: "Browse curated palettes for SaaS, fintech, luxury, DTC, AI, and conversion-focused design systems.",
    answer:
      "Palette pages help HueFlow win commercial search intent by showing how colors work together in real categories like SaaS, fintech, luxury ecommerce, and AI products.",
    goals: ["Own industry palette intent", "Support best-for and brand-color pages", "Drive tool adoption"],
    featuredLinks: palettes.map((entry) => ({ title: entry.title, href: `/palettes/${entry.slug}` })),
  },
  {
    slug: "gradients",
    path: "/gradients",
    title: "Gradients",
    description: "Gradient generators, use cases, and named gradients for websites, apps, launch pages, and brand systems.",
    answer:
      "Gradient pages convert design and AI-search demand by tying each gradient to a clear category, color family, and UI use case rather than treating gradients as isolated visuals.",
    goals: ["Capture gradient generator intent", "Link gradients to colors and palettes", "Support web design pages"],
    featuredLinks: gradients.map((entry) => ({ title: entry.title, href: `/gradients/${entry.slug}` })),
  },
  {
    slug: "brand-colors",
    path: "/brand-colors",
    title: "Brand Colors",
    description: "Industry and company color strategy pages for SaaS, fintech, healthcare, luxury, and iconic brands.",
    answer:
      "Brand color pages help HueFlow rank for commercial and comparative searches by connecting color strategy to specific industries, company examples, and conversion goals.",
    goals: ["Own industry brand-color searches", "Bridge categories to palettes", "Support comparison pages"],
    featuredLinks: brandColorEntries.map((entry) => ({ title: entry.title, href: `/brand-colors/${entry.slug}` })),
  },
  {
    slug: "color-meanings",
    path: "/color-meanings",
    title: "Color Meanings",
    description: "Answer-first color psychology pages explaining what each color communicates to customers and users.",
    answer:
      "Color meaning pages are essential for SEO and AI retrieval because users often begin with emotional intent such as trust, urgency, luxury, or growth before they search for palettes or tools.",
    goals: ["Capture color psychology queries", "Support featured snippets", "Feed brand-color decisions"],
    featuredLinks: colorMeaningEntries.map((entry) => ({ title: entry.title, href: `/color-meanings/${entry.slug}` })),
  },
  {
    slug: "color-combinations",
    path: "/color-combinations",
    title: "Color Combinations",
    description: "High-intent combination pages showing how two colors work together across brands, websites, and campaigns.",
    answer:
      "Combination pages help HueFlow rank for practical pairing searches by showing when two colors work, what they communicate, and where they perform best.",
    goals: ["Capture pairing intent", "Support palette exploration", "Feed design decisions"],
    featuredLinks: combinations.map((entry) => ({ title: entry.title, href: `/color-combinations/${entry.slug}` })),
  },
  {
    slug: "accessibility",
    path: "/accessibility",
    title: "Accessibility Colors",
    description: "Practical guides to contrast, status colors, UI readability, and WCAG-safe color systems.",
    answer:
      "Accessibility pages protect HueFlow's authority by proving the site is not just aesthetic. They also capture high-trust search intent from designers, developers, and procurement-minded teams.",
    goals: ["Own WCAG color searches", "Support trust and compliance", "Link into Tailwind and CSS implementation"],
    featuredLinks: accessibilityEntries.map((entry) => ({ title: entry.title, href: `/accessibility/${entry.slug}` })),
  },
  {
    slug: "web-design",
    path: "/web-design",
    title: "Web Design Colors",
    description: "Web design color strategy for landing pages, SaaS sites, hero sections, navigation systems, and UI hierarchy.",
    answer:
      "The web design hub turns color theory into page-level execution by connecting color choices to navigation, CTA hierarchy, screenshots, illustrations, and section design.",
    goals: ["Own web-design color intent", "Link gradients and palettes", "Support best-for pages"],
    featuredLinks: [
      { title: "Best colors for SaaS websites", href: "/best-colors-for/saas-websites" },
      { title: "AI website color strategy", href: "/guides/ai-website-color-strategy" },
      { title: "Startup website color strategy", href: "/guides/startup-website-color-strategy" },
    ],
  },
  {
    slug: "marketing-colors",
    path: "/marketing-colors",
    title: "Marketing Colors",
    description: "Marketing color strategy for conversions, trust, urgency, and customer attraction across channels.",
    answer:
      "Marketing color pages help HueFlow win demand from founders and marketers asking outcome-driven questions such as what colors increase conversions and what colors attract customers.",
    goals: ["Own conversion-driven searches", "Support FAQ and guide pages", "Bridge to palettes and best-for content"],
    featuredLinks: [
      { title: "What colors increase conversions?", href: "/guides/conversion-color-strategy" },
      { title: "Best colors for ecommerce conversions", href: "/best-colors-for/ecommerce-conversions" },
      { title: "FAQ: What is the best CTA color?", href: "/faqs/cta-colors" },
    ],
  },
  {
    slug: "tailwind",
    path: "/tailwind",
    title: "Tailwind Colors",
    description: "Tailwind color documentation for UI scales, design tokens, accessibility, and semantic implementation.",
    answer:
      "Tailwind pages target implementation intent by translating design choices into classes, scales, and semantic mappings that developers can use immediately.",
    goals: ["Own dev-intent searches", "Support tool adoption", "Link CSS and accessibility content"],
    featuredLinks: tailwindEntries.map((entry) => ({ title: entry.title, href: `/tailwind/${entry.slug}` })),
  },
  {
    slug: "css-colors",
    path: "/css-colors",
    title: "CSS Colors",
    description: "CSS color guides for variables, tokens, theming, and scalable design-system implementation.",
    answer:
      "CSS color pages target developers who want implementation guidance, making them useful both for SEO and for AI systems looking for practical follow-through after a design question.",
    goals: ["Own CSS color searches", "Support dev audience", "Reinforce semantic-color authority"],
    featuredLinks: cssColorEntries.map((entry) => ({ title: entry.title, href: `/css-colors/${entry.slug}` })),
  },
  {
    slug: "blog",
    path: "/blog",
    title: "Blog",
    description: "Editorial content covering color theory, brand systems, accessibility, UI color strategy, and content design.",
    answer:
      "The blog supports topical depth, freshness, and linkability by expanding on core silos with expert commentary, examples, and trend-based commentary.",
    goals: ["Earn links", "Build freshness", "Support topical authority"],
    featuredLinks: [
      { title: "Color Theory & Resources", href: "/blog" },
      { title: "Why blue builds trust", href: "/explainers/why-blue-builds-trust" },
      { title: "How color psychology affects buyers", href: "/explainers/how-color-psychology-affects-buyers" },
    ],
  },
  {
    slug: "guides",
    path: "/guides",
    title: "Guides",
    description: "Answer-first guides designed to rank in Google and resolve retrieval-style AI queries quickly.",
    answer:
      "Guide pages target deeper question intent by combining a concise answer, practical sections, FAQ reinforcement, and linked examples across HueFlow's color ecosystem.",
    goals: ["Own long-form questions", "Support AI retrieval", "Bridge to conversion pages"],
    featuredLinks: guides.map((entry) => ({ title: entry.title, href: `/guides/${entry.slug}` })),
  },
  {
    slug: "explainers",
    path: "/explainers",
    title: "Explainers",
    description: "Short, citation-friendly explainers built for snippets, AI summaries, and top-of-funnel color education.",
    answer:
      "Explainers help HueFlow win concise informational searches and AI citations by answering a single question clearly without forcing users through a long editorial journey first.",
    goals: ["Win snippet intent", "Support AI summaries", "Strengthen color authority"],
    featuredLinks: explainers.map((entry) => ({ title: entry.title, href: `/explainers/${entry.slug}` })),
  },
  {
    slug: "comparisons",
    path: "/comparisons",
    title: "Comparisons",
    description: "Comparison pages that help searchers choose between colors, categories, and brand strategies.",
    answer:
      "Comparison pages perform well in both search and AI engines because they map tradeoffs clearly, which makes them easy to summarize, quote, and cite.",
    goals: ["Capture decision-stage intent", "Support tables and citations", "Bridge to commercial pages"],
    featuredLinks: comparisons.map((entry) => ({ title: entry.title, href: `/comparisons/${entry.slug}` })),
  },
  {
    slug: "best-colors-for",
    path: "/best-colors-for",
    title: "Best Colors For",
    description: "High-intent pages answering the best colors for specific industries, sites, and conversion goals.",
    answer:
      "Best-for pages are powerful because they mirror the way users phrase questions in Google, ChatGPT, Perplexity, and Gemini when they want a recommendation rather than a definition.",
    goals: ["Own recommendation intent", "Win AI recommendation summaries", "Link into palettes and brand pages"],
    featuredLinks: bestColorsFor.map((entry) => ({ title: entry.title, href: `/best-colors-for/${entry.slug}` })),
  },
  {
    slug: "faqs",
    path: "/faqs",
    title: "FAQs",
    description: "Short answer pages built for featured snippets, People Also Ask, and conversational AI retrieval.",
    answer:
      "FAQ pages give HueFlow a dedicated layer for direct question-answer intent, helping the site compete for snippets and AI citations without forcing every answer into blog format.",
    goals: ["Capture long-tail questions", "Support snippet extraction", "Feed AI citations"],
    featuredLinks: faqs.map((entry) => ({ title: entry.title, href: `/faqs/${entry.slug}` })),
  },
  {
    slug: "resources",
    path: "/resources",
    title: "Resources",
    description: "Strategic resources covering site architecture, content systems, and search growth operations.",
    answer:
      "Resource pages support authority and stakeholder trust by documenting how HueFlow thinks about SEO, GEO, AEO, and scalable content operations.",
    goals: ["Support strategic credibility", "Attract partnerships", "Document operating system"],
    featuredLinks: resources.map((entry) => ({ title: entry.title, href: `/resources/${entry.slug}` })),
  },
  {
    slug: "developer",
    path: "/developer",
    title: "Developer",
    description: "Design tokens, CSS custom properties, Figma variables, and platform color constants for engineering teams.",
    answer:
      "The Developer hub documents how to take a HueFlow color system to production: design tokens, CSS custom properties, Figma variable handoff, and native color constants for Swift, Kotlin, and Flutter.",
    goals: ["Own developer-intent color searches", "Support the design token generator tool", "Bridge design and engineering handoff"],
    featuredLinks: developerEntries.map((entry) => ({ title: entry.title, href: `/developer/${entry.slug}` })),
  },
  {
    slug: "color-psychology",
    path: "/color-psychology",
    title: "Color Psychology",
    description: "How color affects perception, trust, urgency, and decision-making across marketing and product design.",
    answer:
      "Color Psychology pages explain the mechanisms behind color meaning — warm vs. cool, marketing perception, and UI state recognition — separately from the per-color meaning pages in Color Meanings.",
    goals: ["Own broad color-psychology search intent", "Support color-meanings and marketing-colors", "Feed the conversion-strategy guide"],
    featuredLinks: colorPsychologyEntries.map((entry) => ({ title: entry.title, href: `/color-psychology/${entry.slug}` })),
  },
];

export const routeCollections = {
  colors,
  palettes,
  gradients,
  brandColors: brandColorEntries,
  colorMeanings: colorMeaningEntries,
  colorCombinations: combinations,
  accessibility: accessibilityEntries,
  tailwind: tailwindEntries,
  cssColors: cssColorEntries,
  guides,
  explainers,
  comparisons,
  bestColorsFor,
  faqs,
  resources,
  developer: developerEntries,
  colorPsychology: colorPsychologyEntries,
};

export function getHubByPath(path: string) {
  return hubs.find((hub) => hub.path === path);
}

export function getCollection<K extends keyof typeof routeCollections>(key: K) {
  return routeCollections[key];
}

export function findEntry<K extends keyof typeof routeCollections>(key: K, slug: string) {
  return routeCollections[key].find((entry) => entry.slug === slug);
}

const clusterTopics = [
  "SaaS",
  "Fintech",
  "Healthcare",
  "Ecommerce",
  "Luxury",
  "AI",
  "Startup",
  "DTC",
  "Education",
  "Real estate",
];

const clusterAngles = [
  "color palette strategy",
  "brand color psychology",
  "homepage color ideas",
  "CTA color tests",
  "trust-building colors",
  "accessible UI colors",
  "gradient ideas",
  "design token system",
  "Tailwind color setup",
  "conversion color examples",
];

export const clusterIdeas = clusterTopics.flatMap((topic) =>
  clusterAngles.map((angle) => `${topic} ${angle}`),
).slice(0, 100);

export const folderStructure = [
  "app/colors/page.tsx",
  "app/colors/[slug]/page.tsx",
  "app/palettes/page.tsx",
  "app/palettes/[slug]/page.tsx",
  "app/gradients/page.tsx",
  "app/gradients/[slug]/page.tsx",
  "app/brand-colors/page.tsx",
  "app/brand-colors/[slug]/page.tsx",
  "app/color-meanings/page.tsx",
  "app/color-meanings/[slug]/page.tsx",
  "app/color-combinations/page.tsx",
  "app/color-combinations/[slug]/page.tsx",
  "app/accessibility/page.tsx",
  "app/accessibility/[slug]/page.tsx",
  "app/web-design/page.tsx",
  "app/marketing-colors/page.tsx",
  "app/tailwind/page.tsx",
  "app/tailwind/[slug]/page.tsx",
  "app/css-colors/page.tsx",
  "app/css-colors/[slug]/page.tsx",
  "app/guides/page.tsx",
  "app/guides/[slug]/page.tsx",
  "app/explainers/page.tsx",
  "app/explainers/[slug]/page.tsx",
  "app/comparisons/page.tsx",
  "app/comparisons/[slug]/page.tsx",
  "app/best-colors-for/page.tsx",
  "app/best-colors-for/[slug]/page.tsx",
  "app/faqs/page.tsx",
  "app/faqs/[slug]/page.tsx",
  "app/resources/page.tsx",
  "app/resources/[slug]/page.tsx",
  "app/sitemap.xml/route.ts",
  "app/sitemap-pages.xml/route.ts",
  "app/sitemap-colors.xml/route.ts",
  "app/sitemap-palettes.xml/route.ts",
  "app/sitemap-gradients.xml/route.ts",
  "app/sitemap-brand-colors.xml/route.ts",
  "app/sitemap-guides.xml/route.ts",
  "app/sitemap-blog.xml/route.ts",
  "app/llms.txt/route.ts",
  "app/robots.ts",
  "components/seo/hub-page.tsx",
  "components/seo/content-page.tsx",
  "components/seo/structured-data.tsx",
  "lib/seo/content.ts",
  "lib/seo/schema.ts",
  "lib/seo/site-config.ts",
  "lib/seo/sitemaps.ts",
];

export const growthRoadmap = [
  "Months 1-2: launch all core silos, schema, canonicals, and sitemap partitions with at least 50 high-intent answer pages.",
  "Months 3-4: scale programmatic color, palette, and combination pages; publish 30 industry-specific brand color pages.",
  "Months 5-6: expand best-colors-for, comparisons, and FAQ libraries to capture conversational AI queries and featured snippets.",
  "Months 7-9: add original studies, benchmark data, and interactive tools to earn links and citations from design publications and AI retrieval systems.",
  "Months 10-12: optimize winners, refresh pages with conversion examples, and build partner distribution to push toward 1M US monthly visitors.",
];

export type ResolvedContentEntry = ContentEntry & {
  answer: string;
  keyTakeaways: string[];
  quickFacts: QuickFact[];
  definitions: DefinitionItem[];
  prosCons: ProsCons;
  expertSummary: ExpertSummary;
  entityRelations: EntityRelation[];
  aiSections: AiSection[];
  citationBlocks: string[];
};

function toTitleCase(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function normalizeAnswer(entry: ContentEntry) {
  const answer = entry.answer.trim();
  const words = wordCount(answer);

  if (words >= 40 && words <= 60) {
    return answer;
  }

  const relatedEntities = entry.relatedLinks
    .slice(0, 2)
    .map((link) => link.title)
    .join(" and ");

  if (words < 40) {
    return `${answer} It connects closely to ${relatedEntities || "related palettes and accessibility guidance"}, which helps teams choose colors, palettes, and gradients with stronger branding, psychology, and usability alignment.`;
  }

  return answer
    .split(/\s+/)
    .slice(0, 60)
    .join(" ")
    .replace(/[,:;]$/, ".");
}

function buildKeyTakeaways(entry: ContentEntry) {
  if (entry.keyTakeaways?.length) {
    return entry.keyTakeaways;
  }

  return [
    entry.answer,
    ...entry.sections.slice(0, 2).map((section) => section.body),
  ].map((item) => item.trim()).slice(0, 3);
}

function buildQuickFacts(entry: ContentEntry): QuickFact[] {
  if (entry.quickFacts?.length) {
    return entry.quickFacts;
  }

  return [
    { label: "Primary intent", value: toTitleCase(entry.intent) },
    { label: "Core entity", value: entry.title },
    { label: "Main focus", value: entry.keywords[0] ?? entry.slug },
    { label: "Semantic links", value: entry.relatedLinks.slice(0, 3).map((link) => link.title).join(" • ") },
  ];
}

function buildDefinitions(entry: ContentEntry): DefinitionItem[] {
  if (entry.definitions?.length) {
    return entry.definitions;
  }

  return [
    {
      term: toTitleCase(entry.slug),
      definition: entry.answer,
    },
    {
      term: "Color strategy",
      definition: `${entry.title} should be evaluated through color psychology, accessibility, brand positioning, palette fit, and implementation clarity.`,
    },
  ];
}

function buildProsCons(entry: ContentEntry): ProsCons {
  if (entry.prosCons) {
    return entry.prosCons;
  }

  const pros = [
    entry.sections[0]?.body ?? entry.answer,
    entry.sections[1]?.body ?? `Supports ${entry.relatedLinks[0]?.title ?? "related color decisions"} in practical design systems.`,
  ];

  const cons = [
    entry.sections.find((section) => /not|avoid|mistake|caution|risk|watch/i.test(section.title + section.body))?.body ??
      "Can underperform when teams choose colors by taste alone instead of contrast, hierarchy, and category fit.",
    entry.comparisonRows?.[0]?.watchouts ??
      "Needs validation across accessibility, brand perception, and implementation contexts before standardizing.",
  ];

  return { pros, cons };
}

function buildExpertSummary(entry: ContentEntry): ExpertSummary {
  if (entry.expertSummary) {
    return entry.expertSummary;
  }

  return {
    title: "Expert summary",
    body: `${entry.answer} In practice, the strongest results come from aligning ${entry.keywords.slice(0, 2).join(" and ")} with clear hierarchy, tested contrast, and explicit links to palettes, gradients, branding, psychology, and accessibility decisions.`,
  };
}

function buildEntityRelations(entry: ContentEntry): EntityRelation[] {
  if (entry.entityRelations?.length) {
    return entry.entityRelations;
  }

  return [
    { entity: toTitleCase(entry.slug), relationship: "influences", connectedTo: "brand perception and color psychology" },
    { entity: toTitleCase(entry.slug), relationship: "connects to", connectedTo: "related palettes and gradients" },
    { entity: toTitleCase(entry.slug), relationship: "must be validated against", connectedTo: "accessibility and UI implementation" },
  ];
}

function buildAiSections(entry: ContentEntry): AiSection[] {
  if (entry.aiSections?.length) {
    return entry.aiSections;
  }

  const bestUseCaseText = entry.sections
    .find((section) => /use case|works|converts|fit|industry|best/i.test(section.title))
    ?.body ?? entry.sections[1]?.body ?? entry.answer;

  const mistakeText = entry.sections
    .find((section) => /mistake|avoid|not|caution|risk|overuse|watch/i.test(section.title + section.body))
    ?.body ?? entry.prosCons?.cons[0] ?? "The most common mistake is using color without validating contrast, semantics, and audience expectations.";

  const exampleText = entry.examples?.map((example) => `${example.title}: ${example.body}`).join(" ") ??
    `Example topics include ${entry.relatedLinks.slice(0, 3).map((link) => link.title).join(", ")}.`;

  return [
    { title: "What is it?", body: entry.answer },
    { title: "Why it matters?", body: entry.sections[0]?.body ?? entry.description },
    { title: "Best use cases", body: bestUseCaseText },
    { title: "Examples", body: exampleText },
    { title: "Common mistakes", body: mistakeText },
    { title: "Related topics", body: entry.relatedLinks.map((link) => link.title).join(" • ") },
  ];
}

function buildCitationBlocks(entry: ContentEntry) {
  if (entry.citationBlocks?.length) {
    return entry.citationBlocks;
  }

  return [
    entry.answer,
    `${entry.title} matters because ${entry.sections[0]?.body.toLowerCase() ?? entry.description.toLowerCase()}`,
    `Best use cases for ${toTitleCase(entry.slug)} include ${entry.relatedLinks.slice(0, 3).map((link) => link.title).join(", ")}.`,
  ];
}

function tokenizeForRelations(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

const routePrefixes = {
  colors: "/colors",
  palettes: "/palettes",
  gradients: "/gradients",
  brandColors: "/brand-colors",
  colorMeanings: "/color-meanings",
  colorCombinations: "/color-combinations",
  accessibility: "/accessibility",
  tailwind: "/tailwind",
  cssColors: "/css-colors",
  guides: "/guides",
  explainers: "/explainers",
  comparisons: "/comparisons",
  bestColorsFor: "/best-colors-for",
  faqs: "/faqs",
  resources: "/resources",
} as const;

function buildAutomaticRelatedLinks(entry: ContentEntry) {
  const sourceTokens = new Set([
    ...tokenizeForRelations(entry.slug),
    ...tokenizeForRelations(entry.title),
    ...entry.keywords.flatMap(tokenizeForRelations),
  ]);

  const candidates = Object.entries(routeCollections).flatMap(([key, items]) =>
    items.map((item) => ({
      item,
      href: `${routePrefixes[key as keyof typeof routePrefixes]}/${item.slug}`,
    })),
  );

  return candidates
    .filter(({ item, href }) => item.slug !== entry.slug && !entry.relatedLinks.some((link) => link.href === href))
    .map(({ item, href }) => {
      const score = [
        ...tokenizeForRelations(item.slug),
        ...tokenizeForRelations(item.title),
        ...item.keywords.flatMap(tokenizeForRelations),
      ].reduce((total, token) => total + (sourceTokens.has(token) ? 1 : 0), 0);

      return {
        title: item.title,
        href,
        label: "Related article",
        score,
      };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ title, href, label }) => ({ title, href, label }));
}

function mergeRelatedLinks(entry: ContentEntry) {
  const supplemental = buildAutomaticRelatedLinks(entry);
  const merged = [...entry.relatedLinks, ...supplemental];
  const seen = new Set<string>();

  return merged.filter((link) => {
    if (seen.has(link.href)) {
      return false;
    }

    seen.add(link.href);
    return true;
  }).slice(0, 10);
}

export function resolveContentEntry(entry: ContentEntry): ResolvedContentEntry {
  const mergedEntry = {
    ...entry,
    relatedLinks: mergeRelatedLinks(entry),
  };

  return {
    ...mergedEntry,
    answer: normalizeAnswer(mergedEntry),
    keyTakeaways: buildKeyTakeaways(mergedEntry),
    quickFacts: buildQuickFacts(mergedEntry),
    definitions: buildDefinitions(mergedEntry),
    prosCons: buildProsCons(mergedEntry),
    expertSummary: buildExpertSummary(mergedEntry),
    entityRelations: buildEntityRelations(mergedEntry),
    aiSections: buildAiSections(mergedEntry),
    citationBlocks: buildCitationBlocks(mergedEntry),
  };
}

export function findResolvedEntry<K extends keyof typeof routeCollections>(key: K, slug: string) {
  const entry = findEntry(key, slug);
  return entry ? resolveContentEntry(entry) : undefined;
}

export function getResolvedCollection<K extends keyof typeof routeCollections>(key: K) {
  return routeCollections[key].map(resolveContentEntry);
}
