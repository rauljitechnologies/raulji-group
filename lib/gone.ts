/**
 * The 410 Gone response used by discontinued services.
 *
 * A 410 tells search engines the URL is intentionally removed, which drops it
 * from the index faster than a 404 and avoids sending visitors somewhere
 * irrelevant. The technical audit of 15 Oct 2026 (TF-02) asks for 410 on
 * /rentals/ and /services/land-investment/, neither of which has a successor.
 *
 * The page is plain HTML rather than a React page because a route handler is
 * the only way to control the status code; a page.tsx cannot return 410.
 */
export function gonePage({
  heading,
  body,
}: {
  heading: string;
  body: string[];
}) {
  const paragraphs = body.map((p) => `  <p>${p}</p>`).join("\n");

  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>This service is no longer offered | Raulji Group</title>
<style>
  body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#f7f9fb;color:#192a42;
       display:flex;min-height:100vh;align-items:center;justify-content:center;padding:1.5rem}
  main{max-width:34rem;text-align:center}
  h1{font-size:1.6rem;line-height:1.25;margin:0 0 1rem}
  p{line-height:1.6;color:#4a5a6e;margin:0 0 1rem}
  a.btn{display:inline-block;margin-top:.75rem;padding:.85rem 1.75rem;border-radius:.75rem;
        background:linear-gradient(135deg,#3199d4,#192a42);color:#fff;text-decoration:none;font-weight:600}
  a{color:#3199d4}
</style>
</head>
<body>
<main>
  <h1>${heading}</h1>
${paragraphs}
  <a class="btn" href="/services/">Explore our services</a>
  <p style="margin-top:1.5rem"><a href="/">Go to the Raulji Group homepage</a> &middot;
     <a href="tel:+918511187689">Call +91 8511187689</a></p>
</main>
</body>
</html>`;
}

export function goneResponse(html: string) {
  return new Response(html, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
