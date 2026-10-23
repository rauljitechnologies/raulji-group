import type { Article } from "../types";
import { GROUP_AUTHOR } from "../authors";

/**
 * Udyam registration.
 *
 * Checked on 23 Oct 2026 against udyamregistration.gov.in, the Ministry of
 * MSME, RBI's MSME FAQs and PIB. The classification limits are those of
 * S.O. 1364(E), effective 1 April 2025. Section numbers of the Income-tax
 * Act, 2025 are deliberately not given for the late-payment disallowance;
 * see the review note in docs/blog-validation-report.md.
 */
export const udyamRegistration: Article = {
  slug: "udyam-registration-msme-india",
  title: "Udyam Registration for MSMEs: Eligibility, Benefits and Documents",
  metaTitle: "Udyam Registration for MSMEs: Eligibility, Benefits, Process",
  metaDescription:
    "Who can register on Udyam, the 2025 MSME limits, the free official process, which benefits apply and on what conditions, and how to avoid paid look-alike sites.",
  excerpt:
    "Udyam registration is free, online and quick, and it is the government's record that your business is a micro, small or medium enterprise. What it unlocks depends on conditions that are often left out.",
  category: "Business Registration",
  published: "2026-10-23",
  updated: "2026-10-23",
  readMinutes: 9,
  primaryKeyword: "Udyam registration",
  secondaryKeywords: [
    "MSME registration",
    "MSME classification 2025",
    "Udyam registration documents",
    "Udyam registration benefits",
  ],
  searchIntent:
    "Informational with transactional follow-up. An entrepreneur deciding whether to register on Udyam and wanting the official process without paying a look-alike site.",
  author: GROUP_AUTHOR,
  image: "udyam-msme",
  covers: [
    "What Udyam registration is, and what it is not",
    "The micro, small and medium limits in force since 1 April 2025",
    "Who can register, including traders and very small businesses without GST",
    "The official process and the information it needs",
    "Which benefits follow, and the conditions each one carries",
  ],
  keyTakeaway: {
    heading: "The short answer: what is Udyam registration?",
    body: "Udyam registration is the Ministry of MSME's online registration for micro, small and medium enterprises, made on the [official Udyam Registration portal](https://udyamregistration.gov.in/). It is **free**, needs no documents to be uploaded, and issues a permanent registration number. The enterprise is classified using investment and turnover data drawn from income-tax and GST records.",
    points: [
      "Since 1 April 2025 a micro enterprise has investment up to ₹2.5 crore and turnover up to ₹10 crore. Both conditions must be met.",
      "The government portal is the only official route. Other sites charging a fee are not the government.",
      "Registration makes an enterprise eligible to be considered for MSME benefits. It does not deliver any benefit by itself.",
    ],
  },
  body: [
    {
      kind: "p",
      text: "Udyam replaced Udyog Aadhaar on 1 July 2020. The idea behind it is simple. The government already holds your PAN, income-tax returns and GST returns, so instead of asking you to declare your investment and turnover and prove them, the portal reads them from those records and classifies the enterprise for you. What you provide is mostly identity and a description of the business.",
    },

    { kind: "h2", id: "classification", text: "Which businesses count as micro, small or medium?" },
    {
      kind: "answer",
      text: "Classification uses two tests together: investment in plant and machinery or equipment, and annual turnover. An enterprise falls in a category only if it is within **both** limits for that category. The limits below have applied since 1 April 2025, under Notification S.O. 1364(E).",
    },
    {
      kind: "table",
      caption: "MSME classification from 1 April 2025",
      columns: ["Category", "Investment in plant and machinery or equipment", "Annual turnover"],
      rows: [
        ["Micro", "Up to ₹2.5 crore", "Up to ₹10 crore"],
        ["Small", "Up to ₹25 crore", "Up to ₹100 crore"],
        ["Medium", "Up to ₹125 crore", "Up to ₹500 crore"],
      ],
      rowHeader: true,
    },
    {
      kind: "p",
      text: "Exports are left out of turnover for this purpose. Because both limits must be met, a business with very little machinery but turnover above ₹10 crore is not micro; it is classified by whichever measure puts it higher.",
    },
    { kind: "h3", text: "Can traders and very small businesses register?" },
    {
      kind: "p",
      text: "Yes, with limits. Since an office memorandum of 2 July 2021, retail and wholesale traders may register on the Udyam portal, but only for the purpose of priority sector lending by banks. Other MSME benefits are not extended to them by that registration.",
    },
    {
      kind: "p",
      text: "Very small businesses that are not required to file GST returns, and so may have no GSTIN, are covered by the **Udyam Assist Platform**, launched on 11 January 2023 and run with SIDBI. Registration there is done with the help of a designated agency such as a bank or NBFC, and the certificate it issues is treated at par with a Udyam certificate for priority sector lending.",
    },

    { kind: "h2", id: "documents", text: "What do you need to register?" },
    {
      kind: "answer",
      text: "The portal needs an Aadhaar number for OTP verification and the enterprise's PAN. A GSTIN is needed where the business is required to have one. Investment and turnover are fetched from government records, so no certificate or balance sheet is uploaded.",
    },
    {
      kind: "table",
      caption: "Whose Aadhaar is used",
      columns: ["Type of enterprise", "Aadhaar of"],
      rows: [
        ["Proprietorship", "The proprietor"],
        ["Partnership firm", "The managing partner"],
        ["Hindu Undivided Family", "The karta"],
        ["Company, LLP, cooperative, society or trust", "The authorised signatory, with the organisation's PAN and GSTIN"],
      ],
      rowHeader: true,
    },
    {
      kind: "checklist",
      title: "Have this ready before you start",
      items: [
        "Aadhaar number, with access to the mobile linked to it for the OTP",
        "PAN of the enterprise (the proprietor's own PAN for a proprietorship)",
        "GSTIN, if the business is registered or required to register for GST",
        "Bank account number and IFSC",
        "Address of the plant or office, and of each unit if there is more than one",
        "Date the business started, number of employees, and the main activity, which the portal matches to a National Industrial Classification (NIC) code",
      ],
    },

    { kind: "h2", id: "process", text: "How do you register on the Udyam portal?" },
    {
      kind: "steps",
      items: [
        {
          title: "Open the official portal",
          body: "Go to udyamregistration.gov.in and choose the option for new entrepreneurs not yet registered as an MSME. Check the address in your browser before entering Aadhaar or PAN.",
        },
        {
          title: "Verify Aadhaar",
          body: "Enter the Aadhaar number and the name exactly as it appears on it, and verify with the OTP.",
        },
        {
          title: "Validate PAN",
          body: "Select the type of organisation and enter the PAN. The portal validates it and pulls in income-tax and GST details where they exist.",
        },
        {
          title: "Complete the form",
          body: "Enter the enterprise's name, units and their addresses, official address, date of commencement, bank details, activity and NIC codes, employees and any figures the portal could not fetch.",
        },
        {
          title: "Submit and receive the certificate",
          body: "Submit with the final OTP. A Udyam Registration Number is issued, and the e-certificate can be downloaded from the portal.",
        },
      ],
    },
    {
      kind: "warning",
      title: "Avoid look-alike websites",
      text: "The Ministry of MSME states that registration on udyamregistration.gov.in is free and that no other website, portal or app is official. Several private sites with similar names charge a fee, ask for Aadhaar and PAN, and sometimes describe charges for certificates or renewals that do not exist. If you choose to pay someone for help, that is a professional fee for their time, and you should know that before you pay. There is no government fee and no renewal.",
    },

    { kind: "h2", id: "benefits", text: "What benefits follow, and on what conditions?" },
    {
      kind: "answer",
      text: "Registration is the gateway to MSME benefits, not the benefit itself. Each one has its own eligibility conditions, and a lender, buyer or department applies them separately.",
    },
    {
      kind: "list",
      items: [
        "**Protection against late payment.** Under sections 15 and 16 of the MSMED Act, 2006, a buyer must pay a micro or small enterprise supplier within the agreed period, which cannot exceed 45 days from acceptance of the goods or services, or within 15 days where no period is agreed. Late payment carries compound interest at three times the RBI bank rate. Disputes can be taken to the Micro and Small Enterprises Facilitation Council through [MSME Samadhaan](https://samadhaan.msme.gov.in/). This applies to micro and small suppliers of goods and services, not to medium enterprises, and not to traders registered only for priority sector lending.",
        "**A tax reason for buyers to pay on time.** Under the income-tax law, a buyer's deduction for an amount owed to a micro or small enterprise supplier is deferred until it is actually paid, if payment is later than the MSMED Act allows. In practice this gives larger buyers a reason to ask suppliers for their Udyam details.",
        "**Priority sector lending.** Banks count loans to registered MSMEs towards their priority sector targets, which affects how some lending is offered. It does not create an entitlement to a loan.",
        "**Credit guarantee and schemes.** Collateral-free credit under the CGTMSE scheme and various central and state schemes use Udyam registration as a starting condition. Each scheme sets its own further conditions.",
        "**Public procurement.** Government buyers source a share of their purchases from micro and small enterprises, and tender documents often grant registered MSEs concessions such as exemption from earnest money. The tender, not the registration, decides what applies.",
      ],
    },

    { kind: "h2", id: "updates", text: "What happens after registration?" },
    {
      kind: "p",
      text: "There is no renewal. The registration number is permanent. You are expected to keep the information current on the portal, including details from the previous year's income-tax and GST returns, and the classification is updated from government data.",
    },
    {
      kind: "p",
      text: "When an enterprise grows into a higher category, it keeps its existing status until one year after the close of the year of registration. When it falls into a lower category, it stays in its present category until the end of that financial year and moves down from the following 1 April. The portal communicates changes of category to the enterprise.",
    },
    {
      kind: "checklist",
      title: "Common errors to avoid",
      items: [
        "Registering through an unofficial site and paying a government fee that does not exist",
        "Using a name that differs from the PAN record",
        "Choosing NIC codes that do not reflect the real activity, which can matter for scheme eligibility",
        "Registering a second time for the same PAN instead of adding units to the existing registration",
        "Assuming a trader's registration carries the late-payment protection that applies to manufacturers and service providers",
      ],
    },

    { kind: "h2", id: "not", text: "What does Udyam registration not do?" },
    {
      kind: "list",
      items: [
        "It does not create a legal entity, register a partnership or incorporate a company.",
        "It does not replace GST, which follows its own thresholds; see our [GST registration guide](/blog/gst-registration-gujarat-guide/).",
        "It does not replace state registrations such as the [Gujarat Shops and Establishments Act](/blog/gujarat-shops-establishments-registration/) or any trade licence.",
        "It does not guarantee a loan, a subsidy or a contract.",
      ],
    },
    {
      kind: "p",
      text: "For a proprietorship it plays a practical role: because a proprietorship has no certificate of its own, banks often accept the Udyam certificate as one of the proofs that the business exists. That is why Raulji Group includes it when [setting up a proprietorship](/services/proprietorship-registration/).",
    },
  ],
  faqs: [
    {
      q: "Is Udyam registration free?",
      a: "Yes. Registration on udyamregistration.gov.in is free, and there is no renewal fee. Any payment to another website or person is a private charge, not a government fee.",
    },
    {
      q: "Is GST registration required for Udyam?",
      a: "A GSTIN is needed where the business is required to be registered under GST. A business that is not required to have one can still register; very small enterprises exempt from filing GST returns can also use the Udyam Assist Platform through a bank or other designated agency.",
    },
    {
      q: "What are the MSME limits in 2026?",
      a: "Those in force since 1 April 2025: micro up to ₹2.5 crore investment and ₹10 crore turnover, small up to ₹25 crore and ₹100 crore, and medium up to ₹125 crore and ₹500 crore. An enterprise must be within both limits of a category.",
    },
    {
      q: "Can a trading business register on Udyam?",
      a: "Yes. Retail and wholesale traders can register, but under the Ministry's office memorandum of 2 July 2021 that registration is for priority sector lending only. Other MSME benefits, such as the late-payment provisions, are not extended to them through it.",
    },
    {
      q: "How long does Udyam registration take?",
      a: "Usually it is completed online in one sitting, and the registration number is issued on submission. Delays tend to come from a mismatch between Aadhaar, PAN and the name entered.",
    },
    {
      q: "Does Udyam registration need to be renewed?",
      a: "No. The registration number is permanent. You should keep the details updated on the portal, and the classification is updated from income-tax and GST data.",
    },
    {
      q: "Can a company or LLP register on Udyam?",
      a: "Yes. All business structures can register. A company or LLP registers with its own PAN and GSTIN, using the Aadhaar of its authorised signatory.",
    },
    {
      q: "Does Udyam registration guarantee a bank loan or subsidy?",
      a: "No. It makes a business eligible to be considered under schemes and priority sector lending. Every lender and scheme applies its own conditions and assessment.",
    },
  ],
  related: [
    "gst-registration-gujarat-guide",
    "starting-business-gujarat-registration-guide",
    "partnership-vs-proprietorship-india",
  ],
  services: [
    {
      href: "/services/proprietorship-registration/",
      label: "Proprietorship registration",
      blurb: "Udyam, GST where it applies, and shops and establishment registration, set up together.",
    },
    {
      href: "/services/business-registration/",
      label: "Business Registration",
      blurb: "All four business structures, and how to choose between them.",
    },
    {
      href: "/faqs/",
      label: "Registration FAQs",
      blurb: "Short answers to the questions we are asked most often.",
    },
  ],
  sources: [
    {
      label: "Udyam Registration portal, Ministry of MSME",
      url: "https://udyamregistration.gov.in/",
      supports:
        "The official, free registration route; Aadhaar, PAN and GSTIN requirements; that no other website is official; permanent registration number.",
    },
    {
      label: "Ministry of Micro, Small and Medium Enterprises",
      url: "https://msme.gov.in/",
      supports:
        "Classification limits in Notification S.O. 1364(E) from 1 April 2025; the notification of 26 June 2020 on classification, graduation and updating; office memorandum of 2 July 2021 on retail and wholesale trade.",
    },
    {
      label: "Press Information Bureau: launch of the Udyam Assist Platform",
      url: "https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1909929",
      supports: "Udyam Assist Platform for informal micro enterprises, launched 11 January 2023.",
    },
    {
      label: "Reserve Bank of India: FAQs on Micro, Small and Medium Enterprises",
      url: "https://www.rbi.org.in/commonman/Upload/English/FAQs/PDFs/MICRO30072025E.pdf",
      supports: "Priority sector lending treatment of Udyam and Udyam Assist certificates, and of traders.",
    },
    {
      label: "MSME Samadhaan, delayed payment monitoring",
      url: "https://samadhaan.msme.gov.in/",
      supports: "Filing delayed payment cases under the MSMED Act, 2006, sections 15 to 18.",
    },
  ],
  disclaimer:
    "This article reflects the Udyam portal, MSME notifications and RBI guidance as checked on 23 October 2026. Scheme conditions change and are set by each scheme. Confirm eligibility with the scheme, lender or a qualified professional before relying on a benefit.",
  cta: {
    title: "Starting a business and not sure which registrations it needs?",
    body: "Tell us what the business does and how it is owned. We will set out which registrations actually apply, Udyam included, and handle them as part of setting up.",
  },
};
