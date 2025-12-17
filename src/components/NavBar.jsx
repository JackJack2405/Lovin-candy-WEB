import { Link } from "react-router-dom";
// import { BsCart4 } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav className="bg-[#A6EAFF] text-black p-4">
      <ul className="flex gap-8 justify-center font-['Jua'] text-2xl">
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