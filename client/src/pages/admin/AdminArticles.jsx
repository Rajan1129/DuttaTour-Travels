import { useEffect, useState } from "react";
import SEO from "../../components/SEO";

// Minimal admin UI for managing Travel Guide articles and their SEO fields.
// Protected by a simple bearer token stored in localStorage — this is a
// starting point only. Put this behind real authentication (and ideally a
// login-walled /admin path excluded via robots.txt) before going to
// production; see README "Remaining SEO tasks".
const emptyForm = {
  title: "",
  slug: "",
  h1: "",
  description: "",
  seoTitle: "",
  seoDescription: "",
  featuredImage: "",
  featuredImageAlt: "",
  contentHtml: "",
};

export default function AdminArticles() {
  const [token, setToken] = useState(localStorage.getItem("dutta_admin_token") || "");
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("");

  const authHeaders = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const loadArticles = () => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then(setArticles)
      .catch(() => setArticles([]));
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const saveToken = (t) => {
    setToken(t);
    localStorage.setItem("dutta_admin_token", t);
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus("Saving…");
    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("Saved.");
      setForm(emptyForm);
      loadArticles();
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-surface p-6 max-w-3xl mx-auto flex flex-col gap-space-lg">
      <SEO path="/admin/articles" title="Admin | Dutta Tour & Travel" description="Admin area." noindex />
      <h1 className="font-headline-lg font-bold">Travel Guide — Admin</h1>

      <div className="flex items-center gap-space-sm">
        <input
          className="border rounded-lg px-3 py-2 flex-1"
          placeholder="Admin API token"
          value={token}
          onChange={(e) => saveToken(e.target.value)}
        />
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 gap-space-sm bg-surface-container p-4 rounded-2xl">
        {Object.keys(emptyForm).map((key) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="text-label-sm text-on-surface-variant">{key}</label>
            {key === "contentHtml" ? (
              <textarea
                className="border rounded-lg px-3 py-2"
                rows={6}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            ) : (
              <input
                className="border rounded-lg px-3 py-2"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            )}
          </div>
        ))}
        <button type="submit" className="py-2.5 rounded-xl bg-primary-container text-on-primary font-label-lg">
          Publish Article
        </button>
        {status && <p className="text-body-sm text-on-surface-variant">{status}</p>}
      </form>

      <div className="flex flex-col gap-space-sm">
        <h2 className="font-headline-sm font-bold">Published articles ({articles.length})</h2>
        {articles.map((a) => (
          <div key={a.slug} className="p-3 rounded-lg bg-surface-container-low">
            <strong>{a.title}</strong> — /travel-guide/{a.slug}
          </div>
        ))}
      </div>
    </div>
  );
}
