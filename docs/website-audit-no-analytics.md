# Website audit (excluding GTM/GA4) — 24 Oct 2026

**Scope.** Blog publishing, proprietorship and Udyam wording, company
compliance statements, the Gujarat page, and SEO and technical quality.
GTM and GA4 were excluded at the owner's request; nothing in them was
inspected or changed.

**What was audited.**

- **Production:** https://www.raulji.com, serving `main` at PR #33's tree.
  PR #34 failed to build and was reverted by PR #35, so `main` and production
  hold the same code.
- **Repository:** `main` at `28cc632`.

**Branch.** Fixes are on branch `fix/audit-wording`. **Not deployed.**

## Summary

| | Count |
|---|---|
| Findings confirmed in production | 8 (WA-02 to WA-08, WA-10) |
| Findings in source code or process only | 2 (WA-09, WA-11) |
| Fixed on the branch, not deployed | 4 (WA-02, WA-03, WA-04, WA-05) |
| Checks that could not be completed | 6 (see the last section) |
| Areas that passed | Blog publishing; crawl, indexing, metadata, schema, links |

## Five most important remaining issues

1. **WA-10: nothing stops a broken `main`.** PR #34 merged code that does not
   compile into `main` (fixed by PR #35). The repository has no CI, so nothing
   runs lint, typecheck or the build on a pull request. Add a GitHub Actions
   check on PRs to `main`, and make it required. *Owner (repository settings).*
2. **WA-06: mobile lab LCP is 4.3–4.7 s on three key templates.** The
   proprietorship service page, the city pages (Ahmedabad) and `/gujarat/`
   are affected. The cause is render delay from script work, not slow
   content: Lighthouse *observed* 0.6–1.5 s. Real-user data is unavailable,
   so it is not known whether visitors see this. Reduce the client-side
   payload (see SAI-21) and get CrUX or Search Console data.
3. **WA-02/03/05: wording errors on 35–43 pages.** Proprietorship timing was
   given as Udyam's, GST timing was unsourced, and Gujarat district coverage
   was conflated with city pages. All are **fixed on `fix/audit-wording`**;
   they need deploying.
4. **WA-07: brand blue `#329fd2` fails contrast** on every page tested, the
   only accessibility failure left (a11y 97). This is SAI-03 and needs a
   design decision.
5. **WA-04/WA-11: statutory statements need a qualified review.**
   - ADT-1 for the first auditor is legally unsettled. The wording is now
     neutral, but it needs CS review.
   - The Pvt compliance meta description still lists "director KYC" under
     "every year", but DIR-3 KYC is now triennial.

## Findings

Severity:

- **P1:** high business or technical impact.
- **P2:** accuracy, content or accessibility.
- **P3:** minor.

### Confirmed in production

| ID | Sev | Finding | Evidence | Status / recommended fix |
|---|---|---|---|---|
| WA-01 | — | **Blog publishing: PASS.** All 8 new guides return 200; all are on the blog index (26 article links) and in `sitemap/blog.xml` (26 URLs); self-canonical; `index, follow`; one H1; Article headline = H1; BreadcrumbList; every FAQ visible; no raw Markdown. No duplicate titles or descriptions across the 26 posts. All 29 internal links from the new guides return 200 | `audit2/blog.json`: live fetch of each URL, the index and the sitemap | None needed. **Missing pages vs stale crawl results:** none of the 8 is missing. `/blog/how-to-choose-business-structure-india-2026/` correctly 301s to the yearless slug, so a search result showing the old URL is a stale crawl, not a missing page. Whether Google still holds old URLs can only be confirmed in Search Console (not available) |
| WA-02 | P2 | **Proprietorship setup time shown as Udyam's time.** The structure chip "Udyam often same day" appears on **35 pages** (`/services/business-registration/`, `/gujarat/`, every city page, `/services/`). The comparison row "Udyam is usually same-day; …" for proprietorship appears on **36 pages**. A proprietorship has no incorporation; Udyam is one registration it may take | Live crawl text, 103 URLs; source `lib/structure-meta.ts`, `lib/comparison.ts`, `lib/services.ts` (×2), `lib/home-faqs.ts`, `app/compare/page.tsx` | **Fixed on branch.** The chip reads "Varies by registration". Rows and FAQs say there is no incorporation step and timing depends on the registrations needed; Udyam's time is stated separately ("usually issued online the same day") |
| WA-03 | P2 | **GST timing "commonly 7 to 15 working days"** on **43 pages**, unsourced and inconsistent with the GST guide (Rule 9: 7 working days, up to 30 with physical verification; Rule 14A: 3 working days) | Live crawl; the same source files | **Fixed on branch.** Now "generally granted within 7 working days of a complete application, or up to 30 days where the premises are physically verified (Rule 9, CGST Rules)" |
| WA-04 | P2 | **ADT-1 note attributed a position to MCA** ("The Ministry of Corporate Affairs has indicated…") that cannot be traced to an MCA document. Current sources show Rule 4(2) refers to s.139(1), the revised ADT-1 (from 14 July 2025) has a first-auditor option, and ICSI has sought MCA clarification | `/blog/after-company-incorporation-compliance-checklist/`; secondary sources (MCA site returns 403 to scripts) | **Fixed on branch**, wording only: it now states the rule and the form, calls the position unsettled, and notes companies file as a precaution. `updated` is set to 24 Oct 2026. **Needs CS review** |
| WA-05 | P3 | **Gujarat page conflated two "33"s.** "33 districts served" sat beside "dedicated pages for 33 of the state's main business markets", which are city pages covering only **27** of 33 districts | Live `/gujarat/`; `lib/cities.ts` (33 city pages, 27 distinct districts) | **Fixed on branch.** Hero: "serve every district. 33 cities and towns, covering 27 of the 33 districts, also have a dedicated city page." Districts lead: "We serve all 33 districts on the same terms; a dedicated city page is a separate thing. 27 districts have one or more…". Both numbers are computed from the data |
| WA-06 | P1 | **Mobile lab LCP** on 3 templates (median of 3 runs): `/services/proprietorship-registration/` 4.65 s, `/ahmedabad/` 4.56 s, `/gujarat/` 4.32 s. The LCP element is always text (hero paragraph or consent text), load 0 ms, **render delay 3.3–4.4 s**. Observed (unthrottled) LCP 0.6–1.5 s | Lighthouse 12 on production, 3 runs each | Open. The simulated delay is script execution: inline RSC payload of about 150 KB and client components on these templates. Reduce the hydration cost (SAI-21) and confirm with field data |
| WA-07 | P2 | **Brand blue contrast.** White on `#329fd2` and `#329fd2` text on white/light grey, 2.98:1 | Lighthouse: the only a11y failure on all 6 pages tested (a11y 97) | Open, owner decision (SAI-03) |
| WA-08 | P3 | **Thin internal linking** to `/blog/trademark-registration-india-guide/` (2 linking pages), `/services/it/` and `/services/digital/` (1 each) | Live crawl inlink counts | Open. A link from the registration pages' name-screening text would suit the trademark guide; that is client-approved service copy |
| WA-10 | P1 | **No CI on pull requests.** PR #34 merged unclosed JSX into `app/page.tsx` and `article-page.tsx`. Lint, typecheck and `next build` failed on `main`, and Vercel could not deploy. Production was protected only because the Vercel build failed | `git` history 469b5e2; local build of that commit; reverted by PR #35 | Open, owner. Add a GitHub Actions workflow running `npm ci`, lint, typecheck, test and build on PRs, and make it a required check on `main` |

### Found in source code or process only

| ID | Sev | Finding | Evidence | Recommended fix |
|---|---|---|---|---|
| WA-09 | — | **Kalol disambiguation: PASS.** `/kalol/` is Kalol in **Gandhinagar** district; the health-insurance guide is about Kalol in **Panchmahal** and is deliberately not tagged to the city page | `lib/cities.ts`; the article's header comment; the live `/kalol/` page links no Panchmahal article | None |
| WA-11 | P3 | **Pvt compliance meta description** reads "Stay compliant every year: AOC-4, MGT-7A, director KYC…". DIR-3 KYC has been triennial since 31 March 2026 | `lib/secondary-services.ts:161`; it is also live, but it is client-approved metadata | Not changed. Recommend rewording to drop "director KYC" from the "every year" list. Owner approval |

### Company compliance statements reviewed

Every statement about the first auditor, ADT-1, INC-20A, share certificates,
board meetings, the AGM, AOC-4, MGT-7/7A and DIR-3 KYC was listed from
`lib/services.ts`, `lib/secondary-services.ts` and the blog articles. Each was
compared with the Companies Act provisions checked on 23 Oct 2026:

| Statement | Basis | Result |
|---|---|---|
| First board meeting within 30 days | s.173(1) | Consistent |
| First auditor by the board within 30 days, or members within 90 days | s.139(6) | Consistent |
| Share certificates within 2 months | s.56(4)(a) | Consistent |
| INC-20A within 180 days; no business or borrowing before it | s.10A | Consistent |
| First AGM within 9 months; AOC-4 within 30 days, MGT-7/7A within 60 days of the AGM | ss.96, 137, 92 | Consistent |
| Audit from the first year regardless of turnover | s.139 | Consistent |
| DIR-3 KYC triennial from 31 March 2026 | G.S.R. 943(E) | Consistent everywhere except WA-11 |
| ADT-1 for the first auditor | Rule 4(2); revised form, 14 July 2025 | **Unsettled** (WA-04). Service copy "First auditor appointment, with Form ADT-1 filed to notify the Registrar" describes what the firm does, not a legal requirement, and is acceptable |

**Requiring qualified CA/CS review:** the ADT-1 position (WA-04), and the
INC-20A consequences as described, which are paraphrased. No statutory claim
was changed except the ADT-1 attribution, and that change removes a claim
rather than adding one.

## SEO and technical quality (production)

| Check | Result |
|---|---|
| Crawl | 103 sitemap URLs + 1, all 200; 0 broken internal links; 0 orphans |
| Canonicals | 103/103 self-referencing; 0 pages with more than one |
| Robots | `robots.txt` allows all and disallows `/api/`; only `/image-credits/` is noindex (by design) |
| Titles, descriptions, H1 | 0 duplicates; one H1 per page; 0 heading-level skips |
| Structured data | JSON-LD parses on all pages; 0 duplicate nodes; 485 FAQ questions, **all visible**. External validator not re-run (see below) |
| Crawler access | Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot and PerplexityBot all get 200 |
| Mobile UX (320/375/390 px) | No overflow; inputs 16 px; consent banner 47% / 37% / 29% of the viewport; menu, drawer, form errors and sticky bar work; 0 console errors |
| Lighthouse mobile, median of 3 | Home 97 perf / 97 a11y / 100 BP / 100 SEO; `/compare/` 97; blog guide 96; `/gujarat/` 84; `/ahmedabad/` 83; proprietorship 83. CLS 0 on all. BP and SEO 100 on all |

## Fix branch `fix/audit-wording` (not deployed)

**Changes:**

- `lib/structure-meta.ts`, `lib/comparison.ts`, `lib/home-faqs.ts`,
  `lib/services.ts` (2), `app/compare/page.tsx`: WA-02 and WA-03.
- `lib/blog/articles/after-incorporation-checklist.ts`: WA-04, with
  `updated` set to 2026-10-24.
- `app/gujarat/page.tsx`: WA-05, with computed counts.
- `tests/audit-wording.test.ts`: 7 tests. 6 fail on `main`; the seventh
  asserts the data fact that makes WA-05 possible.

**Checks:**

| Command | Result |
|---|---|
| `npm run lint` / `typecheck` | 0 / 0 |
| `npm test` | **170/170** |
| `npm run check:blog` | 0 errors |
| `npm run build` | passes `seo-validate` (103 URLs, unique titles and descriptions) |

On the local build, the new wording renders on `/gujarat/`, `/ahmedabad/`
and `/compare/` with no overflow at 640–1000 px.

## Checks that could not be completed

| Check | Why |
|---|---|
| Search Console: indexing, stale URLs, sitemap status, performance | No account access |
| CrUX / real-user Core Web Vitals | PageSpeed Insights API quota exhausted (HTTP 429, keyless) |
| External schema validator and Rich Results Test | validator.schema.org rate-limited this network the previous day and was not re-run; Rich Results needs a Google session. Internal JSON-LD checks passed |
| MCA primary text for ADT-1 | mca.gov.in returns 403 to scripts; secondary sources only |
| Real iOS/Android devices, screen readers | Not available |
| GTM / GA4 | Excluded by the owner |
