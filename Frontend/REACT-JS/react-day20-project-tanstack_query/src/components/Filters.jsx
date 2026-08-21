import React from "react";
import { useProductsApi } from "../hooks/productHooks";

const Filters = () => {
  let { filterProducts } = useProductsApi();
  return (
    <div className="p-3 flex gap-6 w-full  border rounded border-gray-500">
      <div className="flex gap-8 w-full">
        <input
          onChange={(e) => filterProducts(e.target.value)}
          className="p-2 outline-0 border w-full rounded"
          type="text"
          placeholder="search products"
        />
        <button className="p-2 bg-white text-black rounded border-0">
          search
        </button>
      </div>
      <div>
        <span>select categories</span>
        <select className="p-2 bg-white text-black outline-0 rounded border-0">
          <option value="groceries">Groceries</option>
          <option value="beauty">Beauty</option>
          <option value="furniture">Furniture</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
