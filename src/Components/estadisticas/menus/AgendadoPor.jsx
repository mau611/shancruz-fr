import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { enlace } from "../../../scripts/Enlace";
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
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";

const AgendadoPor = () => {
  const [desde, setDesde] = useState("");
  const [consultas, setConsultas] = useState([]);

  const buscar = async () => {
    var auxDesde = formatFecha(new Date(desde.$y, desde.$M, desde.$D));
    const response = await axios.get(
      `${enlace}/estadistica_agendado_por/${auxDesde}`
    );
    setConsultas(response.data);
    console.log(response.data);
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                label="Seleccione un dia:"
                format="YYYY-MM-DD"
                onChange={(fechaDesde) => setDesde(fechaDesde)}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
      </Grid>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#155E30" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Fecha
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Detalle de cita
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Paciente
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Tipo consulta
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Consultorio
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Estado cita
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Agendado por:
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consultas.map((cita) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                align="right"
              >
                <TableCell component="th" scope="row">
                  {new Date("" + cita.start).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {cita.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {cita.paciente.nombres + " " + cita.paciente.apellidos}
                </TableCell>
                <TableCell component="th" scope="row">
                  {cita.tipo_consulta.nombre}
                </TableCell>
                <TableCell component="th" scope="row">
                  {cita.consultorio.nombre}
                </TableCell>
                <TableCell component="th" scope="row">
                  {cita.estado_cita.estado}
                </TableCell>
                <TableCell component="th" scope="row">
                  {cita.profesional.nombre}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AgendadoPor;
