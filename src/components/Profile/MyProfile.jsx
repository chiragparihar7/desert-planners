import React, { useEffect, useState } from "react";
import { FiEdit2, FiSave, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DataService from "../../config/DataService";
import { API } from "../../config/API";

export default function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    profilePhoto: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch user data
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const api = DataService();
        const res = await api.get(API.USER_PROFILE);
        setUser({
          name: res.data.name || "",
          email: res.data.email || "",
          mobile: res.data.mobile || "",
          country: res.data.country || "",
          profilePhoto: res.data.profilePhoto || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, profilePhoto: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const api = DataService();
      await api.put(API.USER_UPDATE_PROFILE, user);
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] to-[#f2f2f2] py-10 px-6 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#e82429] text-white py-6 px-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-wide">My Profile</h2>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
            >
              <FiEdit2 /> Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-white text-[#e82429] font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FiSave /> {loading ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        {/* Body Section */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left - Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={user.profilePhoto || "/default-avatar.png"}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-[#e82429]/30 shadow-md"
              />
              {editMode && (
                <label className="absolute bottom-2 right-2 bg-[#e82429] text-white p-2 rounded-full cursor-pointer hover:bg-[#c51b22]">
                  <FiUpload className="text-lg" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>

          {/* Right - Profile Info */}
          <div className="md:col-span-2 space-y-5">
            <div>
              <label className="block text-gray-500 text-sm mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#e82429] ${
                  !editMode && "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 rounded-lg border bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-1">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={user.mobile}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#e82429] ${
                  !editMode && "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={user.country}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#e82429] ${
                  !editMode && "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t py-4 px-8 flex justify-end text-sm text-gray-500">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
