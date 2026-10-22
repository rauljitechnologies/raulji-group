import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ANALYTICS_ONLY,
  CONSENT_KEY,
  DENIED,
  GRANTED,
  consentBootstrapScript,
  readConsent,
  stateFor,
  updateConsent,
  writeConsent,
} from "@/lib/consent";

/**
 * Consent Mode v2.
 *
 * The posture under test: everything denied until the visitor chooses, and an
 * unreadable or absent stored decision failing in the denied direction rather
 * than the granted one.
 */

function installBrowser(stored?: string) {
  const store = new Map<string, string>();
  if (stored !== undefined) store.set(CONSENT_KEY, stored);
  vi.stubGlobal("window", { dataLayer: [] });
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
  });
  return store;
}

beforeEach(() => installBrowser());
afterEach(() => vi.unstubAllGlobals());

describe("defaults", () => {
  it("denies all four signals by default", () => {
    expect(DENIED).toEqual({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  });

  it("grants analytics without granting any advertising signal", () => {
    expect(ANALYTICS_ONLY.analytics_storage).toBe("granted");
    expect(ANALYTICS_ONLY.ad_storage).toBe("denied");
    expect(ANALYTICS_ONLY.ad_user_data).toBe("denied");
    expect(ANALYTICS_ONLY.ad_personalization).toBe("denied");
  });

  it("maps each choice to the right state", () => {
    expect(stateFor("granted")).toEqual(GRANTED);
    expect(stateFor("analytics_only")).toEqual(ANALYTICS_ONLY);
    expect(stateFor("denied")).toEqual(DENIED);
  });
});

describe("readConsent", () => {
  it("returns null when the visitor has not answered", () => {
    expect(readConsent()).toBeNull();
  });

  it("reads a stored decision", () => {
    installBrowser(JSON.stringify({ choice: "analytics_only", at: "2026-10-23T00:00:00.000Z" }));
    expect(readConsent()).toEqual({ choice: "analytics_only", at: "2026-10-23T00:00:00.000Z" });
  });

  it("treats corrupt JSON as unanswered, which leaves everything denied", () => {
    installBrowser("{not json");
    expect(readConsent()).toBeNull();
  });

  it("treats an unrecognised choice as unanswered rather than trusting it", () => {
    installBrowser(JSON.stringify({ choice: "everything", at: "x" }));
    expect(readConsent()).toBeNull();
  });

  it("treats blocked storage as unanswered", () => {
    vi.stubGlobal("window", { dataLayer: [] });
    vi.stubGlobal("localStorage", {
      getItem: () => { throw new Error("blocked"); },
      setItem: () => { throw new Error("blocked"); },
    });
    expect(readConsent()).toBeNull();
  });
});

describe("writeConsent and updateConsent", () => {
  it("records the choice with a timestamp", () => {
    const record = writeConsent("granted");
    expect(record.choice).toBe("granted");
    expect(Date.parse(record.at)).not.toBeNaN();
    expect(readConsent()?.choice).toBe("granted");
  });

  it("pushes a gtag consent update and a named event", () => {
    updateConsent("analytics_only");
    const pushed = window.dataLayer as unknown[];
    expect(pushed[0]).toEqual(["consent", "update", ANALYTICS_ONLY]);
    expect(pushed[1]).toEqual({ event: "consent_update", consent_choice: "analytics_only" });
  });

  it("does not throw when storage is blocked, so the page-view update still applies", () => {
    vi.stubGlobal("window", { dataLayer: [] });
    vi.stubGlobal("localStorage", {
      getItem: () => null,
      setItem: () => { throw new Error("blocked"); },
    });
    expect(() => writeConsent("granted")).not.toThrow();
    expect(() => updateConsent("granted")).not.toThrow();
  });
});

describe("consentBootstrapScript", () => {
  const script = consentBootstrapScript();

  it("sets every signal to denied as the default", () => {
    expect(script).toContain("'consent', 'default'");
    expect(script).toContain("analytics_storage: 'denied'");
    expect(script).toContain("ad_storage: 'denied'");
    expect(script).toContain("ad_user_data: 'denied'");
    expect(script).toContain("ad_personalization: 'denied'");
  });

  it("waits briefly for an update, so tags do not fire before a stored choice applies", () => {
    expect(script).toContain("wait_for_update");
  });

  it("re-applies a stored decision in the same script", () => {
    expect(script).toContain(JSON.stringify(CONSENT_KEY));
    expect(script).toContain("'consent', 'update'");
  });

  it("cannot throw on a browser with storage blocked", () => {
    expect(script).toContain("try {");
    expect(script).toContain("catch (e) {}");
  });

  it("contains no secret and no measurement id", () => {
    expect(script).not.toMatch(/G-[A-Z0-9]{8,}/);
    expect(script).not.toMatch(/GTM-[A-Z0-9]+/);
    expect(script).not.toMatch(/api[_-]?key/i);
  });
});
