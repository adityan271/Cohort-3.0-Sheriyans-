import React from "react";

const Navbar = () => {
  return (
    <div className="p-4 flex items-center justify-between rounded bg-black">
      <div>
        <img
        className="rounded-full"
        width={40}
          src="https://imgs.search.brave.com/lAbYFPtoBU7bCfC5rNYTlG07lp8uBWwRw5BVFqR_nn4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFkL2Vj/L2UyLzFkZWNlMmM4/MzU3YmRkN2NlZTNi/MTUwMzYzNDRmYWY1/LmpwZw"
          alt=""
        />
      </div>
      <div className="flex gap-6 font-semibold">
        <p>Home</p>
        <p>About</p>
        <p>Contact</p>
      </div>
      <button className="p-2 bg-blue-700 text-white cursor-pointer">
        Create user
      </button>
    </div>
  );
};

export default Navbar;
