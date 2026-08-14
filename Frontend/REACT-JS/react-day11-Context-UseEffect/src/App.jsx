import React, { useContext, useEffect, useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import { ContextProvider, MyStore } from "./context/MyContext";

const App = () => {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    console.log("App  Rendring");
  }, [toggle]);

  return (
    <div>
      <h1>Count is - {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <br />
      <button onClick={() => setToggle((prev) => !prev)}>
        Change Toggle state
      </button>
    </div>
  );
};

export default App;
