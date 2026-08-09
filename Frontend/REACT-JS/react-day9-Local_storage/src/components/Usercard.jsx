import React, { use } from "react";

const Usercard = ({ users, deleteUser, ind, setUpdatedUser, setToggle }) => {
  return (
    <div className="p-4 border border-white rounded flex flex-col gap-2 bg-black">
      <div className="h-40 w-50">
        <img
          className="object-fit h-full w-full rounded-xl"
          src={users.image}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1">
        <h1>{users.name}</h1>
        <p className="text-sm">{users.email}</p>
        <p className="text-sm">{users.contact}</p>
      </div>
      <div className="flex justify-between w-full gap-4">
        <button
          onClick={() => {
            setUpdatedUser(users);
            setToggle((prev) => !prev);
          }}
          className="bg-yellow-700 text-white py-2 px-3 rounded"
        >
          Update
        </button>
        <button
          onChange={() => deleteUser(ind)}
          className="bg-red-700 text-white py-2 px-3 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Usercard;
