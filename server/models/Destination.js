import mongoose from "mongoose";

// Present for future admin-managed destination/route content. The live site
// currently reads destinations from client/src/data/business.js (the
// verified distances already shown on the existing site). Wire this
// collection in once destination content is meant to be edited by
// non-developers.
const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    distanceKm: { type: Number },
    summary: { type: String },

    seoTitle: { type: String },
    seoDescription: { type: String },
    canonicalUrl: { type: String },
    ogImage: { type: String },

    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);
