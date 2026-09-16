# Raulji.com audit, 2026-09-16

Audit of the live implementation against the client's final website update
instruction. Measured, not assumed: every page in `sitemap.xml` (79 URLs) was
fetched and parsed for status, title, description, canonical, H1 count, OG
image, schema types, image count, missing alt text, em dashes and word count.

Reproduce with `scratchpad/audit.mjs` against a running dev server.

## What the site already is

| | |
| --- | --- |
| URLs in sitemap | 79, all returning 200 |
| Homepage | 1 |
| Service pages | 15 |
| City pages | 33 |
| City + service pages | 20 (5 cities x 4 structures) |
| Other (about, team, blog, contact, faqs, compare, gujarat, legal) | 10 |

Schema in use: Organization, WebSite, ItemList, Service, FAQPage,
BreadcrumbList, Person. No review or rating schema anywhere, which is correct.

## KEEP (verified, no change needed)

1. **Technical SEO baseline.** No duplicate titles. No duplicate descriptions.
   Every page has a canonical, an OG image, exactly one H1 and breadcrumbs.
   No page under 400 words. No image missing alt text. No non-200 in the
   sitemap. Brief section 23 and 41 are already satisfied.
2. **URL architecture.** Trailing slash is consistent and enforced in
   `next.config.ts`. The legacy redirect map is in place (`/rent`, `/rent/*`,
   `/services/land-investment`, `/industries`, `/services/company-registration`,
   `/services/consulting`, `/services/registration`, `/business-registration`,
   `/business-consulting`), and `/rentals/` returns 410 with an explainer.
3. **The pages brief section 18 asks us to create already exist**:
   `/services/partnership-registration/` and
   `/services/proprietorship-registration/`, both with unique content
   (2452 and 2407 words), plus `/services/business-registration/` (2730) and
   `/services/business-consulting/` (1997).
4. **All 20 priority city pages from brief section 20 exist**, plus 13 more.
5. **All 20 city + service pages from brief section 21 exist**, for the five
   cities the client approved, each with hand written local content.
6. **Contact details are correct and verified** everywhere: +91 8511187689 and
   admin@raulji.com. No invented office address. No old email addresses.
7. **The enquiry form already collects exactly the fields brief section 11
   asks for**: service required, name, phone, email, city, message. It has
   labels, inline validation, error and success states, a honeypot, and
   `form_view` / `form_start` / `form_submit` tracking with lead source and
   page.
8. **Analytics events** cover page_view, primary_cta_click, phone_click,
   email_click, whatsapp_click, form events, service_card_click,
   city_page_click, gujarat_page_click and technology_click.
9. **No fake social proof anywhere.** No counters, testimonials, reviews,
   awards, client logos or statistics. Nothing to remove.

## IMPROVE

1. **The image system. This is the real gap and it matches what the client
   is reacting to.** 77 of 79 pages carry no image other than the header logo.
   Only `/about/` and `/team/` have a second image, the Chairman photograph.
   Six pages carry inline SVG figures (homepage hero, the four registration
   pages, `/compare/`, `/gujarat/`). Everything else is text, icons and rules.
   See "Image plan" below.
3. **Homepage length.** 1804 words. Brief section 7 wants it shorter and more
   focused. The sections are the ones the brief lists, so the work is trimming
   copy inside sections rather than removing sections.
4. **Service cards are visually identical** (brief section 8 asks for subtle
   differentiation inside one design system).
5. **Business journey** exists as `business-journey.tsx` but is text heavy.
   Brief section 9 wants a cleaner visual treatment.
6. **City pages average 2494 words** with no visual break. They are the
   longest pages on the site and the most text heavy.

## CREATE

1. **Image plan and the slots to hold it.** See below. Nothing can be filled
   with real photography until the client supplies photographs.
2. **Structure figures on the city + service pages**, which currently repeat
   the registration argument in prose with no visual.
3. **A process figure** for the registration journey, replacing text-heavy
   step lists on the service pages.

## REMOVE (done)

`/services/legal/`, `/services/finance/` and `/services/gst-din-mca/`, on the
client's confirmation that Raulji Group does not provide them. Removing the
entries from `lib/secondary-services.ts` takes them out of `/services/`, the
sitemap and every internal link in one move. Sitemap: 79 URLs down to 76.

No fake claims, invented data or placeholder content was found anywhere, so
there was nothing else to remove.

## REDIRECT (done)

The three removed URLs 301 to the homepage, per the client's instruction. See
the note under VERIFY. Nothing else was renamed, and the existing redirect map
is unchanged.

## VERIFY: answered by the client on 2026-09-16

1. **The eight questioned service URLs. Resolved.** Legal & Compliance,
   Finance Advisory and GST/DIN/MCA are not Raulji Group services. Their
   entries are removed from `lib/secondary-services.ts`, which takes them out
   of `/services/`, the sitemap and every internal link at once, and
   `next.config.ts` 301s all three to the homepage on the client's explicit
   instruction. Insurance, IT, Digital, Private Limited Compliance and LLP
   Compliance stay live, unchanged.

   Recorded for the record, not as a blocker: master rule 15 and 37, and the
   client's own brief at section 35, say not to redirect unrelated pages to
   the homepage. A redirect to a page that does not answer the original query
   is commonly treated as a soft 404 and passes little of the old page's
   value. The rule-consistent handling would be 410 for `/services/legal/`
   and `/services/finance/`, which have no successor, and 301 for
   `/services/gst-din-mca/` to `/services/business-registration/`, which
   covers MCA filing support. The client asked for the homepage. Changing it
   later is a one line change per URL.
2. **Header navigation. Resolved: keep the current nav** (Group, Consulting,
   Services, Gujarat, Resources, Contact), per master rule 16. Brief section
   29 does not apply.
3. **Enquiry button. Resolved: keep "Get Business Guidance"**, per master
   rule 23. Brief section 11's "Send Enquiry" does not apply.
4. **Photography. Still open.** Nothing else unblocks the image system.

## Image plan (brief sections 24 and 25)

Filenames and alt text are set now so the client can supply photographs
against a list rather than a description. Every slot renders nothing until a
real file exists: no placeholder, no stock, no AI generated people or offices.

| Slot | File | Alt text | Page |
| --- | --- | --- | --- |
| Group / corporate | `raulji-group-office.webp` | Raulji Group office in Vadodara | Home, About |
| Business consulting | `raulji-group-business-consulting.webp` | A Raulji Group consulting session | Consulting pillar |
| Company registration | `raulji-group-company-registration.webp` | Registration documents being prepared at Raulji Group | Registration pillar |
| Founder / leadership | `dharmendrasinh-raulji.jpg` (have) | Dharmendrasinh Raulji, Chairman | About, Team |
| Business meeting | `raulji-group-client-meeting.webp` | A client meeting at Raulji Group | Home, Contact |
| Documentation | `raulji-group-documents.webp` | Incorporation documents prepared by Raulji Group | Service pages |
| Gujarat business environment | `raulji-group-gujarat.webp` | Business district in Gujarat | Gujarat hub |
| Technology brand | `raulji-technologies.webp` | Raulji Technologies | Home group section |
| Lead generation | `raulji-group-enquiry.webp` | The Raulji Group team at work | Home enquiry |

What we need from the client, in order of value:

1. The Vadodara office, outside and inside.
2. The team working: a desk, a meeting, a document being signed.
3. The Chairman in a working setting, to sit alongside the existing portrait.
4. Any certificates or registrations that can be evidenced.

Until those arrive, visual weight is carried by figures built in the brand
palette that explain something real. That is a deliberate choice, not a
placeholder: master rule 1 and brief section 2 rule out stock photography, AI
generated offices and generic business people, which is the only other way to
fill these slots.
