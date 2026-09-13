import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

// GET /api/articles - list published articles (used by /travel-guide)
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find({ published: true })
      .select("title slug h1 description createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "Unable to load articles." });
  }
});

// GET /api/articles/:slug - single article (used by /travel-guide/:slug)
router.get("/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug, published: true }).lean();
    if (!article) return res.status(404).json({ error: "Article not found." });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: "Unable to load article." });
  }
});

export default router;
