import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const tours = [
  {
    name: "Desert Safari Adventure",
    duration: "6 Hours",
    price: "AED 250",
    img: "https://images.unsplash.com/photo-1588310558566-b983c7d257e4?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dubai City Tour",
    duration: "8 Hours",
    price: "AED 300",
    img: "https://images.unsplash.com/photo-1601914196574-8b79db884f73?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Burj Khalifa Experience",
    duration: "3 Hours",
    price: "AED 350",
    img: "https://images.unsplash.com/photo-1694475634077-e6e4b623b574?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ferrari World Tour",
    duration: "5 Hours",
    price: "AED 450",
    img: "https://images.unsplash.com/photo-1578152882785-df9744e359e5?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ToursPage() {
  const [search, setSearch] = useState("");

  const filteredTours = tours.filter((tour) =>
    tour.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 md:h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576675783864-1b8a8c73165f?auto=format&fit=crop&w=1200&q=80')" }}>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Explore Dubai Tours
          </h1>
        </div>
      </section>

      {/* Search / Filter */}
      <div className="max-w-[1200px] mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-3">
          <FiSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search tours..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e82429]"
          />
        </div>
      </div>

      {/* Tours Grid */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Tours</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.length > 0 ? (
            filteredTours.map((tour, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={tour.img}
                    alt={tour.name}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">{tour.name}</h3>
                  <p className="text-gray-500">{tour.duration}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[#e82429] font-bold text-lg">{tour.price}</span>
                    <button className="px-4 py-2 bg-[#e82429] text-white rounded-lg font-semibold hover:bg-[#721011] transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No tours found.</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-[#e82429] py-12 text-center text-white rounded-t-3xl">
        <h2 className="text-3xl font-bold mb-4">Plan Your Dubai Adventure Today</h2>
        <p className="mb-6">Book your tour and explore the best attractions Dubai has to offer!</p>
        <button className="px-6 py-3 bg-white text-[#e82429] rounded-lg font-semibold hover:bg-gray-100 transition">
          Explore Tours
        </button>
      </section>
    </div>
  );
}
