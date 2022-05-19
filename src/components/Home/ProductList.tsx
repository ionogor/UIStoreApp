import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Catalogs, ProductsParams } from "../../Types/Types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { GetCatalogProduct } from "../../FetchDataAPI/Api";
import { Edit, Delete } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { EditProduct } from "../../Types/Types";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "./Style";
import Pagination from "@mui/material/Pagination";
import { useForm } from "react-hook-form";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Product } from "../../Types/Types";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductList = () => {
  const { register, handleSubmit } = useForm<EditProduct>();
  const [id, setId] = useState();
  const [open, setOpen] = React.useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [countPage, setCountPage] = useState<number>();
  const params = useParams() as ProductsParams;
  const [products, setProducts] = useState<Product[]>([]);
  const handleClickOpen = (id: any) => {
    setOpen(true);
    setId(id);
  };

  // edit method
  const handleEditProduct = async (values: EditProduct) => {
    console.log("Hello", values);
    const url = `http://localhost:7080/Product/EditProduct/${id}`;
    const product = {
      title: values.title,
      description: values.description,
      price: values.price,
      stock: values.stock,
    };
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = (await response).json();
      console.log("Succes:", JSON.stringify(json));
      //setProducts([...products, product]);
    } catch (error) {
      console.error("Error:", error);
    }
    setOpen(!open);
    setSnackBar(!snackBar);
  };

  // delete method
  const handleDeleteProduct = async (id: any) => {
    console.log("id", id);
    try {
      const response = await fetch(
        `http://localhost:7080/Product/Delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            console.log("HTTP request successful");

            setProducts(products.filter((p: Product) => p.id !== id));
          } else {
            console.log("HTTP request unsuccessful");
          }
          return res;
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("error message:", error);
    }
  };

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(
        `http://localhost:7080/productpage/${page}?id=${params.id}`
      );
      const result = await response.json();

      setProducts(result.productListDtos);
      setCountPage(result.pages);
    }
    getProducts();
  }, [page]);

  // function useGetProducts(id: string) {

  //   return products;
  // }
  console.log("products", products);
  console.log("pages", countPage);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(!open)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="product"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
            {...register("title", {})}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            {...register("description", {})}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price Name"
            type="number"
            fullWidth
            variant="standard"
            {...register("price", {})}
          />
          <TextField
            autoFocus
            margin="dense"
            id="stok"
            label="Product Stock"
            type="number"
            fullWidth
            variant="standard"
            {...register("stock", {})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit(handleEditProduct)}>Save</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ m: 10 }}>
              <StyledTableCell align="center">Products Name</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Stock</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((row) => (
              <StyledTableRow key={row.id}>
                <Typography gutterBottom variant="h5" component="div">
                  {row.title}
                </Typography>
                <StyledTableCell component="th" scope="row" align="center">
                  <Typography>{row.price}</Typography>
                </StyledTableCell>

                <StyledTableCell component="th" scope="row" align="center">
                  {" "}
                  <Typography>{row.stock}</Typography>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  <Button
                    startIcon={<Edit />}
                    onClick={() => handleClickOpen(row.id)}
                  ></Button>
                  <Button
                    startIcon={<Delete />}
                    onClick={() => handleDeleteProduct(row.id)}
                  ></Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        style={{ margin: "10px" }}
        className="pagination"
        color="secondary"
        count={countPage}
        page={page}
        onChange={(_, pages) => setPage(pages)}
      />
      <Snackbar open={snackBar} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductList;
