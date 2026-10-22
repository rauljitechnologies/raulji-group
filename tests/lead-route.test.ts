import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Integration tests for POST /api/lead/.
 *
 * `after()` is replaced so the post-response email work can be inspected and
 * flushed deliberately. Everything else -- Zod, the rate limiter, NextResponse,
 * the CRM client, the email modules -- is the real code.
 *
 * Each test uses its own `x-forwarded-for`, because the rate limiter is
 * module-level state keyed by IP and would otherwise leak between tests.
 */

const afterTasks: (() => unknown)[] = [];

vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return { ...actual, after: (task: () => unknown) => void afterTasks.push(task) };
});

const { POST } = await import("@/app/api/lead/route");

const VALID = {
  name: "Test Person",
  phone: "9876543210",
  email: "test.person@example.com",
  city: "Vadodara",
  registrationType: "LLP Registration",
  businessName: "Test Trading Co",
  message: "Two partners, need help choosing.",
  sourcePage: "/gujarat/",
};

let ipCounter = 0;

function post(body: unknown, headers: Record<string, string> = {}) {
  ipCounter += 1;
  return POST(
    new Request("https://www.raulji.com/api/lead/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": `203.0.113.${ipCounter}`,
        ...headers,
      },
      body: JSON.stringify(body),
    }),
  );
}

async function flushAfter() {
  const tasks = afterTasks.splice(0);
  for (const task of tasks) await task();
}

function crmResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  afterTasks.length = 0;
  vi.stubEnv("RAULJI_CRM_API_KEY", "test-crm-key-not-real");
  vi.stubEnv("RAULJI_CRM_BASE", "https://crm.example.invalid/api/v1");
  vi.stubEnv("EMAIL_PROVIDER_API_KEY", "test-email-key-not-real");
  vi.stubEnv("EMAIL_FROM_ADDRESS", "admin@raulji.com");
  vi.stubEnv("RAULJI_ADMIN_EMAILS", "admin@raulji.com,toyuvrajraulji@gmail.com");

  fetchMock = vi.fn(async (input: string | URL | Request) => {
    const url = String(input instanceof Request ? input.url : input);
    if (url.includes("crm.example.invalid")) {
      return crmResponse(201, { success: true, data: { id: "lead_abc" } });
    }
    return crmResponse(200, { id: "email_abc" });
  });
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

const crmCalls = () =>
  fetchMock.mock.calls.filter(([u]) => String(u).includes("crm.example.invalid"));
const emailCalls = () =>
  fetchMock.mock.calls.filter(([u]) => String(u).includes("api.resend.com"));

describe("a valid enquiry", () => {
  it("creates a CRM lead and reports success", async () => {
    const response = await post(VALID);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true, duplicate: false });
    expect(crmCalls()).toHaveLength(1);

    const body = JSON.parse(String((crmCalls()[0][1] as RequestInit).body)) as Record<string, unknown>;
    expect(body).toMatchObject({
      name: "Test Person",
      phone: "9876543210",
      email: "test.person@example.com",
      city: "Vadodara",
      service: "LLP Registration",
      source: "WEBSITE_FORM",
      page_url: "https://www.raulji.com/gujarat/",
      page_name: "/gujarat/",
    });
    // The customer's own words reach `message`; `notes` keeps the summary.
    expect(body.message).toBe("Two partners, need help choosing.");
    expect(String(body.notes)).toContain("Test Trading Co");
    expect(String(body.notes)).toContain("/gujarat/");
  });

  it("sends both emails after the response, not before it", async () => {
    await post(VALID);
    // Nothing sent yet: the visitor already has their answer.
    expect(emailCalls()).toHaveLength(0);
    await flushAfter();
    expect(emailCalls()).toHaveLength(2);

    const recipients = emailCalls().map(
      ([, init]) => (JSON.parse(String((init as RequestInit).body)) as { to: string[] }).to,
    );
    expect(recipients).toEqual(
      expect.arrayContaining([
        ["test.person@example.com"],
        ["admin@raulji.com", "toyuvrajraulji@gmail.com"],
      ]),
    );
  });

  it("forwards UTM and GA identifiers when present, and omits them when not", async () => {
    await post({ ...VALID, utm_source: "google", utm_medium: "cpc", gclid: "xyz", ga_client_id: "111.222" });
    const withUtm = JSON.parse(String((crmCalls()[0][1] as RequestInit).body)) as Record<string, unknown>;
    expect(withUtm).toMatchObject({
      utm_source: "google",
      utm_medium: "cpc",
      gclid: "xyz",
      ga_client_id: "111.222",
    });
    expect(withUtm.utm_campaign).toBeUndefined();

    fetchMock.mockClear();
    await post(VALID);
    const plain = JSON.parse(String((crmCalls()[0][1] as RequestInit).body)) as Record<string, unknown>;
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "gclid", "ga_client_id"]) {
      expect(plain[key], `${key} should be absent, not defaulted`).toBeUndefined();
    }
  });

  it("never sets state or country, which neither form asks for", async () => {
    await post(VALID);
    const body = JSON.parse(String((crmCalls()[0][1] as RequestInit).body)) as Record<string, unknown>;
    expect(body.state).toBeUndefined();
    expect(body.country).toBeUndefined();
  });
});

describe("a duplicate enquiry", () => {
  it("is reported as success and flagged as a duplicate", async () => {
    fetchMock.mockImplementation(async (input: string | URL | Request) => {
      const url = String(input instanceof Request ? input.url : input);
      if (url.includes("crm.example.invalid")) {
        return crmResponse(200, { success: true, duplicate: true, data: { id: "lead_old" } });
      }
      return crmResponse(200, { id: "email_abc" });
    });
    const response = await post(VALID);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true, duplicate: true });

    await flushAfter();
    const admin = emailCalls()
      .map(([, init]) => JSON.parse(String((init as RequestInit).body)) as { to: string[]; text: string })
      .find((b) => b.to.includes("toyuvrajraulji@gmail.com"));
    expect(admin?.text).toContain("EXISTING CRM lead");
  });
});

describe("CRM failures never produce a false success", () => {
  const cases: [string, number, unknown, number][] = [
    ["HTTP 200 with success:false", 200, { success: false }, 502],
    ["HTTP 400 validation error", 400, { success: false, error: "bad" }, 502],
    ["HTTP 401 invalid API key", 401, { success: false }, 500],
    ["HTTP 429 rate limit", 429, { success: false }, 429],
    ["HTTP 500 outage", 500, { success: false }, 502],
  ];

  for (const [label, status, body, expectedStatus] of cases) {
    it(`handles ${label} without claiming capture`, async () => {
      fetchMock.mockImplementation(async (input: string | URL | Request) => {
        const url = String(input instanceof Request ? input.url : input);
        if (url.includes("crm.example.invalid")) return crmResponse(status, body);
        return crmResponse(200, { id: "email_abc" });
      });
      const response = await post(VALID);
      expect(response.status).toBe(expectedStatus);
      const json = (await response.json()) as { success: boolean; error: string };
      expect(json.success).toBe(false);
      expect(json.error).toContain("8511187689");
      // No email may go out for an enquiry that was never captured.
      await flushAfter();
      expect(emailCalls()).toHaveLength(0);
    });
  }

  it("never tells the visitor about the API key on a 401", async () => {
    fetchMock.mockImplementation(async () => crmResponse(401, { success: false }));
    const json = (await (await post(VALID)).json()) as { error: string };
    expect(json.error.toLowerCase()).not.toContain("key");
    expect(json.error.toLowerCase()).not.toContain("unauthor");
    expect(json.error).not.toContain("test-crm-key-not-real");
  });

  it("asks the visitor to call, not to resubmit, after an ambiguous timeout", async () => {
    fetchMock.mockImplementation(async (input: string | URL | Request) => {
      const url = String(input instanceof Request ? input.url : input);
      if (url.includes("crm.example.invalid")) {
        throw Object.assign(new Error("timeout"), { name: "TimeoutError" });
      }
      return crmResponse(200, { id: "email_abc" });
    });
    const response = await post(VALID);
    expect(response.status).toBe(502);
    const json = (await response.json()) as { success: boolean; error: string };
    expect(json.success).toBe(false);
    expect(json.error).toContain("could not confirm");
    expect(json.error).toContain("rather than submitting again");
    expect(json.error).not.toMatch(/please try again/i);
  });

  it("fails safely and sends nothing when the CRM key is not configured", async () => {
    vi.stubEnv("RAULJI_CRM_API_KEY", "");
    const response = await post(VALID);
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toMatchObject({ success: false });
    expect(crmCalls()).toHaveLength(0);
    await flushAfter();
    expect(emailCalls()).toHaveLength(0);
  });
});

describe("an email failure does not undo a captured lead", () => {
  it("still reports success to the visitor", async () => {
    fetchMock.mockImplementation(async (input: string | URL | Request) => {
      const url = String(input instanceof Request ? input.url : input);
      if (url.includes("crm.example.invalid")) {
        return crmResponse(201, { success: true, data: { id: "lead_abc" } });
      }
      return new Response("{}", { status: 500 });
    });
    const response = await post(VALID);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });

    await flushAfter();
    // Logged as a failure, and never described as delivered.
    expect(console.error).toHaveBeenCalled();
    const logged = (console.error as unknown as ReturnType<typeof vi.fn>).mock.calls
      .map((c) => String(c[0]))
      .join("\n");
    expect(logged).toContain("lead_emails");
    expect(logged).toContain("failed");
  });

  it("does not resubmit to the CRM when email fails", async () => {
    fetchMock.mockImplementation(async (input: string | URL | Request) => {
      const url = String(input instanceof Request ? input.url : input);
      if (url.includes("crm.example.invalid")) {
        return crmResponse(201, { success: true, data: { id: "lead_abc" } });
      }
      return new Response("{}", { status: 500 });
    });
    await post(VALID);
    await flushAfter();
    expect(crmCalls()).toHaveLength(1);
  });
});

describe("validation", () => {
  const bad: [string, unknown, string][] = [
    ["missing name", { phone: "9876543210" }, "Please enter your name"],
    ["one-character name", { name: "X", phone: "9876543210" }, "Please enter your name"],
    ["missing phone", { name: "Test Person" }, "Please enter your mobile number"],
    ["short phone", { name: "Test Person", phone: "12345" }, "valid 10-digit mobile number"],
    ["bad email", { name: "Test Person", phone: "9876543210", email: "nope" }, "valid email address"],
  ];

  for (const [label, body, expected] of bad) {
    it(`rejects ${label} with a sentence, not Zod's wording`, async () => {
      const response = await post(body);
      expect(response.status).toBe(400);
      const json = (await response.json()) as { success: boolean; error: string };
      expect(json.success).toBe(false);
      expect(json.error).toContain(expected);
      expect(json.error).not.toBe("Required");
      expect(json.error).not.toContain("Expected");
      expect(crmCalls()).toHaveLength(0);
    });
  }

  it("accepts a +91 or 0 prefixed number and normalises it", async () => {
    await post({ ...VALID, phone: "+91 98765 43210" });
    const body = JSON.parse(String((crmCalls()[0][1] as RequestInit).body)) as { phone: string };
    expect(body.phone).toBe("+919876543210");
  });

  it("rejects a body that is not JSON", async () => {
    ipCounter += 1;
    const response = await POST(
      new Request("https://www.raulji.com/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": `203.0.114.${ipCounter}` },
        body: "not json",
      }),
    );
    expect(response.status).toBe(400);
  });

  it("rejects an oversized body before parsing it", async () => {
    const response = await post({ ...VALID, message: "x".repeat(20_000) });
    expect(response.status).toBe(413);
    expect(crmCalls()).toHaveLength(0);
  });
});

describe("abuse protection", () => {
  it("accepts a honeypot submission silently and forwards nothing", async () => {
    const response = await post({ ...VALID, hp_note: "bot" });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(crmCalls()).toHaveLength(0);
    await flushAfter();
    expect(emailCalls()).toHaveLength(0);
  });

  it("also honours the legacy `company` honeypot", async () => {
    const response = await post({ ...VALID, company: "bot" });
    expect(response.status).toBe(200);
    expect(crmCalls()).toHaveLength(0);
  });

  it("rate limits repeated submissions from one IP", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 9; i += 1) {
      const response = await POST(
        new Request("https://www.raulji.com/api/lead/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": "203.0.115.99",
            "sec-fetch-site": "same-origin",
          },
          body: JSON.stringify({ ...VALID, phone: `98765432${10 + i}` }),
        }),
      );
      statuses.push(response.status);
    }
    expect(statuses.filter((s) => s === 200).length).toBeLessThanOrEqual(5);
    expect(statuses).toContain(429);
  });

  it("rejects a cross-site POST", async () => {
    const response = await POST(
      new Request("https://www.raulji.com/api/lead/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "203.0.116.1",
          "sec-fetch-site": "cross-site",
          origin: "https://attacker.example",
        },
        body: JSON.stringify(VALID),
      }),
    );
    expect(response.status).toBe(403);
    expect(crmCalls()).toHaveLength(0);
  });

  it("accepts a same-origin POST from the browser", async () => {
    const response = await POST(
      new Request("https://www.raulji.com/api/lead/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "203.0.117.1",
          "sec-fetch-site": "same-origin",
          origin: "https://www.raulji.com",
          host: "www.raulji.com",
        },
        body: JSON.stringify(VALID),
      }),
    );
    expect(response.status).toBe(200);
  });
});

describe("logging", () => {
  it("logs a correlation id and never the payload or a secret", async () => {
    await post(VALID);
    await flushAfter();
    const logged = [
      ...(console.info as unknown as ReturnType<typeof vi.fn>).mock.calls,
      ...(console.error as unknown as ReturnType<typeof vi.fn>).mock.calls,
    ]
      .map((c) => String(c[0]))
      .join("\n");

    expect(logged).toContain("lead_crm_captured");
    expect(logged).toMatch(/"requestId":"lead_/);
    for (const secret of [
      "test-crm-key-not-real",
      "test-email-key-not-real",
      VALID.phone,
      VALID.email,
      VALID.name,
      VALID.message,
    ]) {
      expect(logged, `log leaked ${secret}`).not.toContain(secret);
    }
  });
});
