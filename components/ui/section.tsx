import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "dark";
}) {
  return (
    <section
      id={id}
      className={cn(
        "section-padding",
        tone === "muted" && "bg-muted",
        tone === "dark" && "bg-secondary text-secondary-foreground",
        className,
      )}
    >
      <div className="container-wide">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: As = "h2",
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  as?: "h1" | "h2" | "h3";
  align?: "center" | "left";
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      ) : null}
      <As className="text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight">{title}</As>
      {lead ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lead}</p>
      ) : null}
    </div>
  );
}
