import { Link } from "react-router-dom";

export default function NavbarAdmin() {
  return (
    <nav className="sticky top-0 z-50 bg-[#FFEB76] shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-['Jua'] text-xl">
          <img
            src="/logo.png"
            alt="LovinCandy logo"
            className="h-10 w-auto object-contain md:h-14"
          />
          <span className="hidden sm:inline">LovinCandy</span>
        </Link>

        {/* Menu (desktop only) */}
        <ul className="hidden md:flex gap-10 font-['Jua'] text-lg">
          <li>
            <Link to="/" className="hover:opacity-70">
              Home
            </Link>
          </li>
        </ul>

        {/* Right */}
        <div className="flex items-center gap-4 font-['Jua']">
          <span className="text-sm md:text-base">Admin</span>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="rounded-full bg-[#FF74B1] px-4 py-1 text-white hover:bg-pink-100 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}
