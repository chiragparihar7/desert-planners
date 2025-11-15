import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

export default function ProfileMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // ✅ Check login state on load + listen for changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("userToken");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("userLoginChange", checkLoginStatus);

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("userLoginChange", checkLoginStatus);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);
    setOpen(false);

    window.dispatchEvent(new Event("userLoginChange"));
    navigate("/login");
  };

  return (
    <div
      className="relative ml-4"
      ref={dropdownRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Profile Button */}
      <button
        className="flex items-center gap-2 text-[#404041] hover:text-[#e82429] transition-colors duration-300"
        onClick={() => setOpen(!open)}
      >
        <FiUser size={20} />
        <span className="hidden md:inline">Profile</span>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-xl border border-gray-200 
          transition-all duration-300 z-[9999] ${
            open
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2"
          }`}
      >
        <ul className="py-2 text-sm font-medium text-[#404041]">

          {/* ⭐ ALWAYS SHOW — Check Booking (Guest + User both) */}
          <li>
            <Link
              to="/check-booking"
              className="block px-4 py-2 hover:bg-[#e82429]/10 hover:text-[#e82429] rounded-md transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              Check Booking
            </Link>
          </li>

          {/* ⭐ IF LOGGED IN */}
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-[#e82429]/10 hover:text-[#e82429] rounded-md transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  My Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/my-orders"
                  className="block px-4 py-2 hover:bg-[#e82429]/10 hover:text-[#e82429] rounded-md transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  My Orders
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-100 hover:text-red-600 rounded-md transition-all duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* ⭐ Guest Menu */}
              <li>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-[#e82429]/10 hover:text-[#e82429] rounded-md transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="block px-4 py-2 hover:bg-[#e82429]/10 hover:text-[#e82429] rounded-md transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
