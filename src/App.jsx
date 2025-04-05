import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import BuyProducts from "./components/Pages/BuyProducts";
import ProductDetail from "./components/Pages/ProductDetail";
import Home from "./components/Pages/Home";
import Footer from "./components/Footer";
import NotFound from "./components/Pages/NotFound";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Navbar cart={cart} setCart={setCart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/buyproducts"
          element={<BuyProducts cart={cart} setCart={setCart} />}
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
