import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/Cart/UserCart.jsx";

export default function Customize() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCandies, setSelectedCandies] = useState([]);

  const candySection = useRef(null);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const packages = [
    {id: "bag",name: "Bag",candyLimit: 2,price: 200, image: "/bag.png",description: " Pick up to 2 sins 😇 ",},
    {id: "bowl",name: "Bowl", candyLimit: 4, price: 300, image: "/bowl.png", description: "Pick up to 4 sins 😏",},
    {id: "jar",name: "Jar", candyLimit: 8, price: 400, image: "/jar.png", description: "Pick up to 8 sins 😈",},
      
  ];

  const candyOptions = [
    { id: 1, name: "Blue Raspberry Lollipop Bag", image: "/Blue Raspberry Lollipop Bag.png" },
    { id: 2, name: "Orange Creamsicle Cream Swirl Lollipop Bag", image: "/Orange Creamsicle Cream Swirl Lollipop Bag.png" },
    { id: 3, name: "Strawberry Shortcake Cream Swirl Lollipop Bag", image: "/Strawberry Shortcake Cream Swirl Lollipop Bag.png" },
    { id: 4, name: "Cotton Candy Lollipop Bag", image: "/Cotton Candy Lollipop Bag.png" },
    { id: 5, name: "Mini Sour Rainbow Belts", image: "/Mini Sour Rainbow Belts.png" },
    { id: 6, name: "Jelly Belly UnBEARably Hot Cinnamon Bears", image: "/Jelly Belly UnBEARably Hot Cinnamon Bears.png" },
    { id: 7, name: "Gummy Roses", image: "/Gummy Roses.png" },
    { id: 8, name: "Heavenly Sours Gummy", image: "/Heavenly Sours Gummy.png" },
  ];

  function handleSelectPackage(pkg) {
    setSelectedSize(pkg);
    setSelectedCandies([]);

    setTimeout(() => {
      candySection.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleAddCandy(candy) {
    if (selectedCandies.length < selectedSize.candyLimit) {
      setSelectedCandies([...selectedCandies, { ...candy, cartId: Date.now() }]);
    }
  }

  function handleRemoveCandy(cartId) {
    setSelectedCandies(selectedCandies.filter((c) => c.cartId !== cartId));
  }

  function handleCancel() {
    setSelectedSize(null);
    setSelectedCandies([]);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 100);
  }

  function handleCheckout() {
    selectedCandies.forEach((candy) => {
      addToCart({
        id: candy.cartId,
        name: candy.name,
        image: candy.image,
        price: selectedSize.price / selectedSize.candyLimit,
      });
    });

    navigate("/checkout");
  }

  const isCartFull = selectedCandies.length >= (selectedSize?.candyLimit || 0);

  return (
    <div className="min-h-screen flex bg-[#fff7fa]">
      <div className="flex-1 px-6 pr-[420px] pb-20">
        <div className="text-center my-12">
          <h1 className="text-[42px] text-gray-800 drop-shadow font-bold">
            🍭 Customize Your Sweet Guilty Pleasure
          </h1>
        </div>
        
        <section className="max-w-6xl mx-auto my-16">
          <h2 className="text-3xl text-center mb-8 font-bold">
            Step 1: Choose your level of guilt 😈
          </h2>

          <div className="flex gap-5 justify-center flex-wrap">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => handleSelectPackage(pkg)}
                className={`
                  w-[200px] p-5 rounded-xl bg-[#A6EAFF] cursor-pointer
                  transition-all duration-300 text-center
                  hover:scale-105 hover:shadow-lg
                  ${selectedSize?.id === pkg.id ? "ring-4 ring-[#ff7ab6]" : ""}
                `}
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-28 h-28 mx-auto mb-3 object-contain"
                />
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                <p className="text-gray-600">{pkg.description}</p>
                <p className="text-2xl font-bold text-[#ff7ab6] mt-2">
                  ฿{pkg.price}
                </p>
              </div>
            ))}
          </div>
        </section>

        {selectedSize && (
          <section ref={candySection} className="max-w-6xl mx-auto my-16">
            <h2 className="text-3xl text-center mb-10 font-bold">
              Step 2: Pick your sweet sins 🍭 ({selectedCandies.length}/{selectedSize.candyLimit})
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {candyOptions.map((candy) => (
                <div
                  key={candy.id}
                  className="bg-[#A6EAFF] rounded-2xl p-5 flex flex-col items-center h-full shadow-md hover:shadow-xl transition"
                >
                  <div className="h-32 flex items-center justify-center mb-4">
                    <img
                      src={candy.image}
                      alt={candy.name}
                      className="max-h-28 object-contain"
                    />
                  </div>

                  <p className="text-[#ff4f9a] text-lg font-bold text-center min-h-[56px] mb-4">
                    {candy.name}
                  </p>

                  <button
                    disabled={isCartFull}
                    onClick={() => handleAddCandy(candy)}
                    className="
                      mt-auto
                      bg-gradient-to-r from-[#ff7ab6] to-[#ff4f9a]
                      text-white font-bold
                      px-8 py-2.5 rounded-full
                      hover:scale-105 transition
                      disabled:from-gray-300 disabled:to-gray-300
                    "
                  >
                    {isCartFull ? "No more sins" : "Add this sin"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <aside className="fixed right-0 top-0 bottom-0 w-[400px] bg-white shadow-[-4px_0_10px_rgba(0,0,0,0.2)] flex flex-col">
        <div className="bg-gradient-to-r from-[#A6EAFF] to-[#ff7ab6] p-5 text-white">
          <h2 className="text-2xl font-bold">Your Guilt</h2>
        </div>

        <div className="flex-1 p-5 overflow-y-auto">
          {!selectedSize ? (
            <p className="text-center text-gray-400 italic">
              Start by choosing your guilt 😈
            </p>
          ) : (
            <>
              <div className="bg-gray-100 p-4 rounded-lg mb-2 flex items-center gap-4">
                <img
                  src={selectedSize.image}
                  className="w-14 h-14 object-contain"
                />
                <div>
                  <h3 className="font-bold">{selectedSize.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedSize.candyLimit} sins max
                  </p>
                </div>
                <span className="ml-auto text-xl font-bold text-[#ff7ab6]">
                  ฿{selectedSize.price}
                </span>
              </div>

              <button
                onClick={handleCancel}
                className="w-full mb-4 py-2 rounded-lg border border-red-300 text-red-500 font-bold hover:bg-red-50"
              >
                Change my guilt 😈
              </button>

              <h3 className="font-bold mb-2">
                Sweet sins ({selectedCandies.length}/{selectedSize.candyLimit})
              </h3>

              <div className="space-y-2">
                {selectedCandies.map((candy) => (
                  <div
                    key={candy.cartId}
                    className="flex items-center gap-3 bg-gray-50 p-2 rounded"
                  >
                    <img
                      src={candy.image}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="flex-1">{candy.name}</span>
                    <button
                      onClick={() => handleRemoveCandy(candy.cartId)}
                      className="bg-red-100 w-8 h-8 rounded hover:bg-red-200"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              <button
                disabled={selectedCandies.length !== selectedSize.candyLimit}
                onClick={handleCheckout}
                className="
                  w-full mt-6 py-3 rounded-xl
                  text-white font-bold text-lg
                  bg-gradient-to-r from-[#A6EAFF] to-[#ff7ab6]
                  disabled:bg-gray-300
                "
              >
                {selectedCandies.length === selectedSize.candyLimit
                  ? `Accept my guilt – ฿${selectedSize.price} 😈`
                  : `Add ${selectedSize.candyLimit - selectedCandies.length} more sins`}
              </button>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
