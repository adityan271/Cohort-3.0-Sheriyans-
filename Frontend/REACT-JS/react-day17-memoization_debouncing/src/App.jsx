import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [searchData, setSearchData] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [scrollY, setScrollY] = useState(null);
  let throttle = false;

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

  // Debouncing...
  useEffect(() => {
    if (!searchData) return;

    let timeout = setTimeout(() => {
      filteredData();
    }, 700);

    return () => clearTimeout(timeout);
  }, [searchData]);

  // Throttling...
  useEffect(() => {
    let handleScroll = () => {
      if (throttle) return;
      throttle = true;
      console.log("Scroll triggered...");
      setScrollY(window.scrollY);

      setTimeout(() => {
        throttle = false;
      }, 10000);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
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
