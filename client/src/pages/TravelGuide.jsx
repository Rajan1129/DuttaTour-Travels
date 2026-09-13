import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema } from "../data/schema";

import { defaultArticles } from "../data/defaultArticles";

// Articles are admin-managed via /admin and synced with API/localStorage
export default function TravelGuide() {
  const seo = seoConfig.travelGuide;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Travel Guide" }];
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem("dutta_admin_articles");
    return saved ? JSON.parse(saved) : defaultArticles;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
        }
      })
      .catch(() => {
        // Keeps local / default articles
      });
  }, []);

  return (
    <Layout>
      <SEO
        path={seo.path}
        title={seo.title}
        description={seo.description}
        structuredData={[localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />
      <section className="max-w-[1240px] mx-auto px-margin py-space-xl flex flex-col gap-space-lg">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="font-headline-xl font-bold">Himachal Travel Guide &amp; Road Trip Ideas</h1>
          <p className="text-body-lg text-on-surface-variant">
            Practical guides and road trip planning notes for journeys from Una into Himachal
            Pradesh and neighbouring regions.
          </p>
        </div>

        {!loading && articles.length === 0 && (
          <div className="p-6 rounded-2xl bg-surface-container text-on-surface-variant">
            We're putting together our first travel guide articles. Check back soon, or contact us
            directly for route and trip-planning advice.
          </div>
        )}

        {articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {articles.map((a) => (
              <Link
                key={a.slug}
                to={`/travel-guide/${a.slug}`}
                className="group bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col gap-2"
              >
                <h2 className="font-headline-sm font-bold group-hover:text-primary transition-colors">{a.h1 || a.title}</h2>
                <p className="text-body-sm text-on-surface-variant">{a.description}</p>
              </Link>
            ))}
          </div>
        )}

        <p className="text-body-md text-on-surface-variant pt-space-md">
          Planning a route? See{" "}
          <Link to="/destinations" className="text-primary hover:underline">destinations</Link> or{" "}
          <Link to="/contact" className="text-primary hover:underline">contact us</Link> directly.
        </p>
      </section>
    </Layout>
  );
}
