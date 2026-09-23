# Homepage image handover

The design brief asks for a photographic image system on the homepage: real
Indian business photography, or AI-generated supporting photography where no
real photograph exists.

**None of those photographs exist yet, and this repository cannot produce them.**
No image-generation tool is available in the environment the site is built from.
What is in `public/photos/` today is drawn artwork: navy fields with brand line
work, the Raulji mark and a caption. Every slot the brief names is wired up,
sized, lazy-loaded and given alt text, and each one is currently filled with the
drawing that stands in for it.

This file is the handover. For each slot it gives the file to overwrite, the
size, the prompt from the brief, and the alt text to set once the photograph is
in. Dropping a photograph in is a file copy plus one line of alt text.

## Ground rules, before anything is generated

These are not style preferences. They come from master rule 1 and section 32 of
the design brief, and they are the difference between a supporting image and a
fake claim.

- **Never** present a generated person as a Raulji Group employee, founder or
  client. The captions and the alt text must not imply it either.
- **Never** present a generated interior as the Raulji Group office.
- If a real photograph of the team, the Chairman or the office exists, it wins.
  Do not replace a real photograph with a generated one.
- No fake certificates, awards, logos, government signage, MCA branding,
  dashboards or statistics inside any image.
- No generic handshake.

The Chairman's photograph is real and already on the site, at
`public/leadership/dharmendrasinh-raulji.jpg`. It is a LinkedIn profile picture
supplied as a stand-in for an official portrait, it is flagged as such in
`lib/site.ts`, and it is used on `/about/` and `/team/` only.

## How to swap one in

1. Save the photograph as WebP at the path in the table below, overwriting the
   drawing. Keep the filename: it is a public URL and it is what image search
   sees.
2. Match the aspect ratio in the table. The layout crops with `object-cover`, so
   a different ratio will crop rather than letterbox, and captions near an edge
   get cut.
3. Open `lib/images.ts` and replace that slot's `alt` with the alt text below.
   The current alt describes a drawing. Leaving it in place over a photograph
   would describe something that is no longer on screen, which is worse than no
   alt text.
4. Nothing else changes. Width, height, `srcset`, `sizes`, lazy loading and the
   blur placeholder are all derived from the file by `components/ui/brand-image.tsx`.

Only the hero carries `priority`. Everything else is lazy by default, which is
what keeps the largest contentful paint on the hero where it belongs.

## The slots

| Slot | File to overwrite | Size | Where it appears |
| --- | --- | --- | --- |
| `hero` | `public/photos/raulji-group-hero.webp` | 1200x675, 16:9 | Homepage hero, right column. **Loads with priority.** |
| `consulting` | `public/photos/raulji-group-business-consulting.webp` | 1200x900, 4:3 | Our Group, Raulji Consulting Services card |
| `technologies` | `public/photos/raulji-technologies.webp` | 1200x900, 4:3 | Our Group, Raulji Technologies card |
| `office` | `public/photos/raulji-group-office.webp` | 1200x900, 4:3 | About Raulji Group, left column |
| `gujarat` | `public/photos/raulji-group-gujarat.webp` | 1200x675, 16:9 | Business Support Across Gujarat |
| `meeting` | `public/photos/raulji-group-client-meeting.webp` | 1200x800, 3:2 | Lead generation, beside the form |
| `pvtStructure` | `public/photos/private-limited-company-registration.webp` | 800x600, 4:3 | Registration card, Private Limited |
| `llpStructure` | `public/photos/llp-registration-india.webp` | 800x600, 4:3 | Registration card, LLP |
| `partnershipStructure` | `public/photos/partnership-firm-registration.webp` | 800x600, 4:3 | Registration card, Partnership Firm |
| `proprietorshipStructure` | `public/photos/proprietorship-registration.webp` | 800x600, 4:3 | Registration card, Proprietorship |

### 1. Hero

> Create a photorealistic premium editorial photograph of an Indian entrepreneur
> having a professional business consultation with an experienced business
> advisor in a modern Indian office. The entrepreneur is reviewing business
> documents and discussing a business plan with the advisor. Show authentic
> Indian business culture, realistic people, natural expressions, natural skin
> texture, sophisticated modern office, daylight, premium corporate editorial
> photography, realistic materials, subtle navy blue and white visual
> atmosphere, trustworthy and confident mood, clean composition, generous
> negative space, high-end business consulting website aesthetic. No handshake
> cliche, no government office, no MCA logo, no fake certificates, no futuristic
> holograms, no cartoon, no 3D render, no fake statistics, no text inside image.
> 16:9 horizontal composition.

Alt: `Indian entrepreneur discussing business plans with a professional business advisor`

Leave generous space on one side. This sits next to a large headline, and a
composition that is busy edge to edge fights it.

### 2. Raulji Consulting Services

> Photorealistic premium editorial image of an Indian entrepreneur discussing
> business planning and registration options with a professional Indian business
> consultant at a modern office desk. Documents, laptop and notebook visible
> naturally. Authentic Indian business environment, professional consultation,
> natural daylight, realistic people, premium corporate photography, navy and
> white visual atmosphere, clean composition, trustworthy and human. No fake
> certificates, no government branding, no logos, no excessive technology
> effects, no text.

Alt: `Business consultant discussing business planning with an Indian entrepreneur`

### 3. Raulji Technologies

> Photorealistic premium editorial photograph of a modern Indian technology team
> collaborating around a laptop and large display in a contemporary office.
> Developers and business professionals discussing a software or AI-enabled
> digital product. Realistic Indian people, authentic expressions, modern but
> believable technology environment, natural lighting, sophisticated corporate
> photography, subtle navy and blue colour atmosphere, clean premium
> composition. No futuristic holograms, no fake UI text, no cyberpunk, no
> exaggerated AI effects, no logos, no text.

Alt: `Indian technology team discussing a digital product and software project`

This card links out to rauljitechnologies.com. It must read as a different
business from the consulting card beside it, so do not use a near-identical
desk-and-laptop framing for both.

### 4. About Raulji Group

**Use a real photograph here if one exists.** A genuine team or office
photograph is worth more on this section than any generated image, and this is
the section where a generated one is most likely to be read as a claim about the
company.

If none exists:

> Photorealistic premium editorial image representing a growing Indian business
> group. Show a professional business meeting with several Indian business
> professionals discussing long-term business strategy around a conference
> table. Authentic Indian corporate environment, natural expressions, realistic
> people, warm natural lighting, premium editorial photography, trustworthy and
> relationship-focused mood. No claim that the people are Raulji employees, no
> fake company signage, no logo, no text.

Alt: `Business professionals discussing long-term business strategy`

Note the alt text deliberately does not say who the people are. It must not,
unless they are genuinely Raulji Group people in a real photograph.

### 5. Gujarat

Prefer a real or licensed Gujarat photograph.

> Photorealistic wide editorial photograph representing the business environment
> of Gujarat, India. Show a modern Gujarat commercial or industrial setting with
> Indian entrepreneurs and businesses, realistic architecture and natural
> daylight. The visual should feel authentic to Gujarat without inventing a
> specific landmark. Premium corporate editorial photography, clean composition,
> realistic Indian environment, sophisticated and trustworthy. No fake landmark,
> no text, no logo, no exaggerated skyline.

Alt: `Business environment in Gujarat representing local business support`

Do not generate a recognisable landmark. An invented building presented as a
real Gujarat landmark is a fake claim in picture form.

### 6. Lead generation

> Photorealistic premium editorial image of an Indian entrepreneur having a calm
> one-to-one business consultation with a professional advisor. Modern Indian
> office, laptop and notebook visible, natural daylight, authentic expressions,
> trustworthy relationship-focused atmosphere, sophisticated corporate
> photography, clean navy and white visual mood. No handshake cliche, no logos,
> no text, no fake certificates.

Alt: `Indian entrepreneur speaking with a business consultant`

### 7 to 10. The four registration structures

These four are **not** a photography slot, and should not become one.

The brief is explicit that four generic document images would be wrong here, and
photography cannot solve the problem this row has: a photograph of two people at
a desk looks the same whether they are signing a partnership deed or
incorporating a company. The one question a reader on this row is asking is how
the four structures differ from each other.

So each card carries a diagram of the single distinguishing feature:

| Card | What it draws |
| --- | --- |
| Private Limited | Ownership divided into share units inside a company boundary |
| LLP | Two partners standing behind a liability shield |
| Partnership Firm | Two partners joined to a signed deed, no shield |
| Proprietorship | One owner inside a single unbroken ring |

They are generated by `scripts/gen-panels.py` and can be redrawn at any size.
Replace them with photographs only if someone has a better idea for showing the
difference between four legal structures in a 4:3 card.

## Regenerating the drawings

```
python3 scripts/gen-panels.py
```

Writes every panel in `public/photos/`. Requires Pillow.
