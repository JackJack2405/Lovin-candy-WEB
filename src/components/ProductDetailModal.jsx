import React from "react";
import { useCart } from "../components/Cart/UserCart.jsx";

export default function ProductDetailModal({ product, onClose }) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div 
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-pink-100 transition-colors z-10 cursor-pointer"
        >
          ✕
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 bg-[#ffe8f2] p-8 flex items-center justify-center">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="max-h-75 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500 rounded-xl"
          />
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-['Jua'] text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-2xl font-bold text-[#ff7ab6] mb-4">
            ฿{product.price}
          </p>
          
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
              Description
            </h3>
            <p className="text-gray-600 font-['Patrick_Hand'] text-lg leading-relaxed">
              {product.description || "This sweet treat is handmade with love and the finest ingredients to satisfy your sugar cravings!"}
            </p>
          </div>

          <button 
            onClick={() => {
              addToCart(product);
              onClose();
            }}
            className="w-full py-4 bg-[#A6EAFF] hover:bg-[#ff7ab6] hover:text-white text-gray-800 font-['Jua'] text-lg rounded-2xl transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}