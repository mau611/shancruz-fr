import React from "react";
import NavBar from "../../estructura/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { enlace } from "../../../scripts/Enlace";
import axios from "axios";
import { Button, Card, CardContent, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditarProveedor = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProveedor();
  }, []);

  const getProveedor = async () => {
    const response = await axios.get(`${enlace}/proveedor/${id}`);
    setNombre(response.data["nombre"]);
    setContacto(response.data["contacto"]);
  };
  const editarProveedor = async () => {
    try {
      await axios.put(`${enlace}/proveedor/${id}`, {
        nombre: nombre,
        contacto: contacto,
      });
      navigate(-1);
    } catch (error) {
      window.alert("Hubo un error");
    }
  };

  return (
    <NavBar>
      <h3>Editar datos proveedor</h3>
      <Card variant="outlined" sx={{ maxWidth: 500 }}>
        <CardContent>
          <TextField
            value={nombre}
            autoFocus
            margin="dense"
            id="nombre"
            label="Proveedor"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            value={contacto}
            autoFocus
            margin="dense"
            id="contacto"
            label="Contacto proveedor"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setContacto(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => editarProveedor()}
          >
            Actualizar datos proveedor
          </Button>
          <br />
          <br />
          <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
            <ArrowBackIcon /> Cancelar
          </Button>
        </CardContent>
      </Card>
    </NavBar>
  );
};

export default EditarProveedor;
