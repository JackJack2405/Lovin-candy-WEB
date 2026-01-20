import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import mockProducts from "../../data/mockProducts";
import  ImagePreviewModal  from "./ImagePreviewModal";

export default function PopularPicks() {
  const scrollRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="w-full py-16 bg-[#EAF9FF]">
        <div className="max-w-7xl mx-auto px-6">

          {/* ===== Header ===== */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-['Jua'] mb-2">
                🍬 Popular Picks
              </h2>
              <p className="text-gray-600 font-['Patrick_Hand'] text-lg">
                Sweet favorites everyone’s loving right now
              </p>
            </div>

            <Link
              to="/products"
              className="
                text-blue-500 font-medium
                hover:text-pink-600
                transition
              "
            >
              View all products →
            </Link>
          </div>

          {/* ===== Slider ===== */}
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
                z-10
              "
            >
              ◀
            </button>

            {/* Scroll Area */}
            <div
              ref={scrollRef}
              className="
                flex gap-4 sm:gap-6
                overflow-x-auto
                scroll-smooth
                pb-4
                px-4 sm:px-12
                no-scrollbar
              "
            >
              {mockProducts.map((candy) => (
  <div
    key={candy.id}
    className="
      w-56
      h-95
      bg-white
      rounded-2xl
      p-4
      shadow-sm
      hover:shadow-md
      shrink-0
      flex flex-col
    "
  >
    {/* Image */}
    <button
      onClick={() => setPreviewImage(candy.image)}
      className="h-50 rounded-xl mb-3 overflow-hidden bg-[#EAF9FF]"
    >
      <img
        src={candy.image}
        alt={candy.name}
        className="w-full h-full object-cover hover:scale-105 transition"
      />
    </button>

    {/* Name (ล็อกสูง 2 บรรทัด) */}
    <h3 className="font-['Jua'] text-lg mb-2 line-clamp-2 min-h-12">
      {candy.name}
    </h3>

    {/* Bottom zone */}
    <div className="flex-1 flex flex-col justify-end">
      <p className="text-sm text-center font-['Patrick_Hand'] mb-3">
        {candy.price}
      </p>

      <Link to="/cart">
        <button
          className="
            w-full py-2 rounded-full
            bg-[#A6EAFF]
            font-['Jua'] text-sm
            hover:bg-[#8fdff7]
            transition
          "
        >
          I want this 🛒
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
                z-10
              "
            >
              ▶
            </button>
          </div>
        </div>
      </section>

      {/* ===== Image Preview Modal ===== */}
      {previewImage && (
        <ImagePreviewModal
          image={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </>
  );
}
