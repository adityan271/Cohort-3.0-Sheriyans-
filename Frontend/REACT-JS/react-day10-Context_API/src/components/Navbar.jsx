import React, { useContext } from "react";
import { MyShop } from "../context/MyWebsite";

const Navbar = () => {
  let { setIsCartOpen } = useContext(MyShop);

  return (
    <div className=" p-5 rounded bg-black flex items-center justify-between">
      <div>logo</div>
      <div className="flex gap-10 text-xl">
        <p onClick={() => setIsCartOpen(false)} className="cursor-pointer">
          Home
        </p>
        <p onClick={() => setIsCartOpen(true)} className="cursor-pointer">
          Cart
        </p>
      </div>
      <button>Login</button>
    </div>
  );
};

export default Navbar;
