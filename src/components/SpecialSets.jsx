import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImagePreviewModal from "./PopularPick/ImagePreviewModal";
import { useCart } from "../components/Cart/UserCart.jsx";
import axios from "axios";

export default function SpecialSets() {
  const API_BASE = import.meta.env.VITE_API_URL;
  const scrollRef = useRef(null);
  const [specialSets, setSpecialSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const { addToCart, openCart } = useCart();

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products?limit=50`);

        if (res.data.success) {
          // 👉 กรองเฉพาะ SPECIALSET
          const onlySpecialSets = res.data.data.filter(
            (product) =>
              product.category?.toUpperCase() === "SPECIALSET"
          );

          setSpecialSets(onlySpecialSets);
        }
      } catch (err) {
        console.error("Failed to fetch special sets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_BASE]);

  if (loading) {
    return (
      <p className="text-center py-16 text-gray-500">
        Loading special sets...
      </p>
    );
  }

  if (specialSets.length === 0) {
    return (
      <p className="text-center py-16 text-gray-500">
        No special sets available right now 🎁
      </p>
    );
  }

  return (
    <>
      <section className="w-full py-16 bg-[#EAF9FF]">
        <div className="max-w-7xl mx-auto px-6">

          {/* ===== Header ===== */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-['Jua'] mb-2">
                🎁 Special Sets
              </h2>
              <p className="text-gray-600 font-['Patrick_Hand'] text-lg">
                Ready-to-go gift sets for every sweet moment
              </p>
            </div>

            <Link
              to="/SpecialSets"
              className="
                text-blue-500 font-medium
                hover:text-pink-600
                transition
              "
            >
              View all Special Sets →
            </Link>
          </div>

          {/* ===== Slider ===== */}
          <div className="relative">

            {/* ← Arrow */}
            <button
              onClick={() => scroll("left")}
              className="
                hidden md:flex
                absolute -left-4 top-1/2 -translate-y-1/2
                w-10 h-10
                rounded-full
                bg-white shadow-md
                items-center justify-center
                z-10
                cursor-pointer
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
                no-scrollbar
              "
            >
              {specialSets.map((item) => (
                <div
                  key={item._id}
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
                  {/* Image */}
                  <button
                    onClick={() => setPreviewImage(item.imageUrl)}
                    className="aspect-square rounded-xl mb-4 overflow-hidden bg-[#EAF9FF]"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </button>

                  <h3 className="font-['Jua'] text-lg text-center mb-1 line-clamp-2">
                    {item.name}
                  </h3>

                  <p className="text-sm text-center font-['Patrick_Hand'] mb-3">
                    ฿{item.price}
                  </p>

                  <button
                    onClick={() => {
                      addToCart(item); // 2. เพิ่มสินค้าลงตะกร้า
                      openCart();      // 3. สั่งให้ตะกร้าด้านข้างเด้งออกมา
                    }}
                    className="
                      mt-auto
                      w-full py-2 rounded-full
                      bg-[#A6EAFF]
                      font-['Jua'] text-sm
                      hover:bg-[#8fdff7]
                      active:scale-95
                      transition
                      cursor-pointer
                    "
                  >
                    I want this 🛒
                  </button>
                </div>
              ))}
            </div>

            {/* → Arrow */}
            <button
              onClick={() => scroll("right")}
              className="
                hidden md:flex
                absolute -right-4 top-1/2 -translate-y-1/2
                w-10 h-10
                rounded-full
                bg-white shadow-md
                items-center justify-center
                z-10
                cursor-pointer
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

