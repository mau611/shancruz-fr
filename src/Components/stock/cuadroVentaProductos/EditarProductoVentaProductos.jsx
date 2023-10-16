import React from "react";
import NavBar from "../../estructura/NavBar";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import axios from "axios";
import { enlace } from "../../../scripts/Enlace";
import { useEffect } from "react";

const EditarProductoVentaProductos = () => {
  const { id } = useParams();
  const [ingresoProducto, setIngresoProducto] = useState([]);
  const [PrecioCompra, setPrecioCompra] = useState("");
  const [PrecioVenta, setPrecioVenta] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [factura, setFactura] = useState("");
  const [fecha, setFecha] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getIngresoProductos();
  }, []);

  const getIngresoProductos = async () => {
    const response = await axios.get(`${enlace}/detalleProductoVenta/${id}`);
    setIngresoProducto(response.data);
    setPrecioCompra(response.data["PrecioCompra"]);
    setPrecioVenta(response.data["PrecioVenta"]);
    setCantidad(response.data["cantidad"]);
    setFactura(response.data["factura"]);
    setFecha(response.data["fecha"]);
    setVencimiento(response.data["vencimiento"]);
  };
  const editarDetalle = async () => {
    try {
      await axios.put(`${enlace}/detalleProductoVenta/${id}`, {
        PrecioCompra: PrecioCompra,
        PrecioVenta: PrecioVenta,
        cantidad: cantidad,
        factura: factura,
        fecha: fecha,
        vencimiento: vencimiento,
      });
      navigate(-1);
    } catch (error) {
      console.log(error.data);
    }
  };
  return (
    <NavBar>
      <h3>Editar detalle producto venta</h3>
      <Card variant="outlined" sx={{ maxWidth: 500 }}>
        <CardContent>
          <TextField
            value={PrecioCompra}
            autoFocus
            margin="dense"
            id="compra"
            label="Precio Compra"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setPrecioCompra(e.target.value)}
          />
          <TextField
            value={PrecioVenta}
            autoFocus
            margin="dense"
            id="venta"
            label="Precio Venta"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setPrecioVenta(e.target.value)}
          />
          <TextField
            value={cantidad}
            autoFocus
            margin="dense"
            id="cantidad"
            label="Cantidad"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setCantidad(e.target.value)}
          />
          <TextField
            value={factura}
            autoFocus
            margin="dense"
            id="factura"
            label="Factura No"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setFactura(e.target.value)}
          />
          <TextField
            value={fecha}
            autoFocus
            margin="dense"
            id="fecha"
            label="Fecha Compra"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setFecha(e.target.value)}
          />
          <TextField
            value={vencimiento}
            autoFocus
            margin="dense"
            id="vencimiento"
            label="Vencimiento del producto"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setVencimiento(e.target.value)}
          />

          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => editarDetalle()}
          >
            Actualizar producto venta
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

export default EditarProductoVentaProductos;
