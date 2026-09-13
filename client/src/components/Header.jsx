import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { business, whatsappLink } from "../data/business";

const navLinks = [
  { path: "/", label: "Home", isHome: true },
  { path: "/tour-packages", label: "Tour Packages", line1: "Tour", line2: "Packages" },
  { path: "/char-dham", label: "Char Dham", line1: "Char", line2: "Dham" },
  { path: "/short-trips", label: "Short Trips", line1: "Short", line2: "Trips" },
  { path: "/about", label: "About Us", line1: "About", line2: "Us" },
  { path: "/contact", label: "Contact Us", line1: "Contact", line2: "Us" },
];

const serviceLinks = [
  { path: "/fleet", label: "Cab Rental Fleet" },
  { path: "/taxi-service-una", label: "Taxi Service in Una" },
  { path: "/taxi-service-amb", label: "Taxi Service in Amb" },
  { path: "/outstation-taxi", label: "Outstation Hill Cabs" },
  { path: "/airport-transfers", label: "Chandigarh Airport Transfers" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      {/* TOP NOTIFICATION BAR - Desktop only (Compact Height) */}
      <div className="hidden lg:block bg-[#1e2638] text-white/90 py-1.5 px-6 xl:px-10 text-[11.5px] border-b border-white/5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Location & Email */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-gray-200">
              <span className="material-symbols-outlined text-[15px] text-[#f57c00]">location_on</span>
              <span>Prem Nagar, Una, Himachal Pradesh</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-200">
              <span className="material-symbols-outlined text-[15px] text-[#f57c00]">mail</span>
              <a href={`mailto:${business.email}`} className="hover:text-white transition-colors">
                {business.email}
              </a>
            </div>
          </div>

          {/* Right: Phones & Govt Approved */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-gray-200">
              <span className="material-symbols-outlined text-[15px] text-[#f57c00]">call</span>
              <a href={`tel:${business.phonesTel[0]}`} className="hover:text-[#f57c00] transition-colors">
                {business.phones[0]}
              </a>
              <span className="text-gray-500">|</span>
              <a href={`tel:${business.phonesTel[1]}`} className="hover:text-[#f57c00] transition-colors">
                {business.phones[1]}
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-gray-200">
              <span className="material-symbols-outlined text-[15px] text-[#f57c00]">verified</span>
              <span>Govt. Approved Fleet</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 xl:px-10">
        <div className="max-w-[1440px] h-[62px] sm:h-[66px] mx-auto flex items-center justify-between gap-3">
          {/* LEFT: HAMBURGER (Mobile) + BRAND LOGO */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 -ml-1 text-gray-800 hover:bg-gray-100 rounded-xl flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[26px]">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>

            {/* LOGO (Immediately after hamburger on mobile, left on desktop) */}
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5">
              <img
                src="/logo.png"
                alt="Dutta Tour & Travels"
                className="h-9 sm:h-12 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-[16px] sm:text-[22px] text-[#1e2638] leading-tight tracking-tight">
                  Dutta Travels
                </span>
                <span className="font-bold text-[8.5px] sm:text-[11px] text-[#e65100] uppercase tracking-wider">
                  DUTTA MOTORS &bull; UNA
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP NAV LINKS CONTAINER (Light Capsule matching screenshot) */}
          <nav className="hidden lg:flex items-center bg-[#f4f7fe] rounded-2xl p-1.5 gap-0.5 xl:gap-1 shadow-sm">
            {/* Home Pill */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? "bg-[#f57c00] text-white shadow-sm"
                    : "text-gray-700 hover:text-[#f57c00]"
                }`
              }
            >
              Home
            </NavLink>

            {/* SERVICES DROPDOWN (Matches media_1789232108164.png) */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (window._servicesCloseTimer) clearTimeout(window._servicesCloseTimer);
                setServicesDropdownOpen(true);
              }}
              onMouseLeave={() => {
                window._servicesCloseTimer = setTimeout(() => {
                  setServicesDropdownOpen(false);
                }, 200);
              }}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`px-3.5 py-1 text-center flex flex-col items-center justify-center text-[12px] font-bold rounded-lg transition-colors leading-tight ${
                  servicesDropdownOpen ? "text-[#f57c00]" : "text-gray-700 hover:text-[#f57c00]"
                }`}
              >
                <span className="flex items-center gap-0.5">
                  <span>Cab</span>
                  <span className={`material-symbols-outlined text-[14px] transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`}>expand_more</span>
                </span>
                <span>Rental</span>
              </button>

              {/* SERVICES DROPDOWN POPUP (Dark Theme matching media_1789232108164.png) */}
              {servicesDropdownOpen && (
                <div
                  className="absolute top-full left-0 pt-2 w-64 z-50 animate-fadeIn"
                  onMouseEnter={() => {
                    if (window._servicesCloseTimer) clearTimeout(window._servicesCloseTimer);
                    setServicesDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    window._servicesCloseTimer = setTimeout(() => {
                      setServicesDropdownOpen(false);
                    }, 200);
                  }}
                >
                  <div className="bg-[#182030] text-white rounded-2xl shadow-2xl border border-white/10 p-4">
                    {/* SERVICES HEADING */}
                    <h3 className="text-sm font-black tracking-wider text-white mb-3 flex items-center justify-between">
                      <span>SERVICES</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f57c00]"></span>
                    </h3>
                    <div className="flex flex-col gap-2">
                      {serviceLinks.map((s) => (
                        <Link
                          key={s.label}
                          to={s.path}
                          onClick={() => {
                            setServicesDropdownOpen(false);
                            if (s.path === "/fleet" && window.location.pathname === "/") {
                              const el = document.getElementById("fleet");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          className="text-[13px] text-[#93c5fd] hover:text-white hover:translate-x-1 transition-all py-1 font-medium block"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other Navlinks */}
            {navLinks.filter((l) => !l.isHome).map((link, idx) => (
              <NavLink
                key={`${link.label}-${idx}`}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1 text-center flex flex-col items-center justify-center text-[12px] font-bold rounded-lg transition-colors leading-tight ${
                    isActive
                      ? "text-[#f57c00]"
                      : "text-gray-700 hover:text-[#f57c00]"
                  }`
                }
              >
                <span>{link.line1}</span>
                <span>{link.line2}</span>
              </NavLink>
            ))}
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Call Now */}
            <a
              href={`tel:${business.phonesTel[0]}`}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#edf2fe] hover:bg-[#e2eafc] text-[#1e2638] text-xs sm:text-sm font-bold transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[17px] text-[#b45309]">call</span>
              <span>Call Now</span>
            </a>

            {/* Desktop Direct Booking */}
            <a
              href={whatsappLink("Hello Dutta Travels, I would like to make a Direct Cab Booking")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-full bg-[#f57c00] hover:bg-[#e65100] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Direct Booking</span>
            </a>

            {/* Mobile Circular Phone Call Button */}
            <a
              href={`tel:${business.phonesTel[0]}`}
              title="Call Dutta Travels"
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#fdeedc] text-[#8f4200] flex items-center justify-center shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
            </a>

            {/* User Profile Button */}
            <Link
              to="/admin/login"
              title="Admin Portal"
              className="hidden sm:flex w-10 h-10 rounded-full bg-[#edf2fe] hover:bg-[#e2eafc] text-gray-700 items-center justify-center transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl px-4 py-4 flex flex-col gap-2 max-h-[85vh] overflow-y-auto">
          {/* Home Link */}
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActive
                  ? "bg-[#f57c00] text-white"
                  : "text-gray-700 hover:bg-orange-50 hover:text-[#f57c00]"
              }`
            }
          >
            Home
          </NavLink>

          {/* Mobile SERVICES Section (Matches media_1789232108164.png) */}
          <div className="bg-[#182030] rounded-2xl p-4 text-white my-1">
            <span className="block text-xs font-black tracking-wider text-white mb-2.5 border-b border-white/10 pb-1.5">
              SERVICES
            </span>
            <div className="flex flex-col gap-2 pl-1">
              {serviceLinks.map((s) => (
                <Link
                  key={`m-srv-${s.label}`}
                  to={s.path}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (s.path === "/fleet" && window.location.pathname === "/") {
                      const el = document.getElementById("fleet");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-[13px] text-[#93c5fd] hover:text-white font-medium py-1"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Other Navlinks */}
          {navLinks.filter((l) => !l.isHome).map((link, idx) => (
            <NavLink
              key={`m-${link.label}-${idx}`}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#f57c00] text-white"
                    : "text-gray-700 hover:bg-orange-50 hover:text-[#f57c00]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <a
              href={`tel:${business.phonesTel[0]}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-800 text-sm font-semibold"
            >
              <span className="material-symbols-outlined text-[18px] text-[#f57c00]">call</span>
              <span>Call Now: {business.phones[0]}</span>
            </a>

            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-[11px] text-gray-400 hover:text-gray-600 py-1"
            >
              Admin Portal Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
