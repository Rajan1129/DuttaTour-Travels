import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import NotFound from "./NotFound";
import { breadcrumbSchema, articleSchema } from "../data/schema";

import { defaultArticles } from "../data/defaultArticles";

export default function TravelGuideArticle() {
  const { slug } = useParams();
  const [article, setArticle] = useState(() => {
    const saved = localStorage.getItem("mandyal_admin_articles");
    const all = saved ? JSON.parse(saved) : defaultArticles;
    return all.find((a) => a.slug === slug) || null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/articles/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setArticle(data);
      })
      .catch(() => {
        // Retains local / default article
      });
  }, [slug]);

  if (!article && loading) return <Layout><div className="max-w-[1240px] mx-auto px-margin py-space-xl">Loading…</div></Layout>;
  if (!article) return <NotFound />;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Travel Guide", path: "/travel-guide" },
    { name: article.h1 || article.title },
  ];

  return (
    <Layout>
      <SEO
        path={`/travel-guide/${article.slug}`}
        title={article.seoTitle || article.title}
        description={article.seoDescription || article.description}
        ogType="article"
        ogImage={article.ogImage}
        structuredData={[
          breadcrumbSchema(crumbs),
          articleSchema({
            title: article.title,
            description: article.description,
            path: `/travel-guide/${article.slug}`,
            image: article.ogImage,
            datePublished: article.createdAt,
            dateModified: article.updatedAt,
          }),
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <article className="max-w-[840px] mx-auto px-margin py-space-xl flex flex-col gap-space-md">
        <h1 className="font-headline-xl font-bold">{article.h1 || article.title}</h1>
        {article.featuredImage && (
          <img
            src={article.featuredImage}
            alt={article.featuredImageAlt || article.title}
            loading="lazy"
            width="840"
            height="472"
            className="w-full rounded-2xl object-cover aspect-[16/9]"
          />
        )}
        <div
          className="prose max-w-none text-body-lg text-on-surface"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </article>
    </Layout>
  );
}
