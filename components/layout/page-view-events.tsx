"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { pageTypeFor, track } from "@/lib/analytics";
import { CITY_INDEX } from "@/lib/city-index";

/**
 * Fires the `view_*` engagement events on arrival and on every client-side
 * navigation.
 *
 * It does **not** fire `page_view`. GA4's enhanced measurement already emits
 * one on container load and again on each History Change, and the App Router
 * navigates with pushState, so pushing our own would double-count every page
 * -- the exact duplication the brief warns about. `page_view` stays GA4's job;
 * these events are the site's own, and carry the service and city dimensions
 * GA4 cannot derive on its own.
 *
 * Deduplicated per path with a ref, because React Strict Mode double-invokes
 * effects in development and a re-render must not produce a second view event.
 */
export function PageViewEvents() {
  const pathname = usePathname();
  const lastFired = useRef<string | null>(null);

  useEffect(() => {
    if (lastFired.current === pathname) return;
    lastFired.current = pathname;

    const pageType = pageTypeFor(pathname);
    const parts = pathname.split("/").filter(Boolean);

    switch (pageType) {
      case "city":
      case "city_service": {
        const city = CITY_INDEX.find((c) => c.slug === parts[0]);
        track("view_location_page", {
          city_name: city?.name,
          // On a city x service page the second segment is the structure.
          service_name: parts[1] ? parts[1].replace(/-/g, "_") : undefined,
        });
        break;
      }
      case "registration_service":
      case "service":
      case "service_hub":
        track("view_service", { service_name: parts[1] ? parts[1].replace(/-/g, "_") : "services_hub" });
        break;
      case "blog_post":
        /*
         * The slug is the article identifier and is not personal data. The
         * article title is deliberately not read from the DOM here: it would
         * race with the render and arrive empty on a fast navigation.
         */
        track("view_blog_article", { label: parts[1] });
        break;
      default:
        // home, gujarat, compare, contact, faqs, about, legal, blog_index and
        // other have no view_* event in the taxonomy. GA4's own page_view
        // covers them, with page_type as the dimension.
        break;
    }
  }, [pathname]);

  return null;
}
