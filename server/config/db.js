import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mandyal_tour_travel";
  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error("The site will still run, but Travel Guide articles and the sitemap's dynamic pages will be unavailable until MongoDB is reachable.");
  }
}
