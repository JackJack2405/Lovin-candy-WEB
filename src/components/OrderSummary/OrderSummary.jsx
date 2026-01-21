import React, { useState } from "react";

const OrderSummary = ({ cartItems }) => {
  const [promoCode, setPromoCode] = useState("");

  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item?.quantity * item?.price,
    0,
  );

  const vatRate = 0.07;
  const vat = subtotal * vatRate;
  const total = subtotal + vat;

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      alert(`Promo code "${promoCode}" applied!`);
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-black p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>

      <div className="space-y-3 mb-6">
        {cartItems?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-gray-700">{item.name}</span>
            <span className="font-semibold text-black">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <hr className="border-gray-300 my-4" />

      <div className="flex items-center justify-between text-sm mb-6">
        <span className="text-gray-600">Vat (40%)</span>
        <span className="font-semibold text-black">${vat.toFixed(2)}</span>
      </div>

      <hr className="border-gray-300 my-4" />

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-lg font-bold text-black">
            {cartItems?.length || 0} Total Item(s)
          </div>
          <div className="text-xs text-gray-500">Inclu. VAT</div>
        </div>
        <div className="text-2xl font-bold text-black">${total.toFixed(2)}</div>
      </div>

      <hr className="border-gray-300 my-6" />

      {/* Payment Methods */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-black mb-3">We Accept</p>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3 py-2 bg-[#1A1F71] text-white text-xs font-bold rounded">
            VISA
          </div>
          <div className="px-3 py-2 bg-gradient-to-r from-[#EB001B] to-[#F79E1B] text-white text-xs font-bold rounded">
            MC
          </div>
          <div className="px-3 py-2 bg-[#006FCF] text-white text-xs font-bold rounded">
            AMEX
          </div>
          <div className="px-3 py-2 bg-[#FF6600] text-white text-xs font-bold rounded">
            DISC
          </div>
          <div className="px-3 py-2 bg-black text-white text-xs font-bold rounded">
            venmo
          </div>
        </div>
      </div>

      {/* PayPal (Fake) fr fr*/}
      <div className="mb-6">
        <p className="text-sm font-semibold text-black mb-3">
          Or Checkout Using:
        </p>
        <button className="w-full px-4 py-3 bg-[#FFC439] hover:bg-[#FFD666] text-[#003087] font-bold rounded-lg border-2 border-black flex items-center justify-center gap-2 transition">
          <span className="text-[#003087] font-bold text-lg">
            Pay<span className="text-[#009CDE]">Pal</span>
          </span>
          <span className="text-sm">Checkout</span>
        </button>
      </div>

      <hr className="border-gray-300 my-6" />

      {/* Promo  */}
      <div>
        <label className="block text-sm font-semibold text-black mb-3">
          Enter Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
            placeholder=""
          />
          <button
            onClick={handleApplyPromo}
            className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-lg transition"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
