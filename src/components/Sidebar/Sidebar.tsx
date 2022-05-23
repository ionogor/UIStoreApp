import { Divider, List } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { SideBarAdmin, SideBarUser } from "./SideBarData";
import "./style.css";
import UserContext, { ContextUser } from "../Context/UserContext";

const Sidebar = (props: any) => {
  const { login: Login, setLogin } = ContextUser();

  let menuUser;

  var logout = localStorage.getItem("name");
  console.log("log:", logout);
  if (logout == null || logout == "") {
    menuUser = (
      <>
        {logout}
        {SideBarUser.map((val, key) => {
          return (
            <Link
              to={val.link}
              key={val.link}
              className="link"
              onClick={() => props.setOpen(!props.open)}
            >
              <div className="icon">{val.icon}</div>
              <div className="title">{val.title}</div>
              <Divider />
            </Link>
          );
        })}
      </>
    );
  } else {
    menuUser = (
      <>
        {SideBarAdmin.map((val, key) => {
          return (
            <Link
              to={val.link}
              key={val.link}
              className="link"
              onClick={() => props.setOpen(!props.open)}
            >
              <div className="icon">{val.icon}</div>
              <div className="title">{val.title}</div>
              <Divider />
            </Link>
          );
        })}
      </>
    );
  }

  return (
    <>
      <div className="wrapper-side-bar">
        <List className="side-bar">
          {menuUser}
          {/* {SideBarAdmin.map((val, key) => {
            return (
              <Link
                to={val.link}
                className="link"
                key={key}
                onClick={() => props.setOpen(!props.open)}
              >
                <div className="icon">{val.icon}</div>
                <div className="title">{val.title}</div>
                <Divider />
              </Link>
            );
          })} */}
        </List>
      </div>
    </>
  );
};

export default Sidebar;
