import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Link } from "@mui/material";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext, createContext } from "react";
import "./catalog.css";

export type Catalog = {
  id: number;
  name: string;
  avatar: string;
};

export function useGetCatalogs() {
  const [catalogs, setCatalogs] = useState<Catalog[] | null>(null);

  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    async function getCatalogs() {
      const response = await fetch("http://localhost:7080/Catalog?page=1"); // http://localhost:7080/Catalog?page=1
      const result = await response.json();

      setCatalogs(result);
      console.log("result", result);
    }
    getCatalogs();
  }, []);

  return catalogs;
}

const Catalogs = () => {
  const catalogs = useGetCatalogs();
  console.log(catalogs);

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
