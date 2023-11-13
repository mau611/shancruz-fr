import React, { useEffect } from "react";
import NavBar from "../../estructura/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { enlace } from "../../../scripts/Enlace";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditarMedico = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  useEffect(() => {
    getMedico();
  }, []);

  const getMedico = async () => {
    const response = await axios.get(`${enlace}/medico/${id}`);
    setNombre(response.data["nombre"]);
    setTelefono(response.data["telefono"]);
    setDireccion(response.data["Direccion"]);
  };
  const editarTipoConsulta = async () => {
    try {
      await axios.put(`${enlace}/medico/${id}`, {
        nombre: nombre,
        telefono: telefono,
        Direccion: direccion,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  return (
    <NavBar>
      <h3>Editar informacion medico</h3>
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
            value={telefono}
            autoFocus
            margin="dense"
            id="contacto"
            label="Color"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTelefono(e.target.value)}
          />
          <TextField
            value={direccion}
            autoFocus
            margin="dense"
            id="contacto"
            label="Color"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDireccion(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => editarTipoConsulta()}
          >
            Actualizar datos medico
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

export default EditarMedico;
