import type { Article } from "../types";
import { GROUP_AUTHOR } from "../authors";

/**
 * Import Export Code (IEC).
 *
 * Paragraphs 2.05 to 2.14 of the Handbook of Procedures 2023, Chapter 2,
 * were read in DGFT's own PDF on 23 Oct 2026. The ₹500 application fee and
 * the April to June annual update come from Appendix 2K and paragraph 2.05(e)
 * of the Foreign Trade Policy 2023 as reported, and are flagged for
 * confirmation on the DGFT portal.
 *
 * Raulji Group gives guidance on the Import Export Code as an activity
 * registration; it does not file IEC applications as a service.
 */
export const importExportCode: Article = {
  slug: "import-export-code-iec-guide",
  title: "Import Export Code (IEC): Documents, Application and Compliance",
  metaTitle: "Import Export Code (IEC): Documents, Process, Annual Update",
  metaDescription:
    "Who needs an Import Export Code, the exemptions, documents for the DGFT application, the annual April to June update, and the approvals IEC does not replace.",
  excerpt:
    "An Import Export Code is the ten-character number customs and DGFT use to identify an importer or exporter. It is quick to obtain, permanent, tied to your PAN, and easy to lose if you forget the yearly update.",
  category: "Business Registration",
  published: "2026-10-23",
  updated: "2026-10-23",
  readMinutes: 10,
  primaryKeyword: "Import Export Code",
  secondaryKeywords: [
    "IEC registration",
    "DGFT IEC application",
    "IEC annual update",
    "who needs IEC",
  ],
  searchIntent:
    "Informational, pre-trade. An Indian entrepreneur about to import or export goods who wants to know whether IEC applies and how to obtain and keep it.",
  author: GROUP_AUTHOR,
  image: "iec",
  covers: [
    "What an IEC is, and who must have one",
    "The categories exempted by the Handbook of Procedures",
    "How IEC differs from GST registration and customs requirements",
    "The documents and the online application on the DGFT portal",
    "The annual update, modifications, and the approvals IEC does not replace",
  ],
  keyTakeaway: {
    heading: "The short answer: do you need an Import Export Code?",
    body: "Yes, if you import or export goods as a business. Paragraph 2.07 of the Handbook of Procedures 2023 makes the **IEC compulsory for imports and exports**, with narrow exemptions such as goods for **personal use not connected with trade**, and government departments. You apply online in form **ANF-2A** on the [DGFT portal](https://www.dgft.gov.in/). The IEC has **permanent validity**, but must be **updated online every year** or it can be de-activated.",
    points: [
      "One PAN can hold only one IEC, and the IEC number is the PAN.",
      "IEC identifies you to customs and DGFT. It is not a licence for any particular product.",
      "Some goods need other approvals as well, such as FSSAI for food imports or an export promotion council registration for certain benefits.",
    ],
  },
  body: [
    {
      kind: "p",
      text: "The Importer-Exporter Code is issued by the Directorate General of Foreign Trade (DGFT). Customs uses it to identify who is importing or exporting a consignment, and DGFT uses it for authorisations and benefits under the Foreign Trade Policy. For most businesses it is a short online application. What causes trouble later is not getting it, but keeping it active.",
    },

    { kind: "h2", id: "who", text: "Who needs an IEC, and who is exempt?" },
    {
      kind: "answer",
      text: "Anyone importing or exporting goods needs an IEC, unless they fall in an exempt category. The exemptions in paragraph 2.07 of the Handbook of Procedures 2023 are narrow.",
    },
    {
      kind: "list",
      items: [
        "**Personal use.** Persons importing or exporting goods for personal use not connected with trade, manufacture or agriculture.",
        "**Government.** Ministries and departments of the central and state governments.",
        "**Certain border trade.** Imports and exports to and from Nepal, Bhutan and Myanmar through the Indo-Myanmar border areas, and with China through specified passes, where a single consignment is within the value limits the paragraph sets.",
        "**Other cases** covered by the Foreign Trade (Exemption from application of Rules in certain cases) Order, 1993, as listed in the paragraph.",
      ],
    },
    {
      kind: "warning",
      title: "The exemption does not cover SCOMET items",
      text: "Paragraph 2.07 states that the exemption does not apply to exports of SCOMET items, the specified chemicals, organisms, materials, equipment and technologies listed in Appendix 3. Those exports need an IEC and their own authorisation.",
    },
    {
      kind: "p",
      text: "Any structure can hold an IEC: a proprietorship, a partnership firm, an LLP or a company. An IEC is issued against the PAN of the entity, so a proprietor's IEC is issued against the proprietor's own PAN.",
    },

    { kind: "h3", text: "Examples: who needs an IEC?" },
    {
      kind: "table",
      caption: "How paragraph 2.07 applies in some common cases",
      columns: ["Situation", "IEC needed?"],
      rows: [
        ["A proprietor in Jamnagar exporting brass parts to a buyer in Germany", "Yes"],
        ["A trader importing electronics through a courier for resale", "Yes. A courier shipment for trade is still an import"],
        ["A person importing a laptop for their own use", "No. Personal use not connected with trade is exempt"],
        ["A manufacturer importing a machine for its own factory", "Yes. Use in manufacture is not personal use"],
        ["A government department importing equipment", "No. It is an exempted category"],
      ],
      rowHeader: true,
    },

    { kind: "h2", id: "difference", text: "How is IEC different from GST registration and customs requirements?" },
    {
      kind: "table",
      caption: "Three registrations an importer or exporter often deals with",
      columns: ["", "What it is for", "Issued by"],
      rows: [
        ["IEC", "Identifies the importer or exporter to customs and DGFT", "DGFT"],
        ["[GST registration](/blog/gst-registration-gujarat-guide/)", "Tax on supplies, including IGST on imports and zero-rating of exports", "GST portal"],
        ["Customs registrations", "Port-level registrations, such as of the bank account for export proceeds, needed to clear shipments", "Customs, through ICEGATE"],
      ],
      rowHeader: true,
    },
    {
      kind: "p",
      text: "These are separate. Holding an IEC does not register you for GST, and a GSTIN does not give you an IEC. A business that exports goods usually needs all three, and should plan them together with its customs broker.",
    },

    { kind: "h2", id: "documents", text: "What documents does the application need?" },
    {
      kind: "answer",
      text: "Paragraph 2.08 requires the online application to be accompanied by scanned copies of a **cancelled cheque** bearing the entity's pre-printed name, or a **bank certificate** in the prescribed format, and **address proof** of the applicant entity.",
    },
    {
      kind: "checklist",
      title: "Have this ready",
      items: [
        "PAN of the entity (the proprietor's PAN for a proprietorship)",
        "A current account in the entity's name, with a cancelled cheque showing that name, or a bank certificate",
        "Address proof of the business premises",
        "Details of the proprietor, partners or directors",
        "A digital signature certificate or Aadhaar-based e-signing for submitting the application",
      ],
    },

    { kind: "h2", id: "process", text: "How do you apply on the DGFT portal?" },
    {
      kind: "steps",
      items: [
        {
          title: "Register on the DGFT portal",
          body: "Create a user account on dgft.gov.in with a mobile number and email address.",
        },
        {
          title: "Start an IEC application",
          body: "Choose the option to apply for an IEC. The application is form ANF-2A.",
        },
        {
          title: "Enter the details",
          body: "Enter the entity, address, bank account, and the details of the proprietor, partners or directors. Upload the cancelled cheque or bank certificate and the address proof.",
        },
        {
          title: "Pay the fee and sign",
          body: "Pay the application fee online and sign the application electronically. The fee is set by Appendix 2K and shown on the portal.",
        },
        {
          title: "Download the e-IEC",
          body: "Under paragraph 2.08, the IEC is generated and the applicant is told by email and SMS. The e-IEC can be downloaded from the DGFT dashboard. Regional authorities may verify online IECs afterwards.",
        },
      ],
    },
    {
      kind: "p",
      text: "Paragraph 2.05 of the Handbook of Procedures allows an incomplete application to be rejected with reasons. If the deficiencies are not rectified within 90 days, the application is treated as withdrawn.",
    },

    { kind: "h3", text: "How to check an IEC" },
    {
      kind: "p",
      text: "Under paragraph 2.09, the details of any IEC can be verified on the DGFT website through the service for viewing IEC related details. It is worth checking your own after it is issued, and a supplier's or buyer's before you rely on it in a contract.",
    },

    { kind: "h2", id: "keep", text: "How do you keep an IEC active?" },
    {
      kind: "list",
      items: [
        "**Validity.** Under paragraph 2.10, an IEC has permanent validity unless suspended or cancelled, and covers all branches and units of the holder.",
        "**Annual update.** The Foreign Trade Policy requires IEC details to be updated online every year between April and June, even when nothing has changed. An IEC that is not updated can be de-activated, and customs will not clear shipments against a de-activated IEC.",
        "**Changes.** Under paragraph 2.14, a change in constitution, address, bank details or other primary details must be updated online, with the applicable fee and documents.",
        "**One per PAN.** Paragraph 2.12 allows only one IEC against a single PAN. A business that changes structure, for example from a proprietorship to a company, has a new PAN and needs a new IEC.",
        "**Surrender.** An IEC can be surrendered online under paragraph 2.13, once all authorisations and obligations under it are closed.",
      ],
    },
    {
      kind: "steps",
      items: [
        {
          title: "Log in between April and June",
          body: "Sign in to the DGFT portal with the account linked to the IEC, and open the option to update the IEC.",
        },
        {
          title: "Review every field",
          body: "Check the address, bank account, contact details and the proprietor, partners or directors against your current records.",
        },
        {
          title: "Correct or confirm",
          body: "Change anything that is out of date, with documents where asked. If nothing has changed, confirm the details as they stand; the update is still required.",
        },
        {
          title: "Sign, submit and keep the acknowledgement",
          body: "Submit with the electronic signature. Keep the confirmation with your compliance records.",
        },
      ],
    },

    { kind: "h2", id: "other", text: "Which other approvals may apply?" },
    {
      kind: "p",
      text: "IEC is the identifier, not permission to trade in a particular product. Depending on what you import or export, you may also need:",
    },
    {
      kind: "list",
      items: [
        "**Licences or authorisations for restricted items**, as set out in the ITC (HS) classification of the goods.",
        "**FSSAI clearance** for imported food, and an FSSAI licence for the business; see our [FSSAI guide](/blog/fssai-registration-food-licence-india/).",
        "**Product standards and certification** for goods covered by compulsory standards.",
        "**Registration-cum-Membership Certificate (RCMC)** from an export promotion council, where a benefit under the Foreign Trade Policy requires it.",
        "**GST arrangements for exports**, such as exporting under a letter of undertaking without payment of tax, where eligible.",
      ],
    },

    { kind: "h2", id: "mistakes", text: "Which mistakes are most common?" },
    {
      kind: "list",
      items: [
        "**Missing the April to June update** and finding out at the port that the IEC is de-activated.",
        "**Opening the bank account in a different name** from the entity on the PAN, which fails the cheque or certificate check.",
        "**Address proof that does not match** the address entered.",
        "**Not updating the IEC** after a change of address, bank or partners.",
        "**Assuming IEC is enough** to import or export a restricted or regulated product.",
        "**Paying an unofficial website** for an application that is made on the DGFT portal.",
      ],
    },

    { kind: "h2", id: "misconceptions", text: "Common misconceptions" },
    {
      kind: "list",
      items: [
        "**\"IEC needs renewal every few years.\"** It is permanent, but needs the annual online update.",
        "**\"Only companies can get an IEC.\"** Any entity with a PAN can, including a proprietorship.",
        "**\"Services exporters always need an IEC.\"** The Handbook makes IEC compulsory for imports and exports of goods. Whether a services exporter needs one depends on whether they claim a benefit under the Foreign Trade Policy that requires it.",
        "**\"IEC replaces GST.\"** It does not; they are separate registrations.",
      ],
    },

    { kind: "h2", id: "help", text: "Where does Raulji Group fit?" },
    {
      kind: "p",
      text: "When we set up a business that will import or export, we advise on the structure, on GST, and on which activity registrations apply, the IEC included. We do not file IEC applications as a service. For the application, use the DGFT portal directly or your customs broker.",
    },
  ],
  faqs: [
    {
      q: "Is an IEC compulsory for imports and exports?",
      a: "Yes, for imports and exports of goods, under paragraph 2.07 of the Handbook of Procedures 2023, except for the exempted categories such as goods for personal use not connected with trade, manufacture or agriculture, and government departments.",
    },
    {
      q: "What documents are needed for an IEC?",
      a: "Under paragraph 2.08, a cancelled cheque bearing the entity's pre-printed name or a bank certificate in the prescribed format, and address proof of the applicant entity, uploaded with the online application in form ANF-2A.",
    },
    {
      q: "How long is an IEC valid?",
      a: "An IEC has permanent validity unless suspended or cancelled, under paragraph 2.10. It must be updated online every year between April and June, or it can be de-activated.",
    },
    {
      q: "Is the IEC number the same as PAN?",
      a: "Yes. The IEC is issued against the entity's PAN, and only one IEC can be issued against a single PAN.",
    },
    {
      q: "Can a proprietorship get an IEC?",
      a: "Yes. A proprietorship's IEC is issued against the proprietor's PAN. Partnership firms, LLPs and companies obtain an IEC against their own PAN.",
    },
    {
      q: "What happens if I do not update my IEC?",
      a: "An IEC that is not updated within the annual April to June window can be de-activated under the Foreign Trade Policy, and shipments cannot be cleared against it until it is restored.",
    },
    {
      q: "Do I need an IEC to sell on an international marketplace?",
      a: "If you are exporting goods, yes, unless an exemption applies. Check the marketplace's own requirements too, and plan GST and customs arrangements alongside the IEC.",
    },
    {
      q: "Does Raulji Group apply for IECs?",
      a: "No. We advise on which registrations apply when setting up a business that will import or export, the IEC included, but we do not file IEC applications as a service.",
    },
  ],
  related: [
    "gst-registration-gujarat-guide",
    "after-company-incorporation-compliance-checklist",
    "how-to-choose-business-structure-india",
  ],
  services: [
    {
      href: "/services/proprietorship-registration/",
      label: "Proprietorship registration",
      blurb: "Includes guidance on activity registrations such as the Import Export Code.",
    },
    {
      href: "/gujarat/",
      label: "Business registration across Gujarat",
      blurb: "Where we work, with city pages for the main markets.",
    },
    {
      href: "/services/business-registration/",
      label: "Business Registration",
      blurb: "All four business structures, and how to choose between them.",
    },
  ],
  sources: [
    {
      label: "DGFT: Handbook of Procedures 2023, Chapter 2",
      url: "https://content.dgft.gov.in/Website/dgftprod/6978673f-9c59-4aac-a612-084df7b47e39/HBP2023_Chapter02.pdf",
      supports:
        "Paragraphs 2.05 (incomplete applications), 2.07 (IEC compulsory and exempted categories, SCOMET), 2.08 (ANF-2A, documents), 2.10 (permanent validity), 2.12 (one PAN, one IEC), 2.13 (surrender) and 2.14 (modification), read on 23 October 2026.",
    },
    {
      label: "Directorate General of Foreign Trade",
      url: "https://www.dgft.gov.in/",
      supports:
        "Where the application and annual update are made; Foreign Trade Policy 2023 paragraph 2.05 on the annual update and de-activation; application fee in Appendix 2K.",
    },
  ],
  disclaimer:
    "This article reflects the DGFT Handbook of Procedures 2023 as read on 23 October 2026. Fees, the annual update window and product-specific requirements are set by DGFT and other authorities and can change. It is not legal or trade advice; confirm requirements on the DGFT portal or with your customs broker.",
  cta: {
    title: "Setting up a business that will import or export?",
    body: "Tell us what you will trade and how the business will be owned. We will set out the structure and the registrations that apply, the IEC included.",
  },
};
