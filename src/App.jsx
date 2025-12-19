import {createBrowserRouter, Router, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";
import MyProfile from "./views/MyProfile-pages/MyProfile";
import Customize from "./views/Customize";
import MyOrder from "./views/MyProfile-pages/MyOrder";
import MyFavItems from "./views/MyProfile-pages/MyFavItems";
import MyAddress from "./views/MyProfile-pages/MyAddress";
import MyPayment from "./views/MyProfile-pages/MyPayment";
import Products from "./views/Products";
import Admin from "./views/Admin";

const router = createBrowserRouter([
  {
  path: "/",
  element: <Layout />,
  errorElement:
    (
    <div className="min-h-screen flex justify-center items-center bg-[#FAF3F3]">
      <h1 className="text-4xl">404 Page Not Found</h1>
    </div>
    ),
  children: [
    {path: "/", element: <Home />,},
    {path: "/products", element: <Products />},
    {path: "/customize", element: <Customize />,},
    {path: "/profile", element: <MyProfile />,},
    {path: "/profile/order", element: <MyOrder />,},
    {path: "/profile/favitems", element: <MyFavItems />,},
    {path: "/profile/address", element: <MyAddress />,},
    {path: "/profile/payment", element: <MyPayment />,},
    {path: "/admin" ,element: <Admin />},
  ],
  },
]);

function App() {


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App