import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export default function ProductsContextProvider({ children }) {
  const [product, setProduct] = useState([]);
  const mockCategories = ["All Products", "Grains", "Atta", "Khichdi", "Sell"];
  // const mockProductData = [
  //   {
  //     _id: 1,
  //     name: "Wheat",
  //     category: "Grains",
  //     price: 50,
  //     pricePerKg: 10,
  //     image: "/assets/grains.jpg",
  //   },
  //   {
  //     _id: 2,
  //     name: "Soyabean",
  //     category: "Grains",
  //     price: 70,
  //     pricePerKg: 14,
  //     image: "/assets/grains.jpg",
  //   },
  //   {
  //     _id: 3,
  //     name: "Ragi Atta",
  //     category: "Atta",
  //     price: 100,
  //     pricePerKg: 20,
  //     image: "/assets/aata.jpg",
  //   },
  //   {
  //     _id: 4,
  //     name: "Moong Atta",
  //     category: "Atta",
  //     price: 120,
  //     pricePerKg: 24,
  //     image: "/assets/aata.jpg",
  //   },
  //   {
  //     _id: 5,
  //     name: "Multigrain Atta",
  //     category: "Atta",
  //     price: 150,
  //     pricePerKg: 30,
  //     image: "/assets/aata.jpg",
  //   },
  //   {
  //     _id: 6,
  //     name: "Mix Khichdi",
  //     category: "Khichdi",
  //     price: 200,
  //     pricePerKg: 40,
  //     image: "/assets/khichdi.jpg",
  //   },
  // ];
  useEffect(() => {
    // api call
    const fetchData = async () => {
      const response = await fetch(
        "https://dhrati-backend.onrender.com/api/products"
      );
      // const text = await response.text();
      // console.log(text);
      const json = await response.json();
      if (response.ok) {
        setProduct(json);
        console.log(json);
      }
    };
    fetchData();
    // setProduct(mockProductData);
  }, []);
  return (
    <ProductsContext.Provider value={{ product, mockCategories }}>
      {children}
    </ProductsContext.Provider>
  );
}
