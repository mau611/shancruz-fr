import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { enlace } from "../../../scripts/Enlace.js";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const CrearTratamientos = () => {
  const [state, setState] = useState({
    nombre: "",
    color: "",
  });
  const handleChange = (value, name) => {
    console.log(value);
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setState({
      nombre: "",
      color: "",
    });
    setOpen(false);
  };

  const [tipoConsultas, setTipoConsultas] = useState([]);
  useEffect(() => {
    getTipoConsultas();
  }, []);

  const getTipoConsultas = async () => {
    const response = await axios.get(`${enlace}/tipoConsultas`);
    setTipoConsultas(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${enlace}/tipoConsulta`, {
      nombre: state.nombre,
      color: state.color,
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
              <TableCell>Color</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tipoConsultas.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="">{row.nombre}</TableCell>
                <TableCell align="">{row.color}</TableCell>
                <TableCell>
                  <Link to={`/editar_tipo_consulta/${row.id}`}>
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
          Agregar Tipo de consulta
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Creando Tipo de Consulta</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={state.nombre}
              margin="dense"
              id="nombre"
              label="Tipo Consulta"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "nombre")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="color"
              label="Color"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "color")}
            />
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

export default CrearTratamientos;
