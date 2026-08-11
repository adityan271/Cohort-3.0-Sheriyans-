import { createContext } from "react";

const MyStore = createContext();

export const ContextProvide = ({ children }) => {
  return <MyStore.Provider>{children}</MyStore.Provider>;
};
