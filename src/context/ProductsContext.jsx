import { createContext, useState, useEffect, useReducer } from "react";

export const ProductsContext = createContext();
const productReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { products: action.payload };
    case "CREATE_PRODUCT":
      return { products: [action.payload, ...state] };
    case "DELETE_PRODUCT":
      return state;
    default:
      return state;
  }
};

export default function ProductsContextProvider({ children }) {
  // const [product, setProduct] = useState([]);
  const [state, dispatch] = useReducer(productReducer, { products: null });

  const mockCategories = ["All Products", "Grains", "Atta", "Khichdi", "Sell"];
  useEffect(() => {
    // api call
    const fetchData = async () => {
      // ***** for prod *****
      const response = await fetch(
        "https://dhrati-backend.onrender.com/products"
      );
      // ***** for local *****
      // const response = await fetch("/api/products");

      // const text = await response.text();
      // console.log(text);
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "GET_PRODUCTS", payload: json });
        console.log(json);
      }
    };
    fetchData();
  }, []);
  return (
    <ProductsContext.Provider value={{ ...state, dispatch, mockCategories }}>
      {children}
    </ProductsContext.Provider>
  );
}

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
