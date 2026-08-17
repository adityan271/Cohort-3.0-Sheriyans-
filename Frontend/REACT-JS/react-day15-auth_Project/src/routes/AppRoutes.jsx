import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { BrowserRouter } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MainLayout from "../layout/MainLayout";

const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children:[
        {
          path:"",
          element:<LoginPage/>
        },
         {
          path:"/register",
          element:<RegisterPage/>
        }
      ]
    },
    {
      path:"/main",
      element:<MainLayout/>
    }
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
