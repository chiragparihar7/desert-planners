// src/pages/TourDetails.js
import { useParams, Link } from "react-router-dom";
import toursData from "../data/toursData";

export default function TourDetails() {
  const { slug } = useParams();
  const tour = toursData.find((t) => t.slug === slug);

  if (!tour)
    return (
      <h2 className="text-center py-10 text-2xl font-semibold text-red-600">
        Tour not found
      </h2>
    );

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <img
          src={tour.bannerImg}
          alt={tour.title}
          className="w-full h-full object-cover brightness-70"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-[#721011] text-3xl md:text-5xl font-extrabold text-center max-w-[1200px] px-4 tracking-wide drop-shadow-[2px_2px_8px_rgba(0,0,0,0.7)] bg-white/20 backdrop-blur-sm rounded-lg py-2">
            {tour.title}
          </h1>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-0 py-10">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-10">
          {tour.description}
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tour.services.map((service) => {
            const serviceSlug = service.title
              .toLowerCase()
              .replace(/\s+/g, "-");
            return (
              <Link
                key={service.title}
                to={`/tours/${slug}/${serviceSlug}`}
                className="block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-[1.04] relative group"
              >
                {/* Image */}
                <div className="relative h-64 md:h-72 w-full overflow-hidden rounded-t-3xl">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {service.category && (
                    <span className="absolute top-3 left-3 bg-[#e82429] text-white px-3 py-1 text-xs rounded-full font-semibold shadow-md">
                      {service.category}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col justify-between h-56">
                  <h2 className="text-xl font-bold text-[#e82429] mb-3 transition-transform duration-300 group-hover:translate-y-[-2px]">
                    {service.title}
                  </h2>
                  <p className="text-gray-700 font-semibold mb-4 text-lg transition-colors duration-300 group-hover:text-[#5f19ff]">
                    from AED {service.price} / person
                  </p>
                  <div className="mt-auto text-center bg-[#404041] text-white font-semibold py-3 rounded-2xl shadow-md hover:shadow-lg hover:bg-gray-700 transition-all cursor-pointer">
                    View Trip
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
