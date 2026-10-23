# Blog internal-link map — five new guides, 23 Oct 2026

Links are contextual: placed where a reader needs the next page, not added to
reach a count. Every destination below was fetched from a local production
build and returned 200. That covers 27 distinct internal destinations across
the five new pages, including breadcrumbs.

## Links out of each new guide

| New guide | Contextual links in the body | Related guides | Service links (closing panel) |
|---|---|---|---|
| `/blog/gst-registration-gujarat-guide/` | `/blog/gujarat-shops-establishments-registration/` (what GST does not replace) · `/blog/udyam-registration-msme-india/` · `/blog/starting-business-gujarat-registration-guide/` · `/services/proprietorship-registration/` (where Raulji handles GST) · `gst.gov.in` | Starting a business in Gujarat · Udyam · Gujarat S&E · Partnership vs Proprietorship | Proprietorship · `/gujarat/` · Business Registration |
| `/blog/udyam-registration-msme-india/` | `/blog/gst-registration-gujarat-guide/` · `/blog/gujarat-shops-establishments-registration/` · `/services/proprietorship-registration/` · `udyamregistration.gov.in`, `samadhaan.msme.gov.in` | GST in Gujarat · Starting a business in Gujarat · Partnership vs Proprietorship | Proprietorship · Business Registration · `/faqs/` |
| `/blog/gujarat-shops-establishments-registration/` | GST and Udyam guides (in the comparison table) · `/ahmedabad/` · `/vadodara/` · `/surat/` · `/gujarat/` | Starting a business in Gujarat · GST · Udyam | Proprietorship · `/gujarat/` · Business Registration |
| `/blog/partnership-deed-checklist-india/` | `/blog/partnership-vs-proprietorship-india/` · `/services/partnership-registration/` | Partnership vs Proprietorship · How to choose a structure · Starting a business in Gujarat | Partnership registration · LLP registration · `/contact/` |
| `/blog/after-company-incorporation-compliance-checklist/` | `/blog/mca-company-registration-process-india/` · `/blog/private-limited-company-vs-llp/` · GST, S&E and Udyam guides · `/services/pvt-compliance/` · `/services/llp-compliance/` | MCA process · Pvt vs LLP · Documents required · Common mistakes | Pvt compliance · LLP compliance · Pvt registration · Business Registration |

Not done, on purpose:

- None of the five links to every city page.
- Only the S&E guide links to cities, because shops and establishments are
  filed locally.
- Anchor text describes the destination ("the full guide to Gujarat shops and
  establishments registration"), not exact-match commercial phrases.

The brief suggested `/blog/private-limited-vs-llp-india/` for Article 5. That
URL does not exist; the real article, `/blog/private-limited-company-vs-llp/`,
is linked instead.

## Links into each new guide (added on this branch)

| Source page | Links to | How |
|---|---|---|
| `/blog/` | all five | Blog index and category listing, automatic from `ARTICLES` |
| `/blog/starting-business-gujarat-registration-guide/` | S&E, Udyam, GST | Sentence in the S&E section and in the Udyam section; S&E and GST in `related` |
| `/blog/partnership-vs-proprietorship-india/` | Partnership deed | `related` |
| `/blog/mca-company-registration-process-india/` | After incorporation | Sentence in "What happens immediately after incorporation?", plus `related` |
| `/blog/common-business-registration-mistakes-india/` | After incorporation | `related` |
| `/services/proprietorship-registration/` | GST, Udyam | Guide cards |
| `/services/partnership-registration/` | Partnership deed | Guide cards |
| `/services/pvt-registration/` | After incorporation | Guide cards |
| `/services/llp-registration/` | After incorporation | Guide cards |
| `/services/pvt-compliance/` | After incorporation | Guide cards (the page had none) |
| `/services/llp-compliance/` | After incorporation | Guide cards (the page had none) |
| `/gujarat/` | Gujarat S&E | "Reading for a business starting in Gujarat" cards |
| `public/llms.txt` | all five | Listed with a one-line summary each |

Every new guide is also linked from the related-guides block of the other new
guides where the topics meet.

## Guide-card swaps on existing pages

The service pages and `/gujarat/` render guide cards in a fixed three-column
grid. Adding a fourth card would change the layout, so on each page the least
specific card was swapped for the more relevant new guide:

| Page | Removed card | Added card |
|---|---|---|
| Proprietorship | How to choose a structure; Starting a business in Gujarat | GST in Gujarat; Udyam |
| Partnership | Types of business structures | Partnership deed checklist |
| Private Limited | Documents required for company registration | After incorporation |
| LLP | Common registration mistakes | After incorporation |
| `/gujarat/` | How to choose a structure | Gujarat S&E |

**Effect on the removed guides.** Inbound pages were counted by crawling all
100 sitemap URLs on the local build. Production figures are from the crawl of
the same day.

| Guide | Production | Branch |
|---|---|---|
| How to choose a structure | 14 | 13 |
| Types of business structures | 9 | 6 |
| Documents required | 6 | 6 |
| Common mistakes | 6 | 5 |

No page on the site is an orphan.

## Inbound links to the new guides (local build)

| Guide | Linking pages |
|---|---|
| After incorporation | 7 |
| GST in Gujarat | 6 |
| Udyam | 6 |
| Gujarat S&E | 6 |
| Partnership deed | 3 |
