import React from "react";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";

const OrderSummary = ({ cartItems }) => {
  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item?.quantity * item?.price,
    0,
  );

  const shipping = 20;
  const grandTotal = (subtotal + shipping).toFixed(2);

  return (
    <div className="max-w-[350px] w-full min-h-[350px] h-full rounded-3xl border-t-[5px] border-[#7dd3fc] bg-[#f0f9ff] shadow-md">
      <h3 className="text-xl text-[#1e3a8a] font-archivo font-bold capitalize text-center py-4">
        order summary
      </h3>

      <div className="py-4 px-4 border-y border-[#bae6fd]">
        <h4 className="text-base text-[#1e3a8a] font-archivo font-bold capitalize flex items-center justify-between">
          apply coupons
          <button className="px-4 py-2 rounded-3xl bg-[#93c5fd] hover:bg-[#60a5fa] text-white text-sm font-bold transition">
            apply
          </button>
        </h4>
      </div>

      <div className="flex flex-col px-4 py-4 space-y-4">
        <div className="border-b border-[#bae6fd] pb-4 space-y-3">
          <h4 className="text-lg text-[#1e3a8a] font-bold capitalize">
            product details:
          </h4>

          <p className="text-base text-[#475569] font-medium capitalize flex items-center justify-between">
            sub total
            <span className="text-[#1e3a8a] font-bold">${subtotal}</span>
          </p>

          <p className="text-base text-[#475569] font-medium capitalize flex items-center justify-between">
            shipping
            <span className="text-[#1e3a8a] font-bold">${shipping}</span>
          </p>
        </div>

        <div className="border-b border-[#bae6fd] pb-4 space-y-3">
          <h4 className="text-base text-[#1e3a8a] font-bold capitalize flex items-center justify-between">
            grand total
            <span className="text-[#fb7185] text-lg">${grandTotal}</span>
          </h4>

          <button className="py-3 bg-[#fb7185] hover:bg-[#f43f5e] rounded-3xl text-base text-white font-bold capitalize flex items-center justify-center transition w-full">
            proceed checkout
          </button>
        </div>

        <div>
          <p className="text-sm text-[#475569] font-medium capitalize flex items-center gap-2">
            <AiTwotoneSafetyCertificate
              size={"1.8rem"}
              className="text-[#38bdf8]"
            />
            safe and secure payments, easy return, 100% authentic products
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
