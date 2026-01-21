import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Cart/UserCart.jsx";
import OrderSummary from "../OrderSummary/OrderSummary.jsx";
import CartItem from "../CartItem/CartItem.jsx";

const ShoppingCart = () => {
  const { cartItems, handleQuantityChange, handleRemoveItem } = useCart();

  return (
    <div className="min-h-screen bg-[#f5e6e8] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-black">
          Your Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {cartItems?.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-600 mb-4">
                  Your cart is empty
                </p>
                <Link to="/products">
                  <button className="text-blue-600 underline text-lg font-semibold">
                    Start Shopping
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-2xl p-6 mb-8">
                  {cartItems?.map((cartItem, index) => (
                    <div key={cartItem.id}>
                      <CartItem
                        cartItem={cartItem}
                        onIncrease={() =>
                          handleQuantityChange(cartItem.id, "increase")
                        }
                        onDecrease={() =>
                          handleQuantityChange(cartItem.id, "decrease")
                        }
                        onRemoveItem={() => handleRemoveItem(cartItem.id)}
                      />
                      {index < cartItems.length - 1 && (
                        <hr className="border-black my-6" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-4">
                  <Link to="/checkout">
                    <button className="w-full max-w-md px-8 py-4 bg-[#ffc0e3] hover:bg-[#ffb0d8] text-[#00a6e8] font-bold text-lg rounded-full border-2 border-black transition">
                      CHECKOUT
                    </button>
                  </Link>
                  <Link to="/checkout">
                    <button className="w-full max-w-md px-8 py-4 bg-[#ffc0e3] hover:bg-[#ffb0d8] text-[#00a6e8] font-bold text-lg rounded-full border-2 border-black transition">
                      CHECKOUT AS GUEST
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-[380px]">
            <OrderSummary cartItems={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
