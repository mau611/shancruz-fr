import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, esES } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

const endpoint = "http://cbapi.shantispawellnesslife.com/api";

const Asistencias = () => {
  const [tipoCita, setTipoCita] = useState("Todos");
  const [consultorios, setConsultorios] = useState("Todos");
  const [tipoConsultas, setTipoConsultas] = useState([]);
  const [consultoriosBD, setConsultoriosBD] = useState([]);

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
                <DatePicker label="Desde" format="YYYY-MM-DD" />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DatePicker label="Hasta" format="YYYY-MM-DD" />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button variant="outlined" startIcon={<SearchIcon />}>
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <br />
    </>
  );
};

export default Asistencias;
