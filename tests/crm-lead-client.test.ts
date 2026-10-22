import { afterEach, describe, expect, it, vi } from "vitest";
import { extractLeadId, isCaptured, submitLead } from "@/lib/crm/lead-client";

/**
 * CRM response classification.
 *
 * The point of these is the distinction the brief singles out: an HTTP 200 is
 * not a captured lead. Several of the cases below return 200 and are expected
 * NOT to count, which is the behaviour a naive `response.ok` check gets wrong.
 */

const PAYLOAD = { name: "Test Person", phone: "9876543210" };

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function withKey() {
  vi.stubEnv("RAULJI_CRM_API_KEY", "test-key-not-a-real-secret");
  vi.stubEnv("RAULJI_CRM_BASE", "https://crm.example.invalid/api/v1");
}

afterEach(() => vi.unstubAllEnvs());

describe("submitLead", () => {
  it("treats HTTP 201 with success:true as a new lead", async () => {
    withKey();
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse(201, { success: true, data: { id: "lead_123" } }),
    );
    const result = await submitLead(PAYLOAD, { fetchImpl: fetchImpl as unknown as typeof fetch });
    expect(result).toEqual({ status: "created", leadId: "lead_123", duplicate: false });
    expect(isCaptured(result)).toBe(true);
  });

  it("treats HTTP 200 with duplicate:true as captured, not as a new lead", async () => {
    withKey();
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse(200, { success: true, duplicate: true, data: { id: "lead_999" } }),
    );
    const result = await submitLead(PAYLOAD, { fetchImpl: fetchImpl as unknown as typeof fetch });
    expect(result).toEqual({ status: "duplicate", leadId: "lead_999", duplicate: true });
    expect(isCaptured(result)).toBe(true);
  });

  it("does NOT treat HTTP 200 with success:false as captured", async () => {
    withKey();
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(200, { success: false, error: "nope" }));
    const result = await submitLead(PAYLOAD, { fetchImpl: fetchImpl as unknown as typeof fetch });
    expect(result.status).toBe("unavailable");
    expect(isCaptured(result)).toBe(false);
  });

  it("does NOT treat an HTTP 200 with an unparseable body as captured", async () => {
    withKey();
    const fetchImpl = vi.fn().mockResolvedValue(new Response("<html>gateway</html>", { status: 200 }));
    const result = await submitLead(PAYLOAD, { fetchImpl: fetchImpl as unknown as typeof fetch });
    expect(isCaptured(result)).toBe(false);
  });

  it("maps HTTP 400 to rejected", async () => {
    withKey();
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(400, { success: false }));
    const result = await submitLead(PAYLOAD, { fetchImpl: fetchImpl as unknown as typeof fetch });
    expect(result).toEqual({ status: "rejected", httpStatus: 400 });
  });

  it("maps HTTP 401 to unauthorised", async () => {
    withKey();
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(401, { success: false }));
    const result = await submitLead(PAYLOAD, { fetchImpl: fetchImpl as unknown as typeof fetch });
    expect(result).toEqual({ status: "unauthorised" });
  });

  it("maps HTTP 429 to rate_limited", async () => {
    withKey();
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(429, { success: false }));
    const result = await submitLead(PAYLOAD, { fetchImpl: fetchImpl as unknown as typeof fetch });
    expect(result).toEqual({ status: "rate_limited" });
  });

  it("maps a timeout to unconfirmed, because the lead may already exist", async () => {
    withKey();
    const timeout = Object.assign(new Error("timed out"), { name: "TimeoutError" });
    const fetchImpl = vi.fn().mockRejectedValue(timeout);
    const result = await submitLead(PAYLOAD, { fetchImpl: fetchImpl as unknown as typeof fetch });
    expect(result).toEqual({ status: "unconfirmed" });
    expect(isCaptured(result)).toBe(false);
  });

  it("maps a connection failure to unavailable, which is safely retryable", async () => {
    withKey();
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError("fetch failed"));
    const result = await submitLead(PAYLOAD, { fetchImpl: fetchImpl as unknown as typeof fetch });
    expect(result).toEqual({ status: "unavailable" });
  });

  it("maps a CRM 500 to unavailable", async () => {
    withKey();
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(500, { success: false }));
    const result = await submitLead(PAYLOAD, { fetchImpl: fetchImpl as unknown as typeof fetch });
    expect(result).toEqual({ status: "unavailable", httpStatus: 500 });
  });

  it("reports misconfigured and never calls the CRM when the key is absent", async () => {
    vi.stubEnv("RAULJI_CRM_API_KEY", "");
    const fetchImpl = vi.fn();
    const result = await submitLead(PAYLOAD, { fetchImpl: fetchImpl as unknown as typeof fetch });
    expect(result).toEqual({ status: "misconfigured" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("sends the key in X-API-Key and never in the body or the URL", async () => {
    withKey();
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(201, { success: true, id: 1 }));
    await submitLead(PAYLOAD, { fetchImpl: fetchImpl as unknown as typeof fetch });
    const [url, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://crm.example.invalid/api/v1/public/leads");
    expect((init.headers as Record<string, string>)["X-API-Key"]).toBe("test-key-not-a-real-secret");
    expect(url).not.toContain("test-key-not-a-real-secret");
    expect(String(init.body)).not.toContain("test-key-not-a-real-secret");
  });
});

describe("extractLeadId", () => {
  it("reads the id from the shapes a CRM of this kind plausibly returns", () => {
    expect(extractLeadId({ id: "a" })).toBe("a");
    expect(extractLeadId({ leadId: "b" })).toBe("b");
    expect(extractLeadId({ data: { id: "c" } })).toBe("c");
    expect(extractLeadId({ data: { lead_id: "d" } })).toBe("d");
    expect(extractLeadId({ lead: { id: 42 } })).toBe("42");
  });

  it("returns null rather than inventing an id", () => {
    expect(extractLeadId({ success: true })).toBeNull();
    expect(extractLeadId(null)).toBeNull();
    expect(extractLeadId("ok")).toBeNull();
    expect(extractLeadId({ data: { id: "" } })).toBeNull();
  });
});
