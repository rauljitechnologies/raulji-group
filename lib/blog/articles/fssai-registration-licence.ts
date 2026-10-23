import type { Article } from "../types";
import { GROUP_AUTHOR } from "../authors";

/**
 * FSSAI registration and food licence.
 *
 * Built on FSSAI's order of 13 March 2026 (F. No. RCD-01002/1/2021-
 * Regulatory-FSSAI-Part(1)), read in full on 23 Oct 2026. From 1 April 2026
 * registration covers turnover up to ₹1.5 crore, a state licence above that
 * up to ₹50 crore, and a central licence above ₹50 crore. The order refers
 * to the amendment regulations of 10 March 2026, which provide for perpetual
 * validity subject to risk-based inspection.
 *
 * Deliberately not stated: fee amounts (they may have changed with perpetual
 * validity), and which activities still need a central licence whatever the
 * turnover (paragraph 4 of the order supersedes earlier categorisation
 * criteria, and the position should be confirmed on FoSCoS). Both are flagged
 * in docs/five-blog-validation-report.md.
 *
 * Raulji Group gives guidance on activity licences such as FSSAI; it does not
 * file FSSAI applications as a service, and the article says so.
 */
export const fssaiRegistrationLicence: Article = {
  slug: "fssai-registration-food-licence-india",
  title: "FSSAI Registration or Food Licence: Which Does Your Business Need?",
  metaTitle: "FSSAI Registration or Food Licence: Which Do You Need?",
  metaDescription:
    "FSSAI registration, state licence or central licence: the turnover limits from 1 April 2026, perpetual validity, documents, the FoSCoS process and mistakes.",
  excerpt:
    "Every food business in India needs either an FSSAI registration or a licence. Which one depends mainly on turnover, and the limits changed on 1 April 2026. Many guides online still quote the old figures.",
  category: "Business Registration",
  published: "2026-10-23",
  updated: "2026-10-23",
  readMinutes: 10,
  primaryKeyword: "FSSAI registration",
  secondaryKeywords: [
    "FSSAI licence",
    "FSSAI state licence vs central licence",
    "FoSCoS registration",
    "food licence for restaurant",
  ],
  searchIntent:
    "Informational with a compliance task attached. A food-business owner working out whether they need FSSAI registration or a licence, and which one.",
  author: GROUP_AUTHOR,
  image: "fssai",
  covers: [
    "The difference between FSSAI registration and an FSSAI licence",
    "The turnover limits in force from 1 April 2026",
    "What perpetual validity means, and what it does not",
    "What the FoSCoS application usually asks for",
    "Common mistakes and misconceptions, including outdated limits",
  ],
  keyTakeaway: {
    heading: "The short answer: which FSSAI approval does a food business need?",
    body: "From **1 April 2026**, FSSAI's revised thresholds are: **registration** for turnover **up to ₹1.5 crore**, a **state licence** for turnover **above ₹1.5 crore and up to ₹50 crore**, and a **central licence** for turnover **above ₹50 crore**. Registration and licences are now of **perpetual validity**, subject to risk-based inspection. Applications are made on FSSAI's **FoSCoS** portal.",
    points: [
      "The earlier limits of ₹12 lakh and ₹20 crore no longer apply to new applications.",
      "Some activities may still require a particular category regardless of turnover; FoSCoS asks about the activity for this reason.",
      "An FSSAI approval is separate from GST, shops and establishments registration, and any municipal permission.",
    ],
  },
  body: [
    {
      kind: "p",
      text: "Under the Food Safety and Standards Act, 2006, no one may start or carry on a food business without the approval the law requires: a registration for smaller food businesses and a licence for larger ones. The Food Safety and Standards Authority of India (FSSAI) sets the categories, and state food safety departments administer most of them. What changed in 2026 is where the lines are drawn and how long an approval lasts.",
    },

    { kind: "h2", id: "who", text: "Who counts as a food business?" },
    {
      kind: "p",
      text: "The Act's idea of a food business is wide. It is not only restaurants and food factories. It covers anyone carrying on any activity at any stage of manufacture, processing, packaging, storage, transport, distribution, sale or import of food, whether or not for profit. A cloud kitchen, a sweet shop, a dairy collecting milk, a cold store, a distributor of packaged snacks, a caterer and a home baker selling to customers are all food businesses. Each needs the approval that fits its size and activity.",
    },
    {
      kind: "p",
      text: "What is generally outside it is food made at home for your own household. The moment you sell, even occasionally and even from home, you are running a food business.",
    },

    { kind: "h2", id: "difference", text: "What is the difference between FSSAI registration and a licence?" },
    {
      kind: "answer",
      text: "**Registration** is the simpler approval for smaller food businesses, issued by the registering authority. A **licence** is for larger businesses and involves more scrutiny, and comes in two kinds: a **state licence**, issued by the state's food safety department, and a **central licence**, issued by FSSAI. Both are applied for on FoSCoS.",
    },
    {
      kind: "table",
      caption: "FSSAI categories from 1 April 2026 (FSSAI order of 13 March 2026)",
      columns: ["Category", "Annual turnover", "Issued by"],
      rows: [
        ["Registration", "Up to ₹1.5 crore", "Registering authority"],
        ["State licence", "Above ₹1.5 crore and up to ₹50 crore", "State food safety department"],
        ["Central licence", "Above ₹50 crore", "FSSAI"],
      ],
      rowHeader: true,
    },
    {
      kind: "p",
      text: "The order states that it supersedes all earlier orders and regulations on turnover thresholds and categorisation criteria. Before it, the limits were ₹12 lakh for registration and ₹20 crore for the move from a state to a central licence. Many websites, and some older templates, still show those figures.",
    },
    {
      kind: "warning",
      title: "Turnover is not the only question",
      text: "The kind of activity has historically mattered too. For example, importers and some e-commerce and multi-state operations were placed in the central category whatever their turnover. The 2026 order revises the categorisation criteria, so confirm your category on FoSCoS, which asks about the activity, rather than relying on turnover alone or on an older guide.",
    },

    { kind: "h2", id: "perpetual", text: "What does perpetual validity mean?" },
    {
      kind: "p",
      text: "The Food Safety and Standards (Licensing and Registration of Food Businesses) Amendment Regulations, 2026, notified on 10 March 2026, provide for perpetual validity of FSSAI registrations and licences, subject to risk-based inspections. In practice an approval no longer lapses after a fixed term of one to five years and does not need a periodic renewal application.",
    },
    {
      kind: "p",
      text: "It does not mean the approval cannot end. A registration or licence can still be suspended or cancelled for non-compliance, and inspections continue, weighted towards higher-risk businesses. The obligations attached to it, such as hygiene, labelling and keeping details up to date, continue for as long as the business runs.",
    },

    { kind: "h2", id: "examples", text: "Which approval would these businesses need?" },
    {
      kind: "p",
      text: "These are illustrations of how the 2026 turnover limits apply, not advice on any particular business. Check the activity questions on FoSCoS before applying.",
    },
    {
      kind: "table",
      caption: "Illustrations using the turnover limits alone",
      columns: ["Business", "Turnover", "Likely category by turnover"],
      rows: [
        ["A home bakery selling to local customers", "₹6 lakh", "Registration"],
        ["A neighbourhood restaurant", "₹90 lakh", "Registration"],
        ["A restaurant group with three outlets in Ahmedabad", "₹4 crore", "State licence"],
        ["A packaged snacks manufacturer", "₹30 crore", "State licence"],
        ["A large food processor", "₹75 crore", "Central licence"],
      ],
      rowHeader: true,
    },
    {
      kind: "note",
      title: "One approval per premises, as a rule",
      text: "An FSSAI approval is generally tied to the premises from which the food business is run. A business with kitchens or units in several places should check whether each needs its own approval, which FoSCoS will show based on the details entered.",
    },

    { kind: "h2", id: "documents", text: "What documents does the application usually ask for?" },
    {
      kind: "p",
      text: "FoSCoS lists the documents for the category and activity you select. Registration asks for less than a licence. Commonly requested:",
    },
    {
      kind: "checklist",
      title: "Commonly requested",
      items: [
        "Photo identity proof of the proprietor, partners or directors",
        "Proof of possession of the premises: ownership document, or rent agreement",
        "The kinds of food handled, made or sold",
        "For a firm, LLP or company: its partnership deed or certificate of incorporation, and authorisation of the person applying",
        "For licences, depending on the activity: a layout plan of the processing unit, a list of equipment, a water analysis report, a food safety management system plan, and any no-objection certificate the authority asks for",
      ],
    },

    { kind: "h2", id: "process", text: "How do you apply on FoSCoS?" },
    {
      kind: "steps",
      items: [
        {
          title: "Go to the official portal",
          body: "Use [FoSCoS](https://foscos.fssai.gov.in/), FSSAI's Food Safety Compliance System. Check the address before entering any details.",
        },
        {
          title: "Answer the eligibility questions",
          body: "Choose the state, the kind of business and the turnover. The portal indicates whether you need a registration, a state licence or a central licence.",
        },
        {
          title: "Complete the form",
          body: "Enter the business, premises and food category details, and upload the documents requested.",
        },
        {
          title: "Pay the fee shown",
          body: "The fee depends on the category and is displayed by the portal before payment.",
        },
        {
          title: "Respond to any query or inspection",
          body: "The authority may ask for clarification or inspect the premises before granting the approval, particularly for a licence.",
        },
        {
          title: "Display the certificate and use the number",
          body: "Keep the certificate displayed at the premises, and use the FSSAI number where the regulations require it, such as on the labels of packaged food.",
        },
      ],
    },

    { kind: "h2", id: "ongoing", text: "What responsibilities continue after approval?" },
    {
      kind: "list",
      items: [
        "**Hygiene and sanitary practice.** The regulations set general hygiene and sanitary requirements for premises, equipment, water, pest control and personal hygiene of food handlers. Larger and higher-risk operations have more detailed requirements.",
        "**Labelling.** Packaged food must carry the FSSAI number and the label information the labelling regulations require.",
        "**Keeping details current.** A change of premises, ownership, food categories or the person responsible should be applied for as a modification on FoSCoS.",
        "**Returns where they apply.** Some licence holders, such as manufacturers and importers, file periodic returns on FoSCoS. The portal shows whether your category has one.",
        "**Inspections.** With perpetual validity, inspection becomes the main check, and it is risk-based. Records of suppliers, cleaning and training are what an inspector asks to see.",
      ],
    },

    { kind: "h2", id: "existing", text: "What should a business already registered before April 2026 check?" },
    {
      kind: "p",
      text: "The order applies the new thresholds to food businesses generally and supersedes the earlier ones. A business that was licensed under the old limits, for example one with a state licence and a turnover of ₹40 lakh, now falls within the registration limit. Do not cancel or change an existing approval on your own reading of the order. Check your category on FoSCoS and follow what it, or your state food safety department, says about moving between categories. Keep the existing approval in force until the change is confirmed.",
    },

    { kind: "h2", id: "mistakes", text: "Which mistakes are most common?" },
    {
      kind: "list",
      items: [
        "**Relying on the old ₹12 lakh and ₹20 crore limits** quoted in older guides.",
        "**Choosing the category by turnover alone** without checking whether the activity places you in another category.",
        "**Starting to sell before the approval is granted.**",
        "**Describing the food categories too narrowly**, then adding products the approval does not cover.",
        "**Not updating the approval** when the premises, ownership or kind of business changes.",
        "**Using an unofficial website** that charges a fee for what FoSCoS does directly.",
      ],
    },

    { kind: "h2", id: "misconceptions", text: "Common misconceptions" },
    {
      kind: "list",
      items: [
        "**\"A small home business does not need FSSAI.\"** Small food businesses need a registration; being small changes the category, not the requirement.",
        "**\"Registration and licence are the same thing.\"** They are different approvals with different requirements.",
        "**\"Perpetual validity means no more compliance.\"** It removes periodic renewal, not hygiene, labelling or inspection.",
        "**\"An FSSAI number registers my business.\"** It is a food-safety approval. The business still needs its own structure and any GST, shops and establishments or municipal registration that applies.",
      ],
    },
    {
      kind: "links",
      title: "Related reading",
      items: [
        {
          href: "/blog/gujarat-shops-establishments-registration/",
          label: "Gujarat shops and establishments registration",
          blurb: "The state filing a restaurant, shop or kitchen also needs.",
        },
        {
          href: "/blog/gst-registration-gujarat-guide/",
          label: "GST registration in Gujarat",
          blurb: "When a food business crosses into GST.",
        },
      ],
    },

    { kind: "h2", id: "help", text: "Where does Raulji Group fit?" },
    {
      kind: "p",
      text: "When we set up a business, we advise on which activity approvals apply, FSSAI included, alongside the structure and the state registrations. We do not file FSSAI applications as a service. For the application itself, use FoSCoS directly or a food-safety consultant.",
    },
  ],
  faqs: [
    {
      q: "What is the FSSAI registration limit in 2026?",
      a: "Under FSSAI's order of 13 March 2026, effective from 1 April 2026, registration applies to food businesses with turnover up to ₹1.5 crore. A state licence applies above ₹1.5 crore and up to ₹50 crore, and a central licence above ₹50 crore.",
    },
    {
      q: "Do FSSAI licences still need renewal?",
      a: "The amendment regulations notified on 10 March 2026 provide for perpetual validity of FSSAI registrations and licences, subject to risk-based inspection. An approval can still be suspended or cancelled for non-compliance.",
    },
    {
      q: "Does a home-based food business need FSSAI registration?",
      a: "Yes. Small food businesses need FSSAI registration. The size of the business decides the category of approval, not whether one is needed.",
    },
    {
      q: "Where do I apply for FSSAI registration or a licence?",
      a: "On FoSCoS, FSSAI's Food Safety Compliance System at foscos.fssai.gov.in. It indicates the category based on the details you enter and lists the documents required.",
    },
    {
      q: "What is the difference between a state and a central licence?",
      a: "A state licence is issued by the state food safety department, and from 1 April 2026 covers turnover above ₹1.5 crore up to ₹50 crore. A central licence is issued by FSSAI and covers turnover above ₹50 crore, and may also apply to particular activities.",
    },
    {
      q: "Can I start selling food while my application is pending?",
      a: "No. The Food Safety and Standards Act, 2006 requires the registration or licence before the food business is started or carried on.",
    },
    {
      q: "Is FSSAI registration enough to open a restaurant?",
      a: "No. A restaurant typically also needs shops and establishments registration, GST once it applies, municipal permissions and, depending on the premises, fire safety clearance. FSSAI covers food safety only.",
    },
    {
      q: "Does Raulji Group apply for FSSAI licences?",
      a: "No. We advise on which approvals apply when we set up a business, FSSAI included, but we do not file FSSAI applications as a service.",
    },
  ],
  related: [
    "gujarat-shops-establishments-registration",
    "gst-registration-gujarat-guide",
    "starting-business-gujarat-registration-guide",
  ],
  services: [
    {
      href: "/services/proprietorship-registration/",
      label: "Proprietorship registration",
      blurb: "Includes guidance on activity licences such as FSSAI.",
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
      label: "FSSAI order of 13 March 2026: revised turnover thresholds",
      url: "https://www.fssai.gov.in/upload/advisories/2026/03/69b4054bb6cd6Order%20dated%2013thMarch2026_Revised%20Turnover%20threshold.pdf",
      supports:
        "Registration up to ₹1.5 crore, state licence above ₹1.5 crore up to ₹50 crore, central licence above ₹50 crore, from 1 April 2026; reference to the amendment regulations of 10 March 2026 on perpetual validity and risk-based inspection.",
    },
    {
      label: "FoSCoS, Food Safety Compliance System",
      url: "https://foscos.fssai.gov.in/",
      supports: "Where registration and licence applications are made, and the category and document checklist for each activity.",
    },
    {
      label: "Food Safety and Standards Authority of India",
      url: "https://www.fssai.gov.in/",
      supports: "The Food Safety and Standards Act, 2006 and the Licensing and Registration of Food Businesses Regulations, 2011, as amended.",
    },
  ],
  disclaimer:
    "This article reflects FSSAI's order of 13 March 2026 and the FoSCoS portal as checked on 23 October 2026. Categories also depend on the activity, and fees and document lists are set by FoSCoS. It is not legal advice; confirm your category on FoSCoS or with a food-safety professional.",
  cta: {
    title: "Starting a food business?",
    body: "Tell us what you will make or sell, where, and how the business will be owned. We will set out the structure and every approval that applies, FSSAI included.",
  },
};
