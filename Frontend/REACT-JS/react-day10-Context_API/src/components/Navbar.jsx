import React from "react";

const Navbar = () => {
  return (
    <div className=" p-5 rounded bg-black flex items-center justify-between">
      <div>logo</div>
      <div className="flex gap-10 text-xl">
        <p>Home</p>
        <p>Cart</p>
      </div>
      <button>Login</button>
    </div>
  );
};

export default Navbar;
