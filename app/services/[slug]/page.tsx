import { notFound } from "next/navigation";
import { RegistrationServicePage } from "@/components/pages/registration-service";
import { SecondaryServicePage } from "@/components/pages/secondary-service";
import { SERVICES, getService } from "@/lib/services";
import { SECONDARY_SERVICES, getSecondaryService } from "@/lib/secondary-services";
import { pageMeta } from "@/lib/seo";

/**
 * Two kinds of page share this segment:
 *  - the four Phase 1 registration services, on the full landing template
 *  - services carried over from the previous site, on a compact template, so
 *    their indexed URLs keep resolving
 *
 * dynamicParams is false, so any other /services/* path 404s rather than
 * rendering an empty page. /services/land-investment/ is 301'd in next.config.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...SERVICES.map((service) => ({ slug: service.slug })),
    ...SECONDARY_SERVICES.map((service) => ({ slug: service.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (service) {
    return pageMeta({
      title: service.title,
      description: service.metaDescription,
      path: service.path,
      ogHeadline: service.h1,
    });
  }

  const secondary = getSecondaryService(slug);
  if (secondary) {
    return pageMeta({
      title: secondary.title,
      description: secondary.metaDescription,
      path: secondary.path,
      ogHeadline: secondary.h1,
    });
  }

  return {};
}

export default async function ServicesSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const service = getService(slug);
  if (service) return <RegistrationServicePage service={service} />;

  const secondary = getSecondaryService(slug);
  if (secondary) return <SecondaryServicePage service={secondary} />;

  notFound();
}
