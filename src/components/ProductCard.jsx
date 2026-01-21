import { useCart } from "../components/Cart/UserCart.jsx";

export default function ProductCard({ id, imageUrl, name, price, onPreview }) {
  const { addToCart, openCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      _id: id,
      name: name,
      imageUrl: imageUrl,
      price: price,
    });
    
    openCart();
  };

  return (
    <div className="bg-pink-100/80 rounded-3xl p-5 shadow-sm border border-pink-200">
      <div className="bg-white/70 rounded-2xl aspect-square flex items-center justify-center overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105" onClick={onPreview}>
        <img
          src={imageUrl}
          alt={name}
          className="w-44 h-44 object-contain"
        />
      </div>

      <div className="mt-4 text-center">
        <p className="text-pink-600 font-bold leading-snug">{name}</p>
        <p className="text-sm text-gray-700 mt-1">{price} ฿</p>

        <button
          onClick={handleAddToCart}
          className="mt-3 px-5 py-2 rounded-xl border border-pink-400 text-pink-600 hover:bg-pink-200 cursor-pointer"
        >
          I want this
        </button>
      </div>
    </div>
  );
}

