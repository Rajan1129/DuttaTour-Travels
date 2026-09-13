import { Link } from "react-router-dom";
import { business } from "../data/business";

export default function Footer() {
  return (
    <footer className="w-full bg-[#182030] text-gray-300 pt-16 pb-10 border-t border-gray-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Dutta Tour & Travels Logo"
                className="h-11 w-auto object-contain bg-white rounded-xl p-1"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white">Dutta Travels</span>
                <span className="font-bold text-[10px] text-[#f57c00] uppercase tracking-wider">DUTTA MOTORS &bull; UNA</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{business.description}</p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-full w-fit">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              <span>Regd. Himachal Tourism Transporter</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">Services</h3>
            <ul className="flex flex-col gap-2 text-xs text-gray-400">
              <li><Link to="/fleet" className="hover:text-[#f57c00] transition-colors">Cab Rental Fleet</Link></li>
              <li><Link to="/taxi-service-una" className="hover:text-[#f57c00] transition-colors">Taxi Service in Una</Link></li>
              <li><Link to="/taxi-service-amb" className="hover:text-[#f57c00] transition-colors">Taxi Service in Amb</Link></li>
              <li><Link to="/outstation-taxi" className="hover:text-[#f57c00] transition-colors">Outstation Hill Cabs</Link></li>
              <li><Link to="/airport-transfers" className="hover:text-[#f57c00] transition-colors">Chandigarh Airport Transfers</Link></li>
            </ul>
          </div>

          {/* Col 3: Tours & Travel */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">Tours &amp; Travel</h3>
            <ul className="flex flex-col gap-2 text-xs text-gray-400">
              <li><Link to="/tour-packages" className="hover:text-[#f57c00] transition-colors">Tour Packages</Link></li>
              <li><Link to="/char-dham" className="hover:text-[#f57c00] transition-colors">Char Dham &amp; Devi Darshan</Link></li>
              <li><Link to="/short-trips" className="hover:text-[#f57c00] transition-colors">Short Trips &amp; Day Tours</Link></li>
              <li><Link to="/destinations" className="hover:text-[#f57c00] transition-colors">Destinations &amp; Routes</Link></li>
              <li><Link to="/amb-andaura-railway-station-taxi" className="hover:text-[#f57c00] transition-colors">Amb Andaura Railway Taxi</Link></li>
              <li><Link to="/travel-guide" className="hover:text-[#f57c00] transition-colors">Himachal Travel Guide</Link></li>
            </ul>
          </div>

          {/* Col 4: Office & Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">Office &amp; Bookings</h3>
            <div className="flex flex-col gap-2 text-xs text-gray-400">
              <span className="leading-relaxed">{business.location.fullAddress}</span>
              {business.phones.map((phone, i) => (
                <a key={phone} href={`tel:${business.phonesTel[i]}`} className="hover:text-[#f57c00] font-semibold text-white transition-colors block">
                  {phone}
                </a>
              ))}
              <a href={`mailto:${business.email}`} className="hover:text-[#f57c00] transition-colors">{business.email}</a>
              <div className="flex items-center gap-3 pt-2">
                <Link to="/about" className="hover:text-[#f57c00] transition-colors">About Us</Link>
                <span>&bull;</span>
                <Link to="/contact" className="hover:text-[#f57c00] transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 border-t border-gray-800/80">
          <p>&copy; {new Date().getFullYear()} {business.name} ({business.legalTradeNames.join(" / ")}, Una, HP). All rights reserved.</p>
          <p className="text-[11px] text-gray-500">Certified Mountain Chauffeurs &bull; Commercial Yellow Plate Fleet</p>
        </div>
      </div>
    </footer>
  );
}
