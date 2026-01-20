import React, { useState } from "react";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";

import { useCart } from "./useCart";

const Checkout = () => {
  const { cartItems } = useCart();

  const [formData, setFormData] = useState({
    email: "",
    country: "",
    zipCode: "",
    agreeTerms: false,
    paymentMethod: "credit-card",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item?.quantity * item?.price,
    0,
  );
  const platformFee = 0.96;
  const estimatedTaxes = 0;
  const total = (subtotal + platformFee + estimatedTaxes).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.agreeTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    console.log("Form submitted:", formData);
    alert("Payment processing... (Demo only)");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full py-10 md:py-20">
        <div className="px-4 md:px-0">
          <div className="md:container mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl text-[#2B3A55] font-archivo font-bold text-center mb-2">
                Guest Checkout
              </h1>
              <p className="text-center text-[#7A8CA5] text-sm">
                Log in to check out faster and find your past purchases
                <button className="ml-2 text-[#6EDCFF] hover:text-[#3CC8FF] font-medium underline">
                  Log in
                </button>
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left Column - Form */}
              <div className="flex-1">
                <div className="space-y-8">
                  {/* Contact Information */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#6EDCFF]/20">
                    <h2 className="text-2xl text-[#2B3A55] font-archivo font-bold mb-6">
                      Contact Information
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-[#2B3A55] font-medium mb-2">
                          Enter email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-[#6EDCFF]/40 rounded-xl focus:outline-none focus:border-[#6EDCFF] transition"
                          placeholder="your.email@example.com"
                        />
                        <p className="text-xs text-[#7A8CA5] mt-1">
                          This email will be associated with your purchase
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-[#2B3A55] font-medium mb-2">
                            Country
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-[#6EDCFF]/40 rounded-xl focus:outline-none focus:border-[#6EDCFF] transition bg-white"
                          >
                            <option value="">Select country</option>
                            <option value="TH">Thailand</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="JP">Japan</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm text-[#2B3A55] font-medium mb-2">
                            Zip Code
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-[#6EDCFF]/40 rounded-xl focus:outline-none focus:border-[#6EDCFF] transition"
                            placeholder="10110"
                          />
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          className="mt-1 w-4 h-4 text-[#6EDCFF] border-[#6EDCFF]/40 rounded focus:ring-[#6EDCFF]"
                        />
                        <label
                          htmlFor="agreeTerms"
                          className="text-sm text-[#7A8CA5]"
                        >
                          I agree to the{" "}
                          <span className="text-[#6EDCFF] hover:underline cursor-pointer">
                            Terms of Service
                          </span>{" "}
                          and{" "}
                          <span className="text-[#6EDCFF] hover:underline cursor-pointer">
                            Privacy Policy
                          </span>
                          . *
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#6EDCFF]/20">
                    <h2 className="text-2xl text-[#2B3A55] font-archivo font-bold mb-6">
                      Choose payment method
                    </h2>

                    <div className="space-y-4">
                      {/* Credit Card */}
                      <div
                        className={`border-2 rounded-xl p-4 cursor-pointer transition ${
                          formData.paymentMethod === "credit-card"
                            ? "border-[#6EDCFF] bg-[#EAF9FF]"
                            : "border-[#6EDCFF]/20 hover:border-[#6EDCFF]/40"
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            paymentMethod: "credit-card",
                          }))
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="credit-card"
                              checked={formData.paymentMethod === "credit-card"}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-[#6EDCFF]"
                            />
                            <span className="text-lg text-[#2B3A55] font-semibold">
                              Credit Card
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <div className="px-2 py-1 bg-[#1A1F71] text-white text-xs font-bold rounded">
                              VISA
                            </div>
                            <div className="px-2 py-1 bg-[#EB001B] text-white text-xs font-bold rounded">
                              MC
                            </div>
                          </div>
                        </div>

                        {formData.paymentMethod === "credit-card" && (
                          <div className="mt-4 space-y-4">
                            <div>
                              <label className="block text-sm text-[#2B3A55] font-medium mb-2">
                                Card Number
                              </label>
                              <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                                className="w-full px-4 py-3 border border-[#6EDCFF]/40 rounded-xl focus:outline-none focus:border-[#6EDCFF] transition"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm text-[#2B3A55] font-medium mb-2">
                                  Expiration date
                                </label>
                                <input
                                  type="text"
                                  name="expirationDate"
                                  value={formData.expirationDate}
                                  onChange={handleInputChange}
                                  placeholder="MM / YY"
                                  maxLength={7}
                                  className="w-full px-4 py-3 border border-[#6EDCFF]/40 rounded-xl focus:outline-none focus:border-[#6EDCFF] transition"
                                />
                              </div>

                              <div>
                                <label className="block text-sm text-[#2B3A55] font-medium mb-2">
                                  CVV
                                </label>
                                <input
                                  type="text"
                                  name="cvv"
                                  value={formData.cvv}
                                  onChange={handleInputChange}
                                  placeholder="000"
                                  maxLength={4}
                                  className="w-full px-4 py-3 border border-[#6EDCFF]/40 rounded-xl focus:outline-none focus:border-[#6EDCFF] transition"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* PayPal */}
                      <div
                        className={`border-2 rounded-xl p-4 cursor-pointer transition ${
                          formData.paymentMethod === "paypal"
                            ? "border-[#6EDCFF] bg-[#EAF9FF]"
                            : "border-[#6EDCFF]/20 hover:border-[#6EDCFF]/40"
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            paymentMethod: "paypal",
                          }))
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="paypal"
                              checked={formData.paymentMethod === "paypal"}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-[#6EDCFF]"
                            />
                            <span className="text-lg text-[#2B3A55] font-semibold">
                              PayPal
                            </span>
                          </div>
                          <div className="text-[#003087] font-bold text-sm">
                            Pay<span className="text-[#009CDE]">Pal</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="flex items-center gap-2 text-[#6EDCFF] hover:text-[#3CC8FF] font-semibold transition"
                    >
                      <GoArrowLeft size={20} />
                      Return to cart
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-8 py-3 bg-[#6EDCFF] hover:bg-[#3CC8FF] text-white font-bold rounded-full transition shadow-md hover:shadow-lg"
                    >
                      Enter payment
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:w-[400px]">
                <div className="bg-[#f0f9ff] rounded-3xl border-t-[5px] border-[#7dd3fc] shadow-md sticky top-4">
                  <h3 className="text-xl text-[#1e3a8a] font-archivo font-bold text-center py-4 border-b border-[#bae6fd]">
                    Order Summary
                  </h3>

                  {/* Price Summary */}
                  <div className="px-6 py-4 border-b border-[#bae6fd] space-y-3">
                    <p className="text-base text-[#475569] font-medium flex items-center justify-between">
                      {cartItems.length} licenses x 1 seats
                      <span className="text-[#1e3a8a] font-bold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-base text-[#475569] font-medium flex items-center justify-between">
                      Estimated taxes
                      <span className="text-[#1e3a8a] font-bold">
                        ${estimatedTaxes.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-base text-[#475569] font-medium flex items-center justify-between">
                      Platform fee
                      <span className="text-[#1e3a8a] font-bold">
                        ${platformFee.toFixed(2)}
                      </span>
                    </p>
                  </div>

                  {/* Total */}
                  <div className="px-6 py-4 border-b border-[#bae6fd]">
                    <p className="text-lg text-[#1e3a8a] font-bold flex items-center justify-between">
                      Total ({cartItems.length} items)
                      <span className="text-[#fb7185] text-xl">${total}</span>
                    </p>
                  </div>

                  {/* Order Details */}
                  <div className="px-6 py-4">
                    <h4 className="text-lg text-[#1e3a8a] font-bold mb-4">
                      Order Details
                    </h4>

                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 pb-3 border-b border-[#bae6fd] last:border-0"
                        >
                          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-[#bae6fd]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-sm text-[#2B3A55] font-bold">
                              {item.name}
                            </h5>
                            <p className="text-xs text-[#7A8CA5]">
                              {item.quantity} Desktop License
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-[#1e3a8a] font-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="px-6 py-4 bg-[#e0f2fe] rounded-b-3xl">
                    <p className="text-xs text-[#475569] font-medium flex items-center gap-2">
                      <AiTwotoneSafetyCertificate
                        size={"1.5rem"}
                        className="text-[#38bdf8]"
                      />
                      Safe and secure payments, easy return, 100% authentic
                      products
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
