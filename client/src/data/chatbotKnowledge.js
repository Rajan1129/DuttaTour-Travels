// Intelligent Knowledge Base & Semantic Matcher for Dutta Tour & Travel AI Assistant
// Owner: Lav Dutta | HQ: Prem Nagar, Una, Himachal Pradesh

import { business } from "./business";

export const BOT_AVATAR = "/logo.png";
export const BOT_NAME = "Dutta Chauffeur Desk AI";
export const OWNER_NAME = "Lav Dutta";
export const PRIMARY_PHONE = business?.phones?.[0] || "+91 8894021277";
export const SECONDARY_PHONE = business?.phones?.[1] || "+91 6230433588";
export const WHATSAPP_NUMBER = business?.whatsappNumber || "918894021277";

export const QUICK_SUGGESTIONS = [
  { id: "6-devi", label: "🕉️ 6 Devi Darshan", query: "Tell me about the 6 Devi Darshan Yatra package and temples" },
  { id: "12-jyotirlinga", label: "🔱 12 Jyotirlinga", query: "What is the 12 Jyotirlinga Mahayatra package?" },
  { id: "spiti", label: "🏔️ Spiti Valley", query: "Spiti Valley road trip itinerary and details" },
  { id: "vande-bharat", label: "🚄 Amb Vande Bharat", query: "How does Amb Andaura Vande Bharat platform pickup work?" },
  { id: "fleet-fares", label: "🚘 Fleet & Fares", query: "What cars are available and how are taxi fares calculated?" },
  { id: "contact-owner", label: "📞 Speak with Lav Dutta", query: "I want to speak with owner Lav Dutta directly" },
];

export const KNOWLEDGE_BASE = [
  {
    id: "6-devi-darshan",
    category: "Pilgrimage",
    keywords: [
      "devi", "darshan", "6 devi", "six devi", "4 devi", "four devi", "chintpurni", "jwala", "jwalamukhi",
      "baglamukhi", "kangra", "brajeshwari", "chamunda", "naina devi", "shaktipeeth", "mandir", "temple",
      "bankhandi", "bilaspur"
    ],
    title: "6 Sacred Devi Darshan Yatra (Himachal & Punjab)",
    summary: "Complete 5N/6D or customized circuit covering all 6 holy Shaktipeeths & Siddhapeeths.",
    answer: `**6 Sacred Devi Darshan Yatra (5N/6D or 2-3 Day Express):**

Dutta Tour & Travel specializes in the sacred Devi pilgrimage starting directly from **Una or Amb Andaura Railway Station**:

1. **Maa Chintpurni Devi (Chhinnamastika Dham, Una):** Wish-fulfilling shrine, priority queue assistance & battery carts for elders.
2. **Maa Jwala Ji (Kangra):** World-renowned eternal 9 natural flames burning without fuel.
3. **Maa Baglamukhi Temple (Bankhandi):** Revered Pitambari Siddhapeeth famous for resolving life obstacles and Vedic hawan rituals.
4. **Maa Brajeshwari Devi (Kangra Town):** Historic Nagarkot Shaktipeeth with scenic Dhauladhar views.
5. **Maa Chamunda Devi (Baner River):** Fierce protector deity shrine nestled beside the river.
6. **Maa Naina Devi Temple (Bilaspur / Anandpur):** Perched high on a hill overlooking Gobind Sagar Lake with cable car ropeway access.

✅ **Includes:** Private commercial yellow-plate Innova Crysta / Ertiga / Dzire, verified Pahadi chauffeur, sanitized cabin, and flexible aarti timings.`,
    action: {
      type: "whatsapp",
      label: "Book 6 Devi Darshan on WhatsApp",
      query: "Hello Lav Dutta, I would like to book the 6 Devi Darshan Yatra."
    }
  },
  {
    id: "12-jyotirlinga",
    category: "Pilgrimage",
    keywords: [
      "jyotirling", "jyotirlinga", "12 jyotirling", "twelve jyotirling", "shiva", "kedarnath", "somnath",
      "mahakal", "mahakaleshwar", "omkareshwar", "kashi", "vishwanath", "rameshwaram", "trimbakeshwar",
      "bhimashankar", "grishneshwar", "vaidyanath", "nageshwar", "mallikarjuna"
    ],
    title: "12 Sacred Jyotirlinga Darshan Mahayatra",
    summary: "Pan-India Shiva pilgrimage with dedicated private vehicle, verified chauffeur & customized legs.",
    answer: `**12 Sacred Jyotirlinga Mahayatra:**

Experience the supreme blessing of Lord Shiva across India with Dutta Tour & Travel:

• **The 12 Holy Jyotirlingas:**
  1. Somnath (Gujarat)
  2. Mallikarjuna (Andhra Pradesh)
  3. Mahakaleshwar (Ujjain, MP)
  4. Omkareshwar (MP)
  5. Kedarnath (Uttarakhand Himalayas)
  6. Bhimashankar (Maharashtra)
  7. Kashi Vishwanath (Varanasi, UP)
  8. Trimbakeshwar (Nashik, Maharashtra)
  9. Vaidyanath (Deoghar, Jharkhand)
  10. Nageshwar (Dwarka, Gujarat)
  11. Rameshwaram (Tamil Nadu)
  12. Grishneshwar (Ellora, Maharashtra)

✅ **Customized Circuits:** We organize complete or regional legs (e.g. Northern Kedarnath-Kashi circuit, Western Somnath-Nageshwar-Mahakal circuit, or Southern Rameshwaram leg) with doorstep pickup, sanitized premium SUVs, and experienced mountain chauffeurs.`,
    action: {
      type: "whatsapp",
      label: "Plan 12 Jyotirlinga on WhatsApp",
      query: "Hello Lav Dutta, I want details and quotation for 12 Jyotirlinga Yatra."
    }
  },
  {
    id: "spiti-valley",
    category: "Adventure Tours",
    keywords: [
      "spiti", "spiti valley", "kaza", "key monastery", "chandratal", "chandrataal", "hikkim", "kibber",
      "langza", "komic", "kunzum", "atal tunnel", "tabo", "nako", "middle land"
    ],
    title: "Spiti Valley Circuit (8N/9D Middle Land Expedition)",
    summary: "High-altitude trans-Himalayan road trip covering Kinnaur, Kaza, Key Monastery & Chandratal Lake.",
    answer: `**Spiti Valley Circuit (8N/9D Middle Land Expedition):**

An unforgettable high-altitude road journey through Himachal's cold mountain desert:

• **Route:** Una / Chandigarh → Shimla → Narkanda → Sangla / Chitkul → Kalpa (Kinner Kailash) → Nako Lake → Tabo (1000-yr monastery) → Dhankar → Kaza → Key Monastery & Kibber → Hikkim (World's Highest Post Office) → Komic & Langza → Kunzum Pass (4,590 m) → Chandratal (Moon Lake) → Atal Tunnel → Manali → Una.

✅ **Key Highlights:**
• Experienced mountain drivers with 10+ years of high-altitude gravel road mastery.
• Best vehicles: Innova Crysta, Fortuner 4x4, or Force Urbania.
• Oxygen cylinder support and high-altitude acclimatization planning.
• Best travel months: **May to October**.`,
    action: {
      type: "whatsapp",
      label: "Inquire Spiti Valley on WhatsApp",
      query: "Hello Lav Dutta, I want to book Spiti Valley Tour Package."
    }
  },
  {
    id: "vande-bharat-amb",
    category: "Train Transfers",
    keywords: [
      "vande bharat", "amb andaura", "aadr", "22447", "22448", "train", "railway", "station",
      "platform", "pickup", "delhi to amb", "amb station", "new delhi vande bharat"
    ],
    title: "Amb Andaura (AADR) Vande Bharat Platform Pickup",
    summary: "Guaranteed meet-and-greet right outside the platform with live train tracking and zero delay waiting fee.",
    answer: `**Amb Andaura (AADR) Vande Bharat Express Platform Pickup:**

Dutta Tour & Travel operates a dedicated station dispatch desk for the **New Delhi - Amb Andaura Vande Bharat Express (Train 22447 / 22448)**:

• **Platform Meet & Greet:** Your chauffeur waits right outside the platform exit with your name card and helps with all heavy luggage.
• **Live Train Tracking:** Even if the train arrives behind schedule, your cab waits patiently with **ZERO waiting surcharge**.
• **Direct Onward Transfers:**
  - Amb Andaura → Maa Chintpurni Temple (approx 35-40 mins)
  - Amb Andaura → Dharamshala / McLeodganj (approx 3.5 hrs)
  - Amb Andaura → Kangra / Chamunda Devi (approx 2 hrs)
  - Amb Andaura → Manali / Kullu (approx 7-8 hrs)
  - Amb Andaura → Una Town (approx 30 mins)

✅ Commercially licensed cabs with yellow plates, fully air-conditioned, and pre-cooled before you step inside.`,
    action: {
      type: "whatsapp",
      label: "Book Vande Bharat Pickup on WhatsApp",
      query: "Hello Lav Dutta, I need a taxi pickup from Amb Andaura Vande Bharat platform."
    }
  },
  {
    id: "una-railway-station",
    category: "Train Transfers",
    keywords: [
      "una station", "uhl", "una himachal", "una railway", "himachal express", "jan shatabdi",
      "una cab", "una taxi"
    ],
    title: "Una Himachal Railway Station (UHL) Taxi Service",
    summary: "24/7 instant cab dispatch from Prem Nagar Una HQ to Una Railway Station.",
    answer: `**Una Himachal (UHL) Railway Station Cabs:**

Our headquarters in **Prem Nagar, Una** is just 5 minutes from Una Himachal Railway Station:

• **24/7 Availability:** Cabs ready for early morning Himachal Express (14553/14554), Jan Shatabdi Express, and MEMU trains.
• **Local & Outstation:** Quick transfers to Nangal Dam, Mehatpur, Amb, or long outstation trips to Shimla, Manali, Dalhousie, and Chandigarh Airport.
• **Zero Waiting Fee:** Drivers track live PNR/train status to ensure timely pickup without surge fees.`,
    action: {
      type: "whatsapp",
      label: "Book Una Station Cab",
      query: "Hello Lav Dutta, I need a cab from Una Himachal Railway Station."
    }
  },
  {
    id: "chandigarh-airport",
    category: "Airport Transfers",
    keywords: [
      "chandigarh airport", "ixc", "airport", "flight", "terminal", "mohali airport", "shaheed bhagat singh"
    ],
    title: "Una & Amb to Chandigarh Airport (IXC) Taxi",
    summary: "Reliable 3-hour highway drop and pickup with guaranteed on-time flight arrival.",
    answer: `**Una / Amb to Chandigarh International Airport (IXC):**

• **Distance & Time:** Approx. 125 KM via Nangal - Ropar four-lane expressway (about 2.5 to 3 hours).
• **Punctuality Guarantee:** We schedule early departure to account for check-in and security buffers.
• **Vehicles:** Swift Dzire (budget sedan), Maruti Ertiga (family), or Innova Crysta (executive luggage comfort).
• **Airport Pickup:** Chauffeur tracks flight landing time and receives you directly at the Arrival Terminal gate.`,
    action: {
      type: "whatsapp",
      label: "Book Airport Cab on WhatsApp",
      query: "Hello Lav Dutta, I need a cab for Chandigarh Airport (IXC)."
    }
  },
  {
    id: "pricing-fares-transparency",
    category: "Pricing & Fares",
    keywords: [
      "price", "pricing", "rate", "rates", "fare", "fares", "cost", "how much", "kiraya", "charges",
      "hidden", "expensive", "discount", "package cost", "tariff"
    ],
    title: "Transparent Fares & Zero-Price Quotation Policy",
    summary: "100% upfront, transparent quotations with zero hidden surprises or surge fees.",
    answer: `**Honest, Transparent Pricing Policy:**

At Dutta Tour & Travel, founded by **Lav Dutta**, we follow a strict **Zero Hidden Cost Policy**:

• **How Our Quotes Work:**
  1. **Route & Distance:** Rates are calculated on realistic hill kilometers and travel hours.
  2. **Vehicle Selected:** Choice of Sedan (Dzire), Compact SUV (Ertiga), Premium MPV (Innova Crysta), or Luxury Mini-bus (Urbania / Tempo).
  3. **All-Inclusive Option:** We can include vehicle rental, certified driver allowance, state border road taxes, and highway tolls in one transparent quote.
  4. **No Surge Pricing:** No sudden midnight spikes or festival surge traps.

💬 **Why We Give Real-Time Quotes:** Mountain routes vary by stops, season, and passenger needs. Connect directly with Lav Dutta for an honest, best-guaranteed quote in under 5 minutes!`,
    action: {
      type: "whatsapp",
      label: "Get Instant Quote from Lav Dutta",
      query: "Hello Lav Dutta, please provide a customized quote for my journey."
    }
  },
  {
    id: "fleet-cars-capacity",
    category: "Fleet & Vehicles",
    keywords: [
      "fleet", "car", "cars", "vehicle", "vehicles", "innova", "crysta", "ertiga", "dzire", "swift",
      "urbania", "tempo", "traveller", "fortuner", "seats", "seating", "capacity", "luggage", "ac"
    ],
    title: "Our Commercial Tourist Fleet & Seating Options",
    summary: "100% yellow-plate commercial fleet with AC, GPS, pristine cleanliness & mountain suspension.",
    answer: `**Our Commercial Fleet & Passenger Capacities:**

Every vehicle in our fleet carries valid **Himachal Pradesh Commercial Yellow Plates**, comprehensive passenger insurance, and verified tourist permits:

1. **Toyota Innova Crysta (6+1 Seater):**
   - The gold standard for hill travel. Captain seats, superior suspension, dual AC, large boot for 4-5 bags.
2. **Maruti Suzuki Ertiga (6+1 Seater):**
   - Economical, comfortable family MPV with excellent hill agility and clean AC interior.
3. **Swift Dzire (4+1 Seater Sedan):**
   - Best for couples, solo travelers, and small families on budget outstation journeys.
4. **Force Urbania (12+1 Seater Luxury):**
   - European luxury mini-bus with reclining bucket seats, individual AC vents, and panoramic windows.
5. **Tempo Traveller (12 / 16 / 20 Seater):**
   - Spacious group travel for extended family pilgrimages and weddings.
6. **Toyota Fortuner 4x4 (6+1 Seater):**
   - Rugged 4-wheel-drive capability for Spiti Valley, Leh Ladakh, and winter snow trails.`,
    action: {
      type: "page",
      label: "View All Fleet Vehicles",
      path: "/fleet"
    }
  },
  {
    id: "safety-drivers-experience",
    category: "Safety & Chauffeurs",
    keywords: [
      "driver", "drivers", "chauffeur", "safety", "safe", "pahadi", "mountain", "snow", "hills",
      "license", "police", "verified", "elderly", "kids", "night driving"
    ],
    title: "Mountain Safety & Certified Pahadi Chauffeurs",
    summary: "8 to 15+ years of verified mountain driving experience with zero-rush, family-first hospitality.",
    answer: `**Mountain Safety & Chauffeur Excellence:**

Driving on Himachal roads requires specialized mountain instinct, not just city driving skills:

• **100% Verified Local Pahadi Chauffeurs:** Each driver has 8 to 15+ years navigating steep ghats, fog passes, monsoon curves, and snow without sudden braking.
• **Family & Pilgrim Empathy:** Our drivers patiently stop for tea breaks, clean washrooms, photography spots, and elderly walking pace at temple gates.
• **Strict Safety Standards:** 100% zero-alcohol policy, non-smoking cabins, GPS tracking, and speed-governed driving.
• **Night Driving:** Trained and authorized for night outstation journeys to Delhi, Chandigarh, or Amritsar.`,
    action: {
      type: "whatsapp",
      label: "Chat with Lav Dutta",
      query: "Hello Lav Dutta, I have safety and chauffeur related questions."
    }
  },
  {
    id: "booking-process-payment",
    category: "Booking & Payments",
    keywords: [
      "how to book", "booking", "payment", "upi", "cash", "advance", "cancel", "cancellation", "refund",
      "google pay", "phonepe", "paytm", "net banking"
    ],
    title: "Easy Booking Process & Payment Modes",
    summary: "Book in 2 minutes via WhatsApp or phone. Flexible payments via UPI, Cash, or Net Banking.",
    answer: `**How to Book & Payment Options:**

• **Booking Steps:**
  1. Share your travel date, pickup location, destination, and passenger count on WhatsApp or call.
  2. Receive a transparent quote and vehicle photos from Lav Dutta.
  3. Confirm your booking with a small token advance to block the vehicle.

• **Accepted Payment Methods:**
  - UPI (Google Pay, PhonePe, Paytm, BHIM)
  - Cash to driver at trip conclusion
  - Bank Account Transfer (IMPS / NEFT)

• **Flexible Cancellation:**
  - Need to postpone or reschedule due to train delay or family plans? We offer hassle-free rescheduling with zero penalties when informed in advance.`,
    action: {
      type: "whatsapp",
      label: "Start Booking on WhatsApp",
      query: "Hello Lav Dutta, I want to book a taxi."
    }
  },
  {
    id: "char-dham-kedarnath",
    category: "Pilgrimage",
    keywords: [
      "char dham", "chardham", "kedarnath", "badrinath", "gangotri", "yamunotri", "do dham",
      "haridwar", "rishikesh", "uttarakhand yatra"
    ],
    title: "Uttarakhand Char Dham & Do Dham Yatra",
    summary: "Sacred Himalayan pilgrimage to Kedarnath, Badrinath, Gangotri & Yamunotri from Una/Amb.",
    answer: `**Sacred Char Dham & Do Dham Yatra (Kedarnath & Badrinath):**

Embark on the revered pilgrimage to Devbhoomi Uttarakhand starting comfortably from Una or Amb:

• **Full Char Dham (11N/12D):** Yamunotri → Gangotri → Kedarnath Ji → Badrinath Ji with Haridwar & Rishikesh.
• **Do Dham Yatra (6N/7D):** Kedarnath Dham & Badrinath Dham priority circuit.
• **Vehicle Comfort:** Specially tuned Innova Crysta or Force Urbania suited for high-altitude Uttarakhand ghats.
• **Assistance:** Biometric yatra pass guidance, helicopter ticket timing coordination, and mountain-certified driver standby.`,
    action: {
      type: "whatsapp",
      label: "Inquire Char Dham on WhatsApp",
      query: "Hello Lav Dutta, I want to book Char Dham Yatra."
    }
  },
  {
    id: "about-owner-lav-dutta",
    category: "About Us",
    keywords: [
      "owner", "lav dutta", "lav", "who owns", "office", "prem nagar", "address", "phone number",
      "contact number", "call owner", "dutta motors"
    ],
    title: "About Owner Lav Dutta & Prem Nagar HQ",
    summary: "Founded and personally managed by Lav Dutta with 10+ years of trust in Una, Himachal Pradesh.",
    answer: `**About Dutta Tour & Travel & Owner Lav Dutta:**

• **Founder & Managing Director:** **Mr. Lav Dutta**
• **Office Address:** Prem Nagar, Una - Amb Road, Una, Himachal Pradesh - 174303 (Adjacent to Punjab & Sind Bank)
• **Direct Phone Numbers:**
  - Primary: **${PRIMARY_PHONE}**
  - Secondary: **${SECONDARY_PHONE}**
  - WhatsApp: **+91 88940 21277**
• **Operating Hours:** 24 Hours / 7 Days a week (Round-the-clock emergency dispatch)

Mr. Lav Dutta personally oversees vehicle condition, driver allocation, and passenger safety for every journey.`,
    action: {
      type: "tel",
      label: `Call Lav Dutta (${PRIMARY_PHONE})`,
      tel: "09418004510"
    }
  },
  {
    id: "shimla-manali-tours",
    category: "Holiday Tours",
    keywords: [
      "shimla", "manali", "solang", "rohtang", "kufri", "dharamshala", "dalhousie", "khajjiar",
      "himachal tour", "honeymoon", "holiday"
    ],
    title: "Himachal Holiday Circuits (Shimla, Manali, Dalhousie)",
    summary: "Customizable 4 to 8 day holiday packages across Himachal's most beloved hill stations.",
    answer: `**Popular Himachal Holiday Tour Packages:**

• **Una - Manali to Shimla Tour (4N/5D):**
  - Kullu river rafting, Solang Valley snow points, Atal Tunnel, Mall Road Shimla, and Kufri ridge.
• **Una with Dalhousie & Dharamshala (3N/4D):**
  - Dalai Lama Temple, HPCA Stadium, McLeodganj cafes, and Mini-Switzerland Khajjiar.
• **Grand Himachal Circuit (7N/8D):**
  - Complete circuit: Shimla → Kullu → Manali → Dharamshala → Dalhousie → Una.

✅ All packages include private cab with driver dedicated exclusively to your family for all sightseeing and inter-city transfers.`,
    action: {
      type: "whatsapp",
      label: "Plan Holiday on WhatsApp",
      query: "Hello Lav Dutta, I want to discuss a customized Himachal holiday tour."
    }
  },
  {
    id: "ac-in-hills-policy",
    category: "Fleet & Vehicles",
    keywords: ["ac", "air condition", "ac in hills", "ac off", "mountain ac"],
    title: "Air Conditioning (AC) Policy in Hill Areas",
    summary: "Full AC in plain corridors; hill running policy explained clearly upfront.",
    answer: `**Air Conditioning Policy:**

• In plain areas (e.g. Chandigarh, Una, Nangal, highway stretches), the AC runs continuously for your absolute comfort.
• On steep mountain inclines, vehicle engines require maximum power and cool engine temperatures for safe climbing, so AC may be temporarily adjusted on severe uphill hairpin ghats, where fresh mountain air is naturally cool and invigorating.`,
    action: {
      type: "whatsapp",
      label: "Ask Question on WhatsApp",
      query: "Hello Lav Dutta, I have a question about vehicle features."
    }
  }
];

// NLP Matcher: Scores user input against knowledge items
export function findBestBotAnswer(userQuery) {
  if (!userQuery || typeof userQuery !== "string") {
    return getGreetingResponse();
  }

  const rawQuery = userQuery.trim().toLowerCase();

  // 1. Detect simple greetings
  const greetings = ["hi", "hello", "hey", "namaste", "pranam", "good morning", "good evening", "kese ho", "kaise ho", "help"];
  if (greetings.some((g) => rawQuery === g || rawQuery.startsWith(g + " "))) {
    return getGreetingResponse();
  }

  // 2. Tokenize and normalize query
  const cleanQuery = rawQuery
    .replace(/[^\w\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  const tokens = cleanQuery.split(" ").filter((t) => t.length > 1);

  // 3. Synonym map for common traveler vernacular & Hinglish
  const synonyms = {
    gadi: "car", gaadi: "car", gaddi: "car", cab: "car", taxi: "car",
    kiraya: "fare", kitna: "price", paise: "price", cost: "price", rates: "price",
    mandir: "devi", darshan: "devi", mata: "devi", dham: "pilgrimage",
    vande: "vande-bharat", train: "station", platform: "station",
    spiti: "spiti", kaza: "spiti", chandratal: "spiti",
    shiva: "jyotirlinga", mahakal: "jyotirlinga", kedarnath: "kedarnath",
    owner: "lav", lavkush: "lav", number: "contact"
  };

  const expandedTokens = new Set(tokens);
  tokens.forEach((t) => {
    if (synonyms[t]) {
      expandedTokens.add(synonyms[t]);
    }
  });

  // 4. Score each knowledge item
  let bestMatch = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;

    // Check exact keyword matches
    for (const kw of item.keywords) {
      const kwLower = kw.toLowerCase();
      if (cleanQuery.includes(kwLower)) {
        score += kwLower.split(" ").length * 5; // Multi-word keyword match gets big boost
      }
      for (const token of expandedTokens) {
        if (kwLower === token) {
          score += 3;
        } else if (kwLower.includes(token) && token.length > 3) {
          score += 1;
        }
      }
    }

    // Title / Summary bonus
    if (item.title.toLowerCase().includes(cleanQuery)) score += 10;
    if (item.summary.toLowerCase().includes(cleanQuery)) score += 5;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // If match threshold is met, return the answer
  if (bestMatch && highestScore >= 3) {
    return {
      found: true,
      title: bestMatch.title,
      answer: bestMatch.answer,
      action: bestMatch.action,
      relatedSuggestions: QUICK_SUGGESTIONS.filter((s) => s.id !== bestMatch.id).slice(0, 3)
    };
  }

  // 5. Intelligent Fallback: Warm, genuine answer with direct WhatsApp link
  return {
    found: false,
    title: "Personalized Chauffeur Assistance",
    answer: `Thank you for your question! We want to give you the most accurate and genuine answer for your specific journey.

Because hill routes, temple darshan timings, and vehicle availability can vary depending on weather and group size, **Lav Dutta** (Founder & Managing Director) is ready to assist you right now with real-time route advice and an honest quote.

📞 **Call Directly:** [${PRIMARY_PHONE}](tel:09418004510) or [${SECONDARY_PHONE}](tel:08219477943)
💬 **Instant WhatsApp:** Click the button below to message Lav Dutta directly with your exact query.`,
    action: {
      type: "whatsapp",
      label: "Ask Lav Dutta on WhatsApp",
      query: `Hello Lav Dutta, I have a query: "${userQuery}"`
    },
    relatedSuggestions: QUICK_SUGGESTIONS.slice(0, 4)
  };
}

export function getGreetingResponse() {
  return {
    found: true,
    title: "Namaste & Welcome to Dutta Tour & Travel!",
    answer: `Namaste! I am the **Dutta Chauffeur Desk AI Assistant**, here 24/7 to help you plan your journey across Himachal Pradesh and North India.

How can I assist you today?
• 🕉️ **6 Sacred Devi Darshan Yatra** (Chintpurni, Jwala Ji, Baglamukhi, Kangra, Chamunda & Naina Devi)
• 🔱 **12 Jyotirlinga Mahayatra** (Customized Pan-India Shiva Circuits)
• 🏔️ **Spiti Valley Road Trip** (8N/9D Middle Land Circuit)
• 🚄 **Amb Andaura Vande Bharat Platform Pickup** (Zero waiting fee)
• 🚘 **Fleet & Honest Pricing** (Innova Crysta, Ertiga, Dzire, Urbania, Fortuner)
• 📞 **Speak Directly with Owner Lav Dutta**

Select a quick topic below or type your question in English or Hindi!`,
    relatedSuggestions: QUICK_SUGGESTIONS
  };
}
