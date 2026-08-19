import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

export const useAuth = () => {
  const { registerUser, loggedInUser, setLoggedInUser, setRegisterUser } =
    useContext(Auth);

  let navigate = useNavigate();
  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let loginFormSubmit = (data) => {
    console.log(data);
    let user = registerUser.find((val) => {
      return val.email === data.email && val.password === data.password;
    });

    if (!user) {
      toast.error("user not found or invalid credentials");
      reset();
      return;
    }
    setLoggedInUser(user);
    localStorage.setItem("loggedinUser", JSON.stringify(user));
    toast.success("user loggedIn");
    navigate("/main");

    reset();
  };

  let registerFormSubmit = (data) => {
    let arr = [...registerUser, data];
    setRegisterUser(arr);
    alert("user registered succesfully");
    setLoggedInUser(data);
    localStorage.setItem("loggedinUser", JSON.stringify(data));
    localStorage.setItem("registeredUsers", JSON.stringify(arr));
    navigate("/main");

    reset();
  };

  return {
    navigate,
    register,
    handleSubmit,
    reset,
    errors,
    loginFormSubmit,
    registerFormSubmit,
  };
};
