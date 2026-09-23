import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * The inline markup allowed inside article text.
 *
 * Two forms only: `[label](/path/)` for a link and `**text**` for emphasis.
 * That is a deliberate limit rather than an unfinished parser. Article
 * structure is expressed in blocks, and a paragraph that can contain a heading
 * or an image is a paragraph that will eventually contain one.
 *
 * Internal paths render through next/link so navigation stays client side and
 * prefetching works. Anything with a scheme is treated as external, opens in a
 * new tab, carries rel="noopener noreferrer" and is marked with an icon, so a
 * reader knows before clicking that they are leaving the site.
 */

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  // A fresh regex per call: TOKEN carries lastIndex state and this component
  // renders concurrently across blocks.
  const re = new RegExp(TOKEN.source, "g");

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));

    const [, label, href, bold] = match;

    if (bold) {
      nodes.push(
        <strong key={match.index} className="font-semibold text-secondary">
          {bold}
        </strong>,
      );
    } else if (href.startsWith("/")) {
      nodes.push(
        <Link
          key={match.index}
          href={href}
          className="font-medium text-primary underline decoration-primary/35 underline-offset-2 hover:decoration-primary"
        >
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline decoration-primary/35 underline-offset-2 hover:decoration-primary"
        >
          {label}
          <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-baseline" aria-hidden="true" />
        </a>,
      );
    }

    last = match.index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));

  return <>{nodes}</>;
}
