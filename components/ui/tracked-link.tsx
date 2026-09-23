"use client";

import Link from "next/link";
import { track, type EventParams } from "@/lib/analytics";

/**
 * A link that reports one analytics event when it is followed.
 *
 * Exists because most pages here are server components, and master rule 29 asks
 * for gujarat_page_click and technology_click on links that live inside them.
 * Rather than convert a whole page to a client component for one handler, the
 * individual link becomes the client boundary.
 *
 * Use it only for the events the client's analytics spec actually names. A
 * tracked link on everything is how a dataLayer becomes unreadable.
 */
export function TrackedLink({
  href,
  event,
  params,
  external,
  children,
  className,
}: {
  href: string;
  event: Parameters<typeof track>[0];
  params?: EventParams;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const onClick = () => track(event, params);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
