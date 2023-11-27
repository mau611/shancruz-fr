import React from "react";
import NavBar from "../../../estructura/NavBar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { enlace } from "../../../../scripts/Enlace";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const VerArchivo = () => {
  const { nombre_archivo, tipo_documento, pac_id } = useParams();
  const [fileUrl, setFileUrl] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    getFileS3();
  }, []);

  const getFileS3 = async () => {
    try {
      const response = await axios
        .get(
          `${enlace}/obtener_archivo/${nombre_archivo}/${tipo_documento}/${pac_id}`
        )
        .then((response) => {
          setFileUrl(response.data.urlTemp);
          setUrl(response.data.url);
        })
        .catch((error) => {
          console.error("Error fetching file:", error);
        });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilePreview = () => {
    if (
      url.endsWith(".jpg") ||
      url.endsWith(".png") ||
      url.endsWith(".jpeg") ||
      url.endsWith(".gif")
    ) {
      return (
        <>
          <Card sx={{ maxWidth: 600 }}>
            <CardMedia
              component="img"
              alt="Imagen"
              height="auto"
              image={fileUrl}
            />

            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites" href={fileUrl} download>
                <CloudDownloadIcon />
                Descargar imagen
              </IconButton>
            </CardActions>
          </Card>
          {/*
          <img src={fileUrl} alt="Preview" width={"30%"} />
          <a href={fileUrl} download>
            Descargar Imagen
          </a>
          */}
        </>
      );
    } else {
      return (
        <a href={fileUrl} download>
          Descargar archivo
        </a>
      );
    }
  };

  return (
    <NavBar>
      <Typography variant="h5">Archivo</Typography>
      <div>{fileUrl && getFilePreview()}</div>
    </NavBar>
  );
};

export default VerArchivo;
