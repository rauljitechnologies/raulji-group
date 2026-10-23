# Five-blog content audit — 23 Oct 2026

Phase 1 of the five-blog brief (GST, Udyam, Trademark, FSSAI, IEC), done
before writing. Branch `content/blog-guides-batch-3`, built on
`content/blog-guides-batch-2` (`79ccbf4`), which is on GitHub but not yet
merged or live.

## What was checked

**The blog.** All 23 articles in `lib/blog/articles/`:

- the 8 business guides;
- the 10 health-insurance guides;
- the 5 guides of 23 Oct 2026, on GST, Udyam, Gujarat S&E, the partnership
  deed and post-incorporation compliance.

**The rest of the site source.**

- Service pages: `lib/services.ts`, `lib/secondary-services.ts`.
- City and city-service pages: `lib/cities.ts`, `lib/city-services.ts`.
- `/faqs/`, `public/llms.txt`, routing (`app/blog/[slug]`), metadata and the
  sitemap (`app/sitemap.ts`).
- A text search for each topic: "trademark", "FSSAI", "FoSCoS",
  "Import Export Code", "IEC", "DGFT".

## Overlap matrix

| # | Proposed | Closest existing | Overlap | Decision |
|---|---|---|---|---|
| 1 | GST Registration in Gujarat | **`/blog/gst-registration-gujarat-guide/`** (batch 2, same day) | **Same intent, same topic.** It already covers thresholds, exceptions, goods vs services, inter-state, documents, the step-by-step process, verification and errors, and FAQs | **Not created again.** The existing article was improved to cover the two items it lacked: "What happens after GST registration?" (Rule 18 display, returns and QRMP, Rule 19 amendments, Rule 20 cancellation) and "Common misconceptions" |
| 2 | Udyam Registration for MSMEs | **`/blog/udyam-registration-msme-india/`** (batch 2) | **Same intent, same topic.** Every item in the brief is already covered: definition, 2025 classification, eligibility and traders, documents, PAN/Aadhaar/GST, the portal steps, unofficial sites, mistakes, updating, conditional benefits, what it does not do, FAQs | **Not created again, and not changed.** Nothing was missing |
| 3 | Trademark Registration in India | None. Trade marks appear only as name-screening lines in `lib/services.ts` and one paragraph of the registration-mistakes article | Mentions only | **Created** |
| 4 | FSSAI Registration and Food Licence | None. FSSAI appears in passing in city FAQs (`lib/cities.ts`) and the proprietorship service page; none quotes thresholds | Mentions only | **Created** |
| 5 | Import Export Code | None. IEC appears in passing in city FAQs, a city-service section and the proprietorship page | Mentions only | **Created** |

For Blogs 1 and 2, a second page on the same intent would compete with the
first for the same searches and split its links. That is what Phase 1 forbids.

**Alternative topics, should two more new articles be wanted.** These are
**not written**; they need your choice.

- **Professional tax in Gujarat:** enrolment and registration. It is referenced
  on several pages, but no article covers it.
- **Converting a proprietorship or partnership into an LLP or company.** It is
  a common question on the service pages, with no dedicated guide.

## Does Raulji Group offer these services?

Checked in `lib/services.ts`, which holds the client-approved service
descriptions:

| Topic | What Raulji does | What the article says |
|---|---|---|
| Trademark | Screens a proposed business name against registered trade marks during company, LLP, firm and proprietorship registration. **Does not file trade mark applications** | Informational. The CTA offers name screening during business registration only. The FAQ and disclaimer state that Raulji does not file trade mark applications |
| FSSAI | "Guidance on activity-specific licences such as FSSAI" (proprietorship service). **Does not file** | Informational. Says Raulji advises on which approvals apply and does not file FSSAI applications |
| IEC | Same guidance line for Import Export Code. **Does not file** | Informational. Same wording |

The owner should confirm this scope before publication. If Raulji does file
any of these, the articles' "we do not file" lines need changing.

## A fact that most existing web content gets wrong

FSSAI's order of 13 March 2026 (F. No. RCD-01002/1/2021-Regulatory-FSSAI-
Part(1)), effective 1 April 2026, revised the categories:

- **Registration:** turnover up to ₹1.5 crore (was ₹12 lakh).
- **State licence:** above ₹1.5 crore up to ₹50 crore (was up to ₹20 crore).
- **Central licence:** above ₹50 crore.

The amendment regulations of 10 March 2026 provide for perpetual validity.
The order was read in full in FSSAI's own PDF. No existing Raulji page quotes
the old figures, so nothing existing needed correcting, and a test now guards
against them being introduced.
