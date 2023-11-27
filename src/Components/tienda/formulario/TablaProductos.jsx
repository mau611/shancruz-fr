import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

const TablaProductos = ({ productos, total, descuentos }) => {
  const [aux, setAux] = useState(0);
  const buscar = (producto) => {
    var a = 0;
    let b = descuentos.find(
      (descuento) =>
        descuento.producto == 1 &&
        descuento.activo == 1 &&
        producto.producto.id == descuento.serv_o_prod_id
    );
    if (b === undefined) {
      a = <div>{producto.PrecioVenta}</div>;
    } else {
      if (b.porcentaje == 1) {
        a = (
          <div>
            {producto.PrecioVenta -
              producto.PrecioVenta * (b.cantidad_descuento / 100)}
          </div>
        );
      } else {
        a = <div>{b.cantidad_descuento}</div>;
      }
    }
    return a;
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead style={{}}>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto) => (
            <TableRow key={producto.id}>
              <TableCell component="th" scope="row">
                {producto.producto.Nombre}
              </TableCell>
              <TableCell align="right"> {buscar(producto)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaProductos;
