import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Products = () => {
  const api = "https://backend.magnateshop.uz/api/products";

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const [add, setAdd] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
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
        setProducts(res.data.data.items);
        setTotalPage(res.data.data.meta.totalPages);
      })
      .catch(() => {
        toast.error("Failed");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  const openEdit = (item) => {
    setEdit(item);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setStock(item.stock);
    setImage(item.image);
    setCategoryId(item.categoryId);
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setImage("");
    setCategoryId("");
  };

  const addProduct = () => {
    const token = localStorage.getItem("accessToken");

    const data = {
      name: name,
      description: description,
      price: Number(price),
      stock: Number(stock),
      image: image,
      categoryId: Number(categoryId),
    };

    axios
      .post(api, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Added");
        setAdd(false);
        clearForm();
        setPage(1);
      })
      .catch(() => {
        toast.error("Failed");
      });
  };

  const updateProduct = () => {
    const token = localStorage.getItem("accessToken");

    const data = {
      name: name,
      description: description,
      price: Number(price),
      stock: Number(stock),
      image: image,
      categoryId: Number(categoryId),
    };

    axios
      .patch(`${api}/${edit.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Updated");
        setEdit(null);
        clearForm();
        setPage(page);
      })
      .catch(() => {
        toast.error("Failed");
      });
  };

  const deleteProduct = () => {
    const token = localStorage.getItem("accessToken");

    axios
      .delete(`${api}/${del.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Deleted");
        setDel(null);
        setPage(page);
      })
      .catch(() => {
        toast.error("Failed");
      });
  };

  const changeStatus = (item, status) => {
    const token = localStorage.getItem("accessToken");

    axios
      .patch(
        `${api}/${item.id}`,
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
        setPage(page);
      })
      .catch(() => {
        toast.error("Failed");
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
    <div>
      <div className="mb-7 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Products</h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your products and inventory
          </p>
        </div>

        <button
          onClick={() => {
            clearForm();
            setAdd(true);
          }}
          className="px-4 py-2 bg-[#0F172A] text-white rounded-lg text-sm hover:bg-slate-800 transition cursor-pointer"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        ) : (
          <>
            <table className="w-full table-fixed text-left">
              <thead className="bg-[#FAFBFC] border-b">
                <tr>
                  <th className="w-[5%] px-3 py-4 text-xs text-gray-400">ID</th>

                  <th className="w-[19%] px-3 py-4 text-xs text-gray-400">
                    Product
                  </th>

                  <th className="w-[25%] px-3 py-4 text-xs text-gray-400">
                    Description
                  </th>

                  <th className="w-[14%] px-3 py-4 text-xs text-gray-400">
                    Price
                  </th>

                  <th className="w-[12%] px-3 py-4 text-xs text-gray-400">
                    Status
                  </th>

                  <th className="w-[12%] px-3 py-4 text-xs text-gray-400">
                    Edit
                  </th>

                  <th className="w-[13%] px-3 py-4 text-xs text-gray-400">
                    Delete
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAFBFC] transition">
                    <td className="px-3 py-4 text-sm text-gray-400">
                      #{item.id}
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-9 h-9 rounded-lg object-cover shrink-0"
                        />

                        <p className="text-sm font-semibold text-[#0F172A] truncate">
                          {item.name}
                        </p>
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      <p className="text-sm text-gray-500 truncate">
                        {item.description}
                      </p>
                    </td>

                    <td className="px-3 py-4 text-sm font-semibold text-[#0F172A]">
                      {item.price.toLocaleString()} UZS
                    </td>

                    <td className="px-3 py-4">
                      {item.isActive ? (
                        <button
                          onClick={() => changeStatus(item, false)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-600 cursor-pointer"
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          onClick={() => changeStatus(item, true)}
                          className="px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-100 text-xs font-semibold text-red-600 cursor-pointer"
                        >
                          Inactive
                        </button>
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <button
                        onClick={() => openEdit(item)}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>

                    <td className="px-3 py-4">
                      <button
                        onClick={() => setDel(item)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-5 py-4 border-t flex items-center justify-between">
              <button
                onClick={prev}
                disabled={page === 1}
                className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>

              <p className="text-sm text-gray-500">
                Page {page} of {totalPage}
              </p>

              <button
                onClick={next}
                disabled={page === totalPage}
                className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {(add || edit) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="bg-white w-full max-w-lg rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#0F172A]">
              {add ? "Add Product" : "Edit Product"}
            </h2>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="border rounded-lg px-3 py-2 outline-none"
              />

              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Price"
                className="border rounded-lg px-3 py-2 outline-none"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows="3"
                className="border rounded-lg px-3 py-2 outline-none resize-none col-span-2"
              />

              <input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                type="number"
                placeholder="Stock"
                className="border rounded-lg px-3 py-2 outline-none"
              />

              <input
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                type="number"
                placeholder="Category ID"
                className="border rounded-lg px-3 py-2 outline-none"
              />

              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
                className="border rounded-lg px-3 py-2 outline-none col-span-2"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setAdd(false);
                  setEdit(null);
                }}
                className="flex-1 py-2 border rounded-lg cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={add ? addProduct : updateProduct}
                className="flex-1 py-2 bg-[#0F172A] text-white rounded-lg cursor-pointer"
              >
                {add ? "Add" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {del && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="bg-white w-full max-w-sm rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#0F172A] text-center">
              Delete Product
            </h2>

            <p className="text-gray-500 text-center mt-3">Are you sure?</p>

            <p className="text-center font-semibold text-[#0F172A] mt-2">
              {del.name}
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDel(null)}
                className="flex-1 py-2 border rounded-lg cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={deleteProduct}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
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

export default Products;
