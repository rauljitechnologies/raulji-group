"use client";

import { useEffect } from "react";

/**
 * The motion layer shared by the claude.ai/design "Raulji" pages (Services,
 * FAQs), ported from their common `fx()`:
 * scroll progress bar, drifting hero glow, hero entrance and tilt on the page
 * index, cursor spotlight on `[data-spot]` cards, parallax on
 * `[data-parallax]` frames, and a staggered reveal as sections scroll in.
 *
 * Everything here is decoration on top of a page that is complete without
 * it: nothing renders until this runs, content below the fold is only hidden
 * once an observer is ready to reveal it, and under prefers-reduced-motion
 * only the progress bar and spotlight remain, as in the design.
 */

const EZ = "cubic-bezier(.2,.7,.2,1)";

export function PageFx({ rootId, revealFrom = 1 }: { rootId: string; revealFrom?: number }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const $ = <T extends Element = HTMLElement>(q: string) => root.querySelector<T & HTMLElement>(q);
    const $$ = (q: string) => [...root.querySelectorAll<HTMLElement>(q)];
    const cleanup: (() => void)[] = [];
    const on = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement | Window,
      type: K,
      fn: (e: HTMLElementEventMap[K]) => void,
      opts?: AddEventListenerOptions,
    ) => {
      el.addEventListener(type, fn as EventListener, opts);
      cleanup.push(() => el.removeEventListener(type, fn as EventListener));
    };

    // Progress bar and parallax.
    const bar = $("[data-progress]");
    const frames = $$("[data-parallax]");
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (bar) bar.style.transform = `scaleX(${p})`;
      if (!reduce)
        frames.forEach((el) => {
          const r = el.parentElement!.getBoundingClientRect();
          const o = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
          el.style.transform = `translate(${o * -28}px,${o * 28}px)`;
        });
    };
    on(window, "scroll", onScroll, { passive: true });
    onScroll();

    // Cursor spotlight.
    $$("[data-spot]").forEach((el) => {
      const dark = el.dataset.spot === "dark";
      const col = dark ? "rgba(124,200,236,.20)" : "rgba(50,159,210,.14)";
      on(el, "mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.backgroundImage = `radial-gradient(380px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px,${col},transparent 62%)`;
      });
      on(el, "mouseleave", () => {
        el.style.backgroundImage = "";
      });
    });

    if (reduce) return () => cleanup.forEach((f) => f());

    const anims: Animation[] = [];

    // Hero: copy entrance, index entrance and tilt.
    const copy = $("[data-hero-copy]");
    if (copy)
      [...copy.children].forEach((c, i) =>
        anims.push(
          c.animate(
            i === 1
              ? [
                  { opacity: 0, transform: "translateY(48px)", clipPath: "inset(0 0 100% 0)" },
                  { opacity: 1, transform: "none", clipPath: "inset(0 0 -20% 0)" },
                ]
              : [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "none" }],
            { duration: i === 1 ? 1100 : 800, delay: 100 + i * 120, easing: EZ, fill: "backwards" },
          ),
        ),
      );
    const index = $("[data-hero-index]");
    if (index) {
      index.style.transition = `transform .5s ${EZ}`;
      const host = index.parentElement!;
      on(host, "mousemove", (e) => {
        const r = index.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        index.style.transform = `perspective(1000px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg)`;
      });
      on(host, "mouseleave", () => {
        index.style.transform = "";
      });
      [...index.children].forEach((c, i) =>
        anims.push(
          c.animate(
            [{ opacity: 0, transform: "translateY(18px) scale(.96)" }, { opacity: 1, transform: "none" }],
            { duration: 800, delay: 550 + i * 150, easing: EZ, fill: "backwards" },
          ),
        ),
      );
    }

    // Hero glow drift.
    const orb1 = $("[data-orb='1']");
    const orb2 = $("[data-orb='2']");
    const dots = $("[data-dots]");
    if (orb1)
      anims.push(
        orb1.animate(
          [{ transform: "translate(0,0) scale(1)" }, { transform: "translate(-80px,60px) scale(1.12)" }],
          { duration: 9000, direction: "alternate", iterations: Infinity, easing: "ease-in-out" },
        ),
      );
    if (orb2)
      anims.push(
        orb2.animate([{ transform: "translate(0,0)" }, { transform: "translate(90px,-50px)" }], {
          duration: 11000,
          direction: "alternate",
          iterations: Infinity,
          easing: "ease-in-out",
        }),
      );
    if (dots)
      anims.push(
        dots.animate([{ backgroundPosition: "0 0" }, { backgroundPosition: "44px 44px" }], {
          duration: 8000,
          iterations: Infinity,
        }),
      );

    // Staggered reveal of the sections from `revealFrom` on, for whatever starts below the fold.
    const sections = [...root.querySelectorAll(":scope > section")].slice(revealFrom);
    let targets: HTMLElement[] = [];
    sections.forEach((sec) =>
      sec
        .querySelectorAll<HTMLElement>("h2,p,figure,li,article,a[href]")
        .forEach((el) => targets.push(el)),
    );
    const set = new Set(targets);
    targets = targets.filter((el) => {
      for (let p = el.parentElement; p && p !== root; p = p.parentElement) if (set.has(p as HTMLElement)) return false;
      return el.getBoundingClientRect().top > innerHeight * 0.9;
    });
    targets.forEach((el) => (el.style.opacity = "0"));
    const io = new IntersectionObserver(
      (entries) => {
        let k = 0;
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((e) => {
            const el = e.target as HTMLElement;
            const fig = el.tagName === "FIGURE";
            el.style.opacity = "";
            el.animate(
              fig
                ? [
                    { opacity: 0, clipPath: "inset(12% 12% 12% 12% round 6px)", transform: "scale(.96)" },
                    { opacity: 1, clipPath: "inset(0 0 0 0 round 0px)", transform: "none" },
                  ]
                : [{ opacity: 0, transform: "translateY(36px)" }, { opacity: 1, transform: "none" }],
              { duration: fig ? 1200 : 850, delay: k++ * 85, easing: EZ, fill: "backwards" },
            );
            io.unobserve(el);
          });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    targets.forEach((el) => io.observe(el));

    return () => {
      cleanup.forEach((f) => f());
      anims.forEach((a) => a.cancel());
      io.disconnect();
      targets.forEach((el) => (el.style.opacity = ""));
    };
  }, [rootId, revealFrom]);

  return null;
}
