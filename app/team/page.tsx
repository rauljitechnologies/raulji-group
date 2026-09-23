import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Phone } from "lucide-react";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { JsonLd } from "@/components/ui/json-ld";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getTeamMembers } from "@/lib/content";
import { SITE, LEADERSHIP, mailHref, telHref } from "@/lib/site";
import chairmanPhoto from "@/public/leadership/dharmendrasinh-raulji.jpg";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, personSchema, type Crumb } from "@/lib/schema";

export const revalidate = 3600;

export const metadata = pageMeta({
  title: "Our Team | Raulji Group",
  description:
    "The people at Raulji Group who handle business registration, compliance and advisory work for businesses across Gujarat.",
  path: "/team/",
  ogHeadline: "The team behind your registration",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Team", path: "/team/" },
];

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), personSchema())} />
      {/* The leadership sentence is confirmed by the client on 2026-09-16 and
          recorded in LEADERSHIP in lib/site.ts. "Founder" is deliberately not
          used: the confirmation covered Chairman only (master rule 13). */}
      <PageHeader
        crumbs={crumbs}
        title="The team behind your registration"
        lead={`Raulji Group works from ${SITE.locality}, ${SITE.region}. When you work with us you deal with the same people throughout rather than being passed between desks, which is the main practical reason we keep the team small.`}
      />

      {/*
        The page opened on a heading, a paragraph and then a small centred
        "profiles are being updated" card marooned in white space, because the
        Supabase team table is empty. The named, accountable person at the top
        of the group is verified, so the page leads with him and the empty
        table becomes a note rather than the entire page.
      */}
      <Section>
        <div className="grid gap-8 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-12">
          <Image
            src={chairmanPhoto}
            alt={`${LEADERSHIP.chairman.name}, ${LEADERSHIP.chairman.roles[0]}`}
            placeholder="blur"
            sizes="(min-width: 768px) 14rem, 100vw"
            className="aspect-[4/5] w-full max-w-[14rem] rounded-2xl border border-border object-cover object-top"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Leadership</p>
            <h2 className="mt-3 text-2xl md:text-3xl">{LEADERSHIP.chairman.name}</h2>
            <ul className="mt-3 space-y-0.5">
              {LEADERSHIP.chairman.roles.map((role) => (
                <li key={role} className="font-medium text-muted-foreground">
                  {role}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              The same person leads both brands, which is why a structure decision, the registration
              that follows from it and the technology a business needs afterwards can be handled as
              one conversation rather than three.
            </p>
            <p className="mt-6">
              <Link href="/about/" className="link-target font-semibold text-primary hover:underline">
                More about Raulji Group &rarr;
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {members.length > 0 ? (
        <Section>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <li key={member.id} className="rounded-2xl border border-border bg-card p-6">
                {member.photo_url ? (
                  <Image
                    src={member.photo_url}
                    alt=""
                    width={96}
                    height={96}
                    className="h-24 w-24 rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="brand-gradient flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-primary-foreground"
                  >
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
                <h2 className="mt-5 text-lg">{member.name}</h2>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                {member.bio ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                ) : null}
                {member.linkedin_url ? (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    LinkedIn
                    <span className="sr-only"> profile of {member.name}</span>
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : (
        /* No placeholder profiles (master rule 13). Stated as a note with the
           two ways to reach the person who would do the work, rather than a
           small centred card alone in a full section. */
        <Section tone="muted">
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10">
            <div>
              <h2 className="text-xl">Team profiles are being updated</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                Rather than publish placeholder profiles, we would rather you spoke to us directly.
                Either way you reach the person who would handle your registration.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:w-[15rem] md:flex-col">
              <a
                href={telHref}
                className="inline-flex min-h-[3rem] flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE.phone.display}
              </a>
              <a
                href={mailHref}
                className="inline-flex min-h-[3rem] flex-1 items-center justify-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold text-secondary transition-colors hover:border-primary hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                {SITE.email}
              </a>
            </div>
          </div>
        </Section>
      )}

      {/* Careers. A short note, not a centred display heading over two lines of
          text: there is no vacancy list to justify the weight. */}
      <Section>
        <div className="grid gap-6 border-t border-border pt-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl">Work with us</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              We are open to hearing from people who want to do this work properly. If you are
              interested in joining Raulji Group, email your details and we will read them.
            </p>
          </div>
          <a
            href={mailHref}
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-2 border-primary px-7 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {SITE.email}
          </a>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
