import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProdcutCard";
import CartScreen from "./pages/CartScreen";
import { MyStore } from "./context/MyContext";
const App = () => {
  let { isCartOpen } = useContext(MyStore);

  const [productsData, setProductsData] = useState([]);

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
    <div className="h-screen p-2 flex flex-col gap-4">
      <Navbar />

      {isCartOpen ? (
        <div>
          <CartScreen />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {productsData.map((elem) => {
            return (
              <ProductCard
                key={elem.id}
                product={elem}
              
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
