import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { business, destinations, fleet, whatsappLink, recordBookingInquiry } from "../data/business";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "../data/schema";

const unaFaqs = [
  {
    question: "How do I book a taxi in Una with Dutta Tour & Travels?",
    answer:
      "You can book instantly by calling our 24/7 chauffeur desk at +91 8894021277 or sending your pickup details on WhatsApp. We confirm driver allocation and share cab details immediately.",
  },
  {
    question: "Do you provide pickup from Una Railway Station (UHL) and Amb Andaura (AADR)?",
    answer:
      "Yes! We specialize in dedicated platform arrival pickups for Vande Bharat Express (train 22447/22448), Jan Shatabdi, and Himachal Express. Our driver will be parked on standby before your train arrives.",
  },
  {
    question: "What are the taxi fares for outstation trips from Una?",
    answer:
      "Fares depend on your chosen vehicle, route distance, and trip duration. We provide transparent, competitive pricing with zero hidden charges. Contact us via WhatsApp or call our chauffeur desk for an instant, customized quote.",
  },
  {
    question: "Can we hire a taxi for 6 Devi Darshan pilgrimage from Una?",
    answer:
      "Yes, our specialized 6 Devi Darshan circuit covers Maa Chintpurni Devi, Maa Jwala Ji, Maa Baglamukhi (Bankhandi), Maa Kangra Brajeshwari, Maa Chamunda Devi, and Maa Naina Devi with experienced pilgrim chauffeurs who guide you on temple timings and VIP gates.",
  },
  {
    question: "Are your cabs commercially licensed with yellow plates?",
    answer:
      "Yes, 100% of our fleet carries commercial yellow number plates, all-India tourist permits, comprehensive passenger insurance, and valid fitness certificates approved by HP Govt.",
  },
];

export default function TaxiServiceUna() {
  const seo = seoConfig.taxiServiceUna;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi Services", path: "/taxi-services" },
    { name: "Taxi Service in Una" },
  ];

  // Booking Form State
  const [bookingTab, setBookingTab] = useState("outstation"); // "outstation" | "local" | "devi-darshan"
  const [pickupLocation, setPickupLocation] = useState("Una (Prem Nagar / Railway Stn)");
  const [destinationCircuit, setDestinationCircuit] = useState("Dharamshala / Mcleodganj");
  const [travelDate, setTravelDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [vehicleType, setVehicleType] = useState("Innova Crysta");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Tab change handler
  const handleTabChange = (tab) => {
    setBookingTab(tab);
    if (tab === "outstation") {
      setDestinationCircuit("Dharamshala / Mcleodganj");
    } else if (tab === "local") {
      setDestinationCircuit("Una Local Sightseeing & City (8 Hrs / 80 KM)");
    } else if (tab === "devi-darshan") {
      setDestinationCircuit("6 Devi Darshan (Chintpurni, Jwala Ji, Baglamukhi, Kangra, Chamunda, Naina Devi)");
    }
  };

  // Submit booking inquiry
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const tabName =
      bookingTab === "outstation"
        ? "Outstation Cab from Una"
        : bookingTab === "local"
        ? "Local Una City Ride"
        : "Devi Darshan Pilgrimage Circuit";

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
      `*NEW TAXI INQUIRY - UNA DESK*\n\n` +
      (customerName.trim() ? `• *Passenger Name:* ${customerName.trim()}\n` : "") +
      (customerPhone.trim() ? `• *Mobile / WhatsApp:* ${customerPhone.trim()}\n` : "") +
      `• *Service:* ${tabName}\n` +
      `• *Pickup Point:* ${pickupLocation}\n` +
      `• *Destination:* ${destinationCircuit}\n` +
      `• *Date of Travel:* ${travelDate}\n` +
      `• *Preferred Vehicle:* ${vehicleType}\n\n` +
      `Please check driver availability and confirm booking from Una HQ.`;

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
          faqSchema(unaFaqs),
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
            alt="Taxi in Una Himachal Pradesh"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Value Proposition */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f57c00] text-white text-xs font-black shadow-md self-start">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>15+ YEARS TRUSTED TAXI OPERATOR &bull; PREM NAGAR, UNA</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Taxi Service in Una, Himachal Pradesh
              </h1>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                Looking for a dependable, clean, and punctual cab in Una? Dutta Tour &amp; Travels
                provides 24/7 taxi booking for local city travel, Una Railway Station (UHL), Amb
                Andaura Vande Bharat platform transfers, 6 Devi Darshan yatra, and outstation hill
                journeys across Himachal Pradesh and North India.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-left">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-[#f57c00]">schedule</span>
                  <span className="block text-xs font-black mt-1">24/7 Service</span>
                  <span className="block text-[10px] text-gray-300">Prem Nagar Una HQ</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-amber-400">directions_railway</span>
                  <span className="block text-xs font-black mt-1">Station Pickup</span>
                  <span className="block text-[10px] text-gray-300">UHL &amp; Amb Vande Bharat</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-emerald-400">shield</span>
                  <span className="block text-xs font-black mt-1">Yellow Plate</span>
                  <span className="block text-[10px] text-gray-300">100% Commercial Govt</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-blue-400">thumb_up</span>
                  <span className="block text-xs font-black mt-1">4.9 ★ Rating</span>
                  <span className="block text-[10px] text-gray-300">660+ Happy Pilgrims</span>
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
                  href={whatsappLink("Hello Dutta Travels, I need a taxi in Una.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Instant Booking Widget for Una */}
            <div className="lg:col-span-5 bg-white text-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-100 flex flex-col gap-3.5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[24px] text-[#f57c00]">
                    local_taxi
                  </span>
                  <h3 className="text-lg font-black text-[#1e2638]">
                    Book Taxi in Una
                  </h3>
                </div>
                <span className="bg-[#e7f9f0] text-[#1b804e] text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                  Instant Dispatch
                </span>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-[#edf2fe] p-1 rounded-xl">
                {[
                  { id: "outstation", label: "Outstation" },
                  { id: "local", label: "Una Local" },
                  { id: "devi-darshan", label: "Devi Darshan" },
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
                    Pickup Point in Una
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="e.g. Prem Nagar, Una Station, Nangal"
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Destination / Route
                  </label>
                  <input
                    type="text"
                    required
                    value={destinationCircuit}
                    onChange={(e) => setDestinationCircuit(e.target.value)}
                    placeholder="e.g. Dharamshala, Manali, Shimla, Chandigarh"
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
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
                      <option value="Fortuner 4x4">Fortuner 4x4 (6 Pax)</option>
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
                  <span>Confirm Taxi in Una &rarr;</span>
                </button>
              </form>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                <span className="flex items-center gap-1 text-[#f57c00]">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  Zero Hidden Night Charges
                </span>
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Commercial Yellow Plate
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CORE TAXI SERVICES IN UNA */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              OUR SERVICES IN UNA DISTRICT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight mt-1">
              Comprehensive Cab Hire Services in Una
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              From daily local commuting in Prem Nagar and Una town to Himalayan road trips and
              sacred temple pilgrimages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Local Una City Cab */}
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">location_city</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1e2638]">
                  Local Una City Rides
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Convenient point-to-point rides and half-day (4h/40km) or full-day (8h/80km) rentals
                  across Prem Nagar, Una Market, Court, Hospital, Mehatpur, and Santoshgarh.
                </p>
              </div>
              <a
                href={whatsappLink("Hello Dutta Travels, I need local taxi service in Una")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#f57c00] hover:underline flex items-center gap-1 self-start"
              >
                <span>Book Local Cab &rarr;</span>
              </a>
            </div>

            {/* Card 2: Railway Station Transfers */}
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#f57c00] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">train</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1e2638]">
                  Una &amp; Amb Station Pickups
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Punctual doorstep transfers for Una Himachal (UHL) and Amb Andaura (AADR) Railway
                  Stations. Timed arrivals for Vande Bharat Express and Jan Shatabdi.
                </p>
              </div>
              <Link
                to="/amb-andaura-railway-station-taxi"
                className="text-xs font-bold text-[#f57c00] hover:underline flex items-center gap-1 self-start"
              >
                <span>Station Pickup Details &rarr;</span>
              </Link>
            </div>

            {/* Card 3: Outstation Hill Taxi */}
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">landscape</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1e2638]">
                  Outstation Hill Journeys
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Safe mountain travel to Dharamshala, McLeodganj, Shimla, Manali, Dalhousie, and
                  Chandigarh Airport with certified mountain chauffeurs.
                </p>
              </div>
              <Link
                to="/outstation-taxi"
                className="text-xs font-bold text-[#f57c00] hover:underline flex items-center gap-1 self-start"
              >
                <span>Outstation Routes &rarr;</span>
              </Link>
            </div>

            {/* Card 4: Devi Darshan Yatra */}
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">temple_hindu</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1e2638]">
                  6 Devi Darshan Pilgrimage
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Dedicated sacred yatra circuits covering Maa Chintpurni Devi, Maa Jwala Ji, Maa
                  Baglamukhi, Maa Kangra Brajeshwari, Maa Chamunda Devi, and Maa Naina Devi with elder-friendly care.
                </p>
              </div>
              <a
                href={whatsappLink("Hello Dutta Travels, I want to book 6 Devi Darshan yatra from Una")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#f57c00] hover:underline flex items-center gap-1 self-start"
              >
                <span>Pilgrimage Packages &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. POPULAR OUTSTATION ROUTES FROM UNA (SEO Ranking Routes) */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-18 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                TOP TAXI ROUTES FROM UNA
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Frequently Booked Cabs from Una
              </h2>
            </div>
            <Link
              to="/destinations"
              className="text-xs sm:text-sm font-bold text-[#f57c00] hover:underline flex items-center gap-1"
            >
              <span>View All Routes &amp; Fares</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {destinations.slice(0, 6).map((dest) => (
              <Link
                key={dest.slug}
                to={`/${dest.slug}`}
                className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-3 border border-gray-200/70"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={dest.image}
                    alt={dest.routeTitle || dest.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-[#1e2638] group-hover:text-[#f57c00] transition-colors leading-snug">
                      {dest.name}
                    </h3>
                    <span className="text-[11px] font-bold text-[#f57c00] block mt-0.5">
                      {dest.distanceKm} KM &bull; {dest.duration || "Direct"}
                    </span>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{dest.summary}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#1e2638] text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                    Best Rate Guaranteed
                  </span>
                  <span className="text-xs font-bold text-[#f57c00] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>View Route</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMMERCIAL FLEET IN UNA */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                OUR MAINTAINED FLEET
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Cars Available for Hire in Una
              </h2>
            </div>
            <Link
              to="/fleet"
              className="text-xs sm:text-sm font-bold text-[#f57c00] hover:underline flex items-center gap-1"
            >
              <span>Explore Full Fleet Details</span>
              <span>&rarr;</span>
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
                    href={whatsappLink(`Hello Dutta Travels, I want to book ${car.name} in Una.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#943e00] hover:bg-[#7a3200] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <span>⚡ Book {car.name} in Una</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. COVERAGE ACROSS UNA DISTRICT */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-16 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              LOCAL NETWORK COVERAGE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
              Doorstep Taxi Pickups Across Una &amp; Surroundings
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              We provide rapid 15 to 30-minute cab dispatches across every corner of Una district.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              "Prem Nagar (HQ)",
              "Una Railway Station",
              "Amb Andaura (AADR)",
              "Mehatpur Border",
              "Nangal Dam",
              "Santoshgarh",
              "Haroli Tehsil",
              "Tahliwal Industrial",
              "Gagret Town",
              "Mubarakpur",
              "Bangana Valley",
              "Chintpurni Foothills",
            ].map((loc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-3 border border-gray-200/80 text-center font-bold text-xs text-[#1e2638] shadow-sm flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px] text-[#f57c00]">location_on</span>
                <span>{loc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-16 border-t border-gray-100">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
              Una Taxi Booking FAQs
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {unaFaqs.map((faq, idx) => (
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
                  NEED A CAB IN UNA RIGHT NOW?
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Speak Directly with Lav Dutta
                </h3>
                <p className="text-xs text-gray-300">
                  Instant cab dispatch from Prem Nagar HQ. Fair rates, clean cars, and courteous drivers.
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
                href={whatsappLink("Hello Lav Dutta, I need a taxi in Una.")}
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
            <h3 className="text-2xl font-black text-[#1e2638]">Taxi Request Sent!</h3>
            <p className="text-sm text-gray-600">
              Your taxi booking request from <strong>{pickupLocation}</strong> to{" "}
              <strong>{destinationCircuit}</strong> ({vehicleType}) on <strong>{travelDate}</strong>{" "}
              has been received.
            </p>
            <p className="text-xs text-gray-500">
              Our dispatch desk will confirm your driver details on WhatsApp shortly.
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

