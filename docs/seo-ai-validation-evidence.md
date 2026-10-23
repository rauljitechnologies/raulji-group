# SEO / AI search audit — validation evidence, 23 Oct 2026

What was run, against what, and what came back. Every figure in the audit
report and the issue tracker traces to a section here. Anything that could not
be run is listed as **BLOCKED** with the reason. Nothing blocked is counted as
passed.

- **Live target:** https://www.raulji.com, served by Vercel (`server: Vercel`,
  edge `bom1`), 07:51–09:40 UTC on 23 Oct 2026.
- **Repository:** `main` at `880de84`. Fixes are on branch
  `seo/ai-search-audit`.
- **Tools:**
  - Node 24.22.1
  - cheerio 1 (HTML parsing)
  - Lighthouse 12 with Chrome stable (headless, default mobile throttling and `--preset=desktop`)
  - Playwright-core 1.64 with Chrome stable
  - the schema.org validator (`validator.schema.org/validate`)
  - curl

## 0. Baseline: repository checks before any change

**Main working copy, as found:**

| Command | Result |
|---|---|
| `npm run lint` | **FAIL**. The local `node_modules` resolved ESLint 6.4.0, which had no config; `package.json` declares ESLint 9 |
| `npm run typecheck` | **FAIL**. `Cannot find module 'vitest'` and related errors in `tests/` |
| `npm test` | **FAIL**. `vitest: not found` (exit 127) |
| `npm ci`, then lint | **FAIL**, 12 errors, all in the gitignored `.cache/next/` (SAI-12) |
| `npm ci`, then typecheck | pass |
| `npm ci`, then tests | 115/115 pass |
| `npm run build` | **FAIL**. `EACCES: permission denied, unlink '.next/server/_error.js'`. `.next/` is owned by root |
| `NEXT_DIST_DIR=.next-audit npm run build` | **FAIL**. `EACCES ... open 'tsconfig.json'`, which is owned by root, mode 755 |

**Ownership.** `find . -user root` (excluding `node_modules` and `.next*`) finds
625 of 950 files. 179 entries under `.git/` are root-owned, including object
directories without write access. `git stash` failed with "insufficient
permission for adding an object to repository database". See SAI-25.

**Clean worktree.** `git worktree add`, all files owned by the user, then `npm ci`:

| Command | Result |
|---|---|
| `npm run lint` | exit 0 |
| `npm run typecheck` | exit 0 |
| `npm test` | 8 files, **115/115** pass |
| `npm run build` | exit 0. 108 static pages; postbuild `seo-validate` reported 97 prerendered pages, 95 sitemap URLs, 95 unique titles, 95 unique descriptions — "Passed." |

So the code itself was green. Every baseline failure came from the working
copy's environment.

## 1. Crawl (A, B, C)

`crawl.mjs` read the sitemap index (4 child sitemaps), queued all 95 `<loc>`
entries and the homepage, and followed every same-origin `<a href>`. It used
`redirect: manual`, so every hop was recorded.

| Measure | Result |
|---|---|
| URLs crawled | 96 (95 sitemap + `/image-credits/`) |
| Non-200 responses | 0 |
| Sitemap URLs not returning 200 | 0 |
| 200 HTML pages not in the sitemap | 1: `/image-credits/`, which is `noindex, nofollow` (correct) |
| `noindex` on an indexable page | 0 |
| Canonical ≠ URL / canonical count ≠ 1 | 0 / 0 |
| H1 count ≠ 1 | 0 |
| Heading level skips / first heading not H1 | 0 / 0 |
| Duplicate titles / descriptions / H1s | 0 / 0 / 0 |
| Title > 60 characters | 0. Two under 30: `/privacy/` and `/disclaimer/`, which are accepted exceptions |
| Description outside 110–160 characters | 1: `/image-credits/` (noindex) |
| OG/Twitter missing; `og:url` ≠ canonical | 0; 0 |
| `<img>` without `alt` | 0 |
| Anchors with no accessible text | 0 |
| Form inputs without a label | 0 |
| Pages without `<main>` or a skip link | 0 |
| Orphans (no inbound link from another page) | 0 |
| Pages with fewer than 3 linking pages | `/services/it/` (1), `/services/digital/` (1) — SAI-22 |
| Internal links to non-200 URLs | 0 |
| `lang` | `en-IN` on all pages |
| Median word count | about 1,470 (`/surat/proprietorship-registration/`) |
| Lowest word counts | `/services/digital/` 153, `/services/it/` 159, `/team/` 188 |
| Largest HTML | `/our-clients/` 478 KB (157 KB inline script), `/gujarat/` 427 KB, city pages 374–387 KB — SAI-21 |
| `tel:` targets | `+918511187689` sitewide. `+919558855668` on the 10 health-insurance posts only (the Chairman's insurance line, by design in `lib/blog/authors.ts`) |
| `mailto:` targets | `admin@raulji.com` only |
| JSON-LD types | Organization + ProfessionalService (96), WebSite (96), BreadcrumbList (95), FAQPage (85), Service (62), Article (18), Person (12), ItemList (2), Blog (1), CollectionPage (1) |

**Robots and host checks (curl).**

`robots.txt`:

```
User-Agent: *
Allow: /
Disallow: /api/
Host: https://www.raulji.com
Sitemap: https://www.raulji.com/sitemap.xml
```

- `https://raulji.com/` → 308 → `https://www.raulji.com/`
- `http://www.raulji.com/` → 308 → `https://www.raulji.com/`

**URL variants (curl).**

| Request | Result |
|---|---|
| `/services/llp-registration` | 308 → slashed form |
| `/SERVICES/LLP-REGISTRATION/` | 404 (no duplicate) |
| `?utm_source=x` | 200, canonical is the clean URL |
| `/index.html` | 404 |
| `/rentals/`, `/services/land-investment/` | 410 |
| `/services/legal/` | 301 → `/services/business-registration/` |
| `/services/gst-din-mca/` | 301 → `/` |
| `/industries/` | 301 → `/services/` |
| `/api/lead/` with GET | 405 |
| `/.well-known/security.txt` | 404 (SAI-24) |

**Redirect hop counts (curl -IL), SAI-19.** Each of these goes 308 → 301 → 200,
which is two hops:

- `/services/finance`
- `/services/legal`
- `/services/consulting`
- `/services/company-registration`
- `/business-registration`
- `/rent/abc`
- `/industries`

**404 page.** It carries two robots meta tags, `noindex` and `noindex, follow`
(SAI-23).

## 2. Near-duplicate content (B, C), SAI-10

`sim.mjs` computes 6-word shingles on `<main>` text and the Jaccard similarity
for every pair of pages in a group:

| Group | Pages | Mean Jaccard | Pairs > 0.5 |
|---|---|---|---|
| City hubs | 33 | 0.504 | 370 of 528 |
| City × structure | 20 | 0.164 | 0 (max 0.32) |
| Health-insurance posts | 10 | 0.048 | 0 |
| Business posts | 8 | 0.022 | 0 |
| Service pages | 11 | 0.076 | 1: `/services/it/` vs `/services/digital/`, 0.521 |

`uniq.mjs` then masked all 33 city names, so substituting a name does not
count as unique text. On each city page:

- **Unique shingles:** 21–24% on 28 towns, 26% on Godhra, 29% on Ahmedabad, Surat, Rajkot and Gandhinagar, 32% on Vadodara.
- **Shingles shared with at least 80% of the other city pages:** 62–75%.

## 3. Crawler access (E)

Fetching `/services/llp-registration/` with 13 user agents returned HTTP 200 and
an identical 336,005-byte body for all of them:

- Googlebot
- bingbot
- OAI-SearchBot
- ChatGPT-User
- GPTBot
- Claude-SearchBot
- Claude-User
- ClaudeBot
- PerplexityBot
- Perplexity-User
- CCBot
- Applebot
- python-requests

No WAF challenge, no UA-based variation. The training crawlers (GPTBot, ClaudeBot,
CCBot, and Google-Extended by robots token) are currently **allowed** by `User-Agent: *`.
That is an owner policy decision. Nothing was changed.

`llms.txt`: 200, `text/plain`. Before the fix it linked
`/blog/how-to-choose-business-structure-india-2026/`, which returns 301, and
listed 9 of 18 posts (SAI-09). It also says "Outside its remit: … insurance
advice", which contradicts `/services/insurance/` (SAI-02).

## 4. Structured data (F)

**schema.org validator** (`POST validator.schema.org/validate`, live URLs). All
nine pages returned `totalNumErrors: 0` and `totalNumWarnings: 0`:

| Page | Objects |
|---|---|
| `/` | 3 |
| `/services/llp-registration/` | 4 |
| `/ahmedabad/` | 7 |
| `/ahmedabad/llp-registration/` | 4 |
| `/blog/private-limited-company-vs-llp/` | 3 |
| `/blog/health-insurance-godhra-gujarat/` | 3 |
| `/about/` | 3 |
| `/gujarat/` | 3 |
| `/faqs/` | 3 |

**Visible-content match** (crawl script):

- 85 FAQPage nodes and 421 questions. Every question name and the first 60
  characters of every answer occur in the visible text.
- BreadcrumbList positions are sequential, and the last item is the page itself.
- All 18 Article nodes carry headline, datePublished, author, image and publisher.
- All 62 Service nodes carry a provider.
- There is one Organization node per page.

Opening hours (Mon–Sat 09:00–19:00) and "Vadodara, Gujarat" appear in the
visible text of `/`, `/contact/` and `/about/`, matching the markup.

**Google Rich Results Test: BLOCKED.** It is a browser tool behind a Google
session and was not run. FAQ rich results are limited to government and health
sites in any case.

## 5. Performance (H) — lab only

**PageSpeed Insights API: BLOCKED.** It returned HTTP 429, "Quota exceeded for
quota metric 'Queries' and limit 'Queries per day'" (keyless). So **there is no
CrUX field data** in this audit. LCP, INP and CLS below are lab values from local
Lighthouse 12 against the live site. INP cannot be measured in the lab; TBT is
the proxy.

| Page | Mode | Perf | LCP | CLS | TBT | FCP | Weight | LCP element |
|---|---|---|---|---|---|---|---|---|
| `/` | mobile | 82 | 3.8 s | 0 | 290 ms | 1.3 s | 494 KiB | consent-banner paragraph |
| `/services/llp-registration/` | mobile | 86 | 3.9 s | 0 | 150 ms | 1.2 s | 502 KiB | hero paragraph |
| `/ahmedabad/` | mobile | 88 | 3.8 s | 0 | 70 ms | 1.2 s | 610 KiB | consent-banner paragraph |
| `/contact/` | mobile | 99 | 2.1 s | 0 | 60 ms | 1.0 s | 417 KiB | consent-banner paragraph |
| `/` | desktop | 99 | 0.9 s | 0 | 0 ms | 0.3 s | 833 KiB | hero image |
| `/services/llp-registration/` | desktop | 98 | 1.1 s | 0 | 0 ms | 0.3 s | 793 KiB | H1 |
| `/ahmedabad/` | desktop | 88 | 0.6 s | 0 | 290 ms | 0.3 s | 1,083 KiB | hero image |
| `/contact/` | desktop | 100 | 0.5 s | 0 | 0 ms | 0.3 s | 756 KiB | consent-banner paragraph |

**Mobile LCP breakdown.**

| Page | TTFB | Render delay |
|---|---|---|
| `/` | 732 ms | 3,065 ms (81%) |
| LLP page | 618 ms | 3,300 ms (84%) |
| `/ahmedabad/` | 627 ms | 3,150 ms (83%) |

The LLP mobile run measured an *observed* (unthrottled) LCP of 2,506 ms against
a simulated 3,918 ms.

**curl TTFB** for the homepage was 0.57 s (Vercel cache HIT, 248 KB).

Lighthouse also flagged, on every page:

- 76 KiB of unused JS
- 11–12 KiB of legacy JS
- a preconnect hint for googletagmanager.com
- DOM size of 942–1,292 nodes

## 6. Browser checks (G) — Playwright, live site, then the local build after the fixes

**Horizontal overflow** at 320, 375, 390, 414, 768, 1024, 1280 and 1440 px across:

- `/`
- the LLP page
- `/ahmedabad/`
- `/ahmedabad/llp-registration/`
- `/contact/`
- `/gujarat/`
- `/compare/`
- one blog post
- `/services/insurance/`

The only failure was `/` at 768 px. A finer sweep showed overflow from 768 to
834 px: `scrollWidth` 872 against `clientWidth` 768–834. The cause was the
840 px `<figure>` (SAI-06). **After the fix:** no overflow at 640, 700, 744,
768, 800, 820, 834, 900 or 1000 px.

**Mobile, 375×667:**

- The consent banner is 366 px tall, 55% of the viewport (SAI-15).
- 2 `tel:` links are visible above the fold.
- After consent, the sticky bar (57 px) offers Call, WhatsApp and Start Business.
- 11 targets are under 24 px, all inline text links, which WCAG 2.5.8 exempts.

**Keyboard on `/`:** the first 14 Tab stops run skip link → phone → email → logo
→ nav → CTAs. Every one shows a 3 px solid outline.

**Location drawer:**

- Enter opens it: `role=dialog`, `aria-modal=true`.
- Focus moves into it, on the input with placeholder "Search your city or town...".
- Body scroll is locked.
- Typing "vado" returns Vadodara.
- ESC closes it and returns focus to "Explore All Locations".

**Form errors:** submitting the empty LLP-page form sets `aria-invalid` on name
and phone, with the messages "Please enter your name." and "Enter a valid
10-digit mobile number." Focus moves to name, and an `aria-live` region is present.

**Not tested: BLOCKED.** No screen-reader session (NVDA, VoiceOver) and no
physical devices.

## 7. Accessibility and best practices — Lighthouse, mobile

**Before** (live site):

| Page | a11y | BP | Failing audits |
|---|---|---|---|
| `/` | 90 | 96 | color-contrast (8), definition-list, dlitem (8), errors-in-console |
| LLP page | 97 | 96 | color-contrast (2), errors-in-console |
| `/ahmedabad/` | 97 | 96 | color-contrast (6), errors-in-console |
| `/contact/` | 97 | 96 | color-contrast (5), errors-in-console |

The console error on every page was "The Content Security Policy directive
'upgrade-insecure-requests' is ignored when delivered in a report-only policy."

**After** (local production build of the branch):

| Page | a11y | BP | Remaining |
|---|---|---|---|
| `/` | 97 | 100 | color-contrast (1) |
| LLP page | 97 | 100 | color-contrast (1) |
| `/ahmedabad/` | 97 | 100 | color-contrast (1) |
| `/contact/` | 96 | 100 | color-contrast (1) |
| `/about/` | 96 | 100 | color-contrast (7) |

Every remaining contrast item is the brand token `#329fd2`: white on it at
2.98:1, or it as text on white at 2.98:1. That is SAI-03, which is open and
needs the owner's approval.

On `/contact/` the a11y score reads 97 → 96, but the failing elements went from
5 to 1. The score difference is Lighthouse weighting, not a regression.

## 8. Analytics (I)

- **Live HTML:** one container, `GTM-MSW79R28` (script and noscript), plus inline
  `gtag(` consent calls (Consent Mode default).
- **Live container:** `https://www.googletagmanager.com/gtm.js?id=GTM-MSW79R28`
  returns 200, 339 KB. Its `resource` block is
  `"tags":[], "predicates":[], "rules":[]`, with five built-in variables. **No
  GA4 tag, no trigger** (SAI-01). Because no page-view tag exists, duplicate
  page views cannot occur, and no page views are recorded either.
- **Code level:** `tests/analytics.test.ts` (11), `tests/consent.test.ts` (16) and
  `tests/lead-route.test.ts` (29) pass. They cover the event names, consent
  defaults, no PII in the dataLayer, and conversion gating on CRM confirmation.
- **BLOCKED:**
  - GA4 DebugView and GTM Preview — no account access.
  - Live CRM and email delivery — no authorised safe environment. No test lead
    was sent to production.

## 9. Content trust (J)

The crawl text was scanned for client counts, "years", "No.1", "best",
"guarantee", "100%", "award", "rated" and star ratings. There were **no
invented claims.**

- Every "guarantee" is a disclaimer ("We do not guarantee…") or the legal term
  "personal guarantees".
- Every "best" is descriptive ("best known for Patola weaving").
- The single count is "37 businesses named publicly as clients" on
  `/our-clients/`, which the page attributes to Raulji Technologies. The owner
  should confirm each named client agreed to be listed.

**Statutory statements spot-read, not verified against primary sources in this
audit:**

- LLP Form 11 by 30 May and Form 8 by 30 October.
- LLP audit above ₹40 lakh turnover or ₹25 lakh contribution.
- Statutory audit for a private limited company from its first year.

They agree with the LLP Rules and the Companies Act as generally stated. They
remain subject to the professional review recorded in `legal-content-review.md`.
**Prices** (₹9,999 / ₹7,999 professional fee plus government fees) were not
verified; they need the owner.

## 10. AI visibility (K)

**BLOCKED:** ChatGPT search, Perplexity, Gemini or AI Overviews, and Claude.ai.
No logged-in session or API access was available, so no answer engine was
queried and **no AI citation is claimed or denied**.

**Web-search index check.** These are search-engine results, not AI answers or
citations. Run 23 Oct 2026, English, standard mode; the search tool is US-located.

| Query | raulji.com in results? | What appeared instead |
|---|---|---|
| Raulji Group Vadodara business consulting | No | rauljitechnologies.com/contact-us (same phone, +91 85111 87689), smergers, dnb.com |
| LLP registration in Vadodara Gujarat | No | registerkaro.in, ebizfiling.com, patronaccounting.com, kanakkupillai.com, startupgrantsindia.com |
| private limited company registration Ahmedabad consultant | No | ascgroup.in, registerkaro.in, legalwiz.in, incorpx.io |
| partnership firm registration Gujarat Registrar of Firms online | No | registerkaro.in, kanakkupillai.com, qwikfilings.com |
| raulji.com | No | rauljitechnologies.com, plus unrelated pages |

Result: 0 of 5. This index is not Google India, and the result does not measure
Google rankings. Search Console is the authoritative check, and it is BLOCKED
because it needs owner access.

## 11. Fixes: before → after

The 10 regression tests are in `tests/seo-ai-audit.test.ts`. Run against the
**unfixed** code, all of them fail. The first 9 were run that way and the
output is below. The 10th (the `#9aa7b5` check) fails by construction, because
`contact-wizard.tsx` line 434 on `main` uses that colour on a visible label.

```
× SAI-07 … has no upgrade-insecure-requests while the policy is report-only
× SAI-09 … links no URL that redirects
× SAI-09 … links only blog posts that exist
× SAI-09 … lists every published blog post
× SAI-05 … the enquiry form offers Insurance
× SAI-05 … the contact wizard sends the same Insurance value
× SAI-05 … every secondary page preselects an option the form actually has
× SAI-08 … does not use #1a7cb0 …
× SAI-11 … reads NEXT_DIST_DIR rather than a hard-coded .next
Tests  9 failed (9)
```

**After the fixes**, in the worktree:

| Command | Result |
|---|---|
| `npm run lint` | exit 0 |
| `npm run typecheck` | exit 0 |
| `npm test` | 9 files, **125/125** pass (115 existing + 10 new) |
| `npm run build` | exit 0. `seo-validate` reported 97 pages, 95 sitemap URLs, 95 unique titles and descriptions — "Passed", with the homepage now held to the normal description range |

**Browser checks on the local build:**

- **Homepage `<dl>`:** structure valid. Value sits above label and the icon left of the text, vertically centred, in all 4 groups (same layout as before).
- **`/compare/`:** the five questions are H3s with clean text ("Will you have co-owners?").
- **`/services/insurance/`:** the select preselects "Insurance".
- **Contact wizard:** shows 9 cards, the last one full-width.
- **Console:** 0 errors.

The fixes that need a browser to confirm (overflow, `<dl>`, `/compare/` heading
text) are checked here rather than in a unit test.

Raw outputs (`crawl.json`, Lighthouse JSON, the Playwright scripts) were kept in
the session scratch directory and are not committed. The scripts are small
enough to re-create from the descriptions above.

## 12. Gujarat hub claims, re-verification (SAI-26)

**Production** (`/gujarat/`, fetched and parsed later on 23 Oct 2026):

- All 33 root-level city links on the page return 200.
- The hero says "33 districts served, one online process". The five region
  cards under it read 10 Central, 6 South, 10 Saurashtra, 2 Kutch, 5 North.
  `app/gujarat/page.tsx` computed those from `CITIES`, so they were city-page
  counts. Kutch is one district.
- The district list on the same page links 27 of the 33 districts to a city
  page. Chhota Udaipur, Dang, Gir Somnath, Mahisagar, Narmada and Tapi read
  "no city page yet, call +91 8511187689".

**After the fix** (Playwright, local production build of the branch, at 375 px
and 1280 px). Each card was clicked, and the city-page links visible in the
finder were counted:

| Card | Finder shows |
|---|---|
| 9 districts in Central Gujarat · 10 city pages | 10 |
| 7 districts in South Gujarat · 6 city pages | 6 |
| 11 districts in Saurashtra · 10 city pages | 10 |
| 1 district in Kutch · 2 city pages | 2 |
| 5 districts in North Gujarat · 5 city pages | 5 |

- Districts total 33 and match the headline. City pages total 33.
- No overflow, and 0 console errors.
- The "districts in" wording is screen-reader-only text, so the visible design
  is unchanged apart from the new city-page line.

**Tests:** 4 in `tests/seo-ai-audit.test.ts` (SAI-26). They check:

- every district is mapped to a region, and no unknown one is;
- every city page sits in a known district;
- the district counts total 33, with Kutch at 1 district and 2 city pages;
- the city-page counts total `CITIES.length`.

**Verification run:**

| Command | Result |
|---|---|
| `npm test` | 129/129 |
| `npm run lint`, `npm run typecheck` | exit 0 |
| `npm run build` | passes, including `seo-validate` |
