/*
 * A template rather than part of the layout: Next remounts this on every route
 * change but keeps the layout (header, footer, location drawer, mobile action
 * bar) mounted, which is exactly the boundary the page switch needs. The new
 * page fades in; the chrome around it stays put.
 *
 * Opacity only — no rise, no slide. A transform here would fight scroll
 * restoration on back and forward, shift the layout on arrival (CLS), and make
 * every `position: fixed` element inside a page position against this wrapper
 * instead of the viewport. The animation also runs without `fill-mode`, so the
 * `opacity` property is gone once it ends and this div stops being a stacking
 * context rather than permanently flattening the page's own layers.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
