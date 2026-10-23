# SEO / AI search issue tracker — 23 Oct 2026

One row per **root cause**. A template defect that shows on 33 city pages is one
issue, with the affected count in its own column; it is not 33 issues.

Evidence for every row is in [seo-ai-validation-evidence.md](seo-ai-validation-evidence.md),
by the same ID. The narrative is in [seo-ai-audit-report.md](seo-ai-audit-report.md).

**Status key.**
- *Fixed, live* — merged to `main` (`7614420`), deployed on 23 Oct 2026, and
  re-verified on production.
- *Fixed (branch)* — fixed on branch `seo/open-issues-verification`, with a
  regression test and a clean build, **not deployed**.
- *Resolved by owner* — fixed outside the code by the owner, and verified.
- *Open* — not changed.

**Owner** = needs the owner's decision, access or content before anyone can act.

The post-deploy pass on SAI-01, 02, 04, 15, 16 and the exposed token is at the
end: [Open issues verification](#open-issues-verification--23-oct-2026-post-deploy).

## Totals

| | P0 | P1 | P2 | P3 | Total |
|---|---|---|---|---|---|
| Unique issues found | 1 | 7 | 10 | 10 | **28** |
| Fixed, live | 0 | 2 | 4 | 4 | **10** |
| Fixed on branch, not deployed | 0 | 1 | 1 | 0 | **2** |
| Resolved by owner | 0 | 1 | 0 | 0 | **1** |
| Open | 1 | 3 | 5 | 6 | **15** |
| Open, owner action needed | 1 | 2 | 4 | 4 | **11** |

Two issues were added in the post-deploy pass: **SEC-01** (P0, exposed token)
and **SAI-27** (P2, 15px form fields).

The audit itself found no P0: nothing is accidentally `noindex`, indexing is
not blocked, and the enquiry form posts and validates. One P0 arose later in
the day, **SEC-01**, when a GitHub token was pasted into the session. The lead pipeline
into the CRM was **not** exercised live (no authorised test environment), so
"lead capture works" is supported by the passing route tests, not by a live
submission.

## Issues

| ID | P | Category | Issue | Affected | Status | Fix | Effort | Owner approval |
|---|---|---|---|---|---|---|---|---|
| SAI-01 | P1 | Analytics | The live GTM container `GTM-MSW79R28` is published with **zero tags**, so no GA4 page view, event or conversion is recorded in production. The site pushes the right events; nothing receives them. Already recorded as BLOCKED in `analytics-implementation.md`. | Sitewide | Open | Build the tags in `gtm-event-map.md`, Preview, DebugView, then publish | 0.5–1 day | **Yes** — GTM/GA4 access |
| SAI-02 | P1 | Legal / trust / GEO | `/services/insurance/` says "we help you understand and **arrange** cover" and offers advice on commercial, health and motor insurance. No IRDAI licence or intermediary registration is shown anywhere. Arranging insurance in India is a licensed activity. `llms.txt` contradicts the page by listing "insurance advice" as **outside** the group's remit. | 1 service page, 10 insurance posts, `llms.txt` | Open | Owner states the licence position. Then either show the registration number and insurer tie-up, or reword the page to education plus referral. Make `llms.txt` match whichever is true | 1–2 h after the decision | **Yes** — legal |
| SAI-03 | P2 | Accessibility | Brand blue `#329fd2` (`--primary`) fails WCAG AA both ways: white text on it is 2.98:1, and as text on white it is 2.98:1. It sits in the sitewide footer CTA, the default `Button` variant, outline buttons and `/about/` labels. | Sitewide (1 token) | Open | Darken the token used for text and filled buttons (e.g. `#1872a3`, 5.28:1 with white), or use navy text on the blue fill (the site already does this in places) | 2–4 h | **Yes** — brand colour |
| SAI-04 | P1 | Performance | Mobile lab LCP is 3.8–3.9 s on `/`, the LLP page and `/ahmedabad/` (unthrottled observed 2.5 s). Render delay is 81–84% of it. On 3 of 4 pages the LCP element is the consent banner's paragraph, which mounts after hydration. | 3 of 4 tested templates | Open — partly fixed (branch) | Server-render the banner and let a tiny inline script hide it when consent is already stored, so it paints with the page. Then re-measure, and check field data | 0.5–1 day + browser QA | No (engineering) |
| SAI-05 | P1 | Conversion | The enquiry form had no "Insurance" option, although master rule 23 lists it and `/services/insurance/` carries the form. Insurance enquirers had to file under "Other". | Form on ~85 pages + `/contact/` wizard | **Fixed, live** | Added "Insurance" to both forms (same CRM value). The insurance page now preselects it | Done | Rule 23 already requires it |
| SAI-06 | P1 | Mobile / UX | The homepage scrolled sideways between 768 px and about 870 px. A `<figure>` with `aspect-[21/9]` and `min-h-[22.5rem]` had no definite width, which forced a minimum width of 840 px. | `/` at tablet widths | **Fixed, live** | `w-full` on the figure | Done | No |
| SAI-07 | P3 | Technical | The report-only CSP included `upgrade-insecure-requests`, which browsers ignore in report-only mode. It logged a console error on every page and cost Best Practices points (96 → 100 after the fix). | Sitewide | **Fixed, live** | Removed it, with a note to restore it when CSP is enforced | Done | No |
| SAI-08 | P2 | Accessibility | Off-token colours under 4.5:1: text `#1a7cb0` on `#f4f7fa`/`#e8f5fb` (4.15–4.29:1), the footer disclaimer (4.13:1), the contact-wizard step labels and the `/about/` ordinals (`#9aa7b5`, 2.45:1). | 203 uses / 28 files + 3 spots | **Fixed, live** | `#1872a3` (4.75:1 or better), footer at 60% opacity, `#5b6778` for the greys | Done | No |
| SAI-09 | P2 | GEO / LLM | `llms.txt` was stale. It linked the redirected `/blog/how-to-choose-business-structure-india-2026/` and omitted 9 of the 18 published posts. | 1 file | **Fixed, live** | Corrected the URL and listed the Panchmahal series. A test now fails if `llms.txt` links a redirect, links a missing post or omits a published one | Done | No |
| SAI-10 | P2 | On-page / Local | City pages are mostly template. With city names masked, 62–75% of each page's main text is shared with at least 80% of the other city pages. Unique text is 21–32% (about 300–480 words). This is the "keyword-swapped" pattern rules 17, 21 and 35 warn against. | 33 city pages | Open | Write a genuinely local section for each of the 28 non-priority towns: local industry, the authorities that actually apply, real enquiries. Or `noindex` the weakest until written | 2–4 h per town | **Yes** — local content |
| SAI-11 | P2 | Pipeline | `seo-validate.mjs` read `.next` regardless of `NEXT_DIST_DIR`. A build into another directory was followed by a "Passed" on stale output. It also carried an out-of-date exception excusing a 165-character homepage description that no longer exists. | Build pipeline | **Fixed, live** | Reads `NEXT_DIST_DIR`. The exception is removed, and the homepage now passes the normal 120–160 check | Done | No |
| SAI-12 | P3 | Pipeline | ESLint ignored `.next/` but not `.cache/` or other `.next-*` directories, so `npm run lint` failed with 12 errors in a working copy holding an old build. | Dev tooling | **Fixed, live** | Ignore `.next-*/**` and `.cache/**` | Done | No |
| SAI-13 | P3 | Accessibility | The homepage "Key facts" `<dl>` was invalid (`dl > div > div > dt`). | `/` | **Fixed, live** | `dt`/`dd` are now direct children of each group. Layout verified unchanged | Done | No |
| SAI-14 | P3 | AEO | `/compare/` decision questions were H2s whose text read "1Will you have co-owners?", because the number badge was inside the heading. They also sat at the same level as their section heading. | `/compare/` | **Fixed, live** | Badge moved outside and `aria-hidden`; headings are now H3 | Done | No |
| SAI-15 | P1 | UX / conversion | The consent banner covers 366 of 667 px (55%) of a 375-wide phone screen on first visit, over the hero and the Call/WhatsApp bar. | Every first visit, mobile | **Fixed (branch)** | A compact single-row mobile layout, or a bottom sheet capped at ~30% height. Fix together with SAI-04 | 2–4 h | Design sign-off |
| SAI-16 | P2 | Local / GEO / AI visibility | Weak entity signals. In the web-search index tested, a search for `raulji.com` returned **no** raulji.com result, and neither did the brand or service queries (0 of 5). rauljitechnologies.com ranks instead and publishes the **same phone number**. `sameAs` lists no Google Business Profile, LinkedIn or directory listing, and GBP status is unknown. Schema types the group as `ProfessionalService` with no street address. | Entity-wide | Open | Verify Search Console and Bing Webmaster Tools. Claim or verify GBP. Add only real, owned profiles to `sameAs`. Decide whether the group publishes a street address. Give the brands distinct phone lines or state the shared line on both sites | Owner-led | **Yes** — accounts, address |
| SAI-17 | P3 | Schema | `sameAs` declares raulji.com **is** rauljitechnologies.com. `sameAs` means "same entity", but Raulji Technologies is a separate brand and is already modelled under `brand`. | Sitewide JSON-LD | Open | Remove it from `sameAs` and keep the `brand` node. Documented as deliberate in `lib/schema.ts`, so it is the owner's call | 15 min | **Yes** |
| SAI-18 | P2 | Content trust / GEO | The 8 business guides are bylined to "Raulji Group", not a named person, and no reviewer is shown for legal or tax statements. The insurance guides are bylined to the Chairman with no stated qualification. | 18 posts | Open | Named author(s) with a real role, plus a "reviewed by" line where a qualified reviewer exists. Do not invent credentials (rule 13) | Owner content | **Yes** |
| SAI-19 | P3 | Technical | Legacy URLs requested **without** a trailing slash take two hops (308 then 301). All 7 tested do. | 7+ legacy URLs | Open | Also match the unslashed source in `redirects()` with an explicit destination, and test hop counts | 1 h | No |
| SAI-20 | P3 | Local / governance | Six city pages are not in rule 17's list: `/jhalod/`, `/botad/`, `/amreli/`, `/porbandar/`, `/dwarka/`, `/kalol/`. They have been there since the first commit. | 6 pages | Open | Owner confirms they stay (and the list is updated) or they get 301s to `/gujarat/` | 15 min after the decision | **Yes** |
| SAI-21 | P2 | Performance | Heavy city templates: 374–427 KB HTML, about 150 KB of it inline RSC payload, 39–53 images and about 1,050 DOM nodes. Desktop TBT is 290 ms on `/ahmedabad/` (perf 88). Lighthouse flags 76 KiB of unused JS sitewide. | City pages, `/our-clients/` | Open | Move the location-drawer data off the initial payload (rule 27). Trim duplicate photo blocks. Audit client components | 1–2 days | No |
| SAI-22 | P3 | On-page | `/services/it/` and `/services/digital/` are thin hand-off pages (153–159 words, 52% similar, one inbound link each) for services delivered on another domain. | 2 pages | Open | Consolidate into one page, or `noindex` and keep for visitors | 30 min | **Yes** |
| SAI-23 | P3 | Technical | The 404 page emits two robots meta tags (`noindex` from Next, plus `noindex, follow`). Harmless; Google applies the most restrictive. | `/404` | Open | Optional | 15 min | No |
| SAI-24 | P3 | Security / trust | No `/.well-known/security.txt`. | Sitewide | Open | Add one with a real contact | 15 min | **Yes** — contact |
| SAI-25 | P1 | Repository / operations | In the local working copy, 625 of 950 files and 179 `.git/objects` directories are owned by root, apparently from a `sudo` run. `npm run build` fails with EACCES, and commits fail whenever an object hashes into a root-owned directory. `node_modules` was also stale (ESLint 6.4, no vitest) until `npm ci`. Not a production defect, but it blocks building and committing from this machine. | Local checkout | **Resolved by owner** | `sudo chown -R office:office "/media/office/Rtech240GB SSD/github/raulji-group"`, then `npm ci` | 5 min | **Yes** — needs sudo |
| SAI-26 | P2 | Content accuracy / Local | Found on re-verification. The `/gujarat/` hero says "33 districts served", and the five region cards under it read as its breakdown, but they counted **city pages**: 10 / 6 / 10 / 2 / 5. Kutch, a single district, showed "2". The district list on the same page gives 27 of the 33 districts a city page. | `/gujarat/` | **Fixed, live** | Cards now count districts (9 / 7 / 11 / 1 / 5, totalling 33), with the city-page count the finder shows on click on a second line. The counting is in `regionSummary()` in `lib/gujarat-regions.ts` | Done | No |
| SEC-01 | P0 | Security | A classic GitHub personal access token was pasted into the Claude Code session. On 23 Oct 2026 it still authenticated as the owner's account, with near-admin scopes and no expiry header. It is in 3 local Claude Code transcript files, and not in the repository, its history or the git config. | GitHub account `toyuvrajraulji` | Open | Revoke it on GitHub (steps below) | 2 min | **Yes** — only the account owner can revoke |
| SAI-27 | P2 | Mobile / forms | Every enquiry-form field and the Gujarat city search render at 15px, and the blog search at 14px. iOS Safari zooms the page when a field under 16px takes focus. Measured at 375px; the zoom is documented iOS behaviour and was not observed on a device. | Form on ~85 pages, `/contact/`, `/gujarat/`, `/blog/` | **Fixed (branch)** | `text-base` (16px) below `sm`, unchanged from `sm` up | Done | No |

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

## Open issues verification — 23 Oct 2026 (post-deploy)

**Scope.** This pass covers only SAI-01, SAI-02, SAI-04, SAI-15, SAI-16 and
the exposed token. It ran after `7614420` was deployed.

**Results:**
- **PASS** = verified working.
- **FAIL** = verified broken.
- **BLOCKED** = cannot be verified without access this session does not have.

Nothing was deployed and no external account was changed.

### Summary

| ID | Status | Root cause | Fix in code | Deploy needed | Owner action |
|---|---|---|---|---|---|
| SEC-01 | **FAIL** (token active) | Token pasted into chat | None possible in code | No | **Revoke the token now** |
| SAI-01 | **FAIL** | GTM container published with no tags | None needed in code | No | Build and publish the GA4 tags |
| SAI-02 | **BLOCKED** (legal) | No licence position stated | None (copy decision) | After decision | Qualified legal review |
| SAI-04 | **FAIL**, partly fixed | Banner mounted after hydration | Yes, branch | **Yes** | None |
| SAI-15 | **PASS** on branch | Stacked mobile buttons | Yes, branch | **Yes** | Design sign-off on screenshot |
| SAI-27 | **PASS** on branch | 15px fields | Yes, branch | **Yes** | None |
| SAI-16 | **BLOCKED** | — | None | No | Search Console checks below |

### SEC-01 — Exposed GitHub personal access token (P0)

**Status: FAIL — the token is active.** It was checked directly against the
GitHub API, not assumed.

**Evidence.** The token value is never printed here. It was identified by the
`ghp_` + 36-character pattern and by a SHA-256 fingerprint prefix,
`3c1615a3f1`.

| Where checked | Result |
|---|---|
| Repository working tree | not present |
| Git history, all refs | not present (`git log --all -G`) |
| `.git/config`, remote URL | not present; the URL carries no credentials |
| `~/.gitconfig`, `credential.helper` (repo and global) | not present; no helper set |
| `~/.git-credentials` | file does not exist |
| `~/.bash_history` | not present |
| CI/CD config in repo | none exists (no `.github/workflows`, no `vercel.json`) |
| Vercel environment variables | **BLOCKED** — no Vercel access |
| Claude Code transcripts on this machine | **present in 3 files**, all the same token (same fingerprint): this session (`~/.claude/projects/-media-office-Rtech240GB-SSD-github-raulji-group/567a5fd0-….jsonl`), one in `~/.claude/projects/-home-office/`, one in `~/.claude/projects/-media-office-Rtech240GB-SSD-github-polcy-reader/` |
| Session temp files and command output | not present; the one push redacted it |

**What GitHub returned.** A read-only `GET https://api.github.com/user` with
the token returned **HTTP 200**:

- It authenticates as `toyuvrajraulji`.
- It is a classic PAT with these scopes: `admin:enterprise, admin:gpg_key, admin:org, admin:org_hook, admin:public_key, admin:repo_hook, admin:ssh_signing_key, audit_log, codespace, copilot, delete:packages, delete_repo, gist, notifications, project, repo, user, workflow, write:discussion, write:network_configurations, write:packages`.
- The response had no `github-authentication-token-expiration` header, so it
  appears to have no expiry.

**Root cause.** The token was pasted into the chat so a push could be made from
this session, which had no GitHub credentials. It was used once for
`git push origin main` (`880de84..7614420`) and was not stored.

**Fix implemented.** None is possible in the repository, and none was needed:
it was never written to any project file. No replacement token was created.

**Owner action (required now).**
1. On github.com, signed in as `toyuvrajraulji`, open **Settings → Developer
   settings → Personal access tokens → Tokens (classic)**.
2. Find the token used on 23 Oct 2026; its "Last used" will be that date. Click
   **Delete** and confirm.
3. Check **Settings → Security log** for activity by that token you do not
   recognise. Also check each organisation's audit log, since the token had
   `admin:org` and `audit_log` scopes.
4. If a push credential is still needed, use a **fine-grained** token scoped to
   `rauljitechnologies/raulji-group`, with *Contents: read and write* only and
   an expiry, or `gh auth login`. Do not paste it into chat.
5. Optional: delete or redact the three transcript files listed above. They are
   local, but they contain the token in plain text.

**Re-check after revoking.** Running the same `GET /user` with the token should
return **401**. It is not marked revoked here, because that has not been
observed.

**Deployment requirement.** None.

### SAI-01 — GA4 not recording (P1)

**Status: FAIL** (unchanged by the deploy). GTM Preview and GA4 DebugView are
**BLOCKED**, because there is no GTM or GA4 access.

**Approved IDs** (`lib/tags.ts`, owner-confirmed):

- Container: `GTM-MSW79R28`.
- GA4: `G-SK8N5N3WE2`, web stream `16183950335`.

**Evidence** (production, Playwright, GA hits blocked so nothing was sent):

| Cause checked | Result |
|---|---|
| Loading | **PASS**. One `gtm.js?id=GTM-MSW79R28` in `<head>`, HTTP 200. `google_tag_manager` holds only `GTM-MSW79R28` |
| Duplicate install | **PASS**. No `gtag/js?id=G-` script; direct GA4 (`NEXT_PUBLIC_GA4_MEASUREMENT_ID`) is off |
| Consent | **PASS**. `consent default` is denied for all four signals. After "Accept all", `consent update` grants them, and the choice is reapplied on reload |
| dataLayer events | **PASS** (earlier the same day): `view_service`, `phone_click`, `email_click`, `whatsapp_click`, `form_view`, `form_start` and `form_validation_error` are pushed with no PII |
| Network | **FAIL**. Zero requests to `google-analytics.com` / `analytics.google.com`, even after consent was granted and a tracked click |
| Configuration | **FAIL — root cause.** The published container (version 1) is `"tags":[]`, with no `__gaawe` or `__googtag`. There is nothing in it to send a hit |

**Root cause:** configuration, specifically an empty published container. It
is not loading, consent, triggers in code, network or a duplicate install.

**CRM-confirmed lead conversion:**

- **Code: PASS.** `/api/lead/` returns `success: true` only after the CRM
  reports capture (`app/api/lead/route.ts:392`). The form fires
  `generate_lead` only on that path, skips honeypot submissions, and
  deduplicates on the server `requestId` (`components/forms/lead-form.tsx:237`).
  The event carries no name, phone, email or message. Covered by
  `tests/analytics.test.ts` and `tests/lead-route.test.ts`, which pass.
- **Live: BLOCKED.** It needs the tags plus one test lead in an authorised CRM
  environment.

**Fix implemented:** none; no code change is needed.

**Owner action:** build the tags in `docs/gtm-event-map.md`:

- a GA4 Configuration tag for `G-SK8N5N3WE2`;
- event tags for the custom events;
- `generate_lead` marked as a key event.

Then check GTM Preview and GA4 DebugView, and publish. Do not also set
`NEXT_PUBLIC_GA4_MEASUREMENT_ID`, which would double-count page views.

**Deployment requirement:** none for the site. Publishing the container is a
GTM action.

### SAI-02 — Insurance licensing and claims (P1)

**Status: BLOCKED** — it needs the owner's licence position and a qualified
legal review. This pass does **not** infer that Raulji Group holds, or lacks,
any IRDAI licence.

**Statements requiring verification** (live, 23 Oct 2026):

| URL | Statement |
|---|---|
| `/services/insurance/` | "What our business insurance advice covers" |
| `/services/insurance/` | "We help you understand and arrange cover; we do not underwrite it." |
| `/services/insurance/` | Covers commercial, property, health, group, motor and transit cover, and "support through the claims process" |
| `/services/insurance/` (meta description) | "Advice on commercial, property, health and motor insurance for Gujarat businesses, plus help when a claim is made." |
| `/` | "…from the structure decision through registration, compliance and insurance…" |
| 10 posts under `/blog/health-insurance-*` | "Raulji Group helps people understand and arrange cover" |
| same 10 posts | "Dharmendrasinh Raulji … handles its insurance advisory enquiries directly" (byline) |
| same 10 posts | "Speak directly with Dharmendrasinh Raulji about your health insurance requirement", with WhatsApp/call +91 9558855668 |
| `/blog/health-insurance-panchmahal-gujarat/` and others | "Help understanding and arranging health, group and business cover, and support through claims" |
| `public/llms.txt` | "Outside its remit: … investment, securities or insurance advice" — **contradicts all of the above** |

A crawl of all 96 pages found **no** IRDAI registration number, licence type,
insurer or broker tie-up, or POSP disclosure. `/blog/health-insurance-policy-guide-india/`
itself tells readers to "verify current terms with the insurer or a licensed
intermediary".

**Official requirements to compare against.** These are summarised from
official and reputable sources; the conclusions need **qualified review**.

- **Insurance Act, 1938, s.42** ([India Code via indiacode.ecourtsindia.com](https://indiacode.ecourtsindia.com/insurance-act-1938/section/42/);
  [Indian Kanoon](https://indiankanoon.org/doc/1439441/)). Acting as an
  insurance agent, meaning soliciting or procuring insurance business, needs
  IRDAI authorisation. Intermediaries such as brokers and corporate agents are
  registered separately under IRDAI regulations.
- **IRDAI intermediary framework**, covering corporate agents, brokers, IMFs,
  web aggregators and POSP ([IRDAI — Corporate Agents](https://irdai.gov.in/intermediaries/corporate-agents);
  [IRDAI (Insurance Brokers) Regulations 2018, DFS copy](https://www.financialservices.gov.in/sites/default/files/Act-Policies/2026-01/IRDAI--Insurance-Brokers--Regulations-2018.pdf)).
  Secondary reporting ([Trilegal](https://trilegal.com/knowledge-repository/update/irdai-intermediary-reforms-from-periodic-renewals-to-continuous-supervision/))
  says the IRDAI (Insurance Intermediaries) (Amendment) Regulations, 2026 were
  notified on 30 July 2026. **Not verified against the gazette text.**
- **IRDAI (Insurance Advertisements and Disclosure) Regulations, 2021**
  ([IRDAI document](https://irdai.gov.in/en/document-detail?documentId=399200)).
  As reported, insurers and intermediaries must show their registration or
  licence number on their websites and in advertisements, and only licensed
  intermediaries may advertise or solicit. **Exact current text to be confirmed
  by a qualified reviewer.**

**Question for review:** does "arrange cover", "advice" and "support through
claims", with a direct sales line, amount to soliciting or procuring insurance
business that needs a licence? The legal answer is not given here.

**Owner action.** State in writing which applies:

- **(a)** Raulji Group or the Chairman holds an IRDAI licence or registration.
  The site then needs the type, the number and the insurer(s)/broker per the
  advertisement regulations.
- **(b)** It does not. The pages then need rewording to education plus referral
  to a named licensed intermediary, without "arrange" or "advice", subject to
  legal review.

Then make `llms.txt` match.

**Fix implemented:** none. Changing legal claims without the owner's position
would be guessing.

**Deployment requirement:** a copy change and deploy, after the decision.

### SAI-04 — Mobile LCP (P1)

**Status: FAIL on production; partly fixed on branch.**

**Root cause.** The consent banner mounted only after hydration. Its paragraph
was the largest text on screen, so LCP waited for JavaScript (render delay
81–84%).

**Fix (branch).** The banner is now in the server HTML with `hidden`, and a
small inline script unhides it during parsing when there is no stored choice:
`consentBannerRevealScript()` in `lib/consent.ts`. It mirrors `readConsent()`
exactly, so React's state agrees with the screen.

**Test result.** Local production builds, Lighthouse 12 mobile, GTM blocked in
both, median of 3 runs:

| Page | Before LCP | After LCP | Perf before → after | LCP element |
|---|---|---|---|---|
| `/` | 3.48 s | **2.63 s** | 91 → 97 | consent banner |
| `/ahmedabad/` | 4.03 s | **3.11 s** | 87 → 93 | banner / hero text |
| `/services/llp-registration/` | 3.69 s | 3.55 s | 89 → 90 | **hero paragraph** (a different cause, not fixed) |

FCP, TBT and CLS (0) were unchanged.

**Returning visitors:** in Playwright the banner is present but `hidden`, and a
MutationObserver saw it **never** become visible (no flash).

**Unit tests:** `tests/open-issues.test.ts`. 8 storage cases show the script
and `readConsent()` agree, and the server HTML contains the hidden banner
followed by the script. The tests fail on `main`.

**Still open:**

- Lab LCP on `/` is still above 2.5 s.
- The LLP-page hero-paragraph delay is a separate cause, not yet diagnosed.
- There is **no field (CrUX) data**: PageSpeed Insights returned 429.

**Owner action:** none.

**Deployment requirement:** **yes**, the fix is on branch
`seo/open-issues-verification`.

### SAI-15 — Consent banner covers the phone screen (P1)

**Status: PASS on branch; FAIL on production until deployed.**

**Root cause.** Below `sm` the three buttons stacked, adding about 150 px.

**Fix.** The buttons share one row (`grid-cols-3`) below `sm`, with slightly
tighter padding. The wording, colours and order are unchanged, and the buttons
stay 44 px tall.

**Test result** (Playwright, first visit to `/`):

| Viewport | Before | After |
|---|---|---|
| 320×568 | 387 px, **68%**, hero H1 covered | 267 px, **47%** |
| 375×667 | 366 px, **55%**, H1 covered | 246 px, **37%**, H1 visible above it |
| 390×844 | 366 px, 43% | 246 px, 29% |

Screenshots: before `mshots/320-first-visit.png`, after `mshots/after-320.png`.
They were taken during verification and are not committed.

**Owner action:** design sign-off on the compact layout.

**Deployment requirement:** **yes**.

### SAI-27 — Form fields under 16px on phones (P2, new)

**Status: PASS on branch.**

**Evidence.** At 375 px on production, the enquiry-form fields and the Gujarat
city search are 15 px and the blog guide search is 14 px. The location-drawer
and FAQ searches were already 16 px.

**Root cause.** Shared field classes used `text-[0.9375rem]` or `text-sm` at
every width.

**Fix.** `text-base` below `sm` in `lead-form.tsx`, `contact-wizard.tsx`,
`gujarat-city-finder.tsx` and `blog-index.tsx`. Desktop is unchanged.

**Test result.** 4 tests in `tests/open-issues.test.ts` check that the mobile
size is `text-base`. The iOS zoom itself was **not observed on a device**,
because no iOS device was available.

**Owner action:** none.

**Deployment requirement:** **yes**.

### Other mobile checks at 320, 375 and 390 px (production)

**PASS:**

- No horizontal overflow on 9 templates.
- Mobile menu: Enter opens it, focus moves to "Close menu", body scroll is
  locked, Escape closes it and returns focus to "Open menu".
- The location drawer is full-screen with focus inside.
- The service `<select>` works.
- An empty submit marks the field `aria-invalid` and moves focus to the first
  error.
- The sticky Call/WhatsApp bar does not cover the submit button.
- No console errors.

The controls flagged as under 24 px were inline text links inside sentences and
table headers, which WCAG 2.5.8 exempts. **Not tested:** real iOS and Android
devices, and screen readers.

### SAI-16 — Search Console (P2)

**Status: BLOCKED** — no Search Console access.

**Evidence available without access:**

- `raulji.com` has a `google-site-verification=…` DNS TXT record, which
  indicates a **Domain property** has been created. Whether it is verified, and
  who owns it, needs the account.
- The page has no verification meta tag, which is not needed for a Domain
  property.
- The sitemap index (`/sitemap.xml`, 4 children, 95 URLs) returns 200
  `application/xml` and is declared in `robots.txt`.

**Indexed status, sitemap status and search performance: all unknown.** No
ranking change is claimed.

**Owner steps:**

1. In [Search Console](https://search.google.com/search-console), open the
   `raulji.com` Domain property. If it is missing, add it and verify with the
   existing DNS record.
2. **Sitemaps:** submit `https://www.raulji.com/sitemap.xml` if not already
   listed. Status should be "Success" with 95 discovered URLs.
3. **Indexing → Pages:** record indexed and not-indexed counts, and the reasons
   (e.g. "Crawled – currently not indexed", "Duplicate without user-selected
   canonical").
4. **URL Inspection:** inspect `/`, `/gujarat/`, `/services/llp-registration/`
   and `/ahmedabad/`. Check "URL is on Google", Google's chosen canonical, and
   last crawl date. Request indexing for pages changed on 23 Oct.
5. **Performance:** export queries and pages for 28 days before 23 Oct 2026, as
   the baseline for any later comparison.
6. Add a user (Restricted is enough) if future audits should read this
   directly.

**Deployment requirement:** none.

### Verification of this pass

Branch `seo/open-issues-verification`:

| Check | Result |
|---|---|
| `npm run lint` | exit 0 |
| `npm run typecheck` | exit 0 |
| `npm test` | 10 files, **144/144** pass (15 new) |
| `npm run build` | exit 0, `seo-validate` passed |

The `vitest.config.ts` change (`esbuild.jsx: "automatic"`) only affects tests;
it lets component tests render.
