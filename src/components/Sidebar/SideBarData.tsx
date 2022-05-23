import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { ShoppingCart } from "@mui/icons-material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import StoreMallDirectorySharpIcon from "@mui/icons-material/StoreMallDirectorySharp";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const SideBarUser = [
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
    link: "/sign",
  },
  {
    title: "Register",
    icon: <AppRegistrationIcon />,
    link: "/register",
  },
  {
    title: "Shop Cart",
    icon: <ShoppingCart />,
    link: "/shop-cart",
  },
];

export const SideBarAdmin = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/",
  },

  {
    title: "DashBoard",
    icon: <DashboardIcon />,
    link: "/cpanel",
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
    link: "/sign",
  },
  {
    title: "Register",
    icon: <AppRegistrationIcon />,
    link: "/register",
  },
  {
    title: "Shop Cart",
    icon: <ShoppingCart />,
    link: "/shop-cart",
  },
];
