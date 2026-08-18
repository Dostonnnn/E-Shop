import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Categories = () => {
  const api = "https://backend.magnateshop.uz/api/categories";

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const [confirmId, setConfirmId] = useState("");
  const [add, setAdd] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCategories = () => {
      const token = localStorage.getItem("token");
      setLoading(true);
      axios
        .get(api, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            limit: 10,
          },
        })
        .then((res) => {
          setCategories(res.data.data.items);
          setTotalPage(res.data.data.meta.totalPages);
        })
        .catch(() => {
          toast.error("Failed to load categories");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchCategories();
  }, [page]);

  const openEdit = (item) => {
    setEdit(item);
    setName(item.name);
    setDescription(item.description);
  };

  const clearForm = () => {
    setName("");
    setDescription("");
  };

  const addCategory = () => {
    const token = localStorage.getItem("token");
    const payload = {
      name: name,
      description: description,
    };

    axios
      .post(api, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Category added");
        setAdd(false);
        clearForm();
        setPage(1);
      })
      .catch(() => {
        toast.error("Failed to add category");
      });
  };

  const updateCategory = () => {
    const token = localStorage.getItem("token");

    const payload = {
      name: name,
      description: description,
    };

    axios
      .patch(`${api}/${edit.id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Category updated");
        setEdit(null);
        clearForm();
        setPage((prev) => prev);
      })
      .catch(() => {
        toast.error("Failed to update category");
      });
  };

  const deleteCategory = () => {
    if (Number(confirmId) !== del.id) {
      toast.error("Kiritilgan ID mos kelmadi!");
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .delete(`${api}/${del.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Category deleted");
        setDel(null);
        setConfirmId("");
        setPage((prev) => prev);
      })
      .catch(() => {
        toast.error("Failed to delete category");
      });
  };

  const changeStatus = (item, status) => {
    const token = localStorage.getItem("token");

    axios
      .patch(
        `${api}/${item.id}/status`,
        {
          isActive: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        toast.success(status ? "Activated" : "Deactivated");
        setPage((prev) => prev);
      })
      .catch(() => {
        toast.error("Failed to change status");
      });
  };

  const next = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="p-6 bg-[#0B0F17] min-h-screen text-zinc-100 font-sans">
      <div className="mb-7 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-6 bg-cyan-400 rounded-full inline-block"></span>
            Categories
          </h1>

          <p className="text-xs text-zinc-400 mt-1">
            Manage car categories and their status
          </p>
        </div>

        <button
          onClick={() => {
            clearForm();
            setAdd(true);
          }}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-cyan-500/20"
        >
          + Add Category
        </button>
      </div>

      <div className="bg-[#111827]/80 border border-zinc-800 rounded-xl shadow-lg backdrop-blur-md overflow-hidden">
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <p className="text-xs uppercase tracking-widest font-mono text-cyan-400 animate-pulse">
              Loading...
            </p>
          </div>
        ) : (
          <>
            <table className="w-full table-fixed text-left border-collapse">
              <thead className="bg-[#161F30]/60 border-b border-zinc-800">
                <tr className="text-zinc-400 text-[11px] uppercase tracking-wider font-bold">
                  <th className="w-[8%] px-3 py-4">ID</th>
                  <th className="w-[20%] px-3 py-4">Category</th>
                  <th className="w-[30%] px-3 py-4">Description</th>
                  <th className="w-[12%] px-3 py-4">Products</th>
                  <th className="w-[10%] px-3 py-4">Status</th>
                  <th className="w-[10%] px-3 py-4">Edit</th>
                  <th className="w-[10%] px-3 py-4">Delete</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800/60 text-xs">
                {categories.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-cyan-950/20 transition-colors duration-150"
                  >
                    <td className="px-3 py-4 font-mono text-zinc-500">
                      #{item.id}
                    </td>

                    <td className="px-3 py-4 font-semibold text-zinc-200 truncate">
                      {item.name}
                    </td>

                    <td className="px-3 py-4">
                      <p className="text-xs text-zinc-400 truncate">
                        {item.description}
                      </p>
                    </td>

                    <td className="px-3 py-4 font-mono font-bold text-cyan-300">
                      {item.productsCount ?? 0} cars
                    </td>

                    <td className="px-3 py-4">
                      {item.isActive ? (
                        <button
                          onClick={() => changeStatus(item, false)}
                          className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider text-emerald-400 cursor-pointer"
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          onClick={() => changeStatus(item, true)}
                          className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-[10px] font-bold uppercase tracking-wider text-rose-400 cursor-pointer"
                        >
                          Inactive
                        </button>
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <button
                        onClick={() => openEdit(item)}
                        className="px-3 py-1.5 rounded-lg border border-zinc-700 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>

                    <td className="px-3 py-4">
                      <button
                        onClick={() => {
                          setDel(item);
                          setConfirmId("");
                        }}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400 hover:bg-rose-600 hover:text-white transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-5 py-4 border-t border-zinc-800 bg-[#161F30]/30 flex items-center justify-between">
              <button
                onClick={prev}
                disabled={page === 1}
                className="px-4 py-2 border border-zinc-700 bg-zinc-900/50 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-zinc-900/50 transition cursor-pointer"
              >
                Previous
              </button>

              <p className="text-xs text-zinc-400 font-mono">
                Page {page} of {totalPage}
              </p>

              <button
                onClick={next}
                disabled={page === totalPage}
                className="px-4 py-2 border border-zinc-700 bg-zinc-900/50 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-zinc-900/50 transition cursor-pointer"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {(add || edit) && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-5">
          <div className="bg-[#111827] border border-zinc-800 w-full max-w-md rounded-xl p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">
              {add ? "Add Category" : "Edit Category"}
            </h2>

            <div className="flex flex-col gap-3 mt-5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category Name"
                className="bg-[#0B0F17] border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 rounded-lg px-3 py-2 outline-none focus:border-cyan-500 transition"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows="4"
                className="bg-[#0B0F17] border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 rounded-lg px-3 py-2 outline-none focus:border-cyan-500 transition resize-none"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setAdd(false);
                  setEdit(null);
                }}
                className="flex-1 py-2 border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={add ? addCategory : updateCategory}
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                {add ? "Add" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {del && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-5">
          <div className="bg-[#111827] border border-zinc-800 w-full max-w-sm rounded-xl p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider text-center">
              Delete Category
            </h2>

            <p className="text-zinc-400 text-xs text-center mt-3">
              Tasdiqlash uchun kategoriya ID-sini kiritishingiz kerak:
            </p>

            <p className="text-center font-bold text-rose-400 font-mono text-sm mt-1">
              ID: {del.id} ({del.name})
            </p>

            <input
              type="number"
              value={confirmId}
              onChange={(e) => setConfirmId(e.target.value)}
              placeholder="Kategoriya ID-sini kiriting"
              className="w-full mt-4 bg-[#0B0F17] border border-zinc-800 text-xs text-center text-zinc-200 placeholder-zinc-500 rounded-lg px-3 py-2 outline-none focus:border-rose-500 transition font-mono"
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setDel(null);
                  setConfirmId("");
                }}
                className="flex-1 py-2 border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={deleteCategory}
                disabled={Number(confirmId) !== del.id}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-30 disabled:hover:bg-rose-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition cursor-pointer shadow-lg shadow-rose-600/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
