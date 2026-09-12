import Link from "next/link";
import { Section } from "@/components/ui/section";
import { ServiceCards } from "@/components/shared/service-cards";
import { SITE, telHref } from "@/lib/site";

/**
 * A real 404. The previous site answered every unknown path with a 200 and the
 * homepage, which search engines read as a soft 404 and which left visitors
 * unsure whether the page existed.
 */
export const metadata = {
  title: "Page not found | Raulji Group",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl pt-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Error 404</p>
        <h1 className="mt-3 text-3xl md:text-4xl">We could not find that page</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          The page may have been moved, or the service may no longer be offered. Here is where most
          people are heading.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Still stuck? Call{" "}
          <a href={telHref} className="font-semibold text-primary hover:underline">
            {SITE.phone.display}
          </a>{" "}
          and we will point you to the right place.
        </p>
      </div>

      <div className="mt-14">
        <ServiceCards />
      </div>

      <p className="mt-10 text-center">
        <Link href="/" className="font-semibold text-primary hover:underline">
          Go to the homepage
        </Link>
        <span className="mx-3 text-border">|</span>
        <Link href="/gujarat/" className="font-semibold text-primary hover:underline">
          Gujarat coverage
        </Link>
        <span className="mx-3 text-border">|</span>
        <Link href="/contact/" className="font-semibold text-primary hover:underline">
          Contact
        </Link>
      </p>
    </Section>
  );
}
