import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";

const API = import.meta.env.VITE_API_URL;

export default function AdminUsers() {
  const { token, user } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER ADMIN";

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) throw new Error("Please login first.");
      if (!isAdmin) throw new Error("Admin only.");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user?.role]);

  const deleteAddress = async (userId) => {
    if (!confirm("Delete user address?")) return;

    try {
      const res = await fetch(`${API}/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Delete failed");
      fetchUsers();
    } catch (e) {
      alert(e.message);
    }
  };

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return users;
    return users.filter((u) => {
      const username = String(u.username || "").toLowerCase();
      const email = String(u.email || "").toLowerCase();
      const role = String(u.role || "").toLowerCase();
      return username.includes(kw) || email.includes(kw) || role.includes(kw);
    });
  }, [users, q]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <section className="p-6 bg-[#FAF3F3] min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-['Jua']">Users</h2>

        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search username / email / role"
            className="w-72 rounded-xl border px-3 py-2 text-sm outline-none"
          />
          <button
            onClick={fetchUsers}
            className="rounded-lg bg-white border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3">Username</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Address</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u._id} className="border-t text-sm">
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">{u.address || "-"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteAddress(u._id)}
                      className="px-3 py-1 bg-pink-300 rounded-lg hover:bg-pink-400"
                    >
                      Delete Address
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
