import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addToCart } from "../../actions/action";
import "./product.css";
type ProductsParams = {
  id: string;
};
type Product = {
  description: string;
  photoPath: string;
  price: number;
  stock: number;
  title: string;
  catalogName: string;
};

function GetProduct(id: string) {
  const [product, setProduct] = useState<Product | null>();

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

const Product = () => {
  const [cart, setCart] = useState<Product[] | null>([]);
  const params = useParams() as ProductsParams;
  const product = GetProduct(params.id);
  console.log(product);

  const addCard = (product: any) => {
    setCart([, product]);
    console.log(cart);
  };

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
              <button onClick={() => addCard({ product })} type="button">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
