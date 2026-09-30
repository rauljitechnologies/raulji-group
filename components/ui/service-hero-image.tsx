import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { BrandImage } from "@/components/ui/brand-image";
import { SERVICE_PHOTOS, SERVICE_PHOTO_DIR } from "@/lib/service-photos";
import { cn } from "@/lib/utils";

/**
 * Service page photographs.
 *
 * A slot resolves only when its file is in public/photos/services/. The check
 * runs on the server at build time, which is when these pages are generated,
 * so dropping a photograph in and rebuilding is the whole handover. A static
 * import would fail the build for a file that does not exist yet.
 *
 * Every photograph renders through next/image with `fill` inside a fixed
 * aspect-ratio box: AVIF or WebP at the widths in the srcset, no layout shift,
 * lazy below the fold, and `priority` only on the hero, which is the LCP
 * element.
 */

export interface ResolvedPhoto {
  src: string;
  alt: string;
}

/**
 * Not cached: it is a stat call at build time, and a cache would hide a newly
 * added photograph from a running dev server.
 */
export function resolvePhoto(page: string, slot: string): ResolvedPhoto | null {
  const photo = SERVICE_PHOTOS[page]?.photos[slot];
  if (!photo) return null;
  const found = fs.existsSync(path.join(process.cwd(), "public", SERVICE_PHOTO_DIR, photo.file));
  return found ? { src: `/${SERVICE_PHOTO_DIR}/${photo.file}`, alt: photo.alt } : null;
}

export function PhotoFigure({
  photo,
  sizes,
  aspect = "aspect-[4/3]",
  priority = false,
  className,
}: {
  photo: ResolvedPhoto;
  sizes: string;
  aspect?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("relative overflow-hidden rounded-lg bg-[#e8eef4]", aspect, className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </figure>
  );
}

/**
 * The large image beside a service page's H1: the hero photograph at 16:9 when
 * it exists, otherwise the page's drawn panel at its own 4:3.
 */
export function ServiceHeroImage({
  slug,
  sizes = "(min-width: 1024px) 36rem, 100vw",
  className,
}: {
  slug: string;
  sizes?: string;
  className?: string;
}) {
  const set = SERVICE_PHOTOS[slug];
  if (!set) return null;
  const photo = resolvePhoto(slug, "hero");

  if (!photo) {
    return (
      <BrandImage
        slot={set.fallback}
        sizes={sizes}
        priority
        aspect="aspect-[4/3]"
        className={cn("border-white/10", className)}
      />
    );
  }

  return (
    <PhotoFigure
      photo={photo}
      sizes={sizes}
      aspect="aspect-[16/9]"
      priority
      className={cn("bg-[#122640]", className)}
    />
  );
}
