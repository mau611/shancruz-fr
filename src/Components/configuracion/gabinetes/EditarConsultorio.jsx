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

const EditarConsultorio = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [areaId, setAreaId] = useState("");
  const [areas, setAreas] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getConsultorio();
    getAreas();
  }, []);
  const getConsultorio = async () => {
    const response = await axios.get(`${enlace}/consultorio/${id}`);
    setNombre(response.data["nombre"]);
    setAreaId(response.data["area"].id);
  };
  const getAreas = async () => {
    const response = await axios.get(`${enlace}/areas`);
    setAreas(response.data);
  };
  const editarConsultorio = async () => {
    try {
      await axios.put(`${enlace}/consultorio/${id}`, {
        nombre: nombre,
        area_id: areaId,
      });
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <NavBar>
      <h3>Modificar Consultorio</h3>
      <Card variant="outlined" sx={{ maxWidth: 500 }}>
        <CardContent>
          <TextField
            value={nombre}
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre Consultorio"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNombre(e.target.value)}
          />
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="areas-label">Seleccione un area</InputLabel>
            <Select
              labelId="areas-label"
              label="Seleccione un area"
              id="selectArea"
              value={areaId}
              fullWidth
              onChange={(e) => setAreaId(e.target.value)}
            >
              {areas.map((area) => (
                <MenuItem value={area.id}>{area.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => editarConsultorio()}
          >
            Actualizar datos consultorio
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

export default EditarConsultorio;
