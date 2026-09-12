import { LegalPage, type LegalSection } from "@/components/pages/legal-page";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import type { Crumb } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Privacy Policy | Raulji Group",
  description:
    "How Raulji Group collects, uses and protects your personal information when you use this website or enquire about our services.",
  path: "/privacy/",
  ogHeadline: "Privacy Policy",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy/" },
];

const SECTIONS: LegalSection[] = [
  {
    heading: "Information we collect",
    paragraphs: [
      `Raulji Group ("we", "us" or "our") collects information you provide directly to us, such as when you complete an enquiry form, request a consultation, or contact us by phone, email or WhatsApp. This typically includes your name, phone number, email address, city and the nature of your enquiry.`,
      "We also collect limited technical information automatically, such as pages visited and the source that referred you, in order to understand how the website is used.",
    ],
  },
  {
    heading: "How we use your information",
    bullets: [
      "To respond to your enquiry and provide the services you ask for",
      "To prepare and file applications on your behalf where you engage us to do so",
      "To contact you about your enquiry by phone, email or WhatsApp",
      "To improve this website and the way we explain our services",
      "To comply with our legal and regulatory obligations",
    ],
  },
  {
    heading: "Information sharing",
    paragraphs: [
      "We do not sell or trade your personal information. We share it only where it is necessary to deliver the service you have asked for, such as with a certifying authority issuing a digital signature, or with government portals when filing an application on your behalf, and where we are required to do so by law.",
      "Where we use service providers to operate this website or manage enquiries, they are required to keep your information confidential and to use it only for that purpose.",
    ],
  },
  {
    heading: "Data security",
    paragraphs: [
      "We implement appropriate measures to protect your personal information against unauthorised access, alteration, disclosure or destruction. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "This website may use cookies and analytics to understand how visitors use the site. Analytics data is used in aggregate to improve the site and is not used to identify you personally. You can disable cookies through your browser settings, though some functionality may be affected.",
    ],
  },
  {
    heading: "Retention",
    paragraphs: [
      "We keep enquiry information for as long as needed to respond to you and, where you engage us, for as long as required to deliver the service and to meet any record-keeping obligations that apply afterwards.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      `You have the right to access, correct or ask us to delete the personal information we hold about you. To exercise those rights, contact us at ${SITE.email} and we will respond.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 2026"
      sections={SECTIONS}
      crumbs={crumbs}
    />
  );
}
