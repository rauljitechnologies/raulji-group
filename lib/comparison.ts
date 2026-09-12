/**
 * Structure comparison (spec section 18).
 * Wording is kept legally accurate rather than punchy. Oversimplifying here
 * would mislead someone making a decision that is expensive to reverse.
 */

export interface ComparisonRow {
  feature: string;
  pvt: string;
  llp: string;
  partnership: string;
  proprietorship: string;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Governing law",
    pvt: "Companies Act, 2013",
    llp: "Limited Liability Partnership Act, 2008",
    partnership: "Indian Partnership Act, 1932",
    proprietorship: "No dedicated statute; governed by the registrations held",
  },
  {
    feature: "Separate legal identity",
    pvt: "Yes. The company is distinct from its shareholders and can own property and contract in its own name.",
    llp: "Yes. The LLP is a body corporate distinct from its partners.",
    partnership: "No. The firm has no legal identity separate from its partners, though it can be registered with the Registrar of Firms.",
    proprietorship: "No. The proprietor and the business are the same person in law.",
  },
  {
    feature: "Owners or partners",
    pvt: "2 to 200 shareholders; minimum 2 directors, at least one resident in India",
    llp: "Minimum 2 partners with no upper limit; minimum 2 designated partners, at least one resident in India",
    partnership: "Minimum 2 partners, maximum 50",
    proprietorship: "A single owner only. Co-owners are not possible.",
  },
  {
    feature: "Liability",
    pvt: "Limited to any amount unpaid on the shares held",
    llp: "Limited to the partner's agreed contribution. A partner is not liable for another partner's wrongful acts.",
    partnership: "Unlimited and joint. Partners are personally liable, including for each other's acts in the firm's name.",
    proprietorship: "Unlimited. Personal assets are exposed to every business debt.",
  },
  {
    feature: "Raising equity investment",
    pvt: "Yes. Shares can be issued and transferred, and an ESOP pool created.",
    llp: "No. An LLP cannot issue equity shares.",
    partnership: "No. Capital can only come from existing or newly admitted partners.",
    proprietorship: "No. There is no mechanism to bring in an investor without changing structure.",
  },
  {
    feature: "Compliance level",
    pvt: "Highest. Statutory audit from the first year, annual ROC filings, board meetings and minutes.",
    llp: "Moderate. Form 8 and Form 11 annually; audit only if turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh.",
    partnership: "Low. No annual ROC filing. Income tax return and any GST obligations apply.",
    proprietorship: "Lowest. No ROC filing. Obligations follow the registrations held, plus the proprietor's own income tax return.",
  },
  {
    feature: "Taxation",
    pvt: "Taxed as a company at corporate rates. Dividends are taxable in the shareholder's hands.",
    llp: "Taxed at the rate applicable to firms. Partners are not taxed again on their profit share.",
    partnership: "Taxed at the rate applicable to firms. Partners are not taxed again on their profit share.",
    proprietorship: "Business income is taxed in the proprietor's own return at individual slab rates.",
  },
  {
    feature: "Continuity",
    pvt: "Perpetual succession. Continues regardless of change in shareholders or directors.",
    llp: "Perpetual succession. Continues regardless of change in partners.",
    partnership: "Depends on the deed. Can dissolve on a partner's death or retirement unless the deed provides otherwise.",
    proprietorship: "Does not survive the proprietor.",
  },
  {
    feature: "Typical setup time",
    pvt: "Commonly 7 to 12 working days with complete documents",
    llp: "Commonly 7 to 10 working days with complete documents",
    partnership: "Deed can be executed within a few days; Registrar of Firms timelines vary by state",
    proprietorship: "Udyam is usually same-day; GST commonly 7 to 15 working days where applicable",
  },
  {
    feature: "Suitable for",
    pvt: "Founders raising investment, teams issuing ESOPs, businesses needing a formal board structure",
    llp: "Partner-run firms and professional practices wanting limited liability without a company's compliance load",
    partnership: "Two or more people starting together at low cost, where limited liability is not the priority",
    proprietorship: "A single owner starting small, with limited liability exposure and no plan to bring in partners",
  },
];
