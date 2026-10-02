import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { HealthInsuranceWhatsApp } from "@/components/blog/health-insurance-whatsapp";
import { HEALTH_INSURANCE_CONTACT, healthInsuranceWhatsApp } from "@/lib/blog/health-insurance-contact";
import ctaPhoto from "@/public/photos/faqs/cta.webp";

/**
 * The health insurance enquiry call to action.
 *
 * Health insurance articles only. It routes to Dharmendrasinh Raulji's own
 * number, which is the right destination for a health insurance question and
 * the wrong one for anything else, so it is never used as a general CTA.
 *
 * Two forms, both in the "Raulji Blog Detail" design: `inline`, a pale panel
 * placed in the article body, and `final`, the dark photographic band that
 * closes the page. The final band says plainly that the WhatsApp message opens
 * pre-filled and is only sent when the reader sends it.
 */
export function HealthInsuranceCta({
  variant,
  location = "",
  trackingLabel,
}: {
  variant: "inline" | "final";
  /** Pre-fills the "Location:" line of the message. */
  location?: string;
  trackingLabel: string;
}) {
  const links = healthInsuranceWhatsApp(location);
  const { name, phone } = HEALTH_INSURANCE_CONTACT;

  if (variant === "inline") {
    return (
      <aside
        aria-label="Health insurance guidance"
        className="cta-reveal my-2 flex flex-col gap-2 rounded-lg border border-[#bcd9ea] bg-[#f4f9fc] px-5 py-6 sm:px-7"
      >
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1a7cb0]">Health insurance guidance</p>
        <p className="text-lg font-bold leading-snug text-[#122640]">Need help understanding health insurance?</p>
        <p className="text-[0.9375rem] leading-[1.7]">
          Speak directly with {name} about your health insurance requirement.
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <HealthInsuranceWhatsApp
            app={links.app}
            web={links.web}
            label={`WhatsApp ${name}`}
            trackingLabel={trackingLabel}
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-[#122640] px-4 py-2 text-center text-[0.9375rem] font-semibold leading-snug text-white transition-colors duration-200 hover:bg-[#1a7cb0] sm:px-6"
          />
          <a
            href={`tel:${phone.e164}`}
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] border-[1.5px] border-[#122640] bg-white px-6 text-[0.9375rem] font-semibold text-[#122640] transition-colors duration-200 hover:bg-[#122640] hover:text-white"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {phone.display}
          </a>
        </div>
      </aside>
    );
  }

  return (
    <section aria-labelledby="health-cta-h" className="px-5 pb-14 sm:px-8 md:pb-24">
      <div className="cta-reveal relative mx-auto max-w-[1240px] overflow-hidden rounded-lg bg-[#0c1a2d] text-white">
        <Image src={ctaPhoto} alt="" aria-hidden="true" fill sizes="(min-width: 1240px) 1240px, 100vw" className="object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,26,45,.95)_0%,rgba(12,26,45,.86)_55%,rgba(12,26,45,.5)_100%)]"
        />
        <div className="relative flex max-w-[42rem] flex-col gap-4 px-7 py-10 sm:px-14 md:py-[4.5rem]">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7cc8ec]">Health insurance guidance</p>
          <h2
            id="health-cta-h"
            className="text-balance text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-[2.625rem]"
          >
            Need help understanding health insurance?
          </h2>
          <p className="text-base leading-[1.7] text-[#d5e0ea]">
            Every health insurance policy has different coverage, exclusions, waiting periods and conditions. If
            you want to discuss your health insurance requirement, contact {name}.
          </p>
          <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <HealthInsuranceWhatsApp
              app={links.app}
              web={links.web}
              label={`WhatsApp ${name}`}
              trackingLabel={trackingLabel}
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-white px-5 py-2 text-center text-[0.9375rem] font-bold leading-snug text-[#122640] transition-colors duration-200 hover:bg-[#e8f5fb] sm:px-6"
            />
            <a
              href={`tel:${phone.e164}`}
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] border-[1.5px] border-[#329fd2] px-6 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-[#329fd2] hover:text-[#0c1a2d]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {phone.display}
            </a>
          </div>
          <p className="text-[0.8125rem] leading-relaxed text-[#c9d6e3]">
            The WhatsApp message opens with a few blank lines for your location, age, family members and any existing
            cover. Nothing is sent until you press send.{" "}
            <Link href="/contact/" className="inline-flex items-center gap-1 font-semibold text-white hover:underline">
              Contact Raulji Group
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
