import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import DashBoard from "./components/Admin/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Products from "./components/Products/Products";
import SignIn from "./components/SignIn/SignIn";
import Contacts from "./components/Contacts/Contacs";
import About from "./components/Abouts/About";
import Register from "./components/Register/Register";
import OneProduct from "./components/Products/OneProduct";
import Cabinet from "./components/Cabinet/Cabinet";
import ShopCart from "./components/ShopCard/ShopCard";
import Catalogs from "./components/Catalogs/Catalogs";
import ProductList from "./components/Admin/ProductList";
import Home from "./components/Home/Home";
import { useEffect, useState } from "react";
import { ConversionRate, Rate } from "../src/Types/Types";
import Profile from "./components/ProfileUser/Profile";
function App() {
  const [rate, setRate] = useState<ConversionRate>();
  const [mdlRate, setMDLRate] = useState<number>();

  useEffect(() => {
    async function getRate() {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/f37ba6fb2bd4fa954d2e156a/latest/USD`
      );
      const result = await response.json();

      setRate(result);

      setMDLRate(result.conversion_rates.MDL);
    }
    getRate();
  }, []);

  console.log("MDLRate:", mdlRate);

  //console.log("Rate:", rate?.conversionRate);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/catalogs" element={<Catalogs />} />
        <Route
          path="/catalogs/:id/products"
          element={<Products rate={rate} setRate={setRate} mdlRate={mdlRate} />}
        />
        <Route path="/product/:id" element={<OneProduct />} />
        <Route path="/sign" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cabinet" element={<Cabinet />} />
        <Route path="/shop-cart" element={<ShopCart />} />
        <Route path="/catalogs/:id" element={<ProductList />} />
        <Route path="/cpanel" element={<DashBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
