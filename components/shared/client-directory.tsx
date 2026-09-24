"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

export interface DirectoryClient {
  slug: string;
  name: string;
  logo: StaticImageData;
}

function letterOf(name: string) {
  return /^[a-z]/i.test(name) ? name[0].toUpperCase() : "#";
}

/**
 * "Every client, alphabetically" from the "Raulji Our Clients" design: a name
 * search and a Logos / A to Z switch over the same list.
 *
 * Both views are server-rendered in full on first load (the default is the logo
 * grid, whose tiles carry the names as text), so every client name is in the
 * HTML before any JavaScript runs. The search only narrows what is there.
 */
export function ClientDirectory({ clients }: { clients: DirectoryClient[] }) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const q = query.trim().toLowerCase();
  const shown = useMemo(
    () => (q ? clients.filter((client) => client.name.toLowerCase().includes(q)) : clients),
    [clients, q],
  );

  const groups = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const client of shown) {
      const letter = letterOf(client.name);
      map.set(letter, [...(map.get(letter) ?? []), client.name]);
    }
    return [...map.entries()];
  }, [shown]);

  const label = q
    ? `${shown.length} of ${clients.length} clients match “${query.trim()}”`
    : `${clients.length} clients, A to Z`;

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-[#e3e9ef] bg-[#f4f7fa] p-4">
        <div className="relative max-w-[26.25rem] flex-[1_1_17.5rem]">
          <label htmlFor="client-search" className="sr-only">
            Search clients
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-[#1a7cb0]"
            strokeWidth={2}
            aria-hidden="true"
          />
          <input
            id="client-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a business name"
            className="h-12 w-full rounded-[4px] border border-[#cfd9e3] bg-white pl-[2.625rem] pr-3.5 text-[0.9375rem] text-[#122640] transition hover:border-[#329fd2] focus:border-[#329fd2] focus:shadow-[0_0_0_3px_rgba(50,159,210,0.18)] focus:outline-none"
          />
        </div>
        <div
          role="group"
          aria-label="View"
          className="flex rounded-[4px] border border-[#cfd9e3] bg-white p-[3px]"
        >
          {(
            [
              ["grid", "Logos"],
              ["list", "A–Z list"],
            ] as const
          ).map(([key, text]) => (
            <button
              key={key}
              type="button"
              aria-pressed={view === key}
              onClick={() => setView(key)}
              className={cn(
                "min-h-[2.5rem] rounded-[3px] px-4 text-sm font-semibold transition-colors",
                view === key ? "bg-[#122640] text-white" : "text-[#122640] hover:bg-[#f4f7fa]",
              )}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="text-sm font-semibold text-[#122640]">
        {label}
      </p>

      {shown.length === 0 ? (
        <div className="rounded-md border border-dashed border-[#cfd9e3] p-10 text-center">
          <p className="text-base font-semibold text-[#122640]">No client matches that name.</p>
        </div>
      ) : view === "grid" ? (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {shown.map((client) => (
            <li
              key={client.slug}
              className="group flex flex-col overflow-hidden rounded-md border border-[#e3e9ef] bg-white transition duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[5px] hover:border-[#329fd2] hover:shadow-[0_20px_40px_-22px_rgba(18,38,64,0.4)]"
            >
              <div className="flex h-[6.875rem] items-center justify-center px-[1.375rem] py-5">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  sizes="(min-width: 1024px) 12rem, 45vw"
                  className="max-h-full w-auto max-w-full object-contain transition-transform duration-[400ms] group-hover:scale-[1.06]"
                />
              </div>
              <p className="flex justify-between gap-2 border-t border-[#eef2f6] px-4 py-3 text-[0.8125rem] font-semibold text-[#122640]">
                <span>{client.name}</span>
                <span className="text-[#9aa7b5]" aria-hidden="true">
                  {letterOf(client.name)}
                </span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map(([letter, names]) => (
            <div key={letter} className="flex items-start gap-[1.125rem]">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#122640] text-[1.0625rem] font-extrabold text-white"
              >
                {letter}
              </span>
              <ul className="flex flex-col gap-2 pt-2.5">
                {names.map((name) => (
                  <li
                    key={name}
                    className="text-base font-semibold text-[#122640] transition duration-200 hover:translate-x-1 hover:text-[#1a7cb0]"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
