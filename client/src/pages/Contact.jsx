import { useState } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { business, whatsappLink, recordBookingInquiry } from "../data/business";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "../data/schema";

const contactFaqs = [
  {
    question: "How quickly do you confirm taxi bookings?",
    answer:
      "When you message or call us on WhatsApp (+91 8894021277), founder Lav Dutta responds within 5 to 10 minutes with cab availability, vehicle options, and an all-inclusive transparent quote.",
  },
  {
    question: "What details are required for Amb Andaura Vande Bharat pickup?",
    answer:
      "Simply share your train number (e.g. 22447 Vande Bharat), scheduled arrival date, coach/seat number (optional), and your onward destination (such as Chintpurni, Dharamshala, or Kangra). Our chauffeur will receive you right outside the station exit.",
  },
  {
    question: "Is there any penalty if my train or flight is delayed?",
    answer:
      "None at all. We monitor live railway and flight tracking status. Even if the Vande Bharat Express or your flight arrives 2 hours behind schedule, your cab and driver will wait at the platform/terminal without any waiting penalties.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We offer maximum flexibility for travelers: Google Pay, PhonePe, Paytm, BHIM UPI, IMPS/NEFT bank transfer, and cash. Corporate and tax-deductible GST invoices are also provided upon request.",
  },
  {
    question: "Can I book a late-night or early-morning taxi from Una or Amb?",
    answer:
      "Yes! Our dispatch desk operates 24 hours a day, 7 days a week. For early-morning flights from Chandigarh Airport (IXC) or late-night train connections, we schedule verified drivers in advance to ensure 100% on-time doorstep arrival.",
  },
  {
    question: "Are all your cabs commercial tourist vehicles with yellow plates?",
    answer:
      "Yes, 100% of our fleet operates with legal commercial yellow number plates, All-India Tourist Permits, passenger liability insurance, and valid hill fitness certifications.",
  },
];

export default function Contact() {
  const seo = seoConfig.contact;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Contact Us" }];

  const [tripType, setTripType] = useState("Outstation Hill Cab");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("Una / Prem Nagar");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [car, setCar] = useState("Toyota Innova Crysta (6+1)");
  const [passengers, setPassengers] = useState("2-4 Persons");
  const [notes, setNotes] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    // Record directly in Admin Portal Dispatch Desk
    recordBookingInquiry({
      name: name.trim() || "Website Traveler",
      phone: phone.trim() || "Not specified",
      pickup: pickup,
      drop: destination,
      car: car,
      date: date,
      notes: `${tripType} | ${passengers} | ${time} | ${notes}`,
    });

    const msg = [
      `*New Cab Inquiry via Website:*`,
      `👤 Name: ${name || "Traveler"}`,
      `📞 Contact: ${phone || "Not specified"}`,
      `🚗 Service Type: ${tripType}`,
      `📍 Pickup Location: ${pickup}`,
      `🎯 Destination: ${destination || "Not specified"}`,
      `📅 Travel Date: ${date || "Flexible / Today"}`,
      `⏰ Time: ${time || "As per schedule"}`,
      `👥 Passengers: ${passengers}`,
      `🚘 Vehicle Preference: ${car}`,
      notes ? `📝 Special Requirements: ${notes}` : null,
      ``,
      `Please provide the best quote and availability. Thank you!`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
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
          faqSchema(contactFaqs),
        ]}
      />

      <Breadcrumbs items={crumbs} />

      {/* HERO SECTION */}
      <section className="relative bg-[#182030] text-white pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f57c00_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-[#f57c00] text-xs font-extrabold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">call_log</span>
              <span>24/7 Booking &amp; Dispatch Desk &bull; Una, Himachal Pradesh</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Get in Touch with Dutta Tour &amp; Travel
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
              Connect directly with owner <strong className="text-white font-semibold">Lav Dutta</strong> for
              immediate cab reservations, Amb Andaura Vande Bharat platform pickups, airport transfers, and
              Himachal pilgrimage itineraries. Free consultations and all-inclusive transparent quotes.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`tel:${business.phonesTel[0]}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>Call Owner: {business.phones[0]}</span>
              </a>

              <a
                href={whatsappLink("Hello Lav Ji, I want to book a taxi with Dutta Tour & Travel.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Instant WhatsApp Chat</span>
              </a>

              <a
                href={`tel:${business.phonesTel[1]}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
                <span>Alt Line: {business.phones[1]}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK HELPLINE STRIP */}
      <section className="bg-white border-b border-gray-100 py-6 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
              <div className="w-12 h-12 rounded-xl bg-[#f57c00] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">schedule</span>
              </div>
              <div>
                <strong className="block text-sm text-[#1e2638] font-bold">24/7 Live Assistance</strong>
                <span className="text-xs text-gray-600">Round-the-clock emergency &amp; train arrivals</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">train</span>
              </div>
              <div>
                <strong className="block text-sm text-[#1e2638] font-bold">Platform Meet &amp; Greet</strong>
                <span className="text-xs text-gray-600">Amb Andaura (AADR) &amp; Una (UHL) stations</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div>
                <strong className="block text-sm text-[#1e2638] font-bold">Best Rate Guarantee</strong>
                <span className="text-xs text-gray-600">Transparent quotes with zero hidden extras</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE 2-COLUMN BOOKING & CONTACT AREA */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT COLUMN: INTERACTIVE BOOKING FORM */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="border-b border-gray-100 pb-6 mb-6">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#f57c00] block mb-1.5">
                  Fast Booking &amp; Quote Dispatcher
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1e2638]">
                  Request an Instant Cab Quote
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  Fill in your travel details below and click dispatch. Your request will open directly in
                  WhatsApp for immediate confirmation with Lav Dutta.
                </p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-5">
                {/* Trip Type Pills */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                    Select Trip Category *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Outstation Hill Cab",
                      "Railway Pickup (Amb/Una)",
                      "Airport Transfer (IXC/ATQ)",
                      "Devi Darshan Pilgrimage",
                      "Local Day Trip / Short Run",
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTripType(type)}
                        className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all ${
                          tripType === type
                            ? "bg-[#182030] text-white shadow-sm"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#f57c00] text-sm text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#f57c00] text-sm text-gray-800"
                    />
                  </div>
                </div>

                {/* Pickup & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Pickup Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amb Andaura Station, Una, Mehatpur"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#f57c00] text-sm text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Destination / Route *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chintpurni, Dharamshala, Manali"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#f57c00] text-sm text-gray-800"
                    />
                  </div>
                </div>

                {/* Date, Time & Vehicle */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#f57c00] text-xs text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Approx. Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 11:30 AM / Train arrival"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#f57c00] text-xs text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Passengers
                    </label>
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#f57c00] text-xs text-gray-800 bg-white"
                    >
                      <option value="1-2 Persons">1-2 Persons</option>
                      <option value="3-4 Persons">3-4 Persons</option>
                      <option value="5-7 Persons">5-7 Persons</option>
                      <option value="8-12 Persons">8-12 Persons</option>
                      <option value="13-26 Persons (Tempo)">13-26 Persons (Tempo)</option>
                    </select>
                  </div>
                </div>

                {/* Vehicle Selection */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Preferred Vehicle
                  </label>
                  <select
                    value={car}
                    onChange={(e) => setCar(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#f57c00] text-sm text-gray-800 bg-white"
                  >
                    <option value="Toyota Innova Crysta (6+1)">Toyota Innova Crysta (6+1) - Premium Hill Comfort</option>
                    <option value="Maruti Ertiga (6+1)">Maruti Ertiga (6+1) - Economical Family MUV</option>
                    <option value="Swift Dzire (4+1)">Swift Dzire (4+1) - Compact Sedan</option>
                    <option value="Toyota Fortuner 4x4">Toyota Fortuner 4x4 - VIP / Rough Terrain</option>
                    <option value="Force Tempo Traveller (12-26 Seater)">Force Tempo Traveller (12-26 Seater) - Group Yatra</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Train / Flight Details or Special Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Arriving by Vande Bharat at 11:05 AM at Amb Andaura. Need elderly-friendly stops."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#f57c00] text-xs text-gray-800"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    <span>Confirm Booking</span>
                  </button>

                  <a
                    href={`tel:${business.phonesTel[0]}`}
                    className="py-3.5 px-6 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 text-center"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#f57c00]">call</span>
                    <span>Call Now</span>
                  </a>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-gray-500 border-t border-gray-100">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                    Commercial Yellow Plate Fleet
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                    Free Delay Waiting
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                    Zero Hidden Extras
                  </span>
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN: DIRECT CONTACT DETAILS & OFFICE INFO */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Primary Owner Contact Card */}
              <div className="bg-[#182030] text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full pointer-events-none" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#f57c00] text-white flex items-center justify-center text-xl font-black">
                    LD
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white">Lav Dutta</h3>
                    <span className="text-xs text-orange-400 font-bold uppercase tracking-wider block">
                      Founder &amp; Managing Director
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-6">
                  Speaks directly with every guest. Call or message Lav Ji anytime for emergency train
                  pickups, hill route advice, or customized tour arrangements.
                </p>

                <div className="flex flex-col gap-2.5">
                  <a
                    href={`tel:${business.phonesTel[0]}`}
                    className="w-full py-3 px-4 rounded-xl bg-white text-[#182030] hover:bg-orange-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#f57c00]">call</span>
                    <span>Primary Line: {business.phones[0]}</span>
                  </a>

                  <a
                    href={whatsappLink("Hello Lav Ji, I need to book a taxi.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Direct WhatsApp Chat</span>
                  </a>

                  <a
                    href={`tel:${business.phonesTel[1]}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-white/10"
                  >
                    <span className="material-symbols-outlined text-[16px] text-orange-400">phone_iphone</span>
                    <span>Operations Desk: {business.phones[1]}</span>
                  </a>
                </div>
              </div>

              {/* Head Office & Physical Location Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#f57c00]">
                  <span className="material-symbols-outlined text-[18px]">store</span>
                  <span>Registered Head Office</span>
                </div>

                <div>
                  <h4 className="font-extrabold text-base text-[#1e2638] mb-1">
                    Dutta Tour &amp; Travel (Dutta Motors)
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {business.location.fullAddress}
                  </p>
                  <span className="block text-xs font-semibold text-[#f57c00] mt-1">
                    Landmark: Adjacent Punjab &amp; Sind Bank, Una-Amb Highway
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-100 flex flex-col gap-2.5">
                  <a
                    href="https://maps.google.com/?q=Prem+Nagar+Una+Himachal+Pradesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#f57c00]">directions</span>
                    <span>Open in Google Maps / Driving Directions</span>
                  </a>

                  <a
                    href={`mailto:${business.email}`}
                    className="text-xs text-gray-600 hover:text-[#f57c00] flex items-center gap-2 transition-colors py-1"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#f57c00]">mail</span>
                    <span>{business.email}</span>
                  </a>
                </div>
              </div>

              {/* Key Transit Hubs Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-gray-100">
                <h4 className="font-extrabold text-sm text-[#1e2638] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#f57c00]">pin_drop</span>
                  Major Transit Hubs Covered 24/7
                </h4>
                <ul className="flex flex-col gap-2.5 text-xs text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px] mt-0.5">check</span>
                    <div>
                      <strong>Amb Andaura (AADR) Railway Station:</strong> Dedicated Vande Bharat 22447 / 22448 reception.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px] mt-0.5">check</span>
                    <div>
                      <strong>Una Himachal (UHL) Railway Station:</strong> Jan Shatabdi &amp; Himachal Express pickups.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px] mt-0.5">check</span>
                    <div>
                      <strong>Chandigarh International Airport (IXC):</strong> 2.5-hour direct highway transfer.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px] mt-0.5">check</span>
                    <div>
                      <strong>Maa Chintpurni &amp; Jwala Ji:</strong> Same-day and round-trip pilgrimage darshan.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW DIRECT BOOKING WORKS */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#f57c00] block mb-2">
              Simple &amp; Hassle-Free
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1e2638]">
              How Booking Works with Dutta Travels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-gray-100 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#182030] text-[#f57c00] font-black text-lg flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-base text-[#1e2638]">Share Your Travel Plan</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Send your date, pickup location, and destination via phone call or WhatsApp form above.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-gray-100 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#182030] text-[#f57c00] font-black text-lg flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-base text-[#1e2638]">Instant Transparent Quote</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Receive an all-inclusive fixed quote from Lav Dutta with verified vehicle details and zero hidden extras.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-gray-100 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#182030] text-[#f57c00] font-black text-lg flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-base text-[#1e2638]">Smooth Journey &amp; Flexible Pay</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Your sanitized cab arrives on time. Enjoy certified hill chauffeur hospitality and pay smoothly via UPI or cash.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#f57c00] block mb-2">
              Common Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1e2638]">
              Contact &amp; Booking FAQs
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {contactFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-2xl transition-all ${
                    isOpen ? "border-[#f57c00] bg-white shadow-sm" : "border-gray-200 bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-[#1e2638]">
                      {faq.question}
                    </span>
                    <span className="material-symbols-outlined text-[#f57c00] shrink-0 transition-transform">
                      {isOpen ? "remove" : "add"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA STRIP */}
      <section className="bg-gradient-to-br from-[#182030] to-[#1e2638] text-white py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Need an Immediate Taxi in Una, Amb or Chandigarh?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            We are available round-the-clock. Call directly or send a message on WhatsApp for instant confirmation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${business.phonesTel[0]}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              <span>Call: {business.phones[0]}</span>
            </a>

            <a
              href={whatsappLink("Hello Lav Ji, I need an immediate taxi.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>WhatsApp Us Now</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

