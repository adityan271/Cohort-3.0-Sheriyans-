import React, { useContext, useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import { MyStore } from "./context/MyContext";

const App = () => {
  console.log("App Rendring");

  let { count, setCount } = useContext(MyStore);

  return (
    <div>
      <h1>Hello - {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Home />
      <About />
      <Contact />
    </div>
  );
};

export default App;
