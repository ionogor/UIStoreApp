import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import "./products.css";
import ProductContext from "../Context/ProductContext";

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
  pages: number;
  currentPage: number;
  productListDtos: Products[];
};

const Products = () => {
  const { productBasket, setProductBasket } = useContext(ProductContext);
  function useGetProducts(id: string) {
    const [products, setProducts] = useState<Catalogs | null>(null);

    console.log(productBasket);
    useEffect(() => {
      async function getProducts() {
        // const response = await fetch(`http://localhost:7080/Catalog/${id}`);
        const response = await fetch(
          `http://localhost:7080/productpage/${page}?id=${id}`
        );
        const result = await response.json();
        setProducts(result);
      }
      getProducts();
    }, [page]);

    return products;
  }
  const [page, setPage] = useState(1);
  const params = useParams() as ProductsParams;
  const products = useGetProducts(params.id);

  function handleAddCart(product: any) {
    setProductBasket(product);
    console.log(productBasket);
  }

  return (
    <>
      <div className="wrapper">
        {products?.productListDtos.map((e) => (
          <Card key={e.id} className="item" sx={{ maxWidth: 345 }}>
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
            <Button
              onClick={() => handleAddCart(e)}
              variant="contained"
              color="success"
            >
              Add to Card
            </Button>
          </Card>
        ))}{" "}
      </div>
      <Pagination
        className="pagination"
        color="secondary"
        count={products?.pages}
        page={page}
        onChange={(_, pages) => setPage(pages)}
      />
    </>
  );
};

export default Products;
