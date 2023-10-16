import React, { useEffect, useState } from "react";
import NavBar from "../../estructura/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { enlace } from "../../../scripts/Enlace";
import { Button, Card, CardContent, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditarDetalleUsoGabinete = () => {
  const { id } = useParams();
  const [ingresoProductoUso, setIngresoProductoUso] = useState([]);
  const [fecha_ingreso, setFecha_ingreso] = useState("");
  const [existencias, setExistencias] = useState("");
  const [precio_compra, setPrecio_compra] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getIngresoProductos();
  }, []);

  const getIngresoProductos = async () => {
    const response = await axios.get(`${enlace}/ingreso_producto_uso/${id}`);
    setIngresoProductoUso(response.data);
    setFecha_ingreso(response.data["fecha_ingreso"]);
    setExistencias(response.data["existencias"]);
    setPrecio_compra(response.data["precio_compra"]);
  };
  const editarProductoUso = async () => {
    try {
      await axios.put(`${enlace}/ingreso_producto_uso/${id}`, {
        fecha_ingreso: fecha_ingreso,
        existencias: existencias,
        precio_compra: precio_compra,
      });
      navigate(-1);
    } catch (error) {
      console.log(error.data);
    }
  };
  return (
    <NavBar>
      <h3>Editar detalle producto uso</h3>
      <Card variant="outlined" sx={{ maxWidth: 500 }}>
        <CardContent>
          <TextField
            value={fecha_ingreso}
            autoFocus
            margin="dense"
            id="compra"
            label="Fecha de ingreso"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setFecha_ingreso(e.target.value)}
          />
          <TextField
            value={existencias}
            autoFocus
            margin="dense"
            id="venta"
            label="Existencias"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setExistencias(e.target.value)}
          />
          <TextField
            value={precio_compra}
            autoFocus
            margin="dense"
            id="cantidad"
            label="Precio compra"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setPrecio_compra(e.target.value)}
          />

          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => editarProductoUso()}
          >
            Actualizar producto uso
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

export default EditarDetalleUsoGabinete;
