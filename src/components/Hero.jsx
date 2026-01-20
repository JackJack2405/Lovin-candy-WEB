import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Hero() {
   const navigate = useNavigate();


  return (
    <section className="bg-[#FAF3F3] px-6 py-24">
      <div
        className="
          max-w-7xl mx-auto
          grid
          grid-cols-1
          md:grid-cols-[1fr_2fr]
          items-center
          gap-16
        "
      >
        {/* LEFT : TEXT */}
        <div>
          <h1 className="font-['Jua'] text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Welcome to{" "}
            <span className="text-[#FF74B1]">Lovin</span>
            <span className="text-[#12AAFF]">Candy</span>
          </h1>

          <p className="font-['Patrick Hand'] text-lg md:text-xl text-gray-700 mb-10">
            Where Sweet Dreams Come Fast!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/specialsets"
              className="
                bg-[#FF74B1]
                px-8
                py-3
                rounded-full
                font-['Jua']
                text-lg
                text-black
                hover:scale-105
                transition text-shadow-xs
              "
            >
              ⏱ I'm in a Rush
            </Link>

            <Link
              to="/customize"
              className="
                bg-[#A6EAFF]
                text-black
                px-8
                py-3
                rounded-full
                font-['Jua']
                text-lg
                shadow-md
                hover:scale-105
                transition
              "
            >
              🍬 Build Your Mix
            </Link>
          </div>
        </div>

        {/* RIGHT : IMAGE */}
        <div className="flex justify-center">
          <img
            src="/hero-lovincandy.png"
            alt="LovinCandy Hero"
            onClick={() => navigate("/customize")}
            className="
              w-full
              max-w-none
              rounded-[2.5rem]
              shadow-xl
              hover:scale-105
            "
          />
        </div>
      </div>
    </section>
  );
}

