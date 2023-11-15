import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import axios from "axios";
import { enlace } from "../../../scripts/Enlace.js";

const Columnas = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "nombre", headerName: "Nombre del area", width: 200 },
];

const Areas = () => {
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

  const [areas, setAreas] = useState([]);
  useEffect(() => {
    getAreas();
  }, []);

  const getAreas = async () => {
    const response = await axios.get(`${enlace}/areas`);
    setAreas(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${enlace}/area`, {
      nombre: state.nombre,
    });
    navigate(0);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={areas}
        columns={Columnas}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={(e) => window.open(`/editar_area/${e.row.id}`, "_self")}
      />
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Agregar Area
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Creacion de area</DialogTitle>
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

export default Areas;
