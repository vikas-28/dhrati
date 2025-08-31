import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw Error(
      "useProductsContex must be used inside an ProductsContextProvider"
    );
  }

  return context;
};
