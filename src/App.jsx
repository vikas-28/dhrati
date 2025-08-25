import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CartContext from "./context/CartContext";
import ProductsContextProvider from "./context/ProductsContext";
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
  // const [product, setProduct] = useState([]);
  // const mockCategories = ["All Products", "Grains", "Atta", "Khichdi", "Sell"];
  // // const mockProductData = [
  // //   {
  // //     id: 1,
  // //     name: "Wheat",
  // //     category: "Grains",
  // //     price: 50,
  // //     pricePerKg: 10,
  // //     image: "/assets/grains.jpg",
  // //   },
  // //   {
  // //     id: 2,
  // //     name: "Soyabean",
  // //     category: "Grains",
  // //     price: 70,
  // //     pricePerKg: 14,
  // //     image: "/assets/grains.jpg",
  // //   },
  // //   {
  // //     id: 3,
  // //     name: "Ragi Atta",
  // //     category: "Atta",
  // //     price: 100,
  // //     pricePerKg: 20,
  // //     image: "/assets/aata.jpg",
  // //   },
  // //   {
  // //     id: 4,
  // //     name: "Moong Atta",
  // //     category: "Atta",
  // //     price: 120,
  // //     pricePerKg: 24,
  // //     image: "/assets/aata.jpg",
  // //   },
  // //   {
  // //     id: 5,
  // //     name: "Multigrain Atta",
  // //     category: "Atta",
  // //     price: 150,
  // //     pricePerKg: 30,
  // //     image: "/assets/aata.jpg",
  // //   },
  // //   {
  // //     id: 6,
  // //     name: "Mix Khichdi",
  // //     category: "Khichdi",
  // //     price: 200,
  // //     pricePerKg: 40,
  // //     image: "/assets/khichdi.jpg",
  // //   },
  // // ];
  // // useEffect(() => {
  // //   //api call
  // //   const fetchData = async () => {
  // //     const response = await fetch("/api/products");
  // //     // const text = await response.text();
  // //     // console.log(text);
  // //     const json = await response.json();
  // //     if (response.ok) {
  // //       setProduct(json);
  // //       console.log(json);
  // //     }
  // //   };
  // //   fetchData();
  // //   //
  // //   // setProduct(mockProductData);
  // // }, []);

  return (
    <Router>
      <ScrollToTop />
      <CartContext.Provider value={{ cart, setCart }}>
        <ProductsContextProvider>
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
        </ProductsContextProvider>
      </CartContext.Provider>
    </Router>
  );
}

export default App;
