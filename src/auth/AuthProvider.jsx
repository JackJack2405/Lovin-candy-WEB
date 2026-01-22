import { createContext, useContext, useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const setSession = (nextToken, nextUser) => {
    localStorage.setItem("token", nextToken);
    localStorage.setItem("user", JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const fetchMe = async (tkn) => {
    if (!tkn) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/users/me`, {
        headers: { Authorization: `Bearer ${tkn}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Failed to load profile");

      const me = json.data || json.user || json;
      setUser(me);
      localStorage.setItem("user", JSON.stringify(me));
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const value = useMemo(
    () => ({ token, user, loading, setSession, logout, refreshMe: () => fetchMe(token) }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
