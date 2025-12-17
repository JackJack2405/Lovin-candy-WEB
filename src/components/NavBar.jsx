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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/customize">Customize</Link>
        </li>
        {/* <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          <Link to="/shoppingcart"><BsCart4 /></Link>
        </li>
        <li>
          <Link to="/signin">Sign in</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li> */}
      </ul>
    </nav>
  )
}