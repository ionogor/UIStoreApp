import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Link } from "@mui/material";
import Container from "@mui/material/Container";
import { Catalog, useGetCatalogs } from "../../App";
import "./catalog.css";

const Catalogs = (props: { catalogs: Catalog[] | null }) => {
  console.log(props.catalogs);

  const myStyle = {
    width: "200px",
    margin: "10px",
    padding: "5px",
    boxShadow: "2px 2px 10px #9E9E9E",
  };

  return (
    <div className="wrap-class">
      {props.catalogs && (
        <>
          {props.catalogs.map((e) => (
            <Card style={myStyle}>
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
