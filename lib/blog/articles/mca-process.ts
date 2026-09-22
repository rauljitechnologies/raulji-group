import type { Article } from "../types";
import { GROUP_AUTHOR } from "../authors";

export const mcaProcess: Article = {
  slug: "mca-company-registration-process-india",
  title: "MCA Company Registration in India: Understanding the Incorporation Process",
  metaTitle: "MCA Company Registration Process in India Explained | Raulji Group",
  metaDescription:
    "How company incorporation works on the MCA portal: name reservation, SPICe+ and its linked filings, and the Certificate of Incorporation.",
  excerpt:
    "The Ministry of Corporate Affairs is the regulator and the platform. Understanding what it does, and what it expects from an application, is what makes the process predictable.",
  category: "Company Registration",
  seriesMonth: "July",
  published: "2026-09-22",
  updated: "2026-09-22",
  readMinutes: 11,
  primaryKeyword: "MCA company registration",
  secondaryKeywords: [
    "company incorporation process India",
    "SPICe+ form",
    "MCA V3 portal",
    "certificate of incorporation",
    "name reservation MCA",
  ],
  searchIntent:
    "Informational with commercial intent. The reader wants to understand the official process before engaging anyone.",
  author: GROUP_AUTHOR,
  image: "mca-process",
  covers: [
    "What the Ministry of Corporate Affairs is, and what it is not",
    "Name reservation, and why it is examined rather than automatic",
    "The incorporation filing and the registrations bundled into it",
    "What arrives at the end, and what has to happen immediately afterwards",
    "The specific reasons applications are sent back",
  ],
  keyTakeaway: {
    heading: "The short answer",
    body: "Company incorporation in India is filed on the Ministry of Corporate Affairs portal using SPICe+, a single application in two parts: Part A reserves the name, Part B incorporates the company and carries linked filings for the constitutional documents, declarations and several other registrations. Approval results in a Certificate of Incorporation carrying the company's CIN, with PAN and TAN issued alongside.",
    points: [
      "The MCA is the government ministry that administers company law and runs the filing platform. It grants incorporation; no private firm can.",
      "Name approval is examined by the Central Registration Centre rather than granted automatically, and an approved name is reserved for a limited period.",
      "The same application also applies for registrations such as PAN, TAN, DIN, GST, EPFO and ESIC, which is why the form asks for so much at once.",
    ],
  },
  body: [
    {
      kind: "warning",
      title: "Raulji Group is not the MCA, and neither is anyone else offering this service",
      text: "The Ministry of Corporate Affairs is a department of the Government of India. It administers the Companies Act, 2013 and the LLP Act, 2008, maintains the public register, and operates the portal on which filings are made. Raulji Group is a private business-services firm. We prepare and file applications on your behalf and we advise on what to file. The decision to approve a name or to incorporate a company rests entirely with the MCA. Any provider suggesting otherwise, or implying an affiliation with the ministry, is misrepresenting what they do.",
    },
    {
      kind: "p",
      text: "With that said, the process itself is well documented and reasonably predictable. Most of the uncertainty people feel about it comes from not knowing what happens at each stage or who is deciding what. This article walks through it in order.",
    },

    { kind: "h2", id: "what-is-mca", text: "What does the Ministry of Corporate Affairs actually do here?" },
    {
      kind: "answer",
      text: "It administers company and LLP law, runs the MCA portal on which incorporation and annual filings are made, and maintains the public register of companies through the Registrars of Companies. Name approval and incorporation applications are examined and decided by the MCA, through the Central Registration Centre and the relevant Registrar.",
    },
    {
      kind: "p",
      text: "There are twenty-odd Registrar offices with jurisdiction over different states. Companies with a registered office in Gujarat fall under the Registrar of Companies at Ahmedabad. Because filing is online, the office you fall under affects who processes the application rather than how you make it.",
    },
    {
      kind: "p",
      text: "Filings are made on the MCA V3 portal, which is the current version of the platform. Company and LLP forms are filed through it as web forms rather than downloadable PDFs, which is worth knowing if you are following an older guide that describes attaching a filled form.",
    },

    { kind: "h2", id: "before", text: "What has to be ready before you begin?" },
    {
      kind: "p",
      text: "Three things, and only the first of them is quick.",
    },
    {
      kind: "list",
      items: [
        "**Digital Signature Certificates** for everyone who will sign the application. These are issued by licensed certifying authorities after their own verification, usually involving video verification and a mobile and email check. This sits outside the MCA process and is a common source of delay.",
        "**Documents for every proposed director and subscriber**: PAN, Aadhaar, a recent address proof in their own name, and a photograph. Foreign nationals provide a passport, notarised or apostilled as required.",
        "**Registered office evidence**: a recent utility bill for the premises in the owner's name, and a no-objection certificate from that owner naming the company, plus the rent agreement where the premises are rented.",
      ],
    },
    {
      kind: "p",
      text: "Alongside the documents, decisions have to be made that cannot be deferred: the authorised and subscribed capital, how shares split between subscribers, who will be directors, and what the company is being formed to do. These go into the incorporation documents and onto the public register.",
    },
    {
      kind: "links",
      title: "The document side, in full",
      items: [
        {
          href: "/blog/documents-required-company-registration-india/",
          label: "Documents required for company registration",
          blurb: "What each document proves, and where applications usually come unstuck.",
        },
      ],
    },

    { kind: "h2", id: "name", text: "How does name reservation work?" },
    {
      kind: "answer",
      text: "A proposed name is submitted in Part A of SPICe+. Up to two names can be proposed, of which one may be approved. Part A is processed in non straight-through mode, which means it is examined by the Central Registration Centre rather than approved automatically. An approved name for a new company is reserved for 20 days, extendable in tranches on payment of fees.",
    },
    {
      kind: "p",
      text: "Names are checked against existing companies and LLPs for identity and deceptive similarity, against registered trade marks, and against the naming rules. Words implying government patronage or connection with a regulator need the relevant approval. A name that does not sit consistently with the objects the company is being incorporated for will also attract a query.",
    },
    {
      kind: "p",
      text: "Two free searches before you submit anything save most of the trouble: the MCA register for similar company and LLP names, and the trade marks register for the distinctive word in your name. The trade mark check is the one people skip, and it is the one that produces the surprising refusals.",
    },
    {
      kind: "note",
      title: "Sequence matters more than it looks",
      text: "The reservation clock starts on approval, and the no-objection certificate for the registered office has to name the company, so it is prepared after the name is approved. Reserving a name before the documents are gathered is a reliable way to end up paying for an extension.",
    },

    { kind: "h2", id: "spice", text: "What is SPICe+ and what does it cover?" },
    {
      kind: "answer",
      text: "SPICe+ is the integrated web form through which a company is incorporated. Part A handles name reservation. Part B handles incorporation itself, together with a set of linked filings that apply for several other registrations in the same submission.",
    },
    {
      kind: "table",
      caption: "SPICe+ Part B and the filings linked to it.",
      columns: ["Filing", "What it does"],
      rows: [
        [
          "SPICe+ Part B",
          "The incorporation application: subscribers, directors, share capital, registered office and the company's objects.",
        ],
        [
          "e-MoA (INC-33)",
          "The memorandum of association, stating what the company is formed to do and the subscribers' shareholding.",
        ],
        [
          "e-AoA (INC-34)",
          "The articles of association, the company's internal rulebook for how it is governed.",
        ],
        [
          "INC-9",
          "The declaration by the first subscribers and directors, generated within the application and signed digitally.",
        ],
        [
          "AGILE-PRO-S (INC-35)",
          "Applications for GST registration, EPFO, ESIC, professional tax where applicable, a bank account, and shops and establishment registration in the states where that is covered.",
        ],
      ],
    },
    {
      kind: "p",
      text: "The application also allots Director Identification Numbers to proposed directors who do not already hold one, within the limit the form allows, and applies for the company's PAN and TAN. This is the reason a single incorporation form asks for so much at once: it is doing the work of what used to be a series of separate applications.",
    },
    {
      kind: "p",
      text: "A professional, a chartered accountant, company secretary or advocate, certifies the application. That certification is a statement about the correctness of what is being filed, which is why a competent filer will push back on documents that do not stand up rather than submit them and see what happens.",
    },

    { kind: "h2", id: "processing", text: "What happens once it is filed?" },
    {
      kind: "steps",
      items: [
        {
          title: "The application is examined",
          body: "The Central Registration Centre reviews the filing against the Act, the rules and the documents attached to it.",
        },
        {
          title: "It is approved, or it comes back for resubmission",
          body: "A resubmission states the objection. You correct the document or the entry and file again within the period allowed. This is not a refusal of the incorporation; it is a query on the paperwork.",
        },
        {
          title: "The Certificate of Incorporation is issued",
          body: "It carries the Corporate Identity Number, the CIN, which identifies the company permanently on the public register. PAN and TAN are issued alongside it.",
        },
        {
          title: "The linked registrations follow their own paths",
          body: "GST, EPFO, ESIC and the bank account applications proceed through their own systems and their own timelines, which are not the MCA's. Confirm each one rather than assuming incorporation completed them all.",
        },
      ],
    },
    {
      kind: "p",
      text: "How long this takes depends almost entirely on the quality of the application. A complete, internally consistent file is usually processed quickly. One with a document query is not, and where the reserved name is near expiry a resubmission creates pressure that did not need to exist. Any timeline quoted to you, by us or by anyone else, is an estimate conditional on documents being correct and on government processing outside the filer's control.",
    },

    { kind: "h2", id: "after", text: "What happens immediately after incorporation?" },
    {
      kind: "p",
      text: "The certificate is the beginning of the company's obligations, not the end of a process. In the first weeks a new company typically needs to:",
    },
    {
      kind: "checklist",
      title: "The first weeks",
      items: [
        "Open the current account and deposit the subscription money, so that the shares subscribed are actually paid for",
        "Confirm the status of each linked registration applied for through AGILE-PRO-S rather than assuming all of them completed",
        "Appoint the first auditor within the period the Companies Act allows",
        "Hold and minute the first board meeting, and set up the statutory registers",
        "Take any activity registrations the business needs: Udyam, licences, state registrations such as shops and establishment where not covered by the incorporation filing",
      ],
    },
    {
      kind: "p",
      text: "From then on the annual cycle runs: an audit every financial year from the first, regardless of turnover, and annual filings with the Registrar. Directors also have an annual KYC obligation attached to their DIN, and a deactivated DIN will block filings until it is restored.",
    },
    {
      kind: "links",
      title: "What the compliance year looks like",
      items: [
        {
          href: "/services/pvt-compliance/",
          label: "Private Limited compliance",
          blurb: "Audit, board meetings, registers and the annual filings.",
        },
        {
          href: "/services/business-consulting/",
          label: "Business Consulting",
          blurb: "If the structure and the plan behind it still need working through.",
        },
      ],
    },

    { kind: "h2", id: "llp", text: "How does LLP incorporation differ?" },
    {
      kind: "p",
      text: "An LLP is incorporated through FiLLiP rather than SPICe+, on the same portal. The documents are broadly similar because they prove the same things, and digital signatures are required in the same way.",
    },
    {
      kind: "p",
      text: "The difference that catches people is what happens after. An LLP must file its LLP agreement in Form 3 within 30 days of incorporation. That is a short window with no routine extension, and the agreement is the document that governs how the LLP is run, so it needs to be drafted properly rather than assembled in a hurry against the deadline.",
    },

    { kind: "h2", id: "delays", text: "Why applications get sent back" },
    {
      kind: "list",
      items: [
        "**Name objections**: similarity to an existing company, LLP or registered trade mark, or inconsistency with the objects proposed.",
        "**Registered office evidence**: a utility bill that is not recent, is not in the owner's name, or does not match the no-objection certificate filed with it.",
        "**Identity mismatches**: a name spelled differently across PAN, Aadhaar and the address proof.",
        "**Address entered differently from the supporting document**, including unit numbers and pin codes.",
        "**Digital signature problems**: a certificate not registered on the portal, expired, or belonging to the wrong person.",
        "**A DIN that is deactivated** because the director's annual KYC was not filed.",
        "**Objects drafted loosely**, so that what the company says it will do does not match the name or the activity described elsewhere in the filing.",
      ],
    },
    {
      kind: "p",
      text: "Every item on that list is avoidable before submission. That is the practical case for having the file checked by someone who has seen the objections, whether that is us or anyone else: not because the process is obscure, but because it is unforgiving of small inconsistencies.",
    },
  ],
  faqs: [
    {
      q: "What is SPICe+?",
      a: "SPICe+ is the integrated web form on the MCA portal used to incorporate a company in India. Part A reserves the company name and Part B handles incorporation, along with linked filings for the memorandum and articles, the subscribers' declaration, and applications for registrations including GST, EPFO and ESIC. The application also applies for PAN and TAN and can allot Director Identification Numbers.",
    },
    {
      q: "How long is a reserved company name valid?",
      a: "An approved name for a new company is reserved for 20 days from approval, within which the incorporation application must be filed. Extensions are available in tranches on payment of fees. Because the clock starts on approval, it is generally better to have the rest of the file ready before submitting the name.",
    },
    {
      q: "Is Raulji Group part of the MCA?",
      a: "No. The Ministry of Corporate Affairs is a department of the Government of India that administers company law and operates the filing portal. Raulji Group is a private business-services firm that prepares and files applications on a client's behalf. Approval of a name or an incorporation rests solely with the MCA.",
    },
    {
      q: "What is a Certificate of Incorporation?",
      a: "It is the document issued by the Registrar of Companies confirming that a company has been incorporated. It carries the Corporate Identity Number, or CIN, which identifies the company permanently on the public register. PAN and TAN are issued alongside it.",
    },
    {
      q: "Do I need a Digital Signature Certificate to register a company?",
      a: "Yes. Everyone who signs an incorporation form needs one. A Digital Signature Certificate is issued by a licensed certifying authority after its own verification process, which usually includes video verification and a mobile and email check, and is a step that depends on each individual being available.",
    },
    {
      q: "Why was my company registration application sent back for resubmission?",
      a: "A resubmission states the objection. The common causes are name similarity to an existing company, LLP or trade mark, registered office evidence that is out of date or does not match the no-objection certificate, identity documents that disagree with each other, digital signature problems, and a deactivated DIN. A resubmission is a query on the paperwork rather than a refusal of the incorporation.",
    },
    {
      q: "Does incorporation automatically give me GST registration?",
      a: "The incorporation filing includes an application through AGILE-PRO-S covering GST, EPFO, ESIC and others, but each of those proceeds through its own system with its own processing. Whether a GST application was made at all depends on what was selected during filing, so it is worth confirming the status of each registration rather than assuming incorporation completed them.",
    },
    {
      q: "How long does company incorporation take in India?",
      a: "Government processing of a complete and correct application is usually quick, but the realistic total depends on steps outside it: obtaining digital signature certificates, any notarisation or apostille for documents executed abroad, name examination, and any resubmission. Treat any quoted timeline as an estimate conditional on documents being complete and correct.",
    },
  ],
  related: [
    "how-to-choose-business-structure-india-2026",
    "private-limited-company-vs-llp",
    "documents-required-company-registration-india",
  ],
  services: [
    {
      href: "/services/pvt-registration/",
      label: "Private Limited Company registration",
      blurb: "What we prepare, what we file, and what the MCA decides.",
    },
    {
      href: "/services/business-registration/",
      label: "Business Registration",
      blurb: "The four structures and how the choice is made before any filing starts.",
    },
    {
      href: "/services/business-consulting/",
      label: "Business Consulting",
      blurb: "The decisions behind the filing: capital, shareholding and objects.",
    },
  ],
  sources: [
    {
      label: "Ministry of Corporate Affairs",
      url: "https://mca.gov.in/",
      supports:
        "The incorporation process, SPICe+ and linked filings, Registrar jurisdiction and post-incorporation obligations.",
    },
    {
      label: "MCA instruction kit for SPICe+ Part A, name reservation",
      url: "https://www.mca.gov.in/content/dam/mca-aem-forms/instructionkits/Instruction%20Kit_SPICe+Part%20A.pdf",
      supports:
        "Number of names that may be proposed, non straight-through processing, and the 20-day reservation period.",
    },
    {
      label: "MCA FAQs on incorporation and allied matters",
      url: "https://www.mca.gov.in/content/dam/mca/pdf/SPICEplus-and-linked-filings-FAQs-V3-20230122.pdf",
      supports: "SPICe+ structure and the forms linked to Part B.",
    },
  ],
  disclaimer:
    "This article is for general informational purposes only. Forms, procedures, timelines and fees change. Verify current requirements on the MCA portal at mca.gov.in or with a qualified professional before filing.",
  cta: {
    title: "Want the filing handled properly the first time?",
    body: "We prepare the name application, the incorporation filing and the documents behind them, and we tell you what the government charges will be before anything is submitted.",
  },
};
