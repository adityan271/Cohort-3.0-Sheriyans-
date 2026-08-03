import React from "react";
import { useForm } from "react-hook-form";
const ReactHookForm = () => {
  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="w-80 bg-white ">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col gap-4 p-6 rounded bg-white"
      >
        <input
          {...register("productName")}
          className="p-2 border rounded border-gray-600"
          type="text"
          placeholder="Product name"
        />
        <input
          {...register("price")}
          className="p-2 border rounded border-gray-600"
          type="text"
          placeholder="Price"
        />
        <input
          {...register("category")}
          className="p-2 border rounded border-gray-600"
          type="text"
          placeholder="category"
        />
        <input
          {...register("image")}
          className="p-2 border rounded border-gray-600"
          type="text"
          placeholder="image"
        />
        <button className="p-2 bg-blue-600 text-white rounded ">Create</button>
      </form>
    </div>
  );
};

export default ReactHookForm;
