import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes } from "react-router-dom";

import ProductProvider from "./components/Context/ProductContext";
import UserContext from "./components/Context/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function Main() {
  const [productBasket, setProductBasket] = useState([]);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <UserContext>
          <ProductProvider>
            <App />
          </ProductProvider>
        </UserContext>
      </BrowserRouter>
    </React.StrictMode>
  );
}
root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
