import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import AdminSidebar from "./AdminSidebar";


export default function AdminLayout() {
    return (
    <div className="min-h-screen bg-[#FFEB76">
      <NavbarAdmin />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
        <Outlet />
        </main>
      </div>
    </div>
  )

}