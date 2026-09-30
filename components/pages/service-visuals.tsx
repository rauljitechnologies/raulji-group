import Image from "next/image";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  ClipboardCheck,
  FileSignature,
  Fingerprint,
  IdCard,
  Landmark,
  Layers,
  Lightbulb,
  MapPin,
  MessagesSquare,
  PieChart,
  Receipt,
  Route,
  Search,
  Send,
  Store,
  Tag,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { BrandImage } from "@/components/ui/brand-image";
import { COMPARISON_ROWS, type ComparisonRow } from "@/lib/comparison";
import type { ImageSlot } from "@/lib/images";
import type { RegistrationService, Step } from "@/lib/services";
import { LEADERSHIP } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Visual explanations for the service pages (image-rich update to the
 * service-page brief).
 *
 * Nothing in this file is decoration. Each component turns something the page
 * already says in prose into a shape a reader can take in at a glance: the
 * order of a process and who acts at each step, the kinds of information a
 * registration asks for, and how two structures differ. The wording stays the
 * reviewed wording from lib/services.ts and lib/comparison.ts.
 */

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

/** An icon for a process step, chosen by what the step is. */
function stepIcon(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("digital signature")) return Fingerprint;
  if (t.includes("name")) return Tag;
  if (t.includes("draft") || t.includes("moa") || t.includes("deed") || t.includes("agreement"))
    return FileSignature;
  if (t.includes("certificate")) return BadgeCheck;
  if (t.includes("filing") || t.includes("register with")) return Send;
  if (t.includes("udyam")) return Building2;
  if (t.includes("gst")) return Receipt;
  if (t.includes("shop")) return Store;
  if (t.includes("licence")) return ClipboardCheck;
  if (t.includes("pan") || t.includes("bank") || t.includes("account") || t.includes("post-"))
    return Landmark;
  if (t.includes("terms") || t.includes("agree")) return Users;
  if (t.includes("conversation")) return MessagesSquare;
  if (t.includes("position")) return Search;
  if (t.includes("options")) return Route;
  if (t.includes("plan")) return Lightbulb;
  if (t.includes("carrying")) return Wrench;
  return ClipboardCheck;
}

/** Colour of the "who acts" chip: ours, the authority's, or the customer's. */
function actorTone(by: string) {
  if (by.startsWith("Raulji") || by.endsWith("we file")) return "bg-[#329fd2] text-[#0c1a2d]";
  if (/decides|issues/.test(by)) return "bg-[#f3d9a4] text-[#3d2a05]";
  return "border border-white/30 text-white";
}

export function ProcessVisual({
  steps,
  actors,
}: {
  steps: Step[];
  /** Who acts, keyed by step title. Steps without an entry show no chip. */
  actors?: Record<string, string>;
}) {
  const cols = steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-3";
  return (
    <div className="flex flex-col gap-6">
      <ol className={cn("grid gap-4 sm:grid-cols-2", cols)}>
        {steps.map((step, i) => {
          const Icon = stepIcon(step.title);
          const by = actors?.[step.title];
          return (
            <li
              key={step.title}
              className="relative flex flex-col gap-4 rounded-lg border border-white/[0.12] bg-white/[0.04] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#329fd2]/15 ring-1 ring-[#329fd2]/40">
                  <Icon className="h-6 w-6 text-[#7cc8ec]" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span
                  aria-hidden="true"
                  className="text-[2.5rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.25px_rgba(124,200,236,0.55)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-[1.0625rem] font-bold leading-[1.35] text-white">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="flex-1 text-sm leading-[1.7] text-[#c9d6e3]">{step.body}</p>
              {by ? (
                <p className="self-start">
                  <span className="sr-only">Who acts: </span>
                  <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-bold", actorTone(by))}>
                    {by}
                  </span>
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
      {actors ? (
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#9fb3c8]" aria-label="Key">
          <li className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#329fd2]" aria-hidden="true" />
            Our work
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f3d9a4]" aria-hidden="true" />
            The authority&rsquo;s decision, not in our control
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full border border-white/50" aria-hidden="true" />
            Your step
          </li>
        </ul>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Information you may need                                            */
/* ------------------------------------------------------------------ */

interface InfoGroup {
  title: string;
  icon: LucideIcon;
  items: string[];
}

/**
 * Sorts a structure's document list and the information the customer provides
 * into the six kinds of information the brief names. Sorting is by what each
 * line is about; anything that fits none of them lands in "Other applicable
 * information", so nothing on the page is lost.
 */
export function infoGroups(service: RegistrationService): InfoGroup[] {
  const groups: InfoGroup[] = [
    { title: "Identity", icon: IdCard, items: [] },
    { title: "Personal address", icon: MapPin, items: [] },
    { title: "Business information", icon: Briefcase, items: [] },
    { title: "Ownership information", icon: PieChart, items: [] },
    { title: "Registered office or premises", icon: Building2, items: [] },
    { title: "Other applicable information", icon: Layers, items: [] },
  ];
  const [identity, address, business, ownership, office, other] = groups;

  for (const doc of service.documents) {
    const d = doc.toLowerCase();
    if (/office|premises|place of business|rent agreement|no-objection/.test(d)) office.items.push(doc);
    else if (d.startsWith("address proof")) address.items.push(doc);
    else if (/pan card|aadhaar|identity|photograph|passport/.test(d)) identity.items.push(doc);
    else other.items.push(doc);
  }
  for (const item of service.customerProvides) {
    const d = item.toLowerCase();
    if (/identity and address|pan, aadhaar|office proof|premises proof|place of business proof/.test(d)) continue;
    if (/shareholding|capital|contribution|profit share|joins|signs for|operates/.test(d)) ownership.items.push(item);
    else if (/name|activity|what the company|turnover|agreement/.test(d)) business.items.push(item);
    else other.items.push(item);
  }
  return groups.filter((g) => g.items.length);
}

export function InfoCards({ service }: { service: RegistrationService }) {
  return (
    <ul className="grid content-start gap-4 sm:grid-cols-2">
      {infoGroups(service).map(({ title, icon: Icon, items }) => (
        <li key={title} className="flex flex-col gap-3 rounded-lg border border-[#e3e9ef] bg-white p-5">
          <span className="flex items-center gap-3">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#e8f5fb]">
              <Icon className="h-5 w-5 text-[#122640]" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3 className="text-base font-bold leading-[1.3] text-[#122640]">{title}</h3>
          </span>
          <ul className="space-y-2 border-t border-[#eef2f6] pt-3">
            {items.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-[1.55] text-[#3a4656]">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[#329fd2]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Versus comparison                                                   */
/* ------------------------------------------------------------------ */

type StructureKey = keyof Omit<ComparisonRow, "feature">;

/**
 * Who runs each structure. Not a row in lib/comparison.ts, which the /compare/
 * table and the registration pillar share, so it is kept here rather than
 * changing those pages.
 */
const MANAGEMENT: Record<StructureKey, string> = {
  pvt: "Run by a board of directors. Shareholders own the company, and the same people can be both.",
  llp: "Managed by the partners under the LLP Agreement. Designated partners carry the compliance duties.",
  partnership: "Run directly by the partners, on the terms written into the partnership deed.",
  proprietorship: "Run by the owner alone. There is no separate management layer.",
};

/** The rows the brief asks for, mapped to the reviewed comparison wording. */
const VERSUS_ROWS: { label: string; feature?: string; value?: Record<StructureKey, string> }[] = [
  { label: "Ownership", feature: "Owners or partners" },
  { label: "Management", value: MANAGEMENT },
  { label: "Liability", feature: "Liability" },
  { label: "Compliance", feature: "Compliance level" },
  { label: "Funding", feature: "Raising equity investment" },
  { label: "Typical use", feature: "Suitable for" },
];

export function VersusComparison({
  a,
  b,
}: {
  a: { key: StructureKey; name: string; panel: ImageSlot };
  b: { key: StructureKey; name: string; panel: ImageSlot };
}) {
  const rows = VERSUS_ROWS.map((row) => {
    const source = row.value ?? COMPARISON_ROWS.find((r) => r.feature === row.feature);
    return source ? { label: row.label, a: source[a.key], b: source[b.key] } : null;
  }).filter((row): row is NonNullable<typeof row> => Boolean(row));

  return (
    <div className="flex flex-col gap-3">
      {/* Header: the two structures, facing each other. No winner is marked. */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
        {[a, b].map((side, i) => (
          <div key={side.key} className={cn("flex flex-col gap-3", i === 1 && "order-3")}>
            <BrandImage
              slot={side.panel}
              sizes="(min-width: 1024px) 30rem, 45vw"
              aspect="aspect-[16/9]"
              className="border-[#e3e9ef]"
            />
            <p className="text-center text-base font-extrabold text-[#122640] sm:text-xl">{side.name}</p>
          </div>
        ))}
        <span
          aria-hidden="true"
          className="order-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#122640] text-sm font-extrabold text-white sm:h-14 sm:w-14 sm:text-base"
        >
          vs
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {rows.map((row) => (
          <li
            key={row.label}
            className="grid gap-2 rounded-lg border border-[#e3e9ef] bg-white p-4 md:grid-cols-[1fr_9rem_1fr] md:items-center md:gap-5 md:p-5"
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#1a7cb0] md:order-2 md:text-center">
              {row.label}
            </h3>
            <p className="text-sm leading-[1.6] text-[#26354a] md:order-1 md:text-right">
              <span className="font-bold text-[#122640] md:sr-only">{a.name}: </span>
              {row.a}
            </p>
            <p className="text-sm leading-[1.6] text-[#26354a] md:order-3">
              <span className="font-bold text-[#122640] md:sr-only">{b.name}: </span>
              {row.b}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Leadership                                                          */
/* ------------------------------------------------------------------ */

/**
 * The enquiry visual: the Chairman's photograph, named. Real Raulji
 * photography comes before any generated image (brief, image priority), and a
 * named, accountable person is the one image a generated "consultant" scene
 * cannot honestly replace. The same pairing is used on the contact page.
 */
export function LeadershipFigure({ className }: { className?: string }) {
  const { chairman } = LEADERSHIP;
  return (
    <figure
      className={cn(
        "grid grid-cols-[minmax(0,11rem)_1fr] items-center gap-5 rounded-lg border border-white/[0.12] bg-white/[0.04] p-4 sm:grid-cols-[minmax(0,13rem)_1fr] sm:p-5",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-[#122640]">
        <Image
          src={chairman.photo}
          alt={`${chairman.name}, ${chairman.roles[0]}`}
          fill
          sizes="13rem"
          className="object-cover object-[center_20%]"
        />
      </div>
      <figcaption className="flex flex-col gap-1.5">
        <span className="text-base font-bold text-white">{chairman.name}</span>
        <span className="text-sm text-[#7cc8ec]">{chairman.roles[0]}</span>
        <span className="mt-1 text-sm leading-[1.6] text-[#c9d6e3]">
          You deal with the people doing the work, and the person accountable for it is named here.
        </span>
      </figcaption>
    </figure>
  );
}
