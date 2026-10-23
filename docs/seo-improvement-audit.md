# Search Console improvement round — findings, fixes and evidence

**Date: 2026-10-22.** Prioritised against a Google Search Console performance
export for **14–20 October 2026**, supplied by the client in the brief. The
export itself is **not in the repository** — no CSV, no API credentials — so
the figures below are the ones the brief states, used as prioritisation
signals. Nothing here was derived from Search Console directly.

Measured against a local production build (`npm run build && npm start`), not
estimated.

Related: [live-audit-fixes.md](live-audit-fixes.md) is the register for the
2026-10-18 round · [seo-route-inventory.md](seo-route-inventory.md) is the
per-route crawl · [legal-content-review.md](legal-content-review.md) holds the
statutory claims · [site-audit.md](site-audit.md) is the narrative.

## What the supplied data does and does not support

| | |
| --- | --- |
| **Period** | 14–20 October 2026. Seven days. |
| **Totals** | 5 clicks · 205 impressions · CTR ≈ 2.44% · impression-weighted average position ≈ 27.32 |

Five clicks is not a trend. At these counts, a single click moves CTR by half a
percentage point, and a page with 13 impressions and 0 clicks is statistically
indistinguishable from one with 13 impressions and 1 click. **No claim in this
document asserts that a change improved rankings or traffic.** The data was
used for one purpose only: deciding which page to work on first.

What it does support is a structural read, because the *queries* are
informative even when the counts are not. Of the six priority queries, four are
**structure + state** queries:

| Query | Shape |
| --- | --- |
| Online registration of partnership firm in Gujarat | structure + state |
| Firm registration Gujarat | structure + state |
| Partnership firm registration in Gujarat | structure + state |
| LLP registration in Gujarat | structure + state |
| Sole proprietorship registration in Surat | structure + city |
| Company registration in Ahmedabad | structure + city |

That pattern, not the click counts, is what drove this round.

## Priority one — `/gujarat/`

### Confirmed issue: the page answered a navigational query, not a commercial one

| | |
| --- | --- |
| **Evidence** | 76 impressions — more than any other page in the period, including the homepage's 46 — at an average position of **53.57**, with 0 clicks. Four of the six priority queries are structure + state. |
| **Diagnosis** | The page was built as a **district directory**. Its title was "Business Registration in Gujarat: All 33 Districts", its description ended "Find your district's page", its H1 was "Business registration across all 33 districts of Gujarat", and its central argument — the section "Same process in Bhuj as in Vapi" — is that *location within Gujarat does not matter*. Every structure query was answered by a card link out to the central service page. So the page matched the state + registration tokens well enough to be shown 76 times, and satisfied none of the specific intents, which is a coherent explanation for ranking in the fifties rather than failing to rank at all. |
| **The content gap that matters** | The page's own thesis — that location is irrelevant because filing is central — **is not true of all four structures.** A partnership firm is registered with the **Registrar of Firms for Gujarat**, under state procedure, not through the MCA. That is the one genuinely state-level registration topic the site has, it is what three of the six priority queries are asking about, and it appeared on `/gujarat/` only as a single fact card and one FAQ line. The substantive treatment existed on city pages, the service page and three blog articles — on every page except the state page. |
| **Severity** | P1. The site's highest-impression page, and its state hub, had no on-page answer to the queries bringing it up. |

### What was changed

| Change | Detail |
| --- | --- |
| **Title** | `Business Registration in Gujarat: All 33 Districts \| Raulji` (59) → `Company, LLP & Firm Registration in Gujarat \| Raulji Group` (58). Leads with the three structure terms the priority queries use, keeps the state, keeps the full brand. Proprietorship does not fit inside 60 characters and stays in the description and on the page. |
| **Description** | Now "Register a Pvt Ltd company, LLP, partnership firm or proprietorship in Gujarat. What is filed centrally, what is state-level, and how to choose a structure." (156). Replaces "Find your district's page", which sold a directory. |
| **H1** | "Business registration across all 33 districts of Gujarat." → "Register a company, LLP or partnership firm anywhere in Gujarat." Still one H1. |
| **Hero copy** | Now names the central/state split in the opening paragraph instead of only listing the four structures. |
| **New section — "Partnership firms are registered in Gujarat, not centrally"** | ~470 words at `#state-level`, between the central-process section and the city finder. Covers: which authority registers each of the four structures; that the RoC office for Gujarat is at Ahmedabad; that a firm is created by the partners' deed under the Indian Partnership Act, 1932 and registered with the Registrar of Firms for Gujarat; that registration is optional but **section 69** bars an unregistered firm from suing to enforce a contract; that stamp duty on the deed is set at state level, uniform within Gujarat, and varies with capital; and that the firm needs its own PAN for a current account. Includes a "Who registers each structure" panel with the authority and level for all four. |
| **Two new FAQs** | "Can a partnership firm be registered online in Gujarat?" and "What is the difference between firm registration and company registration in Gujarat?" — the first two priority queries, answered on the page. Both render visibly and are in the `FAQPage` schema (7 entries, all visible). |
| **Internal links** | `/gujarat/` had **no link to `/services/business-registration/`**, which master rule 19 requires of it. Added, in prose. The four structure pages were linked only from cards; they are now also linked contextually from the new section's body copy with descriptive anchors. |

### What was deliberately not claimed

"Online registration of partnership firm in Gujarat" is the single
highest-intent priority query, and the tempting answer is to say the firm can
be registered online in Gujarat. **The site does not say that.** Whether the
Gujarat Registrar of Firms accepts online applications has not been verified
against a state government source, and it is recorded as **NOT VERIFIED**
below. The FAQ instead draws the true distinction — MCA filings are online end
to end, Registrar of Firms procedure is set by the state — and says the deed,
stamp duty, documents and PAN application are handled remotely. That answers
the user's real question without asserting a procedure the site cannot source.

Nothing else on the page was rewritten. The district pills, the city finder,
the comparison, the guides and the enquiry form are untouched, and the
33-district coverage survives in the hero stat and the districts section. It is
no longer what the page is *about*.

### Keyword density, measured after the change

3,043 visible words. "Gujarat" 64 (2.10%), "firm" 24 (0.79%), "Registrar" 21
(0.69%), "registration" 18 (0.59%). Within the new section alone: 469 words,
7 "Gujarat" (1.49%). Normal editorial usage for a state hub, not stuffing. Two
sentences were rewritten during review for exactly this reason — one repeated
"Gujarat" twice in a clause, and one lead described a proprietorship as
"settled under central law", which is imprecise because it has no incorporation
filing at all.

## Priority two — registration service pages

**Audited, no content changes made.** All four pages already carry every item
the brief's section 4 asks for, and the brief's instruction is to preserve
approved prices and scope. Field counts per page, read out of
`lib/services.ts`:

| Page | suitableFor | eligibility | documents | process | costs | whatWeHandle | afterRegistration | considerations | FAQs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/services/pvt-registration/` | 5 | 6 | 9 | 6 | 4 | 8 | 4 | 4 | 10 |
| `/services/llp-registration/` | 5 | 6 | 9 | 6 | 4 | 8 | 4 | 4 | 10 |
| `/services/partnership-registration/` | 5 | 6 | 10 | 6 | 4 | 7 | 4 | 4 | 9 |
| `/services/proprietorship-registration/` | 5 | 5 | 8 | 6 | 4 | 7 | 4 | 4 | 10 |

Every page also carries `law`, `authority`, `quickAnswer`, `takeaways`,
`customerProvides`, `compareWith`, a `timeline` split into `ours` and
`authority`, and `costs` where every line has a `setBy` naming who sets that
charge. Professional fees are published for Private Limited (₹9,999) and LLP
(₹7,999) from a single constant; Partnership and Proprietorship carry a quote
CTA rather than an invented figure. That satisfies master rule 12's separation
of professional, government and third-party charges.

**The figures themselves remain unverified** against current MCA and Gujarat
schedules — carried forward unchanged from the 2026-10-18 review, and still
requiring the owner's approval before any price moves.

## Priority three — city pages

**Audited, no changes made.** All five routes exist and return 200. Every one
already meets the brief's section 5 requirements:

| Route | Status | Title (len) | H1 | Canonical | Robots | Links to its 4 service pages | Links `/gujarat/` |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/godhra/` | 200 | 56 | 1 | self | index, follow | n/a — not a priority city | yes |
| `/ahmedabad/` | 200 | 59 | 1 | self | index, follow | 4 of 4 | yes |
| `/surat/` | 200 | 55 | 1 | self | index, follow | 4 of 4 | yes |
| `/vadodara/` | 200 | 56 | 1 | self | index, follow | 4 of 4 | yes |
| `/rajkot/` | 200 | 56 | 1 | self | index, follow | 4 of 4 | yes |

All five also link the registration pillar, all four central service pages and
business consulting. `/godhra/private-limited-company-registration/` correctly
returns **404**: Godhra is not one of the five cities master rule 17 permits
city × service pages for, and inventing one would breach that rule.

### On Ahmedabad, and on Godhra — read honestly

`/ahmedabad/` sits at position 52.69 while `/vadodara/` is at 26.61 and
`/surat/` at 27.46, on 13, 18 and 13 impressions. **No on-page defect explains
that**, and this audit did not manufacture one. Ahmedabad is the most
competitive registration market in the state; the page is correctly built,
correctly linked and correctly targeted, and `/ahmedabad/private-limited-company-registration/`
already exists as the dedicated target for "company registration in Ahmedabad".
A position in the fifties there is a domain-authority and competition outcome,
not a markup problem, and the fix for it is not a code change.

Godhra's 2 clicks from 8 impressions at position 7.62 is the best result in the
period, and the brief is right that it should not be generalised. Eight
impressions is noise. Godhra is also a genuinely low-competition market with
unusually deep supporting content in this repo — city photography and nine
locality blog articles — so there are at least two explanations and the data
cannot separate them. **Nothing was changed on `/godhra/`**, which is the
correct action when a page is performing and the reason is unknown.

## Technical SEO — re-verified this round

Full crawl of every sitemap URL against the local production build:

```
sitemap sub-maps              4 (core, services, locations, blog)
sitemap URLs                 95
HTTP 200                     95 / 95
unique titles                95 / 95        (all <= 60 chars)
unique descriptions          95 / 95        (all <= 160 chars, none empty)
exactly one <h1>             95 / 95
self-referencing canonical   95 / 95
noindex inside sitemap       0
<img> without an alt attr    0
internal link targets        103 distinct, 0 non-200
orphan sitemap URLs          0
```

Redirects and gone pages, all matching master rule 15:

| URL | Result |
| --- | --- |
| `/services/legal/` | 301 → `/services/business-registration/` |
| `/services/finance/` | 301 → `/services/` |
| `/services/gst-din-mca/` | 301 → `/` |
| `/services/land-investment/` | 410 Gone |
| `/rentals/` | 410 Gone |
| `/no-such-page/` | 404 |
| `/gujarat`, `/ahmedabad`, `/services/llp-registration` (no slash) | 308 → trailing-slash form |

`robots.txt` allows all, disallows `/api/`, declares the host and the sitemap.
Structured data on `/gujarat/`: Organization + ProfessionalService, WebSite,
BreadcrumbList, FAQPage. The FAQPage carries 7 questions and **all 7 render
visibly on the page**, which is what master rule 20 requires.

No redirect and no `noindex` was added this round.

## Forms and analytics — re-tested this round

Against `/api/lead/` on the running build:

| Test | Result |
| --- | --- |
| Valid payload, no CRM key configured | **HTTP 500**, `{"success":false,"error":"We could not submit the form. Please call +91 8511187689."}` — the form shows failure, not success, and offers the phone fallback. Correct. |
| Honeypot field filled | **HTTP 200** `{"success":true}` — the bot is told nothing, and the components skip the `form_submit` event on this path, so it is not counted as a conversion. Correct. |
| Missing name / short name / bad phone / bad email | HTTP 400 with a friendly sentence each. No raw Zod `Required` text leaked. |
| 12 rapid valid posts | 4 accepted (500, CRM absent), then **8 × HTTP 429**. Rate limiting active. |

**End-to-end lead delivery is still NOT VERIFIED.** `RAULJI_CRM_API_KEY` is
unset, so the route fails before it reaches the CRM. The guard is verified;
delivery is not. Per the brief, no test lead was sent to a live CRM.

Analytics: 13 event names in the `EventName` union, all documented in
[analytics-events.md](analytics-events.md), `form_submit` named as the primary
conversion. GTM is gated on `NEXT_PUBLIC_GTM_ID` and renders nothing when it is
unset, which is why no container appears in a local build. **See the deployment
note below — this is a build-time variable, and that matters.**

## Open and unverified

| Item | Status | Needs |
| --- | --- | --- |
| Whether the Gujarat Registrar of Firms accepts online applications | **NOT VERIFIED** | A Gujarat government source. The site deliberately does not claim it either way. Resolving this would let `/gujarat/` answer the highest-intent priority query directly. |
| Government fees, professional fees, timelines | **NOT VERIFIED** | Current MCA and Gujarat schedules, plus the owner's approval. Carried forward. |
| End-to-end lead delivery to the CRM | **NOT VERIFIED** | `RAULJI_CRM_API_KEY`, against a non-production CRM target. |
| GA4 / Search Console / CRM funnel data | **BLOCKED** | Credentials. The supplied export is a summary in the brief, not a file. |
| Core Web Vitals field data | **NOT VERIFIED** | CrUX or a Lighthouse run. No lab or field score is quoted anywhere in this document. |
| Responsive QA at 320–1920 px | **NOT VERIFIED** | A browser. The new section uses the page's existing grid pattern (`lg:grid-cols-[1.25fr_1fr]`, single column below `lg`) and adds no new table or fixed width, so it carries the same overflow behaviour as the sections around it — but it has been read, not rendered. |
| Preview and production deployment | **BLOCKED** | `vercel whoami` → logged out, no `.vercel/` directory. Nothing was deployed. |
| Hero image sharpness | **REQUIRES MANUAL ACTION** | Re-export `public/photos/home-hero.webp` at ~2400 px. Carried forward. |
| LLP audit threshold reading | **REQUIRES PROFESSIONAL REVIEW** | A CA or CS. See legal-content-review.md. |

## Deployment note — GTM is a build-time variable

`NEXT_PUBLIC_GTM_ID` is read in `components/layout/analytics.tsx`, and
`NEXT_PUBLIC_*` variables are **inlined by Next.js at build time**, not read at
runtime. Setting it only in the runtime environment of an already-built
deployment will leave the container absent and every event in master rule 29
unrecorded, silently. It must be present in the environment that runs
`npm run build`. The container ID is `GTM-MSW79R28`, recorded in `.env.example`.

Verified by building with the variable set and confirming the container ID is
present in the prerendered output; see the verification run below.

## Verification run

Final state of this round:

```
npm run typecheck      pass, no output
npm run lint           pass, no output
npm run build          pass — 97 prerendered pages
  postbuild            seo-validate: 95 sitemap URLs, 95 unique titles,
                       95 unique descriptions. Passed.
crawl (95 URLs)        95x 200, 0 issues
internal links         103 targets, 0 non-200, 0 orphans
redirect table         matches master rule 15 exactly
lead API               5 payload shapes + 12-post burst, as tabled above
```

Baseline before any edit was identically green, so none of the above is a
regression and none of it is a fix to a broken build.
