import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Usercard from "./components/Usercard";
import Form from "./components/Form";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [users, setUsers] = useState([]);

  return (
    <div className="p-3 h-screen flex flex-col gap-4">
      <Navbar setToggle={setToggle} />

      {toggle ? (
        <div className="flex gap-4">
          {
            users.map((elem)=>{
              return <Usercard users={elem}/>
            })
          }
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
