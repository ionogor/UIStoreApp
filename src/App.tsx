import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
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
import ProductList from "./components/Home/ProductList";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/catalogs" element={<Catalogs />} />
        <Route path="/catalogs/:id/products" element={<Products />} />
        <Route path="/product/:id" element={<OneProduct />} />
        <Route path="/sign" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cabinet" element={<Cabinet />} />
        <Route path="/shop-cart" element={<ShopCart />} />
        <Route path="/catalogs/:id" element={<ProductList />} />

        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
