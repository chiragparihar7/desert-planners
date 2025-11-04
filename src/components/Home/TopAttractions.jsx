import React, { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DataService from "../../config/DataService";
import { API } from "../../config/API";

export default function TopAttractionsCarousel() {
  const [attractions, setAttractions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // ✅ Section ID for “Top Attractions”
  const sectionId = "69083cc3dda693d673b550fd"; // Replace with actual _id for Top Attractions section from MongoDB

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const api = DataService();
        const res = await api.get(API.GET_SECTION_ITEMS(sectionId));
        setAttractions(res.data || []);
      } catch (error) {
        console.error("Error fetching attractions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAttractions();
  }, [sectionId]);

  // ✅ Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsPerView(4);
      else if (window.innerWidth >= 640) setCardsPerView(2);
      else setCardsPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Auto slide every 5 seconds
  useEffect(() => {
    if (attractions.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % attractions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [attractions]);

  // ✅ Next / Prev buttons
  const next = () => setCurrent((prev) => (prev + 1) % attractions.length);
  const prev = () => setCurrent((prev) => (prev - 1 + attractions.length) % attractions.length);

  // ✅ Swipe support
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // ✅ Get visible items
  const getVisible = () => {
    const visible = [];
    for (let i = 0; i < cardsPerView; i++) {
      visible.push(attractions[(current + i) % attractions.length]);
    }
    return visible;
  };

  const visibleAttractions = getVisible();
  const totalPages = Math.ceil(attractions.length / cardsPerView);

  // ✅ Loading and empty states
  if (loading)
    return (
      <div className="py-10 text-center text-gray-500 text-lg">
        Loading Top Attractions...
      </div>
    );

  if (!attractions.length)
    return (
      <div className="py-10 text-center text-gray-500 text-lg">
        No attractions found in this section.
      </div>
    );

  // ✅ Main UI (Same design as before)
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 relative">
        <h2
          className="text-3xl sm:text-4xl font-bold mb-6 text-left"
          style={{ color: "#404041" }}
        >
          Top Attractions
        </h2>

        <div
          className="relative flex items-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Button */}
          <button
            onClick={prev}
            className="absolute left-0 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition hidden sm:flex"
          >
            <FiChevronLeft size={22} />
          </button>

          {/* Cards */}
          <div className="flex gap-6 overflow-hidden w-full transition-transform duration-500">
            {visibleAttractions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => item.link && navigate(item.link)}
                className="relative flex-shrink-0 rounded-xl shadow-md overflow-hidden bg-white transition-transform duration-500 cursor-pointer hover:scale-[1.03]"
                style={{ width: `${100 / cardsPerView - 1.5}%` }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-80 object-cover transform transition duration-500 hover:scale-105"
                />
                {/* Text inside image */}
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-2xl font-extrabold tracking-wide drop-shadow-lg">
                    {item.name}
                  </h3>
                  {item.price && (
                    <p className="text-lg font-bold text-gray-100">
                      From{" "}
                      <span className="text-[#e82429] font-extrabold">
                        {item.price}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={next}
            className="absolute right-0 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition hidden sm:flex"
          >
            <FiChevronRight size={22} />
          </button>
        </div>

        {/* Pagination Dots (Mobile) */}
        <div className="flex justify-center mt-6 gap-2 sm:hidden">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx * cardsPerView)}
              className={`w-3 h-3 rounded-full transition ${
                idx === Math.floor(current / cardsPerView)
                  ? "bg-[#e82429]"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
