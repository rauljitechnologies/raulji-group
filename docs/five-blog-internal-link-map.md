# Five-blog internal-link map — 23 Oct 2026

Every destination was fetched from a local production build and returned 200:
19 distinct internal destinations across the four pages changed in this pass.
Every back-link below was confirmed **in the rendered HTML**, not only in the
source.

The article template shows only the first three `related` entries
(`components/blog/article-page.tsx`, `slice(0, 3)`). So back-links are made
with in-text links, not by appending to `related` lists where they would never
render. The regression tests count only the three entries that render.

## Links out

| Article | Contextual links in the body | Related (rendered, max 3) | Service panel |
|---|---|---|---|
| `/blog/trademark-registration-india-guide/` | `/blog/how-to-choose-business-structure-india/`, `/blog/common-business-registration-mistakes-india/` (related-reading block); `ipindia.gov.in` | How to choose a structure · Common mistakes · Documents required | `/services/business-registration/` · `/gujarat/` · `/contact/` |
| `/blog/fssai-registration-food-licence-india/` | `/blog/gujarat-shops-establishments-registration/`, `/blog/gst-registration-gujarat-guide/`; `foscos.fssai.gov.in` | Gujarat S&E · GST in Gujarat · Starting a business in Gujarat | `/services/proprietorship-registration/` · `/services/business-registration/` · `/faqs/` |
| `/blog/import-export-code-iec-guide/` | `/blog/gst-registration-gujarat-guide/` (comparison table), `/blog/fssai-registration-food-licence-india/`; `dgft.gov.in` | GST in Gujarat · After incorporation · How to choose a structure | `/services/proprietorship-registration/` · `/gujarat/` · `/services/business-registration/` |
| `/blog/gst-registration-gujarat-guide/` (improved) | **Added:** `/blog/import-export-code-iec-guide/` in the inter-state section | unchanged | unchanged |

**The brief's suggested links.**

- Used where they help: `/gujarat/`, `/services/business-registration/`,
  `/contact/` and `/faqs/`.
- `/gujarat/` is not linked from the FSSAI guide, because nothing in that
  guide is Gujarat-specific.
- No location pages are linked for their own sake.

## Links in (added on this branch)

| From | To | How |
|---|---|---|
| `/blog/` | all three | Blog index and category listing, automatic from `ARTICLES` |
| `/blog/after-company-incorporation-compliance-checklist/` | FSSAI, IEC | In-text, in "Activity licences" |
| `/blog/common-business-registration-mistakes-india/` | Trademark | In-text, in "Falling in love with a name before checking it" |
| `/blog/gujarat-shops-establishments-registration/` | FSSAI | In-text, where food businesses are mentioned |
| `/blog/gst-registration-gujarat-guide/` | IEC | In-text, in the inter-state section |
| `public/llms.txt` | all three | Listed with a summary, and the note that Raulji does not file them |

The new guides also link to each other where the topics meet: IEC → FSSAI
for food imports, and FSSAI → GST.

## Inbound pages per guide (local crawl of all 103 sitemap URLs)

| Guide | Linking pages |
|---|---|
| GST in Gujarat | 8 |
| FSSAI | 4 |
| IEC | 3 |
| Trademark | 2 |

No page on the site is an orphan.

Trademark has the fewest inbound links, because no existing page discusses
brands beyond name screening. A natural further link would be from the four
registration service pages' name-screening text. That is client-approved
service copy, so it was not edited.
