import { Link } from "react-router-dom";
import { BsCart4, BsList, BsX } from "react-icons/bs";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#A6EAFF] shadow-sm sticky top-0 z-50">
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
          <li><Link to="/" className="hover:opacity-70">Home</Link></li>
          <li><Link to="/customize" className="hover:opacity-70">Customize</Link></li>
          <li><Link to="/products" className="hover:opacity-70">Product</Link></li>
          <li><Link to="/profile">My Profile</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link to="/shoppingcart" className="text-xl hover:scale-110 transition">
            <BsCart4 className="text-2xl" />
          </Link>

          {/* Login */}
          <Link
            to="/login"
            className="hidden md:inline-block bg-white px-4 py-1 rounded-full text-sm shadow hover:bg-gray-100 transition"
          >
            Sign in | Register
          </Link>

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
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/customize" onClick={() => setOpen(false)}>Customize</Link></li>
            <li><Link to="/products" onClick={() => setOpen(false)}>Product</Link></li>
            <li><Link to="/profile" onClick={() => setOpen(false)}>My Profile</Link></li>
            <li><Link to="/admin" onClick={() => setOpen(false)}>Admin</Link></li>
            <li>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="inline-block bg-white px-4 py-1 rounded-full text-sm shadow"
              >
                Sign in | Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}