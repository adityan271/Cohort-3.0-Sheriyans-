import React, { useContext, useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import { ContextProvider, MyStore } from "./context/MyContext";

const App = () => {
  console.log("App Rendring");

  return (
    <div>
      <ContextProvider>
        <Home />
        <About />
      </ContextProvider>

      <Contact />
    </div>
  );
};

export default App;
