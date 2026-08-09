import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Usercard from "./components/Usercard";
import Form from "./components/Form";

const App = () => {
  let obj = {
    name: "Aditya",
    age: 19,
  };

  localStorage.setItem("user", JSON.stringify(obj));

  let lsd = localStorage.getItem("user");
  let res = JSON.parse(lsd);
  console.log(res);

  const [toggle, setToggle] = useState(false);
  
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || []; // map is not applied on null so Logical OR a blank Array
  });

  return (
    <div className="p-3 h-screen flex flex-col gap-4">
      <Navbar setToggle={setToggle} />

      {toggle ? (
        <div className="flex gap-4">
          {users.map((elem, index) => {
            return <Usercard key={index} users={elem} />;
          })}
        </div>
      ) : (
        <div className=" h-{70%} flex justify-center items-center">
          <Form users={users} setUsers={setUsers} setToggle={setToggle} />
        </div>
      )}
    </div>
  );
};

export default App;
