import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-blue-600 shadow-md">
            {user.name.firstname.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-bold capitalize">
              {user.name.firstname} {user.name.lastname}
            </h2>

            <p className="text-sm text-blue-100">@{user.username}</p>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="space-y-4 p-6">
        {/* Email */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            ✉
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-400">EMAIL</p>
            <p className="truncate text-sm font-semibold text-gray-700">
              {user.email}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
            ☎
          </div>

          <div>
            <p className="text-xs font-medium text-gray-400">PHONE</p>
            <p className="text-sm font-semibold text-gray-700">{user.phone}</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
            📍
          </div>

          <div>
            <p className="text-xs font-medium text-gray-400">ADDRESS</p>
            <p className="text-sm font-semibold capitalize text-gray-700">
              {user.address.number} {user.address.street}
            </p>
            <p className="text-xs capitalize text-gray-500">
              {user.address.city}, {user.address.zipcode}
            </p>
          </div>
        </div>

        {/* ID */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-sm text-gray-500">User ID</span>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
            #{user.id}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
