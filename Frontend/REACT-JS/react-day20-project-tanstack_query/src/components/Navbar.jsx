import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="flex justify-between p-4 items-center">
      <h1>SkyMart</h1>
      <div className="flex gap-8 text-xl">
        <NavLink
          className={({ isActive }) => {
            return isActive ? "text-yellow-500" : "";
          }}
          to={"/main"}
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "text-yellow-500" : "";
          }}
          to={"/main/shop"}
        >
          Shop
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "text-yellow-500" : "";
          }}
          to={"/main/about"}
        >
          About
        </NavLink>
      </div>
      <div className="flex items-center gap-5">
        <h1>Hey, dev</h1>
        <button>Cart</button>
      </div>
    </div>
  );
};

export default Navbar;
