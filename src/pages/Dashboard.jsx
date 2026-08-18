import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const statsApi = "https://backend.magnateshop.uz/api/dashboard/stats";
  const catStatsApi =
    "https://backend.magnateshop.uz/api/dashboard/category-stats";
  const lowStockApi =
    "https://backend.magnateshop.uz/api/dashboard/low-stock?threshold=3";

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [categoryStats, setCategoryStats] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    setLoading(true);

    // General Stats API
    axios
      .get(statsApi, { headers })
      .then((res) => {
        setStats(res.data.data);
      })
      .catch(() => {
        toast.error("Stats failed to load");
      });

    // Category Stats API
    axios
      .get(catStatsApi, { headers })
      .then((res) => {
        setCategoryStats(res.data.data || []);
      })
      .catch(() => {
        toast.error("Category stats failed to load");
      });

    // Low Stock API
    axios
      .get(lowStockApi, { headers })
      .then((res) => {
        setLowStock(res.data.data || []);
      })
      .catch(() => {
        toast.error("Low stock items failed to load");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(lowStock.length / limit) || 1;
  const paginatedLowStock = lowStock.slice((page - 1) * limit, page * limit);

  const next = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prev = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center bg-[#0B0F17]">
        <p className="text-xs uppercase tracking-widest font-mono text-cyan-400 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#0B0F17] min-h-screen text-zinc-100 font-sans tracking-wide space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-6 bg-cyan-400 rounded-full inline-block"></span>
          Dashboard Control
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Tizim statistikasi va umumiy ko'rsatkichlar
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-zinc-800 rounded-xl p-4 shadow-lg">
          <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            Jami mahsulotlar
          </p>
          <p className="text-2xl font-black font-mono text-cyan-300 mt-2">
            {stats?.products?.total || 0}
          </p>
        </div>

        <div className="bg-[#111827] border border-zinc-800 rounded-xl p-4 shadow-lg">
          <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            Kam qolganlar
          </p>
          <p className="text-2xl font-black font-mono text-amber-400 mt-2">
            {stats?.products?.lowStock || 0}
          </p>
        </div>

        <div className="bg-[#111827] border border-zinc-800 rounded-xl p-4 shadow-lg">
          <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            Tugaganlar
          </p>
          <p className="text-2xl font-black font-mono text-rose-400 mt-2">
            {stats?.products?.outOfStock || 0}
          </p>
        </div>

        <div className="bg-[#111827] border border-zinc-800 rounded-xl p-4 shadow-lg">
          <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            Kategoriyalar
          </p>
          <p className="text-2xl font-black font-mono text-violet-400 mt-2">
            {stats?.categories?.total || 0}
          </p>
        </div>
      </div>

      <div className="bg-[#111827]/80 border border-zinc-800 rounded-xl p-5 shadow-lg backdrop-blur-md">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet-400"></span>
          Kategoriyalar bo'yicha statistika
        </h2>

        {categoryStats.length === 0 ? (
          <p className="text-xs text-zinc-500 font-mono text-center py-4">
            Kategoriya statistikasi mavjud emas
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categoryStats.map((cat) => (
              <div
                key={cat.id}
                className="bg-[#0B0F17] border border-zinc-800 p-3.5 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-xs font-semibold text-zinc-200">
                    {cat.name}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">
                    {cat.productsCount} ta
                  </p>
                </div>
                <span className="w-2 h-2 rounded-full bg-cyan-400/80"></span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#111827]/80 border border-zinc-800 rounded-xl backdrop-blur-md shadow-lg overflow-hidden">
        <div className="p-4 border-b border-zinc-800 bg-[#161F30]/40">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Kam qolgan mahsulotlar
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-[#161F30]/60 text-zinc-400 text-[11px] uppercase tracking-wider font-bold">
                <th className="p-3.5">Rasm</th>
                <th className="p-3.5">Nomi</th>
                <th className="p-3.5">Kategoriya</th>
                <th className="p-3.5">Narxi</th>
                <th className="p-3.5">Zaxira</th>
                <th className="p-3.5">Holati</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs">
              {paginatedLowStock.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 text-center text-xs text-zinc-500 font-mono"
                  >
                    Kam qolgan mahsulotlar yo'q
                  </td>
                </tr>
              ) : (
                paginatedLowStock.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-cyan-950/20 transition-colors duration-150"
                  >
                    <td className="p-3.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-9 h-9 object-cover rounded-md border border-zinc-700 bg-zinc-900"
                      />
                    </td>
                    <td className="p-3.5 font-semibold text-zinc-200">
                      {item.name}
                    </td>
                    <td className="p-3.5 text-zinc-400">
                      {item.category?.name}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-cyan-300">
                      {item.price} UZS
                    </td>
                    <td className="p-3.5 font-mono font-bold text-zinc-200">
                      {item.stock} ta
                    </td>
                    <td className="p-3.5">
                      {item.stock === 0 ? (
                        <span className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-[10px] font-bold uppercase tracking-wider text-rose-400">
                          Tugagan
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          Oz qolgan
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-zinc-800 bg-[#161F30]/30 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={page === 1}
            className="px-4 py-2 border border-zinc-700 bg-zinc-900/50 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-zinc-900/50 transition cursor-pointer"
          >
            Previous
          </button>

          <p className="text-xs text-zinc-400 font-mono">
            Page {page} of {totalPages}
          </p>

          <button
            onClick={next}
            disabled={page === totalPages}
            className="px-4 py-2 border border-zinc-700 bg-zinc-900/50 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-zinc-900/50 transition cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
