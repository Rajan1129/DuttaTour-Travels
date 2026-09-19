import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

const SITE_URL = process.env.SITE_URL || "https://mandyaltourandtravels.in";

// Static, canonical, indexable public routes. Keep in sync with App.jsx.
const staticRoutes = [
  "/",
  "/taxi-services",
  "/taxi-service-una",
  "/taxi-service-amb",
  "/amb-andaura-railway-station-taxi",
  "/outstation-taxi",
  "/airport-transfers",
  "/fleet",
  "/tour-packages",
  "/char-dham",
  "/short-trips",
  "/destinations",
  "/travel-guide",
  "/about",
  "/contact",
];

// Destination route-taxi pages (mirrors client/src/data/business.js destinations).
const destinationSlugs = [
  "una-to-shimla-taxi",
  "una-to-manali-taxi",
  "una-to-dharamshala-taxi",
  "una-to-dalhousie-taxi",
  "una-to-kangra-taxi",
  "una-to-amritsar-taxi",
  "una-to-chandigarh-taxi",
  "una-to-katra-taxi",
];

router.get("/sitemap.xml", async (req, res) => {
  let articleSlugs = [];
  try {
    const articles = await Article.find({ published: true }).select("slug updatedAt").lean();
    articleSlugs = articles.map((a) => ({ slug: a.slug, updatedAt: a.updatedAt }));
  } catch (err) {
    // MongoDB not reachable — sitemap still returns the static + route pages.
  }

  const urls = [
    ...staticRoutes.map((path) => ({ path, updatedAt: null })),
    ...destinationSlugs.map((slug) => ({ path: `/${slug}`, updatedAt: null })),
    ...articleSlugs.map((a) => ({ path: `/travel-guide/${a.slug}`, updatedAt: a.updatedAt })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.path}</loc>${
      u.updatedAt ? `\n    <lastmod>${new Date(u.updatedAt).toISOString().split("T")[0]}</lastmod>` : ""
    }
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.set("Content-Type", "application/xml");
  res.send(body);
});

router.get("/robots.txt", (req, res) => {
  const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin

Sitemap: ${SITE_URL}/sitemap.xml
`;
  res.set("Content-Type", "text/plain");
  res.send(body);
});

export default router;
