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

export const PacientesAsignados = () => {
  const [profesionales, setProfesionales] = useState([]);
  const [profesional, setProfesional] = useState("");
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    getProfesionales();
  }, []);
  const getProfesionales = async () => {
    const response = await axios.get(`${enlace}/profesionales`);
    setProfesionales(response.data);
  };

  const buscar = async () => {
    //var auxDesde = formatFecha(new Date(desde.$y, desde.$M, desde.$D));
    //var auxHasta = formatFecha(new Date(hasta.$y, hasta.$M, hasta.$D));
    const p = "" + profesional;
    var profesionalAux = p.split(" ")[0];
    const response = await axios.get(
      `${enlace}/pacientes_profesionales/${profesionalAux}`
    );
    //setVentas(response.data[2]);
    //setDetalles(response.data[1]);
    setPacientes(response.data);
    console.log(response.data);
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
                id="profesional"
                value={profesional}
                onChange={(e, value) => setProfesional(value)}
                onInputChange={(e, value) => setProfesional(value)}
                options={profesionales.map(
                  (option) => option.id + " -  " + option.nombre
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione un profesional"
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#155E30" }}>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  ID
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Paciente
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Diagnostico
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pacientes.map((paciente) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  align="right"
                >
                  <TableCell component="th" scope="row">
                    {paciente.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {paciente.nombres + " " + paciente.apellidos}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {paciente.diagnosticos?.map((diagnostico) => (
                      <p>{diagnostico.diagnostico}</p>
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