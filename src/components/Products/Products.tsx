import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Link } from "@mui/material";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import "./products.css";
import { useProductContext } from "../Context/ProductContext";
import { ProductsParams, Catalogs } from "../../Types/Types";
import { Product } from "../../Types/Types";

// type ProductsParams = {
//   id: string;
// };
// type Catalogs = {
//   pages: number;
//   currentPage: number;
//   productListDtos: Product[];
// };

const Products = () => {
  const { cartProduct, setCartProduct } = useProductContext();

  console.log("CartProduct", cartProduct);

  function useGetProducts(id: string) {
    const [products, setProducts] = useState<Catalogs>();
    useEffect(() => {
      async function getProducts() {
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

  function handleAddCart(product: Product) {
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

  const [page, setPage] = useState(1);
  const params = useParams() as ProductsParams;
  const products = useGetProducts(params.id);

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
        <Link href={"/shop-card"}>ShopCart</Link>
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
