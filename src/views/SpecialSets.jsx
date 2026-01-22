import { useEffect, useState } from "react";
import ImagePreviewModal from "../components/PopularPick/ImagePreviewModal";
import axios from "axios";
import { useCart } from "../components/Cart/UserCart.jsx";
import ProductDetailModal from "../components/ProductDetailModal.jsx";

export default function SpecialSets() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [specialSets, setSpecialSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const { addToCart, openCart } = useCart();  
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchSpecialSets = async () => {
      try {
        const res = await axios.get(`${apiBase}/products?limit=100`);

        if (res.data.success) {
          // กรองเฉพาะ category = SPECIALSET
          const filtered = res.data.data.filter(
            (item) => item.category?.toUpperCase() === "SPECIALSET"
          );

          setSpecialSets(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch special sets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialSets();
  }, [apiBase]);

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-500">
        Loading special sets...
      </p>
    );
  }

  if (specialSets.length === 0) {
    return (
      <p className="text-center py-20 text-gray-500">
        No special sets available right now 🎁
      </p>
    );
  }

  return (
    <>
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* ===== Header ===== */}
          <div className="mb-10 mx-auto text-center w-full max-w-md text-4xl bg-[#A6EAFF] py-6 rounded-full">
            <h2 className="text-3xl font-['Jua'] mb-2">
              Special Sets
            </h2>
            <p className="text-gray-600 font-['Patrick_Hand'] text-lg">
              Sweet favorites everyone’s loving right now
            </p>
          </div>

          {/* ===== Grid ===== */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >
            {specialSets.map((special) => (
              <div
                key={special._id}
                className="
                  bg-white
                  rounded-2xl
                  p-5
                  shadow-sm
                  hover:shadow-md
                  transition
                  flex flex-col
                "
              >
                {/* Image */}
                <button
                  onClick={() => setSelectedProduct(special)}
                  className="
                    aspect-square
                    rounded-xl
                    mb-5
                    overflow-hidden
                    bg-[#EAF9FF]
                    cursor-pointer
                  "
                >
                  <img
                    src={special.imageUrl}
                    alt={special.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </button>

                {/* Name */}
                <h3 className="font-['Jua'] text-lg text-center mb-1 line-clamp-2">
                  {special.name}
                </h3>

                {/* Price */}
                <p className="text-sm text-center font-['Patrick_Hand'] mb-4">
                  ฿{special.price}
                </p>

                {/* CTA */}
                <button
                    onClick={() => {
                      addToCart(special);
                      openCart();
                    }}
                    className="
                      mt-auto w-full py-3 rounded-2xl
                      bg-[#A6EAFF] text-gray-800
                      font-['Jua'] text-base
                      hover:bg-[#8fdff7] active:scale-95
                      transition-all duration-200 shadow-sm
                      flex items-center justify-center gap-2
                      cursor-pointer
                    "
                  >
                    I want this 🛒
                  </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Image Preview Modal ===== */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
