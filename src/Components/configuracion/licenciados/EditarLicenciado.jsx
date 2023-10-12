import React from "react";
import NavBar from "../../estructura/NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { enlace } from "../../../scripts/Enlace";

const EditarLicenciado = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    getEstadoCita();
  }, []);
  const getEstadoCita = async () => {
    const response = await axios.get(`${enlace}/profesional/${id}`);
    setNombre(response.data["nombre"]);
  };

  const editarProfesional = async () => {
    try {
      await axios.put(`${enlace}/profesional/${id}`, {
        nombre: nombre,
      });
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <NavBar>
      <h3>Modificar Profesional</h3>
      <Card variant="outlined" sx={{ maxWidth: 500 }}>
        <CardContent>
          <TextField
            value={nombre}
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre Profesional"
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
            onClick={() => editarProfesional()}
          >
            Actualizar profesional
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

export default EditarLicenciado;
