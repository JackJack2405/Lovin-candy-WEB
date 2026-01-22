import { useCart } from "./Cart/UserCart.jsx";

export default function ProductGridCard({ product, onPreview }) {
  const { addToCart, openCart } = useCart();

  return (
    <div
      className="
        bg-white rounded-2xl p-5
        shadow-sm hover:shadow-md transition
        flex flex-col
      "
    >
      {/* Image */}
      <button
        onClick={onPreview}
        className="
          aspect-square rounded-xl mb-5
          overflow-hidden bg-[#EAF9FF]
        "
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition"
        />
      </button>

      {/* Name */}
      <h3 className="font-['Jua'] text-lg text-center mb-1 line-clamp-2">
        {product.name}
      </h3>

      {/* Price */}
      <p className="text-sm text-center font-['Patrick_Hand'] mb-4">
        ฿{product.price}
      </p>

      {/* CTA */}
      <button
        onClick={() => {
          addToCart(product);
          openCart();
        }}
        className="
          mt-auto w-full py-3 rounded-2xl
          bg-[#A6EAFF] text-gray-800
          font-['Jua']
          hover:bg-[#8fdff7] active:scale-95
          transition-all
        "
      >
        I want this 🛒
      </button>
    </div>
  );
}
