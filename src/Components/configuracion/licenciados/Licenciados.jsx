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

const Columnas = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nombre", headerName: "Consultorio", width: 130 },
];

const Licenciados = () => {
  const [state, setState] = useState({
    nombre: "",
  });
  const handleChange = (value, name) => {
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
    });
    setOpen(false);
  };

  const [licenciados, setLicenciados] = useState([]);
  useEffect(() => {
    getLicenciados();
  }, []);

  const getLicenciados = async () => {
    const response = await axios.get(`${enlace}/profesionales`);
    setLicenciados(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${enlace}/profesional`, {
      nombre: state.nombre,
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
            {licenciados.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="">{row.nombre}</TableCell>
                <TableCell>
                  <Link to={`/editar_profesional/${row.id}`}>
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
          Agregar Licenciado
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Agregar licenciado</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={state.nombre}
              margin="dense"
              id="nombre"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "nombre")}
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

export default Licenciados;
