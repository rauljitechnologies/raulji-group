import { LegalPage, type LegalSection } from "@/components/pages/legal-page";
import { pageMeta } from "@/lib/seo";
import type { Crumb } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Disclaimer | Raulji Group",
  description:
    "What the information on the Raulji Group website is and is not: general information about business registration in India, not professional advice.",
  path: "/disclaimer/",
  ogHeadline: "Disclaimer",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Disclaimer", path: "/disclaimer/" },
];

const SECTIONS: LegalSection[] = [
  {
    heading: "General information only",
    paragraphs: [
      "Everything published on this website about company law, LLP law, partnership law, taxation and registration procedure is general information. It is not legal, tax, accounting or financial advice, and it is not a substitute for advice on your own circumstances.",
      "Statutory requirements, fees, thresholds and forms change, and several of them differ from state to state. Before you act on anything you read here, confirm the current position with us or with another suitably qualified professional.",
    ],
  },
  {
    heading: "No relationship is created by reading this site",
    paragraphs: [
      "Reading this website, submitting an enquiry form or contacting us does not by itself create a professional or contractual relationship. An engagement begins only when scope and fees have been agreed in writing.",
    ],
  },
  {
    heading: "We are not an authority",
    paragraphs: [
      "Raulji Group is a private firm. We are not a government department and we are not affiliated with the Ministry of Corporate Affairs, the GST department, the Registrar of Companies, the Registrar of Firms or any other authority. We prepare and file applications on your behalf; the decision on any application rests with the authority concerned.",
      "We are not a law firm and do not provide representation before courts or tribunals. We are not an insurer and do not underwrite policies. Where a matter requires an advocate, a chartered accountant, a company secretary or an insurer, we say so.",
    ],
  },
  {
    heading: "No guaranteed outcomes",
    paragraphs: [
      "We do not guarantee that any registration will be approved, that it will complete within any particular period, or that any tax or legal position will be accepted. Estimated timelines published on this website reflect what commonly happens when documentation is complete, and can vary with government processing and other factors outside our control.",
    ],
  },
  {
    heading: "Fees shown on this website",
    paragraphs: [
      "Where a professional fee is published, it applies to the package described on that page. Government filing fees, stamp duty and other statutory charges are payable in addition, are set by the relevant authority, and vary by state and by the capital or contribution involved. We confirm the expected total in writing before any filing begins.",
    ],
  },
  {
    heading: "External links",
    paragraphs: [
      "This website links to external sites, including government portals and our separate technology brand. We are not responsible for the content, accuracy or availability of any external site.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="September 2026" sections={SECTIONS} crumbs={crumbs} />
  );
}
