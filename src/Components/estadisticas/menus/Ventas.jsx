import React from "react";
import NavBar from "../../estructura/NavBar";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { enlace } from "../../../scripts/Enlace";
import SearchIcon from "@mui/icons-material/Search";

export const Ventas = () => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState("Todos");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [ventas, setVentas] = useState([]);
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    getPacientes();
  }, []);
  const getPacientes = async () => {
    const response = await axios.get(`${enlace}/pacientes`);
    setPacientes(response.data);
  };

  const buscar = async () => {
    var auxDesde = formatFecha(new Date(desde.$y, desde.$M, desde.$D));
    var auxHasta = formatFecha(new Date(hasta.$y, hasta.$M, hasta.$D));
    const p = "" + paciente;
    var pacienteAux = p == "Todos" ? "Todos" : p.split(" ")[0];
    const response = await axios.get(
      `${enlace}/estadisticas_ventas/${pacienteAux}/${auxDesde}/${auxHasta}`
    );
    setVentas(response.data[2]);
    setDetalles(response.data[1]);
  };
  const fechaDosDigitos = (num) => {
    return num.toString().padStart(2, "0");
  };

  const formatFecha = (date) => {
    return [
      date.getFullYear(),
      fechaDosDigitos(date.getMonth() + 1),
      fechaDosDigitos(date.getDate()),
    ].join("-");
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
                id="paciente"
                value={paciente}
                onChange={(e, value) => setPaciente(value)}
                onInputChange={(e, value) => setPaciente(value)}
                options={pacientes.map(
                  (option) =>
                    option.id + " -  " + option.nombres + " " + option.apellidos
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Paciente"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DatePicker
                  label="Desde"
                  format="YYYY-MM-DD"
                  onChange={(fechaDesde) => setDesde(fechaDesde)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DatePicker
                  label="Hasta"
                  format="YYYY-MM-DD"
                  onChange={(fechaHasta) => setHasta(fechaHasta)}
                />
              </LocalizationProvider>
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
        <div>
          {"Total Ventas: " +
            detalles[0] +
            " Bs" +
            "  - Efectivo: " +
            detalles[1] +
            " Bs" +
            "  - Transferencias: " +
            detalles[2] +
            " Bs" +
            "  - Pagos Qr: " +
            detalles[3] +
            " Bs" +
            "  - Tarjetas: " +
            detalles[4] +
            " Bs"}
        </div>
      </Box>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#155E30" }}>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Fecha Venta
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Paciente
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Productos Vendidos
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Estado de pago
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Forma de pago
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ventas.map((venta) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  align="right"
                >
                  <TableCell component="th" scope="row">
                    <TableCell component="th" scope="row">
                      {venta[0].fecha}
                    </TableCell>
                    {venta[0].paciente.nombres +
                      " " +
                      venta[0].paciente.apellidos}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {venta[1].map((producto) => (
                      <p>{producto.Nombre}</p>
                    ))}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {venta[0].estado}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {venta[0].tipo_pago}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {venta[0].total}
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
