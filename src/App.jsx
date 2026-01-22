import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home.jsx";
import MyProfile from "./views/MyProfile-pages/MyProfile";
import Customize from "./views/Customize";
import MyOrder from "./views/MyProfile-pages/MyOrder";
import MyFavItems from "./views/MyProfile-pages/MyFavItems";
import MyAddress from "./views/MyProfile-pages/MyAddress";
import MyPayment from "./views/MyProfile-pages/MyPayment";
import Products from "./views/Products";
import Admin from "./views/Admin-pages/Admin";
import AdminLayout from "./components/Admin/AdminLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import ProfileAddressEdit from "./components/MyProfile/ProfileAddressEdit";
import ProfileAddressButton from "./components/MyProfile/ProfileAddressButton";
import SpecialSets from "./views/SpecialSets";
import Cart from "./views/Cart";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import AdminUsers from "./components/Admin/AdminUsers.jsx";
import ProductManagement from "./components/Admin/ProductManagement.jsx";
import AdminChat from "./components/Admin/AdminChat.jsx";
import { CartProvider } from "./components/Cart/CartProvider.jsx";
import Checkout from "./components/Checkout/checkoutPage.jsx";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart.jsx";
import OrderSummary from "./components/OrderSummary/OrderSummary.jsx";
import CartItem from "./components/CartItem/CartItem.jsx";
import RequireAdmin from "./auth/RequireAdmin.jsx";
import { AuthProvider } from "./auth/AuthProvider.jsx";

const NotFound = (
  <div className="min-h-screen flex justify-center items-center bg-[#FAF3F3]">
    <h1 className="text-4xl">404 Page Not Found</h1>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: NotFound,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "customize", element: <Customize /> },

      { path: "profile", element: <MyProfile /> },
      { path: "profile/order", element: <MyOrder /> },
      { path: "profile/favitems", element: <MyFavItems /> },
      { path: "profile/address", element: <MyAddress /> },
      { path: "profile/address/edit", element: <ProfileAddressEdit /> },
      { path: "profile/address/button", element: <ProfileAddressButton /> },
      { path: "profile/payment", element: <MyPayment /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      { path: "specialsets", element: <SpecialSets /> },
      { path: "cart", element: <Cart /> },
      { path: "shoppingcart", element: <ShoppingCart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "ordersummary", element: <OrderSummary /> },
      { path: "cartitem", element: <CartItem /> },
    ],
  },

  {
    path: "/admin",
    element: <RequireAdmin />,
    errorElement: NotFound,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Admin /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "users", element: <AdminUsers /> },
          { path: "products", element: <ProductManagement /> },
          { path: "chat", element: <AdminChat /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
