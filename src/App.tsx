import React, { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import * as ReactDOM from "react-dom";
import { Route, Routes, useParams } from "react-router-dom";
import Products from "./components/Products/Products";
import SignIn from "./components/SignIn/SignIn";
import Contacts from "./components/Contacts/Contacs";
import About from "./components/Abouts/About";
import Register from "./components/Register/Register";
import Product from "./components/Products/Product";
import Sidebar from "./components/Sidebar/Sidebar";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import Catalogs from "./components/Catalogs/Catalogs";
import Cabinet from "./components/Cabinet/Cabinet";
export type Catalog = {
  id: number;
  name: string;
  avatar: string;
};

export function useGetCatalogs() {
  const [catalogs, setCatalogs] = useState<Catalog[] | null>(null);

  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    async function getCatalogs() {
      const response = await fetch("http://localhost:7080/Catalog?Count=5");
      const result = await response.json();

      setCatalogs(result);
    }
    getCatalogs();
  }, []);

  return catalogs;
}

function App() {
  const catalogs = useGetCatalogs();
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/catalogs" element={<Catalogs catalogs={catalogs} />} />
        <Route path="/catalogs/:id/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/sign" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cabinet" element={<Cabinet />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
