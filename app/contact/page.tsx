import type { Metadata } from "next";

import { StaticPage } from "@/components/static-page";
import { buildPageMetadata } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Get in touch with the HueFlow team - feedback, bug reports, feature requests, and general questions.",
  path: "/contact",
});

const CONTACT_EMAIL = "suvagiyaaganik@gmail.com";

export default function ContactPage() {
  return (
    <StaticPage title="Contact Us">
      <p>
        We&apos;d love to hear from you. Whether you&apos;ve found a bug, have
        a feature request, want to report a content issue, or just have a
        question about colors - drop us a line.
      </p>

      <h2>Email</h2>
      <p>
        The fastest way to reach us is by email:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>We typically respond within 2–3 business days.</p>

      <h2>What to Include</h2>
      <ul>
        <li>
          <strong>Bug reports:</strong> the page URL, what you expected, what
          happened, and your browser/device if relevant.
        </li>
        <li>
          <strong>Content corrections:</strong> the page URL and the detail you
          believe is incorrect.
        </li>
        <li>
          <strong>Feature requests:</strong> what you&apos;re trying to
          accomplish - context helps us build the right thing.
        </li>
      </ul>

      <h2>Privacy and Legal</h2>
      <p>
        For questions about how we handle data, see our{" "}
        <a href="/privacy">Privacy Policy</a>. For usage terms, see the{" "}
        <a href="/terms">Terms of Service</a>.
      </p>
    </StaticPage>
  );
}
