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

const EditarServicio = () => {
  const { id } = useParams();
  const [servicio, setServicio] = useState("");
  const [costo, setCosto] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    getEstadoCita();
  }, []);
  const getEstadoCita = async () => {
    const response = await axios.get(`${enlace}/servicio/${id}`);
    setServicio(response.data["servicio"]);
    setCosto(response.data["costo"]);
  };

  const editarServicio = async () => {
    try {
      await axios.put(`${enlace}/servicio/${id}`, {
        servicio: servicio,
        costo: costo,
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
            value={servicio}
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre Servicio"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setServicio(e.target.value)}
          />
          <TextField
            value={costo}
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre Servicio"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setCosto(e.target.value)}
          />

          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => editarServicio()}
          >
            Actualizar servicio
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

export default EditarServicio;
