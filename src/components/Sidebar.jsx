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
      <div className="w-64 min-h-screen bg-[#0B0F17] border-r border-zinc-800 px-4 py-5 flex flex-col text-zinc-100 font-sans">
        <div className="px-3 mb-8">
          <h1 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-5 bg-cyan-400 rounded-full inline-block"></span>
            Admin Panel
          </h1>

          <p className="text-xs text-zinc-500 mt-1">Management system</p>
        </div>

        <div className="px-3 mb-3">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
            Menu
          </p>
        </div>

        <ul className="flex flex-col gap-1">
          <li
            onClick={() => navigate("/dashboard")}
            className="group px-3 py-2.5 rounded-lg cursor-pointer text-zinc-400 hover:bg-zinc-900/80 hover:text-cyan-400 transition duration-200 flex items-center gap-3 border border-transparent hover:border-zinc-800"
          >
            <span className="w-7 h-7 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition">
              D
            </span>

            <span className="text-sm font-medium">Dashboard</span>
          </li>

          <li
            onClick={() => navigate("/dashboard/products")}
            className="group px-3 py-2.5 rounded-lg cursor-pointer text-zinc-400 hover:bg-zinc-900/80 hover:text-cyan-400 transition duration-200 flex items-center gap-3 border border-transparent hover:border-zinc-800"
          >
            <span className="w-7 h-7 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition">
              P
            </span>

            <span className="text-sm font-medium">Products</span>
          </li>

          <li
            onClick={() => navigate("/dashboard/category")}
            className="group px-3 py-2.5 rounded-lg cursor-pointer text-zinc-400 hover:bg-zinc-900/80 hover:text-cyan-400 transition duration-200 flex items-center gap-3 border border-transparent hover:border-zinc-800"
          >
            <span className="w-7 h-7 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition">
              C
            </span>

            <span className="text-sm font-medium">Category</span>
          </li>
        </ul>

        <div className="mt-auto pt-5 border-t border-zinc-800">
          <button
            onClick={() => setIsLogoutOpen(true)}
            className="w-full px-3 py-2.5 rounded-lg cursor-pointer text-zinc-400 hover:bg-rose-500/10 hover:text-rose-400 border border-transparent hover:border-rose-500/20 transition duration-200 flex items-center gap-3"
          >
            <span className="w-7 h-7 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs text-zinc-400 hover:text-rose-400 transition">
              ↪
            </span>

            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {isLogoutOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 px-5">
          <div className="w-full max-w-sm bg-[#111827] border border-zinc-800 rounded-xl p-6 shadow-2xl">
            <div className="flex justify-center mb-4">
              <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-lg">
                ↪
              </div>
            </div>

            <h2 className="text-lg font-bold text-white uppercase tracking-wider text-center">
              Logout
            </h2>

            <p className="text-xs text-zinc-400 text-center mt-2">
              Are you sure you want to leave the admin panel?
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsLogoutOpen(false)}
                className="flex-1 py-2 border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition cursor-pointer shadow-lg shadow-rose-600/20"
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
