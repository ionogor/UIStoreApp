import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useProductContext } from "../Context/ProductContext";
import Button from "@mui/material/Button";
import { Product } from "../../Types/Types";
import "./shopCart.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24),
  createData("Ice cream sandwich", 237, 9.0, 37),
  createData("Eclair", 262, 16.0, 24),
  createData("Cupcake", 305, 3.7, 67),
  createData("Gingerbread", 356, 16.0, 49),
];

export default function ShopCard() {
  const { cartProduct, setCartProduct } = useProductContext();
  const itemPrice = cartProduct.reduce((a, c) => a + c.price * c.Quantity, 0);
  const taxPrice = itemPrice * 0.2;
  const shippingPrice = itemPrice > 1000 ? 0 : 100;
  const total = itemPrice + taxPrice + shippingPrice;

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell align="right">Qt</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartProduct.length > 0 ? (
            cartProduct.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div style={{ position: "absolute" }}>
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
                        sx={{ width: "40px" }}
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
                <StyledTableCell align="right">{itemPrice}</StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <>Emty Basket</>
          )}

          <div className="totalInfo">
            <div>Total: {itemPrice} Lei</div>
            <div>Tax: {taxPrice} Lei</div>
            <div>Shipp: {shippingPrice} Lei</div>
          </div>

          <Button onClick={() => (cartProduct.length = 0)}>Cancel Order</Button>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
