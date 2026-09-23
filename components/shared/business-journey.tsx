import { Lightbulb, GitCompareArrows, FileSignature, Rocket, TrendingUp } from "lucide-react";

/**
 * Idea -> Choose -> Register -> Start -> Grow (spec section 11).
 *
 * Framed as the business's journey rather than our filing checklist, and worded
 * so nothing here reads as a promised outcome.
 */
const STAGES = [
  {
    icon: Lightbulb,
    stage: "Idea",
    title: "You know what you want to build",
    body: "A conversation about the business, who is involved and whether outside investment is likely. That is usually enough to narrow the structure to one or two options.",
  },
  {
    icon: GitCompareArrows,
    stage: "Choose",
    title: "Pick the structure deliberately",
    body: "What each option means for your liability, your annual compliance and your tax position, with the expected cost set out before anything is filed. You decide.",
  },
  {
    icon: FileSignature,
    stage: "Register",
    title: "Documents and filings handled",
    body: "Digital signatures, name approval, drafting and the statutory filings, including responding to any Registrar query or resubmission request.",
  },
  {
    icon: Rocket,
    stage: "Start",
    title: "Open for business",
    body: "You receive the incorporation certificate or registration documents, and guidance on the immediate next steps such as opening a current account.",
  },
  {
    icon: TrendingUp,
    stage: "Grow",
    title: "The structure keeps working",
    body: "Registration is the first step, not the finish. As the business grows, the group can help with what the structure requires next.",
  },
];

export function BusinessJourney() {
  return (
    <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-5 lg:gap-4">
      {/* The connecting rail, desktop only. Decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 lg:block"
      />

      {STAGES.map((stage, index) => (
        <li
          key={stage.stage}
          className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-card"
        >
          <div className="flex items-center gap-3">
            <span className="brand-gradient inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary-foreground">
              <stage.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="sr-only">Step {index + 1}: </span>
              {stage.stage}
            </span>
          </div>
          <h3 className="mt-4 text-base leading-snug">{stage.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{stage.body}</p>
        </li>
      ))}
    </ol>
  );
}
