import Image from "next/image";
import { IMAGES, type ImageSlot } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * A photography slot.
 *
 * Handles what brief section 24 asks of every important image: real width and
 * height from the imported file so nothing shifts as it loads, a described
 * `sizes` so the browser fetches the right file, lazy by default with `priority`
 * available for a hero, WebP, and alt text written for the photograph rather
 * than stuffed with keywords.
 *
 * While a slot holds a placeholder it is marked as one on the page and
 * `priority` is ignored: a stand-in should never be the largest contentful
 * paint, and nobody should be able to mistake it for a photograph of the
 * business.
 */
export function BrandImage({
  slot,
  sizes,
  className,
  priority = false,
  aspect = "aspect-[16/9]",
}: {
  slot: ImageSlot;
  /** Describe the rendered width per breakpoint, e.g. "(min-width: 1024px) 32rem, 100vw". */
  sizes: string;
  className?: string;
  priority?: boolean;
  aspect?: string;
}) {
  const image = IMAGES[slot];

  return (
    <figure className={cn("relative overflow-hidden rounded-2xl border border-border", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        sizes={sizes}
        priority={priority && !image.placeholder}
        placeholder="blur"
        className={cn("w-full object-cover", aspect)}
      />
      {image.placeholder ? (
        <figcaption className="absolute left-3 top-3 rounded-lg bg-secondary/90 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-secondary-foreground">
          Placeholder image
        </figcaption>
      ) : null}
    </figure>
  );
}
