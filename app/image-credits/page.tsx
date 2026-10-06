import { PageHeader } from "@/components/ui/page-header";
import { JsonLd } from "@/components/ui/json-ld";
import { IMAGE_CREDITS } from "@/lib/image-credits";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/schema";

/**
 * Photograph credits.
 *
 * Here because the Rajkot city photographs are Creative Commons BY-SA, which
 * requires the photographer to be named, the licence linked and any adaptation
 * disclosed. A credits page linked from the footer is the usual way to meet
 * that for a photograph used as page furniture, where a caption under the image
 * would read as part of the design rather than as a credit.
 *
 * noindex, which also keeps it out of the sitemap: scripts/gen-sitemap-manifest.mjs
 * skips any page whose metadata sets it. The page exists to satisfy a licence,
 * not to rank (master rule 20).
 */
export const metadata = pageMeta({
  title: "Photograph Credits | Raulji Group",
  description:
    "Credits and licence information for the photographs used on the Raulji Group website.",
  path: "/image-credits/",
  ogHeadline: "Photograph Credits",
  noindex: true,
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Photograph Credits", path: "/image-credits/" },
];

const LINK = "font-medium text-primary hover:underline";

export default function ImageCreditsPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <PageHeader
        crumbs={crumbs}
        title="Photograph Credits"
        lead="Photographs on this site that carry a licence requiring attribution are credited here, with a link to the original and to the licence it is published under."
      />

      <article className="container-wide py-12 md:py-16">
        <div className="max-w-3xl space-y-10">
          <section>
            <h2 className="text-xl md:text-2xl">Wikimedia Commons</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Each photograph below was resized, cropped to fit the layout and re-encoded as
              WebP. Those changes are the only ones made. The adapted versions are available
              under the same licence as the original.
            </p>

            <ul className="mt-6 space-y-6">
              {IMAGE_CREDITS.map((credit) => (
                <li key={credit.sourceUrl} className="border-l-2 border-border pl-5">
                  <p className="font-semibold text-secondary">
                    <a
                      href={credit.sourceUrl}
                      className={LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {credit.title}
                    </a>
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    {credit.author}, licensed under{" "}
                    <a
                      href={credit.licenseUrl}
                      className={LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {credit.license}
                    </a>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{credit.usedOn}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl">Everything else</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The remaining photography on this site is published under the Unsplash licence,
              which asks for no attribution, or belongs to Raulji Group. Photographs of places
              are described in their alt text as what they show; none of them is presented as a
              Raulji Group office, team or client.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
