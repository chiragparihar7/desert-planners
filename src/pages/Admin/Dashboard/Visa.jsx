import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaMoneyBillWave  } from "react-icons/fa";
import AdminAddVisa from "./AdminAddVisa";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import toast from "react-hot-toast";

export default function AdminVisaManagement() {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editVisa, setEditVisa] = useState(null);
  const api = DataService();

  const fetchVisas = async () => {
    try {
      const res = await api.get(API.GET_VISAS);
      const visasArray = Array.isArray(res.data) ? res.data : res.data.visas || [];
      setVisas(visasArray);
    } catch (err) {
      toast.error("Error fetching visas");
      setVisas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisas();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this visa?")) return;
    try {
      await api.delete(API.DELETE_VISA(id));
      setVisas(visas.filter((v) => v._id !== id));
      toast.success("Visa deleted successfully");
    } catch (err) {
      toast.error("Error deleting visa");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Visa Management</h1>
        <button
          onClick={() => {
            setOpenModal(true);
            setEditVisa(null);
          }}
          className="flex items-center gap-2 bg-[#e82429] text-white px-4 py-2 rounded hover:bg-[#721011] transition"
        >
          <FaPlus /> Add New Visa
        </button>
      </div>

      {loading ? (
        <div className="text-gray-600">Loading visas...</div>
      ) : visas.length === 0 ? (
        <div className="text-gray-600">No visas found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visas.map((v) => (
            <div
              key={v._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Image Thumbnail */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={v.gallery?.[0] || v.img || "/placeholder.jpg"}
                  alt={v.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-5 space-y-2">
                <h2 className="text-lg font-bold text-[#404041] truncate">{v.title}</h2>
                <p className="text-sm text-gray-500 truncate">Slug: {v.slug}</p>
                <p className="text-sm text-gray-700 flex items-center gap-1 font-semibold">
  <FaMoneyBillWave className="text-[#e82429]" /> AED {v.price}
</p>
                <p className="text-gray-600 text-sm line-clamp-3">{v.overview || "No description available."}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {v.visaType && (
                    <span className="bg-[#e82429]/20 text-[#e82429] px-2 py-1 rounded-full text-xs font-medium">
                      {v.visaType}
                    </span>
                  )}
                  {v.entryType && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {v.entryType}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => {
                      setEditVisa(v);
                      setOpenModal(true);
                    }}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(v._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {openModal && (
        <AdminAddVisa
          closeModal={() => setOpenModal(false)}
          fetchVisas={fetchVisas}
          editVisa={editVisa}
        />
      )}
    </div>
  );
}
