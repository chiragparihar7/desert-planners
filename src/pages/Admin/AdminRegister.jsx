import React, { useState } from "react";
import DataService from "../../config/DataService";
import { API } from "../../config/API";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "../../components/PhoneInput"; // ⚠️ Path apne project ke hisaab se

export default function AdminRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // phone state
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const api = DataService();

      await api.post(API.ADMIN_REGISTER, {
        name,
        email,
        phone, // <-- Phone added
        password,
      });

      alert("Admin registered successfully!");
      navigate("/admin/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        
        <h2 className="text-2xl font-bold text-center mb-6">Admin Register</h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* PHONE INPUT */}
          <PhoneInput
            value={phone}
            onChange={(val) => setPhone(val)}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <span
              className="absolute right-4 top-3 text-xl cursor-pointer text-gray-600"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-900 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        {/* BOTTOM LINK */}
        <p className="text-center mt-4 text-sm">
          Already have an admin account?{" "}
          <Link to="/admin/login" className="text-red-600 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
