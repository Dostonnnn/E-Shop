function Sidebar() {
  return (
    <div className="w-full  p-4 bg-[#0F172A] rounded-lg">
      <h2 className="py-2 px-5 bg-[#10B981] rounded-lg text-xl font-bold text-white">
        Admin Panel
      </h2>

      <ul className="flex flex-col gap-2 mt-5">
        <li className="px-3 py-2 rounded cursor-pointer text-slate-300 hover:bg-[#10B981] hover:text-white transition duration-300">
          Dashboard
        </li>

        <li className="px-3 py-2 rounded cursor-pointer text-slate-300 hover:bg-[#10B981] hover:text-white transition duration-300">
          Products
        </li>

        <li className="px-3 py-2 rounded cursor-pointer text-slate-300 hover:bg-[#10B981] hover:text-white transition duration-300">
          Category
        </li>
        <li className="px-3 py-2 rounded cursor-pointer text-slate-300 hover:bg-red-600 hover:text-white transition duration-300">
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
