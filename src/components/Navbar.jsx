function Navbar() {
  return (
    <nav className="h-18 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-10 pl-4 pr-4 bg-[#F8FAFC] border border-gray-200 rounded-lg outline-none text-sm text-[#0F172A] placeholder:text-gray-400 focus:bg-white focus:border-[#0F172A] transition duration-200"
        />
      </div>

      <div className="flex items-center gap-4 ml-6">
        <div className="h-7 w-px bg-gray-200"></div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center">
            <span className="text-sm font-semibold text-white">A</span>
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#0F172A] leading-5">
              Bosh Administrator
            </p>

            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
