/**
 * `sizes` for photographs drawn with `object-cover`.
 *
 * `sizes` tells the browser how wide an image is drawn, and the image
 * optimiser sends a file of about that width. With `object-cover` the drawn
 * width is not the box width when the photograph is wider than the box: the
 * photograph is scaled to the box's height and its sides are cropped, so a
 * 16:9 photograph in a tall narrow box is drawn several times wider than the
 * box. Describing only the box then fetches a file far too small, which the
 * browser stretches, and the photograph looks soft.
 *
 * These helpers work the real drawn width out from the photograph's own aspect
 * ratio, so the right file is fetched whatever photograph a slot holds.
 */

interface Dimensions {
  width: number;
  height: number;
}

/**
 * How many times wider than its box an `object-cover` photograph is drawn,
 * for a box of fixed aspect ratio (width / height). 1 when it is not wider.
 */
export function coverScale(image: Dimensions, boxAspect: number): number {
  return Math.max(1, image.width / image.height / boxAspect);
}

/**
 * Multiplies every width in a `sizes` string by `scale`, for a photograph in
 * a box of fixed aspect ratio. Returns the string unchanged when the
 * photograph is not meaningfully wider than the box.
 */
export function scaleSizes(sizes: string, scale: number): string {
  if (scale < 1.05) return sizes;
  const factor = Math.round(scale * 100) / 100;
  return sizes
    .split(",")
    .map((entry) => {
      const match = entry.trim().match(/^(\(.*\)\s+)?(.+)$/);
      if (!match) return entry;
      const [, media = "", length] = match;
      return `${media}calc(${length} * ${factor})`;
    })
    .join(", ");
}

/**
 * Drawn width in CSS pixels of an `object-cover` photograph in a box of known
 * height, given the widest the box gets at that breakpoint.
 */
export function coverWidth(image: Dimensions, boxHeight: number, boxWidth: number): number {
  return Math.round(Math.max(boxWidth, (boxHeight * image.width) / image.height));
}
