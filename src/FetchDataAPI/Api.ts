import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useProductContext } from "../components/Context/ProductContext";
import { Catalog } from "../components/Catalogs/Catalogs";
import { Catalogs } from "../Types/Types";
export function GetCatalogProduct() {
  const [catalogs, setCatalogs] = useState<Catalog[]>();

  console.log("test");
  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    async function getCatalogs() {
      const response = await fetch("http://localhost:7080/Catalog?page=1");
      const result = await response.json();
      setCatalogs(result);
      console.log("result", result);
    }
    getCatalogs();
  }, []);

  return catalogs;
}
