import React, { useState } from "react";
import Form from "./components/Form";
import ReactHookForm from "./components/ReactHookForm";

const App = () => {

  return (
    <div className="h-screen w-full p-5 bg-gray-500">
      <h1 className="mb-8">React Hook Form</h1>
      <ReactHookForm/>
    </div>
  );
};

export default App;
