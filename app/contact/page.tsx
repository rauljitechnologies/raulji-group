import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { LeadForm } from "@/components/forms/lead-form";
import { CityGrid } from "@/components/shared/city-grid";
import { SITE, telHref, mailHref, whatsappHref, AUTHORITY_DISCLAIMER } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Contact Raulji Group | Start Your Business Registration",
  description:
    "Talk to Raulji Group about registering a Private Limited Company, LLP, Partnership Firm or Proprietorship. Call +91 8511187689 or email admin@raulji.com.",
  path: "/contact/",
  ogHeadline: "Start Your Business",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact/" },
];

export default function ContactPage() {
  const wa = whatsappHref(
    "Hello Raulji Group, I would like help choosing and registering a business structure.",
  );

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="pb-10 pt-8">
        <div className="container-wide max-w-4xl">
          <h1 className="text-3xl leading-tight md:text-4xl lg:text-5xl">Start Your Business</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Tell us what you are starting and we will come back to you on which structure fits, what
            documents you need and what it will cost. No obligation, and nothing gets filed until you
            say so.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-4">
            <a
              href={telHref}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 hover:border-primary"
            >
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-secondary">Call us</span>
                <span className="mt-1 block text-lg font-bold text-primary">
                  {SITE.phone.display}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {SITE.hours.display}
                </span>
              </span>
            </a>

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 hover:border-primary"
            >
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-secondary">WhatsApp</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  Message us on {SITE.phone.display}
                </span>
              </span>
            </a>

            <a
              href={mailHref}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 hover:border-primary"
            >
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-secondary">Email</span>
                <span className="mt-1 block text-sm text-primary">{SITE.email}</span>
              </span>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-secondary">Where we are</p>
                <address className="mt-1 text-sm not-italic text-muted-foreground">
                  {SITE.locality}, {SITE.region}, India
                </address>
                <p className="mt-2 text-sm text-muted-foreground">
                  Registration is filed online, so you do not need to visit us. If you would rather
                  meet in person, call ahead so we can confirm a time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-secondary">Business hours</p>
                <p className="mt-1 text-sm text-muted-foreground">{SITE.hours.display}</p>
                <p className="text-sm text-muted-foreground">Sunday: closed</p>
              </div>
            </div>
          </div>

          <LeadForm
            heading="Send us your details"
            lead="Six fields. We will reply with what applies to your business specifically."
          />
        </div>

        <p className="mx-auto mt-10 max-w-3xl rounded-xl border border-border bg-muted p-5 text-sm leading-relaxed text-muted-foreground">
          {AUTHORITY_DISCLAIMER}
        </p>
      </Section>

      <Section tone="muted">
        <h2 className="mb-8 text-center text-2xl md:text-3xl">Where we work in Gujarat</h2>
        <CityGrid />
      </Section>
    </>
  );
}
