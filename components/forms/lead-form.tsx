"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { CITIES } from "@/lib/cities";
import { SITE, telHref } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const REGISTRATION_OPTIONS = [
  ...SERVICES.map((s) => s.shortName),
  "Not sure yet, help me choose",
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

const fieldClass =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-secondary placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring";

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

  function handleFirstInput() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("form_start", { registration_type: registrationType, city: defaultCity });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(event.currentTarget);
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
        track("lead_form_submit", {
          registration_type: payload.registrationType || "Not specified",
          city: payload.city || undefined,
        });
      } else {
        setStatus("error");
        setError(result.error ?? "Something went wrong. Please try again.");
        track("lead_form_error", { registration_type: payload.registrationType });
      }
    } catch {
      setStatus("error");
      setError(`Network problem while submitting. Please try again or call ${SITE.phone.display}.`);
      track("lead_form_error", { registration_type: payload.registrationType });
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn("glass-card rounded-3xl p-8 text-center", className)}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
        <h2 className="mt-4 text-xl">Thank you. Your enquiry has been received.</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A Raulji Group representative will contact you shortly. If your matter is urgent, call{" "}
          <a href={telHref} className="font-semibold text-primary hover:underline">
            {SITE.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className={cn("glass-card rounded-3xl p-6 sm:p-8", className)}>
      <h2 className="text-xl">{heading}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lead}</p>

      <form ref={formRef} onSubmit={handleSubmit} onInput={handleFirstInput} className="mt-6 space-y-4" noValidate>
        <div>
          <label htmlFor={`${id}-type`} className="mb-1.5 block text-sm font-medium text-secondary">
            What do you want to register?
          </label>
          <select
            id={`${id}-type`}
            name="registrationType"
            defaultValue={defaultRegistrationType ?? ""}
            className={fieldClass}
          >
            <option value="">Select an option</option>
            {REGISTRATION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm font-medium text-secondary">
            Your name <span className="text-destructive">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            minLength={2}
            maxLength={100}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-phone`} className="mb-1.5 block text-sm font-medium text-secondary">
              Phone <span className="text-destructive">*</span>
            </label>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor={`${id}-email`} className="mb-1.5 block text-sm font-medium text-secondary">
              Email
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-city`} className="mb-1.5 block text-sm font-medium text-secondary">
            City
          </label>
          <input
            id={`${id}-city`}
            name="city"
            type="text"
            defaultValue={defaultCity ?? ""}
            list={`${id}-cities`}
            autoComplete="address-level2"
            className={fieldClass}
          />
          <datalist id={`${id}-cities`}>
            {CITIES.map((city) => (
              <option key={city.slug} value={city.name} />
            ))}
          </datalist>
        </div>

        <div>
          <label htmlFor={`${id}-message`} className="mb-1.5 block text-sm font-medium text-secondary">
            Anything else we should know?
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={3}
            maxLength={2000}
            className={cn(fieldClass, "resize-none")}
          />
        </div>

        {/* Honeypot. Hidden from users and from assistive technology. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${id}-company`}>Company (leave blank)</label>
          <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {error ? (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="brand-gradient inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-xl px-6 font-semibold text-primary-foreground shadow-soft transition-shadow hover:shadow-elevated disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          We use your details only to respond to this enquiry. Prefer to talk?{" "}
          <a href={telHref} className="font-medium text-primary hover:underline">
            Call {SITE.phone.display}
          </a>
        </p>
      </form>
    </div>
  );
}
