import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [searchData, setSearchData] = useState(null);
  const [productsData, setProductsData] = useState([]);

  let getProducts = async () => {
    let res = await axios.get("https://fakestoreapi.com/products");
    setProductsData(res.data);
  };

  let filteredData = () => {
    let result = productsData.filter((val) => {
      return val.title.toLowerCase().includes(searchData.toLowerCase());
    });
    setProductsData(result);
  };

  useEffect(() => {
    if (!searchData) return;

    let timeout = setTimeout(() => {
      filteredData();
    }, 700);

    return () => clearTimeout(timeout);
  }, [searchData]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>Debounce</h1>

      <input
        type="text"
        placeholder="search products"
        onChange={(e) => setSearchData(e.target.value)}
      />

      {productsData.map((val) => {
        return <h1 key={val.id}>{val.title}</h1>;
      })}
    </div>
  );
};

export default App;
