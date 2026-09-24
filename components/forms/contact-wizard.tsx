"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  CircleHelp,
  Code2,
  Compass,
  Link2,
  Loader2,
  Plus,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

import { CITY_INDEX } from "@/lib/city-index";
import { SITE, telHref, whatsappHref } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * The contact-page enquiry form, built to the "Raulji Contact" design: three
 * steps (need, details, confirm) instead of one long form.
 *
 * It posts to the same /api/lead/ endpoint with the same fields as LeadForm,
 * so the CRM, validation, rate limit and honeypot are unchanged. The `value`
 * of each need is the label LeadForm already sends, so leads from either form
 * read the same in the CRM. The design's "When are you planning to start?"
 * answer has no field of its own in the CRM, so it is sent at the top of the
 * message rather than dropped.
 *
 * Left out from the design: the "send me updates on WhatsApp" checkbox, which
 * would record a consent nothing downstream stores or honours, and the
 * reply-time promises (master rule 23).
 */

const NEEDS: { label: string; value: string; group: string; icon: LucideIcon }[] = [
  { label: "Private Limited", value: "Private Limited", group: "Registration", icon: Briefcase },
  { label: "LLP", value: "LLP", group: "Registration", icon: Link2 },
  { label: "Partnership", value: "Partnership", group: "Registration", icon: Users },
  { label: "Proprietorship", value: "Proprietorship", group: "Registration", icon: User },
  { label: "Business Consulting", value: "Business Consulting", group: "Consulting", icon: Compass },
  {
    label: "Not sure yet, help me choose",
    value: "Not sure yet, help me choose",
    group: "Guidance",
    icon: CircleHelp,
  },
  {
    label: "Technology or digital work",
    value: "Technology or digital work",
    group: "Raulji Technologies",
    icon: Code2,
  },
  { label: "Something else", value: "Other", group: "Other", icon: Plus },
];

const WHENS = ["This week", "Within a month", "In 1–3 months", "Just exploring"];

const STEP_LABELS = ["Your need", "Your details", "Confirm"];

type Fields = { name: string; phone: string; email: string; city: string; message: string };
type Errors = Partial<Record<"need" | "name" | "phone" | "email", string>>;

const inputClass =
  "h-[3.25rem] w-full rounded-[4px] border bg-white px-4 text-[0.9375rem] font-normal text-[#122640] transition hover:border-[#329fd2] focus:border-[#329fd2] focus:shadow-[0_0_0_4px_rgba(50,159,210,0.16)] focus:outline-none";

export function ContactWizard() {
  const pathname = usePathname();
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);
  const startedRef = useRef(false);

  const [step, setStep] = useState(1);
  const [need, setNeed] = useState("");
  const [when, setWhen] = useState("");
  const [fields, setFields] = useState<Fields>({ name: "", phone: "", email: "", city: "", message: "" });
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const needLabel = NEEDS.find((n) => n.value === need)?.label ?? "";

  // form_view fires once, when the form actually scrolls into view.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          track("form_view", { label: "contact_wizard" });
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function started() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("form_start", { label: "contact_wizard" });
  }

  function scrollToTop() {
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validate(current: number): boolean {
    const next: Errors = {};
    if (current === 1 && !need) next.need = "Please choose one option to continue.";
    if (current === 2) {
      if (fields.name.trim().length < 2) next.name = "Please enter your name.";
      const digits = fields.phone.replace(/[\s()-]/g, "");
      if (!/^(\+?91|0)?[6-9]\d{9}$/.test(digits)) next.phone = "Enter a valid 10-digit mobile number.";
      if (fields.email && !/^\S+@\S+\.\S+$/.test(fields.email))
        next.email = "Enter a valid email address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function setField(key: keyof Fields, value: string) {
    started();
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function submit() {
    setStatus("submitting");
    setSubmitError(null);
    const message = [when ? `Timeline: ${when}` : "", fields.message.trim()]
      .filter(Boolean)
      .join("\n\n");
    const payload = {
      name: fields.name,
      phone: fields.phone,
      email: fields.email,
      city: fields.city,
      registrationType: need,
      message,
      company,
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
          registration_type: need || "Not specified",
          city: fields.city || undefined,
        });
        scrollToTop();
      } else {
        setStatus("idle");
        setSubmitError(result.error ?? "Something went wrong. Please try again.");
        track("form_error", { registration_type: need });
      }
    } catch {
      setStatus("idle");
      setSubmitError(`Network problem while submitting. Please try again or call ${SITE.phone.display}.`);
      track("form_error", { registration_type: need });
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate(step)) {
      // The button is at the foot of the form; bring the errors into view.
      scrollToTop();
      return;
    }
    if (step < 3) {
      setStep(step + 1);
      scrollToTop();
    } else {
      void submit();
    }
  }

  function reset() {
    setStep(1);
    setNeed("");
    setWhen("");
    setFields({ name: "", phone: "", email: "", city: "", message: "" });
    setErrors({});
    setStatus("idle");
    setSubmitError(null);
  }

  const firstName = fields.name.trim().split(/\s+/)[0] || "there";

  if (status === "success") {
    return (
      <div
        ref={rootRef}
        id="lead-form"
        role="status"
        aria-live="polite"
        className="flex scroll-mt-28 flex-col gap-[1.375rem] rounded-lg bg-white p-7 shadow-[0_40px_90px_-40px_rgba(12,26,45,0.55),0_0_0_1px_rgba(18,38,64,0.06)] sm:p-[3.25rem]"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f5fb]">
          <Check className="h-[1.875rem] w-[1.875rem] text-[#1a7cb0]" strokeWidth={2.2} aria-hidden="true" />
        </span>
        <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#122640] sm:text-[2rem]">
          Thank you, {firstName}. Your enquiry has been received.
        </h2>
        <p className="max-w-[35rem] text-base leading-[1.7] text-[#3a4656]">
          A Raulji Group representative will contact you using the details provided
          {needLabel ? (
            <>
              {" "}
              about <strong className="text-[#122640]">{needLabel}</strong>
            </>
          ) : null}
          .
        </p>
        <ol className="ml-2.5 flex flex-col border-l-2 border-[#e3e9ef]">
          {[
            ["We talk it through", "To understand what you are building, who is involved and your timeline."],
            ["You get a written recommendation", "Structure, the documents needed and the cost, before anything is filed."],
            ["We file, only when you say so", "Then we handle it end to end, with one point of contact."],
          ].map(([title, body]) => (
            <li key={title} className="relative pb-[1.125rem] pl-6">
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-[3px] h-3 w-3 rounded-full bg-[#329fd2] shadow-[0_0_0_4px_#e8f5fb]"
              />
              <p className="text-[0.9375rem] font-bold text-[#122640]">{title}</p>
              <p className="text-sm text-[#3a4656]">{body}</p>
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={whatsappHref(
              `Hello Raulji Group, I just sent an enquiry about ${needLabel || "my business"}. My name is ${fields.name.trim()}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { label: "contact_wizard_success" })}
            className="inline-flex min-h-[3.375rem] items-center justify-center gap-2 rounded-[4px] bg-[#122640] px-[1.375rem] text-[0.9375rem] font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1a7cb0]"
          >
            Continue on WhatsApp
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={reset}
            className="min-h-[3.375rem] rounded-[4px] border-[1.5px] border-[#cfd9e3] bg-white px-[1.375rem] text-[0.9375rem] font-semibold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:border-[#122640]"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const review: [string, string, number][] = [
    ["Need", needLabel, 1],
    ["Timeline", when || "—", 1],
    ["Name", fields.name, 2],
    ["Phone", fields.phone, 2],
    ["Email", fields.email || "—", 2],
    ["City", fields.city || "—", 2],
  ];

  return (
    <div
      ref={rootRef}
      id="lead-form"
      className="scroll-mt-28 overflow-hidden rounded-lg bg-white shadow-[0_40px_90px_-40px_rgba(12,26,45,0.55),0_0_0_1px_rgba(18,38,64,0.06)]"
    >
      <div className="flex flex-col gap-5 px-6 pt-7 sm:px-11 sm:pt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[1.375rem] font-extrabold tracking-[-0.01em] text-[#122640] sm:text-[1.75rem]">
              Get business guidance
            </h2>
            <p className="text-sm text-[#3a4656]">
              Three short steps. Nothing is filed until you say so.
            </p>
          </div>
          <p className="text-[0.8125rem] font-bold text-[#1a7cb0]">Step {step} of 3</p>
        </div>
        <ol aria-label="Progress" className="grid grid-cols-3 gap-2">
          {STEP_LABELS.map((label, k) => (
            <li
              key={label}
              aria-current={step === k + 1 ? "step" : undefined}
              className="flex flex-col gap-2"
            >
              <span className="block h-1 overflow-hidden rounded-sm bg-[#e3e9ef]">
                <span
                  className="block h-full bg-[#329fd2] transition-[width] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
                  style={{ width: step > k ? "100%" : "0%" }}
                />
              </span>
              <span className={cn("text-xs font-semibold", step > k ? "text-[#122640]" : "text-[#9aa7b5]")}>
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <form
        onSubmit={onSubmit}
        noValidate
        className="flex flex-col gap-[1.375rem] px-6 pb-7 pt-6 sm:px-11 sm:pb-10"
      >
        {step === 1 ? (
          <fieldset className="flex flex-col gap-3.5">
            <legend className="mb-3.5 text-[1.0625rem] font-bold text-[#122640]">
              What do you need help with?
            </legend>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {NEEDS.map((item) => {
                const on = need === item.value;
                const Icon = item.icon;
                return (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      started();
                      setNeed(item.value);
                      setErrors({});
                    }}
                    className={cn(
                      "flex min-h-[4.75rem] items-center gap-3 rounded-md border-[1.5px] px-4 py-3.5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#329fd2] hover:shadow-[0_10px_20px_-14px_rgba(18,38,64,0.4)]",
                      on ? "border-[#122640] bg-[#f4fafd]" : "border-[#e3e9ef] bg-white",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-[2.375rem] w-[2.375rem] flex-none items-center justify-center rounded-full",
                        on ? "bg-[#122640]" : "bg-[#e8f5fb]",
                      )}
                    >
                      <Icon
                        className={cn("h-[1.125rem] w-[1.125rem]", on ? "text-white" : "text-[#1a7cb0]")}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold leading-tight text-[#122640]">{item.label}</span>
                      <span className="text-xs text-[#5b6778]">{item.group}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.need ? (
              <span role="alert" className="text-xs font-semibold text-[#c0392b]">
                {errors.need}
              </span>
            ) : null}
            <div className="mt-1.5 flex flex-col gap-2.5">
              <p className="text-[0.8125rem] font-semibold text-[#122640]">
                When are you planning to start?
              </p>
              <div className="flex flex-wrap gap-2">
                {WHENS.map((label) => {
                  const on = when === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setWhen(on ? "" : label)}
                      className={cn(
                        "min-h-[2.625rem] rounded-full border px-4 text-[0.8125rem] font-semibold transition hover:border-[#329fd2]",
                        on ? "border-[#122640] bg-[#122640] text-white" : "border-[#cfd9e3] bg-white text-[#122640]",
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <div className="flex flex-col gap-[1.125rem]">
            <p className="text-[1.0625rem] font-bold text-[#122640]">How can we reach you?</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id={`${id}-name`} label="Your name" required error={errors.name}>
                <input
                  id={`${id}-name`}
                  name="name"
                  value={fields.name}
                  onChange={(e) => setField("name", e.target.value)}
                  autoComplete="name"
                  placeholder="Full name"
                  maxLength={100}
                  aria-invalid={Boolean(errors.name)}
                  className={cn(inputClass, errors.name ? "border-[#c0392b]" : "border-[#cfd9e3]")}
                />
              </Field>
              <Field id={`${id}-phone`} label="Phone / WhatsApp" required error={errors.phone}>
                <input
                  id={`${id}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  value={fields.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  aria-invalid={Boolean(errors.phone)}
                  className={cn(inputClass, errors.phone ? "border-[#c0392b]" : "border-[#cfd9e3]")}
                />
              </Field>
              <Field id={`${id}-email`} label="Email" error={errors.email}>
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  inputMode="email"
                  value={fields.email}
                  onChange={(e) => setField("email", e.target.value)}
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={Boolean(errors.email)}
                  className={cn(inputClass, errors.email ? "border-[#c0392b]" : "border-[#cfd9e3]")}
                />
              </Field>
              <Field id={`${id}-city`} label="City">
                <input
                  id={`${id}-city`}
                  name="city"
                  value={fields.city}
                  onChange={(e) => setField("city", e.target.value)}
                  list={`${id}-cities`}
                  autoComplete="address-level2"
                  placeholder="e.g. Vadodara"
                  maxLength={80}
                  className={cn(inputClass, "border-[#cfd9e3]")}
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
                rows={3}
                maxLength={1900}
                value={fields.message}
                onChange={(e) => setField("message", e.target.value)}
                placeholder="Number of partners, business activity, any deadline..."
                className="w-full resize-y rounded-[4px] border border-[#cfd9e3] px-4 py-3.5 text-[0.9375rem] font-normal text-[#122640] transition hover:border-[#329fd2] focus:border-[#329fd2] focus:shadow-[0_0_0_4px_rgba(50,159,210,0.16)] focus:outline-none"
              />
            </Field>
            {/* Honeypot. Hidden from users and from assistive technology. */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor={`${id}-company`}>Company (leave blank)</label>
              <input
                id={`${id}-company`}
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="flex flex-col gap-4">
            <p className="text-[1.0625rem] font-bold text-[#122640]">Check your details</p>
            <dl className="overflow-hidden rounded-md border border-[#e3e9ef]">
              {review.map(([term, value, target]) => (
                <div
                  key={term}
                  className="grid grid-cols-[6.5rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#eef2f6] px-[1.125rem] py-3.5 transition-colors last:border-b-0 hover:bg-[#f4fafd] sm:grid-cols-[8.75rem_minmax(0,1fr)_auto]"
                >
                  <dt className="text-[0.8125rem] text-[#5b6778]">{term}</dt>
                  <dd className="text-[0.9375rem] font-semibold text-[#122640] [overflow-wrap:anywhere]">
                    {value}
                  </dd>
                  <button
                    type="button"
                    onClick={() => setStep(target)}
                    className="min-h-[2.25rem] text-[0.8125rem] font-semibold text-[#1a7cb0] hover:underline"
                  >
                    Edit<span className="sr-only"> {term.toLowerCase()}</span>
                  </button>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {submitError ? (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-md bg-[#c0392b]/10 px-4 py-3 text-sm text-[#c0392b]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {submitError}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eef2f6] pt-5">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => {
                setStep(step - 1);
                setErrors({});
              }}
              className="inline-flex h-[3.375rem] items-center gap-2 rounded-[4px] border-[1.5px] border-[#cfd9e3] bg-white px-[1.375rem] text-[0.9375rem] font-semibold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:border-[#122640]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
          ) : (
            <a
              href={telHref}
              onClick={() => track("phone_click", { label: "contact_wizard" })}
              className="text-sm font-semibold text-[#122640] hover:text-[#1a7cb0] hover:underline"
            >
              Prefer to talk? Call {SITE.phone.display}
            </a>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="ml-auto inline-flex h-[3.375rem] items-center gap-2.5 rounded-[4px] bg-[#122640] px-7 text-base font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1a7cb0] hover:shadow-[0_12px_24px_-12px_rgba(26,124,176,0.7)] disabled:opacity-60"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending
              </>
            ) : (
              <>
                {step === 3 ? "Get Business Guidance" : "Continue"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
        <p className="text-xs leading-[1.6] text-[#5b6778]">
          We use your details only to respond to this enquiry. Raulji Group is a private
          business-services firm, not a government department.
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
      <label htmlFor={id} className="text-[0.8125rem] font-semibold text-[#122640]">
        {label}
        {required ? <span className="text-[#c0392b]"> *</span> : null}
      </label>
      {children}
      {error ? (
        <span role="alert" className="text-xs font-semibold text-[#c0392b]">
          {error}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Open or closed right now, by the published hours in India time. Rendered
 * after mount only, so the server (which does not know the visitor's clock)
 * never ships a status that is wrong by the time the page is read.
 */
export function OpenStatus() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    function check() {
      const now = new Date();
      const ist = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * 60_000);
      const day = ist.getDay();
      const hour = ist.getHours() + ist.getMinutes() / 60;
      const [openH, openM] = SITE.hours.opens.split(":").map(Number);
      const [closeH, closeM] = SITE.hours.closes.split(":").map(Number);
      setOpen(day !== 0 && hour >= openH + openM / 60 && hour < closeH + closeM / 60);
    }
    check();
    const timer = window.setInterval(check, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  if (open === null) {
    return <p className="text-[0.8125rem] font-bold text-[#5b6778]">{SITE.hours.display}</p>;
  }

  return (
    <p
      className={cn(
        "flex items-center gap-2 text-[0.8125rem] font-bold",
        open ? "text-[#1f7a45]" : "text-[#8a5a12]",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-[9px] w-[9px] rounded-full",
          open
            ? "bg-[#1f9d55] shadow-[0_0_0_4px_rgba(31,157,85,0.18)]"
            : "bg-[#b7791f] shadow-[0_0_0_4px_rgba(183,121,31,0.18)]",
        )}
      />
      {open ? "Open now · Mon–Sat, 9:00 AM to 7:00 PM" : "Closed now · back at 9:00 AM, Mon–Sat"}
    </p>
  );
}
