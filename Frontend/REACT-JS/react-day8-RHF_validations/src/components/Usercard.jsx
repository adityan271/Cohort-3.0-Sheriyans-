import React from "react";

const Usercard = () => {
  return (
    <div className="p-4 border border-white rounded flex flex-col gap-2 bg-black">
      <div className="h-40 w-50">
        <img
          className="object-fit h-full w-full rounded-xl"
          src="https://imgs.search.brave.com/LgzH2FotCmrbKgZx4vTMH_7L_0QgX6fmBIlCXbacqtY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjUv/NDY4Lzc1OC9zbWFs/bC9zbWlsaW5nLWFz/aWFuLWJveS1pbi1z/dW5saWdodC1vdXRk/b29yLXBvcnRyYWl0/LW5hdHVyYWwtc2V0/dGluZy1qb3lmdWwt/ZXhwcmVzc2lvbi1m/cmVlLXBob3RvLmpw/ZWc"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1">
        <h1>Name</h1>
        <p className="text-sm">email</p>
        <p className="text-sm">contact</p>
      </div>
      <div className="flex justify-between w-full gap-4" >
        <button className="bg-yellow-700 text-white py-2 px-3 rounded">Update</button>
        <button className="bg-red-700 text-white py-2 px-3 rounded">Delete</button>
      </div>
    </div>
  );
};

export default Usercard;
