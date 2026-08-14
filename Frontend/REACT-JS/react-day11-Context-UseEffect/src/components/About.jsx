import React, { useEffect } from "react";

const About = () => {
  let interval = setInterval(() => {
    console.log("Hey I am in ABout");
  }, 1000);

  useEffect(() => {
    console.log("About rendring");

    return () => {
      clearInterval(interval);
      console.log("Dead about");
    };
  }, []);

  return (
    <div>
      <h1>About page</h1>
    </div>
  );
};

export default About;
