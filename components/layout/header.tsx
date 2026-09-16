"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, Mail, ExternalLink } from "lucide-react";
import { NAV, PRIMARY_CTA, type NavGroup, type NavLink } from "@/lib/nav";
import { useLocationDrawer } from "@/components/shared/location-drawer";
import { SITE, telHref, mailHref } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import logo from "@/public/raulji-group-logo.png";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Route change closes everything, so the menu never survives navigation.
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Escape closes the mega menu, and focus leaving the nav closes it too.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href?: string) =>
    !!href && (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-card/95 backdrop-blur-lg">
      {/* Contact bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container-wide flex items-center justify-between gap-4 py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <a
              href={telHref}
              onClick={() => track("phone_click", { label: "header_bar" })}
              className="flex min-h-[1.75rem] items-center gap-1.5 py-1 hover:text-primary"
            >
              <Phone className="h-3 w-3" aria-hidden="true" />
              {SITE.phone.display}
            </a>
            <a
              href={mailHref}
              onClick={() => track("email_click", { label: "header_bar" })}
              className="hidden min-h-[1.75rem] items-center gap-1.5 py-1 hover:text-primary sm:flex"
            >
              <Mail className="h-3 w-3" aria-hidden="true" />
              {SITE.email}
            </a>
          </div>
          <span className="hidden md:block">Business registration support across Gujarat</span>
        </div>
      </div>

      <div className="container-wide flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${SITE.name} home`}>
          <Image
            src={logo}
            alt={`${SITE.name} logo`}
            priority
            className="h-9 w-auto sm:h-11"
            sizes="180px"
          />
        </Link>

        {/* Desktop mega menu */}
        <nav aria-label="Main" className="hidden lg:block" ref={navRef}>
          <ul
            className="flex items-center gap-1"
            onMouseLeave={() => setOpenGroup(null)}
          >
            {NAV.map((group) => (
              <MegaMenuItem
                key={group.name}
                group={group}
                open={openGroup === group.name}
                active={isActive(group.href)}
                onOpen={() => setOpenGroup(group.name)}
                onClose={() => setOpenGroup(null)}
              />
            ))}
            <li>
              <Link
                href="/contact/"
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  isActive("/contact/")
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-secondary",
                )}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            href={PRIMARY_CTA.href}
            onClick={() => track("primary_cta_click", { label: "header" })}
            className="brand-gradient inline-flex h-11 items-center rounded-lg px-5 text-sm font-semibold text-primary-foreground shadow-soft transition-shadow hover:shadow-elevated"
          >
            {PRIMARY_CTA.name}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-secondary lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? <MobileMenu onNavigate={() => setMobileOpen(false)} /> : null}
    </header>
  );
}

function MegaMenuItem({
  group,
  open,
  active,
  onOpen,
  onClose,
}: {
  group: NavGroup;
  open: boolean;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  // A group with no children is a plain top-level link. Rendering it as a
  // disclosure button with an empty panel would be a dead control, and an
  // aria-expanded button that reveals nothing is worse than no button.
  if (!group.links.length && group.href) {
    return (
      <li>
        <Link
          href={group.href}
          className={cn(
            "block rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            active
              ? "bg-accent text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-secondary",
          )}
        >
          {group.name}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onClose();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => (open ? onClose() : onOpen())}
        className={cn(
          "flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
          active || open
            ? "bg-accent text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-secondary",
        )}
      >
        {group.name}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {/*
        Centred on the trigger rather than left-aligned to it.

        Left-aligned, the 42rem Services panel ran 82px past the right edge of a
        1024px viewport, which is a width the master rules require us to test.
        Centring keeps every panel inside the viewport from 1024 up, and the
        max-width clamp is the backstop if a wider panel is ever added.

        The centring transform sits on the outer element and the open/close
        transform on the inner one, because putting both on the same element
        would mean the enter animation fights the centring.
      */}
      <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
        <div
          className={cn(
            "transition-all duration-150",
            open ? "visible opacity-100" : "invisible -translate-y-1 opacity-0",
          )}
        >
        <div
          className={cn(
            "max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-card p-3 shadow-elevated",
            group.feature ? "grid w-[42rem] grid-cols-[1fr_16rem] gap-3" : "w-[22rem]",
          )}
        >
          <ul className="space-y-0.5">
            {group.links.map((link) => (
              <li key={link.name}>
                <MegaMenuLink link={link} onNavigate={onClose} />
              </li>
            ))}
          </ul>

          {group.feature ? (
            <div className="flex flex-col justify-between rounded-xl bg-accent p-4">
              <div>
                <p className="text-sm font-semibold text-accent-foreground">{group.feature.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-accent-foreground/80">
                  {group.feature.body}
                </p>
              </div>
              <Link
                href={group.feature.href}
                className="link-target mt-4 text-xs font-semibold text-primary underline-offset-4 hover:underline"
              >
                {group.feature.cta} &rarr;
              </Link>
            </div>
          ) : null}
        </div>
        </div>
      </div>
    </li>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      id="mobile-menu"
      className="max-h-[calc(100dvh-7rem)] overflow-y-auto border-t border-border bg-card lg:hidden"
    >
      <nav aria-label="Mobile" className="container-wide py-4">
        <Link
          href={PRIMARY_CTA.href}
          onClick={() => track("primary_cta_click", { label: "mobile_menu" })}
          className="brand-gradient mb-4 flex min-h-[3rem] items-center justify-center rounded-xl px-5 font-semibold text-primary-foreground"
        >
          {PRIMARY_CTA.name}
        </Link>

        <ul className="divide-y divide-border">
          {NAV.map((group) =>
            // Same reasoning as the desktop menu: no children means a plain link.
            !group.links.length && group.href ? (
              <li key={group.name}>
                <Link
                  href={group.href}
                  onClick={onNavigate}
                  className="flex min-h-[3.25rem] items-center font-semibold text-secondary"
                >
                  {group.name}
                </Link>
              </li>
            ) : (
            <li key={group.name}>
              <details className="group" name="mobile-nav">
                <summary className="flex min-h-[3.25rem] cursor-pointer list-none items-center justify-between font-semibold text-secondary marker:hidden">
                  {group.name}
                  <ChevronDown
                    className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <ul className="pb-3">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <MobileMenuLink link={link} onNavigate={onNavigate} />
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            ),
          )}
          <li>
            <Link
              href="/contact/"
              onClick={onNavigate}
              className="flex min-h-[3.25rem] items-center font-semibold text-secondary"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
          <a href={telHref} className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
            {SITE.phone.display}
          </a>
          <a href={mailHref} className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
            {SITE.email}
          </a>
        </div>
      </nav>
    </div>
  );
}

/**
 * A nav entry is either a link or a drawer trigger (spec section 23).
 * Both render as real interactive elements: an `<a>` when there is a URL, a
 * `<button>` when the entry opens the location drawer.
 */
function MegaMenuLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const { open } = useLocationDrawer();
  const className = "block w-full rounded-xl px-3 py-2.5 text-left hover:bg-muted";

  const body = (
    <>
      <span className="flex items-center gap-1.5 text-sm font-semibold text-secondary">
        {link.name}
        {link.external ? (
          <ExternalLink className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
        ) : null}
      </span>
      {link.description ? (
        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
          {link.description}
        </span>
      ) : null}
    </>
  );

  if (link.action === "locations" || !link.href) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          onNavigate();
          open("header_menu");
        }}
      >
        {body}
      </button>
    );
  }

  return (
    <Link
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {body}
    </Link>
  );
}

function MobileMenuLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const { open } = useLocationDrawer();
  const className =
    "flex min-h-[2.75rem] w-full items-center rounded-lg px-3 text-left text-sm text-muted-foreground hover:bg-muted hover:text-secondary";

  if (link.action === "locations" || !link.href) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          onNavigate();
          open("mobile_menu");
        }}
      >
        {link.name}
      </button>
    );
  }

  return (
    <Link
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {link.name}
    </Link>
  );
}
