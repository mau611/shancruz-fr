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

const EditarEstadoCitas = () => {
  const { id } = useParams();
  const [estado, setEstado] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    getEstadoCita();
  }, []);
  const getEstadoCita = async () => {
    const response = await axios.get(`${enlace}/estadoCita/${id}`);
    setEstado(response.data["estado"]);
  };

  const editarConsultorio = async () => {
    try {
      await axios.put(`${enlace}/estadoCita/${id}`, {
        estado: estado,
      });
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <NavBar>
      <h3>Modificar Estado cita</h3>
      <Card variant="outlined" sx={{ maxWidth: 500 }}>
        <CardContent>
          <TextField
            value={estado}
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre Consultorio"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setEstado(e.target.value)}
          />

          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => editarConsultorio()}
          >
            Actualizar estado cita
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

export default EditarEstadoCitas;
