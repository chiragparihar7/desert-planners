import React, { useState } from "react";
import { motion } from "framer-motion";
import DataService from "../config/DataService";
import { API } from "../config/API";
import {
  FaSearch,
  FaEnvelope,
  FaHashtag,
  FaCalendar,
  FaUser,
  FaCreditCard,
  FaMapMarkerAlt,
  FaDownload,
  FaListUl
} from "react-icons/fa";

export default function GuestBookingLookup() {
  const api = DataService();

  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    setError("");
    setBooking(null);

    if (!bookingId || !email) {
      setError("Please enter both Booking ID and Email.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.get(
        API.LOOKUP_BOOKING(bookingId.trim(), email.trim())
      );
      setBooking(res.data.booking);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to find booking. Try again!");
    }

    setLoading(false);
  };

 const handleDownloadInvoice = () => {
  const url = `${API.BASE_URL}${API.INVOICE_DOWNLOAD(booking._id)}`;
  window.open(url, "_blank");
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 flex items-center justify-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/50 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/30 p-10"
      >
        {/* Title */}
        <motion.h1
          className="text-4xl font-extrabold text-center bg-gradient-to-r from-[#e82429] to-[#721011] bg-clip-text text-transparent mb-3"
        >
          Check Your Booking
        </motion.h1>

        <p className="text-center text-gray-600 mb-10">
          Easily find your tour booking using Booking ID and Email.
        </p>

        {/* Form */}
        <div className="space-y-7">

          {/* Booking ID */}
          <div>
            <label className="text-gray-700 font-medium flex items-center gap-2">
              <FaHashtag className="text-[#e82429]" /> Booking ID
            </label>
            <input
              type="text"
              placeholder="e.g. 67ab3f92c98d4"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-[#e82429]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium flex items-center gap-2">
              <FaEnvelope className="text-[#e82429]" /> Email Address
            </label>
            <input
              type="email"
              placeholder="Email used during booking"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-[#e82429]"
            />
          </div>

          {/* Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleLookup}
            className="w-full bg-gradient-to-r from-[#e82429] to-[#721011] text-white py-3 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            <FaSearch /> {loading ? "Searching..." : "Check Booking"}
          </motion.button>

          {error && <p className="text-center text-red-600 font-semibold">{error}</p>}
        </div>

        {/* Result */}
        {booking && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 bg-white/70 backdrop-blur-xl border border-gray-300 shadow-xl rounded-3xl p-8"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-[#2e2e2e]">
                Booking Summary
              </h2>

              <button
                onClick={handleDownloadInvoice}
                className="flex items-center gap-2 bg-[#e82429] hover:bg-[#721011] text-white px-4 py-2 rounded-full text-sm"
              >
                <FaDownload /> Download Invoice
              </button>
            </div>

            {/* Customer Details */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <FaUser className="text-[#e82429]" /> <b>Name:</b> {booking.guestName}
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <FaEnvelope className="text-[#e82429]" /> <b>Email:</b> {booking.guestEmail}
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <FaMapMarkerAlt className="text-[#e82429]" /> <b>Contact:</b> {booking.guestContact}
              </div>
            </div>

            <hr className="my-4" />

            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FaListUl className="text-[#e82429]" /> Tours Booked
            </h3>

            {booking.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-100 shadow-md border border-gray-200 p-5 rounded-2xl mb-4"
              >
                <p className="text-gray-800 text-lg font-semibold mb-1">
                  {item.tourId?.title || "Tour Not Found"}
                </p>

                <p className="text-gray-600 flex items-center gap-2">
                  <FaCalendar className="text-[#e82429]" />
                  <b>Date:</b> {new Date(item.date).toLocaleDateString()}
                </p>

                <p className="text-gray-700 mt-1">
                  <b>Adults:</b> {item.adultCount} × AED {item.adultPrice}
                </p>

                <p className="text-gray-700 mt-1">
                  <b>Children:</b> {item.childCount} × AED {item.childPrice}
                </p>
              </motion.div>
            ))}

            <div className="mt-5">
              <p className="font-bold text-2xl text-[#e82429]">
                Total: AED {booking.totalPrice}
              </p>

              <p className="mt-2 flex items-center gap-2 text-gray-800">
                <FaCreditCard className="text-[#e82429]" /> <b>Payment:</b>{" "}
                <span className={booking.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}>
                  {booking.paymentStatus}
                </span>
              </p>

              <p className="mt-1 text-gray-800">
                <b>Status:</b>{" "}
                <span className="capitalize text-[#721011]">{booking.status}</span>
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
