import type { FAQ } from "./services";

/**
 * The general FAQs.
 *
 * These are the questions that are not specific to one registration structure.
 * `/faqs/` renders all of them as its "General" section; the homepage takes the
 * three in `HOME_ANSWERS` below and leaves the rest here.
 *
 * The first two are the entity questions from the brief's AEO section. They are
 * written literally and short because an answer engine wants one unambiguous
 * sentence about what this organisation is and what it sells. Nothing in either
 * is a claim that would need verifying: the group's own account of itself, and
 * a list of the four registration services that have pages on this site.
 */
export const GENERAL_FAQS: FAQ[] = [
  {
    q: "What does Raulji Group do?",
    a: "Raulji Group provides business consulting, business registration, business structuring and related business solutions for entrepreneurs and businesses. It works through two brands: Raulji Consulting Services, which covers the consulting and business-services work on this site, and Raulji Technologies, the group's technology brand, which operates on its own website.",
  },
  {
    q: "What business registration services does Raulji Group provide?",
    a: "Four: Private Limited Company Registration, LLP Registration, Partnership Firm Registration and Proprietorship Registration. Each has its own page covering eligibility, documents, process and cost. Raulji Group prepares and files these applications on your behalf; it is a private business-services firm, not a government department.",
  },
  {
    q: "Is Raulji Group a government agency?",
    a: "No. Raulji Group is a private business-services firm. We are not a government department and are not affiliated with the Ministry of Corporate Affairs, the GST department or any other authority. We prepare and file applications on your behalf, and approval always rests with the relevant authority.",
  },
  {
    q: "Which business structure should I choose?",
    a: "It depends on three things: whether you will have co-owners, whether you intend to raise outside investment, and how much liability the business carries. A single owner starting small usually begins as a proprietorship. Two or more people who want liability capped generally choose an LLP. Founders planning to raise equity or issue ESOPs need a Private Limited Company, because it is the only one of the four that can issue shares.",
  },
  {
    q: "How long does business registration take in India?",
    a: "With complete documents, a Private Limited Company commonly takes around 7 to 12 working days and an LLP around 7 to 10. A partnership deed can be executed within a few days, with Registrar of Firms timelines varying by state. Proprietorship registrations such as Udyam are often same-day, while GST commonly takes 7 to 15 working days. These are estimates: government processing times vary.",
  },
  {
    q: "What does registration cost?",
    a: "Our professional fee is ₹9,999 for a Private Limited Company and ₹7,999 for an LLP. Government filing fees and stamp duty are payable in addition and depend on the state and the capital involved. For Partnership Firm and Proprietorship registration, the cost depends on which registrations your specific activity needs, so we quote after understanding the business.",
  },
  {
    q: "Do I need to visit your office to register a business?",
    a: "No. Company and LLP incorporation is filed online with the Registrar of Companies, and digital signatures are issued through video and Aadhaar-based verification, so the process can be completed remotely from anywhere in Gujarat. Documents are exchanged digitally. You are welcome to visit us in Vadodara if you prefer to discuss things in person.",
  },
  {
    q: "Can I change my business structure later?",
    a: "Yes. A proprietorship can be moved into a partnership, LLP or company, a partnership firm can convert to an LLP or a company, and an LLP can convert to a company, each subject to conditions in the relevant law. Conversion is not free: it means new registrations, new bank accounts and updating vendor and customer records, so it is worth getting the choice roughly right at the start.",
  },
];

/**
 * The three answers the homepage carries.
 *
 * The homepage used to render all eight of the above in an accordion, which the
 * design brief rules out: it lists a large FAQ among the things that belong on
 * a dedicated page rather than the homepage, and it asks instead for short
 * answer blocks that state what the group is.
 *
 * So the homepage keeps the two entity questions and the one that stops a
 * reader mistaking a private firm for a government body, and sends everything
 * else to `/faqs/`, which still renders all eight. They are taken by reference
 * rather than retyped, so the wording cannot drift between the two pages, and
 * the homepage's FAQPage schema is built from exactly this array, so the markup
 * still matches what is visible on it.
 */
export const HOME_ANSWERS: FAQ[] = [GENERAL_FAQS[0]!, GENERAL_FAQS[1]!, GENERAL_FAQS[2]!];
