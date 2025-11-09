import React, { useState } from "react";
import Sidebar from "./Sidebar";

// Import all sections
import Overview from "./Overview";
import ToursManagement from "./ToursManagement";
import TourCategory from "./TourCategory";
import VisaCategory from "./VisaCategory"; // ✅ NEW IMPORT
import Bookings from "./Bookings";
import Payments from "./Payments";
import Users from "./Users";
import Enquiries from "./Enquiries";
import Settings from "./Settings";
import Visa from "./Visa";
import SectionsManagement from "./SectionsManagement"; 

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const TABS = {
    overview: Overview,
    tours: ToursManagement,
    visa: Visa,
    visaCategory: VisaCategory, // ✅ NEW TAB ADDED HERE
    category: TourCategory,
    sections: SectionsManagement,
    bookings: Bookings,
    payments: Payments,
    users: Users,
    enquiries: Enquiries,
    settings: Settings,
  };

  const ActiveComponent = TABS[activeTab];

  return (
    <div className="flex h-screen bg-[var(--color-light-gray)]">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 p-6 overflow-y-auto">
        {ActiveComponent ? <ActiveComponent /> : <p>No component found</p>}
      </div>
    </div>
  );
}
