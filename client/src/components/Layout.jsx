import Header from "./Header";
import Footer from "./Footer";
import { business, whatsappLink } from "../data/business";
import WhatsAppIcon from "./WhatsAppIcon";
import ChatbotWidget from "./ChatbotWidget";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body-md antialiased selection:bg-orange-100 selection:text-orange-900">
      <Header />
      {/* 
        Responsive top padding:
        Mobile (< lg): header is 70px (sm: 76px).
        Desktop (>= lg): header includes top bar (38px) + navbar (76px) = ~114px.
        Responsive bottom padding on mobile (pb-20 lg:pb-0) prevents sticky bottom bar from covering content.
      */}
      <main className="w-full pt-[62px] sm:pt-[66px] lg:pt-[96px] pb-20 lg:pb-0 flex-1">
        {children}
      </main>
      <Footer />

      {/* MOBILE STICKY CONVERSION BAR (Persistent 1-tap call & WhatsApp for phones) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.14)] flex items-center gap-3 safe-area-pb">
        <a
          href={`tel:${business.phonesTel[0]}`}
          className="flex-1 py-3.5 px-3 rounded-2xl bg-[#1e2638] hover:bg-[#28334b] text-white flex items-center justify-center gap-2 font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px] text-[#f57c00]">call</span>
          <span>Call {business.phones[0]}</span>
        </a>

        <a
          href={whatsappLink("Hello Mandyal Tour and Travels, I would like to book a cab.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3.5 px-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
        >
          <WhatsAppIcon className="w-5 h-5 fill-white flex-shrink-0" />
          <span>WhatsApp Cab</span>
        </a>
      </div>

      {/* 24/7 AI Chauffeur Desk Customer Assistance Chatbot */}
      <ChatbotWidget />
    </div>
  );
}
