import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { business, whatsappLink, testimonials, fleet } from "../data/business";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "../data/schema";

const aboutFaqs = [
  {
    question: "Who owns and manages Dutta Tour & Travel?",
    answer:
      "Dutta Tour & Travel (also operating as Dutta Travels and Dutta Motors) is founded and actively managed by Mr. Lav Dutta. Based at Prem Nagar on the Una-Amb Road, the business personally oversees every booking, vehicle maintenance, and driver dispatch.",
  },
  {
    question: "Are all vehicles registered with commercial yellow plates and tourist permits?",
    answer:
      "Yes, 100% of our fleet operates with legal commercial yellow number plates, valid Himachal Pradesh and All-India Tourist Permits (AITP), comprehensive passenger insurance, and verified fitness certificates. We never use unauthorized private white-plate vehicles.",
  },
  {
    question: "What experience do your drivers have on Himachal hill roads?",
    answer:
      "Our chauffeurs have between 8 to 15+ years of dedicated mountain driving experience across Himachal Pradesh, Jammu & Kashmir, Uttarakhand, and Punjab. They are trained in high-altitude hairpin turns, winter snow driving, monsoon conditions, and polite, family-friendly customer service.",
  },
  {
    question: "Can Dutta Travels pick us up directly from Amb Andaura or Una Railway Station?",
    answer:
      "Yes! Direct railway station meet-and-greet is one of our primary specialties. We monitor train schedules for the New Delhi - Amb Andaura Vande Bharat Express and Himachal Express in real-time, ensuring your cab is parked and waiting outside the platform before you step off.",
  },
  {
    question: "Do you specialize in Devi Darshan and pilgrimage yatras?",
    answer:
      "Yes. A cornerstone of Dutta Travels is pilgrimage hospitality. We operate dedicated 6 Devi Darshan circuits covering Chintpurni, Jwala Ji, Baglamukhi, Kangra Brajeshwari, Chamunda Devi, and Naina Devi, as well as the 12 Jyotirlinga Mahayatra, Spiti Valley expeditions, Katra Vaishno Devi, and Uttarakhand Char Dham.",
  },
  {
    question: "How are trip quotes calculated without hidden charges?",
    answer:
      "We provide all-inclusive, transparent quotes upfront before trip confirmation. Your quote clearly accounts for vehicle rental, fuel, driver allowance, and can include state border taxes and tolls upon request. There are no sudden midnight surcharges or surprise extras at the end of your trip.",
  },
];

const coreValues = [
  {
    icon: "shield_with_heart",
    title: "Safety-First Mountain Mastery",
    desc: "Driving hill roads demands far more than basic steering. Our chauffeurs possess decades of expertise navigating steep gradients, monsoon ghats, fog passes, and winter roads with smooth clutch and brake discipline.",
  },
  {
    icon: "verified",
    title: "100% Govt. Approved Commercial Fleet",
    desc: "Every cab carries valid Himachal commercial yellow plates, All-India Tourist Permits, passenger fitness certification, and comprehensive insurance. Zero private vehicle compromises.",
  },
  {
    icon: "receipt_long",
    title: "Zero Hidden Surcharges",
    desc: "Honest, transparent pricing with no midnight surge traps or hidden driver demands. What we quote on WhatsApp or phone is exactly what you pay for the agreed itinerary.",
  },
  {
    icon: "timer",
    title: "Punctual Train & Flight Tracking",
    desc: "Specialized meet-and-greet at Amb Andaura (AADR), Una Himachal (UHL), and Chandigarh Airport (IXC). We track delay updates so your chauffeur is always ready at the gate.",
  },
  {
    icon: "elderly",
    title: "Pilgrim & Family First Empathy",
    desc: "We treat our travelers like family. Drivers gladly pause for children, senior citizens, photo spots, and clean highway dhabas, offering courteous support during temple yatras.",
  },
  {
    icon: "support_agent",
    title: "Direct Owner Oversight 24/7",
    desc: "When you book with Dutta Travels, you have direct phone and WhatsApp access to founder Lav Dutta. No robotic call centres or unhelpful automated bots.",
  },
];

const milestones = [
  {
    year: "10+ Years",
    title: "Mountain Expertise",
    desc: "A decade of dependable commercial driving across Himachal Pradesh, Punjab, and Uttarakhand hills.",
  },
  {
    year: "990+",
    title: "Tours & Cab Rentouts",
    desc: "Successfully dispatched outstation round-trips, airport runs, and multi-day hill holidays.",
  },
  {
    year: "660+",
    title: "Devi Darshan Pilgrims",
    desc: "Devotees safely escorted across Himachal's Shaktipeeths and sacred shrines with family warmth.",
  },
  {
    year: "24 / 7",
    title: "Round-The-Clock Service",
    desc: "Instant dispatch desk for train arrivals, urgent medical transfers, and scheduled holiday departures.",
  },
];

export default function About() {
  const seo = seoConfig.about;
  const crumbs = [{ name: "Home", path: "/" }, { name: "About Us" }];
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
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
          faqSchema(aboutFaqs),
        ]}
      />

      <Breadcrumbs items={crumbs} />

      {/* HERO SECTION */}
      <section className="relative bg-[#182030] text-white pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f57c00_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-[#f57c00] text-xs font-extrabold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Rooted in Prem Nagar, Una &bull; Govt. Approved Fleet</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
              A Decade of Trust, Safety &amp; Mountain Hospitality in Himachal
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
              Founded and operated by <strong className="text-white font-semibold">Lav Dutta</strong>,{" "}
              <span className="text-[#f57c00] font-semibold">Dutta Tour &amp; Travel (Dutta Motors)</span> has grown
              from a local Una taxi service into Himachal&apos;s most reliable transport partner for pilgrims,
              holidaying families, and daily outstation commuters.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`tel:${business.phonesTel[0]}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>Speak with Lav Dutta</span>
              </a>

              <a
                href={whatsappLink("Hello Lav Ji, I would like to know more about Dutta Tour & Travel services and book a cab.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Instant WhatsApp Inquiry</span>
              </a>

              <Link
                to="/fleet"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 transition-all"
              >
                <span>View Cab Fleet</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-white border-b border-gray-100 py-8 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {milestones.map((m, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-black text-[#1e2638] mb-1">
                  {m.year}
                </span>
                <span className="text-sm font-bold text-[#f57c00] mb-0.5">
                  {m.title}
                </span>
                <span className="text-xs text-gray-500 max-w-[200px]">
                  {m.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE STORY & FOUNDER VISION */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story text */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#f57c00] block mb-2">
                  Our Origins &amp; Heritage
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e2638] leading-tight">
                  Born at the Gateway of Devbhoomi Himachal
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Una is the historic gateway where the vast northern plains meet the sacred Shivalik foothills of Himachal
                Pradesh. Every day, hundreds of travelers step off trains at <strong>Una Himachal (UHL)</strong> and{" "}
                <strong>Amb Andaura (AADR)</strong>, or arrive along the Una-Amb Highway seeking blessings at Maa Chintpurni,
                Jwala Ji, and Kangra Devi, or heading up towards Dharamshala, Kullu-Manali, and Shimla.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Over a decade ago, <strong>Lav Dutta</strong> recognized a significant gap in the region: plain taxi
                aggregators and inexperienced casual drivers frequently struggled with steep mountain inclines, unexpected
                weather shifts, and long hairpin ghats. Senior pilgrims and families traveling with infants often found
                themselves rushed or dealing with surprise hidden charges midway through their journey.
              </p>

              <div className="bg-white p-5 rounded-2xl border-l-4 border-[#f57c00] shadow-sm">
                <p className="text-gray-800 font-medium italic text-sm sm:text-base leading-relaxed">
                  &ldquo;When a family boards our cab for a pilgrimage or a hill holiday, they are placing their lives and
                  sacred moments in our hands. Our promise is simple: safe, courteous driving, clean sanitized vehicles, and
                  hospitality that makes you feel like you are traveling with your own family.&rdquo;
                </p>
                <span className="block mt-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  — Lav Dutta, Founder &amp; Managing Director
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Today, operating as <strong>Dutta Tour &amp; Travel</strong> and <strong>Dutta Motors</strong> from our
                conveniently situated Prem Nagar headquarters (adjacent Punjab &amp; Sind Bank), we maintain a fleet of modern,
                commercial yellow-plate vehicles driven by certified hill chauffeurs who live and breathe Himachal&apos;s mountain roads.
              </p>
            </div>

            {/* Office & Verification Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full pointer-events-none -z-0" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="/logo.png"
                      alt="Dutta Tour & Travels"
                      className="h-12 w-auto object-contain bg-gray-50 rounded-xl p-1 border border-gray-200"
                    />
                    <div>
                      <h3 className="font-extrabold text-lg text-[#1e2638]">Dutta Tour &amp; Travel</h3>
                      <p className="text-xs font-bold text-[#f57c00] uppercase tracking-wide">
                        DUTTA MOTORS &bull; UNA (H.P.)
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                    <span>Verified Himachal Commercial Operator</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-xs sm:text-sm text-gray-600 divide-y divide-gray-100 relative z-10">
                  <div className="pt-2 flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#f57c00] text-[20px] shrink-0 mt-0.5">
                      person
                    </span>
                    <div>
                      <strong className="text-gray-900 block">Founder &amp; Owner</strong>
                      <span>Mr. Lav Dutta</span>
                    </div>
                  </div>

                  <div className="pt-3 flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#f57c00] text-[20px] shrink-0 mt-0.5">
                      location_on
                    </span>
                    <div>
                      <strong className="text-gray-900 block">Head Office &amp; Cab Yard</strong>
                      <span>{business.location.fullAddress}</span>
                      <span className="block text-[11px] text-gray-500 mt-0.5">
                        (Adjacent Punjab &amp; Sind Bank, Una-Amb Highway)
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#f57c00] text-[20px] shrink-0 mt-0.5">
                      call
                    </span>
                    <div>
                      <strong className="text-gray-900 block">24/7 Booking &amp; Dispatch Line</strong>
                      <div className="flex flex-wrap gap-2 text-gray-800 font-semibold mt-0.5">
                        <a href={`tel:${business.phonesTel[0]}`} className="hover:text-[#f57c00]">
                          {business.phones[0]}
                        </a>
                        <span>|</span>
                        <a href={`tel:${business.phonesTel[1]}`} className="hover:text-[#f57c00]">
                          {business.phones[1]}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#f57c00] text-[20px] shrink-0 mt-0.5">
                      mail
                    </span>
                    <div>
                      <strong className="text-gray-900 block">Official Business Email</strong>
                      <a href={`mailto:${business.email}`} className="text-gray-700 hover:text-[#f57c00]">
                        {business.email}
                      </a>
                    </div>
                  </div>

                  <div className="pt-3 flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#f57c00] text-[20px] shrink-0 mt-0.5">
                      schedule
                    </span>
                    <div>
                      <strong className="text-gray-900 block">Operating Hours</strong>
                      <span className="text-emerald-700 font-semibold">24 Hours / 7 Days a Week (Year-Round)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2 relative z-10">
                  <a
                    href="https://maps.google.com/?q=Prem+Nagar+Una+Himachal+Pradesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#f57c00]">directions</span>
                    <span>Get Directions to Prem Nagar Office</span>
                  </a>

                  <a
                    href={`tel:${business.phonesTel[0]}`}
                    className="w-full text-center py-2.5 px-4 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    Call Owner Directly: {business.phones[0]}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES / WHY CHOOSE US */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#f57c00] block mb-2">
              Our Non-Negotiable Standards
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e2638] leading-tight">
              Why Thousands of Travelers Trust Dutta Travels
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3">
              We combine strict safety standards, legal compliance, and genuine hill hospitality to ensure
              every journey is memorable and trouble-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all flex flex-col gap-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#f57c00] flex items-center justify-center group-hover:bg-[#f57c00] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[24px]">{val.icon}</span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-[#1e2638]">{val.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET SHOWCASE STRIP */}
      <section className="py-16 bg-[#182030] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#f57c00] block mb-2">
                Commercial Fleet Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Meticulously Maintained for Himachal Hill Terrain
              </h2>
              <p className="text-sm text-gray-400 mt-2 max-w-xl">
                Every vehicle in our fleet is commercially registered, cleaned and vacuumed before every dispatch, and
                equipped with dual AC, heating, and mountain luggage carriers.
              </p>
            </div>
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white text-xs font-bold transition-all shadow-md shrink-0"
            >
              <span>Explore Complete Fleet</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleet.slice(0, 3).map((car) => (
              <div
                key={car.slug}
                className="bg-[#20293d] rounded-2xl overflow-hidden border border-white/5 flex flex-col group hover:border-[#f57c00]/50 transition-all"
              >
                <div className="relative h-48 overflow-hidden bg-gray-900">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-[#1e2638]/90 backdrop-blur-sm text-orange-400 text-[11px] font-bold px-2.5 py-1 rounded-md border border-white/10">
                    {car.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-base text-white mb-2">{car.name}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {car.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-orange-400">group</span>
                      {car.seats}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-orange-400">luggage</span>
                      {car.bags}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-orange-400">ac_unit</span>
                      {car.comfort}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL CUSTOMER TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#f57c00] block mb-2">
              Verified Pilgrim &amp; Tourist Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e2638] leading-tight">
              Real Experiences with Lav Dutta &amp; Team
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3">
              Read how travelers and families describe our chauffeurs, vehicle condition, and personal warmth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]">
                        star
                      </span>
                    ))}
                    <span className="text-xs font-bold text-gray-500 ml-1.5">5.0 Star Experience</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs ${t.color}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1e2638]">{t.name}</h3>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Verified Passenger
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#f57c00] block mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1e2638]">
              Everything You Need to Know About Dutta Travels
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {aboutFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-2xl transition-all ${
                    isOpen ? "border-[#f57c00] bg-orange-50/20" : "border-gray-200 bg-white"
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
                    <div className="px-5 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-orange-100/50 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HIGH-CONVERTING BOTTOM CTA */}
      <section className="bg-gradient-to-br from-[#182030] to-[#1e2638] text-white py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-[#f57c00] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            Govt. Approved Himachal Tourist Cabs
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white max-w-2xl mx-auto leading-tight mb-4">
            Plan Your Himachal Journey with Dutta Travels Today
          </h2>

          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Call founder Lav Dutta directly or message us on WhatsApp for guaranteed on-time pickups, certified hill
            chauffeurs, and honest upfront quotes with zero surprises.
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
              href={whatsappLink("Hello Lav Ji, I am on the About Us page and would like to book a cab.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Chat on WhatsApp</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 transition-all"
            >
              <span>Contact Page</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

