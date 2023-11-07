import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";
import { enlace, enlace2 } from "../../../scripts/Enlace";
import { useNavigate } from "react-router-dom";

const FichasClinicas = () => {
  const navigate = useNavigate();
  const [fichasBd, setFichasBd] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [field, setField] = useState({
    type: "",
    label: "",
    options: [],
    image: "",
    table: [],
  });
  const [nombreFicha, setNombreFicha] = useState("");
  const [images, setImages] = useState([]);
  useEffect(() => {
    getFichasBD();
  }, []);

  const getFichasBD = async () => {
    const response = await axios.get(`${enlace}/ficha_medica`);
    setFichasBd(response.data);
  };

  const handleAddField = async () => {
    if (field.options.length == 0) {
      field.options = "";
    }
    if (field.table.length == 0) {
      field.table = "";
    }
    if (field.image != null) {
      console.log(field.image);
      const rest = await axios.post(
        `${enlace}/ficha_medica_imagen`,
        {
          img: field.image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      field.image = rest.data;
    } else {
      field.image = null;
    }
    if (field.label && field.type) {
      setFormFields([...formFields, field]);
      setField({ type: "", label: "", options: [], image: null, table: [] });
    }
  };
  const handleGuardarFicha = async () => {
    try {
      const rest = await axios.post(
        `${enlace}/ficha_medica`,
        {
          nombre: nombreFicha,
          ficha: formFields,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setField({ type: "", label: "", options: [], image: null, table: [] });
      setFormFields([]);
      getFichasBD();
      setImages([]);
      setNombreFicha("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setField({ ...field, [name]: value });
  };

  const handleOptionChange = (event) => {
    const options = event.target.value
      .split(",")
      .map((option) => option.trim());
    setField({ ...field, options });
  };
  const handleTableHeaderChange = (event) => {
    const table = event.target.value.split(",").map((option) => option.trim());
    setField({ ...field, table });
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setField({ ...field, image });
  };

  return (
    <Container>
      <div>
        <Typography variant="h5">Formularios Historias Clinicas</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">Nombre Ficha</TableCell>
                <TableCell align="right">Elementos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fichasBd.map((ficha) => (
                <TableRow
                  key={ficha.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {ficha.id}
                  </TableCell>
                  <TableCell align="right">{ficha.nombre}</TableCell>
                  <TableCell align="right">
                    {JSON.parse(ficha.ficha)?.map((fi) => (
                      <div>
                        {fi.label != null ? "Nombre campo: " + fi.label : ""}
                        {fi.options != null ? ", Opciones: " + fi.options : ""}
                        {fi.image != null ? ", Nombre imagen: " + fi.image : ""}
                        {fi.table != null ? ", Campos tabla: " + fi.table : ""}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <hr />
      <form>
        <Box display="flex" justifyContent="center">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Campo</InputLabel>
                <Select
                  name="type"
                  value={field.type}
                  onChange={handleInputChange}
                >
                  <MenuItem value="text">Texto</MenuItem>
                  <MenuItem value="select">Seleccionar</MenuItem>
                  <MenuItem value="table">Tabla</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="label"
                label="Etiqueta del Campo"
                value={field.label}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl>
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              {field.type === "select" && (
                <TextField
                  name="options"
                  label="Opciones (separadas por comas)"
                  value={field.options.join(", ")}
                  onChange={handleOptionChange}
                />
              )}
              {field.type === "table" && (
                <TextField
                  name="tableHeader"
                  label="Opciones (separadas por comas)"
                  value={field.table.join(", ")}
                  onChange={handleTableHeaderChange}
                />
              )}
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddField}
              >
                Agregar Campo
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGuardarFicha}
              >
                Guardar ficha
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
      <h2>Ficha creada:</h2>
      <div>
        <FormControl fullWidth>
          <TextField
            fullWidth
            name="nombreFicha"
            label="Nombre de la ficha"
            value={nombreFicha}
            onChange={(e) => setNombreFicha(e.target.value)}
          />
        </FormControl>
        <hr />
      </div>
      {formFields.map((field, index) => (
        <div key={index}>
          {field.type === "text" && (
            <FormControl fullWidth>
              <TextField
                fullWidth
                multiline
                rows={4}
                name={field.label}
                label={field.label}
                value={field.label}
              />
            </FormControl>
          )}
          {field.type === "select" && (
            <FormControl fullWidth>
              <InputLabel id={index}> {field.label} </InputLabel>
              <Select
                labelId={index}
                id={field.label}
                label={field.label}
                value={field.options[0]}
              >
                {field.options.map((option) => (
                  <MenuItem value={option}> {option} </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {field.image && (
            <img
              src={`${enlace2}/storage/${field.image}`}
              alt={field.label}
              width={"50%"}
            />
          )}
          {field.type === "table" && field.table.length != 0 && (
            <>
              <h6>{field.label}</h6>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {field.table.map((tabHeader) => (
                        <TableCell align="left"> {tabHeader} </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {field.table.map((tabHeader) => (
                        <TableCell component="th" scope="row">
                          ...
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          <hr />
        </div>
      ))}
    </Container>
  );
};

export default FichasClinicas;
