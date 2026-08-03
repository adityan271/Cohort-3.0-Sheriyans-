import React, { useRef, useState } from "react";

const Form = () => {
  let formRef = useRef({});
  console.log(formRef);

  const handleChange = (e) => {
    e.preventDeafault();
    console.log(formRef.current.productName.value)
  };
  return (
    <div className="w-80 bg-white ">
      <form
        onSubmit={handleChange}
        className="flex flex-col gap-4 p-6 rounded bg-white"
      >
        <input
          ref={(e) => (formRef.current.productName = e)}
          className="p-2 border rounded border-gray-600"
          type="text"
          placeholder="Product name"
        />
        <input
          ref={(e) => (formRef.current.price = e)}
          className="p-2 border rounded border-gray-600"
          type="text"
          placeholder="Price"
        />
        <span>Select Category:</span>
        <select
          ref={(e) => (formRef.current.category = e)}
          className="p-2 border rounded border-gray-600"
        >
          <option value="Mens">Mens</option>
          <option value="women">Women</option>
          <option value="Kids">Kids</option>
        </select>
        <input
          ref={(e) => (formRef.current.image = e)}
          className="p-2 border rounded border-gray-600"
          type="text"
          placeholder="image"
        />
        <button className="p-2 bg-blue-600 text-white rounded ">Create</button>
      </form>
    </div>
  );
};

export default Form;
