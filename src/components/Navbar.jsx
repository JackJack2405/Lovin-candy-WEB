import { Link } from "react-router-dom";
// import { BsCart4 } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav className="bg-[#A6EAFF] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT : Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-['Jua'] text-xl"
        >
          <img
          src="/logo.png"
          alt="LovinCandy logo"
          className="h-10 w-auto object-contain md:h-14"
          />
        <span>LovinCandy</span>
        </Link>


        {/* CENTER : Menu */}
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
            <Link to="/product" className="hover:opacity-70">
              Product
            </Link>
          </li>
        </ul>

        {/* RIGHT : Cart + Sign in/Register */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <Link
            to="/shoppingcart"
            className="text-xl hover:scale-110 transition"
            aria-label="Shopping Cart"
          >
            🛒
            {/* <BsCart4 /> */}
          </Link>

          {/* Sign in | Register (หน้าเดียวกัน) */}
          <Link
            to="/auth"
            className="bg-white px-4 py-1 rounded-full text-sm shadow hover:bg-gray-100 transition"
          >
            Sign in | Register
          </Link>

        </div>
      </div>
    </nav>
  );
}