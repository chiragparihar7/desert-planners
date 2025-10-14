import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* 1️⃣ Brand / About with Logo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/desertplannersfooter_logo.png"
              alt="TravelVista Logo"
              className="w-30 h-15 object-contain"
            />
          </div>
          <p className="text-sm leading-6">
            Discover your next adventure with us! Explore the best tour packages
            and unforgettable experiences around the world.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a
              href="#"
              className="bg-[#3b5998] p-2 rounded-full hover:bg-[#2d4373] transition-all"
            >
              <FaFacebookF className="text-white" />
            </a>
            <a
              href="#"
              className="bg-gradient-to-tr from-pink-500 to-orange-400 p-2 rounded-full hover:opacity-90 transition-all"
            >
              <FaInstagram className="text-white" />
            </a>
            <a
              href="#"
              className="bg-[#00acee] p-2 rounded-full hover:bg-[#0086bf] transition-all"
            >
              <FaTwitter className="text-white" />
            </a>
            <a
              href="#"
              className="bg-[#0077b5] p-2 rounded-full hover:bg-[#005983] transition-all"
            >
              <FaLinkedinIn className="text-white" />
            </a>
          </div>
        </div>

        {/* 2️⃣ Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/tours" className="hover:text-white transition-colors">
                Tour Package
              </a>
            </li>
            <li>
              <a
                href="/holidays"
                className="hover:text-white transition-colors"
              >
                Holidays Packages
              </a>
            </li>
            <li>
              <a href="/visa" className="hover:text-white transition-colors">
                Visa Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* 3️⃣ Popular Destinations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            Popular Destinations
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/tours/abu-dhabi-city-tour"
                className="hover:text-white transition-colors"
              >
                Abu Dhabi City Tour
              </a>
            </li>
            <li>
              <a
                href="/tours/dubai-city-tour"
                className="hover:text-white transition-colors"
              >
                "Dubai City Tour
              </a>
            </li>
            <li>
              <a
                href="/tours/yas-island/yas-waterpark-with-mealt"
                className="hover:text-white transition-colors"
              >
                Yas WaterPark With Meal
              </a>
            </li>
            <li>
              <a
                href="/tours/excursion-tickets/dubai-miracle-garden"
                className="hover:text-white transition-colors"
              >
                Dubai Miracle Garden
              </a>
            </li>
            <li>
              <a
                href="/tours/excursion-tickets/sharjah-city-tour"
                className="hover:text-white transition-colors"
              >
                Sharjah City Tour
              </a>
            </li>
          </ul>
        </div>

        {/* 4️⃣ Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#e82429]" /> 123 Main Street,
              Dubai, UAE
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#e82429]" /> +971 55 123 4567
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-[#e82429]" /> info@travelvista.com
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} TravelVista. All rights reserved. |
        Designed with ❤️ by Chirag
      </div>
    </footer>
  );
}
