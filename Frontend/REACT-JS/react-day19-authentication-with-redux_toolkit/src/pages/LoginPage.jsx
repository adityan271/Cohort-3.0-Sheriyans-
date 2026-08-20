import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByValue,
} from "../features/counterSlice";

const LoginPage = () => {
  let { count } = useSelector((store) => store.counter);
  const [inpValue, setInpValue] = useState(0);
  let dispatch = useDispatch();
  return (
    <div>
      <h1>Login page</h1>
      <h1>count is {count}</h1>
      <button onClick={() => dispatch(decrement())}>decrement</button>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <br /> <br />
      <input
        type="text"
        placeholder="enter count"
        onChange={(e) => setInpValue(e.target.value)}
      />
      <br /> <br />
      <button onClick={() => dispatch(incrementByValue(inpValue))}>Add to count</button>
    </div>
  );
};

export default LoginPage;
