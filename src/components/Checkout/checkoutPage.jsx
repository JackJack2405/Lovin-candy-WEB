import React, { useState, useEffect } from "react";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/UserCart.jsx";
import axios from "axios";

export default function Checkout({ onSuccess }) {
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_URL;
  const { cartItems, setCartItems } = useCart();

  const [currentStep, setCurrentStep] = useState(1); // Step: 1=Payment, 2=Address, 3=Confirm
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // Payment
    paymentMethod: "credit-card",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    // Address
    email: "",
    fullName: "",
    phone: "",
    streetAddress: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
    agreeTerms: false,
  });

  // Fetch user address
  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${apiBase}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data.data;

        if (userData && userData.address) {
          setFormData((prev) => ({
            ...prev,
            email: userData.email || prev.email,
            fullName: userData.address.fullName || "",
            phone: userData.address.phone || "",
            streetAddress: userData.address.streetAddress || "",
            province: userData.address.province || "",
            district: userData.address.district || "",
            subDistrict: userData.address.subDistrict || "",
            postalCode: userData.address.postalCode || "",
          }));
        }
      } catch (err) {
        console.error("Error fetching user address:", err);
      }
    };

    fetchUserAddress();
  }, [apiBase]);

  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item?.quantity * item?.price,
    0,
  );
  const estimatedTaxes = subtotal * 0.07;
  const total = (subtotal + estimatedTaxes).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleConfirmPayment = () => {
    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber || !formData.expirationDate || !formData.cvv) {
        alert("Please fill in all payment details");
        return;
      }
    }
    setCurrentStep(2); // Go to Address step
  };

  const handleConfirmAddress = () => {
    setIsSubmitted(true);

    const {
      fullName,
      phone,
      streetAddress,
      province,
      district,
      subDistrict,
      postalCode,
    } = formData;

    if (
      !fullName ||
      !phone ||
      !streetAddress ||
      !province ||
      !district ||
      !subDistrict ||
      !postalCode
    ) {
      alert("Please fill in all required shipping information fields.");
      return;
    }

    if (phone.length < 9) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (postalCode.length !== 5) {
      alert("Postal code must be exactly 5 digits.");
      return;
    }

    if (!formData.agreeTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setCurrentStep(3); // Go to Confirm step
  };

  const confirmOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const shippingAddress = {
        fullName: formData.fullName || "",
        phone: formData.phone || "",
        streetAddress: formData.streetAddress || "",
        province: formData.province || "",
        district: formData.district || "",
        subDistrict: formData.subDistrict || "",
        postalCode: formData.postalCode || "",
      };

      const items = cartItems.map((item) => {
        const isCustom = String(item._id).startsWith("custom-");

        return {
          product_id: isCustom ? null : item._id,
          isCustom: isCustom,
          customDetails: isCustom ? item.details : null,
          quantity: item.quantity,
          price: item.price,
        };
      });

      await axios.put(
        `${apiBase}/users/update-address`,
        {
          address: shippingAddress,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const res = await axios.post(
        `${apiBase}/orders`,
        {
          items,
          shippingAddress,
          total: Number(total),
          paymentMethod: formData.paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.data.success) {
        if (setCartItems) {
          setCartItems([]);
        }
        localStorage.removeItem("cart_storage");
        if (onSuccess) onSuccess();
        navigate("/profile/order");
      }
    } catch (err) {
      console.error("Confirm order error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to confirm order.");
    }
  };

  const getInputClass = (value) => {
    const baseClass =
      "w-full px-4 py-3 border rounded-xl focus:outline-none transition ";
    const statusClass =
      isSubmitted && !value
        ? "border-red-500 bg-red-50 focus:border-red-600"
        : "border-[#6EDCFF]/40 focus:border-[#6EDCFF]";
    return baseClass + statusClass;
  };

  const handleReturnToCart = () => {
    navigate("/shoppingcart");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full py-10 md:py-20">
        <div className="px-4 md:px-0">
          <div className="md:container mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl text-[#2B3A55] font-archivo font-bold text-center mb-2">
                Checkout
              </h1>
              <div className="flex justify-center gap-4 mt-4">
                <span
                  className={`text-sm ${currentStep >= 1 ? "text-[#6EDCFF] font-bold" : "text-gray-400"}`}
                >
                  1. Payment
                </span>
                <span className="text-gray-400">→</span>
                <span
                  className={`text-sm ${currentStep >= 2 ? "text-[#6EDCFF] font-bold" : "text-gray-400"}`}
                >
                  2. Address
                </span>
                <span className="text-gray-400">→</span>
                <span
                  className={`text-sm ${currentStep >= 3 ? "text-[#6EDCFF] font-bold" : "text-gray-400"}`}
                >
                  3. Confirm
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left Column */}
              <div className="flex-1">
                {/* STEP 1: Payment Method */}
                {currentStep === 1 && (
                  <div className="space-y-8">
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
                                checked={
                                  formData.paymentMethod === "credit-card"
                                }
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
                                  Card Number *
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
                                    Expiration date *
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
                                    CVV *
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

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleReturnToCart}
                        className="flex items-center gap-2 text-[#6EDCFF] hover:text-[#3CC8FF] font-semibold transition"
                      >
                        <GoArrowLeft size={20} />
                        Return to cart
                      </button>

                      <button
                        type="button"
                        onClick={handleConfirmPayment}
                        className="px-8 py-3 bg-[#6EDCFF] hover:bg-[#3CC8FF] text-white font-bold rounded-full transition shadow-md hover:shadow-lg"
                      >
                        Confirm Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Address */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#6EDCFF]/20">
                      <h2 className="text-2xl text-[#2B3A55] font-archivo font-bold mb-6">
                        Shipping Address
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
                            className={getInputClass(formData.email)}
                            placeholder="your.email@example.com"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-[#2B3A55] font-medium mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className={getInputClass(formData.fullName)}
                              placeholder="Som Pong"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-[#2B3A55] font-medium mb-2">
                              Phone Number *
                            </label>
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={getInputClass(formData.phone)}
                              placeholder="0812345678"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-[#2B3A55] font-medium mb-2">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            name="streetAddress"
                            value={formData.streetAddress}
                            onChange={handleInputChange}
                            className={getInputClass(formData.streetAddress)}
                            placeholder="House No., Building, Soi, Street"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-[#2B3A55] font-medium mb-2">
                              Province *
                            </label>
                            <input
                              type="text"
                              name="province"
                              value={formData.province}
                              onChange={handleInputChange}
                              className={getInputClass(formData.province)}
                              placeholder="Bangkok"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-[#2B3A55] font-medium mb-2">
                              District *
                            </label>
                            <input
                              type="text"
                              name="district"
                              value={formData.district}
                              onChange={handleInputChange}
                              className={getInputClass(formData.district)}
                              placeholder="Pathum Wan"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-[#2B3A55] font-medium mb-2">
                              Sub-District *
                            </label>
                            <input
                              type="text"
                              name="subDistrict"
                              value={formData.subDistrict}
                              onChange={handleInputChange}
                              className={getInputClass(formData.subDistrict)}
                              placeholder="Lumpini"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-[#2B3A55] font-medium mb-2">
                              Postal Code *
                            </label>
                            <input
                              type="text"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              className={getInputClass(formData.postalCode)}
                              placeholder="10330"
                              maxLength={5}
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

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex items-center gap-2 text-[#6EDCFF] hover:text-[#3CC8FF] font-semibold transition"
                      >
                        <GoArrowLeft size={20} />
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={handleConfirmAddress}
                        className="px-8 py-3 bg-[#6EDCFF] hover:bg-[#3CC8FF] text-white font-bold rounded-full transition shadow-md hover:shadow-lg"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Confirm Order */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#6EDCFF]/20">
                      <h2 className="text-2xl text-[#2B3A55] font-archivo font-bold mb-6">
                        Confirm Your Order
                      </h2>

                      <div className="space-y-6">
                        {/* Payment Info */}
                        <div className="border-b border-gray-200 pb-4">
                          <h3 className="text-lg font-semibold text-[#2B3A55] mb-3">
                            Payment Method
                          </h3>
                          <p className="text-gray-600 capitalize">
                            {formData.paymentMethod.replace("-", " ")}
                          </p>
                          {formData.paymentMethod === "credit-card" &&
                            formData.cardNumber && (
                              <p className="text-sm text-gray-500 mt-1">
                                **** **** **** {formData.cardNumber.slice(-4)}
                              </p>
                            )}
                        </div>

                        {/* Shipping Address */}
                        <div className="border-b border-gray-200 pb-4">
                          <h3 className="text-lg font-semibold text-[#2B3A55] mb-3">
                            Shipping Address
                          </h3>
                          <p className="text-gray-600">{formData.fullName}</p>
                          <p className="text-gray-600">
                            {formData.streetAddress}
                          </p>
                          <p className="text-gray-600">
                            {formData.subDistrict}, {formData.district}
                          </p>
                          <p className="text-gray-600">
                            {formData.province} {formData.postalCode}
                          </p>
                          <p className="text-gray-600">{formData.phone}</p>
                        </div>

                        {/* Order Items */}
                        <div>
                          <h3 className="text-lg font-semibold text-[#2B3A55] mb-3">
                            Order Items ({cartItems.length})
                          </h3>
                          <div className="space-y-2">
                            {cartItems.map((item) => (
                              <div
                                key={item._id}
                                className="flex justify-between items-center py-2"
                              >
                                <div className="flex items-center gap-3">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-12 h-12 object-contain rounded border"
                                  />
                                  <div>
                                    <p className="text-gray-800 font-medium">
                                      {item.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <span className="font-semibold text-[#2B3A55]">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Total */}
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>Subtotal</span>
                              <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>Estimated Taxes</span>
                              <span>${estimatedTaxes.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-[#2B3A55] mt-3 pt-3 border-t">
                              <span>Total</span>
                              <span className="text-[#fb7185]">${total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="flex items-center gap-2 text-[#6EDCFF] hover:text-[#3CC8FF] font-semibold transition"
                      >
                        <GoArrowLeft size={20} />
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={confirmOrder}
                        className="px-8 py-3 bg-[#6EDCFF] hover:bg-[#3CC8FF] text-white font-bold rounded-full transition shadow-md hover:shadow-lg"
                      >
                        Confirm Order
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:w-[400px]">
                <div className="bg-[#f0f9ff] rounded-3xl border-t-[5px] border-[#7dd3fc] shadow-md sticky top-4">
                  <h3 className="text-xl text-[#1e3a8a] font-archivo font-bold text-center py-4 border-b border-[#bae6fd]">
                    Order Summary
                  </h3>

                  <div className="px-6 py-4 border-b border-[#bae6fd] space-y-3">
                    <p className="text-base text-[#475569] font-medium flex items-center justify-between">
                      {cartItems.length} Items
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
                  </div>

                  <div className="px-6 py-4 border-b border-[#bae6fd]">
                    <p className="text-lg text-[#1e3a8a] font-bold flex items-center justify-between">
                      Total ({cartItems.length} items)
                      <span className="text-[#fb7185] text-xl">${total}</span>
                    </p>
                  </div>

                  <div className="px-6 py-4">
                    <h4 className="text-lg text-[#1e3a8a] font-bold mb-4">
                      Order Details
                    </h4>

                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-3 pb-3 border-b border-[#bae6fd] last:border-0"
                        >
                          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-[#bae6fd]">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-12 h-12 object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-sm text-[#2B3A55] font-bold">
                              {item.name}
                            </h5>
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
}
