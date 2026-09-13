import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import articlesRouter from "./routes/articles.js";
import adminArticlesRouter from "./routes/adminArticles.js";
import seoRouter from "./routes/seo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

// SEO infrastructure: sitemap.xml + robots.txt (dynamic, includes published articles)
app.use("/", seoRouter);

// API
app.use("/api/articles", articlesRouter);
app.use("/api/admin/articles", adminArticlesRouter);

// Serve the built React app in production (npm run build in /client first)
const clientDist = path.join(__dirname, "../client/dist");
app.use(express.static(clientDist));

// API 404 handler for unmatched /api routes
app.all("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found." });
});

// SPA fallback: any non-API, non-file route serves index.html so React
// Router (and the noindex 404 page) can take over client-side.
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  const indexPath = path.join(clientDist, "index.html");
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return res.status(503).send("Client build not found. Please ensure 'npm run build' has completed.");
});

app.listen(PORT, () => {
  console.log(`Dutta Tour & Travel server running on port ${PORT}`);
});
