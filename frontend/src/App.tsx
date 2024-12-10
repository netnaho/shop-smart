// import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
// import SideNav from "./components/ui/nav&header/SideNav";
import MainPages from "./components/MainPages";
import CategoryProducts from "./pages/CategoryProducts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Wallet from "./pages/Wallet";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPages />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/wallet",
      element: <Wallet />,
    },
    {
      path: "/orders",
      element: <Orders />,
      children: [],
    },
    {
      path: "/pages",
      element: <MainPages />,
      children: [],
    },
    {
      path: "/category-products",
      element: <CategoryProducts />,
      children: [],
    },
    {
      path: "/admin",
      element: <Admin />,
      children: [
        {
          path: "/admin",
          element: <AdminDashboard />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
