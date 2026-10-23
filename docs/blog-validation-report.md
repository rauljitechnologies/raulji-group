# Blog validation report — five new business guides, 23 Oct 2026

Branch: `content/blog-guides-batch-2`, from `main` at `7614420`.
**Not deployed.** Deployment waits for owner authorisation.

Companion documents:

- [blog-content-audit.md](blog-content-audit.md) — overlap matrix and the
  corrections to existing articles
- [blog-internal-link-map.md](blog-internal-link-map.md) — every link in and out

## Summary

| | |
|---|---|
| New articles | 5, integrated into `ARTICLES`, the blog index and categories, related-guide blocks, service and Gujarat guide cards, the sitemap and `llms.txt` |
| Existing articles corrected | 3, for 2 factual errors found while checking sources |
| `npm run lint` / `typecheck` | exit 0 / exit 0 |
| `npm test` | 10 files, **140/140** (11 new, in `tests/blog-batch-2.test.ts`) |
| `npm run check:blog` | 23 articles, **0 errors**. The 4 warnings are existing word-band warnings on older articles |
| `npm run build` | exit 0. `seo-validate` passed: 102 pages, 100 sitemap URLs, 100 unique titles and descriptions |
| External schema validator / Rich Results Test | **NOT TESTED**. Both need a public URL; validator.schema.org was also rate-limiting this network the same day. Internal JSON-LD checks passed (below) |
| Official source links | 18 distinct external URLs. **11** returned 200; **4** returned 403 to a script (three MCA, one Income Tax India; both sites block non-browser clients and the live articles already cite them); **3** were unreachable from this network (see review item 7) |

## The five articles

### 1. GST registration in Gujarat

| | |
|---|---|
| URL | `/blog/gst-registration-gujarat-guide/` |
| Intent | Whether GST registration applies to a Gujarat business, and how to apply |
| Closest existing | Proprietorship service page (GST FAQ); Starting a business in Gujarat |
| Title tag | GST Registration in Gujarat: Who Needs It and How to Apply (58) |
| Meta description | 148 characters |
| H1 | GST Registration in Gujarat: Eligibility, Documents and Process |
| Category | Gujarat Business |
| Words (rendered `main`) | 3,078; prose counted by `check:blog`: 2,326 |
| FAQs | 8 |
| Official sources checked | GST portal; GST user manual "Apply for Registration (Normal Taxpayer)"; CBIC GST acts, rules and notifications; GST Welcome Kit. Also CGST Act ss.2(6), 22, 24; Rules 8(4A), 9, 10A, 14A; Notifications 10/2019-CT, 34/2023-CT, 18/2025-CT, 10/2017-IT |

### 2. Udyam registration for MSMEs

| | |
|---|---|
| URL | `/blog/udyam-registration-msme-india/` |
| Intent | Accurate guidance on Udyam registration, without paying a look-alike site |
| Closest existing | Starting a business in Gujarat, § Udyam (~170 words) |
| Title tag | Udyam Registration for MSMEs: Eligibility, Benefits, Process (60) |
| Meta description | 160 characters |
| H1 | Udyam Registration for MSMEs: Eligibility, Benefits and Documents |
| Category | Business Registration |
| Words (rendered `main`) | 2,417; prose 1,743 |
| FAQs | 8 |
| Official sources checked | udyamregistration.gov.in; msme.gov.in (S.O. 1364(E); notification of 26 June 2020; OM of 2 July 2021); PIB on the Udyam Assist Platform; RBI MSME FAQs; MSME Samadhaan |

### 3. Gujarat Shops and Establishments registration

| | |
|---|---|
| URL | `/blog/gujarat-shops-establishments-registration/` |
| Intent | What a Gujarat shop or office must file under the 2019 Act |
| Closest existing | Starting a business in Gujarat, § S&E (~200 words, which carried the 30-day error) |
| Title tag | Gujarat Shops and Establishments Registration Guide \| Raulji (60) |
| Meta description | 156 characters |
| H1 | Gujarat Shops and Establishments Registration: A Practical Guide |
| Category | Gujarat Business |
| Words (rendered `main`) | 2,462; prose 1,748 |
| FAQs | 8 |
| Official sources checked | Gujarat Shops and Establishments (RE&CS) Act, 2019, ss.6 and 7, read in the text; Labour and Employment Department, Gujarat; eNagar |

### 4. Partnership deed checklist

| | |
|---|---|
| URL | `/blog/partnership-deed-checklist-india/` |
| Intent | What partners should agree before signing a deed |
| Closest existing | Partnership vs Proprietorship; Partnership registration service |
| Title tag | Partnership Deed Checklist: 12 Clauses to Agree \| Raulji (56) |
| Meta description | 160 characters |
| H1 | Partnership Deed Checklist: 12 Clauses to Discuss Before Signing |
| Category | Business Registration |
| Words (rendered `main`) | 3,077; prose 2,227 |
| FAQs | 8 |
| Official sources checked | Indian Partnership Act, 1932, ss.11, 12, 13, 16, 19, 20, 31, 32, 33, 36, 37, 42, 48, 69; Income Tax Department on the Income-tax Act, 2025 |

### 5. After company incorporation

| | |
|---|---|
| URL | `/blog/after-company-incorporation-compliance-checklist/` |
| Intent | A founder with a new certificate: what is due, and when |
| Closest existing | MCA registration process, § "What happens immediately after incorporation?"; Pvt and LLP compliance service pages |
| Title tag | After Company Incorporation: Compliance Checklist \| Raulji (58) |
| Meta description | 158 characters |
| H1 | After Incorporation: A Compliance Checklist for New Companies |
| Category | Company Registration |
| Words (rendered `main`) | 2,829; prose 2,113 |
| FAQs | 8 |
| Official sources checked | Companies Act, 2013, ss.2(41), 10A, 12, 56(4), 92, 96, 128, 137, 139(6), 173; MCA SPICe+ FAQs; G.S.R. 943(E) (DIR-3 KYC); LLP Act, 2008 and LLP Rules |

**Shared across all five:**

- **Author:** Raulji Group (`GROUP_AUTHOR`). No invented credentials.
- **Dates:** `published` and `updated` are 23 Oct 2026, the real date. Nothing
  is backdated.
- **Canonical:** `https://www.raulji.com/blog/{slug}/`, self-referencing,
  trailing slash.
- **Robots:** `index, follow`.
- **Breadcrumb:** Home › Blog › title.
- **Featured image:** a drawn diagram of the article's content
  (`scripts/gen-blog-images-batch2.py`), 1200×675 WebP of 19–26 KB, with
  descriptive alt text of 81–98 characters.

**H1s differ from the brief's titles.** The brief's exact titles are 74–89
characters. The site's `seo-validate` fails any H1 over 70, so each was
shortened without changing its meaning:

- "…and Application Process" became "…and Process"
- "…in India" was dropped from the Udyam title
- "…for Shops and Offices" was dropped
- "Business Partners Should Discuss" became "to Discuss"
- the Article 5 title was shortened to "After Incorporation: A Compliance
  Checklist for New Companies"

The brief's wording is still used in the excerpts and the opening answers.

## Structured data

Checked on the local production build; the same data feeds the page and the
JSON-LD.

| Check | Result |
|---|---|
| JSON-LD on each page | Organization + ProfessionalService, WebSite, BreadcrumbList, **Article**, FAQPage |
| Article | headline = H1; `datePublished` and `dateModified` 2026-10-23; author `#organization`; image present |
| BreadcrumbList | Home › Blog › article; every item URL returns 200 |
| FAQPage | 8 questions per article, and **every question appears in the visible text** |
| Duplicates | No duplicate node types or `@id`s per page |
| External validators | **NOT TESTED** (see summary) |

**On FAQPage.** The brief says not to add FAQPage just to chase a rich result.
These FAQs are visible on the page and answer real questions, and the existing
blog template emits FAQPage for every article's `faqs`. Removing it for five
articles alone would make them inconsistent with the other eighteen. Google
limits FAQ rich results to government and health sites, so no rich result is
expected; the markup is valid and describes visible content.

## Technical verification

All on a local production build (`next start`):

| Check | Result |
|---|---|
| Routes | 5 × 200, trailing slash |
| Title, description, canonical, H1 uniqueness | Unique across all 100 sitemap URLs (`seo-validate`) and across all 23 articles (unit test) |
| Sitemap | All 5 in `sitemap/blog.xml` with the production host |
| Robots | `robots.txt` unchanged (`Allow: /`, `Disallow: /api/`) |
| Internal links | 27 distinct destinations from the new pages, all 200 |
| Back-links | Every source page in the link map renders its link to the new guide |
| Orphans | None, across 100 URLs |
| Images | Hero images return 200 `image/webp`; OG images 200; 0 images without alt |
| Raw Markdown | 0 occurrences of `](` or `**` in the rendered text of the 5 new and 3 edited articles |
| Layout | 320, 375 and 1280 px: no horizontal overflow, tables in scroll containers, contents list present, 0 console errors |

**One defect was found and fixed during verification.** The Udyam guide's
opening answer had a link nested inside bold. The site's rich-text renderer
does not support that, so the page showed literal `[…](https://…)`, and the
unbreakable URL widened a 320 px layout by 2 px. The bold was removed, and a
test now fails if any article nests a link in bold. That test was confirmed to
fail with the defect present.

**Existing pages.** No layout or component was changed.

- Changed content: the three corrected articles; one contextual sentence each
  in two existing articles; the `related` lists of four existing articles; the
  guide-card swaps listed in the link map; `llms.txt`.
- The `vitest` config and the shared components are untouched on this branch.

**Unit tests** (`tests/blog-batch-2.test.ts`, 11):

- each new guide is published with a registered image, real dates, FAQs,
  sources and a disclaimer;
- titles and meta are unique across all articles;
- each new guide is linked from an existing page;
- no article gives a 30-day S&E deadline;
- no article calls director KYC annual;
- the GST guide does not offer a standalone GST service;
- no link is nested in bold.

## Remaining review requirements

These need a qualified professional or the owner. They are **not** resolved by
this work.

1. **Income-tax Act, 2025 section numbers.** The partnership-deed guide gives
   the partner remuneration and interest limits as they stood under s.40(b) of
   the 1961 Act. It says the 2025 Act carries a corresponding provision but
   does not name the new section. The limits were confirmed only from secondary
   sources. The Udyam guide describes the late-payment disallowance (formerly
   s.43B(h)) without a section number. A tax adviser should confirm both.
2. **GST Rule 14A.** This route is recent (from 1 Nov 2025) and was confirmed
   from secondary summaries of Notification 18/2025-CT. Confirm its current
   operation and conditions against the notification.
3. **Gujarat S&E.**
   - The 60-day deadline was read in the Act's text.
   - Forms A, B and D and the eNagar process come from secondary sources and
     the portal description.
   - Fee amounts are deliberately not stated.
   - The interaction with OSH Code registration (labour codes in force from
     21 Nov 2025) is flagged in the article as something to confirm.
4. **ADT-1 for the first auditor.** Stated as recommended rather than
   mandatory, following MCA's stated position. Re-check if MCA issues a
   circular.
5. **EPF/ESI thresholds** under the Code on Social Security, 2020. Stated as
   the traditional 20 and 10 with a "confirm" note.
6. **Raulji's service scope.**
   - The GST article says GST registration is handled as part of setting up a
     proprietorship, which is what `lib/services.ts` says.
   - The S&E FAQ says shop and establishment filing is handled as part of a
     proprietorship.
   - The owner should confirm both before publication.
7. **Unreachable source URLs.** Three official links in the articles could not
   be fetched from this network:
   - India Code handles 15202 and 2400 (timed out; both are the same URLs the
     existing live articles already cite);
   - `enagar.gujarat.gov.in` (connection failed).

   `cbic.gov.in` was also unreachable, so it is not linked; the reachable
   `cbic-gst.gov.in` is used instead. Three MCA URLs and one Income Tax India
   URL returned 403 to a script. Both sites block non-browser clients, and the
   existing live articles cite the same addresses. Open all seven in a browser
   once before publishing.
8. **Existing metadata.** The `/services/pvt-compliance/` meta description
   still opens "Stay compliant every year: … director KYC…". It is a
   client-approved string, so it was flagged rather than edited.

## Deployment

**Not deployed.** To publish:

1. Review the branch.
2. Merge it to `main`.
3. Push. Vercel deploys `main` to production.

Then re-run the production checks in this report against the live URLs, and run
the schema.org validator and Rich Results Test on the five URLs once they are
public.
