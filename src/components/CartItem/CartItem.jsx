import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartItem = ({ cartItem, onIncrease, onDecrease, onRemoveItem }) => {
  const total = (Number(cartItem?.quantity) * Number(cartItem?.price)).toFixed(
    2,
  );

  return (
    <div className="py-6">
      <div className="flex items-start gap-6">
        {/* Product Image */}
        <div className="w-32 h-32 border-2 border-black flex items-center justify-center bg-white flex-shrink-0">
          <img
            className="w-24 h-24 object-contain"
            src={cartItem?.imageUrl}
            alt={cartItem?.name}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-black mb-1">
                {cartItem?.name}
              </h3>

              {cartItem?.description ? (
                <div className="mt-2 mb-3">
                  <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Included Sins:</p>
                  <ul className="list-none space-y-1">
                    {cartItem.description.split(", ").map((candy, index) => (
                      <li key={index} className="text-sm text-pink-500 italic flex items-center">
                        <span className="mr-2">•</span> {candy}
                      </li>
              ))}
          </ul>
        </div>
      ) : (
        <p className="text-xs text-gray-400 mt-1">Standard Pack</p>
      )}
            </div>

            {/* Remove Button */}
            <button
              onClick={onRemoveItem}
              className="text-red-500 hover:text-red-700 font-semibold text-sm transition cursor-pointer"
            >
              Remove
            </button>
          </div>

          {/* Quantity & Total */}
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-xs font-semibold text-black mb-2">
                QTY
              </label>
              <div className="flex items-center border-2 border-gray-400 rounded">
                <button
                  onClick={onDecrease}
                  className="px-4 py-2 hover:bg-gray-100 transition text-black font-bold text-lg cursor-pointer"
                >
                  -
                </button>
                <span className="px-6 py-2 border-l-2 border-r-2 border-gray-400 text-black font-medium min-w-[60px] text-center">
                  {cartItem?.quantity}
                </span>
                <button
                  onClick={onIncrease}
                  className="px-4 py-2 hover:bg-gray-100 transition text-black font-bold text-lg cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <p className="text-xs font-semibold text-black mb-1">Total</p>
              <p className="text-xl font-bold text-black">${total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
