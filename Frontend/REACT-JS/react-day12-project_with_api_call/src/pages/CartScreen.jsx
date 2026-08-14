import React from "react";
import Cart from "../components/Cart";
import { useContext } from "react";
import { MyStore } from "../context/MyContext";

const CartScreen = () => {
    let { cartItems } = useContext(MyStore)
  return (
    <div className=" h-screen text-6xl">
      {cartItems.map((elem) => {
        return <Cart key={elem.id} product={elem} />;
      })}
    </div>
  );
};

export default CartScreen;
