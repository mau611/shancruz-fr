import React, { useRef } from "react";
import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enlace, enlace2 } from "../../../scripts/Enlace.js";

const FormularioHistoria = () => {
  const navigate = useNavigate();
  const dataFetchedRef = useRef(false);
  const clickRef = useRef(null);
  const [paciente, setPaciente] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [citas, setCitas] = useState([]);
  const [cita, setCita] = useState("");
  const [opcionHistoria, setOpcionHistoria] = useState();
  const [fichas, setFichas] = useState([]);
  const [ficha, setFicha] = useState([]);
  const [dato, setDato] = useState({});

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getPacientes();
    getFichas();
    window.clearTimeout(clickRef?.current);
  }, []);

  const getPacientes = async () => {
    const response = await axios.get(`${enlace}/pacientes`);
    setPacientes(response.data);
  };
  const getFichas = async () => {
    const response = await axios.get(`${enlace}/ficha_medica`);
    setFichas(response.data);
  };

  const seleccionarFicha = (event) => {
    setOpcionHistoria(event.target.value);
    const fichaEncontrada = fichas.find(
      (element) => element.id == event.target.value
    );
    setFicha(JSON.parse(fichaEncontrada.ficha));
    setDato({});
  };

  const getCitas = async (value) => {
    setCitas([]);
    setCita();
    setPaciente(value);
    const id = value.split(" ")[0];
    const response = await axios.get(`${enlace}/paciente/${id}`);
    setCitas(response.data.citas);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDato({ ...dato, [name]: value });
  };

  const llenarFicha = async () => {
    await axios
      .post(`${enlace}/historia`, {
        paciente_id: paciente.split(" ")[0],
        consulta_id: cita.split(" ")[0],
        historia: dato,
      })
      .then(function () {
        window.alert("historia guardada de manera exitosa");
        navigate(0);
      })
      .catch(function (error) {
        window.alert("Hubo un error guardando los datos");
      });
  };
  return (
    <div>
      Seleccione un paciente
      <br />
      <Autocomplete
        required
        freeSolo
        id="pacientes"
        value={paciente}
        onChange={(e, value) => getCitas(value)}
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
      <div>
        Elija una Fecha
        <br />
        <Autocomplete
          required
          freeSolo
          id="citas"
          value={cita}
          onChange={(e, value) => setCita(value)}
          disableClearable
          options={citas.map(
            (option) =>
              option.id +
              " - Fecha de la cita:  " +
              new Date("" + option.start).toLocaleDateString("en-GB")
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccione la cita"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </div>
      <br />
      <div>
        Elige una opcion
        <br />
        <Select
          id="demo-simple-select"
          value={opcionHistoria}
          onChange={seleccionarFicha}
          fullWidth
        >
          {fichas.map((ficha) => (
            <MenuItem value={ficha.id}> {ficha.nombre} </MenuItem>
          ))}
        </Select>
      </div>
      <br />
      <div>
        {ficha.length > 0 ? (
          <>
            <div>
              {ficha.map((f, index) => (
                <>
                  {f.type === "text" && (
                    <FormControl fullWidth>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={4}
                        name={f.label}
                        label={f.label}
                        onChange={(event) => handleChange(event)}
                      />
                    </FormControl>
                  )}
                  {f.type === "select" && (
                    <FormControl fullWidth>
                      <InputLabel id={index}> {f.label} </InputLabel>
                      <Select
                        required
                        labelId={index}
                        id={f.label}
                        label={f.label}
                        name={f.label}
                        onChange={(event) => handleChange(event)}
                      >
                        {f.options.map((option) => (
                          <MenuItem value={option}> {option} </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  {f.image && (
                    <div className="text-center">
                      <img
                        src={`${enlace2}/storage/${f.image}`}
                        alt={f.label}
                        width={"20%"}
                        className="text-center"
                      />
                    </div>
                  )}
                  {f.type === "table" && f.table.length != 0 && (
                    <>
                      <h6>{f.label}</h6>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              {f.table.map((tabHeader) => (
                                <TableCell align="center">
                                  {" "}
                                  {tabHeader}{" "}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              {f.table.map((tabHeader) => (
                                <TableCell component="th" scope="row">
                                  <TextField
                                    fullWidth
                                    label={tabHeader}
                                    name={f.label + "-" + tabHeader}
                                    onChange={(event) => handleChange(event)}
                                    required
                                  />
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </>
                  )}
                  <hr />
                </>
              ))}
              <br />
              <Button
                variant="contained"
                color="success"
                onClick={() => llenarFicha()}
              >
                Guardar
              </Button>
            </div>
          </>
        ) : (
          <div>Seleccione una ficha</div>
        )}
      </div>
    </div>
  );
};

export default FormularioHistoria;
