import React, { useEffect, useState } from "react";
import { API } from "../../../config/API";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function HolidayCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch All Holiday Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API.BASE_URL}${API.GET_HOLIDAY_CATEGORIES}`
      );
      setCategories(data);
    } catch (err) {
      console.log("Error fetching holiday categories:", err);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Add / Update Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Category name is required");

    setLoading(true);

    try {
      if (editId) {
        // UPDATE CATEGORY
        await axios.put(
          `${API.BASE_URL}${API.UPDATE_HOLIDAY_CATEGORY(editId)}`,
          { name }
        );
      } else {
        // ADD CATEGORY
        await axios.post(`${API.BASE_URL}${API.ADD_HOLIDAY_CATEGORY}`, {
          name,
        });
      }

      setName("");
      setEditId(null);
      getAllCategories();
    } catch (err) {
      console.log("Error:", err);
      alert(err?.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  // Delete Category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await axios.delete(`${API.BASE_URL}${API.DELETE_HOLIDAY_CATEGORY(id)}`);
      getAllCategories();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // Edit Category Setup
  const handleEdit = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#721011]">
        Holiday Categories
      </h2>

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 mb-8 bg-[#f9f3f3] p-4 rounded-xl"
      >
        <input
          type="text"
          placeholder="Enter holiday category name"
          className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#e82429]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          type="submit"
          className="flex items-center gap-2 bg-gradient-to-r from-[#e82429] to-[#721011] text-white px-4 py-3 rounded-xl shadow hover:opacity-90 transition-all"
        >
          <Plus size={18} />
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* Categories List */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-xl overflow-hidden">
          <thead className="bg-[#721011] text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Category Name</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr
                  key={cat._id}
                  className="border-b hover:bg-[#f8f0f0] transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{cat.name}</td>
                  <td className="p-3">{cat.slug}</td>

                  <td className="p-3 flex items-center justify-center gap-3">
                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(cat)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={20} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500 italic"
                >
                  No holiday categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="mt-4 text-center text-[#721011] font-medium">
          Saving category...
        </div>
      )}
    </div>
  );
}
