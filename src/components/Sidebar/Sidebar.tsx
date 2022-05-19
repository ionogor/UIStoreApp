import { Divider, List } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { SideBarData } from "./SideBarData";
import "./style.css";

const Sidebar = (props: any) => {
  return (
    <>
      <div className="wrapper-side-bar">
        <List className="side-bar">
          {SideBarData.map((val, key) => {
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
          })}
        </List>
      </div>
    </>
  );
};

export default Sidebar;
