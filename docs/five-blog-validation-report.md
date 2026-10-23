# Five-blog validation report — 23 Oct 2026

Branch `content/blog-guides-batch-3`, built on `content/blog-guides-batch-2`.

**Status: DRAFT — not publicly live.**

- Nothing is merged to `main` or deployed.
- Blogs 1 and 2 also live on `content/blog-guides-batch-2`, which is on GitHub
  but not merged.
- No page is claimed as indexed; that needs Search Console.

Companion documents:

- [five-blog-content-audit.md](five-blog-content-audit.md)
- [five-blog-internal-link-map.md](five-blog-internal-link-map.md)

## The five titles and URLs

| # | Brief | Result | URL | Status |
|---|---|---|---|---|
| 1 | GST Registration in Gujarat | **Existing article improved**, not duplicated | `/blog/gst-registration-gujarat-guide/` | Draft (batch 2 + this branch) |
| 2 | Udyam Registration for MSMEs | **Existing article kept**; it already covers the brief | `/blog/udyam-registration-msme-india/` | Draft (batch 2) |
| 3 | Trademark Registration in India | **New** | `/blog/trademark-registration-india-guide/` | Draft |
| 4 | FSSAI Registration and Food Licence | **New** | `/blog/fssai-registration-food-licence-india/` | Draft |
| 5 | Import Export Code (IEC) | **New** | `/blog/import-export-code-iec-guide/` | Draft |

**Duplicate check:** Blogs 1 and 2 would have duplicated articles written
earlier the same day, so they were not created again (see the audit). Blogs 3–5
have no existing page with the same intent.

## Per-article detail

| | GST (improved) | Udyam (kept) | Trademark | FSSAI | IEC |
|---|---|---|---|---|---|
| H1 | GST Registration in Gujarat: Eligibility, Documents and Process | Udyam Registration for MSMEs: Eligibility, Benefits and Documents | Trademark Registration in India: Classes, Process and Common Mistakes | FSSAI Registration or Food Licence: Which Does Your Business Need? | Import Export Code (IEC): Documents, Application and Compliance |
| Title tag (chars) | 58 | 60 | 59 | 54 | 59 |
| Meta description (chars) | 148 | 160 | 152 | 156 | 157 |
| Words, prose counted by `check:blog` | 2,650 | 1,747 | 1,848 | 1,847 | 1,812 |
| Words, rendered `<main>` | 3,399 | 2,417 | 2,503 | 2,503 | 2,423 |
| FAQs | 8 | 8 | 8 | 8 | 8 |
| Primary intent | Whether GST applies in Gujarat, and how to apply | Udyam eligibility and the safe official route | How trademark protection and registration work | Which FSSAI approval a food business needs | Whether IEC applies, and how to get and keep it |
| Category | Gujarat Business | Business Registration | Entrepreneurship | Business Registration | Business Registration |

"Rendered `<main>`" includes the contents list, headings, table text,
related cards and the CTA. The prose figure is what `check:blog` measures.

**The brief's H1s are longer than the site allows.** Blogs 3–5 were 82–93
characters, and `seo-validate` fails any H1 over 70. They were shortened
without changing their meaning:

- "Application Process" became "Process"
- "Which Approval Does Your Business Need?" became "Which Does Your Business
  Need?"
- "Application Process and Compliance for Indian Businesses" became
  "Application and Compliance"

## Official sources used

| Article | Sources |
|---|---|
| Trademark | IP India "Forms and official fees" page, read directly: TM-A ₹4,500 / ₹9,000 per class e-filing; TM-O ₹2,700; TM-R ₹9,000; late-renewal surcharge ₹4,500. Also IP India, the WIPO Nice Classification, and Trade Marks Act s.21 (Indian Kanoon). Further provisions referred to: s.25 (ten-year term), the ® offence, Rule 33 (one-month reply) |
| FSSAI | **FSSAI order of 13 March 2026, read in full in FSSAI's PDF**: thresholds from 1 April 2026, and the amendment regulations of 10 March 2026 on perpetual validity. Also FoSCoS and FSSAI |
| IEC | **DGFT Handbook of Procedures 2023, Chapter 2, read in DGFT's PDF**: paras 2.05, 2.07 (compulsory, exemptions, SCOMET), 2.08 (ANF-2A, documents), 2.09, 2.10, 2.12, 2.13, 2.14. Also DGFT (FTP para 2.05(e), annual update; Appendix 2K, fee) |
| GST additions | CGST Rules 18, 19 and 20; the QRMP scheme |

**Source links:** the three new articles link 9 distinct external URLs. **8**
returned 200 on the final check. `www.dgft.gov.in` returned 200 earlier the same
day but timed out on the recheck; open it in a browser before publishing.
`tmrsearch.ipindia.gov.in` was unreachable, so it is not linked; the article
refers to IP India's search generally.

## SEO metadata

| Check | Result |
|---|---|
| Unique title tag, meta description and H1 | Yes, across all 103 sitemap URLs (`seo-validate`) and all 26 articles (unit test) |
| Canonical | Self-referencing `https://www.raulji.com/blog/{slug}/` with trailing slash, confirmed in the built HTML |
| Robots | `index, follow`; no noindex introduced. `robots.txt` unchanged |
| Breadcrumbs | Home › Blog › article, visible and in BreadcrumbList |
| Dates | `published` / `updated` 2026-10-23, the real date |
| Author | Raulji Group. No invented credentials |
| Images | Drawn diagrams (`scripts/gen-blog-images-batch3.py`), 1200×675 WebP of 20–22 KB, alt text of 93–94 characters. Hero and OG images return 200 |

## Structured data

| Check | Result |
|---|---|
| Types per new page | Organization, WebSite, BreadcrumbList, **Article**, FAQPage |
| Article | headline = H1; dates; author; image |
| FAQPage | 8 questions each, **all visible on the page**. This is the site's existing template; Google limits FAQ rich results to government and health sites, so none is expected |
| External validator / Rich Results Test | **NOT TESTED** — the pages are not public |

## Build and tests

| Command | Result |
|---|---|
| `npm run lint` | exit 0 |
| `npm run typecheck` | exit 0 |
| `npm test` | 11 files, **148/148** (8 new in `tests/blog-batch-3.test.ts`; the batch-2 tests were tightened) |
| `npm run check:blog` | 26 articles, **0 errors** (4 existing warnings on older articles) |
| `npm run build` | exit 0. `seo-validate` passed: 105 pages, 103 sitemap URLs, 103 unique titles and descriptions |

**Local production build checks:**

| Check | Result |
|---|---|
| Routes | 4 changed and new routes return 200 |
| Internal links | 19 distinct destinations, all 200 |
| Sitemap | All in the sitemap |
| Back-links | All render |
| Orphans | None across 103 URLs |
| Raw Markdown | 0 occurrences on the changed pages |
| Layout | 320, 375 and 1280 px: no overflow, 0 console errors |
| Secrets | None added. No credentials appear in any changed file; the existing `secret-exposure` tests pass |

**Defects caught by the tests and fixed before commit:**

1. The IEC opening answer nested a link inside bold. The site renders that as
   literal Markdown; the same bug was found earlier in the Udyam guide.
2. The trademark FAQ did not plainly say Raulji does not file applications.
3. Three `related` additions were fourth or fifth entries, which the template
   never displays. They were replaced with in-text links, and the tests now
   count only the rendered three.

## Outstanding professional review

1. **Service scope (owner).** Confirm that Raulji Group does not file
   trademark, FSSAI or IEC applications. The articles say it does not.
2. **FSSAI categories by activity.** Paragraph 4 of the order supersedes
   earlier categorisation criteria. Whether activities such as import still
   need a central licence regardless of turnover should be confirmed. The
   article tells readers to check FoSCoS.
3. **FSSAI fees.** Not stated, because they may have changed with perpetual
   validity.
4. **FSSAI migration.** How businesses licensed under the old limits move
   category. The article says to keep the existing approval until FoSCoS or
   the state department confirms.
5. **IEC fee and annual update.** ₹500 (Appendix 2K) and April–June (FTP
   para 2.05(e)) were confirmed from secondary sources. The article does not
   state the fee and refers to the portal.
6. **IEC for services exporters.** Stated conditionally. A trade adviser
   should confirm.
7. **Trademark.** Rule 33's one-month reply period and s.25 were taken from
   secondary summaries of the Act and Rules.
8. **GST additions.** QRMP up to ₹5 crore and the Rule 19 15-day amendment
   window are long-standing provisions, but should be confirmed with a GST
   practitioner, along with Rule 14A (carried over from batch 2).

## To publish

1. Owner approval of the service-scope wording (item 1).
2. Merge `content/blog-guides-batch-2`, then this branch, to `main`.
3. Push. Vercel deploys `main`.
4. Re-run the checks in this report on production, and run the schema
   validator and Rich Results Test on the public URLs.
