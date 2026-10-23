import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Attribution capture. The rule under test is that nothing is ever invented:
 * a parameter absent from the URL and a GA cookie this browser does not have
 * must both result in an absent field, not an empty string or a placeholder.
 */

function installBrowser(search: string, cookie: string) {
  const store = new Map<string, string>();
  vi.stubGlobal("window", { location: { search } });
  vi.stubGlobal("sessionStorage", {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
  });
  vi.stubGlobal("document", { cookie });
  return store;
}

let mod: typeof import("@/lib/attribution");

beforeEach(async () => {
  vi.resetModules();
  mod = await import("@/lib/attribution");
});

afterEach(() => vi.unstubAllGlobals());

describe("captureAttribution", () => {
  it("stores only the parameters actually present", () => {
    installBrowser("?utm_source=google&utm_medium=cpc&gclid=abc123", "");
    mod.captureAttribution();
    expect(mod.currentAttribution()).toEqual({
      utm_source: "google",
      utm_medium: "cpc",
      gclid: "abc123",
    });
  });

  it("stores nothing for a clean URL", () => {
    installBrowser("", "");
    mod.captureAttribution();
    expect(mod.currentAttribution()).toEqual({});
  });

  it("does not erase earlier parameters when a later page has none", () => {
    installBrowser("?utm_source=google", "");
    mod.captureAttribution();
    vi.stubGlobal("window", { location: { search: "" } });
    mod.captureAttribution();
    expect(mod.currentAttribution()).toMatchObject({ utm_source: "google" });
  });

  it("truncates an over-long value rather than forwarding it", () => {
    installBrowser(`?utm_campaign=${"x".repeat(500)}`, "");
    mod.captureAttribution();
    expect(mod.currentAttribution().utm_campaign).toHaveLength(200);
  });

  it("survives sessionStorage being unavailable", () => {
    vi.stubGlobal("window", { location: { search: "?utm_source=google" } });
    vi.stubGlobal("sessionStorage", {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    });
    vi.stubGlobal("document", { cookie: "" });
    expect(() => mod.captureAttribution()).not.toThrow();
    expect(() => mod.currentAttribution()).not.toThrow();
  });
});

describe("gaIdentifiers", () => {
  it("reads the client id and session fields from GA's own cookies", () => {
    installBrowser("", "_ga=GA1.1.1234567890.1700000000; _ga_MSW79R28=GS1.1.1759000000.7.1.1759000100.0.0.0");
    expect(mod.gaIdentifiers()).toEqual({
      ga_client_id: "1234567890.1700000000",
      ga_session_id: "1759000000",
      ga_session_number: "7",
    });
  });

  it("returns nothing when GA is not running", () => {
    installBrowser("", "other=1; cf_clearance=abc");
    expect(mod.gaIdentifiers()).toEqual({});
  });

  it("drops a malformed cookie rather than guessing at it", () => {
    installBrowser("", "_ga=nonsense; _ga_MSW79R28=GS1.1.notanumber.x.1");
    expect(mod.gaIdentifiers()).toEqual({});
  });
});
