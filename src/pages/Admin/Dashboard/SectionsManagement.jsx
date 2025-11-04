import React, { useState, useEffect } from "react";
import Section from "../Dashboard/Section";
import { API } from "../../../config/API";
import DataService from "../../../config/DataService";
import toast from "react-hot-toast";
import { 
  Edit, 
  Trash2, 
  PlusCircle, 
  X, 
  Link, 
  Eye, 
  EyeOff, 
  Settings,
  Grid3X3,
  List,
  Search,
  Filter,
  ArrowRight,
  Image,
  ExternalLink,
  LayoutDashboard
} from "lucide-react";

export default function SectionManagement() {
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const [editSection, setEditSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [activeFilter, setActiveFilter] = useState("all");

  // Items
  const [openItems, setOpenItems] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", img: "", link: "" });
  const [editItem, setEditItem] = useState(null);
  const [itemLoading, setItemLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    type: "cities",
    description: "",
    isActive: true,
    maxItems: 8,
  });

  // ✅ Fetch sections
  const fetchSections = async () => {
    setLoading(true);
    try {
      const api = DataService();
      const res = await api.get(API.GET_SECTIONS);
      setSections(res.data);
    } catch (err) {
      toast.error("Error fetching sections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // ✅ Filter sections
  const filteredSections = sections.filter(section => {
    const matchesSearch = section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "active") return matchesSearch && section.isActive;
    if (activeFilter === "inactive") return matchesSearch && !section.isActive;
    
    return matchesSearch && section.type === activeFilter;
  });

  // ✅ Add or Update Section
  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = DataService();
    try {
      if (editSection) {
        await api.put(API.UPDATE_SECTION(editSection._id), formData);
        toast.success("Section updated successfully! 🎉");
      } else {
        await api.post(API.ADD_SECTION, formData);
        toast.success("Section created successfully! 🎉");
      }
      setOpen(false);
      setEditSection(null);
      fetchSections();
    } catch (err) {
      toast.error("Error saving section");
    }
  };

  const handleEdit = (section) => {
    setEditSection(section);
    setFormData({
      name: section.name,
      title: section.title,
      type: section.type,
      description: section.description || "",
      isActive: section.isActive,
      maxItems: section.maxItems || 8,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this section? This action cannot be undone.")) return;
    try {
      const api = DataService();
      await api.delete(API.DELETE_SECTION(id));
      toast.success("Section deleted successfully!");
      fetchSections();
    } catch {
      toast.error("Error deleting section");
    }
  };

  // ✅ Toggle Section Status
  const toggleSectionStatus = async (section) => {
    try {
      const api = DataService();
      await api.put(API.UPDATE_SECTION(section._id), {
        ...section,
        isActive: !section.isActive
      });
      toast.success(`Section ${!section.isActive ? 'activated' : 'deactivated'}!`);
      fetchSections();
    } catch {
      toast.error("Error updating section status");
    }
  };

  // ✅ Fetch Items
  const fetchItems = async (sectionId) => {
    setItemLoading(true);
    try {
      const api = DataService();
      const res = await api.get(API.GET_SECTION_ITEMS(sectionId));
      setItems(res.data);
    } catch {
      toast.error("Error fetching items");
    } finally {
      setItemLoading(false);
    }
  };

  // ✅ Add or Update Item
  const handleAddOrUpdateItem = async (e) => {
    e.preventDefault();
    const api = DataService();
    try {
      const payload = {
        ...newItem,
        sectionId: selectedSection._id,
      };

      if (editItem) {
        await api.put(API.UPDATE_SECTION_ITEM(editItem._id), payload);
        toast.success("Item updated successfully! 🎉");
      } else {
        await api.post(API.ADD_SECTION_ITEM(selectedSection._id), payload);
        toast.success("Item added successfully! 🎉");
      }

      setNewItem({ name: "", img: "", link: "" });
      setEditItem(null);
      fetchItems(selectedSection._id);
    } catch {
      toast.error("Error saving item");
    }
  };

  const handleEditItem = (item) => {
    setNewItem({ name: item.name, img: item.img, link: item.link || "" });
    setEditItem(item);
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const api = DataService();
      await api.delete(API.DELETE_SECTION_ITEM(id));
      toast.success("Item deleted successfully!");
      fetchItems(selectedSection._id);
    } catch {
      toast.error("Error deleting item");
    }
  };

  return (
    <Section title="Section Management">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <LayoutDashboard className="text-blue-600" size={32} />
              Section Management
            </h1>
            <p className="text-gray-600 text-lg">
              Organize and manage your homepage sections and content
            </p>
          </div>
          <button
            onClick={() => {
              setOpen(true);
              setEditSection(null);
              setFormData({
                name: "",
                title: "",
                type: "cities",
                description: "",
                isActive: true,
                maxItems: 8,
              });
            }}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <PlusCircle size={20} />
            Create New Section
          </button>
        </div>

        {/* Stats and Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Sections</p>
                <p className="text-2xl font-bold text-blue-900">{sections.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Grid3X3 className="text-white" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Active</p>
                <p className="text-2xl font-bold text-green-900">
                  {sections.filter(s => s.isActive).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Eye className="text-white" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Inactive</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sections.filter(s => !s.isActive).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                <EyeOff className="text-white" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Types</p>
                <p className="text-2xl font-bold text-purple-900">
                  {new Set(sections.map(s => s.type)).size}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Settings className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search sections by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Sections</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
                <option value="cities">Cities</option>
                <option value="attractions">Attractions</option>
                <option value="packages">Packages</option>
                <option value="experiences">Experiences</option>
              </select>
              
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Section Cards */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredSections.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings size={40} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Sections Found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || activeFilter !== "all" 
              ? "Try adjusting your search or filter criteria" 
              : "Get started by creating your first section"}
          </p>
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            Create First Section
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSections.map((section) => (
            <div
              key={section._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/60 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {section.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {section.description || "No description available"}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionStatus(section);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      section.isActive 
                        ? "text-green-600 hover:bg-green-50" 
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {section.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    section.isActive 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {section.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {section.type}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    Max: {section.maxItems}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setSelectedSection(section);
                      setOpenItems(true);
                      fetchItems(section._id);
                    }}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group/item"
                  >
                    Manage Items
                    <ArrowRight size={16} className="group-hover/item:translate-x-1 transition-transform" />
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(section)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit Section"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(section._id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Section"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredSections.map((section, index) => (
            <div
              key={section._id}
              className={`flex items-center justify-between p-6 hover:bg-gray-50 transition-all group ${
                index !== filteredSections.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-3 h-12 rounded-full ${
                  section.isActive ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {section.name}
                    </h3>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-blue-600 font-medium">
                      {section.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {section.description || "No description available"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-1">
                    <span>Max Items: {section.maxItems}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      section.isActive 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {section.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedSection(section);
                      setOpenItems(true);
                      fetchItems(section._id);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Manage Items
                  </button>
                  <button
                    onClick={() => handleEdit(section)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(section._id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Add / Edit Section Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {editSection ? "Edit Section" : "Create New Section"}
                </h3>
                <p className="text-gray-600 mt-1">
                  {editSection ? "Update your section details" : "Add a new section to your homepage"}
                </p>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  setEditSection(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Section Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Featured Cities"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Display Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Explore Amazing Cities"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Section Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="cities">Top Cities</option>
                    <option value="attractions">Top Attractions</option>
                    <option value="packages">Holiday Packages</option>
                    <option value="experiences">Experiences</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Maximum Items
                  </label>
                  <input
                    type="number"
                    placeholder="Max Items"
                    value={formData.maxItems}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxItems: parseInt(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    min="1"
                    max="20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Brief description of this section..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  rows="3"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Show on Homepage
                  </label>
                  <p className="text-sm text-gray-600">
                    {formData.isActive ? "Section is visible to users" : "Section is hidden from users"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                    formData.isActive ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      formData.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setEditSection(null);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg"
                >
                  {editSection ? "Update Section" : "Create Section"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Manage Items Modal */}
      {openItems && selectedSection && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
      {/* ✅ Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Manage Items – {selectedSection.name}
          </h3>
          <p className="text-gray-600 mt-1">
            {selectedSection.title} • {items.length} items
          </p>
        </div>
        <button
          onClick={() => {
            setOpenItems(false);
            setSelectedSection(null);
            setItems([]);
            setEditItem(null);
            setNewItem({
              name: "",
              img: "",
              link: "",
              title: "",
              price: "",
              duration: "",
              description: "",
            });
          }}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500 hover:text-red-500"
        >
          <X size={24} />
        </button>
      </div>

      {/* ✅ Body */}
      <div className="p-6 overflow-y-auto max-h-[80vh]">
        {/* Add / Edit Item Form */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <PlusCircle size={20} className="text-blue-600" />
            {editItem ? "Edit Item" : "Add New Item"}
          </h4>

          <form
            onSubmit={handleAddOrUpdateItem}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name *
              </label>
              <input
                type="text"
                placeholder="Enter item name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Short title or tagline"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="text"
                placeholder="Paste image URL"
                value={newItem.img}
                onChange={(e) =>
                  setNewItem({ ...newItem, img: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (AED)
              </label>
              <input
                type="number"
                placeholder="Enter price"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                placeholder="e.g. 3 Days / 2 Nights"
                value={newItem.duration}
                onChange={(e) =>
                  setNewItem({ ...newItem, duration: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link (optional)
              </label>
              <input
                type="text"
                placeholder="https://example.com"
                value={newItem.link}
                onChange={(e) =>
                  setNewItem({ ...newItem, link: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Enter short description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                rows="3"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 lg:col-span-3 flex justify-end pt-2">
              <button
                type="submit"
                className={`px-6 py-3 rounded-xl text-white font-semibold transition-all ${
                  editItem
                    ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                }`}
              >
                {editItem ? "Update Item" : "Add Item"}
              </button>
            </div>
          </form>
        </div>

        {/* ✅ Items Grid */}
        {itemLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
            <Image size={48} className="mx-auto mb-4 text-gray-400" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              No Items Yet
            </h4>
            <p className="text-gray-600 mb-4">
              Start by adding your first item to this section
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      item.img ||
                      `https://via.placeholder.com/300x200/f3f4f6/6b7280?text=No+Image`
                    }
                    alt={item.name}
                    className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditItem(item)}
                      className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors shadow-md"
                      title="Edit Item"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md"
                      title="Delete Item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {item.name}
                  </h4>
                  {item.title && (
                    <p className="text-sm text-gray-600 line-clamp-1 mb-1">
                      {item.title}
                    </p>
                  )}
                  {item.price && (
                    <p className="text-blue-600 font-semibold text-sm mb-1">
                      AED {item.price}
                    </p>
                  )}
                  {item.duration && (
                    <p className="text-gray-500 text-xs mb-2">
                      Duration: {item.duration}
                    </p>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                    >
                      <ExternalLink size={14} /> Visit Link
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)}

    </Section>
  );
}