import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <>
      <div className="w-64 min-h-screen bg-[#0F172A] px-4 py-5 flex flex-col">
        <div className="px-3 mb-8">
          <h1 className="text-lg font-bold text-white tracking-tight">
            Admin Panel
          </h1>

          <p className="text-xs text-slate-500 mt-1">Management system</p>
        </div>

        <div className="px-3 mb-3">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-500">
            Menu
          </p>
        </div>

        <ul className="flex flex-col gap-1">
          <li
            onClick={() => navigate("/dashboard")}
            className="group px-3 py-2.5 rounded-lg cursor-pointer text-slate-300 hover:bg-white/[0.06] hover:text-white transition duration-200 flex items-center gap-3"
          >
            <span className="w-7 h-7 rounded-md bg-white/[0.05] flex items-center justify-center text-xs text-slate-400 group-hover:text-white group-hover:bg-white/[0.08] transition">
              D
            </span>

            <span className="text-sm font-medium">Dashboard</span>
          </li>

          <li
            onClick={() => navigate("/dashboard/products")}
            className="group px-3 py-2.5 rounded-lg cursor-pointer text-slate-300 hover:bg-white/[0.06] hover:text-white transition duration-200 flex items-center gap-3"
          >
            <span className="w-7 h-7 rounded-md bg-white/[0.05] flex items-center justify-center text-xs text-slate-400 group-hover:text-white group-hover:bg-white/[0.08] transition">
              P
            </span>

            <span className="text-sm font-medium">Products</span>
          </li>

          <li
            onClick={() => navigate("/dashboard/category")}
            className="group px-3 py-2.5 rounded-lg cursor-pointer text-slate-300 hover:bg-white/[0.06] hover:text-white transition duration-200 flex items-center gap-3"
          >
            <span className="w-7 h-7 rounded-md bg-white/[0.05] flex items-center justify-center text-xs text-slate-400 group-hover:text-white group-hover:bg-white/[0.08] transition">
              C
            </span>

            <span className="text-sm font-medium">Category</span>
          </li>
        </ul>

        <div className="mt-auto pt-5 border-t border-white/[0.06]">
          <button
            onClick={() => setIsLogoutOpen(true)}
            className="w-full px-3 py-2.5 rounded-lg cursor-pointer text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition duration-200 flex items-center gap-3"
          >
            <span className="w-7 h-7 rounded-md bg-white/[0.05] flex items-center justify-center text-xs">
              ↪
            </span>

            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {isLogoutOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-sm flex items-center justify-center z-50 px-5">
          <div className="w-full max-w-sm bg-white rounded-2xl p-7 shadow-2xl border border-gray-100">
            <div className="flex justify-center mb-5">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center text-lg">
                ↪
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#0F172A] text-center">
              Logout
            </h2>

            <p className="text-sm text-gray-500 text-center mt-2">
              Are you sure you want to leave the admin panel?
            </p>

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setIsLogoutOpen(false)}
                className="flex-1 h-11 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-200 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 h-11 rounded-xl bg-[#0F172A] text-white text-sm font-medium hover:bg-[#1E293B] transition duration-200 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
