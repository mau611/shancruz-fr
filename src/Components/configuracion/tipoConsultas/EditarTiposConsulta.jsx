import React, { useEffect } from "react";
import NavBar from "../../estructura/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { enlace } from "../../../scripts/Enlace";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditarTiposConsulta = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [color, setColor] = useState("");
  useEffect(() => {
    getTipoConsulta();
  }, []);

  const getTipoConsulta = async () => {
    const response = await axios.get(`${enlace}/tipoConsulta/${id}`);
    setNombre(response.data["nombre"]);
    setColor(response.data["color"]);
  };
  const editarTipoConsulta = async () => {
    try {
      await axios.put(`${enlace}/tipoConsulta/${id}`, {
        nombre: nombre,
        color: color,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  return (
    <NavBar>
      <h3>Editar tipo consultas</h3>
      <Card variant="outlined" sx={{ maxWidth: 500 }}>
        <CardContent>
          <TextField
            value={nombre}
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre consulta"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            value={color}
            autoFocus
            margin="dense"
            id="contacto"
            label="Color"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setColor(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => editarTipoConsulta()}
          >
            Actualizar tipo consulta
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

export default EditarTiposConsulta;
