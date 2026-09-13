import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    h1: { type: String },
    description: { type: String, required: true },

    // SEO-specific fields (admin-editable per the SEO brief).
    seoTitle: { type: String },
    seoDescription: { type: String },
    canonicalUrl: { type: String },
    ogImage: { type: String },

    featuredImage: { type: String },
    featuredImageAlt: { type: String },
    contentHtml: { type: String, required: true },

    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
