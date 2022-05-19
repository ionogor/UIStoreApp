import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Link } from "@mui/material";

import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext, createContext } from "react";

import "./catalog.css";
import { GetCatalogProduct } from "../../FetchDataAPI/Api";

export type Catalog = {
  id: number;
  name: string;
  avatar: string;
};

const Catalogs = () => {
  const [loading, setLoading] = useState(false);

  const catalogs = GetCatalogProduct();

  const myStyle = {
    width: "200px",
    margin: "10px",
    padding: "5px",
    boxShadow: "2px 2px 10px #9E9E9E",
  };

  return (
    <div className="wrap-class">
      {catalogs && (
        <>
          {catalogs?.map((e) => (
            <Card key={e.id} style={myStyle}>
              <CardMedia
                component="img"
                height="100"
                src={"./img/" + e.avatar}
                alt="img"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <Link
                    style={{ textDecoration: "none", fontSize: 16 }}
                    href={`/catalogs/${e.id}/products`}
                  >
                    {e.name}
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default Catalogs;
