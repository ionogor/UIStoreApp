import React, { ReactNode, useState } from "react";
import { createContext } from "react";

type SideBar = {
  open: string;
};

const SideContext = createContext(null);

const setSideBar = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState();
  return <></>;
};

export default setSideBar;
