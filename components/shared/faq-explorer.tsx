"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, CircleHelp, Link2, Search, User, Users, type LucideIcon } from "lucide-react";

import { track } from "@/lib/analytics";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The FAQs page's search, topic filter and accordion, from the "Raulji FAQs"
 * design (claude.ai/design).
 *
 * Every answer is rendered into the HTML whether or not its row is open, using
 * the `hidden` attribute rather than leaving it out, so the page's visible
 * content always matches its FAQPage schema and a reader without JavaScript
 * still has every answer in the source.
 */

export interface FaqGroup {
  id: string;
  title: string;
  sub: string;
  href: string | null;
  icon: "general" | "pvt" | "llp" | "partnership" | "proprietorship";
  faqs: { q: string; a: string }[];
}

const ICONS: Record<FaqGroup["icon"], LucideIcon> = {
  general: CircleHelp,
  pvt: Briefcase,
  llp: Link2,
  partnership: Users,
  proprietorship: User,
};

const POPULAR = ["Documents", "Cost", "GST", "Directors", "Convert"];

function scrollToList() {
  setTimeout(() => {
    const el = document.getElementById("faqs");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  }, 30);
}

export function FaqSearch({
  query,
  onQuery,
}: {
  query: string;
  /** `reset` also returns the topic filter to all questions, as Clear and the chips do. */
  onQuery: (q: string, reset?: boolean) => void;
}) {
  return (
    <>
      <label className="mt-2 flex h-[3.75rem] max-w-[40rem] items-center gap-3 rounded-md bg-white pl-[1.125rem] pr-2 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]">
        <Search className="h-5 w-5 flex-none text-[#1a7cb0]" strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">Search FAQs</span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search, e.g. documents, GST, directors"
          className="h-full min-w-0 flex-1 border-0 bg-transparent text-base text-[#122640] outline-none placeholder:text-[#8795a6]"
        />
        {query.trim() ? (
          <button
            type="button"
            onClick={() => onQuery("", true)}
            className="flex-none rounded-[4px] bg-[#e8f5fb] px-3.5 py-2.5 text-[0.8125rem] font-bold text-[#122640]"
          >
            Clear
          </button>
        ) : null}
      </label>
      <div className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-[#c9d6e3]">
        <span>Popular:</span>
        {POPULAR.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              onQuery(label, true);
              scrollToList();
            }}
            className="min-h-9 rounded-2xl border border-white/20 bg-white/[0.04] px-3 py-2 text-[0.8125rem] font-semibold text-white transition duration-200 hover:bg-white hover:text-[#122640]"
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}

/**
 * Owns the search state, so it renders the hero too: the search box sits at
 * the end of the hero copy, which is where the design has it, and drives the
 * list below. The breadcrumbs and copy are passed in from the server page.
 */
export function FaqExplorer({
  groups,
  breadcrumbs,
  heroCopy,
  aside,
}: {
  groups: FaqGroup[];
  breadcrumbs: React.ReactNode;
  heroCopy: React.ReactNode;
  aside: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [open, setOpen] = useState<Record<string, boolean>>({ [`${groups[0]?.id}-0`]: true });
  const [all, setAll] = useState(false);

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = (f: { q: string; a: string }) =>
    terms.every((t) => `${f.q} ${f.a}`.toLowerCase().includes(t));

  const onQuery = (q: string, reset = false) => {
    setQuery(q);
    if (reset) setTopic("all");
  };

  const shown = groups
    .filter((g) => topic === "all" || g.id === topic)
    .map((g) => ({ ...g, items: g.faqs.map((f, k) => ({ ...f, k })).filter(matches) }))
    .filter((g) => g.items.length);
  const n = shown.reduce((sum, g) => sum + g.items.length, 0);
  const topicName = groups.find((g) => g.id === topic)?.title;
  const resultLabel =
    (n === 1 ? "1 question" : `${n} questions`) +
    (topic !== "all" ? ` in ${topicName}` : "") +
    (terms.length ? ` matching “${query.trim()}”` : "");
  const askHref = whatsappHref(
    `Hello Raulji Group, I have a question about business registration${terms.length ? `: ${query.trim()}` : "."}`,
  );

  const topics = [{ id: "all", title: "All questions" }, ...groups].map((t) => ({
    id: t.id,
    title: t.title,
    count:
      t.id === "all"
        ? groups.reduce((sum, g) => sum + g.faqs.filter(matches).length, 0)
        : groups.find((g) => g.id === t.id)!.faqs.filter(matches).length,
  }));

  return (
    <>
      <section
        aria-labelledby="faq-h1"
        className="relative overflow-hidden bg-[#0c1a2d] pt-[5.5rem] text-white sm:pt-24"
      >
        <div
          data-orb="1"
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-56 h-[38.75rem] w-[38.75rem] rounded-full bg-[radial-gradient(circle,rgba(50,159,210,0.32),rgba(50,159,210,0)_65%)]"
        />
        <div
          data-orb="2"
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-52 -left-44 h-[26.25rem] w-[26.25rem] rounded-full bg-[radial-gradient(circle,rgba(26,124,176,0.28),rgba(26,124,176,0)_65%)]"
        />
        <div
          data-dots
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(50,159,210,0.22)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(90deg,transparent_30%,#000_100%)]"
        />
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-7 px-5 pb-12 pt-6 sm:px-8 md:gap-11 md:pb-20 md:pt-8">
          {breadcrumbs}
          <div data-hero-copy className="flex max-w-[51.25rem] flex-col gap-5">
            {heroCopy}
            <FaqSearch query={query} onQuery={onQuery} />
          </div>
        </div>
      </section>

      <section id="faqs" aria-label="Frequently asked questions" className="scroll-mt-20 pb-16 pt-10 md:pb-28 md:pt-16">
        <div className="mx-auto grid max-w-[1240px] items-start gap-10 px-5 sm:px-8 lg:grid-cols-[17.5rem_1fr] lg:gap-[4.5rem]">
          <aside className="flex min-w-0 flex-col gap-3.5 lg:sticky lg:top-24">
            <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a7cb0]">
              <span className="h-0.5 w-7 flex-none bg-[#329fd2]" aria-hidden="true" />
              Topics
            </p>
            <nav aria-label="FAQ topics" className="flex flex-col gap-1.5">
              {topics.map((t) => {
                const on = topic === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setTopic(t.id);
                      scrollToList();
                    }}
                    className={cn(
                      "flex min-h-12 items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-[0.9375rem] font-semibold transition duration-200 hover:translate-x-1 hover:border-[#329fd2]",
                      on ? "border-[#122640] bg-[#122640] text-white" : "border-[#e3e9ef] bg-white text-[#122640]",
                    )}
                  >
                    <span>{t.title}</span>
                    <span
                      className={cn(
                        "min-w-7 rounded-[10px] px-2 py-0.5 text-center text-xs font-bold",
                        on ? "bg-[#7cc8ec]/20 text-[#7cc8ec]" : "bg-[#e8f5fb] text-[#1a7cb0]",
                      )}
                    >
                      {t.count}
                    </span>
                  </button>
                );
              })}
            </nav>
            {aside}
          </aside>

          <div className="flex min-w-0 flex-col gap-10 md:gap-14">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e3e9ef] pb-4">
              <p aria-live="polite" className="text-sm text-[#5b6778]">
                <strong className="text-[#122640]">{resultLabel}</strong>
              </p>
              <button
                type="button"
                onClick={() => {
                  setAll((a) => !a);
                  setOpen({});
                }}
                className="min-h-11 rounded-[4px] border-[1.5px] border-[#cfd9e3] bg-white px-4 text-sm font-semibold text-[#122640] transition duration-200 hover:border-[#122640] hover:bg-[#122640] hover:text-white"
              >
                {all ? "Collapse all" : "Expand all"}
              </button>
            </div>

            {n === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-[#cfd9e3] px-7 py-12 text-center">
                <p className="text-xl font-bold text-[#122640]">No answer matches “{query.trim()}”.</p>
                <p className="max-w-[27.5rem] text-[0.9375rem] leading-[1.6]">
                  Try a shorter word, or ask us directly.
                </p>
                <div className="flex flex-wrap justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onQuery("", true)}
                    className="min-h-12 rounded-[4px] border-[1.5px] border-[#122640] bg-white px-[1.125rem] text-sm font-semibold text-[#122640]"
                  >
                    Clear search
                  </button>
                  <a
                    href={askHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("whatsapp_click", { label: "faqs_no_results" })}
                    className="inline-flex min-h-12 items-center rounded-[4px] bg-[#122640] px-[1.125rem] text-sm font-semibold text-white"
                  >
                    Ask on WhatsApp <span aria-hidden="true">&nbsp;→</span>
                  </a>
                </div>
              </div>
            ) : null}

            {groups.map((g) => {
              const group = shown.find((s) => s.id === g.id);
              const Icon = ICONS[g.icon];
              return (
                <section
                  key={g.id}
                  id={g.id}
                  aria-labelledby={`${g.id}-h`}
                  hidden={!group}
                  className="flex scroll-mt-24 flex-col gap-[1.125rem] [&[hidden]]:!hidden"
                >
                  <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                    <div className="flex items-center gap-4">
                      <span className="flex h-[3.25rem] w-[3.25rem] flex-none items-center justify-center rounded-full bg-[#122640]">
                        <Icon className="h-6 w-6 text-[#7cc8ec]" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#1a7cb0]">{g.sub}</span>
                        <h2
                          id={`${g.id}-h`}
                          className="text-2xl font-extrabold tracking-[-0.02em] text-[#122640] sm:text-[2rem]"
                        >
                          {g.title}
                        </h2>
                      </div>
                    </div>
                    {g.href ? (
                      <Link href={g.href} className="text-sm font-bold text-[#1a7cb0] hover:underline">
                        Full {g.title} guide <span aria-hidden="true">→</span>
                      </Link>
                    ) : null}
                  </div>
                  <ol className="flex flex-col gap-2.5">
                    {g.faqs.map((f, k) => {
                      const key = `${g.id}-${k}`;
                      const visible = !!group?.items.some((i) => i.k === k);
                      const isOpen = all || terms.length > 0 || !!open[key];
                      return (
                        <li
                          key={key}
                          hidden={!visible}
                          data-spot="light"
                          className={cn(
                            "rounded-lg border bg-white transition-[border-color,box-shadow] duration-300",
                            isOpen
                              ? "border-[#329fd2] shadow-[0_18px_40px_-28px_rgba(18,38,64,0.45)]"
                              : "border-[#e3e9ef]",
                          )}
                        >
                          <h3>
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              aria-controls={`${key}-a`}
                              onClick={() => {
                                setAll(false);
                                setOpen((o) => ({ ...o, [key]: !isOpen }));
                              }}
                              className="flex w-full items-center justify-between gap-4 px-[1.375rem] py-5 text-left text-[#122640] hover:text-[#1a7cb0]"
                            >
                              <span className="flex items-baseline gap-3.5">
                                <span className="min-w-[1.375rem] text-xs font-bold text-[#329fd2]">
                                  {String(k + 1).padStart(2, "0")}
                                </span>
                                <span className="text-[1.0625rem] font-bold leading-[1.4]">{f.q}</span>
                              </span>
                              <span
                                aria-hidden="true"
                                className={cn(
                                  "flex h-8 w-8 flex-none items-center justify-center rounded-full text-lg transition-[transform,background-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)]",
                                  isOpen ? "rotate-45 bg-[#122640] text-white" : "bg-[#e8f5fb] text-[#1a7cb0]",
                                )}
                              >
                                +
                              </span>
                            </button>
                          </h3>
                          <p
                            id={`${key}-a`}
                            hidden={!isOpen}
                            className="text-pretty pb-[1.375rem] pl-[3.625rem] pr-[1.375rem] text-[0.9375rem] leading-[1.8] text-[#3a4656]"
                          >
                            {f.a}
                          </p>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
