import { PageHeader } from "@/components/ui/page-header";
import { JsonLd } from "@/components/ui/json-ld";
import { SITE, telHref, mailHref } from "@/lib/site";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/schema";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export function LegalPage({
  title,
  updated,
  intro,
  sections,
  crumbs,
}: {
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
  crumbs: Crumb[];
}) {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <PageHeader crumbs={crumbs} title={title} lead={intro}>
        <p className="mt-6 text-sm text-muted-foreground">Last updated: {updated}</p>
      </PageHeader>

      {/* Left-aligned to the page gutter like every other page, with the measure
          held at 48rem by the inner column rather than by centring the whole
          document, which left the heading aligned to nothing. */}
      <article className="container-wide py-12 md:py-16">
        <div className="max-w-3xl space-y-10">
          {sections.map((section, i) => (
            <section key={section.heading}>
              <h2 className="text-xl md:text-2xl">
                {i + 1}. {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section>
            <h2 className="text-xl md:text-2xl">Contact us</h2>
            <address className="mt-3 space-y-1 not-italic text-muted-foreground">
              <p className="font-semibold text-secondary">{SITE.name}</p>
              <p>
                {SITE.locality}, {SITE.region}, India
              </p>
              <p>
                Email:{" "}
                <a href={mailHref} className="text-primary hover:underline">
                  {SITE.email}
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href={telHref} className="text-primary hover:underline">
                  {SITE.phone.display}
                </a>
              </p>
            </address>
          </section>
        </div>
      </article>
    </>
  );
}
