import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import AdminSidebar from "./AdminSidebar";
import { useState } from "react";


export default function AdminLayout() {
    const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAF3F3]">
      <NavbarAdmin />

      <div className="flex">
        <AdminSidebar isOpen={isOpen} />

        <main className="flex-1 p-6">
          
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow hover:bg-gray-50"
          >
            <span className="text-lg">🤩</span>
            <span className="text-sm font-semibold">
              {isOpen ? "Hide Sidebar" : "Show Sidebar"}
            </span>
          </button>

          <Outlet />
        </main>
      </div>
    </div>
  );
}