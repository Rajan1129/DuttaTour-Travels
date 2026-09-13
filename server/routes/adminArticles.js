import express from "express";
import Article from "../models/Article.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();
router.use(adminAuth);

// GET /api/admin/articles - list all (including unpublished)
router.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 }).lean();
  res.json(articles);
});

// POST /api/admin/articles - create
router.post("/", async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/admin/articles/:id - update
router.put("/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!article) return res.status(404).json({ error: "Article not found." });
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/admin/articles/:id
router.delete("/:id", async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) return res.status(404).json({ error: "Article not found." });
  res.json({ success: true });
});

export default router;
