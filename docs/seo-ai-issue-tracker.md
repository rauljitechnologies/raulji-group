# SEO / AI search issue tracker — 23 Oct 2026

One row per **root cause**. A template defect that shows on 33 city pages is one
issue, with the affected count in its own column; it is not 33 issues.

Evidence for every row is in [seo-ai-validation-evidence.md](seo-ai-validation-evidence.md),
by the same ID. The narrative is in [seo-ai-audit-report.md](seo-ai-audit-report.md).

**Status key.** *Fixed (branch)* = fixed on branch `seo/ai-search-audit`, with a
regression test and a clean build, **not deployed**. *Open* = not changed.
**Owner** = needs the owner's decision, access or content before anyone can act.

## Totals

| | P0 | P1 | P2 | P3 | Total |
|---|---|---|---|---|---|
| Unique issues found | 0 | 7 | 8 | 10 | **25** |
| Fixed on branch | 0 | 2 | 3 | 4 | **9** |
| Open | 0 | 5 | 5 | 6 | **16** |
| Open, owner action needed | 0 | 4 | 4 | 4 | **12** |

No P0 was found: nothing is accidentally `noindex`, indexing is not blocked, no
secret is exposed, and the enquiry form posts and validates. The lead pipeline
into the CRM was **not** exercised live (no authorised test environment), so
"lead capture works" is supported by the passing route tests, not by a live
submission.

## Issues

| ID | P | Category | Issue | Affected | Status | Fix | Effort | Owner approval |
|---|---|---|---|---|---|---|---|---|
| SAI-01 | P1 | Analytics | The live GTM container `GTM-MSW79R28` is published with **zero tags**, so no GA4 page view, event or conversion is recorded in production. The site pushes the right events; nothing receives them. Already recorded as BLOCKED in `analytics-implementation.md`. | Sitewide | Open | Build the tags in `gtm-event-map.md`, Preview, DebugView, then publish | 0.5–1 day | **Yes** — GTM/GA4 access |
| SAI-02 | P1 | Legal / trust / GEO | `/services/insurance/` says "we help you understand and **arrange** cover" and offers advice on commercial, health and motor insurance. No IRDAI licence or intermediary registration is shown anywhere. Arranging insurance in India is a licensed activity. `llms.txt` contradicts the page by listing "insurance advice" as **outside** the group's remit. | 1 service page, 10 insurance posts, `llms.txt` | Open | Owner states the licence position. Then either show the registration number and insurer tie-up, or reword the page to education plus referral. Make `llms.txt` match whichever is true | 1–2 h after the decision | **Yes** — legal |
| SAI-03 | P2 | Accessibility | Brand blue `#329fd2` (`--primary`) fails WCAG AA both ways: white text on it is 2.98:1, and as text on white it is 2.98:1. It sits in the sitewide footer CTA, the default `Button` variant, outline buttons and `/about/` labels. | Sitewide (1 token) | Open | Darken the token used for text and filled buttons (e.g. `#1872a3`, 5.28:1 with white), or use navy text on the blue fill (the site already does this in places) | 2–4 h | **Yes** — brand colour |
| SAI-04 | P1 | Performance | Mobile lab LCP is 3.8–3.9 s on `/`, the LLP page and `/ahmedabad/` (unthrottled observed 2.5 s). Render delay is 81–84% of it. On 3 of 4 pages the LCP element is the consent banner's paragraph, which mounts after hydration. | 3 of 4 tested templates | Open | Server-render the banner and let a tiny inline script hide it when consent is already stored, so it paints with the page. Then re-measure, and check field data | 0.5–1 day + browser QA | No (engineering) |
| SAI-05 | P1 | Conversion | The enquiry form had no "Insurance" option, although master rule 23 lists it and `/services/insurance/` carries the form. Insurance enquirers had to file under "Other". | Form on ~85 pages + `/contact/` wizard | **Fixed (branch)** | Added "Insurance" to both forms (same CRM value). The insurance page now preselects it | Done | Rule 23 already requires it |
| SAI-06 | P1 | Mobile / UX | The homepage scrolled sideways between 768 px and about 870 px. A `<figure>` with `aspect-[21/9]` and `min-h-[22.5rem]` had no definite width, which forced a minimum width of 840 px. | `/` at tablet widths | **Fixed (branch)** | `w-full` on the figure | Done | No |
| SAI-07 | P3 | Technical | The report-only CSP included `upgrade-insecure-requests`, which browsers ignore in report-only mode. It logged a console error on every page and cost Best Practices points (96 → 100 after the fix). | Sitewide | **Fixed (branch)** | Removed it, with a note to restore it when CSP is enforced | Done | No |
| SAI-08 | P2 | Accessibility | Off-token colours under 4.5:1: text `#1a7cb0` on `#f4f7fa`/`#e8f5fb` (4.15–4.29:1), the footer disclaimer (4.13:1), the contact-wizard step labels and the `/about/` ordinals (`#9aa7b5`, 2.45:1). | 203 uses / 28 files + 3 spots | **Fixed (branch)** | `#1872a3` (4.75:1 or better), footer at 60% opacity, `#5b6778` for the greys | Done | No |
| SAI-09 | P2 | GEO / LLM | `llms.txt` was stale. It linked the redirected `/blog/how-to-choose-business-structure-india-2026/` and omitted 9 of the 18 published posts. | 1 file | **Fixed (branch)** | Corrected the URL and listed the Panchmahal series. A test now fails if `llms.txt` links a redirect, links a missing post or omits a published one | Done | No |
| SAI-10 | P2 | On-page / Local | City pages are mostly template. With city names masked, 62–75% of each page's main text is shared with at least 80% of the other city pages. Unique text is 21–32% (about 300–480 words). This is the "keyword-swapped" pattern rules 17, 21 and 35 warn against. | 33 city pages | Open | Write a genuinely local section for each of the 28 non-priority towns: local industry, the authorities that actually apply, real enquiries. Or `noindex` the weakest until written | 2–4 h per town | **Yes** — local content |
| SAI-11 | P2 | Pipeline | `seo-validate.mjs` read `.next` regardless of `NEXT_DIST_DIR`. A build into another directory was followed by a "Passed" on stale output. It also carried an out-of-date exception excusing a 165-character homepage description that no longer exists. | Build pipeline | **Fixed (branch)** | Reads `NEXT_DIST_DIR`. The exception is removed, and the homepage now passes the normal 120–160 check | Done | No |
| SAI-12 | P3 | Pipeline | ESLint ignored `.next/` but not `.cache/` or other `.next-*` directories, so `npm run lint` failed with 12 errors in a working copy holding an old build. | Dev tooling | **Fixed (branch)** | Ignore `.next-*/**` and `.cache/**` | Done | No |
| SAI-13 | P3 | Accessibility | The homepage "Key facts" `<dl>` was invalid (`dl > div > div > dt`). | `/` | **Fixed (branch)** | `dt`/`dd` are now direct children of each group. Layout verified unchanged | Done | No |
| SAI-14 | P3 | AEO | `/compare/` decision questions were H2s whose text read "1Will you have co-owners?", because the number badge was inside the heading. They also sat at the same level as their section heading. | `/compare/` | **Fixed (branch)** | Badge moved outside and `aria-hidden`; headings are now H3 | Done | No |
| SAI-15 | P1 | UX / conversion | The consent banner covers 366 of 667 px (55%) of a 375-wide phone screen on first visit, over the hero and the Call/WhatsApp bar. | Every first visit, mobile | Open | A compact single-row mobile layout, or a bottom sheet capped at ~30% height. Fix together with SAI-04 | 2–4 h | Design sign-off |
| SAI-16 | P2 | Local / GEO / AI visibility | Weak entity signals. In the web-search index tested, a search for `raulji.com` returned **no** raulji.com result, and neither did the brand or service queries (0 of 5). rauljitechnologies.com ranks instead and publishes the **same phone number**. `sameAs` lists no Google Business Profile, LinkedIn or directory listing, and GBP status is unknown. Schema types the group as `ProfessionalService` with no street address. | Entity-wide | Open | Verify Search Console and Bing Webmaster Tools. Claim or verify GBP. Add only real, owned profiles to `sameAs`. Decide whether the group publishes a street address. Give the brands distinct phone lines or state the shared line on both sites | Owner-led | **Yes** — accounts, address |
| SAI-17 | P3 | Schema | `sameAs` declares raulji.com **is** rauljitechnologies.com. `sameAs` means "same entity", but Raulji Technologies is a separate brand and is already modelled under `brand`. | Sitewide JSON-LD | Open | Remove it from `sameAs` and keep the `brand` node. Documented as deliberate in `lib/schema.ts`, so it is the owner's call | 15 min | **Yes** |
| SAI-18 | P2 | Content trust / GEO | The 8 business guides are bylined to "Raulji Group", not a named person, and no reviewer is shown for legal or tax statements. The insurance guides are bylined to the Chairman with no stated qualification. | 18 posts | Open | Named author(s) with a real role, plus a "reviewed by" line where a qualified reviewer exists. Do not invent credentials (rule 13) | Owner content | **Yes** |
| SAI-19 | P3 | Technical | Legacy URLs requested **without** a trailing slash take two hops (308 then 301). All 7 tested do. | 7+ legacy URLs | Open | Also match the unslashed source in `redirects()` with an explicit destination, and test hop counts | 1 h | No |
| SAI-20 | P3 | Local / governance | Six city pages are not in rule 17's list: `/jhalod/`, `/botad/`, `/amreli/`, `/porbandar/`, `/dwarka/`, `/kalol/`. They have been there since the first commit. | 6 pages | Open | Owner confirms they stay (and the list is updated) or they get 301s to `/gujarat/` | 15 min after the decision | **Yes** |
| SAI-21 | P2 | Performance | Heavy city templates: 374–427 KB HTML, about 150 KB of it inline RSC payload, 39–53 images and about 1,050 DOM nodes. Desktop TBT is 290 ms on `/ahmedabad/` (perf 88). Lighthouse flags 76 KiB of unused JS sitewide. | City pages, `/our-clients/` | Open | Move the location-drawer data off the initial payload (rule 27). Trim duplicate photo blocks. Audit client components | 1–2 days | No |
| SAI-22 | P3 | On-page | `/services/it/` and `/services/digital/` are thin hand-off pages (153–159 words, 52% similar, one inbound link each) for services delivered on another domain. | 2 pages | Open | Consolidate into one page, or `noindex` and keep for visitors | 30 min | **Yes** |
| SAI-23 | P3 | Technical | The 404 page emits two robots meta tags (`noindex` from Next, plus `noindex, follow`). Harmless; Google applies the most restrictive. | `/404` | Open | Optional | 15 min | No |
| SAI-24 | P3 | Security / trust | No `/.well-known/security.txt`. | Sitewide | Open | Add one with a real contact | 15 min | **Yes** — contact |
| SAI-25 | P1 | Repository / operations | In the local working copy, 625 of 950 files and 179 `.git/objects` directories are owned by root, apparently from a `sudo` run. `npm run build` fails with EACCES, and commits fail whenever an object hashes into a root-owned directory. `node_modules` was also stale (ESLint 6.4, no vitest) until `npm ci`. Not a production defect, but it blocks building and committing from this machine. | Local checkout | Open | `sudo chown -R office:office "/media/office/Rtech240GB SSD/github/raulji-group"`, then `npm ci` | 5 min | **Yes** — needs sudo |

## Checked and found sound (not issues)

Recorded so they are not re-audited from scratch:

- 95/95 sitemap URLs return 200 and are self-canonical with one H1 each.
- Titles and descriptions are unique and within length.
- There are no broken internal links and no orphan pages.
- JSON-LD parses on 96/96 pages. The schema.org validator reports 0 errors and 0 warnings on 9 pages, and all 421 FAQ questions and answers are visible on the page.
- All 13 crawler user agents tested get an identical 200, with no WAF blocking.
- Keyboard order, focus rings, the location drawer (ESC, focus, scroll lock, search) and form error messaging all behave correctly in a real browser.
- No invented statistics, awards, ratings or guarantees were found in the crawl text.

**FAQPage** markup is valid. Google has limited FAQ rich results to government and health sites since 2023, so it brings no SERP feature here. It still helps answer extraction, and no change is needed.
