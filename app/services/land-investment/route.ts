/**
 * /services/land-investment/ is discontinued with no successor service, so it
 * returns 410 Gone (technical audit TF-02).
 *
 * It previously 301'd to /services/. The audit asked for 410 instead, because
 * /services/ does not answer a land-investment query: a redirect to a page that
 * does not answer the original intent is commonly treated as a soft 404 and
 * passes little value. The URL drew 47 impressions Apr-Sep 2026.
 *
 * A static segment takes priority over app/services/[slug], so this handler
 * answers before the dynamic service route sees the path.
 *
 * On the non-slash form: /services/land-investment costs one 308 to the
 * canonical slashed URL before this 410, because `trailingSlash: true`
 * normalises the path before middleware or routing sees it. A middleware
 * rewrite was tried and never fires for that reason, and the only way to get
 * a single hop would be `skipTrailingSlashRedirect` plus reimplementing
 * trailing-slash handling for the whole site. Not worth it for a URL with 47
 * impressions: a search engine follows the 308 and records the 410 either way.
 * The same applies to /rentals.
 */
import { gonePage, goneResponse } from "@/lib/gone";

export const dynamic = "force-static";

const BODY = gonePage({
  heading: "Land investment advisory is no longer offered",
  body: [
    "Raulji Group has discontinued this service. We now focus on business consulting, business registration and the compliance work that follows it.",
    "If you were looking for help choosing or registering a business structure, we can help with that.",
  ],
});

export async function GET() {
  return goneResponse(BODY);
}
