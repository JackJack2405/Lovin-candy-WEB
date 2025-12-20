import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#A6EAFF] text-black px-8 py-10 font-['Patrick Hand']">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">

        {/* LEFT */}
        <div>
        <div className="max-w-dvh">
          <h3 className="font-['Jua'] text-xl mb-3">About us</h3>
          <p>
            Made with love for sweets, candies, and all the little treats.
            <br></br>
            LovinCandy lets you create your own taste of happiness,sweet, playful, and totally you.
          </p>
          <p className="mt-4">Have fun customizing every bite!</p>
        </div>
        <div className="max-w-md pt-2.5">
          <h3 className="font-['Jua'] text-xl mb-3">Contact us</h3>
          <span className="mt-4" >lovincandy@gmail.com</span>
        </div>
        </div>

        {/* RIGHT */}
        <div className="text-right">
          <h3 className="font-['Jua'] text-xl mb-2">LovinCandy</h3>
          <p className="text-sm">© 2025 LovinCandy</p>
          <p className="text-sm font-mono text-gray-500">
  design by <span className="text-pink-500">&lt;h1&gt;M0AI&lt;/h1&gt;</span>
        </p>


          <Link to="/" className="inline-block mt-4">
            <img
              src="/logo.png"
              alt="LovinCandy logo"
              className="w-27 h-18 inline-block"
            />
          </Link>
        </div>

      </div>
    </footer>
  );
}
