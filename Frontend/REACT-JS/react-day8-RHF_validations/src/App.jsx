import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Usercard from "./components/Usercard";
import Form from "./components/Form";

const App = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="p-3 h-screen flex flex-col gap-4">
      <Navbar />

      {toggle ? (
        <div className="flex">
          <Usercard />
        </div>
      ) : (
        <div className=" h-{70%} flex justify-center items-center">
          <Form />
        </div>
      )}
    </div>
  );
};

export default App;
