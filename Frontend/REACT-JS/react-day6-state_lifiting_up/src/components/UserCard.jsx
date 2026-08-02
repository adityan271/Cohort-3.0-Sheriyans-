import React from "react";
const UserCard = ({ user }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-200 p-5 hover:shadow-xl transition duration-300">
      {" "}
      {/* Profile Section */}{" "}
      <div className="flex items-center gap-4">
        {" "}
        {/* Avatar */}{" "}
        <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold uppercase">
          {" "}
          {user.name.charAt(0)}{" "}
        </div>{" "}
        {/* User Info */}{" "}
        <div className="min-w-0">
          {" "}
          <h2 className="text-lg font-bold text-gray-900 truncate">
            {" "}
            {user.name}{" "}
          </h2>{" "}
          <p className="text-sm text-gray-500 truncate"> {user.email} </p>{" "}
        </div>{" "}
      </div>{" "}
      {/* Details */}{" "}
      <div className="mt-5 bg-gray-50 rounded-xl p-4">
        {" "}
        <div className="flex justify-between mb-2">
          {" "}
          <span className="text-gray-500 text-sm">Name</span>{" "}
          <span className="font-medium text-gray-800"> {user.name} </span>{" "}
        </div>{" "}
        <div className="flex justify-between">
          {" "}
          <span className="text-gray-500 text-sm">Email</span>{" "}
          <span className="font-medium text-gray-800 truncate ml-4">
            {" "}
            {user.email}{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
      {/* Actions */}{" "}
      <div className="flex gap-3 mt-5">
        {" "}
        <button className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
          {" "}
          Edit{" "}
        </button>{" "}
        <button className="flex-1 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition">
          {" "}
          Delete{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
};
export default UserCard;
