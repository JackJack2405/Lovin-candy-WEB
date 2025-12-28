import { useRef } from "react";
import { Link } from "react-router-dom";
import mockProducts from "../data/mockProducts";

export default function PopularPicks() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-16 bg-[#FAF3F3]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-['Jua'] mb-2">
               Popular Picks 
            </h2>
            <p className="text-gray-600 font-['Patrick_Hand'] text-lg">
              Sweet favorites everyone’s loving right now
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/products"
            className="
              flex items-center gap-2
              text-blue-500 font-medium
              hover:text-pink-600
              transition
              self-start sm:self-auto
            "
          >
            View all products →
          </Link>
        </div>

        {/* Wrapper */}
        <div className="relative">

          {/* ← Arrow */}
          <button
            onClick={() => scroll("left")}
            className="
              hidden md:flex
              absolute left-0 top-1/2 -translate-y-1/2
              w-10 h-10
              rounded-full
              bg-white shadow-md
              items-center justify-center
              hover:scale-105 transition
              z-10
            "
          >
            ◀
          </button>

          {/* Scroll Area */}
          <div
            ref={scrollRef}
            className="
              flex gap-6
              overflow-x-auto
              scroll-smooth
              pb-4
              px-12
              overflow-hidden
              no-scrollbar
            "
          >
            {mockProducts.map((candy, index) => (
              <div
                key={index}
                className="
                  w-56
                  bg-white
                  rounded-2xl
                  p-4
                  shadow-sm
                  hover:shadow-md
                  shrink-0
                  flex flex-col
                "
              >
                <div className="aspect-square rounded-xl mb-4 overflow-hidden bg-[#EAF9FF]">
                  <img
                    src={candy.image}
                    alt={candy.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-['Jua'] text-lg mb-1">
                  {candy.name}
                </h3>

                <div className="mt-auto">
                  <p className="text-sm text-black-500 font-['Patrick_Hand'] mb-3 text-center">
                  {candy.price}
                </p>

                <Link to="/cart" className="flex items-center gap-2 font-['Jua'] text-xl">
                <button className="
                mt-auto
                  w-full py-2 rounded-full
                  bg-[#A6EAFF]
                  font-['Jua'] text-sm
                  hover:bg-[#8fdff7]
                  transition">
                  i want this 🛒
                </button>
                </Link>
                </div>
              </div>
            ))}
          </div>

          {/* → Arrow */}
          <button
            onClick={() => scroll("right")}
            className="
              hidden md:flex
              absolute right-0 top-1/2 -translate-y-1/2
              w-10 h-10
              rounded-full
              bg-white shadow-md
              items-center justify-center
              hover:scale-105 transition
              z-10
            "
          >
            ▶
          </button>

        </div>
      </div>
    </section>
  );
}
