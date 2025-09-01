import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CartContext from "./context/CartContext";
import ProductsContextProvider from "./context/ProductsContext";
import { useProductsContext } from "./hooks/useProductsContext";
import Navbar from "./components/Navbar";
import Nav from "./components/Nav";
import BuyProducts from "./components/Pages/BuyProducts";
import SellProducts from "./components/Pages/SellProducts";
import ProductDetail from "./components/Pages/ProductDetail";
import Home from "./components/Pages/Home";
import Footer from "./components/Footer";
import NotFound from "./components/Pages/404NotFound";
import Checkout from "./components/Pages/Checkout";
import ScrollToTop from "./components/Functional/ScrollToTop";

function App() {
  //initial cart state to give to the context
  const [cart, setCart] = useState([]);
  //initial product details to give to ProductContext
  const { dispatch } = useProductsContext();
  //getting data from server
  useEffect(() => {
    // api call
    const fetchData = async () => {
      // ***** for prod *****
      const response = await fetch(
        "https://dhrati-backend.onrender.com/products"
      );
      // ***** for local *****
      // const response = await fetch("/api/products");

      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "GET_PRODUCTS", payload: json });
        console.log(json);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <CartContext.Provider value={{ cart, setCart }}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buyproducts" element={<BuyProducts />} />
          <Route path="/product/:_id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/sellproducts" element={<SellProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </CartContext.Provider>
    </Router>
  );
}

export default App;
