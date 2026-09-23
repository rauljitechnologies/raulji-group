import type { Article } from "../types";
import { GROUP_AUTHOR } from "../authors";

export const documentsRequired: Article = {
  slug: "documents-required-company-registration-india",
  title: "Documents Required for Company Registration in India: A Practical Guide",
  metaTitle: "Documents Required for Company Registration in India | Raulji Group",
  metaDescription:
    "The identity, address and registered office documents needed to incorporate a company in India, and the problems that cause most resubmissions.",
  excerpt:
    "Most incorporation delays are document problems, not government problems. Here is what is asked for, why each item is asked for, and where applications usually come back.",
  category: "Company Registration",
  seriesMonth: "April",
  published: "2026-09-22",
  updated: "2026-09-22",
  readMinutes: 10,
  primaryKeyword: "documents required for company registration",
  secondaryKeywords: [
    "company registration documents India",
    "registered office proof company",
    "DSC and DIN requirements",
    "documents for Private Limited Company registration",
    "MCA incorporation documents",
  ],
  searchIntent:
    "Informational with high commercial intent. The reader has usually decided to register and is gathering paperwork.",
  author: GROUP_AUTHOR,
  image: "documents",
  covers: [
    "The four groups of documents every incorporation draws on",
    "What is needed from each director and subscriber, and in what form",
    "Registered office proof, which is where most applications come unstuck",
    "The declarations and digital documents generated during the filing itself",
    "The specific document problems that cause resubmission",
  ],
  keyTakeaway: {
    heading: "The short answer",
    body: "Company incorporation in India draws on four groups of documents: identity proof for each director and subscriber, address proof for each of them, proof of the registered office with the owner's consent where it is not owned, and the declarations and constitutional documents generated as part of the filing itself.",
    points: [
      "Every proposed director and subscriber needs PAN, Aadhaar, a recent address proof and a photograph. A Digital Signature Certificate is needed for everyone who signs.",
      "The registered office needs a recent utility bill in the owner's name, together with a no-objection certificate and, where applicable, a rent agreement.",
      "There is no single universal list. What is required changes with who the subscribers are, whether any of them is a company or a foreign national, and what the business does.",
    ],
  },
  body: [
    {
      kind: "p",
      text: "Company incorporation in India is fast when the paperwork is right and slow when it is not. The Ministry of Corporate Affairs processes the application; what it is processing is a set of documents, and the overwhelming majority of delays come from one of those documents being out of date, in the wrong name, or inconsistent with another one in the same filing.",
    },
    {
      kind: "p",
      text: "This guide sets out what is asked for and, more usefully, why it is asked for. Knowing what a document is meant to prove tells you when a substitute will be accepted and when it will not.",
    },
    {
      kind: "warning",
      title: "There is no single list that fits every incorporation",
      text: "Requirements change depending on who is involved. A company with two resident individual subscribers is the simplest case. Add a foreign national, a corporate subscriber, or a registered office in premises owned by a relative and the requirements shift. Treat any fixed checklist, including this one, as the common case rather than the complete rule, and confirm against the current MCA instruction kits for your situation.",
    },

    { kind: "h2", id: "identity", text: "What identity documents does each director and subscriber need?" },
    {
      kind: "answer",
      text: "PAN and Aadhaar for every Indian national, plus a passport-sized photograph. A passport is mandatory for foreign nationals and is the accepted identity document in place of PAN.",
    },
    {
      kind: "p",
      text: "PAN is the anchor. The name on it is the name that will appear in the incorporation documents, and every other document in the file is checked against it. This matters more than it sounds. Names that differ across PAN, Aadhaar and bank records by a middle name, an initial or a spelling are among the most common reasons for a query coming back.",
    },
    {
      kind: "table",
      caption: "Identity documents by type of subscriber or director.",
      columns: ["Who", "Identity document", "Points to watch"],
      rows: [
        [
          "Indian national",
          "PAN, mandatory. Aadhaar as supporting identity.",
          "The name on PAN governs. Correct any mismatch at the source before filing, not during.",
        ],
        [
          "Foreign national",
          "Passport, mandatory.",
          "Documents executed outside India generally need to be notarised or apostilled depending on the country. Build time in for this.",
        ],
        [
          "Corporate subscriber",
          "Board resolution authorising the subscription and naming the authorised signatory, plus the company's own registration documents.",
          "The individual signing for the company also needs their own identity and address documents.",
        ],
      ],
    },

    { kind: "h2", id: "address", text: "What counts as address proof for a director?" },
    {
      kind: "answer",
      text: "A recent bank statement, electricity bill, telephone bill or mobile bill in the person's own name. These are expected to be recent, and the practical standard applied is not older than two months at the time of filing.",
    },
    {
      kind: "p",
      text: "The point of this document is to establish a current residential address, so anything that is old, in someone else's name, or shows a different address from the one entered in the form defeats its purpose. Two details catch people out regularly: a utility bill in a parent's or spouse's name is not address proof for the director, and a bank statement without the bank's stamp or without transaction entries is often not accepted.",
    },
    {
      kind: "checklist",
      title: "Per person, before filing",
      items: [
        "PAN card, with the name matching every other document in the file",
        "Aadhaar card",
        "Recent address proof in their own name, dated within the last two months",
        "Passport-sized photograph against a plain background",
        "Mobile number and email address that the person actually controls, since verification goes to both",
        "Passport, where the person is a foreign national, notarised or apostilled as required",
      ],
    },

    { kind: "h2", id: "registered-office", text: "What proof is needed for the registered office?" },
    {
      kind: "answer",
      text: "A recent utility bill for the premises, in the name of the owner, together with a no-objection certificate from that owner permitting the company to use the address as its registered office. Where the premises are rented, the rent or lease agreement is provided as well.",
    },
    {
      kind: "p",
      text: "This is the part of the file that causes the most trouble, and the reason is that the registered office is a legal address rather than an operational one. It is where notices from the Registrar, the tax department and the courts are validly served. The Registrar is therefore checking two things: that the address exists, and that the company has the owner's permission to be there.",
    },
    {
      kind: "list",
      items: [
        "**The utility bill must be recent.** The practical standard is not older than two months, and it should be for the exact premises, not for a neighbouring unit or the parent property.",
        "**The bill must be in the owner's name.** If the property is held in a family member's name, the no-objection certificate must come from that person, matching the bill.",
        "**The no-objection certificate must name the company.** Which means it is prepared after the name is approved, not before.",
        "**A rented address needs the agreement.** It should be current, cover the period, and describe the same premises as the utility bill.",
        "**A residential address is permitted.** A company may use a residential address as its registered office. Many do at the start.",
      ],
    },
    {
      kind: "warning",
      title: "Virtual offices and shared addresses",
      text: "Addresses supplied by coworking and virtual office providers are usable, but the same evidence is required: a utility bill for the premises and a no-objection certificate from whoever holds them. A provider who cannot supply both is not an address you can incorporate at, however the package is described. Ask for the documents before you pay.",
    },

    { kind: "h2", id: "digital", text: "Digital signatures and director identification numbers" },
    {
      kind: "answer",
      text: "Every person who signs an incorporation form needs a Digital Signature Certificate. Proposed directors who do not already hold a Director Identification Number can be allotted one through the incorporation filing itself, within the limit the form allows, rather than applying separately.",
    },
    {
      kind: "p",
      text: "A Digital Signature Certificate is issued by a licensed certifying authority after its own verification process, which usually involves video verification and a mobile and email check. This step sits outside the MCA process and is a common source of delay, because it depends on the individual being available to complete the verification rather than on anything the filing agent can do.",
    },
    {
      kind: "p",
      text: "Anyone who already holds a DIN should supply it rather than seeking a new one. Directors are also required to keep their DIN details current through the annual KYC filing, and a DIN that has been deactivated for a missed KYC will hold up a filing until it is restored.",
    },

    { kind: "h2", id: "name", text: "What do you need before choosing a name?" },
    {
      kind: "answer",
      text: "Name approval is part of the incorporation process rather than a document you bring to it, but it is worth preparing for. Names are examined for similarity to existing companies and LLPs and to registered trade marks, and for compliance with the naming rules.",
    },
    {
      kind: "p",
      text: "Two checks are worth doing yourself before submitting anything. Search the MCA register for companies and LLPs with similar names, and search the trade marks register for the word you intend to use. A name that clears the first check and fails the second is a wasted application, and it happens often.",
    },
    {
      kind: "p",
      text: "Names suggesting government patronage, or connection with a regulator, or that include words requiring approval from a sector regulator, need that approval in hand. A name that describes an activity the company is not being incorporated to carry on will also be questioned, since the proposed objects and the name are read together.",
    },
    {
      kind: "note",
      title: "Reservation is time limited",
      text: "An approved name is reserved for a fixed period, currently 20 days for a new company, within which the incorporation filing must be made. Extensions are available in tranches on payment of fees. The practical implication is to get the name approved when the rest of the file is nearly ready, rather than reserving a name early and then gathering documents.",
    },

    { kind: "h2", id: "generated", text: "Documents created during the filing, not before it" },
    {
      kind: "p",
      text: "Several documents that appear on checklists are not things you bring. They are produced as part of the filing, which is why they are not in the list you gather in advance.",
    },
    {
      kind: "list",
      items: [
        "**The memorandum and articles of association**, filed electronically as part of the incorporation application. The memorandum states what the company is formed to do; the articles set out how it is run internally.",
        "**The declaration by subscribers and first directors**, generated within the application and signed digitally.",
        "**The professional declaration**, made by the chartered accountant, company secretary or advocate certifying the application.",
        "**The linked registration application**, through which the company applies at incorporation for registrations such as GST, EPFO, ESIC, professional tax where applicable, a bank account and, in some states, a shops and establishment registration.",
      ],
    },
    {
      kind: "p",
      text: "What you do need to decide before this stage is the substance that goes into them: the authorised and subscribed capital, how shares are divided between subscribers, who will be directors, and what the company's main objects are. Those are business decisions and they take longer than collecting documents.",
    },
    {
      kind: "links",
      title: "The full process, and the structures it applies to",
      items: [
        {
          href: "/blog/mca-company-registration-process-india/",
          label: "The MCA incorporation process explained",
          blurb: "Name approval, the incorporation filing and what happens after the certificate.",
        },
        {
          href: "/services/pvt-registration/",
          label: "Private Limited Company registration",
          blurb: "Eligibility, documents and process for a company.",
        },
        {
          href: "/services/llp-registration/",
          label: "LLP registration",
          blurb: "Similar documents, a different form, and the LLP agreement afterwards.",
        },
      ],
    },

    { kind: "h2", id: "problems", text: "The document problems that cause most resubmissions" },
    {
      kind: "steps",
      items: [
        {
          title: "Name mismatches across documents",
          body: "PAN says one thing, Aadhaar says another, the bank statement a third. Fix the underlying record first. Filing with a mismatch and hoping it passes costs more time than correcting it.",
        },
        {
          title: "Utility bills that have aged out",
          body: "A bill that was current when you started gathering documents may not be by the time you file. Check the dates again immediately before submission, for both the directors and the registered office.",
        },
        {
          title: "A no-objection certificate that does not match the bill",
          body: "The person giving the certificate has to be the person the premises belong to, as shown on the bill. A certificate from a tenant, or from one co-owner where there are several, is a query waiting to happen.",
        },
        {
          title: "Address entered differently from the proof",
          body: "The address typed into the form should read the same as the address on the document supporting it, including the unit number and the pin code.",
        },
        {
          title: "Illegible or partial scans",
          body: "A cropped corner, a shadow across a line of text, or a photograph of a screen. Scan documents properly at a readable resolution.",
        },
        {
          title: "Objects that do not match the name or the activity",
          body: "If the name signals one line of business and the objects describe another, expect the application to be questioned.",
        },
      ],
    },

    { kind: "h2", id: "accuracy", text: "Why the accuracy of this information matters afterwards" },
    {
      kind: "p",
      text: "It is tempting to treat incorporation documents as a hurdle to clear. They are better understood as the company's opening record, and it stays on the public register.",
    },
    {
      kind: "p",
      text: "The registered office is where legal notice is served, so an address you do not actually monitor becomes a problem the first time something is sent there. Director details feed the KYC obligation that follows every year. The email and mobile entered are where the Registrar and the tax authorities will contact the company. Share capital and the division between subscribers is the starting point of the cap table, and correcting it later means a further filing.",
    },
    {
      kind: "p",
      text: "Changing any of this after incorporation is possible and is routine work. It is simply slower and more expensive than entering it correctly the first time, and some of it, such as a registered office moved between states, is significantly more involved than people expect.",
    },
  ],
  faqs: [
    {
      q: "What documents are required to register a company in India?",
      a: "For each proposed director and subscriber: PAN, Aadhaar, a recent address proof in their own name and a photograph, plus a Digital Signature Certificate for anyone signing. For the registered office: a recent utility bill for the premises in the owner's name, a no-objection certificate from that owner, and the rent agreement where the premises are rented. Foreign nationals provide a passport, notarised or apostilled as required.",
    },
    {
      q: "How recent does the address proof need to be?",
      a: "Recent enough to show a current address. The practical standard applied is not older than two months at the time of filing, for both the directors' address proofs and the registered office utility bill. Documents that were current when gathered can age out during preparation, so check the dates again before submitting.",
    },
    {
      q: "Can I use my home address as the registered office of a company?",
      a: "Yes. A residential address can be used as a registered office, and many companies start that way. The same evidence is required: a recent utility bill for the premises in the owner's name, and a no-objection certificate from that owner if the property is not in the name of a subscriber.",
    },
    {
      q: "Do all directors need a Digital Signature Certificate?",
      a: "Everyone who signs an incorporation form needs one. A Digital Signature Certificate is issued by a licensed certifying authority after its own verification, usually involving video verification and a mobile and email check, which is a step that depends on the individual being available.",
    },
    {
      q: "Do I need a DIN before applying to incorporate a company?",
      a: "Not necessarily. Proposed directors who do not already hold a Director Identification Number can be allotted one through the incorporation application itself, within the limit the form allows. Anyone who already holds a DIN should use it, and should make sure it is active and that their annual KYC filing is up to date.",
    },
    {
      q: "What is a no-objection certificate for the registered office?",
      a: "A signed statement from the owner of the premises confirming that they have no objection to the company using the address as its registered office. It must come from the person shown as the owner on the utility bill supplied, and it names the company, so it is prepared after the name is approved.",
    },
    {
      q: "Are the documents the same for an LLP as for a company?",
      a: "The identity, address and registered office documents are broadly the same, because they prove the same things. The forms differ, and an LLP has an additional obligation afterwards: the LLP agreement must be filed in Form 3 within 30 days of incorporation.",
    },
    {
      q: "What happens if a document is rejected?",
      a: "The application comes back for resubmission with the objection stated. You correct the document and file again within the time allowed. It is not a refusal of the incorporation, but it does add days, and where a reserved name is close to expiry it can create pressure that did not need to exist.",
    },
  ],
  related: [
    "common-business-registration-mistakes-india",
    "mca-company-registration-process-india",
  ],
  services: [
    {
      href: "/services/pvt-registration/",
      label: "Private Limited Company registration",
      blurb: "The full document list and process for a company, with what we handle.",
    },
    {
      href: "/services/llp-registration/",
      label: "LLP registration",
      blurb: "Documents, FiLLiP, and the LLP agreement filing that follows.",
    },
    {
      href: "/services/business-registration/",
      label: "Business Registration",
      blurb: "If you have not settled on a structure yet, start here.",
    },
  ],
  sources: [
    {
      label: "Ministry of Corporate Affairs",
      url: "https://www.mca.gov.in/",
      supports:
        "Incorporation forms, instruction kits, name reservation validity and the documents required with an incorporation application.",
    },
    {
      label: "MCA instruction kit for SPICe+ Part A, name reservation",
      url: "https://www.mca.gov.in/content/dam/mca-aem-forms/instructionkits/Instruction%20Kit_SPICe+Part%20A.pdf",
      supports: "Name reservation process and the period for which an approved name is reserved.",
    },
  ],
  disclaimer:
    "This article is for general informational purposes only. Document requirements vary with the facts of each application and change over time. Verify current requirements on the MCA portal or with a qualified professional before filing.",
  cta: {
    title: "Want your documents checked before anything is filed?",
    body: "Send us what you have. We will tell you what is missing, what will not be accepted in its current form, and what needs to be corrected at source first.",
  },
};
