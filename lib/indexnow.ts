/**
 * IndexNow (technical audit TF-06).
 *
 * IndexNow lets the site tell Bing, Yandex and Seznam that a URL changed
 * instead of waiting to be recrawled. Google does not participate, so this is
 * additive: the sitemap index and Search Console still do that work there.
 *
 * The key is public by design. Ownership is proved by hosting a file at
 * https://www.raulji.com/<key>.txt whose only content is the key itself, which
 * is why it is committed rather than kept in a secret: a value the verifier
 * fetches over the open web is not one. Set INDEXNOW_KEY to rotate it, and
 * rename public/<key>.txt to match, or submissions are rejected.
 */
export const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "fa466eaba727de969ad7fb8096f529fa";

/** Where the verification file must live for the key above. */
export const INDEXNOW_KEY_LOCATION = `/${INDEXNOW_KEY}.txt`;

/** The endpoint. One submission is shared across the participating engines. */
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";
