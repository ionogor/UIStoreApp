import * as React from "react";

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
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { StyledTableCell, StyledTableRow } from "./Style";

// export type Catalog = {
//   id: number;
//   name: string;
//   avatar: string;
// };

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [name, setName] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const catalog = GetCatalogProduct();

  console.log("Catalog", catalog);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ m: 10 }}>
              <StyledTableCell align="left">CATALOG</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {catalog?.map((row) => (
              <StyledTableRow key={row.id}>
                <Link to={`/catalogs/${row.id}`}>{row.name}</Link>
                <StyledTableCell component="th" scope="row"></StyledTableCell>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <TextField
                      label="CatalogName"
                      id="name"
                      size="small"
                    ></TextField>
                    <TextField type="file" id="avatar" size="small"></TextField>
                    <Button variant="contained" color="success">
                      Save
                    </Button>
                  </Box>
                </Modal>
                <Button
                  onClick={handleOpen}
                  startIcon={<Edit sx={{ m: 2, color: green[500] }} />}
                ></Button>
                <Delete sx={{ m: 2, color: red[500] }} />
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;
