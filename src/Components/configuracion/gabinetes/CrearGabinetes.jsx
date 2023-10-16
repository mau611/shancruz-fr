import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { enlace } from "../../../scripts/Enlace.js";
import {
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  FormControl,
  TableRow,
} from "@mui/material";

const CrearGabinetes = () => {
  const [gabinetes, setGabinetes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState([]);
  const [nombre, setNombre] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setNombre("");
    setOpen(false);
  };

  useEffect(() => {
    getGabinetes();
    getAreas();
  }, []);

  const getGabinetes = async () => {
    const response = await axios.get(`${enlace}/consultorios`);
    setGabinetes(response.data);
  };
  const getAreas = async () => {
    const response = await axios.get(`${enlace}/areas`);
    setAreas(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${enlace}/consultorio`, {
      nombre: nombre,
      area_id: area,
    });
    navigate(0);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gabinetes.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="">{row.nombre}</TableCell>
                <TableCell align="">{row.area.nombre}</TableCell>
                <TableCell>
                  <Link to={`/editar_consultorio/${row.id}`}>
                    <EditIcon fontSize="small" color="secondary" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Agregar consultorio
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Creacion de consultorio</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={nombre}
              margin="dense"
              id="nombre"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setNombre(e.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel id="areas-label">Seleccione un area</InputLabel>
              <Select
                labelId="areas-label"
                label="Seleccione un area"
                id="selectArea"
                value={area}
                fullWidth
                onChange={(e) => setArea(e.target.value)}
              >
                {areas.map((area) => (
                  <MenuItem value={area.id}>{area.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSubmit}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CrearGabinetes;
