import React from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let formSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col items-center  gap-3">
      <h1 className="text-xl font-bold">Create user</h1>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-90 bg-black flex flex-col gap-3 p-4 rounded border-2 border-white"
      >
        <input
          {...register("name", {})}
          className="p-2 rounded outline-0 border border-white"
          type="text"
          placeholder="Name"
        />
        <input
          {...register("email")}
          className="p-2 rounded outline-0 border border-white"
          type="email"
          placeholder="Email"
        />
        <input
          {...register("number")}
          className="p-2 rounded outline-0 border border-white"
          type="number"
          placeholder="Number"
        />
        <input
          {...register("image")}
          className="p-2 rounded outline-0 border border-white"
          type="url"
          placeholder="Iamge"
        />
        <button className="text-white bg-blue-700 p-2 rounded-xl cursor-pointer">
          Add user
        </button>
      </form>
    </div>
  );
};

export default Form;
