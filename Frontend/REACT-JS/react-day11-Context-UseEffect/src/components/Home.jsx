import React, { useContext } from "react";
import { MyStore } from "../context/MyContext";

const Home = () => {
  console.log("Home Rendring");

  let { count, setCount } = useContext(MyStore);
  return (
    <div>
      <h1>Home page - {count}</h1>

      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Home;
