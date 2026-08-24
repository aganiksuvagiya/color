import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/structured-data";
import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";
import { buildFaqSchema, buildSpeakableSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildHubMetadata("/color-meanings");
export const revalidate = false;

const faqSchema = buildFaqSchema([
  { question: "What does the color blue mean?", answer: "Blue represents trust, calm, and reliability. It is the most universally liked color and is widely used in finance, technology, and healthcare branding. Darker blues convey professionalism and authority; lighter blues feel open and friendly." },
  { question: "What does the color red mean in branding?", answer: "Red represents energy, urgency, passion, and excitement. It increases heart rate and creates a sense of urgency — which is why it is used for sale banners, CTAs, and food brands. In branding, red signals power and confidence." },
  { question: "What does the color green symbolize?", answer: "Green symbolizes growth, health, nature, and prosperity. It is used by wellness, finance, and environmental brands. Darker greens feel luxurious and established; brighter greens feel fresh and energetic." },
  { question: "How does color psychology affect buying decisions?", answer: "Color influences up to 90% of a snap judgment about a product. Colors trigger emotional responses that affect trust, urgency, and desire. Blue builds confidence, red creates urgency, green signals safety, and yellow grabs attention — all of which directly impact conversion rates." },
  { question: "What colors convey trust and credibility?", answer: "Blue is the strongest trust color, used by banks (Chase, Barclays), social networks (LinkedIn, Facebook), and healthcare. Navy blue signals authority; mid-blue signals approachability. White paired with dark text also conveys clarity and transparency." },
]);

export default function ColorMeaningsPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={buildSpeakableSchema(["h1", "h2", ".hub-description", ".hub-answer"])} />
      {renderHub("/color-meanings")}
    </>
  );
}
