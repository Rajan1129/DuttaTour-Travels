import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { business, destinations, fleet, whatsappLink, recordBookingInquiry } from "../data/business";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "../data/schema";

const outstationFaqs = [
  {
    question: "How do I book an outstation taxi with Mandyal Tour & Travels?",
    answer:
      "You can book instantly by calling our 24/7 dispatch hotline at +91 7807481503 or sending your trip details via WhatsApp. Provide your pickup location in Una or Amb, destination, travel dates, and vehicle preference to receive an instant, customized quote.",
  },
  {
    question: "Do you offer both one-way drops and round-trip outstation journeys?",
    answer:
      "Yes! We provide both dedicated one-way drops (e.g., Una to Chandigarh Airport, Una to Delhi, or Amb to Dharamshala) as well as round-trip multi-day holiday packages with the vehicle and driver on full-day sightseeing standby.",
  },
  {
    question: "Are your drivers trained for high-altitude mountain hill driving?",
    answer:
      "Absolutely. All our chauffeurs are native Himachal mountain drivers with over 10+ years of experience navigating winding hill ghats, high mountain passes like Rohtang Pass, Atal Tunnel, and monsoon driving conditions safely.",
  },
  {
    question: "Are toll taxes, state border permits, and parking charges included?",
    answer:
      "We provide 100% transparent pricing. When we share your outstation quote, all inclusions such as driver allowances, fuel, state border taxes, and toll fees are clearly specified with zero unexpected hidden charges.",
  },
  {
    question: "Can we get an outstation cab directly from Una or Amb Andaura Railway Stations?",
    answer:
      "Yes! We specialize in direct train platform arrivals. Our chauffeur will be waiting outside the station (for Vande Bharat Express, Himachal Express, or Jan Shatabdi) to assist with luggage and begin your outstation journey without any transit delays.",
  },
];

export default function OutstationTaxi() {
  const seo = seoConfig.outstationTaxi;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi Services", path: "/taxi-services" },
    { name: "Outstation Taxi" },
  ];

  // Booking Form State
  const [tripType, setTripType] = useState("round-trip"); // "round-trip" | "one-way" | "pilgrimage"
  const [pickupCity, setPickupCity] = useState("Una (Prem Nagar / Railway Station)");
  const [destination, setDestination] = useState("Manali & Atal Tunnel (Himachal)");
  const [departureDate, setDepartureDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState(() => new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0]);
  const [vehicleType, setVehicleType] = useState("Innova Crysta");
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Handle Trip Type Selection
  const handleTripTypeChange = (type) => {
    setTripType(type);
    if (type === "one-way") {
      setDestination("Chandigarh Airport (IXC)");
    } else if (type === "round-trip") {
      setDestination("Manali & Atal Tunnel (Himachal)");
    } else if (type === "pilgrimage") {
      setDestination("6 Devi Darshan (Chintpurni, Jwala Ji, Baglamukhi, Kangra, Chamunda, Naina Devi)");
    }
  };

  // Submit Handler
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const tripTypeName =
      tripType === "round-trip"
        ? "Round Trip (Multi-Day)"
        : tripType === "one-way"
        ? "One-Way Drop"
        : "Pilgrimage Yatra Circuit";

    // Record directly in Admin Portal Dispatch Desk
    recordBookingInquiry({
      name: passengerName.trim() || "Website Traveler",
      phone: passengerPhone.trim() || "Not provided",
      pickup: pickupCity,
      drop: destination,
      car: vehicleType,
      date: departureDate,
      notes: `${tripTypeName} (Return: ${returnDate})`,
    });

    const msg =
      `*NEW OUTSTATION TAXI INQUIRY*\n\n` +
      (passengerName.trim() ? `• *Passenger Name:* ${passengerName.trim()}\n` : "") +
      (passengerPhone.trim() ? `• *Mobile / WhatsApp:* ${passengerPhone.trim()}\n` : "") +
      `• *Trip Type:* ${tripTypeName}\n` +
      `• *Pickup Point:* ${pickupCity}\n` +
      `• *Destination:* ${destination}\n` +
      `• *Departure Date:* ${departureDate}\n` +
      (tripType === "round-trip" ? `• *Return Date:* ${returnDate}\n` : "") +
      `• *Selected Cab:* ${vehicleType}\n\n` +
      `Please check driver availability and provide best quote.`;

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
          faqSchema(outstationFaqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH OUTSTATION BOOKING WIDGET */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#182030] text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/hero-bg.jpg"
            alt="Outstation Taxi from Una and Amb Himachal"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f57c00] text-white text-xs font-black shadow-md self-start">
                <span className="material-symbols-outlined text-[15px]">landscape</span>
                <span>HIMACHAL HILL SPECIALIST &bull; 15+ YEARS EXPERIENCE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Outstation Taxi from Una &amp; Amb
              </h1>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                Planning an outstation trip from Una or Amb Andaura? Mandyal Tour &amp; Travel delivers
                flawless outstation taxi services across Himachal Pradesh, Punjab, Chandigarh, and
                Delhi NCR. Travel comfortably in sanitized commercial vehicles with seasoned mountain
                chauffeurs.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-left">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-amber-400">mountain_flag</span>
                  <span className="block text-xs font-black mt-1">Hill Certified</span>
                  <span className="block text-[10px] text-gray-300">Expert Pahadi Chauffeurs</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-emerald-400">shield</span>
                  <span className="block text-xs font-black mt-1">Yellow Plate</span>
                  <span className="block text-[10px] text-gray-300">100% Commercial Fleet</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-[#f57c00]">loyalty</span>
                  <span className="block text-xs font-black mt-1">Best Rates</span>
                  <span className="block text-[10px] text-gray-300">Zero Hidden Surcharges</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-blue-400">support_agent</span>
                  <span className="block text-xs font-black mt-1">24/7 Desk</span>
                  <span className="block text-[10px] text-gray-300">Live Journey Tracking</span>
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
                  href={whatsappLink("Hello Mandyal Travels, I need an outstation taxi quote.")}
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
                    local_taxi
                  </span>
                  <h3 className="text-lg font-black text-[#1e2638]">
                    Book Outstation Cab
                  </h3>
                </div>
                <span className="bg-[#e7f9f0] text-[#1b804e] text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                  Best Rate Guaranteed
                </span>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-[#edf2fe] p-1 rounded-xl">
                {[
                  { id: "round-trip", label: "Round Trip" },
                  { id: "one-way", label: "One Way Drop" },
                  { id: "pilgrimage", label: "Devi Yatra" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTripTypeChange(t.id)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      tripType === t.id
                        ? "bg-[#f57c00] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Pickup Location (Una / Amb / Doorstep)
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    placeholder="e.g. Prem Nagar Una, Amb Andaura Station, Nangal"
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Destination / Outstation Circuit
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Shimla, Manali, Dharamshala, Chandigarh"
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Departure Date
                    </label>
                    <input
                      type="date"
                      required
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      {tripType === "round-trip" ? "Return Date" : "Vehicle Choice"}
                    </label>
                    {tripType === "round-trip" ? (
                      <input
                        type="date"
                        required
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full bg-[#f4f7fe] rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                      />
                    ) : (
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
                    )}
                  </div>
                </div>

                {tripType === "round-trip" && (
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Vehicle Type
                    </label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                    >
                      <option value="Innova Crysta">Innova Crysta (6 Pax)</option>
                      <option value="Maruti Ertiga">Maruti Ertiga (6 Pax)</option>
                      <option value="Swift Dzire">Swift Dzire (4 Pax)</option>
                      <option value="Force Urbania">Force Urbania (12 Pax)</option>
                      <option value="Tempo Traveller">Tempo Traveller (16 Pax)</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Passenger Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
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
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-4 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Request Outstation Quote &rarr;</span>
                </button>
              </form>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                <span className="flex items-center gap-1 text-[#f57c00]">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  All-Inclusive Options
                </span>
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Commercial Tourist Permit
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CORE OUTSTATION SERVICES & CAPABILITIES */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              WHY BOOK WITH MANDYAL TRAVELS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight mt-1">
              Engineered for Safe Hill Journeys
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Every outstation journey is backed by 15+ years of local mountain expertise, fully
              maintained commercial vehicles, and dedicated driver support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#f57c00] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">terrain</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1e2638]">
                  Pahadi Mountain Drivers
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Our chauffeurs have years of high-altitude experience driving across snow, steep
                  inclines, sharp hairpin bends, and fog across Himachal Pradesh.
                </p>
              </div>
              <span className="text-xs font-bold text-[#f57c00]">Certified Chauffeurs &bull; Police Verified</span>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">verified_user</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1e2638]">
                  Commercial Yellow Plates
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  100% legal commercial tourist registrations with comprehensive passenger insurance,
                  state tax permits, and zero border harassment.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700">All-India Tourist Permit</span>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">price_check</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1e2638]">
                  Transparent Rate Policy
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Zero hidden charges at the end of your trip. Toll, state entry taxes, driver night
                  allowances, and fuel are explicitly confirmed before you travel.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700">Best Rate Guarantee</span>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">directions_car</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1e2638]">
                  Roof Carriers &amp; High Clearance
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  SUVs and Tempo Travellers fitted with heavy-duty luggage carriers and high suspension
                  ground clearance for rugged hill terrain and family luggage.
                </p>
              </div>
              <span className="text-xs font-bold text-purple-700">Clean Dual AC / Heater</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TOP OUTSTATION ROUTES (SEO Internal Links to Route Pages) */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-18 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                POPULAR OUTSTATION CIRCUITS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Top Outstation Taxi Routes from Una &amp; Amb
              </h2>
            </div>
            <Link
              to="/destinations"
              className="text-xs sm:text-sm font-bold text-[#f57c00] hover:underline flex items-center gap-1"
            >
              <span>View All Destinations &rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations.map((d) => (
              <div
                key={d.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-gray-200/80 group"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-gray-900">
                    <img
                      src={d.image}
                      alt={d.routeTitle || d.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1 shadow-md">
                      <span className="material-symbols-outlined text-[13px] text-[#f57c00]">navigation</span>
                      <span>{d.distanceKm} KM</span>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 bg-[#182030]/90 backdrop-blur-sm text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow border border-white/10">
                      Best Rate Guaranteed
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col gap-1.5">
                    <h3 className="font-black text-base text-[#1e2638] group-hover:text-[#f57c00] transition-colors leading-snug">
                      {d.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                      <span className="material-symbols-outlined text-[15px] text-[#f57c00]">schedule</span>
                      <span>{d.duration || "Direct Cab"}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1 leading-relaxed">
                      {d.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 pt-0 flex flex-col gap-2">
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      Round Trip &amp; One Way
                    </span>
                    <Link
                      to={`/${d.slug}`}
                      className="font-bold text-[#f57c00] hover:underline flex items-center gap-0.5"
                    >
                      <span>Route Info</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>

                  <a
                    href={whatsappLink(`Hello Mandyal Travels, I want to book an outstation taxi to ${d.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-[#182030] hover:bg-[#f57c00] text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>⚡ Inquire This Route</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMMERCIAL FLEET FOR OUTSTATION JOURNEYS */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                CLEAN &bull; RELIABLE &bull; POWERFUL
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Outstation Cab Fleet
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
                    href={whatsappLink(`Hello Mandyal Travels, I want to book ${car.name} for an outstation trip.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#943e00] hover:bg-[#7a3200] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <span>⚡ Book {car.name} Outstation</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OUTSTATION FAQS ACCORDION */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-16 border-t border-gray-100">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
              Outstation Taxi Booking FAQs
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Important details about outstation bookings, permits, driver allowances, and hill travel.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {outstationFaqs.map((faq, idx) => (
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
                  READY FOR YOUR HIMALAYAN ROAD TRIP?
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Get a Custom Outstation Quote with Manoj Mandyal
                </h3>
                <p className="text-xs text-gray-300">
                  Direct dispatch from Prem Nagar, Una HQ. Competitive tariffs, sanitized cabs, and trusted pahadi drivers.
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
                href={whatsappLink("Hello Manoj Mandyal, I need an outstation taxi quote.")}
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
            <h3 className="text-2xl font-black text-[#1e2638]">Outstation Request Sent!</h3>
            <p className="text-sm text-gray-600">
              Your outstation journey request from <strong>{pickupCity}</strong> to{" "}
              <strong>{destination}</strong> ({vehicleType}) departing on <strong>{departureDate}</strong>{" "}
              has been forwarded to our outstation desk.
            </p>
            <p className="text-xs text-gray-500">
              We will share vehicle availability and our best customized quote on WhatsApp momentarily.
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
