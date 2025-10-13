import { useParams } from "react-router-dom";
import toursData from "../data/toursData";

export default function TourServiceDetails() {
  const { slug, serviceSlug } = useParams();

  const tour = toursData.find((t) => t.slug === slug);
  if (!tour) return <h2 className="text-center py-10">Tour not found</h2>;

  const service = tour.services.find(
    (s) => s.title.toLowerCase().replace(/\s+/g, "-") === serviceSlug
  );

  if (!service)
    return <h2 className="text-center py-10">Service not found</h2>;

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={service.img}
          alt={service.title}
          className="w-full md:w-1/2 h-72 object-cover rounded-xl shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-[#e82429] mb-3">
            {service.title}
          </h1>
          <p className="text-gray-700 mb-4">{tour.description}</p>
          <p className="text-lg font-semibold mb-6">Price: {service.price}</p>
          <button className="bg-[#e82429] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#721011] transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
