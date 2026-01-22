import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cart from "../views/Cart.jsx";
import { useCart } from "../components/Cart/UserCart.jsx";


export default function Layout () {
  const { isCartOpen, openCart, toggleCart, closeCart } = useCart();
  const location = useLocation();

  const showCartOnPages = ["/", "/products", "/SpecialSets"];

  const shouldShowCart = showCartOnPages.includes(location.pathname);

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden">
      <Navbar onCartOpen={openCart} />

      <main className="grow">
        <Outlet />
      </main>

      {shouldShowCart && (
        <Cart 
          isOpen={isCartOpen} 
          onClose={closeCart}
        />
      )}

      <Footer />
    </div>
  );
}