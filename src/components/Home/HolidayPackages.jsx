import React, { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DataService from "../../config/DataService";
import { API } from "../../config/API";

export default function HolidayPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Ye sectionId tumhare MongoDB me "Holiday Packages" ke liye hoga
  const sectionId = "69084852dda693d673b55be3"; // <-- replace with actual section id

  // ✅ Backend se data fetch
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const api = DataService();
        const res = await api.get(API.GET_SECTION_ITEMS(sectionId));
        setPackages(res.data || []);
      } catch (error) {
        console.error("Error fetching holiday packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleEnquiry = () => {
    navigate("/contact");
  };

  const handleViewTrip = (title) => {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    navigate(`/holidays/${slug}`);
  };

  // ✅ Loading / Empty state
  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500 text-lg">
        Loading Holiday Packages...
      </div>
    );
  }

  if (!packages.length) {
    return (
      <div className="py-10 text-center text-gray-500 text-lg">
        No holiday packages found.
      </div>
    );
  }

  // ✅ Same design, just dynamic data
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-left text-[#404041]">
          Holiday Packages
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
            >
              {/* Image with overlay */}
              <div
                className="relative overflow-hidden h-64"
                onClick={() => handleViewTrip(pkg.name || pkg.title)}
              >
                <img
                  src={pkg.img}
                  alt={pkg.name || pkg.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {pkg.label && (
                  <span className="absolute top-3 left-3 bg-[#e82429] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {pkg.label}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div className="flex items-center text-gray-500 text-sm font-medium mb-1">
                  <FiCalendar className="mr-2" /> {pkg.duration}
                </div>

                <h3
                  className="text-xl font-semibold text-gray-800 mb-3"
                  onClick={() => handleViewTrip(pkg.name || pkg.title)}
                >
                  {pkg.name || pkg.title}
                </h3>
                <p className="text-[#e82429] font-bold mb-5">
                  {" "}
                  From AED 
                  {" "} 
                  {pkg.price || "Contact for Price"} / Person
                </p>

                {/* Buttons */}
                <div className="flex gap-4 mt-auto">
                  <button
                    onClick={handleEnquiry}
                    className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#e82429] to-[#ff5a4d] text-white hover:opacity-90 transition duration-300"
                  >
                    Enquiry Now
                  </button>
                  <button
                    onClick={() => handleViewTrip(pkg.name || pkg.title)}
                    className="flex-1 py-3 rounded-lg font-semibold border-2 border-[#e82429] text-[#e82429] hover:bg-[#e82429] hover:text-white transition duration-300"
                  >
                    View Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
