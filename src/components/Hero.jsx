import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-[#FAF3F3] px-6 py-12">
      <div
        className="
          max-w-7xl mx-auto
          flex flex-col-reverse
          md:flex-row
          items-center
          gap-10
        "
      >
        {/* LEFT : TEXT */}
        <div className="flex-1 text-center md:text-left">
          <h1
            className="
              font-['Jua']
              text-4xl
              md:text-5xl
              mb-4
            "
          >
            Welcome to{" "}
              <span className="text-[#FF74B1]">Lovin</span>
              <span className="text-[#12AAFF]">Candy</span>
              </h1>
          <p
            className="
              font-['Patrick Hand']
              text-lg
              md:text-xl
              text-gray-700
              mb-8
            "
          >
            Where Sweet Dreams Come Fast!
          </p>

          {/* CTA BUTTONS */}
          <div
            className="
              flex flex-col
              sm:flex-row
              gap-4
              justify-center
              md:justify-start
            "
          >
            <Link
              to="/rush"
              className="
                bg-[#FF74B1]
                text-white
                px-6
                py-3
                rounded-full
                font-['Jua']
                text-lg
                shadow-md
                hover:scale-105
                transition
              "
            >
              ⏱ I'm in a Rush
            </Link>

            <Link
              to="/customize"
              className="
                bg-[#A6EAFF]
                text-black
                px-6
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
        <div className="flex-1 flex justify-center">
          <img
            src="/hero-lovincandy.png"
            alt="LovinCandy Hero"
            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl object-contain"/>
        </div>
      </div>
    </section>
  );
}
