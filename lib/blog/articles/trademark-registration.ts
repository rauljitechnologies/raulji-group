import type { Article } from "../types";
import { GROUP_AUTHOR } from "../authors";

/**
 * Trademark registration in India.
 *
 * Informational. Raulji Group does not file trade mark applications; what it
 * does, as part of company, LLP, firm and proprietorship registration, is
 * screen a proposed business name against registered trade marks
 * (lib/services.ts). The call to action says exactly that and no more.
 *
 * Fees were read on IP India's "Forms and official fees" page on
 * 23 Oct 2026. No approval, registration or timeline is promised.
 */
export const trademarkRegistration: Article = {
  slug: "trademark-registration-india-guide",
  title: "Trademark Registration in India: Classes, Process and Common Mistakes",
  metaTitle: "Trademark Registration in India: Classes, Process, Mistakes",
  metaDescription:
    "How trademark registration works in India: what a mark protects, searches and classes, Form TM-A, examination and opposition, official fees and renewal.",
  excerpt:
    "Registering a company name does not give you the right to stop others using it as a brand. A trade mark does. Here is how the process works, what it costs in government fees, and where applications go wrong.",
  category: "Entrepreneurship",
  published: "2026-10-23",
  updated: "2026-10-23",
  readMinutes: 11,
  primaryKeyword: "trademark registration in India",
  secondaryKeywords: [
    "trademark classes",
    "trademark application process",
    "TM-A form fee",
    "trademark objection and opposition",
  ],
  searchIntent:
    "Informational, pre-filing. A business owner deciding whether and how to register a brand name or logo as a trade mark.",
  author: GROUP_AUTHOR,
  image: "trademark",
  covers: [
    "What a trade mark protects, and how it differs from a company name, copyright and a domain",
    "Searching before you apply, and choosing classes",
    "The application, examination, objection and opposition stages",
    "Official fees as published by IP India, and how they differ from professional fees",
    "Renewal, use of the ® symbol, and the mistakes that cost applicants their mark",
  ],
  keyTakeaway: {
    heading: "The short answer: how do you register a trademark in India?",
    body: "You apply to the Trade Marks Registry, part of the Office of the Controller General of Patents, Designs and Trade Marks (IP India), on Form **TM-A**, for each class of goods or services you use the mark for. The application is **examined**; if it is accepted it is **advertised** in the Trade Marks Journal, and anyone may **oppose** it within four months. If there is no successful opposition, the mark is registered for **ten years** and can be renewed indefinitely.",
    points: [
      "The official e-filing fee is ₹4,500 per class for an individual, startup or small enterprise, and ₹9,000 per class for anyone else.",
      "Registration is not automatic and no one can guarantee it, or how long it will take.",
      "Use the ® symbol only once the mark is registered. Before that, ™ is commonly used to signal a claim.",
    ],
  },
  body: [
    {
      kind: "p",
      text: "Founders often assume that once a company or firm is registered under a name, the name is theirs. It is not, in the sense that matters for a brand. Company registration stops another company registering an identical name; it does not stop a business of any kind from trading under that name as a brand. That right comes from a trade mark, under the Trade Marks Act, 1999.",
    },

    { kind: "h2", id: "what", text: "What does a trade mark protect?" },
    {
      kind: "answer",
      text: "A trade mark is a sign that identifies the goods or services of one business as distinct from others: a word, a name, a logo, a combination of these, and in some cases a shape, colour combination or sound. Registration gives the owner the exclusive right to use it for the goods or services it is registered for, and the right to sue for infringement.",
    },
    {
      kind: "table",
      caption: "Four things that are often confused",
      columns: ["", "What it covers", "Where it comes from"],
      rows: [
        ["Company or LLP name", "The legal entity's name on the register", "Ministry of Corporate Affairs, on incorporation"],
        ["Trade mark", "A brand used on goods or services, in specified classes", "Trade Marks Registry, on registration"],
        ["Copyright", "Original creative work, such as logo artwork, text or software", "Arises on creation; can be registered with the Copyright Office"],
        ["Domain name", "An internet address", "A domain registrar, by contract; it is not an intellectual property right"],
      ],
      rowHeader: true,
    },
    {
      kind: "note",
      title: "Word mark or logo mark?",
      text: "A **word mark** protects the name itself, in any font or style. A **logo** or device mark protects the design as filed. A word mark is usually broader, because it covers the name however it is written. Many businesses file both, as separate applications.",
    },

    { kind: "h2", id: "search", text: "Why search before applying?" },
    {
      kind: "p",
      text: "An application can be refused, or opposed, because a similar mark already exists for similar goods or services. Searching first tells you whether the mark you want is realistic before you spend fees, print packaging or build a brand around it. IP India provides a public trade mark search through its online services. Search for the exact mark, for spelling and phonetic variants, and in each class you intend to file in.",
    },
    {
      kind: "p",
      text: "Raulji Group runs this kind of screen on a proposed business name when registering a company, LLP, firm or proprietorship, because a name that conflicts with a registered trade mark can cause trouble even after the entity is registered.",
    },

    { kind: "h2", id: "classes", text: "How do trade mark classes work?" },
    {
      kind: "answer",
      text: "Goods and services are divided into **45 classes** under the international Nice Classification: classes 1 to 34 for goods and 35 to 45 for services. A mark is registered only for the classes, and the goods or services within them, that the application names.",
    },
    {
      kind: "p",
      text: "Fees are charged per class. A bakery selling packaged biscuits and running a café would usually look at class 30 for the biscuits and class 43 for the café service. A software company might look at class 9 for downloadable software and class 42 for software services. These are examples of how the classes divide, not a recommendation for any business; describe your actual goods and services and check the classification before filing.",
    },
    {
      kind: "warning",
      title: "Do not describe everything, or too little",
      text: "Listing goods you will never sell invites objections and opposition. Listing too narrowly leaves the products you add later unprotected. Describe what you sell and what you realistically plan to sell.",
    },

    { kind: "h2", id: "applicant", text: "Who should be the applicant?" },
    {
      kind: "p",
      text: "The applicant is the owner of the mark, so choose deliberately. A proprietor can apply in their own name. A partnership firm, LLP or company applies in its own name. The fee depends on the applicant: the lower fee applies to an individual, a startup recognised as such, and a small enterprise, which generally means providing supporting proof such as Udyam registration or startup recognition when asked.",
    },
    {
      kind: "p",
      text: "If the mark belongs to the company but is filed in a director's personal name, the company does not own its own brand. Fixing that later requires an assignment.",
    },

    { kind: "h2", id: "documents", text: "What information does the application need?" },
    {
      kind: "checklist",
      title: "Commonly needed for Form TM-A",
      items: [
        "Applicant's name, address and legal status (individual, firm, LLP, company)",
        "The mark: the word, or a clear image of the logo",
        "The class or classes, and a description of the goods or services",
        "Whether the mark is already in use and from what date, or is proposed to be used",
        "Evidence of use from that date, if you claim prior use",
        "Proof supporting the lower fee category, where claimed",
        "A power of attorney (Form TM-48), if an agent files for you",
      ],
    },

    { kind: "h2", id: "process", text: "How does the application process work?" },
    {
      kind: "steps",
      items: [
        {
          title: "File Form TM-A",
          body: "File online through IP India's e-filing service and pay the fee for each class. The application receives a number and its filing date, which matters later.",
        },
        {
          title: "Examination",
          body: "An examiner checks the application against the Act: whether the mark is distinctive, whether it is merely descriptive, and whether it conflicts with earlier marks. The result is an examination report.",
        },
        {
          title: "Reply to any objection",
          body: "If the report raises objections, the applicant has one month from receiving it to file a reply. A hearing may follow. An unanswered objection can lead to the application being treated as abandoned.",
        },
        {
          title: "Advertisement",
          body: "An accepted application is published in the Trade Marks Journal, so the public can see it.",
        },
        {
          title: "Opposition window",
          body: "Under section 21 anyone may oppose within **four months** of advertisement. If opposed, the applicant files a counter-statement within two months, and the matter proceeds with evidence and a hearing.",
        },
        {
          title: "Registration",
          body: "With no opposition, or once an opposition is decided in the applicant's favour, the mark is registered and a certificate issued.",
        },
      ],
    },
    {
      kind: "note",
      title: "How long does it take?",
      text: "There is no fixed time. It depends on the Registry's workload, whether objections are raised, and whether anyone opposes. Be wary of anyone who promises a date, or promises registration at all.",
    },

    { kind: "h2", id: "fees", text: "What are the official fees?" },
    {
      kind: "table",
      caption: "Official fees per class, as published by IP India (e-filing)",
      columns: ["Form and purpose", "Individual, startup or small enterprise", "All other applicants"],
      rows: [
        ["TM-A: application for registration", "₹4,500", "₹9,000"],
        ["TM-O: notice of opposition or counter-statement", "₹2,700", "₹2,700"],
        ["TM-R: renewal of registration", "₹9,000", "₹9,000"],
        ["TM-R with surcharge: late renewal", "₹4,500 plus the renewal fee", "₹4,500 plus the renewal fee"],
      ],
      rowHeader: true,
    },
    {
      kind: "p",
      text: "These are government fees. Physical filing costs more. Anything a firm or agent charges on top is a professional fee for their work, such as searching, drafting the specification or replying to objections, and should be quoted separately so you can see the difference.",
    },

    { kind: "h2", id: "after", text: "What happens after registration?" },
    {
      kind: "list",
      items: [
        "**Term.** Registration lasts ten years and can be renewed for further ten-year periods, indefinitely, under section 25. Renew on Form TM-R before expiry; a late renewal carries a surcharge.",
        "**The ® symbol.** Use ® only for a registered mark. Representing an unregistered mark as registered is an offence under the Act. Before registration, ™ is commonly used to signal that you claim the mark.",
        "**Use it.** A registered mark that is not used for a continuous period can be vulnerable to removal for non-use.",
        "**Watch for conflicts.** Registration does not police itself. Owners watch the Journal and the market, and act against infringement.",
        "**Record changes.** If the owner's name or address changes, or the mark is assigned to another owner, the register should be updated.",
      ],
    },

    { kind: "h2", id: "mistakes", text: "Which mistakes cost applicants their mark?" },
    {
      kind: "list",
      items: [
        "**Choosing a descriptive name.** A mark that describes the product, such as a quality or a place, is hard to register. An invented or arbitrary word is easier to protect.",
        "**Skipping the search**, then building a brand on a mark someone else registered first.",
        "**Filing in the wrong name**, such as a director's instead of the company's.",
        "**Missing a deadline** to reply to an examination report or an opposition.",
        "**Claiming a use date you cannot prove.**",
        "**Believing promises.** No one can guarantee registration or a timeline. Offers of instant or guaranteed trademarks describe filing, not registration.",
      ],
    },
    {
      kind: "links",
      title: "Related reading",
      items: [
        {
          href: "/blog/how-to-choose-business-structure-india/",
          label: "How to choose a business structure",
          blurb: "Decide who will own the business, and therefore the brand, before you file.",
        },
        {
          href: "/blog/common-business-registration-mistakes-india/",
          label: "Common registration mistakes",
          blurb: "Including falling for a name before checking it.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Is registering a company name the same as registering a trademark?",
      a: "No. Company registration gives the entity its legal name on the MCA register. A trade mark, registered with the Trade Marks Registry, gives the right to stop others using a similar brand for similar goods or services.",
    },
    {
      q: "How much does trademark registration cost in India?",
      a: "The official e-filing fee for Form TM-A is ₹4,500 per class for an individual, startup or small enterprise and ₹9,000 per class for other applicants, as published by IP India. Professional fees, if you use an agent, are separate.",
    },
    {
      q: "How many classes are there?",
      a: "Forty-five, under the Nice Classification: 1 to 34 for goods and 35 to 45 for services. You pay for each class you apply in.",
    },
    {
      q: "Can I use the ® symbol after filing?",
      a: "No. Use ® only after the mark is registered. Representing an unregistered mark as registered is an offence under the Trade Marks Act. The ™ symbol is commonly used to show a claim before registration.",
    },
    {
      q: "How long is a trademark registration valid?",
      a: "Ten years, renewable for further periods of ten years under section 25 of the Act, on Form TM-R.",
    },
    {
      q: "What is the difference between an objection and an opposition?",
      a: "An objection is raised by the examiner in the examination report, and the applicant replies within one month. An opposition is filed by a third party within four months of the mark being advertised in the Trade Marks Journal.",
    },
    {
      q: "Can anyone guarantee my trademark will be registered?",
      a: "No. The outcome depends on the mark, the goods or services, earlier marks on the register, and any opposition. A provider can file an application; registration is decided by the Registry.",
    },
    {
      q: "Does Raulji Group file trademark applications?",
      a: "No, we do not file trade mark applications. We screen a proposed business name against registered trade marks when we register a company, LLP, firm or proprietorship, so the entity does not start life with a name conflict. For a trade mark application itself, use a registered trademark agent or an advocate.",
    },
  ],
  related: [
    "how-to-choose-business-structure-india",
    "common-business-registration-mistakes-india",
    "documents-required-company-registration-india",
  ],
  services: [
    {
      href: "/services/business-registration/",
      label: "Business Registration",
      blurb: "Company, LLP, firm and proprietorship registration, with the name screened against registered trade marks.",
    },
    {
      href: "/gujarat/",
      label: "Business registration across Gujarat",
      blurb: "Where we work, with city pages for the main markets.",
    },
    {
      href: "/contact/",
      label: "Talk to us",
      blurb: "About the structure and name before you build a brand on it.",
    },
  ],
  sources: [
    {
      label: "IP India: Trade Marks, forms and official fees",
      url: "https://ipindia.gov.in/pages/trade-marks/learn/forms-and-official-fees",
      supports: "Fees for Forms TM-A, TM-O and TM-R, e-filing and physical, as read on 23 October 2026.",
    },
    {
      label: "Office of the Controller General of Patents, Designs and Trade Marks",
      url: "https://ipindia.gov.in/",
      supports: "Filing, examination, advertisement in the Trade Marks Journal and the public search facility.",
    },
    {
      label: "WIPO: Nice Classification",
      url: "https://www.wipo.int/classifications/nice/en/",
      supports: "The 45 classes of goods and services.",
    },
    {
      label: "Trade Marks Act, 1999, section 21, as published by Indian Kanoon",
      url: "https://indiankanoon.org/doc/1056401/",
      supports: "Four months to oppose after advertisement, and two months for the counter-statement.",
    },
  ],
  disclaimer:
    "This article explains the trade mark process and IP India's official fees as checked on 23 October 2026. It is not legal advice. Raulji Group does not file trade mark applications; for an application, objection or opposition, consult a registered trademark agent or an advocate.",
  cta: {
    title: "Choosing a name for a new business?",
    body: "When we register your company, LLP, firm or proprietorship, we screen the proposed name against registered trade marks first, so the business does not start with a name conflict.",
  },
};
