import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
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

const CrearEstadoCita = () => {
  const [state, setState] = useState({
    estado: "",
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
      estado: "",
    });
    setOpen(false);
  };

  const [estados, setEstados] = useState([]);
  useEffect(() => {
    getEstados();
  }, []);

  const getEstados = async () => {
    const response = await axios.get(`${enlace}/estadoCitas`);
    setEstados(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${enlace}/estadoCita`, {
      estado: state.estado,
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
              <TableCell>Nombre Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estados.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="">{row.estado}</TableCell>
                <TableCell>
                  <Link to={`/editar_estado_cita/${row.id}`}>
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
          Agregar Estado de cita
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Creacion del Estado de una cita</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={state.estado}
              margin="dense"
              id="estado"
              label="Estado de cita"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "estado")}
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

export default CrearEstadoCita;
