"use client";

import { MessageCircle } from "lucide-react";

import { track } from "@/lib/analytics";

/**
 * The WhatsApp button for health insurance enquiries.
 *
 * The anchor carries the wa.me link, which opens the app on a phone and works
 * without JavaScript. On a desktop with a mouse, the click goes to WhatsApp Web
 * instead, which opens the chat directly rather than via wa.me's landing page.
 */
export function HealthInsuranceWhatsApp({
  app,
  web,
  label,
  trackingLabel,
  className,
}: {
  app: string;
  web: string;
  label: string;
  trackingLabel: string;
  className?: string;
}) {
  return (
    <a
      href={app}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => {
        track("whatsapp_click", { label: trackingLabel });
        const desktop =
          window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
          !/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
        if (desktop) {
          e.preventDefault();
          window.open(web, "_blank", "noopener,noreferrer");
        }
      }}
    >
      <MessageCircle className="h-[1.125rem] w-[1.125rem] shrink-0" aria-hidden="true" />
      {label}
    </a>
  );
}
