# Live audit — findings, fixes and test methods

Each reported or discovered finding, the evidence for it, the file it lives in,
its severity, what was done and how that was tested.

**Date: 2026-10-18.** Measured against a local production build
(`npm run build && npm start`), not estimated.

The narrative of each audit round is in [site-audit.md](site-audit.md). Legal
claims and their provisions are in
[legal-content-review.md](legal-content-review.md). This file is the register:
one row per finding, including the ones that turned out not to be defects.

Severity is business impact, not effort. **P0** critical security, production
or broken enquiry functionality · **P1** important SEO, conversion, legal
accuracy or usability · **P2** meaningful performance, accessibility, content
or internal-linking · **P3** polish.

## Fixed

### P1 — LLP late-filing fee described under a regime that ended in 2022

| | |
| --- | --- |
| **Evidence** | 15 passages: "no upper limit", "uncapped daily late fees", "a per-day penalty that keeps accruing". G.S.R. 173(E) of 4 March 2022 replaced the flat ₹100/day with banded multiples of the normal fee from 1 April 2022. |
| **Files** | `lib/services.ts`, `lib/city-services.ts`, `lib/secondary-services.ts`, `lib/blog/articles/pvt-vs-llp.ts`, `structure-guide.ts`, `registration-mistakes.ts`, `choose-business-structure.ts` |
| **Impact** | Wrong information about money, stated as fact, on the pages that exist to win registration work — and it overstates the penalty, so it reads as scare-selling. Wrong for over four years; survived two prior audits that read content for tone rather than against the law. |
| **Fix** | All 15 now say the fee increases with the length of the delay. No multiplier or rupee figure, because the sources disagree on the detail. |
| **Test** | `grep -rnE "no upper limit\|uncapped\|no ceiling\|per-day penalty\|charged per day" lib app components` → only 3 hits remain, all about the number of partners in an LLP, which is correct. Rendered HTML re-checked on `/services/llp-registration/`. |

### P1 — First auditor's appointment attributed to Form ADT-1

| | |
| --- | --- |
| **Evidence** | "The first auditor must be appointed within 30 days **through Form ADT-1**". Appointment is by board resolution under s.139(6); ADT-1 is a notice, and r.4(2) of the Companies (Audit and Auditors) Rules 2014 ties that notice to s.139(1), not s.139(6). |
| **Files** | `lib/services.ts` (×2), `lib/secondary-services.ts` |
| **Impact** | Asserts a filing obligation the rules do not clearly impose, on the Private Limited page. Master rule 11 requires legally accurate service-page content. |
| **Fix** | States the statutory fact — the board appoints within 30 days — without the filing duty. ADT-1 kept once, as a description of what Raulji Group files. |
| **Test** | `grep -rn "ADT-1" lib app components` → one hit, in the compliance service description. Rendered HTML re-checked on `/services/pvt-registration/`. Provisions recorded in [legal-content-review.md](legal-content-review.md). |

### P2 — Two contact-wizard choices read as duplicates

| | |
| --- | --- |
| **Evidence** | The client reported "Business Consulting / Consulting" and "Something else / Other" as duplicated options. They are not duplicate options — but each card renders its label above a caption taken from its `group` field, and those two cards were captioned with a restatement of their own label. The cards are a flat grid, so no hierarchy made the repetition look deliberate. |
| **File** | `components/forms/contact-wizard.tsx` |
| **Fix** | Captions now carry information: "Strategy and planning" and "Tell us in the next step" — the latter accurate, since step 2 asks "Anything else we should know?". Submitted `value` unchanged on both, so CRM lead-source labels are unaffected. |
| **Test** | `curl -s localhost:3000/contact/` and read the label/caption pairs out of the rendered HTML. All five captions now add information. |

### P2 — Homepage meta description exceeded the truncation point

| | |
| --- | --- |
| **Evidence** | Rendered description was 165 chars. Master rule 5's wording is 187; the client's supplied candidate is 163. All three truncate at ~160. |
| **File** | `app/page.tsx` |
| **Fix** | 155 chars, using "business structuring" — the term already in `SITE.description` and master rule 8. Consulting leads; scope stays India-wide. |
| **Test** | Measured the rendered `<meta name="description">` from the live local server: 155. The crawl asserts ≤160 on all 95 pages. |

### P3 — Deployment runbook sat outside `docs/`

| | |
| --- | --- |
| **Evidence** | The client's prompt lists `docs/deployment.md`; the runbook was at `DEPLOYMENT.md` in the repo root. |
| **Files** | `DEPLOYMENT.md` → `docs/deployment.md`; pointers in `docs/production-checklist.md`, `docs/analytics-events.md` |
| **Fix** | `git mv`, **moved not copied** — two runbooks drift apart, and a stale runbook is what caused the analytics defect found on 2026-10-17. Live pointers updated; dated audit entries still name it as it was at the time. |
| **Test** | `grep -rn "DEPLOYMENT.md"` → remaining hits are all historical audit narrative. No build reference. |

## Checked and found sound — no change made

Recorded so the next audit does not re-raise them, and because not inventing
problems matters as much as finding them.

| Area | Evidence | Verdict |
| --- | --- | --- |
| Success shown on a rejected submission | Both forms gate on `result.success`, not `response.ok`, and a non-JSON response falls into the `catch`. A 500 from the API renders the error state. | **Correct.** Verified live: a valid payload with no CRM key returns 500 and the form shows the failure message. |
| Duplicate submissions | Submit button `disabled={status === "submitting"}` in both forms, plus server-side rate limiting. | **Correct.** 12 rapid posts → 4 accepted, then HTTP 429. |
| Honeypot counted as a conversion | API answers a honeypot hit `{success:true}` so the bot learns nothing; both components skip `form_submit` when the honeypot is filled. | **Correct**, fixed 2026-10-17. |
| Validation messages | 7 payload shapes tested against `/api/lead/`. | **Correct.** Friendly sentences on every path; no raw Zod `Required` leaks. |
| Contact destinations | `tel:+918511187689`, `https://wa.me/918511187689`, `mailto:admin@raulji.com` in rendered HTML. | **Match** the verified numbers in `CLAUDE.md` and `lib/site.ts`. |
| `LeadForm` "duplicate" options | The homepage/service select uses `<optgroup label="Consulting">` and `label="Something else"`. An optgroup label is not selectable and the browser indents its children. | **Not a defect.** Hierarchy is self-evident; left alone. |
| Registration page fee breakdown | Every service carries `CostLine[]` with a `setBy` field. All four resolve to Raulji Group / MCA or MSME / state government / taxes, and `timeline` splits `ours` from `authority`. | **Already correct** and satisfies master rule 12. Figures themselves still need checking — see legal-content-review.md. |
| City pages templated by substitution | 33 cities, 550 distinct prose sentences. After neutralising the city name, **0 sentences appear in more than one city**. | **Hand-written, not templated.** |
| City × service pages | 20 entries — exactly the set master rule 17 permits. 582 distinct sentences, 650–752 prose words each; 6 sentences shared across pages, all statutory facts that are identical in every city. | **Hand-written.** Shared law is not duplication. |
| Implied physical offices | No "our office in", "visit our", "branch in" anywhere in the city data. `lib/cities.ts` documents that Raulji Group is based in Vadodara and serves the rest of Gujarat remotely; city copy says so. | **Correct.** Remote service is distinguished from an office. |
| Analytics event names | All 13 names in the `EventName` union are documented; `form_submit` is named the primary conversion in both `analytics-events.md` and the runbook. | **Correct**, fixed 2026-10-17. |
| SEO baseline | 95/95 sitemap URLs HTTP 200, self-referencing canonicals, exactly one `<h1>`, no duplicate titles or descriptions, all titles ≤60 and descriptions ≤160 decoded, 103 internal links all 200. | **Sound.** |
| Redirects | `/services/legal/`→301 registration pillar · `/services/finance/`→301 `/services/` · `/services/gst-din-mca/`→301 `/` · `/services/land-investment/`, `/rentals/`→410 · unknown→404. | **Matches master rule 15 exactly.** |
| Security headers | All six present including HSTS and CSP report-only. | **Correct.** |

## Declined, with reasons

| Proposal | Decision |
| --- | --- |
| Homepage title → "Business Consulting & Registration Services in India \| Raulji Group" | **Not applied.** Registration-led and geography-qualified — the shape master rule 5 records the client rejecting on 2026-10-16, whose own note says registration-in-Gujarat belongs to `/gujarat/` and the homepage should target the brand. Current title is 46 chars and matches rule 5. Applying it needs a deliberate client override, not a re-run prompt. |
| Homepage H1 → "Business Consulting & Registration Services for Entrepreneurs in India" | **Not applied.** Master rule 4 fixes the H1 and the 2026-10-16 resolution kept it. The prompt itself says to use the wording only if it reflects the business and not to change the H1 blindly. |

## Open

| Item | Status | Needs |
| --- | --- | --- |
| Preview and production deployment | **BLOCKED** | `vercel whoami` → "Logged out"; no `.vercel/` directory. CLI is installed. Nothing deployed. |
| Production smoke test | **BLOCKED** | A deploy. |
| End-to-end lead delivery | **NOT VERIFIED** | `RAULJI_CRM_API_KEY` unset, so the route returns 500 before calling the CRM. The guard is verified; delivery is not. Test with the key set, against a non-production CRM target. |
| GA4 / Search Console / CRM data | **BLOCKED** | Credentials. The funnel question cannot be answered from the repository. |
| Responsive QA at 320–1920 px | **NOT VERIFIED** | A browser. Breakpoint CSS and overflow containers were read, not rendered. |
| Core Web Vitals field data | **NOT VERIFIED** | CrUX or a Lighthouse run. Lab proxies only; do not report a score without one. |
| Hero image sharpness | **REQUIRES MANUAL ACTION** | `public/photos/home-hero.webp` is 1600×1067 against ~2360 px at 2×. No higher-resolution source in the repo; upscaling would invent detail. Re-export at ~2400 px to the same path. |
| LLP audit threshold reading | **REQUIRES PROFESSIONAL REVIEW** | A CA or CS. See legal-content-review.md. |
| Government fees and published prices | **NOT VERIFIED** | Current MCA and state schedules, plus the owner's approval before any price changes. |
| Dependency advisories | **ACCEPTED** | 2 remain, both the postcss bundled inside Next. Build-time only; the fix is a Next 16 major and should be scheduled, not bundled into a deploy. |
| Lead-loss fallback | **NEEDS A DECISION** | If the CRM is down the lead is lost. Options sized in production-checklist.md. |

## Verification run

Commands and their actual results on the final state of this round:

```
npm run typecheck   pass, no output
npm run lint        pass, no output
npm run build       pass — 97 prerendered pages
  postbuild         seo-validate: 95 sitemap URLs, 95 unique titles,
                    95 unique descriptions. Passed.
npm run check:blog  18 articles, 0 errors, 4 warnings (all pre-existing:
                    two in files untouched this round, two over the
                    word-count target by 100+ words)
npm audit --omit=dev 2 vulnerabilities (1 moderate, 1 high) — unchanged,
                    both inside Next's bundled postcss
```

Plus, against `npm start`: the 95-URL crawl, 103 internal links, the redirect
table, 7 lead-API payload shapes, the rate-limit burst and the security
headers, all recorded above.
