import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Card, CardContent, Typography, Button } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useProductContext } from "../Context/ProductContext";
import { Product } from "../../Types/Types";

import "./shopCart.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  description: string,
  qt: number,
  price: number,
  total: number
) {
  return { description, qt, price, total };
}

export default function ShopCard() {
  const { cartProduct, setCartProduct } = useProductContext();
  const Total = cartProduct.reduce((a, c) => a + c.price * c.Quantity, 0);
  const taxPrice = Total * 0.2;
  const shippingPrice = Total > 1000 ? 0 : 100;
  const total = Total + taxPrice + shippingPrice;

  console.log("CartProduct", cartProduct);

  function HandleAddCart(product: Product) {
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

    console.log("Cart:", cartProduct);
  }

  function HandleDelete(product: Product) {
    const exist = cartProduct.find((x) => x.id == product.id);

    // if (exist?.Quantity === 1)
    //   setCartProduct(cartProduct.filter((x) => x.id !== product.id));
    //   else
    if (exist) {
      setCartProduct(
        cartProduct.map((x) =>
          x.id === product.id ? { ...exist, Quantity: exist.Quantity - 1 } : x
        )
      );
    }
    if (exist!.Quantity === 1) {
      setCartProduct(cartProduct.filter((x) => x.id !== product.id));
    }
  }

  async function handleExportData() {
    console.log("hi");

    const response = await fetch("http://localhost:7080/api/Order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        cartProduct.map((product) => ({
          quantity: product.Quantity,
          unitPrice: product.price,
          totalPrice: product.price * product.Quantity,
          productsId: product.id,
        }))
      ),
    });
  }

  //cartProduct.length = 0;

  return (
    <div className="order-detail">
      {" "}
      <TableContainer component={Paper} className="order-detail">
        <Table sx={{}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">Qt</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="order-detail">
            {cartProduct.length > 0 ? (
              cartProduct.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <div>
                      <>
                        <span
                          onClick={() => HandleDelete(row)}
                          style={{ cursor: "pointer", alignItems: "center" }}
                        >
                          -
                        </span>
                      </>
                      <>
                        <TextField
                          variant="filled"
                          multiline
                          size="small"
                          sx={{ width: "50px" }}
                          type="number"
                          value={row.Quantity}
                        ></TextField>
                      </>

                      <>
                        <span
                          onClick={() => HandleAddCart(row)}
                          style={{ cursor: "pointer" }}
                        >
                          +
                        </span>
                      </>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                  <StyledTableCell align="right">{Total}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <h2>Emty Basket</h2>
            )}
            <div className="totalInfo">
              <div>Total: {Total} Lei</div>
              <div>Tax: {taxPrice} Lei</div>
              <div>Shipp: {shippingPrice} Lei</div>
            </div>

            <Button onClick={handleExportData}>Place Order</Button>

            {/* <Button onClick={() => (cartProduct.length = 0)}>
              Cancel Order
            </Button> */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
