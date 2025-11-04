import React, { useEffect, useState } from "react";
import { API } from "../config/API";
import DataService from "../config/DataService";
import { motion } from "framer-motion";
import { ShoppingCart, Package, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ use valid ObjectId (from real user login)
  const userId = localStorage.getItem("userId"); // not tempUserId

  // ✅ fetch cart items
  const fetchCart = async () => {
    try {
      if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
        console.error("Invalid userId for checkout");
        setLoading(false);
        return;
      }
      setLoading(true);
      const api = DataService();
      const res = await api.get(API.GET_CART(userId));
      setCart(res.data?.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ booking handler
  const handleBooking = async () => {
    try {
      if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
        alert("Invalid user ID");
        return;
      }

      const api = DataService();
      await api.post(API.CREATE_BOOKING, { userId });
      toast("Booking successful!");

      // clear cart
      await api.delete(API.CLEAR_CART(userId));
      setCart([]);
    } catch (err) {
      console.error("Booking failed:", err);
      toast("Booking failed");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🌀 Loading State
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-[#404041]">
        <Loader2 className="w-10 h-10 animate-spin text-[#e82429]" />
        <p className="mt-3 text-lg font-medium">Loading your checkout...</p>
      </div>
    );

  // 🛒 Empty Cart State
  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[75vh] text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="p-10 rounded-3xl bg-white shadow-lg border border-[#e82429]/20"
        >
          <ShoppingCart className="w-16 h-16 mx-auto text-[#e82429]" />
          <h2 className="mt-4 text-2xl font-bold text-[#404041]">
            Your Cart is Empty
          </h2>
          <p className="mt-2 text-gray-500 max-w-md">
            Looks like you haven’t added anything yet.  
            Explore our amazing tours and start planning your next adventure!
          </p>
          <button
            onClick={() => (window.location.href = "/tours")}
            className="mt-6 bg-[#e82429] hover:bg-[#721011] text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
          >
            Explore Tours
          </button>
        </motion.div>
      </div>
    );

  // ✅ Total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.tourId?.price || 0) * item.guests,
    0
  );

  // ✅ Main UI
  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold text-[#404041] mb-8 flex items-center gap-3"
      >
        <Package className="text-[#e82429]" /> Checkout
      </motion.h2>

      {/* 🧾 Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center bg-white border border-gray-200 shadow-md p-5 rounded-2xl hover:shadow-lg transition-all"
          >
            <div>
              <h3 className="text-lg font-semibold text-[#721011]">
                {item.tourId?.title}
              </h3>
              <p className="text-sm text-gray-600">
                Date: {new Date(item.date).toDateString()}
              </p>
              <p className="text-sm text-gray-600">Guests: {item.guests}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[#404041]">
                AED {(item.tourId?.price || 0) * item.guests}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 💰 Total & Confirm */}
      <div className="mt-8 flex justify-between items-center bg-[#e82429]/10 border border-[#e82429]/20 p-5 rounded-2xl">
        <h3 className="text-xl font-semibold text-[#404041]">
          Total: <span className="text-[#e82429]">AED {totalPrice}</span>
        </h3>
        <button
          onClick={handleBooking}
          className="bg-[#e82429] hover:bg-[#721011] text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all duration-300"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
