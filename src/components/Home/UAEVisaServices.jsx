import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DataService from "../../config/DataService";
import { API } from "../../config/API";
import { FaPassport, FaClock, FaChevronRight } from "react-icons/fa";

export default function HomeVisaSection() {
  const [visas, setVisas] = useState([]);
  const api = DataService();

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const res = await api.get(API.GET_VISAS);
        setVisas(res.data.slice(0, 6)); // show only top 6 visas
      } catch (err) {
        console.error("Error fetching visas:", err);
      }
    };
    fetchVisas();
  }, []);

  return (
    <section className="relative py-8 bg-gray-50 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-[#e82429]/5 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#721011]/5 blur-3xl rounded-full -z-10" />

      <div className="max-w-[1200px] mx-auto px-4 text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl text-left font-bold text-[#2e2e2e] mb-6"
        >
          Explore Global Visa
        </motion.h2>

        {/* Visa Cards Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {visas.map((visa, index) => (
            <motion.div
              key={visa._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="h-48 w-full overflow-hidden">
                <motion.img
                  src={visa.img || "/images/visa-default.jpg"}
                  alt={visa.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6 text-left space-y-3">
                <h3 className="text-xl font-bold text-[#2e2e2e] line-clamp-2 group-hover:text-[#e82429] transition">
                  {visa.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaPassport className="text-[#e82429]" /> {visa.entryType}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaClock className="text-[#e82429]" /> {visa.processingTime}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <p className="text-lg font-bold text-[#e82429]">
                    AED {visa.price}
                  </p>
                  <Link
                    to={`/visa/${visa.visaCategory?.slug || "uae"}/${visa.slug}`}
                    className="flex items-center gap-1 text-[#721011] font-semibold hover:gap-2 transition-all"
                  >
                    View Details <FaChevronRight className="text-sm" />
                  </Link>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-[#e82429] to-[#721011] transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
