import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="h-screen p-2  grid grid-cols-[2fr_7fr] ">
      <Navbar />
      <div className="h-full p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
