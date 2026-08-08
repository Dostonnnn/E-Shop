import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard({ role }) {
  return (
    <div>
      <div className="flex justify-between ">
        <div className="w-1/6 bg-[#0F172A] h-dvh">
          <Sidebar />
        </div>
        <div className="w-5/6">
          <Navbar role={role} />
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
