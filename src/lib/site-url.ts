// The public address of the site, without a trailing slash.
export function siteUrl(): string {
  return (process.env.PAYMENT_SITE_URL ?? "https://edify-sigma-plum.vercel.app").replace(/\/+$/, "");
}
