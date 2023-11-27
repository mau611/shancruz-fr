import React from "react";
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
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { enlace } from "../../../scripts/Enlace";
import SearchIcon from "@mui/icons-material/Search";

const DescuentosServicios = () => {
  const [pacientesBD, setPacientesBD] = useState([]);
  const [serviciosBD, setServiciosBD] = useState([]);
  const [paciente, setPaciente] = useState("Todos");
  const [servicio, setServicio] = useState("Todos");
  const [activo, setActivo] = useState("Todos");
  const [descuentos, setDescuentos] = useState([]);
  const [autorizado, setAutorizado] = useState(null);

  useEffect(() => {
    getPacientes();
    getServiciosBD();
  }, []);
  const getPacientes = async () => {
    const response = await axios.get(`${enlace}/pacientes`);
    setPacientesBD(response.data);
  };

  const getServiciosBD = async () => {
    const response = await axios.get(`${enlace}/servicios`);
    setServiciosBD(response.data);
  };

  const buscar = async () => {
    const p = "" + paciente;
    var pacienteAux = p.split(" ")[0];
    const aut = autorizado || 0;
    const response = await axios.get(
      `${enlace}/estadisticas_descuentos_servicios/${pacienteAux}/${servicio}/${activo}/${aut}`
    );
    setDescuentos(response.data);
  };

  return (
    <>
      <Typography variant="h4">Descuentos aplicados a servicios: </Typography>
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={3}>
            <FormControl fullWidth>
              <Autocomplete
                required
                freeSolo
                id="paciente"
                value={paciente}
                onChange={(e, value) => setPaciente(value)}
                onInputChange={(e, value) => setPaciente(value)}
                options={pacientesBD.map(
                  (option) =>
                    option.id + " -  " + option.nombres + " " + option.apellidos
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione un paciente"
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
              <TextField
                id="autorisado-text"
                label="Autorizado por:"
                variant="outlined"
                value={autorizado}
                onChange={(e) => setAutorizado(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="serviciosBD-label">
                Seleccione un servicio
              </InputLabel>
              <Select
                labelId="serviciosBD-label"
                id="serviciosBD"
                value={servicio}
                label="Seleccione un servicio"
                onChange={(e) => setServicio(e.target.value)}
              >
                <MenuItem value={"Todos"}>Todos</MenuItem>
                {serviciosBD.map((servicioBD) => (
                  <MenuItem value={servicioBD.id}>
                    {servicioBD.servicio}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="activo-label">Estado</InputLabel>
              <Select
                labelId="activo-label"
                id="activo"
                value={activo}
                label="Estado"
                onChange={(e) => setActivo(e.target.value)}
              >
                <MenuItem value={"Todos"}>Todos</MenuItem>
                <MenuItem value={"activo"}>Activo</MenuItem>
                <MenuItem value={"no activo"}>No activo</MenuItem>
              </Select>
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
                  Paciente
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Detalle descuento
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Descuento
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Estado
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Servicio
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {descuentos.map((descuento) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  align="right"
                >
                  <TableCell component="th" scope="row">
                    {descuento.paciente.nombres +
                      " " +
                      descuento.paciente.apellidos}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {descuento.descripcion}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {descuento.porcentaje == 1
                      ? "Descuento del " + descuento.cantidad_descuento + "%"
                      : "Descuento con cambio de precio del " +
                        descuento.cantidad_descuento +
                        "Bs"}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {descuento.activo == 1
                      ? "Descuento activo "
                      : "El descuento no se encuentra activo "}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {
                      serviciosBD.find(
                        (servicio) => servicio.id == descuento.serv_o_prod_id
                      ).servicio
                    }
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
export default DescuentosServicios;
