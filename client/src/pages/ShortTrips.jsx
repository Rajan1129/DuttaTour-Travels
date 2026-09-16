import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { business, destinations, fleet, whatsappLink } from "../data/business";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "../data/schema";

const shortTripsFaqs = [
  {
    question: "What are the most popular same-day short trips from Una and Amb?",
    answer:
      "The top same-day short trips include: 1) Bhakra Dam & Govind Sagar Lake (18 KM, ~4 hours), 2) Sri Anandpur Sahib & Virasat-e-Khalsa (38 KM, ~5 hours), 3) Maa Chintpurni Devi Ji Dham (26 KM from Amb / 52 KM from Una), 4) Maa Jwala Ji & Kangra Fort (75 KM, full day), and 5) Dera Baba Barbhag Singh Ji in Mairi.",
  },
  {
    question: "Can our short trip start with pickup directly from Una or Amb Andaura Railway Station?",
    answer:
      "Yes! If you are arriving on the New Delhi Vande Bharat Express (Train 22447) or Jan Shatabdi, our chauffeur will receive you outside the platform and drive directly to your chosen day destination with luggage safely stored in the car.",
  },
  {
    question: "Is waiting time at sightseeing spots and temples included in the cab quote?",
    answer:
      "Yes, 100%! All our short trip packages include generous standby waiting time at viewpoints, temples, museums, and lunch stops. The driver is exclusively dedicated to your party with zero hurry.",
  },
  {
    question: "Which vehicle is recommended for a family short trip from Una?",
    answer:
      "For couples or small families (up to 4 members), Swift Dzire or Toyota Etios is very economical and comfortable. For families of 4 to 6 members, the Toyota Innova Crysta or Maruti Ertiga is recommended for maximum comfort and views.",
  },
  {
    question: "Can we customize our own itinerary and combine multiple places in one day?",
    answer:
      "Absolutely! You can easily combine Bhakra Dam with Anandpur Sahib, or Chintpurni with Jwala Ji. Simply share your preferred spots on WhatsApp, and our team will plan the smoothest route and timing.",
  },
];

const shortTripPackages = [
  {
    slug: "bhakra-dam-govind-sagar",
    title: "Bhakra Nangal Dam & Govind Sagar Lake",
    duration: "Half Day (4 - 5 Hours)",
    distance: "18 KM from Una",
    category: "half-day",
    image: "/images/destinations/chandigarh.jpg",
    badge: "Engineering Marvel",
    idealFor: "Family Picnic & Sightseeing",
    highlights: "Bhakra Dam Viewpoint &bull; Govind Sagar Lake &bull; Nangal Wetlands &bull; Nehru Memorial",
    summary:
      "Witness one of the highest gravity dams in the world. Enjoy panoramic vistas of the emerald Govind Sagar reservoir surrounded by lush Shivalik hills.",
  },
  {
    slug: "anandpur-sahib-virasat-khalsa",
    title: "Sri Anandpur Sahib & Virasat-e-Khalsa",
    duration: "Half Day (5 - 6 Hours)",
    distance: "38 KM from Una",
    category: "half-day",
    image: "/images/destinations/amritsar.jpg",
    badge: "Spiritual & Heritage",
    idealFor: "Devotees & History Lovers",
    highlights: "Takht Sri Kesgarh Sahib &bull; Virasat-e-Khalsa Museum &bull; Gurudwara Bhora Sahib",
    summary:
      "Visit the birthplace of the Khalsa Panth and the world-renowned Virasat-e-Khalsa museum, just a short scenic drive through the Nangal corridor.",
  },
  {
    slug: "chintpurni-same-day",
    title: "Maa Chintpurni Devi Ji Same-Day Darshan",
    duration: "Half Day (4 - 5 Hours)",
    distance: "26 KM from Amb / 52 KM from Una",
    category: "temple",
    image: "/images/tours/6-devi-darshan.jpg",
    badge: "Wish-Fulfilling Shaktipeeth",
    idealFor: "Devotees & Senior Citizens",
    highlights: "Chhinnamastika Dham &bull; VIP Gate Parking &bull; Parikrama &bull; Bharwain Ridge",
    summary:
      "Direct comfortable transfer to Maa Chintpurni Shaktipeeth. Includes patient driver standby while you take darshan, collect prasad, and have langar.",
  },
  {
    slug: "jwala-ji-kangra-fort",
    title: "Maa Jwala Ji & Historic Kangra Fort",
    duration: "Full Day (8 - 10 Hours)",
    distance: "75 KM from Una / 45 KM from Amb",
    category: "full-day",
    image: "/images/destinations/kangra.jpg",
    badge: "Temple & Ancient Fort",
    idealFor: "Family Heritage Tour",
    highlights: "9 Holy Eternal Flames &bull; 1000-Year Kangra Fort &bull; Brajeshwari Temple &bull; Local Kangra Tea",
    summary:
      "Experience the eternal flame at Jawalamukhi followed by an excursion to the grand ancient ramparts of Kangra Fort with Dhauladhar views.",
  },
  {
    slug: "dharamshala-mcleodganj-weekend",
    title: "Dharamshala & McLeodganj Hill Escapade",
    duration: "Weekend (2 Days / 1 Night)",
    distance: "125 KM from Una / 92 KM from Amb",
    category: "weekend",
    image: "/images/destinations/dharamshala.jpg",
    badge: "Mountain Hill Station",
    idealFor: "Couples, Friends & Family",
    highlights: "Dalai Lama Temple &bull; HPCA International Cricket Stadium &bull; Bhagsu Waterfall &bull; Naddi Sunset",
    summary:
      "A quick 2-day rejuvenating escape into the pine-clad Kangra Valley. Enjoy Tibetan cafes, monasteries, and cool Himalayan mountain air.",
  },
  {
    slug: "baba-barbhag-singh-mairi",
    title: "Dera Baba Barbhag Singh Ji (Mairi)",
    duration: "Half Day (4 - 5 Hours)",
    distance: "40 KM from Una / 18 KM from Amb",
    category: "temple",
    image: "/images/tours/4-char-devi-darshan.jpg",
    badge: "Sacred Dera Pilgrimage",
    idealFor: "Pilgrims & Devotees",
    highlights: "Holy Dera Sahib Mairi &bull; Manji Sahib &bull; Charan Ganga Sacred Spring",
    summary:
      "Revered spiritual pilgrimage center near Amb visited by thousands seeking inner peace and relief from negative energies.",
  },
  {
    slug: "baba-balak-nath-deotsidh",
    title: "Baba Balak Nath Temple (Deotsidh)",
    duration: "Full Day (6 - 8 Hours)",
    distance: "65 KM from Una",
    category: "temple",
    image: "/images/tours/una-manali-shimla.jpg",
    badge: "Holy Cave Shrine",
    idealFor: "Sidh Baba Devotees",
    highlights: "Natural Cave Shrine &bull; Dhaula Giri Hills &bull; Rot Prasad &bull; Panoramic Hilltop",
    summary:
      "Sacred hill shrine of immortal yogi Baba Balak Nath located on the border of Hamirpur and Bilaspur, offering scenic winding drives.",
  },
  {
    slug: "chandigarh-sukhna-city-run",
    title: "Chandigarh City, Sukhna Lake & Shopping",
    duration: "Same-Day / Weekend (1 - 2 Days)",
    distance: "115 KM from Una",
    category: "weekend",
    image: "/images/destinations/chandigarh.jpg",
    badge: "City & Leisure",
    idealFor: "Shopping, Doctors & Outings",
    highlights: "Sukhna Lake Boating &bull; Rock Garden &bull; Sector 17 &bull; Elante Mall",
    summary:
      "Speedy expressway ride to the City Beautiful for leisure boating, medical consultations at PGI, or retail shopping with flexible return.",
  },
];

export default function ShortTrips() {
  const seo = seoConfig.shortTrips || seoConfig.destinations;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Short Trips" }];

  // Category Filter State
  const [activeTab, setActiveTab] = useState("all"); // "all" | "half-day" | "full-day" | "temple" | "weekend"

  // Booking Form State
  const [selectedTrip, setSelectedTrip] = useState("Bhakra Nangal Dam & Govind Sagar Lake");
  const [pickupCity, setPickupCity] = useState("Una (Prem Nagar / Railway Station)");
  const [travelDate, setTravelDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [vehicleType, setVehicleType] = useState("Innova Crysta");
  const [passengerCount, setPassengerCount] = useState("4 Passengers (Family)");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Filtered trips
  const filteredTrips = shortTripPackages.filter((t) => {
    if (activeTab === "all") return true;
    return t.category === activeTab;
  });

  // Submit Handler
  const handleShortTripBooking = (e) => {
    e.preventDefault();
    const msg =
      `*NEW SHORT TRIP INQUIRY*\n\n` +
      (customerName.trim() ? `• *Passenger Name:* ${customerName.trim()}\n` : "") +
      (customerPhone.trim() ? `• *Mobile / WhatsApp:* ${customerPhone.trim()}\n` : "") +
      `• *Selected Short Trip:* ${selectedTrip}\n` +
      `• *Pickup Point:* ${pickupCity}\n` +
      `• *Date of Travel:* ${travelDate}\n` +
      `• *Group Size:* ${passengerCount}\n` +
      `• *Preferred Vehicle:* ${vehicleType}\n\n` +
      `Please check driver availability and share best quote.`;

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
          faqSchema(shortTripsFaqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH SHORT TRIPS WIDGET */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#182030] text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/hero-bg.jpg"
            alt="Short Trips and Weekend Getaways from Una Himachal"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f57c00] text-white text-xs font-black shadow-md self-start">
                <span className="material-symbols-outlined text-[15px]">explore</span>
                <span>SAME-DAY GETAWAYS &bull; 15+ YEARS LOCAL EXPERTISE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Short Trips &amp; Weekend Getaways from Una &amp; Amb
              </h1>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                Looking for a refreshing half-day sightseeing drive or a quick weekend mountain escape?
                Explore <strong>Bhakra Dam</strong>, <strong>Sri Anandpur Sahib</strong>, sacred{" "}
                <strong>Shaktipeeths</strong>, and <strong>Dharamshala</strong> with 100% private sanitized cabs
                and courteous local pahadi chauffeurs.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-left">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-amber-400">schedule</span>
                  <span className="block text-xs font-black mt-1">Same-Day Returns</span>
                  <span className="block text-[10px] text-gray-300">4 to 8 Hour Circuits</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-emerald-400">directions_railway</span>
                  <span className="block text-xs font-black mt-1">Station Standby</span>
                  <span className="block text-[10px] text-gray-300">Una &amp; Amb Vande Bharat</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-blue-400">tune</span>
                  <span className="block text-xs font-black mt-1">100% Private</span>
                  <span className="block text-[10px] text-gray-300">Flexible Photo Halts</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-[#f57c00]">loyalty</span>
                  <span className="block text-xs font-black mt-1">Best Rates</span>
                  <span className="block text-[10px] text-gray-300">Zero Hidden Extras</span>
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
                  href={whatsappLink("Hello Mandyal Travels, I want to book a short trip from Una.")}
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
                    Book Short Trip
                  </h3>
                </div>
                <span className="bg-[#e7f9f0] text-[#1b804e] text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                  Best Rate Guaranteed
                </span>
              </div>

              <form onSubmit={handleShortTripBooking} className="flex flex-col gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Select Short Trip Circuit
                  </label>
                  <select
                    value={selectedTrip}
                    onChange={(e) => setSelectedTrip(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00] cursor-pointer"
                  >
                    {shortTripPackages.map((pkg) => (
                      <option key={pkg.slug} value={pkg.title}>
                        {pkg.title} ({pkg.duration})
                      </option>
                    ))}
                    <option value="Custom Short Trip">Custom Sightseeing Circuit</option>
                  </select>
                </div>

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
                      Passengers
                    </label>
                    <select
                      value={passengerCount}
                      onChange={(e) => setPassengerCount(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2 py-2 text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                    >
                      <option value="1-2 Passengers (Couple)">1-2 Passengers (Couple)</option>
                      <option value="3-4 Passengers (Family)">3-4 Passengers (Family)</option>
                      <option value="5-6 Passengers (Family/Elders)">5-6 Passengers (Family/Elders)</option>
                      <option value="7+ Passengers (Group)">7+ Passengers (Group)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-600 mb-1">
                    Preferred Vehicle
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                  >
                    <option value="Innova Crysta">Toyota Innova Crysta (6 Pax - Most Comfortable)</option>
                    <option value="Maruti Ertiga">Maruti Ertiga (6 Pax - Family SUV)</option>
                    <option value="Swift Dzire">Swift Dzire (4 Pax - Economical Sedan)</option>
                    <option value="Force Urbania">Force Urbania (12 Pax - Luxury Van)</option>
                    <option value="Tempo Traveller">Tempo Traveller (16 Pax - Big Group)</option>
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
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Confirm Short Trip Booking &rarr;</span>
                </button>
              </form>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                <span className="flex items-center gap-1 text-[#f57c00]">
                  <span className="material-symbols-outlined text-[14px]">timer</span>
                  Waiting Time Included
                </span>
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  No Hidden Fuel Charges
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SHORT TRIPS GRID WITH CATEGORY FILTERS */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              SAME-DAY &amp; WEEKEND EXCURSIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight mt-1">
              Popular Short Trips from Una &amp; Amb
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Carefully designed day trips and weekend escapes tailored for families, pilgrims, and train travelers.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { id: "all", label: "All Short Trips" },
              { id: "half-day", label: "Half-Day (4-5 Hrs)" },
              { id: "full-day", label: "Full-Day (8-10 Hrs)" },
              { id: "temple", label: "Sacred Temple Day Tours" },
              { id: "weekend", label: "Weekend Escapes (1-2 Days)" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-black transition-all ${
                  activeTab === tab.id
                    ? "bg-[#f57c00] text-white shadow-md scale-105"
                    : "bg-[#f4f7fe] text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrips.map((trip) => (
              <div
                key={trip.slug}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-gray-200/80 group"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#f57c00] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                      {trip.duration}
                    </div>
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/10">
                      {trip.distance}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-[#182030]/90 backdrop-blur-sm text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-white/10">
                      Best Rate Guaranteed
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col gap-2">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#365bb5] bg-[#ebf0fc] px-2 py-0.5 rounded-md w-fit">
                      <span>{trip.badge}</span>
                    </div>

                    <h3 className="font-black text-base text-[#1e2638] group-hover:text-[#f57c00] transition-colors leading-snug">
                      {trip.title}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-normal">
                      {trip.summary}
                    </p>

                    <div className="pt-2 border-t border-gray-100 flex flex-col gap-1 text-[11px] text-gray-500">
                      <span className="font-semibold text-gray-700">Highlights:</span>
                      <span className="leading-snug" dangerouslySetInnerHTML={{ __html: trip.highlights }}></span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <a
                    href={whatsappLink(
                      `Hello Mandyal Travels, I want to book the "${trip.title}" (${trip.duration}) short trip.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#182030] hover:bg-[#f57c00] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all group-hover:shadow-md"
                  >
                    <span>⚡ Book This Short Trip</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. POPULAR OUTSTATION ROUTES CONNECTIONS (SEO Internal Links) */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-18 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                LONG HIGHWAY ROUTES
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Looking for Longer Outstation Trips?
              </h2>
            </div>
            <Link
              to="/outstation-taxi"
              className="text-xs sm:text-sm font-bold text-[#f57c00] hover:underline flex items-center gap-1"
            >
              <span>Explore Outstation Cabs &rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.slice(0, 4).map((d) => (
              <Link
                key={d.slug}
                to={`/${d.slug}`}
                className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-gray-200/80"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#f57c00] mb-1">
                    <span>{d.distanceKm} KM</span>
                    <span>{d.duration}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-[#1e2638] group-hover:text-[#f57c00] transition-colors">
                    {d.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{d.summary}</p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#f57c00] mt-3">
                  <span>View Route Guide</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FLEET AVAILABLE FOR SHORT TRIPS */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                CLEAN &bull; SANITIZED &bull; AC CABS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Available Cabs for Day Trips
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
                    href={whatsappLink(`Hello Mandyal Travels, I want to book ${car.name} for a short trip.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#943e00] hover:bg-[#7a3200] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <span>⚡ Book {car.name} for Day Trip</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SHORT TRIPS FAQS */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-16 border-t border-gray-100">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
              Short Trips &amp; Day Tour FAQs
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Everything you need to know about same-day rentals, driver waiting time, and customized itineraries.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {shortTripsFaqs.map((faq, idx) => (
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
                  PLANNING A DAY OUTING?
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Book Your Short Trip with Manoj Mandyal
                </h3>
                <p className="text-xs text-gray-300">
                  Direct dispatch from Prem Nagar, Una HQ. Clean AC vehicles, courteous drivers, and flexible sightseeing stops.
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
                href={whatsappLink("Hello Manoj Mandyal, I want to book a same-day short trip from Una.")}
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
            <h3 className="text-2xl font-black text-[#1e2638]">Short Trip Reserved!</h3>
            <p className="text-sm text-gray-600">
              Your request for <strong>{selectedTrip}</strong> from <strong>{pickupCity}</strong> ({vehicleType}){" "}
              on <strong>{travelDate}</strong> has been received by our day-tour desk.
            </p>
            <p className="text-xs text-gray-500">
              Our team will confirm your chauffeur allocation and route schedule on WhatsApp shortly.
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
