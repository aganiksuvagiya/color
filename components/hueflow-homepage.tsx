"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type DemoPalette = {
  label: string;
  colors: Array<{
    name: string;
    hex: string;
    text?: "light" | "dark";
  }>;
};

const palettes: DemoPalette[] = [
  {
    label: "Luxury skincare brand",
    colors: [
      { name: "Neutral", hex: "#161412", text: "light" },
      { name: "Success", hex: "#A7EA23", text: "dark" },
      { name: "Caution", hex: "#F4C315", text: "dark" },
      { name: "Primary", hex: "#B79A28", text: "dark" },
      { name: "Orchid", hex: "#C46CDE", text: "dark" },
    ],
  },
  {
    label: "Modern fintech app",
    colors: [
      { name: "Neutral", hex: "#111827", text: "light" },
      { name: "Success", hex: "#34D399", text: "dark" },
      { name: "Warning", hex: "#FDBA74", text: "dark" },
      { name: "Primary", hex: "#4F46E5", text: "light" },
      { name: "Sky", hex: "#7DD3FC", text: "dark" },
    ],
  },
  {
    label: "Fashion campaign",
    colors: [
      { name: "Neutral", hex: "#19110F", text: "light" },
      { name: "Success", hex: "#B8F031", text: "dark" },
      { name: "Amber", hex: "#FFB347", text: "dark" },
      { name: "Primary", hex: "#DB6A2C", text: "light" },
      { name: "Rose", hex: "#F08BB4", text: "dark" },
    ],
  },
];

const features = [
  {
    title: "Semantic palette generation",
    description: "Generate named color roles like primary, accent, and neutral that map directly to your design system.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></svg>
    ),
  },
  {
    title: "Status colors that actually fit your brand",
    description: "Success, warning, and error colors that feel intentional alongside your brand palette, not like an afterthought.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
    ),
  },
  {
    title: "Accessible scales for UI systems",
    description: "Every scale is built with contrast ratios in mind so your interface stays readable across all surfaces.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" /></svg>
    ),
  },
  {
    title: "Prompt-based color exploration",
    description: "Describe a mood, industry, or aesthetic and let HueFlow translate it into a structured color system.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" /></svg>
    ),
  },
  {
    title: "Tailwind and CSS variable export",
    description: "One-click export to Tailwind config, CSS custom properties, or design tokens ready for production.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M16 16l3-8 3 8M16.5 14h5M4 6h16M4 12h8M4 18h5" /></svg>
    ),
  },
  {
    title: "Premium-ready dashboard preview",
    description: "See your palette applied to a realistic UI preview before committing to any direction.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
    ),
  },
];

const sections = [
  {
    title: "Generate product-ready systems",
    body: "HueFlow does more than shuffle swatches. It creates primary, status, accent, and neutral colors that already feel designed for product.",
  },
  {
    title: "Explore by mood, brand, or industry",
    body: "Start from prompts like fintech, skincare, SaaS, or editorial and generate color systems with a clearer creative point of view.",
  },
  {
    title: "Preview before you commit",
    body: "See palettes inside a rich UI canvas so you can explore and trust the result before committing to a direction.",
  },
];

const stats = [
  { value: "100k+", label: "designers exploring palettes" },
  { value: "4.8/5", label: "average satisfaction" },
  { value: "12x", label: "faster creative direction testing" },
  { value: "1 click", label: "token-ready export workflow" },
];

const useCases = [
  {
    title: "For product teams",
    body: "Generate primary, semantic, and support colors that already feel structured for dashboards, onboarding, and interface states.",
  },
  {
    title: "For branding studios",
    body: "Create polished color directions for luxury, fintech, SaaS, and commerce clients with a stronger creative point of view.",
  },
  {
    title: "For developers",
    body: "Export cleaner tokens, scalable systems, and implementation-friendly palette logic without manually rebuilding everything.",
  },
];

const workflowCards = [
  {
    eyebrow: "01",
    title: "Start with a mood",
    copy: "Use prompts, industry direction, or a brand idea to guide the generator toward something stronger than random output.",
  },
  {
    eyebrow: "02",
    title: "Refine the system",
    copy: "Balance neutral, primary, success, warning, and accent colors in one interface so the palette behaves like a real product kit.",
  },
  {
    eyebrow: "03",
    title: "Ship with confidence",
    copy: "Take the palette into product, marketing, and handoff without losing consistency or wasting time on cleanup.",
  },
];

const testimonials = [
  {
    name: "Aarya Shah",
    role: "Product Designer",
    quote: "This feels less like a color picker and more like a premium creative tool. The product demo sells the value instantly.",
  },
  {
    name: "Marcus Lee",
    role: "Creative Director",
    quote: "The warmer visual direction made HueFlow feel memorable. It finally has a point of view instead of looking like another utility.",
  },
  {
    name: "Nina Carter",
    role: "Startup Founder",
    quote: "We stayed on the page longer because the live generator looked real, polished, and fun to interact with.",
  },
];

const faqs = [
  {
    question: "Can HueFlow generate more than one strong palette direction?",
    answer:
      "Yes. The product is designed for exploration, so users can quickly compare multiple warm, bold, or product-focused directions before saving one.",
  },
  {
    question: "Is this useful for app UI and brand design both?",
    answer:
      "Yes. HueFlow sits between brand inspiration and interface implementation, so the output works for storytelling and practical product systems.",
  },
  {
    question: "How does HueFlow compare to other color tools?",
    answer:
      "HueFlow generates complete product-ready palettes with semantic roles, not just random swatches. It gives you a full system from the start.",
  },
];

const footerLinks: { heading: string; links: { label: string; href: string }[] }[] = [
  { heading: "Product", links: [
    { label: "Generator", href: "/generator" },
    { label: "Trends", href: "/trends" },
    { label: "Explore Colors", href: "/explore" },
  ]},
  { heading: "Tools", links: [
    { label: "Color Picker", href: "/tools/picker" },
    { label: "Gradient Generator", href: "/tools/gradient" },
    { label: "Contrast Checker", href: "/tools/contrast" },
    { label: "Tailwind Colors", href: "/tools/tailwind" },
  ]},
  { heading: "Resources", links: [
    { label: "Blog", href: "/blog" },
    { label: "Color Theory", href: "/blog" },
  ]},
  { heading: "Company", links: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ]},
  { heading: "Social", links: [
    { label: "Dribbble", href: "#" },
    { label: "X", href: "#" },
    { label: "LinkedIn", href: "#" },
  ]},
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(16px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  return (
    <motion.button
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const dx = event.clientX - rect.left - rect.width / 2;
        const dy = event.clientY - rect.top - rect.height / 2;
        x.set((dx / rect.width) * 18);
        y.set((dy / rect.height) * 18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
}


export function HueFlowHomePage() {
  const [activePalette, setActivePalette] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.2);
  const springX = useSpring(pointerX, { stiffness: 80, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 80, damping: 18 });
  const glowX = useTransform(springX, (value) => `${value * 100}%`);
  const glowY = useTransform(springY, (value) => `${value * 100}%`);
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255, 130, 30, 0.09), transparent 18%), radial-gradient(circle at calc(${glowX} - 18%) calc(${glowY} + 12%), rgba(255, 95, 31, 0.09), transparent 09%)`;

  const rotatePalette = useCallback(() => {
    setActivePalette((current) => (current + 1) % palettes.length);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(rotatePalette, 3000);
    return () => window.clearInterval(interval);
  }, [rotatePalette]);

  const palette = palettes[activePalette];

  return (
    <main
      className="relative overflow-hidden bg-[#160b05] text-white"
      onMouseMove={(event) => {
        pointerX.set(event.clientX / window.innerWidth);
        pointerY.set(event.clientY / window.innerHeight);
      }}
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: glow }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.34),transparent_30%),radial-gradient(circle_at_18%_88%,rgba(255,111,26,0.44),transparent_28%),linear-gradient(135deg,#8e430f_0%,#5f2605_34%,#3d1707_60%,#ff6a2b_100%)]" />
      <div className="noise absolute inset-0 opacity-30" />

      <div className="fixed left-0 right-0 top-0 z-50 px-6 pt-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-[1560px] items-center justify-between rounded-full border border-white/18 bg-white/8 px-5 py-3 backdrop-blur-xl"
        >
          <div className="flex items-center">
            <img src="/hueflow.svg" alt="HueFlow" width={100} height={20} />
          </div>
          <nav className="hidden items-center gap-5 text-sm text-white/70 md:flex">
            <Link href="/generator">Generator</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/trends">Trends</Link>
            <Link href="/tools/picker">Picker</Link>
            <Link href="/tools/gradient">Gradient</Link>
            <Link href="/tools/contrast">Contrast</Link>
            <Link href="/tools/tailwind">Tailwind</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <Link href="/generator">
            <MagneticButton className="rounded-full bg-white px-5 py-3 text-base font-semibold text-[#22130d]">
              Try Demo
            </MagneticButton>
          </Link>
        </motion.header>
      </div>

      <div className="relative mx-auto max-w-[1560px] px-6 pb-24 pt-20 lg:px-8">
        <section className="relative mx-auto max-w-[1560px] pt-12 lg:pt-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center"
          >
            <motion.a
              variants={fadeUp}
              href="/generator"
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="group inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/22 bg-white/8 px-5 py-3 text-base font-semibold text-white/92 backdrop-blur-xl"
            >
              <motion.span
                variants={{
                  rest: { x: 0, opacity: 1 },
                  hover: { x: 6, opacity: 1 },
                }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                className="relative"
              >
                <span className="block transition-transform duration-300 group-hover:-translate-y-[1px]">
                  Meet HueFlow, the better way to build product color adoption.
                </span>
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)] opacity-0 blur-[1px] transition duration-500 group-hover:translate-x-8 group-hover:opacity-100" />
              </motion.span>
              <motion.span
                variants={{
                  rest: { x: 0, rotate: 0, scale: 1 },
                  hover: { x: 8, rotate: -8, scale: 1.08 },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="text-xl"
              >
                →
              </motion.span>
            </motion.a>

            <motion.p variants={fadeUp} className="mt-8 text-2xl font-semibold text-white/86">
              Color generator
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mx-auto mt-3 max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.06em] text-white drop-shadow-[0_6px_14px_rgba(0,0,0,0.3)] sm:text-[3.4rem] lg:text-[4.2rem]"
            >
              Generate colors for your website or app
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto mt-8 max-w-3xl text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
              Find brand and status colors with a color generator designed to create harmonious color combinations for UI design.
            </motion.p>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-16"
            id="demo"
            style={{ perspective: "1400px" }}
          >
            <motion.div
              initial={{ rotateX: 6 }}
              whileInView={{ rotateX: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="rounded-[28px] border border-white/20 bg-white/10 p-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
                <div className="overflow-hidden rounded-[22px] bg-[#1c1c1e]">
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                      <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                      <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={palette.label}
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.4 }}
                        className="text-xs font-medium tracking-wide text-white/40"
                      >
                        {palette.label}
                      </motion.p>
                    </AnimatePresence>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      <span className="text-[11px] text-white/30">Live</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-[2px] px-[2px] pb-[2px]">
                    {palette.colors.map((color, i) => (
                      <motion.div
                        key={`card-${i}`}
                        animate={{ backgroundColor: color.hex }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                        className={`flex min-h-[380px] flex-col justify-between p-5 ${i === 0 ? "rounded-bl-[20px]" : ""} ${i === 4 ? "rounded-br-[20px]" : ""}`}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`info-${color.name}-${color.hex}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.35, delay: i * 0.04 }}
                          >
                            <p className={`text-[13px] font-semibold tracking-[-0.01em] ${color.text === "light" ? "text-white/90" : "text-black/70"}`}>
                              {color.name}
                            </p>
                            <p className={`mt-0.5 font-mono text-[11px] ${color.text === "light" ? "text-white/50" : "text-black/40"}`}>
                              {color.hex}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                        <div className={`self-end rounded-full border px-3 py-1 text-[10px] font-medium backdrop-blur-sm ${color.text === "light" ? "border-white/15 bg-white/10 text-white/50" : "border-black/10 bg-black/5 text-black/40"}`}>
                          {color.name}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="mx-auto mt-24 grid max-w-[1560px] gap-8 lg:grid-cols-[0.95fr_1.05fr]" id="why">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="rounded-[34px] border border-white/14 bg-black/16 p-8 backdrop-blur-xl"
          >
            <motion.p variants={fadeUp} className="text-center text-sm font-semibold uppercase tracking-[0.34em] text-white/62">
              Why this direction works
            </motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[3.2rem] lg:text-[3.375rem]">
              More emotional. More premium. More memorable.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-9 text-white/74">
              This redesign leans into a warmer editorial feel so HueFlow looks like a product people want to explore, not just a tool they use once.
            </motion.p>
          </motion.div>

          <div className="grid gap-5">
            {sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.65 }}
                className="rounded-[30px] border border-white/10 bg-black/20 p-7 backdrop-blur-xl"
              >
                <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white">{section.title}</h3>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/72">{section.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-[1560px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid gap-5 rounded-[32px] border border-white/10 bg-black/20 p-6 backdrop-blur-xl sm:grid-cols-2 xl:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="rounded-[26px] border border-white/10 bg-black/12 p-6">
                <p className="font-display text-5xl font-semibold tracking-[-0.06em] text-white">{stat.value}</p>
                <p className="mt-3 text-base leading-7 text-white/66">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mx-auto mt-24 max-w-[1560px]" id="features">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="px-6 py-8 text-center sm:px-10 sm:py-10 lg:px-14 lg:py-12"
          >
            <motion.div variants={fadeUp} className="mx-auto flex max-w-4xl items-center justify-center gap-4">
              <span className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-white/18 sm:block" />
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-white/62">Feature set</p>
              <span className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-white/18 sm:block" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mx-auto mt-6 max-w-5xl text-center [text-wrap:balance] font-display text-[2.9rem] font-semibold leading-[1.1] tracking-[-0.08em] text-white drop-shadow-[0_8px_22px_rgba(0,0,0,0.2)] sm:text-[3.25rem] lg:text-[3.375rem]"
            >
              Everything needed to generate better product palettes
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72 sm:text-[1.35rem] sm:leading-9">
              Built for teams that want stronger exploration, cleaner systems, and a more premium path from first idea to final handoff.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {["Brand-safe output", "UI-ready scales", "Fast exploration"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/14 bg-black/14 px-4 py-2 text-sm font-medium text-white/72"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={stagger}
            className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="group rounded-[24px] border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-6 backdrop-blur-xl transition-colors hover:border-white/20"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mx-auto mt-24 max-w-[1560px]">
          <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="rounded-[34px] border border-white/10 bg-black/20 p-8 backdrop-blur-xl"
            >
              <p className="text-center text-sm font-semibold uppercase tracking-[0.34em] text-white/62">Use cases</p>
              <h2 className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[3.2rem] lg:text-[3.375rem]">
                A homepage with more depth and more reasons to stay.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-white/72">
                Instead of stopping at the hero, this version keeps building trust with clearer use cases, workflow explanations, proof points, and structured next steps.
              </p>
            </motion.div>

            <div className="grid gap-5">
              {useCases.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.08, duration: 0.65 }}
                  className="rounded-[28px] border border-white/14 bg-black/12 p-7 backdrop-blur-xl"
                >
                  <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white">{item.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-white/70">{item.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-[1560px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center"
          >
            <motion.p variants={fadeUp} className="text-center text-sm font-semibold uppercase tracking-[0.34em] text-white/62">
              Workflow
            </motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[3.2rem] lg:text-[3.375rem]">
              A cleaner journey from inspiration to implementation
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={stagger}
            className="mt-10 grid gap-5 lg:grid-cols-3"
          >
            {workflowCards.map((card) => (
              <motion.article
                key={card.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="rounded-[30px] border border-white/10 bg-black/20 p-7 backdrop-blur-xl"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/56">{card.eyebrow}</p>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-white">{card.title}</h3>
                <p className="mt-4 text-lg leading-8 text-white/70">{card.copy}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>


        <section className="mx-auto mt-24 max-w-[1560px] overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center"
          >
            <motion.p variants={fadeUp} className="text-center text-sm font-semibold uppercase tracking-[0.34em] text-white/62">
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[3.2rem] lg:text-[3.375rem]">
              Feedback that makes the product feel trusted
            </motion.h2>
          </motion.div>

          <div className="mask-fade-right mt-10">
            <div className="testimonial-marquee flex min-w-max gap-5 pr-5">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.article
                  key={`${testimonial.name}-${index}`}
                  className="w-[360px] rounded-[28px] border border-white/10 bg-black/20 p-7 backdrop-blur-xl"
                >
                  <p className="text-lg leading-8 text-white/80">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="mt-8">
                    <p className="text-xl font-semibold tracking-[-0.04em] text-white">{testimonial.name}</p>
                    <p className="mt-1 text-white/58">{testimonial.role}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-[1560px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center"
          >
            <motion.p variants={fadeUp} className="text-center text-sm font-semibold uppercase tracking-[0.34em] text-white/62">
              FAQ
            </motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center [text-wrap:balance] font-display text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[3.2rem] lg:text-[3.375rem]">
              A few things users usually want to know
            </motion.h2>
          </motion.div>

          <div className="mt-10 grid gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.button
                  key={faq.question}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="rounded-[28px] border border-white/10 bg-black/20 p-7 text-left backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between gap-6">
                    <h3 className="text-2xl font-semibold tracking-[-0.05em] text-white">{faq.question}</h3>
                    <span className="text-3xl text-white/82">{isOpen ? "−" : "+"}</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.p
                        key="answer"
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 18 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.32 }}
                        className="overflow-hidden text-lg leading-8 text-white/68"
                      >
                        {faq.answer}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </section>

        <footer className="mx-auto mt-24 max-w-[1560px] rounded-[34px] border border-white/10 bg-black/20 p-8 backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="flex items-center">
                <img src="/hueflow.svg" alt="HueFlow" width={120} height={24} />
              </div>
              <p className="mt-5 max-w-md text-lg leading-8 text-white/68">
                A premium color generator for teams that want product-ready palettes, more exploration, and cleaner handoff.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {footerLinks.map((group) => (
                <div key={group.heading}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/54">{group.heading}</h3>
                  <div className="mt-4 grid gap-3">
                    {group.links.map((item) => (
                      <Link key={item.label} href={item.href} className="text-base text-white/72 hover:text-white/90">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
