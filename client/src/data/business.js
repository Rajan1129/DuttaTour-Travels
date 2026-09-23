// Single source of truth for real Mandyal Tour & Travel business information.
// Every page pulls from here so no page invents or duplicates business facts.

const loadStorage = (key, defaultVal) => {
  if (typeof window === "undefined") return JSON.parse(JSON.stringify(defaultVal));
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return JSON.parse(JSON.stringify(defaultVal));
    const parsed = JSON.parse(saved);
    if (key === "mandyal_admin_tours" && Array.isArray(parsed)) {
      const index4 = parsed.findIndex((t) => t.slug === "4-char-devi-darshan");
      const new6 = defaultVal.find((t) => t.slug === "6-devi-darshan-yatra");
      if (index4 !== -1 && new6) {
        parsed[index4] = JSON.parse(JSON.stringify(new6));
      }
      const existingSlugs = new Set(parsed.map((t) => t.slug));
      let updated = false;
      defaultVal.forEach((t) => {
        if (!existingSlugs.has(t.slug)) {
          parsed.push(JSON.parse(JSON.stringify(t)));
          updated = true;
        }
      });
      if (updated || index4 !== -1) {
        localStorage.setItem(key, JSON.stringify(parsed));
      }
    }
    return parsed;
  } catch (e) {
    return JSON.parse(JSON.stringify(defaultVal));
  }
};

export const defaultBusiness = {
  name: "Mandyal Tour & Travels",
  legalTradeNames: ["Mandyal Tour and Travels", "Mandyal Motors"],
  tagline: "Una's trusted travel service",
  description:
    "Cab service and tempo traveller rentals based in Una, Himachal Pradesh, offering local taxi, outstation taxi, railway and airport transfers, and Himachal tour packages.",
  location: {
    city: "Una",
    state: "Himachal Pradesh",
    country: "India",
    addressLine: "F796+M34, Adjacent Punjab & Sind Bank, Una-Amb Road, Prem Nagar",
    postalCode: "174303",
    fullAddress:
      "F796+M34, Adjacent Punjab & Sind Bank, Una-Amb Road, Prem Nagar, Una, Himachal Pradesh 174303",
  },
  phones: ["+91 7807481503"],
  phonesTel: ["+917807481503"],
  whatsappNumber: "917807481503",
  email: "manojmadiyal243@gmail.com",
  siteUrl: "https://mandyaltourandtravels.in",
};

export const defaultFleet = [
  {
    slug: "innova-crysta",
    name: "Toyota Innova Crysta",
    category: "SUV / MPV",
    group: "suv",
    tag: "SUV / MPV",
    tagColor: "bg-blue-50 text-blue-700",
    imageBadge: "Amb Andaura to Dharamshala Taxi",
    seats: "6+1 Seats",
    bags: "4 Bags",
    comfort: "Dual AC",
    image: "/images/fleet/innova-crysta.jpg",
    description:
      "The gold standard for Himachal hill roads. Incredible suspension, captain seating, and ample boot space for luggage.",
  },
  {
    slug: "maruti-ertiga",
    name: "Maruti Ertiga",
    category: "Compact MPV",
    group: "suv",
    tag: "Compact MPV",
    tagColor: "bg-indigo-50 text-indigo-700",
    imageBadge: "Devi Darshan Tour Operator Una",
    seats: "6+1 Seats",
    bags: "3 Bags",
    comfort: "AC / Heater",
    image: "/images/fleet/maruti-ertiga.jpg",
    description:
      "Economical 7-seater option ideal for family pilgrimage trips to Chintpurni, Jwala Ji, and Kangra Valley.",
  },
  {
    slug: "sedan",
    name: "Swift Dzire / Amaze / Etios",
    category: "Sedan",
    group: "sedan",
    tag: "Sedan",
    tagColor: "bg-blue-50 text-blue-700",
    imageBadge: "Affordable Himachal Car Rental",
    seats: "4+1 Seats",
    bags: "2 Big Bags",
    comfort: "AC Cab",
    image: "/images/fleet/swift-dzire.jpg",
    description:
      "Smooth, fuel-efficient sedans tailored for airport drops, station transfers, couples, and budget outstation travel.",
  },
  {
    slug: "force-urbania",
    name: "Force Urbania (Luxury)",
    category: "Luxury Van",
    group: "tempo",
    tag: "Luxury Van",
    tagColor: "bg-purple-50 text-purple-700",
    imageBadge: "Executive VIP Comfort",
    badgeStyle: "red",
    seats: "10-14 Seats",
    bags: "Large Boot",
    comfort: "USB + LED",
    image: "/images/fleet/force-urbania.jpg",
    description:
      "First-class passenger coach experience with reclining pushback captain seats, panoramic windows, and individual AC vents.",
  },
  {
    slug: "tempo-traveller",
    name: "Tempo Travellers (9-26 Seater)",
    category: "Mini Coach",
    group: "tempo",
    tag: "Mini Coach",
    tagColor: "bg-blue-50 text-blue-700",
    imageBadge: "Large Family & Pilgrimage",
    seats: "12-26 Seats",
    bags: "Roof Carrier",
    comfort: "Blower AC",
    image: "/images/fleet/tempo-traveller.jpg",
    description:
      "12, 16, 20, and 26-seater modified configurations. Pushback seats, high roof, music system, and heavy mountain carriers.",
  },
  {
    slug: "fortuner-4x4",
    name: "Toyota Fortuner 4x4",
    category: "Luxury SUV",
    group: "suv",
    tag: "Luxury SUV",
    tagColor: "bg-amber-50 text-amber-800",
    imageBadge: "Himachal Taxi Booking 4x4",
    seats: "6+1 Seats",
    bags: "4x4 Terrain",
    comfort: "VIP Styling",
    image: "/images/fleet/fortuner-4x4.jpg",
    description:
      "Unstoppable high-altitude SUV designed for Spiti Valley, Leh Ladakh, VIP delegations, and wedding car rentals in Himachal.",
  },
];

// Tour packages referenced on the site matching design
export const defaultTourPackages = [
  {
    slug: "una-dalhousie-dharamshala",
    name: "Una with Dalhousie & Dharamshala",
    duration: "3 Nights / 4 Days",
    circuitBadge: "Himachal Leisure",
    featureNote: "Innova / Dzire / Tempo",
    whatsappNote: "Details for Una Dalhousie Dharamshala Tour (3N/4D)",
    image: "/images/tours/una-dalhousie-dharamshala.jpg",
    summary:
      "Covers McLeodganj Dalai Lama Temple, St. John Church, Khajjiar Switzerland of India, and scenic viewpoints across Chamba.",
    category: "himachal",
  },
  {
    slug: "6-devi-darshan-yatra",
    name: "6 Sacred Devi Darshan Yatra",
    duration: "5 Nights / 6 Days",
    circuitBadge: "6 Holy Shaktipeeths",
    featureNote: "Chintpurni • Jwala Ji • Baglamukhi • Kangra • Chamunda • Naina Devi",
    whatsappNote: "Details for 6 Devi Darshan Yatra (5N/6D)",
    image: "/images/tours/6-devi-darshan.jpg",
    summary:
      "Complete pilgrimage to all 6 sacred shrines: Maa Chintpurni, Maa Jwala Ji (Eternal Flame), Maa Baglamukhi Temple (Bankhandi Siddhapeeth), Maa Kangra Brajeshwari Devi, Maa Chamunda Nandikeshwar, and Maa Naina Devi Temple (Bilaspur) with Anandpur Sahib halt.",
    category: "yatra",
  },
  {
    slug: "12-jyotirlinga-darshan-yatra",
    name: "12 Jyotirlinga Darshan Yatra",
    duration: "Customized Pan-India Circuits",
    circuitBadge: "Sacred Mahadev Yatra",
    featureNote: "Kedarnath • Somnath • Mahakal • Kashi • Rameshwaram & Pan-India",
    whatsappNote: "Details for 12 Jyotirlinga Darshan Yatra",
    image: "/images/tours/12-jyotirlinga.jpg",
    summary:
      "Comprehensive pilgrimage covering Lord Shiva's 12 holy Jyotirlingas with dedicated sanitized cabs, experienced chauffeurs, senior citizen assistance, and VIP darshan guidance.",
    category: "yatra",
  },
  {
    slug: "spiti-valley-circuit",
    name: "Spiti Valley Road Trip & High-Altitude Circuit",
    duration: "8 Nights / 9 Days",
    circuitBadge: "Middle Land Adventure",
    featureNote: "Kaza • Key Monastery • Chandratal Lake • Hikkim • Atal Tunnel",
    whatsappNote: "Details for Spiti Valley Circuit Tour (8N/9D)",
    image: "/images/tours/spiti-valley.jpg",
    summary:
      "Epic trans-Himalayan expedition via Shimla, Kinnaur, Kalpa, Tabo, Kaza, Key Monastery, Kibber, world's highest post office at Hikkim, Komik, Langza, Chandratal Lake, Kunzum Pass, and Atal Tunnel Manali.",
    category: "himachal",
  },
  {
    slug: "una-manali-shimla",
    name: "Una - Manali to Shimla Tour",
    duration: "4 Nights / 5 Days",
    circuitBadge: "Honeymoon & Family",
    featureNote: "Complete Hill Transfer",
    whatsappNote: "Details for Una Manali Shimla Tour (4N/5D)",
    image: "/images/tours/una-manali-shimla.jpg",
    summary:
      "Kullu river rafting, Solang valley paragliding, Atal tunnel excursion, followed by Shimla Mall Road, Lakkar Bazaar, and Jakhoo Temple.",
    category: "himachal",
  },
  {
    slug: "shimla-manali-dharamshala-dalhousie",
    name: "Shimla Manali Dharamshala Dalhousie",
    duration: "7 Nights / 8 Days",
    circuitBadge: "Grand Himachal Circuit",
    featureNote: "All Entry/Permit Support",
    whatsappNote: "Details for Grand 7N8D Himachal Tour",
    image: "/images/tours/shimla-manali-dharamshala-dalhousie.jpg",
    summary:
      "The supreme Himachal expedition covering every iconic hill town, concluding with smooth drop at Chandigarh or Una Railway station.",
    category: "himachal",
  },
  {
    slug: "kashmir-katra",
    name: "Kashmir, Katra - Una Package",
    duration: "7 Nights / 8 Days",
    circuitBadge: "Kashmir Valley + Yatra",
    featureNote: "Houseboat + Cab Combo",
    whatsappNote: "Details for Kashmir Katra Package (7N/8D)",
    image: "/images/tours/kashmir-katra.jpg",
    summary:
      "Vaishno Devi Katra darshan combined with Srinagar Dal Lake houseboat stay, Gulmarg gondola ride, Sonmarg, and Pahalgam.",
    category: "kashmir",
  },
  {
    slug: "leh-ladakh",
    name: "Leh Ladakh Tour Package",
    duration: "5 Nights / 6 Days",
    circuitBadge: "High Altitude 4x4",
    featureNote: "Oxygen Kit & 4x4 Fortuner",
    whatsappNote: "Details for Leh Ladakh Package (5N/6D)",
    image: "/images/tours/leh-ladakh.jpg",
    summary:
      "Khardung La pass (highest motorable road), Pangong Tso lake, Nubra valley sand dunes with double-humped camels, and Leh monasteries.",
    category: "ladakh",
  },
  {
    slug: "uttarakhand-char-dham",
    name: "Uttarakhand Complete Char Dham Yatra",
    duration: "10 Nights / 11 Days",
    circuitBadge: "Holy Char Dham",
    featureNote: "Yamunotri • Gangotri • Kedarnath • Badrinath",
    whatsappNote: "Details for Complete Uttarakhand Char Dham Yatra (10N/11D)",
    image: "/images/tours/6-devi-darshan.jpg",
    summary:
      "Sacred pilgrimage to Yamunotri, Gangotri, Kedarnath Jyotirlinga, and Badrinath Dham with Haridwar Ganga Aarti and Rishikesh.",
    category: "yatra",
  },
  {
    slug: "do-dham-kedarnath-badrinath",
    name: "Do Dham Yatra (Kedarnath & Badrinath)",
    duration: "5 Nights / 6 Days",
    circuitBadge: "Do Dham Sacred Yatra",
    featureNote: "Innova / Ertiga / Tempo",
    whatsappNote: "Details for Do Dham Kedarnath Badrinath Yatra (5N/6D)",
    image: "/images/tours/12-jyotirlinga.jpg",
    summary:
      "Direct darshan of Lord Shiva at Kedarnath Dham and Lord Badri Vishal at Badrinath Dham with Haridwar and Rishikesh.",
    category: "yatra",
  },
];

// Destinations / routes with distances and highlights matching design
export const defaultDestinations = [
  {
    slug: "una-to-shimla-taxi",
    name: "Shimla Taxi Service",
    routeTitle: "Una to Shimla Taxi Service",
    distanceKm: 180,
    duration: "4.5 - 5 Hours",
    highway: "NH-503 & NH-205 via Bilaspur AIIMS",
    startingFare: "Best Rate Guarantee",
    stops: "Mall Road • Kufri • Narkanda",
    image: "/images/destinations/shimla.jpg",
    summary:
      "Comfortable hill journey connecting Una with the Queen of Hills. Scenic drive passing Govind Sagar Lake, Bilaspur, and Shalaghat.",
    keyPlaces: ["Shimla Mall Road", "The Ridge", "Jakhoo Hanuman Temple", "Kufri Snow Point", "Narkanda Hatu Peak"],
    faqs: [
      {
        q: "How long does it take by taxi from Una to Shimla?",
        a: "The driving distance is approximately 180 KM and typically takes 4.5 to 5 hours depending on mountain traffic and photo stops.",
      },
      {
        q: "Can we book Amb Andaura Railway Station pickup for Shimla?",
        a: "Yes! Our chauffeur will receive you directly at Amb Andaura (AADR) Railway Station upon Vande Bharat arrival and drive directly to Shimla.",
      },
      {
        q: "What cab models are available for Una to Shimla?",
        a: "We provide Toyota Innova Crysta, Maruti Ertiga, Swift Dzire, Toyota Fortuner 4x4, and 12-26 Seater Tempo Travellers.",
      },
    ],
  },
  {
    slug: "una-to-manali-taxi",
    name: "Manali Taxi Service",
    routeTitle: "Una to Manali Taxi Service",
    distanceKm: 240,
    duration: "6 - 7 Hours",
    highway: "Kiratpur-Nerchowk 4-Lane & NH-21",
    startingFare: "Best Rate Guarantee",
    stops: "Solang • Atal Tunnel • Old Manali",
    image: "/images/destinations/manali.jpg",
    summary:
      "Travel smoothly to the valley of gods with experienced mountain drivers. Access Atal Tunnel, Solang adventure valley, and Rohtang Pass.",
    keyPlaces: ["Solang Valley", "Atal Tunnel Sissu", "Hadimba Devi Temple", "Kullu River Rafting", "Jogini Waterfalls"],
    faqs: [
      {
        q: "Is the new Kiratpur-Nerchowk 4-lane expressway active?",
        a: "Yes! The new 4-lane highway significantly reduces travel time, bypasses congested ghats, and makes the journey much smoother.",
      },
      {
        q: "Can we visit Sissu (Lahaul) via Atal Tunnel in the same cab?",
        a: "Yes, our drivers have valid permits and high-altitude experience to take you across Atal Tunnel into North Portal and Sissu.",
      },
      {
        q: "Which vehicle is recommended for a family trip to Manali?",
        a: "Toyota Innova Crysta or Maruti Ertiga is highly recommended for supreme comfort, dual AC/heating, and ample boot space.",
      },
    ],
  },
  {
    slug: "una-to-dharamshala-taxi",
    name: "Dharamshala Taxi",
    routeTitle: "Una to Dharamshala & McLeodganj Taxi",
    distanceKm: 125,
    duration: "3 - 3.5 Hours",
    highway: "NH-503 via Kangra Valley",
    startingFare: "Best Rate Guarantee",
    stops: "McLeodganj • HPCA • Bhagsu",
    image: "/images/destinations/dharamshala.jpg",
    summary:
      "Fastest and most popular connection from Una and Amb Andaura Railway Station to the residence of His Holiness the Dalai Lama and HPCA Stadium.",
    keyPlaces: ["Dalai Lama Temple", "HPCA International Stadium", "Bhagsu Nag Waterfall", "St. John in the Wilderness", "Naddi Viewpoint"],
    faqs: [
      {
        q: "How far is McLeodganj from Amb Andaura Railway Station?",
        a: "It is approximately 115 KM from Amb Andaura Railway Station, taking about 3 hours via our hill taxi service.",
      },
      {
        q: "Do you offer direct platform pickup for Vande Bharat Express?",
        a: "Yes, our driver arrives 15 minutes before train arrival with your name display for immediate, hassle-free boarding.",
      },
      {
        q: "Can we cover Kangra Temple on the way to Dharamshala?",
        a: "Certainly! We can easily include a darshan stopover at Maa Kangra Brajeshwari Devi temple en route.",
      },
    ],
  },
  {
    slug: "una-to-dalhousie-taxi",
    name: "Una to Dalhousie",
    routeTitle: "Una to Dalhousie & Khajjiar Taxi",
    distanceKm: 195,
    duration: "5 - 5.5 Hours",
    highway: "via Pathankot, Nurpur & Banikhet",
    startingFare: "Best Rate Guarantee",
    stops: "Khajjiar • Dainkund • Kalatop",
    image: "/images/destinations/dalhousie.jpg",
    summary:
      "Explore the Switzerland of India. Pine-forested valleys, snow-capped Dhauladhar panoramas, and lush meadows of Khajjiar.",
    keyPlaces: ["Khajjiar Lake & Meadow", "Dainkund Peak", "Kalatop Wildlife Sanctuary", "St. John Church", "Subhash Baoli"],
    faqs: [
      {
        q: "Can the taxi drive all the way inside Khajjiar meadow?",
        a: "Yes, our cabs drop you right at the entrance of Khajjiar meadow and remain on standby while you enjoy activities.",
      },
      {
        q: "What is the road condition between Una and Dalhousie?",
        a: "The roads are well-maintained state and national highways with scenic hill winding sections between Banikhet and Dalhousie.",
      },
    ],
  },
  {
    slug: "una-to-kangra-taxi",
    name: "Kangra Taxi Service",
    routeTitle: "Una to Kangra & Devi Temples Taxi",
    distanceKm: 90,
    duration: "2 - 2.5 Hours",
    highway: "NH-503 via Ranital & Chintpurni Cut",
    startingFare: "Best Rate Guarantee",
    stops: "Kangra Fort • Brajeshwari Devi",
    image: "/images/destinations/kangra.jpg",
    summary:
      "A quick sacred journey into Kangra Valley. Perfect for pilgrim day-trips, Kangra Fort heritage visits, and Gaggal Airport connectivity.",
    keyPlaces: ["Maa Brajeshwari Devi", "Historic Kangra Fort", "Jayanti Mata Temple", "Gaggal Kangra Airport", "Gupt Ganga"],
    faqs: [
      {
        q: "Can we combine Chintpurni, Jwala Ji and Kangra in a single day?",
        a: "Yes! Our specialized Devi Darshan day circuit covers Chintpurni, Jwala Ji, and Kangra Devi with timely temple VIP guidance.",
      },
    ],
  },
  {
    slug: "una-to-amritsar-taxi",
    name: "Amritsar Golden Temple",
    routeTitle: "Una to Amritsar Golden Temple Taxi",
    distanceKm: 160,
    duration: "3.5 - 4 Hours",
    highway: "via Hoshiarpur, Jalandhar & GT Road",
    startingFare: "Best Rate Guarantee",
    stops: "Harmandir Sahib • Wagah Border",
    image: "/images/destinations/amritsar.jpg",
    summary:
      "Direct highway cab connecting Una to the spiritual heart of Punjab. Timed drops for Wagah Border parade ceremony and Golden Temple night darshan.",
    keyPlaces: ["Sri Harmandir Sahib (Golden Temple)", "Attari-Wagah Border Parade", "Jallianwala Bagh", "Partition Museum", "Gobindgarh Fort"],
    faqs: [
      {
        q: "Can the cab take us directly to Wagah Border ceremony?",
        a: "Yes! We schedule departure from Una so you comfortably reach the border before 3:30 PM for seats.",
      },
    ],
  },
  {
    slug: "una-to-chandigarh-taxi",
    name: "Una to Chandigarh",
    routeTitle: "Una to Chandigarh Airport & City Taxi",
    distanceKm: 115,
    duration: "2.5 Hours",
    highway: "via Nangal, Anandpur Sahib & Ropar",
    startingFare: "Best Rate Guarantee",
    stops: "Airport • PGI • Sector 17 • IT Park",
    image: "/images/destinations/chandigarh.jpg",
    summary:
      "Punctual, dedicated airport taxi and city transfer service. 24/7 drops for early morning and late night flights at Shaheed Bhagat Singh Airport (IXC).",
    keyPlaces: ["Chandigarh International Airport (IXC)", "PGI Chandigarh", "Sector 17 Plaza", "Sukhna Lake", "Elante Mall"],
    faqs: [
      {
        q: "Do you offer round-the-clock midnight pickups for airport flights?",
        a: "Yes, our drivers are available 24 hours a day with guaranteed on-time doorstep pickup in Una, Nangal, and Mehatpur.",
      },
    ],
  },
  {
    slug: "una-to-katra-taxi",
    name: "Una to Katra Yatra",
    routeTitle: "Una to Katra Vaishno Devi Taxi",
    distanceKm: 310,
    duration: "6.5 - 7 Hours",
    highway: "via Dasuya, Mukerian, Pathankot & Jammu Express",
    startingFare: "Best Rate Guarantee",
    stops: "Vaishno Devi • Shivkhori",
    image: "/images/destinations/katra.jpg",
    summary:
      "Sacred pilgrimage taxi for Mata Vaishno Devi Shrine at Katra. Round-trip packages with waiting options and onward Shivkhori cave excursions.",
    keyPlaces: ["Mata Vaishno Devi Bhawan", "Banganga", "Ardhkuwari Cave", "Bhairon Temple", "Shivkhori Cave Shrine"],
    faqs: [
      {
        q: "How does waiting charge work for Katra Vaishno Devi yatra?",
        a: "We offer all-inclusive 2-day and 3-day Katra packages where driver stay and vehicle parking in Katra are completely covered.",
      },
    ],
  },
];

export const defaultStats = [
  { label: "Taxi Rentouts", value: "990+" },
  { label: "Tour Itineraries", value: "230+" },
  { label: "Happy Pilgrims", value: "660+" },
  { label: "Hillside Help", value: "24/7" },
];

export const defaultTestimonials = [
  {
    name: "Aravind Mohandas",
    initials: "AM",
    color: "bg-amber-600",
    quote:
      "Very good experience. Company owner (Manoj Mandyal) is very humble and very nice in talking. The Driver Raj Kumar (Ricky) was not Driver for us in the three days trip to Manikaran Sahib, he become like family member for us. Stopped the Car whenever asked him to because we were travelling with little kids.",
  },
  {
    name: "Sunil Mittal",
    initials: "SM",
    color: "bg-blue-600",
    quote:
      "Hired taxi from Mandyal Tour and Travels this month from Shimla and Manali with family. I fully satisfied with the service, the cab was very good condition and neat and clean. The driver Mr. Raj Kumar was cooperative and helpful in guiding us the entire trip. Thanks owner Mr. Manoj Mandyal.",
  },
  {
    name: "Aditya Singh",
    initials: "AS",
    color: "bg-rose-600",
    quote:
      "Used Mandyal Tour and Travels for a three-day excursion for Amritsar and had a wonderful time. Mr. Ravi, the driver, was very courteous, professional, and cooperative. Will use them once more when necessary. Highly advise using their services if you want a hassle-free trip.",
  },
  {
    name: "Agastya Garg",
    initials: "AG",
    color: "bg-orange-600",
    quote:
      "Recently booked a cab with Mandyal Tour and Travels and had an amazing experience. He was really friendly, soft-spoken, and made sure I had a safe and smooth ride to Shimla, Manali 7 days tour. I highly recommend him as a cab driver. Thanks, for the great service!",
  },
];

// Live editable data instances synced with localStorage
export const business = loadStorage("mandyal_admin_business", defaultBusiness);
export const fleet = loadStorage("mandyal_admin_fleet", defaultFleet);
export const destinations = loadStorage("mandyal_admin_destinations", defaultDestinations);
export const tourPackages = loadStorage("mandyal_admin_tours", defaultTourPackages);
export const stats = loadStorage("mandyal_admin_stats", defaultStats);
export const testimonials = loadStorage("mandyal_admin_testimonials", defaultTestimonials);

export const whatsappLink = (message) =>
  `https://wa.me/${business.whatsappNumber || "917807481503"}?text=${encodeURIComponent(message)}`;

// Admin sync functions to persist edits and update live in-memory objects
export function saveBusiness(newBusiness) {
  Object.assign(business, newBusiness);
  if (business.phones && business.phones.length) {
    business.phonesTel = business.phones.map((p) => p.replace(/\s+/g, ""));
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("mandyal_admin_business", JSON.stringify(business));
    window.dispatchEvent(new Event("mandyal_data_updated"));
    window.dispatchEvent(new Event("mandyal_data_updated"));
  }
}

export function saveFleet(newFleet) {
  fleet.length = 0;
  fleet.push(...newFleet);
  if (typeof window !== "undefined") {
    localStorage.setItem("mandyal_admin_fleet", JSON.stringify(fleet));
    window.dispatchEvent(new Event("mandyal_data_updated"));
    window.dispatchEvent(new Event("mandyal_data_updated"));
  }
}

export function saveDestinations(newDestinations) {
  destinations.length = 0;
  destinations.push(...newDestinations);
  if (typeof window !== "undefined") {
    localStorage.setItem("mandyal_admin_destinations", JSON.stringify(destinations));
    window.dispatchEvent(new Event("mandyal_data_updated"));
    window.dispatchEvent(new Event("mandyal_data_updated"));
  }
}

export function saveTourPackages(newTours) {
  tourPackages.length = 0;
  tourPackages.push(...newTours);
  if (typeof window !== "undefined") {
    localStorage.setItem("mandyal_admin_tours", JSON.stringify(tourPackages));
    window.dispatchEvent(new Event("mandyal_data_updated"));
    window.dispatchEvent(new Event("mandyal_data_updated"));
  }
}

export function saveStats(newStats) {
  stats.length = 0;
  stats.push(...newStats);
  if (typeof window !== "undefined") {
    localStorage.setItem("mandyal_admin_stats", JSON.stringify(stats));
    window.dispatchEvent(new Event("mandyal_data_updated"));
    window.dispatchEvent(new Event("mandyal_data_updated"));
  }
}

export function saveTestimonials(newTestimonials) {
  testimonials.length = 0;
  testimonials.push(...newTestimonials);
  if (typeof window !== "undefined") {
    localStorage.setItem("mandyal_admin_testimonials", JSON.stringify(testimonials));
    window.dispatchEvent(new Event("mandyal_data_updated"));
    window.dispatchEvent(new Event("mandyal_data_updated"));
  }
}

// Automatically logs any customer booking from the website directly into the Admin Inquiries / Dispatch Desk
export function recordBookingInquiry({ name, phone, pickup, drop, car, date, notes }) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("mandyal_admin_inquiries");
    const parsed = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(parsed)
      ? parsed.filter(
          (inq) =>
            inq.id !== "inq-101" &&
            inq.id !== "inq-102" &&
            inq.name !== "Rajesh Kumar" &&
            inq.name !== "Sunil Sharma"
        )
      : [];
    const newEntry = {
      id: "inq-" + Date.now(),
      date: date || new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      name: name || "Website Traveler",
      phone: phone || "Not provided",
      pickup: pickup || "Una / Amb",
      drop: drop || "Himachal Route",
      car: car || "Selected Vehicle",
      notes: notes || "",
      status: "Confirmed",
    };
    list.unshift(newEntry);
    localStorage.setItem("mandyal_admin_inquiries", JSON.stringify(list));
    window.dispatchEvent(new Event("mandyal_inquiries_updated"));
    window.dispatchEvent(new Event("mandyal_inquiries_updated"));
  } catch (err) {
    console.error("Failed to save booking inquiry", err);
  }
}

export function resetAllData() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("mandyal_admin_business");
    localStorage.removeItem("mandyal_admin_fleet");
    localStorage.removeItem("mandyal_admin_destinations");
    localStorage.removeItem("mandyal_admin_tours");
    localStorage.removeItem("mandyal_admin_stats");
    localStorage.removeItem("mandyal_admin_testimonials");
    localStorage.removeItem("mandyal_admin_inquiries");
  }
  Object.keys(business).forEach((k) => delete business[k]);
  Object.assign(business, JSON.parse(JSON.stringify(defaultBusiness)));

  fleet.length = 0;
  fleet.push(...JSON.parse(JSON.stringify(defaultFleet)));

  destinations.length = 0;
  destinations.push(...JSON.parse(JSON.stringify(defaultDestinations)));

  tourPackages.length = 0;
  tourPackages.push(...JSON.parse(JSON.stringify(defaultTourPackages)));

  stats.length = 0;
  stats.push(...JSON.parse(JSON.stringify(defaultStats)));

  testimonials.length = 0;
  testimonials.push(...JSON.parse(JSON.stringify(defaultTestimonials)));

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("mandyal_data_updated"));
    window.dispatchEvent(new Event("mandyal_data_updated"));
  }
}
