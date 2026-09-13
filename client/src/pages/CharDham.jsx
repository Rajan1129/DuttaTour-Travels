import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { business, fleet, whatsappLink } from "../data/business";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "../data/schema";

const charDhamFaqs = [
  {
    question: "What is the complete Uttarakhand Char Dham Yatra circuit route?",
    answer:
      "The traditional Char Dham Yatra starts from Haridwar / Rishikesh and proceeds in clockwise parikrama order: 1) Yamunotri Dham, 2) Gangotri Dham, 3) Kedarnath Dham (12 Jyotirlinga), and 4) Badrinath Dham, concluding back at Rishikesh or Haridwar. Our chauffeurs pick you up directly from Una, Amb Andaura Railway Station, Chandigarh, or Haridwar.",
  },
  {
    question: "Do you offer Do Dham (Kedarnath & Badrinath) and Haridwar-Rishikesh tours?",
    answer:
      "Yes! We arrange specialized Do Dham Yatra packages covering Kedarnath and Badrinath (typically 5N/6D) as well as dedicated spiritual getaways to Haridwar (Har Ki Pauri evening Ganga Aarti) and Rishikesh (Triveni Ghat, Ram Jhula, and Parmarth Niketan).",
  },
  {
    question: "How do you coordinate Kedarnath Helipad transfers and Sonprayag drops?",
    answer:
      "For devotees taking the Kedarnath helicopter, our chauffeur drops and receives you directly at your booked helipad (Phata, Sirsi, or Guptkashi). For trekking devotees, we drive you to Sonprayag / Gaurikund base and remain on standby until your safe return.",
  },
  {
    question: "Is mandatory Uttarakhand Char Dham biometric/online registration assisted?",
    answer:
      "Yes. Our team assists devotees with the official Uttarakhand Tourist Care biometric registration process and shares real-time weather, yatra guidelines, and route status updates before departure.",
  },
  {
    question: "Can we combine Himachal Devi Darshan with Uttarakhand Char Dham or Haridwar?",
    answer:
      "Absolutely! Many pilgrims combine Maa Chintpurni and Jwala Ji in Himachal with Haridwar, Rishikesh, and Kedarnath in a seamless multi-day pilgrimage. We tailor the entire route to your travel schedule.",
  },
];

const sacredDhamShrines = [
  {
    name: "Kedarnath Dham",
    deity: "Lord Shiva (12 Jyotirlingas)",
    altitude: "3,583 Meters (Garhwal Himalayas)",
    significance:
      "One of the 12 holiest Jyotirlingas of Lord Shiva. Majestic stone sanctum built against the snowy Kedarnath dome; Mandakini river flows beside the temple.",
    highlight: "12 Jyotirlinga &bull; Sonprayag / Helipad Standby",
    timing: "04:00 AM - 09:00 PM (May to Nov)",
    badge: "Most Revered",
  },
  {
    name: "Badrinath Dham",
    deity: "Lord Vishnu (Badri Vishal)",
    altitude: "3,133 Meters (Alaknanda Valley)",
    significance:
      "Supreme pilgrimage of the Four Dhams of India. Sacred abode of Lord Vishnu with Tapt Kund hot thermal springs, Nar-Narayan peaks, and Mana Village.",
    highlight: "Tapt Kund &bull; Mana First Indian Village",
    timing: "04:30 AM - 09:00 PM (May to Nov)",
    badge: "Maha Tirth",
  },
  {
    name: "Gangotri Dham",
    deity: "Goddess Ganga (Bhagirathi River)",
    altitude: "3,100 Meters (Uttarkashi)",
    significance:
      "Sacred origin where River Ganga descended to Earth upon the penance of King Bhagiratha. White marble temple nestled among deodar and pine forests.",
    highlight: "Bhagirath Shila &bull; Submerged Shivling",
    timing: "06:00 AM - 08:00 PM",
    badge: "Holy River Source",
  },
  {
    name: "Yamunotri Dham",
    deity: "Goddess Yamuna",
    altitude: "3,291 Meters (Western Garhwal)",
    significance:
      "The first stop of the Char Dham Yatra. Source of the sacred Yamuna river, boiling hot springs of Surya Kund (where rice is cooked as prasad), and Divya Shila.",
    highlight: "Surya Kund &bull; Divya Shila",
    timing: "06:00 AM - 08:00 PM",
    badge: "First Dham Stop",
  },
  {
    name: "Haridwar (Gateway of Gods)",
    deity: "Ganga Maiya / Har Ki Pauri",
    altitude: "Sacred Plains Gateway",
    significance:
      "One of the seven holiest Hindu cities. Famous for the world-renowned evening Maha Ganga Aarti at Har Ki Pauri, sacred Brahmakund dips, and Mansa Devi temple.",
    highlight: "Har Ki Pauri Evening Aarti",
    timing: "Open 24/7 &bull; Aarti at Sunset",
    badge: "Spiritual Gateway",
  },
  {
    name: "Rishikesh (Yoga Capital)",
    deity: "Triveni Ghat / Ram Jhula",
    altitude: "Himalayan Foothills",
    significance:
      "Spiritual sanctuaries along the emerald Ganga. Iconic Ram Jhula, Lakshman Jhula, Triveni Ghat Maha Aarti, and ancient Himalayan meditation ashrams.",
    highlight: "Ram Jhula &bull; Triveni Ghat Aarti",
    timing: "Open 24/7",
    badge: "Yoga & Meditation",
  },
  {
    name: "Himachal 4 Devi Darshan",
    deity: "Chintpurni, Jwala Ji, Kangra, Chamunda",
    altitude: "Himachal Shaktipeeths",
    significance:
      "Revered Shaktipeeth circuit in Himachal Pradesh: Maa Chintpurni (wish-fulfiller), Maa Jwala Ji (eternal flame), Kangra Brajeshwari, and Chamunda Nandikeshwar.",
    highlight: "Footstep &amp; Flame Shaktipeeths",
    timing: "04:00 AM - 10:00 PM",
    badge: "Himachal Shaktipeeths",
  },
];

const yatraItineraries = [
  {
    title: "Complete Uttarakhand Char Dham Yatra",
    duration: "11 Days / 10 Nights",
    badge: "Complete 4 Dham Circuit",
    route: "Haridwar &rarr; Barkot (Yamunotri) &rarr; Uttarkashi (Gangotri) &rarr; Guptkashi (Kedarnath) &rarr; Badrinath &rarr; Rishikesh",
    dayWise: [
      "Day 1-2: Pickup at Una / Amb / Chandigarh / Haridwar &bull; Drive to Barkot &bull; Trek to Yamunotri Dham &bull; Surya Kund darshan &bull; Night at Barkot.",
      "Day 3-4: Barkot to Uttarkashi &bull; Excursion to Gangotri Dham along Bhagirathi river &bull; Kashi Vishwanath temple visit.",
      "Day 5-7: Drive to Guptkashi / Sonprayag &bull; Kedarnath Dham darshan via helicopter or trek &bull; Attend evening Shiva aarti &bull; Night at Kedarnath / Guptkashi.",
      "Day 8-9: Proceed to Badrinath Dham via Joshimath &bull; Badri Vishal darshan &bull; Tapt Kund holy bath &bull; Mana Village &bull; Night at Badrinath.",
      "Day 10-11: Badrinath to Rishikesh &bull; Ram Jhula &bull; Triveni Ghat Ganga Aarti &bull; Drop at Haridwar / Chandigarh / Una.",
    ],
    recommendedVehicle: "Toyota Innova Crysta or Tempo Traveller",
  },
  {
    title: "Sacred Do Dham (Kedarnath & Badrinath)",
    duration: "6 Days / 5 Nights",
    badge: "Shiva & Vishnu Mahatirth",
    route: "Haridwar/Rishikesh &rarr; Guptkashi &rarr; Kedarnath &rarr; Pipalkoti &rarr; Badrinath &rarr; Rishikesh",
    dayWise: [
      "Day 1: Departure from Una / Chandigarh / Haridwar &bull; Scenic drive to Guptkashi &bull; Rest with Dhauladhar views.",
      "Day 2: Early morning transfer to Sonprayag / Helipad &bull; Reach Kedarnath Dham &bull; Evening Aarti &bull; Night at Kedarnath / Phata.",
      "Day 3: Morning temple darshan &bull; Descend to Guptkashi / Chopta.",
      "Day 4: Drive through Chamoli to Badrinath Dham &bull; Attend sacred evening Sandhya Aarti.",
      "Day 5: Morning darshan of Lord Badri Vishal &bull; Visit Vyas Gufa, Ganesh Gufa &amp; Saraswati River in Mana &bull; Drive to Srinagar / Rudraprayag.",
      "Day 6: Drive to Rishikesh &amp; Haridwar &bull; Har Ki Pauri visit &bull; Evening return drop.",
    ],
    recommendedVehicle: "Innova Crysta or Maruti Ertiga",
  },
  {
    title: "Haridwar & Rishikesh Spiritual Tour",
    duration: "3 Days / 2 Nights",
    badge: "Holy Ganga Experience",
    route: "Una/Chandigarh &rarr; Haridwar &rarr; Mansa Devi &rarr; Rishikesh &rarr; Ram Jhula &rarr; Drop",
    dayWise: [
      "Day 1: Doorstep pickup in Una / Amb / Chandigarh &bull; Direct expressway transfer to Haridwar &bull; Attend grand evening Maha Aarti at Har Ki Pauri.",
      "Day 2: Morning ropeway to Mansa Devi &amp; Chandi Devi &bull; Drive to Rishikesh (30 min) &bull; Visit Ram Jhula, Gita Bhawan &bull; Evening Triveni Ghat Aarti.",
      "Day 3: Morning peaceful meditation session by Ganga &bull; Neer Gaddu waterfall excursion &bull; Smooth return drive to Una / Chandigarh.",
    ],
    recommendedVehicle: "Swift Dzire, Ertiga or Innova",
  },
  {
    title: "Himachal 4 Char Devi Darshan Yatra",
    duration: "4 Days / 3 Nights",
    badge: "Himachal Shaktipeeth Circuit",
    route: "Una/Amb &rarr; Chintpurni &rarr; Jwala Ji &rarr; Kangra &rarr; Chamunda &rarr; Drop",
    dayWise: [
      "Day 1: Platform pickup at Una / Amb Andaura Vande Bharat &bull; Maa Chintpurni Dham darshan &bull; Night stay at Jwala Ji.",
      "Day 2: Attend morning Shayan Aarti at Maa Jwala Ji &bull; Maa Baglamukhi temple &bull; Maa Kangra Brajeshwari Devi &bull; Night stay.",
      "Day 3: Maa Chamunda Nandikeshwar Dham &bull; Tea Gardens &bull; McLeodganj Dalai Lama Temple &bull; Night stay.",
      "Day 4: Anandpur Sahib Gurdwara visit &bull; Drop at Una / Amb / Chandigarh Railway Station.",
    ],
    recommendedVehicle: "Toyota Innova Crysta or Maruti Ertiga",
  },
];

export default function CharDham() {
  const seo = seoConfig.charDham;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Tour Packages", path: "/tour-packages" },
    { name: "Char Dham Yatra" },
  ];

  // Booking Form State
  const [circuitType, setCircuitType] = useState("uttarakhand-char-dham");
  const [pickupPoint, setPickupPoint] = useState("Una / Amb Andaura (AADR) Station");
  const [yatraDate, setYatraDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [vehicleType, setVehicleType] = useState("Innova Crysta");
  const [devoteeCount, setDevoteeCount] = useState("4 to 6 Devotees (Family)");
  const [devoteeName, setDevoteeName] = useState("");
  const [devoteePhone, setDevoteePhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Submit Handler
  const handleYatraBooking = (e) => {
    e.preventDefault();
    const circuitLabel =
      circuitType === "uttarakhand-char-dham"
        ? "Uttarakhand Complete Char Dham (Yamunotri, Gangotri, Kedarnath, Badrinath)"
        : circuitType === "do-dham"
        ? "Do Dham Yatra (Kedarnath & Badrinath via Rishikesh)"
        : circuitType === "haridwar-rishikesh"
        ? "Haridwar & Rishikesh Spiritual Tour"
        : "Himachal 4 Devi Darshan Yatra";

    const msg =
      `*NEW CHAR DHAM & PILGRIMAGE INQUIRY*\n\n` +
      (devoteeName.trim() ? `• *Devotee Name:* ${devoteeName.trim()}\n` : "") +
      (devoteePhone.trim() ? `• *WhatsApp Number:* ${devoteePhone.trim()}\n` : "") +
      `• *Circuit Choice:* ${circuitLabel}\n` +
      `• *Pickup Point:* ${pickupPoint}\n` +
      `• *Yatra Start Date:* ${yatraDate}\n` +
      `• *Devotees Count:* ${devoteeCount}\n` +
      `• *Preferred Vehicle:* ${vehicleType}\n\n` +
      `Please check chauffeur availability and share custom yatra plan and quote.`;

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
          faqSchema(charDhamFaqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH CHAR DHAM WIDGET */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#182030] text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/images/tours/4-char-devi-darshan.jpg"
            alt="Char Dham Yatra Kedarnath Badrinath Haridwar Rishikesh"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f57c00] text-white text-xs font-black shadow-md self-start">
                <span className="material-symbols-outlined text-[15px]">temple_hindu</span>
                <span>SACRED CHAR DHAM &amp; DEVI DARSHAN YATRA &bull; 15+ YEARS TRUST</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Char Dham Yatra &amp; Devi Darshan Packages
              </h1>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                Embark on a sacred journey to <strong>Kedarnath</strong>, <strong>Badrinath</strong>,{" "}
                <strong>Gangotri</strong>, <strong>Yamunotri</strong>, and the holy gates of{" "}
                <strong>Haridwar</strong> &amp; <strong>Rishikesh</strong>, or Himachal&apos;s revered 4 Devi Shaktipeeths.
                Private commercial cabs, seasoned mountain chauffeurs, helipad transfer coordination, and 100% elder-friendly service.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-left">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-amber-400">directions_railway</span>
                  <span className="block text-xs font-black mt-1">Doorstep Pickup</span>
                  <span className="block text-[10px] text-gray-300">Una, Amb &amp; Haridwar</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-purple-400">elderly</span>
                  <span className="block text-xs font-black mt-1">Senior Citizen Care</span>
                  <span className="block text-[10px] text-gray-300">Gentle Hill Driving</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-emerald-400">flight</span>
                  <span className="block text-xs font-black mt-1">Helipad Standby</span>
                  <span className="block text-[10px] text-gray-300">Kedarnath Phata/Sirsi</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                  <span className="material-symbols-outlined text-[20px] text-blue-400">loyalty</span>
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
                  href={whatsappLink("Hello Dutta Travels, I want to book Char Dham Yatra (Kedarnath, Badrinath, Haridwar).")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Yatra Booking Form */}
            <div className="lg:col-span-5 bg-white text-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-100 flex flex-col gap-3.5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[24px] text-[#f57c00]">
                    temple_hindu
                  </span>
                  <h3 className="text-lg font-black text-[#1e2638]">
                    Inquire Char Dham Yatra
                  </h3>
                </div>
                <span className="bg-[#e7f9f0] text-[#1b804e] text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                  Chardham Certified
                </span>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-2 gap-1 bg-[#edf2fe] p-1 rounded-xl text-center">
                {[
                  { id: "uttarakhand-char-dham", label: "4 Dham (Kedarnath/Badri)" },
                  { id: "do-dham", label: "Do Dham (Kedarnath/Badri)" },
                  { id: "haridwar-rishikesh", label: "Haridwar & Rishikesh" },
                  { id: "himachal-devi", label: "Himachal 4 Devi" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setCircuitType(t.id)}
                    className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all ${
                      circuitType === t.id
                        ? "bg-[#f57c00] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleYatraBooking} className="flex flex-col gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Pickup Point (Una / Amb / Haridwar / Delhi)
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupPoint}
                    onChange={(e) => setPickupPoint(e.target.value)}
                    placeholder="e.g. Una Prem Nagar, Amb Andaura (AADR), Haridwar, Chandigarh"
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Yatra Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={yatraDate}
                      onChange={(e) => setYatraDate(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Devotees Count
                    </label>
                    <select
                      value={devoteeCount}
                      onChange={(e) => setDevoteeCount(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2 py-2 text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                    >
                      <option value="2 Devotees (Couple)">2 Devotees (Couple)</option>
                      <option value="4 to 6 Devotees (Family)">4 to 6 Devotees (Family)</option>
                      <option value="7 to 12 Devotees (Group/Van)">7 to 12 Devotees (Group/Van)</option>
                      <option value="12 to 26 Devotees (Tempo/Bus)">12 to 26 Devotees (Tempo/Bus)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-600 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                  >
                    <option value="Innova Crysta">Toyota Innova Crysta (6 Pax - Best for Mountains &amp; Elders)</option>
                    <option value="Maruti Ertiga">Maruti Ertiga (6 Pax - Comfortable Family SUV)</option>
                    <option value="Swift Dzire">Swift Dzire (4 Pax - Economical Sedan)</option>
                    <option value="Force Urbania">Force Urbania (12 Pax - Luxury Van)</option>
                    <option value="Tempo Traveller">Tempo Traveller (16 Pax - Large Group)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      Devotee Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={devoteeName}
                      onChange={(e) => setDevoteeName(e.target.value)}
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
                      value={devoteePhone}
                      onChange={(e) => setDevoteePhone(e.target.value)}
                      className="w-full bg-[#f4f7fe] rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-4 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Confirm Pilgrimage Booking &rarr;</span>
                </button>
              </form>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                <span className="flex items-center gap-1 text-[#f57c00]">
                  <span className="material-symbols-outlined text-[14px]">loyalty</span>
                  Best Rate Guaranteed
                </span>
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  Zero Hidden Charges
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE SACRED SHAKTIPEETHS & DHAMS (KEDARNATH, BADRINATH, GANGOTRI, YAMUNOTRI, HARIDWAR, RISHIKESH) */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              SACRED PILGRIMAGE SHAWLS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight mt-1">
              The Holy Shrines of the Yatra
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              From the cosmic heights of Kedarnath and Badrinath to the sacred Ganga Aarti of Haridwar &amp; Rishikesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sacredDhamShrines.map((temple, idx) => (
              <div
                key={idx}
                className="bg-[#f8faff] rounded-3xl p-6 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-4 group hover:border-[#f57c00]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-[#f57c00]/10 text-[#f57c00] font-black text-[11px] px-3 py-0.5 rounded-full">
                      {temple.badge}
                    </span>
                    <span className="text-[11px] font-bold text-gray-500">{temple.altitude}</span>
                  </div>

                  <h3 className="font-black text-xl text-[#1e2638] group-hover:text-[#f57c00] transition-colors leading-snug">
                    {temple.name}
                  </h3>
                  <span className="text-xs font-bold text-[#f57c00] block mt-0.5">
                    {temple.deity}
                  </span>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed font-normal">
                    {temple.significance}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 mt-1.5">
                    {temple.highlight}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-200/70 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-semibold">{temple.timing}</span>
                  <a
                    href={whatsappLink(`Hello Dutta Travels, I want to include ${temple.name} in my pilgrimage.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#f57c00] hover:underline flex items-center gap-1"
                  >
                    <span>Inquire &rarr;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DAY-WISE PILGRIMAGE ITINERARIES */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-18 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              HANDCRAFTED ITINERARIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight mt-1">
              Popular Pilgrimage Yatra Packages
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Carefully paced circuits designed for peaceful darshan, morning/evening aartis, and senior citizen comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {yatraItineraries.map((itinerary, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between gap-5 border border-gray-200/80 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-[#f57c00] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
                      {itinerary.duration}
                    </span>
                    <span className="bg-[#ebf0fc] text-[#365bb5] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {itinerary.badge}
                    </span>
                  </div>

                  <h3 className="font-black text-xl text-[#1e2638] group-hover:text-[#f57c00] transition-colors leading-snug">
                    {itinerary.title}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 mt-1">{itinerary.route}</p>

                  <div className="mt-4 flex flex-col gap-2.5 text-xs text-gray-600 leading-relaxed font-normal">
                    {itinerary.dayWise.map((day, dIdx) => (
                      <div key={dIdx} className="bg-[#f8faff] rounded-xl p-3 border border-gray-100">
                        {day}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
                  <div className="text-xs">
                    <span className="text-gray-500 font-semibold block">Recommended Vehicle:</span>
                    <span className="font-extrabold text-[#1e2638]">{itinerary.recommendedVehicle}</span>
                  </div>

                  <a
                    href={whatsappLink(
                      `Hello Dutta Travels, I am interested in "${itinerary.title}" (${itinerary.duration}). Please share detailed plan and best quote.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#182030] hover:bg-[#f57c00] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>⚡ Get Custom Yatra Plan</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SENIOR CITIZEN & ELDER-FRIENDLY PILGRIMAGE CARE */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              DEVOTEE CARE &amp; SAFETY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e2638] tracking-tight mt-1">
              Elder-Friendly Pilgrimage Experience
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Every detail is planned so senior citizens, families, and devotees travel with total serenity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#f57c00] flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">flight</span>
              </div>
              <h3 className="font-extrabold text-base text-[#1e2638]">Helipad Drop Standby</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct chauffeur drops at Phata, Sirsi, and Guptkashi helipads for Kedarnath helicopter boarding with luggage standby.
              </p>
            </div>

            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">airline_seat_recline_extra</span>
              </div>
              <h3 className="font-extrabold text-base text-[#1e2638]">Captain Chair Innova</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Reclining captain chairs, ample legroom, and smooth suspension across the winding mountain roads of Garhwal.
              </p>
            </div>

            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">timer</span>
              </div>
              <h3 className="font-extrabold text-base text-[#1e2638]">Unrushed Darshan</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Take your time for holy baths in Tapt Kund, Ganga Aarti in Haridwar, and parikramas. The driver is exclusively on standby for you.
              </p>
            </div>

            <div className="bg-[#f8faff] rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">verified</span>
              </div>
              <h3 className="font-extrabold text-base text-[#1e2638]">Garhwal Hill Experts</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Drivers with years of experience navigating Rishikesh, Joshimath, Rudraprayag, and Devprayag highways safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. COMMERCIAL FLEET SHOWCASE */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f4f7fe] py-14 sm:py-18 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
                CLEAN &amp; SANITIZED FLEET
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
                Rental Cabs for Pilgrimage &amp; Char Dham
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
                    href={whatsappLink(`Hello Dutta Travels, I want to book ${car.name} for Char Dham yatra.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#943e00] hover:bg-[#7a3200] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <span>⚡ Book {car.name} for Yatra</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CHAR DHAM FAQS ACCORDION */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-14 sm:py-16 border-t border-gray-100">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#f57c00]">
              DEVOTEE QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2638] mt-1">
              Char Dham &amp; Pilgrimage Yatra FAQs
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Key information on helicopter booking, biometric registration, weather windows, and temple timings.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {charDhamFaqs.map((faq, idx) => (
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
                <span className="material-symbols-outlined text-[28px]">temple_hindu</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
                  PLANNING KEDARNATH, BADRINATH OR HARIDWAR?
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Speak Directly with Lavkush Dutta
                </h3>
                <p className="text-xs text-gray-300">
                  Direct dispatch from Prem Nagar, Una HQ. Trusted mountain drivers, clean AC vehicles, and honest pricing.
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
                href={whatsappLink("Hello Lavkush Dutta, I want to book Char Dham Yatra (Kedarnath, Badrinath, Haridwar).")}
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
            <h3 className="text-2xl font-black text-[#1e2638]">Yatra Inquiry Received!</h3>
            <p className="text-sm text-gray-600">
              Your pilgrimage booking inquiry for <strong>{devoteeCount}</strong> departing from{" "}
              <strong>{pickupPoint}</strong> on <strong>{yatraDate}</strong> ({vehicleType}) has been
              received by our pilgrimage desk.
            </p>
            <p className="text-xs text-gray-500">
              Our team will send your customized temple itinerary and best quote on WhatsApp shortly.
            </p>
            <button
              onClick={() => setBookingConfirmed(false)}
              className="w-full py-3 rounded-xl bg-[#f57c00] text-white font-bold text-sm shadow-md hover:bg-[#e65100]"
            >
              Jai Badri Vishal &bull; Done
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
