import { LegalPage, type LegalSection } from "@/components/pages/legal-page";
import { pageMeta } from "@/lib/seo";
import type { Crumb } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Terms of Service | Raulji Group",
  description:
    "The terms that apply to your use of the Raulji Group website and to the business registration and advisory services we provide.",
  path: "/terms/",
  ogHeadline: "Terms of Service",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Terms of Service", path: "/terms/" },
];

const SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance of terms",
    paragraphs: [
      "By accessing and using the Raulji Group website at www.raulji.com, you accept and agree to be bound by these Terms of Service. If you do not agree to them, please do not use this website.",
    ],
  },
  {
    heading: "Services",
    paragraphs: [
      "Raulji Group provides business registration support, compliance filing support and related business advisory services. Any engagement is subject to a separate agreement covering scope and fees. Nothing on this website constitutes an offer capable of acceptance or the creation of a professional relationship.",
    ],
  },
  {
    heading: "We are not a government body",
    paragraphs: [
      "Raulji Group is a private business-services firm. We are not a government department and are not affiliated with the Ministry of Corporate Affairs, the GST department, the Registrar of Companies, the Registrar of Firms or any other authority. We prepare and file applications on your behalf. Approval, rejection and processing time rest entirely with the relevant authority.",
      "We do not guarantee government approval, incorporation within any stated period, any tax outcome, or any legal outcome. Estimated timelines published on this website can vary depending on documentation, government processing and other factors outside our control.",
    ],
  },
  {
    heading: "Information on this website",
    paragraphs: [
      "The information on this website is provided for general information only and does not constitute legal, tax, accounting or financial advice. Company law, tax law and state-level requirements change, and how they apply depends on your specific facts. Before acting on anything you read here, contact us or another suitably qualified professional for advice on your situation.",
    ],
  },
  {
    heading: "Website use",
    bullets: [
      "You may use this website for lawful purposes only",
      "You must not attempt to gain unauthorised access to any part of the website or its systems",
      "You must not use the website in a way that causes damage, impairment or disruption",
      "All content on this website is the intellectual property of Raulji Group unless stated otherwise",
    ],
  },
  {
    heading: "Fees and third-party charges",
    paragraphs: [
      "Professional fees quoted by Raulji Group are separate from government filing fees, stamp duty and other statutory charges, which are payable in addition and are set by the relevant authority. Where fees are published on this website, they apply to the package described and may change.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "To the maximum extent permitted by applicable law, Raulji Group shall not be liable for any indirect, incidental, special or consequential loss arising from your use of this website or from reliance on information published on it.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the courts at Vadodara, Gujarat, India.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="September 2026" sections={SECTIONS} crumbs={crumbs} />
  );
}
