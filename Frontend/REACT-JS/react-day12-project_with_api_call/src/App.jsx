import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProdcutCard";
import CartScreen from "./pages/CartScreen";
const App = () => {
  const [productsData, setProductsData] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);

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
      <Navbar setIsCartOpen={setIsCartOpen} />

      {isCartOpen ? (
        <div>
          <CartScreen cartItems={cartItems} />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {productsData.map((elem) => {
            return (
              <ProductCard
                key={elem.id}
                product={elem}
                setCartItems={setCartItems}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
