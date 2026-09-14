import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { business, tourPackages, fleet, whatsappLink, recordBookingInquiry } from "../data/business";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "../data/schema";

const tourFaqs = [
  {
    question: "Can we customize the tour itinerary, duration, and sightseeing stops?",
    answer:
      "Yes, 100%! All our tour packages are fully customizable. Whether you want to add extra days in Manali, take an excursion to Atal Tunnel / Sissu, or combine the Devi Darshan yatra with Dharamshala, we will tailor the route, timings, and stops to your preference.",
  },
  {
    question: "Can our tour package start directly with pickup from Una or Amb Andaura Railway Station?",
    answer:
      "Yes! Many travelers arrive via the Vande Bharat Express (at Una or Amb Andaura AADR) or Himachal Express. Our chauffeur will receive you on the station platform exit and directly begin your chosen tour circuit without any delay.",
  },
  {
    question: "Is the vehicle dedicated solely to our family or group throughout the tour?",
    answer:
      "Yes, all our packages are 100% private. The vehicle and chauffeur are dedicated exclusively to your family or travel group on full-day standby for the entire duration of the tour.",
  },
  {
    question: "What is included in the tour package quote from Dutta Tour & Travel?",
    answer:
      "We provide transparent, all-inclusive cab packages covering dedicated commercial vehicle rental, experienced mountain driver allowances, fuel, state border entry permits, and all national highway tolls with zero hidden costs.",
  },
  {
    question: "Which vehicles are recommended for family and group tours?",
    answer:
      "For couples and small families (up to 4 members), Swift Dzire or Toyota Etios is ideal. For families of 4 to 6 members, Toyota Innova Crysta or Maruti Ertiga provides ample legroom and roof carrier racks. For larger pilgrim or corporate groups (9 to 26 members), Force Urbania and luxury Tempo Travellers are available.",
  },
];

export default function TourPackages({ initialCategory = "all" }) {
  const isCharDhamRoute = typeof window !== "undefined" && window.location.pathname.includes("char-dham");
  const seo = isCharDhamRoute ? (seoConfig.charDham || seoConfig.tourPackages) : seoConfig.tourPackages;
  const crumbs = isCharDhamRoute
    ? [{ name: "Home", path: "/" }, { name: "Tour Packages", path: "/tour-packages" }, { name: "Char Dham Yatra" }]
    : [{ name: "Home", path: "/" }, { name: "Tour Packages" }];

  // Active Category Filter
  const [activeCategory, setActiveCategory] = useState(
    initialCategory !== "all" ? initialCategory : isCharDhamRoute ? "yatra" : "all"
  );

  // Search Query State
  const [searchQuery, setSearchQuery] = useState("");

  // Booking Form State
  const [selectedPackage, setSelectedPackage] = useState("6 Sacred Devi Darshan Yatra (5N/6D)");
  const [pickupCity, setPickupCity] = useState("Una (Prem Nagar / Railway Station)");
  const [travelDate, setTravelDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [vehicleType, setVehicleType] = useState("Innova Crysta");
  const [numberOfPax, setNumberOfPax] = useState("4 Adults");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Dedicated Card Package Inquiry Modal State
  const [modalPackage, setModalPackage] = useState(null);
  const [modalName, setModalName] = useState("");
  const [modalPhone, setModalPhone] = useState("");
  const [modalPickup, setModalPickup] = useState("Una / Amb Andaura Railway Stn");
  const [modalDate, setModalDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [modalPax, setModalPax] = useState("4 Adults");
  const [modalVehicle, setModalVehicle] = useState("Innova Crysta");

  // Filtered packages with Category and Search filtering
  const filteredPackages = tourPackages.filter((pkg) => {
    // 1. Category check
    let matchesCategory = true;
    if (activeCategory === "himachal") matchesCategory = pkg.category === "himachal";
    else if (activeCategory === "yatra") matchesCategory = pkg.category === "yatra";
    else if (activeCategory === "kashmir-ladakh") {
      matchesCategory = pkg.category === "kashmir" || pkg.category === "ladakh";
    }

    // 2. Search query check
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCategory;

    const matchesSearch =
      (pkg.name && pkg.name.toLowerCase().includes(q)) ||
      (pkg.summary && pkg.summary.toLowerCase().includes(q)) ||
      (pkg.circuitBadge && pkg.circuitBadge.toLowerCase().includes(q)) ||
      (pkg.duration && pkg.duration.toLowerCase().includes(q)) ||
      (pkg.featureNote && pkg.featureNote.toLowerCase().includes(q)) ||
      (pkg.category && pkg.category.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // Open Dedicated Package Booking Modal
  const handleOpenPackageModal = (pkg) => {
    setModalPackage(pkg);
  };

  // Submit Dedicated Package Modal Handler
  const handleModalPackageSubmit = (e) => {
    e.preventDefault();
    if (!modalPackage) return;

    // Record directly in Admin Portal Dispatch Desk
    recordBookingInquiry({
      name: modalName.trim() || "Website Traveler",
      phone: modalPhone.trim() || "Not provided",
      pickup: modalPickup,
      drop: `${modalPackage.name} (${modalPackage.duration})`,
      car: modalVehicle,
      date: modalDate,
      notes: `Tour Package: ${modalPackage.name} | Circuit: ${modalPackage.circuitBadge} | Group: ${modalPax} | Vehicle: ${modalVehicle}`,
    });

    const msg =
      `*NEW TOUR PACKAGE INQUIRY - DUTTA TRAVELS*\n\n` +
      `• *Selected Package:* ${modalPackage.name} (${modalPackage.duration})\n` +
      `• *Circuit:* ${modalPackage.circuitBadge}\n` +
      (modalName.trim() ? `• *Customer Name:* ${modalName.trim()}\n` : "") +
      (modalPhone.trim() ? `• *Mobile / WhatsApp:* ${modalPhone.trim()}\n` : "") +
      `• *Pickup Point:* ${modalPickup}\n` +
      `• *Travel Date:* ${modalDate}\n` +
      `• *Group Size:* ${modalPax}\n` +
      `• *Preferred Vehicle:* ${modalVehicle}\n\n` +
      `Please share detailed itinerary, inclusions, and best quote.`;

    setModalPackage(null);
    setBookingConfirmed(true);
    window.open(whatsappLink(msg), "_blank");
  };

  // Submit Hero Form Handler
  const handlePackageInquiry = (e) => {
    e.preventDefault();

    // Record directly in Admin Portal Dispatch Desk
    recordBookingInquiry({
      name: customerName.trim() || "Website Traveler",
      phone: customerPhone.trim() || "Not provided",
      pickup: pickupCity,
      drop: selectedPackage,
      car: vehicleType,
      date: travelDate,
      notes: `Tour Package: ${selectedPackage} | Group: ${numberOfPax} | Vehicle: ${vehicleType}`,
    });

    const msg =
      `*NEW TOUR PACKAGE INQUIRY*\n\n` +
      (customerName.trim() ? `• *Customer Name:* ${customerName.trim()}\n` : "") +
      (customerPhone.trim() ? `• *Mobile / WhatsApp:* ${customerPhone.trim()}\n` : "") +
      `• *Selected Package:* ${selectedPackage}\n` +
      `• *Pickup Point:* ${pickupCity}\n` +
      `• *Travel Date:* ${travelDate}\n` +
      `• *Group Size:* ${numberOfPax}\n` +
      `• *Preferred Vehicle:* ${vehicleType}\n\n` +
      `Please share detailed itinerary, inclusions, and best quote.`;

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
          faqSchema(tourFaqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH TOUR INQUIRY WIDGET */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#182030] text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/hero-bg.jpg"
            alt="Himachal Tour Packages Dutta Tour and Travel"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f57c00] text-white text-xs font-black shadow-md self-start">
                <span className="material-symbols-outlined text-[15px]">luggage</span>
                <span>CUSTOMIZED HIMALAYAN TOURS &bull; DEDICATED PRIVATE CABS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Himachal, Kashmir &amp; Yatra Tour Packages
              </h1>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                Explore majestic Himalayan mountain valleys, revered Shaktipeeth pilgrimage circuits,
                and high-altitude landscapes with Dutta Tour &amp; Travel. Enjoy 100% private, sanitized
                cabs with experienced pahadi chauffeurs on standby throughout your journey.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-left">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-amber-400">directions_car</span>
                  <span className="block text-xs font-black mt-1">100% Private</span>
                  <span className="block text-[10px] text-gray-300">Dedicated Chauffeur</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-emerald-400">tune</span>
                  <span className="block text-xs font-black mt-1">Customizable</span>
                  <span className="block text-[10px] text-gray-300">Flexible Sightseeing</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-[#f57c00]">loyalty</span>
                  <span className="block text-xs font-black mt-1">Best Rates</span>
                  <span className="block text-[10px] text-gray-300">Zero Hidden Extras</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-blue-400">verified</span>
                  <span className="block text-xs font-black mt-1">15+ Years</span>
                  <span className="block text-[10px] text-gray-300">HP Tourism Regd</span>
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
                  href={whatsappLink("Hello Dutta Travels, I want to inquire about tour packages.")}
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
                    travel_explore
                  </span>
                  <h3 className="text-lg font-black text-[#1e2638]">
                    Inquire Tour Package
                  </h3>
                </div>
                <span className="bg-[#e7f9f0] text-[#1b804e] text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                  Personalized Itinerary
                </span>
              </div>

              <form onSubmit={handlePackageInquiry} className="flex flex-col gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Select Tour Package Circuit
                  </label>
                  <select
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00] cursor-pointer"
                  >
                    {tourPackages.map((pkg) => (
                      <option key={pkg.slug} value={`${pkg.name} (${pkg.duration})`}>
                        {pkg.name} ({pkg.duration})
                      </option>
                    ))}
                    <option value="Custom Himachal Itinerary">Custom Itinerary (Discuss with Expert)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Pickup Location (Una / Amb / Railway Stn)
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    placeholder="e.g. Prem Nagar Una, Amb Andaura Station, Chandigarh"
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Start Date
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
                      Group Size / Pax
                    </label>
                    <select
                      value={numberOfPax}
                      onChange={(e) => setNumberOfPax(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2 py-2 text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                    >
                      <option value="2 Adults (Couple)">2 Adults (Couple)</option>
                      <option value="3-4 Adults (Family)">3-4 Adults (Family)</option>
                      <option value="5-6 Adults (Group)">5-6 Adults (Group)</option>
                      <option value="7-12 Adults (Big Group)">7-12 Adults (Big Group)</option>
                      <option value="12+ Members (Bus/Traveller)">12+ Members (Group)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-600 mb-1">
                    Preferred Cab Model
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                  >
                    <option value="Innova Crysta">Toyota Innova Crysta (6 Pax - Most Recommended)</option>
                    <option value="Maruti Ertiga">Maruti Ertiga (6 Pax - Economical Family)</option>
                    <option value="Swift Dzire">Swift Dzire (4 Pax - Sedan)</option>
                    <option value="Force Urbania">Force Urbania (12 Pax - Luxury Van)</option>
                    <option value="Tempo Traveller">Tempo Traveller (16 Pax - Group)</option>
                    <option value="Toyota Fortuner 4x4">Toyota Fortuner 4x4 (Luxury Hill SUV)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Your Name
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
                      WhatsApp Number
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
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Get Custom Tour Plan &amp; Quote &rarr;</span>
                </button>
              </form>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                <span className="flex items-center gap-1 text-[#f57c00]">
                  <span className="material-symbols-outlined text-[14px]">loyalty</span>
                  Best Rate Guaranteed
                </span>
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  No Hidden Charges
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TOUR PACKAGES SHOWCASE WITH CATEGORY FILTERS */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              HANDCRAFTED ITINERARIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight mt-1">
              Featured Tour Packages
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Every package comes with a dedicated sanitized commercial vehicle, personal hill chauffeur,
              and customizable sightseeing stops.
            </p>
          </div>

          {/* Instant Search Bar */}
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative flex items-center bg-[#f4f7fe] hover:bg-white focus-within:bg-white rounded-2xl border-2 border-transparent focus-within:border-[#f57c00] transition-all duration-200 shadow-sm focus-within:shadow-lg px-4 py-2">
              <span className="material-symbols-outlined text-gray-400 text-[22px] mr-2.5 shrink-0">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search packages (e.g. Manali, Devi Darshan, Kashmir, Shimla, 4 Days)..."
                className="w-full bg-transparent text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-full transition-colors shrink-0"
                  title="Clear search"
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                </button>
              )}
            </div>

            {/* Popular quick-search suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5 text-[11px] text-gray-500">
              <span className="font-semibold text-gray-400">Popular searches:</span>
              {["6 Devi Darshan", "12 Jyotirlinga", "Spiti Valley", "Manali", "Shimla", "Kashmir", "Dalhousie", "Ladakh", "Char Dham"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    setActiveCategory("all");
                  }}
                  className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                    searchQuery.toLowerCase() === tag.toLowerCase()
                      ? "bg-[#f57c00] text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { id: "all", label: "All Packages" },
              { id: "himachal", label: "Himachal & Spiti Holidays" },
              { id: "yatra", label: "6 Devi Darshan & Jyotirlinga Yatra" },
              { id: "kashmir-ladakh", label: "Kashmir & Ladakh" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-black transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#f57c00] text-white shadow-md scale-105"
                    : "bg-[#f4f7fe] text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results Summary Bar when searching */}
          {searchQuery.trim() && (
            <div className="flex items-center justify-between bg-[#fff7ed] border border-amber-200 rounded-xl px-4 py-2.5 mb-6 text-xs text-amber-900 font-semibold">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#f57c00]">manage_search</span>
                <span>
                  Found <strong>{filteredPackages.length}</strong> package{filteredPackages.length === 1 ? "" : "s"} matching &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[11px] font-bold text-[#f57c00] hover:underline"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* No results empty state */}
          {filteredPackages.length === 0 ? (
            <div className="text-center py-16 px-4 bg-[#f8fafc] rounded-3xl border border-gray-200 max-w-lg mx-auto">
              <span className="material-symbols-outlined text-5xl text-gray-400 mb-3">travel_explore</span>
              <h3 className="text-lg font-black text-gray-800">No matching tour packages found</h3>
              <p className="text-xs text-gray-500 mt-1 mb-5">
                We couldn&apos;t find any tour package matching &ldquo;{searchQuery}&rdquo;. Need a custom tour itinerary tailored just for you?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs transition-colors"
                >
                  Clear Filters
                </button>
                <a
                  href={whatsappLink(`Hello Dutta Travels, I am looking for a custom tour package for "${searchQuery}". Please help me with a custom quote.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white font-bold text-xs shadow-md transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Chat for Custom Itinerary</span>
                </a>
              </div>
            </div>
          ) : (
            /* Packages Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.slug}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-gray-200/80 group"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-900">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#f57c00] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md">
                      {pkg.duration}
                    </div>
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10">
                      {pkg.circuitBadge}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-[#182030]/90 backdrop-blur-sm text-white text-[10px] font-extrabold px-3 py-1 rounded-md border border-white/10">
                      Best Rate Guaranteed
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col gap-3">
                    <div>
                      <h3 className="font-black text-xl text-[#1e2638] group-hover:text-[#f57c00] transition-colors leading-snug">
                        {pkg.name}
                      </h3>
                      <span className="inline-block mt-1 text-[11px] font-bold text-[#f57c00]">
                        Vehicle: {pkg.featureNote}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      {pkg.summary}
                    </p>

                    {/* Inclusions Checklist */}
                    <div className="pt-2 flex flex-col gap-1.5 border-t border-gray-100 text-[11px] font-semibold text-gray-600">
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <span className="material-symbols-outlined text-[15px]">check_circle</span>
                        <span>Dedicated sanitized cab with mountain driver</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <span className="material-symbols-outlined text-[15px]">check_circle</span>
                        <span>All toll, state tax, fuel &amp; driver charges included</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <span className="material-symbols-outlined text-[15px]">check_circle</span>
                        <span>Doorstep pickup from Una / Amb Andaura</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-6 pt-0 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenPackageModal(pkg)}
                    className="w-full py-3 px-4 rounded-xl bg-[#182030] hover:bg-[#f57c00] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all group-hover:shadow-md cursor-pointer"
                  >
                    <span>⚡ Get Custom Plan &amp; Quote &rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHY TRAVELERS CHOOSE OUR TOUR PACKAGES */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-18 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              THE DUTTA TRAVELS ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight mt-1">
              Why Book Your Tour Package with Us?
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Unlike shared bus tours or impersonal portals, we offer a completely private, family-centric
              travel experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#f57c00] flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">directions_car</span>
              </div>
              <h3 className="font-extrabold text-base text-[#1e2638]">Private Cab on Standby</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your assigned cab stays with your family throughout the tour. No waiting for public buses,
                no rushed sightseeing schedules.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">temple_hindu</span>
              </div>
              <h3 className="font-extrabold text-base text-[#1e2638]">Pilgrimage Experts</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                For Devi Darshan circuits, our chauffeurs guide you on temple aarti timings, VIP gate
                parking, and elder-friendly access.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">landscape</span>
              </div>
              <h3 className="font-extrabold text-base text-[#1e2638]">Pahadi Mountain Drivers</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Native Himachal chauffeurs skilled in safe mountain driving across snow, sharp hairpins,
                and steep valley passes.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">loyalty</span>
              </div>
              <h3 className="font-extrabold text-base text-[#1e2638]">Transparent Billing</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All-inclusive quotes with fuel, driver stay, toll taxes, and state border entry fees
                confirmed upfront.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FLEET OPTIONS FOR TOURS */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                PREMIUM COMMERCIAL FLEET
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Choose Your Tour Vehicle
              </h2>
            </div>
            <Link
              to="/fleet"
              className="text-xs sm:text-sm font-bold text-[#f57c00] hover:underline flex items-center gap-1"
            >
              <span>Explore Fleet Specifications &rarr;</span>
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
                    href={whatsappLink(`Hello Dutta Travels, I want to book ${car.name} for a tour package.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#943e00] hover:bg-[#7a3200] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <span>⚡ Book {car.name} for Tour</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TOUR PACKAGES FAQS */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-16 border-t border-gray-100">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
              Tour Package Booking FAQs
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Important information regarding custom itineraries, hotel inclusions, and railway pickups.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {tourFaqs.map((faq, idx) => (
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
      {/* 6. BOTTOM HOTLINE CTA BANNER */}
      {/* ========================================================================= */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="bg-[#182030] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#f57c00] flex items-center justify-center text-white shadow-md flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">support_agent</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
                  NEED A CUSTOM HIMALAYAN TOUR?
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Plan Your Tour with Lav Dutta
                </h3>
                <p className="text-xs text-gray-300">
                  Direct dispatch from Prem Nagar, Una HQ. Transparent pricing, verified pahadi drivers, and 100% private cabs.
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
                href={whatsappLink("Hello Lav Dutta, I want to discuss a custom tour package.")}
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

      {/* DEDICATED TOUR PACKAGE BOOKING MODAL */}
      {modalPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-gray-100 flex flex-col gap-3.5 my-auto animate-fadeIn max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-[#f57c00]">
                  travel_explore
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#f57c00]">
                    {modalPackage.circuitBadge} &bull; {modalPackage.duration}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#1e2638] leading-tight">
                    {modalPackage.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setModalPackage(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleModalPackageSubmit} className="flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={modalName}
                    onChange={(e) => setModalName(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp number"
                    value={modalPhone}
                    onChange={(e) => setModalPhone(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">
                    Travel Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={modalDate}
                    onChange={(e) => setModalDate(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">
                    Group Size / Pax
                  </label>
                  <select
                    value={modalPax}
                    onChange={(e) => setModalPax(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-2 py-2 text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                  >
                    <option value="2 Adults (Couple)">2 Adults (Couple)</option>
                    <option value="3-4 Adults (Family)">3-4 Adults (Family)</option>
                    <option value="5-6 Adults (Group)">5-6 Adults (Group)</option>
                    <option value="7-12 Adults (Big Group)">7-12 Adults (Big Group)</option>
                    <option value="12+ Members (Bus/Traveller)">12+ Members (Group)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    value={modalVehicle}
                    onChange={(e) => setModalVehicle(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-2 py-2 text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                  >
                    <option value="Innova Crysta">Innova Crysta</option>
                    <option value="Maruti Ertiga">Maruti Ertiga</option>
                    <option value="Swift Dzire">Swift Dzire</option>
                    <option value="Force Urbania">Force Urbania</option>
                    <option value="Tempo Traveller">Tempo Traveller</option>
                    <option value="Toyota Fortuner 4x4">Fortuner 4x4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    value={modalPickup}
                    onChange={(e) => setModalPickup(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-4 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Confirm Booking &rarr;</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalPackage(null)}
                  className="w-full sm:w-auto py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <p className="text-[10.5px] text-center text-gray-500 mt-0.5">
                Logged directly into Dutta Travels Admin Panel &amp; shared via WhatsApp for instant confirmation.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Booking Confirmation Dialog Modal */}
      {bookingConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center flex flex-col items-center gap-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="text-2xl font-black text-[#1e2638]">Booking Confirmed!</h3>
            <p className="text-sm text-gray-600">
              Your tour package inquiry has been logged in our dispatch desk.
            </p>
            <p className="text-xs text-gray-500">
              Our hill dispatch desk has received your booking details and will contact you promptly.
            </p>
            <button
              onClick={() => setBookingConfirmed(false)}
              className="w-full py-3 rounded-xl bg-[#f57c00] text-white font-bold text-sm shadow-md hover:bg-[#e65100] cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
