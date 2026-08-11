import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Dashboard() {
  useEffect(() => {
    const loginMessage = localStorage.getItem("success-toast");

    if (loginMessage) {
      toast.success(loginMessage);
      localStorage.removeItem("success-toast");
    }
  }, []);

  return (
    <div className="flex w-full h-dvh bg-[#F4F6F8] text-[#0F172A]">
      <div className="w-64 shrink-0 h-dvh bg-[#0F172A]">
        <Sidebar />
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
