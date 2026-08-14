import React, { useContext, useEffect, useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import { ContextProvider, MyStore } from "./context/MyContext";
import axios from "axios";

const App = () => {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [apiData, setApiData] = useState(null);
  console.log("API Data", apiData);

  let getData = async () => {
    let res = await axios.get("https://fakestoreapi.com/products");
    setApiData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Count is - {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <br />
      <button onClick={() => setToggle((prev) => !prev)}>
        Change Toggle state
      </button>

      {toggle ? <Contact /> : <About />}
    </div>
  );
};

export default App;
