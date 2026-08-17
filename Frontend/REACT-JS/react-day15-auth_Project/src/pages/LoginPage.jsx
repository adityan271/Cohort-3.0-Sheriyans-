import React from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
    let navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      {/* Login Card */}
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h1>

          <p className="mt-2 text-sm text-gray-500">Login to your account</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <div className="mt-7 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button
          onClick={()=> navigate("/register")}
            type="button"
            className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
