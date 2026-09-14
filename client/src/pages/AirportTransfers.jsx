import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { business, fleet, whatsappLink, recordBookingInquiry } from "../data/business";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "../data/schema";

const airportFaqs = [
  {
    question: "How early should I book an airport taxi from Una to Chandigarh or Delhi Airport?",
    answer:
      "We recommend booking at least 12 to 24 hours in advance to guarantee vehicle allocation, especially for early-morning departures (e.g. 2:00 AM or 4:00 AM pickups in Una for morning flights). Urgent same-day bookings can also be confirmed immediately by calling our 24/7 hotline at +91 8894021277.",
  },
  {
    question: "What happens if my inbound flight to Chandigarh or Delhi is delayed?",
    answer:
      "We track your incoming flight status live using your flight number. If your flight is delayed, our driver automatically adjusts arrival timing so there are no extra waiting fees or stress when you land.",
  },
  {
    question: "Where will the chauffeur meet me at Chandigarh or Delhi Airport arrivals?",
    answer:
      "Our chauffeur will wait outside the designated arrival gate holding a digital or physical name board with your name. We also share the driver's phone number and car registration details on WhatsApp before you land.",
  },
  {
    question: "Can your cabs handle large international trolley bags and family luggage?",
    answer:
      "Yes! Our Toyota Innova Crysta, Maruti Ertiga, and Tempo Travellers are equipped with spacious luggage boots and heavy-duty overhead luggage carriers to safely transport international trolley suitcases, prams, and golf bags.",
  },
  {
    question: "Are toll taxes and state road taxes included in the airport transfer quote?",
    answer:
      "Yes, we provide 100% transparent quotes. When you inquire, we can provide an all-inclusive tariff covering vehicle rental, fuel, highway tolls, and state border permits with zero hidden surprises.",
  },
];

const airportsCovered = [
  {
    name: "Shaheed Bhagat Singh Int'l Airport, Chandigarh",
    code: "IXC",
    distance: "115 - 120 KM",
    duration: "2.5 - 3 Hours",
    route: "Via Nangal, Anandpur Sahib & Kharar Expressway",
    availableVehicles: "Dzire, Ertiga, Innova Crysta, Urbania",
    description:
      "Primary commercial airport for Una district with nonstop flights to Mumbai, Delhi, Bangalore, Dubai, Sharjah, Hyderabad, and Goa.",
    badge: "Most Popular",
    highlight: "Daily Express Transfers",
  },
  {
    name: "Indira Gandhi Int'l Airport, New Delhi",
    code: "DEL (T1, T2, T3)",
    distance: "365 - 380 KM",
    duration: "6.5 - 7 Hours",
    route: "Via Ambala, Kurukshetra, Panipat & NH-44 Express",
    availableVehicles: "Innova Crysta, Ertiga, Dzire, Tempo Traveller",
    description:
      "Global international gateway for overseas flights to Canada, UK, USA, Europe, and Australia. Smooth 6-lane expressway travel with rest stops.",
    badge: "International Gateway",
    highlight: "Heavy Luggage Friendly",
  },
  {
    name: "Sri Guru Ram Dass Jee Int'l Airport, Amritsar",
    code: "ATQ",
    distance: "165 - 170 KM",
    duration: "3.5 Hours",
    route: "Via Hoshiarpur, Jalandhar & GT Road",
    availableVehicles: "Dzire, Etios, Ertiga, Innova Crysta",
    description:
      "Major direct international flights to London Heathrow, Birmingham, Milan, Rome, Dubai, and Singapore. Direct transit from Una & Amb.",
    badge: "Direct European Flights",
    highlight: "NRI Preferred Route",
  },
  {
    name: "Kangra Gaggal Airport (Dharamshala)",
    code: "DHM",
    distance: "110 KM",
    duration: "2.5 - 3 Hours",
    route: "Via Amb, Bharwain, Ranital & Kangra Valley",
    availableVehicles: "Dzire, Ertiga, Innova Crysta",
    description:
      "Quick regional mountain connection for travelers flying into Dharamshala, McLeodganj, or Kangra Valley.",
    badge: "Mountain Regional",
    highlight: "Scenic Hill Route",
  },
];

export default function AirportTransfers() {
  const seo = seoConfig.airportTransfers;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi Services", path: "/taxi-services" },
    { name: "Airport Transfers" },
  ];

  // Booking Form State
  const [transferType, setTransferType] = useState("drop"); // "drop" | "pickup" | "round-trip"
  const [selectedAirport, setSelectedAirport] = useState("Chandigarh Airport (IXC)");
  const [localPoint, setLocalPoint] = useState("Una (Prem Nagar / Railway Station)");
  const [flightDate, setFlightDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [flightTime, setFlightTime] = useState("06:00");
  const [flightNumber, setFlightNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Innova Crysta");
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Submit Handler
  const handleAirportBooking = (e) => {
    e.preventDefault();
    const typeLabel =
      transferType === "drop"
        ? "Drop TO Airport"
        : transferType === "pickup"
        ? "Pickup FROM Airport Arrivals"
        : "Round Trip Airport Transfer";

    // Record directly in Admin Portal Dispatch Desk
    recordBookingInquiry({
      name: passengerName.trim() || "Website Traveler",
      phone: passengerPhone.trim() || "Not provided",
      pickup: localPoint,
      drop: selectedAirport,
      car: vehicleType,
      date: flightDate,
      notes: `${typeLabel} | Time: ${flightTime} | Flight: ${flightNumber || "N/A"}`,
    });

    const msg =
      `*NEW AIRPORT TAXI INQUIRY*\n\n` +
      (passengerName.trim() ? `• *Passenger Name:* ${passengerName.trim()}\n` : "") +
      (passengerPhone.trim() ? `• *Mobile / WhatsApp:* ${passengerPhone.trim()}\n` : "") +
      `• *Transfer Type:* ${typeLabel}\n` +
      `• *Airport:* ${selectedAirport}\n` +
      `• *Una / Amb Location:* ${localPoint}\n` +
      `• *Flight Date:* ${flightDate}\n` +
      `• *Flight Time:* ${flightTime}\n` +
      (flightNumber.trim() ? `• *Flight No:* ${flightNumber.trim()}\n` : "") +
      `• *Preferred Vehicle:* ${vehicleType}\n\n` +
      `Please check driver schedule and share instant quote.`;

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
          faqSchema(airportFaqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH AIRPORT TRANSFER WIDGET */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#182030] text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/hero-bg.jpg"
            alt="Airport Taxi Transfers from Una and Amb Himachal"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f57c00] text-white text-xs font-black shadow-md self-start">
                <span className="material-symbols-outlined text-[15px]">flight_takeoff</span>
                <span>24/7 AIRPORT TAXI DESK &bull; ZERO FLIGHT DELAY RISK</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Airport Taxi &amp; Transfers from Una
              </h1>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                Never worry about missing a flight. Dutta Tour &amp; Travel delivers punctual, 24/7
                doorstep airport transfers between Una / Amb and <strong>Chandigarh Airport (IXC)</strong>,{" "}
                <strong>Delhi IGI Airport (DEL)</strong>, <strong>Amritsar (ATQ)</strong>, and{" "}
                <strong>Kangra Airport (DHM)</strong>.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-left">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-amber-400">schedule</span>
                  <span className="block text-xs font-black mt-1">24/7 Midnight</span>
                  <span className="block text-[10px] text-gray-300">Guaranteed On-Time</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-emerald-400">flight</span>
                  <span className="block text-xs font-black mt-1">Live Tracking</span>
                  <span className="block text-[10px] text-gray-300">Flight Delay Protected</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-[#f57c00]">luggage</span>
                  <span className="block text-xs font-black mt-1">Luggage Space</span>
                  <span className="block text-[10px] text-gray-300">Trolley Boot &amp; Carrier</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-blue-400">badge</span>
                  <span className="block text-xs font-black mt-1">Meet &amp; Greet</span>
                  <span className="block text-[10px] text-gray-300">Name Board at Terminal</span>
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
                  href={whatsappLink("Hello Dutta Travels, I need an airport taxi transfer from Una.")}
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
                    flight_takeoff
                  </span>
                  <h3 className="text-lg font-black text-[#1e2638]">
                    Airport Cab Booking
                  </h3>
                </div>
                <span className="bg-[#e7f9f0] text-[#1b804e] text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                  Punctuality Guarantee
                </span>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-[#edf2fe] p-1 rounded-xl">
                {[
                  { id: "drop", label: "Drop TO Airport" },
                  { id: "pickup", label: "Pickup FROM Airport" },
                  { id: "round-trip", label: "Round Trip" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTransferType(t.id)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      transferType === t.id
                        ? "bg-[#f57c00] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleAirportBooking} className="flex flex-col gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Select Airport
                  </label>
                  <select
                    value={selectedAirport}
                    onChange={(e) => setSelectedAirport(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00] cursor-pointer"
                  >
                    <option value="Chandigarh Airport (IXC)">Chandigarh Int'l Airport (IXC) - 115 KM</option>
                    <option value="Delhi IGI Airport (DEL T1/T2/T3)">Delhi IGI Airport (DEL T1/T2/T3) - 365 KM</option>
                    <option value="Amritsar Airport (ATQ)">Amritsar Int'l Airport (ATQ) - 165 KM</option>
                    <option value="Kangra Gaggal Airport (DHM)">Kangra Dharamshala Airport (DHM) - 110 KM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Pickup / Drop Address in Una &amp; Amb
                  </label>
                  <input
                    type="text"
                    required
                    value={localPoint}
                    onChange={(e) => setLocalPoint(e.target.value)}
                    placeholder="e.g. Prem Nagar Una, Amb Andaura, Mehatpur, Nangal"
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Flight Date
                    </label>
                    <input
                      type="date"
                      required
                      value={flightDate}
                      onChange={(e) => setFlightDate(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Flight Time
                    </label>
                    <input
                      type="time"
                      required
                      value={flightTime}
                      onChange={(e) => setFlightTime(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Flight No. (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 6E-204 / AI-452"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
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
                  <span>Confirm Airport Cab Booking &rarr;</span>
                </button>
              </form>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                <span className="flex items-center gap-1 text-[#f57c00]">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  No Midnight Surcharge
                </span>
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="material-symbols-outlined text-[14px]">flight</span>
                  Flight Delay Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. AIRPORTS COVERED WITH ROUTE DETAILS */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              AIRPORT CONNECTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight mt-1">
              Direct Airport Routes from Una &amp; Amb
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Punctual doorstep transfers to major domestic and international flight terminals across
              North India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {airportsCovered.map((apt, idx) => (
              <div
                key={idx}
                className="bg-[#f8faff] rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-5 group hover:border-[#f57c00]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-[#f57c00]/10 text-[#f57c00] font-black text-[11px] px-3 py-1 rounded-full">
                      {apt.badge}
                    </span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      {apt.distance} &bull; {apt.duration}
                    </span>
                  </div>

                  <h3 className="font-black text-xl text-[#1e2638] group-hover:text-[#f57c00] transition-colors leading-snug">
                    {apt.name} ({apt.code})
                  </h3>
                  <p className="text-xs text-gray-500 font-semibold mt-1">Route: {apt.route}</p>
                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed font-normal">
                    {apt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200/70 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-semibold">Available Cabs:</span>
                    <span className="font-extrabold text-[#1e2638]">{apt.availableVehicles}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-semibold">Fare Policy:</span>
                    <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Best Rate Guaranteed &bull; All-Inclusive Quote
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href={whatsappLink(
                        `Hello Dutta Travels, I need an airport taxi transfer to ${apt.name} (${apt.code}). Please share best rate.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#182030] hover:bg-[#f57c00] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">flight</span>
                      <span>Book Transfer</span>
                    </a>
                    <a
                      href={`tel:${business.phonesTel[0]}`}
                      className="py-2.5 px-4 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#f57c00]">call</span>
                      <span>Call Desk</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHY TRAVELERS CHOOSE OUR AIRPORT CAB SERVICE */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-18 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              PEACE OF MIND GUARANTEE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight mt-1">
              Why Book Airport Transfers with Dutta Travels?
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Catching an international flight requires uncompromising punctuality, reliable cars,
              and professional drivers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#f57c00] flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">alarm_on</span>
              </div>
              <h3 className="font-extrabold text-base text-[#1e2638]">15-Min Early Arrival</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your driver arrives at your doorstep in Una or Amb 15 minutes before scheduled pickup time,
                eliminating departure anxiety.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">airplane_ticket</span>
              </div>
              <h3 className="font-extrabold text-base text-[#1e2638]">Flight Delay Buffer</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We monitor arrival schedules live. Even if your incoming flight is delayed by 2 hours,
                your driver will be parked and waiting.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">luggage</span>
              </div>
              <h3 className="font-extrabold text-base text-[#1e2638]">Heavy Luggage Racks</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Large boot capacity plus covered overhead roof carriers for multiple heavy international
                trolley bags and family luggage.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">nightlight</span>
              </div>
              <h3 className="font-extrabold text-base text-[#1e2638]">24/7 Midnight Dispatches</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Whether your flight is at 5:00 AM or midnight, our drivers are on standby round the clock
                with zero late-night booking refusal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMMERCIAL FLEET FOR AIRPORT TRANSFERS */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                COMFORT ON LONG HIGHWAYS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Airport Transfer Fleet
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
                    href={whatsappLink(`Hello Dutta Travels, I want to book ${car.name} for an airport transfer.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#943e00] hover:bg-[#7a3200] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <span>⚡ Book {car.name} for Airport</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. AIRPORT FAQS ACCORDION */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-16 border-t border-gray-100">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
              Airport Taxi Transfer FAQs
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Clear answers on flight delay tracking, terminal meet &amp; greet, and luggage allowance.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {airportFaqs.map((faq, idx) => (
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
                <span className="material-symbols-outlined text-[28px]">flight</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
                  HAVE AN UPCOMING FLIGHT?
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Reserve Your Airport Cab with Lav Dutta
                </h3>
                <p className="text-xs text-gray-300">
                  Direct dispatch from Prem Nagar, Una HQ. 24/7 midnight pickups, sanitized AC cabs, and guaranteed punctuality.
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
                href={whatsappLink("Hello Lav Dutta, I need to book an airport taxi.")}
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
            <h3 className="text-2xl font-black text-[#1e2638]">Airport Transfer Reserved!</h3>
            <p className="text-sm text-gray-600">
              Your airport cab request for <strong>{selectedAirport}</strong> from{" "}
              <strong>{localPoint}</strong> ({vehicleType}) on <strong>{flightDate}</strong> at{" "}
              <strong>{flightTime}</strong> has been received.
            </p>
            <p className="text-xs text-gray-500">
              Our dispatch desk will confirm your driver allocation on WhatsApp shortly.
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
