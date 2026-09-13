import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { destinations } from "./data/business";
import Home from "./pages/Home";
import TaxiServices from "./pages/TaxiServices";
import TaxiServiceUna from "./pages/TaxiServiceUna";
import TaxiServiceAmb from "./pages/TaxiServiceAmb";
import AmbAndauraRailwayStation from "./pages/AmbAndauraRailwayStation";
import OutstationTaxi from "./pages/OutstationTaxi";
import AirportTransfers from "./pages/AirportTransfers";
import Fleet from "./pages/Fleet";
import TourPackages from "./pages/TourPackages";
import CharDham from "./pages/CharDham";
import ShortTrips from "./pages/ShortTrips";
import Destinations from "./pages/Destinations";
import RouteTaxi from "./pages/RouteTaxi";
import TravelGuide from "./pages/TravelGuide";
import TravelGuideArticle from "./pages/TravelGuideArticle";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/taxi-services" element={<TaxiServices />} />
      <Route path="/taxi-service-una" element={<TaxiServiceUna />} />
      <Route path="/taxi-service-amb" element={<TaxiServiceAmb />} />
      <Route path="/amb-andaura-railway-station-taxi" element={<AmbAndauraRailwayStation />} />
      <Route path="/outstation-taxi" element={<OutstationTaxi />} />
      <Route path="/airport-transfers" element={<AirportTransfers />} />
      <Route path="/fleet" element={<Fleet />} />
      <Route path="/tour-packages" element={<TourPackages />} />
      <Route path="/char-dham" element={<CharDham />} />
      <Route path="/short-trips" element={<ShortTrips />} />
      <Route path="/destinations" element={<Destinations />} />
      {/* Reusable route-page architecture: each entry in data/business.js
          `destinations` automatically gets a /una-to-<slug> page, driven by
          data/seoConfig.js routeTaxiSeo. Add a destination there to add a page. */}
      {destinations.map((d) => (
        <Route key={d.slug} path={`/${d.slug}`} element={<RouteTaxi slug={d.slug} />} />
      ))}
      <Route path="/travel-guide" element={<TravelGuide />} />
      <Route path="/travel-guide/:slug" element={<TravelGuideArticle />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/articles" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}
