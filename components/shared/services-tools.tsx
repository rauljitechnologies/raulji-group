"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { track } from "@/lib/analytics";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The two interactive pieces of the services hub, from the "Raulji Services"
 * design: a group filter over the supporting-service cards, and the "where are
 * you now?" stage picker.
 *
 * The cards themselves are rendered on the server and passed in, so their
 * images still go through the build-time photo check and next/image; this
 * component only decides which of them are shown.
 */

const PILL =
  "min-h-12 rounded-full border-[1.5px] px-[1.125rem] text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:border-[#329fd2]";
const PILL_ON = "border-[#122640] bg-[#122640] text-white";
const PILL_OFF = "border-[#cfd9e3] bg-white text-[#122640]";

export function SupportingFilter({
  groups,
  items,
}: {
  groups: string[];
  items: { key: string; group: string; card: React.ReactNode }[];
}) {
  const [tab, setTab] = useState("All");
  const shown = items.filter((item) => tab === "All" || item.group === tab);

  return (
    <div className="flex flex-col gap-9">
      <div role="group" aria-label="Filter supporting services" className="flex flex-wrap gap-2">
        {["All", ...groups].map((label) => {
          const on = tab === label;
          const count = label === "All" ? items.length : items.filter((i) => i.group === label).length;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={on}
              onClick={() => setTab(label)}
              className={cn(PILL, on ? PILL_ON : PILL_OFF)}
            >
              {label} <span className="ml-1 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <li key={item.key} className="flex">
            {item.card}
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface Stage {
  label: string;
  sub: string;
  services: { name: string; why: string; href: string }[];
}

export function StagePicker({ stages }: { stages: Stage[] }) {
  const [current, setCurrent] = useState(0);
  const stage = stages[current];

  return (
    <div className="flex min-w-0 flex-col gap-6 rounded-lg bg-white p-6 text-[#3a4656] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-10">
      <div role="group" aria-label="Business stage" className="grid gap-2.5 sm:grid-cols-2">
        {stages.map((s, k) => {
          const on = current === k;
          return (
            <button
              key={s.label}
              type="button"
              aria-pressed={on}
              onClick={() => setCurrent(k)}
              className={cn(
                "flex flex-col gap-1 rounded-md border-[1.5px] px-[1.125rem] py-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#329fd2]",
                on ? PILL_ON : "border-[#e3e9ef] bg-white text-[#122640]",
              )}
            >
              <span className="text-[0.9375rem] font-bold">{s.label}</span>
              <span className="text-[0.8125rem] opacity-75">{s.sub}</span>
            </button>
          );
        })}
      </div>

      <div
        aria-live="polite"
        className="flex flex-col gap-3.5 rounded-md border-[1.5px] border-[#329fd2] bg-[#f4fafd] px-6 py-[1.375rem]"
      >
        <p className="text-xs font-bold tracking-[0.1em] text-[#1a7cb0]">USUALLY RELEVANT</p>
        <ol className="flex flex-col">
          {stage.services.map((service, n) => (
            <li key={service.name} className="border-t border-[#dcebf3]">
              <Link
                href={service.href}
                onClick={() =>
                  track("service_card_click", { label: "services_stage", service: service.name })
                }
                className="flex items-center gap-3.5 py-3.5 text-[#122640] transition-[padding,color] duration-300 hover:pl-2 hover:text-[#1a7cb0]"
              >
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#122640] text-xs font-bold text-white">
                  {n + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-bold">{service.name}</span>
                  <span className="block text-[0.8125rem] leading-[1.5] text-[#5b6778]">{service.why}</span>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
        <a
          href={whatsappHref(
            `Hello Raulji Group, I am at this stage: ${stage.label}. Which of your services applies to me?`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { label: `services_stage_${stage.label.toLowerCase().replace(/\s+/g, "_")}` })}
          className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 self-start rounded-[4px] bg-[#122640] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1a7cb0] hover:shadow-[0_10px_22px_-10px_rgba(26,124,176,0.6)]"
        >
          Confirm with an Expert
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
