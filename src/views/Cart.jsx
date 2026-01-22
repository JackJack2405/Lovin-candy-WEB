import { useCart } from "../components/Cart/UserCart.jsx";
import { FiChevronLeft, FiChevronRight, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Cart({ pkg, onClose, isOpen }) {
  const { cartItems, removeFromCart, updateQuantity, toggleCart } = useCart();

  return (
    <>
      <button
        onClick={toggleCart}
        className={`
          fixed top-1/2 -translate-y-1/2 z-1001
          w-12 h-12 bg-[#277eff] border-4 border-[#d2e6ff] rounded-full 
          flex items-center justify-center shadow-2xl cursor-pointer 
          hover:scale-110 transition-all duration-300
          
          ${isOpen 
            ? "right-96 -mr-6"
            : "right-10 -mr-6"
          }
        `}
      >
        <span className="text-xl text-white flex items-center justify-center">
          {isOpen ? <FiChevronRight /> : <FiChevronLeft />}
        </span>
      </button>


    <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl p-6 overflow-y-auto transition-transform duration-300 transform z-[999]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}>

      <h2 className="text-3xl font-bold mb-6 text-gray-800 pb-4">Your Cart</h2>

      {pkg && (
        <div className="mb-4 border-b pb-2">
          <p className="font-bold">{pkg.name}</p>
          <p className="text-pink-500">฿{pkg.price}</p>
        </div>
      )}

      <div className="space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center py-20">
              <p className="text-gray-400 italic text-xl">Empty cart...</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={item._id || index} className="flex gap-4 items-center border-b border-gray-100 pb-4 last:border-none">
                <img 
                  src={item.imageUrl || "/placeholder.png"} 
                  className="w-20 h-20 object-contain rounded-xl bg-gray-50 p-1" 
                  alt={item.name} 
                />
                
                <div className="flex flex-col flex-1 gap-2">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-base text-black line-clamp-1">{item.name}</span>
                    <button 
                      onClick={() => removeFromCart(item._id)} 
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded-full disabled:opacity-20"
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus size={20} />
                      </button>
                      
                      <input 
                        type="number" 
                        value={item.quantity === "" ? "" : item.quantity}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          
                          if (inputValue === "") {
                            updateQuantity(item._id, ""); 
                            return;
                          }

                          const val = parseInt(inputValue);
                          if (!isNaN(val) && val >= 1) {
                            updateQuantity(item._id, val);
                          }
                        }}
                        onBlur={(e) => {

                          if (e.target.value === "" || parseInt(e.target.value) < 1) {
                            updateQuantity(item._id, 1);
                          }
                        }}
                        className="w-12 bg-transparent text-center font-black text-lg focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded-full"
                      >
                        <FiPlus size={20} />
                      </button>
                    </div>

                    <span className="text-base font-bold text-gray-700">
                      ฿{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
            <div className="mt-10 space-y-4">
                <Link to="/shoppingcart">
                    <button className="w-full bg-[#ff7ab6] text-white py-4 rounded-2xl font-bold text-xl hover:bg-[#ff5a9d] transition-all shadow-lg active:scale-95 cursor-pointer">
                        Cart Details
                    </button>
                </Link>
            </div>
        )}
      </div>
    </>
  );
}