import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import {
  business,
  stats,
  fleet,
  tourPackages,
  destinations,
  testimonials,
  whatsappLink,
  recordBookingInquiry,
} from "../data/business";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema } from "../data/schema";
import WhatsAppIcon from "../components/WhatsAppIcon";

export default function Home() {
  const seo = seoConfig.home;

  // Booking Card State
  const [bookingTab, setBookingTab] = useState("outstation"); // "outstation" | "devi-darshan" | "station-pickup"
  const [pickupLocation, setPickupLocation] = useState("Una (Prem Nagar / Amb Andaura Stn)");
  const [destinationCircuit, setDestinationCircuit] = useState("Shimla & Kufri (Himachal)");
  const [travelDate, setTravelDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [vehicleType, setVehicleType] = useState("Innova Crysta");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Dedicated Vehicle Direct Booking Modal State
  const [selectedFleetCar, setSelectedFleetCar] = useState(null);
  const [fleetModalName, setFleetModalName] = useState("");
  const [fleetModalPhone, setFleetModalPhone] = useState("");
  const [fleetModalDate, setFleetModalDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [fleetModalPickup, setFleetModalPickup] = useState("Una / Amb Andaura Stn");
  const [fleetModalDrop, setFleetModalDrop] = useState("Dharamshala / Mcleodganj");

  // Fleet Filter State
  const [fleetFilter, setFleetFilter] = useState("all"); // "all" | "suv" | "sedan" | "tempo"

  // Auto-scroll to #fleet if hash is present
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 150);
      }
    }
  }, []);

  // Filtered fleet list
  const filteredFleet =
    fleetFilter === "all"
      ? fleet
      : fleet.filter((item) => item.group === fleetFilter);

  // Handle Tab Switch in Booking Widget
  const handleTabChange = (tab) => {
    setBookingTab(tab);
    if (tab === "outstation") {
      setDestinationCircuit("Shimla & Kufri (Himachal)");
    } else if (tab === "devi-darshan") {
      setDestinationCircuit("6 Sacred Devi Darshan (Chintpurni, Jwala Ji, Baglamukhi, Kangra, Chamunda, Naina Devi)");
    } else if (tab === "station-pickup") {
      setDestinationCircuit("Amb Andaura Station Pickup -> Una / Dharamshala");
    }
  };

  // Handle Booking Submission -> Dispatches to WhatsApp & shows confirmation
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const tabName =
      bookingTab === "outstation"
        ? "Outstation Journey"
        : bookingTab === "devi-darshan"
        ? "Devi Darshan Circuit"
        : "Station Pickup";

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

    const msg = `*NEW CAB BOOKING INQUIRY - MANDYAL TRAVELS*\n\n` +
      (customerName.trim() ? `• *Passenger Name:* ${customerName.trim()}\n` : "") +
      (customerPhone.trim() ? `• *Passenger WhatsApp/Phone:* ${customerPhone.trim()}\n` : "") +
      `• *Trip Type:* ${tabName}\n` +
      `• *Pickup Location:* ${pickupLocation}\n` +
      `• *Destination Circuit:* ${destinationCircuit}\n` +
      `• *Date of Travel:* ${travelDate}\n` +
      `• *Vehicle Preferred:* ${vehicleType}\n\n` +
      `Please check availability and confirm our booking dispatch.`;

    setBookingConfirmed(true);
    window.open(whatsappLink(msg), "_blank");
  };

  // Direct vehicle booking trigger: opens dedicated modal
  const handleDirectVehicleBooking = (car) => {
    setSelectedFleetCar(car);
  };

  const handleConfirmFleetModal = (e) => {
    e.preventDefault();
    if (!selectedFleetCar) return;

    // Record directly in Admin Portal Dispatch Desk
    recordBookingInquiry({
      name: fleetModalName.trim() || "Website Traveler",
      phone: fleetModalPhone.trim() || "Not provided",
      pickup: fleetModalPickup,
      drop: fleetModalDrop,
      car: selectedFleetCar.name,
      date: fleetModalDate,
      notes: `Direct Vehicle Booking (${selectedFleetCar.category})`,
    });

    const msg = `*NEW CAB BOOKING INQUIRY - MANDYAL TRAVELS*\n\n` +
      `• *Vehicle Selected:* ${selectedFleetCar.name} (${selectedFleetCar.category})\n` +
      (fleetModalName.trim() ? `• *Passenger Name:* ${fleetModalName.trim()}\n` : "") +
      (fleetModalPhone.trim() ? `• *Mobile / WhatsApp:* ${fleetModalPhone.trim()}\n` : "") +
      `• *Pickup Location:* ${fleetModalPickup}\n` +
      `• *Destination / Drop:* ${fleetModalDrop}\n` +
      `• *Travel Date:* ${fleetModalDate}\n\n` +
      `Please check vehicle availability and confirm driver dispatch.`;

    setSelectedFleetCar(null);
    setBookingConfirmed(true);
    window.open(whatsappLink(msg), "_blank");
  };

  return (
    <Layout>
      <SEO
        path={seo.path}
        title={seo.title}
        description={seo.description}
        structuredData={localBusinessSchema()}
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Responsive: Mobile matches Image 1, Desktop matches Image 2) */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#182030] text-white">
        {/* Background Mountain Photo with Dark Scrim Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.jpg"
            alt="Himachal Mountain Highway Mandyal Tour & Travels"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141b2b]/95 via-[#141b2b]/85 to-[#141b2b]/75" />
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* DESKTOP HERO VIEW (Matches media_1789231594348.png - >= lg) */}
        {/* ----------------------------------------------------------------------- */}
        <div className="hidden lg:block relative z-10 max-w-[1280px] mx-auto px-6 py-8 xl:py-10">
          <div className="grid grid-cols-12 gap-6 items-center">
            {/* LEFT COLUMN: Main Hero Copy & Stats */}
            <div className="col-span-7 flex flex-col items-start gap-3.5">
              {/* Badges */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-orange-200">
                <span className="material-symbols-outlined text-[15px] text-emerald-400">verified</span>
                <span>VERIFIED HP GOVT. REGD. FLEET &bull; MANDYAL MOTORS</span>
              </div>

              <div className="flex items-center gap-2 text-xs xl:text-sm text-gray-300">
                <span className="material-symbols-outlined text-[16px] text-[#f57c00]">train</span>
                <span>Amb Andaura Vande Bharat Platform Dispatch &bull; 24/7 Hill Chauffeurs</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.12]">
                Welcome to <br />
                <span className="text-white">Mandyal Tour &amp; Travels</span>
              </h1>

              {/* Paragraph */}
              <p className="text-sm text-gray-300 max-w-xl leading-relaxed">
                Una&apos;s trusted travel legacy of 15+ years. Experience safe, punctual, and
                comfortable Himachal mountain journeys with certified hill chauffeurs, dedicated
                Devi Darshan temple circuits, seamless Amb Andaura Vande Bharat station pickups,
                and customized North India holiday tours.
              </p>

              {/* Stats Grid - Eye-Catching Social Proof & Trust Badges */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {stats.map((s, idx) => {
                  // Dedicated custom visuals for each stat metric
                  const meta = [
                    {
                      icon: "local_taxi",
                      gradient: "from-amber-400 via-orange-400 to-[#f57c00]",
                      iconBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
                      glow: "group-hover:shadow-[0_0_25px_rgba(245,124,0,0.35)]",
                      subBadge: "HP Regd Fleet",
                    },
                    {
                      icon: "terrain",
                      gradient: "from-emerald-300 via-teal-300 to-cyan-400",
                      iconBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                      glow: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]",
                      subBadge: "Custom Routes",
                    },
                    {
                      icon: "temple_hindu",
                      gradient: "from-yellow-300 via-amber-300 to-amber-500",
                      iconBg: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
                      glow: "group-hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]",
                      subBadge: "Devi Darshan",
                    },
                    {
                      icon: "support_agent",
                      gradient: "from-orange-300 via-rose-300 to-orange-400",
                      iconBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
                      glow: "group-hover:shadow-[0_0_25px_rgba(244,63,94,0.35)]",
                      subBadge: "Live Dispatch",
                      isLive: true,
                    },
                  ][idx % 4];

                  return (
                    <div
                      key={s.label}
                      className={`group relative p-3 xl:p-3.5 rounded-xl bg-gradient-to-b from-white/[0.12] to-white/[0.04] backdrop-blur-xl border border-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 cursor-default flex flex-col justify-between overflow-hidden ${meta.glow}`}
                    >
                      {/* Ambient corner light glow on hover */}
                      <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#f57c00]/10 rounded-full blur-xl group-hover:bg-[#f57c00]/25 transition-all duration-500 pointer-events-none" />

                      {/* Header with Icon and Micro-tag */}
                      <div className="flex items-center justify-between gap-1.5 mb-1.5 relative z-10">
                        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${meta.iconBg}`}>
                          <span className="material-symbols-outlined text-[16px]">{meta.icon}</span>
                        </div>
                        {meta.isLive ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[9px] font-bold text-emerald-300 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            Live
                          </span>
                        ) : (
                          <span className="text-[9px] font-semibold text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">
                            {meta.subBadge}
                          </span>
                        )}
                      </div>

                      {/* Big Value Number with Gradient Typography */}
                      <div className="relative z-10">
                        <span className={`text-2xl xl:text-3xl font-black tracking-tight bg-gradient-to-br ${meta.gradient} bg-clip-text text-transparent drop-shadow-sm`}>
                          {s.value}
                        </span>
                        <span className="block text-[11px] font-semibold text-gray-300 mt-0.5 leading-tight group-hover:text-white transition-colors">
                          {s.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`tel:${business.phonesTel[0]}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-950/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[17px]">call</span>
                  <span>Instant Booking: {business.phones[0]}</span>
                </a>
                <a
                  href={whatsappLink("Hello Mandyal Travels, I need assistance with a cab booking")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-gray-100 text-[#1e2638] font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" color="#25D366" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Book Your Journey Card (Desktop) */}
            <div className="col-span-5">
              <div className="bg-white text-gray-800 p-5 xl:p-6 rounded-3xl shadow-2xl border border-gray-100 flex flex-col gap-3">
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#f57c00] font-bold text-xs uppercase tracking-wider">
                    <span className="text-sm">⚡</span>
                    <span>24/7 QUICK DISPATCH</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center text-[#f57c00]">
                    <span className="material-symbols-outlined text-[16px]">directions_car</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl xl:text-2xl font-black text-[#1e2638] tracking-tight">
                    Book Your Journey
                  </h2>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Instant confirmation &bull; Verified HP hill driver assigned
                  </p>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-xl text-xs font-semibold">
                  {[
                    { id: "outstation", label: "Outstation" },
                    { id: "devi-darshan", label: "Devi Darshan" },
                    { id: "station-pickup", label: "Station Pickup" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabChange(tab.id)}
                      className={`py-1.5 px-2 rounded-lg transition-all text-center ${
                        bookingTab === tab.id
                          ? "bg-[#f57c00] text-white shadow-sm font-bold"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Booking Form */}
                <form onSubmit={handleConfirmBooking} className="flex flex-col gap-2.5 pt-0.5">
                  {/* Pickup Location */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Pickup Location
                    </label>
                    <div className="relative flex items-center bg-[#edf2fe] rounded-xl px-3.5 py-2.5">
                      <span className="material-symbols-outlined text-[18px] text-[#f57c00] mr-2">
                        my_location
                      </span>
                      <input
                        type="text"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        required
                        className="w-full bg-transparent text-sm font-medium text-gray-800 focus:outline-none"
                        placeholder="Enter Pickup Point"
                      />
                    </div>
                  </div>

                  {/* Destination Circuit */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Destination Circuit
                    </label>
                    <div className="relative flex items-center bg-[#edf2fe] rounded-xl px-3.5 py-2.5">
                      <span className="material-symbols-outlined text-[18px] text-[#f57c00] mr-2">
                        location_on
                      </span>
                      <select
                        value={destinationCircuit}
                        onChange={(e) => setDestinationCircuit(e.target.value)}
                        className="w-full bg-transparent text-sm font-medium text-gray-800 focus:outline-none cursor-pointer appearance-none pr-6"
                      >
                        <option value="Shimla & Kufri (Himachal)">Shimla &amp; Kufri (Himachal)</option>
                        <option value="Manali & Solang Valley">Manali &amp; Solang Valley</option>
                        <option value="Dharamshala & McLeodganj">Dharamshala &amp; McLeodganj</option>
                        <option value="Una to Dalhousie & Khajjiar">Una to Dalhousie &amp; Khajjiar</option>
                        <option value="6 Sacred Devi Darshan (Chintpurni, Jwala Ji, Baglamukhi, Kangra, Chamunda, Naina Devi)">
                          6 Sacred Devi Darshan (Chintpurni, Jwala Ji, Baglamukhi, Kangra, Chamunda, Naina Devi)
                        </option>
                        <option value="12 Sacred Jyotirlinga Darshan Yatra">
                          12 Sacred Jyotirlinga Darshan Yatra
                        </option>
                        <option value="Spiti Valley Circuit (Kaza, Key, Chandratal)">
                          Spiti Valley Circuit (Kaza, Key, Chandratal)
                        </option>
                        <option value="Amb Andaura Station Pickup -> Una / Dharamshala">
                          Amb Andaura Station Pickup &rarr; Una / Dharamshala
                        </option>
                        <option value="Una to Chandigarh Airport Transfer">
                          Una to Chandigarh Airport Transfer
                        </option>
                        <option value="Amritsar Golden Temple">Amritsar Golden Temple</option>
                        <option value="Una to Katra Yatra (Vaishno Devi)">
                          Una to Katra Yatra (Vaishno Devi)
                        </option>
                      </select>
                      <span className="material-symbols-outlined text-[18px] text-gray-500 absolute right-3 pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Date & Vehicle Type Row */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Date of Travel */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Date of Travel
                      </label>
                      <div className="relative flex items-center bg-[#edf2fe] rounded-xl px-3 py-2.5">
                        <span className="material-symbols-outlined text-[18px] text-blue-600 mr-1.5">
                          calendar_today
                        </span>
                        <input
                          type="date"
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          required
                          className="w-full bg-transparent text-xs sm:text-sm font-medium text-gray-800 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Vehicle Type */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Vehicle Type
                      </label>
                      <div className="relative flex items-center bg-[#edf2fe] rounded-xl px-3 py-2.5">
                        <span className="material-symbols-outlined text-[18px] text-[#f57c00] mr-1.5">
                          airport_shuttle
                        </span>
                        <select
                          value={vehicleType}
                          onChange={(e) => setVehicleType(e.target.value)}
                          className="w-full bg-transparent text-xs sm:text-sm font-medium text-gray-800 focus:outline-none cursor-pointer appearance-none pr-5"
                        >
                          <option value="Innova Crysta">Innova Crysta</option>
                          <option value="Maruti Ertiga">Maruti Ertiga</option>
                          <option value="Swift Dzire">Swift Dzire</option>
                          <option value="Force Urbania">Force Urbania</option>
                          <option value="Tempo Traveller">Tempo Traveller</option>
                          <option value="Toyota Fortuner 4x4">Fortuner 4x4</option>
                        </select>
                        <span className="material-symbols-outlined text-[16px] text-gray-500 absolute right-2 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Basic Details (Name & Mobile / WhatsApp) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Passenger Name
                      </label>
                      <div className="relative flex items-center bg-[#edf2fe] rounded-xl px-3 py-2.5">
                        <span className="material-symbols-outlined text-[18px] text-gray-500 mr-1.5">
                          person
                        </span>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full bg-transparent text-xs sm:text-sm font-medium text-gray-800 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Mobile / WhatsApp
                      </label>
                      <div className="relative flex items-center bg-[#edf2fe] rounded-xl px-3 py-2.5">
                        <span className="material-symbols-outlined text-[18px] text-green-600 mr-1.5">
                          call
                        </span>
                        <input
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="WhatsApp number"
                          className="w-full bg-transparent text-xs sm:text-sm font-medium text-gray-800 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Confirm Booking Button */}
                  <button
                    type="submit"
                    className="w-full mt-1.5 py-3 px-4 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-900/15 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Confirm Booking &rarr;</span>
                  </button>
                </form>

                {/* Booking Notice and Footer Badges */}
                <p className="text-[10.5px] text-center text-gray-500 leading-normal">
                  Details instantly shared with your WhatsApp &amp; Mandyal Travels Admin Panel for prompt dispatch.
                </p>

                <div className="pt-1.5 border-t border-gray-100 flex items-center justify-between text-[10.5px] font-semibold text-gray-600">
                  <span className="flex items-center gap-1 text-[#f57c00]">
                    <span className="material-symbols-outlined text-[13px]">check</span>
                    <span>All Toll/Permit Guidance</span>
                  </span>
                  <span className="flex items-center gap-1 text-amber-700">
                    <span className="material-symbols-outlined text-[13px]">shield</span>
                    <span>Commercial Yellow Plate</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* MOBILE HERO VIEW (Comfortable, spacious, high-contrast mobile design) */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:hidden relative z-10 px-4 py-5 flex flex-col gap-5">
          {/* Card 1: About Mandyal Tour & Travels (Dark Scenic Hero Card) */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl p-6 border border-white/15">
            {/* Mountain Background for this card */}
            <div className="absolute inset-0 z-0">
              <img
                src="/hero-bg.jpg"
                alt="Himachal Road"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#141b2b]/90 via-[#141b2b]/85 to-[#141b2b]/95" />
            </div>

            <div className="relative z-10 flex flex-col items-start gap-3.5">
              {/* Trust Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f57c00] text-white text-xs font-black shadow-md">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>TRUSTED MOUNTAIN CAB NETWORK &bull; UNA</span>
              </div>

              {/* Heading */}
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                Mandyal Tour &amp; Travels
              </h1>

              {/* Description */}
              <p className="text-sm text-gray-200 leading-relaxed font-normal">
                Una&apos;s trusted travel legacy of 15+ years. Safe mountain journeys with certified hill
                chauffeurs, Devi Darshan pilgrimage care, and 24/7 Amb Andaura Vande Bharat station dispatch.
              </p>

              {/* Dual Action Buttons (Side by Side) */}
              <div className="w-full grid grid-cols-2 gap-3 pt-1">
                <a
                  href={`tel:${business.phonesTel[0]}`}
                  className="py-3 px-3 rounded-2xl bg-[#1e2638] hover:bg-[#283248] text-white flex items-center justify-center gap-2 font-bold shadow-md border border-white/15 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#f57c00]">call</span>
                  <div className="text-left leading-tight">
                    <span className="block text-[10px] text-gray-300 font-medium">Instant Call</span>
                    <span className="text-xs font-black">{business.phones[0]}</span>
                  </div>
                </a>

                <a
                  href={whatsappLink("Hello Mandyal Travels, I need assistance with a cab booking")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 font-bold shadow-md active:scale-95 transition-all"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white flex-shrink-0" />
                  <div className="text-left leading-tight">
                    <span className="block text-[10px] text-green-100 font-medium">Direct Chat</span>
                    <span className="text-xs font-black">WhatsApp</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Instant Cab Booking Form (Mobile Optimized Form) */}
          <div className="bg-white text-gray-800 p-5 sm:p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#f57c00] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">directions_car</span>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-[#1e2638] tracking-tight leading-tight">
                    Instant Cab Booking
                  </h2>
                  <span className="text-[11px] text-gray-500 font-medium">Quick dispatch &bull; Verified hill driver</span>
                </div>
              </div>
            </div>

            {/* Trip Type Tabs on Mobile */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-2xl text-xs font-bold text-center">
              {[
                { id: "outstation", label: "Outstation" },
                { id: "devi-darshan", label: "Devi Darshan" },
                { id: "station-pickup", label: "Station Pickup" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-2 px-1 rounded-xl transition-all ${
                    bookingTab === tab.id
                      ? "bg-[#f57c00] text-white shadow-sm font-bold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mobile Form */}
            <form onSubmit={handleConfirmBooking} className="flex flex-col gap-3.5">
              {/* Pickup Location */}
              <div className="bg-[#f4f7fe] rounded-2xl px-3.5 py-2.5 border border-blue-50/50">
                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 mb-1">
                  <span className="material-symbols-outlined text-[16px] text-[#f57c00]">my_location</span>
                  <span>Pickup Location</span>
                </label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Una Railway Station / Amb Andaura / City"
                  required
                  className="w-full bg-transparent text-sm font-semibold text-[#1e2638] focus:outline-none placeholder-gray-400"
                />
              </div>

              {/* Drop Destination */}
              <div className="bg-[#f4f7fe] rounded-2xl px-3.5 py-2.5 relative border border-blue-50/50">
                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 mb-1">
                  <span className="material-symbols-outlined text-[16px] text-red-500">location_on</span>
                  <span>Drop Destination</span>
                </label>
                <select
                  value={destinationCircuit}
                  onChange={(e) => setDestinationCircuit(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-[#1e2638] focus:outline-none appearance-none pr-7 cursor-pointer"
                >
                  <option value="Dharamshala / Mcleodganj">Dharamshala / Mcleodganj</option>
                  <option value="Shimla & Kufri (Himachal)">Shimla &amp; Kufri (Himachal)</option>
                  <option value="Manali & Solang Valley">Manali &amp; Solang Valley</option>
                  <option value="Una to Dalhousie & Khajjiar">Una to Dalhousie &amp; Khajjiar</option>
                  <option value="6 Sacred Devi Darshan (Chintpurni, Jwala Ji, Baglamukhi, Kangra, Chamunda, Naina Devi)">
                    6 Sacred Devi Darshan (Chintpurni, Jwala Ji, Baglamukhi, Kangra, Chamunda, Naina Devi)
                  </option>
                  <option value="12 Sacred Jyotirlinga Darshan Yatra">
                    12 Sacred Jyotirlinga Darshan Yatra
                  </option>
                  <option value="Spiti Valley Circuit (Kaza, Key, Chandratal)">
                    Spiti Valley Circuit (Kaza, Key, Chandratal)
                  </option>
                  <option value="Amb Andaura Station Pickup -> Una / Dharamshala">
                    Amb Andaura Station Pickup &rarr; Una / Dharamshala
                  </option>
                  <option value="Una to Chandigarh Airport Transfer">
                    Una to Chandigarh Airport Transfer
                  </option>
                  <option value="Amritsar Golden Temple">Amritsar Golden Temple</option>
                  <option value="Una to Katra Yatra (Vaishno Devi)">
                    Una to Katra Yatra (Vaishno Devi)
                  </option>
                </select>
                <span className="material-symbols-outlined text-[20px] text-gray-500 absolute right-3.5 bottom-3 pointer-events-none">
                  expand_more
                </span>
              </div>

              {/* Vehicle Class & Travel Date (Clean Full Rows on Mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Vehicle Class */}
                <div className="bg-[#f4f7fe] rounded-2xl px-3.5 py-2.5 relative border border-blue-50/50">
                  <label className="block text-xs font-bold text-gray-600 mb-1">Vehicle Class</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-[#1e2638] focus:outline-none appearance-none pr-6 cursor-pointer"
                  >
                    <option value="Innova Crysta (6 Pax)">Innova Crysta (6 Pax)</option>
                    <option value="Maruti Ertiga (6 Pax)">Maruti Ertiga (6 Pax)</option>
                    <option value="Swift Dzire (4 Pax)">Swift Dzire (4 Pax)</option>
                    <option value="Force Urbania (12 Pax)">Force Urbania (12 Pax)</option>
                    <option value="Tempo Traveller (16 Pax)">Tempo Traveller (16 Pax)</option>
                    <option value="Fortuner 4x4 (6 Pax)">Fortuner 4x4 (6 Pax)</option>
                  </select>
                  <span className="material-symbols-outlined text-[18px] text-gray-500 absolute right-3 bottom-3 pointer-events-none">
                    expand_more
                  </span>
                </div>

                {/* Travel Date */}
                <div className="bg-[#f4f7fe] rounded-2xl px-3.5 py-2.5 border border-blue-50/50">
                  <label className="block text-xs font-bold text-gray-600 mb-1">Date of Travel</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    required
                    className="w-full bg-transparent text-sm font-semibold text-[#1e2638] focus:outline-none"
                  />
                </div>
              </div>

              {/* Customer Basic Details (Name & Mobile in Spacious Rows) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#f4f7fe] rounded-2xl px-3.5 py-2.5 border border-blue-50/50">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 mb-1">
                    <span className="material-symbols-outlined text-[16px] text-gray-500">person</span>
                    <span>Passenger Name</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-transparent text-sm font-semibold text-[#1e2638] focus:outline-none placeholder-gray-400"
                  />
                </div>

                <div className="bg-[#f4f7fe] rounded-2xl px-3.5 py-2.5 border border-blue-50/50">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 mb-1">
                    <span className="material-symbols-outlined text-[16px] text-green-600">smartphone</span>
                    <span>Mobile / WhatsApp</span>
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter WhatsApp number"
                    className="w-full bg-transparent text-sm font-semibold text-[#1e2638] focus:outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Confirm Booking Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-1"
              >
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>Confirm Booking &rarr;</span>
              </button>
            </form>

            <p className="text-xs text-center text-gray-500 leading-normal">
              Logged directly into Admin Panel &amp; shared with driver dispatch for immediate confirmation.
            </p>
          </div>

          {/* Card 3: Mobile Stats Grid - Spacious, readable 2x2 layout with badges */}
          <div className="bg-[#182030] rounded-3xl p-4 shadow-xl border border-white/10 grid grid-cols-2 gap-3 text-white">
            <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                <span className="material-symbols-outlined text-[20px]">local_taxi</span>
              </div>
              <div>
                <span className="block text-xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">990+</span>
                <span className="block text-xs font-semibold text-gray-300">Taxi Rentals</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                <span className="material-symbols-outlined text-[20px]">terrain</span>
              </div>
              <div>
                <span className="block text-xl font-black bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">230+</span>
                <span className="block text-xs font-semibold text-gray-300">Tour Routes</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-300 shrink-0">
                <span className="material-symbols-outlined text-[20px]">temple_hindu</span>
              </div>
              <div>
                <span className="block text-xl font-black bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">660+</span>
                <span className="block text-xs font-semibold text-gray-300">Pilgrims</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300 shrink-0">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div>
                <span className="block text-xl font-black bg-gradient-to-r from-rose-300 to-orange-400 bg-clip-text text-transparent">24/7</span>
                <span className="block text-xs font-semibold text-gray-300">Live Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ABOUT & HERITAGE SECTION (Screenshot 2) */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Side: Scenic Mountain Road Photo with Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[1.15]">
                <img
                  src="/himachal-scenic.jpg"
                  alt="Himachal Pradesh Hill Highway Mandyal Motors"
                  className="w-full h-full object-cover"
                />
                {/* Bottom Left Scrim Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl text-white">
                  <span className="block text-[10px] font-extrabold uppercase text-[#f57c00] tracking-wider">
                    MANDYAL MOTORS HERITAGE
                  </span>
                  <span className="block text-xs font-bold">
                    Himachal Tourism Regd. Fleet
                  </span>
                </div>
              </div>

              {/* Floating 15+ Years Badge overlapping bottom-right corner */}
              <div className="absolute -bottom-5 right-2 sm:-right-4 bg-[#f57c00] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border-2 border-white">
                <span className="material-symbols-outlined text-[32px] text-white">military_tech</span>
                <div>
                  <div className="font-extrabold text-lg sm:text-xl leading-none">15+ Years</div>
                  <div className="text-[11px] text-orange-100 font-medium mt-0.5">
                    Una &amp; North India Roads
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Copy & 3 Pillars */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#f57c00]">
                WELCOME TO MANDYAL TOUR &amp; TRAVELS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight leading-snug">
                Trusted &amp; Leading in Hill Car Rent Services
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Una&apos;s trusted travel legacy of 15+ years. Experience safe, punctual, and
                comfortable Himachal mountain journeys with certified hill chauffeurs, dedicated
                Devi Darshan temple circuits, seamless Amb Andaura Vande Bharat station pickups,
                and customized North India holiday tours.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                We boast a diverse fleet that caters to all preferences and group sizes. Whether you
                are looking for the economical convenience of a sedan, the robust mountain posture of
                an Innova Crysta, or the spacious hospitality of luxury Force Urbanias and Tempo
                Travellers, our courteous team is prepared for both leisure holidays and sacred Devi
                Darshan yatra circuits.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-[#edf2fe] flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#1e2638]">Experience &amp; Care</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Experienced hill drivers who navigate sharp Himalayan hairpin bends with ease.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#edf2fe] flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#f57c00]">
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#1e2638]">Transparent Fares</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Competitive pricing, flexible options, and zero hidden night or luggage charges.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#edf2fe] flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                    <span className="material-symbols-outlined text-[18px]">route</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#1e2638]">Premier Coverage</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Specialized pickups from Amb Andaura Rly Stn, Una, &amp; Chandigarh Airport.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Assistance Banner: Talk to Owner Manoj Mandyal (Screenshot 2 bottom) */}
          <div className="mt-14 bg-[#edf2fe] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#f57c00] flex items-center justify-center text-white shadow-md flex-shrink-0">
                <span className="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-500">
                  NEED ROUTE ASSISTANCE?
                </span>
                <span className="text-base sm:text-lg font-black text-[#1e2638]">
                  Talk to Owner Manoj Mandyal
                </span>
              </div>
            </div>
            <a
              href={`tel:${business.phonesTel[0]}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-sm shadow-md transition-all whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>{business.phones[0]}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAINTAINED FLEET SECTION (Screenshot 3 - media_1789223032363.png) */}
      {/* ========================================================================= */}
      <section id="fleet" className="w-full bg-[#fbfcfe] py-16 sm:py-20 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header with Category Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                OUR MAINTAINED FLEET
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight">
                Rental Cab in Una and Amb
              </h2>
              <p className="text-sm text-gray-600">
                Every cab is commercially licensed, thoroughly sanitized before dispatch, GPS
                tracked, and manned by an experienced mountain chauffeur.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-gray-200 shadow-sm self-start md:self-auto flex-wrap">
              {[
                { id: "all", label: "All Vehicles" },
                { id: "suv", label: "SUVs & MPVs" },
                { id: "sedan", label: "Sedans" },
                { id: "tempo", label: "Tempo & Coaches" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setFleetFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    fleetFilter === filter.id
                      ? "bg-[#f57c00] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fleet Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFleet.map((car) => (
              <div
                key={car.slug}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Car Image with HD Badges (Unobstructed like Screenshot) */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-gray-900 group">
                  <img
                    src={car.image}
                    alt={car.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Top-Left Image Badge */}
                  {car.imageBadge && (
                    <div
                      className={`absolute top-3.5 left-3.5 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md ${
                        car.badgeStyle === "red"
                          ? "bg-[#c5281c]"
                          : "bg-black/75 backdrop-blur-sm border border-white/10"
                      }`}
                    >
                      <span>{car.imageBadge}</span>
                    </div>
                  )}
                </div>

                {/* Car Details */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-extrabold text-lg text-[#1e2638]">{car.name}</h3>
                      <span className="bg-[#ebf0fc] text-[#365bb5] font-bold text-[11px] px-2.5 py-0.5 rounded-md whitespace-nowrap">
                        {car.category}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed min-h-[36px]">
                      {car.description}
                    </p>
                  </div>

                  {/* Specs Chips (3 Columns) */}
                  <div className="grid grid-cols-3 gap-2 py-1">
                    <span className="inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-gray-700 bg-[#f0f3f8] px-2 py-1.5 rounded-lg text-center">
                      <span className="material-symbols-outlined text-[15px] text-[#f57c00]">
                        airline_seat_recline_normal
                      </span>
                      <span>{car.seats}</span>
                    </span>
                    <span className="inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-gray-700 bg-[#f0f3f8] px-2 py-1.5 rounded-lg text-center">
                      <span className="material-symbols-outlined text-[15px] text-amber-700">
                        luggage
                      </span>
                      <span>{car.bags}</span>
                    </span>
                    <span className="inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-gray-700 bg-[#f0f3f8] px-2 py-1.5 rounded-lg text-center">
                      <span className="material-symbols-outlined text-[15px] text-blue-600">
                        {car.slug === "fortuner-4x4"
                          ? "landscape"
                          : car.slug === "force-urbania"
                          ? "power"
                          : "ac_unit"}
                      </span>
                      <span>{car.comfort}</span>
                    </span>
                  </div>

                  {/* Action Buttons (Matches Screenshot: Amber Direct Booking + Green WhatsApp) */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDirectVehicleBooking(car)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#943e00] hover:bg-[#7a3200] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
                    >
                      <span>⚡</span>
                      <span>Direct Booking</span>
                    </button>
                    <a
                      href={whatsappLink(`Hello Mandyal Travels, I want to book ${car.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Chat on WhatsApp"
                      className="w-10 h-10 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white flex items-center justify-center shadow-sm active:scale-[0.98] transition-all flex-shrink-0"
                    >
                      <WhatsAppIcon className="w-5 h-5 fill-white" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. POPULAR SHORT TRIPS & OUTSTATION TAXI (Screenshot 4) */}
      {/* ========================================================================= */}
      <section id="destinations" className="w-full bg-[#f4f7fe] py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#f57c00]">
                CHOOSE DESTINATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight">
                Popular Short Trips &amp; Outstation Taxi
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md">
              Frequent dedicated departures from Una, Amb Andaura Railway Station, Chandigarh, Nangal,
              and Hoshiarpur.
            </p>
          </div>

          {/* 8 Destination Cards Grid - Linked to SEO Ranking Routes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                to={`/${dest.slug}`}
                className="group bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-3 border border-gray-100/80"
              >
                {/* Photo with built-in Distance Badge & Location pill */}
                <div className="relative h-44 w-full rounded-xl overflow-hidden bg-gray-900">
                  <img
                    src={dest.image}
                    alt={dest.routeTitle || dest.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Crisp KM Badge Overlay */}
                  <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white text-xs font-black px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1 shadow-md">
                    <span className="material-symbols-outlined text-[13px] text-[#f57c00]">navigation</span>
                    <span>{dest.distanceKm} KM</span>
                  </div>
                  {/* Origin Badge */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white/95 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-white/10">
                    Una / Amb Pickup
                  </div>
                </div>

                {/* Title, Stops & Action Buttons */}
                <div className="px-1 flex flex-col gap-1.5 pb-1">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-[#1e2638] group-hover:text-[#f57c00] transition-colors leading-snug">
                      {dest.name}
                    </h3>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <a
                        href={whatsappLink(`Hello Mandyal Travels, I want to book a taxi for ${dest.name} (${dest.distanceKm} KM)`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Instant WhatsApp Booking"
                        className="w-7 h-7 rounded-full bg-[#00c853] hover:bg-[#00b047] text-white flex items-center justify-center shadow-sm transition-all"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                      </a>
                      <span className="w-7 h-7 rounded-full bg-orange-50 text-[#f57c00] group-hover:bg-[#f57c00] group-hover:text-white transition-all flex items-center justify-center text-sm font-black">
                        &rarr;
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium line-clamp-1">
                    {dest.stops}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TOUR & TRAVEL ITINERARIES (Screenshot 5 - Top) */}
      {/* ========================================================================= */}
      <section id="tours" className="w-full bg-white py-16 sm:py-20 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#f57c00]">
                HIMALAYAN CIRCUITS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight">
                Tour &amp; Travel Itineraries
              </h2>
              <p className="text-sm text-gray-600">
                Handcrafted holiday plans including hotel coordination, experienced hill driver, toll taxes,
                and customizable stoppage points.
              </p>
            </div>
            <a
              href={whatsappLink("Hello Mandyal Travels, I would like to request a Custom Tour Itinerary")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-bold text-[#f57c00] hover:underline"
            >
              <span>Custom Itinerary Request</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* 6 Tour Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourPackages.map((pkg) => (
              <div
                key={pkg.slug}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo with built-in Badges */}
                  <div className="relative h-52 w-full overflow-hidden bg-gray-900 group">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Top-Left Duration Badge */}
                    <div className="absolute top-3 left-3 bg-[#f57c00] text-white text-xs font-extrabold px-3 py-1 rounded-lg shadow-md flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                      <span>{pkg.duration}</span>
                    </div>
                    {/* Top-Right Circuit Badge */}
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/15 shadow-sm">
                      {pkg.circuitBadge}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col gap-2">
                    <h3 className="font-extrabold text-base text-[#1e2638] leading-snug">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{pkg.summary}</p>
                  </div>
                </div>

                {/* Footer Row */}
                <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-gray-100 text-xs">
                  <span className="text-gray-600 font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-green-600">check_circle</span>
                    <span>{pkg.featureNote}</span>
                  </span>
                  <a
                    href={whatsappLink(`Hello Mandyal Travels, please share the full details for ${pkg.name} (${pkg.duration})`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white bg-[#f57c00] hover:bg-[#e65100] px-3.5 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1 active:scale-95"
                  >
                    <span>Enquire Now</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHAT OUR TRAVELERS SAY (Screenshot 5 - Bottom) */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-16 sm:py-20 border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Centered Header */}
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-2 mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#f57c00]">
              TRUSTED BY PILGRIMS &amp; FAMILIES ACROSS NORTH INDIA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight">
              What Our Travelers Say
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Real stories from families, pilgrims, and tour groups who experienced our courteous hill drivers,
              immaculate vehicles, and prompt mountain service.
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-3">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-[#f57c00] text-sm">
                    {"★".repeat(5)}
                  </div>

                  {/* Quote */}
                  <p className="text-xs text-gray-600 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Profile Avatar & Name */}
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div
                    className={`w-9 h-9 rounded-full ${t.color} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm`}
                  >
                    {t.initials}
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-[#1e2638]">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Vehicle Booking Modal */}
      {selectedFleetCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative my-auto animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setSelectedFleetCar(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Modal Header with Vehicle Preview */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-gray-100">
              <img
                src={selectedFleetCar.image}
                alt={selectedFleetCar.name}
                className="w-20 h-16 rounded-xl object-cover shadow-sm flex-shrink-0"
              />
              <div className="flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#f57c00]">
                  DIRECT VEHICLE BOOKING
                </span>
                <h3 className="text-lg font-black text-[#1e2638] leading-tight">
                  {selectedFleetCar.name}
                </h3>
                <span className="inline-block mt-0.5 bg-[#ebf0fc] text-[#365bb5] font-bold text-[10px] px-2 py-0.5 rounded">
                  {selectedFleetCar.category} &bull; {selectedFleetCar.seats}
                </span>
              </div>
            </div>

            {/* Quick Booking Form */}
            <form onSubmit={handleConfirmFleetModal} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Passenger Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={fleetModalName}
                  onChange={(e) => setFleetModalName(e.target.value)}
                  className="w-full bg-[#f4f7fe] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mobile / WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={fleetModalPhone}
                  onChange={(e) => setFleetModalPhone(e.target.value)}
                  className="w-full bg-[#f4f7fe] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    value={fleetModalPickup}
                    onChange={(e) => setFleetModalPickup(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    required
                    value={fleetModalDate}
                    onChange={(e) => setFleetModalDate(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Destination / Route
                </label>
                <input
                  type="text"
                  value={fleetModalDrop}
                  onChange={(e) => setFleetModalDrop(e.target.value)}
                  placeholder="e.g. Dharamshala, Manali, Devi Darshan"
                  className="w-full bg-[#f4f7fe] rounded-xl px-3.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-4 bg-[#943e00] hover:bg-[#7a3200] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Confirm Booking &rarr;</span>
                </button>
                <a
                  href={`tel:${business.phonesTel[0]}`}
                  className="w-full sm:w-auto py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#f57c00]">call</span>
                  <span>Instant Call</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Confirmation Dialog Modal */}
      {bookingConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="text-2xl font-black text-[#1e2638]">Booking Confirmed!</h3>
            <p className="text-sm text-gray-600">
              {customerName ? <span>Passenger: <strong>{customerName}</strong><br /></span> : null}
              {customerPhone ? <span>Mobile: <strong>{customerPhone}</strong><br /></span> : null}
              Journey from <strong>{pickupLocation}</strong> to <strong>{destinationCircuit}</strong> on <strong>{travelDate}</strong> ({vehicleType}) has been logged in our dispatch desk.
            </p>
            <p className="text-xs text-gray-500">
              Our hill dispatch desk has received your booking details and will contact you promptly.
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
