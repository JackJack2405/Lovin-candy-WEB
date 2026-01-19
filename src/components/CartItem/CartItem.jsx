import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";

const CartItem = ({ cartItem, onIncrease, onDecrease, onRemoveItem }) => {
  const total = (Number(cartItem?.quantity) * Number(cartItem?.price)).toFixed(
    2,
  );

  return (
    <div className="flex items-center justify-between gap-8 p-4 rounded-2xl hover:bg-[#F7FCFF] transition">
      <div className="flex items-center gap-4 max-w-75] w-full">
        <div className="w-[93px] h-[93px] rounded-xl flex items-center justify-center bg-[#EAF9FF] border border-[#6EDCFF]/40">
          <img
            className="w-15 h-15 object-cover"
            src={cartItem?.image}
            alt={cartItem?.name}
          />
        </div>

        <div className="space-y-2.5">
          <h4 className="text-lg text-[#2B3A55] font-archivo font-bold capitalize">
            {cartItem?.name}
          </h4>

          <p className="text-sm text-[#2B3A55] font-medium capitalize">
            <span className="text-[#7A8CA5]">color:</span> {cartItem?.color}
          </p>

          <p className="text-sm text-[#2B3A55] font-medium capitalize">
            <span className="text-[#7A8CA5]">size:</span> {cartItem?.size}
          </p>
        </div>
      </div>

      <p className="text-lg text-[#FF7FBF] font-bold">${cartItem?.price}</p>

      <div className="flex items-center justify-between max-w-45 w-full h-13.25 border border-[#6EDCFF]/40 rounded-3xl px-6 bg-white">
        <button
          onClick={onDecrease}
          className="cursor-pointer border-r border-[#6EDCFF]/30 pr-2 h-full text-[#6EDCFF] hover:text-[#3CC8FF] transition"
        >
          <FaMinus size="1rem" />
        </button>

        <span className="text-2xl text-[#2B3A55] font-bold">
          {cartItem?.quantity}
        </span>

        <button
          onClick={onIncrease}
          className="cursor-pointer border-l border-[#6EDCFF]/30 pl-2 h-full text-[#6EDCFF] hover:text-[#3CC8FF] transition"
        >
          <FaPlus size="1rem" />
        </button>
      </div>

      <div className="flex items-center gap-12">
        <p className="text-lg text-[#2B3A55] font-bold">${total}</p>

        <button
          onClick={onRemoveItem}
          className="cursor-pointer w-10 h-10 border border-[#FF6B6B]/50 rounded-full flex items-center justify-center text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white transition"
        >
          <RiCloseLargeLine size="1.25rem" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
