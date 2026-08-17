import { createContext, useState } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [registerUser, setRegisterUser] = useState(
    JSON.parse(localStorage.getItem("registeredUsers")) || [],
  );
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedinUser")),
  );

  console.log("Registered User = ", registerUser);
  console.log("LoggedIn User = ", loggedInUser);

  return (
    <Auth.Provider
      value={{ loggedInUser, setLoggedInUser, registerUser, setRegisterUser }}
    >
      {children}
    </Auth.Provider>
  );
};
