import type { Article } from "../types";
import { GROUP_AUTHOR } from "../authors";

export const structureGuide: Article = {
  slug: "business-structure-guide-new-entrepreneurs-india",
  title:
    "Private Limited Company, LLP, Partnership or Proprietorship: A Practical Guide for New Entrepreneurs",
  metaTitle: "Business Structure Guide for New Entrepreneurs in India | Raulji Group",
  metaDescription:
    "India's four business structures compared on ownership, liability, management, compliance and funding, with the points to verify before you register.",
  excerpt:
    "A reference rather than an argument. Each of the four structures profiled on the same terms, one master comparison table, and the questions worth answering before you commit to any of them.",
  category: "Business Consulting",
  seriesMonth: "August",
  published: "2026-09-22",
  updated: "2026-09-22",
  readMinutes: 13,
  primaryKeyword: "business structure guide India",
  secondaryKeywords: [
    "types of companies in India",
    "Private Limited vs LLP vs Partnership vs Proprietorship",
    "business structure comparison table",
    "which entity type to register India",
    "new entrepreneur business registration",
  ],
  searchIntent:
    "Informational and comparative. The reader wants one place that covers all four properly rather than four separate pages.",
  author: GROUP_AUTHOR,
  image: "structure-guide",
  covers: [
    "Each of the four structures profiled on the same six points",
    "One master comparison table covering ownership, liability, management, compliance and funding",
    "The points worth verifying for your own case rather than taking from any article",
    "Six common situations and the structures that tend to fit them",
  ],
  keyTakeaway: {
    heading: "How to use this guide",
    body: "This is a reference. It does not rank the four structures, because they are not ranked in practice: each one fits a set of circumstances and fits others badly. Read the profile for the two or three that look relevant, then work through the verification list at the end against your own facts.",
    points: [
      "**Proprietorship**: one owner, no separate entity, unlimited liability, minimal administration.",
      "**Partnership Firm**: two or more owners under a deed, no separate entity, unlimited and joint and several liability, optional state registration with real consequences.",
      "**LLP**: two or more partners, separate entity, limited liability, moderate annual compliance, cannot issue shares.",
      "**Private Limited Company**: shareholders and directors, separate entity, limited liability, the heaviest annual compliance, and the only one that can issue equity.",
    ],
  },
  body: [
    {
      kind: "p",
      text: "Most writing about business structures is trying to sell you one of them. This guide is a reference instead: something to check a specific question against, with the trade-offs stated on both sides.",
    },
    {
      kind: "p",
      text: "If you want a decision framework rather than a reference, read the guide to [choosing a business structure](/blog/how-to-choose-business-structure-india-2026/). If you have already narrowed to two, the comparisons of [a company against an LLP](/blog/private-limited-company-vs-llp/) and [a partnership firm against a proprietorship](/blog/partnership-vs-proprietorship-india/) go deeper on those pairings.",
    },

    { kind: "h2", id: "master-table", text: "The four structures in one table" },
    {
      kind: "table",
      caption:
        "The four common business structures in India, compared on ownership, liability, management, compliance, funding and suitability.",
      rowHeader: true,
      columns: ["", "Proprietorship", "Partnership Firm", "LLP", "Private Limited Company"],
      rows: [
        [
          "Typical ownership",
          "One individual owner",
          "Two or more partners under a deed",
          "Two or more partners, at least two of them designated partners",
          "Two or more shareholders, minimum two directors",
        ],
        [
          "Separate legal entity",
          "No. The owner and the business are the same in law.",
          "No. The firm has a name, but liabilities fall on the partners.",
          "Yes. The LLP owns, contracts and is sued in its own name.",
          "Yes. The company owns, contracts and is sued in its own name.",
        ],
        [
          "Liability characteristics",
          "Unlimited. Personal assets are exposed to business obligations.",
          "Unlimited, and joint and several. Any partner may be pursued for the whole amount.",
          "Limited to each partner's agreed contribution, subject to exceptions in law.",
          "Limited to any amount unpaid on shares held, subject to exceptions in law.",
        ],
        [
          "Management",
          "The owner decides alone.",
          "The partners, as set out in the deed. Each partner is an agent of the firm.",
          "The partners, as set out in the LLP agreement. Designated partners carry statutory responsibility.",
          "The board of directors, separately from the shareholders who own the company.",
        ],
        [
          "Compliance considerations",
          "No MCA filing. Income tax as part of the owner's return, plus activity registrations.",
          "No MCA filing. The firm is assessed separately for income tax.",
          "Form 11 by 30 May and Form 8 by 30 October. Audit only above the thresholds in the LLP Act.",
          "Statutory audit every financial year from the first, plus annual ROC filings, board meetings and statutory registers.",
        ],
        [
          "Funding considerations",
          "Own funds and debt. No mechanism for an outside owner.",
          "Partner capital and debt. A new investor becomes a partner with unlimited liability.",
          "Partner contribution and debt. Cannot issue equity shares.",
          "Equity shares, convertible instruments and ESOPs, alongside debt.",
        ],
        [
          "Continuity",
          "Ends with the owner.",
          "Depends on what the deed provides for.",
          "Continues regardless of changes in partners.",
          "Continues regardless of changes in shareholders.",
        ],
        [
          "Suitable business situations",
          "A single owner testing an idea, a small local trade or service, low credit exposure.",
          "Two or more people, often family, running an established business on agreed terms and accepting personal liability.",
          "Professional firms and partner-run businesses wanting a liability line and continuity without a company's compliance.",
          "Businesses raising equity, offering employee options, or dealing with buyers and lenders who expect a company.",
        ],
        [
          "Important points to verify",
          "Which activity registrations apply: GST, Udyam, state shops and establishment, trade licences.",
          "Stamp duty on the deed in your state, and whether to register with the Registrar of Firms.",
          "Stamp duty on the LLP agreement, and the Form 3 deadline of 30 days from incorporation.",
          "Government fees against your stated capital, first auditor appointment, and the annual audit cost.",
        ],
      ],
    },
    {
      kind: "note",
      title: "One general point before the profiles",
      text: "Limited liability is a line, not a wall. In all cases it is subject to exceptions in law, and in practice the most common breach of it is voluntary: a personal guarantee given to a bank. Most small business lending in India is secured that way, and a guarantee sits entirely outside whatever protection the structure gives you.",
    },

    { kind: "h2", id: "proprietorship", text: "Proprietorship" },
    {
      kind: "answer",
      text: "A business owned and run by one individual, with no legal separation between the owner and the business. There is no incorporation filing, because there is nothing separate to incorporate.",
    },
    {
      kind: "p",
      text: "The owner is the business in law. Income is assessed as part of their personal income under their own PAN, contracts are in their name or trading name, and liabilities are theirs without limit. What a proprietor registers depends on the activity: GST, Udyam, a state shops and establishment registration, and any licence specific to the trade.",
    },
    { kind: "h3", text: "What it does well" },
    {
      kind: "list",
      items: [
        "Fastest and cheapest to start, with no incorporation filing at all",
        "Complete control and immediate decision making",
        "No MCA filings, no statutory audit obligation arising from any registration law",
        "Straightforward to wind down if the idea does not work",
      ],
    },
    { kind: "h3", text: "Where it does not fit" },
    {
      kind: "list",
      items: [
        "Any activity where a single claim could exceed what the owner can personally absorb",
        "Businesses expecting a second owner, since adding one means changing structure",
        "Businesses that need to continue independently of the owner, because a proprietorship does not survive them",
        "Anyone planning to raise equity, and note that a proprietorship is not eligible for DPIIT startup recognition",
      ],
    },

    { kind: "h2", id: "partnership", text: "Partnership Firm" },
    {
      kind: "answer",
      text: "Two or more people who have agreed to share the profits of a business carried on by all or any of them acting for all, under the Indian Partnership Act, 1932. The firm is not a separate legal entity, and the partners are liable without limit.",
    },
    {
      kind: "p",
      text: "The phrase that matters is acting for all. Each partner is an agent of the firm and of the other partners in the ordinary course of business, so what one commits the firm to binds the rest. Liability is joint and several: a creditor can recover the whole amount from any single partner, regardless of profit shares.",
    },
    {
      kind: "p",
      text: "Registration with the state Registrar of Firms is optional, but Section 69 of the Act bars an unregistered firm from suing a third party to enforce a contractual right, and bars a partner from suing the firm or co-partners on the partnership contract. For any firm that sells on credit, that is a practical rather than a theoretical restriction.",
    },
    { kind: "h3", text: "What it does well" },
    {
      kind: "list",
      items: [
        "A formal written arrangement between owners without MCA registration or annual filings",
        "Flexible: profit shares, roles and decision rights are whatever the partners agree in the deed",
        "The firm is assessed separately for income tax and holds its own PAN",
        "Eligible for DPIIT startup recognition where the firm is registered",
      ],
    },
    { kind: "h3", text: "Where it does not fit" },
    {
      kind: "list",
      items: [
        "Owners who are not comfortable being liable for each other's business commitments",
        "Businesses that need continuity, since a partner's exit or death can dissolve the firm where the deed is silent",
        "Any plan involving outside equity investment",
        "Situations where the partners will not invest the time to have a proper deed drafted, because the statutory defaults are rarely what anyone would have chosen",
      ],
    },

    { kind: "h2", id: "llp", text: "Limited Liability Partnership" },
    {
      kind: "answer",
      text: "A body corporate under the LLP Act, 2008, with its own legal identity and perpetual succession. Partners have limited liability, and the LLP is run by the partners themselves under an LLP agreement rather than by a separate board.",
    },
    {
      kind: "p",
      text: "An LLP needs at least two designated partners, one resident in India. It is incorporated through the MCA portal, and its LLP agreement must be filed in Form 3 within 30 days. That deadline is short with no routine extension, so the agreement is drafted before incorporation rather than after.",
    },
    {
      kind: "p",
      text: "Its annual compliance is the middle ground of the four: Form 11 by 30 May and Form 8 by 30 October, with late fees per day and no upper limit. An audit is required only above Rs 40 lakh turnover or Rs 25 lakh contribution, which is the single largest difference in running cost between an LLP and a company.",
    },
    { kind: "h3", text: "What it does well" },
    {
      kind: "list",
      items: [
        "Limited liability and a separate legal entity, without a company's audit and board obligations",
        "Continues regardless of changes in partners, which a partnership firm does not reliably do",
        "Suits businesses where the owners are the practitioners, which is why professional firms use it",
        "No upper limit on the number of partners",
        "Eligible for DPIIT startup recognition",
      ],
    },
    { kind: "h3", text: "Where it does not fit" },
    {
      kind: "list",
      items: [
        "Businesses planning an equity raise, because an LLP cannot issue shares and standard investment documentation assumes share capital",
        "Businesses wanting to offer employees options in the form a company can",
        "Owners who want ownership and management separated, since the LLP structure joins them",
        "Anyone who will not keep up two annual filings, given the uncapped daily late fee",
      ],
    },

    { kind: "h2", id: "company", text: "Private Limited Company" },
    {
      kind: "answer",
      text: "A company incorporated under the Companies Act, 2013. It is a separate legal entity owned by shareholders and managed by a board of directors, with shareholder liability limited to any amount unpaid on the shares they hold.",
    },
    {
      kind: "p",
      text: "It needs at least two shareholders and two directors, with at least one director resident in India, and the same two people can hold both roles. There is no minimum paid-up capital prescribed, though you state an authorised and subscribed capital and government fees are linked to it. A private company can have up to 200 shareholders, excluding certain employee shareholders.",
    },
    {
      kind: "p",
      text: "Its distinguishing feature is share capital: shares can be issued, transferred and used to build option pools, which is what makes it workable for outside investment. Its distinguishing cost is compliance: a statutory audit every financial year from the first regardless of turnover, plus annual filings and the meeting and record obligations of being a company.",
    },
    { kind: "h3", text: "What it does well" },
    {
      kind: "list",
      items: [
        "The only one of the four that can issue equity shares, which makes it the practical structure for investment",
        "Ownership moves through share transfer without disturbing contracts, licences or bank accounts",
        "Continues independently of any founder, which makes the business sellable as a business",
        "Incorporation details and directors are on the public register, which some buyers and lenders expect to be able to check",
      ],
    },
    { kind: "h3", text: "Where it does not fit" },
    {
      kind: "list",
      items: [
        "A single owner with no plan for a second, where a One Person Company or a simpler structure may serve better",
        "Businesses that cannot comfortably carry an annual audit and filings from year one",
        "Anyone registering a company for the way it sounds rather than for what it does",
      ],
    },

    { kind: "h2", id: "scenarios", text: "Six situations and the structures that tend to fit them" },
    {
      kind: "table",
      caption: "Common situations, with the structures usually worth considering first.",
      columns: ["Situation", "Usually worth considering", "Why"],
      rows: [
        [
          "One person starting a service business from home",
          "Proprietorship",
          "Lowest cost and administration. Worth revisiting if the work carries professional risk or a second owner appears.",
        ],
        [
          "Two professionals setting up a practice together",
          "LLP",
          "Owners are the practitioners, limited liability matters, and there is no equity raise in view.",
        ],
        [
          "A product startup planning to raise a seed round",
          "Private Limited Company",
          "The round needs share capital, and converting later costs more than starting there.",
        ],
        [
          "A family trading business restructuring across generations",
          "LLP or Private Limited Company",
          "Both give continuity and a liability line. The choice turns on whether ownership should be held as shares.",
        ],
        [
          "A joint venture between two existing businesses",
          "LLP or Private Limited Company",
          "Both are separate entities. An LLP suits a defined profit-sharing arrangement; a company suits shared ownership with transferable stakes.",
        ],
        [
          "A shop or small manufacturing unit with local customers",
          "Proprietorship or Partnership Firm",
          "Often adequate, but weigh credit exposure carefully, since both leave the owners personally liable.",
        ],
      ],
    },
    {
      kind: "p",
      text: "Treat that as a starting point rather than an answer. Every row has counter-examples, and they usually turn on something specific to the business: most often the size of its credit exposure, or a plan the founders have not mentioned yet.",
    },

    { kind: "h2", id: "verify", text: "What to verify for your own case" },
    {
      kind: "p",
      text: "General guidance can tell you which structures to look at. It cannot tell you what any of them will cost or require for you specifically, because that depends on figures an article does not have.",
    },
    {
      kind: "checklist",
      title: "Verify before you register",
      items: [
        "The government fees and stamp duty that will apply to your capital or contribution figure, in your state",
        "The full first-year cost including audit, filings and professional fees, for each structure you are considering",
        "Whether your customers, lenders or tender processes require a particular structure",
        "Whether the activity needs a licence, and whether that licence is available to the structure you are choosing",
        "The tax position against your own projected numbers, not against a general rate comparison",
        "What conversion would cost if you outgrow the structure in two or three years",
      ],
    },
    {
      kind: "note",
      title: "On tax, specifically",
      text: "The Income-tax Act, 2025 came into force on 1 April 2026, replacing the Income-tax Act, 1961. It is a rewrite of the law rather than a rate change, and it introduces the tax year in place of the previous year and assessment year terminology. Where tax is genuinely driving your structure decision, have the numbers run against your projections rather than relying on general comparisons, including the ones in this guide.",
    },

    { kind: "h2", id: "changing", text: "If you choose wrong" },
    {
      kind: "p",
      text: "You can change. Conversion is provided for and happens regularly, most often from a proprietorship or partnership firm into an LLP or a company. It means moving the business across: fresh registrations, new bank accounts, GST changes, and a case by case look at contracts, licences and the tax treatment of assets transferred.",
    },
    {
      kind: "p",
      text: "That is manageable but not free, which argues for two things. Do not pick a structure you are confident you will outgrow within a year. And do not over-engineer for a future you are not yet sure of, because carrying a company's compliance for three years on the strength of a funding round that never arrives is its own kind of expensive.",
    },
  ],
  faqs: [
    {
      q: "Which business structure should a new entrepreneur choose in India?",
      a: "It depends on four things: how much personal liability the activity carries, how many owners there are and whether that will change, how much annual compliance the business can carry, and whether equity investment is planned. A proprietorship suits a single owner starting small, a partnership firm suits co-owners accepting personal liability, an LLP suits partner-run businesses wanting limited liability with moderate compliance, and a Private Limited Company suits businesses raising equity.",
    },
    {
      q: "What is the difference between an LLP and a Private Limited Company?",
      a: "Both are separate legal entities with limited liability. A company separates ownership from management, can issue equity shares, and must be audited every financial year from its first. An LLP is run by its partners under an LLP agreement, cannot issue shares, and needs an audit only where turnover exceeds Rs 40 lakh or contribution exceeds Rs 25 lakh.",
    },
    {
      q: "Which business structures are eligible for Startup India recognition?",
      a: "Recognition by the Department for Promotion of Industry and Internal Trade is available to a Private Limited Company, an LLP and a registered partnership firm. A sole proprietorship is not eligible. Other conditions apply, including limits on the entity's age and turnover.",
    },
    {
      q: "Is a statutory audit required for all four structures?",
      a: "No. A Private Limited Company is audited every financial year from its first, regardless of turnover. An LLP is audited only above the thresholds in the LLP Act, currently Rs 40 lakh turnover or Rs 25 lakh contribution. Partnership firms and proprietorships have no audit requirement arising from a registration law, though a tax audit can apply separately based on turnover.",
    },
    {
      q: "How many people are needed for each structure?",
      a: "A proprietorship has one owner. A partnership firm needs at least two partners. An LLP needs at least two designated partners, one resident in India. A Private Limited Company needs at least two shareholders and two directors, with at least one director resident in India, and the same two people can hold both roles.",
    },
    {
      q: "Can a business change its structure later?",
      a: "Yes. Conversion is provided for and is common, particularly from a proprietorship or partnership firm into an LLP or company. It means fresh registrations, new bank accounts, and a case by case review of contracts, licences and the tax treatment of assets transferred, so it is planned rather than done quickly.",
    },
    {
      q: "Does limited liability mean my personal assets are fully protected?",
      a: "No. Limited liability is subject to exceptions in law, and in practice the most common gap is voluntary: personal guarantees given to a bank or a landlord sit outside the protection entirely. Statutory dues and fraud also attract personal consequences. Limited liability meaningfully reduces exposure; it does not eliminate it.",
    },
    {
      q: "Is there a minimum capital requirement to register a company in India?",
      a: "No. The Companies Act, 2013 does not prescribe a minimum paid-up capital for a private company. You still state an authorised and subscribed capital in the incorporation documents and government fees are linked to that figure, so it is a decision rather than something you can leave blank.",
    },
  ],
  related: [
    "how-to-choose-business-structure-india-2026",
    "private-limited-company-vs-llp",
    "partnership-vs-proprietorship-india",
    "mca-company-registration-process-india",
  ],
  services: [
    {
      href: "/services/business-registration/",
      label: "Business Registration",
      blurb: "The pillar page covering all four structures and how we work.",
    },
    {
      href: "/services/pvt-registration/",
      label: "Private Limited Company registration",
      blurb: "Eligibility, documents, process and published starting fee.",
    },
    {
      href: "/services/llp-registration/",
      label: "LLP registration",
      blurb: "Designated partners, the agreement, and the Form 3 deadline.",
    },
    {
      href: "/services/partnership-registration/",
      label: "Partnership Firm registration",
      blurb: "The deed, stamp duty and registration with the Registrar of Firms.",
    },
    {
      href: "/services/proprietorship-registration/",
      label: "Proprietorship registration",
      blurb: "The activity registrations a single owner actually needs.",
    },
    {
      href: "/services/business-consulting/",
      label: "Business Consulting",
      blurb: "For the plan behind the structure, not just the filing.",
    },
  ],
  sources: [
    {
      label: "Ministry of Corporate Affairs",
      url: "https://www.mca.gov.in/",
      supports:
        "Companies Act, 2013 and LLP Act, 2008 requirements, audit and annual filing obligations, and incorporation process.",
    },
    {
      label: "The Indian Partnership Act, 1932",
      url: "https://www.indiacode.nic.in/handle/123456789/2400",
      supports: "Definition of partnership, mutual agency, and the effect of non-registration.",
    },
    {
      label: "Startup India, Department for Promotion of Industry and Internal Trade",
      url: "https://www.startupindia.gov.in/",
      supports: "Entity types eligible for DPIIT startup recognition.",
    },
    {
      label: "Income-tax Act, 2025, in force from 1 April 2026",
      url: "https://www.incometaxindia.gov.in/w/income-tax-act-2025-comes-into-force-from-1st-april-2026",
      supports: "Replacement of the Income-tax Act, 1961 and the introduction of the tax year.",
    },
  ],
  disclaimer:
    "This article is for general informational purposes only. Requirements, thresholds, procedures and fees change and vary by state and by case. Verify current requirements with the relevant authority or a qualified professional before making a decision.",
  cta: {
    title: "Work through it with someone who files these every week",
    body: "Bring your numbers and your plan. We will tell you what each structure would cost you in the first year and what it would require of you after that, before anything is filed.",
  },
};
