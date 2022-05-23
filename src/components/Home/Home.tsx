import React, { useEffect } from "react";
import { useProductContext } from "../Context/ProductContext";
import { ContextUser } from "../Context/UserContext";

const Home = () => {
  const { login, setLogin } = ContextUser();

  var name;
  useEffect(() => {
    async function GetUser() {
      const response = await fetch("http://localhost:7080/login/user", {
        headers: { "Context-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      localStorage.setItem("name", content.result.login);
      setLogin(content.result);
      console.log("user", login);
      console.log("content", content.result);
    }
    GetUser();
  }, []);

  return <>Home page</>;
};

export default Home;
