import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./products.css";

type Products = {
  title: string;
  description: string;
  price: number;
  stock: number;
  photoPath: string;
  id: string;
};

type ProductsParams = {
  id: string;
};
type Catalogs = {
  products: Products[];
};

function useGetProducts(id: string) {
  const [products, setProducts] = useState<Catalogs | null>(null);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(`http://localhost:7080/Catalog/${id}`);
      const result = await response.json();

      setProducts(result);
    }
    getProducts();
  }, [id]);

  return products;
}

const Products = () => {
  const params = useParams() as ProductsParams;
  const catalogs = useGetProducts(params.id);
  console.log(catalogs);
  return (
    <>
      <div className="wrapper">
        {catalogs?.products.map((e) => (
          <Card className="item" sx={{ maxWidth: 345 }}>
            <CardActionArea href={`/product/${e.id}`}>
              <CardMedia
                component="img"
                height="140"
                image="/img/laptop.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {e.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {e.price}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}{" "}
        ;
      </div>
    </>
  );
};

export default Products;
