import React from "react";

const Login = ({ setToggle }) => {
  return (
    <div className="bg-white w-90 p-6 rounded-2xl flex flex-col gap-4">
      <h1>Login</h1>
      <form className="flex flex-col gap-4" action="">
        <input
          className="p-2 border border-gray-900 rounded"
          type="text"
          placeholder="email"
        />
        <input
          className="p-2 border border-gray-900 rounded"
          type="text"
          placeholder="password"
        />
        <button className="p-2 bg-blue-600 text-white rounded cursor-pointer">
          Login
        </button>
      </form>
      <p>
        Didn't have an Account?{" "}
        <span
          onClick={() => setToggle((prev) => !prev)}
          className="text-blue-600 cursor-pointer"
        >
          Register Here
        </span>
      </p>
    </div>
  );
};

export default Login;
