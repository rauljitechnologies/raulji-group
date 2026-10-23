import { INSURANCE_AUTHOR } from "./authors";

/**
 * The health insurance enquiry route.
 *
 * Health insurance enquiries go to Dharmendrasinh Raulji on his own number,
 * which is the number already assigned to the insurance byline in authors.ts.
 * It is read from there rather than typed again, so the byline, the call link
 * and the WhatsApp link cannot point at different people.
 *
 * Used only by the health insurance articles. Registration, compliance and
 * general enquiries stay on the group line (`whatsappHref` in lib/site.ts);
 * nothing here replaces that.
 */
export const HEALTH_INSURANCE_CONTACT = {
  name: INSURANCE_AUTHOR.name,
  phone: INSURANCE_AUTHOR.phone,
  /** Digits only, for wa.me and WhatsApp Web. */
  whatsapp: INSURANCE_AUTHOR.phone.e164.replace(/\D/g, ""),
} as const;

/**
 * The pre-filled WhatsApp message. The blank lines are there for the reader to
 * fill in before sending: these are the details needed to say anything useful
 * about cover, and asking for them up front saves a round of questions.
 * Nothing is sent until the reader presses send.
 */
export function healthInsuranceMessage(location = "") {
  return [
    `Hello ${HEALTH_INSURANCE_CONTACT.name},`,
    "",
    "I am looking for health insurance guidance.",
    "",
    `Location: ${location}`,
    "Age:",
    "Family members:",
    "Existing health insurance:",
    "Requirement:",
    "",
    "Please guide me regarding health insurance options.",
  ].join("\n");
}

/**
 * Two forms of the same link. `app` (wa.me) opens the WhatsApp app on a phone
 * and is what the anchor carries, so it works with JavaScript off. `web` opens
 * WhatsApp Web directly on a desktop, skipping the wa.me landing page.
 */
export function healthInsuranceWhatsApp(location = "") {
  const text = encodeURIComponent(healthInsuranceMessage(location));
  const phone = HEALTH_INSURANCE_CONTACT.whatsapp;
  return {
    app: `https://wa.me/${phone}?text=${text}`,
    web: `https://web.whatsapp.com/send?phone=${phone}&text=${text}`,
  };
}
