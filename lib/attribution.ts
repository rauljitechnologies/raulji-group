/**
 * Client-side campaign and analytics attribution for enquiry forms.
 *
 * Every field here is read from somewhere it genuinely exists -- the current
 * URL's query string, or a Google Analytics first-party cookie this browser
 * already has. **Nothing is defaulted, inferred or synthesised.** A field that
 * cannot be read is omitted from the payload entirely, which is why the return
 * type is a sparse record rather than a fixed shape: the CRM then stores a
 * campaign only when there was one, and the admin email says so plainly when
 * there was not.
 *
 * Why the URL is cached in sessionStorage: a visitor lands on an ad URL
 * carrying `?utm_source=...&gclid=...`, then clicks through to a service page
 * before filling the form. By then the query string is gone. Capturing on first
 * load and reading it back at submit keeps the attribution that actually
 * applied to the visit, within that tab only.
 */

const STORE_KEY = "raulji.attribution.v1";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  ga_client_id?: string;
  ga_session_id?: string;
  ga_session_number?: string;
};

function readStore(): Attribution {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as Attribution) : {};
  } catch {
    // Private mode, disabled storage, or corrupt JSON. Attribution is a nice
    // to have; it must never break a form.
    return {};
  }
}

/**
 * Capture campaign parameters from the current URL, if any, and remember them
 * for the rest of the tab session. Safe to call on every page load: it only
 * ever adds parameters that are actually present, so a later clean URL does not
 * erase what the landing URL carried.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key)?.trim();
      // 200 is well beyond any real UTM value and short enough that a crafted
      // query string cannot bloat the payload.
      if (value) found[key] = value.slice(0, 200);
    }
    if (!Object.keys(found).length) return;
    sessionStorage.setItem(STORE_KEY, JSON.stringify({ ...readStore(), ...found }));
  } catch {
    /* ignore */
  }
}

function cookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  for (const part of document.cookie.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=") || undefined;
  }
  return undefined;
}

/**
 * Google Analytics identifiers, read from the cookies GA sets in this browser.
 *
 * `_ga` is `GA1.1.<a>.<b>`, where the client id is `<a>.<b>`.
 * `_ga_<CONTAINER>` is `GS1.1.<session id>.<session number>.<more fields>`.
 *
 * Both are parsed strictly: anything that does not match the expected shape is
 * dropped rather than guessed at, because a malformed analytics id in the CRM
 * is worse than an absent one -- it looks like data and joins to nothing.
 * Returns {} when GA is not running, which is the case on any build without
 * NEXT_PUBLIC_GTM_ID set.
 */
export function gaIdentifiers(): Attribution {
  const out: Attribution = {};

  const ga = cookie("_ga");
  if (ga) {
    const match = /^GA\d+\.\d+\.(\d+\.\d+)$/.exec(ga);
    if (match) out.ga_client_id = match[1];
  }

  if (typeof document !== "undefined") {
    const sessionCookie = document.cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => /^_ga_[A-Z0-9]+=/.test(part));
    if (sessionCookie) {
      const value = sessionCookie.slice(sessionCookie.indexOf("=") + 1);
      const parts = value.split(".");
      // GS1.1.<session id>.<session number>....
      if (parts.length >= 4 && /^\d+$/.test(parts[2]) && /^\d+$/.test(parts[3])) {
        out.ga_session_id = parts[2];
        out.ga_session_number = parts[3];
      }
    }
  }

  return out;
}

/** Everything available right now: stored campaign parameters plus live GA ids. */
export function currentAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  return { ...readStore(), ...gaIdentifiers() };
}
