import { Button, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addToCart } from "../../actions/action";
import "./product.css";
import { Product, ProductsParams } from "../../Types/Types";
import { useProductContext } from "../Context/ProductContext";

function GetProduct(id: string) {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(`http://localhost:7080/product/${id}`);
      const result = await response.json();

      setProduct(result);
    }
    getProduct();
    console.log("Product:", product);
  }, [id]);

  return product;
}

const OneProduct = () => {
  const params = useParams() as ProductsParams;
  const product = GetProduct(params.id);
  const { cartProduct, setCartProduct } = useProductContext();

  console.log(product);

  function handleAddCart() {
    if (!product) {
      return;
    }

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
  }

  if (!product) {
    return <div>Not found</div>;
  }
  return (
    <>
      <main>
        <div className="card">
          <div className="card__body">
            <div className="half">
              <div className="featured_text">
                <h1>{product?.title}</h1>
                <p className="sub">{product?.catalogName}</p>
                <p className="price">{product?.price} $</p>
              </div>
              <div className="image">
                <img src="/img/laptop.png" alt="" />
              </div>
            </div>

            <div className="half">
              <div className="description">
                <p>{product?.description}</p>
              </div>
              <span className="stock">
                <i className="fa fa-pen"></i> In stock
              </span>
            </div>
          </div>
          <div className="card__footer">
            <div className="action">
              <Button
                onClick={handleAddCart}
                variant="contained"
                color="success"
              >
                Add to Card
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default OneProduct;
