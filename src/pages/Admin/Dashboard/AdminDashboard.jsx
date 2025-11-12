import React, { useState } from "react";
import Sidebar from "./Sidebar";

// Import all sections (add BannerManagement file in same folder)
import Overview from "./Overview";
import ToursManagement from "./ToursManagement";
import TourCategory from "./TourCategory";
import VisaCategory from "./VisaCategory";
import Bookings from "./Bookings";
import Payments from "./Payments";
import Users from "./Users";
import Enquiries from "./Enquiries";
import Settings from "./Settings";
import Visa from "./Visa";
import SectionsManagement from "./SectionsManagement";
import BannerManagement from "./BannerManagement"; // <-- new banner tab

export default function AdminDashboard() {
  // default activeTab can be changed to "banner" if you want banner open by default
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const TABS = {
    overview: Overview,
    tours: ToursManagement,
    visa: Visa,
    visaCategory: VisaCategory,
    category: TourCategory,
    sections: SectionsManagement,
    bookings: Bookings,
    payments: Payments,
    users: Users,
    enquiries: Enquiries,
    banner: BannerManagement, // <-- added
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

      <main className="flex-1 p-6 overflow-y-auto">
        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <div className="p-8 bg-white rounded-2xl shadow">
            <p>No component found</p>
          </div>
        )}
      </main>
    </div>
  );
}
