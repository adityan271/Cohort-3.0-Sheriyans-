import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProdcutCard";
const App = () => {
  const [productsData, setProductsData] = useState([]);
  console.log(productsData);

  const getProductsData = async () => {
    try {
      let res = await axios.get("https://fakestoreapi.com/products");
      setProductsData(res.data);
    } catch (error) {
      console.log("Error in Api", error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <div>
      <Navbar />
      {/* <ProductCard/> */}
    </div>
  );
};

export default App;
