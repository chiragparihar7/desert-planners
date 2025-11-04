// src/pages/VisaDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import DataService from "../config/DataService";
import { API } from "../config/API";
import WhatsAppButton from "../components/WhatsAppButton";
import {
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaPassport,
  FaListUl,
  FaInfoCircle,
  FaStar,
  FaFileUpload,
  FaWhatsapp,
  FaUserCircle,
} from "react-icons/fa";

export default function VisaDetails() {
  const { slug } = useParams();
  const [visa, setVisa] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [relatedVisas, setRelatedVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = DataService();

  // ✅ Fetch Visa Details
  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const res = await api.get(API.GET_VISA_BY_SLUG(slug));
        setVisa(res.data);
        setMainImage(res.data.gallery?.[0] || res.data.img);
      } catch (err) {
        console.error("Error fetching visa:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVisa();
  }, [slug]);

  // ✅ Fetch Related Visas

  useEffect(() => {
    if (!visa) return;

    const fetchRelatedVisas = async () => {
      try {
        const res = await api.get(API.GET_VISAS); // Backend se direct array mil raha
        const filtered = (res.data || []).filter((v) => v._id !== visa._id);
        setRelatedVisas(filtered);
      } catch (err) {
        console.error("Error fetching related visas:", err);
        setRelatedVisas([]);
      }
    };

    fetchRelatedVisas(); // ⬅️ Call the function
  }, [visa]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading visa details...
      </div>
    );

  if (!visa)
    return (
      <div className="text-center py-10 text-xl text-red-600">
        Visa not found
      </div>
    );

  return (
    <div className="bg-gray-50 pb-20">
      {/* HERO SECTION */}
      <div className="relative h-96 w-full overflow-hidden">
        <img
          src={mainImage}
          alt={visa.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold mb-3"
          >
            {visa.title}
          </motion.h1>
          <p className="text-lg flex items-center gap-2 justify-center">
            <FaMapMarkerAlt /> United Arab Emirates
          </p>
          <a
            href="#apply-now"
            className="mt-6 bg-[#e82429] hover:bg-[#721011] text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Apply Now
          </a>
        </div>
      </div>

      {/* IMAGE GALLERY */}
      {visa.gallery && visa.gallery.length > 1 && (
        <div className="max-w-[1200px] mx-auto px-4 mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {visa.gallery.map((img, idx) => (
            <motion.img
              key={idx}
              src={img}
              alt={`${visa.title} ${idx + 1}`}
              className={`w-full h-28 object-cover rounded-xl cursor-pointer border-2 transition ${
                mainImage === img ? "border-[#e82429]" : "border-transparent"
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-[1200px] mx-auto mt-10 px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-8 space-y-10">
          {/* QUICK FACTS */}
          <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                icon: <FaClock />,
                label: "Processing Time",
                value: visa.processingTime,
              },
              {
                icon: <FaPassport />,
                label: "Visa Type",
                value: visa.visaType,
              },
              {
                icon: <FaListUl />,
                label: "Entry Type",
                value: visa.entryType,
              },
              {
                icon: <FaCheckCircle />,
                label: "Validity",
                value: visa.validity,
              },
              {
                icon: <FaTimesCircle />,
                label: "Stay Duration",
                value: visa.stayDuration,
              },
              {
                icon: <FaInfoCircle />,
                label: "Fees",
                value: `AED ${visa.price}`,
              },
            ].map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition flex items-start gap-3"
              >
                <div className="text-[#e82429] text-2xl">{fact.icon}</div>
                <div>
                  <p className="font-semibold text-gray-800">{fact.label}</p>
                  <p className="text-gray-600 text-sm">{fact.value}</p>
                </div>
              </motion.div>
            ))}
          </section>

          {/* OVERVIEW */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-md p-8 space-y-4"
          >
            <h2 className="text-2xl font-bold text-[#404041] flex items-center gap-2">
              <FaInfoCircle className="text-[#e82429]" /> Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-5 items-start">
              <div>
                <p className="text-gray-700 leading-relaxed">{visa.overview}</p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  {visa.details}
                </p>
              </div>
              <img
                src={visa.gallery?.[0] || "/fallback-image.jpg"} // gallery ka first image use karo, fallback optional
                alt={visa.title}
                className="w-full h-60 object-cover rounded-2xl shadow"
              />
            </div>
          </motion.section>

          {/* DOCUMENTS */}
          <section className="bg-gradient-to-br from-[#fff4f4] to-[#ffeaea] rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold text-[#721011] mb-4">
              Required Documents
            </h2>
            <ul className="space-y-3 text-gray-700">
              {(visa.documents || []).map((doc, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#e82429]" /> {doc}
                </li>
              ))}
            </ul>
          </section>

          {/* STEPS TO APPLY */}
          <section className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#404041] mb-5">
              Steps to Apply
            </h2>
            <div className="flex flex-col md:flex-row md:justify-between gap-6">
              {[
                "Choose Visa Type",
                "Upload Documents",
                "Make Payment",
                "Receive Visa via Email",
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="bg-[#e82429] text-white w-10 h-10 flex items-center justify-center rounded-full font-bold mb-2">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INCLUSIONS & EXCLUSIONS */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-bold text-[#e82429] mb-3">
                Inclusions
              </h3>
              <ul className="space-y-2 text-gray-700">
                {(visa.inclusions || []).map((i, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-bold text-[#e82429] mb-3">
                Exclusions
              </h3>
              <ul className="space-y-2 text-gray-700">
                {(visa.exclusions || []).map((e, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FaTimesCircle className="text-red-500" /> {e}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* REVIEWS SECTION */}
          {/* MODERN REVIEWS SECTION */}
          <section className="max-w-[1200px] mx-auto px-4 mt-16">
            <h2 className="text-3xl font-extrabold text-[#721011] mb-8 text-center">
              What Our Customers Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Review Card */}
              {[
                {
                  name: "Alice Smith",
                  rating: 5,
                  text: "Amazing experience! Highly recommend for anyone applying for a UAE visa.",
                },
                {
                  name: "John Doe",
                  rating: 4,
                  text: "Smooth process and very helpful support. Would use this service again.",
                },
                {
                  name: "Maria Lee",
                  rating: 5,
                  text: "Fast processing and excellent guidance. Definitely recommend to everyone!",
                },
              ].map((review, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-6 flex flex-col gap-4 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3">
                    <FaUserCircle className="text-3xl text-[#e82429]" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {review.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-xs ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.text}
                  </p>
                  <div className="mt-auto flex justify-end">
                    <span className="text-xs text-gray-400">
                      Reviewed {review.rating} stars
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RELATED VISAS */}
          {relatedVisas.length > 0 && (
            <section className="max-w-[1200px] mx-auto px-4 mt-16">
              <h2 className="text-3xl font-extrabold text-[#721011] mb-10 text-start">
                Related Visas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {relatedVisas.map((v) => (
                  <Link
                    key={v._id}
                    to={`/visa/${v.slug}`}
                    className="group relative flex flex-col bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* IMAGE */}
                    <div className="relative h-44 w-full overflow-hidden">
                      <img
                        src={
                          t.galleryImages?.[0]
                            ? `${API.BASE_URL}/${t.galleryImages[0]}`
                            : t.mainImage
                            ? `${API.BASE_URL}/${t.mainImage}`
                            : "/no-image.jpg"
                        }
                        alt={t.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      {v.processingTime && (
                        <span className="absolute top-2 left-2 bg-[#e82429] text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                          <FaClock className="text-[10px]" /> {v.processingTime}
                        </span>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-[#404041] line-clamp-2 group-hover:text-[#e82429] transition-colors">
                          {v.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {v.overview}
                        </p>
                      </div>

                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-[#e82429] font-bold text-md">
                          AED {v.price}
                        </span>
                        <span className="text-xs text-gray-500">
                          per application
                        </span>
                      </div>

                      {/* CTA BUTTON */}
                      <Link
                        to={`/visa/${v.slug}`}
                        className="mt-3 bg-gradient-to-r from-[#e82429] to-[#721011] text-white py-2 rounded-xl text-center font-semibold hover:scale-105 transition-all"
                      >
                        Apply Now
                      </Link>

                      {/* RATING */}
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, idx) => (
                          <FaStar
                            key={idx}
                            className={`${
                              idx < 4 ? "text-yellow-400" : "text-gray-300"
                            } text-xs`}
                          />
                        ))}
                        <span className="ml-2 text-gray-500 text-xs">
                          (4.0)
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-4">
          <div
            id="apply-now"
            className="sticky top-24 bg-white rounded-3xl shadow-xl p-6 flex flex-col gap-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#404041]">Apply Now</h2>
              <span className="bg-[#e82429] text-white px-3 py-1 rounded-full text-sm">
                Popular
              </span>
            </div>

            <div className="bg-[#fff4f4] p-3 rounded-xl border border-[#e82429]/30 text-sm">
              <div className="flex items-center gap-2">
                <FaClock className="text-[#e82429]" /> Processing:{" "}
                <strong>{visa.processingTime}</strong>
              </div>
            </div>

            <label className="text-sm text-gray-600">Upload Documents</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center text-gray-500 hover:bg-gray-50 transition">
              <FaFileUpload className="mx-auto text-3xl mb-2 text-[#e82429]" />
              <p>Drag & drop files here or click to upload</p>
              <input type="file" multiple className="hidden" />
            </div>

            <button className="w-full bg-gradient-to-r from-[#e82429] to-[#721011] text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all">
              Proceed to Apply
            </button>

            <a
              href="https://wa.me/918003155718"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 text-[#25D366] font-semibold mt-2"
            >
              <FaWhatsapp /> Need Help? Chat on WhatsApp
            </a>

            <p className="text-xs text-gray-500 text-center border-t border-gray-200 pt-2">
              Our team will contact you after submission. <br /> 100% Secure |
              Govt Authorized
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
