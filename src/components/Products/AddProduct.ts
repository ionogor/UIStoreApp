import { Product } from "../../Types/Types";
import { useProductContext } from "../Context/ProductContext";

const HandleAddCart = (product: Product) => {
  const { cartProduct, setCartProduct } = useProductContext();
  const exist = cartProduct.find((x) => x.id === product.id);
  if (exist) {
    setCartProduct(
      cartProduct.map((x) =>
        x.id === product.id ? { ...exist, Quantity: exist.Quantity + 1 } : x
      )
    );
  } else {
    setCartProduct([
      ...cartProduct,
      {
        description: product.description,
        photoPath: product.photoPath,
        price: product.price,
        stock: product.stock,
        title: product.title,
        catalogName: product.catalogName,
        Quantity: 1,
        id: product.id,
      } as Product,
    ]);
  }
};

export default HandleAddCart;
