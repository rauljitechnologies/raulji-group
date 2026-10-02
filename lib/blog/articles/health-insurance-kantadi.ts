import type { Article } from "../types";
import { INSURANCE_AUTHOR } from "../authors";

/**
 * Village guide: Moti Kantadi, Nani Kantadi and Ratanpur (Kantdi), Godhra
 * taluka.
 *
 * Three villages that share a name, grouped into one page rather than three
 * near-identical ones. The spelling varies (Kantadi, Kantdi, Katdi), and the
 * page says so once, which is the honest way to meet those searches.
 *
 * Angle: health insurance for parents and senior citizens, which the cluster
 * otherwise covers only in short sections. PM-JAY is described in outline,
 * with eligibility left to the official portal.
 */
export const healthInsuranceKantadi: Article = {
  slug: "health-insurance-kantadi-panchmahal",
  title: "Health Insurance in Moti Kantadi, Nani Kantadi and Ratanpur: A Guide to Cover for Parents",
  metaTitle: "Health Insurance in Moti Katdi & Ratanpur | Cover for Parents",
  metaDescription:
    "Health insurance for parents and senior citizens in Moti Kantadi, Nani Kantadi and Ratanpur (Kantdi): age limits, co-payment, existing conditions and PM-JAY.",
  excerpt:
    "Parents are often the members of a household who need health cover most and have it least. This guide, for families in the Kantadi villages, explains what changes when the person to be covered is older.",
  category: "Insurance Awareness",
  published: "2026-10-03",
  updated: "2026-10-03",
  readMinutes: 6,
  primaryKeyword: "health insurance Moti Katdi",
  secondaryKeywords: [
    "health insurance Ratanpur Kantdi",
    "health insurance Nani Katdi",
    "senior citizen health insurance Panchmahal",
    "health insurance for parents Panchmahal",
    "medical insurance Panchmahal",
  ],
  searchIntent:
    "Informational with local intent. A family in the Kantadi villages looking for health cover for parents or older relatives.",
  author: INSURANCE_AUTHOR,
  image: "health-insurance-kantadi",
  covers: [
    "Whether parents can still buy health insurance, at any age",
    "What changes for older applicants: premium, co-payment, check-ups",
    "Existing conditions, disclosure and waiting periods",
    "How PM-JAY and a private policy can work together for people aged 70 and above",
  ],
  keyTakeaway: {
    heading: "Quick answer",
    body: "**Can parents in Moti Kantadi or Ratanpur still get health insurance?** Yes. The IRDAI rules no longer set an upper age limit for buying health insurance. For an older parent, expect a higher premium, possibly a co-payment and a medical check-up, and a waiting period for any condition they already have. Declaring every condition honestly matters most. Families should also check eligibility for Ayushman Bharat PM-JAY, which has been extended to all citizens aged 70 and above.",
  },
  body: [
    {
      kind: "p",
      text: "Moti Kantadi, Nani Kantadi and Ratanpur (Kantdi) are villages in Godhra taluka, Panchmahal district. The name is written several ways, including Kantadi, Kantdi and Katdi; this guide applies to all three villages.",
    },
    {
      kind: "p",
      text: "Its subject is the person in many households who is hardest to insure and most likely to need it: an older parent. It does not recommend an insurer or product.",
    },

    { kind: "h2", id: "options", text: "Health insurance options for parents and senior citizens" },
    {
      kind: "answer",
      text: "An older parent can be covered by an individual policy, by a policy designed for senior citizens, or as a member of a family floater. Most families find a separate policy for parents more practical, because their claims then do not draw down cover the rest of the family relies on.",
    },
    {
      kind: "p",
      text: "The IRDAI rules no longer set an upper age limit for buying a health policy, so a parent in their sixties or seventies can apply. What age changes is the terms, not whether cover is possible.",
    },
    { kind: "insuranceCta" },

    { kind: "h2", id: "what-changes", text: "What changes when the person to be covered is older" },
    {
      kind: "list",
      items: [
        "**Premium.** Health premiums rise with age, and the premium for a parent will be noticeably higher than for a younger member.",
        "**Co-payment.** Policies for older buyers often require the policyholder to pay a share of each claim. A lower premium sometimes comes with a higher co-payment.",
        "**Medical check-up.** Some insurers ask for tests before accepting an older applicant.",
        "**Room rent limits and sub-limits.** These affect what is paid on every claim, and older members claim more often, so check them carefully.",
      ],
    },

    { kind: "h2", id: "conditions", text: "Pre-existing diseases and waiting periods" },
    {
      kind: "answer",
      text: "Conditions a parent already has, such as diabetes or high blood pressure, must be declared on the proposal form. Once declared, they are covered after the pre-existing disease waiting period, which cannot exceed 36 months under the IRDAI rules.",
    },
    {
      kind: "p",
      text: "For a parent with an existing condition, the length of this waiting period often matters more than the sum insured. A policy with a shorter period may be worth a higher premium.",
    },
    {
      kind: "warning",
      title: "Declare everything, even if it is under control",
      text: "A condition kept under control with medicine is still a condition to declare. Leaving it out gives the insurer grounds to question a related claim later. After 60 continuous months of cover, the moratorium applies and a policy cannot be contested for non-disclosure except where fraud is established.",
    },

    { kind: "h2", id: "pmjay", text: "PM-JAY for people aged 70 and above" },
    {
      kind: "p",
      text: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) is a government scheme that provides health cover of up to ₹5 lakh per family per year for hospitalisation at empanelled hospitals. The scheme has been extended to all citizens aged 70 and above, whatever their income. Eligibility, enrolment and the list of empanelled hospitals are on the official PM-JAY portal.",
    },
    {
      kind: "p",
      text: "PM-JAY and a private policy can be held together. Some families keep a private policy for a parent to have a wider choice of hospital or a higher combined cover. Knowing what the scheme provides first helps decide whether a private policy is needed and how large.",
    },

    { kind: "h2", id: "check", text: "What to check before choosing a policy for a parent" },
    {
      kind: "checklist",
      title: "Ask, and get the answers in writing",
      items: [
        "The waiting period for each condition the parent already has",
        "Whether there is a co-payment, and how much",
        "Any room rent limit or sub-limit",
        "Whether a medical check-up is needed",
        "Which hospitals in Godhra and Vadodara are in the network",
        "On what basis the premium can change as the parent gets older",
      ],
    },

    { kind: "h2", id: "claims", text: "How health insurance claims generally work" },
    {
      kind: "p",
      text: "At a network hospital the insurer authorises and settles the covered bill directly. Elsewhere, the family pays and claims reimbursement with the bills, reports and discharge summary. For an older parent, keep a list of their conditions and medicines with the policy number, so whoever goes to hospital with them can answer the insurer's questions.",
    },

    { kind: "h2", id: "nearby", text: "Health insurance in the Kantadi villages and nearby Panchmahal areas" },
    {
      kind: "p",
      text: "For how to cover the rest of the household, see the [Kakanpur guide to family and individual policies](/blog/health-insurance-kakanpur-panchmahal/), and for buying step by step, the [guide for villages around Godhra](/blog/health-insurance-villages-godhra-panchmahal/). The district overview is the [Panchmahal health insurance guide](/blog/health-insurance-panchmahal-gujarat/).",
    },
    {
      kind: "p",
      text: "Choosing cover for a parent involves more trade-offs than for anyone else in the family: premium against co-payment, waiting period against sum insured. Families in the Kantadi villages can talk these through with Dharmendrasinh Raulji on WhatsApp or by phone. Raulji Group operates from Vadodara, with no office in these villages, and offers [insurance services](/services/insurance/) that help people understand and arrange cover. The insurer issues the policy and decides any claim.",
    },
  ],
  faqs: [
    {
      q: "Is there an age limit for buying health insurance?",
      a: "The IRDAI rules no longer set an upper age limit for buying health insurance, so older parents can apply. Individual insurers set their own terms, which may include a medical check-up and co-payment.",
    },
    {
      q: "Can my parent get cover for diabetes or blood pressure?",
      a: "Yes, once the condition is declared and the pre-existing disease waiting period has passed. Under the IRDAI rules that period cannot exceed 36 months; the policy states the period it applies.",
    },
    {
      q: "What is co-payment in a senior citizen policy?",
      a: "A share of each claim that the policyholder pays, usually a percentage. It is common in policies for older buyers and reduces what the insurer pays on every claim.",
    },
    {
      q: "Is PM-JAY available to everyone aged 70 and above?",
      a: "The scheme has been extended to all citizens aged 70 and above, whatever their income. Check enrolment and the empanelled hospitals on the official PM-JAY portal.",
    },
    {
      q: "Should parents be on the family floater or a separate policy?",
      a: "A separate policy is often more practical. On a floater, a parent's claims draw down the shared sum insured, and the premium is usually driven by the oldest member.",
    },
    {
      q: "Is this guide for Moti Katdi and Ratanpur Kantdi?",
      a: "Yes. Moti Kantadi, Nani Kantadi and Ratanpur (Kantdi) are written several ways, including Katdi and Kantdi. The guide applies to all three villages in Godhra taluka.",
    },
  ],
  related: [
    "health-insurance-villages-godhra-panchmahal",
    "health-insurance-kakanpur-panchmahal",
    "health-insurance-tuwa-panchmahal",
    "health-insurance-panchmahal-gujarat",
  ],
  services: [
    {
      href: "/services/insurance/",
      label: "Insurance services at Raulji Group",
      blurb: "Help understanding and arranging cover, and support through the claims process.",
    },
    {
      href: "/blog/health-insurance-policy-guide-india/",
      label: "Health insurance in India",
      blurb: "Every policy term explained, and how to read the Customer Information Sheet.",
    },
    {
      href: "/contact/",
      label: "Contact Raulji Group",
      blurb: "Other questions about Raulji Group and its services.",
    },
  ],
  sources: [
    {
      label: "IRDAI (Insurance Products) Regulations, 2024",
      url: "https://irdai.gov.in/",
      supports: "Removal of the upper age limit for buying health insurance, the 36-month maximum pre-existing disease waiting period and the 60-month moratorium.",
    },
    {
      label: "Ayushman Bharat PM-JAY, National Health Authority",
      url: "https://pmjay.gov.in/",
      supports: "Cover of up to ₹5 lakh per family per year and the extension to all citizens aged 70 and above.",
    },
  ],
  disclaimer:
    "This article is for general information only and is not insurance advice or a recommendation of any insurer or product. Terms for older applicants vary between insurers. Check PM-JAY eligibility on the official portal, read the Customer Information Sheet and policy wording, and confirm current terms before deciding. Raulji Group does not underwrite insurance; claim decisions rest with the insurer.",
  cta: {
    title: "Need help understanding health insurance?",
    body: "Speak directly with Dharmendrasinh Raulji about your health insurance requirement.",
  },
  healthCta: { location: "Kantadi" },
  parent: { slug: "health-insurance-panchmahal-gujarat", label: "Health Insurance in Panchmahal" },
};
