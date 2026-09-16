import { business, whatsappLink } from "../data/business";
import WhatsAppIcon from "./WhatsAppIcon";

export default function CtaButtons({ whatsappMessage = "Hello Mandyal Travels, I need a cab quote", className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-space-md ${className}`}>
      <a
        href={`tel:${business.phonesTel[0]}`}
        className="inline-flex items-center gap-space-xs px-6 py-3.5 rounded-full text-on-primary font-label-lg shadow-md hover:shadow-lg transition-all bg-primary-container"
      >
        Call {business.phones[0]}
      </a>
      <a
        href={whatsappLink(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface font-label-lg shadow-sm hover:shadow-md transition-all"
      >
        <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" color="#25D366" />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}
