"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { CITY_INDEX } from "@/lib/city-index";
import { SITE, telHref } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * "What do you need help with?" options (master rule 23).
 *
 * Grouped rather than flat, because consulting and a specific structure are
 * different kinds of answer and a flat list of six made the consulting option
 * look like a fifth registration type. Values are sent to the CRM verbatim, so
 * they double as the lead-source label the team reads.
 *
 * Insurance is deliberately absent: it is not a Phase 1 service and offering it
 * here would generate enquiries for something we are not leading with.
 */
const SERVICE_OPTION_GROUPS: { label: string; options: string[] }[] = [
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
    options: ["Not sure yet, help me choose", "Technology or digital work", "Other"],
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
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setError(null);
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      city: String(formData.get("city") ?? ""),
      registrationType: String(formData.get("registrationType") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
      sourcePage: pathname,
    };

    try {
      const response = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { success: boolean; error?: string };

      if (result.success) {
        setStatus("success");
        track("form_submit", {
          registration_type: payload.registrationType || "Not specified",
          city: payload.city || undefined,
        });
      } else {
        setStatus("error");
        setError(result.error ?? "Something went wrong. Please try again.");
        track("form_error", { registration_type: payload.registrationType });
      }
    } catch {
      setStatus("error");
      setError(`Network problem while submitting. Please try again or call ${SITE.phone.display}.`);
      track("form_error", { registration_type: payload.registrationType });
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
          <CheckCircle2 className="h-8 w-8 text-[#1a7cb0]" aria-hidden="true" />
        </span>
        <h2 className="text-xl font-extrabold tracking-[-0.01em] text-[#122640] sm:text-2xl">
          Thank you. Your enquiry has been received.
        </h2>
        <p className="max-w-[28rem] text-[0.9375rem] leading-[1.7] text-[#3a4656]">
          A Raulji Group representative will contact you using the details provided. If your matter
          is urgent, call{" "}
          <a href={telHref} className="font-semibold text-[#1a7cb0] hover:underline">
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
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1a7cb0]"
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
          <Field id={`${id}-city`} label="City">
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

        {/* Honeypot. Hidden from users and from assistive technology. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${id}-company`}>Company (leave blank)</label>
          <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
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
          className="mt-1 inline-flex h-[3.375rem] w-full items-center justify-center gap-2.5 rounded-[4px] bg-[#122640] px-7 text-base font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1a7cb0] hover:shadow-[0_12px_24px_-12px_rgba(26,124,176,0.7)] disabled:translate-y-0 disabled:opacity-60"
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
          <a href={telHref} className="font-semibold text-[#1a7cb0] hover:underline">
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
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
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
