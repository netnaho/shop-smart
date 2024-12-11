// import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
// import SideNav from "./components/ui/nav&header/SideNav";
import MainPages from "./components/MainPages";
import CategoryProducts from "./pages/CategoryProducts";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Wallet from "./pages/Wallet";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCategories from "./pages/AdminCategories";
import AdminProducts from "./pages/AdminProducts";
import SideNav from "./components/ui/nav&header/SideNav";

const HomeLayout = () => {
  return (
    <>
      <div>
        <SideNav />
      </div>
      <Outlet />
      <div>Footer</div>
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <MainPages />,
          children: [],
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
          path: "/category-products",
          element: <CategoryProducts />,
          children: [],
        },
      ],
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
      path: "/admin",
      element: <Admin />,
      children: [
        {
          path: "/admin",
          element: <AdminDashboard />,
        },
        {
          path: "/admin/categories",
          element: <AdminCategories />,
        },
        { path: "/admin/products", element: <AdminProducts /> },
        // {
        //   path: "/admin/products",
        //   element: <div>Products</div>,
        // },
        {
          path: "/admin/report",
          element: <div>Report Summary</div>,
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
