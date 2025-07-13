import React, { createContext } from "react";
import useCart from "../hooks/useCart";
import { generateMockProducts } from "../utils/generateMockProducts";
import useAlert from "../hooks/useAlert";

const products = generateMockProducts(1000);

const ProductContext = createContext(null);

const ProductContextProvider = ({ children }) => {
  const cart = useCart();
  const { showMessage, AlertComponent } = useAlert();

  return (
    <ProductContext.Provider value={{ products, cart, showMessage }}>
      {children}
      <AlertComponent />
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
