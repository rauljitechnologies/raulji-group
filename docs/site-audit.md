# Site audit — 2026-10-17

Audit of the production build against the client's deployment, audit and
optimisation prompt. Every figure here was measured against
`npm run build && npm start`, not estimated: 95 sitemap URLs fetched and
parsed, all 96 distinct internal links resolved, every legacy redirect walked
hop by hop, all 188 files in `public/` read for real dimensions, and the lead
API exercised with ten payloads.

Reproduce with the scripts described at the end.

## Verdict

The technical SEO and content baseline is genuinely sound, and the earlier
audits (2026-09-16, 2026-10-15) did real work that holds up under measurement.
**The problems found this round are almost entirely in the pipeline and the
documentation around the site, not in the site itself** — and one of them was
severe enough to make the business objective unmeasurable.

### What was already correct (verified, not assumed)

| Check | Result across 95 pages |
|---|---|
| HTTP status | 95/95 return 200 |
| Canonical | 95/95 present and self-referencing |
| `<h1>` | 95/95 have exactly one |
| Unique titles | 95/95, all ≤60 chars once entity-decoded |
| Unique descriptions | 95/95 |
| OG image + Twitter card | 95/95 |
| Breadcrumbs | 94/95 — the homepage is the breadcrumb root, correctly absent |
| Image alt text | 0 images missing `alt` |
| Thin content | none; min 543 words, median ~2100 |
| Heading hierarchy | no skipped levels on any page |
| Internal links | 96/96 resolve 200. **No broken links, no orphan pages** |
| Redirects (indexed slashed form) | 11/11 resolve in exactly 1 hop |
| 410 / 404 | `/rentals/`, `/services/land-investment/` → 410; unknown → real 404 |
| Security headers | all six present, incl. HSTS and CSP report-only |
| Fake claims | none found. No invented counts, awards, ratings or offices |
| Accessibility | skip link, `<main>` landmark, `aria-expanded`/`aria-controls` on accordions, `aria-invalid`/`aria-describedby` on form fields, `prefers-reduced-motion` honoured |

The enquiry form is server-rendered on the homepage, service pages and city
pages (6 inputs, 8 labels, select, textarea in the HTML), so the primary
conversion path does not depend on JavaScript. `/contact/` is a deliberate
three-step wizard whose first step is a choice screen, which is why it shows
buttons rather than inputs in the initial HTML — by design, not a defect.

## Findings

Severity is business impact, not effort.

### P1 — `DEPLOYMENT.md` documented three analytics events that do not exist

**Finding.** The deployment runbook told the client to build GTM triggers on
`lead_form_submit` (labelled "primary conversion"), `lead_form_error` and
`start_business_click`. The site has never pushed any of those names. The real
names are `form_submit`, `form_error` and `primary_cta_click`.

**Evidence.** `grep -rE '"lead_form_submit"' app components lib` → no matches.
The `EventName` union in `lib/analytics.ts:17-40` is the complete list; 13
names are fired across the codebase and none is `lead_form_submit`.

**Business impact.** This is the most consequential finding in the audit. A
Custom Event trigger on a name nothing fires never matches, so a container
configured from that runbook records **zero conversions** — while
`phone_click`, `whatsapp_click` and every other report looks completely
healthy. The stated objective is more qualified enquiries and paying clients;
this defect makes enquiries invisible and therefore un-optimisable, and it
fails quietly, which is the worst way for measurement to fail.

**Fixed.** `DEPLOYMENT.md` section 5 now points at the generated
[analytics-events.md](analytics-events.md), names `form_submit` as the primary
conversion, and carries an explicit warning to re-check any container built
before 17 Oct 2026.

### P1 — `npm run lint` was not a working command

**Finding.** `eslint` was not installed and no config existed, so `next lint`
fell through to its interactive "How would you like to configure ESLint?"
prompt.

**Business impact.** Linting was wired into `package.json` and listed as a
verification step, but could never pass — and in CI or a deployment pipeline
it hangs until killed rather than failing. So the project had the appearance of
a lint gate with none of the protection.

**Fixed.** Installed `eslint` 9 + `eslint-config-next`, added
`eslint.config.mjs` (flat config), and changed the script to `eslint .` —
`next lint` is removed in Next 16 anyway. It found four real issues on first
run, all now resolved:

- `tailwind.config.ts` used `require()` for the typography plugin → converted
  to an ESM import.
- `components/shared/faq-explorer.tsx` had a dead `total` variable → removed.
- `app/page.tsx` used a raw `<img>` for the India SVG map. **Kept, with a
  justified suppression**: the optimiser does not rasterise SVG (serving it
  needs `dangerouslyAllowSVG`, which is off), so routing a vector through it
  adds a hop and returns identical bytes. The attributes the rule protects —
  intrinsic dimensions, lazy loading, real alt text — were already present.
- My own config's anonymous default export → named.

### P1 — Node version was unpinned, below what a dependency requires

**Finding.** No `engines` field, no `.nvmrc`, no `vercel.json`. Local Node is
20.12.0; `@supabase/supabase-js@2.116.0` declares `node >=22.0.0` and warns on
every install and build.

**Business impact.** The build runs on whatever Node the host defaults to, and
that default moves. A host defaulting to 20 runs a dependency outside its
supported range; a host moving to 24 is an untested change arriving without a
commit.

**Fixed.** `engines.node: ">=22.0.0"` in `package.json` and `.nvmrc` pinning
22. Vercel reads both.

### P1 — Analytics fails silently when the env var is absent

**Finding.** `components/layout/analytics.tsx` returns `null` when
`NEXT_PUBLIC_GTM_ID` is unset. The ID lives only in an untracked `.env.local`
and a line in `DEPLOYMENT.md`.

**Business impact.** A deploy that forgets the variable records nothing, and
there is no visible symptom — the site looks and behaves normally. Combined
with the wrong event names above, the realistic failure mode was launching
with no usable measurement at all.

**Partially fixed.** The gating is correct behaviour and I left it alone: a
value committed to `.env.example` would be copied into every developer's
`.env.local` and every preview deploy, sending their traffic into the client's
production analytics. Instead `.env.example`, the README env table and the
production checklist now all state the consequence explicitly, and
`DEPLOYMENT.md` carries a `curl` check that detects it.
**Setting the variable in Vercel Production remains a manual action.**

### P1 — Dependency advisories (partially fixed)

**Finding.** `npm audit --omit=dev` reported 3 advisories: a Next SSG/ISR
cache-poisoning advisory (moderate), and arbitrary-file-read / XSS /
event-loop-DoS advisories in `postcss` and `source-map-js` (high).

**Fixed.** Patched `next` 15.5.25 → 15.5.28 (within the existing `^15.5.4`
range) and `postcss` → 8.5.30. `source-map-js` resolved. Build, typecheck,
lint and the full 95-page crawl all re-verified after the upgrade.

**Not fixed, deliberately.** Two advisories remain, both pointing at the
postcss copy bundled *inside* Next (`node_modules/next/node_modules/postcss`,
8.4.31). They are build-time only — reachable only by attacker-controlled CSS,
which does not exist here — and cannot be resolved without a major upgrade.
`npm audit fix --force` pulls Next 16 and is a breaking change, not a patch;
it should be a scheduled decision, not part of a deploy.

### P2 — The lead API leaked a raw validation message to visitors

**Finding.** Omitting `phone` returned `{"error":"Required"}`, shown verbatim
beside the field. Every other message is a sentence written for the person
filling the form.

**Fixed.** `required_error`/`invalid_type_error` added to the `name` and
`phone` schemas in `app/api/lead/route.ts`. Verified: missing phone now returns
"Please enter your mobile number", and a wrong-typed field no longer produces
`Expected string, received number`.

### P2 — Honeypot-trapped bots were counted as conversions

**Finding.** The API answers a honeypot hit with `{success: true}` so the bot
cannot tell it was caught — correct. But both form components tracked
`form_submit` on any success, so trapped bots inflated the **primary
conversion** metric.

**Fixed.** Both `lead-form.tsx` and `contact-wizard.tsx` now skip the event
when the honeypot field has a value. The client knows locally which case it is;
the HTTP response is unchanged, so the bot still learns nothing.

### P2 — Deployment and README documentation had drifted from the code

**Finding.** `DEPLOYMENT.md` instructed the verifier to expect
`/services/land-investment/` → `301 → /services/` (it has been a **410** since
the Oct 2026 audit) and `/sitemap.xml` to contain **58** `<loc>` entries (it is
now a sitemap *index*: 4 children, 95 URLs). `README.md` repeated the same
stale redirect claim.

**Business impact.** A verifier following the runbook gets wrong answers from
correct infrastructure, which erodes trust in the whole checklist — and a
checklist nobody trusts stops being run.

**Fixed.** Both corrected, and the verification block now also covers the
reassigned redirects and the GTM check.

### P2 — Homepage meta description is 165 characters, and conflicts with the rules

**Finding.** The rendered description is 165 chars, past the ~160 where Google
truncates. It is also not the text `CLAUDE.md` rule 5 specifies: the code uses
a 165-char line sourced from "the design brief, section 18", while rule 5 gives
a different 187-char sentence and the client's own resolution note says to keep
rule 5's wording.

**Not fixed — needs the client's decision.** Both candidate texts exceed the
limit, so this cannot be resolved by picking one; it needs a trim, and trimming
approved brand copy is the client's call, not mine. The title matches rule 5
exactly and is correct at 46 chars. Suggested wording, 152 chars, keeping
rule 5's consulting-led and India-wide framing:

> Raulji Group helps entrepreneurs and businesses with consulting, business
> structuring, registration and related services across Gujarat and India.

### P2 — Hero image is not fully retina-sharp

**Finding.** The prompt asked for the reported Vercel blur to be investigated
rather than assumed fixed. The pipeline is working correctly: at a requested
`w=1920` the optimiser returns AVIF at quality 70 and does **not** upscale,
serving the source's native 1600×1067 at 72 kB (from a 199 kB WebP source).
`deviceSizes` is correctly capped at 1920 and `sizes` correctly accounts for
`object-cover` crop.

The residual issue is source resolution, not configuration.
`photos/home-hero.webp` is 1600 px wide but its `sizes` declares a drawn width
of 1180 CSS px, so a 2× display wants ~2360 px and receives 1600 — about 1.36×
effective density. Not blurry; not fully sharp either.

**Not fixed — needs an asset, not code.** Re-export the hero at ~2400 px wide
to the same path. Every other photograph sits well inside its source
resolution.

### P3 — Unslashed legacy URLs take two hops

**Finding.** I initially flagged every legacy redirect as a 2-hop chain, then
measured it properly and the headline was wrong. `trailingSlash: true`
normalisation runs before the redirect rules, so `/services/legal` → 308 →
`/services/legal/` → 301 → destination. But the **slashed** form is the
canonical shape of a trailing-slash site and the form the old site had indexed,
and all 11 legacy URLs resolve in exactly **1 hop** in that form.

**No change made.** This is normal for any trailing-slash site, affects only
hand-typed or externally mis-written URLs, and the equity cost across two 301s
is negligible. Recording it so the next audit does not re-raise it as a defect.

## Not done, and why

These are in the prompt but could not be completed from here. None is blocked
by the code.

| Item | Status | What it needs |
|---|---|---|
| Production deployment | **BLOCKED** | No Vercel project access, token or linked `.vercel/` directory in this repo. Nothing was deployed. |
| Production smoke test | **BLOCKED** | Depends on a deploy. The checklist runs against the live host unchanged. |
| Preview deployment + QA | **BLOCKED** | Same. |
| GA4 / Search Console / CRM data | **BLOCKED** | No credentials. This is why the funnel findings below are hypotheses, not diagnoses. |
| Real-device responsive QA | **NOT VERIFIED** | No browser automation available here. Breakpoint CSS and overflow containers were read, not rendered. The 320–1920 px sweep still needs doing in a browser. |
| Core Web Vitals field data | **NOT VERIFIED** | Lab proxies only (bundle 102 kB shared JS, hero 72 kB AVIF, preload present, fonts preloaded). No CrUX or Lighthouse run — do not report a score without one. |
| Statutory fee/legal verification | **NOT VERIFIED** | Prices and MCA claims were not re-checked against gov sources this round; the checklist keeps it as a pre-launch item. |
| Lead-loss fallback | **NEEDS A DECISION** | If the CRM is down the lead is lost. Three options sized in the checklist; all need the client to choose. |

## On the funnel

The prompt asks for the client-acquisition bottleneck. **I cannot identify it
from here, and saying otherwise would be a guess dressed as a finding.** With
no GA4, Search Console or CRM access there is no visibility into impressions,
rankings, traffic, form starts or lead outcomes.

What this audit does establish is that until 17 Oct 2026 the measurement layer
could not have answered the question either: the documented conversion event
did not exist. The honest sequence is to fix measurement, let it run, then
diagnose.

What can be said without data: the site is not failing on crawlability,
indexability, metadata, internal linking, content depth, broken paths, mobile
form rendering or trust claims — all measured above. So if enquiries are low,
the likeliest places to look are (a) commercial search visibility for
registration terms, which needs Search Console, (b) the phone/WhatsApp channel,
which the site cannot observe at all, and (c) follow-up speed on leads that do
arrive, which lives in the CRM. None of those is a website code defect, which
is itself a useful result.

## Files changed

| File | Change |
|---|---|
| `app/api/lead/route.ts` | Friendly required-field messages; no more raw `Required` |
| `components/forms/lead-form.tsx` | `form_submit` skipped for honeypot hits |
| `components/forms/contact-wizard.tsx` | Same guard |
| `components/shared/faq-explorer.tsx` | Dead variable removed |
| `app/page.tsx` | Justified lint suppression + rationale for the SVG `<img>` |
| `tailwind.config.ts` | `require()` → ESM import |
| `eslint.config.mjs` | **New.** Flat config |
| `package.json` | `lint` → `eslint .`; `engines.node >=22`; next/postcss patched |
| `.nvmrc` | **New.** Node 22 |
| `DEPLOYMENT.md` | Corrected event names, redirect expectations, sitemap counts; added GTM check |
| `README.md` | Verification pipeline, Node requirement, GTM var, corrected redirect table |
| `.env.example` | Documented the GTM silent-failure mode |
| `docs/site-audit.md` | **New.** This file |
| `docs/analytics-events.md` | **New.** Authoritative event list |
| `docs/seo-route-inventory.md` | **New.** Generated, 95 rows |
| `docs/image-manifest.md` | **New.** Generated, 188 files |
| `docs/production-checklist.md` | **New.** |

Verified after every change: `npm run typecheck`, `npm run lint`,
`npm run build` (with `seo-validate` postbuild), `npm run check:blog`, a
re-crawl of all 95 pages, all internal links, all redirects, and the lead API.

## Reproducing the measurements

The crawl and generator scripts were written to the session scratchpad rather
than committed, since they are audit instruments rather than part of the build.
Each is small enough to rebuild from its description:

1. **Crawl** — read `/sitemap.xml`, follow the 4 child sitemaps, fetch each of
   the 95 URLs, and parse title, description, canonical, robots, `h1`/`h2`/`h3`
   counts, OG and Twitter tags, `<img>` tags and missing `alt`, JSON-LD
   `@type` values, word count and every `href`.
2. **Analyse** — group the crawl for duplicates, missing fields, length
   outliers and thin content. **Decode HTML entities before measuring length**:
   a title containing `&amp;` measures five characters longer in source than it
   renders, which produced a false "20 titles over 60 chars" result on the
   first pass.
3. **Links** — request every distinct internal `href` and report non-200s;
   diff sitemap paths against linked paths to find orphans.
4. **Images** — walk `public/`, read real dimensions with `sharp`, group by
   directory, and flag anything whose source is narrower than its rendered
   width.
