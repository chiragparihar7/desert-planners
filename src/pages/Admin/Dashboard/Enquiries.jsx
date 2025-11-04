import React, { useEffect, useState } from "react";
import { FaTrash, FaEnvelope, FaPhoneAlt, FaUser, FaClipboardList } from "react-icons/fa";
import { io } from "socket.io-client";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import toast from "react-hot-toast";

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const api = DataService();
  const token = localStorage.getItem("adminToken");

  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

  const fetchEnquiries = async () => {
    if (!token) {
      alert("Admin not logged in or token missing!");
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(API.GET_ALL_ENQUIRIES, {
        params: { page, search, limit: 9 },
        headers: { Authorization: `Bearer ${token}` },
      });
      let fetched = res.data.enquiries;
      if (filterStatus !== "All") {
        fetched = fetched.filter((e) => e.status === filterStatus);
      }
      setEnquiries(fetched);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
      toast(err.response?.data?.message || "Error fetching enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();

    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socket.on("newEnquiry", (enquiry) => {
      fetchEnquiries();
    });
    return () => socket.disconnect();
  }, [page, search, filterStatus]);

  // ✅ Status Update
  const handleStatusChange = async (id, status) => {
    if (!token) return alert("Admin token missing!");

    try {
      await api.patch(
        `${API.UPDATE_ENQUIRY_STATUS(id)}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast("Status updated successfully!");
      fetchEnquiries();
    } catch (err) {
      console.error("Status update error:", err.response?.data || err.message);
      toast(err.response?.data?.message || "Error updating status");
    }
  };

  // ✅ Delete Enquiry
  const handleDelete = async (id) => {
    if (!token) return alert("Admin token missing!");

    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      try {
        await api.delete(`${API.DELETE_ENQUIRY(id)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast("Enquiry deleted successfully!");
        fetchEnquiries();
      } catch (err) {
        console.error("Delete error:", err.response?.data || err.message);
        toast(err.response?.data?.message || "Error deleting enquiry");
      }
    }
  };

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    "In Progress": "bg-blue-100 text-blue-800 border-blue-300",
    Completed: "bg-green-100 text-green-800 border-green-300",
  };

  const statusButtons = ["All", "Pending", "In Progress", "Completed"];

  return (
    <div className="p-8 bg-gradient-to-br from-[#f9fafb] via-[#ffffff] to-[#f0f4f7] min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-[#721011] mb-4 sm:mb-0">
          🧾 Enquiries Overview
        </h1>

        <input
          type="text"
          placeholder="🔍 Search enquiries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#e82429] outline-none bg-white shadow-sm"
        />
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {statusButtons.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full border transition-all ${
              filterStatus === status
                ? "bg-[#e82429] text-white shadow-lg"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-[#e82429] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-2xl font-semibold">No enquiries found 😔</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enquiries.map((enq) => (
            <div
              key={enq._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 relative border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-[#721011] flex items-center gap-2">
                  <FaUser className="text-[#e82429]" /> {enq.name}
                </h3>
                <button
                  onClick={() => handleDelete(enq._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
              <p className="text-gray-600">
                <FaEnvelope className="inline text-[#e82429]" /> {enq.email}
              </p>
              <p className="text-gray-600">
                <FaPhoneAlt className="inline text-[#e82429]" /> {enq.contactNumber}
              </p>
              <p className="text-gray-600">
                <FaClipboardList className="inline text-[#e82429]" /> {enq.services}
              </p>
              <p className="italic text-gray-500 border-l-4 border-[#e82429] pl-3 mt-2">
                {enq.message}
              </p>

              <div className="flex justify-between items-center mt-3">
                <select
                  value={enq.status || "Pending"}
                  onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                  className={`px-3 py-1 text-sm rounded-lg border font-medium ${statusColors[enq.status || "Pending"]}`}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>

                <span className="text-xs text-gray-400">
                  {new Date(enq.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-end mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-white border rounded-lg shadow">
          Page {page}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
