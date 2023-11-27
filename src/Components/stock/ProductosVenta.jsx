import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { enlace } from "../../scripts/Enlace.js";
import { useAuth } from "../../AuthContext.jsx";

const ProductosVenta = () => {
  const { user } = useAuth();
  console.log(user);
  const [state, setState] = useState({
    nombre: "",
    descripcion: "",
    cantidad_minima: "",
    proveedor: "",
    fechaIngreso: new Date().toISOString().slice(0, 10),
    precioCompra: "",
    precioVenta: "",
    cantidad: "",
    factura: "",
    vencimiento: "",
  });
  const [proveedores, setProveedores] = useState([]);
  const [datos, setDatos] = useState([]);
  const [productos, setProductos] = useState([]);
  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getProductos();
    getProveedores();
  }, []);

  const getProductos = async () => {
    const response = await axios.get(`${enlace}/productos`);
    setProductos(response.data);
    response.data.map((p) => {
      setDatos((dat) => [
        ...dat,
        {
          id: p.id,
          Nombre: p.Nombre,
          descripcion: p.descripcion,
          proveedor: p.proveedor.nombre,
          fechaIngreso: obtenerDatos(p.ingresos)[0]
            .split("-")
            .reverse()
            .join("-"),
          precioCompra: obtenerDatos(p.ingresos)[1],
          precioVenta: obtenerDatos(p.ingresos)[2],
          cantidad: obtenerDatos(p.ingresos)[3],
          factura: obtenerDatos(p.ingresos)[4],
          vencimiento: obtenerDatos(p.ingresos)[5],
        },
      ]);
    });
  };

  const handleChange = (value, name) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const getProveedores = async () => {
    const response = await axios.get(`${enlace}/proveedores`);
    setProveedores(response.data);
  };

  const obtenerDatos = (ingresos, campo) => {
    let dato = [];
    ingresos.map((ingreso) => {
      dato.push(ingreso.fecha);
      dato.push(ingreso.PrecioCompra);
      dato.push(ingreso.PrecioVenta);
      dato.push(ingreso.cantidad);
      dato.push(ingreso.factura);
      dato.push(ingreso.vencimiento);
      dato.push();
    });
    return dato;
  };

  const [open, setOpen] = useState(false);
  const [openVenta, setOpenVenta] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenVenta = () => {
    setOpenVenta(true);
  };
  const handleCloseVenta = () => {
    setOpenVenta(false);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setState({
      nombre: "",
      descripcion: "",
      cantidad_minima: "",
      proveedor: "",
      fechaIngreso: new Date().toISOString().slice(0, 10),
      precioCompra: "",
      precioVenta: "",
      cantidad: "",
      factura: "",
      vencimiento: "",
    });
    setOpen(false);
  };

  const handleAgregarProducto = async (e) => {
    e.preventDefault();
    await axios.post(`${enlace}/producto`, {
      nombre: state.nombre,
      descripcion: state.descripcion,
      cantidad_minima: state.cantidad_minima,
      proveedor: state.proveedor.split(" ")[0],
      fechaIngreso: state.fechaIngreso,
      precioCompra: state.precioCompra,
      precioVenta: state.precioVenta,
      cantidad: state.cantidad,
      factura: state.factura,
      vencimiento: state.vencimiento,
    });
    navigate(0);
  };

  return (
    <Fragment>
      <h1>Productos Venta</h1>
      <div style={{ height: 600, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Cantidad minima</TableCell>
                <TableCell>Registrar Compra</TableCell>
                <TableCell>Proveedor</TableCell>
                <TableCell>Fecha ingreso</TableCell>
                <TableCell>Precio Compra</TableCell>
                <TableCell>Precio Venta</TableCell>
                <TableCell>Existencias</TableCell>
                <TableCell>Factura Nro</TableCell>
                <TableCell>Vencimiento</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="">{row.Nombre}</TableCell>
                  <TableCell align="">{row.descripcion}</TableCell>
                  <TableCell align="">{row.cantidad_minima}</TableCell>
                  <TableCell align="">
                    <Link to={`/actualizar_producto/${row.id}`}>
                      <AddToPhotosIcon />
                    </Link>
                  </TableCell>
                  <TableCell align="">{row.proveedor.nombre}</TableCell>
                  <TableCell>
                    {row.ingresos.map((ingreso) =>
                      ingreso.cantidad < 5 ? (
                        <p style={{ color: "red" }}>{ingreso.fecha}</p>
                      ) : (
                        <p>{ingreso.fecha}</p>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    {row.ingresos.map((ingreso) =>
                      ingreso.cantidad < 5 ? (
                        <p style={{ color: "red" }}>{ingreso.PrecioCompra}</p>
                      ) : (
                        <p>{ingreso.PrecioCompra}</p>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    {row.ingresos.map((ingreso) =>
                      ingreso.cantidad < 5 ? (
                        <p style={{ color: "red" }}>{ingreso.PrecioVenta}</p>
                      ) : (
                        <p>{ingreso.PrecioVenta}</p>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    {row.ingresos.map((ingreso) =>
                      ingreso.cantidad < 5 ? (
                        <p style={{ color: "red" }}>{ingreso.cantidad}</p>
                      ) : (
                        <p>{ingreso.cantidad}</p>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    {row.ingresos.map((ingreso) =>
                      ingreso.cantidad < 5 ? (
                        <p style={{ color: "red" }}>{ingreso.factura}</p>
                      ) : (
                        <p>{ingreso.factura}</p>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    {row.ingresos.map((ingreso) =>
                      ingreso.cantidad < 5 ? (
                        <p style={{ color: "red" }}>{ingreso.vencimiento}</p>
                      ) : (
                        <p>{ingreso.vencimiento}</p>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    {row.ingresos.map((ingreso) => (
                      <p>
                        <Link to={`/actualizar_producto_venta/${ingreso.id}`}>
                          <EditIcon fontSize="small" color="secondary" />
                        </Link>
                      </p>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <hr />
        <Button variant="outlined" onClick={handleClickOpen}>
          Agregar Producto
        </Button>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Creacion de producto</DialogTitle>
          <DialogContent>
            <TextField
              value={state.nombre}
              autoFocus
              margin="dense"
              id="nombre"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "nombre")}
            />
            <TextField
              value={state.descripcion}
              autoFocus
              margin="dense"
              id="desc"
              label="Descripcion"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "descripcion")}
            />
            <TextField
              value={state.cantidad_minima}
              autoFocus
              margin="dense"
              id="desc"
              label="Cantidad minima"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "cantidad_minima")}
            />
            <br />
            <Autocomplete
              clearOnEscape
              required
              freeSolo
              id="proveedores"
              value={state.proveedor}
              onChange={(e, value) => handleChange(value, "proveedor")}
              disableClearable
              options={proveedores.map(
                (option) => option.id + " -  " + option.nombre
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Proveedor"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                  variant="standard"
                />
              )}
            />
            <TextField
              value={state.precioCompra}
              autoFocus
              margin="dense"
              id="compra"
              label="Precio Compra"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "precioCompra")}
            />
            <TextField
              value={state.precioVenta}
              autoFocus
              margin="dense"
              id="venta"
              label="Precio Venta"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "precioVenta")}
            />
            <TextField
              value={state.cantidad}
              autoFocus
              margin="dense"
              id="cantidad"
              label="Cantidad"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "cantidad")}
            />
            <TextField
              value={state.factura}
              autoFocus
              margin="dense"
              id="factura"
              label="Factura Nro:"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "factura")}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              value={state.vencimiento}
              autoFocus
              margin="dense"
              id="vencimiento"
              label="Vencimiento"
              type="date"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "vencimiento")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleAgregarProducto}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  );
};

export default ProductosVenta;
