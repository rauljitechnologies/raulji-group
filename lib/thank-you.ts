/**
 * The one post-submission destination for every public enquiry form.
 *
 * Both forms (components/forms/lead-form.tsx and contact-wizard.tsx) send the
 * visitor here once /api/lead/ confirms the CRM stored the enquiry, and
 * app/thank-you/page.tsx is the page they land on. The path is a constant
 * shared by both sides because a typo in one of them is a dead redirect that
 * nothing else would catch.
 *
 * No query string, ever. A thank-you URL is the easiest place to leak a name
 * or a phone number into browser history, a referrer header and analytics, so
 * the page is deliberately the same for every form and carries no parameters.
 * The form identity a report needs travels on the `generate_lead` event
 * instead (`form_id`, `form_name`), where it is a bounded machine name rather
 * than anything the visitor typed.
 *
 * This module imports nothing client-side on purpose: the page is a server
 * component and the forms are client components, and both need these values.
 */

/** Trailing slash, because next.config.ts sets `trailingSlash: true`. */
export const THANK_YOU_PATH = "/thank-you/";

/**
 * The confirmation sentence master rule 23 fixes, split into the heading and
 * the line under it. One source, so the page and the forms' own transitional
 * panel cannot drift apart.
 */
export const CONFIRMATION_HEADING = "Thank you. Your enquiry has been received.";
export const CONFIRMATION_BODY =
  "A Raulji Group representative will contact you using the details provided.";

/**
 * What actually happens next, written to be true of every form that lands
 * here: a consulting enquiry from /services/business-consulting/, an insurance
 * enquiry, a registration enquiry from a city page and the three-step form on
 * /contact/.
 *
 * No response-time promise anywhere in it (master rule 23), and nothing about
 * filing in the first two steps, because most enquiries that reach this page
 * are not a filing yet.
 */
export const NEXT_STEPS: { title: string; body: string }[] = [
  {
    title: "We get in touch",
    body: "A member of the team contacts you on the number you gave us. Tell us if WhatsApp is easier than a call and we will use that instead.",
  },
  {
    title: "We talk it through",
    body: "What you are building, who is involved and what you need next. Nothing is filed, signed or paid for at this stage.",
  },
  {
    title: "You get it in writing",
    body: "Our recommendation, the documents involved and what it costs, so you can decide with the whole picture in front of you.",
  },
];
