import { Helmet } from "react-helmet-async";
import { business } from "../data/business";

/**
 * Drop-in SEO head for any page.
 *
 * path            - route path, e.g. "/taxi-service-amb" (used for canonical + og:url)
 * title           - unique <title>, ~50-60 chars where practical
 * description     - unique meta description
 * noindex         - true for admin/private pages
 * ogType          - "website" (default) or "article"
 * ogImage         - absolute image URL; falls back to a site default
 * structuredData  - one JSON-LD object, or an array of JSON-LD objects
 */
export default function SEO({
  path = "/",
  title,
  description,
  noindex = false,
  ogType = "website",
  ogImage,
  structuredData,
}) {
  const canonical = `${business.siteUrl}${path === "/" ? "/" : path.replace(/\/+$/, "")}`;
  const image = ogImage || `${business.siteUrl}/og-default.jpg`;
  const schemas = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={business.name} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
