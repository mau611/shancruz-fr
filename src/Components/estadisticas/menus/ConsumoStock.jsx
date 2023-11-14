import React from "react";
import NavBar from "../../estructura/NavBar";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { enlace } from "../../../scripts/Enlace";
import SearchIcon from "@mui/icons-material/Search";

export const ConsumoStock = () => {
  const [productosUso, setProductosUso] = useState([]);
  const [producto, setProducto] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);

  useEffect(() => {
    getProductosUso();
  }, []);
  const getProductosUso = async () => {
    const response = await axios.get(`${enlace}/materiales`);
    setProductosUso(response.data);
  };

  const buscar = async () => {
    //var auxDesde = formatFecha(new Date(desde.$y, desde.$M, desde.$D));
    //var auxHasta = formatFecha(new Date(hasta.$y, hasta.$M, hasta.$D));
    const p = "" + producto;
    var productoAux = p.split(" ")[0];
    const response = await axios.get(
      `${enlace}/estadisticas_consumo_stock/${productoAux}`
    );
    setProductoSeleccionado(response.data);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Autocomplete
                required
                freeSolo
                id="producto"
                value={producto}
                onChange={(e, value) => setProducto(value)}
                onInputChange={(e, value) => setProducto(value)}
                options={productosUso.map(
                  (option) => option.id + " -  " + option.productos_uso
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione un producto"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <br />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<SearchIcon />}
                onClick={() => buscar()}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </Box>
        <br />
        <div></div>
      </Box>
      <div>
        <h4>
          {productoSeleccionado.productos_uso
            ? productoSeleccionado.productos_uso
            : ""}
        </h4>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#155E30" }}>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  ID
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Fecha Ingreso
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Fecha de consumo
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productoSeleccionado.ingresos_uso?.map((ingreso) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  align="right"
                >
                  <TableCell component="th" scope="row">
                    {ingreso.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {ingreso.fecha_ingreso}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {ingreso.consumos?.map((consumo) => (
                      <p>{consumo.fecha}</p>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <br />
          </TableFooter>
        </TableContainer>
      </div>
    </>
  );
};
