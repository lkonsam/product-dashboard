import React, { createContext } from "react";
import useCart from "../hooks/useCart";
import { generateMockProducts } from "../utils/generateMockProducts";
import useAlert from "../hooks/useAlert";

const { rawProducts, productMap, categorySet } = generateMockProducts(1000);

const ProductContext = createContext(null);

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = React.useState(rawProducts);
  const cart = useCart();

  const { showMessage, AlertComponent } = useAlert();

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        cart,
        rawProducts,
        showMessage,
        productMap,
        categorySet,
      }}
    >
      {children}
      <AlertComponent />
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
