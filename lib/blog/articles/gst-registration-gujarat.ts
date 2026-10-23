import type { Article } from "../types";
import { GROUP_AUTHOR } from "../authors";

/**
 * GST registration in Gujarat.
 *
 * Educational. Raulji Group does not offer GST as a standalone service
 * (master rule 15); GST registration is handled as part of setting up a
 * proprietorship, which is where the call to action points.
 *
 * Every threshold, rule number and timeline here was checked on 23 Oct 2026
 * against the GST portal, CBIC and the notifications named in the sources.
 * Rule 14A (Notification 18/2025-CT) is recent and its operation should be
 * re-checked at each review.
 */
export const gstRegistrationGujarat: Article = {
  slug: "gst-registration-gujarat-guide",
  title: "GST Registration in Gujarat: Eligibility, Documents and Process",
  metaTitle: "GST Registration in Gujarat: Who Needs It and How to Apply",
  metaDescription:
    "When GST registration applies in Gujarat: the ₹40 lakh and ₹20 lakh thresholds, compulsory cases, documents, the REG-01 process and common mistakes.",
  excerpt:
    "Whether a Gujarat business needs GST registration depends on what it supplies, where its customers are and how much it sells across India. Here is the test, the documents and the application, step by step.",
  category: "Gujarat Business",
  published: "2026-10-23",
  updated: "2026-10-23",
  readMinutes: 10,
  primaryKeyword: "GST registration in Gujarat",
  secondaryKeywords: [
    "GST registration threshold Gujarat",
    "compulsory GST registration",
    "documents for GST registration",
    "GST REG-01 process",
  ],
  searchIntent:
    "Informational. A business owner in Gujarat working out whether GST registration applies to them, and what applying involves.",
  author: GROUP_AUTHOR,
  image: "gst-gujarat",
  covers: [
    "The turnover thresholds that apply in Gujarat, and why the right one depends on what you supply",
    "The cases where registration is compulsory from the first sale",
    "The documents the GST portal asks for, by type of premises",
    "The application on the GST portal, step by step, including Aadhaar authentication",
    "What a GST registration does not do for your business",
  ],
  keyTakeaway: {
    heading: "The short answer: do you need GST registration in Gujarat?",
    body: "A business in Gujarat must register for GST once its **aggregate turnover** in a financial year crosses **₹40 lakh if it supplies only goods**, or **₹20 lakh if it supplies any services**. Some businesses must register from their first taxable sale regardless of turnover, most commonly anyone making **inter-state supplies of goods**. Below the threshold, registration is optional.",
    points: [
      "Aggregate turnover is counted across India under one PAN, and includes exempt supplies and exports.",
      "Registration is made on the GST portal in Form GST REG-01 and is free.",
      "A GSTIN is a tax registration. It does not create a business or prove its legal structure.",
    ],
  },
  body: [
    {
      kind: "p",
      text: "Most questions about GST registration come down to one of three things: whether the turnover threshold has been crossed, whether the business falls into a category that must register anyway, and what the portal will ask for. This guide takes them in that order. It describes the national law as it applies to a business based in Gujarat, and points out where Gujarat's own position matters.",
    },

    { kind: "h2", id: "threshold", text: "When is GST registration required in Gujarat?" },
    {
      kind: "answer",
      text: "Section 22 of the CGST Act requires registration once aggregate turnover crosses ₹20 lakh. Gujarat applies the higher ₹40 lakh limit, notified in Notification 10/2019-Central Tax, to businesses engaged **exclusively** in supplying goods. A business that supplies any services, even alongside goods, stays at ₹20 lakh.",
    },
    {
      kind: "p",
      text: "The word exclusively does a lot of work. A trader who also earns commission, rent or job-work income is no longer an exclusive supplier of goods, so the ₹20 lakh limit applies to the whole business. The ₹40 lakh limit also does not apply to certain goods excluded by the notification, such as ice cream, pan masala and tobacco products, or to businesses that must register for another reason.",
    },
    {
      kind: "table",
      caption: "Which turnover threshold applies to a business in Gujarat",
      columns: ["What the business supplies", "Threshold for registration"],
      rows: [
        ["Goods only", "₹40 lakh aggregate turnover in a financial year"],
        ["Services only", "₹20 lakh"],
        ["Both goods and services", "₹20 lakh"],
        ["Any taxable supply that falls under section 24", "No threshold: register before the first such supply"],
      ],
      rowHeader: true,
    },
    { kind: "h3", text: "What counts towards aggregate turnover?" },
    {
      kind: "p",
      text: "Aggregate turnover, defined in section 2(6) of the CGST Act, is the value of all taxable supplies, exempt supplies, exports and inter-state supplies of everyone with the same PAN across India. It leaves out the GST itself and purchases on which you pay tax under reverse charge. Two consequences surprise people. Exempt sales count towards the threshold even though no tax is charged on them, and a business with branches in two states adds both together.",
    },
    {
      kind: "note",
      title: "Voluntary registration",
      text: "A business below the threshold may still register. Many do, because business customers who are registered prefer suppliers who can pass on input tax credit. Once registered, every obligation applies in full, including filing returns in months with no sales.",
    },

    { kind: "h2", id: "compulsory", text: "When is registration compulsory whatever your turnover?" },
    {
      kind: "answer",
      text: "Section 24 of the CGST Act lists persons who must register even below the threshold. For a typical new business in Gujarat the ones that matter most are inter-state supply of goods, selling goods through an e-commerce platform, and being liable to pay tax under reverse charge.",
    },
    {
      kind: "list",
      items: [
        "**Inter-state supply of goods.** A Gujarat business that sells goods to a customer in another state must register from the first such sale. Inter-state supplies of **services** are treated differently: Notification 10/2017-Integrated Tax lets a service provider make them without registering until the ₹20 lakh threshold is crossed.",
        "**Selling goods through an e-commerce operator.** Sellers on marketplaces were historically required to register from the first sale. From 1 October 2023, Notification 34/2023-Central Tax lets a seller below the threshold supply goods **within the state** through an e-commerce operator without registering, subject to conditions including making no inter-state supplies. Selling to buyers in other states through a marketplace still requires registration.",
        "**Reverse charge.** A person liable to pay tax on its purchases under reverse charge must register for that purpose.",
        "**Casual and non-resident taxable persons**, such as a business from another state taking a stall at an exhibition in Ahmedabad, must register before making taxable supplies here.",
        "**Others**, including input service distributors, persons required to deduct or collect tax at source, and e-commerce operators themselves.",
      ],
    },
    {
      kind: "warning",
      title: "Check the facts before relying on an exemption",
      text: "Exemptions from compulsory registration come with conditions, and the conditions change by notification. Before treating your business as exempt, read the current notification or ask a GST practitioner. Supplying without registration when registration was required carries tax, interest and penalty.",
    },

    { kind: "h2", id: "state", text: "How do goods, services and state borders affect registration?" },
    {
      kind: "p",
      text: "GST registration is state-wise. A GSTIN is issued for one state, and its first two digits are that state's code; Gujarat's is 24. A business needs a separate registration in each state from which it makes taxable supplies. A Gujarat business that opens a branch or warehouse in Maharashtra and supplies from there needs a Maharashtra registration as well.",
    },
    {
      kind: "p",
      text: "Whether a sale is intra-state or inter-state decides which tax is charged. A sale from Vadodara to a customer in Surat attracts CGST and SGST. A sale to a customer in Mumbai attracts IGST. The location of the supplier and the place of supply decide this, under the place-of-supply rules in the IGST Act. For goods it is usually where the goods are delivered. For services the rules differ by type of service.",
    },

    { kind: "h2", id: "documents", text: "What documents and information does the application need?" },
    {
      kind: "answer",
      text: "The GST portal asks for the business PAN, identity and photograph of the proprietor, partners or directors, proof of the principal place of business, proof of the business's constitution, and details of an authorised signatory. Bank account details can be added after registration but must be added within 30 days.",
    },
    {
      kind: "checklist",
      title: "Commonly needed for a new registration",
      items: [
        "PAN of the business: the proprietor's own PAN for a proprietorship, or the firm's, LLP's or company's PAN",
        "Mobile number and email address of the primary authorised signatory, both verified by OTP",
        "Photograph of the proprietor, each partner or the directors, and of the authorised signatory (JPEG, within the size the portal states)",
        "Proof of constitution: the partnership deed, the LLP's or company's certificate of incorporation, or nothing further for a proprietorship",
        "Proof of the principal place of business, which depends on how the premises are held (below)",
        "A letter of authorisation or board resolution naming the authorised signatory, where the applicant is not a proprietor",
        "Aadhaar of the persons who will be authenticated",
      ],
    },
    {
      kind: "table",
      caption: "Proof of the principal place of business, as the GST portal lists it",
      columns: ["How the premises are held", "What to upload"],
      rows: [
        ["Owned", "One of: property tax receipt, municipal khata copy, electricity bill, or legal ownership document"],
        ["Rented or leased", "Rent or lease agreement, or rent receipt with a no-objection certificate, together with one document from the owned list"],
        ["Used with the owner's consent", "Consent letter from the owner, together with one document from the owned list"],
      ],
      rowHeader: true,
    },
    {
      kind: "p",
      text: "When you choose the type of premises on the portal, it shows only the documents relevant to that choice. Each upload has a size limit, so scan clearly and compress before you start.",
    },

    { kind: "h2", id: "process", text: "How do you apply for GST registration, step by step?" },
    {
      kind: "steps",
      items: [
        {
          title: "Part A: verify PAN, mobile and email",
          body: "On [the GST portal](https://www.gst.gov.in/), choose new registration, select Gujarat as the state, and enter the legal name exactly as it appears on the PAN. The portal verifies the PAN and sends OTPs to the mobile and email. Once verified it issues a Temporary Reference Number (TRN).",
        },
        {
          title: "Part B: complete the application",
          body: "Log in with the TRN and complete Form GST REG-01: business details, promoters, authorised signatory, principal and additional places of business, the main goods and services with their HSN or SAC codes, and the documents above.",
        },
        {
          title: "Aadhaar authentication",
          body: "Choose to authenticate Aadhaar. The portal may let you complete it by OTP, or it may ask you to book an appointment at a **GST Suvidha Kendra** for biometric authentication, a photograph and verification of original documents. Gujarat was the first state where biometric authentication was introduced, under Rule 8(4A) of the CGST Rules. It now applies more widely.",
        },
        {
          title: "Submit and receive the ARN",
          body: "Submit with a digital signature (mandatory for companies and LLPs) or with EVC. The portal issues an Application Reference Number (ARN) for tracking.",
        },
        {
          title: "Officer review",
          body: "Under Rule 9 the officer approves the application within seven working days, or issues a notice asking for clarification within that time. If Aadhaar authentication is not done, or the application is flagged for physical verification of the premises, the period can extend to thirty days.",
        },
        {
          title: "Certificate",
          body: "On approval the GSTIN and the registration certificate in Form GST REG-06 are available on the portal. Then add bank account details within 30 days. Under Rule 10A, missing that deadline now leads to the registration being suspended.",
        },
      ],
    },
    {
      kind: "note",
      title: "The faster route for small suppliers to businesses",
      text: "Rule 14A, inserted from 1 November 2025 by Notification 18/2025-Central Tax, offers an optional route for applicants whose monthly output tax on supplies to registered persons will not exceed ₹2.5 lakh. After Aadhaar authentication, registration is granted electronically within three working days. It carries conditions, including one registration under the rule per PAN in a state. Check whether it suits your business before choosing it.",
    },

    { kind: "h2", id: "mistakes", text: "Which mistakes delay or get applications rejected?" },
    {
      kind: "list",
      items: [
        "**A name that does not match the PAN** exactly, including initials and spelling.",
        "**Premises proof that does not match the address entered**, or a rent agreement without a supporting ownership document, or a consent letter that is not signed by the owner shown on that document.",
        "**Skipping Aadhaar authentication**, which moves the application towards physical verification and the longer timeline.",
        "**Choosing the wrong constitution**, such as applying as a proprietorship for a firm that has a partnership deed.",
        "**Applying in the wrong state**, when the place of business is elsewhere.",
        "**Forgetting the bank account deadline** after approval.",
        "**Opting for the composition scheme without checking eligibility.** Composition is available up to ₹1.5 crore turnover for goods and ₹50 lakh for services, but a composition taxpayer cannot make inter-state supplies of goods or charge GST on invoices.",
      ],
    },

    { kind: "h2", id: "what-it-is", text: "What does a GST registration establish, and what does it not?" },
    {
      kind: "p",
      text: "A GSTIN shows that a business is registered to collect and pay GST in a state. Banks and customers often accept it as one proof that a proprietorship exists, because a proprietorship has no certificate of its own. That is the limit of what it proves.",
    },
    {
      kind: "list",
      items: [
        "It does **not** create a company, an LLP or a firm, or change the owner's personal liability.",
        "It does **not** replace registration under the [Gujarat Shops and Establishments Act](/blog/gujarat-shops-establishments-registration/), Udyam registration, professional tax or any licence your trade needs.",
        "It **does** create obligations from the date of registration: issuing GST invoices, filing returns on time even with no sales, and keeping records.",
      ],
    },
    {
      kind: "links",
      title: "Related reading",
      items: [
        {
          href: "/blog/udyam-registration-msme-india/",
          label: "Udyam registration for MSMEs",
          blurb: "The other registration small businesses are most often asked for, and how it differs from GST.",
        },
        {
          href: "/blog/starting-business-gujarat-registration-guide/",
          label: "Starting a business in Gujarat",
          blurb: "Which registrations are national and which are specific to the state.",
        },
      ],
    },

    { kind: "h2", id: "help", text: "Where does Raulji Group fit?" },
    {
      kind: "p",
      text: "Raulji Group handles GST registration where it applies as part of [setting up a proprietorship](/services/proprietorship-registration/), alongside Udyam and shops and establishment registration. For a partnership, LLP or company we advise on whether GST applies to the activity. Ongoing GST returns are a separate, recurring obligation; agree who will handle them before the first return falls due.",
    },
  ],
  faqs: [
    {
      q: "What is the GST registration limit in Gujarat?",
      a: "₹40 lakh of aggregate turnover in a financial year for a business that supplies only goods, and ₹20 lakh for a business that supplies any services. Some businesses must register regardless of turnover, such as anyone making inter-state supplies of goods.",
    },
    {
      q: "Do I need GST registration if I sell only within Gujarat?",
      a: "Not until your aggregate turnover crosses the applicable threshold, unless another section 24 condition applies, such as paying tax under reverse charge. Selling within Gujarat through an e-commerce platform can be exempt below the threshold under Notification 34/2023-Central Tax, subject to its conditions.",
    },
    {
      q: "Is GST registration compulsory for a service provider with clients in other states?",
      a: "Not below ₹20 lakh of aggregate turnover. Notification 10/2017-Integrated Tax exempts persons making inter-state supplies of services from compulsory registration until they cross the threshold. The position is different for goods, which require registration from the first inter-state sale.",
    },
    {
      q: "Is there a government fee for GST registration?",
      a: "No. Applying on the GST portal is free. Any charge you pay is for someone's professional help with the application, not a government fee.",
    },
    {
      q: "How long does GST registration take?",
      a: "Rule 9 of the CGST Rules gives the officer seven working days to approve or raise a query. Where Aadhaar authentication is not completed, or physical verification of the premises is ordered, it can take up to thirty days. Applicants eligible under Rule 14A can be registered within three working days after Aadhaar authentication.",
    },
    {
      q: "Can I register for GST using my home address?",
      a: "Yes, if business is actually carried on from there. Upload the proof that matches how the home is held, for example an electricity bill for owned premises, or a consent letter from the owner with a document showing their ownership. The address may be physically verified.",
    },
    {
      q: "Does a proprietor need a separate PAN for GST?",
      a: "No. A proprietorship is registered under the proprietor's own PAN, because it has no separate legal identity. A partnership firm, LLP or company registers under its own PAN.",
    },
    {
      q: "What happens if I do not add bank account details after registration?",
      a: "Rule 10A requires bank account details within 30 days of the grant of registration, or before filing the first outward supply return if that is earlier. The GST portal now suspends registrations where the details are not furnished in time.",
    },
  ],
  related: [
    "starting-business-gujarat-registration-guide",
    "udyam-registration-msme-india",
    "gujarat-shops-establishments-registration",
    "partnership-vs-proprietorship-india",
  ],
  services: [
    {
      href: "/services/proprietorship-registration/",
      label: "Proprietorship registration",
      blurb: "Udyam, GST where it applies, and shops and establishment registration, set up together.",
    },
    {
      href: "/gujarat/",
      label: "Business registration across Gujarat",
      blurb: "What is national and what is specific to Gujarat, with city pages for the main markets.",
    },
    {
      href: "/services/business-registration/",
      label: "Business Registration",
      blurb: "All four business structures, and how to choose between them.",
    },
  ],
  sources: [
    {
      label: "GST portal, Goods and Services Tax Network",
      url: "https://www.gst.gov.in/",
      supports: "Where registration is applied for, and that applying is free.",
    },
    {
      label: "GST portal user manual: Apply for Registration (Normal Taxpayer)",
      url: "https://tutorial.gst.gov.in/userguide/registration/Apply_for_Registration_Normal_Taxpayer.htm",
      supports:
        "Part A and Part B of Form GST REG-01, TRN and ARN, documents by type of premises, Aadhaar authentication and GST Suvidha Kendra appointments.",
    },
    {
      label: "CBIC GST acts, rules and notifications",
      url: "https://cbic-gst.gov.in/gst-acts.html",
      supports:
        "CGST Act sections 2(6), 22 and 24; CGST Rules 8(4A), 9, 10A and 14A; Notifications 10/2019-CT, 34/2023-CT, 18/2025-CT and 10/2017-IT.",
    },
    {
      label: "GST portal: Welcome Kit for New Taxpayers",
      url: "https://tutorial.gst.gov.in/downloads/news/welcome_kit_for_new_taxpyers.pdf",
      supports: "Obligations that begin on registration, including returns and the composition scheme.",
    },
  ],
  disclaimer:
    "This article explains the law and the GST portal process as checked on 23 October 2026. GST thresholds, exemptions and procedures change by notification. It is not tax advice for your business; confirm your position with a GST practitioner before relying on an exemption.",
  cta: {
    title: "Setting up a proprietorship in Gujarat?",
    body: "Tell us what you sell and to whom. We will set out which registrations apply, including GST if it does, and handle them as part of setting up.",
  },
};
