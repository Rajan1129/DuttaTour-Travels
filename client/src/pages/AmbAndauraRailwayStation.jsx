import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { business, destinations, fleet, whatsappLink, recordBookingInquiry } from "../data/business";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "../data/schema";

const aadrFaqs = [
  {
    question: "Is Amb Andaura station taxi service also searched as Amb Indora taxi?",
    answer:
      "Yes! Many tourists and pilgrims phonetically search for 'Amb Indora taxi service' or 'Andora railway station cab'. Amb Andaura (Railway Station Code: AADR) is the official broad-gauge terminal in Una district. Mandyal Tour & Travels operates authorized 24/7 commercial taxis right at the station exit for Dharamshala, McLeodganj, Chintpurni, Kangra, and all Himachal destinations.",
  },
  {
    question: "What is the taxi fare from Amb Andaura (Amb Indora) to Dharamshala & McLeodganj?",
    answer:
      "The taxi fare from Amb Andaura to Dharamshala starts at approximately ₹2,800 for a private 4-seater Sedan (Swift Dzire/Etios), ₹3,800 for a spacious 6-seater SUV (Maruti Ertiga/Toyota Innova Crysta), and ₹6,000 for a Tempo Traveller (12/17-seater). Rates include fuel, toll taxes, hill driving allowances, and zero hidden surcharges.",
  },
  {
    question: "Where will the driver meet me at Amb Andaura Railway Station (AADR)?",
    answer:
      "Our chauffeur will be waiting outside the main platform exit gate holding a personalized name sign. We share the driver's contact number and vehicle registration details on WhatsApp 1 hour before your train arrives.",
  },
  {
    question: "What happens if my train (e.g. Vande Bharat Express) arrives late?",
    answer:
      "We track live train status for all trains arriving at Amb Andaura (Train 22447 Vande Bharat, 14553 Himachal Express, etc.). There are zero waiting charges for delayed train arrivals; our driver adjusts timing automatically.",
  },
  {
    question: "What are the cab charges from Amb Andaura station to Maa Chintpurni temple?",
    answer:
      "The distance is 26 km (~35 minutes). Private Sedans start from ₹900, SUVs (Ertiga/Innova) from ₹1,400, and Tempo Travellers from ₹2,500. Both one-way drop and round-trip same-day darshan packages with wait-and-return are available without any hidden fees.",
  },
  {
    question: "Can I book a taxi from Amb Andaura directly to Dalhousie, Manali, or Bir Billing?",
    answer:
      "Yes! Amb Andaura is the closest broad-gauge railway station to Himachal Pradesh hill stations. We provide direct hill taxis to Dalhousie/Khajjiar (160 km), Kullu Manali (230 km), and Bir Billing paragliding valley with experienced mountain chauffeurs at competitive all-inclusive rates.",
  },
  {
    question: "Are child seats, roof carriers, and large luggage space available?",
    answer:
      "Yes! Our Innova Crysta and Ertiga vehicles come equipped with overhead carrier racks and spacious boots capable of handling heavy trolley bags, folding prams, and family luggage.",
  },
];

export const aadrFareList = [
  {
    destination: "Maa Chintpurni Devi Ji Dham",
    distance: "26 KM",
    duration: "35 Mins",
    sedan: "₹900",
    suv: "₹1,400",
    tempo: "₹2,500",
    highlight: "Pilgrimage special (1-way drop or same-day return)",
  },
  {
    destination: "Dharamshala & HPCA Stadium",
    distance: "92 KM",
    duration: "2.5 Hours",
    sedan: "₹2,800",
    suv: "₹3,800",
    tempo: "₹6,000",
    highlight: "#1 Vande Bharat connection to Kangra Valley",
  },
  {
    destination: "McLeodganj (Dalai Lama Temple & Bhagsunag)",
    distance: "98 KM",
    duration: "2.8 Hours",
    sedan: "₹3,000",
    suv: "₹4,100",
    tempo: "₹6,500",
    highlight: "Scenic hill station stay & monastery circuit",
  },
  {
    destination: "Maa Jawala Ji Temple",
    distance: "45 KM",
    duration: "1.2 Hours",
    sedan: "₹1,400",
    suv: "₹2,000",
    tempo: "₹3,500",
    highlight: "Holy eternal flame Shaktipeeth darshan",
  },
  {
    destination: "Kangra Brajeshwari Devi & Kangra Fort",
    distance: "72 KM",
    duration: "2.0 Hours",
    sedan: "₹2,200",
    suv: "₹3,000",
    tempo: "₹5,000",
    highlight: "Shaktipeeth yatra & heritage fort tour",
  },
  {
    destination: "Chamunda Devi & Palampur Tea Gardens",
    distance: "110 KM",
    duration: "3.0 Hours",
    sedan: "₹3,300",
    suv: "₹4,400",
    tempo: "₹7,000",
    highlight: "Pine forests, tea estates & temple visit",
  },
  {
    destination: "Bir Billing (World Paragliding Site) & Baijnath",
    distance: "125 KM",
    duration: "3.5 Hours",
    sedan: "₹3,600",
    suv: "₹4,800",
    tempo: "₹7,500",
    highlight: "Aero sports hub & historic Shiva temple",
  },
  {
    destination: "Dalhousie & Khajjiar (Mini Switzerland)",
    distance: "160 KM",
    duration: "4.5 Hours",
    sedan: "₹4,500",
    suv: "₹5,800",
    tempo: "₹9,000",
    highlight: "Deodar forests, Khajjiar lake & colonial hills",
  },
  {
    destination: "Kullu & Manali (Solang Valley / Atal Tunnel)",
    distance: "230 KM",
    duration: "6.5 Hours",
    sedan: "₹5,800",
    suv: "₹7,500",
    tempo: "₹11,500",
    highlight: "Himalayan holiday corridor & snow passes",
  },
  {
    destination: "Una City HQ & Una Station (UHL)",
    distance: "32 KM",
    duration: "40 Mins",
    sedan: "₹1,000",
    suv: "₹1,500",
    tempo: "₹2,800",
    highlight: "District headquarters intercity transit",
  },
  {
    destination: "Chandigarh City & Airport (IXC)",
    distance: "150 KM",
    duration: "3.5 Hours",
    sedan: "₹3,200",
    suv: "₹4,200",
    tempo: "₹6,500",
    highlight: "Highway express flight transfer",
  },
];

const trainsServingAADR = [
  {
    name: "New Delhi - Amb Andaura Vande Bharat",
    trainNo: "22447 / 22448",
    arrival: "13:00 (1:00 PM)",
    departure: "13:40 (1:40 PM)",
    connects: "New Delhi, Ambala, Chandigarh, Una, Amb Andaura",
    badge: "Fastest Express",
  },
  {
    name: "Himachal Express",
    trainNo: "14553 / 14554",
    arrival: "07:35 AM",
    departure: "20:45 (8:45 PM)",
    connects: "Old Delhi, Panipat, Kurukshetra, Ambala, Una, Amb Andaura",
    badge: "Overnight Sleeper",
  },
  {
    name: "Jan Shatabdi Express",
    trainNo: "12057 / 12058",
    arrival: "Connections via UHL",
    departure: "Daily",
    connects: "New Delhi, Panipat, Chandigarh, Una HP",
    badge: "Daily Intercity",
  },
];

const popularTransfers = [
  {
    destination: "Maa Chintpurni Devi Ji Dham",
    distance: "26 KM",
    duration: "35 Mins",
    availableVehicles: "Dzire, Etios, Ertiga, Innova",
    bestFor: "Pilgrims & Temple Yatra",
  },
  {
    destination: "Dharamshala & McLeodganj",
    distance: "92 KM",
    duration: "2.5 Hours",
    availableVehicles: "Dzire, Ertiga, Innova Crysta",
    bestFor: "Hill Station Holidays",
  },
  {
    destination: "Maa Jawala Ji Temple",
    distance: "45 KM",
    duration: "1.2 Hours",
    availableVehicles: "Dzire, Etios, Ertiga, Innova",
    bestFor: "Devi Darshan Circuit",
  },
  {
    destination: "Kangra Brajeshwari Devi",
    distance: "72 KM",
    duration: "2 Hours",
    availableVehicles: "Dzire, Ertiga, Innova Crysta",
    bestFor: "Historic Temple Visit",
  },
  {
    destination: "Una City / Prem Nagar HQ",
    distance: "32 KM",
    duration: "40 Mins",
    availableVehicles: "Dzire, Etios, Ertiga, Innova",
    bestFor: "District Headquarters Drop",
  },
  {
    destination: "Chandigarh City & Airport",
    distance: "150 KM",
    duration: "3.5 Hours",
    availableVehicles: "Dzire, Ertiga, Innova Crysta",
    bestFor: "Flight Connections",
  },
];

export default function AmbAndauraRailwayStation() {
  const seo = seoConfig.ambAndauraRailwayStation;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi Services", path: "/taxi-services" },
    { name: "Amb Andaura Railway Station Taxi" },
  ];

  // Booking State
  const [trainName, setTrainName] = useState("Vande Bharat Express (22447) - 1:00 PM");
  const [destinationDrop, setDestinationDrop] = useState("Maa Chintpurni Devi Ji Dham");
  const [travelDate, setTravelDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [vehicleType, setVehicleType] = useState("Innova Crysta");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Submit Handler
  const handleStationBooking = (e) => {
    e.preventDefault();

    // Record directly in Admin Portal Dispatch Desk
    recordBookingInquiry({
      name: customerName.trim() || "Website Traveler",
      phone: customerPhone.trim() || "Not provided",
      pickup: `Amb Andaura Station (${trainName})`,
      drop: destinationDrop,
      car: vehicleType,
      date: travelDate,
      notes: `Train: ${trainName} -> Drop: ${destinationDrop}`,
    });

    const msg =
      `*NEW AMB ANDAURA (AADR) STATION TAXI INQUIRY*\n\n` +
      (customerName.trim() ? `• *Passenger Name:* ${customerName.trim()}\n` : "") +
      (customerPhone.trim() ? `• *Mobile / WhatsApp:* ${customerPhone.trim()}\n` : "") +
      `• *Arriving By:* ${trainName}\n` +
      `• *Pickup Point:* Amb Andaura Station (AADR) Platform Exit\n` +
      `• *Drop Destination:* ${destinationDrop}\n` +
      `• *Arrival Date:* ${travelDate}\n` +
      `• *Selected Cab:* ${vehicleType}\n\n` +
      `Please assign platform standby driver and share cab details.`;

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
          faqSchema(aadrFaqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH STATION BOOKING WIDGET */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#182030] text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/hero-bg.jpg"
            alt="Amb Andaura Railway Station Taxi"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f57c00] text-white text-xs font-black shadow-md self-start">
                <span className="material-symbols-outlined text-[15px]">directions_railway</span>
                <span>AADR PLATFORM MEET &amp; GREET SERVICE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Amb Andaura &amp; Amb Indora Taxi Service
              </h1>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                Pre-book guaranteed, transparent taxi service at <strong>Amb Andaura Railway Station (Station Code: AADR)</strong> — often searched by travelers as <strong>Amb Indora taxi service</strong>.
                Dedicated platform pickup for New Delhi Vande Bharat Express (Train 22447/22448) and Himachal Express.
                Fast, reliable hill transfers to Dharamshala, McLeodganj, Maa Chintpurni Dham, Kangra, and all Himachal destinations.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-left">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-amber-400">badge</span>
                  <span className="block text-xs font-black mt-1">Meet &amp; Greet</span>
                  <span className="block text-[10px] text-gray-300">Name Board on Exit</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-emerald-400">update</span>
                  <span className="block text-xs font-black mt-1">Delay Protected</span>
                  <span className="block text-[10px] text-gray-300">Live Train Tracking</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-[#f57c00]">luggage</span>
                  <span className="block text-xs font-black mt-1">Luggage Support</span>
                  <span className="block text-[10px] text-gray-300">Large Boot &amp; Carrier</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-blue-400">shield</span>
                  <span className="block text-xs font-black mt-1">Commercial HP</span>
                  <span className="block text-[10px] text-gray-300">Yellow Plate Insured</span>
                </div>
              </div>

              {/* Instant Call & WhatsApp */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${business.phonesTel[0]}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Station Hotline: {business.phones[0]}</span>
                </a>
                <a
                  href={whatsappLink("Hello Mandyal Tour and Travels, I need taxi pickup from Amb Andaura Railway Station (AADR).")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-5 bg-white text-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-100 flex flex-col gap-3.5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[24px] text-[#f57c00]">
                    train
                  </span>
                  <h3 className="text-lg font-black text-[#1e2638]">
                    AADR Station Cab Booking
                  </h3>
                </div>
                <span className="bg-[#e7f9f0] text-[#1b804e] text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                  Guaranteed Standby
                </span>
              </div>

              <form onSubmit={handleStationBooking} className="flex flex-col gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Arriving Train &amp; Time
                  </label>
                  <select
                    value={trainName}
                    onChange={(e) => setTrainName(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00] cursor-pointer"
                  >
                    <option value="Vande Bharat Express (22447) - 1:00 PM">
                      Vande Bharat Express (22447) - 1:00 PM Arrival
                    </option>
                    <option value="Himachal Express (14553) - 7:35 AM">
                      Himachal Express (14553) - 7:35 AM Arrival
                    </option>
                    <option value="Daulatpur Chowk Sabarmati Exp">
                      Daulatpur Chowk / Sabarmati Express
                    </option>
                    <option value="Departure Drop to Amb Andaura">
                      Departure Drop TO Amb Andaura Station
                    </option>
                    <option value="Other Train Arrival">Other Train / Custom Timing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Drop Destination from Amb Andaura
                  </label>
                  <input
                    type="text"
                    required
                    value={destinationDrop}
                    onChange={(e) => setDestinationDrop(e.target.value)}
                    placeholder="e.g. Chintpurni Mandir, Dharamshala, Jawala Ji, Una"
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Date of Arrival
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
                      Vehicle Type
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
                  <span>Confirm Platform Pickup &rarr;</span>
                </button>
              </form>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                <span className="flex items-center gap-1 text-[#f57c00]">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  No Waiting Penalty
                </span>
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  Pre-assigned Chauffeur
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRAINS TIMINGS SERVING AMB ANDAURA (AADR) */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              TRAIN TIMINGS &amp; CONNECTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight mt-1">
              Major Trains at Amb Andaura (AADR)
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              We sync with your train schedule so your vehicle is ready on arrival at the station.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainsServingAADR.map((train, idx) => (
              <div
                key={idx}
                className="bg-[#f8faff] rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between gap-4 group hover:border-[#f57c00] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-[#f57c00]/10 text-[#f57c00] font-black text-[10px] px-2.5 py-0.5 rounded-full">
                      {train.badge}
                    </span>
                    <span className="text-xs font-bold text-gray-500">{train.trainNo}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-[#1e2638] group-hover:text-[#f57c00] transition-colors">
                    {train.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">Route: {train.connects}</p>
                </div>

                <div className="pt-3 border-t border-gray-200/70 flex items-center justify-between text-xs">
                  <div>
                    <span className="block text-[10px] text-gray-400 font-semibold uppercase">
                      Arrival Time
                    </span>
                    <span className="font-extrabold text-[#1e2638] text-sm">{train.arrival}</span>
                  </div>
                  <a
                    href={whatsappLink(`Hello Mandyal Tour and Travels, I need pickup for ${train.name} at Amb Andaura.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#f57c00] hover:underline"
                  >
                    Book Pickup &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2.5 TRANSPARENT STATION FARE CHART (SEO & CONVERSION ENGINE) */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f8faff] py-14 sm:py-18 border-t border-gray-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              TRANSPARENT STATION FARES &amp; TARIFFS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight mt-1">
              Amb Andaura (Amb Indora) Taxi Fare Chart
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Transparent, upfront fares directly from Amb Andaura Railway Station (AADR). No platform surge pricing, no haggling. All fares include fuel, vehicle sanitization, hill toll taxes, and driver allowance.
            </p>
          </div>

          {/* Desktop & Tablet Table */}
          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200/80 shadow-md">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#182030] text-white text-xs uppercase tracking-wider font-extrabold">
                  <th className="py-4 px-5">Destination Route</th>
                  <th className="py-4 px-4 text-center">Distance &amp; Time</th>
                  <th className="py-4 px-4 text-center bg-[#222c42]">
                    Sedan <span className="block text-[10px] font-normal text-amber-300">Dzire / Etios</span>
                  </th>
                  <th className="py-4 px-4 text-center bg-[#2a3652]">
                    SUV <span className="block text-[10px] font-normal text-emerald-300">Ertiga / Innova</span>
                  </th>
                  <th className="py-4 px-4 text-center bg-[#334263]">
                    Tempo <span className="block text-[10px] font-normal text-blue-300">12 / 17 Seater</span>
                  </th>
                  <th className="py-4 px-5 text-right">Instant Booking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-medium text-gray-700">
                {aadrFareList.map((route, i) => (
                  <tr
                    key={i}
                    className={`hover:bg-[#f4f7fe]/70 transition-colors ${i % 2 === 1 ? "bg-gray-50/50" : "bg-white"}`}
                  >
                    <td className="py-3.5 px-5">
                      <span className="font-extrabold text-[#1e2638] block text-sm">
                        {route.destination}
                      </span>
                      <span className="text-[11px] text-gray-500 font-normal">
                        {route.highlight}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="font-bold text-[#1e2638] block">{route.distance}</span>
                      <span className="text-[11px] text-gray-500">{route.duration}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-black text-[#1e2638] bg-amber-50/30 whitespace-nowrap">
                      {route.sedan}
                    </td>
                    <td className="py-3.5 px-4 text-center font-black text-emerald-700 bg-emerald-50/30 whitespace-nowrap">
                      {route.suv}
                    </td>
                    <td className="py-3.5 px-4 text-center font-black text-[#365bb5] bg-blue-50/30 whitespace-nowrap">
                      {route.tempo}
                    </td>
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <a
                        href={whatsappLink(
                          `Hello Mandyal Tour and Travels, I need a taxi from Amb Andaura Station to ${route.destination}. Please confirm availability.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs shadow-sm transition-all active:scale-[0.98]"
                      >
                        <span>Book &rarr;</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fare Inclusions Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 text-center shadow-xs">
              <span className="material-symbols-outlined text-[#f57c00] text-[22px]">toll</span>
              <span className="block text-xs font-black text-[#1e2638] mt-1">Toll &amp; Parking Included</span>
              <span className="text-[10px] text-gray-500">No surprise extras on highway</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 text-center shadow-xs">
              <span className="material-symbols-outlined text-emerald-600 text-[22px]">schedule</span>
              <span className="block text-xs font-black text-[#1e2638] mt-1">Zero Delay Charges</span>
              <span className="text-[10px] text-gray-500">Free waiting if train arrives late</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 text-center shadow-xs">
              <span className="material-symbols-outlined text-blue-600 text-[22px]">badge</span>
              <span className="block text-xs font-black text-[#1e2638] mt-1">Platform Meet &amp; Greet</span>
              <span className="text-[10px] text-gray-500">Driver receives you at exit gate</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 text-center shadow-xs">
              <span className="material-symbols-outlined text-amber-600 text-[22px]">verified</span>
              <span className="block text-xs font-black text-[#1e2638] mt-1">Official HP Taxi Permit</span>
              <span className="text-[10px] text-gray-500">Licensed commercial vehicles</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. POPULAR TRANSFERS FROM AMB ANDAURA */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-18 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                DIRECT STATION TRANSFERS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Popular Station Transfers from Amb Andaura
              </h2>
            </div>
            <Link
              to="/taxi-service-amb"
              className="text-xs sm:text-sm font-bold text-[#f57c00] hover:underline flex items-center gap-1"
            >
              <span>Explore Amb Local Cab Services &rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTransfers.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-4 border border-gray-200/80"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-[#f57c00]">{item.distance} &bull; {item.duration}</span>
                    <span className="text-gray-400">{item.bestFor}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-[#1e2638]">{item.destination}</h3>
                </div>

                <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-semibold">Available Cabs:</span>
                    <span className="font-extrabold text-[#1e2638] text-xs">{item.availableVehicles}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-semibold">Rate Guarantee:</span>
                    <span className="font-extrabold text-emerald-700 text-xs bg-emerald-50 px-2 py-0.5 rounded">
                      Best Quote Guaranteed
                    </span>
                  </div>
                  <a
                    href={whatsappLink(
                      `Hello Mandyal Tour and Travels, I need a taxi from Amb Andaura Railway Station to ${item.destination}. Please share the best rate.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-1 py-2 px-3 rounded-xl bg-[#182030] hover:bg-[#f57c00] text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>⚡ Get Best Station Quote</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. STATION FLEET SHOWCASE */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                SPACIOUS &amp; SANITIZED
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Rental Cabs for Train Travellers
              </h2>
            </div>
            <Link
              to="/fleet"
              className="text-xs sm:text-sm font-bold text-[#f57c00] hover:underline flex items-center gap-1"
            >
              <span>View All Fleet &rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleet.slice(0, 3).map((car) => (
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
                    href={whatsappLink(`Hello Mandyal Tour and Travels, I want to book ${car.name} at Amb Andaura Station.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#943e00] hover:bg-[#7a3200] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <span>⚡ Book {car.name} for AADR</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. AADR FAQ SECTION */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-16 border-t border-gray-100">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              QUESTIONS ANSWERED
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
              Amb Andaura Station Pickup FAQs
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {aadrFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/70 shadow-sm group cursor-pointer"
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
      {/* 6. BOTTOM HOTLINE BANNER */}
      {/* ========================================================================= */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="bg-[#182030] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#f57c00] flex items-center justify-center text-white shadow-md flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">directions_railway</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
                  TRAVELING ON VANDE BHARAT TO AMB?
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Have Your Chauffeur Ready on Platform Exit
                </h3>
                <p className="text-xs text-gray-300">
                  Avoid platform chaos and unreliable syndicates. Book guaranteed pickup with Mandyal Tour &amp; Travel.
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
                href={whatsappLink("Hello Manoj Mandyal, I need platform pickup at Amb Andaura Station.")}
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
            <h3 className="text-2xl font-black text-[#1e2638]">Platform Pickup Reserved!</h3>
            <p className="text-sm text-gray-600">
              Your pickup request for <strong>{trainName}</strong> to{" "}
              <strong>{destinationDrop}</strong> ({vehicleType}) on <strong>{travelDate}</strong>{" "}
              has been recorded.
            </p>
            <p className="text-xs text-gray-500">
              Our station coordinator will send your driver name and car number to your WhatsApp.
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
