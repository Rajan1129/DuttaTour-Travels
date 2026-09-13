import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import NotFound from "./NotFound";
import { business, destinations, fleet, whatsappLink, recordBookingInquiry } from "../data/business";
import { routeTaxiSeo } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema } from "../data/schema";

export default function RouteTaxi({ slug }) {
  const destination = destinations.find((d) => d.slug === slug);
  const seo = routeTaxiSeo[slug];

  // Route Booking Widget State
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [pickupCity, setPickupCity] = useState("Una (Prem Nagar / Amb Andaura Stn)");
  const [travelDate, setTravelDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [selectedCab, setSelectedCab] = useState("Toyota Innova Crysta");
  const [numPassengers, setNumPassengers] = useState("2-4 Persons");
  const [tripType, setTripType] = useState("One-Way Drop"); // "One-Way Drop" | "Round Trip"
  const [bookingDone, setBookingDone] = useState(false);

  if (!destination || !seo) return <NotFound />;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Destinations & Routes", path: "/destinations" },
    { name: destination.routeTitle || `Una to ${destination.name}` },
  ];

  // Handle direct booking submission
  const handleRouteBooking = (e) => {
    e.preventDefault();

    // Record directly in Admin Portal Dispatch Desk
    recordBookingInquiry({
      name: passengerName.trim() || "Website Traveler",
      phone: passengerPhone.trim() || "Not provided",
      pickup: pickupCity,
      drop: destination.routeTitle || destination.name,
      car: selectedCab,
      date: travelDate,
      notes: `Route: ${destination.routeTitle || destination.name} (~${destination.distanceKm} KM) | Trip: ${tripType} | Travelers: ${numPassengers}`,
    });

    const msg =
      `*NEW ROUTE CAB BOOKING - DUTTA TRAVELS*\n\n` +
      `• *Route:* ${destination.routeTitle || destination.name}\n` +
      (passengerName.trim() ? `• *Passenger Name:* ${passengerName.trim()}\n` : "") +
      (passengerPhone.trim() ? `• *Mobile / WhatsApp:* ${passengerPhone.trim()}\n` : "") +
      `• *Trip Type:* ${tripType}\n` +
      `• *No. of Travelers:* ${numPassengers}\n` +
      `• *Pickup Location:* ${pickupCity}\n` +
      `• *Travel Date:* ${travelDate}\n` +
      `• *Vehicle Chosen:* ${selectedCab}\n` +
      `• *Distance:* ~${destination.distanceKm} KM (${destination.duration || ""})\n\n` +
      `Please check driver availability and confirm fare estimate.`;

    setBookingDone(true);
    window.open(whatsappLink(msg), "_blank");
  };

  return (
    <Layout>
      <SEO
        path={`/${slug}`}
        title={seo.title}
        description={seo.description}
        structuredData={[localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />

      {/* ========================================================================= */}
      {/* 1. ROUTE HERO BANNER */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-r from-[#141b2b] via-[#1a2336] to-[#1e2638] text-white py-12 sm:py-16 overflow-hidden">
        {/* Background Image with Scrim */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Route Title, Badges & Highlights */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f57c00] text-white text-xs font-black shadow-md self-start">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>VERIFIED COMMERCIAL HILL ROUTE &bull; 24/7 SERVICE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                {destination.routeTitle || `Una to ${destination.name} Taxi`}
              </h1>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                {destination.summary} Guaranteed on-time departures from Una, Amb Andaura Vande
                Bharat platform, Nangal, and Hoshiarpur with certified hill chauffeurs.
              </p>

              {/* 4 Metric Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
                  <span className="block text-[10px] uppercase font-bold text-amber-400">Distance</span>
                  <span className="text-base sm:text-lg font-black">{destination.distanceKm} KM</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
                  <span className="block text-[10px] uppercase font-bold text-amber-400">Travel Time</span>
                  <span className="text-base sm:text-lg font-black">{destination.duration || "Direct Cab"}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
                  <span className="block text-[10px] uppercase font-bold text-amber-400">Pricing</span>
                  <span className="text-sm sm:text-base font-black text-white">
                    Best Rate Guaranteed
                  </span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
                  <span className="block text-[10px] uppercase font-bold text-amber-400">Highway</span>
                  <span className="text-xs sm:text-sm font-bold truncate block">
                    {destination.highway ? destination.highway.split(" ")[0] : "National Hwy"}
                  </span>
                </div>
              </div>

              {/* Instant Call & WhatsApp Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${business.phonesTel[0]}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Instant Call: {business.phones[0]}</span>
                </a>
                <a
                  href={whatsappLink(`Hello Dutta Travels, I need a taxi for ${destination.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Instant Booking Form Card */}
            <div className="lg:col-span-5 bg-white text-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-100 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#f57c00]">
                    ONLINE ROUTE BOOKING
                  </span>
                  <h3 className="text-lg font-black text-[#1e2638]">
                    Book {destination.name}
                  </h3>
                </div>
                <span className="bg-[#e7f9f0] text-[#1b804e] text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                  Instant Confirmation
                </span>
              </div>

              <form onSubmit={handleRouteBooking} className="flex flex-col gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Passenger Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Mobile / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter WhatsApp number"
                    value={passengerPhone}
                    onChange={(e) => setPassengerPhone(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
                </div>

                {/* Trip Type Selector */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#edf2fe] rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setTripType("One-Way Drop")}
                    className={`py-1.5 rounded-lg transition-all text-center ${
                      tripType === "One-Way Drop"
                        ? "bg-[#f57c00] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    One-Way Drop
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType("Round Trip")}
                    className={`py-1.5 rounded-lg transition-all text-center ${
                      tripType === "Round Trip"
                        ? "bg-[#f57c00] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Round Trip
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Travel Date
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
                      No. of Travelers
                    </label>
                    <select
                      value={numPassengers}
                      onChange={(e) => setNumPassengers(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2 py-2 text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                    >
                      <option value="1-2 Persons">1-2 Persons</option>
                      <option value="2-4 Persons">2-4 Persons</option>
                      <option value="5-7 Persons">5-7 Persons</option>
                      <option value="8-12 Persons (Tempo)">8-12 Persons</option>
                      <option value="13+ Group">13+ Group</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Vehicle Preferred
                    </label>
                    <select
                      value={selectedCab}
                      onChange={(e) => setSelectedCab(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2 py-2 text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                    >
                      <option value="Toyota Innova Crysta">Innova Crysta</option>
                      <option value="Maruti Ertiga">Maruti Ertiga</option>
                      <option value="Swift Dzire">Swift Dzire</option>
                      <option value="Force Urbania">Force Urbania</option>
                      <option value="Tempo Traveller">Tempo Traveller</option>
                      <option value="Toyota Fortuner 4x4">Fortuner 4x4</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      value={pickupCity}
                      onChange={(e) => setPickupCity(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-1 py-3 px-4 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Confirm Booking &rarr;</span>
                </button>
              </form>

              <p className="text-[10px] text-center text-gray-500">
                Direct WhatsApp routing with driver assigned upon confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FLEET CHOICES FOR THIS ROUTE */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#fbfcfe] py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                RECOMMENDED CABS FOR THIS ROUTE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Choose Your Vehicle for {destination.name}
              </h2>
            </div>
            <Link
              to="/fleet"
              className="text-xs sm:text-sm font-bold text-[#f57c00] hover:underline flex items-center gap-1"
            >
              <span>Explore All Vehicles</span>
              <span>&rarr;</span>
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

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
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
                    href={whatsappLink(
                      `Hello Dutta Travels, I want to book ${car.name} for ${destination.name} route.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#943e00] hover:bg-[#7a3200] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>⚡ Book {car.name}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SIGHTSEEING & STOPOVER HIGHLIGHTS */}
      {/* ========================================================================= */}
      {destination.keyPlaces && (
        <section className="w-full bg-[#f4f7fe] py-14 sm:py-16 border-t border-gray-200/60">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                KEY SIGHTSEEING &amp; STOPS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Places Covered on the {destination.name} Journey
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {destination.keyPlaces.map((place, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col items-center text-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-[#f57c00] flex items-center justify-center font-black text-sm">
                    {idx + 1}
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm text-[#1e2638]">
                    {place}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. ROUTE INCLUSIONS & GUARANTEE */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#f8faff] border border-gray-100 flex flex-col gap-2">
              <span className="material-symbols-outlined text-[24px] text-[#f57c00]">
                shield
              </span>
              <h3 className="font-bold text-sm text-[#1e2638]">100% Commercial Permits</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All vehicles carry Himachal yellow plates with valid road permits. No harassment at
                border barriers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8faff] border border-gray-100 flex flex-col gap-2">
              <span className="material-symbols-outlined text-[24px] text-blue-700">
                engineering
              </span>
              <h3 className="font-bold text-sm text-[#1e2638]">Certified Hill Chauffeur</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Drivers possess deep local route knowledge, fog handling skills, and mountain curve
                driving finesse.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8faff] border border-gray-100 flex flex-col gap-2">
              <span className="material-symbols-outlined text-[24px] text-emerald-700">
                receipt_long
              </span>
              <h3 className="font-bold text-sm text-[#1e2638]">Transparent Billing</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All highway tolls, state border taxes, and night allowances are explained upfront
                with zero surprise fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ROUTE SPECIFIC FAQS */}
      {/* ========================================================================= */}
      {destination.faqs && destination.faqs.length > 0 && (
        <section className="w-full bg-[#f4f7fe] py-14 sm:py-16 border-t border-gray-100">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                {destination.name} Taxi Travel FAQs
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {destination.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/70 shadow-sm group cursor-pointer"
                >
                  <summary className="font-extrabold text-sm sm:text-base text-[#1e2638] list-none flex items-center justify-between">
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-[20px] text-gray-400 group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 6. BOTTOM HOTLINE CTA */}
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
                  ROUTE ASSISTANCE &bull; LAVKUSH DUTTA
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Need Help Planning {destination.name}?
                </h3>
                <p className="text-xs text-gray-300">
                  Call directly for personalized route advice, toll guidance, and vehicle selection.
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
                href={whatsappLink(`Hello Lavkush Dutta, I need assistance for ${destination.name}`)}
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
      {bookingDone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center flex flex-col items-center gap-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="text-2xl font-black text-[#1e2638]">Booking Confirmed!</h3>
            <p className="text-sm text-gray-600">
              Your booking for <strong>{destination.name}</strong> ({selectedCab}) on{" "}
              <strong>{travelDate}</strong> has been logged in our dispatch desk.
            </p>
            <p className="text-xs text-gray-500">
              Our hill dispatch desk has received your booking details and will contact you promptly.
            </p>
            <button
              onClick={() => setBookingDone(false)}
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
