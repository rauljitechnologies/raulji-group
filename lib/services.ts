/**
 * Phase 1 registration services.
 *
 * Content rules applied here:
 *  - Pricing appears only where it is already published on raulji.com (Pvt Ltd, LLP).
 *    Partnership and Proprietorship carry a quote CTA instead of an invented figure.
 *  - No client counts, ratings, or "No. 1 / most trusted" claims.
 *  - Statutory detail reflects the Companies Act 2013, the LLP Act 2008 and the
 *    Indian Partnership Act 1932. Timelines are framed as estimates, never promises.
 */

/**
 * The two published professional fees, in one place.
 *
 * They were typed out separately in each service's meta description, cost
 * table, package price and FAQ answer, and again in the general FAQs, so a fee
 * change meant finding every copy. These are Raulji Group's own fee only:
 * government filing fees, stamp duty and any tax are separate and are stated
 * as such wherever these appear.
 */
export const PROFESSIONAL_FEE = {
  pvt: "₹9,999",
  llp: "₹7,999",
} as const;

export interface FAQ {
  q: string;
  a: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface Pricing {
  amount: string;
  note: string;
  includes: string[];
}

/**
 * One line of what a registration costs, and who sets it (service-page brief,
 * section 28). Keeps the professional fee visibly apart from government and
 * state charges, so no figure on the page can be read as all-inclusive.
 */
export interface CostLine {
  item: string;
  setBy: string;
  detail: string;
}

export interface RegistrationService {
  slug: string;
  path: string;
  /** Full service name, e.g. "Private Limited Company Registration". */
  name: string;
  /** Structure name used in comparisons and cards, e.g. "Private Limited". */
  shortName: string;
  h1: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  /** One-line definition. Written to be quotable by AI search (GEO). */
  definition: string;
  heroSub: string;
  cardBlurb: string;
  cardCta: string;
  suitableFor: string[];
  benefits: Step[];
  limitations: string[];
  eligibility: string[];
  documents: string[];
  process: Step[];
  whatWeHandle: string[];
  governmentProcess: string;
  pricing: Pricing | null;
  timelineEstimate: string;
  faqs: FAQ[];
  related: string[];

  /**
   * The direct answer at the top of the page (brief section 17): what the
   * structure is and what registering it involves, in two to four sentences.
   * Longer than `definition`, which stays short because the city pages and the
   * schema reuse it.
   */
  quickAnswer: string;
  /** The statute, for the at-a-glance panel. */
  law: string;
  /** Who actually registers it. Never Raulji Group. */
  authority: string;
  /** Three or four facts a reader should leave with (brief section 20). */
  takeaways: string[];
  /** What the customer has to supply or decide (brief section 5). */
  customerProvides: string[];
  /** Obligations and next steps once registered. */
  afterRegistration: Step[];
  /** Common mistakes and considerations, specific to this structure. */
  considerations: Step[];
  /** Every component of the cost, including the ones we do not set. */
  costs: CostLine[];
  /** The part of the timeline that is ours, and the part that is not (brief section 29). */
  timeline: { ours: string; authority: string };
  /** The one structure this page is compared against, and why that pairing. */
  compareWith: string;
  compareNote: string;
  /** Blog slugs to promote from this page. Unresolved slugs are dropped. */
  guides: string[];
}

export const SERVICES: RegistrationService[] = [
  {
    slug: "pvt-registration",
    path: "/services/pvt-registration/",
    name: "Private Limited Company Registration",
    shortName: "Private Limited",
    h1: "Private Limited Company Registration",
    title: "Private Limited Company Registration in India | Raulji Group",
    metaDescription:
      `Private Limited Company registration in India: who it suits, documents, the SPICe+ process, costs and what follows incorporation. Professional fee from ${PROFESSIONAL_FEE.pvt}.`,
    eyebrow: "Business Registration",
    definition:
      "A Private Limited Company is a company incorporated under the Companies Act, 2013. It is a separate legal entity from its shareholders, who are liable only up to the amount unpaid on the shares they hold.",
    heroSub:
      "Understand the process, the information required and the obligations that follow before you incorporate. We prepare the documents and handle the MCA filings.",
    quickAnswer:
      "A Private Limited Company is a company incorporated under the Companies Act, 2013. It is a separate legal entity, so the company owns its assets and owes its debts, and shareholders are liable only for any amount unpaid on their shares. Registering one means reserving a name and filing the SPICe+ incorporation form with the Registrar of Companies on the MCA portal, which issues a Certificate of Incorporation on approval.",
    law: "Companies Act, 2013",
    authority: "Registrar of Companies, Ministry of Corporate Affairs",
    takeaways: [
      "Needs at least two directors and two shareholders. The same two people can be both.",
      "The only one of the four structures that can issue equity shares to investors.",
      "Carries the heaviest annual compliance, including a statutory audit from the first year.",
      "Incorporation is filed online, so it can be done from anywhere in India.",
    ],
    customerProvides: [
      "Identity and address documents for every director and shareholder",
      "The proposed company name, with a second option",
      "A short description of what the company will do, for the object clause",
      "The proposed shareholding and authorised capital",
      "Registered office proof and the owner's no-objection certificate",
      "Time for DSC video verification and for signing the forms",
    ],
    afterRegistration: [
      {
        title: "Open a current account",
        body: "The subscribers pay for their shares into the company's own account. Banks open it against the Certificate of Incorporation, the company's PAN and a board resolution.",
      },
      {
        title: "Appoint the first auditor",
        body: "The board appoints the first auditor within 30 days of incorporation. The audit applies from the first financial year, whatever the turnover.",
      },
      {
        title: "Declare commencement of business",
        body: "Form INC-20A confirms that subscribers have paid for their shares. It is due within 180 days of incorporation, and the company should not start business or borrow before it is filed.",
      },
      {
        title: "Run the annual cycle",
        body: "Board meetings, the statutory audit and the annual ROC filings follow every year, including a year with no trading. Late ROC filings attract additional fees for each day of delay.",
      },
    ],
    considerations: [
      {
        title: "Picking a name without a trade mark check",
        body: "The Registrar compares names against companies and LLPs, but a name can still infringe a registered trade mark. A rejection costs days. A later trade mark dispute can cost the name.",
      },
      {
        title: "Setting authorised capital higher than needed",
        body: "Government fees and stamp duty rise with authorised capital. It can be increased later, when the company actually needs to issue more shares.",
      },
      {
        title: "Address proof that is too old or in another name",
        body: "Director address proof is generally expected to be recent and in the person's own name. It is one of the most common reasons for a resubmission request.",
      },
      {
        title: "Treating incorporation as the finish line",
        body: "INC-20A, the first auditor and the annual filings follow automatically. A company that never trades still has to file.",
      },
    ],
    costs: [
      {
        item: "Professional fee",
        setBy: "Raulji Group",
        detail: `${PROFESSIONAL_FEE.pvt}, one time, for the work listed in the package.`,
      },
      {
        item: "Government filing fees",
        setBy: "Ministry of Corporate Affairs",
        detail: "Depend on the authorised share capital. Paid to the MCA at filing.",
      },
      {
        item: "Stamp duty",
        setBy: "State government",
        detail: "Payable on the MOA and AOA at the rate of the state where the registered office is. Varies with capital.",
      },
      {
        item: "Taxes",
        setBy: "As applicable",
        detail: "Any tax that applies to the professional fee is shown in the written quote.",
      },
    ],
    timeline: {
      ours: "Digital signatures, name screening, drafting and filing. This starts once every document is complete, and incomplete documents are the most common cause of delay.",
      authority: "Name approval and incorporation are processed by the Registrar. A query or a name rejection adds a round trip that nobody outside the Registrar can shorten.",
    },
    compareWith: "llp-registration",
    compareNote:
      "The two limited-liability structures. The choice usually turns on one question: will the business raise equity investment?",
    guides: [
      "private-limited-company-vs-llp",
      "mca-company-registration-process-india",
      "documents-required-company-registration-india",
    ],
    cardBlurb: "For businesses seeking a scalable corporate structure.",
    cardCta: "Explore Private Limited Registration",
    suitableFor: [
      "Founders who intend to raise equity funding from angel investors or venture capital",
      "Businesses that want shareholding to be transferable without dissolving the business",
      "Teams building a business meant to continue independently of any one owner",
      "Companies that need a formal board structure for customers, lenders or tenders",
      "Startups planning to register under Startup India or issue ESOPs to employees",
    ],
    benefits: [
      {
        title: "Separate legal entity",
        body: "The company can own property, borrow, sue and be sued in its own name. Its assets and obligations are legally distinct from those of its shareholders.",
      },
      {
        title: "Limited liability",
        body: "A shareholder's liability is limited to any amount remaining unpaid on their shares. Personal assets are not exposed to the company's business debts, subject to the exceptions in law.",
      },
      {
        title: "Perpetual succession",
        body: "The company continues to exist regardless of changes in shareholding, the death of a member, or the exit of a director, until it is formally wound up or struck off.",
      },
      {
        title: "Preferred by investors",
        body: "Equity shares can be issued and transferred, which makes the structure workable for priced rounds, convertible instruments and ESOP pools. LLPs and partnership firms cannot issue equity.",
      },
      {
        title: "Credibility with counterparties",
        body: "Incorporation details, directors and charges are on the public MCA register, which many banks, large customers and tender processes expect to be able to verify.",
      },
    ],
    limitations: [
      "Higher ongoing compliance than an LLP, a partnership firm or a proprietorship",
      "Statutory audit is required from the first financial year regardless of turnover",
      "Annual ROC filings, board meetings and minutes must be maintained on record",
      "Withdrawing profits requires a formal route such as salary, dividend or board-approved fees",
    ],
    eligibility: [
      "A minimum of two directors and two shareholders. The same people can be both.",
      "At least one director must be a resident of India, meaning a stay of 182 days or more in the previous calendar year.",
      "A maximum of 200 shareholders, excluding present and former employees holding shares.",
      "There is no minimum paid-up capital requirement under the Companies Act, 2013.",
      "A registered office address in India with valid proof and, where the premises are not owned, a no-objection certificate from the owner.",
      "A proposed name that is not identical or deceptively similar to an existing company, LLP or registered trade mark.",
    ],
    documents: [
      "PAN card of every proposed director and shareholder",
      "Aadhaar card of every proposed director and shareholder",
      "Identity proof: voter ID, passport or driving licence",
      "Address proof in the applicant's own name: bank statement or utility bill, generally not older than two months",
      "Passport-size photograph of each director",
      "Passport and notarised or apostilled documents for any foreign national director",
      "Registered office address proof: latest electricity bill or property tax receipt",
      "Rent agreement, where the office premises are rented",
      "No-objection certificate from the owner of the registered office premises",
    ],
    process: [
      {
        title: "Digital Signature Certificate (DSC)",
        body: "Every proposed director and subscriber needs a Class 3 DSC, because MCA forms are signed digitally. We arrange issuance including the video and Aadhaar-based verification the certifying authority requires.",
      },
      {
        title: "Name reservation",
        body: "The proposed name is applied for through Part A of the SPICe+ form. We run availability and trade mark checks first and prepare a second preference, since the Registrar can reject a name that is too similar to an existing entity or mark.",
      },
      {
        title: "Drafting the MOA and AOA",
        body: "The Memorandum of Association sets out what the company is permitted to do, and the Articles of Association set out how it is governed internally. Both are filed electronically as eMOA (INC-33) and eAOA (INC-34).",
      },
      {
        title: "SPICe+ Part B filing",
        body: "The incorporation application covers directors, subscribers, share capital and the registered office. It is filed together with AGILE-PRO-S, which handles the linked PAN, TAN, EPFO, ESIC and bank account applications.",
      },
      {
        title: "Certificate of Incorporation",
        body: "On approval the Registrar issues the Certificate of Incorporation carrying the CIN, along with the company's PAN and TAN. The company legally exists from the date on that certificate.",
      },
      {
        title: "Post-incorporation steps",
        body: "A current account is opened, the subscription money is brought in, Form INC-20A is filed to declare commencement of business within 180 days, and the first auditor is appointed within 30 days via Form ADT-1.",
      },
    ],
    whatWeHandle: [
      "DSC issuance for directors and subscribers",
      "Name availability and trade mark screening before filing",
      "SPICe+ Part A name reservation",
      "Drafting the MOA and AOA for your business objects",
      "SPICe+ Part B incorporation filing with AGILE-PRO-S",
      "PAN and TAN application through the incorporation form",
      "Responding to Registrar queries or resubmission requests",
      "Guidance on bank account opening, INC-20A and first auditor appointment",
    ],
    governmentProcess:
      "Incorporation is processed by the Registrar of Companies under the Ministry of Corporate Affairs through the MCA portal. Applications are filed on the SPICe+ form and are examined by the Registrar, who may approve, raise a query or ask for resubmission. Government filing fees and stamp duty are charged separately by the MCA and vary with the state of the registered office and the authorised share capital.",
    pricing: {
      amount: PROFESSIONAL_FEE.pvt,
      note: "One-time professional fee. Government filing fees and stamp duty are charged separately and vary by state and authorised capital.",
      includes: [
        "Digital Signature Certificate for 2 directors",
        "Director Identification Number for 2 directors",
        "Company name approval through SPICe+",
        "MOA and AOA drafting",
        "Certificate of Incorporation",
        "PAN and TAN, issued with incorporation",
        "EPFO and ESIC registration through SPICe+",
        "A dedicated point of contact through the process",
      ],
    },
    timelineEstimate: "Commonly 7 to 12 working days from receipt of complete documents",
    faqs: [
      {
        q: "What is a Private Limited Company?",
        a: "A Private Limited Company is a company incorporated under the Companies Act, 2013, that restricts the transfer of its shares and limits its membership to 200 shareholders. It is a separate legal entity, so the company rather than its owners holds its assets and owes its debts, and shareholders are liable only to the extent of any unpaid amount on their shares.",
      },
      {
        q: "Who can register a Private Limited Company?",
        a: "Any two or more people who are competent to contract can incorporate one, and companies and LLPs can also be shareholders. At least two directors are required, and at least one of them must be a resident of India, meaning a stay of 182 days or more in the previous calendar year. A director must be an individual holding a valid DIN.",
      },
      {
        q: "How many directors and shareholders are required?",
        a: "A minimum of two directors and two shareholders. The same two people can hold both roles, so two founders are enough to incorporate. The maximum is 15 directors, which can be increased by a special resolution, and 200 shareholders.",
      },
      {
        q: "What is the minimum capital required?",
        a: "There is no minimum paid-up capital requirement. The earlier ₹1 lakh threshold was removed by the Companies (Amendment) Act, 2015. You choose an authorised capital figure at incorporation, which affects the government fees and stamp duty payable rather than any money you must deposit.",
      },
      {
        q: "What documents are required?",
        a: "PAN, Aadhaar, identity proof, recent address proof in the applicant's own name and a photograph for each director and shareholder, plus proof of the registered office address, a rent agreement if the premises are rented and a no-objection certificate from the owner. Foreign nationals need a passport with documents notarised or apostilled as applicable.",
      },
      {
        q: "How long does registration take?",
        a: "Where documents are complete and the proposed name is approved on the first attempt, incorporation commonly completes in about 7 to 12 working days. Name rejections, resubmission requests from the Registrar and MCA processing volumes can extend this, so the figure is an estimate rather than a commitment.",
      },
      {
        q: "How much does registration cost?",
        a: `Our professional fee for Private Limited Company registration is ${PROFESSIONAL_FEE.pvt}. Government filing fees and stamp duty are payable in addition and depend on the state of the registered office and the authorised share capital. We confirm the full expected figure in writing before any filing begins.`,
      },
      {
        q: "Can a foreign national be a director?",
        a: "Yes. A foreign national or NRI can be a director and can hold shares, provided at least one director on the board is a resident of India. Foreign directors need a valid passport and identity and address documents that are notarised or apostilled in line with the requirements of their country of residence. Foreign shareholding also attracts FEMA reporting obligations.",
      },
      {
        q: "Can a startup register as a Private Limited Company?",
        a: "Yes, and it is the structure most startups use, because it is the only one of the four that can issue equity shares, create an ESOP pool and take investment on a priced or convertible basis. A Private Limited Company can also apply for recognition under the Startup India scheme once incorporated, subject to that scheme's own eligibility conditions.",
      },
      {
        q: "What happens after incorporation?",
        a: "The company opens a current account and the subscribers pay in their subscription money. The first auditor must be appointed within 30 days through Form ADT-1, and Form INC-20A declaring commencement of business must be filed within 180 days. From there the company files its annual ROC returns and financial statements and has its accounts audited each year.",
      },
    ],
    related: ["llp-registration", "partnership-registration", "proprietorship-registration"],
  },
  {
    slug: "llp-registration",
    path: "/services/llp-registration/",
    name: "LLP Registration",
    shortName: "LLP",
    h1: "LLP Registration",
    title: "LLP Registration in India | Raulji Group",
    metaDescription:
      `LLP registration in India: who it suits, documents, the FiLLiP process, the LLP Agreement, costs and annual filings. Professional fee from ${PROFESSIONAL_FEE.llp}.`,
    eyebrow: "Business Registration",
    definition:
      "A Limited Liability Partnership is a body corporate registered under the Limited Liability Partnership Act, 2008. It combines the internal flexibility of a partnership with limited liability for its partners.",
    heroSub:
      "Understand how an LLP is formed, what the partners need to agree and provide, and what the annual filings involve. We prepare the documents and handle the MCA filings.",
    quickAnswer:
      "A Limited Liability Partnership (LLP) is a body corporate registered under the Limited Liability Partnership Act, 2008. It has a legal identity of its own, and each partner's liability is limited to the contribution they agreed to bring in. Registering one means reserving a name, filing the FiLLiP incorporation form with the Registrar of Companies, and then filing the LLP Agreement within 30 days of incorporation.",
    law: "Limited Liability Partnership Act, 2008",
    authority: "Registrar of Companies, Ministry of Corporate Affairs",
    takeaways: [
      "Needs at least two designated partners, both individuals, one of them resident in India.",
      "A partner is not personally liable for another partner's wrongful acts.",
      "Cannot issue equity shares, so it does not suit a business planning to raise venture capital.",
      "Form 8 and Form 11 are due every year, even in a year with no business activity.",
    ],
    customerProvides: [
      "Identity and address documents for every partner",
      "The proposed LLP name, with a second option",
      "Each partner's capital contribution",
      "The terms for the LLP Agreement: profit share, roles, decisions, admission and exit",
      "Registered office proof and the owner's no-objection certificate",
      "Time for DSC verification and for signing the filings and the agreement",
    ],
    afterRegistration: [
      {
        title: "File the LLP Agreement",
        body: "The agreement is executed on stamp paper at the state's rate and filed in Form 3 within 30 days of incorporation. Late filing attracts additional fees for each day of delay.",
      },
      {
        title: "PAN, TAN and a current account",
        body: "The LLP gets its own PAN and TAN, and a current account is opened in its name against the Certificate of Incorporation.",
      },
      {
        title: "Registrations for your activity",
        body: "GST, a shop and establishment registration or an activity licence, depending on what the LLP actually does and where.",
      },
      {
        title: "Run the annual cycle",
        body: "Form 11 by 30 May and Form 8 by 30 October, every year. Accounts are audited once turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh.",
      },
    ],
    considerations: [
      {
        title: "Leaving the LLP Agreement generic",
        body: "A template agreement that does not record what the partners actually agreed on profit share, drawings and exit is the usual source of later disputes.",
      },
      {
        title: "Missing the 30-day window for Form 3",
        body: "Until an agreement is filed, the default rules in the First Schedule to the Act apply, which split profits and management rights equally.",
      },
      {
        title: "Choosing an LLP when investment is likely",
        body: "Investors take equity, and an LLP cannot issue it. Converting to a company later is possible, but it is a fresh process with its own cost.",
      },
      {
        title: "Assuming a quiet year needs no filing",
        body: "Form 8 and Form 11 are due whether or not the LLP traded. The late fee accrues daily until the filing is made.",
      },
    ],
    costs: [
      {
        item: "Professional fee",
        setBy: "Raulji Group",
        detail: `${PROFESSIONAL_FEE.llp}, one time, for the work listed in the package.`,
      },
      {
        item: "Government filing fees",
        setBy: "Ministry of Corporate Affairs",
        detail: "Depend on the total capital contribution. Paid to the MCA at filing.",
      },
      {
        item: "Stamp duty on the LLP Agreement",
        setBy: "State government",
        detail: "At the rate of the state where the LLP is registered.",
      },
      {
        item: "Taxes",
        setBy: "As applicable",
        detail: "Any tax that applies to the professional fee is shown in the written quote.",
      },
    ],
    timeline: {
      ours: "Digital signatures, name screening, the FiLLiP filing and drafting the LLP Agreement. This starts once every document is complete.",
      authority: "Name reservation and incorporation are processed by the Registrar. A query or a name rejection adds a round trip that nobody outside the Registrar can shorten.",
    },
    compareWith: "partnership-registration",
    compareNote:
      "Both are run by partners. The difference is liability, legal identity and the annual filings that come with them.",
    guides: [
      "private-limited-company-vs-llp",
      "how-to-choose-business-structure-india-2026",
      "common-business-registration-mistakes-india",
    ],
    cardBlurb: "For businesses structured around partners with limited liability.",
    cardCta: "Explore LLP Registration",
    suitableFor: [
      "Professional practices and consultancies run by two or more partners",
      "Partner-operated businesses that want liability protection without a board structure",
      "Service firms where profit sharing is negotiated rather than fixed by shareholding",
      "Businesses that do not intend to raise equity investment",
      "Existing partnership firms looking to move to a structure with limited liability",
    ],
    benefits: [
      {
        title: "Separate legal entity",
        body: "An LLP is a body corporate in its own right. It can hold property, enter contracts and sue or be sued in its own name, independent of the partners who make it up.",
      },
      {
        title: "Limited liability for partners",
        body: "A partner's liability is limited to their agreed contribution. A partner is not personally liable for the wrongful acts of another partner, which is the key difference from a traditional partnership firm.",
      },
      {
        title: "Flexible internal arrangement",
        body: "Profit sharing, management rights, admission and exit of partners are governed by the LLP Agreement, which the partners negotiate among themselves rather than taking from a statutory template.",
      },
      {
        title: "Lighter compliance than a company",
        body: "There is no requirement to hold board or general meetings, and audit is required only once turnover or contribution crosses the statutory thresholds.",
      },
      {
        title: "Perpetual succession",
        body: "The LLP continues despite changes in its partners. Partners can be admitted or can retire without the entity itself coming to an end.",
      },
    ],
    limitations: [
      "Cannot issue equity shares, so it is not suitable if you plan to raise venture capital",
      "Any change in partners or in the LLP Agreement must be filed with the Registrar",
      "Form 8 and Form 11 must be filed annually even in a year with no business activity",
      "Late ROC filing attracts a per-day penalty that continues to accrue until the filing is made",
    ],
    eligibility: [
      "A minimum of two partners. There is no upper limit on the number of partners.",
      "A minimum of two designated partners, both individuals, at least one of whom must be a resident of India.",
      "Each designated partner needs a DPIN or DIN and a valid Class 3 Digital Signature Certificate.",
      "A registered office address in India with valid proof and a no-objection certificate where the premises are not owned.",
      "An agreed capital contribution from each partner. There is no statutory minimum contribution.",
      "A proposed name that is not identical or deceptively similar to an existing company, LLP or registered trade mark.",
    ],
    documents: [
      "PAN card of every partner",
      "Aadhaar card of every partner",
      "Identity proof: voter ID, passport or driving licence",
      "Address proof in the partner's own name: bank statement or utility bill, generally not older than two months",
      "Passport-size photograph of each partner",
      "Passport and notarised or apostilled documents for any foreign national partner",
      "Registered office address proof: latest electricity bill or property tax receipt",
      "Rent agreement, where the office premises are rented",
      "No-objection certificate from the owner of the registered office premises",
    ],
    process: [
      {
        title: "Digital Signature Certificate",
        body: "Class 3 DSCs are obtained for the designated partners, since every form filed with the Registrar of Companies is signed digitally.",
      },
      {
        title: "Name reservation (RUN-LLP)",
        body: "The proposed name is reserved through the RUN-LLP service on the MCA portal. We check availability and screen against registered trade marks before applying, and keep an alternative ready.",
      },
      {
        title: "Incorporation filing (FiLLiP)",
        body: "The FiLLiP form covers the partners, designated partners, capital contribution and registered office. DPIN can be applied for within this same form for partners who do not already hold one.",
      },
      {
        title: "Certificate of Incorporation",
        body: "The Registrar issues the Certificate of Incorporation with the LLP Identification Number. The LLP exists as a body corporate from the date on that certificate.",
      },
      {
        title: "LLP Agreement (Form 3)",
        body: "The LLP Agreement sets out profit sharing, duties, decision-making and the process for admitting or removing partners. It must be executed on stamp paper of the value prescribed by the relevant state and filed in Form 3 within 30 days of incorporation.",
      },
      {
        title: "PAN, TAN and operating registrations",
        body: "PAN and TAN are applied for, a current account is opened, and any further registrations your activity requires, such as GST, are taken up.",
      },
    ],
    whatWeHandle: [
      "DSC issuance for designated partners",
      "Name availability and trade mark screening before filing",
      "RUN-LLP name reservation",
      "FiLLiP incorporation filing, including DPIN applications",
      "Drafting the LLP Agreement to reflect what the partners have agreed",
      "Form 3 filing of the LLP Agreement within the 30-day window",
      "PAN and TAN applications",
      "Responding to Registrar queries or resubmission requests",
    ],
    governmentProcess:
      "LLP incorporation is handled by the Registrar of Companies under the Ministry of Corporate Affairs, through the MCA portal, under the Limited Liability Partnership Act, 2008. Name reservation is applied for via RUN-LLP and incorporation via the FiLLiP form. Government filing fees depend on the total capital contribution, and the stamp duty payable on the LLP Agreement is set by the state in which the LLP is registered.",
    pricing: {
      amount: PROFESSIONAL_FEE.llp,
      note: "One-time professional fee. Government filing fees and the stamp duty on the LLP Agreement are charged separately and vary by state and contribution.",
      includes: [
        "Digital Signature Certificate for 2 designated partners",
        "DPIN for 2 designated partners",
        "LLP name approval through RUN-LLP",
        "FiLLiP incorporation filing",
        "LLP Agreement drafting and Form 3 filing",
        "PAN and TAN application",
        "A dedicated point of contact through the process",
      ],
    },
    timelineEstimate: "Commonly 7 to 10 working days from receipt of complete documents",
    faqs: [
      {
        q: "What is an LLP?",
        a: "A Limited Liability Partnership is a body corporate registered under the LLP Act, 2008. It has a legal identity separate from its partners, so it can own property and contract in its own name, while partners are liable only to the extent of the contribution they have agreed to bring in.",
      },
      {
        q: "Who should choose an LLP?",
        a: "An LLP suits a business run by the people who own it, where profit sharing is negotiated between partners and there is no plan to raise equity investment. Professional practices, consultancies and partner-operated service firms are common examples. If you expect to take on investors, a Private Limited Company is the more workable structure.",
      },
      {
        q: "How many partners are required?",
        a: "At least two partners, with no upper limit. At least two of them must be designated partners, who must be individuals and carry the responsibility for statutory compliance, and at least one designated partner must be a resident of India.",
      },
      {
        q: "What are designated partners?",
        a: "Designated partners are the partners specifically responsible for the LLP's compliance obligations, including its ROC filings. They must hold a DPIN and a digital signature. Every LLP needs at least two, and at least one must be resident in India. Ordinary partners share in profits and management without carrying that statutory responsibility.",
      },
      {
        q: "What documents are required?",
        a: "PAN, Aadhaar, identity proof, recent address proof in the partner's own name and a photograph for each partner, along with proof of the registered office address, a rent agreement if the premises are rented and a no-objection certificate from the owner.",
      },
      {
        q: "What is the LLP registration process?",
        a: "Digital signatures are obtained for the designated partners, the name is reserved through RUN-LLP, the FiLLiP incorporation form is filed with the Registrar, the Certificate of Incorporation is issued with an LLPIN, and the LLP Agreement is executed on stamp paper and filed in Form 3 within 30 days of incorporation.",
      },
      {
        q: "Is the LLP Agreement mandatory?",
        a: "Yes. The LLP Agreement must be filed in Form 3 within 30 days of incorporation. If no agreement is filed, the default provisions in the First Schedule to the LLP Act apply, which divide profits and management rights equally regardless of what the partners actually intended.",
      },
      {
        q: "How is an LLP different from a Private Limited Company?",
        a: "An LLP cannot issue equity shares or create an ESOP pool, which rules it out for venture funding. In exchange it carries lighter compliance: no board or general meetings, and audit only once turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh. A Private Limited Company requires a statutory audit from its first year regardless of turnover.",
      },
      {
        q: "How is an LLP different from a partnership firm?",
        a: "A partnership firm under the Indian Partnership Act, 1932, is not a separate legal entity and its partners carry unlimited personal liability, including for each other's acts. An LLP is a body corporate with limited liability, and a partner is not personally liable for another partner's wrongful acts. An LLP must file annually with the Registrar of Companies, which a partnership firm does not.",
      },
      {
        q: "What annual filings does an LLP have?",
        a: "Form 11, the annual return, is due by 30 May each year, and Form 8, the statement of account and solvency, by 30 October. Both are due even in a year with no business activity. Accounts must be audited if turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh. Late filing attracts a per-day penalty that keeps accruing until the filing is made.",
      },
    ],
    related: ["pvt-registration", "partnership-registration", "proprietorship-registration"],
  },
  {
    slug: "partnership-registration",
    path: "/services/partnership-registration/",
    name: "Partnership Firm Registration",
    shortName: "Partnership",
    h1: "Partnership Firm Registration",
    title: "Partnership Firm Registration in India | Raulji Group",
    metaDescription:
      "Partnership firm registration in India: the partnership deed, documents, Registrar of Firms registration, partner liability and what it costs.",
    eyebrow: "Business Registration",
    definition:
      "A partnership firm is a business owned by two or more people who have agreed to share its profits, governed by the Indian Partnership Act, 1932. The firm is not a separate legal entity from its partners.",
    heroSub:
      "Understand what the partnership deed must cover, how registration with the Registrar of Firms works, and what partners take on. We draft the deed and handle the registration.",
    quickAnswer:
      "A partnership firm is a business carried on by two or more people who have agreed to share its profits, under the Indian Partnership Act, 1932. It is not a separate legal entity, and the partners are personally liable for the firm's debts without limit. The firm is formed by a partnership deed. Registering it with the state's Registrar of Firms is optional in law but advisable, because an unregistered firm cannot sue to enforce its contracts.",
    law: "Indian Partnership Act, 1932",
    authority: "Registrar of Firms of the state where the firm does business",
    takeaways: [
      "Formed by a signed deed between at least two partners. There is no MCA incorporation.",
      "Partners carry unlimited personal liability, including for each other's acts.",
      "Registration is optional, but section 69 limits what an unregistered firm can do in court.",
      "No annual ROC filings. The firm files its own income tax return.",
    ],
    customerProvides: [
      "Identity and address documents for every partner",
      "The firm name and the business activity",
      "Each partner's capital, profit share and any remuneration or interest on capital",
      "Who operates the bank account and signs for the firm",
      "What happens when a partner joins, retires or dies",
      "Place of business proof and the owner's no-objection certificate",
    ],
    afterRegistration: [
      {
        title: "PAN and a current account",
        body: "The firm applies for a PAN in its own name, which the bank needs to open a current account in the firm's name.",
      },
      {
        title: "Registrations for your activity",
        body: "GST where turnover or the type of supply requires it, and a shop and establishment registration for the premises.",
      },
      {
        title: "The firm's income tax return",
        body: "The firm is assessed separately at the rate for firms. A tax audit applies once turnover crosses the Income Tax threshold.",
      },
      {
        title: "Keep the register accurate",
        body: "Changes in partners, the firm name or the place of business are notified to the Registrar of Firms so the registered details match the firm.",
      },
    ],
    considerations: [
      {
        title: "A deed that is vague on money and exit",
        body: "Profit share, drawings, interest on capital and what happens when a partner leaves are where partnership disputes start. The default rules in the Act may not be what anyone intended.",
      },
      {
        title: "Skipping registration",
        body: "An unregistered firm cannot go to court to recover money a customer owes it. Registering later is possible, but a dispute rarely waits.",
      },
      {
        title: "Underestimating personal liability",
        body: "Every partner is liable for the firm's debts, including those created by another partner acting for the firm.",
      },
      {
        title: "Under-stamping the deed",
        body: "A deed on stamp paper of the wrong value can be refused as evidence until the shortfall and a penalty are paid.",
      },
    ],
    costs: [
      {
        item: "Professional fee",
        setBy: "Raulji Group",
        detail: "Quoted once we know what the deed involves and which registrations your activity needs.",
      },
      {
        item: "Stamp duty on the deed",
        setBy: "State government",
        detail: "Set by the state where the deed is executed.",
      },
      {
        item: "Registrar of Firms fee",
        setBy: "State government",
        detail: "Set by the state. Payable only if the firm is registered.",
      },
      {
        item: "Operating registrations",
        setBy: "Various authorities",
        detail: "GST registration has no government fee. Shop and establishment fees are set locally.",
      },
    ],
    timeline: {
      ours: "Drafting the deed once the partners have settled their terms, then the PAN and Registrar applications. Agreeing the terms usually takes longer than writing them down.",
      authority: "Registrar of Firms processing, which varies from state to state.",
    },
    compareWith: "proprietorship-registration",
    compareNote:
      "The two unincorporated structures. The difference is how many owners there are and who shares the liability.",
    guides: [
      "partnership-vs-proprietorship-india",
      "business-structure-guide-new-entrepreneurs-india",
      "starting-business-gujarat-registration-guide",
    ],
    cardBlurb: "For businesses formed by partners under a partnership structure.",
    cardCta: "Explore Partnership Registration",
    suitableFor: [
      "Two or more people starting a business together with shared capital and effort",
      "Family businesses and trading concerns that want a simple, low-cost structure",
      "Local businesses that do not need limited liability or outside investment",
      "Businesses that want to start operating quickly with minimal statutory filing",
      "Partners who may later convert to an LLP once the business settles",
    ],
    benefits: [
      {
        title: "Simple and quick to form",
        body: "A partnership comes into existence through the partnership deed the partners sign. There is no incorporation application to the Ministry of Corporate Affairs and no waiting on a central approval.",
      },
      {
        title: "Low cost to set up and run",
        body: "The main costs are deed drafting, the stamp duty set by the state and, if you register, the Registrar of Firms fee. There are no annual ROC filings and no mandatory statutory audit.",
      },
      {
        title: "Flexible internal terms",
        body: "Capital, profit sharing ratios, drawings, responsibilities and the process for admitting or retiring a partner are whatever the partners write into the deed.",
      },
      {
        title: "Direct control",
        body: "The partners run the business themselves. There is no board, no separate shareholder layer and no requirement to hold formal meetings or record minutes.",
      },
      {
        title: "Straightforward tax treatment",
        body: "The firm is taxed as a separate assessee at the rate applicable to firms. Partners are not taxed again on their share of the firm's profits, though interest and remuneration received from the firm are taxable in their own hands.",
      },
    ],
    limitations: [
      "Partners carry unlimited personal liability, so personal assets can be used to meet the firm's debts",
      "Each partner is liable for business acts done by the other partners in the firm's name",
      "The firm is not a separate legal entity and generally cannot hold property in its own name",
      "An unregistered firm cannot sue to enforce a contractual right in court, under section 69 of the Act",
      "Equity investment cannot be raised, so the structure does not suit a business seeking funding",
    ],
    eligibility: [
      "A minimum of two partners, each competent to contract under Indian law.",
      "A maximum of 50 partners, as prescribed under the Companies Act rules.",
      "A written partnership deed setting out the terms agreed between the partners.",
      "Stamp duty on the deed at the rate prescribed by the state where it is executed.",
      "A place of business, with address proof and a no-objection certificate where the premises are rented.",
      "A firm name that does not suggest government patronage and does not infringe an existing trade mark.",
    ],
    documents: [
      "PAN card of every partner",
      "Aadhaar card of every partner",
      "Identity proof: voter ID, passport or driving licence",
      "Address proof of each partner",
      "Passport-size photograph of each partner",
      "Partnership deed executed on stamp paper of the prescribed value",
      "Address proof of the place of business: electricity bill or property tax receipt",
      "Rent agreement, where the premises are rented",
      "No-objection certificate from the owner of the premises",
      "Form 1 or the state-prescribed application, for registration with the Registrar of Firms",
    ],
    process: [
      {
        title: "Agree the commercial terms",
        body: "Partners settle capital contribution, profit and loss sharing ratios, remuneration and interest on capital, roles, banking authority and what happens when a partner joins, retires or dies.",
      },
      {
        title: "Draft the partnership deed",
        body: "Those terms are written into a deed. A deed that is vague about profit sharing, drawings or exit is the single most common source of later disputes between partners, so this is the step worth spending time on.",
      },
      {
        title: "Stamp and execute the deed",
        body: "The deed is executed on stamp paper of the value prescribed by the relevant state and signed by all partners in the presence of witnesses. Stamp duty rates differ from state to state.",
      },
      {
        title: "Apply for the firm's PAN",
        body: "The firm applies for its own PAN in the firm's name, which the bank will require to open a current account in the name of the business.",
      },
      {
        title: "Register with the Registrar of Firms",
        body: "Registration is optional but strongly advisable. The application is made in the prescribed form to the Registrar of Firms for the state, with the deed and the required proofs, and a certificate of registration follows.",
      },
      {
        title: "Open the bank account and take operating registrations",
        body: "A current account is opened in the firm's name, and any registrations your activity needs, such as GST or a shop and establishment licence, are applied for.",
      },
    ],
    whatWeHandle: [
      "Advising on the terms that should be covered in the deed",
      "Drafting the partnership deed",
      "Guidance on the correct stamp duty for the state of execution",
      "PAN application in the firm's name",
      "Preparing and filing the application with the Registrar of Firms",
      "Guidance on current account opening documentation",
      "Advising on whether GST registration is applicable to your activity",
    ],
    governmentProcess:
      "Partnership firms are governed by the Indian Partnership Act, 1932, which is administered by state governments rather than the Ministry of Corporate Affairs. Registration is made with the Registrar of Firms for the state in which the firm has its place of business. Registration is not compulsory under the Act, but section 69 bars an unregistered firm and its partners from filing a suit to enforce a contractual right against the firm or a third party, which is why most firms register. Stamp duty on the deed and the Registrar's fee are both set at state level.",
    pricing: null,
    timelineEstimate:
      "The deed can usually be drafted and executed within a few working days. Registrar of Firms processing time varies from state to state",
    faqs: [
      {
        q: "What is a partnership firm?",
        a: "A partnership firm is a business carried on by two or more people who have agreed to share its profits, under the Indian Partnership Act, 1932. The firm is not a separate legal entity, so in law the partners collectively are the business, and they are personally responsible for its obligations.",
      },
      {
        q: "How many partners are required?",
        a: "At least two. The maximum is 50 partners, as prescribed under the rules made under the Companies Act. Every partner must be competent to contract, so a minor cannot be a partner, although a minor can be admitted to the benefits of a partnership with the consent of all partners.",
      },
      {
        q: "What is a partnership deed?",
        a: "The partnership deed is the written agreement between the partners. It records capital contributions, profit and loss sharing ratios, remuneration and interest on capital, each partner's duties and authority, banking arrangements, and how a partner is admitted, retires or is removed. Where the deed is silent, the default provisions of the Partnership Act apply, which may not be what the partners intended.",
      },
      {
        q: "Is partnership registration mandatory?",
        a: "No. The Indian Partnership Act, 1932, does not compel registration, and a firm can legally operate without it. However, section 69 prevents an unregistered firm or its partners from suing to enforce a contractual right against the firm or against a third party. In practice that means an unregistered firm cannot go to court to recover money a customer owes it, so we recommend registering.",
      },
      {
        q: "What documents are needed?",
        a: "PAN, Aadhaar, identity proof, address proof and a photograph for each partner, the partnership deed executed on stamp paper, proof of the firm's place of business, a rent agreement if the premises are rented, and a no-objection certificate from the owner.",
      },
      {
        q: "What is the registration process?",
        a: "The partners agree their terms, a deed is drafted and executed on stamp paper of the value prescribed by the state, the firm applies for its own PAN, and an application is filed with the Registrar of Firms for the state with the deed and supporting proofs. The Registrar issues a certificate of registration on approval.",
      },
      {
        q: "How is a partnership firm different from an LLP?",
        a: "The difference that matters most is liability. In a partnership firm the partners are personally liable without limit, including for the acts of the other partners. In an LLP, liability is limited to the agreed contribution and a partner is not personally liable for another partner's wrongful acts. An LLP is also a separate legal entity and can hold property in its own name, but it carries annual ROC filing obligations that a partnership firm does not.",
      },
      {
        q: "Can a partnership firm be converted into an LLP or a company later?",
        a: "Yes. The LLP Act and the Companies Act both provide routes for converting a registered partnership firm into an LLP or into a company, subject to conditions including the consent of all partners. Many firms start as a partnership and convert once the business grows or once limited liability becomes a real concern.",
      },
      {
        q: "How is a partnership firm taxed?",
        a: "The firm is assessed to income tax as a separate entity at the rate applicable to firms, plus applicable surcharge and cess. A partner's share of the firm's profit is exempt in the partner's own hands because it has already been taxed in the firm, but interest on capital and remuneration received from the firm are taxable for the partner, and are deductible for the firm only within the limits set by section 40(b).",
      },
    ],
    related: ["llp-registration", "proprietorship-registration", "pvt-registration"],
  },
  {
    slug: "proprietorship-registration",
    path: "/services/proprietorship-registration/",
    name: "Proprietorship Registration",
    shortName: "Proprietorship",
    h1: "Proprietorship Registration",
    title: "Proprietorship Registration in India | Raulji Group",
    metaDescription:
      "Proprietorship registration in India: which registrations apply, Udyam, GST and shop licence, documents, the owner's responsibilities and costs.",
    eyebrow: "Business Registration",
    definition:
      "A proprietorship is a business owned and run by one individual. It is not a separate legal entity and is not incorporated: in law the proprietor and the business are the same person.",
    heroSub:
      "Understand which registrations a sole proprietorship actually needs, what the owner is responsible for, and when another structure makes more sense. We set up the registrations your activity requires.",
    quickAnswer:
      "A sole proprietorship is a business owned and run by one individual. It is not incorporated and has no legal identity separate from its owner, who is personally liable for all of its debts. There is no single proprietorship certificate in India: the business is established through the registrations it holds, most commonly Udyam, GST where it applies, and a shop and establishment registration.",
    law: "No dedicated statute. Recognised through the registrations it holds",
    authority: "No single authority: the MSME Udyam portal, the GST portal and the state or local authority",
    takeaways: [
      "One owner only. The business uses the owner's own PAN.",
      "Unlimited liability: personal assets are exposed to business debts.",
      "No ROC filings. Obligations come from the registrations held and the owner's tax return.",
      "There is no government proprietorship certificate, whatever a provider may offer.",
    ],
    customerProvides: [
      "PAN, Aadhaar and a photograph",
      "The business name and a clear description of the activity",
      "Expected turnover, and whether you will sell outside your state or online",
      "Place of business proof and the owner's no-objection certificate",
      "Bank account details for Udyam registration",
    ],
    afterRegistration: [
      {
        title: "Open a current account",
        body: "Most banks ask for two proofs that the business exists, which is why Udyam plus GST or a shop registration is the usual combination.",
      },
      {
        title: "GST returns, if registered",
        body: "A GST registration brings periodic returns, and they are due in months with no sales as well.",
      },
      {
        title: "Your own income tax return",
        body: "Business income goes in the proprietor's personal return. A tax audit applies once turnover crosses the Income Tax threshold.",
      },
      {
        title: "Keep registrations current",
        body: "Update Udyam, GST and the shop registration when the address or the activity changes, and renew any licence that expires.",
      },
    ],
    considerations: [
      {
        title: "Paying for a proprietorship certificate",
        body: "No such government certificate exists. What a proprietorship needs is the right combination of registrations for its activity.",
      },
      {
        title: "Getting the GST decision wrong",
        body: "Some supplies need GST registration from the first sale regardless of turnover, such as inter-state supply of goods or selling through an e-commerce operator. Registering when it is not needed brings returns you then have to file.",
      },
      {
        title: "Mixing personal and business money",
        body: "In law they are one person, but a separate current account makes the business far easier for a bank, the tax department or a future buyer to follow.",
      },
      {
        title: "Staying a proprietorship too long",
        body: "As turnover and risk grow, unlimited liability and individual slab rates can argue for an LLP or a company.",
      },
    ],
    costs: [
      {
        item: "Professional fee",
        setBy: "Raulji Group",
        detail: "Quoted once we know which registrations your activity needs.",
      },
      {
        item: "Udyam registration",
        setBy: "Ministry of MSME",
        detail: "No government fee.",
      },
      {
        item: "GST registration",
        setBy: "GST portal",
        detail: "No government fee.",
      },
      {
        item: "Shop and establishment",
        setBy: "State or local authority",
        detail: "Fee set by the state or municipality, and varies.",
      },
    ],
    timeline: {
      ours: "Working out which registrations apply to your activity and preparing each application.",
      authority: "Udyam is usually issued the same day. GST commonly takes around 7 to 15 working days and can include a physical verification of the premises.",
    },
    compareWith: "pvt-registration",
    compareNote:
      "The simplest structure against the most formal. A Private Limited Company needs at least two people, so this comparison matters when a second director or shareholder is realistic.",
    guides: [
      "partnership-vs-proprietorship-india",
      "how-to-choose-business-structure-india-2026",
      "starting-business-gujarat-registration-guide",
    ],
    cardBlurb: "For individuals starting and operating a business as a sole proprietor.",
    cardCta: "Explore Proprietorship Registration",
    suitableFor: [
      "One person starting a business with no co-owners",
      "Freelancers, consultants and independent professionals",
      "Small retail shops, local traders and service businesses",
      "Businesses testing an idea before committing to a company or LLP",
      "Owners who want the lowest possible compliance load while getting started",
    ],
    benefits: [
      {
        title: "Quick and inexpensive to start",
        body: "There is no incorporation process. Once the applicable registrations are in place and a current account is open, the business can begin trading.",
      },
      {
        title: "Complete control",
        body: "The proprietor takes every decision alone, with no partners, board or shareholders to consult and no formal approvals to record.",
      },
      {
        title: "Minimal ongoing compliance",
        body: "There are no annual ROC filings. The obligations that apply are the ones attached to the specific registrations you hold, such as GST returns, plus your personal income tax return.",
      },
      {
        title: "Profits taken directly",
        body: "Business income is the proprietor's income. Money can be drawn from the business without a dividend or salary mechanism, since there is no separate entity to draw it from.",
      },
      {
        title: "Simple to wind down or convert",
        body: "A proprietorship can be closed by surrendering its registrations, and the business can later be moved into a partnership, LLP or company as it grows.",
      },
    ],
    limitations: [
      "Unlimited liability: the proprietor's personal assets are exposed to every business debt",
      "No separate legal identity, so the business cannot contract or hold property in its own name",
      "No perpetual succession: the business does not survive the proprietor",
      "Cannot take on a partner or issue shares, so outside investment is not possible",
      "Income is taxed at individual slab rates, which can exceed company rates at higher income levels",
      "Larger customers and lenders sometimes prefer to deal with an incorporated entity",
    ],
    eligibility: [
      "One individual owner. A proprietorship cannot have co-owners.",
      "A PAN and Aadhaar in the proprietor's own name. The business does not receive a separate PAN.",
      "A place of business with valid address proof.",
      "GST registration where turnover crosses the applicable threshold, or where the nature of the supply makes it compulsory.",
      "A business name that does not infringe an existing registered trade mark.",
    ],
    documents: [
      "PAN card of the proprietor",
      "Aadhaar card of the proprietor",
      "Passport-size photograph",
      "Address proof of the place of business: electricity bill or property tax receipt",
      "Rent agreement, where the premises are rented",
      "No-objection certificate from the owner of the premises",
      "Bank account details for Udyam registration",
      "Two business registration proofs, which most banks ask for before opening a current account",
    ],
    process: [
      {
        title: "Decide the business name and activity",
        body: "A proprietorship trades under a business name that is not separately incorporated. We screen the name against registered trade marks so the business is not building recognition on a name it may later have to stop using.",
      },
      {
        title: "Udyam (MSME) registration",
        body: "Udyam registration is free, is completed on the government portal against the proprietor's Aadhaar and PAN, and produces a certificate with a Udyam number. It is the most widely accepted proof that a proprietorship exists.",
      },
      {
        title: "GST registration, where applicable",
        body: "GST registration is compulsory once turnover crosses the applicable threshold, and irrespective of turnover for inter-state supply of goods, e-commerce supply and certain other categories. Where it is not compulsory, some proprietors still register voluntarily because customers ask for a GST invoice.",
      },
      {
        title: "Shop and establishment registration",
        body: "Most states require a shop and establishment registration for a commercial premises. In Gujarat this is handled under the state's shops and establishments legislation through the local authority, and requirements vary by municipality.",
      },
      {
        title: "Any activity-specific licences",
        body: "Some activities need their own licence, such as FSSAI for food businesses, Import Export Code for import or export, or a professional tax registration where the state levies it.",
      },
      {
        title: "Open a current account",
        body: "Banks open a current account in the business name against the proprietor's PAN and Aadhaar together with the business registration proofs. Under RBI KYC norms most banks ask for two such proofs, which is why Udyam plus GST or a shop licence is the usual combination.",
      },
    ],
    whatWeHandle: [
      "Advising which registrations actually apply to your business activity",
      "Udyam (MSME) registration",
      "GST registration where it is applicable or commercially useful",
      "Shop and establishment registration",
      "Guidance on activity-specific licences such as FSSAI or Import Export Code",
      "Preparing the documentation banks ask for when opening a current account",
      "Advising on when it makes sense to move to an LLP or a company",
    ],
    governmentProcess:
      "There is no single authority that registers proprietorships and no central proprietorship certificate, because a proprietorship is not an incorporated entity. A proprietorship is instead recognised through the registrations it holds: Udyam registration through the Ministry of Micro, Small and Medium Enterprises, GST registration through the GST portal where applicable, and shop and establishment registration through the relevant state or local authority. Any business that tells you it will obtain a government proprietorship registration certificate is describing something that does not exist.",
    pricing: null,
    timelineEstimate:
      "Udyam registration is usually same-day. GST registration commonly takes around 7 to 15 working days and may include physical verification of the premises",
    faqs: [
      {
        q: "What is a proprietorship?",
        a: "A proprietorship is a business owned by one individual. It is not incorporated and has no legal identity separate from its owner, so the proprietor personally owns the assets, owes the debts and is assessed to tax on the income.",
      },
      {
        q: "Is a proprietorship a separate legal entity?",
        a: "No. This is the most important thing to understand about the structure. Unlike a Private Limited Company or an LLP, a proprietorship is legally the same person as its owner. The business cannot contract in its own name, cannot hold property in its own name, and does not receive its own PAN. There is also no limit on the proprietor's liability for business debts.",
      },
      {
        q: "Is there a government proprietorship registration certificate?",
        a: "No. There is no single registration or certificate that establishes a proprietorship, because it is not incorporated. A proprietorship is evidenced by the registrations it actually holds, most commonly Udyam registration, GST registration where applicable, and a shop and establishment registration. Be cautious of any provider that claims to issue a government proprietorship certificate.",
      },
      {
        q: "Who should choose a proprietorship?",
        a: "It suits a single owner starting small, where the business is not carrying significant liability risk and there is no plan to bring in partners or investors. Freelancers, consultants, local retailers and small service businesses commonly start this way. If you need limited liability or intend to raise funding, look at an LLP or a Private Limited Company instead.",
      },
      {
        q: "What registrations may be applicable?",
        a: "Udyam (MSME) registration, which is free and widely accepted as proof of the business. GST registration where turnover crosses the threshold or where the nature of supply makes it compulsory. Shop and establishment registration under state law for commercial premises. Beyond those, activity-specific licences such as FSSAI for food businesses, Import Export Code for import or export, and professional tax where the state levies it.",
      },
      {
        q: "Is GST registration compulsory for a proprietorship?",
        a: "Not always. It becomes compulsory once turnover crosses the applicable threshold, and irrespective of turnover in certain cases including inter-state supply of goods and supply through an e-commerce operator. Thresholds differ for goods and services and by state category. Some proprietors register voluntarily because business customers require a GST invoice to claim input credit. We assess which applies to your specific activity before filing.",
      },
      {
        q: "What documents are needed?",
        a: "The proprietor's PAN and Aadhaar, a photograph, proof of the place of business, a rent agreement if the premises are rented, a no-objection certificate from the owner, and bank details for Udyam registration.",
      },
      {
        q: "How do I open a current account for a proprietorship?",
        a: "Banks open a current account in the business name against the proprietor's PAN and Aadhaar together with proof that the business exists. Under RBI KYC norms most banks ask for two such proofs, which in practice means a combination such as Udyam registration plus a GST certificate or shop and establishment registration.",
      },
      {
        q: "How is a proprietorship taxed?",
        a: "Business income is included in the proprietor's own income tax return and taxed at the individual slab rates applicable to them, rather than at a separate rate for the business. There is no separate return for the business. A tax audit becomes applicable once turnover crosses the threshold under section 44AB, and presumptive taxation under sections 44AD or 44ADA may be available depending on the nature and scale of the activity.",
      },
      {
        q: "Can a proprietorship be converted into a company or LLP later?",
        a: "Yes. A proprietor can incorporate a Private Limited Company or an LLP and transfer the business to it, or form a partnership by bringing in a partner. This is a common path once the business grows, takes on more risk, or needs to look incorporated to its customers and lenders.",
      },
    ],
    related: ["partnership-registration", "llp-registration", "pvt-registration"],
  },
];

/**
 * Who acts at each process step, keyed by the step title in `process` above.
 *
 * Shown on the process timeline so a reader can see which steps are our work
 * and which rest with an authority. Raulji Group prepares, files and follows
 * up; it never decides (service-page brief, section 31; master rule 13).
 */
export const STEP_ACTOR: Record<string, string> = {
  // Private Limited
  "Digital Signature Certificate (DSC)": "Raulji Group arranges",
  "Name reservation": "Registrar decides",
  "Drafting the MOA and AOA": "Raulji Group drafts",
  "SPICe+ Part B filing": "Raulji Group files",
  "Certificate of Incorporation": "Registrar issues",
  "Post-incorporation steps": "You, with our guidance",
  // LLP
  "Digital Signature Certificate": "Raulji Group arranges",
  "Name reservation (RUN-LLP)": "Registrar decides",
  "Incorporation filing (FiLLiP)": "Raulji Group files",
  "LLP Agreement (Form 3)": "Partners sign, we file",
  "PAN, TAN and operating registrations": "You, with our support",
  // Partnership
  "Agree the commercial terms": "Partners decide",
  "Draft the partnership deed": "Raulji Group drafts",
  "Stamp and execute the deed": "Partners sign",
  "Apply for the firm's PAN": "Raulji Group applies",
  "Register with the Registrar of Firms": "Registrar of Firms decides",
  "Open the bank account and take operating registrations": "You, with our support",
  // Proprietorship
  "Decide the business name and activity": "You decide, we screen",
  "Udyam (MSME) registration": "Raulji Group applies",
  "GST registration, where applicable": "GST officer decides",
  "Shop and establishment registration": "Local authority decides",
  "Any activity-specific licences": "Relevant authority decides",
  "Open a current account": "You and your bank",
};

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
