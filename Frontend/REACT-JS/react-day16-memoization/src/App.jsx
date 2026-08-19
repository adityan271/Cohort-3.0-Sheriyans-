import React, { useCallback, useMemo, useState } from "react";
import Home from "./components/Home";
import About from "./components/About";

const App = () => {
  console.log("App rendring...");

  const [count, setCount] = useState(0);

  let calc = useMemo(() => {
    console.log("Calc running...");
    let sum = 0;
    for (let i = 0; i < 100; i++) {
      sum += i;
    }
    return sum;
  }, []);

  //useCallback - useEffect jaisa same dikhta and
  //same kaam krta redrender hone se rokta
  let greet = useCallback(() => {
    console.log("Good evening");
  }, []);

  return (
    <div>
      <h1>Memoization</h1>
      <h2>Count is {count} </h2>
      <h2>Sum is {calc}</h2>
      <button onClick={() => setCount(count + 1)}>Increment +</button>
      <Home greet={greet} />
      <About greet={greet} />
    </div>
  );
};

export default App;
