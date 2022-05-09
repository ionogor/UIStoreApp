import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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
  const params = useParams() as ProductsParams;
  const result = GetProduct(params.id);
  console.log(result);

  return (
    <>
      <main>
        <div className="card">
          <div className="card__body">
            <div className="half">
              <div className="featured_text">
                <h1>{result?.title}</h1>
                <p className="sub">{result?.catalogName}</p>
                <p className="price">{result?.price} $</p>
              </div>
              <div className="image">
                <img src="/img/laptop.png" alt="" />
              </div>
            </div>

            <div className="half">
              <div className="description">
                <p>{result?.description}</p>
              </div>
              <span className="stock">
                <i className="fa fa-pen"></i> In stock
              </span>
            </div>
          </div>
          <div className="card__footer">
            <div className="action">
              <button type="button">Add to cart</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
