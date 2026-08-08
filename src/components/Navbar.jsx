function Navbar({ role }) {
  return (
    <nav className="flex justify-between items-center p-4 border bg-[#0F172A]">
      <input
        type="text"
        placeholder="Search"
        className="bg-[#F8FAFC] border-[#0F172A] border outline-0 rounded-lg px-3 py-2 text-[#0F172A]"
      />

      <p className="py-2 px-5 rounded-lg bg-[#10B981] font-semibold text-[#F8FAFC]">
        {role}
      </p>
    </nav>
  );
}

export default Navbar;
