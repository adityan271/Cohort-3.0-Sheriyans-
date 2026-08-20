import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrerment, increment } from "./features/counterSlice";

const App = () => {
  let dispatch = useDispatch();
  let { count } = useSelector((store) => store.counter);

  return (
    <div>
      <h1>Redux - Toolkit</h1>
      <h1>My count is {count}</h1>
      <button onClick={() => dispatch(decrerment())}>Decrement</button>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
};

export default App;
