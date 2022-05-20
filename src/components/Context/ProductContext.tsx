import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Product } from "../../Types/Types";

type ProductContextType = {
  search: string;
  setSearch: (value: string) => void;
  cartProduct: Product[];
  setCartProduct: (products: Product[]) => void;
};

export const ProductContext = createContext<ProductContextType>({
  cartProduct: [],
  setCartProduct: (products: Product[]) => {},
  search: "",
  setSearch: (values: string) => {},
});

export const useProductContext = () => useContext(ProductContext);

export default function ProductProvider({ children }: { children: ReactNode }) {
  const [cartProduct, setCartProduct] = useState<Product[]>([]);

  const [search, setSearch] = useState<string>("");
  const handleSetCartProduct = (products: Product[]) =>
    setCartProduct(products);

  return (
    <ProductContext.Provider
      value={{ cartProduct, setCartProduct, search, setSearch }}
    >
      {children}
    </ProductContext.Provider>
  );
}
