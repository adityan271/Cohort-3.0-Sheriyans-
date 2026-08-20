import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layout/MainLayout";
import App from "../App";

// Code-spliting

let About = lazy(() => import("../pages/About"));
let Contact = lazy(() => import("../pages/Contact"));

const AppRouter = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <App />,
        },
        {
          path: "about",
          element: (
            <Suspense fallback={<h1>Loading About...</h1>}>
              <About />
            </Suspense>
          ),
        },
        {
          path: "contact",
          element: (
            <Suspense fallback={<h1>Loading Contact...</h1>}>
              <Contact />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
