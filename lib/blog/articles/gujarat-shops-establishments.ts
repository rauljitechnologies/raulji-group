import type { Article } from "../types";
import { GROUP_AUTHOR } from "../authors";

/**
 * Gujarat Shops and Establishments registration.
 *
 * Section 6 and section 7 were read in the Act's text on 23 Oct 2026: both
 * give sixty days from commencement of business. The only thirty-day period
 * in section 7 is for notifying closure. The older guide on starting a
 * business in Gujarat said thirty days and was corrected in the same change.
 *
 * Fee amounts are deliberately not stated: they were not confirmed against an
 * official schedule, and the portal shows the fee for each application.
 */
export const gujaratShopsEstablishments: Article = {
  slug: "gujarat-shops-establishments-registration",
  title: "Gujarat Shops and Establishments Registration: A Practical Guide",
  metaTitle: "Gujarat Shops and Establishments Registration Guide | Raulji",
  metaDescription:
    "Registration or intimation under Gujarat's Shops and Establishments Act, 2019: who it covers, the ten-worker line, the 60-day deadline, documents and steps.",
  excerpt:
    "Every shop and office in Gujarat has to tell the Inspector it exists. Whether that means a full registration or a short intimation depends on one number: how many workers you employ.",
  category: "Gujarat Business",
  published: "2026-10-23",
  updated: "2026-10-23",
  readMinutes: 9,
  primaryKeyword: "Gujarat Shops and Establishments registration",
  secondaryKeywords: [
    "shop and establishment registration Gujarat",
    "gumasta license Gujarat",
    "Gujarat Shops and Establishments Act 2019",
    "intimation under section 7",
  ],
  searchIntent:
    "Informational with a compliance task attached. A shop or office owner in Gujarat finding out what to file, by when and with whom.",
  author: GROUP_AUTHOR,
  image: "gujarat-shops",
  covers: [
    "Which shops and establishments the Gujarat Act covers",
    "Registration for ten or more workers, intimation for fewer",
    "The 60-day deadline, and the 30-day notice on closing",
    "What the application usually asks for, and where it is filed",
    "How this differs from incorporation, GST and Udyam",
  ],
  keyTakeaway: {
    heading: "The short answer: what does a Gujarat shop or office have to file?",
    body: "Under the Gujarat Shops and Establishments (Regulation of Employment and Conditions of Service) Act, 2019, an establishment with **ten or more workers** must apply for **registration** (section 6), and one with **fewer than ten** must give an **intimation** of commencing business (section 7). Either must be done **within 60 days** of the date the business starts.",
    points: [
      "The Act extends to the whole of Gujarat.",
      "An establishment with fewer than ten workers that grows to ten or more must then obtain registration.",
      "An establishment with fewer than ten workers must inform the Inspector within 30 days of closing.",
    ],
  },
  body: [
    {
      kind: "p",
      text: "Many people in Gujarat still call this the gumasta licence, after the older Bombay Shops and Establishments Act. That Act was replaced in Gujarat by the 2019 Act, and the change matters: the new law sets the requirement by the number of workers, and most small establishments now give an intimation rather than taking out a licence.",
    },

    { kind: "h2", id: "coverage", text: "Which businesses does the Gujarat Act cover?" },
    {
      kind: "answer",
      text: "The Act applies to shops and establishments across Gujarat. Most of its provisions apply to those employing ten or more workers. Section 7 applies to those employing fewer than ten, and requires an intimation instead of registration.",
    },
    {
      kind: "p",
      text: "In practice this takes in retail shops, offices, showrooms, warehouses, restaurants, clinics, salons, coaching centres, studios and most other premises from which a business is carried on. Premises that are factories under factory law are generally covered by that law instead. If your activity sits at a boundary, for example a workshop that both repairs and sells, check the definitions in the Act or ask the local Inspector before deciding it does not apply.",
    },

    { kind: "h2", id: "two-routes", text: "Registration or intimation: which applies to you?" },
    {
      kind: "table",
      caption: "Two routes under the Gujarat Act",
      columns: ["", "Fewer than 10 workers", "10 or more workers"],
      rows: [
        ["What you file", "Intimation of commencing business (section 7)", "Application for registration (section 6)"],
        ["Deadline", "Within 60 days of starting business", "Within 60 days of starting business"],
        ["What you receive", "A receipt of the intimation", "A registration certificate"],
        ["Fee", "None stated for intimation in section 7", "A fee prescribed by the rules, shown on the portal"],
        ["On closing", "Inform the Inspector within 30 days", "Follow the rules for surrender of registration"],
      ],
      rowHeader: true,
    },
    {
      kind: "p",
      text: "Count workers as the Act defines them, at the establishment in question. The number can change, and the Act deals with that directly: if an establishment that gave an intimation reaches ten or more workers, all provisions of the Act apply to it and it must obtain registration under section 6.",
    },
    {
      kind: "note",
      title: "Each location is separate",
      text: "Registration and intimation are made for each shop or establishment, to the Inspector in whose area it is located. A business with an office in Vadodara and a showroom in Surat deals with each one in its own area.",
    },

    { kind: "h2", id: "deadline", text: "What is the deadline, and who receives the application?" },
    {
      kind: "answer",
      text: "Sixty days from the date the shop or establishment commences its business, for both registration and intimation. The application or intimation goes to the Inspector appointed for the area, which is usually under the local authority.",
    },
    {
      kind: "p",
      text: "For establishments in municipal areas the filing is made online. Gujarat's eNagar portal carries the shops and establishments service for urban local bodies, and the employer creates an account, completes the form for registration or intimation, uploads documents and pays any fee. Outside municipal areas the local authority, such as a nagarpalika or gram panchayat, is the point of contact. Because the arrangements differ by area, start with your local body's website or office and confirm which portal it uses.",
    },
    {
      kind: "warning",
      title: "Do not confuse it with the 30-day periods",
      text: "Thirty days appears in the Act only for notifying closure of an establishment with fewer than ten workers. Other thirty-day deadlines that arrive around the same time, such as filing an LLP agreement in Form 3, are separate laws with their own clocks.",
    },

    { kind: "h2", id: "documents", text: "What information and documents are usually asked for?" },
    {
      kind: "p",
      text: "The Act requires the application or intimation to carry the details of the employer and the establishment, with self-declaration and self-certified documents. The exact list is set by the rules and the portal. The following is what is commonly requested:",
    },
    {
      kind: "checklist",
      title: "Commonly requested",
      items: [
        "Name, address and identity proof of the employer, with PAN",
        "Name and full address of the establishment",
        "Proof of the premises: an ownership document, or a rent or leave and licence agreement",
        "Nature of the business and date of commencement",
        "Number of workers, separately for men and women where asked",
        "For a firm, LLP or company: its registration or incorporation certificate, and the authorisation of the person applying",
        "Photograph of the employer or authorised person, and of the premises if requested",
      ],
    },
    {
      kind: "steps",
      items: [
        {
          title: "Count workers and choose the route",
          body: "Fewer than ten: intimation. Ten or more: registration.",
        },
        {
          title: "Find your area's portal or office",
          body: "For urban areas, the eNagar service of your municipal corporation or nagarpalika. Elsewhere, the local authority's office.",
        },
        {
          title: "Complete the form and upload documents",
          body: "Enter the employer, establishment and worker details exactly as they appear on the documents you upload.",
        },
        {
          title: "Pay any fee and submit",
          body: "Registration attracts a prescribed fee. Keep the acknowledgement.",
        },
        {
          title: "Keep the certificate or receipt at the premises",
          body: "Inspectors, banks and landlords may ask for it.",
        },
      ],
    },

    { kind: "h2", id: "after", text: "What has to be done after registration?" },
    {
      kind: "p",
      text: "A registration certificate remains in force until there is a change in the ownership or in the nature of the business. When either changes, the employer gives notice to the Inspector so a new certificate can be issued. For establishments with ten or more workers, to which the Act's other provisions apply, it also regulates working hours, overtime, leave, holidays and the employment of women at night, and requires records to be kept. Those obligations continue for as long as the establishment runs. An establishment with fewer than ten workers is subject to section 7, and to the full Act from the point it reaches ten.",
    },
    {
      kind: "note",
      title: "The labour codes",
      text: "The four central labour codes came into force on 21 November 2025, and Gujarat has notified rules under them, including under the Occupational Safety, Health and Working Conditions Code, 2020. State shops and establishments law continues to apply alongside them, but an establishment with ten or more workers should check whether it also needs registration under the code. This is an area to confirm with the Labour and Employment Department or an adviser.",
    },

    { kind: "h2", id: "different", text: "How is this different from incorporation, GST and Udyam?" },
    {
      kind: "table",
      caption: "Four registrations a new Gujarat business often hears about",
      columns: ["Registration", "What it is for", "Who deals with it", "When it applies"],
      rows: [
        ["Company or LLP incorporation", "Creates the legal entity", "Ministry of Corporate Affairs", "Only if you choose a company or LLP"],
        ["Shops and Establishments", "Records the premises and regulates employment there", "Local Inspector under the Gujarat Act", "For each shop or establishment, within 60 days of starting"],
        ["[GST](/blog/gst-registration-gujarat-guide/)", "Tax registration for collecting and paying GST", "GST portal", "Above the turnover threshold, or from the first sale in certain cases"],
        ["[Udyam](/blog/udyam-registration-msme-india/)", "Records the enterprise as micro, small or medium", "Ministry of MSME portal", "Optional, for access to MSME benefits"],
      ],
      rowHeader: true,
    },
    {
      kind: "p",
      text: "None of these replaces another. A newly incorporated company that opens an office in Ahmedabad still files under the Shops and Establishments Act for that office. A proprietor with a GSTIN still files for the shop. Professional tax enrolment under Gujarat's professional tax law is separate again, and is often needed at around the same time.",
    },

    { kind: "h2", id: "mistakes", text: "Common mistakes" },
    {
      kind: "list",
      items: [
        "**Assuming no employees means nothing to file.** The intimation route exists precisely for small establishments.",
        "**Filing for one location and not the others.** Each establishment is filed for in its own area.",
        "**Missing the move to registration** when the workforce reaches ten.",
        "**Not updating after a change of ownership**, for example when a proprietorship becomes an LLP and the premises stay the same.",
        "**Relying on an old gumasta licence** issued under the earlier Act without checking what the 2019 Act requires now.",
      ],
    },
    {
      kind: "links",
      title: "Registration support in Gujarat's main cities",
      items: [
        { href: "/ahmedabad/", label: "Ahmedabad", blurb: "Business registration support across the city and district." },
        { href: "/vadodara/", label: "Vadodara", blurb: "Where Raulji Group is based." },
        { href: "/surat/", label: "Surat", blurb: "Registration support for Surat businesses." },
        { href: "/gujarat/", label: "All of Gujarat", blurb: "Coverage across the state, with every city we have a page for." },
      ],
    },
  ],
  faqs: [
    {
      q: "Is shop and establishment registration compulsory in Gujarat?",
      a: "An establishment with ten or more workers must apply for registration under section 6 of the Gujarat Act. One with fewer than ten must give an intimation under section 7. Either way, something must be filed within 60 days of commencing business.",
    },
    {
      q: "What is the deadline for shops and establishments registration in Gujarat?",
      a: "Sixty days from the date the shop or establishment commences its business, under sections 6 and 7 of the Gujarat Shops and Establishments (Regulation of Employment and Conditions of Service) Act, 2019.",
    },
    {
      q: "Do I need to register if I have no employees?",
      a: "An establishment with fewer than ten workers gives an intimation of commencing business rather than obtaining a registration certificate. Check the definitions in the Act against your circumstances before assuming nothing applies.",
    },
    {
      q: "Is the gumasta licence still required in Gujarat?",
      a: "Gumasta is the common name for registration under the older Bombay Shops and Establishments Act. In Gujarat that has been replaced by the 2019 Act, under which establishments either register or give an intimation depending on the number of workers.",
    },
    {
      q: "Does a home office need shops and establishments registration?",
      a: "It depends on whether business is carried on from the home as an establishment within the Act's definitions. Many home-based professionals and online businesses do give an intimation. Check with the local Inspector for your area if you are unsure.",
    },
    {
      q: "Does the registration certificate need to be renewed?",
      a: "Under the 2019 Act, a registration certificate stays in force until there is a change in the ownership or nature of the business. A change requires notice to the Inspector for a new certificate.",
    },
    {
      q: "Is shops and establishments registration the same as GST registration?",
      a: "No. Shops and establishments registration is a state labour law requirement for the premises. GST registration is a tax registration with its own thresholds. A business may need both, and one does not replace the other.",
    },
    {
      q: "Can Raulji Group handle the filing?",
      a: "Yes, shop and establishment registration is part of what we handle when setting up a proprietorship, and we advise new firms, LLPs and companies on which state registrations apply to their premises.",
    },
  ],
  related: [
    "starting-business-gujarat-registration-guide",
    "gst-registration-gujarat-guide",
    "udyam-registration-msme-india",
  ],
  services: [
    {
      href: "/services/proprietorship-registration/",
      label: "Proprietorship registration",
      blurb: "Shop and establishment registration, Udyam and GST where it applies, handled together.",
    },
    {
      href: "/gujarat/",
      label: "Business registration across Gujarat",
      blurb: "What is national and what is specific to Gujarat.",
    },
    {
      href: "/services/business-registration/",
      label: "Business Registration",
      blurb: "All four business structures, and how to choose between them.",
    },
  ],
  sources: [
    {
      label: "Gujarat Shops and Establishments (Regulation of Employment and Conditions of Service) Act, 2019",
      url: "https://www.indiacode.nic.in/handle/123456789/15202",
      supports:
        "Extent to the whole of Gujarat; section 6 registration (ten or more workers) and section 7 intimation (fewer than ten), each within sixty days of commencing business; thirty-day closure intimation; move to registration on reaching ten workers.",
    },
    {
      label: "Section 7 of the Act, text as published by Indian Kanoon",
      url: "https://indiankanoon.org/doc/42242165/",
      supports: "Wording of the sixty-day intimation and thirty-day closure periods, read on 23 October 2026.",
    },
    {
      label: "Labour and Employment Department, Government of Gujarat",
      url: "https://labour.gujarat.gov.in/",
      supports:
        "Administration of the Act and the Gujarat Shops and Establishments Rules, 2020, and rules under the labour codes.",
    },
    {
      label: "eNagar, Government of Gujarat",
      url: "https://enagar.gujarat.gov.in/",
      supports: "Online shops and establishments service for urban local bodies.",
    },
  ],
  disclaimer:
    "This article summarises the Gujarat Act as read on 23 October 2026. Forms, fees and portals are set by the rules and by each local authority and can change. It is not legal advice; confirm the requirement for your premises with the local Inspector or a qualified professional.",
  cta: {
    title: "Opening a shop or office in Gujarat?",
    body: "Tell us where the premises are, how many people will work there and how the business is owned. We will tell you what to file under the Shops and Establishments Act, and what else applies.",
  },
};
