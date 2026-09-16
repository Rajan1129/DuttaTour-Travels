import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { business, destinations, fleet, whatsappLink, recordBookingInquiry } from "../data/business";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "../data/schema";

const ambFaqs = [
  {
    question: "How do I book a taxi from Amb Andaura Railway Station (AADR) for Vande Bharat Express?",
    answer:
      "You can pre-book your taxi by calling +91 7807481503 or booking via WhatsApp with your train arrival time (e.g. Vande Bharat Express 22447 at 13:00). Our chauffeur will be waiting outside the platform with a meet-and-greet name board and assist with your luggage.",
  },
  {
    question: "What is the taxi fare from Amb Andaura to Maa Chintpurni Devi Temple?",
    answer:
      "Amb Andaura to Chintpurni is approximately 26 km (35 to 40 minutes via NH-503). We offer the most competitive, transparent rates for private Sedans (Dzire/Etios), 6-seater SUVs (Ertiga/Innova), and Tempo Travellers. Both one-way drop and round-trip same-day darshan options are available. Contact our chauffeur desk for an instant quote.",
  },
  {
    question: "Can I get a cab from Amb to Dharamshala, McLeodganj, or Kangra?",
    answer:
      "Yes! Amb Andaura is the primary railhead for Kangra Valley. We provide direct hill taxis from Amb to Dharamshala (92 km, ~2.5 hrs), McLeodganj, Kangra Fort, Chamunda Devi, and Palampur with experienced mountain chauffeurs.",
  },
  {
    question: "Is early-morning or late-night taxi pickup available at Amb station?",
    answer:
      "Yes, our taxi desk operates 24/7. We cater to all early-morning train arrivals (such as Himachal Express arriving at ~07:35 AM) and late-night train departures. Prior booking ensures your cab is parked ready before your train pulls into the station.",
  },
  {
    question: "Are commercial yellow-plate cabs provided with proper luggage space?",
    answer:
      "100% of our cabs have commercial HP yellow number plates, all-India tourist permits, and ample boot space (including roof carriers for large bags on SUVs and Tempo Travellers) to comfortably carry all family luggage.",
  },
];

const ambPopularRoutes = [
  {
    destination: "Maa Chintpurni Devi Ji Dham",
    distance: "26 KM",
    duration: "35-40 Mins",
    route: "Via NH-503 / Bharwain",
    fleetAvailable: "Dzire, Ertiga, Innova Crysta",
    popularFor: "Pilgrimage / Shaktipeeth Yatra",
    badge: "Most Booked",
  },
  {
    destination: "Dharamshala & McLeodganj",
    distance: "92 KM",
    duration: "2.5 - 3 Hours",
    route: "Via NH-503 / Kangra Bypass",
    fleetAvailable: "Dzire, Ertiga, Innova, Urbania",
    popularFor: "Hill Station / Dalai Lama Temple",
    badge: "Scenic Hill Route",
  },
  {
    destination: "Maa Jawala Ji Temple",
    distance: "45 KM",
    duration: "1 Hour 15 Mins",
    route: "Via Dehra Gopipur Route",
    fleetAvailable: "Dzire, Etios, Ertiga, Innova",
    popularFor: "Eternal Flame Pilgrimage",
    badge: "Temple Circuit",
  },
  {
    destination: "Maa Kangra Brajeshwari Devi",
    distance: "72 KM",
    duration: "1.8 - 2 Hours",
    route: "Via Ranital / Kangra Town",
    fleetAvailable: "Dzire, Ertiga, Innova Crysta",
    popularFor: "51 Shaktipeeth Circuit",
    badge: "Heritage & Faith",
  },
  {
    destination: "Una City HQ & Una Station (UHL)",
    distance: "32 KM",
    duration: "35-40 Mins",
    route: "Via Una-Amb Highway NH-503",
    fleetAvailable: "Dzire, Etios, Ertiga, Innova",
    popularFor: "Intercity Transit & Hospitals",
    badge: "Local Transit",
  },
  {
    destination: "Chandigarh City & Airport (IXC)",
    distance: "150 KM",
    duration: "3.5 Hours",
    route: "Via Nangal / Anandpur Sahib",
    fleetAvailable: "Dzire, Ertiga, Innova Crysta",
    popularFor: "Airport Flights & Business",
    badge: "Airport Express",
  },
];

export default function TaxiServiceAmb() {
  const seo = seoConfig.taxiServiceAmb;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi Services", path: "/taxi-services" },
    { name: "Taxi Service in Amb" },
  ];

  // Booking Form State
  const [bookingTab, setBookingTab] = useState("station"); // "station" | "chintpurni" | "outstation"
  const [pickupLocation, setPickupLocation] = useState("Amb Andaura Railway Station (AADR)");
  const [destinationCircuit, setDestinationCircuit] = useState("Maa Chintpurni Devi Ji Dham");
  const [travelDate, setTravelDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [vehicleType, setVehicleType] = useState("Innova Crysta");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Tab change handler
  const handleTabChange = (tab) => {
    setBookingTab(tab);
    if (tab === "station") {
      setPickupLocation("Amb Andaura Railway Station (AADR) / Vande Bharat");
      setDestinationCircuit("Maa Chintpurni Devi Ji Dham");
    } else if (tab === "chintpurni") {
      setPickupLocation("Amb Town / Station / Hotel");
      setDestinationCircuit("6 Devi Darshan (Chintpurni, Jwala Ji, Baglamukhi, Kangra, Chamunda, Naina Devi)");
    } else if (tab === "outstation") {
      setPickupLocation("Amb (Main Chowk / Station / Mubarikpur)");
      setDestinationCircuit("Dharamshala / McLeodganj (Kangra Valley)");
    }
  };

  // Submit booking inquiry
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const tabName =
      bookingTab === "station"
        ? "Amb Andaura Station (AADR) Pickup"
        : bookingTab === "chintpurni"
        ? "Chintpurni & Devi Darshan Yatra"
        : "Outstation Hill Cab from Amb";

    // Record directly in Admin Portal Dispatch Desk
    recordBookingInquiry({
      name: customerName.trim() || "Website Traveler",
      phone: customerPhone.trim() || "Not provided",
      pickup: pickupLocation,
      drop: destinationCircuit,
      car: vehicleType,
      date: travelDate,
      notes: tabName,
    });

    const msg =
      `*NEW TAXI INQUIRY - AMB & AADR DESK*\n\n` +
      (customerName.trim() ? `• *Passenger Name:* ${customerName.trim()}\n` : "") +
      (customerPhone.trim() ? `• *Mobile / WhatsApp:* ${customerPhone.trim()}\n` : "") +
      `• *Service:* ${tabName}\n` +
      `• *Pickup Point:* ${pickupLocation}\n` +
      `• *Destination:* ${destinationCircuit}\n` +
      `• *Date of Travel:* ${travelDate}\n` +
      `• *Preferred Vehicle:* ${vehicleType}\n\n` +
      `Please check chauffeur availability at Amb Andaura desk and confirm booking.`;

    setBookingConfirmed(true);
    window.open(whatsappLink(msg), "_blank");
  };

  return (
    <Layout>
      <SEO
        path={seo.path}
        title={seo.title}
        description={seo.description}
        structuredData={[
          localBusinessSchema(),
          breadcrumbSchema(crumbs),
          faqSchema(ambFaqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH BOOKING WIDGET */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#182030] text-white py-12 sm:py-16 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/hero-bg.jpg"
            alt="Taxi in Amb Himachal Pradesh"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Value Proposition */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f57c00] text-white text-xs font-black shadow-md self-start">
                <span className="material-symbols-outlined text-[15px]">directions_railway</span>
                <span>AMB ANDAURA RAIL TERMINAL &bull; CHINTPURNI GATEWAY</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Taxi Service in Amb, Himachal Pradesh
              </h1>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                Reliable 24/7 cab service in Amb and <strong>Amb Andaura Railway Station (AADR)</strong>.
                Guaranteed meet-and-greet pickups for New Delhi Vande Bharat Express (22447/22448) and
                Himachal Express, quick 35-minute transfers to Maa Chintpurni Devi Ji Dham, and scenic hill
                taxis to Dharamshala, Kangra, and Manali.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-left">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-amber-400">directions_railway</span>
                  <span className="block text-xs font-black mt-1">Station Pickup</span>
                  <span className="block text-[10px] text-gray-300">AADR Platform Standby</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-[#f57c00]">temple_hindu</span>
                  <span className="block text-xs font-black mt-1">Chintpurni Dham</span>
                  <span className="block text-[10px] text-gray-300">26 KM &bull; 35 Min Drop</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-emerald-400">shield</span>
                  <span className="block text-xs font-black mt-1">Yellow Plate</span>
                  <span className="block text-[10px] text-gray-300">100% Commercial Govt</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-blue-400">explore</span>
                  <span className="block text-xs font-black mt-1">Pahadi Drivers</span>
                  <span className="block text-[10px] text-gray-300">Safe Mountain Skills</span>
                </div>
              </div>

              {/* Instant Call & WhatsApp */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${business.phonesTel[0]}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Instant Call: {business.phones[0]}</span>
                </a>
                <a
                  href={whatsappLink("Hello Mandyal Travels, I need a taxi in Amb / Amb Andaura Railway Station.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Instant Booking Widget for Amb */}
            <div className="lg:col-span-5 bg-white text-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-100 flex flex-col gap-3.5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[24px] text-[#f57c00]">
                    local_taxi
                  </span>
                  <h3 className="text-lg font-black text-[#1e2638]">
                    Book Taxi in Amb
                  </h3>
                </div>
                <span className="bg-[#e7f9f0] text-[#1b804e] text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                  Station Standby
                </span>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-[#edf2fe] p-1 rounded-xl">
                {[
                  { id: "station", label: "AADR Station" },
                  { id: "chintpurni", label: "Chintpurni Yatra" },
                  { id: "outstation", label: "Outstation" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTabChange(t.id)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      bookingTab === t.id
                        ? "bg-[#f57c00] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleConfirmBooking} className="flex flex-col gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Pickup Location in Amb
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="e.g. Amb Andaura Railway Station, Mubarikpur, Gagret"
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Drop Destination / Pilgrimage Circuit
                  </label>
                  <input
                    type="text"
                    required
                    value={destinationCircuit}
                    onChange={(e) => setDestinationCircuit(e.target.value)}
                    placeholder="e.g. Maa Chintpurni Temple, Dharamshala, Kangra, Manali"
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Date of Journey
                    </label>
                    <input
                      type="date"
                      required
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Preferred Vehicle
                    </label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2 py-2 text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                    >
                      <option value="Innova Crysta">Innova Crysta (6 Pax)</option>
                      <option value="Maruti Ertiga">Maruti Ertiga (6 Pax)</option>
                      <option value="Swift Dzire">Swift Dzire (4 Pax)</option>
                      <option value="Force Urbania">Force Urbania (12 Pax)</option>
                      <option value="Tempo Traveller">Tempo Traveller (16 Pax)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Passenger Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Mobile / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-4 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Confirm Cab in Amb &rarr;</span>
                </button>
              </form>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                <span className="flex items-center gap-1 text-[#f57c00]">
                  <span className="material-symbols-outlined text-[14px]">train</span>
                  Train Delay Protection
                </span>
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Clean AC Vehicles
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CORE TAXI SERVICES IN AMB */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              AMB &amp; AADR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight mt-1">
              Top Cab Booking Services in Amb
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Tailored services for pilgrims, train travellers arriving on Vande Bharat, and tourists
              heading toward the high Himalayas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Amb Andaura Railway Station */}
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#f57c00] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">train</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1e2638]">
                  Amb Andaura Station (AADR)
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Direct platform pickup for New Delhi Vande Bharat Express (22447) and Himachal Express.
                  Zero waiting time, luggage handling, and driver standby.
                </p>
              </div>
              <Link
                to="/amb-andaura-railway-station-taxi"
                className="text-xs font-bold text-[#f57c00] hover:underline flex items-center gap-1 self-start"
              >
                <span>Station Pickup Details &rarr;</span>
              </Link>
            </div>

            {/* Card 2: Chintpurni Devi Ji Yatra */}
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">temple_hindu</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1e2638]">
                  Maa Chintpurni Devi Yatra
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Amb is the closest broad-gauge railway hub to Chintpurni Dham (26 km / 35 mins).
                  One-way drops or same-day darshan with vehicle standby and return.
                </p>
              </div>
              <a
                href={whatsappLink("Hello Mandyal Travels, I need a taxi from Amb to Maa Chintpurni Devi Dham")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#f57c00] hover:underline flex items-center gap-1 self-start"
              >
                <span>Book Chintpurni Cab &rarr;</span>
              </a>
            </div>

            {/* Card 3: Gateway to Kangra & Dharamshala */}
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">landscape</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1e2638]">
                  Kangra &amp; Dharamshala Gateway
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Fast mountain highway transfers to Dharamshala, McLeodganj, Kangra Fort, Jawala Ji, and
                  Palampur with seasoned Himachal hill chauffeurs.
                </p>
              </div>
              <Link
                to="/una-to-dharamshala-taxi"
                className="text-xs font-bold text-[#f57c00] hover:underline flex items-center gap-1 self-start"
              >
                <span>Dharamshala Route Details &rarr;</span>
              </Link>
            </div>

            {/* Card 4: Local Amb & Gagret Corridor */}
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">location_city</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1e2638]">
                  Amb &amp; Gagret Tehsil Rides
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Rapid doorstep cabs for Amb market, Mubarikpur, Gagret, Daulatpur Chowk, Nehrian,
                  Kaloha, and seamless intercity travel to Una HQ.
                </p>
              </div>
              <a
                href={whatsappLink("Hello Mandyal Travels, I need local taxi service in Amb / Gagret")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#f57c00] hover:underline flex items-center gap-1 self-start"
              >
                <span>Book Local Amb Ride &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. POPULAR TAXI ROUTES & FARES FROM AMB (SEO Ranking Highlights) */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-18 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                POPULAR CAB ROUTES &bull; 24/7 AVAILABILITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Popular Taxi Routes from Amb
              </h2>
            </div>
            <Link
              to="/destinations"
              className="text-xs sm:text-sm font-bold text-[#f57c00] hover:underline flex items-center gap-1"
            >
              <span>Explore All Destination Guides &rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ambPopularRoutes.map((route, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-4 border border-gray-200/80 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-[#ebf0fc] text-[#365bb5] font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                      {route.badge}
                    </span>
                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {route.distance} &bull; {route.duration}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-[#1e2638] group-hover:text-[#f57c00] transition-colors leading-snug">
                    Amb to {route.destination}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{route.route}</p>
                  <p className="text-xs font-medium text-gray-600 mt-0.5">
                    Ideal for: {route.popularFor}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-semibold">Available Cabs:</span>
                    <span className="font-extrabold text-[#1e2638] text-xs">
                      {route.fleetAvailable}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-semibold">Fare Policy:</span>
                    <span className="font-extrabold text-emerald-700 text-xs bg-emerald-50 px-2 py-0.5 rounded">
                      Best Rate Guaranteed
                    </span>
                  </div>

                  <a
                    href={whatsappLink(
                      `Hello Mandyal Travels, I want to book a taxi from Amb to ${route.destination}. Please share the best rate.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#182030] hover:bg-[#232e44] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all group-hover:bg-[#f57c00]"
                  >
                    <span>⚡ Get Best Quote on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMMERCIAL FLEET AVAILABLE IN AMB */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                OUR MAINTAINED FLEET
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Rental Cabs Available in Amb &amp; AADR
              </h2>
            </div>
            <Link
              to="/fleet"
              className="text-xs sm:text-sm font-bold text-[#f57c00] hover:underline flex items-center gap-1"
            >
              <span>Explore Fleet Specs &amp; Luggage &rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleet.map((car) => (
              <div
                key={car.slug}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                  <img
                    src={car.image}
                    alt={car.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/10 shadow-sm">
                    {car.imageBadge}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-3.5">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-extrabold text-base text-[#1e2638]">{car.name}</h3>
                      <span className="bg-[#ebf0fc] text-[#365bb5] font-bold text-[10px] px-2 py-0.5 rounded">
                        {car.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{car.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 py-1 text-center text-[11px] font-semibold text-gray-700">
                    <span className="bg-[#f0f3f8] px-2 py-1 rounded-md">{car.seats}</span>
                    <span className="bg-[#f0f3f8] px-2 py-1 rounded-md">{car.bags}</span>
                    <span className="bg-[#f0f3f8] px-2 py-1 rounded-md">{car.comfort}</span>
                  </div>

                  <a
                    href={whatsappLink(`Hello Mandyal Travels, I want to book ${car.name} in Amb / AADR.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#943e00] hover:bg-[#7a3200] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <span>⚡ Book {car.name} in Amb</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. DOORSTEP COVERAGE IN AMB TEHSIL & SURROUNDINGS */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-16 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              AMB DISTRICT COVERAGE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
              Doorstep Cab Pickups Across Amb &amp; Northern Una
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Guaranteed 15-minute response across every village, station platform, and pilgrimage junction in Amb.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { name: "Amb Andaura Station (AADR)", note: "Platform Standby" },
              { name: "Amb Main Chowk & Bazar", note: "Central Amb Hub" },
              { name: "Maa Chintpurni Dham", note: "Shaktipeeth Yatra" },
              { name: "Mubarikpur Junction", note: "Kangra-Una Crossroad" },
              { name: "Gagret Tehsil", note: "Sub-division Drop" },
              { name: "Daulatpur Chowk", note: "Rail & Market Hub" },
              { name: "Ghanari & Nehrian", note: "Rural Connections" },
              { name: "Kaloha & Chalet", note: "Hill Village Routes" },
              { name: "Mairi (Barbhag Singh)", note: "Holy Dera Pilgrimage" },
              { name: "Bharwain Foothills", note: "Temple Ridge Highway" },
              { name: "Una-Amb Expressway", note: "NH-503 Corridor" },
              { name: "Jawala Ji Junction", note: "Sacred Flame Route" },
            ].map((loc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-3 border border-gray-200/80 shadow-sm flex flex-col justify-center"
              >
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#f57c00]">location_on</span>
                  <span className="font-extrabold text-xs text-[#1e2638]">{loc.name}</span>
                </div>
                <span className="text-[10px] text-gray-500 ml-5">{loc.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FAQ ACCORDION WITH SCHEMA */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-16 border-t border-gray-100">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
              Amb Taxi Booking FAQs
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Clear answers for train passengers, pilgrims, and tourists visiting Amb Andaura.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {ambFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="bg-[#f8faff] rounded-2xl p-4 sm:p-5 border border-gray-200/70 shadow-sm group cursor-pointer"
              >
                <summary className="font-extrabold text-sm sm:text-base text-[#1e2638] list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="material-symbols-outlined text-[20px] text-gray-400 group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. BOTTOM HOTLINE CTA BANNER */}
      {/* ========================================================================= */}
      <section className="bg-[#f4f7fe] py-12 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="bg-[#182030] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#f57c00] flex items-center justify-center text-white shadow-md flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">support_agent</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
                  ARRIVING AT AMB ANDAURA STATION?
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Book Your Amb Taxi with Manoj Mandyal
                </h3>
                <p className="text-xs text-gray-300">
                  Instant cab dispatch at Amb Andaura (AADR) platform. Honest pricing, clean cabs, and verified pahadi drivers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={`tel:${business.phonesTel[0]}`}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>{business.phones[0]}</span>
              </a>
              <a
                href={whatsappLink("Hello Manoj Mandyal, I need a taxi in Amb / Amb Andaura.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] whitespace-nowrap"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Confirmation Dialog Modal */}
      {bookingConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center flex flex-col items-center gap-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="text-2xl font-black text-[#1e2638]">Amb Taxi Request Sent!</h3>
            <p className="text-sm text-gray-600">
              Your taxi booking request from <strong>{pickupLocation}</strong> to{" "}
              <strong>{destinationCircuit}</strong> ({vehicleType}) on <strong>{travelDate}</strong>{" "}
              has been forwarded to our Amb station dispatch desk.
            </p>
            <p className="text-xs text-gray-500">
              Our team will send your assigned driver and car number on WhatsApp momentarily.
            </p>
            <button
              onClick={() => setBookingConfirmed(false)}
              className="w-full py-3 rounded-xl bg-[#f57c00] text-white font-bold text-sm shadow-md hover:bg-[#e65100]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
