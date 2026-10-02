"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  ChevronDown,
  CircleHelp,
  Link2,
  Search,
  User,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

import { track } from "@/lib/analytics";
import { POPULAR_SEARCHES, SEARCH_SYNONYMS, type FaqIcon } from "@/lib/faq-page";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The FAQ library: search, popular searches, topic filter and accordion.
 *
 * Every answer is rendered into the HTML whether or not its row is open or its
 * topic is filtered out. A closed answer is collapsed with CSS (`.faq-panel`
 * in globals.css) rather than left out, and a filtered row takes the `hidden`
 * attribute, so the page source always carries all 47 answers and always
 * matches its FAQPage schema.
 */

export interface FaqGroup {
  id: string;
  title: string;
  sub: string;
  blurb: string;
  icon: FaqIcon;
  /** The structure's service page, or null for the general questions. */
  href: string | null;
  /** Lower-cased extra search words for every question in the group. */
  keywords: string;
  faqs: { q: string; a: string; link?: { href: string; label: string } }[];
}

const ICONS: Record<FaqIcon, LucideIcon> = {
  general: CircleHelp,
  pvt: Briefcase,
  llp: Link2,
  partnership: Users,
  proprietorship: User,
};

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/**
 * A search word matches if the text contains it, its singular, or one of its
 * listed synonyms, so "directors" finds "director" and "cost" finds "fee".
 */
function termMatches(text: string, term: string) {
  if (text.includes(term)) return true;
  if (term.length > 3 && term.endsWith("s") && text.includes(term.slice(0, -1))) return true;
  return (SEARCH_SYNONYMS[term] ?? []).some((s) => text.includes(s));
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function FaqExplorer({
  groups,
  breadcrumbs,
  heroCopy,
  stats,
}: {
  groups: FaqGroup[];
  breadcrumbs: React.ReactNode;
  heroCopy: React.ReactNode;
  stats: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  /**
   * Rows the reader has opened or closed by hand. Anything not in here falls
   * back to the default: the first question open on arrival, every match
   * open while searching. Cleared when the search changes, so a new search
   * starts from its own default.
   */
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const listRef = useRef<HTMLDivElement>(null);

  const total = groups.reduce((sum, g) => sum + g.faqs.length, 0);
  const firstKey = `${groups[0]?.id}-0`;

  /** Search text per question: its own words plus its topic's name and keywords. */
  const haystacks = useMemo(
    () =>
      Object.fromEntries(
        groups.flatMap((g) =>
          g.faqs.map((f, k) => [
            `${g.id}-${k}`,
            `${f.q} ${f.a} ${g.title} ${g.sub} ${g.keywords}`.toLowerCase(),
          ]),
        ),
      ),
    [groups],
  );

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const searching = terms.length > 0;
  const matches = (key: string) => terms.every((t) => termMatches(haystacks[key]!, t));

  const counts: Record<string, number> = Object.fromEntries(
    groups.map((g) => [g.id, g.faqs.filter((_, k) => matches(`${g.id}-${k}`)).length]),
  );
  counts.all = groups.reduce((sum, g) => sum + counts[g.id]!, 0);

  const visibleKeys = groups
    .filter((g) => topic === "all" || g.id === topic)
    .flatMap((g) => g.faqs.map((_, k) => `${g.id}-${k}`))
    .filter(matches);
  const n = visibleKeys.length;

  const isOpen = (key: string) => overrides[key] ?? (searching || key === firstKey);
  const allOpen = n > 0 && visibleKeys.every(isOpen);

  const topicName = groups.find((g) => g.id === topic)?.title;
  const resultLabel =
    (searching ? plural(n, "result", "results") : plural(n, "question", "questions")) +
    (topic !== "all" ? ` in ${topicName}` : "") +
    (searching ? ` for “${query.trim()}”` : "");

  const askHref = whatsappHref(
    `Hello Raulji Group, I have a question about business registration${searching ? `: ${query.trim()}` : "."}`,
  );

  const scrollToList = () => {
    const el = listRef.current;
    if (!el) return;
    // Only move the page when the list is not already in view, so a chip
    // pressed with the results on screen does not jump.
    const top = el.getBoundingClientRect().top;
    if (top > 0 && top < window.innerHeight * 0.6) return;
    window.scrollTo({
      top: top + window.scrollY - 112,
      behavior: reducedMotion() ? "auto" : "smooth",
    });
  };

  const search = (q: string, resetTopic = false) => {
    setQuery(q);
    setOverrides({});
    if (resetTopic) setTopic("all");
  };

  const chooseTopic = (id: string, button: HTMLButtonElement) => {
    setTopic(id);
    // Keep the chosen tab in view on the horizontally scrolling mobile strip.
    button.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reducedMotion() ? "auto" : "smooth" });
  };

  const tabs = [{ id: "all", title: "All" }, ...groups];

  return (
    <>
      <section aria-labelledby="faq-h1" className="relative overflow-hidden bg-[#0c1a2d] pt-[5.5rem] text-white sm:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 -top-64 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(50,159,210,0.18),rgba(50,159,210,0)_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(50,159,210,0.16)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(90deg,transparent_35%,#000_100%)]"
        />
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-7 px-5 pb-10 pt-6 sm:px-8 md:gap-10 md:pb-14 md:pt-8">
          {breadcrumbs}
          <div className="flex max-w-[51.25rem] flex-col gap-5">{heroCopy}</div>

          <div className="faq-rise flex max-w-[42rem] flex-col gap-4 [--d:240ms]" role="search">
            <div className="flex h-14 items-center gap-3 rounded-md bg-white pl-4 pr-2 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.7)] focus-within:ring-[3px] focus-within:ring-[#7cc8ec] sm:h-[3.75rem] sm:pl-[1.125rem]">
              <Search className="h-5 w-5 flex-none text-[#1a7cb0]" strokeWidth={2} aria-hidden="true" />
              <label htmlFor="faq-search" className="sr-only">
                Search the FAQs
              </label>
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => search(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape" && query) {
                    e.preventDefault();
                    search("");
                  }
                }}
                placeholder="Search documents, GST, directors, registration..."
                autoComplete="off"
                enterKeyHint="search"
                className="h-full min-w-0 flex-1 border-0 bg-transparent text-base text-[#122640] outline-none placeholder:text-[#6b7a8c] focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => search("", true)}
                  aria-label="Clear search"
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-[4px] text-[#3a4656] transition-colors duration-200 hover:bg-[#e8f5fb] hover:text-[#122640]"
                >
                  <X className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-2.5 text-[0.8125rem] text-[#c9d6e3]">
              <span className="mr-1 font-semibold">Popular searches</span>
              {POPULAR_SEARCHES.map((label) => {
                const on = query.trim().toLowerCase() === label.toLowerCase();
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      search(on ? "" : label, true);
                      if (!on) scrollToList();
                    }}
                    className={cn(
                      "min-h-9 rounded-full border px-3.5 text-[0.8125rem] font-semibold transition-colors duration-200",
                      on
                        ? "border-white bg-white text-[#122640]"
                        : "border-white/25 bg-white/[0.04] text-white hover:border-white/60 hover:bg-white/10",
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="faq-rise border-t border-white/10 pt-7 [--d:320ms] md:pt-9">{stats}</div>
        </div>
      </section>

      <section id="faqs" aria-label="Frequently asked questions" className="scroll-mt-24">
        <div className="border-b border-[#e3e9ef] bg-white">
          <div className="faq-fade mx-auto max-w-[1240px] px-5 sm:px-8 [--d:200ms]">
            <div
              role="group"
              aria-label="Filter questions by topic"
              className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:-mx-8 sm:px-8"
            >
              {tabs.map((t) => {
                const on = topic === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={on}
                    onClick={(e) => chooseTopic(t.id, e.currentTarget)}
                    className={cn(
                      "relative flex min-h-14 flex-none items-center gap-2 whitespace-nowrap px-3.5 text-[0.9375rem] font-semibold transition-colors duration-200 focus-visible:outline-offset-[-3px]",
                      "after:absolute after:inset-x-3.5 after:bottom-0 after:h-[3px] after:rounded-t-sm after:transition-colors after:duration-200",
                      on
                        ? "text-[#122640] after:bg-[#1a7cb0]"
                        : "text-[#4a5668] after:bg-transparent hover:text-[#122640] hover:after:bg-[#cfd9e3]",
                    )}
                  >
                    {t.title}
                    <span
                      className={cn(
                        "min-w-6 rounded-full px-1.5 py-0.5 text-center text-xs font-bold tabular-nums",
                        on ? "bg-[#122640] text-white" : "bg-[#eef2f6] text-[#4a5668]",
                      )}
                    >
                      <span className="sr-only">, </span>
                      {counts[t.id]}
                      <span className="sr-only"> {counts[t.id] === 1 ? "question" : "questions"}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div ref={listRef} className="mx-auto max-w-[1240px] px-5 pb-16 pt-8 sm:px-8 md:pb-24 md:pt-10">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
            <div className="flex flex-wrap items-center gap-x-3 text-sm">
              <p aria-live="polite" className="font-semibold text-[#122640]">
                {resultLabel}
              </p>
              {searching ? (
                <button
                  type="button"
                  onClick={() => search("", true)}
                  className="link-target font-semibold text-[#1a7cb0] underline-offset-4 hover:underline"
                >
                  Clear search
                </button>
              ) : null}
            </div>
            {n > 0 ? (
              <button
                type="button"
                onClick={() => setOverrides(Object.fromEntries(visibleKeys.map((k) => [k, !allOpen])))}
                className="min-h-11 rounded-[4px] border-[1.5px] border-[#cfd9e3] bg-white px-4 text-sm font-semibold text-[#122640] transition-colors duration-200 hover:border-[#122640]"
              >
                {allOpen ? "Collapse all" : "Expand all"}
              </button>
            ) : null}
          </div>

          {n === 0 ? (
            <div className="mt-6 flex flex-col items-center gap-3 rounded-lg border border-dashed border-[#cfd9e3] px-6 py-12 text-center">
              <p className="text-xl font-bold text-[#122640]">
                {searching ? <>No answer matches “{query.trim()}”.</> : "No questions in this topic."}
              </p>
              <p className="max-w-[27.5rem] text-[0.9375rem] leading-[1.6]">
                Try a shorter word or another topic, or ask us directly.
              </p>
              <div className="mt-1 flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => search("", true)}
                  className="min-h-12 rounded-[4px] border-[1.5px] border-[#122640] bg-white px-[1.125rem] text-sm font-semibold text-[#122640] transition-colors duration-200 hover:bg-[#122640] hover:text-white"
                >
                  Clear search
                </button>
                <a
                  href={askHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("whatsapp_click", { label: "faqs_no_results" })}
                  className="inline-flex min-h-12 items-center rounded-[4px] bg-[#122640] px-[1.125rem] text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1a7cb0]"
                >
                  Ask on WhatsApp <span aria-hidden="true">&nbsp;→</span>
                </a>
              </div>
            </div>
          ) : null}

          {groups.map((g) => {
            const keys = g.faqs.map((_, k) => `${g.id}-${k}`);
            const shown = (topic === "all" || topic === g.id) && counts[g.id]! > 0;
            const Icon = ICONS[g.icon];
            return (
              <section
                key={g.id}
                id={g.id}
                aria-labelledby={`${g.id}-h`}
                hidden={!shown}
                className="grid scroll-mt-28 gap-6 border-t border-[#e3e9ef] py-10 md:py-14 lg:grid-cols-[18rem_1fr] lg:gap-16 [&[hidden]]:!hidden"
              >
                <header className="flex flex-col gap-3 lg:sticky lg:top-32 lg:self-start">
                  <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#e8f5fb]">
                      <Icon className="h-4 w-4 text-[#1a7cb0]" strokeWidth={2} aria-hidden="true" />
                    </span>
                    {g.sub}
                  </p>
                  <h2
                    id={`${g.id}-h`}
                    className="text-balance text-2xl font-bold leading-[1.15] tracking-[-0.02em] text-[#122640] sm:text-[1.875rem]"
                  >
                    {g.title}
                  </h2>
                  <p className="max-w-[34rem] text-[0.9375rem] leading-[1.65] text-[#4a5668]">{g.blurb}</p>
                  <p className="text-sm font-semibold text-[#122640]">
                    {searching
                      ? `${plural(counts[g.id]!, "match", "matches")} of ${g.faqs.length}`
                      : plural(g.faqs.length, "question", "questions")}
                  </p>
                  {g.href ? (
                    <Link
                      href={g.href}
                      className="group/link inline-block self-start py-1 text-sm font-bold text-[#1a7cb0] hover:text-[#122640]"
                    >
                      Learn more about {g.title} registration
                      <ArrowRight
                        className="ml-1.5 inline h-4 w-4 align-[-3px] transition-transform duration-200 group-hover/link:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  ) : null}
                </header>

                <ol className="min-w-0 border-b border-[#e3e9ef]">
                  {g.faqs.map((f, k) => {
                    const key = keys[k]!;
                    const open = isOpen(key);
                    return (
                      <li key={key} hidden={!matches(key)} className="border-t border-[#e3e9ef]">
                        <h3>
                          <button
                            type="button"
                            id={`${key}-q`}
                            aria-expanded={open}
                            aria-controls={`${key}-a`}
                            onClick={() => setOverrides((o) => ({ ...o, [key]: !open }))}
                            className="group/q flex w-full items-start gap-3.5 rounded-[4px] py-5 text-left focus-visible:outline-offset-[-3px] sm:gap-4 sm:py-6"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.2rem] w-6 flex-none text-xs font-bold tabular-nums text-[#1a7cb0]"
                            >
                              {String(k + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 text-base font-semibold leading-[1.45] text-[#122640] transition-colors duration-200 group-hover/q:text-[#1a7cb0] sm:text-[1.0625rem]">
                              {f.q}
                            </span>
                            <span
                              aria-hidden="true"
                              className={cn(
                                "-mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border transition-colors duration-200",
                                open
                                  ? "border-[#122640] bg-[#122640] text-white"
                                  : "border-[#cfd9e3] bg-white text-[#122640] group-hover/q:border-[#1a7cb0]",
                              )}
                            >
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform duration-[250ms] ease-out",
                                  open && "rotate-180",
                                )}
                                strokeWidth={2.25}
                              />
                            </span>
                          </button>
                        </h3>
                        <div id={`${key}-a`} data-open={open} className="faq-panel">
                          <div>
                            <div className="flex max-w-[44rem] flex-col gap-3 pb-6 pl-[2.375rem] pr-2 sm:pl-10 sm:pr-12">
                              <p className="text-pretty text-[0.9375rem] leading-[1.8] text-[#3a4656] sm:text-base/[1.8]">
                                {f.a}
                              </p>
                              {f.link ? (
                                <Link
                                  href={f.link.href}
                                  className="group/link link-target gap-1.5 self-start text-sm font-semibold text-[#1a7cb0] hover:text-[#122640]"
                                >
                                  {f.link.label}
                                  <ArrowRight
                                    className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
                                    aria-hidden="true"
                                  />
                                </Link>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}
