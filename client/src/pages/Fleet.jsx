import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { business, fleet, whatsappLink, recordBookingInquiry } from "../data/business";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema } from "../data/schema";
import WhatsAppIcon from "../components/WhatsAppIcon";

export default function Fleet() {
  const seo = seoConfig.fleet;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Cab Rental Fleet" }];

  // Fleet Filter State
  const [fleetFilter, setFleetFilter] = useState("all"); // "all" | "suv" | "sedan" | "tempo"

  // Direct Vehicle Booking Modal State
  const [selectedFleetCar, setSelectedFleetCar] = useState(null);
  const [fleetModalName, setFleetModalName] = useState("");
  const [fleetModalPhone, setFleetModalPhone] = useState("");
  const [fleetModalDate, setFleetModalDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [fleetModalPickup, setFleetModalPickup] = useState("Una / Amb Andaura Stn");
  const [fleetModalDrop, setFleetModalDrop] = useState("Dharamshala / Mcleodganj");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Filtered fleet list
  const filteredFleet =
    fleetFilter === "all"
      ? fleet
      : fleet.filter((item) => item.group === fleetFilter);

  // Open booking modal
  const handleDirectVehicleBooking = (car) => {
    setSelectedFleetCar(car);
  };

  // Confirm booking in modal
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
      notes: `Fleet Direct Booking (${selectedFleetCar.category})`,
    });

    const msg =
      `*NEW CAB BOOKING INQUIRY - MANDYAL TRAVELS*\n\n` +
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
        structuredData={[localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />

      {/* ========================================================================= */}
      {/* 1. FLEET HERO & INTRO */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-[#182030] to-[#1e2638] text-white py-12 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl flex flex-col gap-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f57c00] text-white text-xs font-black shadow-md self-start">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              <span>100% COMMERCIAL YELLOW PLATE &bull; HIMACHAL APPROVED</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Rental Cab in Una and Amb
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              Explore our top-tier fleet of sedans, luxury SUVs, MPVs, and mini coaches stationed in
              Una and Amb Andaura Railway Station. Every vehicle is GPS tracked, thoroughly sanitized,
              and driven by an experienced hill chauffeur.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${business.phonesTel[0]}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Call Chauffeur Desk: {business.phones[0]}</span>
              </a>
              <a
                href={whatsappLink("Hello Mandyal Travels, I would like to inquire about taxi fleet booking.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FLEET CATALOG WITH CATEGORY FILTER PILLS (Matches Screenshot 3) */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#fbfcfe] py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header with Category Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                OUR MAINTAINED FLEET
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight">
                Choose Your Preferred Ride
              </h2>
              <p className="text-sm text-gray-600">
                Transparent per-km or fixed package billing with no hidden night or luggage charges.
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

          {/* Fleet Grid (3 Columns matching Screenshot 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFleet.map((car) => (
              <div
                key={car.slug}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Car Image with HD Badges */}
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

                  {/* Action Buttons: Amber Direct Booking + Green WhatsApp */}
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
      {/* 3. VALUE PILLARS & TRUST FACTORS */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-16 border-t border-gray-200/60">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              WHY BOOK WITH MANDYAL TRAVELS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
              Guaranteed Quality, Cleanliness &amp; Mountain Safety
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#ea6c00] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1e2638]">
                100% Yellow Plate
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All vehicles carry genuine commercial yellow plates with state tourist permits for
                Himachal, Punjab, Haryana, Uttarakhand &amp; Delhi NCR.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">airline_seat_recline_normal</span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1e2638]">
                Hill-Tested Chauffeurs
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Over 15+ years experience handling tricky mountain terrain, sharp hairpin turns, and
                foggy high-altitude weather safely.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">sanitizer</span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1e2638]">
                Sanitized &amp; Dual-AC
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Vacuum-cleaned and sanitized before every dispatch. Powerful dual-blowers maintain
                crisp cooling during summers and cozy heat in winter.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">receipt_long</span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1e2638]">
                Clear All-Inclusive Rates
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Zero surge pricing, transparent toll and state permit breakdowns, and direct
                assistance from owner Manoj Mandyal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. POPULAR ROUTES FROM UNA & AMB ANDAURA */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                QUICK RENTAL CIRCUITS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Frequently Booked Routes &amp; Transfers
              </h2>
            </div>
            <Link
              to="/tour-packages"
              className="text-xs sm:text-sm font-bold text-[#f57c00] hover:underline flex items-center gap-1"
            >
              <span>View All Tour Packages</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Amb Andaura to Dharamshala",
                dist: "115 KM &bull; 3.5 Hours",
                note: "Vande Bharat arrival pickup directly from platform to McLeodganj.",
              },
              {
                title: "6 Devi Darshan Pilgrimage",
                dist: "380 KM &bull; 3-5 Days Circuit",
                note: "Chintpurni Ji, Jwala Ji, Baglamukhi, Kangra, Chamunda Devi, and Naina Devi.",
              },
              {
                title: "Una to Chandigarh Airport (IXC)",
                dist: "125 KM &bull; 3 Hours",
                note: "Guaranteed on-time flight drop with comfortable boot space.",
              },
              {
                title: "Una to Shimla & Kufri",
                dist: "210 KM &bull; 6 Hours",
                note: "Scenic hillside drive via Bilaspur with panoramic mountain views.",
              },
              {
                title: "Una to Manali & Solang Valley",
                dist: "275 KM &bull; 8 Hours",
                note: "High-altitude comfort in Innova Crysta or Force Urbania.",
              },
              {
                title: "Una to Amritsar Golden Temple",
                dist: "160 KM &bull; 4 Hours",
                note: "Smooth expressway journey with Wagah Border excursion.",
              },
            ].map((route, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#f8faff] border border-gray-100 flex flex-col justify-between gap-3"
              >
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-[#1e2638]">
                    {route.title}
                  </h4>
                  <span
                    className="text-[11px] font-bold text-[#f57c00]"
                    dangerouslySetInnerHTML={{ __html: route.dist }}
                  />
                  <p className="text-xs text-gray-600 mt-1">{route.note}</p>
                </div>
                <a
                  href={whatsappLink(`Hello Mandyal Travels, I need fare quote for ${route.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 self-start pt-1"
                >
                  <span>Inquire Fare &rarr;</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FLEET FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-16 border-t border-gray-100">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
              Car Rental &amp; Booking Guidelines
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                q: "What is included in the taxi rental fare?",
                a: "Our fare estimates clearly state vehicle rental, fuel, driver allowance, and route fees. Inter-state road tolls, border tourist taxes, and parking fees are shared transparently with zero surprise extras.",
              },
              {
                q: "Can we book platform pickup from Amb Andaura Vande Bharat station?",
                a: "Yes! Our driver will be parked right at Amb Andaura (AADR) Railway Station with a name board when your train arrives, ready to assist with luggage and take you smoothly to Dharamshala or temple circuits.",
              },
              {
                q: "Which car is best for Devi Darshan pilgrimage with elders?",
                a: "Toyota Innova Crysta and Maruti Ertiga are our most popular choices for pilgrimage yatra. They offer easy ingress/egress, generous legroom, and gentle suspension on hill curves.",
              },
              {
                q: "How can I book a 12-26 Seater Tempo Traveller or Force Urbania?",
                a: "Simply click Direct Booking or WhatsApp button on the vehicle card above. We will confirm seat configuration, luggage carrier availability, and chauffeur allocation immediately.",
              },
            ].map((faq, idx) => (
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

      {/* ========================================================================= */}
      {/* 6. CALL / ASSISTANCE BOTTOM BANNER */}
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
                  NEED CUSTOM FLEET QUOTE?
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Speak Directly with Manoj Mandyal
                </h3>
                <p className="text-xs text-gray-300">
                  Prompt vehicle recommendation based on your luggage, passenger count, and route.
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
                href={whatsappLink("Hello Manoj Mandyal, I want to book a taxi from your fleet.")}
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

      {/* ========================================================================= */}
      {/* 7. DIRECT VEHICLE BOOKING MODAL */}
      {/* ========================================================================= */}
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center flex flex-col items-center gap-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="text-2xl font-black text-[#1e2638]">Booking Confirmed!</h3>
            <p className="text-sm text-gray-600">
              Your preferred vehicle booking has been recorded in our dispatch desk.
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
