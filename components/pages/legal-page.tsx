import { Breadcrumbs } from "@/components/ui/breadcrumbs";
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
      <Breadcrumbs crumbs={crumbs} />

      <article className="container-narrow py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
        {intro ? <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{intro}</p> : null}

        <div className="mt-10 space-y-10">
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
