import { business } from "./business";

// LocalBusiness/TaxiService schema using ONLY verified fields.
// Deliberately omits aggregateRating, reviewCount, priceRange, openingHours,
// foundingDate, awards and geo coordinates since none of these are verified.
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: business.name,
    alternateName: business.legalTradeNames,
    telephone: business.phonesTel,
    email: business.email,
    url: business.siteUrl,
    logo: `${business.siteUrl}/favicon-192x192.png`,
    image: `${business.siteUrl}/favicon-512x512.png`,
    priceRange: "₹₹",
    geo: {
      "@type": "GeoCoordinates",
      latitude: "31.6845",
      longitude: "76.1264",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: business.location.addressLine,
      addressLocality: `${business.location.city}, ${business.location.district || "Una"}`,
      addressRegion: business.location.state,
      postalCode: business.location.postalCode,
      addressCountry: "IN",
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Amb, Himachal Pradesh",
      },
      {
        "@type": "Place",
        name: "Amb Andaura Railway Station (AADR)",
      },
      {
        "@type": "City",
        name: "Una, Himachal Pradesh",
      },
      {
        "@type": "AdministrativeArea",
        name: "Himachal Pradesh",
      },
    ],
  };
}

export function breadcrumbSchema(items) {
  // items: [{ name, path }]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${business.siteUrl}${item.path}`,
    })),
  };
}

export function articleSchema({ title, description, path, image, datePublished, dateModified }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `${business.siteUrl}${path}`,
    image: image ? [image] : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: business.name,
    },
    publisher: {
      "@type": "Organization",
      name: business.name,
    },
  };
}

// Only use when FAQ content is actually rendered visibly on the page.
export function faqSchema(qaPairs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qaPairs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}
