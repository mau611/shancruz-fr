import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { enlace } from "../../../scripts/Enlace";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";

const Descuento = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [paciente, setPaciente] = useState("");
  const [producto, setProducto] = useState("");
  const [servicio, setServicio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [autorizadoPor, setAutorizadoPor] = useState("");
  const [productoOServicio, setProductoOServicio] = useState("");
  const [esPorcentaje, setEsPorcentaje] = useState(false);
  const [cantidad, setCantidad] = useState(0);
  const [caducidad, setCaducidad] = useState(false);
  const [fechaCaducidad, setFechaCaducidad] = useState("");

  useEffect(() => {
    getPacientes();
    getServicios();
    getProductos();
  }, []);

  const getPacientes = async () => {
    const response = await axios.get(`${enlace}/pacientes`);
    setPacientes(response.data);
  };
  const getServicios = async () => {
    const response = await axios.get(`${enlace}/servicios`);
    setServicios(response.data);
    console.log(response.data);
  };
  const getProductos = async () => {
    const response = await axios.get(`${enlace}/productos`);
    setProductos(response.data);
    console.log(response.data);
  };

  const guardarDescuento = async () => {
    var fecha = formatFecha(
      new Date(fechaCaducidad.$y, fechaCaducidad.$M, fechaCaducidad.$D)
    );
    try {
      await axios.post(`${enlace}/descuento`, {
        descripcion: descripcion + ". Autorizado por: " + autorizadoPor,
        porcentaje: esPorcentaje,
        cantidad_descuento: cantidad,
        conCaducidad: caducidad,
        fecha_caducidad: caducidad ? fecha : null,
        producto: productoOServicio == "producto" ? true : false,
        servicio: productoOServicio == "servicio" ? true : false,
        serv_o_prod_id:
          productoOServicio == "producto"
            ? producto.split(" ")[0]
            : servicio.split(" ")[0],
        paciente_id: paciente.split(" ")[0],
      });
      window.alert("todo bien");
      navigate(0);
    } catch (error) {
      window.alert("algo salio mal");
      console.log(error);
    }
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
    <Container component={Paper}>
      <br />
      <Typography variant="h5">Generar descuento a paciente</Typography>
      <FormControl fullWidth>
        <br />
        <Autocomplete
          required
          freeSolo
          id="pacientes"
          value={paciente}
          onChange={(e, value) => setPaciente(value)}
          disableClearable
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
        <br />
        <TextField
          id="descripcion"
          label="Motivo del descuento"
          variant="outlined"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <br />
        <TextField
          id="autorizado"
          label="Autorizado por:"
          variant="outlined"
          value={autorizadoPor}
          onChange={(e) => setAutorizadoPor(e.target.value)}
        />
        <br />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Descuento para: </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={productoOServicio}
          label="Descuento para:"
          onChange={(e) => setProductoOServicio(e.target.value)}
        >
          <MenuItem value={"producto"}>Producto</MenuItem>
          <MenuItem value={"servicio"}>Servicio</MenuItem>
        </Select>
      </FormControl>
      {productoOServicio === "producto" && (
        <FormControl fullWidth>
          <br />
          <Autocomplete
            required
            freeSolo
            id="productos"
            value={producto}
            onChange={(e, value) => setProducto(value)}
            disableClearable
            options={productos.map(
              (option) => option.id + " -  " + option.Nombre
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
      )}
      {productoOServicio === "servicio" && (
        <FormControl fullWidth>
          <br />
          <Autocomplete
            required
            freeSolo
            id="servicios"
            value={servicio}
            onChange={(e, value) => setServicio(value)}
            disableClearable
            options={servicios.map(
              (option) => option.id + " -  " + option.servicio
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Seleccione un servicio"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </FormControl>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="descuento-label">Tipo de descuento:</InputLabel>
              <Select
                labelId="descuento-label"
                id="descuento"
                value={esPorcentaje}
                label="Tipo de descuento:"
                onChange={(e) => setEsPorcentaje(e.target.value)}
              >
                <MenuItem value={true}>Porcentaje</MenuItem>
                <MenuItem value={false}>Nuevo precio</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                id="cantidad"
                label="Cantidad del descuento"
                variant="outlined"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="caducidad-label">Tiene Caducidad:</InputLabel>
              <Select
                labelId="caducidad-label"
                id="descuento"
                value={caducidad}
                label="Tiene Caducidad:"
                onChange={(e) => setCaducidad(e.target.value)}
              >
                <MenuItem value={true}>Si</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            {caducidad && (
              <FormControl fullWidth>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  <DatePicker
                    label="Fecha Caducidad"
                    format="YYYY-MM-DD"
                    onChange={(fecha) => setFechaCaducidad(fecha)}
                  />
                </LocalizationProvider>
              </FormControl>
            )}
          </Grid>
        </Grid>
      </Box>
      <br />
      <Button variant="outlined" onClick={() => guardarDescuento()}>
        Crear descuento
      </Button>
      <br />
      <br />
    </Container>
  );
};

export default Descuento;
