import {
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
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, esES } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

const endpoint = "https://cbapi.shantispawellnesslife.com//api";

const Asistencias = () => {
  const [tipoCita, setTipoCita] = useState("Todos");
  const [consultorios, setConsultorios] = useState("Todos");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [tipoConsultas, setTipoConsultas] = useState([]);
  const [consultoriosBD, setConsultoriosBD] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    getTipoConsultas();
    getConsultorios();
  }, []);

  const getTipoConsultas = async () => {
    const response = await axios.get(`${endpoint}/tipoConsultas`);
    setTipoConsultas(response.data);
  };
  const getConsultorios = async () => {
    const response = await axios.get(`${endpoint}/consultorios`);
    setConsultoriosBD(response.data);
  };

  const buscar = async () => {
    var auxDesde = formatFecha(new Date(desde.$y, desde.$M, desde.$D));
    var auxHasta = formatFecha(new Date(hasta.$y, hasta.$M, hasta.$D));
    const response = await axios.get(
      `${endpoint}/asistencias/${tipoCita}/${consultorios}/${auxDesde}/${auxHasta}`
    );
    setFacturas(response.data[0]);
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
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="tipoCita-label">Tipos de cita</InputLabel>
              <Select
                labelId="tipoCita-label"
                id="tipoCita"
                label="Tipos de cita"
                value={tipoCita}
                onChange={(e) => setTipoCita(e.target.value)}
              >
                <MenuItem value={"Todos"}>Todos</MenuItem>
                {tipoConsultas.map((tConsulta) => (
                  <MenuItem value={tConsulta.id}>{tConsulta.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="consultorios-label">Consultorios</InputLabel>
              <Select
                labelId="consultorios-label"
                id="tipoCita"
                label="Consultorios"
                value={consultorios}
                onChange={(e) => setConsultorios(e.target.value)}
              >
                <MenuItem value={"Todos"}>Todos</MenuItem>
                {consultoriosBD.map((consultorioBD) => (
                  <MenuItem value={consultorioBD.id}>
                    {consultorioBD.nombre}
                  </MenuItem>
                ))}
              </Select>
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
          <Grid item xs={3}>
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
      </Box>
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#155E30" }}>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Nombre
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Tipo de cita
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Importe
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Pagado
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Forma de pago
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Notas
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facturas.map((factura) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  align="right"
                >
                  <TableCell component="th" scope="row">
                    {factura.consulta.paciente.nombres +
                      " " +
                      factura.consulta.paciente.apellidos}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {factura.consulta.tipo_consulta.nombre}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {factura.total}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {factura.estado_pago}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {factura.forma_pago}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {factura.forma_pago == "Tarjeta"
                      ? factura.digitos_tarjeta
                      : factura.detalles_pago}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <br />
            <div>
              {"Total Citas: " +
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
          </TableFooter>
        </TableContainer>
      </div>
    </>
  );
};

export default Asistencias;
