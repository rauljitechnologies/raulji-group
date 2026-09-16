import Link from "next/link";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getTeamMembers } from "@/lib/content";
import { SITE, LEADERSHIP, mailHref, telHref } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/schema";

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
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="pb-12 pt-8">
        <div className="container-wide max-w-4xl">
          <h1 className="text-3xl leading-tight md:text-4xl lg:text-5xl">
            The team behind your registration
          </h1>
          {/* Confirmed by the client on 2026-09-16, and recorded in LEADERSHIP in
              lib/site.ts. "Founder" is deliberately not used: the confirmation
              covered Chairman only (master rule 41 and 42). */}
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Raulji Group works from {SITE.locality}, {SITE.region}, under the leadership of{" "}
            {LEADERSHIP.chairman.name}, {LEADERSHIP.chairman.roles[0]} and{" "}
            {LEADERSHIP.chairman.roles[1]}. When you work with us you deal with the same people
            throughout rather than being passed between desks, which is the main practical reason we
            keep the team small.
          </p>
        </div>
      </section>

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
        <Section>
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="text-xl">Team profiles are being updated</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Rather than publish placeholder profiles, we would rather you spoke to us directly.
              Call{" "}
              <a href={telHref} className="font-semibold text-primary hover:underline">
                {SITE.phone.display}
              </a>{" "}
              or email{" "}
              <a href={mailHref} className="font-semibold text-primary hover:underline">
                {SITE.email}
              </a>{" "}
              and you will reach the person who would handle your registration.
            </p>
          </div>
        </Section>
      )}

      <Section tone="muted">
        <SectionHeading
          title="Work with us"
          lead="We are open to hearing from people who want to do this work properly."
        />
        <div className="mx-auto max-w-2xl text-center">
          <p className="leading-relaxed text-muted-foreground">
            If you are interested in joining Raulji Group, email{" "}
            <a href={mailHref} className="font-semibold text-primary hover:underline">
              {SITE.email}
            </a>{" "}
            with your details.
          </p>
          <p className="mt-6">
            <Link href="/about/" className="link-target font-semibold text-primary hover:underline">
              More about Raulji Group &rarr;
            </Link>
          </p>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
