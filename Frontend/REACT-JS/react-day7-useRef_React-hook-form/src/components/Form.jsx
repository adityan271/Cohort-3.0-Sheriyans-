import React, { useRef, useState } from "react";

const Form = () => {
  const [products, setProducts] = useState({});
  let formRef = useRef({});
  console.log(formRef);

  const handleChange = (e) => {
    e.preventDefault();

    let obj = {
      pName: formRef.current.productName.value,
      price: formRef.current.price.value,
      category: formRef.current.category.value,
      image: formRef.current.image.value,
    };

    setProducts(obj);
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

      <h1>{products.pName}</h1>
      <h1>{products.price}</h1>
      <h1>{products.category}</h1>
      <h1>{products.image}</h1>
    </div>
  );
};

export default Form;
