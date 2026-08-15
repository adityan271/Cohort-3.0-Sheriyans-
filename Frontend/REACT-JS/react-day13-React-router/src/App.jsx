import React from "react";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <div className="h-screen p-2">
      <nav className="flex items-center justify-between">
        <h1>Logo</h1>
        <div className="flex items-center justify-between gap-10 ">
          <p>Home</p>
          <p>About</p>
          <p>Contact</p>
        </div>
        <button>Login</button>
      </nav>

      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
