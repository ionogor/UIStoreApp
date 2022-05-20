import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { Catalogs, ProductsParams } from "../../Types/Types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { GetCatalogProduct } from "../../FetchDataAPI/Api";
import { Edit, Delete, ArrowBackIos, Fullscreen } from "@mui/icons-material";
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
  Input,
} from "@mui/material";
import { Link } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "./Style";
import Pagination from "@mui/material/Pagination";
import { useForm } from "react-hook-form";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Product } from "../../Types/Types";
import { title } from "process";
import { width } from "@mui/system";
import { useProductContext } from "../Context/ProductContext";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const initialState = { count: 0 };

const ProductList = () => {
  const { register, handleSubmit } = useForm<EditProduct>();
  const [idCatalog, setIdCatalog] = useState();
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [countPage, setCountPage] = useState<number>();
  const params = useParams() as ProductsParams;
  const [products, setProducts] = useState<Product[]>([]);

  const { search, setSearch } = useProductContext();

  const history = useNavigate();

  const handleClickOpen = (id: any) => {
    setOpen(true);
    setIdCatalog(id);
  };

  // edit method
  const handleEditProduct = async (values: EditProduct) => {
    console.log("Hello", values);
    const url = `http://localhost:7080/Product/EditProduct/${idCatalog}`;
    const product = {
      title: values.title,
      description: values.description,
      price: values.price,
      stock: values.stock,
      // photoPath: "string",
      // catalogName: "string",
      // Quantity: 1,
      // id: 1,
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
      // setProducts([...products, product]);
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

  // add method

  const handleAddProduct = () => {};

  const handleBackPush = () => {
    history(-1);
  };

  const hangleSearchInput = (e: any) => {
    setSearch(e.target.value);
  };
  console.log(search);

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
            <TableRow sx={{ m: 4 }}>
              <StyledTableCell align="center" style={{ width: "20px" }}>
                Photo{" "}
              </StyledTableCell>
              <StyledTableCell align="center" style={{ width: "350px" }}>
                Products{" "}
              </StyledTableCell>
              <StyledTableCell align="center" style={{ width: "100px" }}>
                Price
              </StyledTableCell>
              <StyledTableCell align="center" style={{ width: "10px" }}>
                Stock
              </StyledTableCell>
              <StyledTableCell align="center" style={{ width: "300px" }}>
                Action
                <Button
                  sx={{ display: "inline-block", mx: 2 }}
                  variant="contained"
                  component="span"
                  onClick={handleAddProduct}
                >
                  Add
                </Button>
                <TextField
                  id="filled-search"
                  label="Search"
                  sx={{
                    backgroundColor: "white",
                    mx: 1,
                    position: "relative",
                    borderRadius: 2,
                    maxHeight: 1,
                    color: "secondary",
                  }}
                  onChange={hangleSearchInput}
                />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  <img src="/img/laptop.png" alt="" style={{ width: "90px" }} />
                </StyledTableCell>
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
                    sx={{ ml: -25 }}
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
      <Button
        onClick={handleBackPush}
        style={{ alignItems: "left" }}
        startIcon={<ArrowBackIos />}
      >
        Back
      </Button>
      <Snackbar open={snackBar} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductList;
