"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { COMPARISON_ROWS, type ComparisonRow } from "@/lib/comparison";
import { whatsappHref } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * The two interactive pieces of the Business Registration pillar, from the
 * "Raulji Business Registration" design: the three-question structure finder,
 * and the side-by-side comparison with a highlightable column.
 */

export interface StructureLink {
  slug: string;
  name: string;
  href: string;
}

type ColumnKey = keyof Omit<ComparisonRow, "feature">;

const COLUMN_KEY: Record<string, ColumnKey> = {
  "pvt-registration": "pvt",
  "llp-registration": "llp",
  "partnership-registration": "partnership",
  "proprietorship-registration": "proprietorship",
};

const QUESTIONS = [
  { key: "owners", text: "How many owners will the business have?", options: ["Just me", "Two or more"] },
  { key: "invest", text: "Will you raise outside investment?", options: ["Yes", "Maybe later", "No"] },
  {
    key: "protect",
    text: "Must personal assets be protected from business debts?",
    options: ["Yes, important", "Not a priority"],
  },
] as const;

type Answers = Partial<Record<(typeof QUESTIONS)[number]["key"], string>>;

/**
 * The same order of reasoning as "Four things that decide it" on the page:
 * equity first, then the number of owners, then liability. A starting point,
 * which is what the copy around it says, not advice.
 */
function recommend(a: Answers): { slug: string; why: string } | null {
  if (!a.owners || !a.invest || !a.protect) return null;
  if (a.invest === "Yes") {
    return {
      slug: "pvt-registration",
      why:
        "Only a Private Limited Company can issue equity shares to investors" +
        (a.owners === "Just me" ? ", and it needs at least two directors, so you will need a second person." : "."),
    };
  }
  if (a.owners === "Just me") {
    return {
      slug: "proprietorship-registration",
      why:
        a.protect === "Yes, important"
          ? "A proprietorship is the simplest way for one owner to start, but it carries unlimited liability. If protection matters, ask us about a company structure."
          : "One owner, the least compliance and a quick start: the simplest way to begin.",
    };
  }
  if (a.invest === "Maybe later") {
    return {
      slug: "pvt-registration",
      why: "Limited liability now, and the option to raise investment later without converting the business first.",
    };
  }
  if (a.protect === "Yes, important") {
    return {
      slug: "llp-registration",
      why: "Limited liability for the partners, with lighter annual compliance than a company.",
    };
  }
  return {
    slug: "partnership-registration",
    why: "Two or more people starting together at low cost, where limited liability is not the priority.",
  };
}

export function StructureFinder({ structures }: { structures: StructureLink[] }) {
  const [answers, setAnswers] = useState<Answers>({});
  const result = recommend(answers);
  const structure = result ? structures.find((s) => s.slug === result.slug) : undefined;

  return (
    <div className="flex min-w-0 flex-col gap-[1.625rem] rounded-lg bg-white p-6 text-[#3a4656] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-10">
      {QUESTIONS.map((question, n) => (
        <fieldset key={question.key} className="flex flex-col gap-3">
          <legend className="mb-3 flex items-center gap-2.5 text-base font-bold text-[#122640]">
            <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#122640] text-[0.8125rem] text-white">
              {n + 1}
            </span>
            {question.text}
          </legend>
          <div className="flex flex-wrap gap-2">
            {question.options.map((option) => {
              const on = answers[question.key] === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setAnswers((a) => ({ ...a, [question.key]: option }))}
                  className={cn(
                    "min-h-12 rounded-full border-[1.5px] px-[1.125rem] text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:border-[#329fd2]",
                    on ? "border-[#122640] bg-[#122640] text-white" : "border-[#cfd9e3] bg-white text-[#122640]",
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div
        aria-live="polite"
        className={cn(
          "flex flex-col gap-2.5 rounded-md border-[1.5px] px-6 py-[1.375rem] transition-colors duration-300",
          structure ? "border-[#329fd2] bg-[#e8f5fb]" : "border-[#e3e9ef] bg-[#f4f7fa]",
        )}
      >
        <p className="text-xs font-bold tracking-[0.1em] text-[#1a7cb0]">YOUR LIKELY STRUCTURE</p>
        <p className="text-2xl font-extrabold text-[#122640]">
          {structure ? structure.name : "Answer the questions above"}
        </p>
        <p className="text-sm leading-[1.6]">
          {result ? result.why : "Your starting point updates as you choose."}
        </p>
        {structure ? (
          <div className="mt-1.5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <a
              href={whatsappHref(
                `Hello Raulji Group, the Structure Finder suggested ${structure.name} for my business. Can you confirm?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { label: "structure_finder", registration_type: structure.name })}
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[4px] bg-[#122640] px-[1.375rem] text-[0.9375rem] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1a7cb0] hover:shadow-[0_10px_22px_-10px_rgba(26,124,176,0.6)]"
            >
              Confirm with an Expert
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href={structure.href}
              onClick={() => track("service_card_click", { label: "structure_finder", registration_type: structure.name })}
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[4px] border-[1.5px] border-[#122640] px-5 text-[0.9375rem] font-semibold text-[#122640] transition duration-200 hover:-translate-y-0.5 hover:bg-[#122640] hover:text-white"
            >
              About {structure.name}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * The comparison, from the same verified rows as ComparisonTable, with the
 * design's "highlight a structure" chips. On phones it keeps a controlled
 * horizontal scroll with the feature column pinned (master rule 25).
 */
export function HighlightComparison({ structures }: { structures: StructureLink[] }) {
  const [col, setCol] = useState<number>(-1);

  return (
    <div className="flex flex-col gap-6">
      <div role="group" aria-label="Highlight a structure" className="flex flex-wrap gap-2">
        {structures.map((s, k) => {
          const on = col === k;
          return (
            <button
              key={s.slug}
              type="button"
              aria-pressed={on}
              onClick={() => setCol(on ? -1 : k)}
              className={cn(
                "min-h-12 rounded-full border-[1.5px] px-[1.125rem] text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:border-[#329fd2]",
                on ? "border-[#122640] bg-[#122640] text-white" : "border-[#cfd9e3] bg-white text-[#122640]",
              )}
            >
              {s.name}
            </button>
          );
        })}
      </div>
      <div
        className="overflow-x-auto rounded-lg border border-[#e3e9ef] bg-white"
        tabIndex={0}
        role="region"
        aria-label="Business structure comparison, scrollable"
      >
        <table className="w-full min-w-[57.5rem] border-collapse text-sm leading-[1.55]">
          <caption className="sr-only">
            Comparison of Private Limited Company, LLP, Partnership Firm and Proprietorship
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-10 w-40 bg-[#122640] px-5 py-[1.125rem] text-left text-[0.8125rem] text-white"
              >
                Feature
              </th>
              {structures.map((s, k) => (
                <th
                  key={s.slug}
                  scope="col"
                  className={cn(
                    "px-5 py-[1.125rem] text-left text-[0.9375rem] text-white transition-colors duration-300",
                    col === k ? "bg-[#1a7cb0]" : "bg-[#122640]",
                  )}
                >
                  <Link href={s.href} className="text-white hover:underline">
                    {s.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.feature} className="transition-colors hover:bg-[#fafcfd]">
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-t border-[#eef2f6] bg-white px-5 py-4 text-left align-top font-bold text-[#122640]"
                >
                  {row.feature}
                </th>
                {structures.map((s, k) => (
                  <td
                    key={s.slug}
                    className={cn(
                      "border-t border-[#eef2f6] px-5 py-4 align-top transition-colors duration-300",
                      col === k ? "bg-[#e8f5fb] text-[#3a4656]" : col > -1 ? "bg-white text-[#8795a6]" : "text-[#3a4656]",
                    )}
                  >
                    {row[COLUMN_KEY[s.slug]]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
