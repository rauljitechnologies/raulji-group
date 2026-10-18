# Legal content review

Every statutory statement the site makes, the provision it rests on, and when
it was last checked.

**Reviewed: 2026-10-18.** Reviewer: engineering, against the provisions named
below. **This is not professional sign-off.** Nothing here has been reviewed by
a practising CA or CS, and the two items marked *Needs professional review*
specifically require one.

Related: [EXTERNAL-CITATIONS.md](EXTERNAL-CITATIONS.md) tracks the outbound
links to government sources. This file tracks the claims themselves.

## How to use this file

Before editing any sentence about a deadline, a form, a threshold or a fee,
find it here. If it is not here, add it with its provision. If a review finds
a claim has changed in law, correct the claim **and** record the change, so the
next reviewer can see what moved and when.

Never state a statutory figure the site cannot source. Where the sources
genuinely disagree, say less rather than picking a side — see the LLP fee note
below for the pattern.

## Verified

| Claim | Provision | Note |
| --- | --- | --- |
| The board appoints the first auditor within 30 days of incorporation | Companies Act 2013, **s.139(6)** | Unambiguous. The section also gives members 90 days at an EGM if the board fails to appoint; the site does not mention that, which is a reasonable omission for its audience. |
| A Private Limited Company is audited every financial year from its first, regardless of turnover | Companies Act 2013, **s.139 / s.143** | No small-company exemption from audit. Correct as stated. |
| Form INC-20A declaring commencement of business within 180 days | Companies Act 2013, **s.10A** | Correct. |
| Late ROC filing **by a company** attracts a fee for each day of delay | Companies Act 2013, **s.403** | ₹100/day for AOC-4 and MGT-7. Still current. **Not affected by the LLP change below** — the two regimes are separate, and conflating them is the easy mistake here. |
| LLP annual return in Form 11, due 30 May | LLP Act 2008; LLP Rules 2009, **r.25(1)** — 60 days from close of financial year | FY ends 31 March, so 30 May. |
| LLP Statement of Account and Solvency in Form 8, due 30 October | LLP Rules 2009, **r.24** — 30 days from the end of six months of the financial year | Six months from 31 March is 30 September, plus 30 days. |
| Form 11 must be filed before Form 8 | MCA filing sequence | Correct as stated on `/services/llp-registration/`. |
| LLP Agreement filed in Form 3 within 30 days of incorporation | LLP Act 2008, **s.23(2)** | Correct. |
| Partnership registration with the Registrar of Firms is optional | Indian Partnership Act 1932, **s.58 / s.69** | Correct, and the site correctly explains the consequence under s.69 rather than just calling it optional. |
| Udyam (MSME) registration is free | MSME / Udyam portal | Correct. Worth re-checking at each review; "free" is the kind of claim that changes. |

## Corrected on 2026-10-18

### The LLP late-filing fee was described as uncapped

**What the site said.** Fifteen passages described the fee for a late Form 8 or
Form 11 as a per-day charge with no upper limit — "no ceiling", "uncapped daily
late fees", "a per-day penalty that keeps accruing".

**Why it was wrong.** That was the position until 31 March 2022. The **LLP
(Second Amendment) Rules 2022, G.S.R. 173(E) dated 4 March 2022**, in force
1 April 2022, replaced it with an additional fee set as a multiple of the
normal filing fee, rising in bands with the length of the delay, with a
per-day element only once the delay exceeds 360 days.

**Severity.** P1. Wrong information about money, stated as fact, on the
commercial pages that exist to win registration work — and it *overstates* the
penalty, so it reads as scare-selling. It had been wrong for over four years.

**What it says now.** That the fee **increases with the length of the delay**.
True under the banded regime, and still true if the bands are amended again.

**Why no numbers.** The site deliberately states no multiplier and no rupee
figure. The secondary sources consulted disagreed on the detail — including on
whether Form 8 and Form 11 kept a per-day element at all — and a figure the
site cannot source is a figure it should not print (master rule 12). The
wording chosen is true under every reading on offer, which is the point.

**If you want the numbers on the page:** get them from the current MCA fee
schedule and have a CA or CS confirm them, then state them with the date they
were checked. Do not take them from a comparison blog.

### Form ADT-1 was presented as the first auditor's appointment route

**What the site said.** That the first auditor "must be appointed within 30
days **through Form ADT-1**", in two places.

**Two problems.** The appointment is made by the board, by resolution — ADT-1
is a notice to the Registrar, not the mechanism of appointment. And **r.4(2) of
the Companies (Audit and Auditors) Rules 2014** ties that notice to the fourth
proviso to **s.139(1)**, the AGM appointment. It does not refer to **s.139(6)**,
which is the first-auditor provision.

**Status of the filing duty.** Unsettled. Filing ADT-1 for a first auditor is
widely treated as prudent practice rather than an express statutory duty, and
commentary through 2025–2026 continues to describe it as recommended rather
than mandated. The rules have not been amended to say otherwise.

**What it says now.** The 30-day deadline is stated as the statutory fact it
is. The filing duty is no longer asserted. ADT-1 survives in one place, in
`lib/secondary-services.ts`, describing what Raulji Group files as part of its
compliance service — a description of our own work, not of the client's legal
obligation.

## Needs professional review

### 1. The LLP audit threshold reading — the open question

**Where it appears.** `lib/comparison.ts`, `lib/services.ts`,
`lib/city-services.ts`, `lib/secondary-services.ts`, and the blog articles
`pvt-vs-llp.ts`, `structure-guide.ts`, `choose-business-structure.ts`,
`registration-mistakes.ts`.

**What the site says.** Audit is required where turnover exceeds ₹40 lakh
**or** contribution exceeds ₹25 lakh.

**The problem.** **LLP Rules 2009, r.24(8)** puts its "or" inside the
*exemption*: an LLP "whose turnover does not exceed... forty lakh rupees, **or**
whose contribution does not exceed twenty-five lakh rupees" is not required to
have its accounts audited. Read literally, the exemption applies if *either*
limit is respected — which means an audit is required only where turnover
exceeds ₹40 lakh **and** contribution exceeds ₹25 lakh.

Most professional firms state it the way the site does. The literal reading of
the rule points the other way. This is a genuine interpretational split and it
is **not ours to settle**.

**Decision taken.** Leave the conservative wording in place. It errs toward
more compliance, which is the safer thing to tell a prospective client, and
changing it on our own reading would be exactly the guessing this review exists
to prevent.

**What a reviewer needs to do.** Confirm which reading to publish. If the
literal reading is correct, the fix is a wording change in the eight files
above — mechanical once the decision is made.

### 2. Government fees, professional fees and timelines

**Not verified this round.** The cost model is sound: `CostLine` on every
registration service carries a `setBy` field, so each page already separates
the Raulji Group professional fee from MCA filing fees, state stamp duty and
taxes, and `timeline` is split into `ours` and `authority`. That structure is
right and satisfies master rule 12.

**But the figures themselves have not been re-checked against current
government schedules this round,** and prices must not be changed without the
business owner's approval in any case. Before launch, confirm: MCA filing fees
against authorised capital, state stamp duty rates on the MOA and AOA, and
whether the published professional fees are still current.

## Standing rules for this content

- Never imply guaranteed registration, approval or a government timeline. The
  existing `TIMELINE_DISCLAIMER` and `AUTHORITY_DISCLAIMER` in `lib/site.ts`
  carry the right wording — use them rather than writing new hedges.
- Raulji Group is not an authority and is not affiliated with the MCA, the GST
  department or any other department. `AUTHORITY_DISCLAIMER` states this.
- Where a statutory position is unclear, say less. A shorter true sentence
  beats a longer one that has to be retracted.

## Re-check schedule

Review every claim in this file at each quarterly content review, and whenever
a file listed here is edited. Record the date and what moved.

| Date | Reviewer | Outcome |
| --- | --- | --- |
| 2026-10-18 | Engineering (not professional sign-off) | Two corrections, two items referred for professional review. First review of this kind; the claims had not previously been checked against their provisions. |
