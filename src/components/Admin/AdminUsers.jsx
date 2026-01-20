import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;
const ROLES = ["USER", "ADMIN", "SUPER ADMIN", "VIEWER"];

export default function AdminUsers() {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

 
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [role, setRole] = useState("USER");

  const headers = useMemo(() => {
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }, [token]);

  const fetchUsers = async () => {
    setLoading(true);
    setErrMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/users`, { headers });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || `Failed to fetch users (${res.status})`);
      }

     
      const list = Array.isArray(json) ? json : json.data || [];
      setUsers(list);
    } catch (e) {
      setErrMsg(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    if (!keyword) return users;

    return users.filter((u) => {
      const username = String(u.username || "").toLowerCase();
      const email = String(u.email || "").toLowerCase();
      const role = String(u.role || "").toLowerCase();
      return (
        username.includes(keyword) ||
        email.includes(keyword) ||
        role.includes(keyword)
      );
    });
  }, [users, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const openEdit = (user) => {
    setEditing(user);
    setRole(user.role || "USER");
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };

  const saveRole = async () => {
    if (!editing?._id) return;

    try {
      const res = await fetch(`${API_BASE}/api/users/${editing._id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ role }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || `Update role failed (${res.status})`);
      }

      setUsers((prev) =>
        prev.map((u) => (u._id === editing._id ? { ...u, role } : u))
      );

      closeModal();
    } catch (e) {
      alert(e.message || "Update role failed");
    }
  };

  const deleteUser = async (user) => {
    const label = user?.username || user?.email || user?._id;
    const ok = confirm(`Delete user: ${label}?`);
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/api/users/${user._id}`, {
        method: "DELETE",
        headers,
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || `Delete failed (${res.status})`);
      }

      setUsers((prev) => prev.filter((u) => u._id !== user._id));
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-[#FAF3F3] px-6 py-8">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-['Jua'] text-2xl md:text-3xl">Users</h2>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search username / email / role"
            className="w-64 md:w-96 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-200"
          />
          <button
            onClick={fetchUsers}
            className="rounded-lg bg-white border px-4 py-2 text-sm hover:bg-gray-50 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* status */}
      {!token && (
        <div className="mb-4 rounded-xl border bg-white px-4 py-3 text-sm text-red-600">
          No token found in localStorage. Please login first.
        </div>
      )}

      {errMsg && (
        <div className="mb-4 rounded-xl border bg-white px-4 py-3 text-sm text-red-600">
          {errMsg}
        </div>
      )}

      {/* table */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[860px]">
          <div className="grid grid-cols-[220px_260px_180px_160px] gap-2 px-4 pb-2 text-sm text-gray-700">
            <div className="text-center">USERNAME</div>
            <div className="text-center">EMAIL</div>
            <div className="text-center">ROLE</div>
            <div className="text-center">ACTIONS</div>
          </div>

          <div className="rounded-2xl bg-[#A6EAFF] px-4 py-4">
            {loading ? (
              <div className="py-12 text-center text-gray-700">Loading...</div>
            ) : paged.length === 0 ? (
              <div className="py-12 text-center text-gray-700">
                No users found.
              </div>
            ) : (
              <div className="space-y-3">
                {paged.map((u) => (
                  <div
                    key={u._id}
                    className="grid grid-cols-[220px_260px_180px_160px] gap-2 items-center bg-white/70 rounded-xl px-3 py-3"
                  >
                    <div className="text-center font-medium">
                      {u.username || "-"}
                    </div>

                    <div className="text-center text-sm">{u.email || "-"}</div>

                    <div className="text-center">
                      <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm border">
                        {u.role || "USER"}
                      </span>
                    </div>

                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openEdit(u)}
                        className="px-3 py-1 rounded-lg bg-yellow-200 hover:bg-yellow-300 transition text-sm"
                      >
                        Edit Role
                      </button>
                      <button
                        onClick={() => deleteUser(u)}
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

          {/* pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {(page - 1) * pageSize + 1} -{" "}
              {Math.min(page * pageSize, filtered.length)} of {filtered.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded-lg bg-white border disabled:opacity-40"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {page} / {totalPages}
              </span>

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

      {/* modal */}
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Jua'] text-xl">Edit Role</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <div className="text-sm text-gray-700 mb-4">
              User: <b>{editing?.username || editing?.email}</b>
            </div>

            <label className="text-sm text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 text-sm mt-2"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2 pt-5">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>
              <button
                onClick={saveRole}
                className="px-4 py-2 rounded-xl bg-[#FF74B1] text-white hover:bg-pink-400 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
