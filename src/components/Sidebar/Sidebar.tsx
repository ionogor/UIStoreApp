import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Sidebar = () => {
  return (
    <>
      <div className="wrapper-side-bar">
        <div className="side-bar">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/catalogs">
            Catalogs
          </Link>
          <Link className="link" to="/about">
            About
          </Link>
          <Link className="link" to="/contacts">
            Contacts
          </Link>
          <Link className="link" to="/sign">
            Sign In
          </Link>
          <Link className="link" to="/register">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
