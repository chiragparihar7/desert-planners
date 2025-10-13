import React from "react";

export default function AbuDhabiCityTour() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-[#e82429] mb-4">
        Abu Dhabi City Tour
      </h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        Explore the capital city of the UAE with our Abu Dhabi City Tour.
        Experience iconic landmarks like Sheikh Zayed Grand Mosque, Heritage
        Village, Corniche Beach, and the opulent Emirates Palace.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src="/images/abu-dhabi.jpg"
          alt="Abu Dhabi City Tour"
          className="rounded-2xl shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold text-[#e82429] mb-3">
            Tour Highlights
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Visit Sheikh Zayed Grand Mosque</li>
            <li>Drive along the scenic Corniche</li>
            <li>Explore Heritage Village</li>
            <li>Photo stop at Emirates Palace</li>
            <li>Shopping at Marina Mall</li>
          </ul>
          <button
            className="mt-6 px-6 py-3 bg-[#e82429] hover:bg-[#721011] text-white font-semibold rounded-lg transition-transform duration-300 hover:scale-105 shadow-md"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}
