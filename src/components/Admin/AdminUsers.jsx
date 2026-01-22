import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";

const API = import.meta.env.VITE_API_URL;

export default function AdminUsers() {
  const { token, user } = useAuth();
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER ADMIN";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) throw new Error("Please login first");
      if (!isAdmin) throw new Error("Admin only");

      const res = await fetch(`${API}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to fetch users");

      setUsers(json.data || []);
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token, user?.role]);

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      const res = await fetch(`${API}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Delete failed");

      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = useMemo(() => {
    const kw = q.toLowerCase();
    if (!kw) return users;
    return users.filter((u) =>
      `${u.email} ${u.phone} ${u.role}`.toLowerCase().includes(kw)
    );
  }, [users, q]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <section className="p-6 bg-[#FAF3F3] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-['Jua'] text-[#2B3A55]">Users Management</h2>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search email / phone / role"
          className="rounded-xl border px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-pink-200"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-[#FFEB76] text-[#2B3A55] font-semibold">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Role</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u._id} className="border-b hover:bg-pink-50 transition">
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.phone || "-"}</td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        u.role === "ADMIN"
                          ? "bg-pink-200 text-pink-700"
                          : "bg-blue-200 text-blue-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="px-3 py-1 bg-red-300 text-red-800 rounded-lg hover:bg-red-400 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
