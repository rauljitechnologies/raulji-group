import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { SECONDARY_SERVICES } from "@/lib/secondary-services";
import { CITIES } from "@/lib/cities";
import { getCityServiceParams } from "@/lib/city-services";
import { getPublishedPosts } from "@/lib/content";

export const revalidate = 3600;

/**
 * Every URL here is a 200 with a self-referencing canonical and trailing slash.
 * Discontinued URLs are deliberately absent: /services/land-investment/ 301s to
 * /services/, and /rentals/ returns 410.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const url = (path: string) => `${SITE.url}${path}`;

  const core: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    // Consulting is the primary focus of the group, so it carries the highest
    // priority of any service URL. Registration is the main commercial pillar.
    { url: url("/services/business-consulting/"), changeFrequency: "monthly", priority: 0.95 },
    { url: url("/services/business-registration/"), changeFrequency: "monthly", priority: 0.95 },
    { url: url("/services/"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/gujarat/"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/compare/"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/about/"), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/team/"), changeFrequency: "monthly", priority: 0.5 },
    { url: url("/our-clients/"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/faqs/"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/contact/"), changeFrequency: "yearly", priority: 0.8 },
    { url: url("/blog/"), changeFrequency: "weekly", priority: 0.6 },
    { url: url("/privacy/"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms/"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/disclaimer/"), changeFrequency: "yearly", priority: 0.2 },
  ];

  // Phase 1 focus: the four registration services carry the highest priority.
  const registration: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: url(service.path),
    changeFrequency: "monthly",
    priority: 0.95,
  }));

  // Preserved from the previous site, deliberately lower priority.
  const secondary: MetadataRoute.Sitemap = SECONDARY_SERVICES.map((service) => ({
    url: url(service.path),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const cities: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: url(`/${city.slug}/`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Twenty city + service pages: five priority cities x four structures. Lower
  // priority than the service pages they support, because those are the pages we
  // want ranking for the non-geographic query.
  const cityServices: MetadataRoute.Sitemap = getCityServiceParams().map((param) => ({
    url: url(`/${param.city}/${param.service}/`),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const posts = await getPublishedPosts();
  const blog: MetadataRoute.Sitemap = posts.map((post) => ({
    url: url(`/blog/${post.slug}/`),
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...core, ...registration, ...secondary, ...cities, ...cityServices, ...blog].map(
    (entry) => ({
      lastModified: now,
      ...entry,
    }),
  );
}
