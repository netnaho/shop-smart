// import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
// import SideNav from "./components/ui/nav&header/SideNav";
import MainPages from "./components/MainPages";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
      path: "/pages",
      element: <MainPages />,
      children: [],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
