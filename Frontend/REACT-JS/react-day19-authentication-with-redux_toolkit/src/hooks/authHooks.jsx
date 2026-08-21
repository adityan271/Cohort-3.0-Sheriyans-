import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../features/authSlice";

export const useAuth = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState(
    JSON.parse(localStorage.getItem("registerUser")) || [],
  );

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const registerForm = (data) => {
    let arr = [...registerUser, data];
    setRegisterUser(arr);
    localStorage.setItem("registerUser", JSON.stringify(arr));
    toast.success("user registered...");
  };

  const loginForm = (data) => {
    console.log(data);
    let user = registerUser.find((val) => {
      return val.email === data.email && val.password === data.password;
    });

    if (!user) {
      toast.error("Invalid something");
      return;
    }
    dispatch(addUser(user));
    localStorage.setItem("loggedInUser", JSON.stringify(arr));

    toast.success("user loggedin");
    reset();
  };

  return {
    navigate,
    register,
    handleSubmit,
    reset,
    errors,
    registerForm,
    loginForm,
  };
};
