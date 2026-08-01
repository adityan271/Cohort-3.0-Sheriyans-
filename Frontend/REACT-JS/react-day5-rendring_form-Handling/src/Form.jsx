import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <input
        name="name"
        onChange={handleChange}
        type="text"
        placeholder="Name"
      />
      <input
        name="email"
        onChange={handleChange}
        type="text"
        placeholder="Email"
      />
      <input
        name="password"
        onChange={handleChange}
        type="text"
        placeholder="Password"
      />

      <h1>this is name - {formData.name} </h1>
      <h1>this is name - {formData.email} </h1>
      <h1>this is name - {formData.password} </h1>
    </div>
  );
};

export default Form;
