// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Plus, Trash2, Edit, Save, X } from "lucide-react";

// export default function SectionItems() {
//   const { sectionId } = useParams();
//   const [items, setItems] = useState([]);
//   const [formData, setFormData] = useState({ name: "", img: "", link: "" });
//   const [editingItem, setEditingItem] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     const res = await axios.get(`/api/section-items/${sectionId}`);
//     setItems(res.data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (editingItem) {
//       // ✅ Update
//       await axios.put(`/api/section-items/${editingItem._id}`, formData);
//     } else {
//       // ✅ Create
//       await axios.post(`/api/section-items`, { ...formData, sectionId });
//     }

//     setFormData({ name: "", img: "", link: "" });
//     setEditingItem(null);
//     setLoading(false);
//     fetchItems();
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setFormData({ name: item.name, img: item.img, link: item.link });
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this item?")) {
//       await axios.delete(`/api/section-items/${id}`);
//       fetchItems();
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Manage Section Items</h2>

//       {/* Add/Edit Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow p-4 rounded-lg mb-6"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <input
//             type="text"
//             placeholder="City Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={formData.img}
//             onChange={(e) => setFormData({ ...formData, img: e.target.value })}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Link (optional)"
//             value={formData.link}
//             onChange={(e) => setFormData({ ...formData, link: e.target.value })}
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="flex gap-3 mt-4">
//           <button
//             disabled={loading}
//             type="submit"
//             className="flex-1 bg-[#e82429] text-white py-2 rounded-lg hover:bg-red-700 transition"
//           >
//             {editingItem ? "Update Item" : "Add Item"}
//           </button>
//           {editingItem && (
//             <button
//               type="button"
//               onClick={() => {
//                 setEditingItem(null);
//                 setFormData({ name: "", img: "", link: "" });
//               }}
//               className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Item List */}
//       <div className="bg-white rounded-lg shadow divide-y">
//         {items.length === 0 ? (
//           <p className="text-center py-10 text-gray-500">No items found.</p>
//         ) : (
//           items.map((item) => (
//             <div
//               key={item._id}
//               className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.img}
//                   alt={item.name}
//                   className="w-16 h-16 rounded object-cover border"
//                 />
//                 <div>
//                   <h4 className="font-semibold">{item.name}</h4>
//                   <p className="text-sm text-gray-500">{item.link}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => handleEdit(item)}
//                   className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
//                 >
//                   <Edit size={16} />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(item._id)}
//                   className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
