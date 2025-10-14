// src/pages/VisaDetails.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import visaData from "../data/visaData";
import {
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaInfoCircle,
  FaUserCircle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function VisaDetails() {
  const { slug } = useParams();
  const pkg = visaData.find((p) => p.slug === slug);
  const [mainImage, setMainImage] = useState(pkg?.gallery?.[0] || pkg?.img);

  if (!pkg) {
    return <div className="text-center py-10 text-xl text-red-600">Visa not found</div>;
  }

  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-8 space-y-8">
          {/* BANNER IMAGE */}
          <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-md">
            <img
              src={mainImage}
              alt={pkg.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* TITLE + PRICE + META */}
          <div className="bg-gradient-to-r from-[#fff4f4] to-[#ffeaea] rounded-3xl shadow-xl p-6 border border-[#e82429]/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-[#721011] mb-2">{pkg.title}</h1>
                <p className="text-gray-600 flex items-center gap-2 text-lg">
                  <FaMapMarkerAlt className="text-[#e82429]" /> UAE
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="bg-[#e82429]/20 text-[#721011] font-semibold px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <FaClock className="text-[#e82429]" /> 2–5 Days
                  </span>
                  <span className="bg-[#fff4f4]/80 text-[#721011] font-semibold px-3 py-1 rounded-full text-sm">
                    Fast Processing
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2 mt-3 md:mt-0">
                <p className="text-2xl font-bold text-[#e82429]">AED {pkg.price}</p>
                <p className="text-gray-500 text-sm font-medium">per application</p>
              </div>
            </div>
          </div>

          {/* OVERVIEW & DETAILS */}
          <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-[#404041] flex items-center gap-2">
              <FaInfoCircle className="text-[#e82429]" /> Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">{pkg.overview}</p>
            <p className="text-gray-700 leading-relaxed">{pkg.details}</p>

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="text-lg font-semibold text-[#e82429] mb-2">Inclusions</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {(pkg.inclusions || []).map((i, idx) => <li key={idx}>{i}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#e82429] mb-2">Exclusions</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {(pkg.exclusions || []).map((e, idx) => <li key={idx}>{e}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* HIGHLIGHTS */}
          <div className="bg-gradient-to-br from-[#fff4f4] to-[#ffeaea] rounded-2xl shadow-md p-6 space-y-3 border border-[#e82429]/20">
            <h2 className="text-2xl font-semibold text-[#721011] mb-2">Highlights ✨</h2>
            <ul className="space-y-2 text-gray-700">
              <li>🌟 Fast & secure processing for all visa applications.</li>
              <li>🌟 Assistance with required documents.</li>
              <li>🌟 Expert team support for your queries.</li>
              <li>🌟 Transparent pricing with no hidden charges.</li>
              <li>💡 Fun Fact: Many travelers use this service for multiple destinations.</li>
            </ul>
          </div>

          {/* NEED TO KNOW */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-[#404041]">Need to Know</h2>
            <h3 className="text-lg font-semibold text-[#e82429]">Important Information</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Visa valid for multiple entries.</li>
              <li>Processing time may vary depending on nationality.</li>
              <li>Ensure all documents are accurate and valid.</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#e82429]">Restrictions</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>No incomplete or forged documents.</li>
              <li>Application rejection may occur if requirements are not met.</li>
              <li>Not valid for minors without guardian consent.</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#e82429]">Processing Timings</h3>
            <p className="text-gray-700">Weekdays: 9:00 AM – 6:00 PM</p>
          </div>

          {/* CANCELLATION POLICY */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#404041] mb-2">Cancellation Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              You can cancel your application up to <strong>24 hours before</strong> submission for a full refund.
            </p>
          </div>

          {/* REVIEWS */}
          <div className="bg-gray-50 rounded-3xl p-6 space-y-6">
            <h2 className="text-3xl font-extrabold text-[#721011] mb-4 relative inline-block">
              Reviews
              <span className="absolute left-0 bottom-0 w-16 h-1 bg-[#e82429] rounded-full"></span>
            </h2>

            {[{
              name: "Aarav Sharma",
              date: "Oct 2025",
              rating: 5,
              review: "Smooth visa process, fast and reliable service!"
            },
            {
              name: "Sophia Khan",
              date: "Sept 2025",
              rating: 4,
              review: "Good experience overall. Staff was helpful."
            }].map((r, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FaUserCircle className="text-4xl text-gray-400 p-1 rounded-full bg-gray-100" />
                    <div>
                      <h4 className="font-semibold text-gray-800">{r.name}</h4>
                      <p className="text-sm text-gray-500">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <FaStar
                        key={idx}
                        className={idx < r.rating ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{r.review}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT: APPLY NOW PANEL */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white rounded-3xl shadow-xl p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#404041]">Apply Now</h2>
              <span className="bg-[#e82429] text-white px-3 py-1 rounded-full text-sm">Popular</span>
            </div>

            <div className="bg-[#fff4f4] p-3 rounded-xl border border-[#e82429]/30 text-sm">
              <div className="flex items-center gap-2">
                <FaClock className="text-[#e82429]" /> Processing: <strong>2–5 days</strong>
              </div>
            </div>

            <label className="text-sm text-gray-600">Upload Documents</label>
            <input type="file" className="w-full text-sm" />

            <button className="w-full bg-gradient-to-r from-[#e82429] to-[#721011] text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all">
              Proceed to Apply
            </button>

            <p className="text-xs text-gray-500 text-center border-t border-gray-200 pt-2">
              Our team will contact you after submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
