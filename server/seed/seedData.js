import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Tour from "../models/Tour.js";
import Destination from "../models/Destination.js";

// Seeds ONLY the real, already-verified tour and destination data (same
// content shown on the existing site / used in client/src/data/business.js).
// Deliberately does NOT seed any Travel Guide articles — those are genuine
// admin-authored content and none exist yet, per the "no fabricated
// articles" requirement.

const tours = [
  { name: "Una with Dalhousie & Dharamshala", slug: "una-dalhousie-dharamshala", summary: "A circuit covering Dharamshala, McLeodganj and Dalhousie starting and ending from Una.", category: "himachal" },
  { name: "4 Char Devi Darshan with Una", slug: "4-char-devi-darshan", summary: "A temple circuit covering the Devi Darshan yatra route in Himachal Pradesh, starting from Una.", category: "yatra" },
  { name: "Una - Manali to Shimla Tour", slug: "una-manali-shimla", summary: "A Himachal tour covering Manali and Shimla from Una.", category: "himachal" },
  { name: "Shimla Manali Dharamshala Dalhousie", slug: "shimla-manali-dharamshala-dalhousie", summary: "An extended Himachal tour combining Shimla, Manali, Dharamshala and Dalhousie.", category: "himachal" },
  { name: "Kashmir, Katra - Una Package", slug: "kashmir-katra", summary: "A combined Kashmir and Katra (Mata Vaishno Devi) tour package starting from Una.", category: "kashmir" },
  { name: "Leh Ladakh Tour Package", slug: "leh-ladakh", summary: "A Leh Ladakh tour package arranged from Una.", category: "ladakh" },
];

const destinations = [
  { name: "Shimla", slug: "una-to-shimla-taxi", distanceKm: 180, summary: "Mall Road, Kufri and Narkanda are common stops on this route." },
  { name: "Manali", slug: "una-to-manali-taxi", distanceKm: 240, summary: "A popular outstation route for the Manali and Solang Valley area." },
  { name: "Dharamshala", slug: "una-to-dharamshala-taxi", distanceKm: 125, summary: "Covers Dharamshala and McLeodganj." },
  { name: "Dalhousie", slug: "una-to-dalhousie-taxi", distanceKm: 195, summary: "Covers Dalhousie and Khajjiar." },
  { name: "Kangra", slug: "una-to-kangra-taxi", distanceKm: 90, summary: "A shorter route within the Kangra valley." },
  { name: "Amritsar", slug: "una-to-amritsar-taxi", distanceKm: 160, summary: "Covers the Golden Temple and Wagah Border area." },
  { name: "Chandigarh", slug: "una-to-chandigarh-taxi", distanceKm: 115, summary: "A common route for Chandigarh airport transfers and city travel." },
  { name: "Katra", slug: "una-to-katra-taxi", distanceKm: 310, summary: "For travellers visiting the Mata Vaishno Devi shrine." },
];

async function run() {
  await connectDB();

  for (const t of tours) {
    await Tour.updateOne({ slug: t.slug }, { $set: t }, { upsert: true });
  }
  for (const d of destinations) {
    await Destination.updateOne({ slug: d.slug }, { $set: d }, { upsert: true });
  }

  console.log(`Seeded ${tours.length} tours and ${destinations.length} destinations.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
