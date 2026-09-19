import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  findBestBotAnswer,
  getGreetingResponse,
  QUICK_SUGGESTIONS,
  BOT_NAME,
  OWNER_NAME,
  PRIMARY_PHONE,
  WHATSAPP_NUMBER,
} from "../data/chatbotKnowledge";
import { whatsappLink, recordBookingInquiry } from "../data/business";
import WhatsAppIcon from "./WhatsAppIcon";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Booking Form State inside chat
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll inside chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Initialize with greeting
  useEffect(() => {
    const greeting = getGreetingResponse();
    setMessages([
      {
        id: "msg-welcome",
        sender: "bot",
        text: greeting.answer,
        suggestions: greeting.relatedSuggestions,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    setHasInteracted(true);
    setInputQuery("");

    // Add user message
    const userMsgId = "user-" + Date.now();
    const newMessages = [
      ...messages,
      {
        id: userMsgId,
        sender: "user",
        text: query,
        timestamp: new Date(),
      },
    ];
    setMessages(newMessages);
    setIsTyping(true);

    // Simulate natural thinking delay
    setTimeout(() => {
      const botResponse = findBestBotAnswer(query);
      setMessages((prev) => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          sender: "bot",
          title: botResponse.title,
          text: botResponse.answer,
          action: botResponse.action,
          suggestions: botResponse.relatedSuggestions,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.phone.trim() || !bookingData.drop.trim()) return;

    // Record directly in Admin Portal Dispatch Desk
    recordBookingInquiry({
      name: bookingData.name.trim() || "Website Guest (Chatbot)",
      phone: bookingData.phone.trim(),
      pickup: bookingData.pickup.trim() || "Una / Amb Area",
      drop: bookingData.drop.trim(),
      car: "Discuss on Call",
      date: bookingData.date,
      notes: "Inquiry via AI Chatbot Assistant",
    });

    setBookingSuccess(true);
    setShowBookingForm(false);

    // Add confirmation message in chat
    const confirmMsg = `✅ **Booking Inquiry Confirmed!**\n\nThank you **${
      bookingData.name.trim() || "Guest"
    }**! Your journey details (**${bookingData.pickup.trim() || "Una/Amb"} → ${
      bookingData.drop.trim()
    }** on **${bookingData.date}**) have been dispatched to **${OWNER_NAME}'s** desk.\n\nOur team will call you shortly at **${bookingData.phone.trim()}** to confirm your vehicle and best fare.`;

    const whatsAppActionText = `Hello ${OWNER_NAME}, I submitted a cab booking via chatbot:\n• Name: ${bookingData.name || "Guest"}\n• Phone: ${bookingData.phone}\n• Route: ${bookingData.pickup} to ${bookingData.drop}\n• Date: ${bookingData.date}`;

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: "bot-confirm-" + Date.now(),
          sender: "bot",
          title: "Inquiry Dispatched",
          text: confirmMsg,
          action: {
            type: "whatsapp",
            label: "Open in WhatsApp for Instant Token",
            query: whatsAppActionText,
          },
          timestamp: new Date(),
        },
      ]);
      // Reset form
      setBookingData({
        name: "",
        phone: "",
        pickup: "",
        drop: "",
        date: new Date().toISOString().split("T")[0],
      });
    }, 300);
  };

  // Helper to format basic bold and bullet formatting
  const renderFormattedText = (raw) => {
    if (!raw) return null;
    const lines = raw.split("\n");
    return lines.map((line, idx) => {
      // Bold syntax regex
      const formattedLine = line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-extrabold text-gray-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-1">
            <span className="text-[#f57c00] font-black text-sm">•</span>
            <span className="flex-1">{formattedLine}</span>
          </div>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <div key={idx} className="my-1 pl-1">
            {formattedLine}
          </div>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="my-0.5 leading-relaxed">
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING TRIGGER BUTTON (Bottom-Right, safe above mobile footer) */}
      {/* ========================================================================= */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
        {!isOpen && !hasInteracted && (
          <div className="mb-2 bg-[#182030] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-orange-500/30 flex items-center gap-1.5 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>24/7 AI Chauffeur Help</span>
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasInteracted(true);
          }}
          aria-label="Open 24/7 Customer Chatbot"
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform active:scale-95 ${
            isOpen
              ? "bg-[#182030] text-white rotate-90 border-2 border-white/20"
              : "bg-gradient-to-tr from-[#f57c00] to-[#ff9800] text-white hover:scale-105 shadow-orange-500/40"
          }`}
        >
          <span className="material-symbols-outlined text-[28px] sm:text-[32px]">
            {isOpen ? "close" : "chat"}
          </span>
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. CHAT MODAL WINDOW */}
      {/* ========================================================================= */}
      {isOpen && (
        <div className="fixed bottom-36 sm:bottom-24 right-3 sm:right-6 z-50 w-[94vw] sm:w-[410px] max-w-[420px] h-[550px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#182030] via-[#1e2638] to-[#243048] text-white px-4 py-3.5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Mandyal Tour and Travels Logo"
                  className="w-10 h-10 rounded-xl bg-white/10 p-1 object-contain border border-white/15"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#182030] rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm text-white tracking-wide flex items-center gap-1">
                  {BOT_NAME}
                </span>
                <span className="text-[11px] text-orange-300 flex items-center gap-1 font-medium">
                  <span>Online 24/7 &bull; {OWNER_NAME} Desk</span>
                </span>
              </div>
            </div>

            {/* Quick action buttons in header */}
            <div className="flex items-center gap-1">
              <a
                href={`tel:${PRIMARY_PHONE.replace(/\s+/g, "")}`}
                title="Direct Phone Call"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-[#f57c00]">call</span>
              </a>
              <a
                href={whatsappLink(`Hello ${OWNER_NAME}, I need cab assistance.`)}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Direct"
                className="w-8 h-8 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 flex items-center justify-center text-emerald-400 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 fill-emerald-400" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">expand_more</span>
              </button>
            </div>
          </div>

          {/* QUICK ACTION BAR: BOOK CAB TAB / CONTACT */}
          <div className="bg-[#f4f7fe] px-3 py-1.5 border-b border-gray-200 flex items-center justify-between text-xs">
            <button
              onClick={() => setShowBookingForm(!showBookingForm)}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                showBookingForm
                  ? "bg-[#f57c00] text-white"
                  : "bg-white text-gray-700 hover:bg-orange-50 hover:text-[#f57c00] border border-gray-200"
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">local_taxi</span>
              <span>{showBookingForm ? "Close Booking" : "⚡ Instant Cab Booking"}</span>
            </button>

            <span className="text-[11px] text-gray-500 font-medium">
              Prem Nagar, Una HQ
            </span>
          </div>

          {/* INLINE QUICK BOOKING FORM (IF TOGGLED) */}
          {showBookingForm && (
            <form
              onSubmit={handleBookingSubmit}
              className="bg-amber-50/60 p-3.5 border-b border-amber-200/70 flex flex-col gap-2 animate-in slide-in-from-top duration-200"
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-black text-[#1e2638] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#f57c00]">
                    calendar_month
                  </span>
                  Quick Fare Request &amp; Booking
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  Zero Waiting Fee
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  className="bg-white rounded-lg px-2.5 py-1.5 text-xs font-medium border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#f57c00]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  className="bg-white rounded-lg px-2.5 py-1.5 text-xs font-medium border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#f57c00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Pickup (e.g. Una Stn)"
                  value={bookingData.pickup}
                  onChange={(e) => setBookingData({ ...bookingData, pickup: e.target.value })}
                  className="bg-white rounded-lg px-2.5 py-1.5 text-xs font-medium border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#f57c00]"
                />
                <input
                  type="text"
                  required
                  placeholder="Destination (e.g. 6 Devi)"
                  value={bookingData.drop}
                  onChange={(e) => setBookingData({ ...bookingData, drop: e.target.value })}
                  className="bg-white rounded-lg px-2.5 py-1.5 text-xs font-medium border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#f57c00]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs rounded-lg shadow transition-all active:scale-[0.98] flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">send</span>
                  <span>Submit Inquiry to {OWNER_NAME}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="px-2.5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* MESSAGES STREAM */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-[#f57c00] to-[#e65100] text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-150 rounded-bl-none"
                  }`}
                >
                  {msg.title && (
                    <div className="font-extrabold text-[12px] sm:text-[13px] text-[#1e2638] mb-1.5 border-b border-gray-150 pb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#f57c00]">
                        info
                      </span>
                      <span>{msg.title}</span>
                    </div>
                  )}

                  <div className="whitespace-pre-line leading-relaxed">
                    {msg.sender === "bot" ? renderFormattedText(msg.text) : msg.text}
                  </div>

                  {/* Message Action Button (Call or WhatsApp) */}
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-gray-150 flex flex-col gap-1.5">
                      {msg.action.type === "whatsapp" && (
                        <a
                          href={whatsappLink(msg.action.query || msg.action.label)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                          <span>{msg.action.label}</span>
                        </a>
                      )}
                      {msg.action.type === "tel" && (
                        <a
                          href={`tel:${msg.action.tel}`}
                          className="w-full py-2 px-3 bg-[#f57c00] hover:bg-[#e65100] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
                        >
                          <span className="material-symbols-outlined text-[16px]">call</span>
                          <span>{msg.action.label}</span>
                        </a>
                      )}
                      {msg.action.type === "page" && (
                        <Link
                          to={msg.action.path}
                          onClick={() => setIsOpen(false)}
                          className="w-full py-2 px-3 bg-[#1e2638] hover:bg-[#2c3852] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                        >
                          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                          <span>{msg.action.label} &rarr;</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                {/* Subtext suggestions chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 pl-1 max-w-[90%]">
                    {msg.suggestions.map((sugg) => (
                      <button
                        key={sugg.id}
                        type="button"
                        onClick={() => handleSendMessage(sugg.query)}
                        className="text-[11px] bg-white hover:bg-orange-50 text-gray-700 hover:text-[#f57c00] font-semibold px-2.5 py-1 rounded-full border border-gray-200 shadow-2xs transition-all"
                      >
                        {sugg.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-2 rounded-2xl rounded-bl-none w-16 text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f57c00] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#f57c00] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#f57c00] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* FOOTER QUICK PROMPT CHIPS */}
          <div className="px-3 py-1.5 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_SUGGESTIONS.slice(0, 4).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSendMessage(item.query)}
                className="whitespace-nowrap text-[10px] sm:text-[11px] bg-gray-100 hover:bg-orange-50 hover:text-[#f57c00] text-gray-700 font-bold px-2.5 py-1 rounded-lg transition-colors border border-gray-200/80"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* INPUT BAR */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything (6 Devi, Spiti, Fares...)"
              className="flex-1 bg-[#f4f7fe] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f57c00]"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              aria-label="Send message"
              className="w-9 h-9 rounded-xl bg-[#f57c00] hover:bg-[#e65100] disabled:bg-gray-200 disabled:text-gray-400 text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
