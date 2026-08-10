import type { Metadata } from "next";
import { TailwindColors } from "@/components/tailwind-colors";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Tailwind CSS Colors - All Swatches, Hex Codes & Class Names",
  description:
    "Browse all Tailwind CSS colors with hex codes and class names. Slate, gray, red, blue, green, purple and more - copy any shade from 50 to 950 instantly.",
  keywords: [
    "tailwind colors",
    "tailwind css colors",
    "tailwind color palette",
    "tailwind color codes",
    "tailwind css color list",
    "tailwind hex codes",
    "tailwind color classes",
    "tailwind blue",
    "tailwind gray",
    "tailwind green",
  ],
  alternates: { canonical: `${siteConfig.domain}/tailwind-colors` },
  openGraph: {
    title: "Tailwind CSS Colors - All Swatches, Hex Codes & Class Names",
    description:
      "Browse all Tailwind CSS colors with hex codes and class names. Slate, gray, red, blue, green, purple and more - copy any shade from 50 to 950.",
    url: `${siteConfig.domain}/tailwind-colors`,
    type: "website",
  },
};

const url = `${siteConfig.domain}/tailwind-colors`;

const faq = [
  {
    question: "How many colors does Tailwind CSS have?",
    answer:
      "Tailwind CSS includes 22 color families (slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose), each with 11 shades from 50 to 950 - giving over 240 colors total.",
  },
  {
    question: "What is the Tailwind CSS blue-500 hex code?",
    answer: "Tailwind CSS blue-500 is #3b82f6. Use it with class bg-blue-500 for backgrounds or text-blue-500 for text.",
  },
  {
    question: "How do I copy a Tailwind color hex code?",
    answer:
      "Click any color swatch on this page to copy its hex code to clipboard instantly. You can then use it directly in your CSS or design tools.",
  },
  {
    question: "What is the difference between Tailwind gray, slate, and zinc?",
    answer:
      "Slate has a cool blue-gray tone, zinc is slightly warmer and more neutral, and gray sits in between. All three work well for UI surfaces - the choice depends on whether your design leans warm or cool.",
  },
];

export default function TailwindColorsPage() {
  return (
    <>
      <StructuredData
        data={buildWebPageSchema({
          title: "Tailwind CSS Colors - All Swatches, Hex Codes & Class Names",
          description:
            "Browse all Tailwind CSS colors with hex codes and class names. Copy any shade from 50 to 950 instantly.",
          url,
        })}
      />
      <StructuredData data={buildFaqSchema(faq)} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Tailwind Colors", item: url },
        ])}
      />
      <TailwindColors />
    </>
  );
}
