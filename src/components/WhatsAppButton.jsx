// src/components/FixedWhatsApp.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function FixedWhatsApp() {
  const location = useLocation();

  // Admin pages me show mat karo
  if (location.pathname.startsWith("/admin")) return null;

  const phone = "+97143546677"; 
  const message = "Hi! I want to know more about your services.";
  const encodedMessage = encodeURIComponent(message);

  return (
    <div className="fixed bottom-5 right-5 flex items-center gap-3 z-50">
      {/* Text left side of icon */}
      <div className="bg-white text-gray-800 px-3 py-2 rounded shadow-md font-medium text-sm md:text-base">
        Need Help? Contact us
      </div>

      {/* WhatsApp Icon */}
      <a
        href={`https://wa.me/${phone}?text=${encodedMessage}`}
        target="_blank"
        rel="noreferrer"
        className="p-4 rounded-full shadow-lg bg-[#25D366] text-white hover:scale-105 transition-transform"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  );
}
