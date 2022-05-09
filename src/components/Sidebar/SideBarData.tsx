import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import StoreMallDirectorySharpIcon from "@mui/icons-material/StoreMallDirectorySharp";
export const SideBarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    title: "Catalogs",
    icon: <StoreMallDirectorySharpIcon />,
    link: "/catalogs",
  },
  {
    title: "About",
    icon: <InfoRoundedIcon />,
    link: "/about",
  },
  {
    title: "Contacts",
    icon: <ContactPageRoundedIcon />,
    link: "/contacts",
  },
  {
    title: "Sign-In",
    icon: <LoginIcon />,
    link: "/LoginIcon",
  },
  {
    title: "Register",
    icon: <AppRegistrationIcon />,
    link: "/register",
  },
];
