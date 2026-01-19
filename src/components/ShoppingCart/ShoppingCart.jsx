import React from "react";
import { useCart } from "./CartContext";
import OrderSummary from "./OrderSummary";
import CartItem from "./CartItem";
import { GoArrowLeft } from "react-icons/go";

const CART_HEADERS = ["product details", "price", "quantity", "total"];

const ShoppingCart = () => {
  const { cartItems, handleQuantityChange, handleRemoveItem } = useCart();

  const cartCount = cartItems?.length || 0;
  const displayCount = cartCount > 9 ? cartCount : `0${cartCount}`;

  return (
    <div className="w-full">
      <div className="w-full py-[130px]">
        <div className="px-4 md:px-0">
          <div className="md:container mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 w-full">
              <div className="flex flex-col gap-10 w-full">
                <div className="flex items-center justify-between gap-10 pb-4 border-b border-[#1a1219]">
                  <h3 className="text-xl text-[#0f0200] font-archivo font-bold capitalize">
                    shopping cart
                  </h3>
                  <h4 className="text-xl text-[#0f0200] font-bold font-archivo capitalize">
                    ({displayCount})
                  </h4>
                </div>

                <div className="hidden md:grid grid-cols-4 gap-8 pb-4 border-b border-[#1a1219]">
                  {CART_HEADERS.map((header) => (
                    <h4
                      key={header}
                      className="text-center text-lg text-[#787878] font-archivo font-medium capitalize"
                    >
                      {header}
                    </h4>
                  ))}
                </div>

                {cartItems?.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-xl text-gray-500 mb-4">
                      Your cart is empty
                    </p>
                    <p className="text-[#683292] underline text-lg font-archivo font-medium cursor-pointer">
                      Start Shopping
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8 w-full">
                    {cartItems?.map((cartItem) => (
                      <CartItem
                        key={cartItem.id}
                        cartItem={cartItem}
                        onIncrease={() =>
                          handleQuantityChange(cartItem.id, "increase")
                        }
                        onDecrease={() =>
                          handleQuantityChange(cartItem.id, "decrease")
                        }
                        onRemoveItem={() => handleRemoveItem(cartItem.id)}
                      />
                    ))}
                  </div>
                )}

                <div>
                  <button className="flex items-center gap-3 text-xl text-[#683292] font-archivo font-bold capitalize hover:underline">
                    <GoArrowLeft /> continue shopping
                  </button>
                </div>
              </div>

              <OrderSummary cartItems={cartItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
