"use client";

import { useRef, useState } from "react";

import { track } from "@/lib/analytics";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The two interactive pieces of a registration service page, from the
 * "Raulji Private Limited" design (claude.ai/design): the tick-what-you-have
 * document checklist, and the step-by-step process tabs.
 *
 * Both render every item into the HTML on the server, so the document list and
 * every step's description are in the page source whether or not script runs.
 */

export function DocChecklist({ docs, structure }: { docs: string[]; structure: string }) {
  const [have, setHave] = useState<Record<number, boolean>>({});
  const ready = docs.filter((_, k) => have[k]).length;
  const missing = docs.filter((_, k) => !have[k]);
  const message =
    `Hello Raulji Group, I am preparing ${structure} registration. I have ${ready} of ${docs.length} documents ready` +
    (missing.length ? `. Still missing: ${missing.join("; ")}.` : ".");

  return (
    <div className="flex min-w-0 flex-col gap-5 rounded-lg bg-white p-6 text-[#3a4656] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-9">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold tracking-[0.1em] text-[#1a7cb0]">DOCUMENT CHECKLIST</p>
          <h3 className="text-xl font-extrabold text-[#122640]">Tick what you already have</h3>
        </div>
        <p aria-live="polite" className="text-sm font-bold text-[#122640]">
          {ready} of {docs.length} ready
        </p>
      </div>
      <div aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-[#eef2f6]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#1a7cb0,#329fd2)] transition-[width] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
          style={{ width: `${Math.round((ready / docs.length) * 100)}%` }}
        />
      </div>
      <ul className="flex flex-col gap-2">
        {docs.map((doc, k) => {
          const on = !!have[k];
          return (
            <li key={doc}>
              <button
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => setHave((h) => ({ ...h, [k]: !on }))}
                className={cn(
                  "flex w-full items-start gap-3 rounded-md border px-4 py-3 text-left text-[0.9375rem] leading-[1.5] transition-colors duration-200 hover:border-[#329fd2]",
                  on ? "border-[#cfe6f3] bg-[#f4fafd]" : "border-[#eef2f6] bg-white",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-[4px] border-[1.5px] text-xs font-bold text-white transition-colors duration-200",
                    on ? "border-[#1a7cb0] bg-[#1a7cb0]" : "border-[#cfd9e3] bg-white",
                  )}
                >
                  {on ? "✓" : ""}
                </span>
                <span className={cn("text-[#122640]", on && "line-through opacity-60")}>{doc}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <a
        href={whatsappHref(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { label: "doc_checklist", registration_type: structure })}
        className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 self-start rounded-[4px] bg-[#122640] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1a7cb0]"
      >
        Send my checklist on WhatsApp <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

export function ProcessTabs({
  steps,
  media,
}: {
  steps: { title: string; body: string; actor?: string }[];
  media: React.ReactNode;
}) {
  const [current, setCurrent] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = steps.length - 1;

  const go = (k: number) => {
    setCurrent(k);
    tabs.current[k]?.focus();
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-10">
      <ol role="tablist" aria-label="Registration steps" aria-orientation="vertical" className="flex flex-col gap-2">
        {steps.map((s, k) => {
          const on = current === k;
          return (
            <li key={s.title} role="presentation">
              <button
                ref={(el) => {
                  tabs.current[k] = el;
                }}
                type="button"
                role="tab"
                id={`step-tab-${k}`}
                aria-selected={on}
                aria-controls={`step-panel-${k}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setCurrent(k)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                    e.preventDefault();
                    go(k === last ? 0 : k + 1);
                  } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    go(k === 0 ? last : k - 1);
                  } else if (e.key === "Home") {
                    e.preventDefault();
                    go(0);
                  } else if (e.key === "End") {
                    e.preventDefault();
                    go(last);
                  }
                }}
                className={cn(
                  "flex w-full items-center gap-3.5 rounded-md border px-4 py-3.5 text-left transition duration-200 hover:border-[#329fd2]",
                  on ? "border-[#122640] bg-[#122640] text-white" : "border-[#e3e9ef] bg-white text-[#122640]",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 flex-none items-center justify-center rounded-full text-[0.8125rem] font-bold",
                    on ? "bg-[#329fd2] text-white" : "bg-[#e8f5fb] text-[#1a7cb0]",
                  )}
                >
                  {k + 1}
                </span>
                <span className="min-w-0 flex-1 text-[0.9375rem] font-bold leading-[1.35]">{s.title}</span>
                {s.actor ? (
                  <span className={cn("hidden text-xs sm:block", on ? "text-[#9fd3ee]" : "text-[#5b6778]")}>
                    {s.actor}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#e3e9ef] bg-white">
        {media}
        {steps.map((s, k) => (
          <div
            key={s.title}
            role="tabpanel"
            id={`step-panel-${k}`}
            aria-labelledby={`step-tab-${k}`}
            hidden={k !== current}
            className="flex flex-col gap-3.5 p-6 sm:p-9 [&[hidden]]:!hidden"
          >
            <p className="text-xs font-bold tracking-[0.1em] text-[#1a7cb0]">
              STEP {k + 1} OF {steps.length}
              {s.actor ? ` · ${s.actor.toUpperCase()}` : ""}
            </p>
            <h3 className="text-2xl font-extrabold tracking-[-0.01em] text-[#122640]">{s.title}</h3>
            <p className="text-pretty text-base leading-[1.75]">{s.body}</p>
          </div>
        ))}
        <div className="flex flex-wrap gap-2.5 px-6 pb-6 sm:px-9 sm:pb-9">
          <button
            type="button"
            onClick={() => setCurrent((k) => Math.max(0, k - 1))}
            disabled={current === 0}
            className="min-h-12 rounded-[4px] border-[1.5px] border-[#cfd9e3] px-[1.125rem] text-sm font-semibold text-[#122640] transition duration-200 hover:border-[#122640] disabled:cursor-not-allowed disabled:opacity-35"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={() => setCurrent((k) => Math.min(last, k + 1))}
            disabled={current === last}
            className="min-h-12 rounded-[4px] bg-[#122640] px-[1.125rem] text-sm font-semibold text-white transition duration-200 hover:bg-[#1a7cb0] disabled:cursor-not-allowed disabled:opacity-35"
          >
            Next step →
          </button>
        </div>
      </div>
    </div>
  );
}
