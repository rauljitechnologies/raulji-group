# Raulji Group — Master Website Development & SEO Rules

**Permanent master instruction for the raulji.com project.** Supplied by the client.
Every change to this codebase is judged against this document. Where an earlier
build decision conflicts with a rule here, this document wins.

- **Website:** https://www.raulji.com/
- **Brand:** Raulji Group
- **Primary positioning:** A professional, consulting-focused business group.
- **Brand tagline:** Leadership Built on Relationships. Trust Built for the Long Term.
- **Brand philosophy:** We Don't Just Build Businesses. We Build Futures.
- **Phone:** +91 8511187689
- **Email:** admin@raulji.com

---

## 1. Most important brand rule

Raulji.com must look and feel like a REAL, ESTABLISHED, PROFESSIONAL BUSINESS GROUP.
It must NOT look AI-generated.

Do not use: generic AI-generated corporate people · unrealistic AI office scenes ·
fake-looking executives · artificial 3D business people · excessive glassmorphism ·
generic AI illustrations · overly futuristic graphics · stock-photo-heavy layouts ·
generic SaaS templates · fake corporate statistics · excessive gradients ·
excessive animations.

The website should feel: human, premium, corporate, trustworthy, mature, practical,
professional, clean, business-focused.

Use real brand assets, real company information, real team information and real
business context wherever available.

## 2. Homepage purpose

The homepage is the RAULJI GROUP CORPORATE BRAND PAGE. Do NOT make it primarily a
company-registration landing page.

Priority order: 1. Raulji Group identity · 2. Consulting positioning ·
3. Business solutions · 4. Group/company ecosystem · 5. Trust · 6. Who we help ·
7. High-level services · 8. Conversion to consultation/contact.

Detailed SEO and conversion work happens on individual SERVICE PILLAR PAGES. The
homepage introduces services; it does not contain every detail of every service.

## 3. Homepage must not be overloaded

Not on the homepage: long service descriptions · full pricing tables · every
registration package · every city · every FAQ · every service keyword · large SEO
paragraphs · huge service lists.

Keep it clean and corporate. Move users onward with: "Explore Service",
"Learn More", "Talk to an Expert", "Explore Our Group".

## 4. Homepage hero

- **Eyebrow:** RAULJI GROUP
- **H1:** We Don't Just Build Businesses. We Build Futures.
- **Supporting copy:** positions Raulji Group as a consulting-focused business group
  helping entrepreneurs and businesses make informed decisions, solve business
  challenges and move forward with clarity.
- **Primary CTA:** Talk to an Expert
- **Secondary CTA:** Explore Our Services
- **Phone:** +91 8511187689
- **Brand statement:** Leadership Built on Relationships. Trust Built for the Long Term.

The hero must not look like a registration advertisement.

## 5. Homepage meta

- **Title:** Raulji Group | Business Consulting & Solutions
- **Description:** Raulji Group is a business-focused group helping entrepreneurs and
  businesses with consulting, business solutions, registration and specialized
  services, with a focus on long-term growth.

Not Gujarat-only. Not registration-only.

## 6. Homepage sections

Header → Hero → The Raulji Group → Business Consulting → Our Business Solutions →
Why Raulji Group → How We Work → Our Group / Raulji Technologies → Who We Help →
Featured Services → Insights / Blog → Final CTA → Corporate Footer.

Keep sections visually distinct. Do not create excessive scrolling just for SEO.

## 7. About / The Raulji Group

Heading: **The Raulji Group**. Subheading: *Leadership Built on Relationships.
Trust Built for the Long Term.*

Explain who Raulji Group is, what the group focuses on, how it approaches business,
the long-term relationship focus, and the consulting-led positioning. Detailed
company history belongs on `/about/`.

Do NOT use "Founded by Raulji Brothers and Sons" unless verified and approved as
official company history.

## 8. Consulting is the primary focus

Business Consulting is the primary focus of Raulji Group. Dedicated pillar:
`/services/business-consulting/`. The homepage introduces consulting concisely.

Possible positioning: *Clearer Decisions. Stronger Business Direction.*

Only include consulting services Raulji Group actually provides. Potential areas:
business strategy, business planning, business growth, business advisory, business
structuring, operational guidance, expansion planning. **Do not invent services.**

## 9. Service pillar architecture

Primary pillars: **Business Consulting**, **Business Registration**,
**Insurance Services**. Technology & Digital is represented through the separate
Raulji Technologies brand.

## 10. Business registration

An important service pillar, NOT the entire Raulji Group identity.

- `/services/business-registration/` (pillar)
- `/services/pvt-registration/`
- `/services/llp-registration/`
- `/services/partnership-registration/`
- `/services/proprietorship-registration/`

Audit and improve the existing Pvt Ltd and LLP pages. Do not unnecessarily change
their URLs.

## 11. Registration service pages

Hero → Service overview → Who is it for? → Key features / considerations →
Eligibility / requirements → Documents → Process → What Raulji Group handles →
Pricing / package information → FAQs → Comparison / alternatives → CTA → Contact →
Disclaimer.

Only legally accurate information. No legal claims without verification.

## 12. Pricing rule

The homepage is NOT a pricing page. No large package pricing tables on the homepage.

Service page = overview + starting information + CTA. Detailed packages live in a
dedicated pricing area (e.g. `/pricing/`) or service-specific pricing sections where
that is clearer. Do not duplicate pricing content across pages.

Every price must be verified before publishing. Clearly distinguish Raulji Group
professional/service fee vs government/statutory fees vs third-party charges. Never
say "all inclusive" unless it is. **Never invent prices.**

## 13. No fake claims — NON-NEGOTIABLE

Never invent: client numbers · years in business · awards · testimonials · reviews ·
revenue · offices · employee count · success rates · retention rates · government
affiliations · certifications · partnerships · case studies · customer logos ·
"No.1" · "Best" · "Fastest" · "Guaranteed" · "100% success" · fake statistics.

Audit existing content for these. If unverifiable, REMOVE — do not replace with
other invented numbers.

## 14. Technology brand

Raulji Technologies stays a separate brand: https://rauljitechnologies.com/

Raulji.com may introduce it ("Technology, software, AI and digital transformation
solutions") with a CTA "Explore Raulji Technologies". Do NOT duplicate the full
technology service catalogue on Raulji.com.

## 15. Outdated services

**Resolved 2026-09-16.** The client confirmed that Legal & Compliance, Finance
Advisory and GST/DIN/MCA are not Raulji Group services. They were removed from
`lib/secondary-services.ts` and their URLs 301 to the homepage at the client's
explicit instruction, which is a documented exception to the rule below about
redirecting only to genuinely relevant destinations. Insurance, IT, Digital,
Private Limited Compliance and LLP Compliance were confirmed as staying.

**Also resolved 2026-09-16.** The client's final brief proposed a different
header navigation (section 29) and a different enquiry button label
(section 11). The client chose to keep both as specified here: the navigation
in rule 16, and "Get Business Guidance" in rule 23.


Audit for Land Investment, Rentals, Finance, Legal & Compliance and other
discontinued services. If no longer part of current strategy, remove from main
navigation, homepage, service listings, footer and internal links.

Do NOT delete URLs without an SEO migration plan. For every discontinued URL decide
301 redirect **or** 410 Gone. Only redirect to a genuinely relevant destination.
Never redirect unrelated pages simply to preserve SEO.

## 16. Header

Communicates Raulji Group first. Suggested nav: About · Consulting · Services ·
Gujarat · Group · Resources · Contact. Primary CTA: **Talk to an Expert**.

Services dropdown: Business Consulting · Business Registration (Private Limited,
LLP, Partnership, Proprietorship) · Insurance Services · Technology & Digital
(Explore Raulji Technologies).

Keep navigation clean. Do not overcrowd the header.

## 17. Gujarat

Raulji Group is NOT Gujarat-only — the homepage carries India-wide positioning.
Gujarat is an important geographic SEO market.

`/gujarat/` focuses on business registration support across Gujarat. Create
root-level city pages where there is genuine business/SEO value:

`/ahmedabad/` `/vadodara/` `/surat/` `/rajkot/` `/gandhinagar/` `/anand/` `/nadiad/`
`/bharuch/` `/ankleshwar/` `/vapi/` `/valsad/` `/navsari/` `/bhavnagar/` `/jamnagar/`
`/junagadh/` `/godhra/` `/dahod/` `/halol/` `/mehsana/` `/patan/` `/palanpur/`
`/himmatnagar/` `/modasa/` `/morbi/` `/surendranagar/` `/bhuj/` `/gandhidham/`

Do NOT create `/gujarat/panchmahal/godhra/` or any district-nested URL.

**City + service URLs: resolved 2026-09-16.** This rule originally banned service ×
city URLs outright. The later client brief (its sections 16 and 21) requires them
"where commercially justified" and gives `/ahmedabad/llp-registration/` as the
example, which contradicted this rule. Client decision: build them for five
priority cities only, with hand-written local content per page.

- Permitted: Ahmedabad, Vadodara, Surat, Rajkot and Gandhinagar, each × the four
  registration structures. Twenty URLs, no more.
- Every one of those pages must carry local content written for that city and that
  structure. A page that would only differ by a substituted city name must not ship.
- All other cities keep one page covering all four structures.
- Do not extend this set without a further client decision.

The original concern stands and is not weakened: do not create thousands of thin
location pages, and do not mass-generate by template.

## 18. Location UX

No huge list of city names in the footer. Use **Explore All Locations**, which opens
a searchable location drawer — right-side drawer/modal on desktop, full-screen panel
on mobile. Search placeholder: "Search your city or town...". Include popular
locations, alphabetical locations, search.

Accessibility: ESC close · keyboard navigation · focus management · body scroll lock ·
accessible buttons · click-outside close where appropriate.

## 19. Internal linking

Deliberate system, natural descriptive anchor text, no over-optimisation.

- **Homepage →** Business Consulting, Business Registration, Insurance, Gujarat,
  Raulji Technologies, About, Resources
- **Registration pillar →** Pvt Ltd, LLP, Partnership, Proprietorship
- **Each registration page →** pillar, other structures, consulting where relevant,
  Gujarat, relevant city page, Contact/CTA
- **Consulting pages →** related consulting pages, relevant business services, Contact
- **Gujarat →** city pages, Business Registration, registration service pages
- **City pages →** registration pillar, four registration services, Gujarat, Contact

## 20. SEO

Every indexable page: unique title · unique meta description · canonical · one H1 ·
logical H2/H3 · breadcrumbs · internal links · image alt text · OG title/description/
image/URL · Twitter metadata · sitemap inclusion · robots directives.

Schema where appropriate: Organization, WebSite, BreadcrumbList, Service, FAQPage
(only if visible and valid), Article for blog content. Never add fake structured data.

## 21. SEO content quality

Do not write for word count. Every paragraph should help the user.

Avoid keyword stuffing, repetitive city names, repeated service names, AI filler,
"In today's fast-paced world" introductions, unnatural keyword combinations.

## 22. CRO

Primary CTA: **Talk to an Expert**. Others: Discuss Your Business · Get Business
Guidance · Explore Consulting · Explore Services · Start Your Business.

Do not use "Register Now" everywhere.

## 23. Consultation form

Fields: Full Name · Mobile Number · Email · Business / Company Name · City ·
"What do you need help with?" (Business Consulting / Business Registration /
Insurance / Technology / Digital / Other) · Message.

Button: **Get Business Guidance**

Success: "Thank you. Your enquiry has been received. A Raulji Group representative
will contact you using the details provided."

Do not promise response times unless verified.

## 24. Design system

Use the real Raulji logo. Brand colours: Raulji Blue, Dark Navy, White, Light Grey.

Use clean typography, premium spacing, strong hierarchy, subtle borders, subtle
shadows, professional photography, realistic business imagery, minimal animation.

Avoid over-designed UI, excessive gradients, excessive rounded cards, excessive
floating elements, fake AI people, generic SaaS design.

## 25. Responsive design

Test 320 · 375 · 390 · 414 · 768 · 1024 · 1280 · 1440px+. No horizontal overflow.

Tables: proper table on desktop, responsive cards or controlled horizontal scroll on
mobile. Mobile-friendly forms. Accessible mobile hamburger menu. Full-screen mobile
location drawer.

## 26. Accessibility

WCAG 2.2 AA where practical: semantic HTML · accessible labels · keyboard navigation ·
focus states · correct heading hierarchy · accessible accordions · accessible drawers ·
good contrast · alt text · ARIA only where necessary.

## 27. Performance

Optimise Core Web Vitals (LCP, INP, CLS). WebP/AVIF, responsive images, lazy loading,
correct image dimensions, lightweight CSS/JS, caching, compression, minimal
third-party scripts.

No heavy animations for appearance. Do not load unnecessary city data on initial page
load.

## 28. OG / social sharing

Every important page needs a professional OG image.

- Homepage: Raulji Group — We Don't Just Build Businesses. We Build Futures.
- Service: Service name + Raulji Group
- City: Business Registration in [City] | Raulji Group

No unreadable or generic images.

## 29. Analytics

Track: page_view · primary_cta_click · phone_click · email_click · whatsapp_click ·
form_view · form_start · form_submit · service_card_click · city_page_click ·
gujarat_page_click · technology_click.

Do not collect unnecessary sensitive data.

## 30. Footer

Corporate and clean.

Brand: Raulji Group. Tagline: Leadership Built on Relationships. Trust Built for the
Long Term.

Columns: Business Consulting, Business Registration (Private Limited, LLP,
Partnership, Proprietorship), Insurance · Group (About, Team, Gujarat, Raulji
Technologies, Contact) · Resources (Blog, Business Guides, FAQs) · Legal (Privacy,
Terms, Disclaimer).

Contact: +91 8511187689, admin@raulji.com. Button: **Explore All Locations**.

Do NOT put every city in the footer.

## 31. Page purpose rule

Every page has ONE primary purpose.

| Page | Purpose |
| --- | --- |
| Homepage | Brand + trust + overview + navigation |
| Consulting pillar | Consulting SEO + lead generation |
| Registration pillar | Registration overview + navigation |
| Registration service | Detailed SEO + conversion |
| Pricing | Pricing clarity |
| Gujarat | Geographic hub |
| City | Local SEO + service discovery |
| About | Company story |
| Blog | Educational authority |
| Contact | Conversion |

## 32. Mobile sticky CTA

Consider a clean sticky bar: Call · Talk to an Expert · Start Your Business. Must not
block content.

## 33. Blog / content strategy

Supports consulting authority and service SEO. Topics: business strategy, planning,
growth, entrepreneurship, business structures, registration education, business
technology, AI for business, leadership, operational improvement.

Do not publish generic AI-written articles to increase page count. Every article must
provide genuine value.

## 34. AI content rule

AI may assist with drafting, but final content must feel human-written and
business-specific. Do not publish obvious AI patterns ("In today's rapidly evolving
business landscape...", "Whether you're a startup or established enterprise...",
"Unlock your full potential...", "Take your business to the next level...") unless
genuinely appropriate. Use specific, useful language.

## 35. SEO + CRO balance

Never sacrifice UX for SEO. No huge keyword text blocks. No hidden keywords. No
duplicate city pages. No duplicate service pages. No thin content. No
over-optimisation.

## 36. Security / trust

Contact forms protected against spam: validation, rate limiting where appropriate,
CAPTCHA/anti-spam if needed, secure submission, privacy notice. Do not expose
personal data.

## 37. Redirect strategy

Before deleting or renaming URLs, create a complete URL inventory. Classify every old
URL: KEEP · UPDATE · REDIRECT · 410 · NOINDEX.

Do not lose existing SEO value unnecessarily. Do not redirect unrelated pages.

## 38. Technical QA

Before final deployment test: all links · all CTAs · forms · phone links · email
links · navigation · mobile menu · location drawer · breadcrumbs · canonicals ·
sitemap · robots.txt · schema · OG images · 404 · redirects · image loading ·
performance · accessibility · responsive layouts.

## 39. Current strategic decision

- Raulji Group homepage = CORPORATE GROUP
- Business Consulting = PRIMARY FOCUS
- Business Registration = IMPORTANT SERVICE PILLAR
- Insurance = SUPPORTING SERVICE
- Raulji Technologies = SEPARATE TECHNOLOGY BRAND
- Gujarat = IMPORTANT LOCAL SEO MARKET
- Detailed service pages = SEO + CRO
- Pricing = SEPARATE / DEDICATED PRICING AREA

## 40. Final rule

For every change, ask: does this make Raulji Group look more professional,
trustworthy, human, consulting-focused, clear, easy to use, search-engine friendly,
conversion friendly, scalable?

If not, do not add it. Never add content, design elements, statistics, services,
locations or claims merely because they look impressive.

**TRUTH + TRUST + UX + SEO + CRO > MORE CONTENT.**

The final result must look like a genuine professional Raulji Group website, not an
AI-generated website or a generic registration-agency template.
