import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/API";
import DataService from "../../config/DataService";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const api = DataService();
      const res = await api.post(API.USER_LOGIN, formData);

      // ✅ Store user details in localStorage
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("userId", res.data._id);

      toast.success(`Welcome back, ${res.data.name}! 👋`);

      // ✅ Redirect user to saved page (like /cart) if exists
      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin"); // cleanup
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e82429]"
          />

          {/* Password with Eye Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#e82429] pr-12"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-gray-500 cursor-pointer hover:text-[#e82429]"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#e82429] to-[#721011] text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <span
            className="text-[#e82429] cursor-pointer font-semibold"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
