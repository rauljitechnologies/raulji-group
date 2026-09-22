import type { Article } from "../types";
import { INSURANCE_AUTHOR } from "../authors";

export const healthInsurance: Article = {
  slug: "health-insurance-policy-guide-india",
  title: "Health Insurance in India: What to Check Before Choosing a Policy",
  metaTitle: "Health Insurance in India: What to Check Before Buying | Raulji Group",
  metaDescription:
    "Sum insured, waiting periods, exclusions, co-payment, sub-limits and the claim process, and what the current IRDAI rules say you are entitled to.",
  excerpt:
    "Most disappointment with a health policy comes from terms that were in the document all along. Here is what to read before you buy, and where to find it.",
  category: "Insurance Awareness",
  seriesMonth: "September",
  published: "2026-09-22",
  updated: "2026-09-22",
  readMinutes: 11,
  primaryKeyword: "health insurance",
  secondaryKeywords: [
    "health insurance policy",
    "health insurance waiting period",
    "health insurance exclusions",
    "health insurance claim process",
    "Customer Information Sheet health insurance",
    "medical insurance India",
  ],
  searchIntent:
    "Informational. A buyer or an existing policyholder trying to understand terms before a purchase or a renewal.",
  author: INSURANCE_AUTHOR,
  image: "health-insurance",
  covers: [
    "What the sum insured actually covers, and what sits outside it",
    "Waiting periods, including the limits the IRDAI rules place on them",
    "Co-payment, sub-limits and room rent limits, which decide what you pay even on an admitted claim",
    "How cashless treatment works and what the authorisation timelines are",
    "The Customer Information Sheet, and how to read a policy in ten minutes using it",
  ],
  keyTakeaway: {
    heading: "The short answer",
    body: "Read the Customer Information Sheet before you buy. Insurers are required to provide it, it is short, and it sets out the sum insured, waiting periods, exclusions, co-payment, sub-limits, the free look period, portability and how to claim. Almost every unpleasant surprise at claim time is described in that document.",
    points: [
      "Under the IRDAI rules, the maximum waiting period for pre-existing diseases in a health policy is 36 months.",
      "After 60 continuous months of coverage, the moratorium applies and a claim cannot be rejected on grounds of non-disclosure or misrepresentation, except where fraud is established.",
      "Sub-limits, room rent limits and co-payment reduce what you receive on a claim the policy has accepted. They matter as much as the sum insured.",
      "Disclose your medical history accurately. Non-disclosure is the most common reason a claim runs into trouble, and it is entirely within your control.",
    ],
  },
  body: [
    {
      kind: "p",
      text: "Health insurance is bought once and read properly much later, usually in a hospital corridor. That is the wrong order, and it accounts for most of the frustration people feel with their policies. The terms that disappoint at claim time are rarely hidden: they sit in a summary the insurer is required to give you, in plain language.",
    },
    {
      kind: "p",
      text: "This article explains the terms that decide what you actually get, and where to check each one for a specific policy. It does not recommend an insurer or a product: the right cover depends on your age, your health history, your family and where you would be treated.",
    },

    { kind: "h2", id: "what-it-is", text: "What is health insurance, and what does it actually pay for?" },
    {
      kind: "answer",
      text: "A health insurance policy is a contract under which the insurer agrees to pay the covered medical expenses of the insured persons, up to the sum insured, for the events and conditions the policy covers, subject to its waiting periods, exclusions and limits.",
    },
    {
      kind: "p",
      text: "Most policies are built around hospitalisation. The core cover is expenses incurred during an admission, with defined extras around it: pre-hospitalisation and post-hospitalisation expenses for a stated number of days, day care procedures that need no 24-hour stay, ambulance charges up to a limit, and in many policies AYUSH treatment.",
    },
    {
      kind: "p",
      text: "What is generally not covered is ordinary outpatient consultation and medicine, unless the policy specifically provides for it. That is the single most common mismatch between what people assume they have bought and what the contract says.",
    },

    { kind: "h2", id: "sum-insured", text: "How much sum insured is enough?" },
    {
      kind: "answer",
      text: "The sum insured is the maximum the insurer will pay in a policy year. There is no universally correct figure. What matters is whether it is realistic against the cost of treatment at the hospitals you would actually use.",
    },
    {
      kind: "p",
      text: "Treatment costs vary widely between cities and between hospitals in the same city. A figure that is comfortable in a tier-two town may not cover one significant admission at a large private hospital in a metro. Rather than picking a round number, ask what a serious admission would cost where you would actually go.",
    },
    {
      kind: "p",
      text: "A family floater shares one sum insured across everyone covered, which is efficient but means one large claim can exhaust the cover for the rest of the year. Restoration benefits and no-claim bonuses can add to the sum insured, each on conditions set out in the policy. Read what triggers them rather than assuming.",
    },

    { kind: "h2", id: "waiting-periods", text: "What are waiting periods, and how long can they be?" },
    {
      kind: "answer",
      text: "A waiting period is a defined stretch of time from the start of cover during which certain claims are not payable. Under the IRDAI rules, the maximum waiting period applicable under a health insurance policy is 36 months, and that is the ceiling for pre-existing diseases.",
    },
    {
      kind: "table",
      caption: "The waiting periods commonly found in a health insurance policy.",
      columns: ["Type", "What it applies to", "What to check"],
      rows: [
        [
          "Initial waiting period",
          "Usually the first 30 days, during which claims other than accidental injury are not payable.",
          "The exact period, and the exceptions stated for accidents.",
        ],
        [
          "Specific illness waiting period",
          "Named conditions and procedures, often cataract, hernia and joint replacement.",
          "The full list, and the period for each. It differs a lot between products.",
        ],
        [
          "Pre-existing disease waiting period",
          "Conditions you had before the policy started. The maximum permitted is 36 months.",
          "The period in your policy, and what it treats as pre-existing.",
        ],
        [
          "Maternity waiting period",
          "Maternity benefits, where the policy provides them at all.",
          "Whether the benefit exists at all, the period, and any limit on the amount.",
        ],
      ],
    },
    {
      kind: "note",
      title: "Waiting periods are earned, and they travel",
      text: "Waiting periods run with continuous coverage. Port to another insurer at renewal and the credit you have built for waiting periods and the moratorium carries across for the ported sum insured. A lapse is what puts that credit at risk, which is why a renewal date matters more than most people treat it.",
    },

    { kind: "h2", id: "pre-existing", text: "How are pre-existing conditions treated?" },
    {
      kind: "answer",
      text: "A pre-existing condition is generally one diagnosed or treated before the policy started, as defined in the policy. It is subject to the pre-existing disease waiting period, which cannot exceed 36 months under the IRDAI rules. What matters most is that it is disclosed accurately at the proposal stage.",
    },
    {
      kind: "p",
      text: "Non-disclosure causes more difficulty at claim time than anything else, and it is entirely within the buyer's control. Declaring a condition may mean a higher premium, a specific exclusion or a waiting period. Not declaring it lets the insurer question the claim on the basis that the contract was entered into on incorrect information.",
    },
    {
      kind: "p",
      text: "There is a protection here. After 60 continuous months of coverage the moratorium applies: the policy cannot be contested on grounds of non-disclosure or misrepresentation, except where fraud is established. The period was reduced to 60 months under the IRDAI (Insurance Products) Regulations, 2024. It runs on the sum insured that has completed it, so a later enhancement has its own clock.",
    },
    {
      kind: "warning",
      title: "Declare, in writing, at the proposal stage",
      text: "Tell the insurer about diagnoses, ongoing medication, surgeries and hospital admissions, and keep a copy of what you submitted. Where an agent fills the proposal form on your behalf, read it before signing. A form that understates your history is a problem you will meet later, not one that goes away.",
    },

    { kind: "h2", id: "exclusions", text: "What is excluded?" },
    {
      kind: "p",
      text: "Every policy carries permanent exclusions: the things it will never pay for, however long you hold it. The list is in the policy document and summarised in the Customer Information Sheet, and it is worth reading once properly rather than skimming.",
    },
    {
      kind: "p",
      text: "Beyond them, some categories of expense are commonly not payable: items classed as non-medical consumables, treatment outside the scope of the cover, and expenses unrelated to the admitted condition. Regulatory work has standardised much of this, but the specific list still varies by product.",
    },

    { kind: "h2", id: "co-payment", text: "Co-payment, sub-limits and room rent: what you pay on an accepted claim" },
    {
      kind: "answer",
      text: "These three features reduce what you receive even when the claim is admitted. Co-payment is a fixed share of each claim you bear yourself. A sub-limit caps the amount payable for a specific treatment or expense. A room rent limit caps the category of room the policy will pay for.",
    },
    {
      kind: "p",
      text: "The room rent limit deserves particular attention because its effect is indirect. In many hospitals the rate charged for associated services is linked to the room category, so choosing a room above your policy's limit can reduce what is payable across the wider bill, not only on the room charge. Find out what the limit is in rupees or as a percentage, and check it against the hospital you would use.",
    },
    {
      kind: "example",
      title: "Why this is worth checking before you buy",
      text: "Two policies with the same sum insured and a similar premium behave very differently at claim time if one carries a co-payment and a room rent limit and the other carries neither. The premium tells you nothing about that. The Customer Information Sheet tells you in one line each.",
    },

    { kind: "h2", id: "network", text: "Network hospitals and cashless treatment" },
    {
      kind: "answer",
      text: "A network hospital is one with which the insurer has an arrangement to settle bills directly, which is what makes cashless treatment possible. Treatment at a non-network hospital is generally handled by reimbursement: you pay, then claim.",
    },
    {
      kind: "p",
      text: "Before buying, check the insurer's network list for the hospitals you would use, in your own city. A large national network is no help if the two you would go to are outside it, and networks change, so re-check at renewal.",
    },
    {
      kind: "p",
      text: "The IRDAI Master Circular on Health Insurance Business sets timelines for cashless decisions: authorisation within one hour of the request, and final authorisation at discharge within three hours of the hospital's discharge request. Those are the timelines you can hold an insurer to, and they are worth knowing before you are standing at a billing counter.",
    },

    { kind: "h2", id: "claims", text: "How does the claim process work?" },
    {
      kind: "steps",
      items: [
        {
          title: "Planned admission: seek pre-authorisation",
          body: "The hospital submits a pre-authorisation request to the insurer or its third-party administrator before admission. Give the hospital your policy details and identification.",
        },
        {
          title: "Emergency admission: intimate promptly",
          body: "Inform the insurer within the period the policy specifies, usually stated in hours from admission. The hospital desk often starts this, but the obligation is the policyholder's.",
        },
        {
          title: "During treatment",
          body: "Keep the paperwork: prescriptions, reports, discharge summary and itemised bills. A reimbursement claim stands or falls on it.",
        },
        {
          title: "At discharge",
          body: "The hospital submits the final request and the insurer authorises settlement. Anything the policy does not cover, including co-payment, non-medical items and charges above a sub-limit, is payable by you at the counter.",
        },
        {
          title: "Reimbursement claims",
          body: "Submit the claim form with the original documents within the period the policy allows, and follow up in writing so there is a record of what was sent and when.",
        },
        {
          title: "If a claim is rejected or short-paid",
          body: "Ask for the reason in writing against the specific policy clause relied on. Insurers are required to have a grievance redressal process, and the Insurance Ombudsman is available where that does not resolve it.",
        },
      ],
    },

    { kind: "h2", id: "cis", text: "The Customer Information Sheet: read this first" },
    {
      kind: "answer",
      text: "The Customer Information Sheet is a standardised summary that insurers are required to provide with a health insurance policy. It sets out the type of policy, sum insured, what is covered, waiting periods, exclusions, sub-limits and co-payment, the free look period, portability, how to claim and where to complain.",
    },
    {
      kind: "p",
      text: "It exists so that a buyer does not have to work through a long policy wording to find the terms that matter. If you do one thing before buying or renewing, read it end to end. It is short.",
    },
    {
      kind: "p",
      text: "Note the free look period too. After receiving the policy document you have a window to review the terms and return the policy, with a refund adjusted as the rules provide. Under the current rules that period is 30 days, running from receipt of the document.",
    },
    {
      kind: "checklist",
      title: "Eight things to check in the Customer Information Sheet",
      items: [
        "The sum insured, and whether it is individual or shared as a family floater",
        "The pre-existing disease waiting period, and the specific illnesses with their own",
        "The permanent exclusions",
        "Any co-payment, and whether it applies to every claim",
        "Any sub-limits, and any room rent or ICU limit",
        "Whether AYUSH treatment is covered, and on what terms",
        "Pre-hospitalisation and post-hospitalisation cover, and for how many days",
        "Claim intimation timelines, and the grievance redressal contacts",
      ],
    },

    { kind: "h2", id: "mistakes", text: "Common mistakes when buying health insurance" },
    {
      kind: "list",
      items: [
        "**Buying on premium alone.** Two policies at a similar price can differ sharply on co-payment, sub-limits and room rent limits, which decide what you actually receive.",
        "**Not disclosing medical history.** The most avoidable problem in the whole process, and the hardest to fix afterwards.",
        "**Relying only on employer cover.** Group cover usually ends with the employment, often when an individual policy is hardest to buy. One held alongside it keeps your waiting period credit building.",
        "**Letting a policy lapse.** Continuity is what earns waiting period and moratorium credit. A lapse can reset work that took years.",
        "**Choosing a sum insured by habit.** Check it against what treatment actually costs at the hospitals you would use.",
        "**Not checking the network.** A large network nationally is irrelevant if your two local hospitals are outside it.",
        "**Assuming outpatient treatment is covered.** Usually it is not, unless the policy specifically provides for it.",
      ],
    },

    { kind: "h2", id: "questions", text: "Questions to ask before you buy" },
    {
      kind: "checklist",
      title: "Ask the insurer or the intermediary, and get the answers in writing",
      items: [
        "What is the pre-existing disease waiting period under this specific policy?",
        "Which conditions carry their own waiting period, and how long is each?",
        "Is there a co-payment, and does it apply to every claim?",
        "Are there sub-limits, and is there a room rent or ICU limit?",
        "Which hospitals in my city are in the network, today?",
        "What is excluded permanently?",
        "On what basis can the premium be revised as I get older?",
      ],
    },
    {
      kind: "p",
      text: "If an intermediary cannot answer those from the policy document, that tells you something about the advice you are receiving. Every one of them has a written answer.",
    },
  ],
  faqs: [
    {
      q: "What is the maximum waiting period for pre-existing diseases in health insurance?",
      a: "Under the IRDAI rules the maximum waiting period applicable under a health insurance policy is 36 months, which is the ceiling for pre-existing diseases. A policy may specify a shorter period, so check the figure in your own Customer Information Sheet.",
    },
    {
      q: "What is the moratorium period in health insurance?",
      a: "After 60 continuous months of coverage, a policy cannot be contested on grounds of non-disclosure or misrepresentation, except where fraud is established. The period was set at 60 months under the IRDAI (Insurance Products) Regulations, 2024, and applies to the sum insured that has completed it, so a later enhancement carries its own.",
    },
    {
      q: "What is a Customer Information Sheet?",
      a: "A standardised summary that insurers are required to provide with a health insurance policy, covering the type of policy, sum insured, waiting periods, exclusions, sub-limits, co-payment, the free look period, portability, the claim procedure and grievance contacts. It is the quickest reliable way to understand what a policy does.",
    },
    {
      q: "How quickly must an insurer approve a cashless claim?",
      a: "The IRDAI Master Circular on Health Insurance Business provides for authorisation within one hour of receiving a cashless request, and final authorisation at discharge within three hours of receiving the hospital's discharge request.",
    },
    {
      q: "What is the difference between co-payment and a deductible?",
      a: "A co-payment is a stated share of each admitted claim that you bear yourself, usually a percentage. A deductible is an amount you bear before the policy responds at all. Both are stated in the Customer Information Sheet.",
    },
    {
      q: "Can I change my health insurer without losing my waiting periods?",
      a: "Portability lets you move to another insurer at renewal while carrying across the credit built for waiting periods and the moratorium, for the ported sum insured. It has to be initiated within the timelines the rules prescribe, and coverage has to stay continuous.",
    },
    {
      q: "What can I do if my health insurance claim is rejected?",
      a: "Ask for the reason in writing, with the policy clause relied on. Insurers are required to have a grievance redressal process, and the Insurance Ombudsman is available where that does not resolve it. Keep every document you submitted and a record of the correspondence.",
    },
  ],
  related: [],
  services: [
    {
      href: "/services/insurance/",
      label: "Insurance advisory at Raulji Group",
      blurb:
        "Advisory on the cover a business and its people carry, and support through the claims process.",
    },
    {
      href: "/blog/",
      label: "More from the Raulji Group blog",
      blurb: "Guides on business structures, registration and running a business in India.",
    },
    {
      href: "/contact/",
      label: "Contact Raulji Group",
      blurb: "Talk to us about cover for yourself, your family or your employees.",
    },
  ],
  sources: [
    {
      label: "Insurance Regulatory and Development Authority of India, Health Department",
      url: "https://irdai.gov.in/health-dept",
      supports:
        "Current health insurance regulations and guidance, including the Master Circular of 29 May 2024.",
    },
    {
      label: "IRDAI Master Circular on Health Insurance Business, 29 May 2024",
      url: "https://irdai.gov.in/",
      supports:
        "Cashless authorisation within one hour, final authorisation at discharge within three hours, and policyholder entitlements including the Customer Information Sheet.",
    },
    {
      label: "IRDAI (Insurance Products) Regulations, 2024",
      url: "https://irdai.gov.in/",
      supports:
        "Maximum waiting period of 36 months, the 60-month moratorium, and the 30-day free look period.",
    },
  ],
  disclaimer:
    "This article is for general informational purposes only and is not insurance advice or a recommendation of any product or insurer. Policy terms, waiting periods, exclusions and regulatory provisions change, and cover varies between products. Read the Customer Information Sheet and the policy document, and verify current terms with the insurer or a licensed intermediary before making a decision. Raulji Group does not underwrite insurance; claim decisions rest with the insurer.",
  cta: {
    title: "Want help reading a policy before you commit to it?",
    body: "Send us the Customer Information Sheet and we will go through the waiting periods, exclusions, co-payment and limits with you, so you know what you are buying.",
  },
};
