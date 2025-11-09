import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  Plane,
  Grid,
  CalendarCheck,
  CreditCard,
  Users,
  Mail,
  Settings,
  Menu,
  X,
  Layers,
  FileSpreadsheet, // ✅ NEW ICON (for visa category)
} from "lucide-react";

const ITEMS = [
  { tab: "overview", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { tab: "tours", label: "Tours", icon: <Briefcase size={20} /> },
  { tab: "visa", label: "Visa", icon: <Plane size={20} /> },
  { tab: "visaCategory", label: "Visa Categories", icon: <FileSpreadsheet size={20} /> }, // ✅ NEW TAB
  { tab: "category", label: "Tour Categories", icon: <Grid size={20} /> },
  { tab: "sections", label: "Sections", icon: <Layers size={20} /> },
  { tab: "bookings", label: "Bookings", icon: <CalendarCheck size={20} /> },
  { tab: "payments", label: "Payments", icon: <CreditCard size={20} /> },
  { tab: "users", label: "Users", icon: <Users size={20} /> },
  { tab: "enquiries", label: "Enquiries", icon: <Mail size={20} /> },
  { tab: "settings", label: "Settings", icon: <Settings size={20} /> },
];

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-[#ffffff] shadow-lg border-r border-gray-100 transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1
          className={`font-bold text-lg text-[#721011] tracking-wide ${
            sidebarOpen ? "block" : "hidden"
          }`}
        >
          Admin Panel
        </h1>
        <button
          onClick={toggleSidebar}
          className="text-[#404041] hover:text-[#e82429] transition-colors"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 mt-4 px-2">
        {ITEMS.map((item) => (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              activeTab === item.tab
                ? "bg-[#721011] text-white shadow-md"
                : "text-[#404041] hover:bg-[#e82429]/10"
            }`}
          >
            <div
              className={`transition-colors duration-200 ${
                activeTab === item.tab ? "text-white" : "text-[#e82429]"
              }`}
            >
              {item.icon}
            </div>
            {sidebarOpen && (
              <span
                className={`text-sm font-medium ${
                  activeTab === item.tab ? "text-white" : "text-[#404041]"
                }`}
              >
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer / Branding */}
      <div className="mt-auto text-center text-xs text-gray-400 p-3 border-t border-gray-200">
        {sidebarOpen && (
          <span>
            Made with ❤️ by{" "}
            <span className="text-[#721011] font-semibold">Desert Planners</span>
          </span>
        )}
      </div>
    </div>
  );
}
