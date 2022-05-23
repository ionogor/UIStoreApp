import Login from "@mui/icons-material/Login";
import React, { createContext, ReactNode, useContext, useState } from "react";

type UserType = {
  login: string;
  setLogin: (val: string) => void;
  isActive: string;
  setIsActive: (val: string) => void;
};

type User = {};

export const useUserContext = createContext<UserType>({
  login: "",
  setLogin: (val: string) => {},
  isActive: "",
  setIsActive: (val: string) => {},
});

export const ContextUser = () => useContext(useUserContext);

const UserContext = ({ children }: { children: ReactNode }) => {
  const [Login, setLogin] = useState<string>("");
  const [isActive, setIsActive] = useState<string>("");
  return (
    <useUserContext.Provider
      value={{ login: Login, setLogin, isActive, setIsActive }}
    >
      {children}
    </useUserContext.Provider>
  );
};

export default UserContext;
