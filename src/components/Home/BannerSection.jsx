import React, { useState, useEffect } from "react";
import DataService from "../../config/DataService";
import { API } from "../../config/API";
import "./Banner.css";

export default function Banner() {
  const api = DataService();
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch banners from backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get(API.GET_BANNERS);
        // filter only visible banners & sort by order
        const filtered = (res.data || [])
          .filter((b) => b.visible)
          .sort((a, b) => a.order - b.order);
        setSlides(filtered);
      } catch (err) {
        console.error("❌ Error fetching banners:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // 🔁 Auto slide rotation
  useEffect(() => {
    if (!slides.length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading) {
    return (
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[650px] bg-gray-200 animate-pulse flex items-center justify-center text-gray-500">
        Loading banner...
      </section>
    );
  }

  if (!slides.length) {
    return (
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[650px] bg-gray-100 flex items-center justify-center text-gray-500">
        No banners available
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[650px]">
        {slides.map((slide, index) => (
          <div
            key={slide._id || index}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* ✅ Responsive Image from DB */}
            <picture>
              <source srcSet={slide.mobileImage} media="(max-width: 768px)" />
              <source srcSet={slide.desktopImage} media="(min-width: 769px)" />
              <img
                src={slide.desktopImage}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </picture>

            {/* ✅ Text Content (unchanged design) */}
            {index === current && (
              <div className="absolute bottom-10 sm:bottom-16 left-0 w-full flex justify-start px-4 sm:px-8">
                <div className="max-w-[1200px] w-full mx-auto flex flex-col items-start text-white animate-fadeInUp">
                  <p className="bg-gradient-to-r from-[#e82429]/80 to-[#ff5f5f]/80 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-medium tracking-wide mb-3 sm:mb-4 shadow-md border border-white/10">
                    {slide.subtitle}
                  </p>

                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-3 sm:mb-5 leading-tight drop-shadow-2xl tracking-wide text-left">
                    {slide.title}
                  </h2>

                  <p className="text-sm sm:text-lg md:text-xl font-medium mb-4 sm:mb-6 text-left">
                    <span className="text-[#e82429] font-semibold">
                      Starting from{" "}
                    </span>
                    <span className="text-[#ffffff] font-extrabold">
                      AED {slide.price}
                    </span>
                  </p>

                  {slide.cta && (
                    <a
                      href={slide.link || "#"}
                      className="text-xs sm:text-sm md:text-base px-5 sm:px-7 md:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#e82429] to-[#ff5151] hover:shadow-[0_0_20px_#e82429aa] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    >
                      {slide.cta}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
