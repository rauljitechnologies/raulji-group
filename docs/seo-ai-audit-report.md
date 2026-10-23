# Raulji.com — SEO, AEO, GEO, LLM, AXO and AI search audit

**Date:** 23 Oct 2026
**Scope:** https://www.raulji.com (live) and this repository at `main` `880de84`
**Companion documents:**

- [seo-ai-issue-tracker.md](seo-ai-issue-tracker.md) — every issue, with its ID, priority, fix, effort and whether the owner must approve.
- [seo-ai-validation-evidence.md](seo-ai-validation-evidence.md) — what was run, and the raw results.

## Executive summary

**Verified issues: 26 unique root causes.** That is 0 P0, 7 P1, 9 P2 and 10 P3. The 26th (SAI-26) was found on re-verification later the same day.
A template defect is counted once, with its affected-page count recorded
separately.

**Fixed: 10.** They are on branch `seo/ai-search-audit`, each with a regression
test that fails on the old code. After the fixes, lint, typecheck, 125/125
tests and the production build with its SEO validator all pass. **Nothing is
deployed**, and no external account (GTM, GA4, Search Console, GBP) was touched.

**Open: 16.** 12 of them need the owner: an account, a legal answer, a brand
decision or content only the business can supply.

**What is in good shape.** The technical base is genuinely sound, and earlier
audits hold up under measurement:

- 95/95 sitemap URLs return 200 and are self-canonical with one H1 each.
- Titles and descriptions are unique.
- There are no broken links and no orphan pages.
- Structured data has 0 errors and 0 warnings on the schema.org validator and matches the visible text.
- All 13 search and AI crawlers tested receive the full HTML with no blocking.
- Keyboard navigation, the location drawer and form errors work correctly.
- No invented statistics or guarantees were found.

**What matters most.** None of it is crawling or indexing:

1. **Nothing is being measured.** The live GTM container is published with zero
   tags (SAI-01). The business cannot see which pages produce enquiries.
2. **The insurance offer has an unresolved licensing question,** and the site
   contradicts itself about it (SAI-02).
3. **Mobile experience.** Mobile LCP is 3.8–3.9 s in the lab, driven by the
   consent banner (SAI-04), and that banner covers 55% of a phone screen on
   first visit (SAI-15).
4. **Discoverability.** City pages are about 75% shared template (SAI-10), and
   the brand has almost no verified off-site identity (SAI-16). In the
   web-search index tested, raulji.com did not appear even for a search on its
   own domain name.

### Top 10 fixes, in order

| # | ID | Fix | Who |
|---|---|---|---|
| 1 | SAI-01 | Build and publish the GA4 tags and conversion in GTM, then verify in DebugView | Owner / agency with GTM access |
| 2 | SAI-02 | Settle the insurance licence position, then align `/services/insurance/`, the insurance posts and `llms.txt` | Owner + legal |
| 3 | SAI-16 | Verify Search Console and Bing. Claim the GBP. Add real profiles to `sameAs`. Separate or explain the phone line shared with Raulji Technologies | Owner |
| 4 | SAI-04 + SAI-15 | Server-render a compact consent banner so it neither is the LCP element nor covers half the phone screen | Engineering, design sign-off |
| 5 | SAI-05 | Insurance option on the enquiry forms | **Done (branch)** |
| 6 | SAI-06 | Homepage tablet overflow | **Done (branch)** |
| 7 | SAI-10 | Hand-written local sections for the 28 non-priority towns, or `noindex` the weakest until written | Owner content |
| 8 | SAI-03 | Accessible brand-blue token for text and filled buttons | Design approval |
| 9 | SAI-18 | Named authors, and a reviewer line where a qualified reviewer exists | Owner |
| 10 | SAI-21 | Cut the city-page payload (about 150 KB inline data, 39–53 images) | Engineering |

### Completed fixes (branch `seo/ai-search-audit`)

| ID | Fix |
|---|---|
| SAI-05 | "Insurance" added to the enquiry form and the contact wizard (rule 23). `/services/insurance/` preselects it |
| SAI-06 | Homepage horizontal overflow at 768–870 px removed |
| SAI-07 | Report-only CSP no longer logs a console error on every page. Best Practices goes from 96 to 100 |
| SAI-08 | 203 low-contrast text colours and 3 other failing greys brought to AA |
| SAI-09 | `llms.txt` no longer links a redirect, and it lists all 18 posts |
| SAI-11 | The post-build SEO validator checks the build it follows, and its stale homepage exception is removed |
| SAI-12 | ESLint ignores old build directories |
| SAI-13 | Homepage `<dl>` made valid, with the layout unchanged |
| SAI-14 | `/compare/` question headings read cleanly, at the right level |
| SAI-26 | `/gujarat/` region cards count districts, matching the "33 districts served" headline, and show the city pages each one opens |

### Remaining risks

- **Measurement.** Until SAI-01 is done, every SEO change, including these, is
  unmeasurable.
- **Legal exposure** on insurance (SAI-02), plus the statutory and price claims
  that `legal-content-review.md` still lists for professional review.
- **No field data.** PageSpeed Insights was over quota, so every performance
  figure here is lab data. Real-user LCP and INP are unknown.
- **AI visibility is untested.** No answer engine could be queried. This audit
  neither claims nor denies AI citations.
- **This working copy cannot build or commit** until file ownership is repaired
  (SAI-25). The branch lives in a separate worktree for that reason.

### Next actions

1. Run `sudo chown -R office:office "/media/office/Rtech240GB SSD/github/raulji-group"`
   and `npm ci` (SAI-25). Then review and merge `seo/ai-search-audit`, deploy,
   and re-run the Lighthouse table in the evidence doc against production.
2. Owner decisions, in this order:
   - SAI-02: insurance licence.
   - SAI-01: GTM access.
   - SAI-16: Search Console, GBP and profiles.
   - SAI-03 and SAI-15: brand blue and the banner design.
   - SAI-17, SAI-20, SAI-22 and SAI-24: quick yes/no calls.
3. Engineering: the SAI-04/15 consent banner, then the SAI-21 payload, then the
   SAI-19 redirects.
4. Content: SAI-10 town sections and SAI-18 bylines. Write them by hand, not by
   template (rules 17, 33, 34).
5. Re-test with a PSI API key or CrUX for field data, and run the buyer
   questions below in ChatGPT, Perplexity, Gemini and Google once the
   accounts exist.

## 1. Audit table by category

**Counting rules.** "Total checks" is the number of distinct checks run in
that category. Each failed check maps to an issue ID; one issue can fail checks
in more than one category, so the **issue** count (25) is the tracker's, not
the sum of this table. "Blocked" means the check needed access or a tool that
was not available, and it is **not** counted as passed.

| Cat. | Area | Checks | Pass | Fail | Warn | N/A | Blocked | Evidence (§ in evidence doc) | Issues | Worst | Owner approval |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A | Technical SEO | 19 | 15 | 0 | 2 | 0 | 2 | §1 crawl of 96 URLs, robots, sitemap, variants, redirect hops | SAI-19, SAI-23 | P3 | No |
| B | On-page SEO | 15 | 12 | 2 | 1 | 0 | 0 | §1 metadata and headings; §2 similarity | SAI-10, SAI-14, SAI-22 | P2 | SAI-10, SAI-22 |
| C | Local SEO | 11 | 5 | 3 | 1 | 0 | 2 | §1 NAP; §2 city uniqueness; §4 hours and address; §12 Gujarat claims | SAI-10, SAI-16, SAI-20, SAI-26 | P2 | Yes |
| D | AEO | 8 | 7 | 1 | 0 | 0 | 0 | Headings and FAQ coverage on the 4 structure pages, consulting, `/gujarat/`, `/compare/` | SAI-14 | P3 | No |
| E | GEO / LLM | 10 | 5 | 4 | 0 | 1 | 0 | §3 13-UA fetch, `llms.txt`; §9 authorship | SAI-02, SAI-09, SAI-16, SAI-18 | P1 | SAI-02, SAI-16, SAI-18 |
| F | Schema | 11 | 8 | 0 | 2 | 0 | 1 | §4 validator (9 pages), visible-content match | SAI-16, SAI-17 | P3 | Yes |
| G | AXO / UX / a11y | 16 | 8 | 6 | 0 | 0 | 2 | §6 Playwright; §7 Lighthouse | SAI-03, SAI-05, SAI-06, SAI-08, SAI-13, SAI-15 | P1 | SAI-03, SAI-15 |
| H | Performance | 10 | 3 | 3 | 2 | 0 | 2 | §5 Lighthouse (4 pages × 2 modes), curl TTFB | SAI-04, SAI-07, SAI-21 | P1 | No |
| I | Analytics / CRM | 9 | 5 | 2 | 0 | 0 | 2 | §8 live container, code tests | SAI-01 | P1 | Yes |
| J | Content trust / legal | 9 | 5 | 2 | 1 | 0 | 1 | §9 claim scan, bylines, legal spot-read | SAI-02, SAI-18 | P1 | Yes |
| K | AI visibility | 6 | 1 | 1 | 0 | 0 | 4 | §10 search-index check; question set below | SAI-16 | P2 | Yes |
| — | Repository / ops | 6 | 3 | 3 | 0 | 0 | 0 | §0 baseline | SAI-11, SAI-12, SAI-25 | P1 | SAI-25 |
| | **Total** | **130** | **77** | **27** | **9** | **1** | **16** | | **26 unique** | | **12 open** |

### What each check was

**A — Technical SEO (19 checks)**

Pass:

- sitemap index valid
- 95/95 sitemap URLs return 200
- crawl matches the sitemap (only the noindex `/image-credits/` is extra)
- canonicals are self-referencing
- `robots.txt` is valid and only `/api/` is closed
- no accidental noindex
- slashed legacy redirects take 1 hop
- 410/404 behave correctly
- 0 broken links
- 0 orphans
- apex and http go to www/https in 1 hop
- query-string URLs canonicalise
- uppercase URLs 404 rather than duplicate
- content is in the server HTML
- every sitemap entry has a lastmod

Warn: unslashed legacy URLs take 2 hops (SAI-19); the 404 page has two robots tags (SAI-23).

Blocked: Search Console coverage; Bing Webmaster Tools.

**B — On-page (15 checks)**

Pass:

- titles unique and within length
- descriptions unique and within length
- one H1 per page
- no skipped heading levels
- alt text present
- OG/Twitter present
- descriptive anchors
- city × structure pages distinct (max similarity 0.32)
- blog posts distinct
- homepage intent matches rule 5
- the two short legal titles accepted

Fail: city pages are ~75% template (SAI-10); `/compare/` heading text (SAI-14). Warn: two thin technology pages (SAI-22).

**C — Local (11 checks)**

Pass:

- phone consistent; the second line is labelled and limited to the insurance posts
- email consistent
- hours visible and matching the schema
- service area wording consistent ("Gujarat and India")
- no misleading street address

Fail: no verified external profiles (SAI-16); location pages templated (SAI-10); `/gujarat/` region cards counted city pages under a districts headline (SAI-26, fixed). Warn: 6 towns outside rule 17 (SAI-20). Blocked: GBP exists and is verified; GBP NAP match.

**D — AEO (8 checks)**

Pass:

- direct "What is…" definitions
- step-by-step process
- timelines with "our part / the authority's part" caveats
- fees split into professional and government
- comparisons (`/compare/` and the "vs" sections)
- visible FAQs matching the schema (421 questions)
- a direct answer to "how much does consulting cost"

Fail: extractable heading text on `/compare/` (SAI-14).

**E — GEO/LLM (10 checks)**

Pass:

- `robots.txt` allows OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Googlebot, Bingbot and Applebot
- no CDN/WAF variation across 13 UAs
- full content in the raw HTML
- consistent brand name
- statements cite official sources (MCA, India Code, IRDAI, MSME, Startup India)

Fail: `llms.txt` stale (SAI-09); `llms.txt` contradicts the insurance page (SAI-02); no verified off-site identity (SAI-16); no named authors (SAI-18).

N/A: training-crawler access (GPTBot, ClaudeBot, CCBot, Google-Extended) is currently allowed. That is an owner policy decision, not a defect, and **nothing was changed**.

**F — Schema (11 checks)**

Pass:

- JSON-LD parses on 96/96 pages
- validator: 0 errors and 0 warnings on 9 pages
- one Organization node per page
- FAQ matches the visible text
- BreadcrumbList valid
- Article complete
- Service has a provider
- no ratings or reviews

Warn: `sameAs` names a different entity (SAI-17); `ProfessionalService` with no street address (part of SAI-16). Blocked: Google Rich Results Test.

**G — AXO/UX/a11y (16 checks)**

Pass:

- keyboard order and visible focus
- skip link
- location drawer (ESC, focus, scroll lock, search)
- all inputs labelled
- error messages announced and focused
- alt text
- phone and WhatsApp reachable (above the fold, and in the sticky bar)
- trust signals (authority disclaimer, named Chairman, hours)

Fail:

- tablet overflow (SAI-06, fixed)
- off-token contrast (SAI-08, fixed)
- brand-token contrast (SAI-03)
- invalid `<dl>` (SAI-13, fixed)
- consent banner footprint (SAI-15)
- missing Insurance form option (SAI-05, fixed)

Blocked: screen-reader session; physical devices.

**H — Performance (10 checks)**

Pass: CLS 0 on every run; TTFB about 0.6 s; AVIF/WebP with a capped srcset.

Fail: mobile LCP (SAI-04); city payload (SAI-21); console error (SAI-07, fixed). Warn: desktop perf 88 on `/ahmedabad/`; mobile TBT 290 ms on `/` (both part of SAI-21). Blocked: CrUX field data; field INP.

**I — Analytics/CRM (9 checks)**

Pass, all at code level with tests passing:

- a single container installed
- consent default is denied
- events pushed for phone, email, WhatsApp, form and CTA
- `generate_lead` gated on CRM confirmation
- no PII in the dataLayer

Fail: GA4 tag absent from the live container; page views not recorded (one root cause, SAI-01). Blocked: GA4 DebugView; live CRM and email delivery.

**J — Content trust (9 checks)**

Pass:

- named, photographed Chairman
- publication dates
- official source links
- "not a government body" disclaimer
- no invented claims

Fail: no named author or reviewer on the business guides (SAI-18); insurance licence not shown (SAI-02). Warn: statutory figures were spot-read only (see `legal-content-review.md`). Blocked: price verification.

**K — AI visibility (6 checks)**

Pass: buyer question set prepared (below). Fail: raulji.com absent from 5/5 web-search queries (SAI-16). Blocked: ChatGPT, Perplexity, Gemini/AI Overviews, Claude.ai.

**Repository / ops (6 checks)**

Pass: lint, typecheck and tests in a clean checkout.

Fail: the working copy cannot build or commit (SAI-25); lint picks up old build output (SAI-12, fixed); the validator checks a stale build (SAI-11, fixed).

## 2. What "AXO" measured here

AXO is used as a working label, not a standard. Two things were measured:

1. **People completing the main task:** land, understand, contact. That covers
   layout at the eight breakpoints rule 25 names, keyboard and focus,
   labelled fields, announced errors, CTA and phone reach on mobile, and what
   covers the screen on first visit.
2. **Software agents completing it:** whether an automated agent or answer
   engine can read the page and act on it. That covers:
   - content in the raw HTML (not JS-gated)
   - the enquiry form server-rendered with real labels and no CAPTCHA wall
   - contact actions as plain `tel:`, `mailto:` and `wa.me` links
   - headings that read as clean questions
   - an accurate `llms.txt`

All of it holds except SAI-14 and SAI-09, both now fixed on the branch.

## 3. Prioritisation

| | Definition used | Issues |
|---|---|---|
| **P0** | Security, broken lead capture, accidental noindex, severe indexing block | **None found** |
| **P1** | High-impact crawl/indexing, conversion, mobile, core technical | SAI-01, 02, 04, 05✓, 06✓, 15, 25 |
| **P2** | Content, local, structured data, AEO/GEO | SAI-03, 08✓, 09✓, 10, 11✓, 16, 18, 21, 26✓ |
| **P3** | Optional, weak or unproven impact | SAI-07✓, 12✓, 13✓, 14✓, 17, 19, 20, 22, 23, 24 |

✓ = fixed on branch.

SAI-02 is P1 rather than P2 because of the legal exposure, not for SEO reasons.
SAI-25 is P1 because it blocks building and committing from this machine,
although it is not a production defect.

## 4. Findings in brief

Full detail, evidence and fixes are in the tracker. This section covers what
the numbers mean for the business.

**Indexing is not the problem.** Every URL Raulji wants indexed returns 200, is
self-canonical, is in the sitemap and is linked from the site. The discontinued
services resolve to 301s or 410s as the client decided in rule 15. The one gap
is cosmetic: an old URL typed without its trailing slash takes two hops instead
of one (SAI-19).

**City pages are the content risk.** The 20 city × structure pages are
genuinely distinct (largest overlap 0.32). The 33 city hubs are not. With the
town name masked, three-quarters of each page is text shared with nearly every
other town. Rules 17 and 35 name that pattern ("a page that would only differ
by a substituted city name must not ship"). The five priority cities and
Godhra have the most local material. The 28 smaller towns have about 300 unique
words each. This is the single largest on-page improvement available, and only
the business can write it.

**AEO is a strength.** The structure pages answer what it is, who it suits,
documents, process, how long (split into "our part" and "the authority's part")
and what it costs (professional fee separated from government fees). Their FAQs
match the visible text. The one defect, `/compare/`'s headings reading as
"1Will you have co-owners?", is fixed.

**GEO depends on identity, not markup.** Crawler access is open and clean,
the schema is valid, and `llms.txt` is now accurate. What an answer engine
lacks is corroboration:

- no Google Business Profile in `sameAs`
- no LinkedIn or directory profiles
- business guides authored by "Raulji Group" rather than a person
- a sister brand that outranks the group for its own name, publishing the same
  phone number

No markup change fixes that. It needs the owner's accounts and decisions
(SAI-16, SAI-18).

**Insurance needs a decision before any SEO work.** The insurance page says
Raulji helps "arrange" cover. Arranging insurance in India is an IRDAI-licensed
activity, and no licence is shown. `llms.txt` says insurance advice is outside
the group's remit. Both cannot be true. This audit does not say which one is
wrong; the owner must (SAI-02).

**Measurement is the blocker for everything else.** The site pushes a clean,
tested event set and gates `generate_lead` on CRM confirmation, but the
published container has nothing in it (SAI-01). The setup is documented in
`gtm-event-map.md` and waits only on account access.

## 5. AI visibility: buyer questions

These 25 questions are prepared for testing in ChatGPT search, Perplexity,
Gemini, Google AI Overviews and Claude once accounts are available. For each
one, record:

- date
- engine
- location setting (Gujarat / India)
- language (English, or Gujarati where noted)
- whether Raulji Group is mentioned
- any raulji.com URL cited
- the competitors cited
- whether the mention is a **citation** (a linked source) or **unlinked recall**

Do not infer visibility from schema presence.

**Registration — structure choice**

1. Which business structure should I choose to start a business in Gujarat?
2. Private limited company or LLP for a small manufacturing unit in Vadodara?
3. Partnership firm vs LLP — which is better for two partners in Surat?
4. Is a proprietorship registration enough to open a current account in Ahmedabad?
5. Can an LLP raise investment from angel investors?

**Registration — process, documents, time, cost**

6. How do I register a private limited company in Gujarat, step by step?
7. What documents do I need for LLP registration in India?
8. How long does company registration take with the MCA?
9. How much does it cost to register a private limited company in Gujarat, including government fees?
10. How do I register a partnership firm with the Registrar of Firms in Gujarat online?
11. Is partnership firm registration compulsory in Gujarat? What happens if I don't register?
12. What is the stamp duty on a partnership deed in Gujarat?

**Compliance after registration**

13. What annual filings does an LLP have, and what are the due dates?
14. Does a private limited company need an audit in its first year?
15. What happens if an LLP misses Form 8 or Form 11?

**Local providers**

16. Who can help with company registration in Vadodara?
17. Best business registration consultant in Rajkot? (watch for "best" claims in answers, not on our site)
18. Company registration services near Godhra / Panchmahal
19. LLP registration in Bharuch or Ankleshwar for an industrial unit
20. Gujarati: ગુજરાતમાં પ્રાઇવેટ લિમિટેડ કંપની કેવી રીતે રજીસ્ટર કરવી? ("How do I register a private limited company in Gujarat?")

**Consulting**

21. Where can a small business in Gujarat get business structuring advice?
22. Should I restructure my proprietorship into a private limited company as I grow?
23. Business consultant for family businesses in Vadodara

**Brand / entity**

24. What is Raulji Group?
25. Is Raulji Group the same company as Raulji Technologies?

Question 25 is the direct test of SAI-16. The shared phone number makes a
conflated answer likely.

## 6. What was deliberately not done

- No deployment, GTM change, GA4 change, Search Console or GBP change, or
  crawler-permission change.
- No new pages, no city pages, no blog posts, no generated content.
- No change to the insurance wording, the brand colour, the consent-banner
  behaviour, `sameAs`, or the six extra town pages. Each of those is an owner
  decision, recorded in the tracker.
- No test lead sent to the production CRM.
