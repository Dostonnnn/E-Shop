function Navbar() {
  return (
    <nav className="h-16 px-6 bg-[#0B0F17] border-b border-zinc-800 flex items-center justify-between text-zinc-100 font-sans">
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-9 pl-4 pr-4 bg-[#111827] border border-zinc-800 rounded-lg outline-none text-xs text-zinc-200 placeholder:text-zinc-500 focus:border-cyan-500 transition duration-200"
        />
      </div>

      <div className="flex items-center gap-4 ml-6">
        <div className="h-6 w-px bg-zinc-800"></div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-bold text-zinc-200 leading-tight">
              Bosh Administrator
            </p>

            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
