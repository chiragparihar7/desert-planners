import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 1️⃣ Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">TravelVista</h2>
          <p className="text-sm leading-6">
            Discover your next adventure with us! We offer the best tour packages and experiences around the world.
          </p>
          <div className="flex items-center gap-4 mt-5">
            <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-500"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-600"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* 2️⃣ Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/packages" className="hover:text-white">Tour Packages</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            <li><a href="/faq" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* 3️⃣ Popular Destinations */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Popular Destinations</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/dubai" className="hover:text-white">Dubai</a></li>
            <li><a href="/bali" className="hover:text-white">Bali</a></li>
            <li><a href="/paris" className="hover:text-white">Paris</a></li>
            <li><a href="/maldives" className="hover:text-white">Maldives</a></li>
            <li><a href="/singapore" className="hover:text-white">Singapore</a></li>
          </ul>
        </div>

        {/* 4️⃣ Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-400" /> 123 Main Street, Dubai, UAE
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-400" /> +971 55 123 4567
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-400" /> info@travelvista.com
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} TravelVista. All rights reserved. | Designed with ❤️ by Chirag
      </div>
    </footer>
  );
}
