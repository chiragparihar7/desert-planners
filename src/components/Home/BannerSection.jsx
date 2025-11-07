import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Banner() {
  // 🖼️ Your banner images (from your uploads)
  const slides = [
    {
      image: "/Group-1.png", // Burj Al Arab
      title: "Discover Dubai Like Never Before",
      subtitle: "Experience luxury tours and make unforgettable memories.",
      cta: "Explore Tours",
      link: "/tours",
    },
    {
      image: "/Group-2.png", // Mosque
      title: "A Blend of Heritage & Modernity",
      subtitle: "Witness the architectural marvels of the UAE.",
      cta: "Book Your Experience",
      link: "/tours",
    },
    {
      image: "/Group-3.png", // Dubai Marina
      title: "Explore The City of Gold",
      subtitle: "Luxury cruises, desert safaris & iconic skyline views.",
      cta: "View All Packages",
      link: "/tours",
    },
  ];

  const [current, setCurrent] = useState(0);

  // 🔁 Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // ⬅️➡️ Manual navigation
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[650px] overflow-hidden">
      {/* 🖼️ Slide Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/60"></div>

          {/* Text Content */}
          {index === current && (
            <div className="absolute inset-0 flex justify-center items-center text-white text-center px-6">
              <div className="max-w-3xl animate-fadeInUp">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl mb-6 opacity-90 max-w-2xl mx-auto drop-shadow-md">
                  {slide.subtitle}
                </p>
                <a
                  href={slide.link}
                  className="px-6 py-3 bg-[#e82429] hover:bg-[#91181b] rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:scale-105 inline-block"
                >
                  {slide.cta}
                </a>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* ⬅️➡️ Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 🔘 Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current ? "bg-[#e82429] scale-125" : "bg-white/60"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
