import type { Article } from "../types";
import { GROUP_AUTHOR } from "../authors";

/**
 * Partnership deed checklist.
 *
 * The structure is "what the Indian Partnership Act, 1932 says if the deed is
 * silent, and what partners should decide instead". Section references were
 * checked on 23 Oct 2026. The income-tax limits on partner remuneration and
 * interest were confirmed from secondary sources only and are stated with a
 * review flag; the corresponding section of the Income-tax Act, 2025 is not
 * named. See docs/blog-validation-report.md.
 *
 * This is a discussion guide, not a template deed, and says so.
 */
export const partnershipDeedChecklist: Article = {
  slug: "partnership-deed-checklist-india",
  title: "Partnership Deed Checklist: 12 Clauses to Discuss Before Signing",
  metaTitle: "Partnership Deed Checklist: 12 Clauses to Agree | Raulji",
  metaDescription:
    "Twelve things partners should agree before signing a deed, what the Indian Partnership Act, 1932 says if the deed is silent, and a checklist for the discussion.",
  excerpt:
    "A partnership deed is where two people decide, while they still agree, what happens when they do not. Here are the twelve clauses worth discussing, and what the law fills in if you leave them out.",
  category: "Business Registration",
  published: "2026-10-23",
  updated: "2026-10-23",
  readMinutes: 11,
  primaryKeyword: "partnership deed checklist",
  secondaryKeywords: [
    "partnership deed clauses",
    "what to include in a partnership deed",
    "Indian Partnership Act 1932",
    "partnership firm registration",
  ],
  searchIntent:
    "Informational, pre-transaction. Founders about to form a partnership firm who want to know what their deed should settle.",
  author: GROUP_AUTHOR,
  image: "partnership-deed",
  covers: [
    "The twelve subjects a partnership deed should settle",
    "What the Indian Partnership Act, 1932 provides when the deed is silent",
    "Why remuneration and interest to partners must be in the deed for tax purposes",
    "A checklist to work through together before anything is drafted",
    "When to take legal advice",
  ],
  keyTakeaway: {
    heading: "The short answer: what should a partnership deed cover?",
    body: "At minimum: **capital**, **profit and loss sharing**, **roles and authority**, **spending limits**, **drawings, remuneration and interest**, **banking controls**, **intellectual property and confidentiality**, **admission, retirement and death**, **exit valuation**, **dispute resolution**, **dissolution and continuity**, and **how the deed is amended and executed**. Where the deed says nothing, the Indian Partnership Act, 1932 applies its own default rules, and those defaults rarely match what partners actually intended.",
    points: [
      "With no deed term, profits and losses are shared equally and no partner is paid for working in the business.",
      "Unless the deed provides otherwise, the death of a partner dissolves the firm.",
      "A checklist helps the conversation. It is not a substitute for a deed drafted for your facts.",
    ],
  },
  body: [
    {
      kind: "p",
      text: "Section 11 of the Indian Partnership Act, 1932 lets partners decide their mutual rights and duties by contract. The deed is that contract. Wherever it is silent, the Act fills the gap with default rules written for a generic firm. Most disputes between partners are not about fraud. They are about a question nobody asked at the start: who decides, who is paid, and what one partner takes away on leaving.",
    },
    {
      kind: "p",
      text: "The twelve clauses below are the questions to answer together. For each, this guide notes what the Act provides if you say nothing. If you are still deciding between a partnership and a proprietorship, read [the comparison of the two](/blog/partnership-vs-proprietorship-india/) first.",
    },

    { kind: "h2", id: "capital", text: "1. How much capital does each partner bring, and what happens when more is needed?" },
    {
      kind: "p",
      text: "Record each partner's contribution, whether it is cash, property or something else, and its agreed value. Then decide what happens when the business needs more: whether every partner must contribute in proportion, whether a partner may lend instead, and on what terms.",
    },
    {
      kind: "note",
      title: "If the deed is silent",
      text: "Under section 13, interest on capital is payable only where a partner is entitled to it, and then only out of profits. A partner who advances money beyond the capital they agreed to bring is entitled to interest at **6 per cent a year** on that advance.",
    },

    { kind: "h2", id: "profit", text: "2. How will profits and losses be shared?" },
    {
      kind: "p",
      text: "State the ratio for profits and say whether losses follow the same ratio. Partners who contribute unequal capital or unequal time often want different ratios, and that is fine, as long as it is written down.",
    },
    {
      kind: "note",
      title: "If the deed is silent",
      text: "Section 13(b): partners share profits **equally** and contribute equally to losses, regardless of how much capital each brought.",
    },

    { kind: "h2", id: "roles", text: "3. Who does what, and who can bind the firm?" },
    {
      kind: "p",
      text: "Describe each partner's role and responsibilities, and how decisions are made: which matters need a majority, which need everyone. Then deal with authority to the outside world. Every partner is an agent of the firm, and an act done in the usual way of the firm's business binds the firm (section 19). The deed can restrict a partner's authority (section 20), but a restriction does not bind a third party who does not know about it.",
    },
    {
      kind: "note",
      title: "If the deed is silent",
      text: "Under section 12, every partner may take part in the business, ordinary differences are decided by a majority, and **no change in the nature of the business** can be made without the consent of **all** partners.",
    },

    { kind: "h2", id: "spending", text: "4. What are the spending limits and approval rules?" },
    {
      kind: "p",
      text: "Agree a figure above which a single partner cannot commit the firm without the others: a purchase, a contract, a hire, a loan, a guarantee. Name the decisions that always need everyone, such as borrowing, buying property, giving guarantees or taking on a new line of business. This is the clause that most often prevents a dispute rather than resolves one.",
    },

    { kind: "h2", id: "drawings", text: "5. Drawings, remuneration and interest: who is paid what?" },
    {
      kind: "p",
      text: "Decide whether working partners draw a salary, how much partners may withdraw against their share of profit and how often, and whether capital earns interest. Write the method, not just the amount, so it still works when profits change.",
    },
    {
      kind: "note",
      title: "If the deed is silent",
      text: "Section 13(a): **no partner is entitled to remuneration** for taking part in the business.",
    },
    {
      kind: "warning",
      title: "The tax position depends on the deed",
      text: "For income-tax, a firm can deduct remuneration to working partners and interest on partners' capital only if the deed authorises them, and only within limits. Interest is capped at 12 per cent a year, and remuneration is limited by reference to book profit: on the first ₹6 lakh, ₹3 lakh or 90 per cent of book profit, whichever is higher, and 60 per cent of the rest. These limits applied under section 40(b) of the Income-tax Act, 1961. The Income-tax Act, 2025, in force from 1 April 2026, carries a corresponding provision. Confirm the current limit and wording with your tax adviser before the deed is finalised.",
    },

    { kind: "h2", id: "banking", text: "6. How will the firm's money be controlled?" },
    {
      kind: "p",
      text: "Decide which bank the firm will use, who the signatories are, and whether payments above a set amount need two signatures. Agree who keeps the books, who prepares accounts and when, who the auditor or accountant will be, and how often partners review the figures. Every partner has the right to have access to and to inspect and copy any of the books of the firm (section 12(d)), so build that into how the books are kept rather than treating it as a concession.",
    },

    { kind: "h2", id: "ip", text: "7. Who owns the firm's intellectual property and information?" },
    {
      kind: "p",
      text: "State that the firm's name, brand, designs, software, customer lists and know-how belong to the firm, not to the partner who created them. Say what happens to them when a partner leaves. Add a confidentiality clause. Decide whether partners may run other businesses while they are partners: section 11(2) allows the deed to say a partner will not carry on any business other than that of the firm.",
    },
    {
      kind: "p",
      text: "If a partner makes a profit from a transaction of the firm, or from using its property or business connection, section 16 requires them to account for it to the firm. A restraint on an outgoing partner competing after leaving is valid under section 36(2) only if it is reasonable, limited to a specified period or local area.",
    },

    { kind: "h2", id: "admission", text: "8. How can partners join, retire, be expelled, or be replaced on death?" },
    {
      kind: "list",
      items: [
        "**Admission.** Section 31: a new partner can be introduced only with the consent of **all** existing partners, unless the deed says otherwise. Decide whether a majority should be enough.",
        "**Retirement.** Section 32: a partner can retire with the consent of all, by express agreement, or, in a partnership at will, by written notice. Set a notice period and the steps that follow.",
        "**Expulsion.** Section 33: a partner can be expelled only under a power given by the deed, exercised in good faith. With no such clause, there is no expulsion.",
        "**Death.** Section 42: subject to the deed, the death of a partner **dissolves the firm**. If the surviving partners should carry on, the deed must say so and set out how the deceased partner's share is dealt with.",
      ],
    },

    { kind: "h2", id: "valuation", text: "9. How will a departing partner's share be valued and paid?" },
    {
      kind: "p",
      text: "Agree the valuation method in advance: book value, a multiple, an independent valuer, and whether goodwill is included. Set the payment period, whether instalments carry interest, and the date at which the valuation is struck.",
    },
    {
      kind: "note",
      title: "If the deed is silent",
      text: "Where the remaining partners carry on the business with the property of the firm without a final settlement, section 37 lets the outgoing partner or their estate claim, at their option, either the share of profits attributable to the use of their share of the property, or interest at **6 per cent a year** on that share.",
    },

    { kind: "h2", id: "disputes", text: "10. How will disagreements be resolved?" },
    {
      kind: "p",
      text: "Set a sequence: discussion between partners, then mediation, then arbitration, with the seat and the number of arbitrators named. An arbitration agreement has to be made deliberately. A single partner's implied authority does **not** include submitting a firm dispute to arbitration (section 19(2)(a)), so the clause belongs in the deed, agreed by all.",
    },

    { kind: "h2", id: "dissolution", text: "11. When does the firm end, and when does it continue?" },
    {
      kind: "p",
      text: "State whether the firm is for a fixed term, for a particular venture, or at will. A firm for a fixed term is dissolved when the term expires, and one formed for a venture when it is completed, unless the deed provides otherwise (section 42). Write a continuity clause covering death, retirement and insolvency of a partner, so the business does not end by accident. Then set out how a dissolution is wound up: who collects debts, how assets are sold, and the order in which liabilities and capital are repaid, which otherwise follows section 48.",
    },

    { kind: "h2", id: "execution", text: "12. How is the deed amended, signed and registered?" },
    {
      kind: "list",
      items: [
        "**Amendments.** Require any change to be in writing and signed by all partners.",
        "**Stamp duty.** The deed is executed on stamp paper of the value required in the state where it is signed. In Gujarat the amount follows the Gujarat Stamp Act and depends on the capital involved.",
        "**Signatures and witnesses.** All partners sign, usually with witnesses. Many banks and authorities also ask for a notarised copy.",
        "**Registration.** Registering the firm with the Registrar of Firms is optional under the Act, but section 69 stops an unregistered firm from suing a third party to enforce a contract, and stops partners of an unregistered firm suing the firm or each other on the partnership contract. Changes in the firm must be notified to the Registrar after registration.",
      ],
    },

    { kind: "h2", id: "checklist", text: "A checklist to work through before drafting" },
    {
      kind: "checklist",
      title: "Agree these in a meeting, then give them to whoever drafts the deed",
      items: [
        "Firm name, business activity and place of business",
        "Term: at will, fixed term, or a particular venture",
        "Each partner's capital, its form and value, and the rule for further capital",
        "Profit and loss ratio",
        "Roles, decision rules, and decisions that need everyone",
        "Spending and borrowing limits for a single partner",
        "Salaries for working partners, drawings, and interest on capital, with the calculation method",
        "Bank, signatories and dual-signature threshold; accounting and audit",
        "Ownership of the name, brand and IP; confidentiality; other business interests",
        "Admission, retirement notice, expulsion power, and what happens on death",
        "Valuation method and payment terms for an outgoing partner",
        "Dispute resolution steps and arbitration seat",
        "Continuity and dissolution procedure",
        "How the deed is amended",
      ],
    },

    { kind: "h2", id: "advice", text: "When should you take legal advice?" },
    {
      kind: "p",
      text: "Take advice before signing if any of the following apply: partners contribute property rather than cash, partners are related and family property is involved, one partner will be passive, a partner is a company or LLP, the firm will borrow significantly or give guarantees, or you want restrictions on competition after a partner leaves. In each of those the generic answer is likely to be wrong for you.",
    },
    {
      kind: "p",
      text: "Raulji Group advises on the terms a deed should cover and drafts the deed as part of [partnership firm registration](/services/partnership-registration/), including the stamp duty and the filing with the Registrar of Firms.",
    },
  ],
  faqs: [
    {
      q: "Is a partnership deed legally required?",
      a: "The Indian Partnership Act, 1932 does not require a partnership to be in writing; a partnership can arise from an oral agreement. In practice a written deed is needed to register the firm, open a bank account, apply for a PAN and, for tax, to deduct remuneration and interest paid to partners.",
    },
    {
      q: "What happens if our deed does not say how profits are shared?",
      a: "Section 13(b) of the Act applies: profits are shared equally and losses are borne equally, whatever each partner contributed.",
    },
    {
      q: "Can partners be paid a salary?",
      a: "Yes, if the deed provides for it. Under section 13(a), with no such term, no partner is entitled to remuneration. For tax purposes, remuneration is deductible only for working partners, only if the deed authorises it, and only within the limits set by the income-tax law.",
    },
    {
      q: "Does a partnership firm end if a partner dies?",
      a: "Under section 42, the death of a partner dissolves the firm unless the deed provides otherwise. A continuity clause allows the surviving partners to carry on and sets out how the deceased partner's share is paid.",
    },
    {
      q: "Can a partner be removed from the firm?",
      a: "Only if the deed gives the power to expel and it is exercised in good faith, under section 33. Without that clause, a partner cannot be expelled by the others, however many of them agree.",
    },
    {
      q: "Is registering the partnership firm compulsory?",
      a: "No, but an unregistered firm cannot sue a third party to enforce a contract, and its partners cannot sue each other or the firm on the partnership contract, under section 69. Most firms register for that reason.",
    },
    {
      q: "Can we change the deed later?",
      a: "Yes, by a supplementary deed signed by all partners, executed on stamp paper as required. A registered firm must notify the Registrar of Firms of changes such as partners joining or leaving.",
    },
    {
      q: "Can we use a standard partnership deed template?",
      a: "A template is a starting point, not a finished deed. It will usually be silent or wrong on the points that matter most to your firm: how decisions are made, what partners are paid, and what happens when someone leaves. Use this checklist to decide those points first.",
    },
  ],
  related: [
    "partnership-vs-proprietorship-india",
    "how-to-choose-business-structure-india",
    "starting-business-gujarat-registration-guide",
  ],
  services: [
    {
      href: "/services/partnership-registration/",
      label: "Partnership Firm registration",
      blurb: "Deed advice and drafting, stamp duty, and registration with the Registrar of Firms.",
    },
    {
      href: "/services/llp-registration/",
      label: "LLP registration",
      blurb: "If partners want limited liability, an LLP agreement covers the same ground.",
    },
    {
      href: "/contact/",
      label: "Talk to us",
      blurb: "Tell us about the partners and the business before anything is drafted.",
    },
  ],
  sources: [
    {
      label: "The Indian Partnership Act, 1932",
      url: "https://www.indiacode.nic.in/handle/123456789/2400",
      supports:
        "Sections 11, 12, 13, 16, 19, 20, 31, 32, 33, 36, 37, 42, 48 and 69, cited where each default rule is described.",
    },
    {
      label: "Income-tax Act, 2025, in force from 1 April 2026",
      url: "https://www.incometaxindia.gov.in/w/income-tax-act-2025-comes-into-force-from-1st-april-2026",
      supports:
        "That the Income-tax Act, 2025 applies from 1 April 2026; partner remuneration and interest limits previously in section 40(b) of the 1961 Act.",
    },
  ],
  disclaimer:
    "This article is a discussion guide based on the Indian Partnership Act, 1932 as read on 23 October 2026. It is not a template deed and is not legally sufficient for every firm. Tax limits on partner remuneration and interest should be confirmed with a tax adviser, and the deed should be drafted for your facts.",
  cta: {
    title: "Forming a partnership firm?",
    body: "Bring your answers to the checklist. We will turn them into a deed that says what you agreed, and take the firm through stamp duty and registration.",
  },
};
