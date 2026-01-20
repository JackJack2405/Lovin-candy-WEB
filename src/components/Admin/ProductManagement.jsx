import { useEffect, useMemo, useState } from "react";

const API = import.meta.env.VITE_API_URL; 

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // server-side
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });

  // modal
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); 
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
   
    name: "",
    type: "",
    price: "",
    stock: "",
    image: "",
  });


  const fetchProducts = async ({ pageParam = page, qParam = q } = {}) => {
    setLoading(true);
    try {
      const url = new URL(`${API}/products`);
      url.searchParams.set("page", String(pageParam));
      url.searchParams.set("limit", String(pageSize));
      if (qParam?.trim()) url.searchParams.set("q", qParam.trim());

      const res = await fetch(url.toString());
      const json = await res.json();

      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || "Failed to load products");
      }

      setProducts(json.data || []);
      setMeta(json.meta || { total: (json.data || []).length, totalPages: 1 });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    
  }, [page]);

  const closeModal = () => setOpen(false);

  const openCreate = () => {
    setMode("create");
    setEditingId(null);
    setForm({ name: "", type: "", price: "", stock: "", image: "" });
    setOpen(true);
  };

  const openEdit = (p) => {
    setMode("edit");
    setEditingId(p._id); 
    setForm({
      name: p.name || "",
      type: p.type || p.category || "", 
      price: String(p.price ?? ""),
      stock: String(p.stock ?? ""),
      image: (p.image || p.images?.[0] || "").toString(),
    });
    setOpen(true);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter Product name";
    if (!form.type.trim()) return "Please enter Type";
    const price = Number(form.price);
    const stock = Number(form.stock);
    if (Number.isNaN(price) || price < 0) return "Price must be a number >= 0";
    if (Number.isNaN(stock) || stock < 0) return "Stock must be a number >= 0";
    return null;
  };

 
  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);

    const payload = {
      name: form.name.trim(),
      type: form.type.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      image: form.image.trim(),
    };

  
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      const res = await fetch(
        mode === "create" ? `${API}/products` : `${API}/products/${editingId}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers,
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();
      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || "Save failed");
      }

      setOpen(false);
      // refresh list
      await fetchProducts({ pageParam: 1, qParam: q });
      setPage(1);
    } catch (error) {
      alert(error.message);
    }
  };

 
  const onDelete = async (_id) => {
    const ok = confirm("Delete this product?");
    if (!ok) return;

    const token = localStorage.getItem("token");
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      const res = await fetch(`${API}/products/${_id}`, {
        method: "DELETE",
        headers,
      });

      const json = await res.json();
      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || "Delete failed");
      }

      // refresh
      await fetchProducts({ pageParam: page, qParam: q });
    } catch (error) {
      alert(error.message);
    }
  };


  const totalPages = Math.max(1, Number(meta.totalPages || 1));

  
  const paged = useMemo(() => products, [products]);

  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-[#FAF3F3] px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-['Jua'] text-2xl md:text-3xl">Products</h2>
          <p className="text-sm text-gray-600">
            
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name / type"
            className="w-60 md:w-80 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-200"
          />

          <button
            onClick={() => {
              setPage(1);
              fetchProducts({ pageParam: 1, qParam: q });
            }}
            className="rounded-lg bg-white border px-4 py-2 text-sm hover:bg-gray-50 transition"
          >
            Search
          </button>

          <button
            onClick={openCreate}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300 transition"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[160px_1.6fr_160px_140px_140px_180px] gap-2 px-4 pb-2 text-sm text-gray-700">
            <div className="text-center">ID</div>
            <div className="text-center">PRODUCT NAME</div>
            <div className="text-center">TYPE</div>
            <div className="text-center">PRICE</div>
            <div className="text-center">STOCK</div>
            <div className="text-center">ACTION</div>
          </div>

          <div className="rounded-2xl bg-[#A6EAFF] px-4 py-4">
            {loading ? (
              <div className="py-12 text-center text-gray-700">Loading...</div>
            ) : paged.length === 0 ? (
              <div className="py-12 text-center text-gray-700">No products found.</div>
            ) : (
              <div className="space-y-3">
                {paged.map((p) => (
                  <div
                    key={p._id}
                    className="grid grid-cols-[160px_1.6fr_160px_140px_140px_180px] gap-2 items-center bg-white/70 rounded-xl px-3 py-3"
                  >
                    <div className="text-center font-semibold">
                      {p._id.slice(-6).toUpperCase()}
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={p.image || p.images?.[0] || "/logo.png"}
                        alt={p.name}
                        className="h-10 w-10 rounded-lg object-cover bg-white"
                      />
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-gray-600">{p.price} THB</div>
                      </div>
                    </div>

                    <div className="text-center">{p.type || p.category}</div>
                    <div className="text-center">{p.price}</div>
                    <div className="text-center">{p.stock}</div>

                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="px-3 py-1 rounded-lg bg-yellow-200 hover:bg-yellow-300 transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(p._id)}
                        className="px-3 py-1 rounded-lg bg-pink-300 hover:bg-pink-400 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Page {page} / {totalPages} • Total {meta.total || 0}
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded-lg bg-white border disabled:opacity-40"
              >
                Prev
              </button>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 rounded-lg bg-white border disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Jua'] text-xl">
                {mode === "create" ? "Add Product" : "Edit Product"}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                ✕
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-700">Type</label>
                  <input
                    name="type"
                    value={form.type}
                    onChange={onChange}
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                    placeholder="Gummy / Chocolate / Set"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Stock</label>
                  <input
                    name="stock"
                    value={form.stock}
                    onChange={onChange}
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                    placeholder="120"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Product name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full rounded-xl border px-3 py-2 text-sm"
                  placeholder="Strawberry Gummy"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-700">Price</label>
                  <input
                    name="price"
                    value={form.price}
                    onChange={onChange}
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                    placeholder="25"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Image (url)</label>
                  <input
                    name="image"
                    value={form.image}
                    onChange={onChange}
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                    placeholder="/logo.png"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl border">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#FF74B1] text-white hover:bg-pink-400 transition"
                >
                  {mode === "create" ? "Create" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
