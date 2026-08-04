import React from "react";

const Form = () => {
  return (
    <div className="flex flex-col items-center  gap-3">
      <h1 className="text-xl font-bold">Create user</h1>
      <form className="w-90 bg-black flex flex-col gap-3 p-4 rounded border-2 border-white">
        <input
          className="p-2 rounded outline-0 border border-white"
          type="text"
          placeholder="Name"
        />
        <input
          className="p-2 rounded outline-0 border border-white"
          type="email"
          placeholder="Email"
        />
        <input
          className="p-2 rounded outline-0 border border-white"
          type="number"
          placeholder="Number"
        />
        <input
          className="p-2 rounded outline-0 border border-white"
          type="url"
          placeholder="Iamge"
        />
        <button className="text-white bg-blue-700 p-2 rounded-xl cursor-pointer">Add user</button>
      </form>
    </div>
  );
};

export default Form;
