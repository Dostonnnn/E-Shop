import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#09090b] text-white">
      <div className="w-64 shrink-0 bg-[#111113]">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-16 shrink-0 bg-[#111113]">
          <Navbar />
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto bg-[#09090b]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
