import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../estructura/NavBar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { enlace } from "../../../scripts/Enlace";
import { Button, Card, CardContent, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditarArea = () => {
  const { id } = useParams();
  const [area, setArea] = useState([]);
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getArea();
  }, []);

  const getArea = async () => {
    const response = await axios.get(`${enlace}/area/${id}`);
    setArea(response.data);
    setNombre(response.data["nombre"]);
  };
  const editarArea = async () => {
    try {
      await axios.put(`${enlace}/area/${id}`, {
        nombre: nombre,
      });
      navigate(-1);
    } catch (error) {}
  };
  return (
    <NavBar>
      <h3>EditarArea</h3>
      <Card variant="outlined" sx={{ maxWidth: 500 }}>
        <CardContent>
          <TextField
            value={nombre}
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre de Area"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNombre(e.target.value)}
          />

          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => editarArea()}
          >
            Actualizar Area
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

export default EditarArea;
