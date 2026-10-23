# Blog content audit — five new business guides, 23 Oct 2026

Step 1 of the five-guide brief, written **before** any article. It answers two
questions:

- Does an existing page already satisfy each proposed article's search intent?
- If not, how will the new article be meaningfully different?

Branch: `content/blog-guides-batch-2`, from `main` at `7614420`.

## What was inspected

**Blog architecture**

- Articles are typed data (`lib/blog/types.ts`, `lib/blog/articles/*.ts`),
  not Markdown.
- Every block, FAQ and source is a field, so claims and their sources sit
  together in the diff.
- `lib/blog/index.ts` registers articles.
- `app/blog/[slug]/page.tsx` renders the article and emits BreadcrumbList,
  Article and FAQPage JSON-LD built from the same data.
- `app/sitemap.ts` lists every article in `ARTICLES`.
- `scripts/check-blog.mjs` enforces:
  - no em dashes and no banned phrases or claims;
  - 5 or more FAQs;
  - unique metadata;
  - a word band (default 1,500–2,500);
  - internal links that resolve;
  - related slugs and registered images.

**Existing content**

- 18 articles: 8 business guides and 10 Panchmahal health-insurance guides.
- Service pages and their `guides` lists (`lib/services.ts`,
  `lib/secondary-services.ts`).
- The guide lists on `/gujarat/` and `/services/business-registration/`.
- City pages and `/faqs/`.

**What Raulji Group actually offers on these topics**

From `lib/services.ts`, "what we handle":

| Service | Relevant scope |
|---|---|
| Proprietorship | Udyam registration, "GST registration where it is applicable", shop and establishment registration |
| Partnership | Deed advice and drafting, stamp-duty guidance, Registrar of Firms filing |
| Private Limited | Guidance on INC-20A and first auditor appointment |
| Compliance pages | `/services/pvt-compliance/`, `/services/llp-compliance/` |

Master rule 15 records that a standalone GST/DIN/MCA service is **not** offered.
The GST article is therefore educational. Its call to action points at the
proprietorship service, where GST is handled as part of setting up, and at a
general enquiry. It never offers "GST registration services".

## Content-overlap matrix

| # | Proposed article | Target intent | Closest existing pages | What the existing pages already say | How the new article differs | Decision |
|---|---|---|---|---|---|---|
| 1 | GST Registration in Gujarat: Eligibility, Documents and Application Process | "Do I need GST registration, and how do I apply?" (Gujarat) | `/services/proprietorship-registration/` (GST FAQ, ~3 sentences); `/blog/starting-business-gujarat-registration-guide/` (one mention); `/blog/partnership-vs-proprietorship-india/` (mentions) | GST is compulsory past a threshold or for inter-state goods and e-commerce. No thresholds by supply type, no process, no documents | The full eligibility test: ₹40/₹20 lakh, aggregate turnover, the s.24 cases, the 2023 e-commerce exemption. Plus documents by premises type, REG-01 step by step, Gujarat's biometric Aadhaar route, Rule 9 and Rule 14A timelines, Rule 10A bank details, and what a GSTIN does not prove | **Proceed** (no page answers this intent) |
| 2 | Udyam Registration for MSMEs in India: Eligibility, Benefits and Documents | "Should I register on Udyam, and how?" | `/blog/starting-business-gujarat-registration-guide/` § "Udyam registration and why it matters to Gujarat SMEs" (~170 words); proprietorship service (Udyam usually same-day) | The 2025 thresholds and "free on the government portal" | Eligibility including traders (PSL only) and the Udyam Assist Platform. Also the documents and portal steps, how to spot fee-charging look-alike sites, what each benefit actually requires (MSMED Act s.15–16 payment rule, PSL), graduation rules and updating, and what Udyam does not do | **Proceed** |
| 3 | Gujarat Shops and Establishments Registration: A Practical Guide | "What must my shop or office file under the Gujarat S&E Act?" | `/blog/starting-business-gujarat-registration-guide/` § "Registration under the Shops and Establishments Act, 2019" (~200 words) | Register (10+) or intimate (under 10), with certificate validity. **It stated a 30-day deadline, which the Act does not support**; see corrections below | Coverage and the 10-worker line (s.6 vs s.7), Forms A/B/D, the 60-day deadline and 30-day closure notice, the eNagar portal and local Inspector, changes and closure, the Labour Codes caveat, and how S&E differs from incorporation, GST and Udyam | **Proceed**, and correct the existing article |
| 4 | Partnership Deed Checklist: 12 Clauses to Discuss Before Signing | "What should our partnership deed cover?" | `/blog/partnership-vs-proprietorship-india/` (deed as concept, liability, leaving); `/services/partnership-registration/` (deed drafting as a service) | That a deed exists, governs the firm and is stamped; consequences of unregistered firms (s.69) | Clause-by-clause: what the Act fills in when the deed is silent (s.12, 13, 19(2), 31–33, 37, 42) and what partners should decide instead. Includes the tax-deed link for remuneration and interest, a discussion checklist, and when to get legal advice | **Proceed** |
| 5 | After Company Incorporation: A Practical Compliance Checklist | "I have my certificate. What now?" | `/blog/mca-company-registration-process-india/` § "What happens immediately after incorporation?" (~170 words); `/blog/common-business-registration-mistakes-india/` #7–8; `/services/pvt-compliance/`, `/services/llp-compliance/` (service pages) | A four-item list (auditor, board meeting, registers, activity registrations), and that the annual cycle runs | Organised by **when**: first 30 days, first 180 days, conditional, recurring. Covers companies and LLPs separately, the statutory deadlines with sections, the 2026 DIR-3 KYC change, ADT-1 for the first auditor (stated as unsettled), and common mistakes. Hands the recurring work to the compliance service pages rather than duplicating them | **Proceed**, link to the compliance pages as the commercial destination |

**No proposed article duplicates an existing page's intent**, so no topic was
replaced. Each existing section is short and generic where the new article is
specific. The new articles link to those sections rather than repeat them.

**One brief link does not exist.** Article 5's suggested
`/blog/private-limited-vs-llp-india/` is not a real URL. The real article is
`/blog/private-limited-company-vs-llp/`, and that is what is linked.

## Factual errors found in existing content (corrected on this branch)

Found while checking sources for the new articles. Both were on live pages.

| Page | Was | Now | Source |
|---|---|---|---|
| `/blog/starting-business-gujarat-registration-guide/` (9 statements, incl. FAQ and source note) | Gujarat S&E registration or intimation "within 30 days of commencing operations" | **60 days** of commencing business | Gujarat Shops and Establishments (RE&CS) Act, 2019, s.6 and s.7 ("Within a period of sixty days … the date on which establishment commences its business"). The only 30-day period in s.7 is for notifying **closure** |
| `/blog/documents-required-company-registration-india/` (2) and `/blog/mca-company-registration-process-india/` (2) | Director KYC described as annual | DIR-3 KYC **once every three financial years** from 31 March 2026, due 30 June; detail changes within 30 days | Companies (Appointment and Qualification of Directors) Amendment Rules, 2025, G.S.R. 943(E) of 31 Dec 2025 |

The `updated` date on the three corrected articles is set to 23 Oct 2026, the
real date of the change.

**Still to review, not changed:** the `/services/pvt-compliance/` meta
description opens "Stay compliant every year: AOC-4, MGT-7A, director KYC…".
AOC-4 and MGT-7A are annual, but director KYC no longer is. This is a
client-approved metadata string, so it is flagged rather than edited.
