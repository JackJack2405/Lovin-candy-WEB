import { Link } from "react-router-dom";

export default function NavbarAdmin() {
  return (
    <nav className="bg-[#FFEB76] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

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

        <ul className="hidden md:flex gap-10 font-['Jua'] text-lg">
          <li>
            <Link to="/" className="hover:opacity-70">
              Home
            </Link>
          </li>
         {/*  <li>
            <Link to="/" className="hover:opacity-70">
              Product
            </Link>
          </li> */}
        </ul>
        </div>
        </nav>
);
}