import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { business, destinations, whatsappLink } from "../data/business";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema } from "../data/schema";

export default function Destinations() {
  const seo = seoConfig.destinations;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Destinations & Routes" }];

  return (
    <Layout>
      <SEO
        path={seo.path}
        title="Popular Taxi Routes & Outstation Destinations from Una | Mandyal Tour and Travels"
        description="Explore popular outstation taxi routes from Una, Amb Andaura Railway Station, and Himachal Pradesh. Best fares for Shimla, Manali, Dharamshala, Chandigarh, and Katra."
        structuredData={[localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#182030] to-[#1e2638] text-white py-12 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl flex flex-col gap-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f57c00] text-white text-xs font-black shadow-md self-start">
              <span className="material-symbols-outlined text-[15px]">explore</span>
              <span>VERIFIED OUTSTATION HILL ROUTES &bull; MANDYAL TOUR AND TRAVELS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Popular Taxi Routes from Una &amp; Amb
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Serving frequent dedicated departures from Una, Amb Andaura Railway Station, Chandigarh,
              Nangal, and Hoshiarpur into Himachal Pradesh and North India.
            </p>
          </div>
        </div>
      </section>

      {/* Routes Grid */}
      <section className="w-full bg-[#fbfcfe] py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                to={`/${dest.slug}`}
                className="group bg-white rounded-2xl p-3.5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-3 border border-gray-100"
              >
                {/* Photo with KM Badge */}
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gray-900">
                  <img
                    src={dest.image}
                    alt={dest.routeTitle || dest.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white text-xs font-black px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1 shadow-md">
                    <span className="material-symbols-outlined text-[13px] text-[#f57c00]">navigation</span>
                    <span>{dest.distanceKm} KM</span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-[#182030]/85 backdrop-blur-sm text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow border border-white/10">
                    Best Rate Guaranteed
                  </div>
                </div>

                {/* Details */}
                <div className="px-1 flex flex-col gap-1.5 pb-1">
                  <div className="flex items-center justify-between">
                    <h2 className="font-extrabold text-base text-[#1e2638] group-hover:text-[#f57c00] transition-colors leading-snug">
                      {dest.name}
                    </h2>
                    <span className="w-7 h-7 rounded-full bg-orange-50 text-[#f57c00] group-hover:bg-[#f57c00] group-hover:text-white transition-all flex items-center justify-center text-sm font-black flex-shrink-0">
                      &rarr;
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium line-clamp-2">{dest.summary}</p>
                  <span className="text-[11px] text-[#f57c00] font-bold mt-1">
                    {dest.stops}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Tour packages banner link */}
          <div className="mt-12 p-6 rounded-3xl bg-[#f4f7fe] border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-[#1e2638]">Looking for Multi-Day Holiday Itineraries?</h3>
              <p className="text-xs text-gray-600">
                Explore our Devi Darshan circuits, 3N/4D Shimla-Manali, and Grand Himachal tours.
              </p>
            </div>
            <Link
              to="/tour-packages"
              className="px-6 py-2.5 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm whitespace-nowrap shadow-md"
            >
              Browse Tour Packages &rarr;
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
