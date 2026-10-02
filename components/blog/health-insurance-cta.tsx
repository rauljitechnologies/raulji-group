import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { HealthInsuranceWhatsApp } from "@/components/blog/health-insurance-whatsapp";
import { HEALTH_INSURANCE_CONTACT, healthInsuranceWhatsApp } from "@/lib/blog/health-insurance-contact";
import { cn } from "@/lib/utils";

/**
 * The health insurance enquiry call to action.
 *
 * Health insurance articles only. It routes to Dharmendrasinh Raulji's own
 * number, which is the right destination for a health insurance question and
 * the wrong one for anything else, so it is never used as a general CTA.
 *
 * Two forms: `inline`, a compact panel placed in the article body, and
 * `final`, the closing section of the page. Both say plainly that the WhatsApp
 * message opens pre-filled and is only sent when the reader sends it.
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
  const whatsappClass =
    "inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl bg-[#122640] px-4 py-2 text-center text-[0.9375rem] font-semibold leading-snug text-white transition-colors duration-200 hover:bg-[#1a7cb0] sm:px-6";
  const callClass =
    "inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#122640] bg-white px-6 text-[0.9375rem] font-semibold text-[#122640] transition-colors duration-200 hover:bg-[#122640] hover:text-white";

  if (variant === "inline") {
    return (
      <aside
        aria-label="Health insurance guidance"
        className="cta-reveal mt-10 rounded-2xl border border-primary/25 bg-accent/50 p-5 sm:p-6"
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Health insurance guidance</p>
        <p className="mt-2 text-lg font-bold leading-snug text-secondary">
          Need help understanding health insurance?
        </p>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Speak directly with {name} about your health insurance requirement.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <HealthInsuranceWhatsApp
            app={links.app}
            web={links.web}
            label={`WhatsApp ${name}`}
            trackingLabel={trackingLabel}
            className={whatsappClass}
          />
          <a href={`tel:${phone.e164}`} className={callClass}>
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {phone.display}
          </a>
        </div>
      </aside>
    );
  }

  return (
    <section aria-labelledby="health-cta-h" className="bg-background pb-16 pt-4 md:pb-20 md:pt-8">
      <div className="container-wide">
        <div className="cta-reveal rounded-3xl border border-primary/25 bg-accent/50 p-7 sm:p-10 md:p-12">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Health insurance guidance
              </p>
              <h2 id="health-cta-h" className="mt-3 text-2xl leading-[1.25] md:text-3xl md:leading-[1.2]">
                Need help understanding health insurance?
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                Every health insurance policy has different coverage, exclusions, waiting periods and
                conditions. If you want to discuss your health insurance requirement, contact {name}.
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                The WhatsApp message opens with a few blank lines for your location, age, family
                members and any existing cover. Nothing is sent until you press send.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:w-[21rem]">
              <HealthInsuranceWhatsApp
                app={links.app}
                web={links.web}
                label={`WhatsApp ${name}`}
                trackingLabel={trackingLabel}
                className={cn(whatsappClass, "md:whitespace-nowrap")}
              />
              <a href={`tel:${phone.e164}`} className={callClass}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {phone.display}
              </a>
              <Link
                href="/contact/"
                className="link-target justify-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary"
              >
                Contact Raulji Group
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
