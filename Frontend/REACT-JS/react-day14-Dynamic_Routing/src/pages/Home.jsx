import React, { useContext, useEffect } from "react";
import axios from "axios";
import { MyStore } from "../context/MyContext";

const Home = () => {
  let getProductsData = async () => {
    try {
      let { productsData, setProductsData } = useContext(MyStore);

      let res = await axios.get("https://fakestoreapi.com/products");
      console.log(res);
    } catch (error) {
      console.log("Error in APi", error);
    }
  };

    getProductsData();


  return (
    <div>
   {
    productsData
   }
    </div>
  );
};

export default Home;
