import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DataService from "../config/DataService";
import { API } from "../config/API";

export default function TourDetails() {
  const { slug } = useParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL =
    import.meta.env.VITE_API_URL || "https://desetplanner-backend.onrender.com";

  const commonBanner = "/images/dubai-common-banner.jpg";

  useEffect(() => {
    const fetchCategoryTours = async () => {
      try {
        const api = DataService();
        const res = await api.get(API.GET_TOURS_BY_CATEGORY(slug));
        setTours(res.data);
      } catch (err) {
        console.error(err);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    requestIdleCallback(fetchCategoryTours);
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-10 animate-pulse">
        <div className="h-64 md:h-96 bg-gray-200 rounded-3xl mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 h-[380px] rounded-3xl shadow-md"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (tours.length === 0)
    return (
      <h2 className="text-center py-10 text-2xl font-semibold text-red-600">
        No tours found for this category
      </h2>
    );

  return (
    <div className="w-full">
      {/* 🖼️ Category Banner */}
      <div className="relative w-full h-[180px] sm:h-[200px] md:h-[240px] lg:h-[300px] rounded-2xl overflow-hidden shadow-lg bg-black">
        <img
          src={
            tours[0].mainImage
              ? tours[0].mainImage.startsWith("http")
                ? tours[0].mainImage
                : `${baseURL}/${tours[0].mainImage}`
              : commonBanner
          }
          alt={tours[0].category?.name || "Dubai Tours"}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
          onError={(e) => (e.currentTarget.src = commonBanner)}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

        {/* ✅ Category Title in Uppercase */}
        <div className="absolute inset-0 flex justify-center items-center text-center">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wide drop-shadow-lg uppercase"
          >
            {tours[0].category?.name || "Explore Dubai Adventures"}
          </h1>
        </div>
      </div>

      {/* 🧳 Tours Grid */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-0 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <Link
            key={tour._id}
            to={`/tours/${slug}/${tour.slug}`}
            className="block bg-white rounded-3xl overflow-hidden shadow-lg transition hover:shadow-2xl relative group"
          >
            {/* 📸 Tour Image */}
            <div className="relative h-64 md:h-72 w-full overflow-hidden rounded-t-3xl">
              <img
                src={
                  tour.mainImage?.startsWith("http")
                    ? tour.mainImage
                    : `${baseURL}/${tour.mainImage}`
                }
                alt={tour.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => (e.currentTarget.src = commonBanner)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* 📋 Card Content */}
            <div className="p-6 flex flex-col justify-between h-56">
              <h2 className="text-xl font-bold text-[#e82429] mb-3">
                {tour.title}
              </h2>
              <p className="text-gray-700 font-semibold mb-4 text-lg">
                From AED {tour.price} / Per Person
              </p>

              {/* ✅ Hover color updated to #e82429 */}
              <div className="mt-auto text-center bg-[#404041] text-white font-semibold py-3 rounded-2xl shadow-md hover:shadow-lg hover:bg-[#e82429] transition-all cursor-pointer">
                View Trip
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
