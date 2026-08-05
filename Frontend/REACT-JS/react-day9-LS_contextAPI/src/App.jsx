import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Usercard from "./components/Usercard";
import Form from "./components/Form";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  const deleteUser = (id) => {
    let filterUser = users.filter((val, index) => {
      return index === id;
    });
    console.log(filterUser);
    setUsers(filterUser);
    localStorage.setItem("users", JSON.stringify(filterUser));
  };

  return (
    <div className="p-3 h-screen flex flex-col gap-4">
      <Navbar setToggle={setToggle} />

      {toggle ? (
        <div className="flex gap-4">
          {users.map((elem, index) => {
            return (
              <Usercard
                ind={index}
                deleteUser={deleteUser}
                key={index}
                users={elem}
                setToggle={setToggle}
              />
            );
          })}
        </div>
      ) : (
        <div className=" h-{70%} flex justify-center items-center">
          <Form setUsers={setUsers} setToggle={setToggle} users={users} />
        </div>
      )}
    </div>
  );
};

export default App;
