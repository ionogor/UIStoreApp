import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EditProduct } from "../../Types/Types";

const ProductEdit = () => {
  const [id, setId] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id: any) => {
    setOpen(true);
    setId(id);
  };
  const { register, handleSubmit } = useForm<EditProduct>();

  const [snackBar, setSnackBar] = useState(false);

  const handleEditProduct = async (values: EditProduct) => {
    console.log("Hello", values);
    const url = `http://localhost:7080/Product/EditProduct/${id}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          price: values.price,
          stock: values.stock,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = (await response).json();
      console.log("Succes:", JSON.stringify(json));
    } catch (error) {
      console.error("Error:", error);
    }
    setOpen(!open);
    setSnackBar(!snackBar);
  };

  return (
    <>
      <Dialog open={open} onClose={handleEditProduct}>
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
    </>
  );
};

export default ProductEdit;
