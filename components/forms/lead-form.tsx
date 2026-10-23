"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { CITY_INDEX } from "@/lib/city-index";
import { SITE, telHref } from "@/lib/site";
import { errorCategory, markLeadCounted, track } from "@/lib/analytics";
import { currentAttribution } from "@/lib/attribution";
import { cn } from "@/lib/utils";

/**
 * "What do you need help with?" options (master rule 23).
 *
 * Grouped rather than flat, because consulting and a specific structure are
 * different kinds of answer and a flat list of six made the consulting option
 * look like a fifth registration type. Values are sent to the CRM verbatim, so
 * they double as the lead-source label the team reads.
 *
 * Insurance is listed because master rule 23 lists it, and because
 * /services/insurance/ carries this form: without the option, someone enquiring
 * from the insurance page had to file their enquiry under "Other" (audit of
 * 23 Oct 2026). It sits with the other non-registration answers, after
 * consulting and the four structures, so the form still leads with those.
 */
export const SERVICE_OPTION_GROUPS: { label: string; options: string[] }[] = [
  {
    label: "Consulting",
    options: ["Business Consulting"],
  },
  {
    label: "Business Registration",
    options: SERVICES.map((s) => s.shortName),
  },
  {
    label: "Something else",
    options: ["Not sure yet, help me choose", "Insurance", "Technology or digital work", "Other"],
  },
];

interface LeadFormProps {
  /** Pre-selects the registration type on a service page. */
  defaultRegistrationType?: string;
  /** Pre-fills the city on a city page. */
  defaultCity?: string;
  heading?: string;
  lead?: string;
  className?: string;
}

/**
 * Field styling shared with the contact page's form (contact-wizard.tsx), so
 * every enquiry form on the site looks and behaves the same: square 4px
 * fields, a blue focus ring, and a placeholder in every field showing what a
 * good answer looks like. Labels stay visible above each field; a placeholder
 * is an example, never a replacement for the label.
 */
const fieldClass =
  "h-[3.25rem] w-full rounded-[4px] border bg-white px-4 text-[0.9375rem] font-normal text-[#122640] transition placeholder:text-[#8795a6] hover:border-[#329fd2] focus:border-[#329fd2] focus:shadow-[0_0_0_4px_rgba(50,159,210,0.16)] focus:outline-none";
const labelClass = "text-[0.8125rem] font-semibold text-[#122640]";

/**
 * Form identity for the analytics events. `form_id` is the stable machine name
 * a GTM trigger matches on; `form_name` is what a report reads. Both are
 * constants rather than derived, so a new call site cannot spell them
 * differently and quietly split a funnel in two.
 */
const FORM_ID = "lead_form";
const FORM_NAME = "Enquiry form";

type FieldErrors = Partial<Record<"name" | "phone" | "email", string>>;

/** The same checks the /api/lead/ route applies, run first so errors show beside the field. */
function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").replace(/[\s()-]/g, "");
  const email = String(data.get("email") ?? "").trim();
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!/^(\+?91|0)?[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a valid 10-digit mobile number.";
  if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";
  return errors;
}

export function LeadForm({
  defaultRegistrationType,
  defaultCity,
  heading = "Start your business",
  lead = "Tell us what you need and a member of the Raulji Group team will get back to you.",
  className,
}: LeadFormProps) {
  const pathname = usePathname();
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const startedRef = useRef(false);
  const viewedRef = useRef(false);
  /*
   * Double-submit guard. The button is already `disabled` while submitting, but
   * that depends on a React re-render landing before the second click: a fast
   * double-click, or Enter held down in a text field, can fire the handler twice
   * in the same tick. A ref is checked and set synchronously, so the second call
   * returns before it can reach `fetch`.
   *
   * It guards the request, not the CRM's duplicate handling, which is separate
   * and still wanted -- a visitor who genuinely enquires twice should still be
   * recorded against their existing lead.
   */
  const inFlightRef = useRef(false);

  const registrationType = defaultRegistrationType;

  // form_view fires once, when the form actually scrolls into view.
  useEffect(() => {
    const node = formRef.current;
    if (!node || viewedRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          track("form_view", { registration_type: registrationType, city: defaultCity });
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [registrationType, defaultCity]);

  function handleInput(event: React.FormEvent<HTMLFormElement>) {
    const name = (event.target as HTMLInputElement).name as keyof FieldErrors;
    if (fieldErrors[name]) setFieldErrors((e) => ({ ...e, [name]: undefined }));
    handleFirstInput();
  }

  function handleFirstInput() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("form_start", { registration_type: registrationType, city: defaultCity });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const invalid = validate(formData);
    setFieldErrors(invalid);
    if (Object.keys(invalid).length) {
      const first = Object.keys(invalid)[0];
      /*
       * The field NAME only. Never the value the visitor typed -- that is their
       * own data, and a validation event is exactly where a half-typed email
       * would otherwise leak into analytics.
       */
      track("form_validation_error", {
        form_id: FORM_ID,
        form_name: FORM_NAME,
        error_field: first,
        registration_type: registrationType,
      });
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setStatus("submitting");
    setError(null);
    // Intent, not a conversion. Counted before the request so a submission lost
    // to a dropped connection still shows up as an attempt in the funnel.
    track("form_submit_attempt", {
      form_id: FORM_ID,
      form_name: FORM_NAME,
      registration_type: String(formData.get("registrationType") ?? "") || undefined,
    });
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      city: String(formData.get("city") ?? ""),
      registrationType: String(formData.get("registrationType") ?? ""),
      message: String(formData.get("message") ?? ""),
      businessName: String(formData.get("businessName") ?? ""),
      hp_note: String(formData.get("hp_note") ?? ""),
      sourcePage: pathname,
      /*
       * Campaign and GA identifiers, spread last so they only ever add keys
       * that were genuinely present on the visit. Nothing is defaulted: see
       * lib/attribution.ts.
       */
      ...currentAttribution(),
    };

    try {
      const response = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        success: boolean;
        error?: string;
        duplicate?: boolean;
        requestId?: string;
      };

      if (result.success) {
        setStatus("success");
        /*
         * `form_submit` is the primary conversion, so it must count real
         * enquiries only.
         *
         * A honeypot-tripped submission is answered `{ success: true }` on
         * purpose, so the bot cannot tell it was caught. That means a bot
         * reaches this branch and would be recorded as a conversion. We know
         * locally which case this is -- a human never fills a field that is
         * positioned off-screen -- so the event is skipped here instead.
         * The response is left exactly as it is: the bot learns nothing,
         * and the conversion count stays clean.
         */
        if (!payload.hp_note) {
          track("form_submit", {
            registration_type: payload.registrationType || "Not specified",
            city: payload.city || undefined,
          });
          /*
           * The conversion. `success: true` from this route means the CRM
           * confirmed it stored the enquiry -- new or duplicate -- so this is
           * the only place in the codebase it may fire.
           *
           * Deduplicated on the server's own submission id, so a re-render, a
           * Strict Mode double-invoke or a remount cannot count one enquiry
           * twice. A duplicate enquiry recorded against an existing lead is
           * still a real enquiry, so it still converts; `lead_duplicate` is
           * there to separate them in reporting.
           */
          if (markLeadCounted(result.requestId ?? "")) {
            track("generate_lead", {
              form_id: FORM_ID,
              form_name: FORM_NAME,
              registration_type: payload.registrationType || "Not specified",
              city: payload.city || undefined,
              submission_id: result.requestId,
              lead_duplicate: result.duplicate ?? false,
              lead_source: `Website form (${pathname})`,
            });
          }
        }
      } else {
        inFlightRef.current = false;
        setStatus("error");
        setError(result.error ?? "Something went wrong. Please try again.");
        track("form_error", { registration_type: payload.registrationType });
        // A bounded category, never the server's sentence: those are written
        // for the visitor and can quote the payload back.
        track("form_submission_error", {
          form_id: FORM_ID,
          form_name: FORM_NAME,
          error_category: errorCategory(response.status),
          registration_type: payload.registrationType,
        });
      }
    } catch {
      inFlightRef.current = false;
      setStatus("error");
      setError(`Network problem while submitting. Please try again or call ${SITE.phone.display}.`);
      track("form_error", { registration_type: payload.registrationType });
      track("form_submission_error", {
        form_id: FORM_ID,
        form_name: FORM_NAME,
        error_category: errorCategory(null),
        registration_type: payload.registrationType,
      });
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn("flex flex-col items-center gap-4 rounded-lg bg-white p-8 text-center sm:p-10", className)}
        role="status"
        aria-live="polite"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f5fb]">
          <CheckCircle2 className="h-8 w-8 text-[#1872a3]" aria-hidden="true" />
        </span>
        <h2 className="text-xl font-extrabold tracking-[-0.01em] text-[#122640] sm:text-2xl">
          Thank you. Your enquiry has been received.
        </h2>
        <p className="max-w-[28rem] text-[0.9375rem] leading-[1.7] text-[#3a4656]">
          A Raulji Group representative will contact you using the details provided. If your matter
          is urgent, call{" "}
          <a href={telHref} className="font-semibold text-[#1872a3] hover:underline">
            {SITE.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const border = (field: keyof FieldErrors) => (fieldErrors[field] ? "border-[#c0392b]" : "border-[#cfd9e3]");

  return (
    <div className={cn("rounded-lg border border-[#e3e9ef] bg-white p-6 sm:p-9", className)}>
      <h2 className="text-[1.375rem] font-extrabold tracking-[-0.01em] text-[#122640] sm:text-[1.625rem]">
        {heading}
      </h2>
      <p className="mt-2 text-sm leading-[1.6] text-[#5b6778]">{lead}</p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onInput={handleInput}
        className="mt-7 flex flex-col gap-[1.125rem]"
        noValidate
      >
        <Field id={`${id}-type`} label="What do you need help with?">
          <div className="relative">
            <select
              id={`${id}-type`}
              name="registrationType"
              defaultValue={defaultRegistrationType ?? ""}
              onChange={(e) => {
                if (!e.target.value) return;
                track("select_service", {
                  form_id: FORM_ID,
                  form_name: FORM_NAME,
                  service_name: e.target.value,
                  registration_type: e.target.value,
                });
              }}
              className={cn(fieldClass, "appearance-none border-[#cfd9e3] pr-11")}
            >
              <option value="">Select what you need help with</option>
              {SERVICE_OPTION_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1872a3]"
              aria-hidden="true"
            />
          </div>
        </Field>

        <div className="grid gap-[1.125rem] sm:grid-cols-2">
          <Field id={`${id}-name`} label="Your name" required error={fieldErrors.name}>
            <input
              id={`${id}-name`}
              name="name"
              type="text"
              required
              autoComplete="name"
              minLength={2}
              maxLength={100}
              placeholder="Full name"
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? `${id}-name-err` : undefined}
              className={cn(fieldClass, border("name"))}
            />
          </Field>
          <Field id={`${id}-phone`} label="Phone / WhatsApp" required error={fieldErrors.phone}>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? `${id}-phone-err` : undefined}
              className={cn(fieldClass, border("phone"))}
            />
          </Field>
          <Field id={`${id}-email`} label="Email" error={fieldErrors.email}>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? `${id}-email-err` : undefined}
              className={cn(fieldClass, border("email"))}
            />
          </Field>
          <Field id={`${id}-business`} label="Business / company name">
            <input
              id={`${id}-business`}
              name="businessName"
              type="text"
              autoComplete="organization"
              maxLength={120}
              placeholder="Registered or proposed name"
              className={cn(fieldClass, "border-[#cfd9e3]")}
            />
          </Field>
          <Field id={`${id}-city`} label="City" className="sm:col-span-2">
            <input
              id={`${id}-city`}
              name="city"
              type="text"
              defaultValue={defaultCity ?? ""}
              list={`${id}-cities`}
              autoComplete="address-level2"
              maxLength={80}
              placeholder="e.g. Vadodara"
              className={cn(fieldClass, "border-[#cfd9e3]")}
            />
            <datalist id={`${id}-cities`}>
              {CITY_INDEX.map((city) => (
                <option key={city.slug} value={city.name} />
              ))}
            </datalist>
          </Field>
        </div>

        <Field id={`${id}-message`} label="Anything else we should know?">
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            maxLength={2000}
            placeholder="Number of partners, business activity, any deadline..."
            className={cn(fieldClass, "h-auto resize-y border-[#cfd9e3] py-3.5 leading-[1.6]")}
          />
        </Field>

        {/* Honeypot. Hidden from users and from assistive technology. Not named
            "company" or anything else autofill recognises. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${id}-hp`}>Leave this field blank</label>
          <input id={`${id}-hp`} name="hp_note" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {error ? (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-[4px] border border-[#f1c9c4] bg-[#fdf1f0] px-4 py-3 text-sm text-[#a5281b]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-1 inline-flex h-[3.375rem] w-full items-center justify-center gap-2.5 rounded-[4px] bg-[#122640] px-7 text-base font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1872a3] hover:shadow-[0_12px_24px_-12px_rgba(26,124,176,0.7)] disabled:translate-y-0 disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Get Business Guidance
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>

        <p className="text-center text-xs leading-[1.6] text-[#5b6778]">
          We use your details only to respond to this enquiry. Prefer to talk?{" "}
          <a href={telHref} className="font-semibold text-[#1872a3] hover:underline">
            Call {SITE.phone.display}
          </a>
        </p>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? <span className="text-[#c0392b]"> *</span> : null}
      </label>
      {children}
      {error ? (
        <span id={`${id}-err`} role="alert" className="text-xs font-semibold text-[#c0392b]">
          {error}
        </span>
      ) : null}
    </div>
  );
}
