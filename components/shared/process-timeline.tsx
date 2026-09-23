import type { Step } from "@/lib/services";

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative space-y-8 border-l-2 border-border pl-8">
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <span
            aria-hidden="true"
            className="brand-gradient absolute -left-[2.6rem] flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-primary-foreground"
          >
            {i + 1}
          </span>
          <h3 className="text-lg">
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
