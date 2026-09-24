import Image from "next/image";

import type { Client } from "@/lib/clients";
import { cn } from "@/lib/utils";

/**
 * The client wall: rows of logos that drift sideways on their own.
 *
 * CSS only. A JS marquee would mean a client component, a resize listener and
 * a rAF loop on a page whose entire job is to show 37 static images, so the
 * track simply holds each row twice and animates to -50%: the seam lands
 * exactly where the second copy begins and the loop cannot be seen.
 *
 * Logos sit in grey and take their colour on hover, as in the "Raulji Our
 * Clients" design, so the wall reads as one calm band rather than 37 brands
 * competing for attention.
 *
 * Three things keep it from being the sort of animation the brand rules rule
 * out (master rule 24). It is slow enough to read as a drift rather than a
 * carousel. It stops on hover and on keyboard focus, so nobody has to chase a
 * logo they want to look at. And `motion-reduce` turns it off completely and
 * hands the row back as an ordinary horizontal scroller, so a reader who has
 * asked their system for less motion still reaches every client.
 *
 * Only the first copy of each row carries alt text; the duplicate is hidden
 * from assistive technology so the wall is not read out twice. The full list
 * of names is on the page as text regardless, which is what actually gets
 * indexed and what a screen reader is meant to land on.
 */
export function ClientWall({ rows, className }: { rows: Client[][]; className?: string }) {
  return (
    <div
      className={cn(
        // Fades the logos out into the page at both edges instead of letting
        // them collide with a hard border mid-word.
        "group/wall relative space-y-4 [mask-image:linear-gradient(to_right,transparent,black_6rem,black_calc(100%-6rem),transparent)]",
        className,
      )}
    >
      {rows.map((row, i) => (
        <div key={i} className="overflow-hidden motion-reduce:overflow-x-auto">
          <div
            className={cn(
              // No gap anywhere in the track: the spacing is a right margin on
              // each tile instead. With gap, the two copies plus the gap
              // between them are not exactly twice one copy, so -50% lands half
              // a gap short and the loop visibly jumps once per cycle.
              "flex w-max",
              i % 2 === 1 ? "animate-marquee-reverse" : "animate-marquee",
              "group-hover/wall:[animation-play-state:paused]",
              "group-focus-within/wall:[animation-play-state:paused]",
              "motion-reduce:animate-none",
            )}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex" aria-hidden={copy === 1 ? true : undefined}>
                {row.map((client) => (
                  <div
                    key={client.slug}
                    className="group/tile mr-4 flex h-[5.5rem] w-[10.5rem] shrink-0 items-center justify-center rounded-md border border-[#e3e9ef] bg-white px-[1.375rem] py-[1.125rem] transition duration-300 hover:-translate-y-1 hover:border-[#329fd2] hover:shadow-[0_14px_28px_-16px_rgba(18,38,64,0.35)] sm:h-[6.5rem] sm:w-[12.5rem]"
                  >
                    <Image
                      src={client.logo}
                      alt={copy === 0 ? `${client.name} logo` : ""}
                      sizes="(min-width: 640px) 12.5rem, 10.5rem"
                      loading={copy === 0 ? "eager" : "lazy"}
                      className="max-h-full w-auto max-w-full object-contain opacity-75 grayscale transition duration-300 group-hover/tile:opacity-100 group-hover/tile:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
