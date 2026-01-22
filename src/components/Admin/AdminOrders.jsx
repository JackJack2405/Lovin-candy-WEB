import { useEffect, useMemo, useState } from "react";
import OrderDetailModal from "./OrderDetailModal";

const API = import.meta.env.VITE_API_URL;

const STATUS = ["ALL", "PENDING", "IN-TRANSIT", "DELIVERED", "CANCELLED"];
const RANGE = ["ALL", "TODAY", "MONTH"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("ALL");
  const [range, setRange] = useState("ALL");

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      setOrders(json.data || []);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filtered = useMemo(() => {
    let list = [...orders];

    if (status !== "ALL") {
      list = list.filter((o) => o.status === status);
    }

    if (range !== "ALL") {
      const now = new Date();
      list = list.filter((o) => {
        const d = new Date(o.createdAt);
        if (range === "TODAY") {
          return d.toDateString() === now.toDateString();
        }
        if (range === "MONTH") {
          return d.getMonth() === now.getMonth() &&
                 d.getFullYear() === now.getFullYear();
        }
        return true;
      });
    }

    return list;
  }, [orders, status, range]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API}/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      fetchOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-[#FAF3F3] px-6 py-8">
      <h2 className="font-['Jua'] text-3xl mb-6">Orders</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        {STATUS.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1 rounded-lg border ${
              status === s ? "bg-pink-300" : "bg-white"
            }`}
          >
            {s}
          </button>
        ))}

        {RANGE.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded-lg border ${
              range === r ? "bg-yellow-200" : "bg-white"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-[#A6EAFF] p-4">
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : paged.length === 0 ? (
          <div className="text-center py-10">No orders</div>
        ) : (
          <div className="space-y-3">
            {paged.map((o) => (
              <div
                key={o._id}
                className="bg-white rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">
                    #{o._id.slice(-6).toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(o.createdAt).toLocaleString()}
                  </div>
                  <div className="text-sm">
                    {o.total_price} THB • {o.status}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelected(o);
                      setOpenModal(true);
                    }}
                    className="px-3 py-1 bg-blue-200 rounded-lg"
                  >
                    View
                  </button>

                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    className="rounded-lg border px-2 py-1"
                  >
                    {STATUS.filter(s => s !== "ALL").map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
        >
          Prev
        </button>
        <div>Page {page} / {totalPages}</div>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>

      <OrderDetailModal
        open={openModal}
        order={selected}
        onClose={() => setOpenModal(false)}
      />
    </section>
  );
}
