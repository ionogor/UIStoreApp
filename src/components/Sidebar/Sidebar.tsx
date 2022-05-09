import { Divider, List } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { SideBarData } from "./SideBarData";
import "./style.css";

const Sidebar = () => {
  return (
    <>
      <div className="wrapper-side-bar">
        <List className="side-bar">
          {SideBarData.map((val, key) => {
            return (
              <Link to={val.link} className="link" key={key}>
                <div className="icon">{val.icon}</div>
                <div className="title">{val.title}</div>
                <Divider />
              </Link>
            );
          })}
        </List>
      </div>
      {/* <div className="wrapper-side-bar">
        <div className="side-bar">
          <Link className="link" to="/">
            Home
          </Link>
          <Divider />
          <Link className="link" to="/catalogs">
            Catalogs
          </Link>
          <Divider />
          <Link className="link" to="/about">
            About
          </Link>
          <Divider />
          <Link className="link" to="/contacts">
            Contacts
          </Link>
          <Divider />
          <Link className="link" to="/sign">
            Sign In
          </Link>
          <Divider />
          <Link className="link" to="/register">
            Register
          </Link>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
