import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function RequireAdmin() {
  const { token, user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!token) return <Navigate to="/login" replace state={{ from: location }} />;

  const role = String(user?.role || "").trim().toUpperCase();
  const norm = role.replace(/\s+/g, "_");

  const isAdmin = norm === "ADMIN" || norm === "SUPER_ADMIN";
  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}
