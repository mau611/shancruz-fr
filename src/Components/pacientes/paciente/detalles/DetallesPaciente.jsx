import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { FormControl } from "react-bootstrap";
import { enlace } from "../../../../scripts/Enlace.js";

const actions = [
  { icon: <AssignmentIcon />, name: "Agregar Diagnostico", option: 1 },
  { icon: <FormatListNumberedIcon />, name: "Agregar Tratamiento", option: 2 },
];

const DetallesPaciente = ({
  diagnosticos,
  paciente_id,
  profesionales,
  descuentos,
  medicos,
}) => {
  const [openDx, setOpenDx] = useState(false);
  const [openTx, setOpenTx] = useState(false);
  const [diagnostico, setDiagnostico] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [dxId, setDxId] = useState("");
  const navigate = useNavigate();
  const [profesionalesBD, setProfesionalesBD] = useState([]);
  const [medicosBD, setMedicosBD] = useState([]);
  const [profesionalId, setProfesionalId] = useState("");
  const [medicoId, setMedicoId] = useState([]);

  useEffect(() => {
    getProfesionalesBD();
    getMedicosBD();
  }, []);

  const getMedicosBD = async () => {
    const response = await axios.get(`${enlace}/medicos`);
    setMedicosBD(response.data);
  };

  const getProfesionalesBD = async () => {
    const response = await axios.get(`${enlace}/profesionales`);
    setProfesionalesBD(response.data);
  };

  const handleClose = () => {
    setOpenDx(false);
    setOpenTx(false);
    setDiagnostico("");
    setTratamiento("");
    setDxId("");
  };

  const agregar = (opcion) => {
    if (opcion == 1) {
      setOpenDx(!openDx);
    } else {
      setOpenTx(!openTx);
    }
  };
  const guardarDiagnostico = async () => {
    await axios
      .post(`${enlace}/diagnostico`, {
        diagnostico: diagnostico,
        paciente_id: paciente_id,
      })
      .then(function () {
        window.alert("Exito");
        setDiagnostico("");
        setOpenDx(!openDx);
        navigate(0);
      })
      .catch(function (error) {
        window.alert("error");
        setDiagnostico("");
        setOpenDx(!openDx);
      });
  };
  const guardarTratamiento = async () => {
    await axios
      .post(`${enlace}/tratamiento`, {
        tratamiento: tratamiento,
        diagnostico_id: dxId,
      })
      .then(function () {
        window.alert("Exito");
        setTratamiento("");
        setDxId("");
        setOpenTx(!openDx);
        navigate(0);
      })
      .catch(function (error) {
        window.alert("error");
        console.log(error);
        setOpenDx(!openTx);
      });
  };

  const asignarProfesional = async () => {
    try {
      axios.post(`${enlace}/profesionales_pacientes`, {
        profesional_id: profesionalId,
        paciente_id: paciente_id,
      });
      window.alert("exito");
      navigate(0);
    } catch (error) {
      window.alert("error");
    }
  };
  const asignarMedico = async () => {
    try {
      axios.post(`${enlace}/medico_paciente`, {
        medico_id: medicoId,
        paciente_id: paciente_id,
      });
      window.alert("exito");
      navigate(0);
    } catch (error) {
      window.alert("error");
    }
  };

  const listaTratamiento = (tratamiento, delimitador) => {
    var txs = tratamiento.split(delimitador);
    return (
      <div>
        <ul>
          {txs.map((tx) => (
            <li>{tx}</li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div style={{ textAlign: "justify" }}>
      <div>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="h5">Asignar profesional:</Typography>
          </Grid>
          <Grid container item xs={2}>
            <div>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={profesionalId}
                onChange={(e) => setProfesionalId(e.target.value)}
              >
                {profesionalesBD.map((profesionalBD) => (
                  <MenuItem value={profesionalBD.id}>
                    {profesionalBD.nombre}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="outlined"
                color="success"
                onClick={() => asignarProfesional()}
                style={{ top: 5 }}
              >
                Asignar profesional
              </Button>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <Typography variant="h5">Asignar Medico:</Typography>
          </Grid>
          <Grid item xs={2}>
            <div>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={medicoId}
                onChange={(e) => setMedicoId(e.target.value)}
              >
                {medicosBD.map((medicoBD) => (
                  <MenuItem value={medicoBD.id}>{medicoBD.nombre}</MenuItem>
                ))}
              </Select>
              <Button
                variant="outlined"
                color="success"
                onClick={() => asignarMedico()}
                style={{ top: 5 }}
              >
                Asignar medico
              </Button>
            </div>
          </Grid>
        </Grid>

        <hr />
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            Profesionales a cargo:
            <ul>
              {profesionales.map((profesionalAsignado) => (
                <li>{profesionalAsignado.nombre}</li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={6}>
            Medico a cargo:
            <ul>
              {medicos.map((medicoAsignado) => (
                <li>{medicoAsignado.nombre}</li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </div>
      <hr />
      <h4>Diagnosticos y tratamientos del paciente</h4>
      <div>
        <Grid container spacing={2}>
          {diagnosticos?.map((diagnostico) => (
            <Grid item xs={3}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ backgroundColor: "#155E30", color: "white" }}
                >
                  <Typography>{diagnostico.diagnostico}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {diagnostico.tratamientos?.map((tratamiento) => (
                    <div>
                      <strong>{tratamiento.fecha}</strong>
                      <Paper elevation={3} style={{ padding: "10px" }}>
                        {listaTratamiento(tratamiento.tratamiento, "\n")}
                      </Paper>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </div>
      <div>
        <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => agregar(action.option)}
              />
            ))}
          </SpeedDial>
        </Box>
      </div>
      <div>
        <Dialog open={openDx} onClose={handleClose} fullWidth>
          <DialogTitle>Ingrese un nuevo diagnostico</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="diagnostico"
              label="Paciente con:"
              type="text"
              fullWidth
              variant="standard"
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={guardarDiagnostico}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={openTx} onClose={handleClose} fullWidth>
          <DialogTitle>Agregar Tratamiento</DialogTitle>
          <DialogContent>
            <InputLabel id="demo-simple-select-label">
              Seleccione un diagnostico
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dxId}
              label="Seleccione un diagnostico"
              onChange={(e) => setDxId(e.target.value)}
            >
              {diagnosticos?.map((diagnostico) => (
                <MenuItem value={diagnostico.id}>
                  {diagnostico.diagnostico}
                </MenuItem>
              ))}
            </Select>
            <TextField
              autoFocus
              margin="dense"
              id="diagnostico"
              label="Tratamiento:"
              type="text"
              fullWidth
              variant="standard"
              multiline
              rows={5}
              value={tratamiento}
              onChange={(e) => setTratamiento(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={guardarTratamiento}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default DetallesPaciente;
