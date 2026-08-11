import { createContext, useState } from "react";

//export here
export const MyStore = createContext();

export const ContextProvider = ({ children }) => {
  //code here
  const [centralData, setCentralData] = useState("Jai BABA ki ");

  //value is used for drilling
  return <MyStore.Provider value={centralData}>{children}</MyStore.Provider>;
};
