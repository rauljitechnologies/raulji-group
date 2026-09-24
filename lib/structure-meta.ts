import { Briefcase, Link2, User, Users, type LucideIcon } from "lucide-react";

/**
 * Hero and card details per structure. Owner counts and setup estimates are
 * the ones already published in lib/comparison.ts and the general FAQs; the
 * bars rank annual compliance from lightest (1) to heaviest (4), in the order
 * the comparison table's "Compliance level" row describes.
 */
export const STRUCTURE_META: Record<
  string,
  { tag: string; body: string; liability: string; owners: string; time: string; load: number; icon: LucideIcon }
> = {
  "pvt-registration": {
    tag: "Scalable corporate structure",
    body: "For businesses seeking a scalable corporate structure and outside investment.",
    liability: "Limited",
    owners: "2 to 200",
    time: "7–12 working days",
    load: 4,
    icon: Briefcase,
  },
  "llp-registration": {
    tag: "Partners with limited liability",
    body: "For businesses structured around partners who want their liability limited.",
    liability: "Limited",
    owners: "2 or more",
    time: "7–10 working days",
    load: 3,
    icon: Link2,
  },
  "partnership-registration": {
    tag: "Partners under a deed",
    body: "For two or more people starting together under a partnership deed.",
    liability: "Unlimited",
    owners: "2 to 50",
    time: "Deed within days",
    load: 2,
    icon: Users,
  },
  "proprietorship-registration": {
    tag: "One owner, simplest",
    body: "For one person starting and operating a business on their own.",
    liability: "Unlimited",
    owners: "1",
    time: "Udyam often same day",
    load: 1,
    icon: User,
  },
};

