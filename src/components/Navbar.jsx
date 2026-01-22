import { Link, useNavigate } from "react-router-dom";
import { BsCart4, BsList, BsX } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useCart } from "../components/Cart/UserCart.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const { cartItems } = useCart();

  const totalItems = (cartItems || []).reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0,
  );

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      setIsLogin(!!token);

      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          setUserRole(user.role); // ✅ เก็บ role ลงใน State
        } catch (e) {
          console.error("Error parsing user data", e);
        }
      } else {
        setUserRole(null);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
    setUserRole(null);
    setOpen(false); // ปิดเมนูมือถือถ้าเปิดอยู่
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-[#A6EAFF] shadow-sm sticky top-0 z-50">
      {/* <button onClick={onCartOpen} className="cursor-pointer">
        🛒
      </button> */}

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-['Jua'] text-xl">
          <img
            src="/logo.png"
            alt="LovinCandy logo"
            className="h-10 w-auto object-contain md:h-14"
          />
          <span className="hidden md:inline">LovinCandy</span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-10 font-['Jua'] text-lg">
          <li>
            <Link to="/" className="hover:opacity-70">
              Home
            </Link>
          </li>
          <li>
            <Link to="/customize" className="hover:opacity-70">
              Customize
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:opacity-70">
              Product
            </Link>
          </li>

          {isLogin && (
            <li>
              <Link to="/profile" className="hover:opacity-70">
                My Profile
              </Link>
            </li>
          )}

          {userRole === "ADMIN" && (
            <li>
              <Link to="/admin" className="hover:opacity-70">
                Admin
              </Link>
            </li>
          )}
        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <div className="relative">
            <Link
              to="/shoppingcart"
              className="text-xl hover:scale-110 transition flex items-center"
            >
              <BsCart4 className="text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md z-10">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Login */}
          {isLogin ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer hidden md:inline-block bg-pink-400 text-white px-4 py-1 rounded-full text-sm shadow hover:bg-pink-500 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden md:inline-block bg-white px-4 py-1 rounded-full text-sm shadow hover:bg-gray-100 transition"
            >
              Sign in | Register
            </Link>
          )}

          {/* HAMBURGER (mobile only) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <BsX /> : <BsList />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#A6EAFF] border-t shadow-inner">
          <ul className="flex flex-col px-6 py-4 gap-4 font-['Jua'] text-lg">
            <li>
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/customize" onClick={() => setOpen(false)}>
                Customize
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setOpen(false)}>
                Product
              </Link>
            </li>
            {isLogin && (
              <li>
                <Link to="/profile" onClick={() => setOpen(false)}>
                  My Profile
                </Link>
              </li>
            )}

            {userRole === "ADMIN" && (
              <li>
                <Link to="/admin" onClick={() => setOpen(false)}>
                  Admin
                </Link>
              </li>
            )}
            <li>
              {isLogin ? (
                <button
                  onClick={handleLogout}
                  className="inline-block bg-pink-400 text-white px-4 py-1 rounded-full text-sm shadow w-full text-center "
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="inline-block bg-white px-4 py-1 rounded-full text-sm shadow w-full text-center"
                >
                  Sign in | Register
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
