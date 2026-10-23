import type { Article } from "../types";
import { GROUP_AUTHOR } from "../authors";

/**
 * After incorporation: a compliance checklist.
 *
 * Organised by when things fall due rather than by form, because that is the
 * question a founder holding a new certificate actually has. Checked on
 * 23 Oct 2026, including two recent changes: DIR-3 KYC moved to once every
 * three financial years from 31 March 2026 (G.S.R. 943(E)), and the position
 * on filing ADT-1 for the first auditor, which is stated as recommended rather
 * than mandatory because MCA's own position is that Rule 4(2) refers to
 * section 139(1).
 *
 * Penalty amounts are deliberately not stated; they have been amended several
 * times and are not needed to act correctly.
 */
export const afterIncorporationChecklist: Article = {
  slug: "after-company-incorporation-compliance-checklist",
  title: "After Incorporation: A Compliance Checklist for New Companies",
  metaTitle: "After Company Incorporation: Compliance Checklist | Raulji",
  metaDescription:
    "What a new Private Limited Company must do after incorporation: first board meeting, first auditor, share certificates, INC-20A, registers and annual filings.",
  excerpt:
    "The certificate of incorporation starts several clocks at once. This checklist sorts what is due in the first 30 days, the first 180 days, what depends on your business, and what recurs every year, for companies and LLPs.",
  category: "Company Registration",
  published: "2026-10-23",
  updated: "2026-10-23",
  readMinutes: 11,
  primaryKeyword: "compliance after company incorporation",
  secondaryKeywords: [
    "post incorporation compliance checklist",
    "first board meeting after incorporation",
    "INC-20A commencement of business",
    "first auditor appointment",
    "LLP compliance after incorporation",
  ],
  searchIntent:
    "Informational, task-led. A founder who has just received a certificate of incorporation and wants to know what to do next and by when.",
  author: GROUP_AUTHOR,
  image: "after-incorporation",
  covers: [
    "What falls due in the first 30, 60 and 180 days after incorporation, with the section that sets each deadline",
    "The records a new company has to keep from day one",
    "The annual cycle of meetings and filings with the Registrar",
    "Tax, GST, payroll and local registrations that depend on your business",
    "How the obligations of an LLP differ",
  ],
  keyTakeaway: {
    heading: "The short answer: what must a new company do after incorporation?",
    body: "Within **30 days**, hold the **first board meeting** and appoint the **first auditor**. Within **two months**, issue **share certificates** to the subscribers. Within **180 days**, once every subscriber has paid for their shares, file **Form INC-20A**, the declaration for commencement of business. From then on the annual cycle runs: board meetings, an audit every year, an AGM, and the annual accounts and return filed with the Registrar.",
    points: [
      "A company with share capital should not commence business or borrow until INC-20A is filed.",
      "Statutory audit applies from the first financial year, whatever the turnover.",
      "An LLP has a different and lighter set of obligations, starting with its LLP agreement in Form 3 within 30 days.",
    ],
  },
  body: [
    {
      kind: "p",
      text: "Incorporation is the point at which the company's obligations begin, not the point at which the work ends. Most of what follows has a fixed deadline counted from the date on the certificate of incorporation, and several of them fall in the first month, while founders are busy opening a bank account and starting to trade. This guide puts them in date order. For how the incorporation itself works, see [the MCA registration process](/blog/mca-company-registration-process-india/).",
    },

    { kind: "h2", id: "timeline", text: "What is due, and by when?" },
    {
      kind: "table",
      caption: "Private Limited Company: deadlines after incorporation",
      columns: ["Deadline", "Action", "Where it comes from"],
      rows: [
        ["Immediately", "Open a current account in the company's name and receive each subscriber's share money into it", "Needed for INC-20A"],
        ["Within 30 days", "Hold the first board meeting", "Companies Act, 2013, section 173(1)"],
        ["Within 30 days", "Board appoints the first auditor (or members within 90 days if the board does not)", "Section 139(6)"],
        ["Within 2 months", "Issue share certificates to the subscribers to the memorandum", "Section 56(4)(a)"],
        ["Within 180 days", "File Form INC-20A, declaring that subscribers have paid for their shares", "Section 10A"],
        ["Each year", "Board meetings, statutory audit, AGM, financial statements (AOC-4) and annual return (MGT-7 or MGT-7A)", "Sections 173, 139, 96, 137 and 92"],
      ],
      rowHeader: true,
    },

    { kind: "h2", id: "records", text: "Which documents and records should you keep from day one?" },
    {
      kind: "answer",
      text: "Keep the incorporation documents safe, set up the statutory registers and a minutes book, and keep books of account at the registered office. These are obligations from the start, not tidying up for later.",
    },
    {
      kind: "checklist",
      title: "Keep these together",
      items: [
        "Certificate of incorporation, with the CIN, PAN and TAN issued through SPICe+",
        "The memorandum and articles of association as filed",
        "Copies of the SPICe+ filing and its attachments",
        "Digital signature certificates of the directors, kept by the people they belong to",
        "Proof of the registered office and the owner's no-objection, if rented",
        "Register of members, register of directors and key managerial personnel, and other statutory registers as they apply",
        "Minutes book for board and general meetings",
        "Books of account, kept at the registered office, from the first transaction (section 128)",
      ],
    },

    { kind: "h2", id: "office", text: "What are the registered office and commencement requirements?" },
    {
      kind: "p",
      text: "A company must have a registered office capable of receiving communications (section 12). Its name and registered office address, along with its CIN, must appear on its business letters, invoices and website, and its name must be displayed outside every office where it carries on business.",
    },
    {
      kind: "p",
      text: "Section 10A requires a company with share capital to file Form INC-20A within 180 days of incorporation, declaring that every subscriber has paid the value of the shares they agreed to take. Until it is filed, the company should not commence business or exercise borrowing powers. If it is not filed and the Registrar has reason to believe the company is not carrying on business, the company's name can be removed from the register. Filing it early, as soon as the share money is in the bank, removes the risk.",
    },

    { kind: "h2", id: "board", text: "What happens at the first board meeting, and who appoints the auditor?" },
    {
      kind: "p",
      text: "The first board meeting must be held within 30 days of incorporation. A typical agenda takes note of the certificate and the memorandum and articles, records directors' disclosures of interest, confirms the registered office, approves opening the bank account and the signatories, appoints the first auditor, and approves issuing share certificates.",
    },
    {
      kind: "p",
      text: "Under section 139(6), the board appoints the first auditor within 30 days. If the board does not, it must tell the members, who appoint the auditor within 90 days at an extraordinary general meeting. The first auditor holds office until the end of the first annual general meeting.",
    },
    {
      kind: "note",
      title: "Filing ADT-1 for the first auditor",
      text: "Whether Form ADT-1 must be filed for the first auditor has been debated. The Ministry of Corporate Affairs has indicated that the rule requiring ADT-1 refers to appointments under section 139(1), not to the first auditor under section 139(6), while recommending that companies file it anyway. Filing it avoids difficulties later, including when the first financial statements are filed.",
    },

    { kind: "h2", id: "shares", text: "What needs to happen with the share capital?" },
    {
      kind: "p",
      text: "Each subscriber pays the amount for the shares they subscribed to in the memorandum, into the company's own bank account. The company issues share certificates within two months of incorporation and enters the members in the register of members. Stamp duty on the issue of shares may also be payable under state law. Keep the bank statement showing the receipts, because INC-20A relies on it.",
    },

    { kind: "h2", id: "annual", text: "What does the annual compliance cycle look like?" },
    {
      kind: "list",
      items: [
        "**Board meetings.** At least four a year, with no more than 120 days between two meetings. A small company or a one person company needs at least one meeting in each half of the calendar year, at least 90 days apart (section 173).",
        "**Statutory audit.** Every financial year from the first, regardless of turnover.",
        "**Annual general meeting.** The first AGM within nine months of the end of the first financial year, and later AGMs within six months of each year end (section 96).",
        "**Financial statements.** Form AOC-4 within 30 days of the AGM (section 137).",
        "**Annual return.** Form MGT-7, or MGT-7A for a small company or one person company, within 60 days of the AGM (section 92).",
        "**Director KYC.** Each director files Form DIR-3 KYC once every three financial years, by 30 June, under the rules in force from 31 March 2026, and updates changed contact details within 30 days.",
        "**Other returns where they apply**, such as the return of deposits (DPT-3) and the half-yearly return of amounts owed to micro and small enterprise suppliers (MSME-1).",
      ],
    },
    {
      kind: "p",
      text: "A company incorporated between 1 January and 31 March may end its first financial year on 31 March of the following year, under section 2(41), which makes the first year longer than twelve months. Confirm the first year end with your accountant before the first deadlines are calculated.",
    },
    {
      kind: "links",
      title: "If you want the annual cycle handled",
      items: [
        {
          href: "/services/pvt-compliance/",
          label: "Private Limited compliance",
          blurb: "Board records, auditor appointment and the annual filings.",
        },
        {
          href: "/services/llp-compliance/",
          label: "LLP compliance",
          blurb: "Form 11, Form 8 and changes to the LLP agreement.",
        },
      ],
    },

    { kind: "h2", id: "conditional", text: "Which tax, payroll and local registrations depend on your business?" },
    {
      kind: "p",
      text: "These are not automatic. Whether each applies depends on what the business does, where, and whom it employs.",
    },
    {
      kind: "list",
      items: [
        "**Income tax and TDS.** PAN and TAN come with incorporation. A return is filed every year, including a year with no income. TDS obligations begin once the company pays salaries, rent or professional fees above the limits in the income-tax law.",
        "**GST**, if turnover crosses the threshold or the business makes supplies that require registration from the first sale. See [GST registration in Gujarat](/blog/gst-registration-gujarat-guide/).",
        "**EPF and ESI**, once the number of employees reaches the thresholds that apply, traditionally 20 for provident fund and 10 for ESI in covered areas. Both now operate under the Code on Social Security, 2020; confirm the current thresholds before relying on them.",
        "**Professional tax**, where the state levies it. Gujarat does.",
        "**Shops and establishments**, for each office or shop the company opens. In Gujarat, within 60 days of starting business there; see [the Gujarat guide](/blog/gujarat-shops-establishments-registration/).",
        "**Udyam**, optional, if the company qualifies as an MSME and wants access to MSME benefits; see [Udyam registration](/blog/udyam-registration-msme-india/).",
        "**Activity licences**, such as FSSAI for food or an Import Export Code for foreign trade.",
      ],
    },

    { kind: "h2", id: "llp", text: "How are an LLP's obligations different?" },
    {
      kind: "table",
      caption: "LLP obligations after incorporation",
      columns: ["When", "What"],
      rows: [
        ["Within 30 days of incorporation", "File the LLP agreement in Form 3"],
        ["By 30 May each year", "Annual return in Form 11"],
        ["By 30 October each year", "Statement of account and solvency in Form 8"],
        ["Each year, if applicable", "Audit, where turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh"],
        ["Once every three financial years", "DIR-3 KYC for each designated partner holding a DIN"],
      ],
      rowHeader: true,
    },
    {
      kind: "p",
      text: "An LLP has no board meetings, no AGM and no share certificates, which is a large part of why its compliance is lighter. The tax, payroll and local registrations above apply to it in the same way as to a company. For the choice between the two, see [Private Limited Company vs LLP](/blog/private-limited-company-vs-llp/).",
    },

    { kind: "h2", id: "mistakes", text: "Which post-incorporation mistakes are most common?" },
    {
      kind: "list",
      items: [
        "**Leaving INC-20A** until the 180 days are nearly up, often because share money was never actually deposited.",
        "**Missing the first board meeting and auditor appointment** in the first 30 days.",
        "**Running company money through a director's personal account** before the current account is open.",
        "**Assuming no turnover means no filings.** Audit, the AGM and the annual filings apply to a company that has not traded.",
        "**Not keeping registers and minutes** from the start, and reconstructing them later.",
        "**Forgetting the state layer**: shops and establishments and professional tax for the office.",
        "**Letting a director's DIN be deactivated** by missing a KYC filing, which then blocks the company's filings.",
      ],
    },

    { kind: "h2", id: "checklist", text: "The checklist" },
    {
      kind: "checklist",
      title: "Immediate (first 30 days)",
      items: [
        "Open the company's current account and receive subscribers' share money",
        "Hold the first board meeting and record the minutes",
        "Appoint the first auditor, and file ADT-1",
        "Set up statutory registers, minutes book and books of account",
        "Display the company name at the registered office, and add the name, CIN and address to letterheads, invoices and the website",
      ],
    },
    {
      kind: "checklist",
      title: "Within two to six months",
      items: [
        "Issue share certificates within two months",
        "File INC-20A within 180 days, as soon as share money is received",
      ],
    },
    {
      kind: "checklist",
      title: "Conditional, as the business requires",
      items: [
        "GST registration",
        "Shops and establishments registration or intimation for each premises",
        "Professional tax",
        "EPF and ESI once employee numbers reach the thresholds",
        "TDS compliance once payments start",
        "Udyam and activity licences",
      ],
    },
    {
      kind: "checklist",
      title: "Recurring",
      items: [
        "Board meetings at the required frequency",
        "Statutory audit, AGM, AOC-4 and MGT-7 or MGT-7A",
        "Income-tax return every year",
        "DIR-3 KYC for each director once every three financial years, and updates within 30 days of any change",
        "DPT-3 and MSME-1 where they apply",
      ],
    },
  ],
  faqs: [
    {
      q: "When must the first board meeting be held after incorporation?",
      a: "Within 30 days of the date of incorporation, under section 173(1) of the Companies Act, 2013.",
    },
    {
      q: "What is Form INC-20A, and when is it due?",
      a: "It is the declaration for commencement of business required by section 10A, confirming that every subscriber has paid for the shares they agreed to take. A company with share capital files it within 180 days of incorporation, and should not commence business or borrow before filing it.",
    },
    {
      q: "Who appoints the first auditor of a company?",
      a: "The board, within 30 days of incorporation, under section 139(6). If the board does not, the members appoint the auditor within 90 days at an extraordinary general meeting. The first auditor holds office until the end of the first AGM.",
    },
    {
      q: "Is an audit needed if the company has no turnover?",
      a: "Yes. A company's financial statements are audited every financial year from the first, whatever its turnover. The annual filings with the Registrar also apply in a year with no business.",
    },
    {
      q: "When is the first AGM?",
      a: "Within nine months from the end of the company's first financial year, under section 96. Later AGMs are held within six months of the end of each financial year.",
    },
    {
      q: "Is DIR-3 KYC still annual?",
      a: "No. Under amendments in force from 31 March 2026, each director holding a DIN files DIR-3 KYC once every three financial years, by 30 June. Changes to the mobile number, email or address must still be updated within 30 days.",
    },
    {
      q: "Does a new company need GST registration immediately?",
      a: "Only if it crosses the turnover threshold or makes supplies that require registration from the first sale, such as inter-state supplies of goods. Many new companies register voluntarily because their business customers expect it.",
    },
    {
      q: "What does an LLP need to do after incorporation?",
      a: "File the LLP agreement in Form 3 within 30 days. Each year it files Form 11 by 30 May and Form 8 by 30 October, and has an audit if turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh. It has no board meetings or AGM.",
    },
  ],
  related: [
    "mca-company-registration-process-india",
    "private-limited-company-vs-llp",
    "documents-required-company-registration-india",
    "common-business-registration-mistakes-india",
  ],
  services: [
    {
      href: "/services/pvt-compliance/",
      label: "Private Limited compliance",
      blurb: "Board records, auditor appointment and the annual filings with the Registrar.",
    },
    {
      href: "/services/llp-compliance/",
      label: "LLP compliance",
      blurb: "Form 11, Form 8 and changes to the LLP agreement.",
    },
    {
      href: "/services/pvt-registration/",
      label: "Private Limited Company registration",
      blurb: "Incorporation, with guidance on INC-20A and the first auditor included.",
    },
    {
      href: "/services/business-registration/",
      label: "Business Registration",
      blurb: "All four business structures, and how to choose between them.",
    },
  ],
  sources: [
    {
      label: "Ministry of Corporate Affairs: Companies Act, 2013 and rules",
      url: "https://www.mca.gov.in/",
      supports:
        "Sections 2(41), 10A, 12, 56(4), 92, 96, 128, 137, 139(6) and 173; Forms INC-20A, AOC-4, MGT-7 and MGT-7A.",
    },
    {
      label: "MCA FAQs on SPICe+ and linked filings",
      url: "https://www.mca.gov.in/content/dam/mca/pdf/SPICEplus-and-linked-filings-FAQs-V3-20230122.pdf",
      supports: "PAN, TAN and other registrations issued through SPICe+ at incorporation.",
    },
    {
      label: "Companies (Appointment and Qualification of Directors) Amendment Rules, 2025, G.S.R. 943(E)",
      url: "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/rules.html",
      supports: "DIR-3 KYC once every three financial years from 31 March 2026, due by 30 June.",
    },
    {
      label: "Limited Liability Partnership Act, 2008 and LLP Rules, 2009",
      url: "https://www.mca.gov.in/",
      supports: "Form 3 within 30 days, Form 11 by 30 May, Form 8 by 30 October, and the LLP audit thresholds.",
    },
  ],
  disclaimer:
    "This article reflects the Companies Act, 2013, the LLP Act, 2008 and the rules as checked on 23 October 2026. Deadlines and forms are amended from time to time, and some obligations depend on the company's size and activity. Confirm your company's position with a company secretary or chartered accountant.",
  cta: {
    title: "Just incorporated, or about to?",
    body: "Tell us when the company was incorporated and what it does. We will set out what is due and when, and can handle the annual cycle for you.",
  },
};
