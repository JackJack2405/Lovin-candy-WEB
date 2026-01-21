import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImagePreviewModal from "../components/PopularPick/ImagePreviewModal";

export default function SpecialSets() {
  const [specialSets, setSpecialSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchSpecialSets = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/products?limit=50"
        );
        const data = await res.json();

        if (data.success) {
          // กรองเฉพาะ category = SPECIALSET
          const filtered = data.data.filter(
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
  }, []);

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
                  onClick={() => setPreviewImage(special.imageUrl)}
                  className="
                    aspect-square
                    rounded-xl
                    mb-5
                    overflow-hidden
                    bg-[#EAF9FF]
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
                <Link to="/cart" className="mt-auto">
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
            ))}
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
