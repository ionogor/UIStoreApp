import { SetState } from "immer/dist/internal";
import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Product } from "../../Types/Types";

type ProductContextType = {
  cartProduct: Product[];
  setCartProduct: (products: Product[]) => void;
};

export const ProductContext = createContext<ProductContextType>({
  cartProduct: [],
  setCartProduct: (products: Product[]) => {},
});

export const useProductContext = () => useContext(ProductContext);

export default function ProductProvider({ children }: { children: ReactNode }) {
  const [cartProduct, setCartProduct] = useState<Product[]>([]);

  const handleSetCartProduct = (products: Product[]) =>
    setCartProduct(products);

  return (
    <ProductContext.Provider value={{ cartProduct, setCartProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
