import mongoose from "mongoose";

// Present for future admin-managed tour content. The live site currently
// reads tour packages from client/src/data/business.js (the verified,
// already-existing package names/descriptions). Wire this collection in
// once tour content is meant to be edited by non-developers.
const tourSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    summary: { type: String, required: true },
    category: { type: String },

    seoTitle: { type: String },
    seoDescription: { type: String },
    canonicalUrl: { type: String },
    ogImage: { type: String },

    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
