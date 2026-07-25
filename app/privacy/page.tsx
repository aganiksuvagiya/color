import type { Metadata } from "next";

import { StaticPage } from "@/components/static-page";
import { buildPageMetadata } from "@/lib/seo/page-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How HueFlow collects, uses, and protects your information, including details on cookies, analytics, and advertising.",
  path: "/privacy",
});

const CONTACT_EMAIL = "suvagiyaaganik@gmail.com";

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" updated="July 26, 2026">
      <p>
        This Privacy Policy describes how HueFlow (&quot;we&quot;,
        &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares
        information when you visit hueflow.site (the &quot;Site&quot;). By
        using the Site, you agree to the practices described in this policy.
      </p>

      <h2>Information We Collect</h2>
      <p>
        HueFlow does not require an account to use most features. We collect
        the following types of information:
      </p>
      <ul>
        <li>
          <strong>Usage data:</strong> pages visited, features used, browser
          type, device type, operating system, referring pages, and approximate
          location (country or city level), collected automatically through
          analytics tools.
        </li>
        <li>
          <strong>Locally stored data:</strong> palettes, preferences, and tool
          settings you create may be stored in your browser&apos;s local
          storage. This data stays on your device and is not transmitted to our
          servers unless a feature explicitly says otherwise.
        </li>
        <li>
          <strong>Contact information:</strong> if you email us, we receive
          your email address and the contents of your message.
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Cookies are small text files stored on your device. We and our
        third-party partners use cookies and similar technologies to remember
        preferences, measure traffic, and serve advertising. You can control or
        delete cookies through your browser settings; disabling cookies may
        affect some features of the Site.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Google Analytics to understand how visitors use the Site.
        Google Analytics collects information such as pages visited, time on
        site, and device details using cookies. Learn more about how Google
        handles data at{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          policies.google.com/technologies/partner-sites
        </a>
        .
      </p>

      <h2>Advertising (Google AdSense)</h2>
      <p>
        We use Google AdSense to display advertisements on the Site. Google and
        its partners use advertising cookies to serve ads based on your prior
        visits to this and other websites.
      </p>
      <ul>
        <li>
          Third-party vendors, including Google, use cookies to serve ads based
          on your prior visits to this Site or other websites.
        </li>
        <li>
          Google&apos;s use of advertising cookies enables it and its partners
          to serve ads to you based on your visits to this Site and/or other
          sites on the Internet.
        </li>
        <li>
          You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          , or opt out of some third-party vendors&apos; cookies at{" "}
          <a
            href="https://www.aboutads.info/choices"
            target="_blank"
            rel="noopener noreferrer"
          >
            aboutads.info/choices
          </a>
          .
        </li>
      </ul>

      <h2>How We Use Information</h2>
      <ul>
        <li>To operate, maintain, and improve the Site and its tools.</li>
        <li>To understand which features and content are most useful.</li>
        <li>To display advertising that supports the Site.</li>
        <li>To respond to messages you send us.</li>
      </ul>

      <h2>Sharing of Information</h2>
      <p>
        We do not sell your personal information. We share information only
        with service providers that help us operate the Site (such as
        analytics and advertising partners described above), or if required by
        law.
      </p>

      <h2>Data Retention</h2>
      <p>
        Analytics data is retained according to the retention settings of our
        analytics providers. Data stored in your browser&apos;s local storage
        remains until you clear it.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        The Site is not directed to children under 13, and we do not knowingly
        collect personal information from children under 13. If you believe a
        child has provided us personal information, please contact us and we
        will delete it.
      </p>

      <h2>Your Rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, or
        delete personal information we hold about you. To exercise these
        rights, contact us at the email below.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with an updated &quot;Last updated&quot; date.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this Privacy Policy, contact us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </StaticPage>
  );
}
