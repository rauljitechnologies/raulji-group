import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Analytics helpers: the conversion deduplication, the error categories, the
 * query allow-list and the page-type mapping.
 *
 * The dedup tests are the important ones. `generate_lead` is the conversion,
 * and the brief is explicit that one confirmed submission must count once --
 * so a re-render, a Strict Mode double-invoke or a remount must not produce a
 * second one.
 */

function installBrowser(href: string, title = "Test page", referrer = "") {
  const store = new Map<string, string>();
  const url = new URL(href);
  vi.stubGlobal("window", { location: { href, origin: url.origin, pathname: url.pathname }, dataLayer: [] });
  vi.stubGlobal("document", { title, referrer, cookie: "" });
  vi.stubGlobal("sessionStorage", {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
  });
  return store;
}

let mod: typeof import("@/lib/analytics");

beforeEach(async () => {
  vi.resetModules();
  mod = await import("@/lib/analytics");
});

afterEach(() => vi.unstubAllGlobals());

describe("markLeadCounted", () => {
  it("returns true the first time and false afterwards", () => {
    installBrowser("https://www.raulji.com/gujarat/");
    expect(mod.markLeadCounted("lead_abc")).toBe(true);
    expect(mod.markLeadCounted("lead_abc")).toBe(false);
    expect(mod.markLeadCounted("lead_abc")).toBe(false);
  });

  it("counts two genuinely different submissions", () => {
    installBrowser("https://www.raulji.com/gujarat/");
    expect(mod.markLeadCounted("lead_1")).toBe(true);
    expect(mod.markLeadCounted("lead_2")).toBe(true);
  });

  it("refuses an empty id rather than counting an unidentified conversion", () => {
    installBrowser("https://www.raulji.com/gujarat/");
    expect(mod.markLeadCounted("")).toBe(false);
  });

  it("survives a remount, because the ids are in sessionStorage", async () => {
    const store = installBrowser("https://www.raulji.com/gujarat/");
    expect(mod.markLeadCounted("lead_persist")).toBe(true);
    // A remount clears module state but not the tab's storage.
    vi.resetModules();
    const remounted = await import("@/lib/analytics");
    expect(store.size).toBeGreaterThan(0);
    expect(remounted.markLeadCounted("lead_persist")).toBe(false);
  });

  it("still dedups within the page when storage is unavailable", async () => {
    vi.stubGlobal("window", { location: { href: "https://www.raulji.com/", origin: "https://www.raulji.com", pathname: "/" }, dataLayer: [] });
    vi.stubGlobal("document", { title: "t", referrer: "", cookie: "" });
    vi.stubGlobal("sessionStorage", {
      getItem: () => { throw new Error("blocked"); },
      setItem: () => { throw new Error("blocked"); },
    });
    vi.resetModules();
    const m = await import("@/lib/analytics");
    expect(m.markLeadCounted("lead_x")).toBe(true);
    expect(m.markLeadCounted("lead_x")).toBe(false);
  });
});

describe("errorCategory", () => {
  it("maps statuses to a bounded vocabulary", () => {
    expect(mod.errorCategory(null)).toBe("network");
    expect(mod.errorCategory(400)).toBe("validation");
    expect(mod.errorCategory(403)).toBe("rejected_origin");
    expect(mod.errorCategory(413)).toBe("too_large");
    expect(mod.errorCategory(429)).toBe("rate_limited");
    expect(mod.errorCategory(500)).toBe("server");
    expect(mod.errorCategory(502)).toBe("server");
    expect(mod.errorCategory(418)).toBe("unknown");
  });
});

describe("track", () => {
  it("pushes the event with page context and GA4 parameter names", () => {
    installBrowser("https://www.raulji.com/gujarat/", "Gujarat | Raulji", "https://google.com/");
    mod.track("view_service", { service_name: "llp_registration" });
    const pushed = (window.dataLayer as Record<string, unknown>[])[0];
    expect(pushed).toMatchObject({
      event: "view_service",
      page: "/gujarat/",
      page_type: "gujarat",
      page_location: "https://www.raulji.com/gujarat/",
      page_title: "Gujarat | Raulji",
      page_referrer: "https://google.com/",
      service_name: "llp_registration",
    });
  });

  it("copies allow-listed campaign parameters and nothing else", () => {
    installBrowser(
      "https://www.raulji.com/?utm_source=google&utm_campaign=brand&gclid=abc&email=someone%40example.com&token=secret",
    );
    mod.track("primary_cta_click");
    const pushed = (window.dataLayer as Record<string, unknown>[])[0];
    expect(pushed).toMatchObject({ utm_source: "google", utm_campaign: "brand", gclid: "abc" });
    // The two sensitive parameters must not appear anywhere in the payload,
    // including inside page_location.
    const serialised = JSON.stringify(pushed);
    expect(serialised).not.toContain("someone@example.com");
    expect(serialised).not.toContain("someone%40example.com");
    expect(serialised).not.toContain("secret");
    expect(pushed.page_location).toBe(
      "https://www.raulji.com/?utm_source=google&utm_campaign=brand&gclid=abc",
    );
  });

  it("carries no campaign fields at all on a clean URL", () => {
    installBrowser("https://www.raulji.com/contact/");
    mod.track("form_view");
    const pushed = (window.dataLayer as Record<string, unknown>[])[0];
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "gclid"]) {
      expect(pushed[key], `${key} should be absent, not defaulted`).toBeUndefined();
    }
  });

  it("does nothing and does not throw on the server", async () => {
    vi.unstubAllGlobals();
    vi.resetModules();
    const serverMod = await import("@/lib/analytics");
    expect(() => serverMod.track("form_view")).not.toThrow();
  });
});

describe("pageTypeFor", () => {
  it("classifies the templates the events depend on", () => {
    expect(mod.pageTypeFor("/")).toBe("home");
    expect(mod.pageTypeFor("/gujarat/")).toBe("gujarat");
    expect(mod.pageTypeFor("/surat/")).toBe("city");
    expect(mod.pageTypeFor("/surat/llp-registration/")).toBe("city_service");
    expect(mod.pageTypeFor("/services/")).toBe("service_hub");
    expect(mod.pageTypeFor("/services/business-registration/")).toBe("service_hub");
    expect(mod.pageTypeFor("/services/llp-registration/")).toBe("registration_service");
    expect(mod.pageTypeFor("/blog/")).toBe("blog_index");
    expect(mod.pageTypeFor("/blog/some-article/")).toBe("blog_post");
    expect(mod.pageTypeFor("/privacy/")).toBe("legal");
  });
});
