/**
 * /rentals/ is discontinued with no equivalent service, so it returns 410 Gone
 * rather than a 301 to an unrelated registration page (spec section 6).
 *
 * A 410 tells search engines the URL is intentionally removed, which drops it
 * from the index faster than a 404 and avoids passing visitors somewhere
 * irrelevant. Revisit only if the service is reinstated.
 */
export const dynamic = "force-static";

const BODY = `<!doctype html>
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
  <h1>Computer and laptop rentals are no longer offered</h1>
  <p>Raulji Group has discontinued this service. We now focus on business registration and the
     compliance work that follows it.</p>
  <p>If you were looking for help registering a Private Limited Company, LLP, partnership firm or
     proprietorship, we can help with that.</p>
  <a class="btn" href="/services/">Explore registration services</a>
  <p style="margin-top:1.5rem"><a href="/">Go to the Raulji Group homepage</a> &middot;
     <a href="tel:+918511187689">Call +91 8511187689</a></p>
</main>
</body>
</html>`;

export async function GET() {
  return new Response(BODY, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
